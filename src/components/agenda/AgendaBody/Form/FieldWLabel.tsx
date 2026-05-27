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

    const { label, error, className } = props;

    return (
        <Field className={className}>
            <FieldLabel htmlFor={props.id}>
                {label}
            </FieldLabel>

            {props.textarea ? (
                (() => {
                    const {  ...textareaProps } = props;

                    return (
                        <Textarea
                            {...textareaProps}
                        />
                    );
                })()
            ) : (
                (() => {
                    const { ...inputProps } = props;

                    return (
                        <Input
                            {...inputProps}
                        />
                    );
                })()
            )}

            {error && (
                <FieldError>
                    {error}
                </FieldError>
            )}
        </Field>
    );
}