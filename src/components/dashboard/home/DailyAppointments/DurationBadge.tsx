import { TZDate } from "@date-fns/tz";
import { differenceInMinutes } from "date-fns"

export default function DurationBadge({ timeMin, timeMax }: { timeMin: TZDate; timeMax: TZDate }) {
    const mins = differenceInMinutes(new Date(timeMax), new Date(timeMin))

    return (
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full tabular-nums">
            {mins} min
        </span>
    )
}