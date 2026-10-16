'use client';

import { useState } from 'react';
import ProjectCard from '../common/ProjectCard';
import SectionHeader from '../common/SectionHeader';
import { ACCENT_BG, pad2 } from '../common/palette';

const projects = [
    { src: "/projects/water.webp", link: "https://wmw-usm.netlify.app", h3: "Wheres My Water?", p: "USM Water Filter Finder" },
    { src: "/projects/usm.webp", link: "https://usm.danishaiman.com", h3: "USM T&L Week", p: "USM Academic Calendar" },
    { src: "/projects/f22.webp", link: "https://f22-raptor.vercel.app/", h3: "Lockheed Martin F-22 Raptor", p: "DIY RC Plane" },
    { src: "/projects/chesayang.webp", link: "https://resepi-chesayang.vercel.app/", h3: "Resepi Che Sayang Kitchen", p: "Data Scraping Project" },
    { src: "/projects/awards.webp", link: "https://bobo-game-awards.vercel.app/", h3: "Bobo Game Awards", p: "Game Awards Platform" },
    { src: "/projects/khairulaming.webp", link: "https://www.resepika.my/", h3: "Resepi Khairul Aming", p: "Data Scraping Project" },
    { src: "/projects/sgl.webp", link: "https://www.spudingamelist.my/", h3: "Spudin Game List", p: "Game Rating Platform" },
    { src: "/projects/ronaldo.webp", link: "https://ronaldo-bot.vercel.app/", h3: "CR7 Hydration Discord Bot", p: "“No Coke, Water!”" },
    { src: "/projects/ehs.webp", link: "https://github.com/danishayman/EHS_PORTAL", h3: "Environment, Health & Safety Portal", p: "ASP.NET Application" },
    { src: "/projects/homestay.webp", link: "https://tuahsuci.vercel.app/", h3: "Tuah Suci Homestay", p: "Next.js Application" },
    { src: "/projects/fets.webp", link: "https://github.com/danishayman/FireExtinguisherTrackingSystem", h3: "Fire Extinguisher Tracking System", p: "ASP.NET Application" },
    { src: "/projects/bird.webp", link: "https://github.com/danishayman/Flappy-Bird-AI", h3: "Flappy Bird AI", p: "Neural Network Model" },
    { src: "/projects/teapot.webp", link: "https://danishayman.github.io/3D-Objects-Playground/", h3: "3D Objects Playground", p: "WebGL Application" },
    { src: "/projects/speaker.webp", link: "https://github.com/danishayman/Speaker-Change-Detection/blob/main/Speaker-Change-Detection.ipynb", h3: "Speaker Change Detection", p: "Neural Network Model" },
    { src: "/projects/rainmeter.webp", link: "", h3: "Code Geass Rainmeter Skin", p: "My Rainmeter Setup" },
    { src: "/projects/law.webp", link: "https://github.com/danishayman/Law-Firm-Management", h3: "Law Firm Management", p: "JavaFx Application" },
    { src: "/projects/gasket.webp", link: "https://danishayman.github.io/3D-Sierpinski-Gasket/", h3: "3D Sierpinski Gasket", p: "WebGL Application" },
    { src: "/projects/creditcard.webp", link: "https://github.com/danishayman/Credit-Card-Fraud-Detection/blob/main/FraudDetection.ipynb", h3: "Credit Card Fraud Detection", p: "Machine Learning Model" },
];

const INITIAL_SHOWN = 8;

export default function Projects() {
    const [showAll, setShowAll] = useState(false);
    const shown = showAll ? projects : projects.slice(0, INITIAL_SHOWN);
    const hidden = projects.length - INITIAL_SHOWN;

    return (
        <section id="projects" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader stage="STAGE 1-3" title="PROJECTS" meta={`${projects.length} ITEMS IN INVENTORY`} />

            <div className="max-w-[280px] mx-auto md:max-w-none grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-7">
                {shown.map((project, i) => (
                    <ProjectCard
                        key={project.src}
                        {...project}
                        num={pad2(i + 1)}
                        color={ACCENT_BG[i % ACCENT_BG.length]}
                    />
                ))}
            </div>

            {hidden > 0 && (
                <div className="flex justify-center mt-11">
                    <button
                        type="button"
                        onClick={() => setShowAll((v) => !v)}
                        className="font-pixel text-[11px] bg-nb-yellow text-nb-on px-5 py-4 border-[3px] border-nb-ink shadow-hard-6 cursor-pointer transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-8 active:translate-x-1.5 active:translate-y-1.5 active:shadow-hard-0"
                    >
                        {showAll ? '▲ SHOW LESS' : `▼ LOAD ${hidden} MORE`}
                    </button>
                </div>
            )}
        </section>
    );
}
