import Image from 'next/image';
import { PixelHeart } from '../common/PixelIcons';
import { PlayerExp, PlayerLevel } from '../common/PlayerStats';
import ThemeToggle from '../common/ThemeToggle';

const socials = [
    { href: 'mailto:danishaiman3b@gmail.com', label: 'Email', icon: '/hero/email-light.svg', external: false },
    { href: 'https://github.com/danishayman/', label: 'GitHub', icon: '/hero/github-light.svg', external: true },
    { href: 'https://www.linkedin.com/in/danishayman/', label: 'LinkedIn', icon: '/hero/linkedin-light.svg', external: true },
];

const Hero: React.FC = () => {
    const serverNow = Date.now();

    return (
        <section
            id="hero"
            className="relative max-w-[1200px] mx-auto px-6 pt-4 pb-24 md:pt-[72px] md:pb-24 flex flex-col justify-center gap-[clamp(12px,2.2svh,24px)] md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] md:gap-14 items-center min-h-svh md:min-h-[calc(100vh-62px)]"
        >
            {/* Mobile has no top bar, so the theme toggle sits in the hero corner */}
            <ThemeToggle className="md:hidden absolute top-4 right-6 z-10" />

            {/* On phones everything from the photo down to the résumé fits one screen above the bottom nav */}
            <div className="flex flex-col gap-[clamp(12px,2.2svh,24px)] md:gap-7 items-center text-center md:items-start md:text-left">
                {/* Dropped on short phones (e.g. iPhone SE); the card header already says PLAYER 0 */}
                <div className="flex gap-2.5 flex-wrap justify-center max-md:[@media(max-height:720px)]:hidden">
                    <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">PLAYER 0</span>
                    <span className="font-pixel text-[10px] bg-nb-card border-2 border-nb-ink px-2.5 py-1.5">CS STUDENT · USM</span>
                </div>

                <h1 className="font-pixel font-normal text-[34px] md:text-[clamp(40px,6.4vw,80px)] leading-[1.2] tracking-[-0.02em] [text-shadow:4px_4px_0_#FFD23F] md:[text-shadow:6px_6px_0_#FFD23F]">
                    DANISH
                    <br />
                    AIMAN
                </h1>

                <div className="bg-nb-card px-4 py-3 md:px-[22px] md:py-5 max-w-[520px] mx-1 md:mt-1 md:mb-2.5 shadow-[0_-4px_0_var(--nb-ink),0_4px_0_var(--nb-ink),-4px_0_0_var(--nb-ink),4px_0_0_var(--nb-ink),10px_10px_0_var(--nb-ink)]">
                    <p className="hidden md:block font-pixel text-[10px] text-nb-blue mb-3">COMPUTER SCIENCE STUDENT</p>
                    <p className="text-sm md:text-[17px] leading-normal md:leading-[1.6] text-pretty">
                        A developer majoring in Intelligent Computing. SUPER into Machine Learning &amp; Artificial Intelligence.
                    </p>
                </div>

                <div className="flex gap-2.5 md:gap-4 md:flex-wrap items-center">
                    <a
                        href="/RESUME_DANISH_AIMAN_AI_ML.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[10px] md:text-xs bg-nb-blue text-white h-11 md:h-auto px-3.5 md:px-[22px] md:py-[18px] border-[3px] border-nb-ink shadow-hard-4 md:shadow-hard-6 flex gap-2 md:gap-3 items-center transition-[translate,rotate,scale,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-8 active:translate-x-1.5 active:translate-y-1.5 active:shadow-hard-0"
                    >
                        <span>▶</span>
                        <span>RÉSUMÉ</span>
                    </a>

                    <div className="flex gap-2.5 md:gap-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="w-11 h-11 md:w-14 md:h-14 bg-white border-[3px] border-nb-ink shadow-hard-4 grid place-items-center transition-[translate,rotate,scale,box-shadow] duration-100 hover:bg-nb-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6 active:translate-x-1 active:translate-y-1 active:shadow-hard-0"
                            >
                                <Image src={s.icon} alt={s.label} width={26} height={26} className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* On phones the card shrinks with screen height so the résumé button stays above the fold */}
            <div className="order-first md:order-0 justify-self-center w-[clamp(150px,calc(100svh_-_540px),min(260px,calc(100vw_-_140px)))] md:w-full md:max-w-[440px] bg-nb-card border-[3px] border-nb-ink shadow-hard-6 md:shadow-hard-12">
                <div className="bg-nb-panel text-white px-3 py-2 md:px-3.5 md:py-3 flex justify-between items-center">
                    <span className="font-pixel text-[10px] whitespace-nowrap">PLAYER 0</span>
                    <span className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 bg-nb-pink" />
                        <span className="w-2.5 h-2.5 bg-nb-yellow" />
                        <span className="w-2.5 h-2.5 bg-nb-green" />
                    </span>
                </div>

                <div className="p-2.5 md:p-[18px] bg-nb-pink border-b-[3px] border-nb-ink">
                    {/* Focusable so a tap swaps to HD on touch screens, where hover never fires */}
                    <div
                        tabIndex={0}
                        aria-label="Portrait, tap or hover for the HD photo"
                        className="group relative aspect-square border-[3px] border-nb-on bg-white nb-grid-sm overflow-hidden outline-none [-webkit-tap-highlight-color:transparent]"
                    >
                        <Image
                            src="/hero/pixel-me.png"
                            alt="Danish Aiman, pixel art"
                            fill
                            unoptimized
                            priority
                            className="object-cover block [image-rendering:pixelated]"
                        />
                        <Image
                            src="/hero/hd-me.png"
                            alt="Danish Aiman"
                            fill
                            priority
                            sizes="(max-width: 480px) 90vw, 400px"
                            className="object-cover block opacity-0 transition-opacity duration-[400ms] ease-[steps(8)] group-hover:opacity-100 group-focus:opacity-100"
                        />
                        <span className="absolute left-2.5 top-2.5 font-pixel text-[8px] bg-nb-yellow text-nb-on border-2 border-nb-on px-[7px] py-[5px] pointer-events-none whitespace-nowrap">
                            LV.<PlayerLevel serverNow={serverNow} /> DANISH
                        </span>
                        <span className="absolute left-2.5 bottom-2.5 font-pixel text-[8px] bg-nb-on text-white px-2 py-1.5 pointer-events-none whitespace-nowrap">
                            <span className="pointer-coarse:hidden">HOVER</span>
                            <span className="hidden pointer-coarse:inline">TAP</span> → HD
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    <div className="px-2 py-2 md:px-3 md:py-3.5 border-r-[3px] border-nb-ink flex flex-col gap-1.5 md:gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">LIVES</span>
                        <span className="flex gap-1 items-center">
                            <PixelHeart full />
                            <PixelHeart full={false} />
                            <PixelHeart full={false} />
                            <span className="font-pixel text-[10px] ml-1">x1</span>
                        </span>
                    </div>
                    <div className="px-2 py-2 md:px-3 md:py-3.5 border-r-[3px] border-nb-ink flex flex-col gap-1.5 md:gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">LEVEL</span>
                        <span className="font-pixel text-base text-nb-blue">
                            <PlayerLevel serverNow={serverNow} />
                        </span>
                    </div>
                    <div className="px-2 py-2 md:px-3 md:py-3.5 flex flex-col gap-1.5 md:gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">EXP</span>
                        <PlayerExp serverNow={serverNow} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
