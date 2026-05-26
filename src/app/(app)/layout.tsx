import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/App-sidebar";
import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";
import WhatsappButton from "@/components/ui/whatsappButton";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <Header />
                {children}
                <WhatsappButton />
                <Footer />
            </main>
        </SidebarProvider>
    )
}