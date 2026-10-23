'use client';

import { useSyncExternalStore } from 'react';

// Born 23 March 2003 (month is 0-based). LEVEL is my age, EXP is days since my last birthday.
const BIRTH = { year: 2003, month: 2, day: 23 };
const DAY_MS = 24 * 60 * 60 * 1000;
// Malaysia time (UTC+8), so EXP ticks over at local midnight for every visitor
const TZ_OFFSET_MS = 8 * 60 * 60 * 1000;

export function getPlayerStats(now: number) {
    const local = new Date(now + TZ_OFFSET_MS);
    const year = local.getUTCFullYear();
    const today = Date.UTC(year, local.getUTCMonth(), local.getUTCDate());
    const lastBirthdayYear = today >= Date.UTC(year, BIRTH.month, BIRTH.day) ? year : year - 1;
    const lastBirthday = Date.UTC(lastBirthdayYear, BIRTH.month, BIRTH.day);
    const nextBirthday = Date.UTC(lastBirthdayYear + 1, BIRTH.month, BIRTH.day);

    return {
        level: lastBirthdayYear - BIRTH.year,
        exp: Math.round((today - lastBirthday) / DAY_MS),
        expToNext: Math.round((nextBirthday - lastBirthday) / DAY_MS),
    };
}

const currentDay = () => Math.floor((Date.now() + TZ_OFFSET_MS) / DAY_MS);

// Re-render once the day rolls over, in case the tab stays open past midnight
function subscribe(onChange: () => void) {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
        const msToMidnight = DAY_MS - ((Date.now() + TZ_OFFSET_MS) % DAY_MS);
        timer = setTimeout(() => {
            onChange();
            schedule();
        }, msToMidnight + 1000);
    };
    schedule();
    return () => clearTimeout(timer);
}

// The home page is prerendered, so the server passes its own timestamp for the
// first paint and the browser swaps in today's date right after hydration.
function usePlayerStats(serverNow: number) {
    const day = useSyncExternalStore(subscribe, currentDay, () => null);
    return getPlayerStats(day === null ? serverNow : day * DAY_MS - TZ_OFFSET_MS);
}

export function PlayerLevel({ serverNow }: { serverNow: number }) {
    return <>{usePlayerStats(serverNow).level}</>;
}

export function PlayerExp({ serverNow }: { serverNow: number }) {
    const { exp, expToNext } = usePlayerStats(serverNow);
    const daysLeft = expToNext - exp;
    return (
        // Focusable so a tap shows the countdown on touch screens, where hover never fires
        <span
            tabIndex={0}
            className="group relative self-stretch flex flex-col items-center gap-2 md:gap-3 cursor-help outline-none [-webkit-tap-highlight-color:transparent]"
        >
            <span className="flex self-stretch h-3.5 md:h-4 border-2 border-nb-ink bg-white">
                <span className="bg-nb-green border-r-2 border-nb-ink" style={{ width: `${(exp / expToNext) * 100}%` }} />
            </span>
            <span className="font-pixel text-[9px] md:text-[11px] text-nb-ink">
                {exp}/{expToNext}
            </span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 font-pixel text-[8px] md:text-[9px] bg-nb-panel text-white border-2 border-nb-ink px-2 py-1.5 whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-150 ease-[steps(3)] motion-reduce:transition-none group-hover:opacity-100 group-focus:opacity-100">
                NEXT LV IN {daysLeft} {daysLeft === 1 ? 'DAY' : 'DAYS'}
            </span>
        </span>
    );
}
