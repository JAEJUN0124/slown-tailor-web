import { clsx, type ClassValue } from "clsx";

// Plain class joining, as in the landing app (no tailwind-merge).
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function won(n: number) {
  return n.toLocaleString("ko-KR");
}
