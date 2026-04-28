import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Clean URLs — Next.js App Router handles this by default
  // No trailingSlash so /pricing stays as /pricing
  trailingSlash: false,
};

export default nextConfig;
