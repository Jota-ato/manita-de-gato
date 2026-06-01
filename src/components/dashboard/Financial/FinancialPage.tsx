import { getFinancialData } from "@/lib/dashboard/income/actions";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { addYears, subYears } from "date-fns";
import { TZDate } from "react-day-picker";
import FinancialDashboard from "./FinancialDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function FinancialPage() {

    const startRange = subYears(new TZDate(new Date(), TIMEZONE), 1);
    const endRange = addYears(new TZDate(startRange, TIMEZONE), 2);

    const response = await getFinancialData(startRange, endRange);

    if (!response.success) {
        return (
            <section className="p-16 max-w-4xl mx-auto">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error al cargar finanzas</AlertTitle>
                    <AlertDescription>
                        {response.message}
                    </AlertDescription>
                </Alert>
            </section>
        );
    }

    return (
        <section className="p-16">
            <FinancialDashboard appointments={response.data} />
        </section>
    )
}