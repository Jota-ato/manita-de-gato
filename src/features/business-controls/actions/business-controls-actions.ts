"use server"

import { adminAction } from "@/shared/lib/actions"
import { BusinessControlsInput, businessControlsSchema } from "../schemas/business-controls-schemas"
import { AppError } from "@/shared/lib/errors"
import { businessControlsService } from "../services/business-controls-service"

export const updateBusinessControlsAction = adminAction(async (
    data: BusinessControlsInput,
    id: string
) => {
    const zodResponse = businessControlsSchema.safeParse(data)

    if (!zodResponse.success) throw new AppError("Invalid data")
    const startHour = new Date()
    const [hours, minutes] = zodResponse.data.startHour.split(":").map(Number)
    startHour.setHours(hours, minutes, 0, 0)

    await businessControlsService.updateBusinessControls({
        ...zodResponse.data,
        startHour
    }, id)

}, "business-controls-tag")