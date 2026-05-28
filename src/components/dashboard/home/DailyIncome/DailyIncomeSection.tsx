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
import { formatPriceMXN } from "@/lib/utils/currency";
import { Separator } from "@/components/ui/separator";

interface DailyIncomeSectionProps {
    today: TZDate,
    todayAppointments: Appointment[]
}

export default async function DailyIncomeSection({ today, todayAppointments }: DailyIncomeSectionProps) {

    const { expected, paid } = getExpectedPaidAppointments(todayAppointments);

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    Ingresos esperados
                    <Separator orientation="vertical" />
                    <p className="text-success-foreground">{formatPriceMXN(paid)}<span className="text-muted-foreground">/{formatPriceMXN(expected)}</span></p>
                </CardTitle>
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