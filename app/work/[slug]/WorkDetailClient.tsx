'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DetailTopBar from '../../common/DetailTopBar';
import { ACCENT_BG, pad2 } from '../../common/palette';
import { WorkExperience, allWorkImages, workExperienceData } from '../workData';

interface WorkDetailClientProps {
    workData: WorkExperience;
}

const SWIPE_THRESHOLD = 50;

const arrowClass =
    'w-10 h-10 grid place-items-center bg-nb-card text-nb-ink border-[3px] border-nb-ink shadow-hard-3 font-pixel text-xs transition-[translate,rotate,scale,box-shadow] duration-100 hover:bg-nb-yellow hover:text-nb-on hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-4 active:translate-x-[3px] active:translate-y-[3px] active:shadow-hard-0';

export default function WorkDetailClient({ workData }: WorkDetailClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const total = workData.images.length;
    // Same LV numbering as the home page: oldest job is LV.01
    const level = pad2(workExperienceData.length - workExperienceData.findIndex((w) => w.slug === workData.slug));

    useEffect(() => {
        // Warm the cache so flipping through the gallery doesn't flash
        workData.images.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, [workData.images]);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % total);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + total) % total);

    const swipe = (distance: number) => {
        if (distance > SWIPE_THRESHOLD) nextImage();
        else if (distance < -SWIPE_THRESHOLD) prevImage();
    };

    // Mobile swipe
    const handleTouchEnd = () => {
        if (touchStart && touchEnd) swipe(touchStart - touchEnd);
        setTouchStart(0);
        setTouchEnd(0);
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

            <main className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 md:pt-[72px] md:pb-24">
                {/* Header */}
                <header className="flex flex-col gap-5 border-b-[3px] border-nb-ink pb-8 mb-10">
                    <div className="flex gap-2.5 flex-wrap">
                        <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">QUEST LOG · LV.{level}</span>
                        <span className="font-pixel text-[10px] bg-nb-card border-2 border-nb-ink px-2.5 py-1.5">{workData.duration.toUpperCase()}</span>
                    </div>
                    <h1 className="font-pixel font-normal text-[clamp(22px,4.4vw,44px)] leading-[1.35] text-balance [text-shadow:4px_4px_0_#FFD23F]">
                        {workData.role.toUpperCase()}
                    </h1>
                    <p className="text-[17px] font-medium text-nb-blue">@ {workData.company}</p>
                </header>

                <div className="flex flex-wrap gap-8 items-start">
                    {/* Story */}
                    <article className="flex-[999_1_480px] max-w-full bg-nb-card border-[3px] border-nb-ink shadow-hard-8">
                        <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3 flex-wrap">
                            <span className="font-pixel text-[10px] text-nb-yellow">THE STORY</span>
                            <span className="font-pixel text-[10px] text-nb-silver">{workData.company.toUpperCase()}</span>
                        </div>
                        <p className="p-[26px] whitespace-pre-line text-base leading-[1.8] text-pretty">{workData.detailedDescription}</p>
                    </article>

                    {/* Gallery + skills */}
                    <div className="flex-[1_1_340px] max-w-full flex flex-col gap-8 md:sticky md:top-[96px]">
                        <div className="bg-nb-card border-[3px] border-nb-ink shadow-hard-8">
                            <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3">
                                <span className="font-pixel text-[10px] text-nb-yellow">GALLERY</span>
                                <span className="font-pixel text-[10px]">
                                    {pad2(currentImageIndex + 1)}/{pad2(total)}
                                </span>
                            </div>

                            <div className="p-4 bg-nb-pink border-b-[3px] border-nb-ink">
                                <div
                                    className="relative aspect-square border-[3px] border-nb-on bg-white overflow-hidden cursor-grab active:cursor-grabbing select-none"
                                    onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                                    onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
                                    onTouchEnd={handleTouchEnd}
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
                                                alt={`${workData.role} at ${workData.company} - Image ${index + 1}`}
                                                className="object-cover pointer-events-none"
                                                fill
                                                sizes="(max-width: 800px) 90vw, 420px"
                                                priority={index === 0}
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

                                <div className="flex flex-wrap justify-center gap-1.5">
                                    {workData.images.map((image, index) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() => setCurrentImageIndex(index)}
                                            aria-label={`Go to image ${index + 1}`}
                                            aria-current={index === currentImageIndex ? 'true' : undefined}
                                            className={`w-3 h-3 border-2 border-nb-ink ${
                                                index === currentImageIndex ? 'bg-nb-yellow' : 'bg-nb-heart hover:bg-nb-sky'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button type="button" onClick={nextImage} aria-label="Next image" className={arrowClass}>
                                    ▶
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-pixel text-[10px]">SKILLS UNLOCKED</span>
                            <ul className="list-none p-0 flex flex-wrap gap-2.5">
                                {workData.skills.map((skill, i) => (
                                    <li
                                        key={skill}
                                        className={`${ACCENT_BG[i % ACCENT_BG.length]} text-nb-on text-[13px] font-bold border-2 border-nb-ink shadow-hard-3 px-3 py-1.5`}
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Hidden preload for every work image, so other quests open instantly */}
            <div className="hidden">
                {allWorkImages.map((image) => (
                    <Image key={`preload-${image}`} src={image} alt="" width={1} height={1} priority />
                ))}
            </div>
        </div>
    );
}
