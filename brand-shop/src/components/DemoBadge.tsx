import { MALL } from "@/content/shop";

/** Persistent, quiet notice that the build carries sample content. */
export function DemoBadge() {
  return (
    <p
      role="note"
      className="pointer-events-none fixed bottom-4 left-4 z-[900] rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/85 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] backdrop-blur-sm"
    >
      {MALL.demoNotice}
    </p>
  );
}
