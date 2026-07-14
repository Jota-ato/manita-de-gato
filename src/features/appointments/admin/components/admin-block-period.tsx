"use client"
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { FullAppointment } from "../../core/types/appointments.types";
import { useAppointmentStore } from "../stores/appointment-store";
import { getTimeBlockLayout } from "../../core/helpers/calendar-layout.utils";


export function AdminBlockPeriod({
    event,
    START_HOUR,
    ROW_HEIGHT_REM,
    currentColumnDate,
    slotDuration
}: {
    event: FullAppointment;
    START_HOUR: number;
    ROW_HEIGHT_REM: number;
    currentColumnDate: Date;
    slotDuration: number;
}) {

    const { toggleEditDialogOpen, setActiveEditingAppointment } = useAppointmentStore()

    const layout = getTimeBlockLayout({
        startTime: event.startTime,
        endTime: event.endTime,
        currentColumnDate,
        startHour: START_HOUR,
        rowHeightRem: ROW_HEIGHT_REM,
        minutesPerRow: slotDuration,
    });

    if (!layout.isVisible) return null;

    return (
        <div
            onClick={() => {
                toggleEditDialogOpen()
                setActiveEditingAppointment(event)
            }}
            key={event.id}
            className={cn(
                "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md overflow-hidden text-muted-foreground bg-muted border border-muted-foreground/20 cursor-pointer"
            )}
            style={{
                top: `${layout.top}rem`,
                height: `${layout.height}rem`,
            }}
        >
            <p className="text-xs font-medium opacity-90 uppercase truncate">
                {format(layout.effectiveStart, 'HH:mm')} - {format(layout.effectiveEnd, 'HH:mm')}
            </p>
            <p className="text-sm font-bold text-foreground truncate">
                Block
            </p>
            <p className="text-xs">{event.service.name}</p>
        </div>
    );
}