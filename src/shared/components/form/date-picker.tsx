// date-picker.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"

import { Control, Path, UseFormSetValue, useWatch, FieldValues } from "react-hook-form"

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>
  setValue: UseFormSetValue<T>
  name: Path<T>
  label?: string
  placeholder?: string
}

export function DatePicker<T extends FieldValues>({
  control,
  setValue,
  name,
  label = "Fecha",
  placeholder = "Seleccionar fecha",
}: DatePickerProps<T>) {
  const [open, setOpen] = React.useState(false)
  const selectedDate = useWatch({ control, name }) as Date | undefined

  const handleDateSelect = (date: Date | undefined) => {
    setValue(name, date as any, { shouldValidate: true, shouldDirty: true })
    setOpen(false)
  }

  return (
    <FieldGroup className="mx-auto flex-col">
      <Field>
        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={name}
              variant="outline"
              className="w-full justify-between font-normal"
            >
              {selectedDate ? (
                format(selectedDate, "PPP", { locale: es })
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              defaultMonth={selectedDate}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </FieldGroup>
  )
}