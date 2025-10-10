/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true, // for cloudflare
  experimental: {
    runtime: 'edge', // for cloudflare
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/search/:path*',
        destination: '/search/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
