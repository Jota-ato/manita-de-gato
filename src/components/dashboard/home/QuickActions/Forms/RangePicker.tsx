"use client"

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface DateRangePickerTimeProps<T extends FieldValues> {
    control: Control<T>;
    nameStartDate: Path<T>;
    nameEndDate: Path<T>;
    nameStartTime: Path<T>;
    nameEndTime: Path<T>;
    startDateError?: string;
    endDateError?: string;
    startTimeError?: string;
    endTimeError?: string;
    label?: string;
}

export default function RangePicker<T extends FieldValues>({
    control,
    nameStartDate,
    nameEndDate,
    nameStartTime,
    nameEndTime,
    startDateError,
    endDateError,
    startTimeError,
    endTimeError,
    label = 'Rango de Fechas',
}: DateRangePickerTimeProps<T>) {
    return (
        <FieldGroup className="grid grid-cols-2 gap-4">
            {/* CALENDARIO DE RANGO */}
            <Field className="col-span-2">
                <FieldLabel>{label}</FieldLabel>
                <Controller
                    control={control}
                    name={nameStartDate}
                    render={({ field: startField }) => (
                        <Controller
                            control={control}
                            name={nameEndDate}
                            render={({ field: endField }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start w-full font-normal px-3">
                                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                            {startField.value ? (
                                                endField.value ? (
                                                    <>
                                                        {format(startField.value, "PPP", { locale: es })}
                                                        {" — "}
                                                        {format(endField.value, "PPP", { locale: es })}
                                                    </>
                                                ) : (
                                                    format(startField.value, "PPP", { locale: es })
                                                )
                                            ) : (
                                                <span className="text-muted-foreground">Seleccionar rango</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="range"
                                            defaultMonth={startField.value}
                                            selected={{
                                                from: startField.value,
                                                to: endField.value,
                                            }}
                                            onSelect={(range) => {
                                                startField.onChange(range?.from);
                                                endField.onChange(range?.to);
                                            }}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    )}
                />
                {(startDateError || endDateError) && (
                    <FieldError>{startDateError ?? endDateError}</FieldError>
                )}
            </Field>

            {/* HORA INICIO */}
            <Field>
                <FieldLabel>Hora Inicio</FieldLabel>
                <Controller
                    control={control}
                    name={nameStartTime}
                    render={({ field }) => (
                        <Input type="time" {...field} />
                    )}
                />
                {startTimeError && <FieldError>{startTimeError}</FieldError>}
            </Field>

            {/* HORA FIN */}
            <Field>
                <FieldLabel>Hora Fin</FieldLabel>
                <Controller
                    control={control}
                    name={nameEndTime}
                    render={({ field }) => (
                        <Input type="time" {...field} />
                    )}
                />
                {endTimeError && <FieldError>{endTimeError}</FieldError>}
            </Field>
        </FieldGroup>
    );
}