'use client';

import { useEffect, useRef } from 'react';

interface Education {
    institution: string;
    degree: string;
    duration: string;
    achievements: string[];
}

const Education: React.FC = () => {
    const educationData: Education[] = [
        {
            institution: "Universiti Sains Malaysia",
            degree: "Bachelor of Computer Science (Honours)\n(Intelligent Computing)",
            duration: "Oct 2022 - Present",
            achievements: ["Current CGPA: 3.42"],
        },
        {
            institution: "Penang Matriculation College",
            degree: "Physical Science",
            duration: "July 2021 - July 2022",
            achievements: ["Graduated with grade 3.92"],
        },
        {
            institution: "SMK Bukit Jambul, High Performance School",
            degree: "Science Stream",
            duration: "Jan 2015 - Dec 2020",
            achievements: ["SPM: 3A+ 4A"],
        },
    ];

    return (
        <section id="education" className="min-h-screen flex flex-col items-center p-8 md:p-16 xl:p-24 gap-12">
            <h1 className="text-4xl font-rubik font-black">Education</h1>

            <div className="relative flex flex-col gap-8 w-full max-w-[600px] hover:cursor-default before:content-[''] before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-current before:opacity-20 before:transition-opacity before:duration-400 hover:before:opacity-40 md:before:left-4 xl:before:left-8">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="relative pl-8 pb-4 transition-all duration-400 hover:translate-x-[10px] opacity-0 animate-[fadeInUp_0.6s_ease_forwards]"
                        style={{ animationDelay: `${0.1 + index * 0.3}s` }}
                    >
                        <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-current transition-all duration-400 md:left-[calc(1rem-5px)] xl:left-[calc(2rem-5px)]"></div>

                        <div className="flex flex-col gap-2 p-4 rounded-lg transition-all duration-400 hover:bg-[var(--background-color)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                            <h3 className="text-xl font-bold transition-transform duration-400 hover:translate-y-[-2px]">
                                {edu.institution}
                            </h3>

                            <p className="opacity-80 transition-opacity duration-400 hover:opacity-100 whitespace-pre-line">
                                {edu.degree}
                            </p>

                            <p className="opacity-60 text-sm transition-opacity duration-400 hover:opacity-80">
                                {edu.duration}
                            </p>

                            <ul className="list-none p-0 mt-2 font-mono">
                                {edu.achievements.map((achievement, achIndex) => (
                                    <li
                                        key={achIndex}
                                        className="opacity-90 text-[0.95rem] mb-1 transition-all duration-400 origin-left hover:opacity-100 hover:scale-[1.02]"
                                    >
                                        ✓ {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education; 