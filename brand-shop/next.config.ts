import type { NextConfig } from "next";

// GitHub Pages serves this app from /<repo>/shop/; the deploy workflow passes
// that prefix in. Local `npm run dev` leaves it empty.
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
