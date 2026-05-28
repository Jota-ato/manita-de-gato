import AgendaView from "@/components/agenda/AgendaView";
import { getEventsFromDay } from "@/lib/agenda";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { TZDate } from "@date-fns/tz";
import RealtimeListenerPublic from "../dashboard/home/DailyAppointments/table/RealTimeListenerPublic";

export default async function Agenda() {

    const today = new TZDate(new Date, TIMEZONE)
    const events = await getEventsFromDay(today);

    return (
        <>
            <RealtimeListenerPublic />
            <AgendaView
                events={events}
                today={today}
            />
        </>

    )
}