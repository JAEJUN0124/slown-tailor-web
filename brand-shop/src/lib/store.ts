import { useSyncExternalStore } from "react";

// Per-viewer state kept in localStorage: the cart and recently viewed items.
// Every read and write is guarded, so the pages still work with storage off.

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

// ── Cart ──────────────────────────────────────────────────────────────
export type Delivery = "택배" | "빠른배송";

export type CartItem = { key: string; id: string; size: string; delivery: Delivery; qty: number };

const EMPTY_CART: CartItem[] = [];
const isCart = (v: unknown): v is CartItem[] =>
  Array.isArray(v) && v.every((i) => i && typeof i.id === "string" && typeof i.qty === "number");

const cart = createStore("folio-shop:cart", EMPTY_CART, isCart);

export const useCart = cart.use;

export function addToCart(item: Omit<CartItem, "key">) {
  const key = `${item.id}|${item.size}|${item.delivery}`;
  const items = cart.read();
  const found = items.find((i) => i.key === key);
  cart.write(
    found ? items.map((i) => (i.key === key ? { ...i, qty: Math.min(99, i.qty + item.qty) } : i)) : [...items, { ...item, key }],
  );
}

export function setCartQty(key: string, qty: number) {
  cart.write(cart.read().map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
}

export function removeFromCart(keys: string[]) {
  cart.write(cart.read().filter((i) => !keys.includes(i.key)));
}

// ── Recently viewed ───────────────────────────────────────────────────
const EMPTY_IDS: string[] = [];
const isIds = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

const recent = createStore("folio-shop:recent", EMPTY_IDS, isIds);

export const useRecent = recent.use;

export function recordView(id: string) {
  recent.write([id, ...recent.read().filter((x) => x !== id)].slice(0, 20));
}

export function clearRecent() {
  recent.write([]);
}

// ── Toast ─────────────────────────────────────────────────────────────
export type ToastMessage = { text: string; action?: { label: string; href: string } };

/** Short status line at the bottom of the screen (see Toaster). */
export function toast(text: string, action?: ToastMessage["action"]) {
  window.dispatchEvent(new CustomEvent<ToastMessage>("folio:toast", { detail: { text, action } }));
}

/** Shared line for actions the mockup does not carry out. */
export const DEMO_ONLY = "데모 화면이라 실제로 진행되지는 않습니다.";
