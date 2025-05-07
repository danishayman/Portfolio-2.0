'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import Footer from '../component/Footer';
import { BlogPost } from './types';

export default function YappingPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all blog posts from the API
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

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/#yapping');
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        <button onClick={handleBackClick} className="inline-flex items-center mb-10 text-sm md:text-base font-medium px-4 py-2 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </button>

        <div className="mb-12">
          <div className="flex items-center mb-8">
            <MessageSquare className="mr-3" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold">mainly yapping</h1>
          </div>
          
          <p className="text-lg opacity-80 mb-12">
            Random thoughts, tech adventures, and occasional wisdom.
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {posts.map((post) => (
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 