import { getClientById } from "@/lib/dashboard/actions";
import { getServices } from "@/lib/form/service";
import { Appointment } from "@/lib/supabase/schemas";
import { Sparkles, User } from "lucide-react";

export default async function AppointmentDetails({ apt }: { apt: Appointment }) {

    const services = await getServices();

    const serviceName = services.find(service => service.id === apt.service_id)?.name;
    const client = await getClientById(apt.client_id);

    
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