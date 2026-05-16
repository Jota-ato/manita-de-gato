import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";

export default function SecondaryCollapsable() {
    return (
        <Collapsible className="mb-4">
            <CollapsibleTrigger asChild>
                <p className="flex items-center gap-2 cursor-pointer">
                    ¿Te gustaría compartir un teléfono alternativo?
                    <ChevronDown />
                </p>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
                <Field className="my-2">
                    <Input
                        type="text"
                        name="secondaryPhone"
                        id="secondaryPhone"
                    />
                </Field>
            </CollapsibleContent>
        </Collapsible>
    )
}