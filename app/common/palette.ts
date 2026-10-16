// Accent classes for the neo-brutalist home page. Tailwind can't see class names
// built at runtime, so every variant is spelled out as a literal string.

// 4-colour cycle: education, skills, projects
export const ACCENT_BG = ['bg-nb-yellow', 'bg-nb-sky', 'bg-nb-pink', 'bg-nb-green'];
export const ACCENT_HOVER_BG = [
    'hover:bg-nb-yellow',
    'hover:bg-nb-sky',
    'hover:bg-nb-pink',
    'hover:bg-nb-green',
];

// 6-colour cycle: navigation, yapping topics
export const NAV_BG = [
    'bg-nb-yellow',
    'bg-nb-sky',
    'bg-nb-pink',
    'bg-nb-green',
    'bg-nb-orange',
    'bg-nb-purple',
];
export const NAV_HOVER_BG = [
    'hover:bg-nb-yellow',
    'hover:bg-nb-sky',
    'hover:bg-nb-pink',
    'hover:bg-nb-green',
    'hover:bg-nb-orange',
    'hover:bg-nb-purple',
];

// 6-colour cycle for the project grid, ordered so look-alike hues (yellow/orange,
// pink/purple) never sit side by side. The grid is 2–4 columns wide, which never
// divides 6, so no card shares a colour with its neighbour above, below or beside.
export const PROJECT_BG = [
    'bg-nb-yellow',
    'bg-nb-purple',
    'bg-nb-sky',
    'bg-nb-orange',
    'bg-nb-green',
    'bg-nb-pink',
];

export const pad2 =(n: number) => String(n).padStart(2, '0');
