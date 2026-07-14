"use client"
import { addDays, addMinutes } from "date-fns";
import { HourCell } from "../../core/components/hour-cell";
import { useAppointmentStore } from "../stores/appointment-store";

export function AdminHourCell({
    hour,
    dayDifference,
    slotDuration
}: {
    hour: Date
    dayDifference: number,
    slotDuration: number
}) {

    const startTime = addDays(hour, dayDifference);
    const endTime = addMinutes(startTime, slotDuration);
    const activeCreateAppointmentTime = { startTime, endTime}
    const { toggleCreateDialogOpen, setActiveCreateAppointmentTime } = useAppointmentStore()

    return (
        <div onClick={() => {
            toggleCreateDialogOpen()
            setActiveCreateAppointmentTime(activeCreateAppointmentTime)
        }}>
            <HourCell />
        </div>
    )
}