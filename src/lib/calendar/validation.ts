import type { CalendarEventDetails, GetAppointmentsDetails } from './types';
/**
 * Type guard that validates whether an unknown value conforms to `AppointmentDetails`.
 *
 * Every field must be a non-empty string.
 *
 * @param body - The value to validate (typically a parsed JSON request body).
 * @returns `true` if `body` satisfies the `AppointmentDetails` shape; `false` otherwise.
 */
export function validatePostBody(body: unknown): body is CalendarEventDetails {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;

    const requiredFields: (keyof CalendarEventDetails)[] = [
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
export function validateGetBody(body: unknown): body is GetAppointmentsDetails {
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