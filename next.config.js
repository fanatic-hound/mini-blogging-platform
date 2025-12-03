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
  
  // Standalone output for smaller builds
  output: 'standalone',
  
  // Faster refresh
  reactStrictMode: true,

  // Ensure Prisma engine binaries are included in the build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@prisma/client': '@prisma/client',
      })
    }
    return config
  },
}

module.exports = nextConfig
