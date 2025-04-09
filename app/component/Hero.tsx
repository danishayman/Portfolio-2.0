'use client';

import { useTheme } from '../common/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';

// Import images - update paths to match your structure
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

    const handleThemeToggle = (): void => {
        toggleTheme();
    };

    return (
        <section id="hero" className="flex flex-col justify-center gap-5 text-center h-screen min-h-[500px] select-none">
            <div className="relative">
                <div className="inline-block perspective-1000 w-[200px] h-[200px] mx-auto md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
                    <div className="relative w-full h-full transform-style-preserve-3d rounded-full transition-transform duration-600 group-hover:rotate-y-180 hover:shadow-[0_0_15px_5px_var(--bt-color)]">
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
                </div>

                <Image
                    className={`absolute w-6 h-6 rounded-full transition-all duration-400 cursor-pointer hover:scale-110 ${isTransitioning ? 'animate-fadeInOut' : ''}`}
                    src={themeIcon}
                    alt="Colour mode icon"
                    onClick={handleThemeToggle}
                />
            </div>

            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-4xl font-bold">
                    Danish
                    <br />
                    Aiman
                </h1>

                <h2 className="text-xl">Computer Science Student</h2>

                <span className="flex gap-6 justify-center">
                    <a href="mailto:danishaiman3b@gmail.com">
                        <Image src={emailIcon} alt="Email icon" width={30} height={30} />
                    </a>
                    <Link href="https://github.com/danishayman/" target="_blank" rel="noopener noreferrer">
                        <Image src={githubIcon} alt="Github icon" width={30} height={30} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/danishayman/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedinIcon} alt="LinkedIn icon" width={30} height={30} />
                    </Link>
                </span>

                <p className="max-w-[26ch] text-center">
                    A developer majoring in Intelligent Computing. SUPER into Machine
                    Learning and Artificial Intelligence.
                </p>

                <Link
                    href="https://drive.google.com/file/d/1fYD_o_qPofZylzwzJGxuFIu8R8_ExIQx/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-[var(--bt-color)] text-[var(--btn-text-color)] rounded-[20px] w-[126px] h-[50px] text-xl font-bold shadow-md transition-all duration-200 hover:scale-105 active:translate-y-0.5 active:shadow-sm">
                        Résumé
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;