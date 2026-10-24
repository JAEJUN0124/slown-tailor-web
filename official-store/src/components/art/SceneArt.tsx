import { useId, type ReactNode } from "react";
import type { Art, Scene } from "@/content/types";
import { cn } from "@/lib/utils";
import { ArtDrawing, tint } from "./ProductArt";

// Editorial "photography" for the store mockup: still-life scenes drawn in
// SVG in place of the reference's campaign and lookbook photos. Each scene is
// composed in a 1000×1000 square with the subject in the middle; the backdrop
// runs 300 units further on both sides (a 1600×1000 board) and the whole board
// is cropped like object-fit: cover, so it fills portrait and landscape
// frames alike.

const MOODS = {
  warm: { wall: ["#e2d6c6", "#cbbba5"], floor: "#b9a58c", light: "#fff6e6", line: "#a89377" },
  cool: { wall: ["#dfe2e4", "#c6cbcf"], floor: "#aab0b5", light: "#ffffff", line: "#9aa1a7" },
  stone: { wall: ["#e1dcd3", "#cac3b7"], floor: "#afa697", light: "#fffaf0", line: "#9d9484" },
  dusk: { wall: ["#6f645a", "#463d36"], floor: "#3a322c", light: "#f3d9b1", line: "#2c2622" },
  paper: { wall: ["#f4f2ed", "#e7e4dd"], floor: "#ddd9cf", light: "#ffffff", line: "#cfcabe" },
  slate: { wall: ["#5e646a", "#3c4146"], floor: "#2d3135", light: "#dfe6ec", line: "#24282b" },
  umber: { wall: ["#77604f", "#4a392e"], floor: "#33271f", light: "#f1d6b4", line: "#2a201a" },
} as const;

/** Left edge and width of the full board, in scene units. */
const L = -300;
const W = 1600;

type Mood = (typeof MOODS)[keyof typeof MOODS];

/** A garment drawing placed with its 200×266 box centred on (x, y) at scale s. */
const Garment = ({ art, x, y, s }: { art: Art; x: number; y: number; s: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) translate(-100 -133)`}>
    <ArtDrawing art={art} />
  </g>
);

const Hanger = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="none">
    <path d="M0 -38 Q0 -52 12 -52 Q22 -52 22 -42" stroke="#9a9a9a" strokeWidth="3" />
    <path d="M0 -38 L-74 6 Q-80 10 -72 12 L72 12 Q80 10 74 6 Z" fill="#a4835e" stroke="#7d6244" strokeWidth="2" />
  </g>
);

function Room({ m, id, floorY = 760, light = true, flip }: { m: Mood; id: string; floorY?: number; light?: boolean; flip?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={m.wall[0]} />
          <stop offset="1" stopColor={m.wall[1]} />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint(m.floor, 0.1)} />
          <stop offset="1" stopColor={tint(m.floor, -0.12)} />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m.light} stopOpacity="0.55" />
          <stop offset="1" stopColor={m.light} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={L} width={W} height="1000" fill={`url(#${id}-wall)`} />
      <rect x={L} y={floorY} width={W} height={1000 - floorY} fill={`url(#${id}-floor)`} />
      <path d={`M${L} ${floorY} H${L + W}`} stroke={m.line} strokeWidth="3" opacity="0.6" />
      {light && (
        <g transform={flip ? "translate(1000 0) scale(-1 1)" : undefined}>
          <path d={`M90 120 L330 120 L520 ${floorY} L260 ${floorY} Z`} fill={`url(#${id}-light)`} />
          <path d={`M260 ${floorY} L520 ${floorY} L640 1000 L330 1000 Z`} fill={m.light} opacity="0.12" />
        </g>
      )}
    </>
  );
}

const SCENES: Record<Scene["kind"], (m: Mood, s: Scene, id: string) => ReactNode> = {
  hanger: (m, s, id) => {
    const art = s.items?.[0] ?? { kind: "coat", color: "#6d6e70" };
    return (
      <>
        <Room m={m} id={id} flip={s.flip} />
        <path d="M380 236 H620" stroke="#8d8d8d" strokeWidth="6" strokeLinecap="round" />
        <Hanger x={500} y={318} s={1.9} />
        <Garment art={art} x={500} y={560} s={2.1} />
        <ellipse cx="500" cy="850" rx="260" ry="18" fill="#000" opacity="0.08" />
      </>
    );
  },
  rail: (m, s, id) => {
    const items = s.items?.length ? s.items : [{ kind: "coat" as const, color: "#6d6e70" }];
    // Seven garments across the full board; a portrait crop shows the middle three.
    const n = 7;
    const all = Array.from({ length: n }, (_, i) => items[(i + 4) % items.length]);
    return (
      <>
        <Room m={m} id={id} flip={s.flip} />
        <path d="M-220 250 H1220 M-190 250 V830 M1190 250 V830" stroke="#7b7b7b" strokeWidth="8" strokeLinecap="round" />
        {all.map((a, i) => {
          const x = -100 + i * 200;
          return (
            <g key={i}>
              <Hanger x={x} y={300} s={1.05} />
              <Garment art={a} x={x} y={452} s={1.18} />
            </g>
          );
        })}
        <ellipse cx="500" cy="840" rx="700" ry="16" fill="#000" opacity="0.08" />
      </>
    );
  },
  atelier: (m, s, id) => {
    const cloth = s.items?.[0]?.color ?? "#3d3d40";
    return (
      <>
        <Room m={m} id={id} floorY={820} flip={s.flip} />
        {/* window frame */}
        <g transform={s.flip ? "translate(1000 0) scale(-1 1)" : undefined}>
          <rect x="120" y="90" width="240" height="330" fill={m.light} opacity="0.35" />
          <path d="M120 90 H360 V420 H120 Z M240 90 V420 M120 255 H360" fill="none" stroke={tint(m.wall[1], -0.25)} strokeWidth="8" />
        </g>
        {/* bench */}
        <rect x="140" y="560" width="720" height="34" fill="#8a6a48" />
        <rect x="140" y="594" width="720" height="16" fill="#6f553a" />
        <path d="M180 610 V820 M820 610 V820" stroke="#5d4630" strokeWidth="22" />
        {/* fabric bolts */}
        <g>
          <rect x="230" y="476" width="230" height="84" rx="42" fill={cloth} />
          <rect x="270" y="404" width="200" height="76" rx="38" fill={tint(cloth, 0.3)} />
          <ellipse cx="460" cy="518" rx="24" ry="42" fill={tint(cloth, -0.25)} />
          <ellipse cx="470" cy="442" rx="20" ry="38" fill={tint(cloth, 0.05)} />
        </g>
        {/* spools and scissors */}
        {[560, 616, 668].map((x, i) => (
          <g key={x}>
            <rect x={x} y={470} width="34" height="90" rx="6" fill={["#e8e1d2", "#2b2b2b", "#6b4a33"][i]} />
            <rect x={x - 6} y={462} width="46" height="12" rx="3" fill="#b89a74" />
            <rect x={x - 6} y={556} width="46" height="8" rx="3" fill="#b89a74" />
          </g>
        ))}
        <g transform="translate(750 540) rotate(-14)">
          <ellipse cx="-26" cy="0" rx="18" ry="11" fill="none" stroke="#2b2b2b" strokeWidth="6" />
          <ellipse cx="-26" cy="26" rx="18" ry="11" fill="none" stroke="#2b2b2b" strokeWidth="6" />
          <path d="M-10 4 L96 -8 L-6 18 Z M-10 22 L96 8 L-6 10 Z" fill="#a9a9a9" />
        </g>
        <path d="M200 556 C260 540 300 556 360 548 S470 556 520 544" fill="none" stroke="#d8b24c" strokeWidth="6" />
      </>
    );
  },
  interior: (m, s, id) => {
    const art = s.items?.[0] ?? { kind: "jacket", color: "#23293a" };
    return (
      <>
        <Room m={m} id={id} floorY={700} light={false} />
        <g transform={s.flip ? "translate(1000 0) scale(-1 1)" : undefined}>
          {/* glass wall with a planted courtyard */}
          <rect x="-160" y="90" width="1320" height="430" fill={tint(m.wall[1], -0.2)} />
          <path d="M-160 90 H1160 V520 H-160 Z M60 90 V520 M280 90 V520 M500 90 V520 M720 90 V520 M940 90 V520" fill="none" stroke="#3b3b3b" strokeWidth="6" />
          {[-60, 150, 330, 560, 800, 1040].map((x, i) => (
            <g key={x} fill={["#5f7350", "#71845f", "#4f6343", "#6a7f58", "#5f7350", "#71845f"][i]}>
              <ellipse cx={x} cy="430" rx="80" ry="60" />
              <ellipse cx={x + 40} cy="390" rx="50" ry="44" opacity="0.85" />
            </g>
          ))}
          <rect x="-160" y="470" width="1320" height="50" fill="#4e4a44" />
          {/* bench and sofa */}
          <path d="M80 640 L420 600 L440 660 L100 720 Z" fill="#e9e5dc" />
          <path d="M100 720 L440 660 L440 690 L104 752 Z" fill="#cfc9bd" />
          <rect x="560" y="560" width="400" height="120" rx="18" fill="#a26a3d" />
          <rect x="560" y="660" width="400" height="90" rx="14" fill="#8c5a32" />
          <rect x="560" y="520" width="140" height="80" rx="16" fill="#b37848" />
          <rect x="720" y="520" width="140" height="80" rx="16" fill="#b37848" />
        </g>
        <Garment art={art} x={s.flip ? 210 : 790} y={330} s={0.9} />
      </>
    );
  },
  fold: (m, s, id) => {
    const art = s.items?.[0] ?? { kind: "knit", color: "#cbbfa9" };
    const c = art.color;
    return (
      <>
        <Room m={m} id={id} floorY={700} flip={s.flip} />
        <rect x="250" y="640" width="500" height="200" fill={tint(m.wall[1], -0.08)} />
        <rect x="250" y="626" width="500" height="18" fill={tint(m.wall[1], 0.12)} />
        {[0, 1, 2, 3].map((i) => {
          const y = 580 - i * 62;
          const col = i % 2 ? tint(c, 0.12) : c;
          return (
            <g key={i}>
              <rect x={320 + (i % 2) * 6} y={y} width="360" height="58" rx="14" fill={col} />
              <path d={`M${336 + (i % 2) * 6} ${y + 46} H${664 + (i % 2) * 6}`} stroke={tint(col, -0.2)} strokeWidth="3" strokeDasharray="3 5" />
            </g>
          );
        })}
        <g transform="translate(500 210) scale(1.2) translate(-100 -133)" opacity="0.95">
          <ArtDrawing art={{ ...art, variant: art.variant ?? "turtle" }} />
        </g>
      </>
    );
  },
  fabric: (m, s, id) => {
    const c = s.items?.[0]?.color ?? "#3d3d40";
    return (
      <>
        <defs>
          <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={tint(c, -0.25)} />
            <stop offset="0.5" stopColor={tint(c, 0.12)} />
            <stop offset="1" stopColor={tint(c, -0.2)} />
          </linearGradient>
        </defs>
        <rect x={L} width={W} height="1000" fill={c} />
        {[-2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M${-100 + i * 200} 0 C${0 + i * 200} 300 ${-150 + i * 200} 600 ${-40 + i * 200} 1000 L${120 + i * 200} 1000 C${20 + i * 200} 640 ${160 + i * 200} 300 ${60 + i * 200} 0 Z`}
            fill={`url(#${id}-fold)`}
            opacity="0.75"
          />
        ))}
        <rect x={L} width={W} height="1000" fill={m.light} opacity="0.08" />
      </>
    );
  },
  facade: (m, s, id) => (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint(m.wall[0], 0.2)} />
          <stop offset="1" stopColor={m.wall[0]} />
        </linearGradient>
      </defs>
      <rect x={L} width={W} height="1000" fill={`url(#${id}-sky)`} />
      <g transform={s.flip ? "translate(1000 0) scale(-1 1)" : undefined}>
        <rect x={L} y="120" width={W} height="600" fill={tint(m.wall[1], -0.1)} />
        {[-2, -1, 0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={120 + i * 170} y="300" width="110" height="420" fill={i === 2 ? "#8e3b2f" : tint(m.wall[1], -0.32)} />
        ))}
        <rect x={L} y="120" width={W} height="70" fill={tint(m.wall[1], 0.08)} />
        <rect x={L} y="720" width={W} height="40" fill={tint(m.floor, 0.15)} />
        <rect x={L} y="760" width={W} height="240" fill={tint(m.floor, -0.3)} />
        <path d={`M${L} 800 H${L + W}`} stroke={m.light} strokeWidth="4" opacity="0.25" />
        <g opacity="0.25" transform="translate(0 1520) scale(1 -1)">
          {[-2, -1, 0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={120 + i * 170} y="760" width="110" height="200" fill={i === 2 ? "#8e3b2f" : "#000"} />
          ))}
        </g>
      </g>
      {s.items?.[0] && <Garment art={s.items[0]} x={s.flip ? 330 : 670} y={600} s={0.62} />}
    </>
  ),
  outfit: (m, s, id) => {
    const [top, bottom, shoes] = s.items ?? [];
    return (
      <>
        <Room m={m} id={id} light={false} />
        <rect x={L} width={W} height="1000" fill={m.light} opacity="0.18" />
        {bottom && <Garment art={bottom} x={500} y={640} s={1.72} />}
        {top && <Garment art={top} x={500} y={340} s={1.62} />}
        {shoes && <Garment art={shoes} x={500} y={876} s={1.1} />}
      </>
    );
  },
};

/**
 * Scene "photo" filling its box. `focus` shifts the crop like object-position
 * (0–100 on each axis, default centre).
 */
export function SceneArt({ scene, className, focus }: { scene: Scene; className?: string; focus?: [number, number] }) {
  // Gradient ids must be unique per drawing: a duplicate inside a hidden copy
  // (the mobile/desktop pair) would leave the visible one unpainted.
  const id = `sc${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [fx, fy] = focus ?? [50, 50];
  const align = `x${fx < 34 ? "Min" : fx > 66 ? "Max" : "Mid"}Y${fy < 34 ? "Min" : fy > 66 ? "Max" : "Mid"}`;
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio={`${align} slice`} className={cn("block h-full w-full", className)} aria-hidden="true">
      <g transform="translate(300 0)">{SCENES[scene.kind](MOODS[scene.mood], scene, id)}</g>
    </svg>
  );
}
