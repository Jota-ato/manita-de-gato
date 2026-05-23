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
    useSidebar,
    SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookOpen, Mail, PawPrint, PanelLeft } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "./ui/logo";

const navItems = [
    { title: "Inicio", url: "/", icon: Home },
    { title: "Agenda", url: "/agenda", icon: Calendar },
    { title: "Blog", url: "/blog", icon: BookOpen },
    { title: "Acerca de nosotros", url: "/about-us", icon: PawPrint },
    { title: "Contacto", url: "/contact", icon: Mail },
];

export function AppSidebar() {
    const { open, isMobile, toggleSidebar } = useSidebar();
    const isExpanded = open || isMobile;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader
                className={cn(
                    "font-bold transition-all duration-300 ease-in-out",
                    isExpanded ? "text-xl p-4" : "text-lg p-2 justify-center flex"
                )}
            >
                {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<Logo width={32} height={32} /></span> : <Logo width={32} height={32} />}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {isExpanded && (
                        <SidebarGroupLabel>
                            Otros enlaces
                        </SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={toggleSidebar}
                                    tooltip={isExpanded ? 'Cerrar barra lateral' : 'Abrir barra lateral'}
                                    className={cn(!isExpanded && "justify-center cursor-pointer")}
                                >
                                    <PanelLeft className="h-6 w-6" />
                                    {isExpanded && <span>Cerrar menú</span>}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className={cn(!isExpanded && "justify-center")}
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2"
                                        >
                                            <item.icon className="h-6 w-6" />

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
                        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`} target="_blank" rel="noreferrer">
                            <FaWhatsapp className="size-5" />
                            <span className="sr-only">WhatsApp</span>
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild className="hover:text-blue-600">
                        <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} target="_blank" rel="noreferrer">
                            <FaFacebook className="size-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild className="hover:text-pink-600">
                        <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank" rel="noreferrer">
                            <FaInstagram className="size-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
