"use server"

import { adminAction } from "@/shared/lib/actions"
import { ServiceInput, serviceSchema } from "../schemas/service-schema"
import { AppError } from "@/shared/lib/errors";
import { servicesService } from "../services/services-service";

export const createServiceAction = adminAction(async (input: ServiceInput) => {
    const zodResponse = serviceSchema.safeParse(input);

    if (!zodResponse.success) {
        throw new AppError("Algo salió mal");
    }

    const service = await servicesService.createService(input);

    return `Servicio ${service.name} creado correctamente`
}, "services-tag")

export const updateServiceAction = adminAction(async (input: ServiceInput, id: string) => {
    const zodResponse = serviceSchema.safeParse(input);

    if (!zodResponse.success) {
        throw new AppError("Algo salió mal");
    }

    const service = await servicesService.updateService(input, id);

    return "Servicio actualizado correctamente"
}, "services-tag")

export const deleteServiceAction = adminAction(async (id: string) => {
    await servicesService.deteleService(id);
    return "Servicio eliminado correctamente"
}, "services-tag")

export const reactiveServiceAction = adminAction(async (id: string) => {
    await servicesService.reactiveService(id);
    return "Servicio reactivado correctamente"
}, "services-tag")
