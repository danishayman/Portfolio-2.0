import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '../data';

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
