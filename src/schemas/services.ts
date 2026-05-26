import { z } from "zod";

export const serviceSchema = z.object({
    id: z.number().describe('big int, from 1 to n'),
    min_price: z.number().describe('minimal price, add to total price'),
    name: z.string().describe('name of the service'),
    description: z.string().describe('Detials of the service'),
    image_url: z.string().optional().nullable().describe('image url'),
    what_is: z.string().describe('Detial description of the process')
});

/**
 * Service type from de database
 * @property id: big int, from 1 to n
 * @property min_price: minimal price, add to total price
 * @property name: name of the service
 * @property description: Detials of the service
 */
export type Service = z.infer<typeof serviceSchema>;