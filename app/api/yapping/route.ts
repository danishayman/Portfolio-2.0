import { NextResponse } from 'next/server';
import { getBlogPosts, getBlogPostBySlug } from '../../utils/mdUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    // Get a specific blog post by slug
    const post = getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } else {
    // Get all blog posts
    const posts = getBlogPosts();
    return NextResponse.json(posts);
  }
} 