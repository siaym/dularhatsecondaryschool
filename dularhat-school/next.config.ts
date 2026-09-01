import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dularhatsecondaryschool.edu.bd",
        pathname: "/storage/uploads/**",
      },
    ],
  },
  // Ensure static export compatibility
  trailingSlash: false,
};

export default nextConfig;
