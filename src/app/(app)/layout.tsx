import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/App-sidebar";
import Header from "@/components/landing/Header/Header";
import WhatsappButton from "@/components/ui/whatsappButton";
import FooterGoogle from "@/components/landing/Footer/FooterGoogle";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                    <WhatsappButton />
                    <FooterGoogle />
                </ThemeProvider>
            </main>
        </SidebarProvider>
    )
}