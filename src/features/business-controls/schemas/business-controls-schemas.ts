import { z } from "zod"

export const businessControlsSchema = z.object({
    startHour: z.string({ error: "Start hour is required" }),
    slotsPerDay: z.number().int().min(1, "Slots per day must be at least 1"),
    slotDuration: z.number().int().min(1, "Slot duration must be at least 1 minute"),
    bannerImage: z.url("Banner image must be a valid URL").optional().nullable(),
})

export type BusinessControlsInput = z.infer<typeof businessControlsSchema>