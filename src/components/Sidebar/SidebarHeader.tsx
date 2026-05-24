import { cn } from "@/lib/utils";
import { SidebarHeader } from "@/components/ui/sidebar";
import Logo from "@/components/ui/logo";

export default function AppSidebarHeader({ isExpanded }: { isExpanded: boolean }) {
    return (
        <SidebarHeader
            className={cn(
                "font-bold transition-all duration-300 ease-in-out",
                isExpanded ? "text-2xl p-4" : "text-xl p-2 justify-center flex"
            )}
        >
            {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<Logo width={32} height={32} /></span> : <Logo width={32} height={32} />}
        </SidebarHeader>
    )
}