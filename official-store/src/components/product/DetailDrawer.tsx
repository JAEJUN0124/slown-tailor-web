"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { careNotes, noticeRows, REPAIR_POLICY, sizeGuide, type Table } from "@/content/guide";
import { STORES } from "@/content/stores";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";

export const DRAWER_TABS = ["상세 정보", "사이즈 안내", "취급사항", "필수 표시", "수선 규정"] as const;
export type DrawerTab = (typeof DRAWER_TABS)[number];

function SimpleTable({ table }: { table: Table }) {
  return (
    <table className="w-full table-fixed text-center text-[12px] leading-[1.6] text-st-text xl:text-[13px]">
      <thead>
        <tr className="border-b border-st-faint">
          {table.head.map((h) => (
            <th key={h} scope="col" className="py-3 font-normal">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((r) => (
          <tr key={r[0]} className="border-b border-st-line">
            {r.map((c, i) =>
              i === 0 ? (
                <th key={i} scope="row" className="py-3 font-normal">
                  {c}
                </th>
              ) : (
                <td key={i} className="py-3">
                  {c}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const H = ({ children }: { children: ReactNode }) => <h3 className="text-[14px] font-semibold leading-[1.4] text-st-deep">{children}</h3>;

function TabBody({ tab, product: p }: { tab: DrawerTab; product: Product }) {
  if (tab === "상세 정보")
    return (
      <div className="space-y-4 text-[14px] leading-[1.6] text-st-text">
        <H>{p.materialTitle}</H>
        <p>{p.material}</p>
        <p className="text-st-mute">{p.desc}</p>
      </div>
    );
  if (tab === "사이즈 안내") {
    const g = sizeGuide(p);
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <H>사이즈 정보</H>
          <SimpleTable table={g.table} />
          {g.model && <p className="text-[14px] font-medium leading-[1.4] text-st-deep">{g.model}</p>}
          <p className="text-[12px] leading-[1.6] text-st-faint">사이즈 측정 방법에 따라 1-2cm 정도의 오차가 생길 수 있습니다.</p>
        </div>
        {g.recommend && (
          <div className="space-y-4 pt-6">
            <H>사이즈 추천</H>
            <SimpleTable table={g.recommend} />
          </div>
        )}
      </div>
    );
  }
  if (tab === "취급사항") {
    const c = careNotes(p);
    return (
      <div className="space-y-3 text-[14px] leading-[1.6] text-st-text">
        <p>{c.lead}</p>
        <ul className="space-y-1">
          {c.items.map((i) => (
            <li key={i}>- {i}</li>
          ))}
        </ul>
        <p>- 부주의로 인한 제품 손상은 교환과 보상이 어려우니 위 주의사항을 꼭 지켜 주세요.</p>
      </div>
    );
  }
  if (tab === "필수 표시")
    return (
      <div className="space-y-6">
        <dl className="divide-y divide-st-line border-y border-st-line text-[14px] leading-[1.6]">
          {noticeRows(p).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-3">
              <dt className="text-st-mute">{k}</dt>
              <dd className="text-st-text">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-[12px] leading-[1.6] text-st-mute">품질 보증 기준은 관련법 및 소비자 분쟁 해결 규정에 따릅니다.</p>
      </div>
    );
  const r = REPAIR_POLICY;
  return (
    <div className="space-y-8 text-[14px] leading-[1.6] text-st-text">
      <section className="space-y-3">
        <H>{r.tailoring.title}</H>
        <p>{r.tailoring.body}</p>
        <ul>
          {r.tailoring.rules.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
        {r.tailoring.notes.map((x) => (
          <p key={x} className="text-st-mute">
            {x}
          </p>
        ))}
      </section>
      <section className="space-y-3">
        <H>테일러링 서비스 신청 방법</H>
        {r.apply.map((a) => (
          <div key={a.title}>
            <p className="font-medium">{a.title}</p>
            <p className="text-st-mute">{a.body}</p>
          </div>
        ))}
      </section>
      <section className="space-y-3">
        <H>{r.repair.title}</H>
        <p>{r.repair.body}</p>
        <ul>
          {r.repair.rules.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section className="space-y-4">
        <H>수선 접수 매장</H>
        {STORES.slice(0, 4).map((s) => (
          <div key={s.name} className="text-[13px]">
            <p className="font-medium">
              {s.name} ({s.nameEn})
            </p>
            <p className="text-st-mute">운영시간 : {s.hours}</p>
            <p className="text-st-mute">주소 : {s.address}</p>
            <p className="text-st-mute">연락처 : {s.tel}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

/**
 * "상품 상세 정보 보기" panel: a right-side drawer on desktop, a bottom sheet
 * on phones, over a #f5f5f5 50% backdrop.
 */
export function DetailDrawer({
  product,
  open,
  tab,
  onTab,
  onClose,
}: {
  product: Product;
  open: boolean;
  tab: DrawerTab;
  onTab: (t: DrawerTab) => void;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const back = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      back?.focus();
    };
  }, [open]);

  useEffect(() => {
    panel.current?.querySelector("[data-body]")?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <>
      <div aria-hidden="true" onClick={onClose} className={cn("fixed inset-0 z-[200] bg-st-soft transition-opacity duration-[400ms]", open ? "opacity-50" : "pointer-events-none opacity-0")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="상품 상세 정보"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[210] flex max-h-[85vh] flex-col bg-white shadow-[0_-2px_12px_0_rgb(0_0_0/0.1)] transition-[transform,opacity] duration-[400ms] ease-in-out",
          "xl:inset-y-0 xl:left-auto xl:right-0 xl:max-h-none xl:w-[45%]",
          open ? "translate-x-0 translate-y-0 opacity-100" : "translate-y-full opacity-0 xl:translate-x-full xl:translate-y-0",
        )}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5 xl:px-5 xl:pt-6">
          <h2 className="text-[16px] font-medium leading-[1.4] text-st-deep">상품 상세 정보 보기</h2>
          <button ref={closeRef} type="button" aria-label="닫기" onClick={onClose} className="flex size-8 items-center justify-center">
            <X className="size-5" strokeWidth={1.3} />
          </button>
        </div>
        <div role="tablist" aria-label="상세 정보 구분" className="scrollbar-none flex gap-6 overflow-x-auto px-8 pt-6">
          {DRAWER_TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={t === tab}
              onClick={() => onTab(t)}
              className={cn("shrink-0 border-b pb-2 text-[14px] font-semibold leading-[1.4]", t === tab ? "border-st-ink text-st-ink" : "border-transparent text-st-faint")}
            >
              {t}
            </button>
          ))}
        </div>
        <div data-body className="flex-1 overflow-y-auto px-8 pb-8 pt-10">
          <TabBody tab={tab} product={product} />
        </div>
        <div className="px-5 pb-5 pt-2">
          <button type="button" onClick={onClose} className="h-11 w-full bg-st-ink text-[14px] font-medium text-white">
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
