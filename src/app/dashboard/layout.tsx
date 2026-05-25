import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/Sidebar/Dashboard-sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full">
                <SidebarTrigger className="fixed bottom-4 right-4 z-10 flex items-center bg-primary text-secondary rounded-full p-4 md:hidden" />
                {children}
            </main>
        </SidebarProvider>
    )
}