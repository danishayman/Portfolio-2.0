'use client';

import { useTheme } from '../common/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Static file URLs for hero images and icons

const Hero: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isFlippable, setIsFlippable] = useState(true);


    // Determine which icons to use based on theme using static URLs
    const themeIcon = theme === 'light' ? '/hero/sun.svg' : '/hero/moon.svg';
    const githubIcon = theme === 'light' ? '/hero/github-light.svg' : '/hero/github-dark.svg';
    const linkedinIcon = theme === 'light' ? '/hero/linkedin-light.svg' : '/hero/linkedin-dark.svg';
    const emailIcon = theme === 'light' ? '/hero/email-light.svg' : '/hero/email-dark.svg';

    // Preload images
    useEffect(() => {
        // Only run client-side
        if (typeof window === 'undefined') return;

        // Preload images when the component mounts
        const imagesToPreload = [
            '/hero/lelouch.webp', '/hero/back.webp', '/hero/sun.svg', '/hero/moon.svg',
            '/hero/email-light.svg', '/hero/github-light.svg', '/hero/linkedin-light.svg',
            '/hero/email-dark.svg', '/hero/github-dark.svg', '/hero/linkedin-dark.svg'
        ];

        imagesToPreload.forEach((imgSrc) => {
            // Use the global window.Image constructor instead of Image
            const imgElement = new window.Image();
            imgElement.src = imgSrc;
        });
    }, []);

    const handleThemeToggle = (e: React.MouseEvent): void => {
        // Stop propagation to prevent parent hover events
        e.stopPropagation();
        toggleTheme();
    };

    // Mouse enter/leave handlers for theme icon
    const handleMouseEnter = () => {
        setIsFlippable(false);
    };

    const handleMouseLeave = () => {
        setIsFlippable(true);
    };

    return (
        <section id="hero" className="flex flex-col justify-center gap-5 text-center py-16 md:py-24 min-h-[550px] md:min-h-screen select-none md:flex-row-reverse md:items-center md:justify-evenly">
            <div className="relative">
                <div className={`relative inline-block perspective-1000 w-[200px] h-[200px] mx-auto md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px] ${isFlippable ? (theme === 'dark' ? 'flip-container-dark' : 'flip-container') : ''}`}>
                    <div className={`relative w-full h-full transform-style-preserve-3d rounded-full transition-transform duration-600 flip-img ${theme === 'dark' ? 'rotate-y-180' : ''}`}>
                        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden">
                            <Image
                                src="/hero/back.webp"
                                alt="Profile picture"
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 200px, (max-width: 1280px) 350px, 400px"
                                className="w-full h-full object-cover pointer-events-none"
                                priority
                                fetchPriority="high"
                            />
                        </div>
                        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden rotate-y-180">
                            <Image
                                src="/hero/lelouch.webp"
                                alt="Alternative profile picture"
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 200px, (max-width: 1280px) 350px, 400px"
                                className="w-full h-full object-cover pointer-events-none"
                                priority
                                fetchPriority="high"
                            />
                        </div>
                    </div>

                    <div
                        className="z-10 absolute top-0 right-0 translate-x-[190%] -translate-y-[10%]"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image
                            className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_5px_var(--bt-color)] transition-all duration-400"
                            src={themeIcon}
                            alt="Colour mode icon"
                            width={32}
                            height={32}
                            sizes="32px"
                            onClick={handleThemeToggle}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-[2rem] md:text-[3rem] font-rubik font-black tracking-wider leading-[1.1]">
                    DANISH
                    <br />
                    AIMAN
                </h1>

                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase font-normal">Computer Science Student</h2>

                <span className="flex gap-6 justify-center">
                    <Link href="mailto:danishaiman3b@gmail.com" className="-webkit-tap-highlight-color-transparent">
                        <Image src={emailIcon} alt="Email icon" width={35} height={35} sizes="(max-width: 768px) 30px, 35px" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] transition-transform duration-300 hover:scale-105" />
                    </Link>
                    <Link href="https://github.com/danishayman/" target="_blank" rel="noopener noreferrer" className="-webkit-tap-highlight-color-transparent">
                        <Image src={githubIcon} alt="Github icon" width={35} height={35} sizes="(max-width: 768px) 30px, 35px" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] transition-transform duration-300 hover:scale-105" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/danishayman/" target="_blank" rel="noopener noreferrer" className="-webkit-tap-highlight-color-transparent">
                        <Image src={linkedinIcon} alt="LinkedIn icon" width={35} height={35} sizes="(max-width: 768px) 30px, 35px" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] transition-transform duration-300 hover:scale-105" />
                    </Link>
                </span>

                <p className="max-w-[30ch] text-center font-mono text-lg md:text-xl">
                    A developer majoring in Intelligent Computing. SUPER into Machine Learning & Artificial Intelligence.
                </p>

                <Link
                    href="https://drive.google.com/file/d/1Uz1dJESduMjoMbH7kDpx8a4J5JpCZflt/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-webkit-tap-highlight-color-transparent w-fit self-center"
                >
                    <button className="bg-[var(--bt-color)] text-[var(--btn-text-color)] rounded-[20px] w-[126px] h-[50px] text-base md:text-lg font-bold font-rubik shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-105 active:translate-y-0.5 active:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                        Résumé
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;