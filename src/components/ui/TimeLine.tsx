import { Appointment } from "@/lib/supabase/schemas";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importamos el español
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { tz } from "@date-fns/tz";

interface TimeLineProps {
    apt: Appointment;
    showDate?: boolean;
}

export default function TimeLine({ apt, showDate = false }: TimeLineProps) {
    return (
        <div className="flex flex-col gap-1 items-center min-w-15 text-center">

            {/* Renderizado condicional de la fecha */}
            {showDate && (
                <span className="text-xs font-medium text-primary mb-1 capitalize border-b border-border/50 pb-1 w-full">
                    {format(apt.timeMin, 'dd MMM yyyy', { in: tz(TIMEZONE), locale: es })}
                </span>
            )}

            <div className="flex flex-col gap-0.5 items-center">
                <span className="text-sm font-semibold tabular-nums leading-tight">
                    {format(apt.timeMin, 'HH:mm', { in: tz(TIMEZONE) })}
                </span>
                <span className="text-[10px] text-muted-foreground leading-none md:my-0.5">▼</span>
                <span className="text-sm text-muted-foreground tabular-nums leading-tight">
                    {format(apt.timeMax, 'HH:mm', { in: tz(TIMEZONE) })}
                </span>
            </div>

        </div>
    );
}