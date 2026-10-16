// JSON-LD is data, not code: a plain script tag (as the Next.js docs recommend) rather than
// next/script, with '<' escaped so post content can't close the tag early
function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

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
    image: 'https://danishaiman.com/hero/hd-me.png',
    sameAs: [
      'https://github.com/danishayman',
      'https://www.linkedin.com/in/danishayman',
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
      name: 'Universiti Sains Malaysia',
      url: 'https://www.usm.my/'
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
    <JsonLd id="person-structured-data" data={jsonLd} />
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
  };

  return (
    <JsonLd id="website-structured-data" data={jsonLd} />
  );
}

// Blog structured data for individual blog posts
export function BlogPostStructuredData({ 
  title, 
  description, 
  datePublished, 
  slug, 
  author = 'Danish Aiman' 
}: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
  author?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: 'https://danishaiman.com/opengraph-image',
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
    inLanguage: 'en-US'
  };

  return (
    <JsonLd id="blog-post-structured-data" data={jsonLd} />
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
      '@type': 'Organization',
      name: company
    },
    inLanguage: 'en-US'
  };

  return (
    <JsonLd id="work-experience-structured-data" data={jsonLd} />
  );
}
