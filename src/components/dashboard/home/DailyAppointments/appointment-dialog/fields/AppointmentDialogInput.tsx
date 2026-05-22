'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { updateAppointment } from "@/lib/dashboard/actions";
import { Appointment } from "@/lib/supabase/schemas";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { BiMoney } from "react-icons/bi";

export default function AppointmentDialogInput({ apt }: { apt: Appointment }) {

    const [price, setPrice] = useState<number | string>(apt.total_price);
    const [isPending, startTransition] = useTransition();

    function handleUpdatePrice(value: number | string) {
        const newPrice = Number(value)
        if (isNaN(newPrice)) return;

        startTransition(async () => {
            try {
                await updateAppointment(apt.id, {
                    total_price: newPrice
                });
            } catch {
                setPrice(apt.total_price);
            }
        });
    }

    return (
        <Field>
            <FieldLabel
                htmlFor="price"
            >
                <BiMoney className="size-4 text-muted-foreground shrink-0" />
                <p className="text-muted-foreground">Ingresar coste total</p>
            </FieldLabel>
            <Input
                name="price"
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                disabled={isPending}
            />
            <Button
                onClick={() => handleUpdatePrice(price)}
                className={cn(
                    isPending ? 'bg-black/60 cursor-not-allowed' : ''
                )}
                disabled={isPending}
            >
                {isPending ? <span className="flex items-center gap-2"><Spinner />Actualizando</span>: 'Actualizar'}
            </Button>
        </Field>
    )
}