// Small crisp-edged pixel-art icons for the 8-bit home page.

const HEART_OUTLINE =
    'M1 0h2v1h1v1h1V1h1V0h2v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z';
const HEART_FILL = 'M1 1h2v1h1v1h1V2h1V1h2v3H7v1H6v1H5v1H4V6H3V5H2V4H1z';

export function PixelHeart({ full }: { full: boolean }) {
    return (
        <svg width="18" height="16" viewBox="0 0 9 8" className="block" shapeRendering="crispEdges" aria-hidden="true">
            <path d={HEART_OUTLINE} className="fill-nb-ink" />
            <path d={HEART_FILL} className={full ? 'fill-nb-pink' : 'fill-nb-heart'} />
        </svg>
    );
}

// Rows of a 9x9 grid; '#' is a filled pixel.
const SUN = [
    '#...#...#',
    '.#.....#.',
    '...###...',
    '..#####..',
    '#.#####.#',
    '..#####..',
    '...###...',
    '.#.....#.',
    '#...#...#',
];

const MOON = [
    '...###...',
    '..##.....',
    '.##......',
    '.##......',
    '.##......',
    '.###...#.',
    '..#####..',
    '...###...',
    '.........',
];

function PixelGrid({ rows, size }: { rows: string[]; size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 9 9" className="block" shapeRendering="crispEdges" aria-hidden="true">
            {rows.flatMap((row, y) =>
                [...row].map((c, x) =>
                    c === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
                )
            )}
        </svg>
    );
}

export const PixelSun = ({ size = 18 }: { size?: number }) => <PixelGrid rows={SUN} size={size} />;
export const PixelMoon = ({ size = 18 }: { size?: number }) => <PixelGrid rows={MOON} size={size} />;
