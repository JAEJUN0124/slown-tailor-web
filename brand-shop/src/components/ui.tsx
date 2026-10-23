"use client";

import Link from "next/link";
import { Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Heart, Share2 } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { toast } from "@/lib/store";
import { useDismiss } from "@/lib/useDismiss";
import { cn } from "@/lib/utils";

// Small building blocks shared by the brand and mall screens.

/**
 * Home > … trail (reference: `.breadcrumb`, 13px, gray links + 12px chevrons).
 * `end` holds the icons some screens put on the same row (wish, share).
 */
export function Breadcrumb({
  items,
  className,
  end,
}: {
  items: { label: string; href?: string }[];
  className?: string;
  end?: ReactNode;
}) {
  return (
    <div className={cn("mx-auto flex max-w-[1440px] items-start justify-between gap-4 px-5 pt-5", className)}>
      <nav aria-label="현재 위치" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-y-1 text-[13px] leading-[19px]">
          {[{ label: "Home", href: "/" }, ...items].map((item, i, all) => {
            const last = i === all.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center">
                {last || !item.href ? (
                  <span className={last ? "text-shop-900" : "text-shop-450"} aria-current={last ? "page" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-shop-450 hover:text-shop-900">
                    {item.label}
                  </Link>
                )}
                {!last && <ChevronRight className="mx-1 size-3 text-shop-450" strokeWidth={1.6} aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
      {end}
    </div>
  );
}

/** Centred 40px page title of the mall-wide screens. */
export function PageTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn("mb-10 mt-10 text-center text-[30px] font-normal leading-[38px] text-shop-900 md:mt-[52px] md:text-[40px] md:leading-[48px]", className)}>
      {children}
    </h1>
  );
}

/**
 * Bordered 60px tab bar whose active tab turns black (reference: `.tab-rects`).
 * Used for the product detail tabs, promotion tabs and cart delivery tabs.
 */
export function TabRects({
  tabs,
  active,
  onChange,
  sticky = false,
  className,
  label,
  idPrefix,
}: {
  tabs: readonly string[];
  active: number;
  onChange: (i: number) => void;
  sticky?: boolean;
  className?: string;
  label: string;
  /** Links each tab to `{idPrefix}-panel-{i}`. */
  idPrefix?: string;
}) {
  return (
    <div className={cn(sticky && "sticky top-0 z-20", "bg-white", className)}>
      <div role="tablist" aria-label={label} className="scrollbar-none flex overflow-x-auto border border-shop-250">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={idPrefix && `${idPrefix}-tab-${i}`}
            aria-controls={idPrefix && `${idPrefix}-panel-${i}`}
            aria-selected={i === active}
            onClick={() => onChange(i)}
            className={cn(
              "flex h-[52px] min-w-[96px] flex-1 items-center justify-center whitespace-nowrap px-4 text-[15px] leading-[21px] transition-colors md:h-[60px] md:text-[17px] md:leading-[23px]",
              i === active ? "bg-shop-900 text-white" : "text-shop-600 hover:text-shop-900",
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

const pageBtn = "flex h-[22px] min-w-[30px] items-center justify-center text-[15px] leading-[22px]";

/**
 * « ‹ 1 2 3 › » (reference: `.page`; disabled arrows in #E5E5E5).
 * The product corners use the bare numbers (`arrows={false}`).
 */
export function Pagination({
  page,
  pages,
  onChange,
  className,
  arrows = true,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
  className?: string;
  arrows?: boolean;
}) {
  if (pages <= 1) return pages === 1 ? <p className={cn("mt-[30px] text-center text-[15px] font-bold", className)}>1</p> : null;
  const start = Math.floor((page - 1) / 10) * 10 + 1;
  const nums = Array.from({ length: Math.min(10, pages - start + 1) }, (_, i) => start + i);
  const arrow = (label: string, target: number, disabled: boolean, icon: ReactNode) => (
    <button type="button" aria-label={label} disabled={disabled} onClick={() => onChange(target)} className={cn(pageBtn, disabled ? "text-shop-250" : "text-shop-900")}>
      {icon}
    </button>
  );
  return (
    <nav aria-label="페이지" className={cn("mt-[30px] flex items-center justify-center gap-1.5", className)}>
      {arrows && arrow("첫 페이지", 1, page === 1, <ChevronsLeft className="size-4" strokeWidth={1.4} />)}
      {arrows && arrow("이전 페이지", page - 1, page === 1, <ChevronLeft className="size-4" strokeWidth={1.4} />)}
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
          className={cn(pageBtn, n === page ? "font-bold text-shop-900" : "text-shop-900 hover:underline")}
        >
          {n}
        </button>
      ))}
      {arrows && arrow("다음 페이지", page + 1, page === pages, <ChevronRight className="size-4" strokeWidth={1.4} />)}
      {arrows && arrow("마지막 페이지", pages, page === pages, <ChevronsRight className="size-4" strokeWidth={1.4} />)}
    </nav>
  );
}

/** Row with a title and a chevron that opens its body (reference: `.accordion-header`). */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
  titleClass,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClass?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cn("border-b border-shop-250", className)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className={cn("flex w-full items-center justify-between gap-4 py-6 text-left text-[18px] leading-[24px] text-shop-900 md:text-[20px] md:leading-[26px]", titleClass)}
        >
          {title}
          <ChevronDown className={cn("size-7 shrink-0 transition-transform duration-300 md:mr-10", open && "rotate-180")} strokeWidth={1} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pb-10">
        {children}
      </div>
    </div>
  );
}

/** 24px square checkbox with an accent check (reference: `.checkbox`). */
export function Checkbox({
  checked,
  onChange,
  children,
  className,
  disabled,
  id,
  describedBy,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  describedBy?: string;
}) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-[15px] leading-[21px] text-shop-900", disabled && "cursor-default text-shop-400", className)}>
      <input
        type="checkbox"
        id={id}
        aria-describedby={describedBy}
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-shop-900",
          checked ? "border-shop-accent bg-shop-accent text-white" : "border-shop-250 bg-white",
        )}
      >
        {checked && <Check className="size-4" strokeWidth={2.4} />}
      </span>
      {children}
    </label>
  );
}

/** Centred empty state with one way forward. */
export function EmptyState({ title, desc, action }: { title: string; desc?: string; action?: { label: string; href: string } }) {
  return (
    <div className="flex flex-col items-center px-5 py-20 text-center">
      <p className="text-[16px] leading-[24px] text-shop-900">{title}</p>
      {desc && <p className="mt-1 text-[14px] leading-[22px] text-shop-600">{desc}</p>}
      {action && (
        <Link href={action.href} className="mt-6 flex h-9 w-[220px] items-center justify-center rounded-md border border-shop-250 text-[14px] text-shop-900 transition-colors hover:border-shop-900">
          {action.label}
        </Link>
      )}
    </div>
  );
}

/** 1180px column used by the help desk and policy screens. */
export function Narrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-5 pb-[120px] xl:px-0", className)}>{children}</div>;
}

type Option = { value: string; label: string };

/**
 * Text button with a chevron that opens a short option list (reference:
 * `.filter .layer` on the promotion and ranking screens). The chosen option
 * is bold with a check.
 */
export function Dropdown({
  label,
  value,
  options,
  onChange,
  className,
  buttonClass,
  iconClass = "size-4",
  align = "right",
  suffix,
}: {
  /** Accessible name of the control, e.g. "브랜드". */
  label: string;
  value: string;
  options: readonly (string | Option)[];
  onChange: (value: string) => void;
  className?: string;
  buttonClass?: string;
  iconClass?: string;
  align?: "left" | "right";
  /** Text after the value, inside the button (ranking: "(SLOWN)"). */
  suffix?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useDismiss(ref, open, () => setOpen(false));
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const current = opts.find((o) => o.value === value) ?? opts[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${label}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className={cn("inline-flex items-center gap-1 text-shop-900", buttonClass)}
      >
        {current.label}
        {suffix}
        <ChevronDown className={cn(iconClass, "shrink-0 transition-transform", open && "rotate-180")} strokeWidth={1.2} aria-hidden="true" />
      </button>
      <ul
        id={id}
        hidden={!open}
        aria-label={label}
        className={cn(
          "absolute top-full z-30 mt-2.5 min-w-[140px] rounded-md border border-shop-250 bg-white py-3 shadow-[0_8px_20px_-12px_rgb(0_0_0/0.3)]",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        {opts.map((o) => (
          <li key={o.value}>
            <button
              type="button"
              aria-pressed={o.value === current.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-1.5 whitespace-nowrap px-5 py-1.5 text-left text-[14px] leading-[20px]",
                o.value === current.value ? "font-bold text-shop-900" : "pl-[39px] text-shop-600 hover:text-shop-900",
              )}
            >
              {o.value === current.value && <Check className="size-3.5" strokeWidth={2.2} aria-hidden="true" />}
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Wish heart or bookmark beside the breadcrumb; kept on this page only. */
export function SaveButton({ kind }: { kind: "wish" | "bookmark" }) {
  const [on, setOn] = useState(false);
  const Icon = kind === "wish" ? Heart : Bookmark;
  const label = kind === "wish" ? ["찜하기", "찜 해제"] : ["북마크", "북마크 해제"];
  return (
    <button type="button" aria-pressed={on} aria-label={label[on ? 1 : 0]} onClick={() => setOn((v) => !v)}>
      <Icon className={cn("size-6", on ? (kind === "wish" ? "fill-shop-like text-shop-like" : "fill-shop-900") : "text-shop-900")} strokeWidth={1.3} />
    </button>
  );
}

/** Copies the page address to the clipboard. */
export function ShareButton() {
  const failed = () => toast("주소를 복사하지 못했습니다. 주소창에서 직접 복사해 주세요.");
  const share = () => {
    if (!navigator.clipboard) return failed();
    navigator.clipboard.writeText(window.location.href).then(() => toast("페이지 주소를 복사했습니다."), failed);
  };
  return (
    <button type="button" aria-label="페이지 주소 복사" onClick={share}>
      <Share2 className="size-6" strokeWidth={1.3} />
    </button>
  );
}
