import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function AppointmentDialogHeader() {
    return (
        <DialogHeader>
            <DialogTitle>Detalles de la cita</DialogTitle>
            <DialogDescription className="sr-only">
                Detalles importantes
            </DialogDescription>
        </DialogHeader>
    )
}