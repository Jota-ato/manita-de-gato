import { getClientById } from "@/lib/dashboard/actions";
import { Appointment } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import { Sparkles, User } from "lucide-react";

interface AppointmentDetailsProps {
    apt: Appointment,
    services: Service[]
}

export default async function AppointmentDetails({ apt, services }: AppointmentDetailsProps) {


    const client = await getClientById(apt.client_id);
    const serviceName = services.find(service => service.id === apt.service_id)?.name;

    return (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h3 className="flex items-center gap-1">
                <User className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium truncate capitalize">{client !== 'Usuario' ? client.name : client}</span>
            </h3>
            <div className="flex items-center gap-1">
                <Sparkles className="size-3.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                    Servicio <span className="text-black">{serviceName}</span>
                </p>
            </div>
        </div>
    )
}