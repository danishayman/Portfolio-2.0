// Day/night cycle: light from 7am, dark from 7pm, on the visitor's own clock.
// Plain module (not 'use client') so layout.tsx can read the hours for its inline script.
export const DAY_START_HOUR = 7;
export const NIGHT_START_HOUR = 19;

export function timeOfDayTheme(date = new Date()): 'light' | 'dark' {
    const hour = date.getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? 'light' : 'dark';
}
