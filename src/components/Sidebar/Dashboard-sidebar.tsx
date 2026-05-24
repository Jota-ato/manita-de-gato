"use client"

import {
    Sidebar,
    SidebarContent,
    useSidebar
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./SidebarHeader";
import DashboardSidebarLinks from "./DashboardSidebar/DashboardSidebarLinks";
import DashboardSidebarFooter from "./DashboardSidebar/DashboardSidebarFooter";

export function DashboardSidebar() {
    const { open, isMobile, toggleSidebar } = useSidebar();
    const isExpanded = open || isMobile;

    return (
        <Sidebar collapsible="icon">
            <AppSidebarHeader
                isExpanded={isExpanded}
            />
            <SidebarContent>
                <DashboardSidebarLinks
                    isExpanded={isExpanded}
                    toggleSidebar={toggleSidebar}
                />
            </SidebarContent>
            <DashboardSidebarFooter
                isExpanded={isExpanded}
            />
        </Sidebar>
    );
}
