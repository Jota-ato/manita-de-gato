'use server';
import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { AppointmentSchema, AppointmentStatus, Client, ClientSchema } from "../supabase/schemas";
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

export async function updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus
): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('Appointments')
        .update({ status })
        .eq('id', appointmentId);

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
}