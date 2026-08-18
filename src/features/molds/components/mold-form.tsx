"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoldInput, MoldSchema } from "../schemas/molds-schemas";
import { FieldSwitch } from "@/shared/components/form/field-switch";
import { Input } from "@/shared/components/ui/input";
import ImageUploader from "@/shared/components/upload/image-uploader";
import { Textarea } from "@/shared/components/ui/textarea";
import { HandMeasuresField } from "./hand-measures-field";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { FullMold } from "../types/molds.types";
import { CustomSelect } from "@/features/appointments/core/components/services-select";
import { orderStatusEnum } from "@/db/schema/molds";
import { MOLD_STATUS_LABEL_MAP } from "../helpers/utils";
import { DatePickerTime } from "@/shared/components/form/date-picker-time";

export function MoldForm({ mold }: { mold?: FullMold }) {
  const isEditting = !!mold;

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MoldInput>({
    resolver: zodResolver(MoldSchema),
    defaultValues: {
      leftHandMeasures: [],
      rightHandMeasures: [],
    },
  });

  const isRegisterCLient = watch("isRegisterClient");

  const clientErrors = errors as FieldErrors<
    Extract<MoldInput, { isRegisterClient: false }>
  >;

  const onSubmit = async (data: MoldInput) => {
    console.log(data);
  };

  const submitLabel = isEditting ? "Actualizar molde" : "Crear molde";
  const isSubmittingLabel = isEditting ? "Actualizando..." : "Creando...";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <FieldSwitch
            control={control}
            name="isRegisterClient"
            label="¿El cliente está registrado?"
            description="Marca esto si el cliente ya tiene una cita o la creaste manualmente para él."
          />

          <Field>
            <FieldLabel htmlFor="clientPhone">Teléfono del cliente</FieldLabel>
            <FieldDescription>
              Con código de país (ej. +52 para México)
            </FieldDescription>
            <div className="flex gap-2">
              <Input
                className="w-20"
                id="countryCode"
                type="text"
                {...register("clientCountryCode")}
              />
              <Input id="clientPhone" type="tel" {...register("clientPhone")} />
            </div>
            {errors.clientPhone && (
              <FieldError>{errors.clientPhone.message}</FieldError>
            )}
          </Field>

          {!isRegisterCLient && (
            <>
              <Field>
                <FieldLabel htmlFor="clientName">Nombre del cliente</FieldLabel>
                <Input id="clientName" {...register("name")} />
                {clientErrors.name && (
                  <FieldError>{clientErrors.name.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="clientLastName">
                  Apellido del cliente
                </FieldLabel>
                <Input id="clientLastName" {...register("lastName")} />
                {clientErrors.lastName && (
                  <FieldError>{clientErrors.lastName.message}</FieldError>
                )}
              </Field>
            </>
          )}
        </FieldGroup>

        <FieldGroup>
          <ImageUploader
            label="Imagen de referencia"
            onChange={(url) =>
              setValue("referenceImageUrl", url ? url : "", {
                shouldValidate: true,
              })
            }
          />
          <Field>
            <FieldLabel htmlFor="design">Diseño</FieldLabel>
            <Input id="design" type="text" {...register("design")} />
            {errors.design && <FieldError>{errors.design.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="shape">Forma</FieldLabel>
            <Input id="shape" type="text" {...register("shape")} />
            {errors.shape && <FieldError>{errors.shape.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="totalPrice">Precio</FieldLabel>
            <Input
              id="totalPrice"
              type="number"
              step="1"
              min="0"
              {...register("totalPrice", { valueAsNumber: true })}
            />
            {errors.totalPrice && (
              <FieldError>{errors.totalPrice.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="note">Notas</FieldLabel>
            <Textarea id="note" {...register("note")} />
            {errors.note && <FieldError>{errors.note.message}</FieldError>}
          </Field>
        </FieldGroup>
        <FieldGroup>
          <HandMeasuresField
            name="leftHandMeasures"
            label="Medidas de la mano izquierda"
            register={register}
            errors={errors}
          />
          <HandMeasuresField
            name="rightHandMeasures"
            label="Medidas de la mano derecha"
            register={register}
            errors={errors}
          />

          <CustomSelect 
            control={control}
            name="status"
            groupLabel="Status"
            options={orderStatusEnum.enumValues.map(value => ({
              label: MOLD_STATUS_LABEL_MAP[value],
              value
            }))}
          />

          <DatePickerTime 
            control={control}
            startTimeName="deliveryDate"
            endTimeName="deliveryDate"
            setValue={setValue}
          />
        </FieldGroup>

        <FormSubmit
          label={submitLabel}
          submittingLabel={isSubmittingLabel}
          isSubmitting={isSubmitting}
        />
      </FieldSet>
    </form>
  );
}
