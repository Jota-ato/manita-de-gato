import { z } from "zod";

export const AppointmentSchema = z.object({
    client_id: z.string(),
    service_id: z.number(),
    timeMin: z.string(),
    timeMax: z.string()
})

export type Appointment = z.infer<typeof AppointmentSchema>;