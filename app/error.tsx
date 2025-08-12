'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Footer from './component/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            {/* Error Visual */}
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-base opacity-80 mb-8">
              An unexpected error occurred while loading this page. This has been logged and we'll look into it.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Try Again
            </button>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg border border-[var(--text-color)] opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Return to Homepage
            </Link>
          </div>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left text-xs opacity-60 bg-red-50 dark:bg-red-900/20 p-4 rounded border">
              <summary className="cursor-pointer font-medium mb-2">Error Details (Development)</summary>
              <pre className="whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && `\n\nStack:\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
