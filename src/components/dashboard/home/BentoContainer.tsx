import {
    Card,
} from "@/components/ui/card";
import DailyAppointments from "./DailyAppointments/DailyAppointmentsSection";

export default async function BentoContainer() {

    return (
        <div className="w-[90%] max-w-480 grid md:grid-cols-2 gap-6">
            <DailyAppointments />
            <Card>
                1 columna
            </Card>
            <Card>
                1 columna
            </Card>
        </div>
    )
}