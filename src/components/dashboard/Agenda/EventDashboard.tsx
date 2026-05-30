import { Appointment, AppointmentStatus } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { format, differenceInMinutes } from "date-fns";

interface EventProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
}

const statusColorMap: Record<Exclude<AppointmentStatus, 'no_show'>, string> = {
    'approved': 'bg-success text-success-foreground hover:bg-success/80',
    'pending': 'bg-warning text-warning-foreground hover:bg-warning/80',
    'cancelled': 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    'paid': 'bg-info text-info-foreground hover:bg-info/80',
};

export default function Event({ event, START_HOUR, ROW_HEIGHT_REM }: EventProps) {


    const start = new Date(event.timeMin);
    const end = new Date(event.timeMax);

    const startDate = start.toISOString();
    const endDate = end.toISOString();

    // Calculate minutes from start (08:00)
    const startBase = new Date(startDate);
    startBase.setHours(START_HOUR, 0, 0, 0);

    const minutesFromStart = differenceInMinutes(startDate, startBase);
    const durationMinutes = differenceInMinutes(endDate, startDate);

    // Convert minuts to rem (5rem = 60min)
    const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
    const height = (durationMinutes * ROW_HEIGHT_REM) / 120;
    if (height < 5) return

    return (
        <div
            key={event.id}
            className={cn(
                "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md  overflow-hidden cursor-pointer text-warning-foreground bg-warning",
                event.status !== 'no_show' ? statusColorMap[event.status] : 
                'bg-muted text-muted-foreground'
            )}
            style={{
                top: `${topOffset}rem`,
                height: `${height - 0.2}rem`,
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