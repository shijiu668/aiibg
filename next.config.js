/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['replicate.delivery', 'pbxt.replicate.delivery'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.replicate.delivery',
        },
      ],
    },
    serverExternalPackages: ['sharp', 'replicate'],
  };
  
  module.exports = nextConfig;