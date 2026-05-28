'use client';
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import DatePickerTime from "./DatePicker";
import { Separator } from "@/components/ui/separator";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";
import { useForm } from "react-hook-form";
import { AdminAppointmentFormData, AdminAppointmentSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";


export default function NewApointmentForm() {

    const timeMin = new Date()
    timeMin.setHours(10, 0, 0, 0);
    const timeMax = new Date()
    timeMax.setHours(12, 0, 0, 0);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<AdminAppointmentFormData>({
        resolver: zodResolver(AdminAppointmentSchema),
        defaultValues: {
            name: '',
            last_name: '',
            phone: '',
            secondary_phone: '',
            serviceId: '',
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString()
        }
    });

    const onValidSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet>
                <DatePickerTime />
                <Separator />
                <FieldGroup>
                    <FieldWLabel
                        label="Nombre del cliente"
                    />
                </FieldGroup>
                <Button>
                    Crear
                </Button>
            </FieldSet>
        </form>
    )
}





