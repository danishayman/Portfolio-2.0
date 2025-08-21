'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { WorkExperience, allWorkImages } from '../workData';

interface WorkDetailClientProps {
    workData: WorkExperience;
}

export default function WorkDetailClient({ workData }: WorkDetailClientProps) {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/#work');
    };

    useEffect(() => {
        // Start preloading images
        const preloadImages = workData.images.map((src) => {
            return new Promise<void>((resolve) => {
                const img = new window.Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue even if image fails to load
            });
        });

        // Wait for images to preload
        Promise.all(preloadImages).catch(() => {
            // In case of errors, still continue
        });
    }, [workData.images]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === workData.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? workData.images.length - 1 : prev - 1
        );
    };

    // Handle touch events for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        
        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
        
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Desktop mouse-based swipe
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        // Prevent text selection during drag
        e.preventDefault();
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        
        const distance = dragStartX - e.clientX;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        
        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
        
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    // Function to handle dot indicator clicks
    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-24 md:px-12">
                <button onClick={handleBackClick} className="inline-flex items-center mb-10 text-sm md:text-base font-medium px-4 py-2 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm">
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Portfolio
                </button>

                <div className="flex flex-col mb-12">
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{workData.role}</h1>
                        <h2 className="text-xl md:text-2xl opacity-80 mb-2">{workData.company}</h2>
                        <p className="text-sm md:text-base opacity-70 mb-8">{workData.duration}</p>

                        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                            <p className="whitespace-pre-line mb-8"
                                style={{
                                    color: 'currentColor',
                                    opacity: 1,
                                    fontWeight: 500,
                                    textShadow: 'none',
                                    filter: 'none'
                                }}>
                                {workData.detailedDescription}
                            </p>
                        </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="mb-12">
                        <div 
                            ref={carouselRef}
                            className="relative w-full mx-auto aspect-square mb-4 rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)] md:max-w-md lg:max-w-lg cursor-grab active:cursor-grabbing select-none"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            {workData.images.map((image: string, index: number) => (
                                <div 
                                    key={index} 
                                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                                        index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${workData.role} at ${workData.company} - Image ${index + 1}`}
                                        className="object-cover pointer-events-none"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority={index === currentImageIndex}
                                        draggable="false"
                                    />
                                </div>
                            ))}
                            
                            {/* Navigation Arrows */}
                            <button 
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20 cursor-pointer"
                                onClick={prevImage}
                                aria-label="Previous image"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button 
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20 cursor-pointer"
                                onClick={nextImage}
                                aria-label="Next image"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Swipe instruction - moved below the carousel */}
                        <div className="flex items-center justify-center mb-4 text-[var(--text-color)] font-medium text-sm md:text-base max-w-md mx-auto">
                            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 5L7 12L14 19M21 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Swipe or drag to navigate
                            <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L17 12L10 5M3 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                        {/* Enhanced Dot indicators */}
                        <div className="flex justify-center space-x-3 mb-2 max-w-md mx-auto">
                            {workData.images.map((_: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`h-3 w-3 rounded-full transition-colors border border-[var(--text-color)] ${
                                        index === currentImageIndex 
                                            ? "bg-[var(--text-color)]" 
                                            : "bg-transparent hover:bg-[var(--text-color)]/30"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Hidden preload section for all possible images */}
            <div className="hidden">
                {allWorkImages.map((image, index) => (
                    <Image
                        key={`preload-${index}`}
                        src={image}
                        alt="Preload image"
                        width={1}
                        height={1}
                        priority={true}
                    />
                ))}
            </div>
        </div>
    );
}
