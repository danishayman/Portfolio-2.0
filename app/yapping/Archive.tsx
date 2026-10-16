import Link from 'next/link';
import { NAV_BG } from '../common/palette';
import { shortDate, tagSlug } from './format';
import { PostSummary, Tag } from './types';

interface ArchiveProps {
    // Already filtered to the active tag
    posts: PostSummary[];
    tags: Tag[];
    activeTag: string | null;
    total: number;
}

const chipClass =
    'inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] border-2 border-nb-ink px-2 py-1 transition-[translate,box-shadow] duration-100';

// Pure markup with no hooks, so the server can render it as the no-JS fallback
// and ArchiveFilter can render it again with the visitor's ?tag= applied
export default function Archive({ posts, tags, activeTag, total }: ArchiveProps) {
    const activeLabel = tags.find((t) => t.slug === activeTag)?.label;

    // Newest year first; posts arrive sorted newest first, so each year stays in order
    const years = new Map<string, PostSummary[]>();
    for (const post of posts) {
        const year = post.date.slice(0, 4);
        years.set(year, [...(years.get(year) ?? []), post]);
    }

    return (
        <div className="flex flex-col gap-12">
            <nav aria-label="Filter by tag" className="flex flex-col gap-3.5">
                <span className="font-pixel text-[10px]">FILTER BY TAG</span>
                <ul className="list-none p-0 flex flex-wrap gap-2">
                    <li>
                        <Link
                            href="/yapping"
                            scroll={false}
                            aria-current={activeTag === null ? 'page' : undefined}
                            className={`${chipClass} ${activeTag === null ? 'bg-nb-yellow text-nb-on shadow-hard-3' : 'bg-nb-card hover:bg-nb-yellow hover:text-nb-on'}`}
                        >
                            ALL <span className="opacity-60">{total}</span>
                        </Link>
                    </li>
                    {tags.map((tag) => {
                        const active = tag.slug === activeTag;
                        return (
                            <li key={tag.slug}>
                                <Link
                                    href={`/yapping?tag=${tag.slug}`}
                                    scroll={false}
                                    aria-current={active ? 'page' : undefined}
                                    className={`${chipClass} ${active ? 'bg-nb-yellow text-nb-on shadow-hard-3' : 'bg-nb-card hover:bg-nb-yellow hover:text-nb-on'}`}
                                >
                                    #{tag.label} <span className="opacity-60">{tag.count}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {activeTag && (
                <p className="font-pixel text-[10px] leading-relaxed flex flex-wrap gap-x-3 gap-y-2 items-center" role="status">
                    <span>
                        {posts.length} {posts.length === 1 ? 'DIALOGUE' : 'DIALOGUES'} TAGGED #{(activeLabel ?? activeTag).toUpperCase()}
                    </span>
                    <Link href="/yapping" scroll={false} className="underline underline-offset-4 decoration-2 hover:text-nb-blue-ink">
                        ✕ CLEAR
                    </Link>
                </p>
            )}

            {posts.length === 0 ? (
                <div className="bg-nb-card border-[3px] border-nb-ink shadow-hard-6 p-8 flex flex-col items-center gap-4 text-center">
                    <span className="font-pixel text-xs">NO DIALOGUES FOUND</span>
                    <Link href="/yapping" scroll={false} className="font-pixel text-[10px] bg-nb-yellow text-nb-on border-[3px] border-nb-ink shadow-hard-3 px-3 py-2.5">
                        ◀ SHOW ALL
                    </Link>
                </div>
            ) : (
                [...years].map(([year, yearPosts]) => (
                    <section key={year} aria-labelledby={`year-${year}`} className="flex flex-col gap-5">
                        <h2 id={`year-${year}`} className="font-pixel font-normal text-lg flex items-center gap-3">
                            {year}
                            <span className="flex-1 border-t-[3px] border-dashed border-nb-ink" aria-hidden="true" />
                            <span className="text-[10px]">{yearPosts.length}</span>
                        </h2>
                        <ul className="list-none p-0 flex flex-col gap-5">
                            {yearPosts.map((post, i) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/yapping/${post.slug}`}
                                        className="group flex flex-col gap-3 bg-nb-card border-[3px] border-nb-ink shadow-hard-4 sm:shadow-hard-6 p-4 sm:p-5 transition-[translate,rotate,scale,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-8"
                                    >
                                        <span className={`self-start font-pixel text-[10px] text-nb-on border-2 border-nb-ink px-2 py-1.5 ${NAV_BG[i % NAV_BG.length]}`}>
                                            {shortDate(post.date).toUpperCase()}
                                        </span>
                                        <h3 className="font-rubik font-bold text-lg sm:text-xl leading-[1.25] text-balance group-hover:underline decoration-[3px] underline-offset-4">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-nb-muted text-pretty">{post.preview}</p>
                                        {post.tags.length > 0 && (
                                            <span className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.04em]">
                                                {post.tags.map((tag) => (
                                                    <span key={tag} className={tagSlug(tag) === activeTag ? 'text-nb-blue-ink' : undefined}>
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))
            )}
        </div>
    );
}
