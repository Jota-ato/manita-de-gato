import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface AppSidebarFooterProps { 
    isExpanded: boolean
    isMobile: boolean
}

export default function AppSidebarFooter({ isExpanded, isMobile } : AppSidebarFooterProps) {
    return (
        <SidebarFooter className="p-4">
            <div className={cn(
                "flex items-center justify-center gap-6 md:gap-4",
                isExpanded ? "flex-row" : "flex-col"
            )}>
                <Button variant="ghost" size="icon" asChild className="hover:text-green-500">
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`} target="_blank" rel="noreferrer">
                        <FaWhatsapp className={cn(
                            isExpanded && !isMobile ? 'size-6' : isExpanded && isMobile ? 'size-8' : 'size-6'
                        )} />
                        <span className="sr-only">WhatsApp</span>
                    </a>
                </Button>

                <Button variant="ghost" size="icon" asChild className="hover:text-blue-600">
                    <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} target="_blank" rel="noreferrer">
                        <FaFacebook className="size-8 md:size-6" />
                        <span className="sr-only">Facebook</span>
                    </a>
                </Button>

                <Button variant="ghost" size="icon" asChild className="hover:text-pink-600">
                    <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank" rel="noreferrer">
                        <FaInstagram className="size-8 md:size-6" />
                        <span className="sr-only">Instagram</span>
                    </a>
                </Button>
            </div>
        </SidebarFooter>
    )
}