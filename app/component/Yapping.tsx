import Link from 'next/link';
import { getBlogPosts } from '../yapping/data';

export default function Yapping() {
  const posts = getBlogPosts();

  return (
    <section id="yapping" className="min-h-screen py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="section-header">
          <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">YAPPING</h1>
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-3 items-center">
            {posts.slice(0, 3).map((post) => (
              <Link 
                href={`/yapping/${post.slug}`} 
                key={post.slug}
                className="w-full max-w-xs px-4 py-2 bg-[var(--background-color)] border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] rounded-lg font-medium transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm text-left"
              >
                <h3 className="text-xl md:text-lg font-bold">{post.title}</h3>
                <p className="text-xs md:text-sm opacity-80">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 