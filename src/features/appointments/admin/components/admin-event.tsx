import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { Event } from "../../core/components/event";
import { FullAppointment } from "../../core/types/appointments.types";
import { useAppointmentStore } from "../stores/appointment-store";
import { getEventLayout } from "../../core/helpers/calendar-layout.utils";


export function AdminEvent({
    event,
    START_HOUR,
    ROW_HEIGHT_REM,
    slotDuration
}: {
    event: FullAppointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
    slotDuration: number
}) {

    const { toggleEditDialogOpen, setActiveEditingAppointment } = useAppointmentStore()

    const { start, end, topOffset, height } = getEventLayout({
        startTime: event.startTime,
        endTime: event.endTime,
        startHour: START_HOUR,
        rowHeightRem: ROW_HEIGHT_REM,
        minutesPerRow: slotDuration
    });
    console.log("AdminEvent render", { event, start, end, topOffset, height });

    return (
        <div
            onClick={() => {
                toggleEditDialogOpen()
                setActiveEditingAppointment(event)
            }}
        >
            <Event
                topOffset={topOffset}
                height={height}
                startTime={format(start, 'HH:mm')}
                endTime={format(end, 'HH:mm')}
                label={event.customer.name}
                description={event.service.name}
                eventStatus={event.status}
            />
        </div>
    )
}