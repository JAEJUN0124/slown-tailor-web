"use client";

import { ShieldCheck, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SHOP_FOOTER } from "@/content/shop";
import { cn } from "@/lib/utils";
import { SmartLink } from "./ShopHeader";

// lucide v1 dropped brand marks, so the two SNS glyphs are drawn here.
function SnsIcon({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden="true">
      {label === "YouTube" ? (
        <>
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="M10.5 9.5 L14.5 12 L10.5 14.5 Z" fill="#fff" stroke="none" />
        </>
      ) : (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.8" cy="7.2" r="0.6" fill="#fff" />
        </>
      )}
    </svg>
  );
}

const divider =
  "relative before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-shop-250 before:content-['']";

const linkClass = "px-2 text-[15px] leading-[21px] text-shop-600 transition-colors hover:text-shop-900";

/** The reference opens this notice in a bare popup window; here it is a dialog. */
function NoEmailDialog({ onClose }: { onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { title, body, date } = SHOP_FOOTER.noEmail;
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[960] flex items-center justify-center bg-black/20 p-5" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="no-email-title"
        className="relative w-full max-w-[480px] bg-white p-8 text-shop-900 shadow-[0_8px_32px_rgb(0_0_0/0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="no-email-title" className="mb-4 text-[20px] font-bold leading-[26px]">
          {title}
        </h2>
        <p className="text-[15px] leading-[24px]">{body}</p>
        <p className="mt-4 text-[13px] leading-[19px] text-shop-600">{date}</p>
        <button ref={closeBtn} type="button" aria-label="닫기" onClick={onClose} className="absolute right-4 top-4 flex size-8 items-center justify-center">
          <X className="size-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function FooterLink({ link, className, onDialog }: { link: { label: string; href: string; strong?: boolean; dialog?: boolean }; className?: string; onDialog: () => void }) {
  if (link.dialog)
    return (
      <button type="button" onClick={onDialog} className={cn(linkClass, className)}>
        {link.label}
      </button>
    );
  return (
    <SmartLink href={link.href} className={cn(linkClass, link.strong && "font-bold text-shop-900", className)}>
      {link.label}
    </SmartLink>
  );
}

/** Gray footer: link rows, company block, certification + SNS (reference: `footer`). */
export function ShopFooter() {
  const f = SHOP_FOOTER;
  const [dialog, setDialog] = useState(false);
  const open = () => setDialog(true);
  const close = useCallback(() => setDialog(false), []);

  return (
    <footer className="bg-shop-150">
      <div className="border-b border-shop-250">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-y-2 px-5 py-4 lg:h-[60px] lg:py-0">
          <nav aria-label="회사 정보" className="flex flex-wrap items-center gap-y-2">
            {f.navGroups.map((group, g) => (
              <ul key={g} className={cn("flex flex-wrap items-center", g > 0 && cn(divider, "md:ml-4 md:pl-6"))}>
                {group.map((link, i) => (
                  <li key={link.label}>
                    <FooterLink link={link} onDialog={open} className={cn(i === 0 && g === 0 && "pl-0")} />
                  </li>
                ))}
              </ul>
            ))}
          </nav>
          <ul className="flex items-center">
            {f.quick.map((link, i) => (
              <li key={link.label}>
                <FooterLink link={link} onDialog={open} className={cn(i === f.quick.length - 1 && "pr-0", i === 0 && "max-lg:pl-0")} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 text-[13px] leading-[19px] lg:h-[364px] lg:pb-0">
        <strong className="mb-2.5 block font-bold text-shop-900">{f.company}</strong>
        <p className="mb-1">
          {f.info.map((line) => (
            <span
              key={line}
              className="relative mr-3 inline-block pr-3 text-shop-600 after:absolute after:right-0 after:top-1/2 after:h-2.5 after:w-px after:-translate-y-1/2 after:bg-shop-250 after:content-[''] last:after:hidden"
            >
              {line}
            </span>
          ))}
        </p>
        <p className="mb-1 text-shop-600">
          {f.escrow}{" "}
          <a href="#escrow" className="text-shop-900 underline">
            {f.escrowLink}
          </a>
        </p>
        <p className="mb-1 text-shop-900">{f.contact}</p>
        <p className="mt-5 text-[11px] leading-[14px] text-shop-600">{f.copyright}</p>

        <div className="mt-[60px] flex flex-wrap items-center gap-4">
          <p className="mr-auto flex min-h-[30px] items-center gap-2.5 text-shop-600">
            <ShieldCheck className="size-[30px] shrink-0 text-shop-450" strokeWidth={1.2} aria-hidden="true" />
            {f.cert}
          </p>
          <div className="flex items-center gap-3">
            {f.sns.map((sns) => (
              <a key={sns.label} href={sns.href} aria-label={sns.label} className="flex size-9 items-center justify-center rounded-full bg-shop-450 transition-colors hover:bg-shop-600">
                <SnsIcon label={sns.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
      {dialog && <NoEmailDialog onClose={close} />}
    </footer>
  );
}
