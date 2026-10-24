"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { HOME, type HomeLink, type HomeTab, type Shot } from "@/content/home";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { InView } from "./InView";

// Home (reference: #home-2609, rendered from HOME_DATA). Sections in order:
// hero carousel → philosophy → core essentials (tabbed) → season banner
// (tabbed) → most loved (tabbed) → explore the store. One Men/Women tab drives
// the three tabbed sections.

const KO = /[ㄱ-ㆎ가-힣]/;
/** Korean copy keeps words whole and tightens a little (reference: .ko). */
const ko = (s: string) => (KO.test(s) ? "break-keep tracking-[-0.01em]" : "");

const grid = "grid grid-cols-2 gap-x-(--hm-gap) px-(--hm-gutter) xl:grid-cols-12";
const titleCls = "text-[19px] font-normal leading-[23px] xl:text-[24px] xl:leading-[28px] xl:tracking-[0.01em]";
const descCls = "max-w-[52ch] text-[13px] leading-[17px] xl:text-[15px] xl:leading-[19px] xl:tracking-[0.01em]";

function Title({ text, className }: { text: string; className?: string }) {
  // "MEN | Most Loved": the bar is set lighter with a little room around it.
  const parts = text.split(/\s*\|\s*/);
  return (
    <h2 className={cn(titleCls, ko(text), className)}>
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && <span className="mx-[0.35em] font-light">|</span>}
          {p}
        </span>
      ))}
    </h2>
  );
}

function Media({ shot, className, shade }: { shot: Shot; className?: string; shade?: boolean }) {
  // The drawing settles from 1.06× to 1× as it scrolls in (reference: .hm-media img).
  return (
    <InView className={cn("hm-media relative overflow-hidden bg-[#e9e7e2]", shade && "hm-shade", className)}>
      <span className="absolute inset-0 xl:hidden">
        <SceneArt scene={shot.scene} focus={shot.focusMo ?? shot.focus} />
      </span>
      <span className="absolute inset-0 hidden xl:block">
        <SceneArt scene={shot.scene} focus={shot.focus} />
      </span>
    </InView>
  );
}

function TextLink({ link, light }: { link: HomeLink; light?: boolean }) {
  return (
    <Link href={link.href} className={cn("hm-link", light ? "text-st-paper" : "text-st-text", ko(link.label))}>
      <span>{link.label}</span>
    </Link>
  );
}

export function HomeView() {
  const [tab, setTab] = useState<HomeTab>("men");
  const [switching, setSwitching] = useState(false);

  // ?tab=women opens the Women tab (the reference supports the same link).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "women") setTab("women");
  }, []);

  const switchTab = (next: HomeTab) => {
    if (next === tab || switching) return;
    setSwitching(true);
    window.setTimeout(() => {
      setTab(next);
      setSwitching(false);
    }, 300);
  };

  const pane = cn("transition-opacity duration-300 ease-hm", switching && "opacity-0");

  return (
    <div data-home className="overflow-hidden text-st-text">
      <Hero />
      <Philosophy />
      <Essentials tab={tab} onTab={switchTab} pane={pane} />
      <Season tab={tab} pane={pane} />
      <Arrivals tab={tab} pane={pane} />
      <Store />
    </div>
  );
}

// ── 01 Hero ────────────────────────────────────────────────────────────
function Hero() {
  const slides = HOME.hero.slides;
  const n = slides.length;
  const reduced = useReducedMotion();
  // Rendered track: [last clone, ...slides, first clone]; pos 1 is the first slide.
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; id: number } | null>(null);

  const go = useCallback((step: number) => {
    setAnimate(true);
    setPos((p) => p + step);
  }, []);

  useEffect(() => {
    if (!HOME.hero.autoplay || reduced || paused || n < 2) return;
    const t = window.setInterval(() => go(1), HOME.hero.interval * 1000);
    return () => window.clearInterval(t);
  }, [go, reduced, paused, n]);

  // Jump from a clone back to the real slide without animating.
  const onEnd = () => {
    if (pos === n + 1) {
      setAnimate(false);
      setPos(1);
    } else if (pos === 0) {
      setAnimate(false);
      setPos(n);
    }
  };
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const current = (pos - 1 + n) % n;
  const track = [slides[n - 1], ...slides, slides[0]];

  const onDown = (e: ReactPointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onUp = (e: ReactPointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="메인 배너"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={cn("flex touch-pan-y", animate && !reduced && "transition-transform duration-500 ease-out")}
        style={{ transform: `translateX(${-pos * 100}%)` }}
        onTransitionEnd={onEnd}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
      >
        {track.map((s, i) => {
          const real = i >= 1 && i <= n;
          return (
            <div
              key={i}
              role={real ? "group" : undefined}
              aria-roledescription={real ? "slide" : undefined}
              aria-label={real ? `${i} / ${n}` : undefined}
              aria-hidden={!real || i - 1 !== current}
              className="relative w-full shrink-0"
              inert={!real || i - 1 !== current}
            >
              <Media shot={s.shot} shade className="is-inview aspect-[393/642] xl:aspect-auto xl:h-[min(56.25vw,calc(100vh-38px))]" />
              <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-14 pl-(--hm-gutter) pr-(--hm-gutter) pt-(--hm-overlay-pad) text-st-paper xl:justify-center xl:pb-(--hm-overlay-pad) xl:pr-[134px]">
                <div className="xl:flex xl:items-center xl:justify-between xl:gap-(--hm-gap)">
                  <h2 className={cn("mb-16 text-[24px] font-normal leading-[28px] xl:mb-0 xl:text-[32px] xl:leading-[36px] xl:tracking-[0.01em]", ko(s.title))}>{s.title}</h2>
                  <div className="xl:w-[346px] xl:shrink-0">
                    <p className={cn(descCls, "max-w-[33ch] xl:max-w-none", ko(s.desc))}>{s.desc}</p>
                    <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 xl:mt-6">
                      {s.links.map((l) => (
                        <TextLink key={l.href} link={l} light />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {n > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2 leading-none">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`슬라이드 ${i + 1}`}
              aria-current={i === current}
              onClick={() => {
                setAnimate(true);
                setPos(i + 1);
              }}
              className="flex h-4 items-center"
            >
              <span className={cn("block h-[1.5px] w-[13px] bg-white", i === current ? "opacity-100" : "opacity-50")} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

// ── 02 Philosophy ──────────────────────────────────────────────────────
function Philosophy() {
  const d = HOME.philosophy;
  return (
    <section className={cn(grid, "gap-y-8 bg-white py-(--hm-section-pad) xl:gap-y-0")}>
      <div className="col-span-full xl:col-[1/6] xl:flex xl:flex-col xl:justify-between">
        <InView className="hm-reveal">
          <Title text={d.title} />
        </InView>
        <InView className="hm-reveal" delay={1}>
          <p className={cn(descCls, "mt-8 xl:mt-12", ko(d.desc))}>{d.desc}</p>
        </InView>
      </div>
      <div className="col-span-full grid grid-cols-2 gap-x-(--hm-gap) xl:col-[7/13]">
        {d.images.map((im, i) => (
          <InView key={i} as="figure" className="hm-reveal" delay={(i + 1) as 1 | 2}>
            <Media shot={im} className="aspect-[2/3]" />
          </InView>
        ))}
      </div>
    </section>
  );
}

// ── 03 Core essentials ─────────────────────────────────────────────────
function Essentials({ tab, onTab, pane }: { tab: HomeTab; onTab: (t: HomeTab) => void; pane: string }) {
  const d = HOME.essentials;
  const p = d[tab];
  const scroller = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ width: 60, left: 0, desktop: true });

  // Scroll bar under the cards (reference: .hm-ess__sb). On desktop the thumb
  // shows the visible share; on mobile it is 1/slides long and follows the
  // left-most card.
  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const desktop = window.innerWidth >= 1280;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    const frac = desktop ? Math.min(1, el.clientWidth / el.scrollWidth) : 1 / p.items.length;
    setBar({ width: frac * 100, left: progress * (1 - frac) * 100, desktop });
  }, [p.items.length]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, tab]);

  useEffect(() => {
    scroller.current?.scrollTo({ left: 0 });
  }, [tab]);

  // Mouse drag to scroll, like the reference's grab cursor.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    e.currentTarget.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    const moved = drag.current?.moved;
    drag.current = null;
    if (moved) {
      // Swallow the click that ends a drag (it fires right after pointerup).
      const stop = (ev: MouseEvent) => ev.preventDefault();
      window.addEventListener("click", stop, { capture: true, once: true });
      window.setTimeout(() => window.removeEventListener("click", stop, { capture: true }), 0);
    }
  };

  const scrollbar = (where: "pc" | "mo") => (
    <div className={cn("relative overflow-hidden bg-[rgb(51_51_51/0.18)]", where === "pc" ? "mt-6 hidden h-px xl:block" : "col-span-full mt-5 h-0.5 xl:hidden")}>
      <span className="absolute inset-y-0 block bg-st-text transition-[left,width] duration-300 ease-hm" style={{ width: `${bar.width}%`, left: `${bar.left}%` }} />
    </div>
  );

  return (
    <section className="py-(--hm-section-pad)">
      <div className={cn(grid, "gap-y-8 xl:gap-y-0")}>
        <InView className="hm-reveal col-span-full xl:col-[1/6]">
          <Title text={d.title} />
        </InView>
        <InView className="hm-reveal col-span-full flex flex-col xl:col-[8/13]" delay={1}>
          <div className={pane}>
            <p className={cn(descCls, ko(p.desc))}>{p.desc}</p>
          </div>
          <div role="tablist" aria-label="에센셜 구분" className="mt-6 flex gap-4 text-[14px] leading-[18px] tracking-[0.01em] xl:order-first xl:mb-3 xl:mt-0">
            {HOME.tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={t.key === tab}
                onClick={() => onTab(t.key)}
                className={cn(
                  "border-b pb-[3px] transition-[opacity,border-color] duration-300 hover:opacity-50",
                  t.key === tab ? "border-current text-st-text" : "border-transparent text-st-tab",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          {scrollbar("pc")}
        </InView>
      </div>
      <div className={cn("mt-(--hm-head-gap) px-(--hm-gutter)", pane)}>
        <div
          ref={scroller}
          onScroll={update}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain xl:cursor-grab xl:snap-none xl:gap-4"
        >
          {p.items.map((it, i) => (
            <InView key={i} className="hm-reveal w-[calc((100%-8px)/1.38)] shrink-0 snap-start xl:w-[calc((100%-32px)/3)]" delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Link href={it.href} draggable={false} className="relative block">
                <Media shot={it.shot} shade className="aspect-[13/16] xl:aspect-[6/7]" />
                <div className="absolute inset-x-0 bottom-0 z-[2] px-4 py-6 text-center xl:p-6">
                  <span className={cn("hm-link text-st-paper", ko(it.label))}>
                    <span>{it.label}</span>
                  </span>
                </div>
              </Link>
            </InView>
          ))}
        </div>
      </div>
      <div className={grid}>{scrollbar("mo")}</div>
    </section>
  );
}

// ── 04 Season banner ───────────────────────────────────────────────────
function Season({ tab, pane }: { tab: HomeTab; pane: string }) {
  const p = HOME.season[tab];
  return (
    <section className={cn("relative flex flex-col-reverse pt-6 xl:block xl:pt-0", pane)}>
      <Media shot={p.shot} className="aspect-[393/508] xl:aspect-[16/10] xl:after:absolute xl:after:inset-x-0 xl:after:bottom-0 xl:after:h-[55%] xl:after:bg-linear-to-b xl:after:from-transparent xl:after:to-black/28" />
      <div className="pb-6 pl-(--hm-gutter) pr-(--hm-gutter) xl:absolute xl:inset-0 xl:z-[2] xl:flex xl:flex-col xl:justify-center xl:py-(--hm-overlay-pad) xl:pr-[134px] xl:text-st-paper">
        <div className="xl:flex xl:items-center xl:justify-between xl:gap-(--hm-gap)">
          <InView className="hm-reveal">
            <h2 className={cn("mb-8 text-[19px] font-normal leading-[28px] xl:mb-0 xl:text-[32px] xl:leading-[36px] xl:tracking-[0.01em]", ko(p.title))}>{p.title}</h2>
          </InView>
          <InView className="hm-reveal xl:w-[346px] xl:shrink-0" delay={1}>
            <p className={cn(descCls, "max-w-[33ch] xl:max-w-none", ko(p.desc))}>{p.desc}</p>
            <div className="mt-6">
              <Link href={p.cta.href} className="hm-link text-st-text xl:text-st-paper">
                <span>{p.cta.label}</span>
              </Link>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}

// ── 05 Most loved ──────────────────────────────────────────────────────
function Arrivals({ tab, pane }: { tab: HomeTab; pane: string }) {
  const p = HOME.arrivals[tab];
  return (
    <section className={cn("py-(--hm-section-pad)", pane)}>
      <div className={cn(grid, "gap-y-8 xl:flex xl:items-start xl:justify-between xl:gap-y-0 xl:px-[134px]")}>
        <InView className="hm-reveal col-span-full">
          <Title text={p.title} />
        </InView>
        <InView className="hm-reveal col-span-full xl:w-[346px] xl:shrink-0" delay={1}>
          <p className={cn(descCls, "xl:max-w-none", ko(p.desc))}>{p.desc}</p>
        </InView>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-(--hm-gap) px-(--hm-gutter) xl:grid-cols-2 xl:px-[134px]">
        {p.items.map((it, i) => (
          <InView key={i} className="hm-reveal" delay={i as 0 | 1}>
            <Link href={it.href} className="relative block">
              <Media shot={it.shot} shade className="aspect-square xl:aspect-[7/8]" />
              <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-8 pt-6 text-center text-st-paper xl:px-6 xl:pb-7">
                <p className="text-[19px] leading-[23px] xl:text-[24px] xl:leading-[28px] xl:tracking-[0.01em]">{it.name}</p>
                <span className="hm-link mt-3 text-st-paper">
                  <span>{p.cta}</span>
                </span>
              </div>
            </Link>
          </InView>
        ))}
      </div>
    </section>
  );
}

// ── 06 Explore the store ───────────────────────────────────────────────
function Store() {
  const d = HOME.store;
  return (
    <section className="pb-(--hm-section-pad)">
      <InView as="figure" className="hm-reveal">
        <Media shot={d.shot} className="aspect-[4/5] xl:aspect-auto xl:h-[min(45vw,80vh)]" />
      </InView>
      <div className={cn(grid, "mt-8 gap-y-8 xl:flex xl:items-start xl:justify-between xl:gap-y-0 xl:px-[134px]")}>
        <InView className="hm-reveal col-span-full">
          <Title text={d.title} />
        </InView>
        <InView className="hm-reveal col-span-full xl:w-[346px] xl:shrink-0" delay={1}>
          <p className={cn(descCls, "xl:max-w-none", ko(d.desc))}>{d.desc}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {d.ctas.map((c) => (
              <TextLink key={c.href} link={c} />
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}
