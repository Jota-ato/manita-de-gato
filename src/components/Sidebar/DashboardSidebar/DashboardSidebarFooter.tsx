import SignOutButton from "@/components/DashboardSideBar/SignOutButton";
import { SidebarFooter } from "@/components/ui/sidebar";

interface DashboardSidebarFooterProps { 
    isExpanded: boolean
}

export default function DashboardSidebarFooter({ isExpanded }: DashboardSidebarFooterProps) {
    return (
        <SidebarFooter className="p-4">
            <SignOutButton
                isExpanded={isExpanded}
            />
        </SidebarFooter>
    )
}