import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
    onNext: () => void;
    onPrev: () => void;
}

export default function Pagination({ onNext, onPrev }: PaginationProps) {
    return (
        <div className="p-2 flex items-center justify-center gap-2">
            <Button
                size={'icon'}
                onClick={onPrev}
                className="p-2 rounded-full hover:text-accent-foreground transition-colors duration-300 active:scale-90"
            >
                <ArrowLeft className="size-5" />
            </Button>
            <Button
                size={'icon'}
                onClick={onNext}
                className="p-2 rounded-full hover:text-accent-foreground transition-colors duration-300 active:scale-90"
            >
                <ArrowRight className="size-5" />
            </Button>
        </div>
    )
}