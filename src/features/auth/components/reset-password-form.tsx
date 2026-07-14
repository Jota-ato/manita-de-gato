"use client"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordInput, resetPasswordSchema } from "../schemas/form-schemas"
import { showResponse } from "@/shared/lib/client-actions"
import { FormSubmit } from "@/shared/components/form/form-submit"
import { resetPasswordAction } from "../actions/auth-actions"

export function ResetPasswordForm({
    token
}: {
    token: string
}) {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (data: ResetPasswordInput) => {
        showResponse(await resetPasswordAction(data, token))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        <FieldError>
                            {errors.password && errors.password.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                        />
                        <FieldError>
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </FieldError>
                    </Field>
                </FieldGroup>
                <FormSubmit
                    isSubmitting={isSubmitting}
                    label="Reset Password"
                    submittingLabel="Resetting password..."
                />
            </FieldSet>
        </form>
    )
}