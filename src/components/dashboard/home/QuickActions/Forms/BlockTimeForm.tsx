import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import DatePickerTime from "./DatePicker";
import { useForm } from "react-hook-form";
import { CreateBlockTimeForm, CreateBlockTimeSchema, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { createBlockTime } from "@/lib/dashboard/quickactions/actions";
import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { format } from "date-fns";
import { Appointment } from "@/lib/supabase/schemas";
import { deleteAppointment, updateAppointment } from "@/lib/dashboard/actions";
import { cn } from "@/lib/utils";

interface BlockTimeFormProps {
    appointment?: Appointment;
}

export default function BlockTimeForm({ appointment }: BlockTimeFormProps) {
    const [isBlockingAllDay, setIsBlockingAllDay] = useState(false);
    const [isDeletingBlock, setIsDeletingBlock] = useState(false);

    const isEditing = !!appointment;

    const defaultDate = isEditing ? new Date(appointment.timeMin) : new Date();
    const defaultStart = isEditing ? format(new Date(appointment.timeMin), 'HH:mm') : '10:00';
    const defaultEnd = isEditing ? format(new Date(appointment.timeMax), 'HH:mm') : '12:00';

    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<CreateBlockTimeForm>({
        resolver: zodResolver(CreateBlockTimeSchema),
        defaultValues: {
            date: defaultDate,
            timeMin: defaultStart,
            timeMax: defaultEnd
        }
    });

    const isAnyLoading = isSubmitting || isBlockingAllDay || isDeletingBlock;

    const onValidSubmit = async (formData: CreateBlockTimeForm) => {
        const [startHours, startMinutes] = formData.timeMin.split(':').map(Number);
        const [endHours, endMinutes] = formData.timeMax.split(':').map(Number);

        const timeMin = new TZDate(formData.date, TIMEZONE);
        timeMin.setHours(startHours, startMinutes, 0, 0);

        const timeMax = new TZDate(formData.date, TIMEZONE);
        timeMax.setHours(endHours, endMinutes, 0, 0);
        let response;
        if (isEditing) {
            response = await updateAppointment(appointment.id, { timeMin, timeMax });
        } else {
            response = await createBlockTime({ timeMin, timeMax });
        }

        if (response.success) {
            toast.success(response.message);
            if (!isEditing) reset();
        } else {
            toast.error(response.message);
        }
    }

    const blockAllDay = async () => {

        const selectedDate = getValues().date;
        const timeMin = new TZDate(selectedDate, TIMEZONE)
        timeMin.setHours(0, 0, 0, 0);
        const timeMax = new TZDate(selectedDate, TIMEZONE)
        timeMax.setHours(23, 59, 59, 999);
        setIsBlockingAllDay(true);

        let response;
        if (isEditing) {
            response = await updateAppointment(appointment.id, { timeMin, timeMax });
        } else {
            response = await createBlockTime({ timeMin, timeMax });
        }

        if (response.success) {
            toast.success(response.message);
            if (!isEditing) reset();
        } else {
            toast.error(response.message);
        }

        setIsBlockingAllDay(false);
    }

    const deleteBlock = async () => {
        setIsDeletingBlock(true);

        if (isEditing) {
            const response = await deleteAppointment(appointment.id);

            if (response.success) {
                toast.success(response.message);
                if (!isEditing) reset();
            } else {
                toast.error(response.message);
            }

            setIsDeletingBlock(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isAnyLoading}>
                <DatePickerTime
                    label="Día del bloqueo"
                    control={control}
                    nameDate="date"
                    nameStartTime="timeMin"
                    nameEndTime="timeMax"
                    startError={errors.timeMin?.message}
                    endError={errors.timeMax?.message}
                />
                <div className={
                    cn(
                        "grid grid-cols-1 gap-2 md:grid-cols-2",
                    )
                }>
                    <Button
                        className={cn(isEditing && 'col-span-2')}
                        type="submit"
                        disabled={isAnyLoading}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner />Bloqueando...</span>
                        ) : isEditing ? (
                            'Editar bloqueo'
                        ) : ('Bloquear horario')
                        }
                    </Button>

                    <Button
                        type="button"
                        onClick={blockAllDay}
                        variant={'destructive'}
                        disabled={isAnyLoading}
                    >
                        {isBlockingAllDay ? (
                            <span className="flex items-center gap-2"><Spinner />Cancelando día...</span>
                        ) : (
                            'Bloquear todo el día'
                        )}
                    </Button>
                    {isEditing && (
                        <Button
                            disabled={isAnyLoading}
                            onClick={deleteBlock}
                            variant={'destructive'}
                        >
                            {isBlockingAllDay ? (
                                <span className="flex items-center gap-2"><Spinner />Eliminando bloqueo</span>
                            ) : (
                                'Eliminar bloqueo'
                            )}
                        </Button>
                    )}
                </div>
            </FieldSet>
        </form>
    )
}