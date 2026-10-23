"use client";

import { ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { useId, useState } from "react";
import { MALL, BRAND } from "@/content/shop";
import { districtsOf, REGIONS, STORE_NOTES, STORE_SERVICES, STORES, type Store, type StoreService } from "@/content/stores";
import { cn } from "@/lib/utils";
import { Checkbox, Pagination } from "./ui";

const PAGE = 10;
const BRANDS = [BRAND.name, ...MALL.sisterShops.map((s) => s.label)];

function Select({ label, value, onChange, options, placeholder, disabled }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none border border-shop-250 bg-white pl-2 pr-8 text-[14px] outline-none focus:border-shop-900 disabled:text-shop-450"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" strokeWidth={1.4} aria-hidden="true" />
    </div>
  );
}

/** Drawn street grid with the store's pin; stands in for the reference's map. */
function MiniMap({ store }: { store: Store }) {
  const [x, y] = store.pin;
  return (
    <div className="relative mt-4 h-[220px] overflow-hidden rounded bg-[#eef0ec]" role="img" aria-label={`${store.name} 위치 약도: ${store.address}`}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 20 H100 M0 44 H100 M22 0 V60 M58 0 V60 M84 0 V60" stroke="#fff" strokeWidth="2.4" />
        <path d="M0 8 L100 54" stroke="#fff" strokeWidth="1.4" />
        <rect x="64" y="26" width="14" height="12" fill="#dfe6da" />
        <rect x="4" y="48" width="12" height="10" fill="#dfe6da" />
      </svg>
      <MapPin className="absolute size-8 -translate-x-1/2 -translate-y-full fill-shop-accent text-white" style={{ left: `${x}%`, top: `${y}%` }} strokeWidth={1.4} aria-hidden="true" />
      <p className="absolute bottom-2 right-3 text-[11px] text-shop-500">약도는 예시입니다</p>
    </div>
  );
}

function StoreRow({ store }: { store: Store }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="border-b border-shop-250 py-[30px]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-[21px]">
            {store.name}
            <span className="mx-3 font-normal text-shop-500" aria-hidden="true">
              |
            </span>
            <span className="sr-only">, </span>
            {store.type}
          </p>
          <p className="mt-2.5 text-[15px] leading-[22px]">{store.address}</p>
          <p className="mt-3 flex items-center gap-1.5 text-[14px] leading-[20px] text-shop-600">
            <Clock className="size-4" strokeWidth={1.4} aria-hidden="true" />
            <span className="sr-only">영업시간 </span>
            {store.hours}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[14px] leading-[20px] text-shop-600">
            <Phone className="size-4" strokeWidth={1.4} aria-hidden="true" />
            <span className="sr-only">전화 </span>
            <a href={`tel:${store.phone}`} className="hover:underline">
              {store.phone}
            </a>
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="가능한 서비스">
            {store.services.map((s) => (
              <li key={s} className="border border-shop-accent px-2 text-[12px] leading-[18px] text-shop-accent">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="flex shrink-0 items-center gap-1 self-start text-[14px] text-shop-600 hover:text-shop-900">
          매장 위치
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} strokeWidth={1.4} aria-hidden="true" />
        </button>
      </div>
      <div id={id} hidden={!open}>
        <MiniMap store={store} />
      </div>
    </li>
  );
}

/**
 * 매장찾기 (reference: `/public/common/information/searchStore`): brand,
 * region and district pickers with notes in a grey box, the count with
 * service filters, store rows with a fold-out location, pages.
 */
export function StoreFinder() {
  const [brand, setBrand] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [services, setServices] = useState<StoreService[]>([]);
  const [page, setPage] = useState(1);

  const base = STORES.filter((s) => (!brand || s.brand === brand) && (!region || s.region === region) && (!district || s.district === district));
  const list = base.filter((s) => services.every((v) => s.services.includes(v)));
  const reset = (fn: () => void) => () => {
    fn();
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[960px]">
      <div className="border-t border-shop-250 bg-shop-150 px-5 py-[30px] md:px-10">
        <div className="flex flex-col gap-2 md:flex-row">
          <Select label="브랜드" value={brand} onChange={(v) => reset(() => setBrand(v))()} options={BRANDS} placeholder="브랜드 전체" />
          <Select
            label="시/도"
            value={region}
            onChange={(v) =>
              reset(() => {
                setRegion(v);
                setDistrict("");
              })()
            }
            options={REGIONS}
            placeholder="전국"
          />
          <Select label="시/군/구" value={district} onChange={(v) => reset(() => setDistrict(v))()} options={region ? districtsOf(region) : []} placeholder="시/군/구" disabled={!region} />
        </div>
        <ul className="mt-5 space-y-1 text-[13px] leading-[20px] text-shop-600">
          {STORE_NOTES.map((n) => (
            <li key={n}>· {n}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-b border-shop-250 pb-4 md:flex-row md:items-end md:justify-between">
        <h2 className="text-[17px] leading-[23px]" aria-live="polite">
          전체 <span className="text-shop-accent">{list.length}</span>개 매장
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {STORE_SERVICES.map((v) => (
            <Checkbox
              key={v}
              checked={services.includes(v)}
              onChange={(on) => reset(() => setServices((l) => (on ? [...l, v] : l.filter((x) => x !== v))))()}
              className="font-bold"
            >
              {v} ({base.filter((s) => s.services.includes(v)).length})
            </Checkbox>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[15px]">조건에 맞는 매장이 없습니다.</p>
          <button
            type="button"
            onClick={reset(() => {
              setBrand("");
              setRegion("");
              setDistrict("");
              setServices([]);
            })}
            className="mt-5 h-9 rounded-md border border-shop-250 px-5 text-[14px] hover:border-shop-900"
          >
            조건 초기화
          </button>
        </div>
      ) : (
        <ul>
          {list.slice((page - 1) * PAGE, page * PAGE).map((s) => (
            <StoreRow key={s.id} store={s} />
          ))}
        </ul>
      )}
      <Pagination page={page} pages={Math.ceil(list.length / PAGE)} onChange={setPage} className="mt-10" />
    </div>
  );
}
