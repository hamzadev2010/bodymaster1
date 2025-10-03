import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Ensure Next.js treats this workspace as the root to avoid lockfile mis-detection
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    // turn off lightningcss completely
    optimizeCss: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // optional optimization
  },
};

export default nextConfig;
