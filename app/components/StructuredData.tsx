import Script from 'next/script';

// Person structured data for the homepage
export function PersonStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Danish Aiman',
    alternateName: ['danishayman'],
    jobTitle: 'Computer Science Student & AI Developer',
    description: 'Computer Science student specializing in AI and Machine Learning with experience in web development and software engineering',
    url: 'https://danishaiman.com',
    image: 'https://danishaiman.com/hero/lelouch.webp',
    sameAs: [
      // Add your actual social media URLs here
      'https://github.com/danishaiman',
      'https://linkedin.com/in/danishaiman',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning', 
      'Web Development',
      'Software Engineering',
      'Next.js',
      'React',
      'TypeScript',
      'Python',
      'ASP.NET',
      'C#',
      'SQL',
      'Computer Vision',
      'Data Science'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Malaya', // Update with your actual university
      url: 'https://www.um.edu.my/'
    },
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Software Engineer Intern',
        occupationLocation: {
          '@type': 'Place',
          name: 'Inari Amertron Berhad'
        },
        skills: ['ASP.NET', 'C#', 'SQL', 'Git', 'Agile']
      }
    ],
    owns: {
      '@type': 'WebSite',
      name: 'Danish Aiman Portfolio',
      url: 'https://danishaiman.com',
      description: 'Portfolio showcasing AI/ML projects, work experience, and technical blog posts',
      author: {
        '@type': 'Person',
        name: 'Danish Aiman'
      }
    }
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Website structured data
export function WebsiteStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Danish Aiman Portfolio',
    alternateName: 'danishayman',
    url: 'https://danishaiman.com',
    description: 'Portfolio of Danish Aiman - Computer Science student specializing in AI and Machine Learning',
    author: {
      '@type': 'Person',
      name: 'Danish Aiman'
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://danishaiman.com/yapping/{search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Blog structured data for individual blog posts
export function BlogPostStructuredData({ 
  title, 
  description, 
  datePublished, 
  slug, 
  tags = [],
  author = 'Danish Aiman' 
}: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
  tags?: string[];
  author?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: 'https://danishaiman.com/hero/screenshot.png',
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://danishaiman.com'
    },
    publisher: {
      '@type': 'Person',
      name: 'Danish Aiman',
      url: 'https://danishaiman.com'
    },
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(datePublished).toISOString(),
    url: `https://danishaiman.com/yapping/${slug}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'Danish Aiman Blog',
      url: 'https://danishaiman.com/yapping'
    },
    keywords: tags.join(', '),
    inLanguage: 'en-US'
  };

  return (
    <Script
      id="blog-post-structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Work experience structured data
export function WorkExperienceStructuredData({
  role,
  company,
  startDate,
  description,
  skills = [],
  slug
}: {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills?: string[];
  slug: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${role} at ${company}`,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Danish Aiman',
      url: 'https://danishaiman.com'
    },
    publisher: {
      '@type': 'Person', 
      name: 'Danish Aiman',
      url: 'https://danishaiman.com'
    },
    datePublished: new Date(startDate).toISOString(),
    url: `https://danishaiman.com/work/${slug}`,
    keywords: skills.join(', '),
    about: {
      '@type': 'JobPosting',
      title: role,
      hiringOrganization: {
        '@type': 'Organization',
        name: company
      },
      employmentType: 'INTERN',
      skills: skills.map(skill => ({
        '@type': 'DefinedTerm',
        name: skill
      }))
    },
    inLanguage: 'en-US'
  };

  return (
    <Script
      id="work-experience-structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
