'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Helper function to safely check if we can use localStorage
const isBrowser = () => typeof window !== 'undefined';

// Helper function to safely access localStorage
const getLocalStorage = (key: string, defaultValue: any = null) => {
    if (!isBrowser()) return defaultValue;
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return defaultValue;
    }
};

// Helper function to safely set localStorage
const setLocalStorage = (key: string, value: string) => {
    if (!isBrowser()) return;
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        // A saved choice wins; otherwise follow the OS setting (the inline script in layout.tsx does the same before paint)
        const savedTheme = getLocalStorage('theme') as Theme | null;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(savedTheme || (systemDark.matches ? 'dark' : 'light'));

        // Track OS changes until the visitor picks a theme themselves
        const onSystemChange = (e: MediaQueryListEvent) => {
            if (!getLocalStorage('theme')) setTheme(e.matches ? 'dark' : 'light');
        };
        systemDark.addEventListener('change', onSystemChange);
        return () => systemDark.removeEventListener('change', onSystemChange);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.setAttribute('data-theme', theme);
        }
    }, [theme, mounted]);

    // Only an explicit toggle is saved, so the OS setting keeps applying until then
    const toggleTheme = (): void => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        setLocalStorage('theme', next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};