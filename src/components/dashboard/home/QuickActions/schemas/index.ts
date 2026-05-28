import { z } from "zod";

export const AdminAppointmentSchema = z.object({
    name: z.string().min(2, "El nombre es muy corto"),
    last_name: z.string().min(2, "El apellido es muy corto"),
    phone: z.string().length(10, "Debe tener 10 dígitos"),
    secondary_phone: z.string().optional(),
    serviceId: z.string().min(1, "Selecciona un servicio"),
    timeMin: z.string().min(1, "La fecha de inicio es requerida"),
    timeMax: z.string().min(1, "La fecha de fin es requerida"),
}).refine((data) => {
    const start = new Date(data.timeMin);
    const end = new Date(data.timeMax);
    return end > start;
}, {
    message: "La hora de fin debe ser posterior a la de inicio",
    path: ["timeMax"]
});

export type AdminAppointmentFormData = z.infer<typeof AdminAppointmentSchema>;