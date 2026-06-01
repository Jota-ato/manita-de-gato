'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    type ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { formatPriceMXN } from "@/lib/utils/currency";
import { es } from "date-fns/locale";

const chartConfig = {
    expected: {
        label: "Esperado",
        color: "var(--chart-2)",
    },
    paid: {
        label: "Cobrado",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;


interface DailyIncomeChartProps {
    today: TZDate
    expected: number
    paid: number
}

export default function DailyIncomeChart({ today, expected, paid }: DailyIncomeChartProps) {

    const chartData = [
        {
            period: format(today, "eeee d 'de' MMMM 'de' yyyy", { locale: es }),
            expected,
            paid
        },
    ];

    return (
        <ChartContainer config={chartConfig} className="min-h-50 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <YAxis
                    tickLine={false}
                    axisLine={false}

                    tickFormatter={(value) => formatPriceMXN(value)}
                />
                <XAxis
                    dataKey="period"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatPriceMXN(Number(value))} />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar dataKey="expected" fill="var(--color-expected)" radius={4} />
                <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}