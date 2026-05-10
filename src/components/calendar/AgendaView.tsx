'use client'
import { useState } from "react";
import { startOfWeek, addDays, addHours, startOfDay } from "date-fns";
import AgendaHeader from "./AgendaHeader";
import AgendaBody from "./AgendaBody";


export function AgendaView() {
    const [currentDate] = useState(new Date());

    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 3 }).map((_, i) => addDays(startOfCurrentWeek, i));


    const startHour = 9;
    const endHour = 21;
    const hours = Array.from({ length: endHour - startHour + 1 }).map((_, i) =>
        addHours(startOfDay(currentDate), startHour + i)
    );

    return (
        <div className="w-full">
            <AgendaHeader
                weekDays={weekDays}
            />
            <AgendaBody
                weekDays={weekDays}
                hours={hours}
            />
        </div>
    );
}