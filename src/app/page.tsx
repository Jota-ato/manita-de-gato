import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Link
                href={'/agenda'}
            >
                <Button
                    variant={"secondary"}
                >
                    Ir a la agenda
                </Button>
            </Link>
        </div>
    );
}
