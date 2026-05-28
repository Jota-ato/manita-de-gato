import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import DailyIncomeChart from "./DailyIncomeChart";
import { TZDate } from "@date-fns/tz";
import { Appointment } from "@/lib/supabase/schemas";
import { getExpectedPaidAppointments } from "@/lib/dashboard/income/utils";

interface DailyIncomeSectionProps { 
    today: TZDate,
    todayAppointments: Appointment[]
}

export default async function DailyIncomeSection({ today, todayAppointments }: DailyIncomeSectionProps) {

    const { expected, paid } = getExpectedPaidAppointments(todayAppointments);

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Ingresos esperados</CardTitle>
                <CardDescription className="sr-only">Relación entre ingresos de citas pagadas y citas aprobradas</CardDescription>
            </CardHeader>
            <CardContent >
                <DailyIncomeChart
                    expected={expected}
                    paid={paid}
                    today={today}
                />
            </CardContent>
        </Card>
    )
}