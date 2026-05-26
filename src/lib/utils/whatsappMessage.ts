
export const buildCustomWhatsappMessageURL = (message: string) => {
    const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`
}