import { Card, CardFooter } from "@/components/ui/card";
import DailyAppointmentsHeader from "./DailyAppointmentsHeader";
import DailyAppointmentsTable from "./table/DailyAppointmentsTable";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
const TIMEZONE = "America/Mexico_City";
import { TZDate, tz } from "@date-fns/tz";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/supabase/schemas";

interface DailyAppointmentsProps { 
    today: TZDate,
    todayAppointments: Appointment[]
}

export default async function DailyAppointments({ today, todayAppointments }: DailyAppointmentsProps) {

    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es, in: tz(TIMEZONE) }
    );

    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <Card className="md:col-span-3">
            <DailyAppointmentsHeader
                capitalizedDate={capitalizedDate}
                appointmentNumber={todayAppointments.length}
            />
            <DailyAppointmentsTable
                todayAppointments={todayAppointments}
            />
            <CardFooter>
                <Button>Crear nueva cita</Button>
            </CardFooter>
        </Card>
    )
}