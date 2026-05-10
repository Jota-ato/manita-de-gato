import { AppointmentSchema } from "@/lib/calendar/schemas";
import { NextRequest, NextResponse } from "next/server";
import { validatePostBody, validateGetBody } from '@/lib/calendar/validation';
import { createAppointmentInGoogle, getAppointments } from '@/lib/calendar/service';

/**
 * GET /api/calendar
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
 * ### Request params (optinal)
 * @param timeMin (string): Start of the range (ISO 8601)
 * @param timeMax (string): End of the range (ISO 8601)
 * @param maxResults (number): Max events to return. Must be >= 1
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
        // Now we look for parameters in the URL first
        const { searchParams } = new URL(request.url);
        const timeMin = searchParams.get('timeMin');
        const timeMax = searchParams.get('timeMax');
        const maxResults = searchParams.get('maxResults');

        let body: unknown = null;

        // If params exist in URL, we construct the object for validation
        if (timeMin && timeMax && maxResults) {
            body = { timeMin, timeMax, maxResults };
        }

        const rawData = validateGetBody(body)
            ? await getAppointments(body)
            : await getAppointments();

        const appointments = rawData.map(event => {
            const result = AppointmentSchema.safeParse(event);
            return result.success ? result.data : null;
        }).filter(Boolean);

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
 * POST /api/calendar
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
