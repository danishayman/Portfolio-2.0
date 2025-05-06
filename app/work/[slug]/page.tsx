'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../common/ThemeContext';
import { notFound, useRouter } from 'next/navigation';
import Footer from '../../component/Footer';

// Import images
import gsc1 from '../../../public/gsc/gsc1.webp';
import gsc2 from '../../../public/gsc/gsc2.webp';
import teenfix1 from '../../../public/teenfix/teenfix1.webp';
import teenfix2 from '../../../public/teenfix/teenfix2.webp';
import daboss1 from '../../../public/assets/daboss1.webp';
import daboss2 from '../../../public/assets/daboss2.webp';
import inari1 from '../../../public/assets/inari1.webp';
import inari2 from '../../../public/assets/inari2.webp';

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
        images: [inari1, inari2],
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
        images: [daboss1, daboss2],
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
        images: [gsc1, gsc2],
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
        images: [teenfix1, teenfix2],
        slug: "teenfix-studio",
        skills: ["Mobile Device Repair", "Customer Communication", "Inventory Management", "Technical Troubleshooting", "Quality Control"]
    }
];

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
    const { theme } = useTheme();
    const [workData, setWorkData] = useState<any>(null);
    const router = useRouter();

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/');
        // Add a small delay to ensure navigation completes before scrolling
        setTimeout(() => {
            const workSection = document.getElementById('work');
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    useEffect(() => {
        const work = workExperienceData.find(w => w.slug === params.slug);

        if (work) {
            setWorkData(work);
        } else {
            notFound();
        }
    }, [params.slug]);

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
                            <p className="whitespace-pre-line text-base leading-relaxed">{workData.detailedDescription}</p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {workData.images.map((image: any, index: number) => (
                            <div key={index} className="w-full aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)]">
                                <Image
                                    src={image}
                                    alt={`${workData.role} ${index + 1}`}
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 