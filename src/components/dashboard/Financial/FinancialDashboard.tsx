'use client';

import { FinancialMetricsDTO } from "@/lib/dashboard/income/actions";
import IncomeChart from "./IncomeChart";
import ServiceIncomeChart from "./ServiceIncomeChart";
import FinancialKPIs from "./FinancialKPIs";
import TimeRangeFilter from "./TimeRangeFilter";

interface FinancialDashboardProps {
    data: FinancialMetricsDTO;
}

export default function FinancialDashboard({ data }: FinancialDashboardProps) {
    return (
        <div className="space-y-8 w-[90%] max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Resumen de Ingresos</h2>
                    <p className="text-sm text-muted-foreground">
                        Métricas según el periodo seleccionado.
                    </p>
                </div>
                <TimeRangeFilter />
            </div>

            <FinancialKPIs data={data.kpis} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IncomeChart data={data.dailyIncome} />
                <ServiceIncomeChart data={data.serviceIncome} />
            </div>
        </div>
    );
}