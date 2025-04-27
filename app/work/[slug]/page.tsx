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
        detailedDescription: `As a Software Engineer Intern at Inari Amertron Berhad, I've been responsible for developing and maintaining internal software applications that improve operational efficiency and data accuracy across the organization.

Working alongside senior developers and cross-functional teams, I've gained valuable experience in software development lifecycle practices, including requirements gathering, design, implementation, testing, and deployment.

My daily responsibilities include debugging issues, optimizing application performance, and implementing new features based on stakeholder requirements. I've also been actively involved in code reviews, which has significantly improved my coding standards and best practices.

The technologies I've worked with include JavaScript, React, and Node.js for frontend and backend development. I've also gained experience with SQL databases and RESTful API design and implementation.`,
        images: [inari1, inari2],
        slug: "inari-amertron-berhad",
        skills: ["JavaScript", "React", "Node.js", "SQL", "RESTful APIs", "Git", "Agile"]
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
        detailedDescription: `As a Computer Technician at PC DaBoss Technology, I was responsible for diagnosing and resolving a wide range of computer hardware and software issues for both individual and business clients.

My primary responsibilities included performing hardware repairs and upgrades, software installation and configuration, virus and malware removal, data recovery, and network troubleshooting. I also provided remote technical support to clients via phone and email.

Working in a busy retail environment, I developed strong customer service skills while explaining technical issues in easy-to-understand terms. I regularly maintained the shop's inventory of computer parts and accessories, ensuring we had essential components in stock for common repairs.

This role helped me develop a deep understanding of computer systems and troubleshooting methodologies. I became proficient at identifying issues efficiently and implementing the most cost-effective solutions for our clients.`,
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
        detailedDescription: `Working as a Part-Time Crew member at Golden Screen Cinemas gave me valuable experience in customer service and operations in the entertainment industry.

My responsibilities included welcoming and guiding customers to their seats, checking tickets, and ensuring theater cleanliness before and after screenings. I also assisted with crowd management during peak hours and special events, ensuring all safety protocols were followed.

One of the more technical aspects of my role involved operating digital projection systems after receiving specialized training. This included preparing content for screening, monitoring systems during shows, and troubleshooting basic technical issues when they arose.

During my time at GSC, I developed strong interpersonal skills working with diverse customers and colleagues in a fast-paced environment. I learned to maintain composure during busy periods while continuing to provide high-quality service to all patrons.`,
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
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

                    <div className="space-y-4">
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