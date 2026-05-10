import { es } from "date-fns/locale";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AgendaHeaderProps {
    weekDays: Date[];
}

export default function AgendaHeader({ weekDays }: AgendaHeaderProps) {
    return (
        <header
            className="grid sticky top-0 z-20 bg-pink-500 shadow-md"
            style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
        >
            {/* Navigation Controls */}
            <div className="p-2 flex items-center justify-center gap-3 border-r border-pink-400">
                <button className="p-1.5 rounded-lg hover:bg-pink-400/50 transition-colors text-white">
                    <ArrowLeft className="size-5" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-pink-400/50 transition-colors text-white">
                    <ArrowRight className="size-5" />
                </button>
            </div>

            {/* Day Headers */}
            {weekDays.map(day => (
                <div
                    key={day.toISOString()}
                    className="py-4 border-r border-pink-400 last:border-r-0 flex items-center justify-center flex-col"
                >
                    <p className="text-xs font-bold uppercase tracking-widest text-pink-100">
                        {format(day, 'EEE', { locale: es })}
                    </p>
                    <p className="text-2xl font-black text-white">
                        {format(day, 'd')}
                    </p>
                </div>
            ))}
        </header>
    )
}