import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { HTMLInputTypeAttribute } from "react";

interface FieldWLabelProps { 
    field: {
        name: string
        type: HTMLInputTypeAttribute
    },
    label: string
}

export default function FieldWLabel({ field, label } : FieldWLabelProps) {
    return (
        <Field>
            <FieldLabel
                htmlFor={field.name}
            >
                {label}
            </FieldLabel>
            <Input
                type={field.type}
                name={field.name}
                id={field.name}
            />
        </Field>
    )
}