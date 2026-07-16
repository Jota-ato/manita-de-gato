import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function FormSubmit({
    isSubmitting,
    isEditting = false,
    label,
    editingLabel = "Editar",
    submittingLabel,
    editingSubmittingLabel = "Guardando...",
    className
}: {
    isSubmitting: boolean;
    isEditting?: boolean;
    label: string;
    editingLabel?: string;
    submittingLabel?: string;
    editingSubmittingLabel?: string;
    className?: string;
}) {

    const labelToShow = isEditting ? editingLabel : label;
    const submittingLabelToShow = isEditting ? editingSubmittingLabel : submittingLabel;

    return (
        <Button
            className={cn(
                "disabled:cursor-not-allowed disabled:opacity-50",
                className)}
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting ? <span className="flex items-center gap-2"><Spinner /> {submittingLabelToShow}</span> : labelToShow}
        </Button>
    )
}