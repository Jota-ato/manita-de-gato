import { BookOpen, Calendar, Home, LucideProps, Mail, PawPrint } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import AppSidebarItem from "../SidebarItem";
import AppSidebarTrigger from "../SidebarTrigger";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface AppSidebarLinksProps {
    isExpanded: boolean
    toggleSidebar: () => void
}

export interface navItems {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const navItems = [
    { title: "Inicio", url: "/", icon: Home },
    { title: "Agendar cita", url: "/agenda", icon: Calendar },
    { title: "Acerca de nosotros", url: "/about-us", icon: PawPrint },
    { title: "Contacto", url: "/contact", icon: Mail },
];

export default function AppSidebarLinks({ isExpanded, toggleSidebar }: AppSidebarLinksProps) {
    return (
        <SidebarGroup>
            {isExpanded && (
                <SidebarGroupLabel>
                    Otros enlaces
                </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    <AppSidebarTrigger
                        isExpanded={isExpanded}
                        toggleSidebar={toggleSidebar}
                    />
                    {navItems.map(sidebarMenuItem => (
                        <AppSidebarItem
                            key={sidebarMenuItem.url}
                            isExpanded={isExpanded}
                            sidebarMenuItem={sidebarMenuItem}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}