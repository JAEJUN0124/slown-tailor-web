// Main navigation (reference: gnb_datas.js). The shop entries come from the
// category tree, so the menus and the list screens always agree.
import { CATEGORY_TOPS, shopHref } from "./catalog";
import { CAMPAIGNS, MAGAZINE_META } from "./magazine";
import type { Scene } from "./types";
import type { NavLink } from "./site";

export type GnbItem = {
  key: string;
  name: string;
  /** Set when the entry is a plain link without a sub menu. */
  href?: string;
  regulars: NavLink[];
  subs: NavLink[];
  /** Campaign cards shown in the mobile sub menu. */
  cards?: { title: string; href: string; scene: Scene }[];
};

const fromTop = (key: "men" | "women" | "upcoming"): GnbItem => {
  const top = CATEGORY_TOPS.find((t) => t.key === key)!;
  return {
    key,
    name: top.name,
    regulars: top.regulars.map((n) => ({ label: n.name, href: shopHref(n.path) })),
    subs: top.subs.map((n) => ({ label: n.name, href: shopHref(n.path) })),
  };
};

export const GNB: GnbItem[] = [
  fromTop("men"),
  fromTop("women"),
  {
    key: "campaign",
    name: "캠페인",
    regulars: [
      { label: "캠페인", href: MAGAZINE_META.campaign.list },
      { label: "룩북", href: MAGAZINE_META.lookbook.list },
    ],
    subs: [],
    cards: CAMPAIGNS.map((c) => ({ title: c.titleKo, href: MAGAZINE_META.campaign.detail(c.slug), scene: c.cover })),
  },
  { key: "journal", name: "저널", href: MAGAZINE_META.journal.list, regulars: [], subs: [] },
  fromTop("upcoming"),
];
