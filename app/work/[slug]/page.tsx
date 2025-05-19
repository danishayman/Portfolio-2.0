'use client';

import { useEffect, useState, useRef, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../common/ThemeContext';
import { notFound, useRouter } from 'next/navigation';
import Footer from '../../component/Footer';

// Image path arrays
const gscImages = [
    '/gsc/gsc1.webp',
    '/gsc/gsc2.webp',
    '/gsc/gsc3.jpg',
    '/gsc/gsc4.jpg',
    '/gsc/gsc5.jpg',
    '/gsc/gsc6.jpg',
];

const teenfixImages = [
    '/teenfix/teenfix1.webp',
    '/teenfix/teenfix2.webp',
    '/teenfix/teenfix3.jpg',
    '/teenfix/teenfix4.jpg',
    '/teenfix/teenfix5.jpg',
    '/teenfix/teenfix6.jpg',
    '/teenfix/teenfix7.jpg',
    '/teenfix/teenfix8.jpg',
    '/teenfix/teenfix9.jpg',
    '/teenfix/teenfix10.jpg',
    '/teenfix/teenfix11.jpg',
    '/teenfix/teenfix12.jpg',
];

const dabossImages = [
    '/daboss/daboss1.webp',
    '/daboss/daboss2.webp',
    '/daboss/daboss3.jpg',
    '/daboss/daboss4.jpg',
    '/daboss/daboss5.jpg',
    '/daboss/daboss6.jpg',
    '/daboss/daboss7.jpg',
    '/daboss/daboss8.jpg',
    '/daboss/daboss9.jpg',
];

const inariImages = [
    '/inari/inari1.webp',
    '/inari/inari2.webp',
    '/inari/inari3.jpg',
    '/inari/inari4.jpg',
    '/inari/inari5.jpg',
    '/inari/inari6.jpg',
];

// Create a flat array of all images for preloading
const allWorkImages = [...gscImages, ...teenfixImages, ...dabossImages, ...inariImages];

// Work experience data
const workExperienceData = [
    {
        role: "Software Engineer Intern",
        company: "Inari Amertron Berhad",
        duration: "February 2025 - Present",
        description: [
            "Developed and maintained internal software for efficiency and accuracy.",
            "Fixed bugs and optimized performance with cross-functional teams.",
            "Conducted code reviews and testing for quality assurance.",
        ],
        detailedDescription: `Internship at Inari Technology has been a real eye-opener into how messy and hands-on real-world work can get. Got thrown into an active project right away, which meant having to figure things out quick, fix problems as they came, and constantly bounce between teams to keep things moving.

Turns out, knowing how to code isn't even half the battle — the real challenge is dealing with changes, deadlines, and random problems popping up out of nowhere. Staying calm under pressure, managing time better, and thinking beyond just "making it work" became part of the daily routine.

So far, it's been way less about following a clear plan and way more about learning how to survive when there isn't one — easily one of the biggest jumps in both skill and mindset so far.

`,
        images: inariImages,
        slug: "inari-amertron-berhad",
        skills: ["ASP.NET", "C#", "SQL", "Git", "Agile"]
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
        detailedDescription: `While waiting for the internship to start, spent about two months working part-time at PC DaBoss Technology, a small local PC shop. Short time, but honestly, it felt like a full crash course in the real basics of computers.

Most days were spent building custom PCs, cleaning out dusty old laptops, installing RAM and SSDs, swapping out cracked screens and broken keyboards, and troubleshooting all sorts of random problems. Nothing too glamorous — just hands-on, elbow-deep work trying to figure out why a machine wouldn't boot or why a laptop decided to die out of nowhere. Definitely different from the clean theory taught in class.

Had to resign earlier than planned after landing the internship, but still walked away with a lot. Those two months built real instincts with hardware, made it easier to catch the little things that actually make machines tick, and added way more confidence when dealing with tech outside of just software.

Short stint — but a seriously meaningful one.`,
        images: dabossImages,
        slug: "pc-daboss",
        skills: ["Hardware Repair", "Software Troubleshooting", "Customer Service", "Windows OS", "Networking", "Data Recovery"]
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
        detailedDescription: `Worked at GSC for almost five months as a steward, a role that initially seemed straightforward but quickly became an intense lesson in customer service and conflict management. The main tasks included managing ticketing, checking customers, and making sure everything ran smoothly. But the job involved much more than that. There were the difficult customers — angry parents arguing about underage kids trying to sneak into 18+ shows, dumb types demanding refunds for shows they missed, and customers upset over service issues that were often beyond control.


Though it started simply as a way to earn extra cash, it ended up being an invaluable learning experience. The role pushed communication skills to the next level, helped manage stressful situations, and forced an introvert to adapt and engage with all kinds of people. Explaining policies clearly, diffusing tense moments, and staying professional under pressure were skills learned on the job.

Balancing late-night shifts with university work was tough, and by mid-semester, it became clear that it was too much to juggle. So, decided to resign during the break. Even though it was a challenging experience, working at GSC taught a lot about handling pressure, managing customer relationships, and working as part of a team. Beyond the tough moments, there were plenty of memories that made it all worth it — the dumb, hilarious things done with the team during opening and closing shifts, sneaking quick peeks at newly released movies before the crowds came in, and the sense of camaraderie that made even the long nights feel lighter. It was a memorable chapter, and despite the tough moments, it was an experience that helped me grow both professionally and personally.`,
        images: gscImages,
        slug: "gsc",
        skills: ["Customer Service", "Team Collaboration", "Problem Solving", "Digital Projection Systems", "Safety Compliance"]
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
        detailedDescription: `Started out at Teenfix Studio just working the cashier counter — handling payments, talking to customers, basic front-desk stuff. Nothing fancy at first. But after a while, got the chance to jump into the repair side of things, and from there it just took off.

Ended up going full-time as a technician, getting hands-on with all kinds of phone and tablet repairs. Daily grind was stuff like replacing cracked screens, swapping batteries, fixing charging ports, saving water-damaged phones, and figuring out random software issues. Some days were smooth, others felt like performing surgery on tiny, stubborn machines.

Also spent a lot of time talking to customers — diagnosing their device problems, explaining what needed fixing, and giving them the best repair options without all the tech mumbo jumbo. Managed the parts inventory too, making sure the shop always had enough components ready for the usual break-fix jobs.

Learned real fast that no two devices break the same way, and sometimes repairs meant getting creative. Got way better at handling delicate parts, troubleshooting weird problems, and keeping calm when things didn't go as planned.

What started off as a simple cashier job turned into a legit skill set — hands-on technical work, customer communication, and problem-solving, all rolled into one.`,
        images: teenfixImages,
        slug: "teenfix-studio",
        skills: ["Mobile Device Repair", "Customer Communication", "Inventory Management", "Technical Troubleshooting", "Quality Control"]
    }
];

interface WorkDetailParams {
  params: {
    slug: string;
  };
}

export default function WorkDetailPage({ params }: WorkDetailParams) {
    const { theme } = useTheme();
    const [workData, setWorkData] = useState<any>(null);
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const slug = params.slug;

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/#work');
    };

    useEffect(() => {
        const work = workExperienceData.find(w => w.slug === slug);

        if (work) {
            setWorkData(work);
        } else {
            notFound();
        }
    }, [slug]);

    const nextImage = () => {
        if (!workData) return;
        setCurrentImageIndex((prev) => 
            prev === workData.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        if (!workData) return;
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

    if (!workData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

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
                                        alt={`${workData.role} image ${index + 1}`}
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

            <Footer />
        </div>
    );
} 