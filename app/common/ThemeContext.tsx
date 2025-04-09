import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useEffect(() => {
        // Handle server-side rendering safely
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme | null;
            setTheme(savedTheme || 'light');
        }
    }, []);

    useEffect(() => {
        // Only run on client-side
        if (typeof document !== 'undefined') {
            document.body.setAttribute('data-theme', theme);
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', theme);
            }
        }
    }, [theme]);

    const toggleTheme = (): void => {
        setIsTransitioning(true);
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

        // Reset the transitioning state after the transition has completed
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500); // Match this with the fadeInOut animation duration
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
            {children}
        </ThemeContext.Provider>
    );
};