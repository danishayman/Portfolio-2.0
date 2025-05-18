'use client';

import { useTheme } from '../common/ThemeContext';
import SkillList from '../common/SkillList';

// Import all skill icons
import htmlIconDark from '../../public/assets/html-dark.svg';
import htmlIconLight from '../../public/assets/html-light.svg';
import cssIconDark from '../../public/assets/css-dark.svg';
import cssIconLight from '../../public/assets/css-light.svg';
import javascriptIconDark from '../../public/assets/javascript-dark.svg';
import javascriptIconLight from '../../public/assets/javascript-light.svg';
import pythonIconDark from '../../public/assets/python-dark.svg';
import pythonIconLight from '../../public/assets/python-light.svg';
import javaIconDark from '../../public/assets/java-dark.svg';
import javaIconLight from '../../public/assets/java-light.svg';
import cppIconDark from '../../public/assets/cpp-dark.svg';
import cppIconLight from '../../public/assets/cpp-light.svg';
import sqlIconDark from '../../public/assets/sql-dark.svg';
import sqlIconLight from '../../public/assets/sql-light.svg';
import pandasIconDark from '../../public/assets/pandas-dark.svg';
import pandasIconLight from '../../public/assets/pandas-light.svg';
import numpyIconDark from '../../public/assets/numpy-dark.svg';
import numpyIconLight from '../../public/assets/numpy-light.svg';
import gitIconDark from '../../public/assets/git-dark.svg';
import gitIconLight from '../../public/assets/git-light.svg';
import tensorflowIconDark from '../../public/assets/tensorflow-dark.svg';
import tensorflowIconLight from '../../public/assets/tensorflow-light.svg';
import scikitLearnIconDark from '../../public/assets/scikit-learn-dark.svg';
import scikitLearnIconLight from '../../public/assets/scikit-learn-light.svg';
import reactIconDark from '../../public/assets/react-dark.svg';
import reactIconLight from '../../public/assets/react-light.svg';
import nodeIconDark from '../../public/assets/node-dark.svg';
import nodeIconLight from '../../public/assets/node-light.svg';
import csharpIconDark from '../../public/assets/csharp-dark.svg';
import csharpIconLight from '../../public/assets/csharp-light.svg';
import aspnetIconLight from '../../public/assets/aspnet-light.svg';
import aspnetIconDark from '../../public/assets/aspnet-dark.svg';
import rIconLight from '../../public/assets/r-light.svg';
import rIconDark from '../../public/assets/r-dark.svg';
import npmIconLight from '../../public/assets/npm-light.svg';
import npmIconDark from '../../public/assets/npm-dark.svg';
import nextjsIconLight from '../../public/assets/next-light.svg';
import nextjsIconDark from '../../public/assets/next-dark.svg';
import tailwindIconLight from '../../public/assets/tailwind-light.svg';
import tailwindIconDark from '../../public/assets/tailwind-dark.svg';
import typescriptIconLight from '../../public/assets/typescript-light.svg';
import typescriptIconDark from '../../public/assets/typescript-dark.svg';

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
        npm: theme === 'light' ? npmIconLight : npmIconDark,
        next: theme === 'light' ? nextjsIconLight : nextjsIconDark,
        tailwind: theme === 'light' ? tailwindIconLight : tailwindIconDark,
        typescript: theme === 'light' ? typescriptIconLight : typescriptIconDark,
    };

    return (
        <section id="skills" className="flex flex-col text-center p-6 md:p-8 lg:p-16 py-16 md:py-24 min-h-[650px] md:min-h-[750px] lg:min-h-[800px] justify-center gap-6 md:gap-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="section-header">
                <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">SKILLS</h1>
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
                    { icon: icons.npm, name: "npm" },
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