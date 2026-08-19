import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.indianartvilla.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.rudhigat.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shikhas.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagescdn.jaypore.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dukaan.b-cdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "karukarjo.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
