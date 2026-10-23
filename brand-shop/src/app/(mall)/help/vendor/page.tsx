import type { Metadata } from "next";
import { HelpShell } from "@/components/HelpShell";
import { InquiryForm } from "@/components/InquiryForm";
import { VENDOR } from "@/content/help";

export const metadata: Metadata = { title: "입점신청" };

export default function VendorPage() {
  return (
    <HelpShell title="입점신청" crumbs={[{ label: "입점신청" }]}>
      <InquiryForm sections={VENDOR} idPrefix="vendor" />
    </HelpShell>
  );
}
