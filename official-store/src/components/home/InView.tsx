"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Adds `is-inview` once the element scrolls into view (reference: the home
 * renderer's IntersectionObserver, threshold .12, bottom margin -10%).
 * `immediate` shows it at once, as the reference does for the first screen.
 */
export function InView({
  as: Tag = "div",
  className,
  delay,
  immediate = false,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  immediate?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(immediate);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <Tag ref={ref} data-delay={delay || undefined} className={cn(className, seen && "is-inview")}>
      {children}
    </Tag>
  );
}
