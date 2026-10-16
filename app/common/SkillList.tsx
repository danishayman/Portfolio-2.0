import Image from 'next/image';

interface SkillListProps {
    src: string;
    skill: string;
    // Literal hover class from palette.ts, e.g. 'hover:bg-nb-yellow'
    hoverBg: string;
}

const SkillList: React.FC<SkillListProps> = ({ src, skill, hoverBg }) => {
    return (
        <div
            className={`group flex items-center gap-2.5 px-3.5 py-2.5 bg-nb-bg border-2 border-nb-ink shadow-hard-3 cursor-default transition-[transform,box-shadow,background-color] duration-100 ${hoverBg} hover:text-nb-on hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-5`}
        >
            {/* Icons are solid black: invert on the dark chip, back to black on the accent hover */}
            <Image src={src} alt="" width={20} height={20} className="w-5 h-5 dark:invert dark:group-hover:invert-0" />
            <span className="text-sm font-medium">{skill}</span>
        </div>
    );
};

export default SkillList;
