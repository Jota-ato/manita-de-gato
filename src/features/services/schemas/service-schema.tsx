import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string({ error: 'El nombre del servicio es necesario' }).min(3, {error: 'El nombre es demasiado corto'}),
    description: z.string({ error: 'La descripción del servicio es necesaria' }).min(3, {error: 'La descripción es demasiado corta'}),
    price: z.number({ error: 'El precio del servicio es necesario' }).min(0),
    includedExtras: z.array(z.uuid().nullable().optional()),
    availableExtras: z.array(z.uuid().nullable().optional()),
    image: z.url({ error: 'La imagen es necesaria' })
})

export const extraSchema = z.object({
    name: z.string({ error: 'El nombre del extra es necesario' }).min(3, {error: 'El nombre es demasiado corto'}),
    description: z.string({ error: 'La descripción del extra es necesaria' }).min(3, {error: 'La descripción es demasiado corta'}).nullable(),
    price: z.number({ error: 'El precio del extra es necesario' }).min(0),
})

export type ServiceInput = z.infer<typeof serviceSchema>
export type ExtraInput = z.infer<typeof extraSchema>