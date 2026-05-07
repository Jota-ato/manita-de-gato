'use client'
import { useState } from "react";
import { format, startOfWeek, addDays, addHours, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

export function AgendaView() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i));


    const startHour = 10;
    const endHour = 20;
    const hours = Array.from({ length: endHour - startHour + 1 }).map((_, i) =>
        addHours(startOfDay(currentDate), startHour + i)
    );

    return (
        <div className="flex flex-col h-full w-full bg-background rounded-lg border shadow-sm">
            {/* Cabecera del calendario (Días) */}
            <div className="grid grid-cols-8 w-full border-b bg-muted/30">
                <div className="col-span-1 bg-pink-400" />
                {weekDays.map((day) => (
                    <div key={day.toISOString()} className="col-span-1 p-4 text-center border-l bg-pink-400">
                        <div className="text-sm font-medium text-slate-50 uppercase">
                            {format(day, "EEE", { locale: es })}
                        </div>
                        <div className="text-xl text-slate-50 font-bold mt-1">
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cuerpo del calendario */}
            {/* pt-3 da espacio para que el label de la primera hora (-top-3) no quede cortado */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8 w-full">

                    {/* Columna de horas */}
                    <div className="col-span-1 border-r">
                        {hours.map((hour) => (
                            <div
                                key={hour.toISOString()}
                                className="h-24 pr-4 text-right text-sm text-muted-foreground"
                            >
                                <span className="bg-background px-1">
                                    {format(hour, "HH:mm")}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Cuadrícula de celdas */}
                    <div className="col-span-7 grid grid-cols-7 w-full">
                        {weekDays.map((day) => (
                            <div key={day.toISOString()} className="col-span-1 border-r">
                                {hours.map((hour) => (
                                    <div
                                        key={hour.toISOString()}
                                        className="h-24 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors relative"
                                        onClick={() => console.log(`Clic en: ${format(day, "dd/MM")} a las ${format(hour, "HH:mm")}`)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}