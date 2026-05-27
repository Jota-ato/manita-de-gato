'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format, addHours, addDays } from "date-fns";
import Form from "./Form/Form";
import { useState } from "react";

interface HourCellProps {
    hour: Date
    dayDifference: number
}

export default function HourCell({ hour, dayDifference }: HourCellProps) {

    const [open, setOpen] = useState(false);
    const startHour = format(hour, 'HH:mm');
    const endHour = format(addHours(hour, 2), 'HH:mm');

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div
                    className="w-full h-20 border-b border-accent-foreground cursor-pointer transition-colors hover:bg-background/50 group relative"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-accent-foreground m-1 pointer-events-none transition-opacity" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Has seleccionado el horario {startHour}-{endHour}</DialogTitle>
                    <DialogDescription>Ayúdanos a contactarte</DialogDescription>
                </DialogHeader>
                <Form
                    hour={addDays(hour, dayDifference)}
                    onSuccess={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}