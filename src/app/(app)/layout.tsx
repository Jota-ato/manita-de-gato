import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="sticky top-2 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden" />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}