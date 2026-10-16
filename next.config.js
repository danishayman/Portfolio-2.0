/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first: ~20% smaller than WebP; browsers without it fall back to WebP
    formats: ['image/avif', 'image/webp'],
    // Next 16 only allows listed qualities; 90 keeps the pixel art crisp
    qualities: [75, 90],
    // Optimized images are cached for 31 days instead of re-encoding often
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ['react-markdown', 'lucide-react'],
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        // public/ files keep their names when replaced, so cache for a week rather than "immutable"
        source: '/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|pdf)$)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
