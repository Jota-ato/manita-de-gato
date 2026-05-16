'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format, addHours } from "date-fns";
import Form from "./Form/Form";

interface HourCellProps {
    hour: Date
}

export default function HourCell({ hour }: HourCellProps) {

    const startHour = format(hour, 'HH:mm');
    const endHour = format(addHours(hour, 2), 'HH:mm');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="w-full h-20 border-b border-pink-50 cursor-pointer transition-colors hover:bg-pink-50/50 group relative"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-pink-200/50 m-1 pointer-events-none transition-opacity" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Has seleccionado el horario {startHour}-{endHour}</DialogTitle>
                    <DialogDescription>Ayúdanos a contactarte</DialogDescription>
                </DialogHeader>
                <Form />
            </DialogContent>
        </Dialog>
    )
}