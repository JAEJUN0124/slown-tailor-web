import type { CSSProperties, ReactNode } from "react";
import type { Art, ArtKind, ArtVariant } from "@/content/types";
import { cn } from "@/lib/utils";

// Flat studio "photography" for the store mockup: one drawing per item kind on
// an off-white backdrop, standing in for the reference's cut-out product
// photos. `frame` picks the cut of a product gallery (front, close-ups,
// another backdrop, back view, fabric).

const BACKDROPS = [
  ["#f7f6f2", "#efede7"], // paper
  ["#f4f0ea", "#e9e2d8"], // warm
  ["#eff1f2", "#e3e6e9"], // cool
  ["#efece6", "#e3ded5"], // stone
] as const;

/** Where the close-up cuts zoom in, in viewBox units. */
const FOCUS: Record<ArtKind, [{ x: number; y: number; s: number }, { x: number; y: number; s: number }]> = {
  suit: [{ x: 100, y: 84, s: 1.9 }, { x: 100, y: 214, s: 1.8 }],
  jacket: [{ x: 100, y: 96, s: 1.8 }, { x: 120, y: 170, s: 2 }],
  blouson: [{ x: 100, y: 70, s: 2 }, { x: 70, y: 176, s: 2 }],
  coat: [{ x: 100, y: 80, s: 1.9 }, { x: 128, y: 186, s: 2 }],
  shirt: [{ x: 100, y: 64, s: 2.1 }, { x: 44, y: 190, s: 2.2 }],
  tee: [{ x: 100, y: 62, s: 2.1 }, { x: 100, y: 210, s: 2 }],
  knit: [{ x: 100, y: 64, s: 2 }, { x: 100, y: 214, s: 2.2 }],
  trousers: [{ x: 100, y: 60, s: 1.9 }, { x: 122, y: 230, s: 2 }],
  skirt: [{ x: 100, y: 64, s: 1.8 }, { x: 100, y: 200, s: 1.8 }],
  dress: [{ x: 100, y: 84, s: 1.8 }, { x: 100, y: 210, s: 1.8 }],
  square: [{ x: 100, y: 110, s: 1.6 }, { x: 96, y: 214, s: 2 }],
  cap: [{ x: 104, y: 120, s: 1.6 }, { x: 150, y: 156, s: 2 }],
  shoes: [{ x: 128, y: 160, s: 1.8 }, { x: 60, y: 170, s: 2 }],
  belt: [{ x: 150, y: 92, s: 1.9 }, { x: 96, y: 134, s: 1.6 }],
  bag: [{ x: 100, y: 164, s: 1.7 }, { x: 100, y: 120, s: 2 }],
  case: [{ x: 128, y: 112, s: 1.9 }, { x: 100, y: 96, s: 2 }],
  wallet: [{ x: 100, y: 140, s: 1.7 }, { x: 100, y: 112, s: 2.2 }],
};

/** Mix #rrggbb towards black (amount < 0) or white (amount > 0). */
export function tint(hex: string, amount: number) {
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

export function lightness(hex: string) {
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

const shadow = (cx: number, cy: number, rx: number) => <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="#000" opacity="0.08" />;

function Rib({ x1, x2, y1, y2, color }: { x1: number; x2: number; y1: number; y2: number; color: string }) {
  const lines: ReactNode[] = [];
  for (let x = x1 + 3; x < x2; x += 4) lines.push(<path key={x} d={`M${x} ${y1} L${x} ${y2}`} />);
  return (
    <g stroke={color} strokeWidth="1" opacity="0.5">
      {lines}
    </g>
  );
}

/** Mirror a path drawn for the left side onto the right (viewBox is 200 wide). */
const Mirror = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <g transform="translate(200 0) scale(-1 1)">{children}</g>
  </>
);

function Jacket({ c, d, v }: Pen) {
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
      <path d="M87 40 L100 66 L113 40 Z" fill="#f3f1ec" />
      <path d="M86 40 L80 60 L86 64 L72 82 L98 118 L100 66 Z" fill={d} />
      <path d="M114 40 L120 60 L114 64 L128 82 L102 118 L100 66 Z" fill={d} />
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

const SLEEVE_LONG = "M62 52 C50 56 44 66 42 82 L38 204 L52 206 L58 104 Z";
const SLEEVE_SHORT = "M62 52 C50 56 44 66 40 82 L33 120 L50 124 L58 98 Z";

const DRAW: Record<ArtKind, (p: Pen) => ReactNode> = {
  suit: (p) => (
    <g>
      <path d="M56 178 L144 178 L141 258 L107 258 L100 196 L93 258 L59 258 Z" fill={tint(p.c, -0.06)} />
      <path d="M76 196 L75 258 M124 196 L125 258" stroke={p.l} strokeWidth="1" opacity="0.35" />
      <Jacket {...p} />
      <path d="M97 46 L103 46 L105 66 L100 74 L95 66 Z" fill="#2d2f38" />
    </g>
  ),
  jacket: (p) => (
    <g transform="translate(100 142) scale(1.3) translate(-100 -108)">
      <Jacket {...p} />
      <path d="M88 42 Q100 54 112 42" fill="none" stroke="#2b2b2b" strokeWidth="5" />
    </g>
  ),
  blouson: ({ c, d, l, v }) => {
    const long = v === "down";
    const bottom = long ? 214 : 196;
    return (
      <g>
        <path d={`M60 52 C46 56 40 68 38 88 L34 ${bottom - 8} L50 ${bottom - 6} L56 100 Z`} fill={d} />
        <path d={`M140 52 C154 56 160 68 162 88 L166 ${bottom - 8} L150 ${bottom - 6} L144 100 Z`} fill={d} />
        <path
          d={`M60 52 L86 40 L100 46 L114 40 L140 52 C148 60 150 72 150 88 L150 ${bottom} L50 ${bottom} L50 88 C50 72 52 60 60 52 Z`}
          fill={c}
          stroke={d}
          strokeWidth="0.8"
        />
        {v === "down" ? (
          <>
            <path d="M84 30 L116 30 L118 50 L82 50 Z" fill={tint(c, -0.08)} stroke={d} strokeWidth="0.8" />
            <g stroke={d} strokeWidth="1.2" opacity="0.55" fill="none">
              {[78, 104, 130, 156, 182].map((y) => (
                <path key={y} d={`M50 ${y} Q100 ${y + 5} 150 ${y}`} />
              ))}
              {[96, 128, 160].map((y) => (
                <path key={`s${y}`} d={`M40 ${y} L56 ${y + 2} M160 ${y} L144 ${y + 2}`} />
              ))}
            </g>
            <path d="M100 30 L100 214" stroke={tint(c, 0.25)} strokeWidth="1.6" />
          </>
        ) : (
          <>
            <path d="M86 40 L100 46 L92 66 L76 54 Z M114 40 L100 46 L108 66 L124 54 Z" fill={tint(c, -0.06)} stroke={d} strokeWidth="1" />
            {v === "denim" ? (
              <>
                <path d="M100 46 L100 196" stroke="#c9a66b" strokeWidth="1" strokeDasharray="2 2" />
                <g fill="#b9914f">
                  {[82, 110, 138, 166].map((y) => (
                    <circle key={y} cx="104" cy={y} r="2" />
                  ))}
                </g>
                <path d="M62 88 H90 V104 H62 Z M110 88 H138 V104 H110 Z" fill="none" stroke="#c9a66b" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M50 176 H150" stroke="#c9a66b" strokeWidth="1" strokeDasharray="2 2" />
              </>
            ) : (
              <>
                <path d="M100 46 L100 196" stroke="#b9b9b9" strokeWidth="1.6" />
                <rect x="97" y="64" width="6" height="10" rx="1.5" fill="#b9b9b9" />
                <path d="M116 100 L136 98" stroke="#b9b9b9" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
            <path d="M50 184 L150 184 L150 196 L50 196 Z" fill={tint(c, v === "leather" ? -0.1 : -0.06)} />
            {v === "leather" && (
              <g fill="none" stroke={l} strokeWidth="2.2" strokeLinecap="round" opacity="0.18">
                <path d="M66 70 Q74 92 66 120 M134 72 Q126 98 136 128 M78 140 Q92 150 84 172" />
                <path d="M44 100 Q50 130 42 160 M156 104 Q150 132 158 158" />
              </g>
            )}
          </>
        )}
      </g>
    );
  },
  coat: ({ c, d, v }) => (
    <g>
      <path d="M60 50 C46 54 40 66 38 86 L32 204 L48 206 L56 104 Z" fill={d} />
      <path d="M140 50 C154 54 160 66 162 86 L168 204 L152 206 L144 104 Z" fill={d} />
      <path d="M60 50 L88 38 L100 60 L112 38 L140 50 C148 58 150 70 150 86 L156 250 L44 250 L50 86 C50 70 52 58 60 50 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <path d="M89 38 L100 60 L111 38 Z" fill="#2b2b2b" />
      <path d="M88 38 L80 58 L88 62 L70 86 L96 124 L100 60 Z" fill={d} />
      <path d="M112 38 L120 58 L112 62 L130 86 L104 124 L100 60 Z" fill={d} />
      <path d="M100 124 L100 250" stroke={d} strokeWidth="1.2" opacity="0.7" />
      <g fill={d}>
        {[138, 166, 194].map((y) => (
          <circle key={y} cx="104" cy={y} r="2.4" />
        ))}
      </g>
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
  shirt: ({ c, d, v }) => {
    const short = v === "short";
    return (
      <g>
        {short ? (
          <Mirror>
            <path d="M62 50 C50 54 44 64 41 80 L35 116 L52 120 L58 96 Z" fill={d} />
          </Mirror>
        ) : (
          <>
            <path d="M62 50 C50 54 44 64 42 80 L37 196 L51 198 L58 100 Z" fill={d} />
            <path d="M138 50 C150 54 156 64 158 80 L163 196 L149 198 L142 100 Z" fill={d} />
            <path d="M37 184 L51 186 L51 198 L37 196 Z M163 184 L149 186 L149 198 L163 196 Z" fill={tint(d, -0.08)} />
          </>
        )}
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
    );
  },
  tee: ({ c, d, v }) => (
    <g>
      <Mirror>
        <path d={v === "long" ? "M64 52 C52 56 46 66 44 82 L40 210 L54 212 L60 102 Z" : SLEEVE_SHORT} fill={d} />
      </Mirror>
      <path
        d="M64 52 C76 46 88 44 100 44 C112 44 124 46 136 52 C142 58 144 68 144 80 L146 228 Q100 234 54 228 L56 80 C56 68 58 58 64 52 Z"
        fill={c}
        stroke={d}
        strokeWidth="0.8"
      />
      <path d="M84 46 Q100 62 116 46" fill="none" stroke={d} strokeWidth="4" strokeLinecap="round" />
      <path d="M56 214 Q100 220 146 214" fill="none" stroke={d} strokeWidth="1" opacity="0.5" />
    </g>
  ),
  knit: ({ c, d, v }) => {
    if (v === "vest")
      return (
        <g>
          <path d="M70 46 L88 44 L100 80 L112 44 L130 46 C132 64 144 74 150 82 L150 226 L50 226 L50 82 C56 74 68 64 70 46 Z" fill={c} stroke={d} strokeWidth="0.8" />
          <path d="M88 44 L100 80 L112 44" fill="none" stroke={d} strokeWidth="4" />
          <path d="M70 46 C68 64 56 74 50 82 M130 46 C132 64 144 74 150 82" fill="none" stroke={d} strokeWidth="3" />
          <g stroke={d} strokeWidth="1.1" opacity="0.45" fill="none">
            {[104, 130, 156, 182].map((y) => (
              <path key={y} d={`M50 ${y} Q100 ${y + 4} 150 ${y}`} />
            ))}
          </g>
          <path d="M50 214 L150 214 L150 226 L50 226 Z" fill={tint(c, -0.12)} />
          <Rib x1={50} x2={150} y1={214} y2={226} color={d} />
        </g>
      );
    const short = v === "short" || v === "polo";
    return (
      <g>
        {short ? (
          <Mirror>
            <path d={SLEEVE_SHORT} fill={d} />
          </Mirror>
        ) : (
          <>
            <Mirror>
              <path d={SLEEVE_LONG} fill={d} />
            </Mirror>
            <path d="M38 194 L52 196 L52 206 L38 204 Z M162 194 L148 196 L148 206 L162 204 Z" fill={tint(d, -0.1)} />
          </>
        )}
        <path
          d="M62 52 C74 46 86 44 100 44 C114 44 126 46 138 52 C146 60 148 70 148 84 L148 226 L52 226 L52 84 C52 70 54 60 62 52 Z"
          fill={c}
          stroke={d}
          strokeWidth="0.8"
        />
        {v === "cardigan" && (
          <>
            <path d="M84 46 L100 96 L116 46" fill="none" stroke={d} strokeWidth="4" />
            <path d="M100 96 L100 226" stroke={d} strokeWidth="2" />
            <g fill={tint(d, -0.2)}>
              {[112, 138, 164, 190].map((y) => (
                <circle key={y} cx="105" cy={y} r="2.4" />
              ))}
            </g>
          </>
        )}
        {v === "vneck" && <path d="M84 46 L100 84 L116 46" fill="none" stroke={d} strokeWidth="4.5" strokeLinejoin="round" />}
        {v === "turtle" && (
          <>
            <path d="M82 20 L118 20 L118 50 Q100 56 82 50 Z" fill={tint(c, -0.06)} stroke={d} strokeWidth="0.8" />
            <Rib x1={82} x2={118} y1={22} y2={48} color={d} />
          </>
        )}
        {v === "zip" && (
          <>
            <path d="M84 28 L116 28 L118 52 Q100 58 82 52 Z" fill={tint(c, -0.06)} stroke={d} strokeWidth="0.8" />
            <path d="M100 28 L100 226" stroke="#b9b9b9" strokeWidth="1.6" />
            <rect x="97" y="40" width="6" height="11" rx="1.5" fill="#b9b9b9" />
          </>
        )}
        {v === "polo" && (
          <>
            <path d="M84 44 L100 50 L92 66 L78 54 Z M116 44 L100 50 L108 66 L122 54 Z" fill={tint(c, -0.05)} stroke={d} strokeWidth="1" />
            <path d="M100 50 L100 92" stroke={d} strokeWidth="1.6" />
            <g fill={d}>
              <circle cx="100" cy="68" r="1.8" />
              <circle cx="100" cy="84" r="1.8" />
            </g>
          </>
        )}
        {(v === undefined || v === "short") && <path d="M84 46 Q100 60 116 46" fill="none" stroke={d} strokeWidth="5" strokeLinecap="round" />}
        <path d="M52 212 L148 212 L148 226 L52 226 Z" fill={tint(c, -0.12)} />
        <Rib x1={52} x2={148} y1={212} y2={226} color={d} />
      </g>
    );
  },
  trousers: ({ c, d, l, v }) => {
    const shape =
      v === "wide"
        ? "M62 34 L138 34 L156 252 L108 252 L100 100 L92 252 L44 252 Z"
        : v === "tapered"
          ? "M62 34 L138 34 L134 252 L109 252 L100 96 L91 252 L66 252 Z"
          : v === "shorts"
            ? "M62 34 L138 34 L146 150 L108 152 L100 96 L92 152 L54 150 Z"
            : "M62 34 L138 34 L144 252 L109 252 L100 96 L91 252 L56 252 Z";
    const stitch = v === "jeans" ? "#c9a66b" : d;
    return (
      <g>
        <path d={shape} fill={c} stroke={d} strokeWidth="0.8" />
        <path d="M62 34 L138 34 L138 46 L62 46 Z" fill={d} />
        {v === "jeans" ? (
          <g fill="none" stroke={stitch} strokeWidth="1" strokeDasharray="2 2">
            <path d="M100 46 L100 92 M100 46 Q90 70 96 90" />
            <path d="M66 50 Q76 64 86 60 M134 50 Q124 64 114 60" />
            <path d="M62 46 L138 46" />
          </g>
        ) : (
          <path d="M100 46 L100 92 M80 46 L82 76 M120 46 L118 76" stroke={d} strokeWidth="1.2" opacity="0.7" />
        )}
        {v === "jeans" && (
          <g fill="#b9914f">
            <circle cx="68" cy="52" r="1.6" />
            <circle cx="132" cy="52" r="1.6" />
          </g>
        )}
        {v !== "shorts" && (
          <path
            d={v === "wide" ? "M70 100 L66 252 M130 100 L134 252" : v === "tapered" ? "M78 96 L80 252 M122 96 L120 252" : "M76 96 L74 252 M124 96 L126 252"}
            stroke={l}
            strokeWidth="1"
            opacity="0.4"
          />
        )}
      </g>
    );
  },
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
      <Mirror>
        <path d="M66 52 C56 56 50 64 48 78 L44 120 L58 122 L64 94 Z" fill={d} />
      </Mirror>
      <path d="M66 52 C78 46 88 44 100 44 C112 44 122 46 134 52 C140 60 142 70 140 84 L132 132 L156 250 L44 250 L68 132 L60 84 C58 70 60 60 66 52 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <path d="M86 46 Q100 58 114 46" fill="none" stroke={d} strokeWidth="3" />
      <path d="M68 132 Q100 140 132 132" fill="none" stroke={d} strokeWidth="1" opacity="0.6" />
      <path d="M92 140 L82 250 M108 140 L118 250 M100 142 L100 250" stroke={d} strokeWidth="1" opacity="0.3" />
    </g>
  ),
  square: ({ c, d, l }) => (
    // A muffler folded once and left to hang, fringe at both ends.
    <g>
      <path d="M78 34 L118 34 L122 226 L84 226 Z" fill={tint(c, -0.08)} />
      <path d="M86 40 L126 52 L114 236 L76 226 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <g stroke={d} strokeWidth="1.2" opacity="0.6">
        {[78, 84, 90, 96, 102, 108].map((x, i) => (
          <path key={x} d={`M${x} ${227 + i * 1.6} L${x - 1} ${244 + i * 1.6}`} />
        ))}
      </g>
      <g stroke={l} strokeWidth="1" opacity="0.25">
        {[70, 104, 138, 172, 206].map((y) => (
          <path key={y} d={`M${86 - (y - 40) * 0.05} ${y} L${124 - (y - 40) * 0.06} ${y + 4}`} />
        ))}
      </g>
    </g>
  ),
  cap: ({ c, d, l }) => (
    <g>
      {shadow(110, 178, 70)}
      <path d="M48 160 C46 112 74 90 104 90 C134 90 154 110 154 150 L154 160 Z" fill={c} stroke={d} strokeWidth="0.8" />
      <path d="M104 90 C100 110 98 136 100 160 M78 98 C74 116 72 138 74 160 M130 98 C134 118 134 140 132 160" fill="none" stroke={d} strokeWidth="1" opacity="0.5" />
      <path d="M118 156 C148 154 176 160 186 168 C170 174 140 172 112 166 Z" fill={tint(c, -0.1)} stroke={d} strokeWidth="0.8" />
      <ellipse cx="104" cy="90" rx="6" ry="3" fill={d} />
      <path d="M62 128 Q70 112 84 104" fill="none" stroke={l} strokeWidth="3" strokeLinecap="round" opacity="0.2" />
    </g>
  ),
  shoes: ({ c, d, l }) => {
    const upper =
      "M36 186 C32 172 32 156 40 146 C50 148 62 152 72 152 L100 134 C112 132 124 138 134 146 C150 158 168 164 176 170 C182 175 182 184 176 186 Z";
    const sole = tint(c, lightness(c) < 0.2 ? -0.5 : -0.55);
    const shoe = (fill: string, detailed: boolean) => (
      <g>
        <path d={upper} fill={fill} />
        <path d="M36 186 L64 186 L64 197 L38 197 Z" fill={sole} />
        <path d="M64 187 L176 186 C181 186 183 189 180 192 L64 193 Z" fill={sole} />
        {detailed && (
          <>
            <path d="M40 146 C44 160 46 174 44 186" fill="none" stroke={d} strokeWidth="1.2" opacity="0.7" />
            <path d="M78 146 L84 152 M86 141 L92 147 M94 136 L100 142" stroke={l} strokeWidth="1.6" opacity="0.7" />
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
  bag: ({ c, d, l }) => (
    <g>
      <path d="M52 132 L84 -4 M148 132 L116 -4" stroke={d} strokeWidth="3.5" />
      <path d="M50 124 L60 136 M150 124 L140 136" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 132 C38 126 162 126 162 132 C162 182 136 214 100 214 C64 214 38 182 38 132 Z" fill={c} />
      <path d="M38 132 C38 126 162 126 162 132 C162 138 38 138 38 132 Z" fill={d} />
      <path d="M48 142 C52 178 74 202 100 206 C126 202 148 178 152 142" fill="none" stroke={l} strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      <rect x="92" y="142" width="16" height="10" rx="2" fill="#b8b8b8" />
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

function pen(art: Art): Pen {
  const dark = lightness(art.color) < 0.2;
  return {
    c: art.color,
    d: dark ? tint(art.color, 0.18) : tint(art.color, -0.26),
    l: tint(art.color, 0.35),
    v: art.variant,
  };
}

/** The bare drawing in a 200×266 box, for reuse inside scenes. */
export function ArtDrawing({ art }: { art: Art }) {
  return <>{DRAW[art.kind](pen(art))}</>;
}

/** How many cuts a product gallery has. */
export const GALLERY_FRAMES = 7;

export function ArtSvg({
  art,
  frame = 0,
  className,
  style,
}: {
  art: Art;
  frame?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [near, far] = FOCUS[art.kind];
  const f = frame % GALLERY_FRAMES;
  // 0 front · 1 close-up · 2 smaller on another backdrop · 3 second close-up · 4 back · 5 fabric · 6 front again
  const transform =
    f === 1
      ? `translate(100 133) scale(${near.s}) translate(${-near.x} ${-near.y})`
      : f === 3
        ? `translate(100 133) scale(${far.s}) translate(${-far.x} ${-far.y})`
        : f === 2
          ? "translate(100 140) scale(0.78) translate(-100 -133)"
          : f === 4
            ? "translate(200 0) scale(-1 1)"
            : undefined;
  if (f === 5) {
    const p = pen(art);
    return (
      <svg viewBox="0 0 200 266" className={className} style={style} aria-hidden="true">
        <rect width="200" height="266" fill={p.c} />
        <g stroke={p.d} strokeWidth="1.4" opacity="0.35">
          {Array.from({ length: 40 }, (_, i) => (
            <path key={i} d={`M${-40 + i * 8} 0 L${i * 8 + 40} 266`} />
          ))}
        </g>
        <path d="M0 180 Q100 150 200 196 L200 266 L0 266 Z" fill="#000" opacity="0.08" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 266" className={className} style={style} aria-hidden="true">
      <g transform={transform}>{DRAW[art.kind](pen(art))}</g>
    </svg>
  );
}

/** Product "photo": backdrop + drawing. `frame` picks the gallery cut. */
export function ProductArt({ art, frame = 0, className }: { art: Art; frame?: number; className?: string }) {
  const tone = ((art.tone ?? 0) + (frame === 2 ? 1 : frame === 6 ? 2 : 0)) % BACKDROPS.length;
  const [top, bottom] = BACKDROPS[tone];
  return (
    <div className={cn("overflow-hidden", className)} style={{ background: `linear-gradient(180deg, ${top}, ${bottom})` }}>
      <ArtSvg art={art} frame={frame} className="h-full w-full" />
    </div>
  );
}
