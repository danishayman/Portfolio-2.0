import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'theme': 'var(--bt-color)',
                'btn-text': 'var(--btn-text-color)',
            },
            boxShadow: {
                'theme': '0 0 15px 5px var(--bt-color)',
                'md': '0 4px 4px rgba(0, 0, 0, 0.25)',
                'sm': '0 2px 2px rgba(0, 0, 0, 0.25)',
            },
            animation: {
                'fadeInOut': 'fadeInOut 0.5s ease-in-out',
            },
            keyframes: {
                fadeInOut: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            scale: {
                '115': '1.15',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
            },
            screens: {
                'md': '800px',
            },
        },
    },
    plugins: [
        function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
            const newUtilities = {
                '.backface-hidden': {
                    'backfaceVisibility': 'hidden',
                    '-webkit-backface-visibility': 'hidden',
                },
                '.perspective-1000': {
                    'perspective': '1000px',
                },
                '.transform-style-preserve-3d': {
                    'transformStyle': 'preserve-3d',
                },
                '.rotate-y-180': {
                    'transform': 'rotateY(180deg)',
                },
                '.filter-drop-shadow': {
                    'filter': 'drop-shadow(0 0 5px var(--bt-color))',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};

export default config;