import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SceneArt } from "@/components/art/SceneArt";
import { CategoryNav } from "@/components/shop/CategoryNav";
import { ProductListing } from "@/components/shop/ProductListing";
import { allCategoryPaths, findCategory, productsIn } from "@/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return allCategoryPaths().map((p) => ({ path: p.split("/") }));
}

type Props = { params: Promise<{ path: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = findCategory((await params).path.join("/"));
  if (!m) return {};
  const own = m.node.path === m.lnb.path;
  return { title: own ? `${m.top.name} ${m.node.name}` : `${m.top.name} ${m.lnb.name} · ${m.node.name}` };
}

/** Category list (reference: /product/list.html?cate_no=…). */
export default async function ShopPage({ params }: Props) {
  const m = findCategory((await params).path.join("/"));
  if (!m) notFound();
  const { top, node, lnb, sections } = m;
  const feature = lnb.feature && node.path === lnb.path ? lnb.feature : undefined;

  return (
    <>
      <CategoryNav
        title={top.name}
        lnb={[...top.regulars, ...top.subs].map(({ path, name }) => ({ path, name }))}
        current={lnb.path}
        sections={sections?.map(({ path, name }) => ({ path, name }))}
        activeSection={node.path}
      />

      {/* Category banner on phones (the desktop shows it as the first grid tile). */}
      {feature && (
        <div className="xl:hidden">
          <div className="aspect-[375/443] w-full overflow-hidden">
            <SceneArt scene={feature.scene} focus={[50, 0]} />
          </div>
          <h2 className="mx-[3.2vw] py-[8.53vw] text-[4.27vw] font-medium leading-[1.6] text-st-ink">{feature.title}</h2>
        </div>
      )}
      <div
        className={
          feature
            ? "-mt-[3.2vw] mx-[3.2vw] border-b-[0.13vw] border-black/20 pb-[3.2vw] xl:mx-0 xl:mt-0 xl:max-w-1/2 xl:border-0 xl:px-7 xl:pb-[19px] xl:pt-10"
            : "mx-[3.2vw] border-b-[0.13vw] border-black/20 pb-[3.2vw] pt-[4.27vw] xl:mx-0 xl:max-w-1/2 xl:border-0 xl:px-7 xl:pb-[19px] xl:pt-10"
        }
      >
        {node.desc.map((line) => (
          <p key={line} className="text-[3.73vw] font-light leading-[1.6] tracking-[-0.02em] text-st-ink xl:text-[16px]">
            {line}
          </p>
        ))}
      </div>

      <ProductListing products={productsIn(node)} feature={feature} />
    </>
  );
}
