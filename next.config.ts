import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
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

  // 👇 ADD THIS SECTION TO FIX THE META DATA WARNINGS 👇
  async headers() {
    return [
      {
        // Apply these security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;