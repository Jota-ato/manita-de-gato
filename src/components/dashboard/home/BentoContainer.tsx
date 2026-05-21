import {
    Card,
} from "@/components/ui/card";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

import { TZDate, tz } from "@date-fns/tz";

const TIMEZONE = "America/Mexico_City";
import DailyAppointmentsHeader from "./DailyAppointments/DailyAppointmentsHeader";
import DailyAppointmentsTable from "./DailyAppointments/DailyAppointmentsTable";
import { getDayAppointments } from "@/lib/dashboard/actions";

export default async function BentoContainer() {

    const today = new TZDate(new Date(), TIMEZONE);

    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es, in: tz(TIMEZONE) }
    );

    const todayAppointments = await getDayAppointments(today);
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <div className="w-[90%] max-w-480 grid md:grid-cols-2 gap-6">
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
            <Card>
                1 columna
            </Card>
            <Card>
                1 columna
            </Card>
        </div>
    )
}