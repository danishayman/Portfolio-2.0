import { getBlogPosts } from '../yapping/data';
import SectionHeader from '../common/SectionHeader';
import YappingDialogue, { DialoguePost } from './YappingDialogue';
import { shortDate } from '../yapping/format';

const MAX_LINE = 100;
// The rest live on /yapping, so the topic list stays short as posts pile up
const LATEST = 5;

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
  const allPosts = getBlogPosts();
  const posts: DialoguePost[] = allPosts.slice(0, LATEST).map((post) => ({
    slug: post.slug,
    label: (post.title || post.slug.replace(/-/g, ' ')).toUpperCase(),
    date: shortDate(post.date),
    line: openingLine(post.content),
  }));

  return (
    <section id="yapping" className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 sm:pt-[72px] sm:pb-24">
      <SectionHeader stage="STAGE 1-5" title="YAPPING" meta={`${allPosts.length} DIALOGUES`} />
      {posts.length > 0 && <YappingDialogue posts={posts} total={allPosts.length} />}
    </section>
  );
}
