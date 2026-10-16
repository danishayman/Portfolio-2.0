import './globals.css';
import { ThemeProvider } from './common/ThemeContext';
import { PersonStructuredData, WebsiteStructuredData } from './components/StructuredData';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Press_Start_2P, Roboto_Mono, Rubik } from 'next/font/google';

// Initialize the fonts with optimized loading
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
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

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
  fallback: ['Courier New', 'monospace'],
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: 'danishayman',
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
    title: 'danishayman',
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
      { url: '/my-favicon/web-app-manifest-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/my-favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon0.svg', color: '#000000' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'danishayman',
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
  appleWebApp: {
    title: 'Danish Aiman',
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

// Runs before first paint so a saved dark theme never flashes light first
const themeScript = `try{document.body.setAttribute('data-theme',localStorage.getItem('theme')==='dark'?'dark':'light')}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoMono.variable} ${rubik.variable} ${pressStart.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PersonStructuredData />
        <WebsiteStructuredData />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
