import { format, isSameDay, differenceInMinutes, parseISO } from "date-fns";
import type { Appointment } from "@/lib/calendar/schemas";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface AgendaBodyProps {
    weekDays: Date[];
    hours: Date[];
    events: Appointment[];
    isLoading: boolean;
}

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

export default function AgendaBody({ weekDays, hours, events, isLoading }: AgendaBodyProps) {
    const ROW_HEIGHT_REM = 5;
    const START_HOUR = 8;
    console.log(events)

    return (
        <main
            className="grid bg-white relative"
            style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
        >
            {/* Hours column */}
            <div className="col-span-1 border-r border-pink-100 bg-pink-50/30">
                {hours.map(hour => (
                    <div
                        key={hour.toISOString()}
                        className="w-full flex items-start justify-center h-20 pt-3 border-b border-pink-100 text-sm font-bold text-pink-400 uppercase tracking-tighter"
                    >
                        {format(hour, 'HH:mm')}
                    </div>
                ))}
            </div>

            {/* Days columns */}
            {weekDays.map(day => (
                <div key={day.toISOString()} className="relative border-r border-pink-50 last:border-r-0">
                    {/* Background Grid Lines */}
                    {hours.map(hour => (
                        <div
                            key={hour.toISOString()}
                            className="w-full h-20 border-b border-pink-50 cursor-pointer transition-colors hover:bg-pink-50/50 group relative"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-pink-200/50 m-1 pointer-events-none transition-opacity" />
                        </div>
                    ))}

                    {/* Events Layer */}
                    {!isLoading && events
                        .filter(event => isSameDay(day, parseISO(event.start.dateTime)))
                        .map(event => {
                            const startDate = parseISO(event.start.dateTime);
                            const endDate = parseISO(event.end.dateTime);

                            // Calculate minutes from start (08:00)
                            const startBase = new Date(startDate);
                            startBase.setHours(START_HOUR, 0, 0, 0);

                            const minutesFromStart = differenceInMinutes(startDate, startBase);
                            const durationMinutes = differenceInMinutes(endDate, startDate);

                            // Convert minuts to rem (5rem = 60min)
                            const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
                            const height = (durationMinutes * ROW_HEIGHT_REM) / 120;
                            if (height < 5) return // not show events with less than 2 hours of duration

                            return (
                                <div
                                    key={event.id}
                                    className={cn(
                                        "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md  overflow-hidden transition-transform hover:scale-105 cursor-pointer text-white",
                                        event.colorId ? colorsMap[event.colorId] : 'bg-pink-400'
                                    )}
                                    style={{
                                        top: `${topOffset}rem`,
                                        height: `${height - 0.2}rem`,
                                    }}
                                >
                                    <p className="text-xs font-light opacity-90 uppercase truncate">
                                        {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                                    </p>
                                    <p className="text-sm font-bold leading-tight wrap-break-word">
                                        {event.summary}
                                    </p>
                                </div>
                            );
                        })
                    }

                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-20">
                            <Spinner className="text-pink-500" />
                        </div>
                    )}
                </div>
            ))}
        </main>
    );
}