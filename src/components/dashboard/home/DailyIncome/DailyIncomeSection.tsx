import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import DailyIncomeChart from "./DailyIncomeChart";

export default function DailyIncomeSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingresos esperados</CardTitle>
                <CardDescription className="sr-only">Relación entre ingresos de citas pagadas y citas aprobradas</CardDescription>
            </CardHeader>
            <CardContent>
                <DailyIncomeChart />
            </CardContent>
        </Card>
    )
}