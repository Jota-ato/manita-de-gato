'use client';

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Appointment, Client } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import TimeLine from "./TimeLine";
import { Separator } from "@/components/ui/separator";
import AppointmentDetails from "./AppointmentDetails";
import StatusBadge from "./StatusBadge";
import AppointmentInfoDialog from "./AppointmentInfoDialog";


interface AppointmentRowClientProps {
    apt: Appointment;
    client: Client | 'Cliente';
    services: Service[];
}

export default function AppointmentRowClient({ apt, client, services }: AppointmentRowClientProps) {
    const [open, setOpen] = useState(false);

    const serviceName = services.find(s => s.id === apt.service_id)?.name ?? 'Servicio sin nombre';
    const clientName = client !== 'Cliente' ? client.name : client;

    return (
        <>
            <li
                onClick={() => setOpen(true)}
                className="flex flex-col md:flex-row items-center md:gap-4 gap-2 px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
                <TimeLine apt={apt} />
                <Separator orientation="vertical" />
                <AppointmentDetails serviceName={serviceName} clientName={clientName} />
                <StatusBadge status={apt.status} />
            </li>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalles de la cita</DialogTitle>
                        <DialogDescription>
                            Detalles importantes
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <AppointmentInfoDialog
                        apt={apt}
                        serviceName={serviceName}
                        clientName={clientName}
                    />
                </DialogContent>
            </Dialog >
        </>
    );
}