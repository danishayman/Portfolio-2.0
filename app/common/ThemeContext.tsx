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
        // Handle client-side only
        const savedTheme = getLocalStorage('theme') as Theme | null;
        setTheme(savedTheme || 'light');
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.setAttribute('data-theme', theme);
            setLocalStorage('theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = (): void => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};