'use client';


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
        <section id="education" className="min-h-[650px] md:min-h-[750px] flex flex-col items-center py-16 px-8 md:py-24 md:px-16 xl:px-24 gap-10">
            <div className="section-header">
                <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">EDUCATION</h2>
            </div>

            <div className="education-timeline relative flex flex-col gap-6 md:gap-8 w-full max-w-[600px] hover:cursor-default">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="education-item relative pl-8 pb-4 transition-all duration-400 hover:translate-x-[10px] opacity-0 animate-[fadeInUp_0.6s_ease_forwards]"
                        style={{ animationDelay: `${0.1 + index * 0.3}s` }}
                    >
                        <div className="education-dot absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-current transition-all duration-400 md:left-[calc(1rem-5px)] xl:left-[calc(2rem-5px)]"></div>

                        <div className="education-content flex flex-col gap-1 md:gap-2 p-3 md:p-4 rounded-lg border-2 border-transparent hover:border-[var(--text-color)] hover:bg-[var(--background-color)] hover:shadow-[5px_5px_var(--box-shadow-color)] transition-all duration-400">
                            <h3 className="text-xl md:text-2xl font-bold transition-transform duration-400">
                                {edu.institution}
                            </h3>

                            <p className="education-degree text-sm md:text-base lg:text-base">
                                {edu.degree.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < edu.degree.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </p>

                            <p className="education-duration text-xs md:text-sm transition-opacity duration-400">
                                {edu.duration}
                            </p>

                            <ul className="education-achievements list-none p-0 mt-1 md:mt-2 font-mono">
                                {edu.achievements.map((achievement, achIndex) => (
                                    <li
                                        key={achIndex}
                                        className="opacity-90 text-xs md:text-sm mb-1 transition-all duration-400 origin-left"
                                    >
                                        ✓ {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .education-timeline > div:hover .education-content {
                    transform: translateX(5px);
                    box-shadow: 5px 5px var(--box-shadow-color);
                }
            `}</style>
        </section>
    );
};


export default Education; 