import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com", "images.unsplash.com"]
  },
  devIndicators: false
};

export default nextConfig;
