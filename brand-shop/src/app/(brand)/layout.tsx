import { ShopFooter } from "@/components/ShopFooter";
import { ShopHeader } from "@/components/ShopHeader";

// Screens inside the SLOWN brand shop use the brand header.
export default function BrandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ShopHeader />
      <main id="content">{children}</main>
      <ShopFooter />
    </>
  );
}
