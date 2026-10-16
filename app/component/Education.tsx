import SectionHeader from '../common/SectionHeader';
import { ACCENT_BG, pad2 } from '../common/palette';

interface Education {
    institution: string;
    degree: string;
    duration: string;
    achievements: string[];
    locationUrl: string;
}

const educationData: Education[] = [
    {
        institution: "Universiti Sains Malaysia",
        degree: "Bachelor of Computer Science (Honours)\n(Intelligent Computing)",
        duration: "Oct 2022 - Present",
        achievements: ["Current CGPA: 3.42"],
        locationUrl: "https://maps.app.goo.gl/owBxR3XgcNFUQSZu7",
    },
    {
        institution: "Penang Matriculation College",
        degree: "Physical Science",
        duration: "July 2021 - July 2022",
        achievements: ["CGPA: 3.92"],
        locationUrl: "https://maps.app.goo.gl/ZeaWPBFXrKfcamNp7",
    },
    {
        institution: "SMK Bukit Jambul, High Performance School",
        degree: "Science Stream",
        duration: "Jan 2015 - Dec 2020",
        achievements: ["SPM: 3A+ 4A"],
        locationUrl: "https://maps.app.goo.gl/QERhYno7k1tQ9oTq6",
    },
];

const Education: React.FC = () => {
    return (
        <section id="education" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader stage="STAGE 1-1" title="EDUCATION" meta={`${educationData.length} SAVE FILES`} />

            <div className="relative max-w-[860px] mx-auto flex flex-col gap-10 pl-16">
                {/* Dashed pixel timeline */}
                <div className="absolute left-[19px] top-2 bottom-2 w-2.5 bg-[repeating-linear-gradient(180deg,var(--nb-ink)_0_10px,transparent_10px_16px)]" />

                {educationData.map((edu, i) => {
                    const num = pad2(educationData.length - i);
                    const accent = ACCENT_BG[i % ACCENT_BG.length];
                    const year = edu.duration.match(/\d{4}/)?.[0];

                    return (
                        <div key={edu.institution} className="relative">
                            <div className={`absolute -left-16 top-1.5 w-12 h-12 ${accent} text-nb-on border-[3px] border-nb-ink shadow-hard-4 grid place-items-center font-pixel text-xs`}>
                                {num}
                            </div>

                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span className="font-pixel text-sm bg-nb-panel text-white px-2.5 py-2 whitespace-nowrap">{year}</span>
                                <span className="font-pixel text-[9px] whitespace-nowrap">{i === 0 ? '▶ IN PROGRESS' : '✓ CLEARED'}</span>
                            </div>

                            <a
                                href={edu.locationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${edu.institution} on Google Maps`}
                                className="flex flex-col bg-nb-card border-[3px] border-nb-ink shadow-hard-6 text-nb-ink transition-[transform,box-shadow] duration-[120ms] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-hard-9"
                            >
                                <div className={`${accent} text-nb-on border-b-[3px] border-nb-ink px-4 py-3 flex flex-wrap justify-between items-center gap-x-3 gap-y-2`}>
                                    <span className="font-pixel text-[10px] whitespace-nowrap">FILE {num}</span>
                                    <span className="text-xs font-bold whitespace-nowrap">{edu.duration}</span>
                                </div>
                                <div className="px-[18px] py-5 flex flex-col gap-3 flex-1">
                                    <h3 className="font-rubik font-bold text-[22px] leading-[1.2] text-balance">{edu.institution}</h3>
                                    <p className="text-sm leading-[1.5] whitespace-pre-line">{edu.degree}</p>
                                    <div className="mt-auto pt-2 flex flex-wrap justify-between items-center gap-2">
                                        {edu.achievements.map((a) => (
                                            <span key={a} className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-2.5 py-2 whitespace-nowrap">
                                                ★ {a}
                                            </span>
                                        ))}
                                        <span className="text-xs font-bold whitespace-nowrap">MAP ↗</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Education;
