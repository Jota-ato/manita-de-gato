import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);
export const from = "manita de gato <mail@mail.julio-zavala.me>"