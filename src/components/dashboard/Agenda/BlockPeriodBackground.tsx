import { Appointment } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { forwardRef } from "react";

interface BackGroundProps extends React.HTMLAttributes<HTMLDivElement> {
    event: Appointment
    clampedTop: number
    clampedHeight: number
    effectiveStart: Date
    effectiveEnd: Date
}

const BlockPeriodBackGround = forwardRef<HTMLDivElement, BackGroundProps>(
    ({ clampedTop, clampedHeight, effectiveStart, effectiveEnd, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md overflow-hidden cursor-pointer text-muted-foreground bg-muted",
                    className
                )}
                style={{
                    top: `${clampedTop}rem`,
                    height: `${clampedHeight - 0.2}rem`,
                }}
            >
                <p className="text-xs font-light opacity-90 uppercase truncate">
                    {format(effectiveStart, 'HH:mm')} - {format(effectiveEnd, 'HH:mm')}
                </p>
                <p className="text-sm font-bold leading-tight wrap-break-word">
                    Horario no disponible
                </p>
            </div>
        )
    }
)

BlockPeriodBackGround.displayName = "BackGround";

export default BlockPeriodBackGround;