'use client';

import { Appointment } from "@/lib/supabase/schemas";
import DailyIncomeChart from "./DailyIncomeChart";
import ServiceIncomeChart from "./ServiceIncomeChart";
import FinancialKPIs from "./FinancialKPIs";

interface FinancialDashboardProps {
    appointments: Appointment[];
}

export default function FinancialDashboard({ appointments }: FinancialDashboardProps) {
    return (
        <div className="space-y-8 w-[90%] max-w-6xl mx-auto">
            <FinancialKPIs appointments={appointments} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DailyIncomeChart appointments={appointments} />
                <ServiceIncomeChart appointments={appointments} />
            </div>
        </div>
    );
}