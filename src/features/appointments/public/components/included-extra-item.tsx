import { Check } from "lucide-react"
import { ServiceExtraItem } from "../types/public-appointments.types"

export function IncludedExtraItem({ extra }: { extra: ServiceExtraItem }) {
    return (
        <div className="w-full rounded-md border border-dashed border-border bg-muted/40 p-4 flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="font-medium text-foreground">
                {extra.extra.name}
            </span>
        </div>
    )
}