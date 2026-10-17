"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  ITEMS_TAB,
  OPTIONS_TAB,
  PACKAGES_TAB,
  QUOTE,
  RENTAL_TAB,
  SUITS_TAB,
  TABS,
  type PriceGroup,
  type TabKey,
} from "@/content/pricing";
import { cn, EASE_OUT } from "@/lib/utils";
import { MenuItem, PlainItem } from "./PriceItems";
import { usePricing } from "./selection";

/** Panel heading: a big line plus the note folded into one lead sentence. */
function PanelIntro({ title, noteTitle, body, sub }: { title: string; noteTitle?: string; body: string; sub?: string }) {
  return (
    <div className="mb-14 max-w-2xl md:mb-16">
      <h2 className="text-h1 text-espresso">{title}</h2>
      <p className="mt-5 text-lead text-mocha">
        {noteTitle && <span className="font-semibold text-coffee">{noteTitle} </span>}
        {body}
      </p>
      {sub && <p className="mt-2 text-caption text-mocha/80">{sub}</p>}
    </div>
  );
}

/** A group on the menu: label column on the left, lines on the right. */
function GroupBlock({
  kicker,
  label,
  hint,
  chip,
  labelSlot,
  children,
}: {
  kicker?: string;
  label: string;
  hint?: string;
  chip?: string;
  labelSlot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-5 border-t border-coffee/15 pt-7 lg:grid-cols-[240px_1fr] lg:gap-12 [&+&]:mt-16">
      <div className="lg:sticky lg:top-[140px] lg:self-start">
        {kicker && <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-deep">{kicker}</p>}
        {labelSlot ?? <h3 className="text-h3 text-espresso">{label}</h3>}
        {hint && <p className="mt-2 text-caption text-mocha">{hint}</p>}
        {chip && (
          <p className="mt-3 flex gap-2 text-caption leading-relaxed text-coffee">
            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" aria-hidden="true" />
            {chip}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Group({ group }: { group: PriceGroup }) {
  return (
    <GroupBlock kicker={group.kicker} label={group.label} hint={group.hint} chip={group.chip}>
      {group.items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
      {group.event && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-amber/15 px-5 py-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-deep">{group.event.label}</span>
          {group.event.items.map((line) => (
            <span key={line} className="text-caption font-medium text-espresso">
              {line}
            </span>
          ))}
          <span className="text-caption text-mocha sm:ml-auto">{group.event.until}</span>
        </div>
      )}
    </GroupBlock>
  );
}

function Footnote({ children }: { children: ReactNode }) {
  return <p className="mt-10 max-w-2xl text-caption leading-relaxed text-mocha">※ {children}</p>;
}

function PackagesPanel() {
  return (
    <>
      <PanelIntro title={PACKAGES_TAB.title} noteTitle={PACKAGES_TAB.note.title} body={PACKAGES_TAB.note.body} />
      {PACKAGES_TAB.groups.map((group) => (
        <Group key={group.label} group={group} />
      ))}
    </>
  );
}

function RentalPanel({ onShowPackages }: { onShowPackages: () => void }) {
  const { note, crossLink, groups, notice } = RENTAL_TAB;
  return (
    <>
      <PanelIntro title={note.title} body={note.body} sub={note.sub} />
      <button
        type="button"
        onClick={onShowPackages}
        className="-mt-8 mb-14 text-left text-caption text-mocha transition-colors hover:text-espresso"
      >
        {crossLink.before}
        <span className="font-semibold text-coffee underline decoration-amber decoration-2 underline-offset-4">{crossLink.link}</span>
        {crossLink.after}
      </button>
      {groups.map((group) => (
        <Group key={group.label} group={group} />
      ))}
      <div className="mt-14 border-l-2 border-amber pl-5">
        <p className="mb-3 text-[12px] font-semibold tracking-[0.06em] text-espresso">{notice.title}</p>
        <ul className="space-y-1.5 text-caption leading-relaxed text-mocha">
          {notice.items.map(([before, strong, after]) => (
            <li key={before} className="flex gap-2">
              <span className="flex-shrink-0 select-none">·</span>
              <span>
                {before}
                {strong && <span className="font-semibold text-espresso">{strong}</span>}
                {after}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const LINE_CHIP = {
  light: "border border-coffee/25 bg-cream text-coffee",
  coffee: "bg-coffee text-cream",
  amber: "bg-amber text-espresso",
} as const;

function SuitsPanel() {
  return (
    <>
      <PanelIntro title={SUITS_TAB.title} noteTitle={SUITS_TAB.note.title} body={SUITS_TAB.note.body} />
      <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-deep">{SUITS_TAB.subLabel}</p>
      {SUITS_TAB.lines.map((line) => (
        <GroupBlock
          key={line.chip}
          label={line.chip}
          labelSlot={
            <div>
              <span className={cn("inline-flex rounded-full px-3 py-1 text-[12px] font-bold tracking-wide", LINE_CHIP[line.chipStyle])}>
                {line.chip}
              </span>
              <p className="mt-2 text-caption text-mocha">{line.desc}</p>
            </div>
          }
        >
          {line.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </GroupBlock>
      ))}
      <Footnote>{SUITS_TAB.footnote}</Footnote>
    </>
  );
}

function ItemsPanel() {
  return (
    <>
      <PanelIntro title={ITEMS_TAB.title} noteTitle={ITEMS_TAB.note.title} body={ITEMS_TAB.note.body} />
      <GroupBlock label="단품">
        {ITEMS_TAB.items.map((item) => (
          <PlainItem key={item.id} item={item} />
        ))}
      </GroupBlock>
      <Footnote>{ITEMS_TAB.footnote}</Footnote>
    </>
  );
}

function OptionsPanel() {
  return (
    <>
      <PanelIntro title={OPTIONS_TAB.title} noteTitle={OPTIONS_TAB.note.title} body={OPTIONS_TAB.note.body} />
      {OPTIONS_TAB.columns.flat().map((group) => (
        <GroupBlock key={group.label} label={group.label}>
          {group.items.map((item) => (
            <PlainItem key={item.id} item={item} optionPricing />
          ))}
        </GroupBlock>
      ))}
    </>
  );
}

export function PricingTabs() {
  const { tab, setTab } = usePricing();
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const select = (key: TabKey) => {
    setTab(key);
    // If the menu is scrolled past its top, bring the new panel's start into view.
    const panel = panelRef.current;
    if (!panel) return;
    const top = panel.getBoundingClientRect().top;
    if (top < 0) {
      const y = window.scrollY + top - 60 - 56;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y });
    }
  };

  return (
    <>
      <div id="pricing-tabs" className="sticky top-[60px] z-20 border-b border-line/80 bg-cream/85 backdrop-blur-md">
        <nav className="container scrollbar-none flex gap-1 overflow-x-auto" role="tablist" aria-label="가격 탭">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              aria-controls="pricing-panel"
              onClick={() => select(t.key)}
              className={cn(
                "relative flex-shrink-0 whitespace-nowrap px-4 py-4 text-sm font-semibold transition-colors duration-300",
                tab === t.key ? "text-espresso" : "text-mocha hover:text-espresso",
              )}
            >
              {t.label}
              {tab === t.key && (
                <motion.span
                  layoutId="pricing-tab-thread"
                  className="absolute inset-x-4 -bottom-px h-[2px] rounded-full bg-amber"
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div ref={panelRef} id="pricing-panel" role="tabpanel" data-paint="cream" data-thread-side="right" className="relative py-16 md:py-20">
        <div className="container">
          <p className="mb-10 flex items-center gap-2 text-caption text-mocha">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-amber/30" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-deep" />
            </span>
            {QUOTE.addHint}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.25, ease: "easeIn" } }}
            >
              {tab === "packages" && <PackagesPanel />}
              {tab === "rental" && <RentalPanel onShowPackages={() => select("packages")} />}
              {tab === "suits" && <SuitsPanel />}
              {tab === "items" && <ItemsPanel />}
              {tab === "options" && <OptionsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
