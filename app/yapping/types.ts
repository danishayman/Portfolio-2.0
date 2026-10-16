export interface BlogPost {
  title: string;
  slug: string;
  // ISO date, e.g. "2025-08-15"
  date: string;
  content: string;
  preview: string;
  tags: string[];
  author?: string;
}

// What lists need: everything but the body, so archive pages don't ship full posts to the browser
export type PostSummary = Omit<BlogPost, 'content' | 'author'>;

export interface Tag {
  // URL form, e.g. "new-year"
  slug: string;
  // As written in the frontmatter, e.g. "New Year"
  label: string;
  count: number;
}
