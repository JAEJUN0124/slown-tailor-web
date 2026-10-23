import { clsx, type ClassValue } from "clsx";

// Plain class joining. Deliberately no tailwind-merge: custom type utilities
// such as `text-h1` would be treated as conflicting with `text-espresso`.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function won(n: number) {
  return n.toLocaleString("ko-KR");
}
