// app/api/appointments/route.ts

import { calendar_v3, google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Payload required to create a new appointment in Google Calendar.
 * All datetime fields must follow the ISO 8601 format with a timezone offset.
 */
interface AppointmentDetails {
    /** Full name of the client booking the appointment. */
    clientName: string;
    /** Name of the service the client is requesting. */
    serviceName: string;
    /** Client's contact phone number. */
    phone: string;
    /** Appointment start time in ISO 8601 format. e.g. "2026-05-04T10:00:00-06:00" */
    startTime: string;
    /** Appointment end time in ISO 8601 format. e.g. "2026-05-04T11:00:00-06:00" */
    endTime: string;
}

/**
 * Optional query parameters for filtering appointments retrieved from Google Calendar.
 * All fields are optional; omitting them falls back to the current week's defaults.
 */
interface GetAppointmentsDetails {
    /** Start of the time range (ISO 8601). */
    timeMin: string;
    /** End of the time range (ISO 8601). */
    timeMax: string;
    /** Maximum number of events to return. Must be >= 1. Defaults to 20. */
    maxResults: number;
}

// ─── Google Calendar Client ───────────────────────────────────────────────────

/**
 * Creates and returns an authenticated Google Calendar API client.
 *
 * Uses a service account (JWT) for server-to-server authentication.
 * Credentials are read from environment variables to avoid hardcoding secrets.
 *
 * Required environment variables:
 * - `GOOGLE_PRIVATE_KEY`: The service account's private key (with escaped `\n`).
 * - `GOOGLE_CLIENT_EMAIL`: The service account's email address.
 *
 * @returns An authenticated Google Calendar v3 client instance.
 */
function getCalendarClient() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    return google.calendar({ version: "v3", auth });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Calculates the start (Monday at 00:00:00) and end (Sunday at 23:59:59)
 * of the current week in ISO 8601 format.
 *
 * Uses `getDay()` which returns 0 for Sunday and 1–6 for Monday–Saturday.
 * Sunday is treated as a special case: instead of advancing to the next Monday,
 * we subtract 6 days to reach the previous Monday.
 *
 * @returns An object with `weekStart` and `weekEnd` as ISO 8601 strings.
 *
 * @example
 * const { weekStart, weekEnd } = getCurrentWeekRange();
 * // weekStart → "2026-04-27T00:00:00.000Z"
 * // weekEnd   → "2026-05-03T23:59:59.999Z"
 */
function getCurrentWeekRange(): { weekStart: string; weekEnd: string } {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return {
        weekStart: monday.toISOString(),
        weekEnd: sunday.toISOString(),
    };
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Type guard that validates whether an unknown value conforms to `AppointmentDetails`.
 *
 * Every field must be a non-empty string.
 *
 * @param body - The value to validate (typically a parsed JSON request body).
 * @returns `true` if `body` satisfies the `AppointmentDetails` shape; `false` otherwise.
 */
function validatePostBody(body: unknown): body is AppointmentDetails {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;

    const requiredFields: (keyof AppointmentDetails)[] = [
        "clientName",
        "serviceName",
        "phone",
        "startTime",
        "endTime",
    ];

    return requiredFields.every(
        (field) =>
            typeof b[field] === "string" && (b[field] as string).trim() !== ""
    );
}

/**
 * Type guard that validates whether an unknown value conforms to `GetAppointmentsDetails`.
 *
 * Rules:
 * - `timeMin` and `timeMax` must be non-empty strings.
 * - `maxResults` must be a number greater than or equal to 1.
 *
 * String and number fields are validated separately to avoid calling
 * string methods (e.g. `.trim()`) on non-string values, which would throw at runtime.
 *
 * @param body - The value to validate (typically a parsed JSON request body).
 * @returns `true` if `body` satisfies the `GetAppointmentsDetails` shape; `false` otherwise.
 */
function validateGetBody(body: unknown): body is GetAppointmentsDetails {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;

    const stringFields: (keyof GetAppointmentsDetails)[] = ["timeMin", "timeMax"];
    const areStringsValid = stringFields.every(
        (field) =>
            typeof b[field] === "string" && (b[field] as string).trim() !== ""
    );

    const isMaxResultsValid =
        typeof b.maxResults === "number" && b.maxResults >= 1;

    return areStringsValid && isMaxResultsValid;
}

// ─── Business Logic ───────────────────────────────────────────────────────────

/**
 * Creates a new event in Google Calendar based on the provided appointment details.
 *
 * @param appointmentDetails - The appointment data used to create the calendar event.
 * @returns A promise that resolves to the Google Calendar event ID of the created event.
 * @throws {Error} If the Google Calendar API does not return an event ID.
 */
async function createAppointmentInGoogle(
    appointmentDetails: AppointmentDetails
): Promise<string> {
    const calendar = getCalendarClient();

    const response = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
            summary: `Cita de ${appointmentDetails.clientName}`,
            description: `Servicio: ${appointmentDetails.serviceName}\nTeléfono: ${appointmentDetails.phone}`,
            start: { dateTime: appointmentDetails.startTime },
            end: { dateTime: appointmentDetails.endTime },
        },
    });

    if (!response.data.id) {
        throw new Error("Google Calendar did not return an event ID.");
    }

    return response.data.id;
}

/**
 * Retrieves upcoming appointments from Google Calendar within a given time range.
 *
 * Fetches events ordered by start time. If no arguments are provided, defaults
 * to the Monday–Sunday range of the current week.
 *
 * @param timeMin - Lower bound for event start time (ISO 8601). Defaults to Monday 00:00:00.
 * @param timeMax - Upper bound for event start time (ISO 8601). Defaults to Sunday 23:59:59.
 * @param maxResults - Maximum number of events to return. Defaults to 20.
 * @returns A promise that resolves to an array of Google Calendar event objects.
 * @throws {Error} If the API returns a non-2xx HTTP status code.
 *
 * @example
 * // With explicit range
 * const events = await getAppointments({
 *   timeMin: "2026-05-01T00:00:00-06:00",
 *   timeMax: "2026-05-31T23:59:59-06:00",
 *   maxResults: 10,
 * });
 *
 * // With no arguments → current week
 * const events = await getAppointments();
 */
async function getAppointments({
    timeMin = getCurrentWeekRange().weekStart,
    timeMax = getCurrentWeekRange().weekEnd,
    maxResults = 20,
}: {
    timeMin?: string;
    timeMax?: string;
    maxResults?: number;
} = {}): Promise<calendar_v3.Schema$Event[]> {
    const calendar = getCalendarClient();

    const response = await calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin,
        timeMax,
        maxResults,
        singleEvents: true,   // expands recurring events into individual instances
        orderBy: "startTime", // requires singleEvents: true
    });

    if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error al obtener citas: código HTTP ${response.status}`);
    }

    return response.data.items ?? [];
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

/**
 * GET /api/appointments
 *
 * Returns a list of appointments from Google Calendar.
 *
 * The request body is **optional**. If omitted or invalid, the endpoint falls back
 * to the current week's Monday–Sunday range with a default of 20 results.
 *
 * `request.json()` throws if the body is empty or malformed, so `.catch(() => null)`
 * is chained directly on the Promise to silently recover — returning `null` instead
 * of propagating the error. `validateGetBody(null)` returns `false`, which triggers
 * the default-argument path in `getAppointments()`.
 *
 * ### Request body (JSON, optional)
 * | Field      | Type   | Description                              |
 * |------------|--------|------------------------------------------|
 * | timeMin    | string | Start of the range (ISO 8601)            |
 * | timeMax    | string | End of the range (ISO 8601)              |
 * | maxResults | number | Max events to return. Must be >= 1       |
 *
 * ### Responses
 * | Status | Description                                              |
 * |--------|----------------------------------------------------------|
 * | 200    | Success. Returns `{ success: true, appointments: [] }`.  |
 * | 500    | Internal server error.                                   |
 *
 * @param request - The incoming Next.js request object.
 * @returns A JSON response with the appointments array or an error message.
 */
export async function GET(request: NextRequest) {
    try {
        // .catch(() => null) prevents a thrown exception from propagating when the
        // body is absent or not valid JSON — null is handled gracefully by validateGetBody.
        const body: unknown = await request.json().catch(() => null);

        const appointments = validateGetBody(body)
            ? await getAppointments(body)
            : await getAppointments();

        return NextResponse.json({ success: true, appointments }, { status: 200 });
    } catch (err) {
        console.error("Error al obtener las citas:", err);

        return NextResponse.json(
            { error: "Error interno al obtener las citas de Google Calendar." },
            { status: 500 }
        );
    }
}

/**
 * POST /api/appointments
 *
 * Creates a new appointment by inserting an event into Google Calendar.
 *
 * ### Request body (JSON, required)
 * | Field       | Type   | Description                              |
 * |-------------|--------|------------------------------------------|
 * | clientName  | string | Full name of the client                  |
 * | serviceName | string | Name of the requested service            |
 * | phone       | string | Client's contact phone number            |
 * | startTime   | string | Start datetime in ISO 8601 format        |
 * | endTime     | string | End datetime in ISO 8601 format          |
 *
 * ### Responses
 * | Status | Description                                                    |
 * |--------|----------------------------------------------------------------|
 * | 201    | Appointment created. Returns `{ success: true, googleEventId }`|
 * | 400    | Invalid or incomplete request body.                            |
 * | 500    | Internal server error.                                         |
 *
 * @param request - The incoming Next.js request object.
 * @returns A JSON response indicating success or describing the error.
 */
export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();

        if (!validatePostBody(body)) {
            return NextResponse.json(
                {
                    error:
                        "Cuerpo inválido. Se requieren: clientName, serviceName, phone, startTime, endTime.",
                },
                { status: 400 }
            );
        }

        const googleEventId = await createAppointmentInGoogle(body);

        return NextResponse.json({ success: true, googleEventId }, { status: 201 });
    } catch (error) {
        console.error("Error al crear cita:", error);

        return NextResponse.json(
            { error: "Error interno al crear la cita en Google Calendar." },
            { status: 500 }
        );
    }
}