import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../yapping/types';

// Function to get all blog posts from markdown files
export function getBlogPosts(): BlogPost[] {
  try {
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
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Function to get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    // Path to the markdown file
    const filePath = path.join(process.cwd(), 'public/content/yapping', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContent);
    
    // Return post object
    return {
      title: data.title,
      slug,
      date: data.date,
      content,
      preview: data.preview
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post with slug ${slug}:`, error);
    return null;
  }
} 