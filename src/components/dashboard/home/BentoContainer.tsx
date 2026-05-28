import DailyAppointments from "./DailyAppointments/DailyAppointmentsSection";
import DailyIncomeSection from "./DailyIncome/DailyIncomeSection";
import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { getDayAppointments } from "@/lib/dashboard/actions";
import QuickActions from "./QuickActions/QuickActions";

export default async function BentoContainer() {

    const today = new TZDate(new Date(), TIMEZONE);
    const todayAppointments = await getDayAppointments(today);

    return (
        <div className="w-[90%] max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <DailyAppointments
                today={today}
                todayAppointments={todayAppointments}
            />
            <QuickActions />
            <DailyIncomeSection
                today={today}
                todayAppointments={todayAppointments}
            />
        </div>
    )
}