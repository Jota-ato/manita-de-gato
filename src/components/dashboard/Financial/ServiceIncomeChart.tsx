'use client';

import { Appointment } from "@/lib/supabase/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { formatPriceMXN } from "@/lib/utils/currency";

export default function ServiceIncomeChart({ appointments }: { appointments: Appointment[] }) {

    const incomeByServiceRaw = appointments.reduce((acc, app) => {
        const serviceName = app.service_name_snapshot;
        acc[serviceName] = (acc[serviceName] || 0) + app.total_price;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(incomeByServiceRaw)
        .sort(([, valA], [, valB]) => valB - valA)
        .map(([name, value], index) => ({ name, value, index }));

    // ChartConfig se construye dinámicamente a partir de los servicios
    const chartConfig = Object.fromEntries(
        pieChartData.map(({ name }, index) => [
            name,
            {
                label: name,
                color: `var(--chart-${(index % 5) + 1})`,
            },
        ])
    ) satisfies ChartConfig;

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Ingresos por Servicio</CardTitle>
            </CardHeader>
            <CardContent className="h-75 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                        >
                            {pieChartData.map(({ name }, index) => (
                                <Cell
                                    key={name}
                                    fill={`var(--chart-${(index % 5) + 1})`}
                                />
                            ))}
                        </Pie>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="name"
                                    formatter={(value, name) => (
                                        <>
                                            <div
                                                className="h-2.5 w-2.5 shrink-0 rounded-xs"
                                                style={{ backgroundColor: chartConfig[name as string]?.color }}
                                            />
                                            <span className="text-muted-foreground">
                                                {chartConfig[name as string]?.label ?? name}
                                            </span>
                                            <span className="font-mono font-medium tabular-nums text-foreground ml-auto">
                                                {formatPriceMXN(Number(value))}
                                            </span>
                                        </>
                                    )}
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}