import { useSyncExternalStore } from "react";

// Per-viewer state kept in localStorage: the shopping bag. Every read and
// write is guarded, so the pages still work with storage off.

type Listener = () => void;

function createStore<T>(key: string, fallback: T, valid: (v: unknown) => v is T) {
  let cache: T | undefined;
  const listeners = new Set<Listener>();

  const read = (): T => {
    if (cache !== undefined) return cache;
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
      cache = valid(parsed) ? parsed : fallback;
    } catch {
      cache = fallback;
    }
    return cache;
  };

  const write = (value: T) => {
    cache = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
    listeners.forEach((l) => l());
  };

  const subscribe = (l: Listener) => {
    listeners.add(l);
    // Keep other tabs in step.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      cache = undefined;
      l();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };

  const use = () => useSyncExternalStore(subscribe, read, () => fallback);
  return { read, write, use };
}

// ── Bag ───────────────────────────────────────────────────────────────
export type BagItem = { key: string; id: string; size: string; qty: number };

const EMPTY_BAG: BagItem[] = [];
const isBag = (v: unknown): v is BagItem[] =>
  Array.isArray(v) && v.every((i) => i && typeof i.id === "string" && typeof i.size === "string" && typeof i.qty === "number");

const bag = createStore("slown-store:bag", EMPTY_BAG, isBag);

export const useBag = bag.use;

export function addToBag(items: Omit<BagItem, "key">[]) {
  let next = bag.read();
  for (const item of items) {
    const key = `${item.id}|${item.size}`;
    const found = next.find((i) => i.key === key);
    next = found
      ? next.map((i) => (i.key === key ? { ...i, qty: Math.min(99, i.qty + item.qty) } : i))
      : [...next, { ...item, key }];
  }
  bag.write(next);
}

export function setBagQty(key: string, qty: number) {
  bag.write(bag.read().map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
}

export function removeFromBag(keys: string[]) {
  bag.write(bag.read().filter((i) => !keys.includes(i.key)));
}

// ── Toast ─────────────────────────────────────────────────────────────
export type ToastMessage = { text: string; action?: { label: string; href: string } };

/** Short status line at the bottom of the screen (see Toaster). */
export function toast(text: string, action?: ToastMessage["action"]) {
  window.dispatchEvent(new CustomEvent<ToastMessage>("slown:toast", { detail: { text, action } }));
}

/** Shared line for actions the mockup does not carry out. */
export const DEMO_ONLY = "데모 화면이라 실제로 진행되지는 않습니다.";
