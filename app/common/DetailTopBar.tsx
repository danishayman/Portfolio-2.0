import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface DetailTopBarProps {
    // Where the back button returns to, e.g. '/#work'
    backHref: string;
    backLabel: string;
}

// Sticky top bar for the /work and /yapping detail pages, matching the home nav
export default function DetailTopBar({ backHref, backLabel }: DetailTopBarProps) {
    return (
        <nav className="sticky top-0 z-1000 bg-nb-bg border-b-[3px] border-nb-ink select-none">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex items-center gap-4 justify-between">
                <Link
                    href={backHref}
                    className="font-pixel text-[10px] bg-nb-card text-nb-ink px-3 py-2.5 border-[3px] border-nb-ink shadow-hard-3 whitespace-nowrap transition-[translate,rotate,scale,box-shadow] duration-100 hover:bg-nb-yellow hover:text-nb-on hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-4 active:translate-x-[3px] active:translate-y-[3px] active:shadow-hard-0"
                >
                    ◀ {backLabel}
                </Link>

                <Link href="/" className="hidden sm:flex items-center gap-2.5 shrink-0">
                    <span className="w-8 h-8 bg-nb-blue text-white border-[3px] border-nb-ink grid place-items-center font-pixel text-xs shadow-hard-3">
                        D
                    </span>
                    <span className="font-pixel text-xs text-nb-ink">danishayman.exe</span>
                </Link>

                <ThemeToggle />
            </div>
        </nav>
    );
}
