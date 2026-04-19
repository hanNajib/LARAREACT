import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { __ } from "@/lib/helpers";
import { type Appearance, useAppearance } from "@/hooks/use-appearance";

export function ThemeCycleToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const cycle: Record<Appearance, Appearance> = {
            light: 'dark',
            dark: 'system',
            system: 'light'
        };
        updateAppearance(cycle[appearance]);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            title={`${__("Current mode")}: ${__(appearance)}`}
        >
            {appearance === 'light' && (
                <Sun className="size-5 text-primary animate-in zoom-in rotate-0 transition-all" />
            )}
            {appearance === 'dark' && (
                <Moon className="size-5 text-blue-400 animate-in zoom-in rotate-0 transition-all" />
            )}
            {appearance === 'system' && (
                <Monitor className="size-5 text-slate-500 animate-in zoom-in rotate-0 transition-all" />
            )}
            
            <span className="sr-only">{__("Toggle theme")}</span>
        </Button>
    );
}