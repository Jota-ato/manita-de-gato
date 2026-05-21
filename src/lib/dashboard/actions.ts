import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { AppointmentSchema, Client, ClientSchema } from "../supabase/schemas";
import { formatAppointmentDates, TIMEZONE } from "../supabase/utils/helpers";


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

export async function getClientById(id: string): Promise<Client | 'Usuario'> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('ERROR GETTING USER', error.message);
        return 'Usuario';
    }

    const validClient = ClientSchema.safeParse(data);

    if (!validClient.success) {
        console.error('ERROR PARSING CLIENT', validClient.error);
        return 'Usuario';
    }

    return validClient.data;
}