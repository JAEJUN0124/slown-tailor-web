import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

/** Brand wordmark. Colour comes from the caller so it can sit on dark or light paper. */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("font-black uppercase tracking-[0.02em]", className)}>{SITE.brand}</span>;
}
