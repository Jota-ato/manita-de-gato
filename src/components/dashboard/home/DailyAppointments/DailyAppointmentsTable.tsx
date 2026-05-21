import { CardContent } from "@/components/ui/card";
import DurationBadge from "./DurationBadge";
import { Appointment } from "@/lib/supabase/schemas";
import NoDailyAppointments from "./NoDailyAppointments";
import TimeLine from "./TimeLine";
import { Separator } from "@/components/ui/separator";
import AppointmentDetails from "./AppointmentDetails";

interface DailyAppointmentsTableProps {
    todayAppointments: Appointment[]
}

export default async function DailyAppointmentsTable({ todayAppointments }: DailyAppointmentsTableProps) {

    return (
        <CardContent className="p-0">
            {todayAppointments.length === 0 ? (
                <NoDailyAppointments />
            ) : (
                <ul className="divide-y divide-border">
                    {todayAppointments.map((apt) => (
                        <li
                            key={apt.id}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                        >
                            {/* Franja de tiempo */}
                            <TimeLine apt={apt}/>

                            {/* Separador vertical */}
                            <Separator orientation="vertical" />

                            {/* Info de la cita */}
                            <AppointmentDetails apt={apt}/>

                            {/* Badge de duración */}
                            <DurationBadge timeMin={apt.timeMin} timeMax={apt.timeMax} />
                        </li>
                    ))}
                </ul>
            )}
        </CardContent>
    )
}