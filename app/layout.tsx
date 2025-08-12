import './globals.css';
import { ThemeProvider } from './common/ThemeContext';
import { PersonStructuredData, WebsiteStructuredData } from './components/StructuredData';
import type { Metadata } from 'next';
import { Roboto_Mono, Rubik } from 'next/font/google';

// Initialize the fonts
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-roboto-mono',
  display: 'swap',
  adjustFontFallback: false,
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-rubik',
  display: 'swap',
  adjustFontFallback: false,
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
        <meta name="google-site-verification" content="bZyz4TL7ElDmE33G3CMvYh_GIj6Vah461AEhU8Uz224" />
      </head>
      <body className={robotoMono.variable} suppressHydrationWarning>
        <PersonStructuredData />
        <WebsiteStructuredData />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}