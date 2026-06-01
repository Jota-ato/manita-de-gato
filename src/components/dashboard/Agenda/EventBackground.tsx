import { Appointment, AppointmentStatus } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { forwardRef } from "react"; 

const statusColorMap: Record<Exclude<AppointmentStatus, 'no_show'>, string> = {
    'approved': 'bg-success text-success-foreground hover:bg-success/80',
    'pending': 'bg-warning text-warning-foreground hover:bg-warning/80',
    'cancelled': 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    'paid': 'bg-info text-info-foreground hover:bg-info/80',
};

interface BackGroundProps extends React.HTMLAttributes<HTMLDivElement> {
    event: Appointment
    topOffset: number
    height: number
    startDate: string
    endDate: string
}

const EventBackGround = forwardRef<HTMLDivElement, BackGroundProps>(
    ({ event, topOffset, height, startDate, endDate, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md overflow-hidden cursor-pointer text-warning-foreground bg-warning",
                    event.status !== 'no_show' ? statusColorMap[event.status] : 'bg-muted text-muted-foreground',
                    className
                )}
                style={{
                    top: `${topOffset}rem`,
                    height: `${height - 0.2}rem`,
                    ...props.style
                }}
            >
                <p className="text-xs font-light opacity-90 uppercase truncate">
                    {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                </p>
                <p className="text-sm font-bold leading-tight wrap-break-word">
                    {`${event.client_name_snapshot} ${event.client_last_name_snapshot}`}
                </p>
            </div>
        )
    }
)

EventBackGround.displayName = "BackGround";

export default EventBackGround;