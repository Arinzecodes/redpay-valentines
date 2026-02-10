import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
      // 👇 ADD THIS BLOCK 👇
      {
        protocol: "https",
        hostname: "redpay-merchant-documents.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;