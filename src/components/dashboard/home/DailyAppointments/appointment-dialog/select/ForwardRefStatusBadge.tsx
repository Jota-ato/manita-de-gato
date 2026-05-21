import { statusColorsMap } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const StatusBadge = forwardRef
HTMLSpanElement,
    DurationBadgeProps & React.HTMLAttributes < HTMLSpanElement >
> (({ status, className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn("shrink-0 text-xs ...", statusColorsMap[status], className)}
            {...props}
        >
            {translatedStatusMap[status]}
        </span>
    ));

StatusBadge.displayName = "StatusBadge";