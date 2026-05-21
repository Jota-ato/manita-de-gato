import TimeLine from "./TimeLine";
import { Separator } from "@/components/ui/separator";
import AppointmentDetails from "./AppointmentDetails";
import StatusBadge from "./StatusBadge";
import { Appointment } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import { getClientById } from "@/lib/dashboard/actions";


interface DailyAppointmentRowProps {
    apt: Appointment,
    services: Service[]
}

export default async function DailyAppointmentRow({ apt, services }: DailyAppointmentRowProps) {

    const client = await getClientById(apt.client_id);

    return (
        <li
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
                client={client}
            />

            {/* Badge de duración */}
            <StatusBadge status={apt.status} />
        </li>
    )
}