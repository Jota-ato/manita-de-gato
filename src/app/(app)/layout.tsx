import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/App-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="fixed bottom-4 right-4 z-10 flex items-center bg-primary text-secondary rounded-full p-4 md:hidden" />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}