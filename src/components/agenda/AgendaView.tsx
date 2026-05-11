'use client'
import { useState, useEffect } from "react";
import { startOfWeek, addDays, addHours, startOfDay, subDays, endOfDay } from "date-fns";
import AgendaHeader from "./AgendaHeader";
import AgendaBody from "./AgendaBody";
import { getEvents } from "@/lib/agenda";
import type { Appointment } from "@/lib/calendar/schemas";

export default function AgendaView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysToShow, setDaysToShow] = useState(3);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();

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

    // Logic to calculate the range
    const startOfView = daysToShow === 7 ?
        startOfWeek(currentDate, { weekStartsOn: 1 })
        : currentDate;

    const weekDays = Array.from({ length: daysToShow }).map((_, i) => addDays(startOfView, i));

    // Effect: Fetch events whenever the range or view changes
    useEffect(() => {
        const fetchCurrentEvents = async () => {
            setIsLoading(true);
            try {
                // Definimos el rango: desde el inicio del primer día hasta el fin del último

                const viewStart = daysToShow === 7 ?
                    startOfWeek(currentDate, { weekStartsOn: 1 })
                    : currentDate;
                const timeMin = startOfDay(viewStart);
                const timeMax = endOfDay(addDays(viewStart, daysToShow - 1 ));

                // Llamada a la función del servidor (getEvents)
                const data = await getEvents({ timeMin, timeMax });
                setAppointments(data || []);
            } catch (error) {
                console.error("Error loading appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentEvents();
    }, [currentDate, daysToShow]); // Se dispara al cambiar fecha o responsive

    // Pagination
    const nextPeriod = () => setCurrentDate(prev => addDays(prev, daysToShow));
    const prevPeriod = () => setCurrentDate(prev => subDays(prev, daysToShow));

    const hours = Array.from({ length: 13 }).map((_, i) =>
        addHours(startOfDay(currentDate), 8 + i)
    );

    return (
        <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden relative">
            <AgendaHeader
                weekDays={weekDays}
                today={today}
                onNext={nextPeriod}
                onPrev={prevPeriod}
            />
            <AgendaBody
                weekDays={weekDays}
                hours={hours}
                events={appointments}
                isLoading={isLoading}
            />
        </div>
    );
}