import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // ThemeProvider sets data-theme on <body>
    darkMode: ['selector', '[data-theme="dark"]'],
    // v4 only emits utilities that are used, and hover already only applies on
    // hover-capable devices, so the old corePlugins/future flags aren't needed
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-roboto-mono)', 'monospace'],
                rubik: ['var(--font-rubik)', 'sans-serif'],
                pixel: ['var(--font-pixel)', 'monospace'],
            },
            fontSize: {
                // Smallest size any text may use (11px at the default root size)
                '2xs': '0.6875rem',
            },
            colors: {
                // Neo-brutalist 8-bit palette (themeable tokens live in globals.css)
                nb: {
                    bg: 'var(--nb-bg)',
                    card: 'var(--nb-card)',
                    ink: 'var(--nb-ink)',
                    muted: 'var(--nb-muted)',
                    heart: 'var(--nb-heart)',
                    panel: 'var(--nb-panel)',
                    map: 'var(--nb-map)',
                    on: '#121212',
                    // Deep enough for white text on it (5.3:1); text uses the themed blue-ink below
                    blue: '#0066dd',
                    'blue-ink': 'var(--nb-blue-ink)',
                    yellow: 'var(--nb-yellow)',
                    sky: '#7FB8FF',
                    pink: 'var(--nb-pink)',
                    green: '#2ED47A',
                    orange: '#FF9F43',
                    purple: '#B892FF',
                    red: '#E5383B',
                    silver: '#d1d5db',
                },
            },
            boxShadow: {
                // Hard offset shadows
                'hard-0': '0 0 0 var(--nb-ink)',
                'hard-3': '3px 3px 0 var(--nb-ink)',
                'hard-4': '4px 4px 0 var(--nb-ink)',
                'hard-5': '5px 5px 0 var(--nb-ink)',
                'hard-6': '6px 6px 0 var(--nb-ink)',
                'hard-8': '8px 8px 0 var(--nb-ink)',
                'hard-9': '9px 9px 0 var(--nb-ink)',
                'hard-12': '12px 12px 0 var(--nb-ink)',
            },
            screens: {
                'md': '800px',
            },
            keyframes: {
                dropdownFadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                blink: {
                    '0%, 49%': { opacity: '1' },
                    '50%, 100%': { opacity: '0' },
                },
                // Two-frame 8-bit bounce
                hop: {
                    '0%, 49%': { translate: '-50% 0' },
                    '50%, 100%': { translate: '-50% -4px' },
                },
                // Speech bubble popping in, overshooting a frame before it settles
                pop: {
                    '0%': { opacity: '0', scale: '0.5' },
                    '60%': { opacity: '1', scale: '1.15' },
                    '100%': { opacity: '1', scale: '1' },
                },
            },
            animation: {
                // Five blinks, then it rests: nothing on the page flashes for longer than 5s
                blink: 'blink 1s steps(1) 5',
                // Six hops (4.8s), then the player stands still: nothing moves for longer than 5s
                hop: 'hop 0.8s linear 6',
                pop: 'pop 0.25s steps(3) both',
                dropdownFadeIn: 'dropdownFadeIn 0.3s ease-out',
            },
        },
    },
};

export default config;