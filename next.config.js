/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['tempmail-alpha.vercel.app'],
    formats: ['image/webp'],
  },
  // Asset handling
  assetPrefix: '',
  // Asset configuration
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ico|png|jpg|jpeg|gif|svg|webp)$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig 