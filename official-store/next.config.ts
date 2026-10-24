import type { NextConfig } from "next";

// When deployed under a sub-path, pass that prefix as PAGES_BASE_PATH;
// local `npm run dev` leaves it empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
