import { format } from "date-fns";

interface HoursColumnProps { 
    hours: Date[]
}

export default function HoursColumn({ hours } : HoursColumnProps) {
    return (
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
    )
}