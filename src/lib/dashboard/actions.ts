'use server';

import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { Appointment, AppointmentSchema, Client, ClientSchema } from "../supabase/schemas";
import { formatAppointmentDates, TIMEZONE } from "../supabase/utils/helpers";
import { revalidatePath } from "next/cache";
import { CalendarEventDetails } from "../calendar/types";
import { checkGoogleEventExists, createAppointmentInGoogle, deleteGoogleCalendarEvent } from "../calendar/service";

export type ActionResponse = {
    success: boolean;
    message: string;
    data?: unknown;
};

type UpdateAppointmentPayload = Partial<Omit<Appointment, 'id' | 'created_at'>>;

async function getValidAppointment(appointmentId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

    if (error || !data) {
        return { success: false, error: 'No se encontró la cita en la base de datos.', data: null };
    }

    const result = AppointmentSchema.safeParse(data);

    if (!result.success) {
        console.error('ERROR PARSING APPOINTMENT', result.error.message);
        return { success: false, error: 'Los datos de la cita están incompletos o son inválidos.', data: null };
    }

    return { success: true, error: null, data: result.data };
}


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
        .lte('timeMin', endOfDay.toISOString())

    if (error) {
        console.error('ERROR GETTING DAY APPOINTMENTS', error.message);
    }

    return (data ?? [])
        .flatMap((appointment) => {
            const result = AppointmentSchema.safeParse(appointment);
            return result.success ? [formatAppointmentDates(result.data)] : [];
        })
        .sort((a, b) => new Date(a.timeMin).getTime() - new Date(b.timeMin).getTime());
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


export async function updateAppointment(
    appointmentId: string,
    updates: UpdateAppointmentPayload
): Promise<ActionResponse> {
    try {
        const supabase = await createClient();
        let message = 'Cita actualizada con éxito.';

        const requiereCalendario = Object.keys(updates).includes('status');
        const requiereCreateEvent = updates.status === 'approved' || updates.status === 'paid';

        if (requiereCalendario) {
            if (requiereCreateEvent) {
                const calendarResponse = await createEventInCalendar(appointmentId);
                if (!calendarResponse.success) return calendarResponse;

                message = `${calendarResponse.message} ${message}`;
            } else {
                const calendarResponse = await deleteEventInCalendar(appointmentId);
                if (!calendarResponse.success) return calendarResponse;
                message = `${calendarResponse.message} ${message}`;
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
        return { success: true, message };

    } catch (error) {
        console.error('Error crítico en updateAppointment:', error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado al procesar la solicitud.'
        };
    }
}

export async function createEventInCalendar(appointmentId: string): Promise<ActionResponse> {
    try {
        const { success: valid, error, data: appointment } = await getValidAppointment(appointmentId);
        if (!valid || !appointment) return { success: false, message: error! };

        if (appointment.google_event_id) {
            const eventExist = await checkGoogleEventExists(appointment.google_event_id);

            if (eventExist) {
                return { success: true, message: 'El evento ya existe en el calendario.' };
            }
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

        const supabase = await createClient();
        await supabase
            .from('Appointments')
            .update({ google_event_id: eventId })
            .eq('id', appointmentId);

        revalidatePath('/dashboard');
        return { success: true, message: 'Evento sincronizado exitosamente.' };

    } catch (error) {
        console.error('CRITICAL ERROR CREATING CALENDAR EVENT:', error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado al contactar con el calendario.'
        };
    }
}


export async function deleteEventInCalendar(appointmentId: string): Promise<ActionResponse> {
    try {
        const { success: valid, error, data: appointment } = await getValidAppointment(appointmentId);
        if (!valid || !appointment) return { success: false, message: error! };

        if (!appointment.google_event_id) {
            return { success: true, message: 'El evento no estaba en el calendario, no se requirió acción.' };
        }

        const calendarResult = await deleteGoogleCalendarEvent(appointment.google_event_id);

        if (!calendarResult || !calendarResult.success) {
            return { success: false, message: 'Error eliminando el evento de Google Calendar.' };
        }

        const supabase = await createClient();
        const { error: updateError } = await supabase
            .from('Appointments')
            .update({ google_event_id: null })
            .eq('id', appointmentId);

        if (updateError) {
            return { success: false, message: 'Evento eliminado del calendario, pero falló al actualizar la base de datos.' };
        }

        revalidatePath('/dashboard');
        return { success: true, message: 'La cita ha sido eliminada del calendario.' };

    } catch (error) {
        console.error('CRITICAL ERROR DELETING CALENDAR EVENT:', error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado al intentar eliminar el evento.'
        };
    }
}