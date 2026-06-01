'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TimeRange = "day" | "week" | "month" | "year";

export default function TimeRangeFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentRange = (searchParams.get("range") as TimeRange) || "month";

    const handleValueChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("range", value);

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <Tabs value={currentRange} onValueChange={handleValueChange} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="day">Día</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
                <TabsTrigger value="year">Año</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}