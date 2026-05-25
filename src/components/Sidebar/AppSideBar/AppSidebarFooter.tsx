import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface AppSidebarFooterProps {
    isExpanded: boolean
}

export default function AppSidebarFooter({ isExpanded }: AppSidebarFooterProps) {
    return (
        <SidebarFooter className="p-4">
            <div className={cn(
                "flex items-center justify-center gap-2",
                isExpanded ? "flex-row" : "flex-col"
            )}>
                <Button variant="ghost" size="icon" asChild className="hover:text-green-500">
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`} target="_blank" rel="noreferrer">
                        <FaWhatsapp className={cn(isExpanded ? 'size-6' : 'size-4')} />
                        <span className="sr-only">WhatsApp</span>
                    </a>
                </Button>

                <Button variant="ghost" size="icon" asChild className="hover:text-blue-600">
                    <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} target="_blank" rel="noreferrer">
                        <FaFacebook className={cn(isExpanded ? 'size-6' : 'size-4')} />
                        <span className="sr-only">Facebook</span>
                    </a>
                </Button>

                <Button variant="ghost" size="icon" asChild className="hover:text-pink-600">
                    <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank" rel="noreferrer">
                        <FaInstagram className={cn(isExpanded ? 'size-6' : 'size-4')} />
                        <span className="sr-only">Instagram</span>
                    </a>
                </Button>
            </div>
        </SidebarFooter>
    )
}