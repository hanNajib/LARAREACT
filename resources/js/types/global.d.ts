import type { Auth } from '@/types/auth';
import { __ as helper__ } from '@/helpers';

declare global {
    function __(key: string, replace?: Record<string, any>): string;
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
