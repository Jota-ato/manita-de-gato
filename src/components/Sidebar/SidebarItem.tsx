import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface AppSidebarItemProps {
    isExpanded: boolean
    sidebarMenuItem: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
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
                        className="size-10"
                    />

                    {isExpanded && <span className="text-lg">{sidebarMenuItem.title}</span>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}