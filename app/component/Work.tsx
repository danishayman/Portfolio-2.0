'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


import { useRouter } from 'next/navigation';

// Import images
import gsc1 from '../../public/gsc/gsc1.webp';
import gsc2 from '../../public/gsc/gsc2.webp';
import teenfix1 from '../../public/teenfix/teenfix1.webp';
import teenfix2 from '../../public/teenfix/teenfix2.webp';
import daboss1 from '../../public/daboss/daboss1.webp';
import daboss2 from '../../public/daboss/daboss2.webp';
import inari1 from '../../public/inari/inari1.webp';
import inari2 from '../../public/inari/inari2.webp';

const Work = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();



    const workExperience = [
        {
            role: "Software Engineer Intern",
            company: "Inari Amertron Berhad",
            duration: "March 2025 - August 2025",
            description: [
                "Developed and maintained internal software for efficiency and accuracy.",
                "Fixed bugs and optimized performance with cross-functional teams.",
                "Conducted code reviews and testing for quality assurance.",
            ],
            images: [inari1, inari2],
            slug: "inari-amertron-berhad"
        },
        {
            role: "Computer Technician",
            company: "PC DaBoss Technology",
            duration: "January 2025 - March 2025",
            description: [
                "Assisted in diagnosing and repairing computer hardware and software issues.",
                "Provided technical support to customers and staff.",
                "Maintained inventory of computer parts and accessories.",
            ],
            images: [daboss1, daboss2],
            slug: "pc-daboss"
        },
        {
            role: "Part-Time Crew: Steward",
            company: "Golden Screen Cinemas",
            duration: "August 2024 - December 2024",
            description: [
                "Delivered excellent customer service for a smooth movie-going experience.",
                "Assisted with crowd control, seating, and safety compliance.",
                "Operated servers and projectors for seamless screenings."
            ],
            images: [gsc1, gsc2],
            slug: "gsc"
        },
        {
            role: "Phone Technician",
            company: "Teenfix Studio",
            duration: "August 2023 - November 2023",
            description: [
                "Repaired smartphones and tablets with quick, high-quality service.",
                "Managed inventory for efficient repairs.",
                "Provided technical support and device maintenance guidance."
            ],
            images: [teenfix1, teenfix2],
            slug: "teenfix-studio"
        },
    ];

    // Handle tab change
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        setDropdownOpen(false);
    };

    const handleYappingClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        setIsNavigating(true);
        router.push(`/work/${slug}`);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section id="work" className="min-h-[650px] md:min-h-[750px] flex flex-col items-center py-16 px-6 gap-8 md:py-24 md:px-16 md:gap-12">
            <div className="section-header">
                <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">WORK  EXPERIENCE</h2>
            </div>

            <div className="flex flex-col w-full max-w-[1000px] gap-4 md:flex-row md:gap-12">
                {/* Mobile Dropdown */}
                <div className="relative md:hidden w-full" ref={dropdownRef}>
                    <div
                        className="flex justify-between items-center px-5 py-3 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] bg-[var(--background-color)] cursor-pointer transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div>
                            <h3 className="text-base md:text-lg font-medium">
                                {workExperience[activeTab].role}
                            </h3>
                            <p className="text-xs md:text-sm text-[var(--text-color)] opacity-70">{workExperience[activeTab].company}</p>
                        </div>
                        <div className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute top-[calc(100%+5px)] left-0 w-full bg-[var(--background-color)] border-2 border-[var(--text-color)] rounded-lg shadow-md overflow-hidden z-10 animate-[dropdownFadeIn_0.3s_ease-out]">
                            {workExperience.map((work, index) => (
                                index !== activeTab && (
                                    <div
                                        key={index}
                                        className="px-5 py-3 cursor-pointer transition-colors duration-300 hover:bg-[var(--background-color)] hover:opacity-80 border-b border-[var(--border-color)] last:border-b-0"
                                        onClick={() => handleTabChange(index)}
                                    >
                                        <h3 className="text-base md:text-lg font-medium">
                                            {work.role}
                                        </h3>
                                        <p className="text-xs md:text-sm text-[var(--text-color)] opacity-70">{work.company}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Tabs */}
                <div className="hidden md:flex md:flex-col md:min-w-[300px] md:max-w-[300px] gap-2">
                    {workExperience.map((work, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-400 text-left border-2 
                                ${activeTab === index
                                    ? 'border-[var(--text-color)] bg-[var(--background-color)] shadow-[5px_5px_var(--box-shadow-color)] translate-x-2.5'
                                    : 'border-transparent hover:border-[var(--border-color)] hover:bg-[var(--background-color)] hover:translate-x-2.5'}`}
                            onClick={() => handleTabChange(index)}
                        >
                            <h3 className="text-xl md:text-lg font-semibold">{work.role}</h3>
                            <p className="text-xs md:text-sm opacity-80">{work.company}</p>
                        </div>
                    ))}
                </div>

                <div className="border-2 border-[var(--text-color)] shadow-[5px_5px_var(--box-shadow-color)] p-5 md:p-8 rounded-lg bg-[var(--background-color)] w-full md:max-w-[calc(100%-350px)] animate-[fadeIn_0.4s_ease-out]">
                    <div className="mb-4 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-medium mb-1">{workExperience[activeTab].role}</h3>
                        <p className="text-sm md:text-base opacity-90 mb-1">{workExperience[activeTab].company}</p>
                        <p className="text-xs md:text-sm opacity-70">{workExperience[activeTab].duration}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-2 md:mb-8">
                        {/* We render ALL images but only display the active ones */}
                        {workExperience.map((work, workIndex) => (
                            work.images.map((image, imgIndex) => (
                                <div
                                    key={`${workIndex}-${imgIndex}`}
                                    className={`aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden transition-opacity duration-300 ${workIndex === activeTab ? 'block' : 'hidden'}`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${work.role} ${imgIndex + 1}`}
                                        className="object-cover"
                                        fill
                                        sizes="(max-width: 800px) 45vw, 300px"
                                        priority={true}
                                        loading="eager"
                                    />
                                </div>
                            ))
                        ))}
                    </div>

                    <ul className="font-mono text-sm md:text-base flex flex-col gap-4 mt-4">
                        {workExperience[activeTab].description.map((item, index) => (
                            <li key={index} className="relative pl-6 leading-tight">
                                <span className="absolute left-2 top-0 opacity-80">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-center">
                        <button
                            onClick={(e) => handleYappingClick(e, workExperience[activeTab].slug)}
                            className="px-4 py-2 bg-[var(--background-color)] border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] rounded-lg font-medium transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm relative"
                            disabled={isNavigating}
                        >
                            {isNavigating ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-[var(--text-color)] border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : "Yapping"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Hidden preload section to ensure all images are loaded on initial render */}
            <div className="hidden">
                {workExperience.map((work, workIndex) => (
                    work.images.map((image, imgIndex) => (
                        <Image
                            key={`preload-${workIndex}-${imgIndex}`}
                            src={image}
                            alt="Preload"
                            width={1}
                            height={1}
                            priority={true}
                        />
                    ))
                ))}
            </div>
        </section>
    );
};

export default Work; 