"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// One layer behind the whole page that does two jobs:
//  1. Paint — sections declare `data-paint`, and the colours of neighbouring
//     sections are blended into each other (with drifting "milk in coffee"
//     clouds at each seam) so there are no hard section edges.
//  2. Thread — one hairline runs from the hero to the last CTA. It keeps to
//     the page margins (`data-thread-side` on each painted section) and only
//     swings across where two colours meet, so it reads as the seam between
//     them. It is tone-on-tone, condenses in softly as you scroll (no moving
//     point), and sits on a slower parallax plane, like a stitch in the paper.

const PAINTS = {
  espresso: { rgb: [43, 30, 20], thread: "rgba(243, 162, 87, 0.3)" },
  coffee: { rgb: [113, 80, 47], thread: "rgba(243, 162, 87, 0.34)" },
  latte: { rgb: [238, 227, 213], thread: "rgba(113, 80, 47, 0.2)" },
  cream: { rgb: [248, 243, 236], thread: "rgba(113, 80, 47, 0.18)" },
  amber: { rgb: [243, 162, 87], thread: "rgba(43, 30, 20, 0.24)" },
} as const;

type PaintKey = keyof typeof PAINTS;
type Side = "left" | "right" | "center";

/** Thread plane speed relative to the page (1 = glued to the content). */
const PARALLAX = 0.92;
/** Where the reveal ends (fraction of the viewport) and how long its fade is. */
const REVEAL_AT = 0.92;
const REVEAL_FADE = 0.5;
/** Horizontal position of each margin, as a fraction of the page width. */
const MARGIN_X = 0.025;

const rgb = (key: PaintKey, alpha = 1) => {
  const [r, g, b] = PAINTS[key].rgb;
  return alpha === 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${alpha})`;
};

type Zone = { top: number; bottom: number; paint: PaintKey; seam?: number; side?: Side };
type Blob = { left: number; top: number; w: number; h: number; color: string; seam: number; drift: number; range: number };
type Point = { x: number; y: number };

type Geo = {
  signature: string;
  pageTop: number;
  width: number;
  height: number;
  vh: number;
  /** Parallax factor used for this geometry (1 when motion is reduced or on small screens). */
  k: number;
  background: string;
  blobs: Blob[];
  /** Thread, already mapped onto the slower plane. */
  d: string;
  planeHeight: number;
  threadStops: { offset: number; color: string }[];
  knot: Point | null;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Smooth path through points; vertical tangents make every side change an S. */
function pathThrough(points: Point[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const q = points[i];
    const k = (q.y - p.y) / 2;
    d += ` C ${p.x.toFixed(1)} ${(p.y + k).toFixed(1)}, ${q.x.toFixed(1)} ${(q.y - k).toFixed(1)}, ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }
  return d;
}

function measure(page: HTMLElement, reduced: boolean): Geo {
  const scrollY = window.scrollY;
  const pageTop = page.getBoundingClientRect().top + scrollY;
  const width = page.clientWidth;
  // offsetHeight, not scrollHeight: the canvas itself overflows #page, and
  // counting it would keep the page tall after the content shrinks.
  const height = page.offsetHeight;
  const vh = window.innerHeight;
  const desktop = window.innerWidth >= 1024;
  const k = desktop && !reduced ? PARALLAX : 1;
  const docY = (el: Element) => el.getBoundingClientRect().top + scrollY - pageTop;

  // ── paint zones ──
  const zones: Zone[] = Array.from(page.querySelectorAll<HTMLElement>("[data-paint]"))
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        top: r.top + scrollY - pageTop,
        bottom: r.bottom + scrollY - pageTop,
        paint: el.dataset.paint as PaintKey,
        seam: el.dataset.paintSeam ? parseFloat(el.dataset.paintSeam) : undefined,
        side: el.dataset.threadSide as Side | undefined,
      };
    })
    .filter((z) => z.paint in PAINTS && z.bottom - z.top > 1)
    .sort((a, b) => a.top - b.top);

  const oklab = typeof CSS !== "undefined" && CSS.supports("background-image", "linear-gradient(in oklab, red, blue)");
  const bgStops: string[] = [];
  const inkStops: { y: number; color: string }[] = [];
  const blobs: Blob[] = [];

  if (zones.length === 0) {
    bgStops.push(`${rgb("cream")} 0px`, `${rgb("cream")} ${height}px`);
    inkStops.push({ y: 0, color: PAINTS.cream.thread }, { y: height, color: PAINTS.cream.thread });
  } else {
    bgStops.push(`${rgb(zones[0].paint)} 0px`);
    inkStops.push({ y: 0, color: PAINTS[zones[0].paint].thread });
    for (let i = 0; i < zones.length - 1; i++) {
      const a = zones[i];
      const b = zones[i + 1];
      if (a.paint === b.paint) continue;
      const seam = (a.bottom + b.top) / 2;
      const half = Math.max(16, Math.min(vh * 0.2, 200, (a.bottom - a.top) / 2, (b.bottom - b.top) / 2, b.seam ?? Infinity));
      // Dark ↔ light seams pass through caramel instead of a muddy grey,
      // like milk folding into coffee.
      const dark = (p: PaintKey) => p === "espresso" || p === "coffee";
      const light = (p: PaintKey) => p === "cream" || p === "latte";
      const darkSide = dark(a.paint) ? a.paint : dark(b.paint) ? b.paint : null;
      const caramel =
        darkSide && (light(a.paint) || light(b.paint)) ? (darkSide === "espresso" ? "rgb(128 94 62)" : "rgb(172 132 92)") : null;
      bgStops.push(`${rgb(a.paint)} ${seam - half}px`);
      if (caramel) bgStops.push(`${caramel} ${seam}px`);
      bgStops.push(`${rgb(b.paint)} ${seam + half}px`);
      inkStops.push({ y: seam - half, color: PAINTS[a.paint].thread }, { y: seam + half, color: PAINTS[b.paint].thread });
      // Soft clouds of each colour drifting across the seam.
      blobs.push(
        { left: -width * 0.05, top: seam - half * 1.3, w: width * 0.75, h: half * 2.2, color: rgb(b.paint, 0.2), seam, drift: 1, range: half * 0.55 },
        { left: width * 0.38, top: seam - half * 0.8, w: width * 0.7, h: half * 2, color: rgb(a.paint, 0.16), seam, drift: -1, range: half * 0.5 },
      );
    }
    const last = zones[zones.length - 1].paint;
    bgStops.push(`${rgb(last)} ${height}px`);
    inkStops.push({ y: height, color: PAINTS[last].thread });
  }

  const background = `linear-gradient(${oklab ? "to bottom in oklab" : "to bottom"}, ${bgStops.join(", ")})`;

  // ── thread route ──
  // Start and end come from <ThreadAnchor/>; in between the thread follows
  // each zone's margin and only changes sides at the seam above that zone.
  const sideX = (side: Side) => (side === "left" ? MARGIN_X : side === "right" ? 1 - MARGIN_X : 0.5) * width;
  const markers = Array.from(page.querySelectorAll<HTMLElement>("[data-thread-x]"))
    .map((el) => ({ x: clamp(parseFloat(el.dataset.threadX ?? "0.5"), 0, 1) * width, y: docY(el), knot: el.dataset.threadNode !== undefined }))
    .sort((a, b) => a.y - b.y);

  const points: Point[] = [];
  let knot: Point | null = null;
  if (markers.length >= 2) {
    const start = markers[0];
    const end = markers[markers.length - 1];
    points.push({ x: start.x, y: start.y });
    let x = start.x;
    let lastY = start.y;
    for (const zone of zones) {
      if (!zone.side || zone.top < start.y - 2 || zone.top > end.y) continue;
      const tx = sideX(zone.side);
      if (Math.abs(tx - x) < 1) continue;
      // The swing spans the colour blend around the seam, never the content.
      const c = clamp(Math.min(vh * 0.22, 220, (zone.bottom - zone.top) / 3), 40, 260);
      const y0 = Math.max(zone.top - c, lastY);
      const y1 = y0 + 2 * c;
      if (y0 > lastY + 1) points.push({ x, y: y0 });
      points.push({ x: tx, y: y1 });
      x = tx;
      lastY = y1;
    }
    // Final swing into the knot.
    const reach = Math.min(vh * 0.32, 320);
    const y0 = Math.max(lastY, end.y - 2 * reach);
    if (y0 > lastY + 1 && Math.abs(end.x - x) > 1) points.push({ x, y: y0 });
    points.push({ x: end.x, y: end.y });
    if (end.knot) knot = { x: end.x, y: end.y };
  }

  // Map content y onto the slower plane: aligned at mid-screen, drifting a
  // few dozen pixels towards the screen edges.
  const toPlane = (y: number) => k * y + ((1 - k) * vh) / 2;
  const planeHeight = toPlane(height);
  const d = pathThrough(points.map((p) => ({ x: p.x, y: toPlane(p.y) })));
  const threadStops = inkStops.map((s) => ({ offset: clamp(toPlane(s.y) / planeHeight, 0, 1), color: s.color }));

  const signature = [width, height, vh, k, d, bgStops.join()].join("|");
  return {
    signature,
    pageTop,
    width,
    height,
    vh,
    k,
    background,
    blobs,
    d,
    planeHeight,
    threadStops,
    knot: knot ? { x: knot.x, y: toPlane(knot.y) } : null,
  };
}

export function PageCanvas() {
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;
  const [geo, setGeo] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const fadeStartRef = useRef<SVGStopElement>(null);
  const fadeEndRef = useRef<SVGStopElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Re-measure on route change, resize, font load and any page height change.
  useEffect(() => {
    const page = document.getElementById("page");
    if (!page) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      const next = measure(page, reduced);
      if (next.signature !== geoRef.current?.signature) {
        geoRef.current = next;
        setGeo(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(page);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule).catch(() => {});
    const late = window.setTimeout(schedule, 1500);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(late);
    };
  }, [pathname, reduced]);

  // Scroll: slide the thread plane, move the soft reveal edge, drift clouds.
  useEffect(() => {
    if (!geo) return;
    const update = () => {
      const sy = window.scrollY - geo.pageTop;
      const vh = window.innerHeight;

      const plane = planeRef.current;
      if (plane) plane.style.transform = `translate3d(0, ${((1 - geo.k) * sy).toFixed(1)}px, 0)`;

      // The thread condenses out of the lower part of the screen: fully drawn
      // above the fade, invisible below it. No point marks its leading edge.
      const a = fadeStartRef.current;
      const b = fadeEndRef.current;
      if (a && b) {
        if (reduced) {
          a.setAttribute("offset", "1");
          b.setAttribute("offset", "1");
        } else {
          const toPlane = (y: number) => geo.k * y + ((1 - geo.k) * geo.vh) / 2;
          const end = toPlane(sy + vh * REVEAL_AT);
          const start = end - vh * REVEAL_FADE;
          a.setAttribute("offset", clamp(start / geo.planeHeight, 0, 1).toFixed(4));
          b.setAttribute("offset", clamp(end / geo.planeHeight, 0, 1).toFixed(4));
        }
      }

      if (!reduced) {
        geo.blobs.forEach((blob, i) => {
          const el = blobRefs.current[i];
          if (!el) return;
          const t = clamp((blob.seam - (sy + vh * 0.5)) * 0.22, -blob.range, blob.range) * blob.drift;
          el.style.transform = `translate3d(${(t * 0.35).toFixed(1)}px, ${t.toFixed(1)}px, 0)`;
        });
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [geo, reduced]);

  if (!geo) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden"
      style={{ height: geo.height }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: geo.background }} />

      {geo.blobs.map((b, i) => (
        <div
          key={`${b.seam}-${i}`}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className="absolute rounded-full will-change-transform"
          style={{
            left: b.left,
            top: b.top,
            width: b.w,
            height: b.h,
            backgroundImage: `radial-gradient(closest-side, ${b.color}, transparent)`,
          }}
        />
      ))}

      {geo.d && (
        <svg
          ref={planeRef}
          className="absolute left-0 top-0 will-change-transform"
          width={geo.width}
          height={geo.planeHeight}
          viewBox={`0 0 ${geo.width} ${geo.planeHeight}`}
        >
          <defs>
            <linearGradient id="thread-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.planeHeight}>
              {geo.threadStops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <linearGradient id="thread-reveal" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.planeHeight}>
              <stop offset="0" stopColor="#fff" />
              <stop ref={fadeStartRef} offset="0" stopColor="#fff" />
              <stop ref={fadeEndRef} offset="0" stopColor="#000" />
              <stop offset="1" stopColor="#000" />
            </linearGradient>
            <mask id="thread-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={geo.width} height={geo.planeHeight}>
              <rect width={geo.width} height={geo.planeHeight} fill="url(#thread-reveal)" />
            </mask>
          </defs>
          <g mask="url(#thread-mask)">
            <path d={geo.d} fill="none" stroke="url(#thread-ink)" strokeWidth={1} strokeLinecap="round" />
            {geo.knot && <circle cx={geo.knot.x} cy={geo.knot.y} r={2.5} fill="url(#thread-ink)" />}
          </g>
        </svg>
      )}
    </div>
  );
}
