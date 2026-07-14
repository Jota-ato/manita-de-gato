"use client"
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    useSidebar,
} from "../ui/sidebar";
import { generateNavigation } from "./sidebar/constants";
import { SidebarNavGroup } from "./sidebar/sidebar-nav-group";
import { MdMenu } from "react-icons/md";
import { SignOutButton } from "./sidebar/sign-out-button";
import Link from "next/link";
import { ThemeToggleSideBar } from "./sidebar/theme-sidebar-toggle";
import { Heading } from "../typography/heading";
import { PawPrint } from "lucide-react";
import { UserRole } from "@/db/schema";

type DashboardSidebarProps = {
    role: UserRole;
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {

    const { open, isMobile } = useSidebar()
    const isCollapse = isMobile ? false : !open
    const pathname = usePathname()
    const navigation = generateNavigation(role)

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                {!isCollapse && (<>
                    <Link
                        href={'/dashboard'}
                    >
                        <Heading className="text-left text-lg md:text-xl font-bold flex items-center gap-2">Manita de gato <PawPrint className="fill-primary stroke-primary" /></Heading>
                    </Link>
                    <span className="text-sm text-muted-foreground">Admin dashboard</span>
                </>)}
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavGroup
                    label="Navigation"
                    isCollapsed={isCollapse}
                    items={navigation}
                    pathName={pathname}
                    groupIcon={MdMenu}
                />
                <ThemeToggleSideBar
                    isCollapsed={isCollapse}
                />
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SignOutButton isCollapse={open} />
            </SidebarFooter>
        </Sidebar>
    )
}