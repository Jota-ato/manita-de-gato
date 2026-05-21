import StatusBadge from "@/components/ui/StatusBadge";
import { Appointment } from "@/lib/supabase/schemas";
import { format } from "date-fns";
import { CalendarCheck, Clock, Sparkles, User } from "lucide-react";

interface AppointmentDialogDetailsProps { 
    apt: Appointment
    clientName: string
    serviceName: string
}

export default function AppointmentDialogDetails({ apt, clientName, serviceName } : AppointmentDialogDetailsProps) {
    return (
        <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Cliente</span>
                <span className="ml-auto font-medium capitalize">{clientName}</span>
            </li>
            <li className="flex items-center gap-2">
                <Sparkles className="size-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Servicio</span>
                <span className="ml-auto font-medium">{serviceName}</span>
            </li>
            <li className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Horario</span>
                <span className="ml-auto font-medium tabular-nums">
                    {format(apt.timeMin, 'HH:mm')} – {format(apt.timeMax, 'HH:mm')}
                </span>
            </li>
            <li className="flex items-center gap-2">
                <CalendarCheck className="size-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Estado</span>
                <span className="ml-auto">
                    <StatusBadge status={apt.status} />
                </span>
            </li>
        </ul>
    )
}