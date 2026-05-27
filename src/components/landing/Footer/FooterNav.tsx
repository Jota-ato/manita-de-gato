import Link from "next/link";

const navItems: Record<string, string> = {
    servicios: 'Servicios',
    resenas: 'Reseñas',
    ubicacion: 'Ubicación'
};

export default function FooterNav() {
    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-bold text-accent">Servicios</h4>
            <nav className="flex flex-col gap-2">
                {Object.keys(navItems).map((item) => (
                    <Link
                        key={item}
                        href={item}
                        className="text-sm md:text-md hover:text-accent transition-colors duration-300"
                    >
                        {navItems[item]}
                    </Link>
                ))}
            </nav>
        </div>
    )
}