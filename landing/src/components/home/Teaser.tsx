import { TEASER } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/** Original illustration: a crescent moon, stars and a needle trailing amber thread. */
function NocturneArt() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="noct-sky" cx="70%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#5a3f26" />
          <stop offset="55%" stopColor="#32231a" />
          <stop offset="100%" stopColor="#1f160f" />
        </radialGradient>
        <radialGradient id="noct-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8c995" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f8c995" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#noct-sky)" />
      <circle cx="292" cy="78" r="58" fill="url(#noct-glow)" />
      <path d="M300 52 a28 28 0 1 0 14 52 a22 22 0 1 1 -14 -52 z" fill="#f8e6cc" />
      {[
        [60, 40, 1.4], [118, 92, 1], [168, 34, 1.2], [214, 70, 0.9], [92, 150, 0.8], [352, 160, 1], [36, 118, 0.9], [250, 132, 0.7],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#f8e6cc" opacity="0.8" />
      ))}
      <path d="M150 64 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 z" fill="#f8c995" opacity="0.9" />
      <path d="M0 214 Q100 196 200 212 T400 206 L400 300 L0 300 Z" fill="#3d2b1d" />
      <path d="M0 232 Q120 218 220 234 T400 228 L400 300 L0 300 Z" fill="#2b1e14" />
      <g transform="rotate(-28 210 200)">
        <rect x="150" y="197" width="120" height="4" rx="2" fill="#efe2d0" />
        <ellipse cx="262" cy="199" rx="5" ry="1.4" fill="#2b1e14" />
      </g>
      <path
        d="M154 230 C120 250 90 210 60 236 S20 270 0 262"
        fill="none"
        stroke="#f3a257"
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      {[[70, 258], [120, 270], [180, 262], [240, 276], [300, 260], [350, 272]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={i % 2 ? "#f3a257" : "#c9a37e"} opacity="0.7" />
      ))}
    </svg>
  );
}

export function Teaser() {
  return (
    <section data-paint="cream" data-thread-side="right" className="relative py-section-py-sm">
      <div className="container">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] bg-coffee shadow-[0_30px_60px_-30px_rgb(43_30_20/0.55)]">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div className="flex-1 px-6 py-14 text-center sm:px-12 sm:py-20 md:text-left">
                <div className="mb-6 flex items-center justify-center gap-2 md:justify-start">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse-amber rounded-full bg-amber" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-honey/80 sm:text-[12px]">{TEASER.kicker}</p>
                </div>
                <h2 className="mb-5 text-[26px] font-extrabold italic text-cream sm:text-[36px]">{TEASER.title}</h2>
                <div className="mx-auto mb-5 h-px w-9 bg-amber/60 md:mx-0" />
                <p className="mb-6 text-body text-cream/75 sm:text-lead">
                  {TEASER.lines[0]}
                  <br />
                  {TEASER.lines[1]}
                </p>
                <p className="text-[11px] text-cream/45">{TEASER.note}</p>
              </div>
              <div className="flex items-center justify-center px-6 pb-14 sm:px-12 sm:pb-20 md:w-[46%] md:px-8 md:py-10">
                <div className="relative aspect-[4/3] w-full max-w-[380px] overflow-hidden rounded-2xl border border-cream/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                  <NocturneArt />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
