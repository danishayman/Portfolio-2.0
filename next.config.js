/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Disabling eslintrc as we're using the new flat config
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 