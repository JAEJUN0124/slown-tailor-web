import { Bestsellers, NewIn, Picks, ProductCorners } from "@/components/Corners";
import { DemoBadge } from "@/components/DemoBadge";
import { KeyVisual } from "@/components/KeyVisual";
import { QuickWidget } from "@/components/QuickWidget";
import { ShopFooter } from "@/components/ShopFooter";
import { ShopHeader } from "@/components/ShopHeader";

// Brand shop main inside a mall, modelled on a reference mall's brand page
// (local notes: docs/reverse-engineering-brand-shop.md). Values live in content/shop.ts.
export default function ShopPage() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[300] focus:bg-white focus:px-3 focus:py-2"
      >
        본문 바로가기
      </a>
      <ShopHeader />
      <main id="content">
        <KeyVisual />
        <div className="mx-auto max-w-[1440px] px-5 pb-[120px]">
          <Picks />
          <ProductCorners />
          <NewIn />
          <Bestsellers />
        </div>
      </main>
      <ShopFooter />
      <QuickWidget />
      <DemoBadge />
    </>
  );
}
