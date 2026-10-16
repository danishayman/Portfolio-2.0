import { getBlogPosts } from '../yapping/data';
import SectionHeader from '../common/SectionHeader';
import YappingDialogue, { DialoguePost } from './YappingDialogue';

const MAX_LINE = 100;

// "31 December 2025" -> "31 Dec 2025"
function shortDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  const month = d.toLocaleString('en-US', { month: 'long' }).slice(0, 3);
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}

// Opening line of a post: whole sentences from the start, up to MAX_LINE chars
function openingLine(content: string): string {
  const text = content
    .split('\n')
    .map((l) => l.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/^\s*(#+|>)\s*/, '').trim())
    .filter(Boolean)
    .join(' ');
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];

  let line = sentences[0].trim();
  for (const s of sentences.slice(1)) {
    const next = `${line} ${s.trim()}`;
    if (next.length > MAX_LINE) break;
    line = next;
  }
  return line;
}

export default function Yapping() {
  const posts: DialoguePost[] = getBlogPosts().map((post) => ({
    slug: post.slug,
    label: (post.title || post.slug.replace(/-/g, ' ')).toUpperCase(),
    date: shortDate(post.date),
    line: openingLine(post.content),
  }));

  return (
    <section id="yapping" className="max-w-[1200px] mx-auto px-6 pt-[72px] pb-24">
      <SectionHeader stage="STAGE 1-5" title="YAPPING" meta={`${posts.length} DIALOGUES`} />
      {posts.length > 0 && <YappingDialogue posts={posts} />}
    </section>
  );
}
