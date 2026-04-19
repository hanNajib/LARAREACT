import { useFlashToast } from '@/hooks/use-flash-toast';
import { useAppearance } from '@/hooks/use-appearance';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();

    useFlashToast();

    return (
        <Sonner
            theme={appearance}
            className="toaster group"
            position="top-right"
            closeButton
            richColors
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast:
                        'border border-border bg-popover text-popover-foreground rounded-xl shadow-lg px-4 py-3',
                    title: 'text-sm font-semibold',
                    description: 'text-xs text-muted-foreground',
                    actionButton:
                        'bg-primary text-primary-foreground hover:bg-primary/90',
                    cancelButton:
                        'bg-muted text-muted-foreground hover:bg-muted/80',
                    success:
                        'border-primary/35 bg-primary/10 text-foreground',
                    info: 'border-sky-500/35 bg-sky-500/10 text-foreground',
                    warning:
                        'border-amber-500/35 bg-amber-500/10 text-foreground',
                    error:
                        'border-destructive/45 bg-destructive/10 text-foreground',
                },
            }}
            {...props}
        />
    );
}

export { Toaster };
