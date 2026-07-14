import { Extra } from "@/db/schema/extras"
import { ServiceWithExtras } from "@/features/services/types/service.types"

export type ServiceExtraItem = ServiceWithExtras["serviceExtras"][number]

export type NewPublicAppointment = {
    customerId: string
    serviceId: string
    extras: Extra[]
    startTime: Date
    endTime: Date
}