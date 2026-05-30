import AgendaView from "@/components/agenda/AgendaView";
import { getEventsFromDay } from "@/lib/agenda";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { TZDate } from "@date-fns/tz";
import RealtimeListenerDashboard from "../home/DailyAppointments/RealTimeListenerDashboard";


export default async function AgendaDashboard() {

    const today = new TZDate(new Date, TIMEZONE)
    const events = await getEventsFromDay({ day: today, scope: ['approved', 'no_show', 'paid', 'pending'] });

    return (
        <>
            <RealtimeListenerDashboard />
            <AgendaView
                events={events}
                today={today}
            />
        </>

    )
}