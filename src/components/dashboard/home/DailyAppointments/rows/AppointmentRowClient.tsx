'use client';

import { useState } from "react";
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { Appointment, Client } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import TimeLine from "@/components/ui/TimeLine";
import { Separator } from "@/components/ui/separator";
import AppointmentDetails from "./AppointmentDetails";
import StatusBadge from "@/components/ui/StatusBadge";
import AppointmentInfoDialog from "../appointment-dialog/AppointmentInfoDialog";
import AppointmentDialogHeader from "../appointment-dialog/AppointmentDialogHeader";


interface AppointmentRowClientProps {
    apt: Appointment;
    client: Client | 'Cliente';
    services: Service[];
}

export default function AppointmentRowClient({ apt, client, services }: AppointmentRowClientProps) {
    const [open, setOpen] = useState(false);

    const serviceName = services.find(s => s.id === apt.service_id)?.name ?? 'Servicio sin nombre';
    const clientName = client !== 'Cliente' ? `${client.name} ${client.last_name}`: client;

    return (
        <>
            <li
                onClick={() => setOpen(true)}
                className="flex items-center md:gap-4 gap-2 px-4 py-4 hover:bg-muted/50 transition-colors cursor-pointer border-y-border border-b first-of-type:border-t"
            >
                <TimeLine apt={apt} />
                <Separator orientation="vertical" />
                <AppointmentDetails serviceName={serviceName} clientName={clientName} />
                <StatusBadge status={apt.status} />
            </li>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <AppointmentDialogHeader />
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