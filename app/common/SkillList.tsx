'use client';

import Image from 'next/image';

interface SkillListProps {
    src: string;
    skill: string;
}

const SkillList: React.FC<SkillListProps> = ({ src, skill }) => {
    return (
        <span className="flex items-center gap-[5px] p-2 md:px-3 lg:px-4 rounded-lg mx-1 group">
            <div className="relative overflow-hidden">
                <Image 
                    src={src} 
                    alt={`${skill} icon`} 
                    width={20} 
                    height={20} 
                    className="w-4 md:w-[18px] lg:w-5 transition-transform duration-400 group-hover:scale-[1.2] group-hover:rotate-[5deg]" 
                />
            </div>
            <p className="text-sm md:text-base lg:text-lg">{skill}</p>
        </span>
    );
};

export default SkillList;