'use client'
import { useState, useEffect } from "react";
import { startOfWeek, addDays, addHours, startOfDay, subDays } from "date-fns";
import AgendaHeader from "./AgendaHeader";
import AgendaBody from "./AgendaBody";

export function AgendaView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysToShow, setDaysToShow] = useState(3);
    const today = new Date();

    // Responsive Logic: Update number of days based on width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setDaysToShow(3);
            else if (window.innerWidth < 1200) setDaysToShow(5);
            else setDaysToShow(7);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Pagination Functions
    const nextPeriod = () => setCurrentDate(prev => addDays(prev, daysToShow));
    const prevPeriod = () => setCurrentDate(prev => subDays(prev, daysToShow));

    const startOfView = daysToShow === 7 ?
        startOfWeek(currentDate, { weekStartsOn: 1 })
        : currentDate;
    const weekDays = Array.from({ length: daysToShow }).map((_, i) => addDays(startOfView, i));

    const startHour = 9;
    const endHour = 21;
    const hours = Array.from({ length: endHour - startHour + 1 }).map((_, i) =>
        addHours(startOfDay(currentDate), startHour + i)
    );

    return (
        <div className="w-full rounded-2xl border">
            <AgendaHeader
                weekDays={weekDays}
                today={today}
                onNext={nextPeriod}
                onPrev={prevPeriod}
            />
            <AgendaBody
                weekDays={weekDays}
                hours={hours}
            />
        </div>
    );
}