import { format } from "date-fns";
import { getEventLayout } from "../../core/helpers/calendar-layout.utils";
import { Event } from "../../core/components/event";

export function PublicEvent({
    event,
    START_HOUR,
    ROW_HEIGHT_REM,
    slotDuration
}: {
    event: { startTime: Date; endTime: Date }
    START_HOUR: number
    ROW_HEIGHT_REM: number
    slotDuration: number
}) {

    const { start, end, topOffset, height } = getEventLayout({
        startTime: event.startTime,
        endTime: event.endTime,
        startHour: START_HOUR,
        rowHeightRem: ROW_HEIGHT_REM,
        minutesPerRow: slotDuration
    });

    return (
        <Event
            topOffset={topOffset}
            height={height}
            startTime={format(start, 'HH:mm')}
            endTime={format(end, 'HH:mm')}
            label={"Picked"}
            description={""}
            eventStatus={"COMPLETED"}
        />
    )
}