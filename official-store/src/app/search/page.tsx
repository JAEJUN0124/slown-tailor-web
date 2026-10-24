import type { Metadata } from "next";
import { SearchResults } from "@/components/shop/SearchResults";

export const metadata: Metadata = { title: "검색" };

export default function SearchPage() {
  return <SearchResults />;
}
