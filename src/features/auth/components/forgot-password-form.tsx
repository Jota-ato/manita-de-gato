"use client"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { RequestPasswordResetInput, requestPasswordResetSchema } from "../schemas/form-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { requestPasswordResetAction } from "../actions/auth-actions";

export function ForgotPasswordForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RequestPasswordResetInput>({
        resolver: zodResolver(requestPasswordResetSchema)
    })

    const onSubmit = async (data: RequestPasswordResetInput) => {
        showResponse(await requestPasswordResetAction(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input 
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && <FieldError>{errors.email.message}</FieldError>}
                    </Field>
                </FieldGroup>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    label="Send Link"
                    submittingLabel="Sending..."
                />
            </FieldSet>
        </form>
    )
}