import { cn } from "@/lib/utils";
import { SidebarHeader } from "@/components/ui/sidebar";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebarHeader({ isExpanded }: { isExpanded: boolean }) {

    const pathName = usePathname();

    const getHeaderHref = () => {
        if (pathName.startsWith('/dashboard')) {
            return '/dashboard';
        }
        return '/';
    };

    return (
        <SidebarHeader
            className={cn(
                "font-bold transition-all duration-300 ease-in-out font-cavalier tracking-widest text-2xl",
                isExpanded ? "p-4" : "p-2 justify-center flex"
            )}
        >
            <Link href={getHeaderHref()}>
                {isExpanded ? <span className="flex items-center gap-2">Manita de Gato<Logo width={32} height={32} /></span> : <Logo width={32} height={32} />}
            </Link>
        </SidebarHeader>
    )
}