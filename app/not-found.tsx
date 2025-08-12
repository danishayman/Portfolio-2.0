import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from './component/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found | Danish Aiman',
  description: 'The page you are looking for could not be found. Return to the homepage to explore my portfolio, work experience, and blog posts.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Page Not Found | Danish Aiman',
    description: 'The page you are looking for could not be found.',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            {/* 404 Visual */}
            <div className="text-8xl font-bold opacity-20 mb-4">404</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-base opacity-80 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4 mb-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Back to Homepage
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/#work"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--text-color)] opacity-80 hover:opacity-100 transition-opacity"
              >
                View Work Experience
              </Link>
              <Link 
                href="/#yapping"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--text-color)] opacity-80 hover:opacity-100 transition-opacity"
              >
                Read Blog Posts
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-sm opacity-60">
            <p>If you believe this is an error, please check the URL or</p>
            <Link href="/#contact" className="underline hover:opacity-80">
              get in touch
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
