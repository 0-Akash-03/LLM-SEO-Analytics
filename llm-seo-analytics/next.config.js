/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  basePath: '/llm-seo-analytics',
  assetPrefix: '/llm-seo-analytics/',
};

module.exports = nextConfig; 