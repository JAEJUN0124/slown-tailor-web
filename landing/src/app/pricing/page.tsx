import type { Metadata } from "next";
import { PricingCta, PricingHero, PromiseAndFaq, WhyReasonable } from "@/components/pricing/PricingSections";
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { QuoteDock } from "@/components/pricing/QuoteDock";
import { PricingProvider } from "@/components/pricing/selection";

export const metadata: Metadata = {
  title: "가격 안내 — SLOWN",
  description: "투명한 정찰제 맞춤 예복 가격표. (목업)",
};

export default function PricingPage() {
  return (
    <PricingProvider>
      <PricingHero />
      <WhyReasonable />
      <PricingTabs />
      <PromiseAndFaq />
      <PricingCta />
      <QuoteDock />
    </PricingProvider>
  );
}
