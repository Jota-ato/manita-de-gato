'use client'
import { useState, useEffect } from "react";
import { startOfWeek, addDays, addHours, startOfDay, subDays, endOfDay } from "date-fns";
import AgendaHeader from "./AgendaHeader";
import AgendaBody from "./AgendaBody";
import { getEvents } from "@/lib/agenda";
import type { GoogleCalendarEvent } from "@/lib/calendar/schemas";

export default function AgendaView() {
    // 1. Inicializa la fecha como null
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [daysToShow, setDaysToShow] = useState(3);
    const [appointments, setAppointments] = useState<GoogleCalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    // 2. Establece la fecha real solo en el cliente
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentDate(new Date());
    }, []);

    // Effect: Fetch events whenever the range or view changes
    useEffect(() => {
        // Bloqueamos la ejecución si la fecha aún no existe
        if (!currentDate) return;

        const fetchCurrentEvents = async () => {
            setIsLoading(true);
            try {
                const viewStart = daysToShow === 7 ?
                    startOfWeek(currentDate, { weekStartsOn: 1 })
                    : currentDate;
                const timeMin = startOfDay(viewStart);
                const timeMax = endOfDay(addDays(viewStart, daysToShow - 1));

                const data = await getEvents({ timeMin, timeMax });
                setAppointments(data);
            } catch (error) {
                console.error("Error loading appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentEvents();
    }, [currentDate, daysToShow]);

    // 3. Early return (después de todos los hooks) mientras se carga la fecha real
    if (!currentDate) {
        // Puedes cambiar esto por un skeleton de la agenda para que se vea mejor
        return <div className="w-full h-125 flex items-center justify-center border rounded-2xl">Cargando calendario...</div>;
    }

    // A partir de este punto, el código es 100% ejecutado en el cliente de forma segura
    const today = new Date();

    const startOfView = daysToShow === 7 ?
        startOfWeek(currentDate, { weekStartsOn: 1 })
        : currentDate;

    const weekDays = Array.from({ length: daysToShow }).map((_, i) => addDays(startOfView, i));

    const nextPeriod = () => setCurrentDate(prev => prev ? addDays(prev, daysToShow) : new Date());
    const prevPeriod = () => setCurrentDate(prev => prev ? subDays(prev, daysToShow) : new Date());

    const hours = Array.from({ length: 5 }).map((_, i) =>
        addHours(startOfDay(startOfView), 10 + (2 * i))
    );

    return (
        <div className="w-full rounded-2xl border shadow-sm overflow-hidden relative">
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