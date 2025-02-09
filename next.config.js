/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['tempmail-alpha.vercel.app'],
    formats: ['image/webp'],
  },
  // Asset handling
  assetPrefix: '',
  // Turbo configuration
  turbo: {
    rules: {
      '*.svg': ['@svgr/webpack'],
      '*.{js,jsx,ts,tsx}': ['@next/eslint-plugin-next'],
    },
  },
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