'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    type ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";
import { format } from "date-fns";

const chartConfig = {
    Expected: {
        label: "Esperado",
        color: "var(--chart-2)",
    },
    Paid: {
        label: "Cobrado",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;

const chartData = [
    {
        period: format(new Date(), 'dd MMMM yyyy'),
        Expected: 3000,
        Paid: 1800
    },
];

export default function DailyIncomeChart() {
    return (
        <ChartContainer config={chartConfig} className="min-h-50 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="period"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar dataKey="Expected" fill="var(--color-Expected)" radius={4} />
                <Bar dataKey="Paid" fill="var(--color-Paid)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}