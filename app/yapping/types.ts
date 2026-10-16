export interface BlogPost {
  title: string;
  slug: string;
  // ISO date, e.g. "2025-08-15"
  date: string;
  content: string;
  preview: string;
  author?: string;
}

// What the archive list shows
export type PostSummary = Pick<BlogPost, 'slug' | 'title' | 'date'>;
