'use client';
import { isSameDay } from "date-fns";
import HoursColumn from "./AgendaBody/HoursColumn";
import EventPublic from "./AgendaBody/EventPublic";
import HourCell from "./AgendaBody/HourCell";
import { Appointment } from "@/lib/supabase/schemas";
import BlockPeriod from "./AgendaBody/BlockPeriod";


interface AgendaBodyProps {
    weekDays: Date[];
    hours: Date[];
    events: Appointment[];
}

export default function AgendaBody({ weekDays, hours, events }: AgendaBodyProps) {
    const ROW_HEIGHT_REM = 5;
    const START_HOUR = 10;

    return (
        <main
            className="grid relative"
            style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
        >
            {/* Hours column */}
            <HoursColumn
                hours={hours}
            />

            {/* Days columns */}
            {weekDays.map((day, dayDifference) => (
                <div key={day.toISOString()} className="relative border-r border-muted-foreground last:border-r-0">
                    {hours.map((hour) => (
                        <HourCell
                            key={hour.getTime()}
                            hour={hour}
                            dayDifference={dayDifference}
                        />
                    ))}

                    {/* Events Layer */}
                    {events
                        .filter(event => isSameDay(day, event.timeMin) && (event.status === 'approved' || event.status === 'paid'))
                        .map(event => (
                            <EventPublic
                                key={event.id}
                                event={event}
                                START_HOUR={START_HOUR}
                                ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                            />
                        ))
                    }
                    {
                        events
                            .filter(event => isSameDay(day, event.timeMin) && event.status === 'no_show')
                            .map(event => (
                                <BlockPeriod
                                    key={event.id}
                                    event={event}
                                    START_HOUR={START_HOUR}
                                    ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                />
                            ))
                    }
                </div>
            ))}
        </main>
    );
}