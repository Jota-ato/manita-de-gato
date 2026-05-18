
interface WhatsAppMessageParams {
    clientName: string
    service: string
    timeMin: Date
    timeMax: Date
}

export function buildWhatsAppRedirectUrl({ clientName, service, timeMin, timeMax }: WhatsAppMessageParams) {
    const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    const message = `
¡Hola! Acabo de agendar una cita 🐾

👤 Nombre: ${clientName}
💅 Servicio: ${service}
🕐 Horario: ${timeMin.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} - ${timeMax.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
📅 Fecha: ${timeMin.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
    `.trim();

    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
}