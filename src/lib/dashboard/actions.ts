import { createClient } from "@/lib/supabase/server";
import { TZDate } from "@date-fns/tz";
import { AppointmentSchema } from "../supabase/schemas";
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
    console.log(data);
    console.log(`El inicio del día es: ${startOfDay}, el fin del día es: ${endOfDay}`)

    const appointments = (data ?? []).flatMap((appointment) => {
        const result = AppointmentSchema.safeParse(appointment);

        return result.success ? [formatAppointmentDates(result.data)] : [];
    });

    if (error) console.error('ERROR GETTING DAY APPOINTMENTS', error.message);
    console.log(appointments);
    return appointments;
}