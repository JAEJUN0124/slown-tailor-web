import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = { title: "검색 결과" };

export default function SearchPage() {
  // The query lives in the address, which a static page only sees in the browser.
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <SearchResults />
    </Suspense>
  );
}
