import { z } from "zod";

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
    timeMin: z.string(),
    timeMax: z.string(),
    status: AppointmentStatus
})

export type Appointment = z.infer<typeof AppointmentSchema>;