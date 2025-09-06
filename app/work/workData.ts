// Work experience data
export interface WorkExperience {
    role: string;
    company: string;
    duration: string;
    description: string[];
    detailedDescription: string;
    images: string[];
    slug: string;
    skills: string[];
}

// Image path arrays
export const gscImages = [
    '/gsc/gsc1.webp',
    '/gsc/gsc2.webp',
    '/gsc/gsc3.jpg',
    '/gsc/gsc4.jpg',
    '/gsc/gsc5.jpg',
    '/gsc/gsc6.jpg',
];

export const teenfixImages = [
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

export const dabossImages = [
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

export const inariImages = [
    '/inari/inari1.webp',
    '/inari/inari2.webp',
    '/inari/inari3.jpg',
    '/inari/inari4.jpg',
    '/inari/inari5.jpg',
    '/inari/inari6.jpg',
    '/inari/inari7.jpg',
    '/inari/inari8.jpg',
    '/inari/inari9.jpg',
    '/inari/inari10.jpg',
    '/inari/inari11.jpg',
    '/inari/inari12.jpg',
    
];

// Create a flat array of all images for preloading
export const allWorkImages = [...gscImages, ...teenfixImages, ...dabossImages, ...inariImages];

export const workExperienceData: WorkExperience[] = [
    {
        role: "Software Engineer Intern",
        company: "Inari Amertron Berhad",
        duration: "February 2025 - Present",
        description: [
            "Developed and maintained internal software for efficiency and accuracy.",
            "Fixed bugs and optimized performance with cross-functional teams.",
            "Conducted code reviews and testing for quality assurance.",
        ],
        detailedDescription: `A 24-week journey that turned out to be more about adaptability and problem-solving than just building systems. The internship started with taking over unfinished projects and quickly grew into handling live deployments, dealing with sudden changes, and finding workarounds when things didn’t go as planned.

It was an experience filled with shifting requirements, unexpected bugs, and plenty of “figure it out now” moments. But through that came growth — learning to stay calm under pressure, manage time better, and see the bigger picture beyond just the task in front. On top of that, the people in the department made the journey even better — supportive, approachable, and always ready to share guidance, which made even the most stressful weeks easier to handle.

Looking back, the real takeaway wasn’t just about finishing projects, but about learning how to navigate uncertainty, adapt quickly, and still deliver. It was challenging, but easily one of the most rewarding experiences so far.`,
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

// Helper function to get work data by slug
export function getWorkDataBySlug(slug: string): WorkExperience | undefined {
    return workExperienceData.find(work => work.slug === slug);
}
