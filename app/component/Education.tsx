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
        <section id="education" className="min-h-[100dvh] flex flex-col items-center p-8 md:p-16 xl:p-24 gap-12">
            <h1 className="text-5xl font-rubik font-black tracking-wider">EDUCATION</h1>

            <div className="education-timeline">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="education-item opacity-0 animate-[fadeInUp_0.6s_ease_forwards]"
                    >
                        <div className="education-dot"></div>
                        <div className="education-content">
                            <h3>{edu.institution}</h3>
                            <p className="education-degree">
                                {edu.degree.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < edu.degree.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                            <p className="education-duration">{edu.duration}</p>
                            <ul className="education-achievements">
                                {edu.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex}>✓ {achievement}</li>
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