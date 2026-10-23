"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ToastMessage } from "@/lib/store";

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
    window.addEventListener("folio:toast", onToast);
    return () => {
      window.removeEventListener("folio:toast", onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[950] flex justify-center px-4">
      {message && (
        <p className="pointer-events-auto flex items-center gap-4 rounded-md bg-shop-900/90 px-5 py-3 text-[14px] leading-[20px] text-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)]">
          {message.text}
          {message.action && (
            <Link href={message.action.href} className="shrink-0 font-bold underline underline-offset-2">
              {message.action.label}
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
