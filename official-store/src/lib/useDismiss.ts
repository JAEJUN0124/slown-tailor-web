import { useEffect, type RefObject } from "react";

/** Closes a popover on a click outside `ref` or on Escape while `active`. */
export function useDismiss(ref: RefObject<HTMLElement | null>, active: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && onDismiss();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDismiss();
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [ref, active, onDismiss]);
}
