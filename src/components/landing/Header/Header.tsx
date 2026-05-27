'use client';
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/ToggleThemeButton";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const { toggleSidebar } = useSidebar();
    const pathName = usePathname();

    return (
        <header className="px-6 py-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-50 border-b border-muted-foreground">
            <div className="flex items-center gap-2 font-cavalier tracking-widest">
                <span className="text-xl md:text-2xl">Manita de Gato</span>
                <Logo width={24} height={24} />
            </div>
            {pathName === '/' && (<nav className="hidden md:flex gap-6">
                <Link href="#servicios" className="text-sm font-medium  transition-colors">Servicios</Link>
                <Link href="#resenas" className="text-sm font-medium transition-colors">Reseñas</Link>
            </nav>)}

            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="md:hidden"
                >
                    <Menu className="size-5" />
                    <span className="sr-only">Abrir menú lateral</span>
                </Button>
                <ThemeToggle />
            </div>
        </header>
    )
}