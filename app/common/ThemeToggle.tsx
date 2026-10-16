'use client';

import { useTheme } from './ThemeContext';
import { PixelMoon, PixelSun } from './PixelIcons';

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            className={`shrink-0 w-10 h-10 grid place-items-center bg-nb-card text-nb-ink border-[3px] border-nb-ink shadow-hard-3 transition-[translate,rotate,scale,box-shadow] duration-100 hover:bg-nb-yellow hover:text-nb-on hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-4 active:translate-x-[3px] active:translate-y-[3px] active:shadow-hard-0 ${className}`}
        >
            {theme === 'light' ? <PixelMoon /> : <PixelSun />}
        </button>
    );
}
