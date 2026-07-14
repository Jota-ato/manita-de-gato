import { cn } from "@/shared/lib/utils";

export function HourCell({
    disabled = false
}) {
    return (
        <div
            className={cn("w-full h-20 border-b border-foreground cursor-pointer transition-colors hover:bg-muted group relative",
                disabled ? "bg-muted/20 cursor-not-allowed" : "bg-accent"
            )}
        >
            <div className={cn("absolute inset-0 opacity-0  border rounded-lg border-foreground m-1 pointer-events-none transition-opacity",
                !disabled ? "group-hover:opacity-100 cursor-not-allowed" : "cursor-pointer"
            )} />
        </div>
    )
}