interface SectionHeaderProps {
    stage: string;
    title: string;
    meta: string;
}

export default function SectionHeader({ stage, title, meta }: SectionHeaderProps) {
    return (
        <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left gap-4 flex-wrap border-b-[3px] border-nb-ink pb-[18px] mb-10">
            <div className="flex flex-col items-center md:items-start gap-4">
                <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-[9px] py-[7px]">
                    {stage}
                </span>
                <h2 className="font-pixel font-normal text-[clamp(24px,4vw,40px)] leading-[1.2]">{title}</h2>
            </div>
            <span className="font-pixel text-[10px]">{meta}</span>
        </div>
    );
}
