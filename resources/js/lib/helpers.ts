import { usePage } from "@inertiajs/react";

export function __(key: string, replace: Record<string, any> = {}): string {
    let translations: any = {};

    try {
        const page = usePage();
        translations = page.props.translations || {};
    } catch (e) {
        const el = document.getElementById('app');
        if (el && el.dataset.page) {
            const pageData = JSON.parse(el.dataset.page);
            translations = pageData.props.translations || {};
            console.log('Translations loaded from DOM:', translations);
        }
    }

    let translation = (translations[key] || key) as string;

    Object.keys(replace).forEach((k) => {
        translation = translation.replace(`:${k}`, String(replace[k] ?? ''));
    });

    return translation;
}