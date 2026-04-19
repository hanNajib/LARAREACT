import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { switchMethod } from '@/routes/language';
import { Link, usePage } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { __ } from '@/lib/helpers';

export function LanguageSwitcher() {
    const { currentLocale } = usePage().props as any;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="cursor-pointer gap-2 px-2 h-8 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase"
                >
                    <Languages className="size-4" />
                    {currentLocale}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-37.5">
                <DropdownMenuItem asChild>
                    <Link 
                        href={switchMethod('id')} 
                        className={`w-full cursor-pointer ${currentLocale === 'id' ? 'font-bold text-primary' : ''}`}
                    >
                        {__('Bahasa Indonesia')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link 
                        href={switchMethod('en')} 
                        className={`w-full cursor-pointer ${currentLocale === 'en' ? 'font-bold text-primary' : ''}`}
                    >
                        {__('English')}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}