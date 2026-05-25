"use client"
import {
    Sidebar,
    SidebarContent,
    useSidebar
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./SidebarHeader";
import AppSidebarLinks from "./AppSideBar/AppSidebarLinks";
import AppSidebarFooter from "./AppSideBar/AppSidebarFooter";

export function AppSidebar() {
    const { open, isMobile, toggleSidebar } = useSidebar();
    const isExpanded = open || isMobile;

    return (
        <Sidebar collapsible="icon">
            <AppSidebarHeader 
                isExpanded={isExpanded}
            />
            <SidebarContent>
                <AppSidebarLinks
                    isExpanded={isExpanded}
                    toggleSidebar={toggleSidebar}
                />
            </SidebarContent>
            <AppSidebarFooter
                isExpanded={isExpanded}
            />
        </Sidebar>
    );
}
