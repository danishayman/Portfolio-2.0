import { MetadataRoute } from 'next';
import { getBlogPosts } from './yapping/data';
import { workExperienceData } from './work/workData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://danishaiman.com';
  
  // Get all blog posts
  const posts = getBlogPosts();
  
  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];

  // Add blog posts
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    // Parse the date more carefully to handle different formats
    let lastModified: Date;
    try {
      lastModified = new Date(post.date);
      // If date is invalid, use current date
      if (isNaN(lastModified.getTime())) {
        lastModified = new Date();
      }
    } catch {
      lastModified = new Date();
    }
    
    return {
      url: `${baseUrl}/yapping/${post.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  // Add work pages
  const workRoutes: MetadataRoute.Sitemap = workExperienceData.map((work) => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: new Date(), // You could add lastModified to work data if needed
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...blogRoutes, ...workRoutes];
}
