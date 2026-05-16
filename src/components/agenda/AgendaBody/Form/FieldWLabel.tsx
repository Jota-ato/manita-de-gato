import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

interface FieldWLabelProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label: string;
};

export default function FieldWLabel({ label, error, ...props }: FieldWLabelProps) {
    return (
        <Field>
            <FieldLabel
                htmlFor={props.id}
            >
                {label}
            </FieldLabel>
            <Input
                id={props.id}
                {...props}
            />
            {error &&
                <FieldError>
                    {error}
                </FieldError>}
        </Field>
    )
}