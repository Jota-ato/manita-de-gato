import { Card, CardFooter } from "@/components/ui/card";
import DailyAppointmentsHeader from "./DailyAppointmentsHeader";
import DailyAppointmentsTable from "./table/DailyAppointmentsTable";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
const TIMEZONE = "America/Mexico_City";
import { TZDate, tz } from "@date-fns/tz";
import { getDayAppointments } from "@/lib/dashboard/actions";
import { Button } from "@/components/ui/button";


export default async function DailyAppointments() {

    const today = new TZDate(new Date(), TIMEZONE);

    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es, in: tz(TIMEZONE) }
    );

    const todayAppointments = await getDayAppointments(today);
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <Card className="col-span-2">
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