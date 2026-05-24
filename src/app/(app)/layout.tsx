import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {

    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            <AppSidebar />
            { isMobile && <SidebarTrigger /> }
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}