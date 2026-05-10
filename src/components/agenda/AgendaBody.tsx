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

export default function AgendaBody({ weekDays, hours, events, isLoading }: AgendaBodyProps) {
    const ROW_HEIGHT_REM = 5; // Equivalente a h-20
    const START_HOUR = 8;

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
                        .filter(event => isSameDay(event.start.dateTime, day))
                        .map(event => {
                            const startDate = parseISO(event.start.dateTime);
                            const endDate = parseISO(event.end.dateTime);
                            
                            // Calcular minutos desde el inicio (08:00)
                            const startBase = new Date(startDate);
                            startBase.setHours(START_HOUR, 0, 0, 0);
                            
                            const minutesFromStart = differenceInMinutes(startDate, startBase);
                            const durationMinutes = differenceInMinutes(endDate, startDate);

                            // Convertir minutos a rem (5rem = 60min)
                            const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 60;
                            const height = (durationMinutes * ROW_HEIGHT_REM) / 60;

                            return (
                                <div
                                    key={event.id}
                                    className="absolute inset-x-1 z-10 rounded-lg p-2 bg-pink-500 text-white shadow-md border border-pink-600 overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer"
                                    style={{
                                        top: `${topOffset}rem`,
                                        height: `${height - 0.2}rem`, // -0.2 para dejar un margen visual
                                    }}
                                >
                                    <p className="text-[10px] font-bold opacity-90 uppercase truncate">
                                        {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                                    </p>
                                    <p className="text-xs font-black leading-tight break-words">
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