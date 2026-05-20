import { differenceInMinutes } from "date-fns"

export default function DurationBadge({ timeMin, timeMax }: { timeMin: string; timeMax: string }) {
    const mins = differenceInMinutes(new Date(timeMax), new Date(timeMin))

    return (
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full tabular-nums">
            {mins} min
        </span>
    )
}