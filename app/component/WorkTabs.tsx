'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import SectionHeader from '../common/SectionHeader';
import { pad2 } from '../common/palette';

export interface WorkPreview {
    role: string;
    company: string;
    duration: string;
    description: string[];
    slug: string;
    images: StaticImageData[];
}

// Text comes from workData.ts via the server wrapper in Work.tsx, so it can never drift from the detail pages
export default function WorkTabs({ workExperience }: { workExperience: WorkPreview[] }) {
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
        <section id="work" className="max-w-[1200px] mx-auto px-6 py-12 md:py-[72px]">
            <SectionHeader stage="STAGE 1-4" title="EXPERIENCE" meta={`${workExperience.length} QUESTS CLEARED`} />

            <div className="flex flex-wrap gap-4 md:gap-8 items-start">
                {/* Mobile: dropdown picker, as in the previous layout */}
                <div className="relative md:hidden w-full" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setDropdownOpen((open) => !open)}
                        aria-expanded={dropdownOpen}
                        className="w-full text-left flex gap-2.5 items-center p-2.5 bg-nb-blue text-white border-[3px] border-nb-ink shadow-hard-4 font-mono"
                    >
                        <span className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-1.5 py-[7px] shrink-0">LV.{level(activeTab)}</span>
                        <span className="flex flex-col gap-0.5 min-w-0 flex-1">
                            <span className="font-rubik font-bold text-sm">{job.role}</span>
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
                                        className="w-full text-left flex gap-2.5 items-center p-2.5 font-mono text-nb-ink border-b-[3px] border-nb-ink last:border-b-0 hover:bg-nb-yellow hover:text-nb-on"
                                    >
                                        <span className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-1.5 py-[7px] shrink-0">LV.{level(i)}</span>
                                        <span className="flex flex-col gap-0.5 min-w-0">
                                            <span className="font-rubik font-bold text-sm">{work.role}</span>
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
                                className={`text-left flex gap-3.5 items-center p-3.5 border-[3px] border-nb-ink cursor-pointer font-mono transition-[translate,rotate,scale,box-shadow] duration-120 ${
                                    active
                                        ? 'bg-nb-blue text-white shadow-hard-6 translate-x-[-3px] translate-y-[-3px]'
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

                <div className="flex-[999_1_480px] max-w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-4 md:shadow-hard-8">
                    <div className="bg-nb-panel text-white px-3 py-2 md:px-[18px] md:py-3 flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
                        <span className="font-pixel text-[9px] md:text-[10px] text-nb-yellow">QUEST LOG · LV.{level(activeTab)}</span>
                        <span className="text-[11px] md:text-xs whitespace-nowrap">{job.duration}</span>
                    </div>

                    <div className="p-4 md:p-[26px] flex flex-col gap-3.5 md:gap-[22px]">
                        <div className="flex flex-col gap-1 md:gap-1.5">
                            <h3 className="font-rubik font-black text-xl md:text-[clamp(22px,3vw,30px)] leading-[1.15]">{job.role}</h3>
                            <p className="text-sm md:text-[15px] font-medium text-nb-blue">@ {job.company}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 md:gap-3.5">
                            {/* Every job's images stay mounted so switching tabs doesn't flash */}
                            {workExperience.map((work, workIndex) =>
                                work.images.map((image, imgIndex) => (
                                    <div
                                        key={`${workIndex}-${imgIndex}`}
                                        className={`relative aspect-[4/3] md:aspect-square border-[3px] border-nb-ink overflow-hidden bg-nb-bg ${workIndex === activeTab ? 'block' : 'hidden'}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${work.role} ${imgIndex + 1}`}
                                            className="object-cover"
                                            fill
                                            sizes="(max-width: 800px) 45vw, 330px"

                                        />
                                    </div>
                                ))
                            )}
                        </div>

                        <ul className="list-none p-0 flex flex-col gap-2 md:gap-3">
                            {job.description.map((item) => (
                                <li key={item} className="flex gap-2.5 md:gap-3 text-[13px] md:text-[15px] leading-normal">
                                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-nb-pink border-2 border-nb-ink shrink-0 mt-1.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/work/${job.slug}`}
                            className="self-start font-pixel text-[9px] md:text-[10px] bg-nb-yellow text-nb-on px-3 py-2.5 md:px-4 md:py-3.5 border-[3px] border-nb-ink shadow-hard-4 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6"
                        >
                            READ THE YAPPING →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
