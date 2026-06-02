import { getFinancialData } from "@/lib/dashboard/income/actions";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import {
    startOfDay, endOfDay,
    startOfWeek, endOfWeek,
    startOfMonth, endOfMonth,
    startOfYear, endOfYear,
} from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TZDate } from "@date-fns/tz";
import { TimeRange } from "@/components/dashboard/Financial/TimeRangeFilter";
import FinancialDashboard from "@/components/dashboard/Financial/FinancialDashboard";

interface FinancialPageProps {
    searchParams: Promise<{ range?: TimeRange }>
};


function getDateRange(range: TimeRange, timezone: string) {
    const now = new TZDate(new Date(), timezone);

    switch (range) {
        case "day":
            return { start: startOfDay(now), end: endOfDay(now) };
        case "week":
            return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
        case "year":
            return { start: startOfYear(now), end: endOfYear(now) };
        case "month":
        default:
            return { start: startOfMonth(now), end: endOfMonth(now) };
    }
}

export default async function FinancialPage({ searchParams }: FinancialPageProps) {
    const resolvedSearchParams = await searchParams;
    const range = (resolvedSearchParams?.range) || "month";

    const { start: startRange, end: endRange } = getDateRange(range, TIMEZONE);

    const response = await getFinancialData(startRange, endRange, range);

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
        <section className="p-8 md:p-12 min-h-screen flex items-center justify-center">
            <FinancialDashboard data={response.data!} />
        </section>
    );
}