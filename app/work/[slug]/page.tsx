'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../common/ThemeContext';
import { notFound } from 'next/navigation';
import Footer from '../../component/Footer';

// Import images
import gsc1 from '../../../public/assets/gsc1.webp';
import gsc2 from '../../../public/assets/gsc2.webp';
import teenfix1 from '../../../public/assets/teenfix1.webp';
import teenfix2 from '../../../public/assets/teenfix2.webp';
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
        detailedDescription: `My internship at Inari Technology has been a real glimpse into how unpredictable and hands-on real-world work can be. I was given ownership of an active project, which meant learning to adapt quickly, solve problems on the fly, and communicate effectively with different teams.

This experience taught me that technical skills alone aren't enough — real growth comes from navigating changing requirements, tight deadlines, and unexpected challenges. I learned how to stay focused under pressure, manage my time better, and think beyond just the code to see the bigger picture.

So far, this internship has been less about following a script and more about learning how to thrive when there isn't one — a real stepping stone for both my technical and personal growth.`,
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
        detailedDescription: `While waiting for my internship to kick off, I spent about two months working part-time at PC DaBoss Technology, a local PC shop. It wasn’t a long time, but honestly, it was a crash course in the real basics of computers.

Most days, I was getting my hands dirty building custom PCs, cleaning dusty laptops, installing RAM and SSDs, troubleshooting random issues, replacing cracked laptop screens and busted keyboards, and just figuring out how to solve problems fast. It wasn’t glamorous work — it was the kind where you’re elbow-deep inside a laptop trying to figure out why it won’t boot — but it taught me how computers actually behave in the wild, outside the theory we learn in school.

Even though I had to resign earlier than planned (thanks to getting my internship offer ahead of schedule), I walked away with a lot. Those two months gave me real-world skills, a better technical instinct, and a deeper appreciation for the tiny details that make machines work. It also made me more confident in handling hardware, something that’s super easy to overlook when you’re mostly focused on the software side.

Short stint — but definitely a meaningful one.

`,
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
        detailedDescription: `Worked at GSC for almost five months as a steward, a role that initially seemed straightforward but quickly became an intense lesson in customer service and conflict management. The main tasks included managing ticketing, checking customers, and making sure everything ran smoothly. But the job involved much more than that. There were the difficult customers — angry parents arguing about underage kids trying to sneak into 18+ shows, “Karen” types demanding refunds for shows they missed, and customers upset over service issues that were often beyond control. It required a lot of patience and the ability to stay calm in tense situations.

One particularly chaotic moment was when the fire alarm went off mid-show, leading to mass panic in the cinema. Turned out it was just a malfunction, but the experience emphasized how critical it is to stay composed when things go sideways.

While the job started out as a way to earn extra money, it ended up being an invaluable learning experience. The role pushed communication skills to the next level, helped manage stressful situations, and forced an introvert to adapt and engage with all kinds of people. Explaining policies clearly, diffusing tense moments, and staying professional under pressure were skills learned on the job.

Balancing late-night shifts with university work was tough, and by mid-semester, it became clear that it was too much to juggle. So, I decided to resign during the break. Even though it was a challenging experience, working at GSC taught a lot about handling pressure, managing customer relationships, and working as part of a team. It was a memorable chapter, and despite the tough moments, it was an experience that helped me grow both professionally and personally.`,
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
        detailedDescription: `As a Phone Technician at Teenfix Studio, I specialized in diagnosing and repairing a wide range of smartphones and tablets across different brands and models.

My daily responsibilities included screen replacements, battery replacements, charging port repairs, water damage recovery, and software troubleshooting. I worked directly with customers to understand their device issues, provide cost estimates, and explain repair options.

I managed our repair parts inventory, ensuring we had common components in stock while coordinating special orders for less common repairs. This required staying updated on new device models and their repair requirements.

Throughout my time at Teenfix, I developed technical skills specific to mobile device repair and troubleshooting. I became proficient at working with small components, using specialized tools, and following detailed repair procedures for different device models.

The experience also enhanced my problem-solving abilities as I often encountered unique device issues that required creative solutions.`,
        images: [teenfix1, teenfix2],
        slug: "teenfix-studio",
        skills: ["Mobile Device Repair", "Customer Communication", "Inventory Management", "Technical Troubleshooting", "Quality Control"]
    }
];

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
    const { theme } = useTheme();
    const [workData, setWorkData] = useState<any>(null);

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
                <Link href="/#work" className="inline-flex items-center mb-10 text-sm md:text-base font-medium px-4 py-2 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm">
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Portfolio
                </Link>

                <div className="flex flex-col mb-12">
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{workData.role}</h1>
                        <h2 className="text-xl md:text-2xl opacity-80 mb-2">{workData.company}</h2>
                        <p className="text-sm md:text-base opacity-70 mb-8">{workData.duration}</p>

                        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                            <p className="whitespace-pre-line text-base leading-relaxed">{workData.detailedDescription}</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-medium mb-4">Skills & Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {workData.skills.map((skill: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm rounded-full border-2 border-[var(--text-color)] bg-[var(--background-color)]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {workData.images.map((image: any, index: number) => (
                            <div key={index} className="w-full aspect-video relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)]">
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