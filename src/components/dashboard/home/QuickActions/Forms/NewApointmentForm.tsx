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
import { TZDate } from "react-day-picker"; // O "@date-fns/tz" dependiendo de tu versión
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { Appointment } from "@/lib/supabase/schemas";
import { updateAppointment } from "@/lib/dashboard/actions";
import { format } from "date-fns"; // 👈 Importante para la hidratación inversa

interface NewApointmentFormProps {
    services: Service[]
    appointment?: Appointment
}

interface FieldsType {
    label: string
    id: keyof AdminAppointmentForm
}

const Fields: FieldsType[] = [
    { label: 'Nombre del cliente', id: 'name' },
    { label: 'Apellido del cliente', id: 'last_name' },
    { label: 'Teléfono', id: 'phone' },
    { label: 'Teléfono secundario', id: 'secondary_phone' },
]

export default function NewApointmentForm({ services, appointment }: NewApointmentFormProps) {

    // 1. Corregimos el booleano: Es edición si 'appointment' SÍ existe
    const isEditing = !!appointment;

    // 2. Hidratación Inversa de Fechas
    const defaultDate = isEditing ? new Date(appointment.timeMin) : new Date();
    const defaultStartHour = isEditing ? format(new Date(appointment.timeMin), 'HH:mm') : '10:00';
    const defaultEndHour = isEditing ? format(new Date(appointment.timeMax), 'HH:mm') : '12:00';

    // 3. Hidratación Inversa del Cliente
    // Hacemos un cast temporal a 'any' por si tu type Appointment no tiene tipado el JOIN de clients
    const appointmentData = appointment as Appointment;
    const defaultName = isEditing ? (appointmentData.clients?.name || appointmentData.client_name_snapshot || '') : '';
    const defaultLastName = isEditing ? (appointmentData.clients?.last_name || appointmentData.client_last_name_snapshot || '') : '';
    const defaultPhone = isEditing ? (appointmentData.clients?.phone || '') : '';
    const defaultSecPhone = isEditing ? (appointmentData.clients?.secondary_phone || '') : '';
    const defaultService = isEditing ? String(appointment.service_id) : '';

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AdminAppointmentForm>({
        resolver: zodResolver(AdminAppointmentSchema),
        defaultValues: {
            name: defaultName,
            last_name: defaultLastName,
            phone: defaultPhone,
            secondary_phone: defaultSecPhone,
            serviceId: defaultService,
            date: defaultDate,
            timeMin: defaultStartHour,
            timeMax: defaultEndHour
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

        // 4. Bifurcación correcta de la lógica
        if (isEditing) {
            const response = await updateAppointment(appointment.id, payload);

            if (response.success) {
                toast.success(response.message);
                // Nota: Usualmente no hacemos reset() en edición para que la UI no se quede en blanco,
                // a menos que quieras cerrar el modal automáticamente.
            } else {
                toast.error(response.message);
            }
        } else {
            const response = await createAppointment(payload);

            if (response.success) {
                toast.success(response.message);
                reset(); // Reseteamos al crear para dejar el formulario limpio
            } else {
                toast.error(response.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isSubmitting}>
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <Spinner />
                            {isEditing ? 'Guardando cambios...' : 'Creando cita...'}
                        </span>
                    ) : (
                        isEditing ? 'Guardar Cambios' : 'Crear Cita'
                    )}
                </Button>
            </FieldSet>
        </form>
    )
}