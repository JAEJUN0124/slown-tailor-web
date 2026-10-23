import { cn } from "@/lib/utils";

// Warm tonal backdrops that stand in for real photography. Colourful on
// purpose so the grayscale → colour hover from the reference still reads.
const TONES = [
  ["#2b1e14", "#71502f", "#e7c9a4"],
  ["#241c17", "#5b4636", "#d8c3ab"],
  ["#33241a", "#8a6440", "#f3d2a8"],
  ["#1f1a16", "#4e4339", "#cfc2b2"],
  ["#3a2617", "#a26a3a", "#f6c99a"],
  ["#2a221c", "#6d5848", "#e2d3c1"],
  ["#2e1f15", "#7f5532", "#f0c79b"],
  ["#262019", "#625547", "#dfd2c3"],
] as const;

type Figures = "single" | "pair" | "none";

/** Groom in a suit. */
function Groom({ color, x = 60 }: { color: string; x?: number }) {
  return (
    <g transform={`translate(${x - 60} 0)`}>
      <circle cx="60" cy="34" r="17" fill={color} />
      <path d="M22 160 L26 82 Q28 62 46 56 L60 72 L74 56 Q92 62 94 82 L98 160 Z" fill={color} />
      <path d="M52 60 L60 96 L68 60" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    </g>
  );
}

/** Bride with a veil and an A-line gown. */
function Bride({ color, x }: { color: string; x: number }) {
  return (
    <g transform={`translate(${x - 60} 6)`}>
      <circle cx="60" cy="36" r="15" fill={color} />
      <path d="M48 34 Q60 10 72 34 L86 120 Q60 112 40 120 Z" fill={color} opacity="0.55" />
      <path d="M50 56 Q60 50 70 56 L74 92 L100 160 L20 160 L46 92 Z" fill={color} />
    </g>
  );
}

export function PhotoPlaceholder({
  index = 0,
  label,
  alt,
  ratio,
  className,
  figures,
}: {
  index?: number;
  /** Small chip in the corner, e.g. a slot number. */
  label?: string;
  alt?: string;
  /** [width, height]; omit to fill the parent. */
  ratio?: readonly [number, number];
  className?: string;
  /** Defaults to a couple for landscape slots and a portrait otherwise. */
  figures?: Figures;
}) {
  const [deep, mid, light] = TONES[index % TONES.length];
  const angle = 140 + ((index * 37) % 80);
  const landscape = ratio ? ratio[0] > ratio[1] : false;
  const mode: Figures = figures ?? (landscape || index % 3 === 1 ? "pair" : "single");

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        aspectRatio: ratio ? `${ratio[0]} / ${ratio[1]}` : undefined,
        background: `radial-gradient(120% 90% at ${30 + ((index * 23) % 40)}% 15%, ${light} 0%, ${mid} 45%, ${deep} 100%), linear-gradient(${angle}deg, ${mid}, ${deep})`,
      }}
      role="img"
      aria-label={alt ?? label ?? "사진 자리"}
    >
      {mode === "single" && (
        <svg viewBox="0 0 120 160" className="absolute bottom-0 left-1/2 h-[72%] -translate-x-1/2" aria-hidden="true">
          <Groom color={deep} />
        </svg>
      )}
      {mode === "pair" && (
        <svg
          viewBox="0 0 220 160"
          className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", landscape || !ratio ? "h-[62%]" : "h-[48%]")}
          aria-hidden="true"
        >
          <Bride color={deep} x={78} />
          <Groom color={deep} x={142} />
        </svg>
      )}
      {label && (
        <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
