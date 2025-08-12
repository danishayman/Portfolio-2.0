import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '../../component/Footer';
import Loading from '../../component/Loading';
import WorkDetailClient from './WorkDetailClient';
import { getWorkDataBySlug } from '../workData';
import { WorkExperienceStructuredData } from '../../components/StructuredData';

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
      title: 'Work Experience Not Found | Danish Aiman',
      description: 'The requested work experience page could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const description = workData.description.slice(0, 2).join(' ');
  
  return {
    title: `${workData.role} at ${workData.company} | Danish Aiman`,
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
          width: 1200,
          height: 630,
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
      <Suspense fallback={<Loading fullScreen={true} />}>
        <WorkDetailClient workData={workData} />
      </Suspense>
      <Footer />
    </>
  );
} 