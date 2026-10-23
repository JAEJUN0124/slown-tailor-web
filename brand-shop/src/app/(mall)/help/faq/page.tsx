import type { Metadata } from "next";
import { FaqView } from "@/components/HelpLists";
import { HelpShell } from "@/components/HelpShell";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <HelpShell title="FAQ" crumbs={[{ label: "FAQ" }]}>
      <FaqView />
    </HelpShell>
  );
}
