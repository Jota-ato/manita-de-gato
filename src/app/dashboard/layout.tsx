import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/Sidebar/Dashboard-sidebar";
import { ThemeToggle } from "@/components/ui/ToggleThemeButton";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full">
                <SidebarTrigger className="fixed top-4 left-4 z-10 flex items-center bg-primary text-secondary rounded-full p-4 md:hidden" />
                <div className="fixed top-4 right-4">
                    <ThemeToggle />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}