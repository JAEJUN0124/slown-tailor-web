// Markers read by <PageCanvas/>. They render nothing visible.
//
// The thread's route is set per painted section with `data-thread-side`
// ("left" | "right" | "center"); a ThreadAnchor only marks where the thread
// starts (the first one on the page) and where it ends (the last one).

type AnchorProps = {
  /** Horizontal position as a fraction of the page width. */
  x: number;
  /** CSS `top` inside the positioned parent. */
  top?: string;
  /** Tie a small knot here (used for the end of the thread). */
  node?: boolean;
};

export function ThreadAnchor({ x, top = "50%", node = false }: AnchorProps) {
  return (
    <span
      aria-hidden="true"
      data-thread-x={x}
      data-thread-node={node ? "" : undefined}
      className="pointer-events-none absolute left-0 h-px w-px"
      style={{ top }}
    />
  );
}

export type ThreadSide = "left" | "right" | "center";
