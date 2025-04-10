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
                'project-card-bg': 'var(--project-card-bg, rgba(0, 0, 0, 0.03))',
            },
            boxShadow: {
                'theme': '0 0 15px 5px var(--bt-color)',
                'md': '0 4px 4px rgba(0, 0, 0, 0.25)',
                'sm': '0 2px 2px rgba(0, 0, 0, 0.25)',
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
    plugins: [],
};

export default config;