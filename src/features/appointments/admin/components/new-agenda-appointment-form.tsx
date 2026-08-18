"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldDescription,
} from "@/shared/components/ui/field";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { CustomSelect } from "../../core/components/services-select";
import { useMemo } from "react";
import { formatMXN } from "@/shared/lib/currency";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { FieldSwitch } from "@/shared/components/form/field-switch";
import { showResponse } from "@/shared/lib/client-actions";
import {
  NewAppointmentManuallyInput,
  newAppointmentManuallySchema,
} from "../schemas/appointment-schema";
import { createManualAppointmentAction } from "../actions/admin-appointment-actions";
import { redirect } from "next/navigation";
import { useAppointmentStore } from "../stores/appointment-store";
import { ServiceWithExtras } from "@/features/services/types/service.types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ArraySwitchController } from "@/features/services/components/extra-switch-controller";

export function NewAgendaAppointmentForm({
  services,
  timeRange: { startTime, endTime },
}: {
  services: ServiceWithExtras[];
  timeRange: { startTime: Date; endTime: Date };
}) {
  const { toggleCreateDialogOpen, setActiveCreateAppointmentTime } =
    useAppointmentStore();

  const {
    handleSubmit,
    watch,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewAppointmentManuallyInput>({
    resolver: zodResolver(newAppointmentManuallySchema),
    defaultValues: {
      isRegisterClient: true,
      adittionalPrice: 0,
      clientPhone: "",
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      extrasId: [],
    },
  });

  const isRegisterCLient = watch("isRegisterClient");
  const serviceId = watch("serviceId");
  const extrasId = watch("extrasId") || [];

  const clientErrors = errors as FieldErrors<
    Extract<NewAppointmentManuallyInput, { isRegisterClient: false }>
  >;

  // Cálculos de precios y extras disponibles
  const servicePrice = useMemo(() => {
    if (!serviceId) return 0;
    const selected = services.find((service) => service.data.id === serviceId);
    return selected ? +selected.data.price : 0;
  }, [serviceId, services]);

  const availableExtras = useMemo(() => {
    const availableExtras = serviceId
      ? services.find((service) => service.data.id === serviceId)?.serviceExtras
      : [];
    if (!availableExtras) return [];
    return availableExtras.filter(
      (extra) => extra.extra.isActive && !extra.included,
    );
  }, [serviceId, services]);

  const extrasPrice = useMemo(() => {
    if (!availableExtras.length) return 0;
    const activeExtras = availableExtras.filter((extra) =>
      extrasId.includes(extra.extra.id),
    );
    return activeExtras.reduce((acc, extra) => acc + +extra.extra.price, 0);
  }, [availableExtras, extrasId]);

  const create = async (data: NewAppointmentManuallyInput) => {
    const success = showResponse(
      await createManualAppointmentAction({
        ...data,
        clientPhone: `+${data.clientCountryCode}${data.clientPhone}`,
      }),
    );

    if (success) {
      toggleCreateDialogOpen();
      setActiveCreateAppointmentTime(undefined);
      reset();
      redirect("/dashboard/agenda");
    }
  };

  return (
    <form onSubmit={handleSubmit(create)}>
      <Tabs defaultValue="general">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="general">
            General
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="service">
            Servicio y extras
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <FieldSet>
            <FieldGroup>
              <FieldSwitch
                control={control}
                name="isRegisterClient"
                label="¿El cliente está registrado?"
                description="Marca esto si el cliente ya tiene una cita o la creaste manualmente para él."
              />

              <Field>
                <FieldLabel htmlFor="clientPhone">
                  Teléfono del cliente
                </FieldLabel>
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
                  <Input
                    id="clientPhone"
                    type="tel"
                    {...register("clientPhone")}
                  />
                </div>
                {errors.clientPhone && (
                  <FieldError>{errors.clientPhone.message}</FieldError>
                )}
              </Field>

              {!isRegisterCLient && (
                <>
                  <Field>
                    <FieldLabel htmlFor="clientName">
                      Nombre del cliente
                    </FieldLabel>
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
          </FieldSet>
        </TabsContent>

        <TabsContent value="service">
          <FieldSet>
            <FieldGroup>
              <CustomSelect
                control={control}
                name="serviceId"
                options={services.map((s) => ({
                  value: s.data.id,
                  label: s.data.name,
                }))}
                groupLabel="Servicios"
                placeholder="Selecciona un servicio"
              />
              {errors.serviceId && (
                <FieldError>{errors.serviceId.message}</FieldError>
              )}

              <FieldSeparator />

              <Field>
                <FieldLabel htmlFor="extrasId">Extras</FieldLabel>
                <FieldDescription>
                  Selecciona los extras para esta cita
                </FieldDescription>
                {availableExtras.length ? (
                  availableExtras.map((extra) => (
                    <ArraySwitchController
                      key={extra.extra.id}
                      control={control}
                      name="extrasId"
                      value={extra.extra.id}
                      label={extra.extra.name}
                    />
                  ))
                ) : (
                  <p className="p-4 text-muted-foreground text-sm">
                    No hay extras disponibles para este servicio
                  </p>
                )}
              </Field>

              <FieldSeparator />

              <div className="flex items-center justify-between gap-2">
                <p className="flex flex-col justify-center text-sm">
                  Precio del servicio
                  <span className="font-bold text-base">
                    {formatMXN(+servicePrice)}
                  </span>
                </p>
                <p className="flex flex-col justify-center text-sm">
                  Precio de extras
                  <span className="font-bold text-base">
                    {formatMXN(+extrasPrice)}
                  </span>
                </p>
              </div>

              <Field className="flex-1 mt-2">
                <FieldLabel htmlFor="adittionalPrice">
                  Precio adicional manual (opcional)
                </FieldLabel>
                <Input
                  id="adittionalPrice"
                  type="number"
                  step={0.01}
                  {...register("adittionalPrice", {
                    setValueAs: (value) => (value === "" ? 0 : +value),
                  })}
                />
                {errors.adittionalPrice && (
                  <FieldError>{errors.adittionalPrice.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
        </TabsContent>
      </Tabs>
      <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner />
            Creando...
          </>
        ) : (
          "Crear cita"
        )}
      </Button>
    </form>
  );
}
