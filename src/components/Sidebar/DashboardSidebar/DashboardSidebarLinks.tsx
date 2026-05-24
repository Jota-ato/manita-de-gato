import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import SidebarItem from "../SidebarItem";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Calendar, CircleDollarSign, Home, LucideProps, Sparkles } from "lucide-react";
import SidebarTrigger from "../SidebarTrigger";

interface DashboardSidebarLinksProps {
    isExpanded: boolean
    toggleSidebar: () => void
}

export interface navItems {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const navItems = [
    { title: "Inicio", url: "/dashboard", icon: Home },
    { title: "Agenda", url: "/dashboard/agenda", icon: Calendar },
    { title: "Finanzas", url: "/dashboard/finance", icon: CircleDollarSign },
    { title: "Servicios", url: "/dashboard/services", icon: Sparkles }
];

export default function DashboardSidebarLinks({ isExpanded, toggleSidebar }: DashboardSidebarLinksProps) {
    return (
        <SidebarGroup>
            {isExpanded && (
                <SidebarGroupLabel>
                    Otros enlaces
                </SidebarGroupLabel>
            )}
            <SidebarTrigger
                isExpanded={isExpanded}
                toggleSidebar={toggleSidebar}
            />
            <SidebarGroupContent>
                <SidebarMenu>
                    {navItems.map(item => (
                        <SidebarItem
                            key={item.url}
                            sidebarMenuItem={item}
                            isExpanded={isExpanded}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}