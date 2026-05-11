'use server'
import { getAppointments } from '@/lib/calendar/service';
import { AppointmentSchema, Appointment } from "@/lib/calendar/schemas";

interface getEventsProps {
    timeMin: Date
    timeMax: Date
    maxResults?: number
}

export async function getEvents({ timeMin, timeMax, maxResults }: getEventsProps): Promise<(Appointment)[]> {
    try {
        // Llamamos directamente al servicio de Google sin pasar por fetch
        const rawData = await getAppointments({
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            maxResults
        });

        // Validamos los datos con el Schema que ya tienes
        const appointments = rawData.map(event => {
            const result = AppointmentSchema.safeParse(event);
            return result.success ? result.data : null;
        }).filter((item): item is Appointment => item !== null);

        return appointments;
    } catch (error) {
        console.error("Error fetching events directly on server:", error);
        return [];
    }
}