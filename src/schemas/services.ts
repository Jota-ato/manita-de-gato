import { z } from "zod";

export const serviceItemsEnum = [
    'Pro Manicure',
    'Técnica Dual',
    'Extensión (Técnica escultural)',
    'Extensión tip SoftGel',
    'Tonos naturales',
    'Variedad de Colores',
    'Acabado Matte/Brillo'
] as const;

export const serviceExtrasEnum = [
    'Color Gel',
    'Frances',
    'Efectos',
    'Relieves',
    'Arte y Diseño',
    'Completo',
    'Gemas',
    'Diseño 3D'
] as const;

export const serviceSchema = z.object({
    id: z.number().describe('big int, from 1 to n'),
    min_price: z.number().describe('minimal price, add to total price'),
    name: z.string().describe('name of the service'),
    description: z.string().describe('Detials of the service'),
    image_url: z.string().optional().nullable().describe('image url'),
    what_is: z.string().describe('Detial description of the process'),
    available_extras: z.array(z.enum(serviceExtrasEnum)),
    included_items: z.array(z.enum(serviceItemsEnum))
});

/**
 * Service type from de database
 * @property id: big int, from 1 to n
 * @property min_price: minimal price, add to total price
 * @property name: name of the service
 * @property description: Detials of the service
 */
export type Service = z.infer<typeof serviceSchema>;
