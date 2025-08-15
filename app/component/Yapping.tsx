import Link from 'next/link';
import { getBlogPosts } from '../yapping/data';

export default function Yapping() {
  const posts = getBlogPosts();

  return (
    <section id="yapping" className="min-h-[120vh] py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">YAPPING</h2>
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-5 items-center">
              {posts.map((post) => (
                <Link
                  href={`/yapping/${post.slug}`}
                  key={post.slug}
                  className="text-lg font-medium hover:underline"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 