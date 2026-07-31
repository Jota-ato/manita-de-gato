"use server"

import { customersService } from "@/features/customers/services/customers-service"
import { customerAction } from "@/shared/lib/actions"
import { AppError } from "@/shared/lib/errors"
import { UserInput, userSchema } from "../schemas/booking-schema"
import { Extra } from "@/db/schema"
import { NewPublicAppointment } from "../types/public-appointments.types"
import { publicAppointmentsService } from "../services/public-appointments-service"
import { format } from "date-fns"

export const getUserAction = customerAction(async (phone: string) => {
    const customer = await customersService.getClientByPhone(phone)

    if (!customer) throw new AppError(`Cliente con teléfono ${phone} no encontrado`)

    return {
        message: `Cliente encontrado: ${customer.name} ${customer.lastName}`,
        data: customer
    }
})

export const registerUserAction = customerAction(async (user: UserInput) => {
    const zodResponse = userSchema.safeParse(user)

    if (!zodResponse.success) throw new AppError("Datos de usuario inválidos")
    if (!("name" in zodResponse.data) || !zodResponse.data.name) throw new AppError("El nombre es obligatorio")

    const phone = `+${zodResponse.data.countryCode}${zodResponse.data.phone}`
    const customer = await customersService.createCustomer({
        name: zodResponse.data.name,
        lastName: zodResponse.data.lastName,
        phone: phone
    })
    return {
        message: `Cliente registrado: ${customer.name} ${customer.lastName}`,
        data: customer
    }
})

export const createAppointmentAction = customerAction(async (data: NewPublicAppointment) => {
    const response = await publicAppointmentsService.createAppointment(data)
    return {
        message: `Cita para ${format(response.appointment.startTime, "MMM dd, yyyy HH:mm")} - ${format(response.appointment.endTime, "HH:mm")} creada con éxito`,
        data: response
    }
})