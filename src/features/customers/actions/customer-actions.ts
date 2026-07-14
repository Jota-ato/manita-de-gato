"use server"

import { adminAction } from "@/shared/lib/actions"
import { CustomerInput, customerSchema } from "../schemas/customer-schemas"
import { AppError } from "@/shared/lib/errors"
import { customersService } from "../services/customers-service"
import { NewCustomer } from "@/db/schema"
import { createPhone } from "@/shared/utils/phone"

export const createCustomer = adminAction(async (data: CustomerInput) => {
    const zodReponse = customerSchema.safeParse(data)

    if (!zodReponse.success) {
        throw new AppError("Invalid customer data")
    }

    const payload: NewCustomer = {
        lastName: data.lastName,
        name: data.name,
        phone: createPhone(data.countryCode, data.phone),
        email: data.email || null
    }

    const customer = await customersService.createCustomer(payload)
    return `${customer.name} ${customer.lastName} created successfully`
})

export const updateCustomer = adminAction(async (data: CustomerInput, id: string) => {
    const zodReponse = customerSchema.safeParse(data)

    if (!zodReponse.success) {
        throw new AppError("Invalid customer data")
    }

    const payload: NewCustomer = {
        lastName: data.lastName,
        name: data.name,
        phone: createPhone(data.countryCode, data.phone),
        email: data.email || null
    }

    const customer = await customersService.updateCustomer(payload, id)

    return `${customer.name} ${customer.lastName} updated successfully`
})

