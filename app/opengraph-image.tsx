import { readFile } from 'fs/promises';
import { join } from 'path';
import { ImageResponse } from 'next/og';

// Social preview card for links shared to LinkedIn, X, Discord, etc. Rendered once at build time.
export const alt = 'Danish Aiman, Computer Science student building with AI & Machine Learning';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#121212';

// Fetches only the glyphs used, as TTF (the format next/og needs)
async function loadGoogleFont(family: string, text: string) {
    const css = await (
        await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) throw new Error(`Could not load font ${family}`);
    return (await fetch(url)).arrayBuffer();
}

export default async function OpengraphImage() {
    const name = ['DANISH', 'AIMAN'];
    const tagline = 'COMPUTER SCIENCE STUDENT';
    const blurb = 'Intelligent Computing @ USM. Building with AI & Machine Learning.';
    const site = 'danishaiman.com';

    const [pixelFont, monoFont, portrait] = await Promise.all([
        loadGoogleFont('Press+Start+2P', name.join('') + tagline + site + 'PLAYER0'),
        loadGoogleFont('Roboto+Mono:wght@500', blurb),
        readFile(join(process.cwd(), 'public/hero/pixel-me.png')),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 80px',
                    backgroundColor: '#F4EEE2',
                    backgroundImage:
                        'linear-gradient(rgba(18,18,18,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(18,18,18,0.06) 2px, transparent 2px)',
                    backgroundSize: '48px 48px',
                    color: INK,
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 600 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            fontFamily: 'Press Start 2P',
                            fontSize: 80,
                            lineHeight: 1.2,
                            textShadow: '7px 7px 0 #FFD23F',
                        }}
                    >
                        {name.map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18,
                            padding: '26px 30px',
                            backgroundColor: '#FFFFFF',
                            border: `5px solid ${INK}`,
                            boxShadow: `12px 12px 0 ${INK}`,
                        }}
                    >
                        <span style={{ fontFamily: 'Press Start 2P', fontSize: 18, color: '#0066DD' }}>{tagline}</span>
                        <span style={{ fontFamily: 'Roboto Mono', fontSize: 26, lineHeight: 1.45 }}>{blurb}</span>
                    </div>
                    <span style={{ fontFamily: 'Press Start 2P', fontSize: 18 }}>{site}</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFF',
                        border: `5px solid ${INK}`,
                        boxShadow: `16px 16px 0 ${INK}`,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 18px',
                            backgroundColor: INK,
                            color: '#FFFFFF',
                            fontFamily: 'Press Start 2P',
                            fontSize: 16,
                        }}
                    >
                        <span>PLAYER 0</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <div style={{ width: 14, height: 14, backgroundColor: '#FF5C8A' }} />
                            <div style={{ width: 14, height: 14, backgroundColor: '#FFD23F' }} />
                            <div style={{ width: 14, height: 14, backgroundColor: '#2ED47A' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', padding: 22, backgroundColor: '#FF5C8A' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img */}
                        <img
                            src={`data:image/png;base64,${portrait.toString('base64')}`}
                            alt=""
                            width={340}
                            height={340}
                            style={{ border: `5px solid ${INK}`, backgroundColor: '#FFFFFF' }}
                        />
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: 'Press Start 2P', data: pixelFont, style: 'normal', weight: 400 },
                { name: 'Roboto Mono', data: monoFont, style: 'normal', weight: 500 },
            ],
        },
    );
}
