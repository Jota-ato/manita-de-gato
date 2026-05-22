'use server';
import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { Appointment, AppointmentSchema, Client, ClientSchema } from "../supabase/schemas";
import { formatAppointmentDates, TIMEZONE } from "../supabase/utils/helpers";
import { revalidatePath } from "next/cache";


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

export async function updateAppointment(
    appointmentId: string,
    updates: UpdateAppointmentPayload // <--- Magia de TS aquí
): Promise<void> {
    const supabase = await createClient();

    // 3. Pasamos el objeto de actualizaciones completo a Supabase.
    // Supabase es lo suficientemente inteligente para mapear las llaves de este objeto
    // a las columnas de SQL correspondientes.
    const { error } = await supabase
        .from('Appointments')
        .update(updates)
        .eq('id', appointmentId);

    if (error) {
        // En una app de producción, aquí podrías mapear el error de Supabase
        // a un error de dominio específico o enviarlo a Sentry.
        throw new Error(`Error actualizando la cita: ${error.message}`);
    }

    revalidatePath('/dashboard');
}