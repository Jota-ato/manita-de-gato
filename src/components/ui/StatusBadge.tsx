import { AppointmentStatus, translatedStatusMap } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";

interface DurationBadgeProps {
    status: AppointmentStatus
}

export const statusColorsMap: Record<AppointmentStatus, string> = {
    'pending': "bg-warning border-warning-foreground text-warning-foreground",
    'approved': "bg-success border-success-foreground text-success-foreground",
    'paid': "bg-info border-info-foreground text-info-foreground",
    'cancelled': "bg-destructive border-destructive-foreground text-destructive-foreground",
    'no_show': "bg-background/80",
};

export default function StatusBadge({ status }: DurationBadgeProps) {

    return (
        <span className={cn("shrink-0 text-xs font-medium px-2 py-0.5 rounded-full tabular-nums", statusColorsMap[status])}>
            {translatedStatusMap[status]}
        </span>
    )
}