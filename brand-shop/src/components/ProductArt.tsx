import type { CSSProperties, ReactNode } from "react";
import type { Art, ArtKind, ArtVariant } from "@/content/types";
import { cn } from "@/lib/utils";

// Flat studio "photography" for the mall mockup: one drawing per item kind
// on a soft gray backdrop. The hover cut zooms into a detail of the same item.

const BACKDROPS = [
  ["#efefef", "#e1e1e1"], // neutral
  ["#efebe6", "#e0d9d0"], // warm
  ["#ebedef", "#dcdfe3"], // cool
  ["#f2f0eb", "#e5e1d9"], // ivory
] as const;

/** Where the hover cut zooms in, in viewBox units. */
const FOCUS: Record<ArtKind, { x: number; y: number; s: number }> = {
  suit: { x: 100, y: 84, s: 1.9 },
  jacket: { x: 100, y: 96, s: 1.8 },
  coat: { x: 100, y: 88, s: 1.9 },
  shirt: { x: 100, y: 70, s: 2 },
  knit: { x: 100, y: 74, s: 1.9 },
  trousers: { x: 100, y: 64, s: 1.9 },
  skirt: { x: 100, y: 70, s: 1.8 },
  dress: { x: 100, y: 84, s: 1.8 },
  tie: { x: 100, y: 70, s: 2 },
  bowtie: { x: 100, y: 133, s: 1.5 },
  square: { x: 100, y: 120, s: 1.5 },
  cufflinks: { x: 80, y: 126, s: 1.8 },
  shoes: { x: 128, y: 160, s: 1.8 },
  pump: { x: 96, y: 176, s: 1.7 },
  bag: { x: 100, y: 164, s: 1.7 },
  case: { x: 128, y: 112, s: 1.9 },
  belt: { x: 150, y: 92, s: 1.9 },
  wallet: { x: 100, y: 140, s: 1.7 },
};

/** Mix #rrggbb towards black (amount < 0) or white (amount > 0). */
function tint(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const target = amount < 0 ? 0 : 255;
  const a = Math.abs(amount);
  return (
    "#" +
    [n >> 16, (n >> 8) & 255, n & 255]
      .map((v) => Math.round(v + (target - v) * a).toString(16).padStart(2, "0"))
      .join("")
  );
}

function lightness(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

type Pen = {
  /** body colour */
  c: string;
  /** seams, lapels, sleeves: darker on light items, lighter on near-black ones */
  d: string;
  /** highlight */
  l: string;
  v?: ArtVariant;
};

const shadow = (cx: number, cy: number, rx: number) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="#000" opacity="0.09" />
);

function Jacket({ c, d, v, inner }: Pen & { inner: "tie" | "tux" | "knit" }) {
  const lapel = v === "tux" ? "#2a2a2a" : d;
  return (
    <g>
      <path d="M58 52 C46 56 40 68 38 86 L31 170 L47 172 L55 102 Z" fill={d} />
      <path d="M142 52 C154 56 160 68 162 86 L169 170 L153 172 L145 102 Z" fill={d} />
      <path
        d="M58 52 L86 40 L100 64 L114 40 L142 52 C148 60 150 72 150 86 L152 178 L48 178 L50 86 C50 72 52 60 58 52 Z"
        fill={c}
        stroke={d}
        strokeWidth="0.8"
      />
      {inner === "knit" ? (
        <path d="M87 40 L100 66 L113 40 Z" fill="#2b2b2b" />
      ) : (
        <path d="M87 40 L100 66 L113 40 Z" fill="#f3f1ec" />
      )}
      {inner === "tie" && <path d="M97 46 L103 46 L105 66 L100 74 L95 66 Z" fill="#5c2230" />}
      {inner === "tux" && <path d="M100 47 L90 42 L90 53 Z M100 47 L110 42 L110 53 Z" fill="#111" />}
      <path d="M86 40 L80 60 L86 64 L72 82 L98 118 L100 66 Z" fill={lapel} />
      <path d="M114 40 L120 60 L114 64 L128 82 L102 118 L100 66 Z" fill={lapel} />
      <g fill={d}>
        {v === "db" ? (
          <>
            <circle cx="90" cy="130" r="2.4" />
            <circle cx="110" cy="130" r="2.4" />
            <circle cx="90" cy="150" r="2.4" />
            <circle cx="110" cy="150" r="2.4" />
          </>
        ) : (
          <>
            <circle cx="100" cy="132" r="2.4" />
            <circle cx="100" cy="152" r="2.4" />
          </>
        )}
      </g>
      <path d="M60 148 L84 146 M116 146 L140 148 M118 98 L136 96" stroke={d} strokeWidth="2" strokeLinecap="round" />
      <path d="M98 118 L97 178" stroke={d} strokeWidth="1" opacity="0.6" />
    </g>
  );
}

function Rib({ x1, x2, y1, y2, color }: { x1: number; x2: number; y1: number; y2: number; color: string }) {
  const lines: ReactNode[] = [];
  for (let x = x1 + 3; x < x2; x += 4) lines.push(<path key={x} d={`M${x} ${y1} L${x} ${y2}`} />);
  return (
    <g stroke={color} strokeWidth="1" opacity="0.5">
      {lines}
    </g>
  );
}

/** A cable stitch running down from (x, y). */
function cable(x: number, y: number, turns: number) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < turns; i++) d += i % 2 ? " c-6 5 -6 11 0 16" : " c6 5 6 11 0 16";
  return d;
}

const DRAW: Record<ArtKind, (p: Pen) => ReactNode> = {
  suit: (p) => (
    <g>
      <path d="M56 178 L144 178 L141 258 L107 258 L100 196 L93 258 L59 258 Z" fill={tint(p.c, -0.06)} />
      <path d="M76 196 L75 258 M124 196 L125 258" stroke={p.l} strokeWidth="1" opacity="0.35" />
      <Jacket {...p} inner={p.v === "tux" ? "tux" : "tie"} />
    </g>
  ),
  jacket: (p) => (
    <g transform="translate(100 142) scale(1.3) translate(-100 -108)">
      <Jacket {...p} inner="knit" />
    </g>
  ),
  coat: ({ c, d, v }) => (
    <g>
      <path d="M60 50 C46 54 40 66 38 86 L32 204 L48 206 L56 104 Z" fill={d} />
      <path d="M140 50 C154 54 160 66 162 86 L168 204 L152 206 L144 104 Z" fill={d} />
      <path
        d="M60 50 L88 38 L100 60 L112 38 L140 50 C148 58 150 70 150 86 L156 250 L44 250 L50 86 C50 70 52 58 60 50 Z"
        fill={c}
        stroke={d}
        strokeWidth="0.8"
      />
      <path d="M89 38 L100 60 L111 38 Z" fill="#2b2b2b" />
      <path d="M88 38 L80 58 L88 62 L70 86 L96 124 L100 60 Z" fill={d} />
      <path d="M112 38 L120 58 L112 62 L130 86 L104 124 L100 60 Z" fill={d} />
      <path d="M100 124 L100 250" stroke={d} strokeWidth="1.2" opacity="0.7" />
      <path d="M58 184 L80 182 M120 182 L142 184" stroke={d} strokeWidth="2" strokeLinecap="round" />
      {v === "belted" && (
        <g fill={d}>
          <path d="M48 148 L152 148 L152 158 L48 158 Z" />
          <path d="M108 153 L120 196 L113 198 L103 158 Z" />
          <path d="M104 155 L104 202 L98 202 L99 157 Z" />
        </g>
      )}
    </g>
  ),
  shirt: ({ c, d, v }) => (
    <g>
      <path d="M62 50 C50 54 44 64 42 80 L37 196 L51 198 L58 100 Z" fill={d} />
      <path d="M138 50 C150 54 156 64 158 80 L163 196 L149 198 L142 100 Z" fill={d} />
      <path d="M37 184 L51 186 L51 198 L37 196 Z M163 184 L149 186 L149 198 L163 196 Z" fill={tint(d, -0.08)} />
      <path
        d="M62 50 L84 40 L100 48 L116 40 L138 50 C146 58 148 68 148 82 L150 236 Q100 246 50 236 L52 82 C52 68 54 58 62 50 Z"
        fill={c}
        stroke={d}
        strokeWidth="0.8"
      />
      <path d="M84 40 Q100 34 116 40 L100 48 Z" fill={d} />
      <path d="M84 40 L100 48 L94 66 L80 52 Z M116 40 L100 48 L106 66 L120 52 Z" fill={c} stroke={d} strokeWidth="1" />
      {v === "bow" ? (
        <g fill={tint(c, -0.12)}>
          <path d="M100 54 L80 46 L84 64 Z M100 54 L120 46 L116 64 Z" />
          <path d="M98 56 L88 108 L95 104 L100 58 Z M102 56 L112 108 L105 104 L100 58 Z" />
        </g>
      ) : (
        <>
          <path d="M100 48 L100 240" stroke={d} strokeWidth="1.2" opacity="0.7" />
          <g fill={d}>
            {[76, 104, 132, 160, 188, 216].map((y) => (
              <circle key={y} cx="100" cy={y} r="1.8" />
            ))}
          </g>
          <path d="M112 84 H130 V102 H112 Z" fill="none" stroke={d} strokeWidth="1.2" opacity="0.7" />
        </>
      )}
    </g>
  ),
  knit: ({ c, d, v }) =>
    v === "vest" ? (
      <g>
        <path
          d="M70 46 L88 44 L100 80 L112 44 L130 46 C132 64 144 74 150 82 L150 226 L50 226 L50 82 C56 74 68 64 70 46 Z"
          fill={c}
          stroke={d}
          strokeWidth="0.8"
        />
        <path d="M88 44 L100 80 L112 44" fill="none" stroke={d} strokeWidth="4" />
        <path d="M70 46 C68 64 56 74 50 82 M130 46 C132 64 144 74 150 82" fill="none" stroke={d} strokeWidth="3" />
        <path d={`${cable(80, 98, 7)} ${cable(120, 98, 7)}`} fill="none" stroke={d} strokeWidth="2.4" opacity="0.6" />
        <path d="M50 214 L150 214 L150 226 L50 226 Z" fill={tint(c, -0.12)} />
        <Rib x1={50} x2={150} y1={214} y2={226} color={d} />
      </g>
    ) : (
      <g>
        <path d="M62 52 C50 56 44 66 42 82 L38 204 L52 206 L58 104 Z" fill={d} />
        <path d="M138 52 C150 56 156 66 158 82 L162 204 L148 206 L142 104 Z" fill={d} />
        <path d="M38 194 L52 196 L52 206 L38 204 Z M162 194 L148 196 L148 206 L162 204 Z" fill={tint(d, -0.1)} />
        <path
          d="M62 52 C74 46 86 44 100 44 C114 44 126 46 138 52 C146 60 148 70 148 84 L148 226 L52 226 L52 84 C52 70 54 60 62 52 Z"
          fill={c}
          stroke={d}
          strokeWidth="0.8"
        />
        {v === "cardigan" ? (
          <>
            <path d="M84 46 L100 96 L116 46" fill="none" stroke={d} strokeWidth="4" />
            <path d="M100 96 L100 226" stroke={d} strokeWidth="2" />
            <g fill={d}>
              {[112, 138, 164, 190].map((y) => (
                <circle key={y} cx="105" cy={y} r="2" />
              ))}
            </g>
          </>
        ) : (
          <path d="M84 46 Q100 60 116 46" fill="none" stroke={d} strokeWidth="5" strokeLinecap="round" />
        )}
        <path d="M52 212 L148 212 L148 226 L52 226 Z" fill={tint(c, -0.12)} />
        <Rib x1={52} x2={148} y1={212} y2={226} color={d} />
      </g>
    ),
  trousers: ({ c, d, l, v }) => (
    <g>
      <path
        d={
          v === "wide"
            ? "M62 34 L138 34 L156 252 L108 252 L100 100 L92 252 L44 252 Z"
            : "M62 34 L138 34 L144 252 L109 252 L100 96 L91 252 L56 252 Z"
        }
        fill={c}
        stroke={d}
        strokeWidth="0.8"
      />
      <path d="M62 34 L138 34 L138 46 L62 46 Z" fill={d} />
      <path d="M100 46 L100 92 M80 46 L82 76 M120 46 L118 76" stroke={d} strokeWidth="1.2" opacity="0.7" />
      <path
        d={v === "wide" ? "M70 100 L66 252 M130 100 L134 252" : "M76 96 L74 252 M124 96 L126 252"}
        stroke={l}
        strokeWidth="1"
        opacity="0.4"
      />
    </g>
  ),
  skirt: ({ c, d }) => (
    <g>
      <path d="M69 56 L131 56 L160 236 L40 236 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <g stroke={d} strokeWidth="1.2" opacity="0.45">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${69 + (i * 62) / 8} 56 L${40 + (i * 120) / 8} 236`} />
        ))}
      </g>
      <path d="M70 44 L130 44 L131 56 L69 56 Z" fill={d} />
    </g>
  ),
  dress: ({ c, d }) => (
    <g>
      <path d="M84 34 L87 74 M116 34 L113 74" stroke={d} strokeWidth="2" />
      <path d="M86 74 Q100 66 114 74 L124 122 L152 248 L48 248 L76 122 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <path d="M86 74 Q100 86 114 74" fill="none" stroke={d} strokeWidth="1.2" />
      <path d="M76 122 Q100 130 124 122" fill="none" stroke={d} strokeWidth="1" opacity="0.6" />
      <path d="M92 130 L82 248 M108 130 L118 248 M100 132 L100 248" stroke={d} strokeWidth="1" opacity="0.35" />
    </g>
  ),
  tie: ({ c, d, l }) => {
    // Half-width of the blade at height y, so the stripes stay inside it.
    const hw = (y: number) => 6 + ((y - 60) * 18) / 154;
    return (
      <g>
        <path d="M98 64 L110 64 L128 218 L104 244 L80 218 Z" fill="#000" opacity="0.08" />
        <path d="M94 60 L106 60 L124 214 L100 240 L76 214 Z" fill={c} />
        <path d="M90 38 L110 38 L106 60 L94 60 Z" fill={d} />
        <g stroke={l} strokeWidth="1.4" opacity="0.22">
          {[84, 104, 124, 144, 164, 184, 204].map((y) => (
            <path key={y} d={`M${100 - hw(y) + 1} ${y} L${100 + hw(y - 12) - 1} ${y - 12}`} />
          ))}
        </g>
      </g>
    );
  },
  bowtie: ({ c, d }) => (
    <g>
      {shadow(100, 168, 52)}
      <path d="M100 133 L54 108 Q46 133 54 158 Z M100 133 L146 108 Q154 133 146 158 Z" fill={c} />
      <path d="M54 108 Q74 128 88 130 M54 158 Q74 138 88 136 M146 108 Q126 128 112 130 M146 158 Q126 138 112 136" fill="none" stroke={d} strokeWidth="1.2" opacity="0.6" />
      <rect x="90" y="119" width="20" height="28" rx="6" fill={d} />
    </g>
  ),
  square: ({ c, d }) => (
    <g>
      <path d="M104 75 L160 131 L104 187 L48 131 Z" fill="#000" opacity="0.07" />
      <path d="M100 70 L156 126 L100 182 L44 126 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <path d="M100 77 L149 126 L100 175 L51 126 Z" fill="none" stroke={d} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <path d="M44 126 L156 126" stroke={d} strokeWidth="1" opacity="0.35" />
    </g>
  ),
  cufflinks: ({ c }) => {
    const rim = "#9c9c9c";
    const link = (x: number, y: number, r: number) => (
      <g transform={`rotate(${r} ${x} ${y})`}>
        <rect x={x - 3} y={y + 14} width="6" height="20" fill={rim} />
        <rect x={x - 14} y={y + 32} width="28" height="7" rx="3.5" fill={rim} />
        <ellipse cx={x} cy={y} rx="24" ry="17" fill={c} stroke={rim} strokeWidth="3" />
        <ellipse cx={x - 6} cy={y - 5} rx="9" ry="5" fill="#fff" opacity="0.45" />
      </g>
    );
    return (
      <g>
        {shadow(102, 186, 64)}
        {link(78, 124, -12)}
        {link(124, 146, 14)}
      </g>
    );
  },
  shoes: ({ c, d, l, v }) => {
    // Side profile, toe to the right. Loafers sit lower over the instep.
    const upper =
      v === "loafer"
        ? "M36 186 C32 172 32 158 40 150 C56 152 72 154 88 150 C104 146 120 144 134 148 C150 156 168 164 176 170 C182 175 182 184 176 186 Z"
        : "M36 186 C32 172 32 156 40 146 C50 148 62 152 72 152 L100 134 C112 132 124 138 134 146 C150 158 168 164 176 170 C182 175 182 184 176 186 Z";
    const sole = tint(c, lightness(c) < 0.2 ? -0.5 : -0.55);
    const shoe = (fill: string, detailed: boolean) => (
      <g>
        <path d={upper} fill={fill} />
        <path d="M36 186 L64 186 L64 197 L38 197 Z" fill={sole} />
        <path d="M64 187 L176 186 C181 186 183 189 180 192 L64 193 Z" fill={sole} />
        {detailed && (
          <>
            <path d="M40 146 C44 160 46 174 44 186" fill="none" stroke={d} strokeWidth="1.2" opacity="0.7" />
            {v === "loafer" ? (
              <path d="M86 156 C100 148 120 146 136 152 M120 150 C134 148 150 154 160 163" fill="none" stroke={d} strokeWidth="2.2" />
            ) : (
              <path d="M78 146 L84 152 M86 141 L92 147 M94 136 L100 142" stroke={l} strokeWidth="1.6" opacity="0.7" />
            )}
            <path d="M118 144 Q146 154 170 171" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.16" />
          </>
        )}
      </g>
    );
    return (
      <g>
        {shadow(110, 199, 80)}
        <g transform="translate(16 -16)">{shoe(tint(c, lightness(c) < 0.2 ? 0.06 : -0.14), false)}</g>
        {shoe(c, true)}
      </g>
    );
  },
  pump: ({ c, d }) => (
    <g>
      {shadow(116, 214, 70)}
      <path d="M50 168 L60 172 L58 212 L54 212 Z" fill={d} />
      <path
        d="M46 136 C52 132 60 134 64 142 L92 186 C112 200 150 202 180 206 C184 207 184 211 180 212 L112 212 C96 212 82 206 72 196 L56 172 C50 162 46 150 46 136 Z"
        fill={c}
      />
      <path d="M48 138 C56 140 62 146 66 150 L92 186" fill="none" stroke="#c9a98a" strokeWidth="2" />
      <path d="M72 196 C82 206 96 212 112 212 L180 212" fill="none" stroke={d} strokeWidth="1.5" />
      <path d="M112 198 Q142 202 170 206" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.18" />
    </g>
  ),
  bag: ({ c, d, l }) => (
    // Shoulder bag hanging from a long strap that runs out of the frame.
    <g>
      <path d="M52 132 L84 -4 M148 132 L116 -4" stroke={d} strokeWidth="3.5" />
      <path d="M50 124 L60 136 M150 124 L140 136" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 132 C38 126 162 126 162 132 C162 182 136 214 100 214 C64 214 38 182 38 132 Z" fill={c} />
      <path d="M38 132 C38 126 162 126 162 132 C162 138 38 138 38 132 Z" fill={d} />
      <path d="M48 142 C52 178 74 202 100 206 C126 202 148 178 152 142" fill="none" stroke={l} strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      <rect x="92" y="142" width="16" height="10" rx="2" fill="#b8b8b8" />
      <path d="M56 150 C60 174 72 192 88 200" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.14" />
    </g>
  ),
  case: ({ c, d, l }) => (
    <g>
      {shadow(100, 202, 72)}
      <path d="M82 104 C82 86 118 86 118 104" fill="none" stroke={d} strokeWidth="5" />
      <rect x="34" y="104" width="132" height="92" rx="8" fill={c} />
      <rect x="38" y="108" width="124" height="84" rx="6" fill="none" stroke={l} strokeDasharray="3 3" opacity="0.25" />
      <path d="M42 116 L158 116" stroke={l} strokeWidth="1.5" opacity="0.35" />
      <rect x="146" y="112" width="12" height="5" rx="2.5" fill="#b9b9b9" />
    </g>
  ),
  belt: ({ c, d }) => (
    <g>
      {shadow(100, 194, 62)}
      <rect x="96" y="82" width="56" height="18" fill={c} />
      <circle cx="96" cy="134" r="52" fill={c} />
      <circle cx="96" cy="134" r="40" fill={tint(c, -0.15)} />
      <circle cx="96" cy="134" r="28" fill={c} />
      <circle cx="96" cy="134" r="16" fill={tint(c, -0.15)} />
      <circle cx="96" cy="134" r="5" fill={c} />
      <g fill={d}>
        {[112, 124, 136].map((x) => (
          <circle key={x} cx={x} cy="91" r="1.7" />
        ))}
      </g>
      <rect x="150" y="76" width="24" height="30" rx="4" fill="none" stroke="#b8b8b8" strokeWidth="4" />
      <path d="M150 91 L170 91" stroke="#b8b8b8" strokeWidth="3" />
    </g>
  ),
  wallet: ({ c, d, l }) => (
    <g>
      {shadow(100, 186, 54)}
      <rect x="62" y="98" width="76" height="20" rx="3" fill="#e8e4dc" />
      <rect x="50" y="106" width="100" height="72" rx="6" fill={c} />
      <path d="M50 126 Q100 134 150 126" fill="none" stroke={d} strokeWidth="1.5" />
      <rect x="54" y="110" width="92" height="64" rx="4" fill="none" stroke={l} strokeDasharray="3 3" opacity="0.25" />
      <text x="100" y="162" fontSize="7" letterSpacing="2.4" textAnchor="middle" fill={l} opacity="0.5">
        SLOWN
      </text>
    </g>
  ),
};

export function ArtSvg({ art, detail = false, className, style }: {
  art: Art;
  detail?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const dark = lightness(art.color) < 0.2;
  const pen: Pen = {
    c: art.color,
    d: dark ? tint(art.color, 0.18) : tint(art.color, -0.26),
    l: tint(art.color, 0.35),
    v: art.variant,
  };
  const f = FOCUS[art.kind];
  return (
    <svg viewBox="0 0 200 266" className={className} style={style} aria-hidden="true">
      <g transform={detail ? `translate(100 133) scale(${f.s}) translate(${-f.x} ${-f.y})` : undefined}>
        {DRAW[art.kind](pen)}
      </g>
    </svg>
  );
}

/** Product "photo": backdrop + drawing. `detail` is the zoomed second cut. */
export function ProductArt({ art, detail = false, className }: { art: Art; detail?: boolean; className?: string }) {
  const [top, bottom] = BACKDROPS[((art.tone ?? 0) + (detail ? 1 : 0)) % BACKDROPS.length];
  return (
    <div className={cn("overflow-hidden", className)} style={{ background: `linear-gradient(180deg, ${top}, ${bottom})` }}>
      <ArtSvg art={art} detail={detail} className="h-full w-full" />
    </div>
  );
}
