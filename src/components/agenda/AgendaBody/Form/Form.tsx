'use client';

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from 'react'
import { serviceSchema, Service } from '@/schemas/services';
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { formatPriceMXN } from "@/lib/utils/currency";

export default function Form() {

    const supabase = createClient()
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('Services') // Nombre de tu tabla en Supabase
                .select("*")

            if (data) {
                const validateServices = data.map(element => serviceSchema.safeParse(element).data).filter(element => typeof element === 'object');
                setServices(validateServices);
            }
            if (error) console.error("Error cargando servicios:", error);
        }
        fetchServices()
    }, [supabase])

    return (
        <form>
            <FieldGroup>
                <Field>
                    <FieldLabel
                        htmlFor="name"
                    >
                        ¿Cuál es tu nombre?
                    </FieldLabel>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                    />
                </Field>
                <Field>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='Elige tu servicio' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services.map(service => (
                                    <SelectItem
                                        key={service.id}
                                        value={service.id.toString()}
                                        className="w-full"
                                    >
                                        <h3 className="w-full">{service.name} - <span className="text-muted-foreground ml-auto">{formatPriceMXN(service.min_price)}</span></h3>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel
                        htmlFor="phone"
                    >
                        Proporciona un número de teléfono para contactarte
                    </FieldLabel>
                    <Input
                        type="text"
                        name="phone"
                        id="phone"
                    />
                </Field>
            </FieldGroup>
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <p className="flex items-center gap-2 cursor-pointer">
                        ¿Te gustaría compartir un teléfono alternativo?
                        <ChevronDown />
                    </p>
                </CollapsibleTrigger>
                <CollapsibleContent asChild>
                    <Field>
                        <Input
                            type="text"
                            name="phone"
                            id="phone"
                        />
                    </Field>
                </CollapsibleContent>
            </Collapsible>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={'outline'}>Cerrar</Button>
                </DialogClose>
                <Button type="submit">¡Agendar!</Button>
            </DialogFooter>
        </form>
    )
}