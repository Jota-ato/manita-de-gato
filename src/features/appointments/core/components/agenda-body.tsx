'use client';
import { Appointment } from "@/db/schema";
import { isSameDay } from "date-fns";
import { FullAppointment } from "../types/appointments.types";
import { HoursColumn } from "./hours-column";
import { AdminHourCell } from "../../admin/components/admin-hour-cell";
import { AdminEvent } from "../../admin/components/admin-event";
import { AdminBlockPeriod } from "../../admin/components/admin-block-period";
import { PublicHourCell } from "./public-hour-cell";
import { PublicBlockPeriod } from "../../public/components/public-block-period";
import { PublicEvent } from "../../public/components/public-event";


export function AgendaBody({
    weekDays,
    hours,
    events,
    isAdmin = false,
    slotDuration
}: {
    weekDays: Date[];
    hours: Date[];
    events: (Appointment | FullAppointment | { startTime: Date, endTime: Date })[];
    isAdmin?: boolean
    slotDuration: number
}) {
    const ROW_HEIGHT_REM = 5;
    const START_HOUR = hours[0].getHours();
    const now = new Date();

    return (
        <main
            className="grid relative"
            style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
        >
            {/* Hours column */}
            <HoursColumn
                slotDuration={slotDuration}
                hours={hours}
            />

            {/* Days columns */}
            {weekDays.map((day, dayDifference) => (
                <div key={day.toISOString()} className="relative border-r border-muted-foreground last:border-r-0">
                    {hours.map(hour => (
                        isAdmin ? (
                            <AdminHourCell
                                dayDifference={dayDifference}
                                hour={hour}
                                key={hour.getTime()} 
                                slotDuration={slotDuration}
                                />
                        ) : (
                            <PublicHourCell
                                dayDifference={dayDifference}
                                hour={hour}
                                now={now}
                                slotDuration={slotDuration}
                                key={hour.getTime()}
                            />
                        )
                    ))}

                    {events
                        .filter(event => {
                            const eventStart = new Date(event.startTime);
                            const eventEnd = new Date(event.endTime);

                            const columnStart = new Date(day)
                            columnStart.setHours(START_HOUR, 0, 0, 0)
                            const columnEnd = new Date(day)
                            columnEnd.setHours(23, 59, 59, 999)

                            return eventStart <= columnEnd && eventEnd >= columnStart;
                        })
                        .map(event => {
                            const isMultiDay = !isSameDay(event.startTime, event.endTime);

                            if (isAdmin && 'id' in event) {
                                if (isMultiDay) {
                                    return (
                                        <AdminBlockPeriod
                                            key={event.id}
                                            event={event as FullAppointment}
                                            START_HOUR={START_HOUR}
                                            ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                            currentColumnDate={day}
                                            slotDuration={slotDuration}
                                        />
                                    );
                                }

                                return (
                                    <AdminEvent
                                        key={event.id}
                                        event={event as FullAppointment}
                                        START_HOUR={START_HOUR}
                                        ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                        slotDuration={slotDuration}
                                    />
                                );
                            }

                            if (isMultiDay) {
                                return (
                                    <PublicBlockPeriod
                                        key={(event.startTime as Date).getTime()}
                                        event={event as { startTime: Date; endTime: Date }}
                                        START_HOUR={START_HOUR}
                                        ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                        currentColumnDate={day}
                                        slotDuration={slotDuration}
                                    />
                                );
                            }

                            return (
                                <PublicEvent
                                    key={(event.startTime as Date).getTime()}
                                    event={event as { startTime: Date; endTime: Date }}
                                    START_HOUR={START_HOUR}
                                    ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                    slotDuration={slotDuration}
                                />
                            )
                        })
                    }
                </div>
            ))}
        </main>
    );
}