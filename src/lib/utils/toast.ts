import { toast, type ExternalToast } from 'sonner';

interface AppToastProps extends ExternalToast {
    variant?: 'success' | 'error' | 'warning' | 'info';
}

export function appToast(message: string, options?: AppToastProps) {

    const variant = options?.variant;

    const variantStyles = {
        success: 'border-success/30 bg-success/10 text-success-foreground',
        error: 'border-destructive/30 bg-destructive/10 text-foreground',
        warning: 'border-warning/30 bg-warning/10 text-warning-foreground',
        info: 'border-info/30 bg-info/10 text-info-foreground',
    };

    return toast(message, {
        ...options,

        className: `
            border shadow-lg rounded-2xl backdrop-blur-md
            ${variant ? variantStyles[variant] : 'bg-card text-card-foreground border-border'}
            ${options?.className ?? ''}
        `,
    });
}