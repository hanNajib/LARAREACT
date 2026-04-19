import { useCallback } from 'react';

export type GetInitialsFn = (username?: string | null) => string;

export function useInitials(): GetInitialsFn {
    return useCallback((username?: string | null): string => {
        const normalizedName = username?.trim() ?? '';

        if (normalizedName.length === 0) {
            return '';
        }

        const names = normalizedName.split(/\s+/).filter(Boolean);

        if (names.length === 0) {
            return '';
        }

        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
