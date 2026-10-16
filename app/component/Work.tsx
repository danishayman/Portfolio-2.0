'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '../common/SectionHeader';
import { pad2 } from '../common/palette';

// Import images
import gsc1 from '../../public/gsc/gsc1.webp';
import gsc2 from '../../public/gsc/gsc2.webp';
import teenfix1 from '../../public/teenfix/teenfix1.webp';
import teenfix2 from '../../public/teenfix/teenfix2.webp';
import daboss1 from '../../public/daboss/daboss1.webp';
import daboss2 from '../../public/daboss/daboss2.webp';
import inari7 from '../../public/inari/inari7.jpg';
import inari3 from '../../public/inari/inari3.jpg';

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
        images: [inari3, inari7],
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

const Work = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const job = workExperience[activeTab];
    const level = (i: number) => pad2(workExperience.length - i);

    const selectJob = (index: number) => {
        setActiveTab(index);
        setDropdownOpen(false);
    };

    // Close the mobile dropdown when clicking outside it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section id="work" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader stage="STAGE 1-4" title="EXPERIENCE" meta={`${workExperience.length} QUESTS CLEARED`} />

            <div className="flex flex-wrap gap-6 md:gap-8 items-start">
                {/* Mobile: dropdown picker, as in the previous layout */}
                <div className="relative md:hidden w-full" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setDropdownOpen((open) => !open)}
                        aria-expanded={dropdownOpen}
                        className="w-full text-left flex gap-3.5 items-center p-3.5 bg-nb-blue text-white border-[3px] border-nb-ink shadow-hard-6 font-mono"
                    >
                        <span className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-1.5 py-[7px] shrink-0">LV.{level(activeTab)}</span>
                        <span className="flex flex-col gap-1 min-w-0 flex-1">
                            <span className="font-rubik font-bold text-base">{job.role}</span>
                            <span className="text-xs">{job.company}</span>
                        </span>
                        <span className={`font-pixel text-[10px] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true">▼</span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-[calc(100%+10px)] left-0 w-full z-10 bg-nb-card border-[3px] border-nb-ink shadow-hard-6 animate-dropdownFadeIn">
                            {workExperience.map((work, i) =>
                                i === activeTab ? null : (
                                    <button
                                        key={work.slug}
                                        type="button"
                                        onClick={() => selectJob(i)}
                                        className="w-full text-left flex gap-3.5 items-center p-3.5 font-mono text-nb-ink border-b-[3px] border-nb-ink last:border-b-0 hover:bg-nb-yellow hover:text-nb-on"
                                    >
                                        <span className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-1.5 py-[7px] shrink-0">LV.{level(i)}</span>
                                        <span className="flex flex-col gap-1 min-w-0">
                                            <span className="font-rubik font-bold text-base">{work.role}</span>
                                            <span className="text-xs">{work.company}</span>
                                        </span>
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className="hidden md:flex flex-[1_1_280px] max-w-full flex-col gap-3.5">
                    {workExperience.map((work, i) => {
                        const active = i === activeTab;
                        return (
                            <button
                                key={work.slug}
                                type="button"
                                onClick={() => selectJob(i)}
                                aria-pressed={active}
                                className={`text-left flex gap-3.5 items-center p-3.5 border-[3px] border-nb-ink cursor-pointer font-mono transition-[transform,box-shadow] duration-[120ms] ${
                                    active
                                        ? 'bg-nb-blue text-white shadow-hard-6 -translate-x-[3px] -translate-y-[3px]'
                                        : 'bg-nb-card text-nb-ink shadow-hard-3'
                                }`}
                            >
                                <span className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-1.5 py-[7px] shrink-0">LV.{level(i)}</span>
                                <span className="flex flex-col gap-1 min-w-0">
                                    <span className="font-rubik font-bold text-base">{work.role}</span>
                                    <span className="text-xs">{work.company}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex-[999_1_480px] max-w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-8">
                    <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3 flex-wrap">
                        <span className="font-pixel text-[10px] text-nb-yellow">QUEST LOG · LV.{level(activeTab)}</span>
                        <span className="text-xs whitespace-nowrap">{job.duration}</span>
                    </div>

                    <div className="p-[26px] flex flex-col gap-[22px]">
                        <div className="flex flex-col gap-1.5">
                            <h3 className="font-rubik font-black text-[clamp(22px,3vw,30px)] leading-[1.15]">{job.role}</h3>
                            <p className="text-[15px] font-medium text-nb-blue">@ {job.company}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                            {/* Every job's images stay mounted so switching tabs doesn't flash */}
                            {workExperience.map((work, workIndex) =>
                                work.images.map((image, imgIndex) => (
                                    <div
                                        key={`${workIndex}-${imgIndex}`}
                                        className={`relative aspect-square border-[3px] border-nb-ink overflow-hidden bg-nb-bg ${workIndex === activeTab ? 'block' : 'hidden'}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${work.role} ${imgIndex + 1}`}
                                            className="object-cover"
                                            fill
                                            sizes="(max-width: 800px) 45vw, 330px"
                                            priority={workIndex === 0}
                                        />
                                    </div>
                                ))
                            )}
                        </div>

                        <ul className="list-none p-0 flex flex-col gap-3">
                            {job.description.map((item) => (
                                <li key={item} className="flex gap-3 text-[15px] leading-[1.5]">
                                    <span className="w-2.5 h-2.5 bg-nb-pink border-2 border-nb-ink shrink-0 mt-1.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/work/${job.slug}`}
                            className="self-start font-pixel text-[10px] bg-nb-yellow text-nb-on px-4 py-3.5 border-[3px] border-nb-ink shadow-hard-4 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6"
                        >
                            READ THE YAPPING →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
