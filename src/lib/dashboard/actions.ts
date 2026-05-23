'use server';
import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { Appointment, AppointmentSchema, Client, ClientSchema } from "../supabase/schemas";
import { formatAppointmentDates, TIMEZONE } from "../supabase/utils/helpers";
import { revalidatePath } from "next/cache";
import { CalendarEventDetails } from "../calendar/types";
import { createAppointmentInGoogle } from "../calendar/service";


export async function getDayAppointments(day: TZDate) {
    const supabase = await createClient();

    const startOfDay = new TZDate(day, TIMEZONE);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new TZDate(day, TIMEZONE);
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
        .from('Appointments')
        .select('*')
        .gte('timeMin', startOfDay.toISOString())
        .lt('timeMin', endOfDay.toISOString());

    const appointments = (data ?? []).flatMap((appointment) => {
        const result = AppointmentSchema.safeParse(appointment);

        return result.success ? [formatAppointmentDates(result.data)] : [];
    }).sort((a, b) => new Date(a.timeMin).getTime() - new Date(b.timeMin).getTime());

    if (error) console.error('ERROR GETTING DAY APPOINTMENTS', error.message);
    return appointments;
}

export async function getClientById(id: string): Promise<Client | 'Cliente'> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('ERROR GETTING USER', error.message);
        return 'Cliente';
    }

    const validClient = ClientSchema.safeParse(data);

    if (!validClient.success) {
        console.error('ERROR PARSING CLIENT', validClient.error);
        return 'Cliente';
    }

    return validClient.data;
}
type UpdateAppointmentPayload = Partial<Omit<Appointment, 'id' | 'created_at'>>;

export type ActionResponse = {
    success: boolean;
    message: string;
    data?: unknown;
};

export async function updateAppointment(
    appointmentId: string,
    updates: UpdateAppointmentPayload
): Promise<ActionResponse> {
    try {
        const supabase = await createClient();

        // 1. Caso especial: Manejo del Calendario
        const requiereCalendario = Object.keys(updates).includes('status') &&
            (updates.status === 'approved' || updates.status === 'paid');

        if (requiereCalendario) {
            const calendarResponse = await createEventInCalendar(appointmentId);

            // Si el calendario falla, cortamos inmediatamente antes de modificar Supabase
            if (!calendarResponse.success) {
                return calendarResponse;
            }
        }

        const { error } = await supabase
            .from('Appointments')
            .update(updates)
            .eq('id', appointmentId);

        if (error) {
            return {
                success: false,
                message: `Error actualizando la cita: ${error.message}`
            };
        }

        revalidatePath('/dashboard');
        return {
            success: true,
            message: 'Cita actualizada con éxito.'
        };

    } catch (error: any) {
        console.error('Error crítico en updateAppointment:', error);
        return {
            success: false,
            message: 'Ocurrió un error inesperado al procesar la solicitud.'
        };
    }
}

export async function createEventInCalendar(appointmentId: string): Promise<ActionResponse> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('Appointments')
            .select('*')
            .eq('id', appointmentId)
            .single();

        if (error || !data) {
            return { success: false, message: 'No se encontró la cita en la base de datos.' };
        }

        const result = AppointmentSchema.safeParse(data);

        if (!result.success) {
            console.error('ERROR PARSING APPOINTMENT', result.error.message);
            return { success: false, message: 'Los datos de la cita están incompletos o son inválidos.' };
        }

        const appointment = result.data;


        if (appointment.google_event_id) {
            return { success: true, message: 'Esta cita ya tiene un evento en el calendario.' };
        }

        const client = await getClientById(appointment.client_id);
        if (client === 'Cliente') {
            return { success: false, message: 'No se pudo obtener la información del cliente.' };
        }

        const googleCalendarEvent: CalendarEventDetails = {
            clientName: `${client.name} ${client.last_name}`,
            startTime: new TZDate(appointment.timeMin, TIMEZONE).toISOString(),
            endTime: new TZDate(appointment.timeMax, TIMEZONE).toISOString(),
            serviceName: appointment.service_name_snapshot,
            phone: client.phone
        };

        const eventId = await createAppointmentInGoogle(googleCalendarEvent);

        if (!eventId) {
            throw new Error('Google Calendar no devolvió un ID de evento válido.');
        }

        await updateAppointment(appointmentId, {
            google_event_id: eventId
        });

        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Evento creado y sincronizado exitosamente.'
        };

    } catch (error: any) {
        console.error('CRITICAL ERROR CREATING CALENDAR EVENT:', error);
        return {
            success: false,
            message: error.message || 'Ocurrió un error inesperado al contactar con el calendario.'
        };
    }
}