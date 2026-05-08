import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/doe",     destination: "/apoie", permanent: true },
      { source: "/doacoes", destination: "/apoie", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.10"],
};

export default nextConfig;
