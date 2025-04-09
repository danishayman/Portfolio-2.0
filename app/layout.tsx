import './globals.css';
import { ThemeProvider } from './common/ThemeContext';
import type { Metadata } from 'next';

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
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}