import type { Metadata } from "next";
import { HelpShell } from "@/components/HelpShell";
import { InquiryForm } from "@/components/InquiryForm";
import { PARTNERSHIP } from "@/content/help";

export const metadata: Metadata = { title: "제휴문의" };

export default function PartnershipPage() {
  return (
    <HelpShell title="제휴문의" crumbs={[{ label: "제휴문의" }]}>
      <InquiryForm sections={PARTNERSHIP} idPrefix="partner" />
    </HelpShell>
  );
}
