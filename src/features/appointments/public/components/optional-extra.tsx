import { Check, Plus } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { formatMXN } from "@/shared/lib/currency"
import { ServiceExtraItem } from "../types/public-appointments.types"

export function OptionalExtraItem({
    extra,
    isSelected,
    onToggle,
}: {
    extra: ServiceExtraItem
    isSelected: boolean
    onToggle: () => void
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={isSelected}
            className={cn(
                "w-full rounded-md border p-4 text-left transition-colors flex items-center justify-between gap-3",
                isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary hover:bg-secondary/80"
            )}
        >
            <span className="flex items-center gap-3">
                <span
                    className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/40 text-muted-foreground"
                    )}
                >
                    {isSelected ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    ) : (
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    )}
                </span>
                <span className="font-bold text-accent-foreground">
                    {extra.extra.name}
                </span>
            </span>
            <span className="text-muted-foreground font-normal shrink-0">
                {formatMXN(+extra.extra.price)}
            </span>
        </button>
    )
}