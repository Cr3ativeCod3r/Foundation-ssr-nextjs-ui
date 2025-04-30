import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost','admin.neurocamp.pl'],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
