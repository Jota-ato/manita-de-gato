import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    CardContent
} from "@/components/ui/card";
import { AppointmentSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { format, isSameDay } from "date-fns";
import { es } from 'date-fns/locale';

export default async function BentoContainer() {

    const today = new Date();
    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es }
    );

    const supabase = await createClient();

    const { data, error } = await supabase.
        from('Appointments')
        .select('*')

    const appointments = (data ?? []).flatMap((appointment) => {
        const result = AppointmentSchema.safeParse(appointment);

        return result.success ? [result.data] : [];
    });

    const todayAppointments = appointments.filter((appointment) => isSameDay(appointment.timeMin, today));

    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <div className="w-[90%] max-w-480 grid md:grid-cols-2 gap-6">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Citas del día</CardTitle>
                    <CardDescription>Todas las citas agendadas para hoy</CardDescription>
                </CardHeader>
                <CardContent>
                    {JSON.stringify(todayAppointments)}
                </CardContent>
                <CardFooter className="text-muted-foreground">
                    {capitalizedDate}
                </CardFooter>
            </Card>
            <Card>
                1 columna
            </Card>
            <Card>
                1 columna
            </Card>
        </div>
    )
}