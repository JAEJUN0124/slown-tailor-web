import { MallHeader } from "@/components/MallHeader";
import { ShopFooter } from "@/components/ShopFooter";

// Mall-wide screens (cart, login, help desk, policies, store finder,
// promotion list) use the mall header, as on the reference.
export default function MallLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MallHeader />
      <main id="content">{children}</main>
      <ShopFooter />
    </>
  );
}
