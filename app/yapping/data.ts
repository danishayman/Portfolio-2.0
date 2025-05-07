import { BlogPost } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to get all blog posts from markdown files
export function getBlogPosts(): BlogPost[] {
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
      preview: data.preview
    } as BlogPost;
  });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Client-side cache of blog posts
export const blogPosts: BlogPost[] = [];

// This is used only on the client side
export function loadBlogPosts() {
  if (typeof window === 'undefined') return;
  
  // Dynamically fetch the posts from the server
  fetch('/api/yapping')
    .then(res => res.json())
    .then(data => {
      blogPosts.length = 0; // Clear the array
      blogPosts.push(...data); // Add all posts
    })
    .catch(err => {
      console.error('Error loading blog posts:', err);
    });
}

// Initialize on the server side
if (typeof window === 'undefined') {
  loadBlogPosts();
} 