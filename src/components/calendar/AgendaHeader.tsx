import { es } from "date-fns/locale";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AgendaHeaderProps {
    weekDays: Date[];
    onNext: () => void;
    onPrev: () => void;
}

export default function AgendaHeader({ weekDays, onNext, onPrev }: AgendaHeaderProps) {
    return (
        <header
            className="grid sticky top-0 z-20 bg-pink-500 shadow-md transition-all"
            style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
        >
            <div className="p-2 flex items-center justify-center gap-2 border-r border-pink-400">
                <button
                    onClick={onPrev}
                    className="p-2 rounded-full hover:bg-pink-600 transition-all text-white active:scale-90"
                >
                    <ArrowLeft className="size-5" />
                </button>
                <button
                    onClick={onNext}
                    className="p-2 rounded-full hover:bg-pink-600 transition-all text-white active:scale-90"
                >
                    <ArrowRight className="size-5" />
                </button>
            </div>

            {weekDays.map(day => (
                <div
                    key={day.toISOString()}
                    className="py-4 border-r border-pink-400 last:border-r-0 flex items-center justify-center flex-col animate-in fade-in duration-300"
                >
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-pink-100">
                        {format(day, 'EEE', { locale: es })}
                    </p>
                    <p className="text-lg md:text-2xl font-black text-white">
                        {format(day, 'd')}
                    </p>
                </div>
            ))}
        </header>
    )
}