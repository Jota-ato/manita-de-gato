import { useState } from "react"; // 👈 Añadimos useState
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

export default function BlockTimeForm() {
    const [isBlockingAllDay, setIsBlockingAllDay] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<CreateBlockTimeForm>({
        resolver: zodResolver(CreateBlockTimeSchema),
        defaultValues: {
            date: new Date(),
            timeMin: '10:00',
            timeMax: '12:00'
        }
    });

    const isAnyLoading = isSubmitting || isBlockingAllDay;

    const onValidSubmit = async (formData: CreateBlockTimeForm) => {
        const [startHours, startMinutes] = formData.timeMin.split(':').map(Number);
        const [endHours, endMinutes] = formData.timeMax.split(':').map(Number);

        const timeMin = new TZDate(formData.date, TIMEZONE);
        timeMin.setHours(startHours, startMinutes, 0, 0);

        const timeMax = new TZDate(formData.date, TIMEZONE);
        timeMax.setHours(endHours, endMinutes, 0, 0);
        const response = await createBlockTime({ timeMin, timeMax });

        if (response.success) {
            toast.success(response.message);
            reset();
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
        console.log(selectedDate, timeMin, timeMax);

        const response = await createBlockTime({
            timeMin,
            timeMax
        });

        if (response.success) {
            toast.success(response.message);
            reset();
        } else {
            toast.error(response.message);
        }

        setIsBlockingAllDay(false);
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isAnyLoading}>
                <DatePickerTime
                    control={control}
                    nameDate="date"
                    nameStartTime="timeMin"
                    nameEndTime="timeMax"
                    startError={errors.timeMin?.message}
                    endError={errors.timeMax?.message}
                />
                <div className="flex flex-col md:flex-row gap-2 justify-end ">
                    <Button
                        type="submit"
                        disabled={isAnyLoading} // 👈 Evita doble sumisión
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner />Bloqueando...</span>
                        ) : (
                            'Bloquear horario'
                        )}
                    </Button>

                    <Button
                        type="button" // 👈 Especificamos que es botón genérico para no disparar el submit por accidente
                        onClick={blockAllDay}
                        variant={'destructive'}
                        disabled={isAnyLoading} // 👈 Evita doble sumisión
                    >
                        {isBlockingAllDay ? (
                            <span className="flex items-center gap-2"><Spinner />Cancelando día...</span>
                        ) : (
                            'Bloquear todo el día'
                        )}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}