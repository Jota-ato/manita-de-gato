'use client';
import { Sparkles, User } from "lucide-react";

interface AppointmentDetailsProps {
    serviceName: string
    clientName: string
}

export default function AppointmentDetails({ serviceName, clientName }: AppointmentDetailsProps) {

    return (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h3 className="flex items-center gap-1">
                <User className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium  capitalize text-accent-foreground">{clientName}</span>
            </h3>
            <div className="flex items-center gap-1">
                <Sparkles className="size-3.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                    Servicio <span className="text-accent-foreground">{serviceName}</span>
                </p>
            </div>
        </div>
    )
}