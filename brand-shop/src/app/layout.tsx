import type { Metadata, Viewport } from "next";
import { DemoBadge } from "@/components/DemoBadge";
import { QuickWidget } from "@/components/QuickWidget";
import { Toaster } from "@/components/Toaster";
import { BRAND, MALL } from "@/content/shop";
import "./globals.css";

const SITE = `${MALL.name} ${MALL.suffix}`;

export const metadata: Metadata = {
  title: { default: `${BRAND.name}｜${SITE}`, template: `%s｜${SITE}` },
  description: "쇼핑몰 입점 브랜드관 화면 목업. 이름·상품·가격은 샘플입니다. (데모)",
  // Demo build with sample content: keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Headers live in the route groups: (brand) for the SLOWN brand-shop screens,
// (mall) for the mall-wide ones (cart, login, help desk, policies...).
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[300] focus:bg-white focus:px-3 focus:py-2"
        >
          본문 바로가기
        </a>
        {children}
        <QuickWidget />
        <DemoBadge />
        <Toaster />
      </body>
    </html>
  );
}
