import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    onNext: () => void;
    onPrev: () => void;
}

export default function Pagination({ onNext, onPrev } : PaginationProps) {
    return (
        <div className="p-2 flex items-center justify-center gap-2 border-r border-pink-400">
            <button
                onClick={onPrev}
                className="p-2 rounded-full hover:bg-pink-600 transition-all text-white active:scale-90"
            >
                <ArrowLeft className="size-5" />
            </button>
            <button
                onClick={onNext}
                className="p-2 rounded-full hover:bg-pink-600 transition-all text-white active:scale-90"
            >
                <ArrowRight className="size-5" />
            </button>
        </div>
    )
}