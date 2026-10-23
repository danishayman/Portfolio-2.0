'use client';

import { useTheme } from './ThemeContext';

// Easter egg: the portrait complains when the theme toggle gets spammed (see INDECISIVE_FLIPS in ThemeContext)
export default function IndecisiveBubble() {
    const { indecisive } = useTheme();

    return (
        // Always rendered so screen readers announce the line when it appears. Sits below the LV badge
        // on phones, where the two can't fit side by side, and across from it on wider screens.
        <span role="status" className="absolute right-2 top-9 md:right-3 md:top-3 max-w-[62%] pointer-events-none">
            {indecisive && (
                <span className="relative block origin-bottom-left animate-pop motion-reduce:animate-none font-pixel text-[7px] md:text-[10px] leading-[1.6] bg-white text-nb-on border-2 border-nb-on px-2 py-1.5 md:px-2.5 md:py-2">
                    Make up your mind !!!
                    {/* Stair-stepped tail pointing down-left at the face; its top row covers the bubble's bottom border */}
                    <svg viewBox="0 0 7 6" shapeRendering="crispEdges" aria-hidden className="absolute top-full left-4 -mt-[2px] w-3.5 h-3">
                        <path d="M1 0h5v1H1zM1 1h4v1H1zM1 2h3v1H1zM1 3h2v1H1zM1 4h1v1H1z" className="fill-white" />
                        <path d="M0 0h1v6H0zM6 0h1v1H6zM5 1h1v1H5zM4 2h1v1H4zM3 3h1v1H3zM2 4h1v1H2zM1 5h1v1H1z" className="fill-nb-on" />
                    </svg>
                </span>
            )}
        </span>
    );
}
