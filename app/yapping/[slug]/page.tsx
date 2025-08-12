import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../component/Footer';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getBlogPostBySlug } from '../data';
import { BlogPostStructuredData } from '../../components/StructuredData';

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

// Generate metadata for blog posts
export async function generateMetadata({ 
  params 
}: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Danish Aiman',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const description = post.preview || post.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...';
  const keywords = [
    post.title,
    'blog',
    'Danish Aiman',
    'thoughts',
    'writing',
    ...(post.tags || [])
  ].join(', ');

  return {
    title: `${post.title} | Danish Aiman Blog`,
    description: description,
    keywords: keywords,
    authors: [{ name: post.author || 'Danish Aiman' }],
    creator: 'Danish Aiman',
    publisher: 'Danish Aiman',
    openGraph: {
      title: post.title,
      description: description,
      url: `https://danishaiman.com/yapping/${slug}`,
      siteName: 'Danish Aiman Portfolio',
      type: 'article',
      locale: 'en_US',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || 'Danish Aiman'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: description,
      creator: '@danishaiman', // Add your Twitter handle if you have one
    },
    alternates: {
      canonical: `/yapping/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = await params;
  
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const description = post.preview || post.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...';

  return (
    <>
      <BlogPostStructuredData
        title={post.title}
        description={description}
        datePublished={post.date}
        slug={slug}
        tags={post.tags}
        author={post.author}
      />
      <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
        <main className="max-w-3xl mx-auto px-6 py-12 md:py-24">
        <Link href="/#yapping" className="inline-flex items-center mb-10 text-sm md:text-base font-medium px-4 py-2 rounded-lg border-2 border-[var(--text-color)] shadow-[3px_3px_var(--box-shadow-color)] transition-all duration-300 hover:translate-y-0.5 hover:shadow-sm">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-color)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--text-color)]">{post.title}</h2>
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
          {slug === 'ohm-sweet-ohm' && (
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
    </>
  );
} 