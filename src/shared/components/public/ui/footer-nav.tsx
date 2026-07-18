import Link from "next/link";
import { Heading } from "../../typography/heading";

const navItems: Record<string, string> = {
    '/#services': 'Servicios',
    '/#reviews': 'Reseñas',
    '/#location': 'Ubicación'
};

export function FooterNav() {
    return (
        <div className="space-y-4">
            <Heading level={4} className="text-left text-2xl font-bold text-accent-foreground">Servicios</Heading>
            <nav className="flex flex-col gap-2">
                {Object.keys(navItems).map((item) => (
                    <Link
                        key={item}
                        className="text-sm md:text-md hover:text-accent-foreground hover:font-bold transition-all duration-300"
                        href={item}
                    >
                        {navItems[item]}
                    </Link>
                ))}
            </nav>
        </div>
    )
}