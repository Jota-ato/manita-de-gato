'use client'
import { CalendarCheck } from "lucide-react";
import { Appointment } from "@/lib/supabase/schemas";
import { Separator } from "@/components/ui/separator";
import AppointmentDialogDetails from "./AppointmentDialogDetails";
import AppointmentDialogSelect from "./fields/AppointmentDialogSelect";
import AppointmentDialogInput from "./fields/AppointmentDialogInput";

interface AppointmentInfoDialogProps {
    apt: Appointment,
    clientName: string
    serviceName: string
}

export default function AppointmentInfoDialog({ apt, clientName, serviceName }: AppointmentInfoDialogProps) {
    return (
        <div className="flex flex-col gap-3 text-sm">
            <AppointmentDialogDetails
                apt={apt}
                clientName={clientName}
                serviceName={serviceName}
            />
            <Separator />
            <li className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2">
                    <CalendarCheck className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Modificar estado</span>
                </p>
                <AppointmentDialogSelect
                    apt={apt}
                />
            </li>
            <AppointmentDialogInput
                apt={apt}
            />
        </div>
    )
}