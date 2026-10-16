'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { ACCENT_BG, pad2 } from '../common/palette';

interface Education {
    institution: string;
    degree: string;
    duration: string;
    achievements: string[];
    locationUrl: string;
}

// Chronological; the map renders it newest-first, so START sits at the bottom
const educationData: Education[] = [
    {
        institution: "SK Bayan Lepas",
        degree: "Science Stream",
        duration: "Jan 2010 - Dec 2015",
        achievements: ["UPSR: 5A"],
        locationUrl: "https://maps.app.goo.gl/hiYd2eQftj89ybqk9",
    },
    {
        institution: "SMK Bukit Jambul, High Performance School",
        degree: "Science Stream",
        duration: "Jan 2016 - Dec 2020",
        achievements: ["SPM: 3A+ 4A"],
        locationUrl: "https://maps.app.goo.gl/QERhYno7k1tQ9oTq6",
    },
    {
        institution: "Penang Matriculation College",
        degree: "Physical Science",
        duration: "July 2021 - July 2022",
        achievements: ["CGPA: 3.92"],
        locationUrl: "https://maps.app.goo.gl/ZeaWPBFXrKfcamNp7",
    },
    {
        institution: "Universiti Sains Malaysia",
        degree: "Bachelor of Computer Science (Honours)\n(Intelligent Computing)",
        duration: "Oct 2022 - Oct 2026",
        achievements: ["CGPA: 3.48"],
        locationUrl: "https://maps.app.goo.gl/owBxR3XgcNFUQSZu7",
    },
];

/* ---------- 8-bit sprites ---------- */

// One character per pixel; '.' is transparent. 'k' follows the theme ink so it shows against
// the map; 'o' stays dark in both themes for outlines and details drawn over light fills.
const PIXEL_FILL: Record<string, string> = {
    k: 'fill-nb-ink',
    o: 'fill-nb-on',
    w: 'fill-white',
    g: 'fill-nb-green',
    s: 'fill-nb-sky',
    p: 'fill-nb-pink',
    y: 'fill-nb-yellow',
    e: 'fill-nb-silver',
};

const TREE = [
    '...kkkk...',
    '..kggggk..',
    '.kgwggggk.',
    'kgwggggggk',
    'kggggggggk',
    'kggggggggk',
    '.kggggggk.',
    '..kkkkkk..',
    '....kk....',
    '....kk....',
    '...kkkk...',
];

const POND = [
    '..kkkkkkkk..',
    '.kssssssssk.',
    'ksswwssssssk',
    'kssssssswwsk',
    '.kssssssssk.',
    '..kkkkkkkk..',
];

const CASTLE = [
    '......kppp...',
    '......kpp....',
    '......k......',
    'k.k.k.k.k.k.k',
    'kkkkkkkkkkkkk',
    'oeeeeeeeeeeeo',
    'oeeoeeeeeoeeo',
    'oeeeeeeeeeeeo',
    'oeeeeoooeeeeo',
    'oeeeeoooeeeeo',
    'oeeeeoooeeeeo',
    'ooooooooooooo',
];

const PLAYER = [
    '..oooo..',
    '.oppppo.',
    'kkkkkkkk',
    '.owwwwo.',
    '.owowoo.',
    '.owwwwo.',
    '..oooo..',
    '.osssso.',
    'osssssso',
    '.osssso.',
    '.kk..kk.',
];

function Sprite({ rows, px = 4, className = '' }: { rows: string[]; px?: number; className?: string }) {
    const w = rows[0].length;
    const h = rows.length;
    return (
        <svg
            width={w * px}
            height={h * px}
            viewBox={`0 0 ${w} ${h}`}
            shapeRendering="crispEdges"
            aria-hidden="true"
            className={className}
        >
            {rows.flatMap((row, y) =>
                [...row].map((c, x) =>
                    c === '.' ? null : (
                        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className={PIXEL_FILL[c]} />
                    ),
                ),
            )}
        </svg>
    );
}

// Scenery for the empty side of each map row (lg+ only)
const SCENERY = [
    <div key="start" className="flex items-end gap-3"><Sprite rows={TREE} /><Sprite rows={TREE} px={3} /></div>,
    <Sprite key="pond" rows={POND} px={5} />,
    <div key="grove" className="flex items-end gap-2"><Sprite rows={TREE} px={3} /><Sprite rows={TREE} /><Sprite rows={TREE} px={3} /></div>,
    <div key="lake" className="flex items-end gap-4"><Sprite rows={TREE} px={3} /><Sprite rows={POND} px={4} /></div>,
    <Sprite key="castle" rows={CASTLE} px={6} />,
];

/* ---------- trail geometry ---------- */

type Pt = [number, number];

// Right-angle road from one node to the next: a two-step staircase across the lane,
// landing in the gap between rows. When both nodes share a column (mobile), jog
// sideways instead so the trail still winds.
function route(a: Pt, b: Pt, midY: number, flip: boolean): Pt[] {
    const [ax, ay] = a;
    const [bx, by] = b;
    if (Math.abs(ax - bx) > 4) {
        const mx = Math.round((ax + bx) / 2);
        const y1 = Math.round((ay + midY) / 2);
        return [a, [ax, y1], [mx, y1], [mx, midY], [bx, midY], b];
    }

    const jog = flip ? -14 : 14;
    const y1 = Math.round(ay + (by - ay) * 0.4);
    const y2 = Math.round(ay + (by - ay) * 0.7);
    return [a, [ax, y1], [ax + jog, y1], [ax + jog, y2], [ax, y2], b];
}

const toPoints = (pts: Pt[]) => pts.map((p) => p.join(',')).join(' ');

/* ---------- layout ---------- */

const NODE = 'relative w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 border-[3px] border-nb-ink grid place-items-center';

// Below lg: node gutter + card. lg+: card | winding road lane | scenery, sides alternating per row.
function MapRow({ cardLeft, node, scenery, children }: {
    cardLeft: boolean;
    node: React.ReactNode;
    scenery: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <li className="relative flex gap-3 sm:gap-4 lg:grid lg:grid-cols-[1fr_240px_1fr] lg:gap-0">
            <div className={`shrink-0 w-11 sm:w-16 flex justify-center items-start lg:w-auto lg:px-4 lg:col-start-2 lg:row-start-1 ${cardLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                {node}
            </div>
            <div className={`flex-1 min-w-0 lg:row-start-1 ${cardLeft ? 'lg:col-start-1' : 'lg:col-start-3'}`}>{children}</div>
            <div
                className={`hidden lg:flex items-center justify-center lg:row-start-1 ${cardLeft ? 'lg:col-start-3' : 'lg:col-start-1'}`}
                aria-hidden="true"
            >
                {scenery}
            </div>
        </li>
    );
}

const Education: React.FC = () => {
    const listRef = useRef<HTMLOListElement>(null);
    const [trail, setTrail] = useState<string | null>(null);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const measure = () => {
            const box = list.getBoundingClientRect();
            const stops = [...list.querySelectorAll<HTMLElement>(':scope > li')].map((li) => {
                const row = li.getBoundingClientRect();
                const node = li.querySelector<HTMLElement>('[data-node]')!.getBoundingClientRect();
                return {
                    at: [
                        Math.round(node.left + node.width / 2 - box.left),
                        Math.round(node.top + node.height / 2 - box.top),
                    ] as Pt,
                    top: row.top - box.top,
                    bottom: row.bottom - box.top,
                };
            });

            const legs = stops.slice(1).map((b, i) => {
                const a = stops[i];
                return route(a.at, b.at, Math.round((a.bottom + b.top) / 2), i % 2 === 1);
            });

            setTrail(toPoints(legs.flat()));
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(list);
        return () => ro.disconnect();
    }, []);

    const current = educationData.length - 1;

    return (
        <section id="education" className="max-w-[1200px] mx-auto px-6 py-12 sm:py-[72px]">
            <SectionHeader
                stage="STAGE 1-1"
                title="EDUCATION"
                meta={`${educationData.length} LEVELS · ${current} CLEARED`}
            />

            {/* In-game map screen */}
            <div className="border-[3px] border-nb-ink shadow-hard-8 bg-nb-map">
                <div className="bg-nb-panel text-white border-b-[3px] border-nb-ink px-4 py-3 flex flex-wrap justify-between items-center gap-x-6 gap-y-2 font-pixel text-[10px]">
                    <span className="text-nb-yellow">WORLD 1 · ACADEMY</span>
                    <span className="hidden sm:flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 bg-nb-green" />CLEARED</span>
                        <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 bg-nb-pink" />YOU ARE HERE</span>
                    </span>
                </div>

                <div className="nb-grid px-3 pt-12 pb-8 sm:px-4 sm:py-12 md:px-8 md:py-16">
                    <ol ref={listRef} className="relative max-w-[1080px] mx-auto flex flex-col gap-7 sm:gap-12 md:gap-16">
                        {/* Road: a paved path joining every level */}
                        {trail && (
                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
                                <g fill="none" strokeLinejoin="miter">
                                    <polyline points={trail} className="stroke-nb-ink" strokeWidth={22} strokeLinecap="square" />
                                    <polyline points={trail} className="stroke-nb-card" strokeWidth={14} strokeLinecap="square" />
                                    <polyline points={trail} className="stroke-nb-ink" strokeWidth={4} strokeDasharray="8 8" />
                                </g>
                            </svg>
                        )}

                        {[...educationData].reverse().map((edu, r) => {
                            const i = educationData.length - 1 - r;
                            const num = pad2(i + 1);
                            const accent = ACCENT_BG[i % ACCENT_BG.length];
                            const here = i === current;

                            return (
                                <MapRow
                                    key={edu.institution}
                                    cardLeft={i % 2 === 0}
                                    scenery={SCENERY[i + 1]}
                                    node={
                                        <div data-node className={`${NODE} ${accent} text-nb-on shadow-hard-4 font-pixel text-sm md:text-base`}>
                                            {i + 1}
                                            {here ? (
                                                <Sprite
                                                    rows={PLAYER}
                                                    px={4}
                                                    className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-6 h-[33px] sm:w-8 sm:h-11 motion-safe:animate-hop"
                                                />
                                            ) : (
                                                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-nb-green border-2 border-nb-ink grid place-items-center text-[9px] leading-none">
                                                    ✓
                                                </span>
                                            )}
                                        </div>
                                    }
                                >
                                    <a
                                        href={edu.locationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col bg-nb-card border-[3px] border-nb-ink shadow-hard-4 sm:shadow-hard-6 text-nb-ink transition-[translate,rotate,scale,box-shadow] duration-120 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-hard-9"
                                    >
                                        <div className={`${accent} text-nb-on border-b-[3px] border-nb-ink px-3 sm:px-4 py-2 sm:py-3 flex flex-wrap justify-between items-center gap-x-3 gap-y-2`}>
                                            {/* Two nowrap halves so a narrow card breaks at the dot, not mid-label.
                                                Phones drop the status: the node's check mark or player already shows it. */}
                                            <span className="font-pixel text-[10px] flex flex-wrap gap-x-[1ch] gap-y-1.5">
                                                <span className="whitespace-nowrap">LV {num}<span className="hidden sm:inline"> ·</span></span>
                                                <span className="hidden sm:inline whitespace-nowrap">{here ? '▶ YOU ARE HERE' : '✓ CLEARED'}</span>
                                            </span>
                                            <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">{edu.duration}</span>
                                        </div>
                                        <div className="px-3 py-3 sm:px-[18px] sm:py-5 flex flex-col gap-1.5 sm:gap-3 flex-1">
                                            <h3 className="font-rubik font-bold text-base sm:text-[22px] leading-[1.2] text-balance">{edu.institution}</h3>
                                            <p className="text-xs sm:text-sm leading-normal whitespace-pre-line">{edu.degree}</p>
                                            <div className="mt-auto pt-1.5 sm:pt-2 flex flex-wrap justify-between items-center gap-2">
                                                {edu.achievements.map((a) => (
                                                    <span key={a} className="font-pixel text-[9px] sm:text-[10px] leading-normal bg-nb-panel text-nb-yellow px-2 py-1.5 sm:px-2.5 sm:py-2">
                                                        ★ {a}
                                                    </span>
                                                ))}
                                                <span className="text-xs font-bold whitespace-nowrap">MAP ↗<span className="sr-only"> (opens Google Maps)</span></span>
                                            </div>
                                        </div>
                                    </a>
                                </MapRow>
                            );
                        })}

                        <MapRow
                            cardLeft={false}
                            scenery={SCENERY[0]}
                            node={
                                <div data-node className={`${NODE} bg-nb-panel text-nb-yellow shadow-hard-4 font-pixel text-[7px] sm:text-[8px] md:text-[10px]`}>
                                    START
                                </div>
                            }
                        >
                            <div className="h-11 sm:h-12 md:h-16 flex items-center">
                                <span className="font-pixel text-[9px] sm:text-[10px] leading-normal bg-nb-card border-[3px] border-nb-ink px-3 py-2">
                                    PLAYER 0 SPAWNED · 2015
                                </span>
                            </div>
                        </MapRow>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Education;
