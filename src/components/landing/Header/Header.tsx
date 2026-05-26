'use client';
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const { toggleSidebar } = useSidebar();
    const pathName = usePathname();

    return (
        <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-800">Manita de Gato</span>
                <Logo width={24} height={24} />
            </div>
            {pathName === '/' && (<nav className="hidden md:flex gap-6">
                <Link href="#servicios" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Servicios</Link>
                <Link href="#resenas" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Reseñas</Link>
            </nav>)}

            <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-slate-600 hover:text-pink-600 hover:bg-pink-50 md:hidden"
            >
                <Menu className="size-5" />
                <span className="sr-only">Abrir menú lateral</span>
            </Button>
        </header>
    )
}