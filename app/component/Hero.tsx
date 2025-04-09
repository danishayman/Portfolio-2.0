'use client';

import { useTheme } from '../common/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import heroImg from '../../public/assets/hero.webp';
import lelouchImg from '../../public/assets/lelouch.webp';
import sun from '../../public/assets/sun.svg';
import moon from '../../public/assets/moon.svg';
import emailLight from '../../public/assets/email-light.svg';
import githubLight from '../../public/assets/github-light.svg';
import linkedinLight from '../../public/assets/linkedin-light.svg';
import emailDark from '../../public/assets/email-dark.svg';
import githubDark from '../../public/assets/github-dark.svg';
import linkedinDark from '../../public/assets/linkedin-dark.svg';

const Hero: React.FC = () => {
    const { theme, toggleTheme, isTransitioning } = useTheme();

    // Determine which icons to use based on theme
    const themeIcon = theme === 'light' ? sun : moon;
    const githubIcon = theme === 'light' ? githubLight : githubDark;
    const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;
    const emailIcon = theme === 'light' ? emailLight : emailDark;

    // Preload images
    useEffect(() => {
        // Preload images when the component mounts
        const imagesToPreload = [
            heroImg.src, lelouchImg.src, sun.src, moon.src, 
            emailLight.src, githubLight.src, linkedinLight.src,
            emailDark.src, githubDark.src, linkedinDark.src
        ];
        
        imagesToPreload.forEach((imgSrc) => {
            const image = new window.Image();
            image.src = imgSrc;
        });
    }, []);

    const handleThemeToggle = (): void => {
        toggleTheme();
    };

    return (
        <section id="hero" className="flex flex-col justify-center gap-5 text-center h-[100dvh] min-h-[500px] select-none md:flex-row-reverse md:items-center md:justify-evenly">
            <div className="relative">
                <div className="relative inline-block perspective-1000 w-[200px] h-[200px] mx-auto md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px] flip-container">
                    <div className="relative w-full h-full transform-style-preserve-3d rounded-full transition-transform duration-600 flip-img">
                        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden">
                            <Image
                                src={heroImg}
                                alt="Profile picture"
                                className="w-full h-full object-cover pointer-events-none"
                                priority
                            />
                        </div>
                        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden rotate-y-180">
                            <Image
                                src={lelouchImg}
                                alt="Alternative profile picture"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                        </div>
                    </div>
                    
                    <Image
                        className={`absolute top-0 right-0 translate-x-[190%] -translate-y-[10%] w-7 h-7 rounded-full cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_5px_var(--bt-color)] transition-all duration-400 ${isTransitioning ? 'animate-fadeInOut' : ''}`}
                        src={themeIcon}
                        alt="Colour mode icon"
                        onClick={handleThemeToggle}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-[2rem] md:text-[3rem] font-rubik font-black tracking-wider leading-[1.1]">
                    DANISH
                    <br />
                    AIMAN
                </h1>

                <h2 className="text-base md:text-xl font-mono tracking-wider uppercase font-normal">Computer Science Student</h2>

                <span className="flex gap-6 justify-center">
                    <a href="mailto:danishaiman3b@gmail.com" className="-webkit-tap-highlight-color-transparent">
                        <Image src={emailIcon} alt="Email icon" width={30} height={30} className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                    </a>
                    <Link href="https://github.com/danishayman/" target="_blank" rel="noopener noreferrer" className="-webkit-tap-highlight-color-transparent">
                        <Image src={githubIcon} alt="Github icon" width={30} height={30} className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/danishayman/" target="_blank" rel="noopener noreferrer" className="-webkit-tap-highlight-color-transparent">
                        <Image src={linkedinIcon} alt="LinkedIn icon" width={30} height={30} className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                    </Link>
                </span>

                <p className="max-w-[26ch] text-center font-mono text-base md:text-xl">
                    A developer majoring in Intelligent Computing. SUPER into Machine
                    Learning and Artificial Intelligence.
                </p>

                <Link
                    href="https://drive.google.com/file/d/1fYD_o_qPofZylzwzJGxuFIu8R8_ExIQx/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-webkit-tap-highlight-color-transparent w-fit self-center"
                >
                    <button className="bg-[var(--bt-color)] text-[var(--btn-text-color)] rounded-[20px] w-[126px] h-[50px] text-lg md:text-xl font-bold font-rubik shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-105 active:translate-y-0.5 active:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                        Résumé
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;