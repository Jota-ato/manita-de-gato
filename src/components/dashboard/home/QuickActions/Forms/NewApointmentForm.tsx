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
import { ClientInfo, createAppointment, getClient } from "@/lib/form/service";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { Appointment } from "@/lib/supabase/schemas";
import { deleteAppointment, updateAppointment, UpdateAppointmentPayload } from "@/lib/dashboard/actions";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TZDate } from "@date-fns/tz";
import AppointmentDialogSelect from "../../DailyAppointments/appointment-dialog/fields/AppointmentDialogSelect";
import AppointmentDialogInput from "../../DailyAppointments/appointment-dialog/fields/AppointmentDialogInput";

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

    const [isDeletingAppointment, setIsDeletingAppointment] = useState(false);
    const isEditing = !!appointment
    const appointmentData = appointment as Appointment;
    const defaultDate = isEditing ? new Date(appointmentData.timeMin) : new Date();
    const defaultStartHour = isEditing ? format(new Date(appointmentData.timeMin), 'HH:mm') : '10:00';
    const defaultEndHour = isEditing ? format(new Date(appointmentData.timeMax), 'HH:mm') : '12:00';


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
            serviceId: isEditing ? String(appointmentData.service_id) : '',
            date: defaultDate,
            timeMin: defaultStartHour,
            timeMax: defaultEndHour
        }
    });

    useEffect(() => {
        const fetchFullClient = async () => {
            if (isEditing && appointmentData?.client_id) {
                try {
                    const response = await getClient({ id: appointmentData.client_id, name: appointment.client_name_snapshot, last_name: appointment.client_last_name_snapshot } as ClientInfo);

                    if (response.client) {
                        reset({
                            name: response.client.name,
                            last_name: response.client.last_name,
                            phone: response.client.phone,
                            secondary_phone: response.client.secondary_phone || '',
                            serviceId: String(appointmentData.service_id),
                            date: defaultDate,
                            timeMin: defaultStartHour,
                            timeMax: defaultEndHour
                        });
                    }
                } catch (error) {
                    console.error("No se pudo obtener el cliente", error);
                    toast.error("Error al cargar los datos completos del cliente.");
                }
            }
        };

        fetchFullClient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, appointmentData]);

    const isAnythingLoading = isDeletingAppointment || isSubmitting

    const onValidSubmit = async (formData: AdminAppointmentForm) => {
        const [startHours, startMinutes] = formData.timeMin.split(':').map(Number);
        const [endHours, endMinutes] = formData.timeMax.split(':').map(Number);

        const timeMin = new TZDate(formData.date, TIMEZONE);
        timeMin.setHours(startHours, startMinutes, 0, 0);

        const timeMax = new TZDate(formData.date, TIMEZONE);
        timeMax.setHours(endHours, endMinutes, 0, 0);


        if (isEditing) {

            const payload: UpdateAppointmentPayload = {
                timeMin,
                timeMax,
                service_id: +formData.serviceId,
            }

            const response = await updateAppointment(appointment.id, payload);

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } else {

            const payload = {
                name: formData.name,
                last_name: formData.last_name,
                phone: formData.phone,
                secondary_phone: formData.secondary_phone,
                serviceId: formData.serviceId,
                timeMin,
                timeMax
            };
            const response = await createAppointment(payload);

            if (response.success) {
                toast.success(response.message);
                reset();
            } else {
                toast.error(response.message);
            }
        }
    }

    const deleteAppointmentAction = async () => {
        setIsDeletingAppointment(true);

        if (isEditing) {
            const response = await deleteAppointment(appointment.id);

            if (response.success) {
                toast.success(response.message);
                if (!isEditing) reset();
            } else {
                toast.error(response.message);
            }

            setIsDeletingAppointment(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isAnythingLoading}>
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
                    {isEditing && (
                        <div className="grid grid-cols-2 gap-4 justify-between">
                            <AppointmentDialogSelect apt={appointment} />
                            <Button
                                type="button"
                                disabled={isAnythingLoading}
                                onClick={deleteAppointmentAction}
                                variant={'destructive'}
                            >
                                {isDeletingAppointment ? (
                                    <span className="flex items-center gap-2"><Spinner />Eliminando Cita</span>
                                ) : (
                                    'Eliminar cita'
                                )}
                            </Button>
                            <AppointmentDialogInput apt={appointment}/>
                        </div>
                    )}
                </FieldGroup>
                <Button
                    type="submit"
                    disabled={isAnythingLoading}
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