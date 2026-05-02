import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
// Importamos los logos directamente de react-icons
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader
                className="text-5xl font-bold"
            >
                Manita de Gato
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" asChild className="hover:text-green-500">
                        <a href="https://wa.me/5627611099" target="_blank" rel="noreferrer">
                            <FaWhatsapp className="w-5 h-5" />
                            <span className="sr-only">WhatsApp</span>
                        </a>
                    </Button>
                    
                    {/* Botón de Facebook oficial */}
                    <Button variant="ghost" size="icon" asChild className="hover:text-blue-600">
                        <a href="https://facebook.com/tupagina" target="_blank" rel="noreferrer">
                            <FaFacebook className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                    </Button>
                    
                    {/* Botón de Instagram oficial */}
                    <Button variant="ghost" size="icon" asChild className="hover:text-pink-600">
                        <a href="https://instagram.com/tuperfil" target="_blank" rel="noreferrer">
                            <FaInstagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}