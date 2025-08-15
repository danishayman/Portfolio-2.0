'use client';

import { useTheme } from '../common/ThemeContext';
import SkillList from '../common/SkillList';

// Static file URLs for skill icons

const Skills: React.FC = () => {
    const { theme } = useTheme();

    // Theme-based icon selection for each skill using static URLs
    const icons = {
        html: theme === 'light' ? '/skills/html-light.svg' : '/skills/html-dark.svg',
        css: theme === 'light' ? '/skills/css-light.svg' : '/skills/css-dark.svg',
        javascript: theme === 'light' ? '/skills/javascript-light.svg' : '/skills/javascript-dark.svg',
        python: theme === 'light' ? '/skills/python-light.svg' : '/skills/python-dark.svg',
        java: theme === 'light' ? '/skills/java-light.svg' : '/skills/java-dark.svg',
        cpp: theme === 'light' ? '/skills/cpp-light.svg' : '/skills/cpp-dark.svg',
        sql: theme === 'light' ? '/skills/sql-light.svg' : '/skills/sql-dark.svg',
        pandas: theme === 'light' ? '/skills/pandas-light.svg' : '/skills/pandas-dark.svg',
        numpy: theme === 'light' ? '/skills/numpy-light.svg' : '/skills/numpy-dark.svg',
        git: theme === 'light' ? '/skills/git-light.svg' : '/skills/git-dark.svg',
        tensorflow: theme === 'light' ? '/skills/tensorflow-light.svg' : '/skills/tensorflow-dark.svg',
        scikitLearn: theme === 'light' ? '/skills/scikit-learn-light.svg' : '/skills/scikit-learn-dark.svg',
        react: theme === 'light' ? '/skills/react-light.svg' : '/skills/react-dark.svg',
        node: theme === 'light' ? '/skills/node-light.svg' : '/skills/node-dark.svg',
        csharp: theme === 'light' ? '/skills/csharp-light.svg' : '/skills/csharp-dark.svg',
        aspnet: theme === 'light' ? '/skills/aspnet-light.svg' : '/skills/aspnet-dark.svg',
        r: theme === 'light' ? '/skills/r-light.svg' : '/skills/r-dark.svg',
        next: theme === 'light' ? '/skills/next-light.svg' : '/skills/next-dark.svg',
        tailwind: theme === 'light' ? '/skills/tailwind-light.svg' : '/skills/tailwind-dark.svg',
        typescript: theme === 'light' ? '/skills/typescript-light.svg' : '/skills/typescript-dark.svg',
    };

    return (
        <section id="skills" className="flex flex-col text-center p-6 md:p-8 lg:p-16 py-16 md:py-24 min-h-[650px] md:min-h-[750px] lg:min-h-[800px] justify-center gap-6 md:gap-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="section-header">
                <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">SKILLS</h2>
            </div>

            <div className="skills-list flex justify-center self-center flex-wrap gap-[8px] md:gap-[10px] lg:gap-5 row-gap-4 md:row-gap-4 lg:row-gap-5 w-full max-w-full md:max-w-[450px] lg:max-w-fit relative p-2 hover:cursor-default">
                {[
                    { icon: icons.html, name: "HTML" },
                    { icon: icons.css, name: "CSS" },
                    { icon: icons.react, name: "React.js" },
                    { icon: icons.node, name: "Node.js" },
                    { icon: icons.aspnet, name: "ASP.NET" },
                    { icon: icons.next, name: "Next.js" },
                    { icon: icons.tailwind, name: "Tailwind CSS" }
                ].map((skill, index) => (
                    <div
                        key={index}
                        className="border-2 border-transparent hover:border-[var(--text-color)] hover:bg-[var(--background-color)] hover:shadow-[4px_4px_var(--box-shadow-color)] hover:translate-x-1 transition-all duration-400 rounded-lg"
                    >
                        <SkillList src={skill.icon} skill={skill.name} />
                    </div>
                ))}
            </div>

            <hr className="w-[80px] h-[1px] border-none bg-current mx-auto my-[20px] transition-all duration-400 opacity-50 hover:w-[120px] md:w-[300px] md:my-[30px] md:hover:w-[400px] hover:opacity-100" />

            <div className="skills-list flex justify-center self-center flex-wrap gap-[8px] md:gap-[10px] lg:gap-5 row-gap-4 md:row-gap-4 lg:row-gap-5 w-full max-w-full md:max-w-[450px] lg:max-w-fit relative p-2 hover:cursor-default">
                {[
                    { icon: icons.python, name: "Python" },
                    { icon: icons.java, name: "Java" },
                    { icon: icons.r, name: "R" },
                    { icon: icons.cpp, name: "C++" },
                    { icon: icons.javascript, name: "JavaScript" },
                    { icon: icons.sql, name: "SQL" },
                    { icon: icons.csharp, name: "C#" },
                    { icon: icons.typescript, name: "TypeScript" }
                ].map((skill, index) => (
                    <div
                        key={index}
                        className="border-2 border-transparent hover:border-[var(--text-color)] hover:bg-[var(--background-color)] hover:shadow-[4px_4px_var(--box-shadow-color)] hover:translate-x-1 transition-all duration-400 rounded-lg"
                    >
                        <SkillList src={skill.icon} skill={skill.name} />
                    </div>
                ))}
            </div>

            <hr className="w-[80px] h-[1px] border-none bg-current mx-auto my-[20px] transition-all duration-400 opacity-50 hover:w-[120px] md:w-[300px] md:my-[30px] md:hover:w-[400px] hover:opacity-100" />

            <div className="skills-list flex justify-center self-center flex-wrap gap-[8px] md:gap-[10px] lg:gap-5 row-gap-4 md:row-gap-4 lg:row-gap-5 w-full max-w-full md:max-w-[450px] lg:max-w-fit relative p-2 hover:cursor-default">
                {[
                    { icon: icons.pandas, name: "Pandas" },
                    { icon: icons.tensorflow, name: "TensorFlow" },
                    { icon: icons.numpy, name: "NumPy" },
                    { icon: icons.git, name: "Git" },
                    { icon: icons.scikitLearn, name: "Scikit-learn" }
                ].map((skill, index) => (
                    <div
                        key={index}
                        className="border-2 border-transparent hover:border-[var(--text-color)] hover:bg-[var(--background-color)] hover:shadow-[4px_4px_var(--box-shadow-color)] hover:translate-x-1 transition-all duration-400 rounded-lg"
                    >
                        <SkillList src={skill.icon} skill={skill.name} />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .skills-list:hover > div:not(:hover) {
                    opacity: 1 !important;
                    filter: none !important;
                    transform: none !important;
                }
            `}</style>
        </section>
    );
};

export default Skills; 