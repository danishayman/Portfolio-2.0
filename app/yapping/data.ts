import { BlogPost } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

// Outside public/ so the raw markdown isn't downloadable; read at build time only
const CONTENT_DIR = path.join(process.cwd(), 'content/yapping');

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Fails the build on frontmatter that would break the site, rather than shipping it
function parsePost(filename: string): BlogPost {
  const file = `content/yapping/${filename}`;
  const { data, content } = matter(fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8'));
  const problems: string[] = [];

  if (typeof data.title !== 'string' || !data.title.trim()) problems.push('title is missing');
  if (typeof data.preview !== 'string' || !data.preview.trim()) problems.push('preview is missing');
  // Quoted so YAML keeps it a string; unquoted dates turn into Date objects
  if (typeof data.date !== 'string' || !ISO_DATE.test(data.date) || isNaN(Date.parse(data.date))) {
    problems.push(`date must be a quoted YYYY-MM-DD string, got ${JSON.stringify(data.date)}`);
  }
  if (problems.length) throw new Error(`${file}: ${problems.join('; ')}`);

  return {
    title: data.title,
    slug: filename.replace(/\.md$/, ''),
    date: data.date,
    content,
    preview: data.preview,
    author: data.author,
  };
}

// Placeholders are allowed while drafting; each build process lists the ones left, once
let placeholdersReported = false;
function reportPlaceholders(posts: BlogPost[]) {
  if (placeholdersReported) return;
  placeholdersReported = true;
  const todo = posts
    .map((post) => [post.slug, (['title', 'preview'] as const).filter((field) => post[field].startsWith('TODO'))] as const)
    .filter(([, fields]) => fields.length)
    .map(([slug, fields]) => `${slug} (${fields.join(', ')})`);
  if (todo.length) console.warn(`[yapping] placeholders left in content/yapping: ${todo.join('; ')}`);
}

// All posts, newest first. Cached so every component in a render shares one read.
export const getBlogPosts = cache((): BlogPost[] => {
  const posts = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.md')).map(parsePost);
  reportPlaceholders(posts);
  // ISO dates sort correctly as strings
  return posts.sort((a, b) => b.date.localeCompare(a.date));
});

// Get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
