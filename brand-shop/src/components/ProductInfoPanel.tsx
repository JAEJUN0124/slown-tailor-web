"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { careFor, COLOR_NOTE, CORNER_TITLES, DETAIL_BANNERS, noticeFor, SELLER } from "@/content/guide";
import type { Product } from "@/content/types";
import { GRID, ProductCard } from "./ProductCard";
import { ProductArt } from "./ProductArt";
import { productCuts } from "./ProductGallery";
import { Pagination } from "./ui";

export type Related = { similar: Product[]; shelf: Product[]; browsed: Product[] };

/** Silver "official store" seal of the seller banner. */
function Seal() {
  return (
    <svg viewBox="0 0 100 100" className="size-[84px] shrink-0 md:size-[104px]" aria-hidden="true">
      <defs>
        <radialGradient id="seal-face" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c7cad5" />
        </radialGradient>
        <path id="seal-ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#seal-face)" stroke="#b5b8c4" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#a6aab8" strokeWidth="0.6" />
      <text fontSize="6.4" letterSpacing="1.4" fill="#6b6f7d">
        <textPath href="#seal-ring">OFFICIAL ONLINE STORE · GENUINE ·</textPath>
      </text>
      <text x="50" y="51" textAnchor="middle" fontSize="11" fontWeight="800" fill="#2b2d33">
        FOLIO
      </text>
      <text x="50" y="61" textAnchor="middle" fontSize="6.5" letterSpacing="1.2" fill="#2b2d33">
        SHOP
      </text>
    </svg>
  );
}

/** 100px promo strip with its own pager (reference: marketing banner, "2/3"). */
function DetailBanners() {
  const [i, setI] = useState(0);
  const n = DETAIL_BANNERS.length;
  const b = DETAIL_BANNERS[i];
  const step = (d: number) => setI((v) => (v + d + n) % n);
  return (
    <section aria-roledescription="carousel" aria-label="혜택 배너" className="relative mt-[60px] lg:mt-[120px]">
      <Link
        href={b.href}
        aria-live="polite"
        className="flex h-[100px] flex-col justify-center rounded-sm px-6 md:px-12"
        style={{ background: b.bg, color: b.ink }}
      >
        <strong className="text-[18px] leading-[26px] md:text-[20px]">{b.title}</strong>
        <span className="text-[13px] leading-[19px] opacity-80 md:text-[14px]">{b.text}</span>
      </Link>
      <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/45 text-[11px] leading-[16px] text-white">
        <button type="button" aria-label="이전 배너" onClick={() => step(-1)} className="flex size-6 items-center justify-center">
          <ChevronLeft className="size-3.5" strokeWidth={2} />
        </button>
        <span>
          {i + 1}/{n}
        </span>
        <button type="button" aria-label="다음 배너" onClick={() => step(1)} className="flex size-6 items-center justify-center">
          <ChevronRight className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

const PER_PAGE = 6;

/** Six-up recommendation corner with bare page numbers (at most three pages). */
function ProductCorner({ title, products }: { title: string; products: Product[] }) {
  const [page, setPage] = useState(1);
  if (products.length === 0) return null;
  const pages = Math.min(3, Math.ceil(products.length / PER_PAGE));
  return (
    <section className="border-t border-shop-250 pb-[60px] pt-[45px] first-of-type:border-t-0 first-of-type:pt-[60px]">
      <h2 className="mb-[30px] text-[22px] font-bold leading-[30px] md:text-[24px] md:leading-[32px]">{title}</h2>
      <ul className={GRID[6]}>
        {products.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((p) => (
          <ProductCard key={p.id} product={p} size="sm" />
        ))}
      </ul>
      <Pagination page={page} pages={pages} onChange={setPage} arrows={false} className="mt-10" />
    </section>
  );
}

/**
 * 상품정보 tab: detail cuts on the left, the description column on the right
 * (it follows the scroll on desktop), then the promo strip and three corners.
 */
export function ProductInfoPanel({ product: p, related, onSizeGuide }: { product: Product; related: Related; onSizeGuide: () => void }) {
  const corners = [related.similar, related.shelf, related.browsed];
  return (
    <>
      <div className="flex flex-col-reverse gap-10 pt-10 lg:flex-row lg:items-start lg:justify-between lg:pt-0">
        <div className="flex flex-col gap-1 lg:w-[53.57%]">
          {productCuts(p).map((c, i) => (
            <div key={i} className="relative pt-[133.33%]">
              <ProductArt art={c.art} detail={c.detail} className="absolute inset-0" />
            </div>
          ))}
        </div>
        <section aria-label="상품 설명" className="lg:sticky lg:top-[60px] lg:w-[39.29%] lg:pt-10">
          <div className="flex items-center justify-between gap-4 rounded-sm bg-linear-to-r from-[#f4f2ff] to-[#e8ecff] px-6 py-6 md:px-7">
            <div>
              <p className="text-[18px] font-bold leading-[26px] md:text-[20px]">{SELLER.title}</p>
              <p className="mt-2 text-[14px] leading-[22px] text-shop-700 md:text-[15px] md:leading-[24px]">{SELLER.text}</p>
            </div>
            <Seal />
          </div>
          <h3 className="mt-[50px] font-serif text-[17px] leading-[24px] text-shop-600">Notice</h3>
          <p className="mt-3 text-[15px] leading-[26px]">{noticeFor(p)}</p>
          <h3 className="mt-[50px] font-serif text-[17px] leading-[24px] text-shop-600">Detail</h3>
          <p className="mt-3 text-[15px] leading-[26px]">{p.desc}</p>
          <p className="mt-6 text-[15px] leading-[26px]">{careFor(p)}</p>
          <dl className="mt-10 grid grid-cols-[88px_1fr] gap-y-3 text-[14px] leading-[20px]">
            <dt>품번</dt>
            <dd>{p.code}</dd>
            <dt>시즌</dt>
            <dd>{p.season}</dd>
            <dt>사이즈/핏</dt>
            <dd>
              {p.sizes.join(", ")} / {p.fit}
              <button type="button" onClick={onSizeGuide} className="block text-shop-600 underline underline-offset-2 hover:text-shop-900">
                자세히보기
              </button>
            </dd>
            <dt>소재정보</dt>
            <dd>{p.material}</dd>
          </dl>
          <p className="mt-10 text-[14px] leading-[20px]">{COLOR_NOTE}</p>
        </section>
      </div>
      <DetailBanners />
      <div className="mt-[30px]">
        {CORNER_TITLES.map((title, i) => (
          <ProductCorner key={title} title={title} products={corners[i]} />
        ))}
      </div>
    </>
  );
}
