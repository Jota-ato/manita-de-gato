import { Appointment } from "@/lib/supabase/schemas";
import { format } from "date-fns";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { tz } from "@date-fns/tz";

export default function TimeLine({ apt }: {apt: Appointment}) {
    return (
        <div className="flex flex-col gap-2  items-center min-w-13">
            <span className="text-sm font-semibold tabular-nums leading-tight">
                {format(apt.timeMin, 'HH:mm', { in: tz(TIMEZONE) })}
            </span>
            <span className="text-xs text-muted-foreground leading-none md:my-0.5">—</span>
            <span className="text-xs text-muted-foreground tabular-nums leading-tight">
                {format(apt.timeMax, 'HH:mm', { in: tz(TIMEZONE) })}
            </span>
        </div>
    )
}