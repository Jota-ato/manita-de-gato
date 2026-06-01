import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { CreateBlockForm, CreateBlockPeriodSchema, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import RangePicker from "./RangePicker";
import { createBlockTime } from "@/lib/dashboard/quickactions/actions";
import { toast } from "sonner";
import { Appointment } from "@/lib/supabase/schemas";
import { format } from "date-fns";
import { updateAppointment, deleteAppointment } from "@/lib/dashboard/actions";
import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { cn } from "@/lib/utils";

interface BlockPeriodFormProps {
    appointment?: Appointment;
}

export default function BlockPeriodForm({ appointment }: BlockPeriodFormProps) {
    const [isDeletingBlock, setIsDeletingBlock] = useState(false);

    const isEditing = !!appointment;

    const defaultStartDate = isEditing ? new Date(appointment.timeMin) : new Date();
    const defaultEndDate = isEditing ? new Date(appointment.timeMax) : new Date();
    const defaultStartHour = isEditing ? format(new Date(appointment.timeMin), 'HH:mm') : '10:00';
    const defaultEndHour = isEditing ? format(new Date(appointment.timeMax), 'HH:mm') : '20:00';

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreateBlockForm>({
        resolver: zodResolver(CreateBlockPeriodSchema),
        defaultValues: {
            startDate: defaultStartDate,
            endDate: defaultEndDate,
            timeMin: defaultStartHour,
            timeMax: defaultEndHour
        }
    });

    const isAnyLoading = isSubmitting || isDeletingBlock;

    const onValidSubmit = async (formData: CreateBlockForm) => {
        const timeMin = new TZDate(formData.startDate, TIMEZONE);
        const timeMax = new TZDate(formData.endDate, TIMEZONE);
        const [startHour, startMinutes] = formData.timeMin.split(':').map(Number)
        const [endHour, endMinutes] = formData.timeMax.split(':').map(Number)
        timeMin.setHours(startHour, startMinutes, 0, 0);
        timeMax.setHours(endHour, endMinutes, 0, 0);

        const payload = { timeMin, timeMax };
        const response = isEditing
            ? await updateAppointment(appointment.id, payload)
            : await createBlockTime(payload);

        if (response.success) {
            toast.success(response.message);
            if (!isEditing) reset();
        } else {
            toast.error(response.message);
        }
    }

    const deleteBlock = async () => {
        if (!isEditing) return;
        setIsDeletingBlock(true);

        const response = await deleteAppointment(appointment.id);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }

        setIsDeletingBlock(false);
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isAnyLoading}>
                <RangePicker
                    control={control}
                    nameStartDate="startDate"
                    nameEndDate="endDate"
                    nameStartTime="timeMin"
                    nameEndTime="timeMax"
                    startDateError={errors.timeMin?.message}
                    endDateError={errors.timeMax?.message}
                    startTimeError={errors.timeMin?.message}
                    endTimeError={errors.timeMax?.message}
                />

                <div className={cn("grid gap-2", isEditing ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
                    <Button
                        type="submit"
                        disabled={isAnyLoading}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner />{isEditing ? 'Guardando...' : 'Bloqueando...'}</span>
                        ) : (
                            isEditing ? 'Guardar Cambios' : 'Bloquear periodo'
                        )}
                    </Button>

                    {isEditing && (
                        <Button
                            type="button"
                            disabled={isAnyLoading}
                            onClick={deleteBlock}
                            variant={'destructive'}
                        >
                            {isDeletingBlock ? (
                                <span className="flex items-center gap-2"><Spinner />Eliminando...</span>
                            ) : (
                                'Eliminar periodo'
                            )}
                        </Button>
                    )}
                </div>
            </FieldSet>
        </form>
    )
}