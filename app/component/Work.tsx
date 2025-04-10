'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '../common/ThemeContext';

// Import images
import gsc1 from '../../public/assets/gsc1.webp';
import gsc2 from '../../public/assets/gsc2.webp';
import teenfix1 from '../../public/assets/teenfix1.webp';
import teenfix2 from '../../public/assets/teenfix2.webp';
import daboss1 from '../../public/assets/daboss1.webp';
import daboss2 from '../../public/assets/daboss2.webp';
import inari1 from '../../public/assets/inari1.webp';
import inari2 from '../../public/assets/inari2.webp';

const Work = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const { theme } = useTheme();

    const workExperience = [
        {
            role: "Software Engineer Intern",
            company: "Inari Technology",
            duration: "March 2025 - Present",
            description: [
                "Developed and maintained internal software for efficiency and accuracy.",
                "Fixed bugs and optimized performance with cross-functional teams.",
                "Conducted code reviews and testing for quality assurance.",
            ],
            images: [inari1, inari2]
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
            images: [daboss1, daboss2]
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
            images: [gsc1, gsc2]
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
            images: [teenfix1, teenfix2]
        },
    ];

    // Image preloading
    useEffect(() => {
        const loadImages = async () => {
            // Start loading all images immediately
            const allImagePromises = workExperience.flatMap((work, workIndex) => 
                work.images.map(imageSrc => {
                    return new Promise<void>((resolve) => {
                        if (typeof window !== 'undefined') {
                            const img = new window.Image();
                            img.onload = () => {
                                // Mark individual image as loaded
                                setImagesLoaded(prev => ({
                                    ...prev,
                                    [`${workIndex}-${imageSrc.src}`]: true
                                }));
                                resolve();
                            };
                            img.onerror = () => resolve(); // Still resolve even on error
                            img.src = imageSrc.src;
                        } else {
                            resolve();
                        }
                    });
                })
            );

            // Wait for all images to load
            await Promise.all(allImagePromises);
            setAllImagesLoaded(true);
        };

        loadImages();
    }, []);

    // Handle tab change
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        setDropdownOpen(false);
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
        <section id="work" className="min-h-[100dvh] flex flex-col items-center py-6 px-6 gap-8 md:py-16 md:px-16 md:gap-12">
            <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">WORK  EXPERIENCE</h1>

            <div className="flex flex-col w-full max-w-[1000px] gap-4 md:flex-row md:gap-12">
                {/* Mobile Dropdown */}
                <div className="relative md:hidden w-full" ref={dropdownRef}>
                    <div 
                        className="flex justify-between items-center p-4 rounded-lg border-100 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] bg-[var(--background-color)] cursor-pointer transition-all duration-400 hover:translate-y-0.5 hover:shadow-sm"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div>
                            <h3 className="text-lg font-medium">{workExperience[activeTab].role}</h3>
                            <p className="text-sm opacity-80">{workExperience[activeTab].company}</p>
                        </div>
                        <div className={`transition-transform duration-400 ${dropdownOpen ? 'rotate-180' : ''}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    
                    {dropdownOpen && (
                        <div className="absolute top-[calc(100%+5px)] left-0 w-full bg-[var(--background-color)] border-2 border-[var(--text-color)] rounded-lg shadow-[3px_3px_var(--box-shadow-color)] overflow-hidden z-10 animate-[dropdownFadeIn_0.4s_ease-out]">
                            {workExperience.map((work, index) => (
                                index !== activeTab && (
                                    <div
                                        key={index}
                                        className="p-3 cursor-pointer transition-colors duration-400 hover:bg-opacity-10 hover:bg-gray-500 border-b border-[var(--text-color)] last:border-b-0"
                                        onClick={() => handleTabChange(index)}
                                    >
                                        <h3 className="text-lg font-medium">{work.role}</h3>
                                        <p className="text-sm opacity-80">{work.company}</p>
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
                            <h3 className="text-lg font-medium">{work.role}</h3>
                            <p className="text-sm opacity-80">{work.company}</p>
                        </div>
                    ))}
                </div>

                <div className="border-2 border-[var(--text-color)] shadow-[5px_5px_var(--box-shadow-color)] p-5 md:p-8 rounded-lg bg-[var(--background-color)] w-full md:max-w-[calc(100%-350px)] animate-[fadeIn_0.4s_ease-out]">
                    <div className="mb-4 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-medium mb-1">{workExperience[activeTab].role}</h3>
                        <p className="text-base md:text-lg opacity-90 mb-1">{workExperience[activeTab].company}</p>
                        <p className="text-sm md:text-base opacity-70">{workExperience[activeTab].duration}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-2 md:mb-8">
                        {workExperience[activeTab].images.map((image, index) => (
                            <div key={index} className="aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden">
                                {!allImagesLoaded ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse">
                                        <p className="text-sm opacity-70">Loading...</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full">
                                        {workExperience.map((work, workIndex) => (
                                            <Image
                                                key={`${workIndex}-${index}`}
                                                src={work.images[index]}
                                                alt={`${work.role} ${index + 1}`}
                                                className={`object-cover transition-all duration-400 absolute inset-0 ${
                                                    activeTab === workIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                }`}
                                                fill
                                                sizes="(max-width: 800px) 45vw, 300px"
                                                priority={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
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
                </div>
            </div>
        </section>
    );
};

export default Work; 