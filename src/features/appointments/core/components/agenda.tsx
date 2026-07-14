'use client'
import { useState, useEffect, useMemo } from "react";
import { startOfWeek, addDays, addHours, startOfDay, subDays, endOfDay } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { Appointment, BusinessControls } from "@/db/schema";
import { FullAppointment } from "../types/appointments.types";
import { AgendaHeader } from "./agenda-header";
import { AgendaBody } from "./agenda-body";

export function Agenda({
    events,
    today,
    isAdmin = false,
    businessControls: { slotDuration, slotsPerDay, startHour, bannerImage }
}: {
    events: (Appointment | FullAppointment | { startTime: Date, endTime: Date })[]
    today: TZDate
    isAdmin?: boolean
    businessControls: BusinessControls
}) {
    const [daysToShow, setDaysToShow] = useState(3);
    const [viewDate, setViewDate] = useState<TZDate>(today);
    const safeStartHour = new TZDate(startHour)
    const [startHourHours, startHourMinutes] = safeStartHour.toISOString().split("T")[1].split(":").map(Number)

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

    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const maxDate = addDays(today, 30);

    const startOfView = daysToShow === 7
        ? startOfWeek(viewDate, { weekStartsOn: 1 })
        : startOfDay(viewDate);

    const endOfView = endOfDay(addDays(startOfView, daysToShow - 1));
    const visibleEvents = useMemo(() => events
        .filter(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);

            const isValid = eventStart <= endOfView &&
                eventEnd >= startOfView
            return isValid
        }
        )
        , [events, startOfView, endOfView]);

    const weekDays = Array.from({ length: daysToShow }).map((_, i) => addDays(startOfView, i));

    const nextPeriod = () => setViewDate(prev => {
        const newDate = addDays(prev, daysToShow);
        const newStart = daysToShow === 7
            ? startOfWeek(newDate, { weekStartsOn: 1 })
            : startOfDay(newDate);
        return newStart <= maxDate ? newDate : prev;
    });

    const prevPeriod = () => setViewDate(prev => {
        const newDate = subDays(prev, daysToShow);
        const newStart = daysToShow === 7
            ? startOfWeek(newDate, { weekStartsOn: 1 })
            : startOfDay(newDate);
        return newStart >= weekStart ? newDate : prev;
    });

    const hours = Array.from({ length: slotsPerDay }).map((_, i) =>
        addHours(startOfDay(startOfView), (startHourHours + startHourMinutes / 60) + ((slotDuration / 60) * i))
    );


    return (
        <div className="w-full rounded-2xl border shadow-sm overflow-hidden relative">
            <AgendaHeader
                weekDays={weekDays}
                today={today}
                onNext={nextPeriod}
                onPrev={prevPeriod}
                bannerImage={bannerImage}
            />
            <AgendaBody
                isAdmin={isAdmin}
                weekDays={weekDays}
                hours={hours}
                events={visibleEvents} 
                slotDuration={slotDuration}
            />
        </div>
    );
}