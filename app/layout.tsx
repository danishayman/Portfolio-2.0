import './globals.css';
import { ThemeProvider } from './common/ThemeContext';
import { PersonStructuredData, WebsiteStructuredData } from './components/StructuredData';
import CSSLoader from './components/CSSLoader';
import type { Metadata } from 'next';
import { Roboto_Mono, Rubik } from 'next/font/google';

// Initialize the fonts with optimized loading
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-roboto-mono',
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['Courier New', 'monospace'],
  preload: true,
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-rubik',
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['Arial', 'sans-serif'],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Danish Aiman | Developer',
    template: '%s | Danish Aiman'
  },
  description: 'Computer Science student specializing in AI and Machine Learning. Experienced in web development, software engineering, and technical problem-solving. View my portfolio of projects and work experience.',
  keywords: [
    'Danish Aiman',
    'AI Developer', 
    'Machine Learning',
    'Computer Science Student',
    'Web Development',
    'Software Engineer',
    'Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Python',
    'ASP.NET',
    'C#',
    'SQL',
    'Git'
  ].join(', '),
  authors: [{ name: 'Danish Aiman' }],
  creator: 'Danish Aiman',
  publisher: 'Danish Aiman',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://danishaiman.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Danish Aiman | AI & ML Developer',
    description: 'Computer Science student specializing in AI and Machine Learning. Experienced in web development and software engineering.',
    url: 'https://danishaiman.com',
    siteName: 'Danish Aiman Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/hero/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Danish Aiman Portfolio',
      }
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon1.png', type: 'image/png', sizes: '32x32' },
      { url: '/publicmy-favicon/web-app-manifest-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/publicmy-favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon0.svg', color: '#000000' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danish Aiman | AI & ML Developer',
    description: 'Computer Science student specializing in AI and Machine Learning.',
    images: ['/hero/screenshot.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'bZyz4TL7ElDmE33G3CMvYh_GIj6Vah461AEhU8Uz224',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoMono.variable} ${rubik.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Danish Aiman" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="google-site-verification" content="bZyz4TL7ElDmE33G3CMvYh_GIj6Vah461AEhU8Uz224" />
        <link rel="apple-touch-icon" sizes="192x192" href="/publicmy-favicon/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/publicmy-favicon/web-app-manifest-192x192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --bt-color: #007bff;
              --btn-text-color: #ffffff;
              --background-color: #ffffff;
              --text-color: currentColor;
              --project-card-bg: #ffffff;
              --border-color: currentColor;
              --box-shadow-color: #888;
            }
            [data-theme='dark'] {
              --bt-color: #ffffff;
              --btn-text-color: #222;
              --background-color: #222;
              --project-card-bg: #fff;
              --border-color: currentColor;
              --box-shadow-color: #ffffff66;
            }
            body {
              font-family: var(--font-roboto-mono), monospace;
              min-height: 100%;
              overflow-y: auto;
              margin: 0;
              padding: 0;
            }
            html {
              height: 100%;
              overflow-y: auto;
            }
            body[data-theme='light'] {
              background-color: white;
              color: #222;
            }
            body[data-theme='dark'] {
              background-color: #222;
              color: #fff;
            }
            h1, h2, button {
              font-family: var(--font-rubik), sans-serif;
            }
            section {
              position: relative;
              width: 100%;
            }
            .backface-hidden {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .perspective-1000 {
              perspective: 1000px;
            }
            .transform-style-preserve-3d {
              transform-style: preserve-3d;
              -webkit-transform-style: preserve-3d;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
              -webkit-transform: rotateY(180deg);
            }
            .flip-img {
              box-shadow: 0 0 0 0 transparent;
              transition: box-shadow 700ms ease, transform 600ms ease;
            }
            .flip-container:hover .flip-img {
              transform: rotateY(180deg);
              -webkit-transform: rotateY(180deg);
              box-shadow: 0 0 15px 5px var(--bt-color);
            }
          `
        }} />
      </head>
      <body className={robotoMono.variable} suppressHydrationWarning>
        <CSSLoader />
        <PersonStructuredData />
        <WebsiteStructuredData />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}