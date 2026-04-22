import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.topgph.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "topgph.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
