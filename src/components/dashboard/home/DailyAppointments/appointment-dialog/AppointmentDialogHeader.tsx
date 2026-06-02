import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import ActionModal from "../../QuickActions/ActionModal";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import { Appointment } from "@/lib/supabase/schemas";
import NewApointmentForm from "../../QuickActions/Forms/NewApointmentForm";
import { Service } from "@/schemas/services";

interface AppointmentDialogHeaderProps {
    appointment: Appointment
    services: Service[]
}

export default function AppointmentDialogHeader({ appointment, services }: AppointmentDialogHeaderProps) {
    return (
        <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                Detalles de la cita
                <ActionModal
                    trigger={
                        <Button size='icon' variant='ghost'>
                            <PenBoxIcon />
                        </Button>
                    }
                    title="Editar cita"
                    description={`Cita de ${appointment.client_name_snapshot}`}
                >
                    <NewApointmentForm
                        appointment={appointment}
                        services={services}
                    />
                </ActionModal>
            </DialogTitle>
            <DialogDescription className="sr-only">
                Detalles importantes
            </DialogDescription>
        </DialogHeader>
    )
}