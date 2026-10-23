import type { Metadata, Viewport } from "next";
import { BRAND, MALL } from "@/content/shop";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BRAND.name}｜${MALL.name} ${MALL.suffix}`,
  description: "쇼핑몰 입점 브랜드관 메인 화면 목업. 이름·상품·가격은 샘플입니다. (데모)",
  // Demo build with sample content: keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
