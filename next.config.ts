import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost','api.chorobymozgu.pl'],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
