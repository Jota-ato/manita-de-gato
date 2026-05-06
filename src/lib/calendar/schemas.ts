import { z } from 'zod';

/**
 * Zod schema for a single appointment event as returned by the Google Calendar API.
 *
 * Maps a subset of the `calendar_v3.Schema$Event` shape, containing only
 * the fields relevant to this application.
 *
 * Use `AppointmentSchema.safeParse()` to validate unknown data at runtime.
 * Use `z.infer<typeof AppointmentSchema>` to derive the static TypeScript type.
 *
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events#resource Google Calendar Event Resource}
 */
export const AppointmentSchema = z.object({
    id: z.string()
        .describe("Unique identifier of the calendar event, assigned by Google Calendar."),

    summary: z.string()
        .describe("Title of the event as displayed in the calendar."),

    creator: z.object({
        email: z.email()
            .describe("Email address of the event creator."),
        self: z.boolean()
            .describe("Whether the creator is the owner of the calendar. True when the authenticated service account created the event."),
    }).describe("Information about who created the event."),

    start: z.object({
        dateTime: z.iso.datetime({ offset: true })
            .describe("Start datetime in ISO 8601 format. e.g. '2026-05-04T10:00:00-06:00'"),
        timeZone: z.string()
            .describe("IANA timezone identifier. e.g. 'America/Mexico_City'"),
    }).describe("Start time of the event."),

    end: z.object({
        dateTime: z.iso.datetime({ offset: true })
            .describe("End datetime in ISO 8601 format. e.g. '2026-05-04T11:00:00-06:00'"),
        timeZone: z.string()
            .describe("IANA timezone identifier. e.g. 'America/Mexico_City'"),
    }).describe("End time of the event."),
});

/**
 * TypeScript type derived from {@link AppointmentSchema}.
 * Prefer this over defining the type manually to keep schema and type in sync.
 */
export type Appointment = z.infer<typeof AppointmentSchema>;
