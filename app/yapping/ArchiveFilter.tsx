'use client';

import { useSearchParams } from 'next/navigation';
import Archive from './Archive';
import { tagSlug } from './format';
import { PostSummary, Tag } from './types';

// Applies ?tag= in the browser, so the archive stays a static page and filtered views are shareable links
export default function ArchiveFilter({ posts, tags }: { posts: PostSummary[]; tags: Tag[] }) {
    const activeTag = useSearchParams().get('tag');
    const shown = activeTag ? posts.filter((post) => post.tags.some((t) => tagSlug(t) === activeTag)) : posts;

    return <Archive posts={shown} tags={tags} activeTag={activeTag} total={posts.length} />;
}
