import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarDays, Stethoscope, User } from "lucide-react";
import DurationBadge from "./DurationBadge";
import { TZDate, tz } from "@date-fns/tz";

interface DailyAppointmentsTableProps {
    todayAppointments: {
        id: string;
        client_id: string;
        service_id: number;
        timeMin: TZDate;
        timeMax: TZDate;
    }[],
    TIMEZONE: string
}

export default function DailyAppointmentsTable({ todayAppointments, TIMEZONE } : DailyAppointmentsTableProps) {
    return (
        <CardContent className="p-0">
            {todayAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                    <CalendarDays className="w-8 h-8 opacity-40" />
                    <p className="text-sm">Sin citas para hoy</p>
                </div>
            ) : (
                <ul className="divide-y divide-border">
                    {todayAppointments.map((apt) => (
                        <li
                            key={apt.id}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                        >
                            {/* Franja de tiempo */}
                            <div className="flex flex-col items-center min-w-13">
                                <span className="text-sm font-semibold tabular-nums leading-tight">
                                    {format(apt.timeMin, 'HH:mm', { in: tz(TIMEZONE) })}
                                </span>
                                <span className="text-[10px] text-muted-foreground leading-none my-0.5">—</span>
                                <span className="text-xs text-muted-foreground tabular-nums leading-tight">
                                    {format(apt.timeMax, 'HH:mm', { in: tz(TIMEZONE) })}
                                </span>
                            </div>

                            {/* Separador vertical */}
                            <div className="w-px h-10 bg-border shrink-0" />

                            {/* Info de la cita */}
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                    <span className="text-sm font-medium truncate">{apt.client_id}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Stethoscope className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                    <span className="text-xs text-muted-foreground">
                                        Servicio #{apt.service_id}
                                    </span>
                                </div>
                            </div>

                            {/* Badge de duración */}
                            <DurationBadge timeMin={apt.timeMin} timeMax={apt.timeMax} />
                        </li>
                    ))}
                </ul>
            )}
        </CardContent>
    )
}