"use client"
import { Customer } from "@/db/schema"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field"
import { useForm } from "react-hook-form"
import { CustomerInput, customerSchema } from "../schemas/customer-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/shared/components/ui/input"
import { FormSubmit } from "@/shared/components/form/form-submit"
import { createPhone } from "@/shared/utils/phone"
import { showResponse } from "@/shared/lib/client-actions"
import { createCustomer, updateCustomer } from "../actions/customer-actions"
import { useCustomerStore } from "../stores/customer-store"

export function CustomerForm({
    customer
}: {
    customer?: Customer
}) {

    const { setActiveCustomer, setDialogOpen } = useCustomerStore()
    const isEditing = !!customer

    const defaultValues: CustomerInput = isEditing ? {
        lastName: customer.lastName,
        name: customer.name,
        phone: customer.phone.slice(3),
        countryCode: customer.phone.slice(1, 3),
        email: customer.email || undefined
    } : {
        lastName: '',
        name: '',
        phone: '',
        countryCode: '52',
        email: undefined
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<CustomerInput>({
        resolver: zodResolver(customerSchema),
        defaultValues
    })

    const label = isEditing ? "Edit customer" : "Add customer"
    const submittingLabel = isEditing ? "Editing customer..." : "Adding customer..."

    const onSubmit = async (data: CustomerInput) => {
        if (isEditing && customer) {
            showResponse(await updateCustomer(data, customer.id))
            setActiveCustomer(null)
            setDialogOpen(false)
        } else {
            showResponse(await createCustomer(data))
            setActiveCustomer(null)
            setDialogOpen(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel
                            htmlFor="name"
                        >
                            Name
                        </FieldLabel>
                        <Input
                            id="name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <FieldError>{errors.name.message}</FieldError>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel
                            htmlFor="lastName"
                        >
                            Last name
                        </FieldLabel>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <FieldError>{errors.lastName.message}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel
                            htmlFor="phone"
                        >
                            Phone
                        </FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                className="w-20"
                                placeholder="+52"
                                id="countryCode"
                                {...register("countryCode")}
                            />
                            <Input
                                id="phone"
                                {...register("phone")}
                            />
                        </div>
                        {errors.phone && (
                            <FieldError>{errors.phone.message}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel
                            htmlFor="email"
                        >
                            Email
                        </FieldLabel>
                        <Input
                            id="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <FieldError>{errors.email.message}</FieldError>
                        )}
                    </Field>
                </FieldGroup>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    label={label}
                    submittingLabel={submittingLabel}
                />
            </FieldSet>
        </form>
    )
}