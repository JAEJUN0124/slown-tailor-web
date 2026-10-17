import type { ReactElement, ReactNode } from "react";
import type { StepKey } from "@/content/home";

// Original line illustrations for the four process steps.
// Shared style: 1.8 stroke, espresso ink, one amber accent per scene.
const INK = "#2B1E14";
const ACCENT = "#C9772F";

type ArtProps = { className?: string };

function Svg({ className, children }: ArtProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "auto" }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Caption({ x = 200, y = 276, children }: { x?: number; y?: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="9" fill={INK} fillOpacity="0.6" letterSpacing="0.8" fontFamily="inherit">
      {children}
    </text>
  );
}

/** Front view of a jacket in a 120×190 box, placed with `x`/`y`. */
function Jacket({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M14 30 Q28 18 44 14 L60 58 L76 14 Q92 18 106 30 L102 190 L18 190 Z" stroke={INK} strokeWidth="1.8" />
      <path d="M44 14 L50 50 L60 58 M76 14 L70 50 L60 58" stroke={INK} strokeWidth="1.6" />
      <path d="M50 50 L41 43 M70 50 L79 43" stroke={INK} strokeWidth="1.4" />
      <line x1="60" y1="58" x2="60" y2="190" stroke={INK} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="60" cy="104" r="3" stroke={INK} strokeWidth="1.5" />
      <circle cx="60" cy="128" r="3" stroke={INK} strokeWidth="1.5" />
      <line x1="74" y1="70" x2="90" y2="68" stroke={INK} strokeWidth="1.5" />
      <line x1="24" y1="152" x2="44" y2="152" stroke={INK} strokeWidth="1.4" />
      <line x1="76" y1="152" x2="96" y2="152" stroke={INK} strokeWidth="1.4" />
      <path d="M14 30 L4 156 L16 158 M106 30 L116 156 L104 158" stroke={INK} strokeWidth="1.6" />
    </g>
  );
}

function Consult({ className }: ArtProps) {
  return (
    <Svg className={className}>
      {/* two people across a table */}
      <circle cx="92" cy="104" r="20" stroke={INK} strokeWidth="1.8" />
      <path d="M58 172 Q60 136 92 132 Q124 136 126 172" stroke={INK} strokeWidth="1.8" />
      <circle cx="308" cy="104" r="20" stroke={INK} strokeWidth="1.8" />
      <path d="M274 172 Q276 136 308 132 Q340 136 342 172" stroke={INK} strokeWidth="1.8" />
      <ellipse cx="200" cy="186" rx="118" ry="26" stroke={INK} strokeWidth="1.8" />
      {/* fabric swatches on the table */}
      <rect x="160" y="174" width="30" height="20" rx="3" stroke={INK} strokeWidth="1.4" fill={INK} fillOpacity="0.06" />
      <rect x="198" y="170" width="30" height="20" rx="3" stroke={ACCENT} strokeWidth="1.8" fill={ACCENT} fillOpacity="0.08" />
      {/* tape measure arc */}
      <path d="M112 84 Q200 20 288 84" stroke={INK} strokeWidth="1.8" />
      <path d="M118 90 Q200 30 282 90" stroke={INK} strokeWidth="1.2" strokeOpacity="0.4" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = 0.08 + i * 0.084;
        const x = (1 - t) * (1 - t) * 112 + 2 * (1 - t) * t * 200 + t * t * 288;
        const y = (1 - t) * (1 - t) * 84 + 2 * (1 - t) * t * 20 + t * t * 84;
        return <line key={i} x1={x} y1={y} x2={x} y2={y + (i % 5 === 0 ? 9 : 5)} stroke={i === 5 ? ACCENT : INK} strokeWidth="1.4" />;
      })}
      <text x="200" y="42" textAnchor="middle" fontSize="10" fill={ACCENT} fontFamily="inherit" letterSpacing="0.6">
        44.5
      </text>
      {/* clock */}
      <circle cx="200" cy="240" r="16" stroke={INK} strokeWidth="1.8" />
      <line x1="200" y1="231" x2="200" y2="240" stroke={INK} strokeWidth="1.8" />
      <line x1="200" y1="240" x2="207" y2="244" stroke={INK} strokeWidth="1.8" />
      <Caption>60분 상담</Caption>
    </Svg>
  );
}

function Analysis({ className }: ArtProps) {
  const points: [number, number, string, string][] = [
    [98, 92, "45.0", "right"],
    [128, 128, "98.4", "right"],
    [128, 170, "82.1", "right"],
    [66, 104, "61.2", "left"],
  ];
  return (
    <Svg className={className}>
      {/* torso outline */}
      <circle cx="96" cy="44" r="18" stroke={INK} strokeWidth="1.8" />
      <path d="M58 82 Q70 66 96 66 Q122 66 134 82 L130 214 Q96 226 62 214 Z" stroke={INK} strokeWidth="1.8" />
      <line x1="96" y1="70" x2="96" y2="218" stroke={INK} strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.45" />
      <line x1="62" y1="130" x2="130" y2="130" stroke={INK} strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.45" />
      {points.map(([x, y, label, side]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="5" stroke={INK} strokeWidth="1.6" />
          <circle cx={x} cy={y} r="1.8" fill={INK} />
          <line
            x1={side === "right" ? x + 6 : x - 6}
            y1={y}
            x2={side === "right" ? 170 : 22}
            y2={y}
            stroke={INK}
            strokeWidth="1.2"
          />
          <text x={side === "right" ? 174 : 18} y={y + 3} textAnchor={side === "right" ? "start" : "end"} fontSize="9" fill={INK} fontFamily="inherit">
            {label}
          </text>
        </g>
      ))}
      {/* case matching grid */}
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => {
          const hot = (r === 2 && c === 3) || (r === 3 && c === 3) || (r === 3 && c === 4) || (r === 4 && c === 4);
          return (
            <circle
              key={`${r}-${c}`}
              cx={244 + c * 18}
              cy={52 + r * 18}
              r="2.6"
              fill={hot ? ACCENT : INK}
              fillOpacity={hot ? 1 : 0.28}
            />
          );
        }),
      )}
      <circle cx="307" cy="106" r="22" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="307" y="214" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} fontFamily="inherit">
        7,200+
      </text>
      <text x="307" y="230" textAnchor="middle" fontSize="9" fill={INK} fillOpacity="0.6" fontFamily="inherit">
        사례 비교
      </text>
      <Caption x={200} y={276}>DATA ANALYSIS · STEP 02</Caption>
    </Svg>
  );
}

function Making({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <circle cx="30" cy="30" r="4" fill={ACCENT} />
      <text x="40" y="33" fontSize="8" fill={INK} fillOpacity="0.6" fontFamily="inherit" letterSpacing="0.8">
        PATTERN · AUTO
      </text>
      {/* flat pattern pieces with seam allowance */}
      <path d="M36 56 L104 52 L120 84 L116 210 L40 214 Z" stroke={INK} strokeWidth="1.8" />
      <path d="M44 64 L100 61 L112 88 L108 202 L48 206 Z" stroke={INK} strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
      <path d="M132 70 L172 66 L180 210 L136 212 Z" stroke={INK} strokeWidth="1.8" />
      <line x1="40" y1="232" x2="116" y2="232" stroke={INK} strokeWidth="1.2" />
      <text x="78" y="246" textAnchor="middle" fontSize="9" fill={INK} fontFamily="inherit">
        49.0 cm
      </text>
      <text x="44" y="122" fontSize="8" fill={ACCENT} fontFamily="inherit">
        → pattern.dxf
      </text>
      {/* arrow */}
      <line x1="194" y1="140" x2="222" y2="140" stroke={INK} strokeWidth="1.8" />
      <polyline points="216,134 223,140 216,146" stroke={INK} strokeWidth="1.8" />
      {/* finished jacket */}
      <Jacket x={250} y={52} />
      <circle cx="382" cy="40" r="14" stroke={ACCENT} strokeWidth="1.8" />
      <text x="382" y="43" textAnchor="middle" fontSize="8" fontWeight="700" fill={ACCENT} fontFamily="inherit">
        18일
      </text>
      <Caption x={310} y={276}>18일 완성</Caption>
    </Svg>
  );
}

function Care({ className }: ArtProps) {
  const pins: [number, number, string][] = [
    [92, 76, "어깨"],
    [84, 150, "소매"],
    [100, 186, "허리"],
  ];
  return (
    <Svg className={className}>
      {/* jacket with fitting pins */}
      <Jacket x={78} y={46} />
      {pins.map(([x, y, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="6" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="2 2" />
          <circle cx={x} cy={y} r="2" fill={ACCENT} />
          <line x1={x - 8} y1={y} x2={40} y2={y} stroke={INK} strokeWidth="1.1" />
          <text x="36" y={y + 3} textAnchor="end" fontSize="9" fill={INK} fontFamily="inherit">
            {label}
          </text>
        </g>
      ))}
      {/* spool and needle */}
      <rect x="262" y="58" width="56" height="12" rx="3" stroke={INK} strokeWidth="1.8" />
      <rect x="268" y="70" width="44" height="42" stroke={INK} strokeWidth="1.8" fill={ACCENT} fillOpacity="0.1" />
      <rect x="262" y="112" width="56" height="12" rx="3" stroke={INK} strokeWidth="1.8" />
      <path d="M268 90 C240 96 236 130 252 150 S300 180 300 214" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 4" />
      <line x1="300" y1="214" x2="346" y2="168" stroke={INK} strokeWidth="2" />
      <ellipse cx="343" cy="171" rx="3.4" ry="1.2" transform="rotate(-45 343 171)" fill={INK} />
      <text x="290" y="44" textAnchor="middle" fontSize="10" fill={INK} fontFamily="inherit">
        평생 무료
      </text>
      <text x="350" y="214" fontSize="9" fill={INK} fontFamily="inherit">
        무료 수선
      </text>
      <text x="350" y="228" fontSize="9" fill={ACCENT} fontWeight="700" fontFamily="inherit">
        ₩0
      </text>
      <path d="M130 254 C150 270 230 272 310 252" stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.6" />
      <polyline points="303,248 311,252 305,259" stroke={INK} strokeWidth="1.2" strokeOpacity="0.6" />
      <Caption x={220} y={284}>CARE · STEP 04</Caption>
    </Svg>
  );
}

const ART: Record<StepKey, (p: ArtProps) => ReactElement> = {
  consult: Consult,
  analysis: Analysis,
  making: Making,
  care: Care,
};

export function StepArt({ step, className }: { step: StepKey; className?: string }) {
  const Art = ART[step];
  return <Art className={className} />;
}
