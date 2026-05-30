'use client';
import { endOfDay, isSameDay, startOfDay } from "date-fns";
import HoursColumn from "./AgendaBody/HoursColumn";
import EventPublic from "./AgendaBody/EventPublic";
import HourCell from "./AgendaBody/HourCell";
import { Appointment } from "@/lib/supabase/schemas";
import BlockPeriod from "./AgendaBody/BlockPeriod";
import { usePathname } from "next/navigation";
import HourCellDashboard from "../dashboard/Agenda/HourCellDashboard";
import Event from "../dashboard/Agenda/EventDashboard";


interface AgendaBodyProps {
    weekDays: Date[];
    hours: Date[];
    events: Appointment[];
}

export default function AgendaBody({ weekDays, hours, events }: AgendaBodyProps) {
    const ROW_HEIGHT_REM = 5;
    const START_HOUR = 10;
    const pathName = usePathname()


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
            {weekDays.map((day, dayDifference) => {
                const currentDayStart = startOfDay(day);
                const currentDayEnd = endOfDay(day);

                return (
                    <div key={day.toISOString()} className="relative border-r border-muted-foreground last:border-r-0">
                        {pathName.startsWith('/dashboard') ? hours.map((hour) => (
                            <HourCellDashboard key={hour.getTime()} hour={hour} dayDifference={dayDifference} />
                        )) : hours.map((hour) => (
                            <HourCell key={hour.getTime()} hour={hour} dayDifference={dayDifference} />))
                        }

                        {events
                            .filter(event => isSameDay(day, event.timeMin))
                            .map(event => {
                                if (pathName.startsWith('/dashboard'))
                                    return (<Event
                                        key={event.id}
                                        event={event}
                                        START_HOUR={START_HOUR}
                                        ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                    />)
                                return (<EventPublic
                                    key={event.id}
                                    event={event}
                                    START_HOUR={START_HOUR}
                                    ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                />)
                            })
                        }

                        {events
                            .filter(event => {
                                if (event.status !== 'no_show') return false;

                                const eventStart = new Date(event.timeMin);
                                const eventEnd = new Date(event.timeMax);

                                return eventStart <= currentDayEnd && eventEnd >= currentDayStart;
                            })
                            .map(event => (
                                <BlockPeriod
                                    currentColumnDate={day}
                                    key={event.id}
                                    event={event}
                                    START_HOUR={START_HOUR}
                                    ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                                />
                            ))
                        }
                    </div>
                );
            })}
        </main>
    );
}