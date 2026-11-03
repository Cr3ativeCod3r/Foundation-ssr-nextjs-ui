import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost','api.chorobymozgu.pl'],
  },
  async redirects() {
    return [
      { source: "/wspolpraca", destination: "/sprawozdania-finansowe", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
