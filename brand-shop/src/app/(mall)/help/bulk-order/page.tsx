import type { Metadata } from "next";
import { HelpShell } from "@/components/HelpShell";
import { InquiryForm } from "@/components/InquiryForm";
import { BULK_ORDER } from "@/content/help";

export const metadata: Metadata = { title: "단체주문" };

export default function BulkOrderPage() {
  return (
    <HelpShell title="단체주문" crumbs={[{ label: "단체주문" }]}>
      <InquiryForm sections={BULK_ORDER} idPrefix="bulk" />
    </HelpShell>
  );
}
