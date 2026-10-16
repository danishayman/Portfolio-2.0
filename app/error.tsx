'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import DetailTopBar from './common/DetailTopBar';
import Footer from './component/Footer';

const buttonMotion =
  'transition-[translate,rotate,scale,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6 active:translate-x-1 active:translate-y-1 active:shadow-hard-0';

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
    <>
      <div className="nb-grid bg-nb-bg text-nb-ink min-h-screen flex flex-col">
        <DetailTopBar backHref="/" backLabel="HOME" />

        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="w-full max-w-[560px] flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center gap-5">
              <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">SYSTEM ERROR</span>
              <h1 className="font-pixel font-normal text-[clamp(32px,8vw,64px)] leading-[1.2] [text-shadow:5px_5px_0_#FF5C8A]">
                GAME
                <br />
                OVER
              </h1>
            </div>

            <div className="w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-8 text-left">
              <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3 flex-wrap">
                <span className="font-pixel text-[10px] text-nb-pink">SOMETHING BROKE</span>
                <span className="font-pixel text-[10px] text-nb-silver">{error.digest ? `#${error.digest}` : 'ERR 500'}</span>
              </div>
              <p className="p-[22px] text-base leading-[1.7] text-pretty">
                An unexpected error occurred while loading this page. It has been logged and I&apos;ll look into it.
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={reset}
                className={`flex-1 font-pixel text-xs bg-nb-blue text-white px-[22px] py-[18px] border-[3px] border-nb-ink shadow-hard-4 flex gap-3 items-center justify-center ${buttonMotion}`}
              >
                <span>▶</span>
                <span>CONTINUE?</span>
              </button>

              <Link
                href="/"
                className={`flex-1 font-pixel text-xs bg-nb-yellow text-nb-on px-[22px] py-[18px] border-[3px] border-nb-ink shadow-hard-4 flex items-center justify-center ${buttonMotion}`}
              >
                QUIT TO HOME
              </Link>
            </div>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="w-full text-left bg-nb-card border-[3px] border-nb-ink shadow-hard-4">
                <summary className="cursor-pointer font-pixel text-[10px] px-4 py-3 bg-nb-pink text-nb-on">
                  DEBUG LOG (DEV ONLY)
                </summary>
                <pre className="p-4 text-xs leading-normal whitespace-pre-wrap wrap-break-word border-t-[3px] border-nb-ink">
                  {error.message}
                  {error.stack && `\n\nStack:\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </main>
      </div>

      <Footer topHref="#top" />
    </>
  );
}
