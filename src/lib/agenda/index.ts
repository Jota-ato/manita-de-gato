'use server'
import { getAppointments } from '@/lib/calendar/service';
import { GoogleCalendarEventSchema, GoogleCalendarEvent } from "@/lib/calendar/schemas";
import { TZDate } from '@date-fns/tz';
import { createClient } from '../supabase/server';
import { startOfDay } from 'date-fns';
import { AppointmentSchema, Appointment } from '../supabase/schemas';

interface getEventsProps {
    timeMin: Date
    timeMax: Date
    maxResults?: number
}

export async function getEvents({ timeMin, timeMax, maxResults }: getEventsProps): Promise<(GoogleCalendarEvent)[]> {
    try {
        // Llamamos directamente al servicio de Google sin pasar por fetch
        const rawData = await getAppointments({
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            maxResults
        });

        // Validamos los datos con el Schema que ya tienes
        const appointments = rawData.map(event => {
            const result = GoogleCalendarEventSchema.safeParse(event);
            return result.success ? result.data : null;
        }).filter((item): item is GoogleCalendarEvent => item !== null);

        return appointments;
    } catch (error) {
        console.error("Error fetching events directly on server:", error);
        return [];
    }
}

export async function getEventsFromDay(day: TZDate): Promise<Appointment[]> {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("Appointments")
        .select('*')
        .gte('timeMin', startOfDay(day))
        .in('status', ['approved', 'paid']);

    if (error) { 
        console.error('Error consiguiendo las citas', error.message);
        return [];
    }

    return data.map(element => {
        const result = AppointmentSchema.safeParse(element);
        if (!result.error) return result.data;
    }).filter((element): element is Appointment => typeof element === 'object');
}