import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full">
                <SidebarTrigger className="fixed" />
                {children}
            </main>
        </SidebarProvider>
    )
}