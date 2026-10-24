"use client";

import type { ReactNode } from "react";
import { DEMO_ONLY, toast } from "@/lib/store";

/** Button for actions the mockup does not carry out: it only says so. */
export function DemoButton({ what, className, children }: { what: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => toast(`${what} ${DEMO_ONLY}`)} className={className}>
      {children}
    </button>
  );
}
