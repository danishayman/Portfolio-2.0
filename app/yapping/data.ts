import { BlogPost } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

// Function to get all blog posts from markdown files
// Using react cache to memorize the result for server components
export const getBlogPosts = cache((): BlogPost[] => {
  // Path to the markdown files
  const contentDirectory = path.join(process.cwd(), 'public/content/yapping');
  
  // Get all files from the directory
  const filenames = fs.readdirSync(contentDirectory);
  const markdownFiles = filenames.filter(file => file.endsWith('.md'));
  
  // Parse each file and create a BlogPost object
  const posts = markdownFiles.map(filename => {
    // Read file content
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContent);
    
    // Create slug from filename (remove .md extension)
    const slug = filename.replace(/\.md$/, '');
    
    // Return post object
    return {
      title: data.title,
      slug,
      date: data.date,
      content,
      preview: data.preview,
      tags: data.tags,
      author: data.author
    } as BlogPost;
  });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
} 