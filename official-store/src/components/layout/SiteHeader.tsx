"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { GNB, type GnbItem } from "@/content/nav";
import { MOBILE_MENU_LINKS } from "@/content/site";
import { toast, useBag } from "@/lib/store";
import { cn } from "@/lib/utils";

// Fixed header (reference: #header). Desktop ≥1280: one 38px row of text menus
// with a 100px mega menu and search panel under it. Below 1280: a 44px icon
// bar that slides away while scrolling down, a search panel and a full-screen
// menu with a second level.

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("block font-extrabold uppercase leading-none tracking-[0.02em] text-st-ink", className)} aria-label="SLOWN">
      SLOWN
    </span>
  );
}

function useSubmitSearch(onDone?: () => void) {
  const router = useRouter();
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = String(new FormData(e.currentTarget).get("keyword") ?? "").trim();
    if (!keyword) {
      toast("검색어를 입력해 주세요.");
      return;
    }
    onDone?.();
    router.push(`/search/?keyword=${encodeURIComponent(keyword.toLowerCase())}`);
  };
}

function LanguageSwitch({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      <Link href="/" className="px-[5px]">
        한국어
      </Link>
      /
      <button type="button" className="px-[5px]" onClick={() => toast("영문 스토어는 데모에 포함되지 않았습니다.")}>
        EN
      </button>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const bag = useBag();
  const count = bag.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-[100]", home ? "bg-st-soft" : "bg-white")}>
        <DesktopBar home={home} count={count} />
        <MobileBar home={home} count={count} />
      </header>
      {/* Space the fixed bar takes from the page. */}
      <div aria-hidden="true" className="h-11 xl:h-[39px]" />
    </>
  );
}

// ── Desktop ────────────────────────────────────────────────────────────
function DesktopBar({ home, count }: { home: boolean; count: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLInputElement>(null);
  const focusKeyword = useRef(false);
  const submit = useSubmitSearch(() => setSearch(false));

  // Close everything when the page changes, the pointer leaves the header or
  // keyboard focus moves out of it. Hover opens a panel, so a click only opens
  // too: a toggle would shut the panel the pointer just opened.
  useEffect(() => {
    setOpen(null);
    setSearch(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setSearch(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // The closed search form is inert, so focus its field once it has opened.
  useEffect(() => {
    if (search && focusKeyword.current) keywordRef.current?.focus();
    focusKeyword.current = false;
  }, [search]);

  const current = GNB.find((g) => g.key === open);
  const panelOpen = !!current || search;

  return (
    <div
      ref={barRef}
      className="relative hidden border-b border-st-ink xl:block"
      onMouseLeave={() => {
        setOpen(null);
        setSearch(false);
      }}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
          setOpen(null);
          setSearch(false);
        }
      }}
    >
      <div className="relative z-[2] mx-auto flex h-[38px] max-w-[1920px] items-center justify-between">
        <Link href="/" aria-label="SLOWN 홈" className={cn("flex w-[98px]", home ? "ml-6" : "ml-7")} onMouseEnter={() => setOpen(null)}>
          <Wordmark className="text-[19px]" />
        </Link>
        <nav aria-label="주 메뉴" className="flex w-[calc(100%-178px)] justify-between">
          <ul className="flex">
            {GNB.map((item) => {
              const active = open === item.key;
              const cls = cn(
                "relative block px-[18px] text-[16px] uppercase leading-[1.6] tracking-[-0.02em] text-st-text",
                "after:absolute after:bottom-0 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-st-text after:transition-[width] after:duration-200 after:ease-linear",
                active ? "after:w-[calc(100%-36px)]" : "after:w-0",
              );
              return (
                <li key={item.key} onMouseEnter={() => (setSearch(false), setOpen(item.href ? null : item.key))}>
                  {item.href ? (
                    <Link href={item.href} className={cls} onFocus={() => setOpen(null)}>
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={cls}
                      aria-expanded={active}
                      aria-controls="gnb-panel"
                      onFocus={() => (setSearch(false), setOpen(item.key))}
                      onClick={() => setOpen(item.key)}
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex items-center text-[16px] uppercase leading-[1.6] tracking-[-0.02em] text-st-text" onMouseEnter={() => setOpen(null)}>
            <li onMouseEnter={() => setSearch(true)}>
              <button
                type="button"
                className="px-[18px]"
                aria-expanded={search}
                aria-controls="gnb-search"
                onClick={() => {
                  focusKeyword.current = true;
                  setSearch(true);
                }}
              >
                검색
              </button>
            </li>
            <li onMouseEnter={() => setSearch(false)}>
              <Link href="/member/login/" className="px-[18px]">
                로그인
              </Link>
            </li>
            <li onMouseEnter={() => setSearch(false)}>
              <Link href="/cart/" className="px-[18px]">
                장바구니{count > 0 && ` (${count})`}
              </Link>
            </li>
            <li onMouseEnter={() => setSearch(false)}>
              <LanguageSwitch className={home ? "mr-6" : "mr-[23px]"} />
            </li>
          </ul>
        </nav>
      </div>

      {/* White 100px panel under the bar (reference: .de_gnb_dimmed / .subs / ._srchbox). */}
      <div
        className={cn(
          "absolute inset-x-0 top-[38px] z-[1] h-[100px] border-b border-st-ink bg-white transition-[opacity,transform] duration-[400ms]",
          panelOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2.5 opacity-0",
        )}
      >
        <div id="gnb-panel" className={cn("flex h-full items-center transition-opacity duration-200", current ? "opacity-100 delay-200" : "pointer-events-none opacity-0")}>
          {current && <MegaLists item={current} />}
        </div>
        <form
          id="gnb-search"
          role="search"
          onSubmit={submit}
          inert={!search}
          className={cn("absolute inset-0 flex items-center pl-[195px] pr-[265px]", search ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <label htmlFor="gnb-keyword" className="sr-only">
            검색어
          </label>
          <input
            ref={keywordRef}
            id="gnb-keyword"
            name="keyword"
            type="search"
            placeholder="검색어 입력"
            autoComplete="off"
            className="h-[38px] w-full bg-white pl-2.5 text-[16px] leading-[1.6] text-[#353535] outline-none placeholder:text-st-faint focus:bg-st-field"
          />
          <button type="submit" className="ml-2.5 h-[38px] w-20 shrink-0 px-2.5 text-right text-[16px] uppercase leading-[1.6]">
            검색하기
          </button>
        </form>
      </div>
    </div>
  );
}

function MegaLists({ item }: { item: GnbItem }) {
  const link = cn(
    "relative flex px-2.5 text-[14px] leading-[1.6] text-st-text min-[1506px]:px-[22px] min-[1506px]:text-[16px]",
    "after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-st-text after:transition-[width] after:duration-200 after:ease-linear",
    "hover:after:w-[calc(100%-20px)] min-[1506px]:hover:after:w-[calc(100%-44px)]",
  );
  return (
    <>
      <ul className="ml-[184px] flex min-[1506px]:ml-[173px]">
        {item.regulars.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={link}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {item.subs.length > 0 && (
        <ul className="ml-[74px] flex">
          {item.subs.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// ── Mobile ─────────────────────────────────────────────────────────────
function MobileBar({ home, count }: { home: boolean; count: number }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const submit = useSubmitSearch(() => setSearch(false));

  useEffect(() => {
    setSearch(false);
    setMenu(false);
  }, [pathname]);

  // Slide the bar away while scrolling down, back while scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) setHidden(false);
      else if (Math.abs(y - last) > 4) setHidden(y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="xl:hidden">
      <div
        className={cn(
          "flex h-11 items-center justify-between transition-transform duration-500 ease-out",
          home ? "bg-st-soft" : "bg-white",
          hidden && !search && !menu && "-translate-y-full",
        )}
      >
        <Link href="/" aria-label="SLOWN 홈" className={home ? "ml-4" : "ml-3"}>
          <Wordmark className="text-[16px]" />
        </Link>
        <ul className={cn("flex gap-3", home ? "mr-4" : "mr-3")}>
          <li>
            <button type="button" aria-label="검색" aria-expanded={search} aria-controls="mo-search" onClick={() => setSearch((s) => !s)} className="flex size-6 items-center justify-center">
              <Search className="size-[18px]" strokeWidth={1.4} />
            </button>
          </li>
          <li>
            <Link href="/cart/" aria-label={`장바구니${count ? ` ${count}개` : ""}`} className="relative flex size-6 items-center justify-center">
              <ShoppingBag className="size-[18px]" strokeWidth={1.4} fill={count ? "currentColor" : "none"} />
              {count > 0 && <span className="absolute inset-x-0 top-[9px] text-center text-[8px] font-semibold leading-none text-white">{count}</span>}
            </Link>
          </li>
          <li>
            <button ref={burgerRef} type="button" aria-label="메뉴 열기" aria-expanded={menu} onClick={() => setMenu(true)} className="flex size-6 items-center justify-center">
              <Menu className="size-[18px]" strokeWidth={1.4} />
            </button>
          </li>
        </ul>
      </div>

      <form
        id="mo-search"
        role="search"
        onSubmit={submit}
        inert={!search}
        className={cn(
          "absolute inset-x-0 top-11 flex h-[100px] items-center gap-2.5 bg-white px-[15px] transition-[opacity,transform] duration-300",
          search ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-5 opacity-0",
        )}
      >
        <label htmlFor="mo-keyword" className="sr-only">
          검색어
        </label>
        <input
          key={search ? "open" : "closed"}
          id="mo-keyword"
          name="keyword"
          type="search"
          placeholder="검색어 입력"
          autoComplete="off"
          className="h-[27px] w-full border-b border-st-ink bg-transparent text-[12px] text-[#353535] outline-none placeholder:text-st-faint focus:bg-st-field"
        />
        <button type="submit" className="h-[27px] w-[70px] shrink-0 text-right text-[12px]">
          검색하기
        </button>
      </form>

      {menu && (
        <MobileMenu
          onClose={() => {
            setMenu(false);
            burgerRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [item, setItem] = useState<GnbItem | null>(null);
  const [shown, setShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Lock the page behind the menu while it is open.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkCls = "flex h-[53px] items-center pl-3 text-[18px] tracking-[-0.02em] text-st-ink";

  return (
    <div role="dialog" aria-modal="true" aria-label="전체 메뉴" className={cn("fixed inset-0 z-[300] overflow-y-auto bg-white transition-opacity duration-200", shown ? "opacity-100" : "opacity-0")}>
      <div className="flex h-11 items-center justify-between">
        <Link href="/" aria-label="SLOWN 홈" className="ml-3">
          <Wordmark className="text-[16px]" />
        </Link>
        <button ref={closeRef} type="button" aria-label="메뉴 닫기" onClick={onClose} className="flex size-11 items-center justify-center">
          <X className="size-[18px]" strokeWidth={1.3} />
        </button>
      </div>

      {item ? (
        <div className="pb-24 pl-3">
          <button type="button" onClick={() => setItem(null)} className="mt-5 flex items-center gap-1 text-[14px]" aria-label="뒤로">
            <ArrowLeft className="size-[18px]" strokeWidth={1.2} />
          </button>
          <h2 className="mt-8 inline-block border-b border-st-ink text-[18px] leading-[1.4] text-st-ink">{item.name}</h2>
          <ul className="mt-6 pl-3">
            {item.regulars.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex h-[42px] items-center text-[14px] font-medium text-st-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {item.subs.length > 0 && (
            <ul className="mt-10 pl-3">
              {item.subs.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex h-[42px] items-center text-[14px] font-medium text-st-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {item.cards && (
            <ul className="scrollbar-none -ml-3 mt-24 flex snap-x gap-2.5 overflow-x-auto pl-5 pr-5">
              {item.cards.map((c) => (
                <li key={c.href} className="w-[156px] shrink-0 snap-start">
                  <Link href={c.href} className="block">
                    <span className="block aspect-[3/4] overflow-hidden">
                      <SceneArt scene={c.scene} />
                    </span>
                    <span className="mt-1.5 block px-1 text-[13px] text-st-text">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <ul className="pt-[60px]">
            {GNB.map((g) => (
              <li key={g.key}>
                {g.href ? (
                  <Link href={g.href} className={cn(linkCls, "inline-flex pr-3")}>
                    {g.name}
                  </Link>
                ) : (
                  <button type="button" className={cn(linkCls, "pr-3")} onClick={() => setItem(g)}>
                    {g.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <ul className="fixed inset-x-0 bottom-0 pb-5">
            {MOBILE_MENU_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex h-[42px] items-center pl-3 text-[14px] text-st-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex h-[42px] items-center pl-3 text-[14px] text-st-ink">
              <LanguageSwitch className="-ml-[5px]" />
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
