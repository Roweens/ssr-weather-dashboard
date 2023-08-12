'use client';

export function getCssVar(name: string) {
    if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(
            name,
        );
    }
}
