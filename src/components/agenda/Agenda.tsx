import AgendaView from "@/components/agenda/AgendaView";
import { getEventsFromDay } from "@/lib/agenda";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { TZDate } from "@date-fns/tz";

export default async function Agenda() {

    const today = new TZDate(new Date, TIMEZONE)
    const events = getEventsFromDay(today);

    return (
        <AgendaView />
    )
}