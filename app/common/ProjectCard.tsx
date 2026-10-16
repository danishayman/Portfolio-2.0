import Image from 'next/image';

interface ProjectCardProps {
    src: string;
    link: string;
    h3: string;
    p: string;
    num: string;
    // Literal background class from palette.ts, e.g. 'bg-nb-yellow'
    color: string;
}

const cardClass =
    'flex flex-col bg-nb-card border-[3px] border-nb-ink shadow-hard-6 text-nb-ink transition-[translate,rotate,scale,box-shadow] duration-120 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:rotate-[-0.6deg] hover:shadow-hard-9';

export default function ProjectCard({ src, link, h3, p, num, color }: ProjectCardProps) {
    const body = (
        <>
            <div className={`relative ${color} p-4 border-b-[3px] border-nb-ink`}>
                <span className="absolute top-0 left-0 font-pixel text-[8px] bg-nb-panel text-white px-[7px] py-1.5">#{num}</span>
                <div className="relative aspect-square bg-white border-2 border-nb-on p-3.5">
                    <div className="relative w-full h-full">
                        <Image
                            src={src}
                            alt={h3}
                            fill
                            sizes="(max-width: 640px) 80vw, 250px"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2.5 flex-1">
                <h3 className="font-rubik font-bold text-lg leading-[1.2] text-balance">{h3}</h3>
                <span className="mt-auto self-start text-[11px] font-bold uppercase tracking-[0.04em] border-2 border-nb-ink px-2 py-1">
                    {p}
                </span>
            </div>
        </>
    );

    // Projects without a public link still get the card, just not as an anchor
    if (!link) return <div className={cardClass}>{body}</div>;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={cardClass}>
            {body}
        </a>
    );
}
