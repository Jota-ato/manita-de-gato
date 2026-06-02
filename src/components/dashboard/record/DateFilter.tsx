'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DateFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentDate = searchParams.get("date") || "";

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (newDate) {
            params.set("date", newDate);
        } else {
            params.delete("date");
        }

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    const removeFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("date");
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col sm:flex-row md:items-center gap-3">
            <Field className="flex flex-row items-center space-y-0">
                <FieldLabel htmlFor="date-filter" className="whitespace-nowrap sm:-mr-6">
                    Buscar desde:
                </FieldLabel>
                <Input
                    id="date-filter"
                    type="date"
                    value={currentDate}
                    onChange={handleDateChange}
                    className="w-full"
                />
            </Field>

            <Button
                onClick={removeFilter}
            >
                Eliminar filtro
            </Button>
        </div>
    );
}