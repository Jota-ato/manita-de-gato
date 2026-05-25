import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { IconType } from "react-icons";

interface AppSidebarItemProps {
    isExpanded: boolean
    sidebarMenuItem: {
        title: string;
        url: string;
        icon: IconType;
    }
}

export default function SidebarItem({ isExpanded, sidebarMenuItem } : AppSidebarItemProps) {
    return (
        <SidebarMenuItem key={sidebarMenuItem.title}>
            <SidebarMenuButton
                asChild
                tooltip={sidebarMenuItem.title}
                className={cn(!isExpanded && "justify-center")}
            >
                <Link
                    href={sidebarMenuItem.url}
                    className="flex items-center gap-2"
                >
                    <sidebarMenuItem.icon
                        className="size-5! md:size-4!"
                    />

                    {isExpanded && <span>{sidebarMenuItem.title}</span>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}