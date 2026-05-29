import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so the sibling package-lock.json in the parent folder
  // doesn't get auto-detected as root and confuse Turbopack.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
