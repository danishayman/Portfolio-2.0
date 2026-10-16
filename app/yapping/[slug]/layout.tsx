import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '../data';

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

// Every post is prerendered; unknown slugs 404 instead of reading files at request time
export const dynamicParams = false;

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
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const description = post.preview || post.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...';
  // Untitled posts fall back to their slug, as on the page itself
  const title = post.title || slug.replace(/-/g, ' ');
  // First photo in the post, else the site-wide card from app/opengraph-image.tsx
  const firstImage = post.content.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1];
  const image = firstImage ? `/${firstImage.replace(/^\/?(public\/)?/, '')}` : '/opengraph-image';
  const keywords = [
    title,
    'blog',
    'Danish Aiman',
    'thoughts',
    'writing',
  ].join(', ');

  return {
    title: `${title} | Blog`,
    description: description,
    keywords: keywords,
    authors: [{ name: post.author || 'Danish Aiman' }],
    creator: 'Danish Aiman',
    publisher: 'Danish Aiman',
    openGraph: {
      title,
      description: description,
      url: `https://danishaiman.com/yapping/${slug}`,
      siteName: 'Danish Aiman Portfolio',
      type: 'article',
      locale: 'en_US',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || 'Danish Aiman'],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
      title,
      description: description,
      creator: '@zagreusaiman',
    },
    alternates: {
      canonical: `/yapping/${slug}`,
    }
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
