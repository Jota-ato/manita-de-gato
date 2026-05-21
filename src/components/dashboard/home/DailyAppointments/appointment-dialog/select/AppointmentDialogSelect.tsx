'use client';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
    SelectGroup
} from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import { updateAppointmentStatus } from "@/lib/dashboard/actions";
import { Appointment, AppointmentStatus } from "@/lib/supabase/schemas";
import { useState, useTransition } from "react";

const statusMap: AppointmentStatus[] = [
    'approved',
    'cancelled',
    'no_show',
    'paid',
    'pending',
];

const isValidStatus = (value: string): value is AppointmentStatus =>
    statusMap.includes(value as AppointmentStatus);

export default function AppointmentDialogSelect({ apt }: { apt: Appointment }) {

    const [status, setStatus] = useState(apt.status);
    const [isPending, startTransition] = useTransition();

    function handleStatusChange(value: string) {
        if (!isValidStatus(value)) return;

        const previous = status;
        setStatus(value);    

        startTransition(async () => {
            try {
                await updateAppointmentStatus(apt.id, value);
            } catch {
                setStatus(previous);
            }
        });
    }

    return (
        <Select value={status} onValueChange={handleStatusChange} disabled={isPending}>
            <SelectTrigger  className="w-fit border-none shadow-none focus:ring-0">
                <SelectValue>
                    <StatusBadge status={status} />
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {statusMap.map((status, i) => (
                        <SelectItem
                            key={i}
                            value={status}
                        >
                            <StatusBadge
                                status={status}
                            />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}