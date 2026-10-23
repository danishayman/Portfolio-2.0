'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { timeOfDayTheme } from './dayNight';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    // Easter egg: true for a few seconds after the visitor flips the theme too many times too fast
    indecisive: boolean;
}

const INDECISIVE_FLIPS = 8;
const INDECISIVE_WINDOW_MS = 4000;
const INDECISIVE_SHOW_MS = 3000;

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
        // A saved choice wins; otherwise follow the time of day (the inline script in layout.tsx does the same before paint)
        const savedTheme = getLocalStorage('theme') as Theme | null;
        setTheme(savedTheme || timeOfDayTheme());

        // Check once a minute so an open tab flips at 7am/7pm, until the visitor picks a theme themselves.
        // Polling rather than one timer to the next switch, so it also catches up after the laptop sleeps.
        const timer = setInterval(() => {
            if (!getLocalStorage('theme')) setTheme(timeOfDayTheme());
        }, 60_000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.setAttribute('data-theme', theme);
        }
    }, [theme, mounted]);

    const [indecisive, setIndecisive] = useState(false);
    const flips = useRef<number[]>([]);
    const indecisiveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    useEffect(() => () => clearTimeout(indecisiveTimer.current), []);

    // Only an explicit toggle is saved, so the day/night cycle keeps applying until then
    const toggleTheme = (): void => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        setLocalStorage('theme', next);

        // Count flips inside the window; once tripped, every further flip keeps the complaint up
        const now = Date.now();
        flips.current = [...flips.current.filter((t) => now - t < INDECISIVE_WINDOW_MS), now];
        if (indecisive || flips.current.length >= INDECISIVE_FLIPS) {
            flips.current = [];
            setIndecisive(true);
            clearTimeout(indecisiveTimer.current);
            indecisiveTimer.current = setTimeout(() => setIndecisive(false), INDECISIVE_SHOW_MS);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, indecisive }}>
            {children}
        </ThemeContext.Provider>
    );
};