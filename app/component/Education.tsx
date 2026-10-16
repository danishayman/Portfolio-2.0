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

// Chronological: the map is walked from START down to the level in progress
const educationData: Education[] = [
    {
        institution: "SMK Bukit Jambul, High Performance School",
        degree: "Science Stream",
        duration: "Jan 2015 - Dec 2020",
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
        duration: "Oct 2022 - Present",
        achievements: ["Current CGPA: 3.42"],
        locationUrl: "https://maps.app.goo.gl/owBxR3XgcNFUQSZu7",
    },
];

/* ---------- 8-bit sprites ---------- */

// One character per pixel; '.' is transparent
const PIXEL_FILL: Record<string, string> = {
    k: 'fill-nb-ink',
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
    'keeeeeeeeeeek',
    'keekeeeeekeek',
    'keeeeeeeeeeek',
    'keeeekkkeeeek',
    'keeeekkkeeeek',
    'keeeekkkeeeek',
    'kkkkkkkkkkkkk',
];

const PLAYER = [
    '..kkkk..',
    '.kppppk.',
    'kkkkkkkk',
    '.kwwwwk.',
    '.kwkwkk.',
    '.kwwwwk.',
    '..kkkk..',
    '.kssssk.',
    'kssssssk',
    '.kssssk.',
    '.kk..kk.',
];

const LOCK = [
    '..kkk..',
    '.k...k.',
    '.k...k.',
    'kkkkkkk',
    'kyyyyyk',
    'kyykyyk',
    'kyyyyyk',
    'kkkkkkk',
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
    <Sprite key="castle" rows={CASTLE} px={5} />,
];

/* ---------- trail geometry ---------- */

type Pt = [number, number];

// Right-angle road from one node to the next, turning in the gap between rows.
// When both nodes share a column (mobile), jog sideways so the trail still winds.
function route(a: Pt, b: Pt, midY: number, flip: boolean): Pt[] {
    const [ax, ay] = a;
    const [bx, by] = b;
    if (Math.abs(ax - bx) > 4) return [a, [ax, midY], [bx, midY], b];

    const jog = flip ? -14 : 14;
    const y1 = Math.round(ay + (by - ay) * 0.4);
    const y2 = Math.round(ay + (by - ay) * 0.7);
    return [a, [ax, y1], [ax + jog, y1], [ax + jog, y2], [ax, y2], b];
}

const toPoints = (pts: Pt[]) => pts.map((p) => p.join(',')).join(' ');

/* ---------- layout ---------- */

const NODE = 'relative w-12 h-12 md:w-16 md:h-16 border-[3px] border-nb-ink grid place-items-center';

function MapRow({ right, node, scenery, children }: {
    right: boolean;
    node: React.ReactNode;
    scenery: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <li className={`relative flex gap-4 md:gap-6 ${right ? 'md:flex-row-reverse' : ''}`}>
            <div className="shrink-0 w-16 md:w-[120px] flex justify-center items-start">{node}</div>
            <div className="flex-1 min-w-0 md:flex-[0_1_540px]">{children}</div>
            <div className="hidden lg:flex flex-1 items-center justify-center" aria-hidden="true">{scenery}</div>
        </li>
    );
}

const Education: React.FC = () => {
    const listRef = useRef<HTMLOListElement>(null);
    const [trail, setTrail] = useState<{ walked: string; ahead: string } | null>(null);

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

            setTrail({
                walked: toPoints(legs.slice(0, -1).flat()),
                ahead: toPoints(legs[legs.length - 1]),
            });
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(list);
        return () => ro.disconnect();
    }, []);

    const current = educationData.length - 1;

    return (
        <section id="education" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader
                stage="STAGE 1-1"
                title="EDUCATION"
                meta={`${educationData.length} LEVELS · ${current} CLEARED`}
            />

            {/* In-game map screen */}
            <div className="border-[3px] border-nb-ink shadow-hard-8 bg-nb-map">
                <div className="bg-nb-panel text-white border-b-[3px] border-nb-ink px-4 py-3 flex flex-wrap justify-between items-center gap-x-6 gap-y-2 font-pixel text-[9px]">
                    <span className="text-nb-yellow">WORLD 1 · ACADEMY</span>
                    <span className="hidden sm:flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 bg-nb-green" />CLEARED</span>
                        <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 bg-nb-pink" />YOU ARE HERE</span>
                        <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 border border-dashed border-white" />LOCKED</span>
                    </span>
                </div>

                <div className="nb-grid px-4 py-12 md:px-10 md:py-16">
                    <ol ref={listRef} className="relative max-w-[1000px] mx-auto flex flex-col gap-12 md:gap-16">
                        {/* Road: walked part is a paved path, the next leg is an unexplored dotted trail */}
                        {trail && (
                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
                                <g fill="none" strokeLinejoin="miter">
                                    <polyline points={trail.walked} className="stroke-nb-ink" strokeWidth={22} strokeLinecap="square" />
                                    <polyline points={trail.walked} className="stroke-nb-card" strokeWidth={14} strokeLinecap="square" />
                                    <polyline points={trail.walked} className="stroke-nb-ink" strokeWidth={4} strokeDasharray="8 8" />
                                    <polyline
                                        points={trail.ahead}
                                        className="stroke-nb-ink opacity-40 motion-safe:animate-march"
                                        strokeWidth={8}
                                        strokeDasharray="8 10"
                                    />
                                </g>
                            </svg>
                        )}

                        <MapRow
                            right
                            scenery={SCENERY[0]}
                            node={
                                <div data-node className={`${NODE} bg-nb-panel text-nb-yellow shadow-hard-4 font-pixel text-[8px] md:text-[10px]`}>
                                    START
                                </div>
                            }
                        >
                            <div className="h-12 md:h-16 flex items-center md:justify-end">
                                <span className="font-pixel text-[9px] md:text-[10px] bg-nb-card border-[3px] border-nb-ink px-3 py-2">
                                    PLAYER 1 SPAWNED · 2015
                                </span>
                            </div>
                        </MapRow>

                        {educationData.map((edu, i) => {
                            const num = pad2(i + 1);
                            const accent = ACCENT_BG[i % ACCENT_BG.length];
                            const here = i === current;

                            return (
                                <MapRow
                                    key={edu.institution}
                                    right={i % 2 === 1}
                                    scenery={SCENERY[i + 1]}
                                    node={
                                        <div data-node className={`${NODE} ${accent} text-nb-on shadow-hard-4 font-pixel text-sm md:text-base`}>
                                            {i + 1}
                                            {here ? (
                                                <Sprite
                                                    rows={PLAYER}
                                                    px={3}
                                                    className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 motion-safe:animate-hop"
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
                                        aria-label={`Open ${edu.institution} on Google Maps`}
                                        className="flex flex-col bg-nb-card border-[3px] border-nb-ink shadow-hard-6 text-nb-ink transition-[translate,rotate,scale,box-shadow] duration-120 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-hard-9"
                                    >
                                        <div className={`${accent} text-nb-on border-b-[3px] border-nb-ink px-4 py-3 flex flex-wrap justify-between items-center gap-x-3 gap-y-2`}>
                                            <span className="font-pixel text-[10px] whitespace-nowrap">
                                                LV {num} · {here ? '▶ YOU ARE HERE' : '✓ CLEARED'}
                                            </span>
                                            <span className="text-xs font-bold whitespace-nowrap">{edu.duration}</span>
                                        </div>
                                        <div className="px-[18px] py-5 flex flex-col gap-3 flex-1">
                                            <h3 className="font-rubik font-bold text-[22px] leading-[1.2] text-balance">{edu.institution}</h3>
                                            <p className="text-sm leading-normal whitespace-pre-line">{edu.degree}</p>
                                            <div className="mt-auto pt-2 flex flex-wrap justify-between items-center gap-2">
                                                {edu.achievements.map((a) => (
                                                    <span key={a} className="font-pixel text-[9px] bg-nb-panel text-nb-yellow px-2.5 py-2 whitespace-nowrap">
                                                        ★ {a}
                                                    </span>
                                                ))}
                                                <span className="text-xs font-bold whitespace-nowrap">MAP ↗</span>
                                            </div>
                                        </div>
                                    </a>
                                </MapRow>
                            );
                        })}

                        <MapRow
                            right={educationData.length % 2 === 1}
                            scenery={SCENERY[educationData.length + 1]}
                            node={
                                <div data-node className={`${NODE} bg-nb-heart border-dashed`}>
                                    <Sprite rows={LOCK} px={3} />
                                </div>
                            }
                        >
                            <div className="border-[3px] border-dashed border-nb-ink px-[18px] py-5 flex flex-col gap-3">
                                <span className="font-pixel text-[10px]">LV {pad2(educationData.length + 1)} · LOCKED</span>
                                <p className="font-pixel text-sm">
                                    NEXT WORLD LOADING<span className="motion-safe:animate-blink">_</span>
                                </p>
                                <p className="text-sm text-nb-muted">Unlocks after graduation.</p>
                            </div>
                        </MapRow>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Education;
