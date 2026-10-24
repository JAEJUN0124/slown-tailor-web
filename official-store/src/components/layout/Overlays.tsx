"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/content/site";
import { DEMO_ONLY, toast, type ToastMessage } from "@/lib/store";

/** Persistent, quiet notice that the build carries sample content. */
export function DemoBadge() {
  return (
    <p
      role="note"
      className="float-lift pointer-events-none fixed bottom-4 left-4 z-[400] rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/85 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] backdrop-blur-sm"
    >
      {BRAND.demoNotice}
    </p>
  );
}

/**
 * Round chat button in the bottom-right corner, where the reference shows its
 * third-party live chat. Here it only explains that the demo has no chat.
 */
export function ChatButton() {
  return (
    <button
      type="button"
      onClick={() => toast(`1:1 상담은 ${DEMO_ONLY}`)}
      className="float-lift fixed bottom-5 right-5 z-[90] flex size-14 flex-col items-center justify-center rounded-[22px] bg-[#151515] text-[15px] font-bold leading-[18px] tracking-normal text-white shadow-[0_6px_20px_-8px_rgb(0_0_0/0.55)] transition-transform hover:scale-105"
    >
      <span>1:1</span>
      <span>Talk</span>
    </button>
  );
}

/** Bottom-centre status line fed by toast() from lib/store. */
export function Toaster() {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<ToastMessage>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 3200);
    };
    window.addEventListener("slown:toast", onToast);
    return () => {
      window.removeEventListener("slown:toast", onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[500] flex justify-center px-4">
      {message && (
        <p className="pointer-events-auto flex items-center gap-4 bg-st-ink/90 px-5 py-3 text-[14px] leading-[20px] text-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)]">
          {message.text}
          {message.action && (
            <Link href={message.action.href} className="shrink-0 font-semibold underline underline-offset-2">
              {message.action.label}
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
