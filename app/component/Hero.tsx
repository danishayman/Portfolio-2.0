import Image from 'next/image';
import { PixelHeart } from '../common/PixelIcons';
import ThemeToggle from '../common/ThemeToggle';

const socials = [
    { href: 'mailto:danishaiman3b@gmail.com', label: 'Email', icon: '/hero/email-light.svg', external: false },
    { href: 'https://github.com/danishayman/', label: 'GitHub', icon: '/hero/github-light.svg', external: true },
    { href: 'https://www.linkedin.com/in/danishayman/', label: 'LinkedIn', icon: '/hero/linkedin-light.svg', external: true },
];

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="max-w-[1200px] mx-auto px-6 py-16 md:pt-[72px] md:pb-24 flex flex-col gap-10 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] md:gap-14 items-center min-h-[550px] md:min-h-[calc(100vh-62px)]"
        >
            {/* Mobile has no top bar, so the theme toggle sits in the hero corner */}
            <ThemeToggle className="md:hidden absolute top-4 right-6 z-10" />

            {/* Mobile keeps the previous order: photo, name, socials, bio, résumé */}
            <div className="flex flex-col gap-7 items-center text-center md:items-start md:text-left">
                <div className="flex gap-2.5 flex-wrap justify-center">
                    <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">PLAYER 1</span>
                    <span className="font-pixel text-[10px] bg-nb-card border-2 border-nb-ink px-2.5 py-1.5">CS STUDENT · USM</span>
                </div>

                <h1 className="order-1 md:order-none font-pixel font-normal text-[clamp(40px,6.4vw,80px)] leading-[1.2] tracking-[-0.02em] [text-shadow:6px_6px_0_#FFD23F]">
                    DANISH
                    <br />
                    AIMAN
                </h1>

                <div className="order-3 md:order-none bg-nb-card px-[22px] py-5 max-w-[520px] mx-1 mt-1 mb-2.5 shadow-[0_-4px_0_var(--nb-ink),0_4px_0_var(--nb-ink),-4px_0_0_var(--nb-ink),4px_0_0_var(--nb-ink),10px_10px_0_var(--nb-ink)]">
                    <p className="font-pixel text-[10px] text-nb-blue mb-3">COMPUTER SCIENCE STUDENT</p>
                    <p className="text-[17px] leading-[1.6] text-pretty">
                        A developer majoring in Intelligent Computing. SUPER into Machine Learning &amp; Artificial Intelligence.
                        <span className="inline-block w-2.5 h-[18px] bg-nb-blue ml-1.5 align-[-3px] animate-blink" aria-hidden="true" />
                    </p>
                </div>

                <div className="contents md:flex md:gap-4 md:flex-wrap md:items-center">
                    <a
                        href="/RESUME_DANISH_AIMAN_AI_ML.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-4 md:order-none font-pixel text-xs bg-nb-blue text-white px-[22px] py-[18px] border-[3px] border-nb-ink shadow-hard-6 flex gap-3 items-center transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-8 active:translate-x-1.5 active:translate-y-1.5 active:shadow-hard-0"
                    >
                        <span>▶</span>
                        <span>RÉSUMÉ</span>
                    </a>

                    <div className="order-2 md:order-none flex gap-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="w-14 h-14 bg-white border-[3px] border-nb-ink shadow-hard-4 grid place-items-center transition-[transform,box-shadow] duration-100 hover:bg-nb-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6 active:translate-x-1 active:translate-y-1 active:shadow-hard-0"
                            >
                                <Image src={s.icon} alt={s.label} width={26} height={26} className="w-[26px] h-[26px]" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="order-first md:order-none justify-self-center w-full max-w-[320px] md:max-w-[440px] bg-nb-card border-[3px] border-nb-ink shadow-hard-12">
                <div className="bg-nb-panel text-white px-3.5 py-3 flex justify-between items-center">
                    <span className="font-pixel text-[10px]">PLAYER 1</span>
                    <span className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 bg-nb-pink" />
                        <span className="w-2.5 h-2.5 bg-nb-yellow" />
                        <span className="w-2.5 h-2.5 bg-nb-green" />
                    </span>
                </div>

                <div className="p-[18px] bg-nb-pink border-b-[3px] border-nb-ink">
                    <div className="group relative aspect-square border-[3px] border-nb-on bg-white nb-grid-sm overflow-hidden">
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
                            className="object-cover block opacity-0 transition-opacity duration-[400ms] ease-[steps(8)] group-hover:opacity-100"
                        />
                        <span className="absolute left-2.5 top-2.5 font-pixel text-[8px] bg-nb-yellow text-nb-on border-2 border-nb-on px-[7px] py-[5px] pointer-events-none whitespace-nowrap">
                            LV.23 DANISH
                        </span>
                        <span className="absolute left-2.5 bottom-2.5 font-pixel text-[8px] bg-nb-on text-white px-2 py-1.5 pointer-events-none whitespace-nowrap">
                            HOVER → HD
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    <div className="px-3 py-3.5 border-r-[3px] border-nb-ink flex flex-col gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">LIVES</span>
                        <span className="flex gap-1 items-center">
                            <PixelHeart full />
                            <PixelHeart full={false} />
                            <PixelHeart full={false} />
                            <span className="font-pixel text-[10px] ml-1">x1</span>
                        </span>
                    </div>
                    <div className="px-3 py-3.5 border-r-[3px] border-nb-ink flex flex-col gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">LEVEL</span>
                        <span className="font-pixel text-base text-nb-blue">23</span>
                    </div>
                    <div className="px-3 py-3.5 flex flex-col gap-2.5">
                        <span className="font-pixel text-[8px] text-nb-muted">EXP</span>
                        <span className="flex h-3.5 border-2 border-nb-ink bg-white">
                            <span className="w-[68%] bg-nb-green border-r-2 border-nb-ink" />
                        </span>
                        <span className="font-pixel text-[7px] text-nb-muted">680/1000</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
