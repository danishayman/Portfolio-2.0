import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.{html,md}',
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
                    blue: '#007bff',
                    yellow: '#FFD23F',
                    sky: '#7FB8FF',
                    pink: '#FF5C8A',
                    green: '#2ED47A',
                    orange: '#FF9F43',
                    purple: '#B892FF',
                    silver: '#d1d5db',
                },
            },
            boxShadow: {
                'md': '0 4px 4px rgba(0, 0, 0, 0.25)',
                'sm': '0 2px 2px rgba(0, 0, 0, 0.25)',
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
            keyframes: {
                dropdownFadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
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
                // Dashes crawling along an SVG stroke
                march: {
                    to: { strokeDashoffset: '-18' },
                },
            },
            animation: {
                blink: 'blink 1s steps(1) infinite',
                hop: 'hop 0.8s linear infinite',
                march: 'march 0.9s linear infinite',
                dropdownFadeIn: 'dropdownFadeIn 0.3s ease-out',
                fadeIn: 'fadeIn 0.5s ease-out',
                fadeInUp: 'fadeInUp 0.6s ease forwards',
            },
            typography: {
                DEFAULT: {
                    css: {
                        'p': {
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                            fontWeight: '400',
                            letterSpacing: '0.01em',
                            lineHeight: '1.8',
                            color: '#000000',
                        },
                    },
                },
            },
        },
    },
    // @tailwindcss/typography is loaded with @plugin in app/globals.css
};

export default config;