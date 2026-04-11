import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // required for static export
  },
  trailingSlash: true,
  devIndicators: false,
};

export default nextConfig;
