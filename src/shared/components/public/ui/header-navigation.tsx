"use client"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import {
    Calendar,
    Computer,
    Menu,
    Moon,
    Home,
    Sun,
    Mail,
    User
} from "lucide-react"
import { Button } from "../../ui/button"
import { ThemeToggle } from "../../ui/toggle-theme"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import { usePathname } from "next/navigation"

const links = [
    {
        href: "/",
        label: "Inicio",
        icon: Home
    },
    {
        href: "/booking",
        label: "Agenda",
        icon: Calendar
    },
    {
        href: "/about-us",
        label: "Sobre nosotros",
        icon: User
    },
    {
        href: "/contact",
        label: "Contacto",
        icon: Mail
    }
]
const themes = [
    {
        value: "light",
        label: "Claro",
        icon: Sun
    },
    {
        value: "dark",
        label: "Oscuro",
        icon: Moon
    },
    {
        value: "system",
        label: "Sistema",
        icon: Computer
    }
]

export function HeaderNavigation() {
    return (
        <nav>
            <MobileHeaderNavigation />
            <DesktopHeaderNavigation />
        </nav>
    )
}

function MobileHeaderNavigation() {

    const { setTheme, theme: currentTheme } = useTheme()
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden" asChild>
                <Button
                    size="icon"
                    variant="ghost"
                >
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-4 rounded-md">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Navegación</DropdownMenuLabel>
                    {links.map((link) => (
                        <DropdownMenuItem
                            key={link.href}
                            asChild
                        >
                            <Link
                                href={link.href}
                                className={cn("text-sm cursor-pointer",
                                    pathname === link.href ? "text-info" : ""
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Tema</DropdownMenuLabel>
                    {themes.map((theme) => (
                        <DropdownMenuItem
                            className={cn("cursor-pointer", currentTheme === theme.value ? "text-info" : "")}
                            key={theme.value}
                            onClick={() => setTheme(theme.value)}
                        >
                            <theme.icon className=" h-4 w-4" />
                            {theme.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function DesktopHeaderNavigation() {
    const pathname = usePathname()

    return (
        <div className="gap-4 items-center justify-between hidden md:flex">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn("text-sm cursor-pointer flex gap-2 items-center hover:border-b hover:text-info hover:pb-1 border-info transition-all duration-150",
                        pathname === link.href ? "text-info border-b pb-1" : ""
                    )}
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
            ))}
            <ThemeToggle />
        </div>
    )
}