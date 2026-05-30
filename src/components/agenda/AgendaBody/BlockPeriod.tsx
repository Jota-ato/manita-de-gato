import { Appointment } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { format, differenceInMinutes } from "date-fns";

/**
 * Color map optimized for the Pink Theme.
 * Keys represent the colorId (or any integer index).
 * Values are Tailwind CSS classes for background and border.
 */
export const colorsMap: Record<string, string> = {
    '0': "bg-pink-500 border-pink-600",
    '1': "bg-rose-500 border-rose-600",
    '2': "bg-fuchsia-500 border-fuchsia-600",
    '3': "bg-pink-600 border-pink-700",
    '4': "bg-rose-400 border-rose-500",
    '5': "bg-fuchsia-400 border-fuchsia-500",
    '6': "bg-pink-400 border-pink-500",
    '7': "bg-purple-400 border-purple-500",
    '8': "bg-rose-600 border-rose-700",
    '9': "bg-fuchsia-600 border-fuchsia-700",
    '10': "bg-pink-300 border-pink-400",
    '11': "bg-violet-500 border-violet-600",
};

interface EventProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
}

export default function BlockPeriod({ event, START_HOUR, ROW_HEIGHT_REM }: EventProps) {

    const start = new Date(event.timeMin);
    const end = new Date(event.timeMax);

    const startDate = start.toISOString();
    const endDate = end.toISOString();

    const startBase = new Date(startDate);
    startBase.setHours(START_HOUR, 0, 0, 0);

    const minutesFromStart = differenceInMinutes(startDate, startBase);
    const durationMinutes = differenceInMinutes(endDate, startDate);

    const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
    const height = (durationMinutes * ROW_HEIGHT_REM) / 120;
    if (height < 5) return

    return (
        <div
            key={event.id}
            className={cn(
                "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md  overflow-hidden transition-transform hover:scale-105 cursor-pointer text-muted-foreground bg-muted"
            )}
            style={{
                top: `${topOffset < 0 ? 0 : topOffset}rem`,
                height: `${(height > 25 ? 25 : height) - 0.2}rem`,
            }}
        >
            <p className="text-xs font-light opacity-90 uppercase truncate">
                {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
            </p>
            <p className="text-sm font-bold leading-tight wrap-break-word">
                Horario no disponible
            </p>
        </div>
    )
}