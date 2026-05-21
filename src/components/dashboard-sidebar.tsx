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
import { Home, Calendar, CircleDollarSign, Sparkles, PawPrint } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SignOutButton from "./DashboardSideBar/SignOutButton";
import Logo from "./ui/logo";

const navItems = [
    { title: "Inicio", url: "/dashboard", icon: Home },
    { title: "Agenda", url: "/dashboard/agenda", icon: Calendar },
    { title: "Finanzas", url: "/dashboard/finance", icon: CircleDollarSign },
    { title: "Servicios", url: "/dashboard/services", icon: Sparkles }
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
                {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<Logo width={32} height={32}/></span> : <Logo width={32} height={32}/>}
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
                <SignOutButton
                    isExpanded={isExpanded}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
