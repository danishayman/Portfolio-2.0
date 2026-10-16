export interface BlogPost {
  title: string;
  slug: string;
  // ISO date, e.g. "2025-08-15"
  date: string;
  content: string;
  preview: string;
  author?: string;
}

// What lists need: everything but the body
export type PostSummary = Omit<BlogPost, 'content' | 'author'>;
