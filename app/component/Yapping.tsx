'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '../yapping/types';

export default function Yapping() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from the API
    fetch('/api/yapping')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog posts:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="yapping" className="min-h-screen py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="section-header">
          <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">YAPPING</h1>
        </div>

        <div className="mt-8">
          
          {isLoading ? (
            <div className="py-4">
              <p>Loading posts...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              {posts.slice(0, 3).map((post) => (
                <Link 
                  href={`/yapping/${post.slug}`} 
                  key={post.slug}
                  className="p-4 rounded-lg cursor-pointer transition-all duration-400 text-left border-2 border-transparent hover:border-[var(--text-color)] hover:bg-[var(--background-color)] hover:shadow-[5px_5px_var(--box-shadow-color)] hover:translate-x-2.5 w-full max-w-sm"
                >
                  <h3 className="text-xl md:text-lg font-semibold">{post.title}</h3>
                  <p className="text-xs md:text-sm opacity-80">{post.date}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 