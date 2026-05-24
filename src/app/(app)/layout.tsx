import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarTrigger className="fixed top-8 sm:top-6 z-100 flex items-center gap-4 border-b px-4 md:hidden" />

            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}