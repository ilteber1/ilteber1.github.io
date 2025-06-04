/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ai-support-saas',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
