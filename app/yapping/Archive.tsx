import Link from 'next/link';
import { NAV_BG } from '../common/palette';
import { shortDate } from './format';
import { PostSummary } from './types';

// Every post grouped by year, newest first
export default function Archive({ posts }: { posts: PostSummary[] }) {
    // Posts arrive sorted newest first, so each year stays in order
    const years = new Map<string, PostSummary[]>();
    for (const post of posts) {
        const year = post.date.slice(0, 4);
        years.set(year, [...(years.get(year) ?? []), post]);
    }

    return (
        <div className="flex flex-col gap-12">
            {[...years].map(([year, yearPosts]) => (
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
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
