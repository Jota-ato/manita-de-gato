import { isSameDay, parseISO } from "date-fns";
import type { GoogleCalendarEvent } from "@/lib/calendar/schemas";
import { Spinner } from "@/components/ui/spinner";
import HoursColumn from "./AgendaBody/HoursColumn";
import EventPublic from "./AgendaBody/EventPublic";
import HourCell from "./AgendaBody/HourCell";


interface AgendaBodyProps {
    weekDays: Date[];
    hours: Date[];
    events: GoogleCalendarEvent[];
    isLoading: boolean;
}

export default function AgendaBody({ weekDays, hours, events, isLoading }: AgendaBodyProps) {
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
                    {!isLoading && events
                        .filter(event => isSameDay(day, parseISO(event.start.dateTime)))
                        .map(event => (
                            <EventPublic
                                key={event.id}
                                event={event}
                                START_HOUR={START_HOUR}
                                ROW_HEIGHT_REM={ROW_HEIGHT_REM}
                            />
                        ))
                    }
                </div>
            ))}
            {isLoading && (
                <div className="fixed top-auto left-auto flex items-center justify-center bg-white/40 z-20">
                    <Spinner className="text-pink-500" />
                </div>
            )}
        </main>
    );
}