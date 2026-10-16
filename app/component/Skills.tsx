import SkillList from '../common/SkillList';
import SectionHeader from '../common/SectionHeader';
import { ACCENT_BG, ACCENT_HOVER_BG } from '../common/palette';

const skillGroups = [
    {
        label: 'WEB STACK',
        items: [
            { icon: 'html', name: 'HTML' },
            { icon: 'css', name: 'CSS' },
            { icon: 'react', name: 'React.js' },
            { icon: 'node', name: 'Node.js' },
            { icon: 'aspnet', name: 'ASP.NET' },
            { icon: 'next', name: 'Next.js' },
            { icon: 'tailwind', name: 'Tailwind CSS' },
        ],
    },
    {
        label: 'LANGUAGES',
        items: [
            { icon: 'python', name: 'Python' },
            { icon: 'java', name: 'Java' },
            { icon: 'r', name: 'R' },
            { icon: 'cpp', name: 'C++' },
            { icon: 'javascript', name: 'JavaScript' },
            { icon: 'sql', name: 'SQL' },
            { icon: 'csharp', name: 'C#' },
            { icon: 'typescript', name: 'TypeScript' },
        ],
    },
    {
        label: 'DATA & TOOLS',
        items: [
            { icon: 'pandas', name: 'Pandas' },
            { icon: 'tensorflow', name: 'TensorFlow' },
            { icon: 'numpy', name: 'NumPy' },
            { icon: 'git', name: 'Git' },
            { icon: 'scikit-learn', name: 'Scikit-learn' },
        ],
    },
];

const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0);

const Skills: React.FC = () => {
    return (
        <section id="skills" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader stage="STAGE 1-2" title="SKILLS" meta={`${totalSkills} ABILITIES UNLOCKED`} />

            <div className="flex flex-col gap-7">
                {skillGroups.map((group, i) => (
                    <div
                        key={group.label}
                        className="grid grid-cols-1 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)] gap-5 items-start bg-nb-card border-[3px] border-nb-ink shadow-hard-6 p-5"
                    >
                        <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2.5">
                            <span className={`w-7 h-7 ${ACCENT_BG[i % ACCENT_BG.length]} border-[3px] border-nb-ink`} />
                            <span className="font-pixel text-[11px] leading-normal">{group.label}</span>
                            <span className="text-xs text-nb-muted">{group.items.length} skills</span>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            {group.items.map((skill) => (
                                <SkillList
                                    key={skill.name}
                                    src={`/skills/${skill.icon}-light.svg`}
                                    skill={skill.name}
                                    hoverBg={ACCENT_HOVER_BG[i % ACCENT_HOVER_BG.length]}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
