import { AppointmentStatus, translatedStatusMap } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";

interface DurationBadgeProps {
    status: AppointmentStatus
}

export const statusColorsMap: Record<AppointmentStatus, string> = {
    'pending': "bg-amber-100 border-amber-300 text-amber-800",
    'approved': "bg-emerald-100 border-emerald-300 text-emerald-800",
    'paid': "bg-blue-100 border-blue-300 text-blue-800",
    'cancelled': "bg-red-100 border-red-300 text-red-700",
    'no_show': "bg-slate-100 border-slate-300 text-slate-800",
};

export default function StatusBadge({ status }: DurationBadgeProps) {

    return (
        <span className={cn("shrink-0 text-xs font-medium px-2 py-0.5 rounded-full tabular-nums", statusColorsMap[status])}>
            {translatedStatusMap[status]}
        </span>
    )
}