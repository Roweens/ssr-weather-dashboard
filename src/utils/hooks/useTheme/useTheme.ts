'use client';

import { Theme } from '@/utils/const/theme';
import { ThemeContext } from '@/utils/context/ThemeContext/ThemeContext';
import { useContext } from 'react';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme;

        switch (theme) {
            case 'dark':
                newTheme = 'light';
                break;
            case 'light':
                newTheme = 'dark';
                break;
            default:
                newTheme = 'light';
        }

        setTheme?.(newTheme);
    };

    return {
        theme: theme || 'light',
        toggleTheme,
    };
}
