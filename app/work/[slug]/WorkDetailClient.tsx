'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import DetailTopBar from '../../common/DetailTopBar';
import { ACCENT_BG, pad2 } from '../../common/palette';
import { WorkExperience, imageAlt, workExperienceData } from '../workData';

interface WorkDetailClientProps {
    workData: WorkExperience;
}

const SWIPE_THRESHOLD = 50;

const arrowClass =
    'shrink-0 w-11 h-11 grid place-items-center bg-nb-card text-nb-ink border-[3px] border-nb-ink shadow-hard-3 font-pixel text-xs transition-[translate,rotate,scale,box-shadow] duration-100 hover:bg-nb-yellow hover:text-nb-on hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-4 active:translate-x-[3px] active:translate-y-[3px] active:shadow-hard-0';

export default function WorkDetailClient({ workData }: WorkDetailClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Where the current touch began; null when no swipe is in progress
    const touchStartX = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const total = workData.images.length;
    // Same LV numbering as the home page: oldest job is LV.01
    const level = pad2(workExperienceData.length - workExperienceData.findIndex((w) => w.slug === workData.slug));

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % total);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + total) % total);

    const swipe = (distance: number) => {
        if (distance > SWIPE_THRESHOLD) nextImage();
        else if (distance < -SWIPE_THRESHOLD) prevImage();
    };

    // Mobile swipe
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current !== null) swipe(touchStartX.current - e.changedTouches[0].clientX);
        touchStartX.current = null;
    };

    // Desktop drag
    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        swipe(dragStartX - e.clientX);
        setIsDragging(false);
    };

    return (
        <div className="nb-grid bg-nb-bg text-nb-ink min-h-screen">
            <DetailTopBar backHref="/#work" backLabel="EXPERIENCE" />

            <main id="content" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 md:pt-[72px] md:pb-24">
                {/* Header */}
                <header className="flex flex-col gap-5 border-b-[3px] border-nb-ink pb-8 mb-10">
                    <div className="flex gap-2.5 flex-wrap">
                        <span className="font-pixel text-2xs bg-nb-panel text-nb-yellow px-2.5 py-2">QUEST LOG · LV.{level}</span>
                        <span className="font-pixel text-2xs bg-nb-card border-2 border-nb-ink px-2.5 py-1.5">{workData.duration.toUpperCase()}</span>
                    </div>
                    <h1 className="font-pixel font-normal text-[clamp(22px,4.4vw,44px)] leading-[1.35] text-balance [text-shadow:4px_4px_0_var(--nb-title-shadow)]">
                        {workData.role.toUpperCase()}
                    </h1>
                    <p className="text-[1.0625rem] font-medium text-nb-blue-ink">@ {workData.company}</p>
                </header>

                <div className="flex flex-wrap gap-8 items-start">
                    {/* Story */}
                    <article className="flex-[999_1_480px] max-w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-8">
                        <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3 flex-wrap">
                            <span className="font-pixel text-2xs text-nb-yellow">THE STORY</span>
                            <span className="font-pixel text-2xs text-nb-silver">{workData.company.toUpperCase()}</span>
                        </div>
                        <p className="p-[26px] whitespace-pre-line text-base leading-[1.8] text-pretty">{workData.detailedDescription}</p>
                    </article>

                    {/* Gallery + skills */}
                    <div className="flex-[1_1_340px] max-w-full flex flex-col gap-8 md:sticky md:top-[96px]">
                        <div className="bg-nb-card border-[3px] border-nb-ink shadow-hard-8">
                            <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3">
                                <span className="font-pixel text-2xs text-nb-yellow">GALLERY</span>
                                <span className="font-pixel text-2xs">
                                    {pad2(currentImageIndex + 1)}/{pad2(total)}
                                </span>
                            </div>

                            <div className="p-4 bg-nb-pink border-b-[3px] border-nb-ink">
                                <div
                                    className="relative aspect-square border-[3px] border-nb-on bg-white overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
                                    onTouchStart={(e) => {
                                        touchStartX.current = e.touches[0].clientX;
                                    }}
                                    onTouchEnd={handleTouchEnd}
                                    // The browser took the gesture over (a vertical scroll): forget it
                                    onTouchCancel={() => {
                                        touchStartX.current = null;
                                    }}
                                    onMouseDown={(e) => {
                                        setIsDragging(true);
                                        setDragStartX(e.clientX);
                                    }}
                                    // Prevent text selection during drag
                                    onMouseMove={(e) => isDragging && e.preventDefault()}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={() => setIsDragging(false)}
                                >
                                    {workData.images.map((image, index) => (
                                        <div
                                            key={image}
                                            className={`absolute inset-0 transition-opacity duration-300 ease-[steps(6)] ${
                                                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={imageAlt[image] ?? `Photo ${index + 1} of ${total} from my time at ${workData.company}`}
                                                className="object-cover pointer-events-none"
                                                fill
                                                sizes="(max-width: 800px) 90vw, 420px"
                                                // The story text is the LCP (the gallery sits below it on phones), so
                                                // photos never preload; the hidden ones load last
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                fetchPriority={index === 0 ? 'auto' : 'low'}
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-4 py-3.5 flex items-center justify-between gap-3">
                                <button type="button" onClick={prevImage} aria-label="Previous image" className={arrowClass}>
                                    ◀
                                </button>

                                <div className="flex flex-wrap justify-center">
                                    {workData.images.map((image, index) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() => setCurrentImageIndex(index)}
                                            aria-label={`Go to image ${index + 1}`}
                                            aria-current={index === currentImageIndex ? 'true' : undefined}
                                            className="group p-1.5"
                                        >
                                            {/* 12px square inside a 24px tap target */}
                                            <span
                                                className={`block w-3 h-3 border-2 border-nb-ink ${
                                                    index === currentImageIndex ? 'bg-nb-yellow' : 'bg-nb-heart group-hover:bg-nb-sky'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <button type="button" onClick={nextImage} aria-label="Next image" className={arrowClass}>
                                    ▶
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-pixel text-2xs">SKILLS UNLOCKED</span>
                            <ul className="list-none p-0 flex flex-wrap gap-2.5">
                                {workData.skills.map((skill, i) => (
                                    <li
                                        key={skill}
                                        className={`${ACCENT_BG[i % ACCENT_BG.length]} text-nb-on text-[0.8125rem] font-bold border-2 border-nb-ink shadow-hard-3 px-3 py-1.5`}
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
