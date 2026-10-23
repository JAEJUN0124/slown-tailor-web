// Sample promotions (기획전): list cards, editorial blocks and product tabs.
import { PRODUCTS } from "./catalog";
import type { Art, Product } from "./types";

export type PromotionTheme = "컬렉션" | "신상품" | "단독" | "시즌오프";

export type Promotion = {
  id: string;
  title: string;
  theme: PromotionTheme;
  period: string;
  cover: Art;
  /** Big editorial headline under the brand strip. */
  headline: string;
  season: string;
  hero: { backdrop: string; art: Art };
  block: { color: string; kicker: string; text: string };
  gallery: [Art, Art];
  /** First tab is everything. */
  tabs: { label: string; products: Product[] }[];
};

const where = (fn: (p: Product) => boolean) => PRODUCTS.filter(fn);

function tabs(groups: [string, Product[]][]): Promotion["tabs"] {
  const all = [...new Map(groups.flatMap(([, list]) => list).map((p) => [p.id, p])).values()];
  return [{ label: "전체", products: all }, ...groups.map(([label, products]) => ({ label, products }))];
}

export const PROMOTIONS: Promotion[] = [
  {
    id: "fw-tailoring",
    title: "26 F/W TAILORING",
    theme: "컬렉션",
    period: "2026.10.01 ~ 2026.11.30",
    cover: { kind: "coat", color: "#a8835a", tone: 1 },
    headline: "TAILORING",
    season: "26 F/W",
    hero: { backdrop: "#3b3733", art: { kind: "coat", color: "#a8835a" } },
    block: { color: "#5f5b52", kicker: "26 FALL / WINTER", text: "EXPLORE SLOWN\nTAILORING COLLECTION" },
    gallery: [{ kind: "suit", color: "#3a3b3e", tone: 1 }, { kind: "jacket", color: "#a57f55", tone: 2 }],
    tabs: tabs([
      ["SUITS", where((p) => p.sub === "suits" && !p.outlet)],
      ["COATS", where((p) => p.sub === "coats" && !p.outlet)],
      ["KNIT", where((p) => p.sub === "knit")],
    ]),
  },
  {
    id: "wedding-edit",
    title: "WEDDING EDIT",
    theme: "컬렉션",
    period: "2026.09.15 ~ 2026.12.31",
    cover: { kind: "suit", color: "#161616", variant: "tux", tone: 3 },
    headline: "WEDDING EDIT",
    season: "CEREMONY",
    hero: { backdrop: "#5a5249", art: { kind: "suit", color: "#161616", variant: "tux" } },
    block: { color: "#4a463f", kicker: "FOR THE DAY", text: "가장 오래 기억될\n하루의 옷" },
    gallery: [{ kind: "bowtie", color: "#161616", tone: 3 }, { kind: "shirt", color: "#ece6d8", tone: 2 }],
    tabs: tabs([
      ["SUITS", where((p) => ["tuxedo", "sbSuit", "dbSuit", "wSuit"].includes(p.model))],
      ["ACC", where((p) => ["bowtie", "cufflinks", "square", "tie", "wingShirt"].includes(p.model))],
      ["SHOES", where((p) => ["oxfords", "pump"].includes(p.model))],
    ]),
  },
  {
    id: "exclusive",
    title: "ONLINE EXCLUSIVE",
    theme: "단독",
    period: "2026.10.10 ~ 2026.11.10",
    cover: { kind: "coat", color: "#b48c5f", variant: "belted", tone: 1 },
    headline: "EXCLUSIVE",
    season: "ONLINE ONLY",
    hero: { backdrop: "#4b382a", art: { kind: "coat", color: "#b48c5f", variant: "belted" } },
    block: { color: "#6b5440", kicker: "ONLINE EXCLUSIVE", text: "온라인에서만 만나는\n카멜 더블 코트" },
    gallery: [{ kind: "bag", color: "#161616", tone: 2 }, { kind: "suit", color: "#161616", variant: "tux", tone: 1 }],
    tabs: tabs([
      ["단독", where((p) => p.tag === "단독")],
      ["COATS", where((p) => p.sub === "coats" && !p.outlet)],
    ]),
  },
  {
    id: "shirts-new-in",
    title: "SHIRTS NEW IN",
    theme: "신상품",
    period: "2026.10.05 ~ 2026.11.05",
    cover: { kind: "shirt", color: "#c8d4e3", tone: 2 },
    headline: "SHIRTS",
    season: "NEW IN",
    hero: { backdrop: "#4c5661", art: { kind: "shirt", color: "#c8d4e3" } },
    block: { color: "#55606b", kicker: "NEW COLOURS", text: "새로운 시즌의 컬러로\n만나는 셔츠" },
    gallery: [{ kind: "shirt", color: "#f4f2ee", tone: 2 }, { kind: "tie", color: "#1f2a44", tone: 3 }],
    tabs: tabs([
      ["MEN", where((p) => p.sub === "shirts" && p.shelf === "men")],
      ["WOMEN", where((p) => p.sub === "blouses")],
      ["TIES", where((p) => p.sub === "ties")],
    ]),
  },
  {
    id: "leather-goods",
    title: "LEATHER GOODS",
    theme: "신상품",
    period: "2026.09.20 ~ 2026.11.20",
    cover: { kind: "bag", color: "#a0703f", tone: 0 },
    headline: "LEATHER GOODS",
    season: "26 F/W",
    hero: { backdrop: "#56534e", art: { kind: "bag", color: "#a0703f" } },
    block: { color: "#5a5048", kicker: "EVERYDAY LEATHER", text: "어디에나 어울리는\n가죽 소품" },
    gallery: [{ kind: "belt", color: "#3e2a1e", tone: 1 }, { kind: "wallet", color: "#1b1b1b", tone: 2 }],
    tabs: tabs([
      ["BAGS", where((p) => p.sub === "bags" && !p.outlet)],
      ["BELTS", where((p) => p.sub === "belts")],
      ["WALLETS", where((p) => p.sub === "wallets")],
    ]),
  },
  {
    id: "ss-season-off",
    title: "26 S/S SEASON OFF",
    theme: "시즌오프",
    period: "2026.10.01 ~ 2026.10.31",
    cover: { kind: "jacket", color: "#d9cfbd", tone: 2 },
    headline: "SEASON OFF",
    season: "UP TO 60%",
    hero: { backdrop: "#202a42", art: { kind: "jacket", color: "#d9cfbd" } },
    block: { color: "#2c3550", kicker: "26 SPRING / SUMMER", text: "지난 시즌 아이템\n최대 60% 할인" },
    gallery: [{ kind: "suit", color: "#a3a4a6", tone: 2 }, { kind: "skirt", color: "#ddd3c0", tone: 3 }],
    tabs: tabs([
      ["MEN", where((p) => !!p.outlet && p.shelf === "men")],
      ["WOMEN", where((p) => !!p.outlet && p.shelf === "women")],
      ["SHOES & ACC", where((p) => !!p.outlet && p.shelf === "shoes-acc")],
    ]),
  },
  {
    id: "ceremony-shoes",
    title: "CEREMONY SHOES",
    theme: "컬렉션",
    period: "2026.09.01 ~ 2026.12.31",
    cover: { kind: "shoes", color: "#151515", tone: 2 },
    headline: "CEREMONY SHOES",
    season: "GOODYEAR WELTED",
    hero: { backdrop: "#34322f", art: { kind: "shoes", color: "#151515" } },
    block: { color: "#3f3c38", kicker: "MADE TO LAST", text: "창갈이로 오래 신는\n굿이어 웰트 구두" },
    gallery: [{ kind: "shoes", color: "#4a3426", variant: "loafer", tone: 1 }, { kind: "pump", color: "#151515", tone: 3 }],
    tabs: tabs([
      ["MEN", where((p) => p.sub === "mens-shoes" && !p.outlet)],
      ["WOMEN", where((p) => p.sub === "womens-shoes")],
    ]),
  },
  {
    id: "outlet-new-in",
    title: "OUTLET NEW IN",
    theme: "시즌오프",
    period: "2026.10.15 ~ 2026.12.15",
    cover: { kind: "coat", color: "#b9ad97", variant: "belted", tone: 2 },
    headline: "OUTLET",
    season: "NEW IN",
    hero: { backdrop: "#4a4740", art: { kind: "coat", color: "#b9ad97", variant: "belted" } },
    block: { color: "#55524a", kicker: "LAST SEASON", text: "아울렛에 새로 들어온\n지난 시즌 아이템" },
    gallery: [{ kind: "shirt", color: "#f2efe8", tone: 2 }, { kind: "shoes", color: "#5a3e2b", variant: "loafer", tone: 1 }],
    tabs: tabs([["OUTLET", where((p) => !!p.outlet)]]),
  },
  {
    id: "knit-collection",
    title: "KNIT COLLECTION",
    theme: "컬렉션",
    period: "2026.10.01 ~ 2026.12.31",
    cover: { kind: "knit", color: "#cbbfa9", tone: 2 },
    headline: "KNIT",
    season: "MERINO WOOL",
    hero: { backdrop: "#5b5146", art: { kind: "knit", color: "#cbbfa9" } },
    block: { color: "#665a4d", kicker: "LAYERING", text: "셔츠 위에 겹쳐 입는\n가는 메리노울 니트" },
    gallery: [{ kind: "knit", color: "#5b4130", variant: "vest", tone: 3 }, { kind: "knit", color: "#7d6450", variant: "cardigan", tone: 1 }],
    tabs: tabs([
      ["MEN", where((p) => p.sub === "knit" && p.shelf === "men")],
      ["WOMEN", where((p) => p.sub === "knit" && p.shelf === "women")],
    ]),
  },
  {
    id: "ss-collection",
    title: "26 S/S COLLECTION",
    theme: "컬렉션",
    period: "2026.03.01 ~ 2026.08.31",
    cover: { kind: "suit", color: "#a3a4a6", tone: 2 },
    headline: "SPRING / SUMMER",
    season: "26 S/S",
    hero: { backdrop: "#6b6f72", art: { kind: "suit", color: "#a3a4a6" } },
    block: { color: "#71767a", kicker: "LIGHT TAILORING", text: "가볍게 입는\n여름 테일러링" },
    gallery: [{ kind: "jacket", color: "#d9cfbd", tone: 2 }, { kind: "shirt", color: "#b9c9da", tone: 0 }],
    tabs: tabs([
      ["MEN", where((p) => ["summerSuit", "linenShirt", "linenJacket"].includes(p.model))],
      ["WOMEN", where((p) => ["lightTrench", "wrapSkirt"].includes(p.model))],
    ]),
  },
];

export const promotionById = (id: string) => PROMOTIONS.find((p) => p.id === id);

export const PROMOTION_THEMES: PromotionTheme[] = ["컬렉션", "신상품", "단독", "시즌오프"];
