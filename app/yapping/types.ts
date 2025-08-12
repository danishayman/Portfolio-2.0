export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  content: string;
  preview?: string;
  tags?: string[];
  author?: string;
} 