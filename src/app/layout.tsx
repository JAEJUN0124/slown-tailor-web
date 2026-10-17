import type { Metadata, Viewport } from "next";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "SLOWN — 천천히 짓는 나만의 예복",
  description: "디렉터 상담과 데이터로 짓는 맞춤 예복. (데모)",
  // Demo build with sample content: keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2b1e14",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <SmoothScroll>
          <Nav />
          {/* #page hosts the shared paint + thread layer behind every section */}
          <div id="page" className="relative isolate flex min-h-svh flex-col">
            <PageCanvas />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <DemoBadge />
        </SmoothScroll>
      </body>
    </html>
  );
}
