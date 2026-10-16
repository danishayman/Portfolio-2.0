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
    <div className="flex flex-wrap gap-7 items-stretch">
      <div className="flex-[999_1_520px] max-w-full flex flex-col">
        <div className="self-start ml-5 relative z-[1] bg-nb-yellow text-nb-on border-[3px] border-b-0 border-nb-ink px-3.5 py-2.5 font-pixel text-[11px]">
          DANISH
        </div>
        <div className="flex-1 bg-nb-panel p-1.5 shadow-[10px_10px_0_#007bff]">
          <div className="h-full border-[3px] border-white p-[22px] flex gap-[22px] items-start flex-wrap">
            <div className="relative flex-[0_0_120px] w-[120px] h-[120px] border-[3px] border-white bg-nb-pink overflow-hidden">
              <Image
                src="/hero/pixel-me.png"
                alt="Danish, pixel art"
                fill
                unoptimized
                className="object-cover object-[50%_30%] scale-[1.7] origin-[50%_42%] [image-rendering:pixelated]"
              />
            </div>

            <div className="flex-[1_1_260px] min-w-0 flex flex-col gap-4 min-h-[200px]">
              <div className="flex gap-2.5 items-center flex-wrap">
                <span className="font-pixel text-[9px] text-nb-on bg-nb-sky px-2 py-1.5 whitespace-nowrap">{post.date}</span>
                <span className="font-pixel text-[9px] text-nb-silver whitespace-nowrap">
                  DIALOGUE {current + 1}/{posts.length}
                </span>
              </div>
              <h3 className="font-pixel font-normal text-[clamp(16px,2.2vw,22px)] leading-[1.4] text-nb-yellow">{post.label}</h3>
              <p className="font-pixel text-xs leading-[2] text-white text-pretty">
                <span className="sr-only">{post.line}</span>
                <span aria-hidden="true">“{post.line.slice(0, chars)}”</span>
                <span className={`inline-block ml-2 text-nb-yellow ${done ? 'animate-blink' : ''}`} aria-hidden="true">▼</span>
              </p>
              <div className="mt-auto flex justify-end gap-3 flex-wrap">
                <Link
                  href={`/yapping/${post.slug}`}
                  className="font-pixel text-[10px] bg-white text-nb-on px-3.5 py-3 border-[3px] border-white shadow-[4px_4px_0_#FF5C8A] whitespace-nowrap hover:bg-nb-yellow hover:border-nb-yellow"
                >
                  Ⓐ READ MORE
                </Link>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + 1) % posts.length)}
                  className="font-pixel text-[10px] bg-transparent text-white px-3.5 py-3 border-[3px] border-white cursor-pointer whitespace-nowrap hover:bg-white hover:text-nb-on"
                >
                  Ⓑ NEXT ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[1_1_280px] max-w-full flex flex-col">
        <div className="self-start ml-5 bg-nb-card border-[3px] border-b-0 border-nb-ink px-3.5 py-2.5 font-pixel text-[11px]">
          CHOOSE A TOPIC
        </div>
        <div className="flex-1 bg-nb-card border-[3px] border-nb-ink shadow-hard-8 p-2.5 flex flex-col gap-1">
          {posts.map((p, i) => {
            const active = i === current;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setCurrent(i)}
                aria-pressed={active}
                className={`grid grid-cols-[18px_minmax(0,1fr)] gap-2.5 items-center text-left px-2.5 py-3 border-2 cursor-pointer font-pixel text-[10px] leading-[1.5] ${NAV_HOVER_BG[i % NAV_HOVER_BG.length]} hover:border-nb-ink hover:text-nb-on ${
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
