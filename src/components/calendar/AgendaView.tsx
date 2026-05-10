'use client'
import { useState } from "react";
import { format, startOfWeek, addDays, addHours, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
            <header
                className="grid"
                style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
            >
                <div className="bg-pink-400 p-4 flex items-center justify-between flex-col gap-4 text-slate-50">
                    <ArrowLeft className="size-6 cursor-pointer" />
                    <ArrowRight className="size-6 cursor-pointer" />
                </div>
                {weekDays.map(day => (
                    <div
                        key={day.toISOString()}
                        className="bg-pink-400 py-2 border border-border capitalize flex items-center justify-center flex-col"
                    >
                        <p className="text-slate-50">{format(day, 'EEE', { locale: es })}</p>
                        <p className="text-slate-50">{format(day, 'd')}</p>
                    </div>
                ))}
            </header>
            <main
                className="grid"
                style={{ gridTemplateColumns: `5rem repeat(${weekDays.length}, 1fr)` }}
            >
                {/* Columna de horas */}
                <div className="col-span-1">
                    {hours.map(hour => (
                        <div
                            key={hour.toISOString()}
                            className="w-full flex items-center justify-center h-16 border border-border text-muted-foreground"
                        >
                            {format(hour, 'HH:mm')}
                        </div>
                    ))}
                </div>

                {/* Columnas de días */}
                {weekDays.map(day => (
                    <div key={day.toISOString()}>
                        {hours.map(hour => (
                            <div
                                key={hour.toISOString()}
                                className="w-full h-16 border border-border"
                            />
                        ))}
                    </div>
                ))}
            </main>
        </div>
    );
}