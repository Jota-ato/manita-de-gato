import {
    Card,
} from "@/components/ui/card";
import DailyAppointments from "./DailyAppointments/DailyAppointmentsSection";
import DailyIncomeSection from "./DailyIncome/DailyIncomeSection";

export default async function BentoContainer() {

    return (
        <div className="w-[90%] max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
            <DailyAppointments />
            <Card>
                1 columna
            </Card>
            <DailyIncomeSection />
        </div>
    )
}