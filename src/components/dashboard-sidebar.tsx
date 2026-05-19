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
import { Home, Calendar, BookOpen, Mail, PawPrint } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SignOutButton from "./DashboardSideBar/SignOutButton";

const navItems = [
    { title: "Inicio", url: "/dashboard", icon: Home },
    { title: "Agenda", url: "/agenda", icon: Calendar },
    { title: "Blog", url: "/blog", icon: BookOpen },
    { title: "Acerca de nosotros", url: "/about-us", icon: PawPrint },
    { title: "Contacto", url: "/contact", icon: Mail },
];

export function DashboardSidebar() {
    const { open, isMobile } = useSidebar();
    const isExpanded = open || isMobile;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader
                className={cn(
                    "font-bold transition-all duration-300 ease-in-out",
                    isExpanded ? "text-xl p-4" : "text-lg p-2 justify-center flex"
                )}
            >
                {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<PawPrint className="size-8 text-pink-400" /></span> : <PawPrint className="m-auto text-pink-400" />}
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
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    );
}
