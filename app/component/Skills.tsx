'use client';

import { useTheme } from '../common/ThemeContext';
import SkillList from '../common/SkillList';

// Import all skill icons
import htmlIconDark from '../../public/skills/html-dark.svg';
import htmlIconLight from '../../public/skills/html-light.svg';
import cssIconDark from '../../public/skills/css-dark.svg';
import cssIconLight from '../../public/skills/css-light.svg';
import javascriptIconDark from '../../public/skills/javascript-dark.svg';
import javascriptIconLight from '../../public/skills/javascript-light.svg';
import pythonIconDark from '../../public/skills/python-dark.svg';
import pythonIconLight from '../../public/skills/python-light.svg';
import javaIconDark from '../../public/skills/java-dark.svg';
import javaIconLight from '../../public/skills/java-light.svg';
import cppIconDark from '../../public/skills/cpp-dark.svg';
import cppIconLight from '../../public/skills/cpp-light.svg';
import sqlIconDark from '../../public/skills/sql-dark.svg';
import sqlIconLight from '../../public/skills/sql-light.svg';
import pandasIconDark from '../../public/skills/pandas-dark.svg';
import pandasIconLight from '../../public/skills/pandas-light.svg';
import numpyIconDark from '../../public/skills/numpy-dark.svg';
import numpyIconLight from '../../public/skills/numpy-light.svg';
import gitIconDark from '../../public/skills/git-dark.svg';
import gitIconLight from '../../public/skills/git-light.svg';
import tensorflowIconDark from '../../public/skills/tensorflow-dark.svg';
import tensorflowIconLight from '../../public/skills/tensorflow-light.svg';
import scikitLearnIconDark from '../../public/skills/scikit-learn-dark.svg';
import scikitLearnIconLight from '../../public/skills/scikit-learn-light.svg';
import reactIconDark from '../../public/skills/react-dark.svg';
import reactIconLight from '../../public/skills/react-light.svg';
import nodeIconDark from '../../public/skills/node-dark.svg';
import nodeIconLight from '../../public/skills/node-light.svg';
import csharpIconDark from '../../public/skills/csharp-dark.svg';
import csharpIconLight from '../../public/skills/csharp-light.svg';
import aspnetIconLight from '../../public/skills/aspnet-light.svg';
import aspnetIconDark from '../../public/skills/aspnet-dark.svg';
import rIconLight from '../../public/skills/r-light.svg';
import rIconDark from '../../public/skills/r-dark.svg';
import nextjsIconLight from '../../public/skills/next-light.svg';
import nextjsIconDark from '../../public/skills/next-dark.svg';
import tailwindIconLight from '../../public/skills/tailwind-light.svg';
import tailwindIconDark from '../../public/skills/tailwind-dark.svg';
import typescriptIconLight from '../../public/skills/typescript-light.svg';
import typescriptIconDark from '../../public/skills/typescript-dark.svg';

const Skills: React.FC = () => {
    const { theme } = useTheme();

    // Theme-based icon selection for each skill
    const icons = {
        html: theme === 'light' ? htmlIconLight : htmlIconDark,
        css: theme === 'light' ? cssIconLight : cssIconDark,
        javascript: theme === 'light' ? javascriptIconLight : javascriptIconDark,
        python: theme === 'light' ? pythonIconLight : pythonIconDark,
        java: theme === 'light' ? javaIconLight : javaIconDark,
        cpp: theme === 'light' ? cppIconLight : cppIconDark,
        sql: theme === 'light' ? sqlIconLight : sqlIconDark,
        pandas: theme === 'light' ? pandasIconLight : pandasIconDark,
        numpy: theme === 'light' ? numpyIconLight : numpyIconDark,
        git: theme === 'light' ? gitIconLight : gitIconDark,
        tensorflow: theme === 'light' ? tensorflowIconLight : tensorflowIconDark,
        scikitLearn: theme === 'light' ? scikitLearnIconLight : scikitLearnIconDark,
        react: theme === 'light' ? reactIconLight : reactIconDark,
        node: theme === 'light' ? nodeIconLight : nodeIconDark,
        csharp: theme === 'light' ? csharpIconLight : csharpIconDark,
        aspnet: theme === 'light' ? aspnetIconLight : aspnetIconDark,
        r: theme === 'light' ? rIconLight : rIconDark,
        next: theme === 'light' ? nextjsIconLight : nextjsIconDark,
        tailwind: theme === 'light' ? tailwindIconLight : tailwindIconDark,
        typescript: theme === 'light' ? typescriptIconLight : typescriptIconDark,
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