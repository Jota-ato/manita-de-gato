import { Extra } from "@/db/schema/extras"
import { ServiceExtraItem } from "../types/public-appointments.types"
import { OptionalExtraItem } from "./optional-extra"

export function OptionalExtrasList({
    extras,
    selectedExtras,
    onToggle,
}: {
    extras: ServiceExtraItem[]
    selectedExtras: Extra[]
    onToggle: (extra: Extra) => void
}) {
    if (extras.length === 0) return null

    return (
        <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Add extras
            </p>
            <div className="space-y-2">
                {extras.map((extra) => (
                    <OptionalExtraItem
                        key={extra.id}
                        extra={extra}
                        isSelected={selectedExtras.includes(extra.extra)}
                        onToggle={() => onToggle(extra.extra)}
                    />
                ))}
            </div>
        </div>
    )
}