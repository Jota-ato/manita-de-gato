import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MoldInput } from "../schemas/molds-schemas";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

const FINGERS = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"] as const;

interface HandMeasuresProps {
  name: "leftHandMeasures" | "rightHandMeasures";
  label: string;
  register: UseFormRegister<MoldInput>;
  errors: FieldErrors<MoldInput>;
}

export function HandMeasuresField({
  name,
  label,
  register,
  errors,
}: HandMeasuresProps) {
  const fieldErrors = errors[name];

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldDescription>Ancho de cada uña en milímetros</FieldDescription>

      <div className="grid grid-cols-5 gap-2">
        {FINGERS.map((finger, i) => (
          <div key={finger} className="flex flex-col gap-1">
            <label
              htmlFor={`${name}.${i}`}
              className="text-muted-foreground text-center text-xs"
            >
              {finger}
            </label>
            <Input
              id={`${name}.${i}`}
              type="number"
              inputMode="numeric"
              min={5}
              max={25}
              placeholder="mm"
              className="text-center"
              aria-invalid={!!fieldErrors?.[i]}
              {...register(`${name}.${i}`, { valueAsNumber: true })}
            />
          </div>
        ))}
      </div>

      {fieldErrors?.message && <FieldError>{fieldErrors.message}</FieldError>}
      {fieldErrors?.map?.(
        (err, i) =>
          err && (
            <FieldError key={i}>
              {FINGERS[i]}: {err.message}
            </FieldError>
          ),
      )}
    </Field>
  );
}
