import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Promotion } from "@/content/promotions";
import { BRAND, PROMOTION_PAGE } from "@/content/shop";
import { ArtSvg, ProductArt } from "./ProductArt";
import { PromotionGoods } from "./PromotionGoods";
import { Breadcrumb, SaveButton, ShareButton } from "./ui";

/**
 * Promotion page (reference: `/special/{no}/view`): breadcrumb with bookmark
 * and share, an editorial column 780px wide (brand strip, headline, hero,
 * copy block, two-up pictures, brand shop link), the welcome-benefit band and
 * the tabbed product grid.
 */
export function PromotionDetail({ promotion: p }: { promotion: Promotion }) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "기획전", href: "/promotions/" },
          { label: BRAND.name, href: "/" },
          { label: `[${BRAND.name}] ${p.title}` },
        ]}
        end={
          <div className="flex shrink-0 items-center gap-4">
            <SaveButton kind="bookmark" />
            <ShareButton />
          </div>
        }
      />
      <article className="mx-auto mt-[30px] max-w-[1400px]">
        <h1 className="sr-only">
          [{BRAND.name}] {p.title}
        </h1>
        <div className="bg-[#e4e3e8]">
          <div className="mx-auto flex h-[72px] max-w-[780px] items-center justify-between px-5 md:h-[92px] md:px-9">
            <span className="text-[26px] font-light leading-none tracking-[0.38em] md:text-[38px]">{BRAND.name}</span>
            <span className="text-[14px] md:text-[15px]">{p.season}</span>
          </div>
        </div>
        <p aria-hidden="true" className="mx-auto max-w-[780px] px-5 py-5 text-center text-[42px] font-extrabold leading-[1.05] tracking-[-0.02em] md:py-[22px] md:text-[88px]">
          {p.headline}
        </p>
        <div className="bg-[#e4e3e8]">
          <div
            className="relative mx-auto max-w-[780px] overflow-hidden pt-[133%] md:pt-[1040px]"
            style={{ background: `radial-gradient(60% 50% at 50% 30%, rgb(255 255 255 / 0.18), transparent 70%), ${p.hero.backdrop}` }}
          >
            <ArtSvg art={p.hero.art} className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto" style={{ aspectRatio: "200 / 266" }} />
          </div>
        </div>
        <div className="mx-auto mt-16 flex min-h-[360px] max-w-[780px] flex-col justify-center px-8 py-16 text-white md:mt-20 md:px-14" style={{ background: p.block.color }}>
          <p className="text-[12px] tracking-[0.24em] opacity-80 md:text-[13px]">{p.block.kicker}</p>
          <p className="mt-4 whitespace-pre-line text-[28px] font-bold leading-[1.3] md:text-[40px]">{p.block.text}</p>
          <p className="mt-8 text-[13px] opacity-80 md:text-[14px]">기간 {p.period}</p>
        </div>
        <div className="mx-auto mt-2 grid max-w-[780px] grid-cols-2 gap-2">
          {p.gallery.map((art, i) => (
            <div key={i} className="relative pt-[133%]">
              <ProductArt art={art} className="absolute inset-0" />
            </div>
          ))}
        </div>
        <Link
          href="/"
          className="mx-auto mt-16 flex max-w-[780px] items-center justify-between border border-shop-900 px-6 py-6 transition-colors hover:bg-shop-100 md:mt-20 md:px-9"
        >
          <span>
            <strong className="block text-[22px] font-light leading-[30px] tracking-[0.32em] md:text-[26px]">{BRAND.name}</strong>
            <span className="text-[14px] leading-[20px] text-shop-600">{PROMOTION_PAGE.brandLink}</span>
          </span>
          <ChevronRight className="size-6 shrink-0" strokeWidth={1.2} aria-hidden="true" />
        </Link>
      </article>
      <div className="mx-auto mt-20 max-w-[1440px] px-5 md:mt-[120px]">
        <Link href={PROMOTION_PAGE.welcome.href} className="flex min-h-[100px] flex-col justify-center bg-[#e9ecff] px-6 py-5 md:px-[18%]">
          <span className="text-[18px] font-bold leading-[26px] md:text-[20px] md:leading-[27px]">{PROMOTION_PAGE.welcome.title}</span>
          <span className="text-[14px] leading-[21px] md:text-[15px]">{PROMOTION_PAGE.welcome.text}</span>
        </Link>
      </div>
      <section aria-label="기획전 상품" className="mx-auto max-w-[1440px] px-5 pb-[120px] pt-20 md:pt-[120px]">
        <PromotionGoods tabs={p.tabs} />
      </section>
    </>
  );
}
