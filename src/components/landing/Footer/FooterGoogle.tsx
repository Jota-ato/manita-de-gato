import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import FooterSocialMediaButton from "./FooterSocialMediaButton";

const socialMediaLinks = [
    {
        link: process.env.NEXT_PUBLIC_INSTAGRAM_URL!,
        label: `@${process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE || 'instagram'}`,
        icon: BsInstagram,
        className: 'hover:text-pink-500 transition-colors duration-300 [&_span]:hover:bg-gradient-to-tr [&_span]:hover:from-yellow-500 [&_span]:hover:via-red-500 [&_span]:hover:to-purple-600 [&_span]:hover:bg-clip-text [&_span]:hover:text-transparent'
    },
    {
        link: process.env.NEXT_PUBLIC_FACEBOOK_URL!,
        label: `@${process.env.NEXT_PUBLIC_FACEBOOK_PROFILE || 'facebook'}`,
        icon: BsFacebook,
        className: 'hover:text-blue-600 transition-colors duration-300'
    },
    {
        link: process.env.NEXT_PUBLIC_WHATSAPP_URL!,
        label: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || 'WhatsApp',
        icon: FaWhatsapp,
        className: 'hover:text-green-500 transition-colors duration-300'
    }
];

export default function FooterGoogle() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-primary border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
                        <div className="text-2xl font-bold text-secondary flex items-center gap-2">
                            Manita de Gato
                            <Logo width={32} height={32} />
                        </div>

                        <p className="text-sm text-on-surface-variant dark:text-surface-variant max-w-xs leading-relaxed">
                            Y tú... ¿Ya te diste una Manita de Gato? <br />
                            Expertas en resaltar tu belleza natural con el cuidado que mereces.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-bold">Servicios</h4>
                        <nav className="flex flex-col gap-2">
                            {['Servicios', 'Resenas', 'Precios', 'Ubicacion'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
                                >
                                    {item === 'Resenas' ? 'Reseñas' : item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <h4 className="text-xl font-bold">Contáctanos</h4>

                        <div className="flex flex-col gap-4">
                            {socialMediaLinks.map(socialMediaLink => (
                                <FooterSocialMediaButton
                                    key={socialMediaLink.link}
                                    label={socialMediaLink.label}
                                    link={socialMediaLink.link}
                                    Icon={socialMediaLink.icon}
                                    className={socialMediaLink.className}
                                />
                            ))}
                        </div>
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