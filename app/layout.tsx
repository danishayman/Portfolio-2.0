import './globals.css';
import { ThemeProvider } from './common/ThemeContext';
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
  title: 'danishayman',
  description: 'Danish Aiman - Computer Science Student',
  keywords: 'AI, Machine Learning, Web Development, Portfolio, Danish Aiman',
  openGraph: {
    title: 'Danish Aiman | AI & ML Developer',
    description: 'A developer majoring in Intelligent Computing. Super into Machine Learning and AI.',
    url: 'https://danishaiman.com',
    siteName: 'Danish Aiman Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoMono.variable} ${rubik.variable}`}>
      <head>
      <meta name="apple-mobile-web-app-title" content="<Zag/>" />
        <meta name="google-site-verification" content="bZyz4TL7ElDmE33G3CMvYh_GIj6Vah461AEhU8Uz224" />
      </head>
      <body className={robotoMono.variable} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}