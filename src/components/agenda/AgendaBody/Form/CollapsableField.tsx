import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import type { InputHTMLAttributes } from 'react';

interface SecondaryCollapsableProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label: string;
};

export default function CollapsableField({ label, error, ...props }: SecondaryCollapsableProps) {
    const inputId = props.id || props.name;

    return (
        <Collapsible className="mb-4">
            <CollapsibleTrigger asChild>
                <label
                    htmlFor={inputId}
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                >
                    {label}
                    <ChevronDown className="h-4 w-4" />
                </label>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
                <Field className="my-2">
                    <Input
                        id={props.id}
                        {...props}
                    />
                    {error &&
                        <FieldError>
                            {error}
                        </FieldError>
                    }
                </Field>
            </CollapsibleContent>
        </Collapsible>
    )
}