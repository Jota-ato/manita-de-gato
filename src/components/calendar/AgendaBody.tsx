import { format } from "date-fns";

interface AgendaBodyProps {
    weekDays: Date[];
    hours: Date[];
}

export default function AgendaBody({ weekDays, hours }: AgendaBodyProps) {
    return (
        <main
            className="grid bg-white"
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
                <div key={day.toISOString()} className="border-r border-pink-50 last:border-r-0">
                    {hours.map(hour => (
                        <div
                            key={hour.toISOString()}
                            className="w-full h-20 border-b border-pink-50 cursor-pointer transition-colors hover:bg-pink-50/50 group relative"
                        >
                            {/* Hover indicator */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-pink-200/50 m-1  pointer-events-none transition-opacity" />
                        </div>
                    ))}
                </div>
            ))}
        </main>
    )
}