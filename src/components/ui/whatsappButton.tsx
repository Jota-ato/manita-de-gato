import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./button";
import { buildCustomWhatsappMessageURL } from "@/lib/utils/whatsappMessage";

export default function WhatsappButton() {

    const message = '¡Hola! He visto tu sitio web y me gustaría agendar una cita. ¿Qué horarios tienes disponibles?';

    return (
        <Button
            className="fixed bottom-4 right-4 z-30 bg-green-400 rounded-full px-2 py-6 flex items-center text-white justify-center hover:bg-green-700"
        >
            <a
                href={buildCustomWhatsappMessageURL(message)}
                target="_blank"
            >
                <FaWhatsapp className="size-8" />
                
            </a>
        </Button>
    )
}