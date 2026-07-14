import { cn } from "@/shared/lib/utils";
import { getTimeBlockLayout } from "../../core/helpers/calendar-layout.utils";

export function PublicBlockPeriod({
    event,
    START_HOUR,
    ROW_HEIGHT_REM,
    currentColumnDate,
    slotDuration
}: {
    event: { startTime: Date; endTime: Date };
    START_HOUR: number;
    ROW_HEIGHT_REM: number;
    currentColumnDate: Date;
    slotDuration: number;
}) {

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
            key={event.startTime.getTime()}
            className={cn(
                "absolute inset-x-1 z-10 rounded-lg p-2 shadow-md overflow-hidden text-muted-foreground bg-muted border border-muted-foreground/20 cursor-pointer"
            )}
            style={{
                top: `${layout.top}rem`,
                height: `${layout.height}rem`,
            }}
        >
            <p className="text-sm font-bold text-foreground truncate">
                Time no available
            </p>
        </div>
    )
}