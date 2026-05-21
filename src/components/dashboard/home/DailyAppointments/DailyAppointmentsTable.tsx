import { CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { Appointment } from "@/lib/supabase/schemas";
import NoDailyAppointments from "./NoDailyAppointments";
import TimeLine from "./TimeLine";
import { Separator } from "@/components/ui/separator";
import AppointmentDetails from "./AppointmentDetails";
import { getServices } from "@/lib/form/service";


interface DailyAppointmentsTableProps {
    todayAppointments: Appointment[]
}

export default async function DailyAppointmentsTable({ todayAppointments }: DailyAppointmentsTableProps) {

    const services = await getServices();

    return (
        <CardContent className="p-0">
            {todayAppointments.length === 0 ? (
                <NoDailyAppointments />
            ) : (
                <ul className="divide-y divide-border">
                    {todayAppointments.map((apt) => (
                        <li
                            key={apt.id}
                            className="flex flex-col md:flex-row items-center md:gap-4 gap-2 px-6 py-4 hover:bg-muted/50 transition-colors"
                        >
                            {/* Franja de tiempo */}
                            <TimeLine apt={apt} />

                            {/* Separador vertical */}
                            <Separator orientation="vertical" />

                            {/* Info de la cita */}
                            <AppointmentDetails
                                apt={apt}
                                services={services}
                            />

                            {/* Badge de duración */}
                            <StatusBadge status={apt.status} />
                        </li>
                    ))}
                </ul>
            )}
        </CardContent>
    )
}