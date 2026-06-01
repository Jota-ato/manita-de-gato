import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldWLabelProps =
    | ({
        textarea?: false;
        error?: string;
        label: string;
    } & InputHTMLAttributes<HTMLInputElement>)
    | ({
        textarea: true;
        error?: string;
        label: string;
    } & TextareaHTMLAttributes<HTMLTextAreaElement>);

export default function FieldWLabel(props: FieldWLabelProps) {

    const { label, error, className, textarea, ...restProps } = props;

    return (
        <Field className={className}>
            <FieldLabel htmlFor={restProps.id}>
                {label}
            </FieldLabel>

            {textarea ? (
                <Textarea {...(restProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
            ) : (
                <Input {...(restProps as InputHTMLAttributes<HTMLInputElement>)} />
            )}

            {error && (
                <FieldError>
                    {error}
                </FieldError>
            )}
        </Field>
    );
}