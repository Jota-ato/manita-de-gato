'use client';

import { Appointment } from "@/lib/supabase/schemas";
import DailyIncomeChart from "./DailyIncomeChart";
import ServiceIncomeChart from "./ServiceIncomeChart";
import FinancialKPIs from "./FinancialKPIs";
import TimeRangeFilter from "./TimeRangeFilter";

interface FinancialDashboardProps {
    appointments: Appointment[];
}

export default function FinancialDashboard({ appointments }: FinancialDashboardProps) {
    return (
        <div className="space-y-8 w-[90%] max-w-6xl mx-auto">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Resumen de Ingresos</h2>
                    <p className="text-sm text-muted-foreground">
                        Visualización de métricas según el periodo seleccionado.
                    </p>
                </div>
                <TimeRangeFilter />
            </div>

            <FinancialKPIs appointments={appointments} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DailyIncomeChart appointments={appointments} />
                <ServiceIncomeChart appointments={appointments} />
            </div>
        </div>
    );
}