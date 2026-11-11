// Work experience data
// What each photo shows, for screen readers. Add a line here whenever a photo is added to the lists below.
export const imageAlt: Record<string, string> = {
    '/inari/inari1.webp': 'The Inari sign on the blue front of the factory building, seen from the car park',
    '/inari/inari2.webp': 'Four people at a meeting table watching a dashboard projected on the wall',
    '/inari/inari3.jpg': 'A desk with the FETS login page on a monitor and code open on a laptop beside it',
    '/inari/inari4.jpg': 'Industrial pipes, valves and tanks in the plant facility area',
    '/inari/inari5.jpg': 'A labelled close-up of a chip after wire bonding, marking the die, bond pads and gold wire',
    '/inari/inari6.jpg': 'An empty meeting room with a long wooden table and tan chairs',
    '/inari/inari7.jpg': 'Seven people in yellow safety vests standing in front of the Inari building',
    '/inari/inari8.jpg': 'A large group in matching jerseys posing in front of a fire station',
    '/inari/inari9.jpg': 'Three people standing on a factory roof beside rows of solar panels',
    '/inari/inari10.jpg': 'Two workers setting up an instrument on a tripod on the grass',
    '/inari/inari11.jpg': 'A row of toy brick cartoon figures on top of a desk partition in the office',
    '/inari/inari12.jpg': 'The Inari building lit up at night, with people gathered outside',
    '/daboss/daboss1.webp': 'Close-up of an open laptop showing the heat pipes and motherboard',
    '/daboss/daboss2.webp': 'A PC build in progress, with the case surrounded by the boxes of its parts',
    '/daboss/daboss3.jpg': 'A laptop charger resting on top of a pastry on a workbench',
    '/daboss/daboss4.jpg': 'A hand holding an old 256 MB laptop RAM stick with a key attached, used as a keychain',
    '/daboss/daboss5.jpg': 'An opened laptop being dusted with a small brush and a cloth',
    '/daboss/daboss6.jpg': 'The green main board inside an opened television',
    '/daboss/daboss7.jpg': 'A small white PC case with the side off, showing a white tower cooler and tidy cables',
    '/daboss/daboss8.jpg': 'A black PC case with the side off, showing the CPU cooler and an MSI GeForce graphics card',
    '/daboss/daboss9.jpg': 'The other side of the small white PC, showing a dual-fan graphics card',
    '/gsc/gsc1.webp': 'The cinema entrance, with a lit "Now Seating" sign above hall numbers 1 to 8',
    '/gsc/gsc2.webp': 'A digital cinema projector and its equipment rack in the projection room',
    '/gsc/gsc3.jpg': 'A ticket-checking screen that reads "Scan barcode to proceed"',
    '/gsc/gsc4.jpg': 'An empty cinema hall with the screen on, seen from the back row',
    '/gsc/gsc5.jpg': 'The long, dim projection corridor lined with equipment racks',
    '/gsc/gsc6.jpg': 'A hand holding two Venom: The Last Dance collectible tickets',
    '/teenfix/teenfix1.webp': 'Phone parts laid out in order on a repair mat',
    '/teenfix/teenfix2.webp': 'A fully disassembled iPhone arranged on a blue repair mat, with screws sorted on a magnetic pad',
    '/teenfix/teenfix3.jpg': 'The inside of a phone, showing four camera modules and metal shielding',
    '/teenfix/teenfix4.jpg': 'An iPhone next to its replaced battery, with a Teenfix Studio card behind it',
    '/teenfix/teenfix5.jpg': 'Close-up of an iPhone logic board with the shield cut open over a chip',
    '/teenfix/teenfix6.jpg': 'A triple-lens phone camera module removed from the phone',
    '/teenfix/teenfix7.jpg': 'A cluttered repair bench covered in tools, screwdrivers and phone parts',
    '/teenfix/teenfix8.jpg': 'Rows of phones held in clamps on a table while their back glass sets',
    '/teenfix/teenfix9.jpg': 'A phone screen showing a full panic log used to diagnose a fault',
    '/teenfix/teenfix10.jpg': 'Tweezers working on a connector inside a Huawei phone',
    '/teenfix/teenfix11.jpg': 'A tiny surface-mount component sitting on a fingertip',
    '/teenfix/teenfix12.jpg': 'The repair bench in sunlight, with a blue mat, tools and phones waiting',
};

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

export const workExperienceData: WorkExperience[] = [
    {
        role: "Software Engineer Intern",
        company: "Inari Amertron Berhad",
        duration: "March 2025 - October 2025",
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
