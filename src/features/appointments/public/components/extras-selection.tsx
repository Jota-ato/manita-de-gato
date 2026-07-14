import { ServiceWithExtras } from "@/features/services/types/service.types"
import { Button } from "@/shared/components/ui/button"
import { ChevronRight } from "lucide-react"
import { IncludedExtrasList } from "./included-extras-list"
import { OptionalExtrasList } from "./optional-extras-list"
import { useBookingStore } from "../store/booking-store"
import { Extra } from "@/db/schema"

export function ExtrasSelection({ service }: { service: ServiceWithExtras }) {
    const included = service.serviceExtras.filter((extra) => extra.included)
    const optional = service.serviceExtras.filter((extra) => !extra.included)
    const { addExtra, removeExtra, selectedExtras, setOpenConfirmationDialog } = useBookingStore()

    const handleToggle = (extra: Extra) => {
        if (selectedExtras.includes(extra)) {
            removeExtra(extra)
        } else {
            addExtra(extra)
        }
    }

    return (
        <section className="space-y-4">
            <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <IncludedExtrasList extras={included} />
                <OptionalExtrasList
                    extras={optional}
                    selectedExtras={selectedExtras}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex justify-end items-center gap-2">
                <Button onClick={() => setOpenConfirmationDialog(true)}>
                    Continue <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}