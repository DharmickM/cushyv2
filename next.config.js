/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Comment out or remove this line
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;