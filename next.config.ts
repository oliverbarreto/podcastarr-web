import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  // output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      // For now, let's add any image domains
      {
        protocol: "https",
        hostname: "**" // This will allow all domains - use with caution
      }
    ]
  }
}

export default nextConfig
