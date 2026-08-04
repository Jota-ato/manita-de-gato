import { Customer } from "@/db/schema";
import { format } from "date-fns";

export const buildWhatsappMessage = (payload: {
    customer: Customer;
    serviceName: string;
    startTime: string;
    endTime: string;
}) => {
    const date = format(payload.startTime, "EEEE dd MMMM yyyy");
    const timeRange = `${format(payload.startTime, "HH:mm")} - ${format(payload.endTime, "HH:mm")}`;

    return [
        `¡Hola! Me gustaría confirmar una nueva cita 👋`,
        ``,
        `*Servicio:* ${payload.serviceName}`,
        `*Fecha:* ${date}`,
        `*Hora:* ${timeRange}`,
        `*Nombre:* ${payload.customer.name} ${payload.customer.lastName}`,
        ``,
        `¡Quedo atento/a! 😊`,
    ].join("\n");
};

export const buildCustomWhatsappMessageURL = (message: string) => {
    const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
};