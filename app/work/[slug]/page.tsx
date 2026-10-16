import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import WorkDetailClient from './WorkDetailClient';
import { getWorkDataBySlug, workExperienceData } from '../workData';
import { WorkExperienceStructuredData } from '../../components/StructuredData';

// Every job page is prerendered; unknown slugs 404
export const dynamicParams = false;

// Generate static params for all work pages at build time
export function generateStaticParams() {
  return workExperienceData.map((work) => ({
    slug: work.slug,
  }));
}

// Generate metadata for the work detail page
export async function generateMetadata({ 
  params 
}: {
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const workData = getWorkDataBySlug(slug);
  
  if (!workData) {
    return {
      title: 'Work Experience Not Found',
      description: 'The requested work experience page could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const description = workData.description.slice(0, 2).join(' ');
  
  return {
    title: `${workData.role} at ${workData.company}`,
    description: description,
    keywords: `${workData.skills.join(', ')}, Danish Aiman, work experience, ${workData.company}, ${workData.role}`,
    authors: [{ name: 'Danish Aiman' }],
    openGraph: {
      title: `${workData.role} at ${workData.company}`,
      description: description,
      url: `https://danishaiman.com/work/${slug}`,
      siteName: 'Danish Aiman Portfolio',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: `https://danishaiman.com${workData.images[0]}`,
          alt: `${workData.role} at ${workData.company}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workData.role} at ${workData.company}`,
      description: description,
      images: [`https://danishaiman.com${workData.images[0]}`],
    },
    alternates: {
      canonical: `/work/${slug}`,
    }
  };
}

// Server component for work detail page
export default async function WorkDetailPage({ 
  params 
}: {
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const workData = getWorkDataBySlug(slug);

  if (!workData) {
    notFound();
  }

  const description = workData.description.slice(0, 2).join(' ');
  
  return (
    <>
      <WorkExperienceStructuredData
        role={workData.role}
        company={workData.company}
        startDate={workData.duration.split(' - ')[0] || workData.duration}
        endDate={workData.duration.includes(' - ') ? workData.duration.split(' - ')[1] : undefined}
        description={description}
        skills={workData.skills}
        slug={slug}
      />
      <WorkDetailClient workData={workData} />
      <Footer topHref="#top" />
    </>
  );
} 