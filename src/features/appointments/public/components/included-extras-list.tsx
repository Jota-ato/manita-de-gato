import { ServiceExtraItem } from "../types/public-appointments.types"
import { IncludedExtraItem } from "./included-extra-item"

export function IncludedExtrasList({ extras }: { extras: ServiceExtraItem[] }) {
    if (extras.length === 0) return null

    return (
        <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Already included
            </p>
            <div className="space-y-2">
                {extras.map((extra) => (
                    <IncludedExtraItem key={extra.id} extra={extra} />
                ))}
            </div>
        </div>
    )
}