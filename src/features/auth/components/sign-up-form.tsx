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
import { SignUpInput, signUpSchema } from "../schemas/form-schemas"
import { showResponse } from "@/shared/lib/client-actions"
import { signUpAction } from "../actions/auth-actions"
import { FormSubmit } from "@/shared/components/form/form-submit"

export function SignUpForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema)
    })

    const handleSignUp = async (data: SignUpInput) => {
        showResponse(await signUpAction(data))
    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">
                            Name
                        </FieldLabel>
                        <Input 
                        id="name" 
                        type="text" 
                        {...register("name")}
                        />
                        <FieldError>
                            {errors.name && errors.name.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input 
                        id="email" 
                        type="email" 
                        {...register("email")}
                        />
                        <FieldError>
                            {errors.email && errors.email.message}
                        </FieldError>
                    </Field>
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
                    label="Sign up"
                    submittingLabel="Signing up..."
                />
            </FieldSet>
        </form>
    )
}