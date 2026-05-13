import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addHours } from "date-fns";


interface HourCellProps {
    hour: Date
}

export default function HourCell({ hour }: HourCellProps) {

    const startHour = format(hour, 'HH:mm');
    const endHour = format(addHours(hour, 2), 'HH:mm')

    return (
        <Dialog>
            <DialogTrigger asChild >
                <div
                    className="w-full h-20 border-b border-pink-50 cursor-pointer transition-colors hover:bg-pink-50/50 group relative"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-pink-200/50 m-1 pointer-events-none transition-opacity" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Has seleccionado el horario {startHour}-{endHour}</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}