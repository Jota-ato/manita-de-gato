"use client"
import { addDays, addMinutes } from "date-fns";
import { useBookingStore } from "../../public/store/booking-store";
import { HourCell } from "./hour-cell";

export function PublicHourCell({
    hour,
    dayDifference,
    now,
    slotDuration
}: {
    hour: Date
    dayDifference: number
    now: Date
    slotDuration: number
}) {

    const { setTimeConfirmationOpen, setTime } = useBookingStore()
    const startTime = addDays(hour, dayDifference);
    const disabled = startTime < now;

    return (
        <div
            onClick={() => {
                if (!disabled) {
                    const endTime = new Date(addMinutes(startTime, slotDuration))
                    setTime({ startTime, endTime })
                    setTimeConfirmationOpen(true)
                }
            }}
        >
            <HourCell
                disabled={disabled}
            />
        </div>
    )
}