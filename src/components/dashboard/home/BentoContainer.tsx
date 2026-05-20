import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { AppointmentSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { format, isSameDay } from "date-fns";
import { es } from 'date-fns/locale';
import { CalendarDays, User, Stethoscope } from "lucide-react"
import DurationBadge from "./DurationBadge";

import { TZDate, tz } from "@date-fns/tz";

const TIMEZONE = "America/Mexico_City";
import { formatAppointmentDates } from "@/lib/supabase/utils/helpers";

export default async function BentoContainer() {

    const UTCtoday = new Date();
    const today = new TZDate(UTCtoday, TIMEZONE);

    const formattedDate = format(
        today,
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es, in: tz(TIMEZONE) }
    );

    const supabase = await createClient();

    const { data } = await supabase.
        from('Appointments')
        .select('*');

    const appointments = (data ?? []).flatMap((appointment) => {
        const result = AppointmentSchema.safeParse(appointment);

        return result.success ? [formatAppointmentDates(result.data)] : [];
    });

    const todayAppointments = appointments.map((appointment) => isSameDay(appointment.timeMin, today) ? appointment : false).filter(appointment => typeof appointment !== 'boolean');

    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <div className="w-[90%] max-w-480 grid md:grid-cols-2 gap-6">
            <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div>
                        <CardTitle className="text-base font-medium">Citas del día</CardTitle>
                        <CardDescription className="text-sm">{capitalizedDate}</CardDescription>
                    </div>
                    <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        {todayAppointments.length} citas
                    </span>
                </CardHeader>

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
            </Card>
            <Card>
                1 columna
            </Card>
            <Card>
                1 columna
            </Card>
        </div>
    )
}