/** @type {import('next').NextConfig} */
const nextConfig = {
  // Faster builds in development
  swcMinify: true,
  
  // Reduce memory usage
  experimental: {
    optimizePackageImports: ['@prisma/client', 'zustand', 'react-hook-form'],
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/engines'],
  },
  
  // Skip type checking and linting during builds for speed
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Faster refresh
  reactStrictMode: true,
}

module.exports = nextConfig
