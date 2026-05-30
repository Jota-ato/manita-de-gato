import { z } from "zod";

const validateTimeRange = (data: { date: Date; timeMin: string; timeMax: string }) => {
    const [startHours, startMinutes] = data.timeMin.split(':').map(Number);
    const [endHours, endMinutes] = data.timeMax.split(':').map(Number);

    const timeMin = new Date(data.date);
    timeMin.setHours(startHours, startMinutes, 0, 0);

    const timeMax = new Date(data.date);
    timeMax.setHours(endHours, endMinutes, 0, 0);

    return timeMax > timeMin;
};

const timeRefineOptions = {
    message: "La hora de fin debe ser posterior a la de inicio",
    path: ["timeMax"]
};

const baseAppointmentFields = z.object({
    name: z.string({ error: 'El nombre es necesario' }).min(2, "El nombre es muy corto"),
    last_name: z.string({ error: 'El apellido es necesario' }).min(2, "El apellido es muy corto"),
    phone: z.string({ error: 'El teléfono es necesario' }).length(10, "Debe tener 10 dígitos"),
    secondary_phone: z.string().optional().or(z.literal("")),
    serviceId: z.string().min(1, "Selecciona un servicio"),
    date: z.date({ error: "Selecciona una fecha" }),
    timeMin: z.string({ error: 'El inicio es necesario' }),
    timeMax: z.string({ error: 'El fin es necesario' }),
});

export const AdminAppointmentSchema = baseAppointmentFields.refine(validateTimeRange, timeRefineOptions);
export type AdminAppointmentForm = z.infer<typeof AdminAppointmentSchema>

export const CreateBlockTimeSchema = baseAppointmentFields
    .pick({
        date: true,
        timeMin: true,
        timeMax: true
    })
    .refine(validateTimeRange, timeRefineOptions);
export type CreateBlockTimeForm = z.infer<typeof CreateBlockTimeSchema>