import { formatTime } from "@/shared/lib/date";
import { addMinutes } from "date-fns";


export function HoursColumn({
    hours,
    slotDuration
}: {
    hours: Date[]
    slotDuration: number
}) {
    return (
        <div className="col-span-1 border-r bg-secondary">
            {hours.map((hour) => (
                <div
                    key={hour.toISOString()}
                    className="w-full flex flex-col items-center justify-evenly h-20 border-b border-foreground text-sm md:text-md text-muted-foreground"
                >
                    <span className="text-sm font-semibold tabular-nums leading-tight text-foreground">
                        {formatTime(hour)}
                    </span>
                    <span className="text-[9px] text-muted-foreground/60 leading-none my-0.5">▼</span>
                    <span className="text-sm text-muted-foreground tabular-nums leading-tight">
                        {formatTime(addMinutes(hour, slotDuration))}
                    </span>
                </div>
            ))}
        </div>
    )
}