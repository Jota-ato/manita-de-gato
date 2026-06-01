import { Appointment } from "@/lib/supabase/schemas";
import { format, differenceInMinutes, max, min, differenceInHours } from "date-fns";
import ActionModal from "../home/QuickActions/ActionModal";
import BlockPeriodBackGround from "./BlockPeriodBackground";
import BlockPeriodForm from "../home/QuickActions/Forms/BlockPeriodForm";
import BlockTimeForm from "../home/QuickActions/Forms/BlockTimeForm";
import { es } from "date-fns/locale";

interface BlockPeriodProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
    currentColumnDate: Date
}


export default function BlockPeriodDashboard({ event, START_HOUR, ROW_HEIGHT_REM, currentColumnDate }: BlockPeriodProps) {


    const startBase = new Date(currentColumnDate);
    startBase.setHours(START_HOUR, 0, 0, 0);
    const endBase = new Date(currentColumnDate);
    endBase.setHours(20, 0, 0, 0);
    const absoluteStart = new Date(event.timeMin);
    const absoluteEnd = new Date(event.timeMax);
    const isPeriod = Math.abs(differenceInHours(absoluteEnd, absoluteStart)) > 24;

    const effectiveStart = max([absoluteStart, startBase]);
    const effectiveEnd = min([absoluteEnd, endBase]);

    const minutesFromStart = differenceInMinutes(effectiveStart, startBase);
    const durationMinutes = differenceInMinutes(effectiveEnd, effectiveStart);

    const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
    const height = (durationMinutes * ROW_HEIGHT_REM) / 120;

    const clampedTop = Math.max(0, topOffset);
    const clampedHeight = topOffset < 0 ? height + topOffset : height;

    if (clampedHeight < 0.5) return null;

    const startDateStr = format(absoluteStart, "d 'de' MMMM 'de' yyyy", { locale: es });
    const endDateStr = format(absoluteEnd, "d 'de' MMMM 'de' yyyy", { locale: es });
    const startTimeStr = format(absoluteStart, 'HH:mm');
    const endTimeStr = format(absoluteEnd, 'HH:mm');

    const dynamicDescription = isPeriod
        ? `Editando periodo del ${startDateStr} al ${endDateStr} de ${startTimeStr}-${endTimeStr}`
        : `Editando bloqueo del ${startDateStr} de ${startTimeStr}-${endTimeStr}`;

    return (
        <ActionModal
            trigger={<BlockPeriodBackGround
                clampedHeight={clampedHeight}
                clampedTop={clampedTop}
                effectiveEnd={effectiveEnd}
                effectiveStart={effectiveStart}
                event={event}
            />}
            title={isPeriod ? "Editar bloqueo de periodo" : "Editar bloqueo"}
            description={dynamicDescription}
        >
            {isPeriod ?
                <BlockPeriodForm
                    appointment={event}
                />
                : <BlockTimeForm
                    appointment={event}
                />
            }
        </ActionModal>
    )
}