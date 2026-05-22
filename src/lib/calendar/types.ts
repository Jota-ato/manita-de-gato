/**
 * Payload required to create a new appointment in Google Calendar.
 * All datetime fields must follow the ISO 8601 format with a timezone offset.
 */
export interface CalendarEventDetails {
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
export interface GetAppointmentsDetails {
    /** Start of the time range (ISO 8601). */
    timeMin: string;
    /** End of the time range (ISO 8601). */
    timeMax: string;
    /** Maximum number of events to return. Must be >= 1. Defaults to 20. */
    maxResults: number;
}

