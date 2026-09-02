import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dularhatsecondaryschool.edu.bd",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lupavnxhbwhkdxrirgdv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Ensure static export compatibility
  trailingSlash: false,
};

export default nextConfig;
