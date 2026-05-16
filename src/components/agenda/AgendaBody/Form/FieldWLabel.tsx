import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FieldWLabelProps { 
    field: {
        name: string
        type: string
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