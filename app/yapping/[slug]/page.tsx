import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../component/Footer';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import React from 'react';
import { getBlogPostBySlug, getBlogPosts } from '../data';
import { BlogPostStructuredData } from '../../components/StructuredData';

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts at build time
export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
      creator: '@zagreusaiman', // Add your Twitter handle if you have one
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

  // Custom component to render markdown with grouped images
  const CustomMarkdown = ({ content }: { content: string }) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      
      // Check if current line is an image
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const images: Array<{alt: string, src: string}> = [{
          alt: imageMatch[1] || 'Blog image',
          src: imageMatch[2]
        }];
        
        let j = i + 1;
        // Look for consecutive images (allowing empty lines between them)
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          if (nextLine === '') {
            j++;
            continue;
          }
          const nextImageMatch = nextLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
          if (nextImageMatch) {
            images.push({
              alt: nextImageMatch[1] || 'Blog image',
              src: nextImageMatch[2]
            });
            j++;
          } else {
            break;
          }
        }
        
        // Render images - single or grouped
        if (images.length === 1) {
          // Single image
          const imageSrc = images[0].src.startsWith('public/') ? `/${images[0].src.replace('public/', '')}` : images[0].src;
          elements.push(
            <div key={key++} className="my-8 w-full mx-auto" style={{ maxWidth: '850px' }}>
              <div className="w-full relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)] aspect-[2/1]">
                <Image
                  src={imageSrc}
                  alt={images[0].alt}
                  width={850}
                  height={425}
                  className="w-full h-full object-cover block"
                  style={{ 
                    display: 'block', 
                    margin: 0, 
                    padding: 0
                  }}
                />
              </div>
            </div>
          );
        } else {
          // Multiple images - render in grid
          elements.push(
            <div key={key++} className="my-8 grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
              {images.map((image, index) => {
                const imageSrc = image.src.startsWith('public/') ? `/${image.src.replace('public/', '')}` : image.src;
                return (
                  <div key={index} className="w-full aspect-square relative rounded-lg border-2 border-[var(--text-color)] overflow-hidden shadow-[5px_5px_var(--box-shadow-color)]">
                    <Image
                      src={imageSrc}
                      alt={image.alt}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover block"
                      style={{ 
                        display: 'block', 
                        margin: 0, 
                        padding: 0
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        }
        
        i = j;
      } else if (line !== '') {
        // Non-image content - accumulate lines until next image or end
        const textLines: string[] = [];
        while (i < lines.length && !lines[i].trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) {
          textLines.push(lines[i]);
          i++;
        }
        
        if (textLines.length > 0) {
          const textContent = textLines.join('\n').trim();
          if (textContent) {
            elements.push(
              <div key={key++}>
                <ReactMarkdown components={{
                  p: ({children, ...props}) => (
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
                  ),
                  strong: ({children, ...props}) => (
                    <strong 
                      style={{
                        color: 'var(--text-color)',
                        fontWeight: 'bold',
                        opacity: 1
                      }} 
                      {...props}
                    >
                      {children}
                    </strong>
                  ),
                  ul: ({children, ...props}) => (
                    <ul 
                      style={{
                        color: 'var(--text-color)',
                        opacity: 1
                      }} 
                      {...props}
                    >
                      {children}
                    </ul>
                  ),
                  li: ({children, ...props}) => (
                    <li 
                      style={{
                        color: 'var(--text-color)',
                        opacity: 1,
                        marginBottom: '0.5rem'
                      }} 
                      {...props}
                    >
                      {children}
                    </li>
                  ),
                  h1: ({children, ...props}) => (
                    <h1 
                      style={{
                        color: 'var(--text-color)',
                        opacity: 1,
                        fontWeight: 'bold'
                      }} 
                      {...props}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({children, ...props}) => (
                    <h2 
                      style={{
                        color: 'var(--text-color)',
                        opacity: 1,
                        fontWeight: 'bold'
                      }} 
                      {...props}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({children, ...props}) => (
                    <h3 
                      style={{
                        color: 'var(--text-color)',
                        opacity: 1,
                        fontWeight: 'bold'
                      }} 
                      {...props}
                    >
                      {children}
                    </h3>
                  ),
                  a: ({children, ...props}) => (
                    <a 
                      style={{
                        color: '#222222',
                        textDecoration: 'underline'
                      }} 
                      {...props}
                    >
                      {children}
                    </a>
                  )
                }}>
                  {textContent}
                </ReactMarkdown>
              </div>
            );
          }
        }
      } else {
        i++;
      }
    }

    return <>{elements}</>;
  };

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
            <CustomMarkdown content={post.content} />
          </div>
        </article>
        </main>

        <Footer />
      </div>
    </>
  );
} 