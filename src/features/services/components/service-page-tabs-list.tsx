import {
    TabsList,
    TabsTrigger,
} from "@/shared/components/ui/tabs";

export function ServicePageTabsList() {
    return (
        <TabsList className="flex gap-4 sm:gap-8">
            <TabsTrigger className="text-xs sm:text-sm" value="activeServices">Servicios activos</TabsTrigger>
            <TabsTrigger className="text-xs sm:text-sm" value="unactiveServices">Servicios inactivos</TabsTrigger>
            <TabsTrigger className="text-xs sm:text-sm" value="activeExtras">Extras activos</TabsTrigger>
            <TabsTrigger className="text-xs sm:text-sm" value="unactiveExtras">Extras inactivos</TabsTrigger>
        </TabsList>
    )
}