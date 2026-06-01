import { CardContent } from "@/components/ui/card";
import { Appointment } from "@/lib/supabase/schemas";
import NoDailyAppointments from "./NoDailyAppointments";
import { getServices } from "@/lib/form/service";
import DailyAppointmentRow from "../rows/DailyAppointmentRow";

interface DailyAppointmentsTableProps {
    appointments: Appointment[]
}

export default async function AppointmentsTable({ appointments }: DailyAppointmentsTableProps) {

    const services = await getServices();

    return (
        <CardContent className="p-0 max-h-60 overflow-y-scroll">
            {appointments.length === 0 ? (
                <NoDailyAppointments />
            ) : (
                <ul>
                    {appointments.map((apt) => (
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