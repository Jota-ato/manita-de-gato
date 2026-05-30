'use client'
import { useState, useEffect, useMemo } from "react";
import { startOfWeek, addDays, addHours, startOfDay, subDays, endOfDay } from "date-fns";
import AgendaHeader from "./AgendaHeader";
import AgendaBody from "./AgendaBody";
import { Appointment } from "@/lib/supabase/schemas";
import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";

interface AgendaViewProps {
    events: Appointment[]
    today: TZDate
}

export default function AgendaView({ events, today }: AgendaViewProps) {
    const [daysToShow, setDaysToShow] = useState(3);
    const [viewDate, setViewDate] = useState<TZDate>(today);

    // Responsive Logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setDaysToShow(3);
            else if (window.innerWidth < 1024) setDaysToShow(5);
            else setDaysToShow(7);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startOfView = daysToShow === 7
        ? startOfWeek(viewDate, { weekStartsOn: 1 })
        : startOfDay(viewDate);

    const endOfView = endOfDay(addDays(startOfView, daysToShow - 1));

    const visibleEvents = useMemo(() => {
        return events.filter(event => {
            const safeStartDate = new TZDate(event.timeMin, TIMEZONE);
            const safeEndDate = new TZDate(event.timeMax, TIMEZONE);
            return (
                safeStartDate.toISOString() <= endOfView.toISOString() &&
                safeEndDate.toISOString() >= startOfView.toISOString()
            );
        });
    }, [events, startOfView, endOfView]);

    const weekDays = Array.from({ length: daysToShow }).map((_, i) => addDays(startOfView, i));

    const nextPeriod = () => setViewDate(prev => addDays(prev, daysToShow));
    const prevPeriod = () => setViewDate(prev => subDays(prev, daysToShow));

    const hours = Array.from({ length: 5 }).map((_, i) =>
        addHours(startOfDay(startOfView), 10 + (2 * i))
    );

    return (
        <div className="w-[90%] max-w-6xl rounded-2xl border shadow-sm overflow-hidden relative">
            <AgendaHeader
                weekDays={weekDays}
                today={today}
                onNext={nextPeriod}
                onPrev={prevPeriod}
            />
            <AgendaBody
                weekDays={weekDays}
                hours={hours}
                events={visibleEvents}
            />
        </div>
    );
}