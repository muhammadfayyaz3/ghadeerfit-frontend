/** @type {import('next').NextConfig} */
const getRemotePatterns = () => {
  const patterns = [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '5000',
      pathname: '/images/**',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '5001',
      pathname: '/images/**',
    },
    {
      protocol: 'http',
      hostname: 'backend',
      port: '5000',
      pathname: '/images/**',
    },
    {
      protocol: 'http',
      hostname: 'videostream-backend',
      port: '5000',
      pathname: '/images/**',
    },
    {
      protocol: 'https',
      hostname: 'i.ytimg.com',
    },
    {
      protocol: 'https',
      hostname: 'img.youtube.com',
    },
  ];

  // Add backend API URL to remote patterns if provided
  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
      patterns.push({
        protocol: apiUrl.protocol === 'https:' ? 'https' : 'http',
        hostname: apiUrl.hostname,
        pathname: '/images/**',
      });
    } catch (e) {
      // Invalid URL, skip
    }
  }

  return patterns;
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: getRemotePatterns(),
  },
  // Remove standalone output for Vercel deployment
  // Vercel handles Next.js deployments automatically
  // Only use standalone for Docker builds
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),
}

module.exports = nextConfig

