/** @type {import('next').NextConfig} */
const nextConfig = {
  // Faster builds in development
  swcMinify: true,
  
  // Reduce memory usage
  experimental: {
    optimizePackageImports: ['@prisma/client', 'zustand', 'react-hook-form'],
  },
  
  // Skip type checking and linting during builds for speed
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Remove standalone output for Vercel
  // output: 'standalone',
  
  // Faster refresh
  reactStrictMode: true,

  // Ensure Prisma engine binaries are included in the build
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't externalize Prisma Client
      config.externals = config.externals.filter(
        (external) => typeof external !== 'string' || !external.includes('@prisma/client')
      )
    }
    return config
  },
}

module.exports = nextConfig
