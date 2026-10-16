'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_BG, NAV_HOVER_BG } from '../common/palette';

export interface DialoguePost {
  slug: string;
  label: string;
  date: string;
  line: string;
}

const TYPE_SPEED_MS = 28;

export default function YappingDialogue({ posts }: { posts: DialoguePost[] }) {
  const [current, setCurrent] = useState(0);
  const [chars, setChars] = useState(0);
  const post = posts[current];
  const done = chars >= post.line.length;

  // Typewriter: restart whenever the selected post changes
  useEffect(() => {
    setChars(0);
    const timer = setInterval(() => {
      setChars((c) => {
        if (c >= post.line.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, TYPE_SPEED_MS);
    return () => clearInterval(timer);
  }, [post.line]);

  return (
    <div className="flex flex-wrap gap-5 sm:gap-7 items-stretch">
      <div className="flex-[999_1_520px] max-w-full flex flex-col">
        <div className="flex-1 bg-nb-panel p-1.5 shadow-[6px_6px_0_#007bff] sm:shadow-[10px_10px_0_#007bff]">
          {/* Phones: small portrait beside the date and title, quote and buttons full width below */}
          <div className="h-full border-[3px] border-white p-3 sm:p-[22px] grid grid-cols-[56px_minmax(0,1fr)] gap-3 items-center sm:flex sm:gap-[22px] sm:items-start sm:flex-wrap">
            {/* Focusable so a tap swaps to HD on touch screens, where hover never fires */}
            <div
              tabIndex={0}
              aria-label="Portrait, tap or hover for the HD photo"
              className="group relative w-14 h-14 sm:flex-[0_0_120px] sm:w-[120px] sm:h-[120px] border-2 sm:border-[3px] border-white bg-nb-pink overflow-hidden outline-none [-webkit-tap-highlight-color:transparent]"
            >
              <Image
                src="/hero/pixel-me.png"
                alt="Danish, pixel art"
                fill
                quality={90}
                sizes="180px"
                className="object-cover scale-[1.5] origin-[50%_53%] [image-rendering:pixelated]"
              />
              <Image
                src="/hero/hd-me.png"
                alt="Danish"
                fill
                sizes="180px"
                className="object-cover scale-[1.5] origin-[50%_53%] opacity-0 transition-opacity duration-[400ms] ease-[steps(8)] group-hover:opacity-100 group-focus:opacity-100"
              />
            </div>

            <div className="contents sm:flex sm:flex-[1_1_260px] sm:min-w-0 sm:flex-col sm:gap-4 sm:min-h-[200px]">
              <div className="min-w-0 flex flex-col gap-2 sm:gap-4">
                <div className="flex gap-2 sm:gap-2.5 items-center flex-wrap">
                  <span className="font-pixel text-[8px] sm:text-[9px] text-nb-on bg-nb-sky px-1.5 py-1 sm:px-2 sm:py-1.5 whitespace-nowrap">{post.date}</span>
                  <span className="font-pixel text-[8px] sm:text-[9px] text-nb-silver whitespace-nowrap">
                    DIALOGUE {current + 1}/{posts.length}
                  </span>
                </div>
                <h3 className="font-pixel font-normal text-sm sm:text-[clamp(16px,2.2vw,22px)] leading-[1.4] text-nb-yellow">{post.label}</h3>
              </div>
              <p className="col-span-2 font-pixel text-[11px] sm:text-xs leading-relaxed sm:leading-loose text-white text-pretty">
                <span className="sr-only">{post.line}</span>
                <span aria-hidden="true">“{post.line.slice(0, chars)}”</span>
                <span className={`inline-block ml-2 text-nb-yellow ${done ? 'animate-blink' : ''}`} aria-hidden="true">▼</span>
              </p>
              <div className="col-span-2 mt-auto flex flex-wrap justify-end gap-3">
                <Link
                  href={`/yapping/${post.slug}`}
                  className="flex-1 sm:flex-none text-center font-pixel text-[9px] sm:text-[10px] bg-white text-nb-on px-3 sm:px-3.5 py-2.5 sm:py-3 border-[3px] border-white shadow-[4px_4px_0_#FF5C8A] whitespace-nowrap hover:bg-nb-yellow hover:border-nb-yellow"
                >
                  Ⓐ READ MORE
                </Link>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + 1) % posts.length)}
                  className="flex-1 sm:flex-none font-pixel text-[9px] sm:text-[10px] bg-transparent text-white px-3 sm:px-3.5 py-2.5 sm:py-3 border-[3px] border-white cursor-pointer whitespace-nowrap hover:bg-white hover:text-nb-on"
                >
                  Ⓑ NEXT ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[1_1_280px] max-w-full flex flex-col">
        <div className="self-start ml-5 bg-nb-card border-[3px] border-b-0 border-nb-ink px-3 py-2 sm:px-3.5 sm:py-2.5 font-pixel text-[9px] sm:text-[11px]">
          CHOOSE A TOPIC
        </div>
        <div className="flex-1 bg-nb-card border-[3px] border-nb-ink shadow-hard-4 sm:shadow-hard-8 p-2 sm:p-2.5 flex flex-col gap-0.5 sm:gap-1">
          {posts.map((p, i) => {
            const active = i === current;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setCurrent(i)}
                aria-pressed={active}
                className={`grid grid-cols-[18px_minmax(0,1fr)] gap-2 sm:gap-2.5 items-center text-left px-2 py-2 sm:px-2.5 sm:py-3 border-2 cursor-pointer font-pixel text-[9px] sm:text-[10px] leading-normal ${NAV_HOVER_BG[i % NAV_HOVER_BG.length]} hover:border-nb-ink hover:text-nb-on ${
                  active
                    ? `${NAV_BG[i % NAV_BG.length]} border-nb-ink text-nb-on`
                    : 'bg-transparent border-transparent text-nb-ink'
                }`}
              >
                <span className={active ? 'opacity-100' : 'opacity-0'}>▶</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
