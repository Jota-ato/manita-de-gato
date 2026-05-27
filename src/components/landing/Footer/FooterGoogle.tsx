import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Link from "next/link";

export default function FooterGoogle() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-surface border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
                        <div className="text-2xl font-bold text-primary dark:text-primary-fixed-dim">
                            Manita de Gato
                        </div>
                        <p className="text-sm text-on-surface-variant dark:text-surface-variant max-w-xs leading-relaxed">
                            Y tú... ¿Ya te diste una Manita de Gato? <br />
                            Expertas en resaltar tu belleza natural con el cuidado que mereces.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-on-surface dark:text-on-surface-variant uppercase tracking-wider text-xs">
                            Explorar
                        </h4>
                        <nav className="flex flex-col gap-2">
                            {['Servicios', 'Galería', 'Precios', 'Ubicación'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <div className="flex flex-col gap-2 items-center md:items-start">
                            <h4 className="font-semibold text-on-surface dark:text-on-surface-variant uppercase tracking-wider text-xs">
                                Contáctanos
                            </h4>
                            <a
                                href="https://wa.me/521234567890"
                                className="flex items-center gap-2 text-sm text-on-surface-variant dark:text-surface-variant hover:text-green-500 transition-colors"
                            >
                                <FaWhatsapp className="text-lg" />
                                <span>+52 1 234 567 890</span>
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-2 rounded-full bg-surface dark:bg-surface-dim hover:text-pink-500 transition-all shadow-sm"
                            >
                                <BsInstagram className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full bg-surface dark:bg-surface-dim hover:text-blue-600 transition-all shadow-sm"
                            >
                                <BsFacebook className="text-xl" />
                            </a>
                        </div>

                        <Button
                            size="sm"
                            className="w-full md:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                        >
                            Agendar Cita
                        </Button>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant dark:text-surface-variant">
                    <p>© {currentYear} Manita de Gato. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">Política de Privacidad</a>
                        <a href="#" className="hover:underline">Términos de Servicio</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}