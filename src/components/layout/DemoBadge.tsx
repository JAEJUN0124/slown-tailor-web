import { SITE } from "@/content/site";

/** Persistent, quiet notice that the public build carries sample content. */
export function DemoBadge() {
  return (
    <p
      role="note"
      className="pointer-events-none fixed bottom-4 left-4 z-[900] rounded-full bg-espresso/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-cream/85 shadow-[0_8px_24px_-12px_rgb(43_30_20/0.6)] backdrop-blur-sm"
    >
      {SITE.demoNotice}
    </p>
  );
}
