import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.{html,md}',
    ],
    // Optimize for production builds
    future: {
        hoverOnlyWhenSupported: true,
    },
    corePlugins: {
        // Disable unused features to reduce bundle size
        touchAction: false,
        ringOffsetWidth: false,
        ringOffsetColor: false,
        scrollSnapType: false,
        scrollSnapAlign: false,
        scrollSnapStop: false,
        scrollMargin: false,
        scrollPadding: false,
    },
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-roboto-mono)', 'monospace'],
                rubik: ['var(--font-rubik)', 'sans-serif'],
            },
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
            },
            animation: {
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
    plugins: [
        require('@tailwindcss/typography'),
    ],
};

export default config;