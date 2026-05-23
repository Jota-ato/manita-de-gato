import type { CalendarEventDetails } from './types';
import { getCalendarClient } from './client';
import { calendar_v3 } from "googleapis";
import { getCurrentWeekRange } from './helpers';

/**
 * Creates a new event in Google Calendar based on the provided appointment details.
 *
 * @param appointmentDetails - The appointment data used to create the calendar event.
 * @returns A promise that resolves to the Google Calendar event ID of the created event.
 * @throws {Error} If the Google Calendar API does not return an event ID.
 */
export async function createAppointmentInGoogle(
    appointmentDetails: CalendarEventDetails
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
export async function getAppointments({
    timeMin = getCurrentWeekRange().weekStart,
    timeMax = getCurrentWeekRange().weekEnd,
    maxResults,
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

export async function deleteGoogleCalendarEvent(eventId: string) {
    try {
        const calendar = getCalendarClient();
        await calendar.events.delete({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            eventId: eventId,
        });

        return { success: true };
    } catch (error: any) {
        if (error.code === 404 || error.code === 410) {
            console.warn(`El evento ${eventId} ya había sido eliminado manualmente en Google Calendar.`);
            return { success: true };
        }

        // Si es un error real (ej. credenciales inválidas, sin internet, etc.)
        console.error('Error genuino en la API de Google:', error);
        return { success: false, message: error.message };
    }
}

// En tu archivo ../calendar/service.ts

export async function checkGoogleEventExists(eventId: string): Promise<boolean> {
    try {
        const calendar = getCalendarClient()
        await calendar.events.get({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            eventId: eventId,
        });
        return true;
    } catch (error: any) {
        if (error.code === 404 || error.code === 410) {
            return false;
        }
        throw error;
    }
}