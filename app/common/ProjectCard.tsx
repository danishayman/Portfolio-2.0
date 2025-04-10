import React, { ReactNode } from 'react';

interface ProjectCardProps {
    src: string;
    link: string;
    h3: ReactNode;
    p: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ src, link, h3, p }) => {
    return (
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center w-[250px] h-[330px] mb-5 text-current no-underline transition-transform duration-200 ease-in-out hover:scale-[1.03]"
        >
            <img 
                src={src} 
                alt={typeof h3 === 'string' ? `${h3} logo` : 'Project logo'} 
                className="w-[200px] h-[200px] object-contain self-center bg-project-card-bg rounded-2xl p-[15px]"
            />
            <h3 className="my-[15px] mt-[15px] mb-[10px] min-h-[48px] w-[200px] flex items-center justify-center text-balance text-[1.1rem]">{h3}</h3>
            <p className="m-0 pt-2 min-h-[24px] w-[200px] flex items-center justify-center text-[0.9rem]">{p}</p>
        </a>
    );
};

export default ProjectCard;