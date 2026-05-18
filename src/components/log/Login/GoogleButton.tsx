import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-full border-[#dadce0] hover:bg-[#f8f9fa] font-medium gap-3 text-sm"
        >
            <FcGoogle className="size-5 shrink-0" aria-hidden="true" />
            Continuar con Google
        </Button>
    )
}