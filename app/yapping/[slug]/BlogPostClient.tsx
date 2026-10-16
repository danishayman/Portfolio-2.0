'use client';

import Image from 'next/image';
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import Footer from '../../component/Footer';
import DetailTopBar from '../../common/DetailTopBar';
import { BlogPost } from '../types';

interface BlogPostClientProps {
  post: BlogPost;
  slug: string;
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

// Markdown image paths are written as 'public/...'; Next serves them from '/'
const publicSrc = (src: string) => (src.startsWith('public/') ? `/${src.replace('public/', '')}` : src);

// react-markdown passes each element's AST `node`; it's pulled out so it isn't spread onto the DOM
/* eslint-disable @typescript-eslint/no-unused-vars */
const markdownComponents: Components = {
  p: ({ node, ...props }) => <p className="mb-6 last:mb-0 text-base leading-[1.8] text-pretty" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
  em: ({ node, ...props }) => <em className="italic" {...props} />,
  a: ({ node, ...props }) => (
    <a
      className="font-bold text-nb-blue dark:text-nb-sky underline decoration-2 underline-offset-4 hover:bg-nb-yellow hover:text-nb-on"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  // Square pixel bullets, as in the home page's quest log
  ul: ({ node, ...props }) => (
    <ul
      className="list-none p-0 mb-6 flex flex-col gap-2.5 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.5em] [&>li]:before:w-2.5 [&>li]:before:h-2.5 [&>li]:before:bg-nb-pink [&>li]:before:border-2 [&>li]:before:border-nb-ink"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 flex flex-col gap-2.5" {...props} />,
  li: ({ node, ...props }) => <li className="leading-[1.7]" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="mb-6 border-[3px] border-l-[10px] border-nb-ink bg-nb-bg px-4 py-3 font-medium [&_p]:mb-0"
      {...props}
    />
  ),
  h1: ({ node, ...props }) => <h2 className="font-pixel font-normal text-lg leading-[1.4] mt-10 mb-5" {...props} />,
  h2: ({ node, ...props }) => <h2 className="font-pixel font-normal text-base leading-[1.4] mt-10 mb-5" {...props} />,
  h3: ({ node, ...props }) => <h3 className="font-rubik font-bold text-xl mt-8 mb-4" {...props} />,
  hr: () => <hr className="my-8 border-0 border-t-[3px] border-dashed border-nb-ink" />,
  code: ({ node, ...props }) => <code className="font-mono text-[0.9em] bg-nb-bg border-2 border-nb-ink px-1.5 py-0.5" {...props} />,
};
/* eslint-enable @typescript-eslint/no-unused-vars */

// Renders markdown, pulling runs of consecutive image lines out into a single photo or a 2-up grid
function PostContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const imageMatch = lines[i].trim().match(IMAGE_LINE);

    if (imageMatch) {
      const images = [{ alt: imageMatch[1] || 'Blog image', src: publicSrc(imageMatch[2]) }];

      // Collect consecutive images (blank lines between them are allowed)
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (next === '') {
          j++;
          continue;
        }
        const nextMatch = next.match(IMAGE_LINE);
        if (!nextMatch) break;
        images.push({ alt: nextMatch[1] || 'Blog image', src: publicSrc(nextMatch[2]) });
        j++;
      }

      elements.push(
        images.length === 1 ? (
          <div key={key++} className="my-8 relative aspect-2/1 border-[3px] border-nb-ink shadow-hard-5 overflow-hidden bg-nb-bg">
            <Image src={images[0].src} alt={images[0].alt} fill sizes="(max-width: 800px) 90vw, 760px" className="object-cover" />
          </div>
        ) : (
          <div key={key++} className="my-8 grid grid-cols-2 gap-3 md:gap-4">
            {images.map((image) => (
              <div key={image.src} className="relative aspect-square border-[3px] border-nb-ink shadow-hard-4 overflow-hidden bg-nb-bg">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 45vw, 370px" className="object-cover" />
              </div>
            ))}
          </div>
        )
      );
      i = j;
    } else if (lines[i].trim() !== '') {
      // Text runs until the next image line
      const textLines: string[] = [];
      while (i < lines.length && !lines[i].trim().match(IMAGE_LINE)) {
        textLines.push(lines[i]);
        i++;
      }
      elements.push(
        <ReactMarkdown key={key++} components={markdownComponents}>
          {textLines.join('\n').trim()}
        </ReactMarkdown>
      );
    } else {
      i++;
    }
  }

  return <>{elements}</>;
}

export default function BlogPostClient({ post, slug }: BlogPostClientProps) {
  // Some posts are untitled; fall back to the slug, as the home page does
  const title = (post.title || slug.replace(/-/g, ' ')).toUpperCase();

  return (
    <div className="nb-grid bg-nb-bg text-nb-ink min-h-screen">
      <DetailTopBar backHref="/#yapping" backLabel="YAPPING" />

      <main className="max-w-[860px] mx-auto px-6 pt-12 pb-20 md:pt-[72px] md:pb-24">
        <header className="flex flex-col gap-5 border-b-[3px] border-nb-ink pb-8 mb-12">
          <div className="flex gap-2.5 flex-wrap items-center">
            <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">DIALOGUE</span>
            <span className="font-pixel text-[10px] text-nb-on bg-nb-sky border-2 border-nb-ink px-2.5 py-1.5">{post.date.toUpperCase()}</span>
          </div>
          <h1 className="font-pixel font-normal text-[clamp(22px,4.4vw,40px)] leading-[1.35] text-balance [text-shadow:4px_4px_0_#FFD23F]">
            {title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <ul className="list-none p-0 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="text-[11px] font-bold uppercase tracking-[0.04em] bg-nb-card border-2 border-nb-ink px-2 py-1">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <article className="flex flex-col">
          <div className="self-start ml-5 bg-nb-yellow text-nb-on border-[3px] border-b-0 border-nb-ink px-3.5 py-2.5 font-pixel text-[11px]">
            {(post.author || 'Danish').split(' ')[0].toUpperCase()}
          </div>
          <div className="bg-nb-card border-[3px] border-nb-ink shadow-hard-8 px-[clamp(20px,4vw,40px)] py-[clamp(24px,4vw,40px)]">
            <PostContent content={post.content} />
            <p className="mt-10 font-pixel text-[10px] text-nb-muted text-right" aria-hidden="true">
              END OF DIALOGUE <span className="text-nb-pink animate-blink">▼</span>
            </p>
          </div>
        </article>
      </main>

      <Footer topHref="#top" />
    </div>
  );
}
