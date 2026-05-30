'use client';
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import DatePickerTime from "./DatePicker";
import { Separator } from "@/components/ui/separator";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";
import { useForm } from "react-hook-form";
import { AdminAppointmentForm, AdminAppointmentSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@/schemas/services";
import ServiceSelect from "@/components/agenda/AgendaBody/Form/ServiceSelect";
import { createAppointment } from "@/lib/form/service";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { TZDate } from "react-day-picker";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { Appointment } from "@/lib/supabase/schemas";
import { updateAppointment } from "@/lib/dashboard/actions";

interface NewApointmentFormProps {
    services: Service[]
    appointment?: Appointment
}

interface FieldsType {
    label: string
    id: keyof AdminAppointmentForm
}

const Fields: FieldsType[] = [
    {
        label: 'Nombre del cliente',
        id: 'name'
    },
    {
        label: 'Apellido del cliente',
        id: 'last_name'
    },
    {
        label: 'Teléfono',
        id: 'phone'
    },
    {
        label: 'Teléfono secundario',
        id: 'secondary_phone'
    },
]

export default function NewApointmentForm({ services, appointment }: NewApointmentFormProps) {

    const isEditing = typeof appointment === 'undefined';
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AdminAppointmentForm>({
        resolver: zodResolver(AdminAppointmentSchema),
        defaultValues: {
            name: '',
            last_name: '',
            phone: '',
            secondary_phone: '',
            serviceId: '',
            timeMin: '10:00',
            timeMax: '12:00'
        }
    });

    const onValidSubmit = async (formData: AdminAppointmentForm) => {
        const [startHours, startMinutes] = formData.timeMin.split(':').map(Number);
        const [endHours, endMinutes] = formData.timeMax.split(':').map(Number);

        const timeMin = new TZDate(formData.date, TIMEZONE);
        timeMin.setHours(startHours, startMinutes, 0, 0);

        const timeMax = new TZDate(formData.date, TIMEZONE);
        timeMax.setHours(endHours, endMinutes, 0, 0);

        const payload = {
            name: formData.name,
            last_name: formData.last_name,
            phone: formData.phone,
            secondary_phone: formData.secondary_phone,
            serviceId: formData.serviceId,
            timeMin,
            timeMax
        };

        if (isEditing) {
            const response = await createAppointment(payload);

            if (response.success) {
                toast.success(response.message);
                reset();
            } else {
                toast.error(response.message);
            }
        } else {
            const response = await updateAppointment(appointment.id, payload);

            if (response.success) {
                toast.success(response.message);
                reset();
            } else {
                toast.error(response.message);
            }
        }

    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet>
                <DatePickerTime
                    control={control}
                    nameDate="date"
                    nameStartTime="timeMin"
                    nameEndTime="timeMax"
                    startError={errors.timeMin?.message}
                    endError={errors.timeMax?.message}
                />
                <Separator />
                <FieldGroup>
                    {Fields.map(field => (
                        <FieldWLabel
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            error={errors[field.id]?.message}
                            {...register(field.id)}
                        />
                    ))}
                    <ServiceSelect
                        control={control}
                        name="serviceId"
                        error={errors.serviceId?.message}
                        services={services}
                    />
                </FieldGroup>
                <Button
                    type="submit"
                >
                    {isSubmitting ? <p className="flex items-center gap-2"><Spinner />Creando...</p> : 'Crear'}
                </Button>
            </FieldSet>
        </form>
    )
}





