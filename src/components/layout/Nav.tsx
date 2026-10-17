"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CTA, NAV_LINKS, SITE } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Every page opens on a dark hero, so the bar starts light-on-dark.
  const onDark = !scrolled;

  return (
    <>
      <header
        style={{ top: "var(--bar-h, 0px)" }}
        className={cn(
          "fixed inset-x-0 z-50 h-[60px] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-b border-line/80 bg-cream/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-5 md:px-8 lg:px-[72px]">
          <Link href="/" aria-label={`${SITE.brand} 홈`}>
            <Wordmark className={cn("text-sm transition-colors duration-500", onDark ? "text-cream" : "text-espresso")} />
          </Link>

          <div className="hidden items-center md:flex">
            <nav className="mr-7 flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-[13px] transition-colors duration-300",
                    onDark ? "text-cream/70 hover:text-cream" : "text-mocha hover:text-espresso",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={SITE.bookingUrl}
              className="rounded-pill bg-amber px-5 py-2 text-[13px] font-medium text-espresso transition-colors duration-300 hover:bg-honey"
            >
              {CTA.booking}
            </a>
          </div>

          <button
            type="button"
            className={cn("flex items-center justify-center p-2 transition-colors md:hidden", onDark ? "text-cream" : "text-espresso")}
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-cream" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="flex h-[60px] items-center justify-between px-5">
            <Wordmark className="text-sm text-espresso" />
            <button type="button" className="p-2 text-espresso" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-7 px-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold text-espresso transition-colors duration-300 hover:text-coffee"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 p-5 pb-8">
            <a
              href={SITE.bookingUrl}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-pill bg-amber py-3 text-[15px] font-medium text-espresso transition-colors duration-300 hover:bg-honey"
            >
              {CTA.booking}
            </a>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-pill border border-coffee/40 py-3 text-[15px] font-medium text-coffee transition-colors duration-300 hover:bg-coffee hover:text-cream"
            >
              {CTA.pricing}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
