import { Card } from "@/components/ui/card";
import DailyAppointmentsHeader from "./DailyAppointmentsHeader";
import DailyAppointmentsTable from "./DailyAppointmentsTable";

import { format } from "date-fns";
import { es } from 'date-fns/locale';
const TIMEZONE = "America/Mexico_City";
import { TZDate, tz } from "@date-fns/tz";
import { getDayAppointments } from "@/lib/dashboard/actions";


export default async function DailyAppointments() {

    const today = new TZDate(new Date(), TIMEZONE);
    console.log(today);

    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es, in: tz(TIMEZONE) }
    );

    const todayAppointments = await getDayAppointments(today);
    console.log(todayAppointments);
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <Card className="col-span-2">
            <DailyAppointmentsHeader
                capitalizedDate={capitalizedDate}
                appointmentNumber={todayAppointments.length}
            />
            <DailyAppointmentsTable
                todayAppointments={todayAppointments}
                TIMEZONE={TIMEZONE}
            />
        </Card>
    )
}