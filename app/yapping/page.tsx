import type { Metadata } from 'next';
import DetailTopBar from '../common/DetailTopBar';
import Footer from '../components/Footer';
import Archive from './Archive';
import { getBlogPosts } from './data';
import { PostSummary } from './types';

const description = 'Thoughts, build logs and the occasional poem by Danish Aiman, Computer Science student at USM.';

export const metadata: Metadata = {
    title: 'Yapping',
    description,
    alternates: {
        canonical: '/yapping',
    },
    openGraph: {
        title: 'Yapping | Danish Aiman',
        description,
        url: 'https://danishaiman.com/yapping',
        siteName: 'Danish Aiman Portfolio',
        type: 'website',
        locale: 'en_US',
        images: ['/opengraph-image'],
    },
};

export default function YappingArchivePage() {
    const posts: PostSummary[] = getBlogPosts().map(({ slug, title, date }) => ({ slug, title, date }));

    return (
        <div className="nb-grid bg-nb-bg text-nb-ink min-h-screen">
            <DetailTopBar backHref="/#yapping" backLabel="HOME" />

            <main className="max-w-[860px] mx-auto px-6 pt-12 pb-20 md:pt-[72px] md:pb-24">
                <header className="flex flex-col gap-5 border-b-[3px] border-nb-ink pb-8 mb-10">
                    <div className="flex gap-2.5 flex-wrap items-center">
                        <span className="font-pixel text-[10px] bg-nb-panel text-nb-yellow px-2.5 py-2">DIALOGUE LOG</span>
                        <span className="font-pixel text-[10px] text-nb-on bg-nb-sky border-2 border-nb-ink px-2.5 py-1.5">
                            {posts.length} DIALOGUES
                        </span>
                    </div>
                    <h1 className="font-pixel font-normal text-[clamp(28px,6vw,52px)] leading-[1.2] [text-shadow:4px_4px_0_#FFD23F] dark:[text-shadow:4px_4px_0_#007bff]">
                        YAPPING
                    </h1>
                </header>

                <Archive posts={posts} />
            </main>

            <Footer topHref="#top" />
        </div>
    );
}
