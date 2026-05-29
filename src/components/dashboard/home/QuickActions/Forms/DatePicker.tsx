// DatePickerTime.tsx
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { Control, FieldValues, Path, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para poner la fecha en español
import { Input } from '@/components/ui/input';

interface DatePickerTimeProps<T extends FieldValues> {
    control: Control<T>;
    nameDate: Path<T>;
    nameStartTime: Path<T>;
    nameEndTime: Path<T>;
    dateError?: string;
    startError?: string;
    endError?: string;
}

export default function DatePickerTime<T extends FieldValues>({
    control, nameDate, nameStartTime, nameEndTime, dateError, startError, endError
}: DatePickerTimeProps<T>) {
    return (
        <FieldGroup className="grid grid-cols-2 gap-4">
            {/* 1. CALENDARIO */}
            <Field className="col-span-2">
                <FieldLabel>Fecha de la Cita</FieldLabel>
                <Controller
                    control={control}
                    name={nameDate}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className="justify-between w-full">
                                    {field.value ? format(field.value, "PPP", { locale: es }) : "Seleccionar una fecha"}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {dateError && <FieldError>{dateError}</FieldError>}
            </Field>

            <Field>
                <FieldLabel>Hora Inicio</FieldLabel>
                <Controller
                    control={control}
                    name={nameStartTime}
                    render={({ field }) => (
                        <Input
                            type="time"
                            {...field}
                        />
                    )}
                />
                {startError && <FieldError>{startError}</FieldError>}
            </Field>

            <Field>
                <FieldLabel>Hora Fin</FieldLabel>
                <Controller
                    control={control}
                    name={nameEndTime}
                    render={({ field }) => (
                        <Input
                            type="time"
                            {...field}
                        />
                    )}
                />
                {endError && <FieldError>{endError}</FieldError>}
            </Field>
        </FieldGroup>
    );
}