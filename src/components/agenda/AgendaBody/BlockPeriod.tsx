import { Appointment } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { format, differenceInMinutes, max, min } from "date-fns";

interface BlockPeriodProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
    currentColumnDate: Date
}

interface BlockPeriodProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
    currentColumnDate: Date
}

export default function BlockPeriod({ event, START_HOUR, ROW_HEIGHT_REM, currentColumnDate }: BlockPeriodProps) {

    const startBase = new Date(currentColumnDate);
    startBase.setHours(START_HOUR, 0, 0, 0);
    const endBase = new Date(currentColumnDate);
    endBase.setHours(20, 0, 0, 0);
    const absoluteStart = new Date(event.timeMin);
    const absoluteEnd = new Date(event.timeMax);

    const effectiveStart = max([absoluteStart, startBase]);
    const effectiveEnd = min([absoluteEnd, endBase]);



    const minutesFromStart = differenceInMinutes(effectiveStart, startBase);
    const durationMinutes = differenceInMinutes(effectiveEnd, effectiveStart);

    const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
    const height = (durationMinutes * ROW_HEIGHT_REM) / 120;

    const clampedTop = Math.max(0, topOffset);
    const clampedHeight = topOffset < 0 ? height + topOffset : height;

    if (clampedHeight < 0.5) return null;

    return (
        <div
            key={event.id}
            className={cn(
                "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer text-muted-foreground bg-muted"
            )}
            style={{
                top: `${clampedTop}rem`,
                height: `${clampedHeight - 0.2}rem`,
            }}
        >
            <p className="text-xs font-light opacity-90 uppercase truncate">
                {format(effectiveStart, 'HH:mm')} - {format(effectiveEnd, 'HH:mm')}
            </p>
            <p className="text-sm font-bold leading-tight wrap-break-word">
                Horario no disponible
            </p>
        </div>
    )
}