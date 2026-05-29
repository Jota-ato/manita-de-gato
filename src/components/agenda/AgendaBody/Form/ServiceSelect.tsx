'use client';

import { Controller, FieldValues, Path, type Control } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldError } from "@/components/ui/field";
import { Service } from '@/schemas/services';
import { formatPriceMXN } from "@/lib/utils/currency";

interface ServiceSelectProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    error?: string;
    services: Service[]
}

export default function ServiceSelect<T extends FieldValues>({ 
    control, 
    name,
    error, 
    services 
}: ServiceSelectProps<T>) {

    return (
        <Field>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name={field.name}
                    >
                        <SelectTrigger ref={field.ref}>
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
                                        <h3 className="w-full">
                                            {service.name} -
                                            <span className="text-muted-foreground ml-auto">
                                                {formatPriceMXN(service.min_price)}
                                            </span>
                                        </h3>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {error &&
                <FieldError>
                    {error}
                </FieldError>
            }
        </Field>
    );
}