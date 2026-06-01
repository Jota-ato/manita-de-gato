import { getFinancialData } from "@/lib/dashboard/income/actions";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { endOfYear, startOfYear } from "date-fns";
import { TZDate } from "react-day-picker";
import FinancialDashboard from "./FinancialDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function FinancialPage() {

    const startRange = startOfYear(new TZDate(new Date(), TIMEZONE));
    const endRange = endOfYear(new TZDate(startRange, TIMEZONE));

    const response = await getFinancialData(startRange, endRange);

    if (!response.success) {
        return (
            <section className="p-16 max-w-4xl mx-auto min-h-screen flex items-center">
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