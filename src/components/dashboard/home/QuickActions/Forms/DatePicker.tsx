import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DatePickerTime() {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <FieldGroup className="grid grid-cols-2">
            <Field className="col-span-2">
                <FieldLabel htmlFor="date-picker-optional">Fecha</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker-optional"
                            className="w-32 justify-between font-normal"
                        >
                            {date ? format(date, 'dd MMMM yyyy') : "Seleccionar fecha"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            defaultMonth={date}
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <Field>
                <FieldLabel htmlFor="timeMin">Tiempo de inicio</FieldLabel>
                <Input
                    type="time"
                    id="timeMin"
                    step="1"
                    defaultValue="10:00:00"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="timeMax">Tiempo de fin</FieldLabel>
                <Input
                    type="time"
                    id="timeMax"
                    step="1"
                    defaultValue="10:00:000"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </Field>
        </FieldGroup>
    )
}