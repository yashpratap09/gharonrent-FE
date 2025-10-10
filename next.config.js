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
  // Optimize for Edge Runtime
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'canvas', 'jsdom'];
    }
    return config;
  },
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
