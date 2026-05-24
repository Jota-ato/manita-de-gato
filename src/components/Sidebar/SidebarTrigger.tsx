import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

interface AppSidebarTriggerProps { 
    isExpanded: boolean
    toggleSidebar: () => void
}

export default function SidebarTrigger({ isExpanded, toggleSidebar } : AppSidebarTriggerProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={toggleSidebar}
                tooltip={isExpanded ? 'Cerrar barra lateral' : 'Abrir barra lateral'}
                className={cn(!isExpanded && "justify-center cursor-pointer")}
            >
                <PanelLeft className="size-10" />
                {isExpanded && <span className="text-lg">Cerrar menú</span>}
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}