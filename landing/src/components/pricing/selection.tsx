"use client";

import { createContext, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { findPriceItem, type TabKey } from "@/content/pricing";

// Quote basket behind the floating dock, plus the active price tab so the
// hero's quick links can open a category.

type Cart = Record<string, number>;

type Action =
  | { type: "toggle"; id: string }
  | { type: "inc" | "dec" | "remove"; id: string }
  | { type: "clear" };

export const MAX_QTY = 9;

function without(cart: Cart, id: string): Cart {
  const next = { ...cart };
  delete next[id];
  return next;
}

function reducer(cart: Cart, action: Action): Cart {
  switch (action.type) {
    case "toggle":
      return action.id in cart ? without(cart, action.id) : { ...cart, [action.id]: 1 };
    case "inc":
      return { ...cart, [action.id]: Math.min(MAX_QTY, (cart[action.id] ?? 0) + 1) };
    case "dec": {
      const qty = (cart[action.id] ?? 0) - 1;
      return qty <= 0 ? without(cart, action.id) : { ...cart, [action.id]: qty };
    }
    case "remove":
      return without(cart, action.id);
    case "clear":
      return {};
  }
}

export type CartLine = { id: string; label: string; price: number; priceLabel: string; qty: number };

function toLines(cart: Cart): CartLine[] {
  return Object.entries(cart).flatMap(([id, qty]) => {
    const item = findPriceItem(id);
    if (!item) return [];
    return [
      {
        id,
        label: item.title + (item.titleSuffix ?? ""),
        price: item.price,
        priceLabel: `${item.price.toLocaleString("ko-KR")}원${item.fromTilde ? "~" : ""}`,
        qty,
      },
    ];
  });
}

type Ctx = {
  lines: CartLine[];
  count: number;
  total: number;
  isSelected: (id: string) => boolean;
  dispatch: (action: Action) => void;
  tab: TabKey;
  setTab: (tab: TabKey) => void;
};

const PricingContext = createContext<Ctx | null>(null);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, {});
  const [tab, setTab] = useState<TabKey>("packages");
  const value = useMemo<Ctx>(() => {
    const lines = toLines(cart);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      isSelected: (id) => id in cart,
      dispatch,
      tab,
      setTab,
    };
  }, [cart, tab]);
  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used inside <PricingProvider>");
  return ctx;
}
