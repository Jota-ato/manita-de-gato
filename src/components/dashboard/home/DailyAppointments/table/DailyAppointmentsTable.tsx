import { CardContent } from "@/components/ui/card";
import { Appointment } from "@/lib/supabase/schemas";
import NoDailyAppointments from "./NoDailyAppointments";
import { getServices } from "@/lib/form/service";
import DailyAppointmentRow from "../rows/DailyAppointmentRow";

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
                <ul>
                    {todayAppointments.map((apt) => (
                        <DailyAppointmentRow
                            key={apt.id}
                            apt={apt}
                            services={services}
                        />
                    ))}
                </ul>
            )}
        </CardContent>
    )
}