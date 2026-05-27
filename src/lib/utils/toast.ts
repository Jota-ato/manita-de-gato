import { toast, type ExternalToast } from 'sonner';

interface AppToastProps extends ExternalToast {
    variant?: toastVariant
}

export type toastVariant = 'success' | 'error' | 'warning' | 'info';

export function appToast(message: string, options?: AppToastProps) {

    const variant = options?.variant;

    const variantStyles: Record<toastVariant, string> = {
        success: 'border-success/30 bg-success text-success-foreground',
        error: 'border-destructive/30 bg-destructive text-destructive-foreground',
        warning: 'border-warning/30 bg-warning text-warning-foreground',
        info: 'border-info/30 bg-info text-info-foreground',
    };

    console.log(variant ? variantStyles[variant] : 'bg-card text-accent border-border');

    if (variant) {
        return toast[variant](message, {
            ...options,
            className: `
            border
            ${variant ? variantStyles[variant] : 'bg-card text-accent border-border'}
            ${options?.className ?? ''}
        `,
        });
    }

    return toast(message, {
        ...options,
        className: `
            border
            ${variant ? variantStyles[variant] : 'bg-card text-accent border-border'}
            ${options?.className ?? ''}
        `,
    });
}