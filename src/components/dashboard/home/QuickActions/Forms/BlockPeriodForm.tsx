import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { CreateBlockForm, CreateBlockPeriodSchema, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import RangePicker from "./RangePicker";
import { createBlockTime } from "@/lib/dashboard/quickactions/actions";
import { toast } from "sonner";

export default function BlockPeriodForm() {

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreateBlockForm>({
        resolver: zodResolver(CreateBlockPeriodSchema),
        defaultValues: {
            startDate: new Date(),
            endDate: new Date(),
            timeMin: '10:00',
            timeMax: '20:00'
        }
    });


    const onValidSubmit = async (formData: CreateBlockForm) => {
        console.log(formData);
        const timeMin = new Date(formData.startDate);
        const timeMax = new Date(formData.endDate);
        const [startHour, startMinutes] = formData.timeMin.split(':').map(Number)
        const [endHour, endMinutes] = formData.timeMax.split(':').map(Number)
        timeMin.setHours(startHour, startMinutes);
        timeMax.setHours(endHour, endMinutes)

        const response = await createBlockTime({ timeMin, timeMax })
        if (response.success) {
            toast.success(response.message);
            reset();
        } else {
            toast.error(response.message);
        }
    }


    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet>
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
                <div className="flex flex-col md:flex-row gap-2 justify-end ">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner />Bloqueando...</span>
                        ) : (
                            'Bloquear horario'
                        )}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}