import Link from "next/link";
import { SceneArt } from "@/components/art/SceneArt";
import { productHref, shopHref } from "@/content/catalog";
import { entryProducts, MAGAZINE_META, LOOKBOOKS, type MagazineEntry } from "@/content/magazine";
import type { Product, Scene } from "@/content/types";
import { cn } from "@/lib/utils";

// Season pages linked from the magazine lists. The reference builds each one
// by hand; the mockup keeps their three shapes: a campaign "stage" of moving
// thumbnails, a lookbook viewer and a long editorial article.

const MOODS: Scene["mood"][] = ["cool", "stone", "warm", "paper"];

/** Scenes for a campaign's thumbnail rows, built from the products it features. */
function stageScenes(e: MagazineEntry, row: number): Scene[] {
  const products = entryProducts(e, 12);
  return products.map((p, i) => ({
    kind: (["hanger", "outfit", "fold", "hanger"] as const)[(i + row) % 4],
    mood: MOODS[(i + row * 2) % MOODS.length],
    flip: (i + row) % 2 === 1,
    items: [p, { kind: "trousers", color: i % 2 ? "#3d3d40" : "#232a3c" }, { kind: "shoes", color: "#1c1c1d" }],
  }));
}

export function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 text-[14px] leading-[18px] tracking-[0.01em] text-st-ink transition-opacity duration-300 hover:opacity-50">
      <span className="underline underline-offset-2">{children}</span>
      <svg viewBox="0 0 5 9" className="h-2 w-1" aria-hidden="true">
        <path d="M.5.5l4 4-4 4" fill="none" stroke="currentColor" />
      </svg>
    </Link>
  );
}

/** Campaign page (reference: /campaign/26aw_as_usual). */
export function CampaignStage({ entry: e }: { entry: MagazineEntry }) {
  const lookbook = LOOKBOOKS.find((l) => l.collection === e.collection) ?? LOOKBOOKS[0];
  const rows = [stageScenes(e, 0), stageScenes(e, 1)];
  return (
    <div className="bg-white text-st-ink">
      <section className="relative flex flex-col justify-center overflow-hidden py-12 lg:h-[calc(100svh-41px)] lg:py-0">
        <div className="flex flex-col gap-2 lg:gap-[13px]">
          {rows.map((row, r) => (
            <div key={r} className={cn("flex w-max gap-2 lg:gap-[13px]", r === 0 ? "marquee-left" : "marquee-right")}>
              {[...row, ...row].map((s, i) => (
                <div key={i} className="aspect-[2/3] w-[88px] shrink-0 overflow-hidden lg:w-[111px]" aria-hidden={i >= row.length || undefined}>
                  <SceneArt scene={s} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 px-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[calc(50%+180px)] lg:mt-0 lg:grid-cols-12 lg:content-start lg:gap-x-[13px] lg:py-6">
          <h1 className="text-[24px] font-medium leading-[28px] tracking-[0.01em] lg:col-[2/span_4]">{e.title}</h1>
          <div className="flex flex-col items-start gap-10 lg:col-[8/span_4] lg:gap-[60px]">
            <p className="text-[14px] leading-[22.4px] tracking-[0.01em]">
              {e.lead} {e.body}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <TextLink href={MAGAZINE_META.lookbook.detail(lookbook.slug)}>Discover the Lookbook</TextLink>
              <TextLink href={shopHref(e.collection === "women" ? "women/new" : "men/new")}>Discover the Collection</TextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Editorial article (reference: /journal/26AW): stacked 12-column sections. */
export function JournalArticle({ entry: e }: { entry: MagazineEntry }) {
  const products = entryProducts(e, 10);
  const scene = (p: Product | undefined, i: number): Scene => ({
    kind: (["hanger", "fold", "outfit", "fabric", "interior"] as const)[i % 5],
    mood: (["warm", "stone", "paper", "cool", "dusk"] as const)[i % 5],
    flip: i % 2 === 1,
    items: p ? [p, { kind: "trousers", color: "#3d3d40" }, { kind: "shoes", color: "#1c1c1d" }] : undefined,
  });
  const img = (s: Scene, cls?: string) => (
    <div className={cn("relative aspect-[1350/1500] overflow-hidden", cls)}>
      <SceneArt scene={s} />
    </div>
  );
  const chapters = [
    { title: products[2]?.nameEn ?? "The Essentials", body: products[2]?.desc ?? e.body, link: products[2] },
    { title: products[5]?.nameEn ?? "The Tailoring", body: products[5]?.desc ?? e.body, link: products[5] },
  ];
  const section = "grid grid-cols-2 gap-x-2 gap-y-12 px-4 lg:grid-cols-12 lg:gap-x-[13px] lg:gap-y-0 lg:py-16";

  return (
    <article className="flex flex-col gap-12 bg-white pb-12 text-st-ink lg:gap-0 lg:pb-0">
      <section className={cn(section, "px-0 lg:px-4")}>
        {img(e.cover, "order-first col-span-2 lg:order-none lg:col-[1/span_6] lg:row-start-1")}
        <div className="col-span-2 flex flex-col gap-6 px-4 pt-12 lg:col-[8/span_5] lg:row-start-1 lg:max-w-[579px] lg:gap-[17px] lg:self-center lg:p-0">
          <h1 className="text-[19px] font-normal leading-[23px] tracking-[0.01em] lg:text-[24px] lg:leading-[28px]">{e.title}</h1>
          <div className="flex flex-col gap-5 text-[13px] leading-[20px] tracking-[0.01em] lg:max-w-[461px] lg:gap-[17px] lg:text-[15px] lg:leading-[22.4px]">
            <p>{e.lead}</p>
            <p>{e.body}</p>
          </div>
        </div>
      </section>
      <section className={section}>
        {img(scene(products[0], 0), "col-span-1 lg:col-[1/span_6]")}
        {img(scene(products[1], 1), "col-span-1 lg:col-[7/span_6]")}
      </section>
      {chapters.map((c, ci) => (
        <section key={c.title} className={section}>
          <div className={cn("col-span-2 flex flex-col gap-6 lg:row-start-1 lg:max-w-[579px] lg:gap-[17px] lg:self-center", ci % 2 ? "lg:col-[8/span_5]" : "lg:col-[2/span_5]")}>
            <h2 className="text-[19px] font-normal leading-[23px] tracking-[0.01em] lg:text-[24px] lg:leading-[28px]">{c.title}</h2>
            <p className="text-[13px] leading-[20px] tracking-[0.01em] lg:max-w-[461px] lg:text-[15px] lg:leading-[22.4px]">{c.body}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {c.link && <TextLink href={productHref(c.link.id)}>Discover the Piece</TextLink>}
              <TextLink href={shopHref(e.collection === "women" ? "women/new" : "men/new")}>{e.collection === "women" ? "Discover the Women’s" : "Discover the Men’s"}</TextLink>
            </div>
          </div>
          {img(scene(products[ci * 2 + 2], ci * 2 + 2), cn("col-span-1 lg:row-start-1", ci % 2 ? "lg:col-[1/span_3]" : "lg:col-[7/span_3]"))}
          {img(scene(products[ci * 2 + 3], ci * 2 + 3), cn("col-span-1 lg:row-start-1", ci % 2 ? "lg:col-[4/span_3]" : "lg:col-[10/span_3]"))}
        </section>
      ))}
      <section className={section}>{img(scene(products[6], 4), "col-span-2 aspect-[16/9] lg:col-span-12")}</section>
      <section className="flex items-center justify-center pb-20 pt-8 lg:h-[636px] lg:py-16">
        <span className="text-[13px] font-extrabold tracking-[0.02em] lg:text-[34px]">SLOWN</span>
      </section>
    </article>
  );
}
