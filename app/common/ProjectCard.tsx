import { ReactNode } from 'react';
import Link from 'next/link';

interface ProjectCardProps {
    src: string;
    link: string;
    h3: ReactNode;
    p: string;
}

export default function ProjectCard({ src, link, h3, p }: ProjectCardProps) {
    return (
        <Link 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center w-[280px] h-[350px] mb-5 text-current no-underline transition-transform duration-200 ease-in-out hover:scale-[1.03]"
        >
            <img 
                src={src} 
                alt={typeof h3 === 'string' ? `${h3} logo` : 'Project logo'} 
                className="w-[230px] h-[230px] object-contain self-center bg-project-card-bg rounded-2xl p-[15px]"
            />
            <h3 className="my-[15px] mt-[15px] mb-[10px] min-h-[48px] w-[230px] flex items-center justify-center text-center text-balance text-xl md:text-2xl font-bold">{h3}</h3>
            <p className="m-0 pt-2 min-h-[24px] w-[230px] flex items-center justify-center text-[1rem] font-medium">{p}</p>
        </Link>
    );
}