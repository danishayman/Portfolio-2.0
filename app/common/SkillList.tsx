'use client';

import Image from 'next/image';

interface SkillListProps {
    src: string;
    skill: string;
}

const SkillList: React.FC<SkillListProps> = ({ src, skill }) => {
    return (
        <span className="flex items-center gap-[7px] p-3 md:px-3 lg:px-4 rounded-lg mx-1 group">
            <div className="relative w-5 md:w-[18px] lg:w-5 h-5 md:h-[18px] lg:h-5 flex items-center justify-center overflow-visible">
                <Image 
                    src={src} 
                    alt={`${skill} icon`} 
                    width={20} 
                    height={20} 
                    className="w-full h-full transition-transform duration-400 group-hover:scale-[1.2] group-hover:rotate-[5deg]" 
                />
            </div>
            <p className="text-sm md:text-sm lg:text-base font-medium">{skill}</p>
        </span>
    );
};

export default SkillList;