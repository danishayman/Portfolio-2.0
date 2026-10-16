import type { Metadata } from 'next';
import Link from 'next/link';
import DetailTopBar from './common/DetailTopBar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  // The root layout's title template appends "| Danish Aiman"
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Return to the homepage to explore my portfolio, work experience, and blog posts.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Page Not Found | Danish Aiman',
    description: 'The page you are looking for could not be found.',
    type: 'website',
  },
};

const warps = [
  { href: '/#work', label: 'EXPERIENCE', accent: 'bg-nb-sky' },
  { href: '/#yapping', label: 'YAPPING', accent: 'bg-nb-pink' },
];

const buttonMotion =
  'transition-[translate,rotate,scale,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6 active:translate-x-1 active:translate-y-1 active:shadow-hard-0';

export default function NotFound() {
  return (
    <>
      <div className="nb-grid bg-nb-bg text-nb-ink min-h-screen flex flex-col">
        <DetailTopBar backHref="/" backLabel="HOME" />

        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="w-full max-w-[560px] flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center gap-5">
              <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">STAGE ??-??</span>
              <h1 className="font-pixel font-normal text-[clamp(64px,16vw,120px)] leading-none [text-shadow:6px_6px_0_#FFD23F] dark:[text-shadow:6px_6px_0_#007bff]">
                404
              </h1>
            </div>

            <div className="w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-8 text-left">
              <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3 flex-wrap">
                <span className="font-pixel text-[10px] text-nb-yellow">LEVEL NOT FOUND</span>
                <span className="font-pixel text-[10px] text-nb-silver">ERR 404</span>
              </div>
              <p className="p-[22px] text-base leading-[1.7] text-pretty">
                This level doesn&apos;t exist. It might have been moved, deleted, or the URL has a typo.
              </p>
            </div>

            <div className="w-full flex flex-col gap-4">
              <Link
                href="/"
                className={`font-pixel text-xs bg-nb-blue text-white px-[22px] py-[18px] border-[3px] border-nb-ink shadow-hard-4 flex gap-3 items-center justify-center ${buttonMotion}`}
              >
                <span>▶</span>
                <span>RETURN HOME</span>
              </Link>

              <div className="flex flex-col sm:flex-row gap-4">
                {warps.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    className={`flex-1 font-pixel text-[10px] ${w.accent} text-nb-on px-4 py-3.5 border-[3px] border-nb-ink shadow-hard-4 text-center ${buttonMotion}`}
                  >
                    WARP TO {w.label}
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-sm text-nb-muted">
              Think this is a bug?{' '}
              <a href="mailto:danishaiman3b@gmail.com" className="font-bold text-nb-ink underline underline-offset-4 decoration-2 hover:text-nb-blue-ink">
                Send a report
              </a>
            </p>
          </div>
        </main>
      </div>

      <Footer topHref="#top" />
    </>
  );
}
