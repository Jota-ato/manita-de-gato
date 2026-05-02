"use client"

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
    useSidebar 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookOpen, Mail, PawPrint } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { title: "Inicio", url: "/", icon: Home },
    { title: "Agenda", url: "/agenda", icon: Calendar },
    { title: "Blog", url: "/blog", icon: BookOpen },
    { title: "Acerca de nosotros", url: "/acerca-de", icon: PawPrint },
    { title: "Contacto", url: "/contacto", icon: Mail },
]

export function AppSidebar() {
    // Extraemos isMobile además de open
    const { open, isMobile } = useSidebar();
    
    // Si estamos en teléfono (isMobile) SIEMPRE queremos que se vea expandida 
    // porque en móvil la barra se oculta por completo cuando se cierra.
    const isExpanded = open || isMobile;

    return (
        <Sidebar collapsible="icon"> 
            <SidebarHeader
                className={cn(
                    "font-bold transition-all duration-300 ease-in-out",
                    isExpanded ? "text-5xl p-4" : "text-2xl p-2 justify-center flex"
                )}
            >
                {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<PawPrint className="size-10 text-purple-600" /></span> : <PawPrint className="m-auto text-purple-600" />}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {isExpanded && (
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
                                        className={cn(!isExpanded && "justify-center")} 
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2 text-xl"
                                        >
                                            <item.icon className="h-6 w-6" />
                                            
                                            {/* Ahora depende de isExpanded */}
                                            {isExpanded && <span>{item.title}</span>}
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
                    isExpanded ? "flex-row" : "flex-col"
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