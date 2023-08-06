'use client';

import { THEME_LOCALSTORAGE_KEY, Theme } from '@/utils/const/theme';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme;
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
    }, [theme]);

    document.documentElement.className = theme;

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
