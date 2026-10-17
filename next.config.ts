import type { NextConfig } from "next";

// GitHub Pages serves this project from /<repo>/; the deploy workflow passes
// that prefix in. Local `npm run dev` leaves it empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  // Raw <video>/<img> paths don't get basePath automatically; expose it.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
