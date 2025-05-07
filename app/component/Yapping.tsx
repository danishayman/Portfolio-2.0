'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
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
        <div className="section-header mb-12 flex items-center">
          <MessageSquare className="mr-2" size={24} />
          <h1 className="text-3xl font-bold">mainly yapping</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p>Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8">
              {posts.slice(0, 3).map((post) => (
                <Link 
                  href={`/yapping/${post.slug}`} 
                  key={post.slug} 
                  className="block p-6 border-2 border-[var(--text-color)] rounded-lg shadow-[5px_5px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm"
                >
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm opacity-70 mb-3">{post.date}</p>
                  <p className="text-base">{post.preview}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link 
                href="/yapping" 
                className="inline-flex items-center px-6 py-3 border-2 border-[var(--text-color)] rounded-lg shadow-[5px_5px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm font-medium"
              >
                View All Posts
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 