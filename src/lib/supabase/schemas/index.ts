import { z } from "zod";
import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "../utils/helpers";

const toTZDate = z.string().transform((val) => new TZDate(val, TIMEZONE));

export const AppointmentStatus = z.enum([
    'pending',
    'approved',
    'paid',
    'cancelled',
    'no_show'
]);

export const translatedStatusMap: Record<AppointmentStatus, string> = {
    'pending': 'pendiente',
    'approved': 'aprobado',
    'no_show': 'no mostrar',
    'paid': 'pagado',
    'cancelled': 'cancelada'
}

export type AppointmentStatus = z.infer<typeof AppointmentStatus>;

export const AppointmentSchema = z.object({
    id: z.string(),
    client_id: z.string(),
    service_id: z.number(),
    timeMin: toTZDate,
    timeMax: toTZDate,
    status: AppointmentStatus,
    client_name_snapshot: z.string(),
    service_price_snapshot: z.number(),
    service_name_snapshot: z.string(),
    total_price: z.number()
}).strip()

export const ClientSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    secondary_phone: z.string().nullable().optional(),
    id: z.string()
})

export type Appointment = z.infer<typeof AppointmentSchema>;
export type Client = z.infer<typeof ClientSchema>;