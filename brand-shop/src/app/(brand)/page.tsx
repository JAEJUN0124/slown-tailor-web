import { Bestsellers, NewIn, Picks, ProductCorners } from "@/components/Corners";
import { KeyVisual } from "@/components/KeyVisual";

// Brand shop main inside a mall, modelled on a reference mall's brand page
// (local notes: docs/reverse-engineering-brand-shop.md). Values live in content/shop.ts.
export default function ShopPage() {
  return (
    <>
      <KeyVisual />
      <div className="mx-auto max-w-[1440px] px-5 pb-[120px]">
        <Picks />
        <ProductCorners />
        <NewIn />
        <Bestsellers />
      </div>
    </>
  );
}
