"use client" // Necesario para usar useSidebar

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar // Importamos el hook
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
// Importamos PawPrint y eliminamos Info si no se usa
import { Home, Calendar, BookOpen, Mail, PawPrint } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utilidad de shadcn para clases condicionales

const navItems = [
    { title: "Inicio", url: "/", icon: Home },
    { title: "Agenda", url: "/agenda", icon: Calendar },
    { title: "Blog", url: "/blog", icon: BookOpen },
    { title: "Acerca de nosotros", url: "/acerca-de", icon: PawPrint },
    { title: "Contacto", url: "/contacto", icon: Mail },
]

export function AppSidebar() {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon"> {/* Asegúrate de que Sidebar tenga collapsible="icon" en tu layout principal */}
            <SidebarHeader
                className={cn(
                    "font-bold transition-all duration-300 ease-in-out",
                    open ? "text-5xl p-4" : "text-2xl p-2 justify-center flex"
                )}
            >
                {open ? <span className="flex items-center gap-2">Manita de gato<PawPrint /></span> : <PawPrint className="m-auto"/>}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {open && (
                        <SidebarGroupLabel className="text-2xl">
                            Otros enlaces
                        </SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                        asChild 
                                        tooltip={item.title}
                                        className={cn(!open && "justify-center")}
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2 text-xl"
                                        >
                                            <item.icon className="h-6 w-6" />
                                            
                                            {open && <span>{item.title}</span>}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className={cn(
                    "flex items-center justify-center gap-2",
                    open ? "flex-row" : "flex-col"
                )}>
                    <Button variant="ghost" size="icon" asChild className="hover:text-green-500">
                        <a href="https://wa.me/5577521678" target="_blank" rel="noreferrer">
                            <FaWhatsapp className="w-8 h-8" />
                            <span className="sr-only">WhatsApp</span>
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild className="hover:text-blue-600">
                        <a href="https://www.facebook.com/141618755992417/" target="_blank" rel="noreferrer">
                            <FaFacebook className="w-8 h-8" />
                            <span className="sr-only">Facebook</span>
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild className="hover:text-pink-600">
                        <a href="https://www.instagram.com/sarii_nailart/" target="_blank" rel="noreferrer">
                            <FaInstagram className="w-8 h-8" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}