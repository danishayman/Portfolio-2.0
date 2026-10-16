// topHref: where CONTINUE? jumps; detail pages have no #hero, so they pass '#top'
export default function Footer({ topHref = '#hero' }: { topHref?: string }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-nb-panel text-white border-t-[3px] border-nb-ink">
            {/* Extra bottom padding on mobile clears the floating nav bar */}
            <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-28 md:pb-14 flex flex-col md:flex-row flex-wrap gap-6 justify-between items-center text-center md:text-left">
                <div className="flex flex-col gap-3.5">
                    <span className="font-pixel text-[clamp(16px,2.6vw,24px)] text-nb-yellow leading-[1.4]">THANKS FOR PLAYING</span>
                    <span className="text-[13px] text-nb-silver">&copy; {currentYear} danishayman. All rights reserved.</span>
                </div>
                <a
                    href={topHref}
                    className="font-pixel text-[10px] bg-white text-nb-on px-4 py-3.5 border-[3px] border-white shadow-[4px_4px_0_#007bff] hover:bg-nb-yellow"
                >
                    CONTINUE? ▲
                </a>
            </div>
        </footer>
    );
}
