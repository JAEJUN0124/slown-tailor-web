import type { Metadata, Viewport } from "next";
import { ChatButton, DemoBadge, Toaster } from "@/components/layout/Overlays";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BRAND } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: BRAND.store, template: `%s｜${BRAND.store}` },
  description: `${BRAND.description}. 자사 공식 스토어 화면 목업이며 이름·상품·가격은 샘플입니다. (데모)`,
  // Demo build with sample content: keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[600] focus:bg-white focus:px-3 focus:py-2"
        >
          본문 바로가기
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatButton />
        <DemoBadge />
        <Toaster />
      </body>
    </html>
  );
}
