import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '../data';
import { BlogPostStructuredData } from '../../components/StructuredData';
import BlogPost from './BlogPost';

interface BlogPostParams {
  params: Promise<{ slug: string }>;
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
        author={post.author}
      />
      <BlogPost post={post} slug={slug} />
    </>
  );
}