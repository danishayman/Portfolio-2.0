import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../component/Footer';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getBlogPostBySlug } from '../data';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-24">
        <Link href="/#yapping" className="inline-flex items-center mb-10 text-sm md:text-base font-medium px-4 py-2 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-color)]">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--text-color)]">{post.title}</h1>
          <p className="text-sm opacity-70 mb-8 text-[var(--text-color)]">{post.date}</p>
          
          <div className="markdown-content">
            <ReactMarkdown components={{
              p: ({node, children, ...props}) => {
                return (
                  <p 
                    className="mb-8" 
                    style={{
                      color: 'var(--text-color)',
                      opacity: 1,
                      fontWeight: 500,
                      textShadow: 'none',
                      filter: 'none'
                    }} 
                    {...props}
                  >
                    {children}
                  </p>
                )
              }
            }}>{post.content}</ReactMarkdown>
          </div>
          
          {params.slug === 'wired' && (
            <div className="mt-12 mb-8">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div 
                    key={num} 
                    className="w-full aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)]"
                  >
                    <Image
                      src={`/wired/wired${num}.jpg`}
                      alt={`Wired Project Image ${num}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover block"
                      style={{ 
                        display: 'block', 
                        margin: 0, 
                        padding: 0
                      }}
                      priority={num <= 2}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {params.slug === 'ohm-sweet-ohm' && (
            <div className="mt-12 mb-8">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div 
                    key={num} 
                    className="w-full aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)]"
                  >
                    <Image
                      src={`/ohm-sweet-ohm/ohm-sweet-ohm${num}.jpg`}
                      alt={`Ohm Sweet Ohm Project Image ${num}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover block"
                      style={{ 
                        display: 'block', 
                        margin: 0, 
                        padding: 0
                      }}
                      priority={num <= 2}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
} 