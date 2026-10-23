// SLOWN's sample catalog. Each model lists its colourways; one product is
// generated per colourway, the way the reference lists one item per colour.
// Ratings, likes and sales figures come from a hash of the id so they stay
// stable between builds. Everything here is placeholder data.
import type { ArtKind, ArtVariant, Gender, Product, Shelf, SizeKey, Swatch, Tag } from "./types";

type Colorway = { name: string; ko: string; hex: string; tone?: number; soldOut?: boolean };

type Model = {
  key: string;
  gender: Gender;
  title: string;
  shelf: Shelf;
  sub: string;
  kind: ArtKind;
  variant?: ArtVariant;
  price: number;
  colors: Colorway[];
  isNew?: boolean;
  tag?: Tag;
  /** Outlet models carry a discount rate (%). */
  outlet?: number;
  season?: string;
  /** Fixed stats for the first colourway (keeps the main page numbers). */
  stats?: { rating?: number; reviews?: number; likes: number };
  keywords?: string;
};

const M = (m: Model) => m;

const MODELS: Model[] = [
  // ── Men ────────────────────────────────────────────────────────────
  M({ key: "sbSuit", gender: "MEN", title: "Single Breasted Wool Suit", shelf: "men", sub: "suits", kind: "suit", price: 1290000, stats: { rating: 4.5, reviews: 56, likes: 628 }, keywords: "수트 정장 슈트 suit 싱글",
    colors: [{ name: "Charcoal", ko: "차콜", hex: "#3a3b3e" }, { name: "Navy", ko: "네이비", hex: "#232b3b", tone: 2 }, { name: "Mid Grey", ko: "그레이", hex: "#6e6f72", tone: 1 }] }),
  M({ key: "dbSuit", gender: "MEN", title: "Double Breasted Suit", shelf: "men", sub: "suits", kind: "suit", variant: "db", price: 1390000, isNew: true, stats: { rating: 5, reviews: 12, likes: 341 }, keywords: "수트 정장 더블 suit",
    colors: [{ name: "Navy", ko: "네이비", hex: "#232b3b", tone: 2 }, { name: "Black", ko: "블랙", hex: "#161616" }] }),
  M({ key: "tuxedo", gender: "MEN", title: "Peak Lapel Tuxedo", shelf: "men", sub: "suits", kind: "suit", variant: "tux", price: 1590000, tag: "단독", stats: { rating: 4.5, reviews: 31, likes: 512 }, keywords: "턱시도 예복 웨딩 tuxedo",
    colors: [{ name: "Black", ko: "블랙", hex: "#161616" }] }),
  M({ key: "blazer", gender: "MEN", title: "Soft Shoulder Blazer", shelf: "men", sub: "jackets", kind: "jacket", price: 790000, stats: { rating: 4.5, reviews: 8, likes: 160 }, keywords: "블레이저 재킷 자켓 jacket",
    colors: [{ name: "Camel", ko: "카멜", hex: "#a57f55", tone: 1 }, { name: "Navy", ko: "네이비", hex: "#263048", tone: 2 }] }),
  M({ key: "linenJacket", gender: "MEN", title: "Linen Blend Jacket", shelf: "men", sub: "jackets", kind: "jacket", price: 690000, keywords: "린넨 재킷 자켓 jacket",
    colors: [{ name: "Ecru", ko: "에크루", hex: "#d9cfbd", tone: 2 }, { name: "Olive", ko: "올리브", hex: "#6b6a4c", tone: 1 }] }),
  M({ key: "camelCoat", gender: "MEN", title: "Wool Cashmere Coat", shelf: "men", sub: "coats", kind: "coat", price: 1190000, isNew: true, stats: { rating: 4, reviews: 9, likes: 325 }, keywords: "코트 캐시미어 coat",
    colors: [{ name: "Camel", ko: "카멜", hex: "#b08a5e", tone: 1 }, { name: "Charcoal", ko: "차콜", hex: "#444446" }] }),
  M({ key: "balmacaan", gender: "MEN", title: "Balmacaan Coat", shelf: "men", sub: "coats", kind: "coat", price: 1090000, isNew: true, keywords: "코트 발마칸 coat",
    colors: [{ name: "Charcoal", ko: "차콜", hex: "#444446" }, { name: "Taupe", ko: "토프", hex: "#8b7d6b", tone: 1 }] }),
  M({ key: "poplinShirt", gender: "MEN", title: "Poplin Dress Shirt", shelf: "men", sub: "shirts", kind: "shirt", price: 159000, stats: { rating: 4.5, reviews: 134, likes: 444 }, keywords: "셔츠 드레스셔츠 포플린 shirt",
    colors: [{ name: "White", ko: "화이트", hex: "#f4f2ee", tone: 2 }, { name: "Pale Blue", ko: "페일 블루", hex: "#c8d4e3" }] }),
  M({ key: "oxfordShirt", gender: "MEN", title: "Oxford Shirt", shelf: "men", sub: "shirts", kind: "shirt", price: 149000, isNew: true, keywords: "셔츠 옥스포드 shirt",
    colors: [{ name: "Pale Blue", ko: "페일 블루", hex: "#c8d4e3" }, { name: "White", ko: "화이트", hex: "#f4f2ee", tone: 2 }] }),
  M({ key: "wingShirt", gender: "MEN", title: "Wing Collar Shirt", shelf: "men", sub: "shirts", kind: "shirt", price: 189000, keywords: "셔츠 윙칼라 턱시도셔츠 예복 shirt",
    colors: [{ name: "Ivory", ko: "아이보리", hex: "#ece6d8", tone: 2 }] }),
  M({ key: "woolTrousers", gender: "MEN", title: "Pleated Wool Trousers", shelf: "men", sub: "pants", kind: "trousers", price: 329000, stats: { rating: 4.5, reviews: 14, likes: 151 }, keywords: "팬츠 바지 슬랙스 trousers",
    colors: [{ name: "Gray", ko: "그레이", hex: "#7a7a7c", tone: 1 }, { name: "Navy", ko: "네이비", hex: "#263048", tone: 2 }, { name: "Black", ko: "블랙", hex: "#1d1d1f" }] }),
  M({ key: "merino", gender: "MEN", title: "Merino Crewneck", shelf: "men", sub: "knit", kind: "knit", price: 259000, isNew: true, keywords: "니트 스웨터 크루넥 knit",
    colors: [{ name: "Oatmeal", ko: "오트밀", hex: "#cbbfa9", tone: 2 }, { name: "Navy", ko: "네이비", hex: "#2a3146" }] }),
  M({ key: "cableVest", gender: "MEN", title: "Cable Knit Vest", shelf: "men", sub: "knit", kind: "knit", variant: "vest", price: 229000, keywords: "니트 베스트 조끼 vest",
    colors: [{ name: "Brown", ko: "브라운", hex: "#5b4130", tone: 3 }, { name: "Ecru", ko: "에크루", hex: "#e3dccb", tone: 2 }] }),
  M({ key: "tie", gender: "UNISEX", title: "Silk Grenadine Tie", shelf: "men", sub: "ties", kind: "tie", price: 129000, stats: { rating: 4.5, reviews: 26, likes: 267 }, keywords: "타이 넥타이 실크 tie",
    colors: [{ name: "Navy", ko: "네이비", hex: "#1f2a44" }, { name: "Burgundy", ko: "버건디", hex: "#5c2230", tone: 1 }, { name: "Black", ko: "블랙", hex: "#141414", tone: 2 }] }),
  M({ key: "bowtie", gender: "UNISEX", title: "Silk Bow Tie", shelf: "men", sub: "ties", kind: "bowtie", price: 99000, stats: { rating: 5, reviews: 7, likes: 137 }, keywords: "보타이 나비넥타이 예복 bowtie",
    colors: [{ name: "Black", ko: "블랙", hex: "#161616", tone: 1 }] }),
  M({ key: "square", gender: "UNISEX", title: "Hand Rolled Pocket Square", shelf: "men", sub: "ties", kind: "square", price: 59000, keywords: "포켓치프 행커치프 pocket square",
    colors: [{ name: "White", ko: "화이트", hex: "#f4f2ec", tone: 2 }, { name: "Navy", ko: "네이비", hex: "#263048" }] }),
  M({ key: "cufflinks", gender: "UNISEX", title: "Mother of Pearl Cufflinks", shelf: "men", sub: "cufflinks", kind: "cufflinks", price: 189000, tag: "재입고", stats: { rating: 4, reviews: 9, likes: 133 }, keywords: "커프링크스 커프스 자개 cufflinks",
    colors: [{ name: "Silver", ko: "실버", hex: "#e9e4da" }] }),

  // ── Women ──────────────────────────────────────────────────────────
  M({ key: "wSuit", gender: "WOMEN", title: "Tailored Wool Suit", shelf: "women", sub: "suits", kind: "suit", price: 1190000, isNew: true, keywords: "수트 정장 셋업 suit",
    colors: [{ name: "Black", ko: "블랙", hex: "#1a1a1a", tone: 1 }, { name: "Ivory", ko: "아이보리", hex: "#e7e1d3", tone: 2 }] }),
  M({ key: "wBlazer", gender: "WOMEN", title: "Tailored Wool Blazer", shelf: "women", sub: "jackets", kind: "jacket", price: 790000, tag: "재입고", stats: { rating: 4.5, reviews: 21, likes: 394 }, keywords: "블레이저 재킷 자켓 jacket",
    colors: [{ name: "Black", ko: "블랙", hex: "#1a1a1a", tone: 1 }, { name: "Camel", ko: "카멜", hex: "#a57f55", tone: 3 }] }),
  M({ key: "blouse", gender: "WOMEN", title: "Silk Bow Blouse", shelf: "women", sub: "blouses", kind: "shirt", variant: "bow", price: 329000, keywords: "블라우스 실크 리본 blouse",
    colors: [{ name: "Champagne", ko: "샴페인", hex: "#e8d9bf", tone: 2 }, { name: "Black", ko: "블랙", hex: "#1c1c1c" }] }),
  M({ key: "wideTrousers", gender: "WOMEN", title: "Wide Leg Trousers", shelf: "women", sub: "pants", kind: "trousers", variant: "wide", price: 359000, stats: { rating: 4, reviews: 6, likes: 108 }, keywords: "팬츠 바지 와이드 trousers",
    colors: [{ name: "Ivory", ko: "아이보리", hex: "#e7e1d3", tone: 2 }, { name: "Black", ko: "블랙", hex: "#1a1a1a", tone: 1 }] }),
  M({ key: "wrapCoat", gender: "WOMEN", title: "Wrap Coat", shelf: "women", sub: "coats", kind: "coat", variant: "belted", price: 1190000, isNew: true, stats: { rating: 4.5, reviews: 15, likes: 450 }, keywords: "코트 랩코트 벨티드 coat",
    colors: [{ name: "Oatmeal", ko: "오트밀", hex: "#cdbfa6", tone: 2 }, { name: "Camel", ko: "카멜", hex: "#a57f55", tone: 1 }] }),
  M({ key: "skirt", gender: "WOMEN", title: "Pleated Midi Skirt", shelf: "women", sub: "skirts", kind: "skirt", price: 389000, isNew: true, keywords: "스커트 치마 플리츠 skirt",
    colors: [{ name: "Navy", ko: "네이비", hex: "#263048", tone: 1 }, { name: "Gray", ko: "그레이", hex: "#7a7a7c", tone: 2 }] }),
  M({ key: "cardigan", gender: "WOMEN", title: "Fine Knit Cardigan", shelf: "women", sub: "knit", kind: "knit", variant: "cardigan", price: 289000, keywords: "니트 가디건 cardigan",
    colors: [{ name: "Mocha", ko: "모카", hex: "#7d6450", tone: 3 }, { name: "Ivory", ko: "아이보리", hex: "#e9e2d2", tone: 2 }] }),
  M({ key: "slipDress", gender: "WOMEN", title: "Satin Slip Dress", shelf: "women", sub: "dresses", kind: "dress", price: 459000, keywords: "원피스 드레스 슬립 dress",
    colors: [{ name: "Ivory", ko: "아이보리", hex: "#ece3d1", tone: 2 }, { name: "Black", ko: "블랙", hex: "#191919", tone: 1 }] }),
  M({ key: "silkScarf", gender: "WOMEN", title: "Silk Twill Scarf", shelf: "women", sub: "acc", kind: "square", price: 189000, keywords: "스카프 실크 액세서리 scarf",
    colors: [{ name: "Champagne", ko: "샴페인", hex: "#e8d9bf", tone: 2 }, { name: "Navy", ko: "네이비", hex: "#263048", tone: 3 }] }),

  // ── Shoes & accessories ───────────────────────────────────────────
  M({ key: "oxfords", gender: "MEN", title: "Plain Toe Oxford", shelf: "shoes-acc", sub: "mens-shoes", kind: "shoes", price: 590000, stats: { rating: 4.5, reviews: 48, likes: 681 }, keywords: "구두 옥스포드 슈즈 shoes",
    colors: [{ name: "Black", ko: "블랙", hex: "#151515", tone: 2 }, { name: "Dark Brown", ko: "다크 브라운", hex: "#3d2a1f", tone: 1 }] }),
  M({ key: "loafers", gender: "MEN", title: "Suede Penny Loafer", shelf: "shoes-acc", sub: "mens-shoes", kind: "shoes", variant: "loafer", price: 520000, isNew: true, stats: { rating: 4.5, reviews: 15, likes: 255 }, keywords: "로퍼 구두 스웨이드 loafer",
    colors: [{ name: "Chocolate", ko: "초콜릿", hex: "#4a3426", tone: 1 }, { name: "Black", ko: "블랙", hex: "#161616", tone: 2 }] }),
  M({ key: "pump", gender: "WOMEN", title: "Pointed Pump 70", shelf: "shoes-acc", sub: "womens-shoes", kind: "pump", price: 490000, stats: { rating: 5, reviews: 7, likes: 214 }, keywords: "펌프스 힐 구두 pump",
    colors: [{ name: "Black", ko: "블랙", hex: "#151515", tone: 3 }, { name: "Taupe", ko: "토프", hex: "#8b7d6b", tone: 2 }] }),
  M({ key: "halfMoon", gender: "UNISEX", title: "Half Moon Bag", shelf: "shoes-acc", sub: "bags", kind: "bag", price: 890000, stats: { rating: 4.5, reviews: 93, likes: 972 }, keywords: "가방 숄더백 하프문 bag",
    colors: [{ name: "Tan", ko: "탄", hex: "#a0703f" }, { name: "Black", ko: "블랙", hex: "#161616", tone: 1 }] }),
  M({ key: "miniMoon", gender: "WOMEN", title: "Mini Half Moon Bag", shelf: "shoes-acc", sub: "bags", kind: "bag", price: 690000, tag: "단독", isNew: true, stats: { rating: 4.5, reviews: 42, likes: 483 }, keywords: "가방 미니백 하프문 bag",
    colors: [{ name: "Black", ko: "블랙", hex: "#161616", tone: 1 }, { name: "Ivory", ko: "아이보리", hex: "#e3d9c6", tone: 2 }] }),
  M({ key: "docCase", gender: "UNISEX", title: "Document Case", shelf: "shoes-acc", sub: "bags", kind: "case", price: 690000, keywords: "도큐먼트 케이스 서류가방 클러치 bag",
    colors: [{ name: "Black", ko: "블랙", hex: "#1b1b1b", tone: 2 }, { name: "Brown", ko: "브라운", hex: "#5a3e2b", tone: 1 }] }),
  M({ key: "belt", gender: "UNISEX", title: "Leather Belt 30", shelf: "shoes-acc", sub: "belts", kind: "belt", price: 189000, stats: { rating: 4.5, reviews: 5, likes: 295 }, keywords: "벨트 가죽 belt",
    colors: [{ name: "Dark Brown", ko: "다크 브라운", hex: "#3e2a1e", tone: 1 }, { name: "Black", ko: "블랙", hex: "#161616", tone: 2 }] }),
  M({ key: "cardHolder", gender: "UNISEX", title: "Card Holder", shelf: "shoes-acc", sub: "wallets", kind: "wallet", price: 159000, stats: { rating: 5, reviews: 1, likes: 133 }, keywords: "카드지갑 지갑 카드케이스 wallet",
    colors: [{ name: "Black", ko: "블랙", hex: "#1b1b1b" }, { name: "Tan", ko: "탄", hex: "#a0703f", tone: 1 }] }),

  // ── Outlet (earlier seasons, discounted) ──────────────────────────
  M({ key: "summerSuit", gender: "MEN", title: "Summer Wool Suit", shelf: "men", sub: "suits", kind: "suit", price: 1190000, outlet: 40, season: "2026 SS", keywords: "수트 정장 여름 suit",
    colors: [{ name: "Light Grey", ko: "라이트 그레이", hex: "#a3a4a6", tone: 2 }, { name: "Sand", ko: "샌드", hex: "#b9a98c", tone: 1 }] }),
  M({ key: "linenShirt", gender: "MEN", title: "Linen Camp Shirt", shelf: "men", sub: "shirts", kind: "shirt", price: 179000, outlet: 30, season: "2026 SS", keywords: "셔츠 린넨 shirt",
    colors: [{ name: "White", ko: "화이트", hex: "#f2efe8", tone: 2 }, { name: "Sky", ko: "스카이", hex: "#b9c9da", soldOut: true }] }),
  M({ key: "lightTrench", gender: "WOMEN", title: "Light Trench Coat", shelf: "women", sub: "coats", kind: "coat", variant: "belted", price: 1290000, outlet: 60, season: "2026 SS", keywords: "트렌치 코트 coat",
    colors: [{ name: "Stone", ko: "스톤", hex: "#b9ad97", tone: 2 }] }),
  M({ key: "wrapSkirt", gender: "WOMEN", title: "Linen Wrap Skirt", shelf: "women", sub: "skirts", kind: "skirt", price: 329000, outlet: 40, season: "2026 SS", keywords: "스커트 린넨 skirt",
    colors: [{ name: "Ecru", ko: "에크루", hex: "#ddd3c0", tone: 3 }, { name: "Black", ko: "블랙", hex: "#1c1c1c", tone: 1, soldOut: true }] }),
  M({ key: "tasselLoafer", gender: "MEN", title: "Tassel Loafer", shelf: "shoes-acc", sub: "mens-shoes", kind: "shoes", variant: "loafer", price: 490000, outlet: 40, season: "2026 SS", keywords: "로퍼 구두 태슬 loafer",
    colors: [{ name: "Brown", ko: "브라운", hex: "#5a3e2b", tone: 1 }] }),
  M({ key: "canvasTote", gender: "UNISEX", title: "Canvas Document Tote", shelf: "shoes-acc", sub: "bags", kind: "case", price: 390000, outlet: 30, season: "2026 SS", keywords: "토트 가방 캔버스 bag",
    colors: [{ name: "Natural", ko: "내추럴", hex: "#cdbfa6", tone: 2 }] }),
];

// ── Category tree ─────────────────────────────────────────────────────
export type SubCategory = { slug: string; label: string };

export const SHELVES: Record<Shelf, { label: string; subs: SubCategory[] }> = {
  men: {
    label: "남성",
    subs: [
      { slug: "suits", label: "수트" },
      { slug: "jackets", label: "재킷/블레이저" },
      { slug: "shirts", label: "셔츠" },
      { slug: "knit", label: "니트" },
      { slug: "pants", label: "팬츠" },
      { slug: "coats", label: "코트" },
      { slug: "ties", label: "타이/포켓치프" },
      { slug: "cufflinks", label: "커프링크스" },
    ],
  },
  women: {
    label: "여성",
    subs: [
      { slug: "suits", label: "수트" },
      { slug: "jackets", label: "재킷" },
      { slug: "blouses", label: "블라우스" },
      { slug: "knit", label: "니트" },
      { slug: "skirts", label: "스커트" },
      { slug: "pants", label: "팬츠" },
      { slug: "coats", label: "코트" },
      { slug: "dresses", label: "원피스" },
      { slug: "acc", label: "액세서리" },
    ],
  },
  "shoes-acc": {
    label: "슈즈＆잡화",
    subs: [
      { slug: "mens-shoes", label: "남성 슈즈" },
      { slug: "womens-shoes", label: "여성 슈즈" },
      { slug: "bags", label: "가방" },
      { slug: "belts", label: "벨트" },
      { slug: "wallets", label: "지갑/카드케이스" },
    ],
  },
};

/** List pages: the three shelves plus the cross-shelf New In and Outlet lists. */
export type ListKey = Shelf | "new" | "outlet";

export const LISTS: Record<ListKey, { label: string; subs: SubCategory[] }> = {
  ...SHELVES,
  new: {
    label: "신상품",
    subs: [
      { slug: "men", label: "남성" },
      { slug: "women", label: "여성" },
      { slug: "shoes-acc", label: "슈즈＆잡화" },
    ],
  },
  outlet: {
    label: "아울렛",
    subs: [
      { slug: "men", label: "남성" },
      { slug: "women", label: "여성" },
      { slug: "shoes-acc", label: "슈즈＆잡화" },
    ],
  },
};

export const LIST_KEYS = Object.keys(LISTS) as ListKey[];

// ── Generation ────────────────────────────────────────────────────────
/** FNV-1a: small, stable pseudo-random source per id. */
function hash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
const pick = (h: number, n: number) => (h >>> 0) % n;

const SIZE_SETS: Record<SizeKey, string[]> = {
  menTailoring: ["44", "46", "48", "50", "52", "54"],
  womenTailoring: ["34", "36", "38", "40", "42"],
  menShirt: ["38", "39", "40", "41", "42", "43"],
  knit: ["S", "M", "L", "XL"],
  menPants: ["44", "46", "48", "50", "52"],
  womenPants: ["34", "36", "38", "40"],
  menShoes: ["250", "255", "260", "265", "270", "275", "280"],
  womenShoes: ["225", "230", "235", "240", "245", "250"],
  belt: ["85", "90", "95", "100"],
  free: ["F"],
};

function sizeKeyFor(m: Model): SizeKey {
  const women = m.gender === "WOMEN";
  switch (m.kind) {
    case "suit":
    case "jacket":
    case "coat":
      return women ? "womenTailoring" : "menTailoring";
    case "shirt":
      return women ? "womenTailoring" : "menShirt";
    case "dress":
    case "skirt":
      return "womenTailoring";
    case "knit":
      return "knit";
    case "trousers":
      return women ? "womenPants" : "menPants";
    case "shoes":
      return "menShoes";
    case "pump":
      return "womenShoes";
    case "belt":
      return "belt";
    default:
      return "free";
  }
}

const DETAIL: Record<ArtKind, { material: string; fit: string; desc: string }> = {
  suit: { material: "겉감: 울 100% / 안감: 큐프라 100%", fit: "레귤러 핏 / 정사이즈", desc: "부드러운 어깨선과 살짝 높은 단추 위치로 길게 떨어지는 실루엣을 만든 수트입니다. 구김이 적은 울 원단이라 하루 종일 형태가 유지됩니다." },
  jacket: { material: "겉감: 울 70%, 리넨 30% / 안감: 큐프라 100%", fit: "레귤러 핏 / 정사이즈", desc: "패드를 덜어 낸 소프트 숄더 재킷입니다. 셔츠와 니트 어느 쪽에도 가볍게 걸칠 수 있도록 안감을 반만 넣었습니다." },
  coat: { material: "겉감: 울 90%, 캐시미어 10% / 안감: 큐프라 100%", fit: "릴랙스드 핏 / 한 치수 작게 추천", desc: "수트 위에 겹쳐 입어도 어깨가 끼지 않도록 품을 넉넉하게 잡은 코트입니다. 무릎 아래로 떨어지는 길이에 숨은 단추 여밈을 썼습니다." },
  shirt: { material: "겉감: 면 100%", fit: "슬림 핏 / 정사이즈", desc: "촘촘한 2합 원단으로 만든 셔츠입니다. 칼라 심지를 부드럽게 넣어 타이를 매지 않아도 깃이 자연스럽게 섭니다." },
  knit: { material: "겉감: 메리노울 100%", fit: "레귤러 핏 / 정사이즈", desc: "가는 메리노울로 짠 니트입니다. 셔츠 위에 겹쳐도 부피가 크지 않고, 소매와 밑단의 골지가 형태를 잡아 줍니다." },
  trousers: { material: "겉감: 울 100%", fit: "테이퍼드 핏 / 정사이즈", desc: "앞주름을 하나 넣어 허벅지는 여유 있게, 밑단은 깔끔하게 좁힌 팬츠입니다. 허리 안쪽에 실리콘 밴드를 덧대 셔츠가 빠지지 않습니다." },
  skirt: { material: "겉감: 폴리에스터 70%, 울 30%", fit: "A라인 / 정사이즈", desc: "걸을 때마다 주름이 부드럽게 퍼지는 미디 길이 스커트입니다. 허리는 뒤쪽 지퍼로 여밉니다." },
  dress: { material: "겉감: 실크 100%", fit: "레귤러 핏 / 정사이즈", desc: "바이어스 재단으로 몸을 따라 흐르는 슬립 드레스입니다. 어깨 끈 길이를 조절할 수 있습니다." },
  tie: { material: "실크 100%", fit: "폭 7.5cm / 길이 148cm", desc: "그레나딘 조직으로 짠 실크 타이입니다. 매듭이 작고 단단하게 잡혀 수트와 셔츠 어느 쪽에도 무난합니다." },
  bowtie: { material: "실크 100%", fit: "목둘레 34~48cm 조절", desc: "예복과 턱시도에 맞춘 셀프 타이 보타이입니다. 직접 매는 방식이라 매듭이 자연스럽습니다." },
  square: { material: "실크 100%", fit: "33 × 33cm", desc: "가장자리를 손으로 말아 박은 포켓스퀘어입니다. 접는 방식에 따라 가슴 주머니 위로 보이는 모양이 달라집니다." },
  cufflinks: { material: "황동, 자개", fit: "지름 1.6cm", desc: "자개를 은빛 황동 테에 박은 커프링크스입니다. 더블 커프스 셔츠와 함께 쓰는 것을 권합니다." },
  shoes: { material: "갑피: 소가죽 / 밑창: 가죽", fit: "정사이즈 / 볼이 넓다면 반 치수 크게", desc: "굿이어 웰트 방식으로 만든 구두입니다. 창갈이가 가능해 오래 신을 수 있습니다." },
  pump: { material: "갑피: 양가죽 / 밑창: 가죽", fit: "굽 7cm / 정사이즈", desc: "앞코를 길게 뺀 포인티드 펌프스입니다. 발볼 부분에 쿠션을 넣어 오래 서 있어도 편합니다." },
  bag: { material: "겉감: 소가죽 / 안감: 면", fit: "가로 34cm × 세로 22cm", desc: "반달 모양으로 떨어지는 숄더백입니다. 어깨끈 길이를 조절해 크로스로도 멜 수 있습니다." },
  case: { material: "겉감: 소가죽", fit: "가로 38cm × 세로 28cm", desc: "13인치 노트북이 들어가는 도큐먼트 케이스입니다. 위쪽 손잡이를 접으면 클러치처럼 들 수 있습니다." },
  belt: { material: "소가죽, 황동 버클", fit: "폭 3cm", desc: "수트 팬츠의 벨트 고리에 맞춘 3cm 폭 가죽 벨트입니다. 버클은 무광으로 마감했습니다." },
  wallet: { material: "소가죽", fit: "가로 10cm × 세로 7cm", desc: "카드 네 장과 지폐를 접어 넣을 수 있는 카드지갑입니다." },
};

const SEASON = "2026 FW";

function build(): Product[] {
  const out: Product[] = [];
  MODELS.forEach((m, mi) => {
    const swatches: Swatch[] = m.colors.map((c) => ({ id: `${m.key}-${slug(c.name)}`, color: c.hex, name: c.ko }));
    m.colors.forEach((c, ci) => {
      const id = `${m.key}-${slug(c.name)}`;
      const h = hash(id);
      const stats =
        ci === 0 && m.stats
          ? m.stats
          : pick(h, 10) < 3
            ? { likes: 3 + pick(h >> 3, 90) }
            : { rating: [4, 4.5, 4.5, 5][pick(h >> 5, 4)], reviews: 1 + pick(h >> 7, 60), likes: 10 + pick(h >> 11, 600) };
      const sizeKey = sizeKeyFor(m);
      const sizes = SIZE_SETS[sizeKey];
      const discounted = m.outlet ? Math.round((m.price * (100 - m.outlet)) / 100 / 100) * 100 : undefined;
      out.push({
        id,
        model: m.key,
        gender: m.gender,
        name: `(${m.gender}) ${m.title} - ${c.name}`,
        title: m.title,
        colorName: c.name,
        colorKo: c.ko,
        shelf: m.shelf,
        sub: m.sub,
        kind: m.kind,
        variant: m.variant,
        color: c.hex,
        tone: c.tone ?? 0,
        price: discounted ?? m.price,
        originalPrice: discounted ? m.price : undefined,
        rating: stats.rating,
        reviews: stats.reviews,
        likes: stats.likes,
        tag: ci === 0 ? m.tag : m.isNew && pick(h, 3) === 0 ? "이번주신상" : undefined,
        soldOut: c.soldOut,
        isNew: m.isNew,
        outlet: !!m.outlet,
        sizeKey,
        sizes,
        soldOutSizes: sizes.length > 2 ? [sizes[pick(h >> 13, sizes.length)]] : [],
        swatches,
        code: `SL${(m.season ?? SEASON).slice(2, 4)}${(m.season ?? SEASON).endsWith("FW") ? "F" : "S"}-${String(mi + 1).padStart(2, "0")}${ci + 1}`,
        season: m.season ?? SEASON,
        ...DETAIL[m.kind],
        keywords: `${m.keywords ?? ""} ${c.ko} ${c.name}`.toLowerCase(),
        sales: (stats.likes ?? 0) * 3 + pick(h >> 2, 400),
        clicks: pick(h >> 4, 5000),
        order: mi * 10 + ci,
        fastShipping: pick(h >> 6, 3) !== 0,
        pickup: pick(h >> 8, 4) === 0,
        giftWrap: m.shelf === "shoes-acc" || m.kind === "tie",
      });
    });
  });
  return out;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const PRODUCTS: Product[] = build();

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export const productById = (id: string) => BY_ID.get(id);

/** First colourway of a model (or a given colour index). */
export function byModel(key: string, colorIndex = 0): Product {
  const p = PRODUCTS.filter((x) => x.model === key)[colorIndex];
  if (!p) throw new Error(`unknown model ${key}`);
  return p;
}

export const models = (keys: string[]) => keys.map((k) => byModel(k));

/** Products of a list page, optionally narrowed to one sub-category. */
export function listProducts(list: ListKey, sub?: string): Product[] {
  let items: Product[];
  if (list === "new") items = PRODUCTS.filter((p) => p.isNew && !p.outlet && (!sub || p.shelf === sub));
  else if (list === "outlet") items = PRODUCTS.filter((p) => p.outlet && (!sub || p.shelf === sub));
  else items = PRODUCTS.filter((p) => p.shelf === list && !p.outlet && (!sub || p.sub === sub));
  return items;
}

/** Most-bought first: the order the corners and ranking use. */
const bySales = (a: Product, b: Product) => b.sales - a.sales;

/**
 * The three corners under a product (reference: 취향을 아는 추천 · 취향이 담긴
 * 브랜드 상품 · 함께 탐색한 취향): the same kind of item, the rest of its shelf,
 * and a stable shuffle of everything else. Other colourways stay out.
 */
export function relatedTo(p: Product, max = 18) {
  const others = PRODUCTS.filter((x) => x.model !== p.model && !x.soldOut);
  const similar = others.filter((x) => x.kind === p.kind || x.sub === p.sub).sort(bySales);
  const firstColour = (x: Product) => x.swatches[0].id === x.id;
  const shelf = others.filter((x) => x.shelf === p.shelf && firstColour(x) && !similar.slice(0, max).includes(x)).sort(bySales);
  const seed = hash(p.id);
  const browsed = others.filter(firstColour).sort((a, b) => (hash(a.id) ^ seed) - (hash(b.id) ^ seed));
  return { similar: similar.slice(0, max), shelf: shelf.slice(0, max), browsed: browsed.slice(0, max) };
}

export function subLabel(p: Product) {
  return SHELVES[p.shelf].subs.find((s) => s.slug === p.sub)?.label ?? "";
}

// ── Reviews & questions ──────────────────────────────────────────────
export type Review = {
  id: string;
  rating: number;
  size: string;
  option: string;
  colorFeel: "어두워요" | "화면과 같아요" | "밝아요";
  text: string;
  user: string;
  date: string;
  photo: boolean;
  store: boolean;
  staff: boolean;
  helpful: number;
};

const REVIEW_TEXTS = [
  "어깨가 자연스럽게 떨어져서 처음 입었는데도 오래 입던 옷처럼 편했습니다. 소매 길이만 수선 맡겼어요.",
  "원단이 생각보다 도톰하고 구김이 잘 안 갑니다. 출근용으로 두 벌째 구매했어요.",
  "사이즈 고민하다 상담 받고 한 치수 크게 했는데 딱 맞습니다. 품 여유가 적당해요.",
  "결혼식 예복으로 샀는데 사진이 정말 잘 나왔어요. 바느질 마감도 꼼꼼합니다.",
  "색이 화면보다 살짝 차분한 편인데 오히려 더 고급스러워 보여요.",
  "배송이 빨랐고 포장도 깔끔했습니다. 선물용으로도 좋을 것 같아요.",
  "매장에서 입어 보고 온라인으로 주문했어요. 매장 직원분이 핏을 잘 봐 주셨습니다.",
  "가볍고 통기성이 좋아서 오래 입고 있어도 덥지 않네요.",
  "처음엔 가격이 부담됐는데 입어 보니 납득이 갑니다. 만족해요.",
  "부모님 상견례 때 입으려고 샀는데 단정하고 좋았습니다.",
];
const USERS = ["kim", "lee", "park", "choi", "jung", "kang", "yoon", "han", "seo", "oh"];

const DAY = 86_400_000;
const TODAY = Date.UTC(2026, 9, 22);
const dateLabel = (t: number) => new Date(t).toISOString().slice(0, 10).replaceAll("-", ".");

/** Sample reviews, newest first; as many as the product's review count. */
export function reviewsFor(p: Product): Review[] {
  const n = p.reviews ?? 0;
  const h0 = hash(p.id);
  // Share of 4-star reviews that keeps the average near the product's rating.
  const fours = Math.round((5 - (p.rating ?? 5)) * 10);
  let t = TODAY;
  return Array.from({ length: n }, (_, i) => {
    const h = hash(`${p.id}:${i}`);
    t -= (1 + pick(h >> 21, 4)) * DAY;
    const size = p.sizes[pick(h >> 3, p.sizes.length)];
    return {
      id: `${p.id}-r${i}`,
      rating: pick(h, 10) < fours ? 4 : 5,
      size,
      option: p.sizes.length > 1 ? `${p.colorKo} / ${size}` : p.colorKo,
      colorFeel: pick(h >> 6, 9) === 0 ? "어두워요" : pick(h >> 6, 9) === 1 ? "밝아요" : "화면과 같아요",
      text: REVIEW_TEXTS[(pick(h0, REVIEW_TEXTS.length) + i * 3) % REVIEW_TEXTS.length],
      user: `${USERS[pick(h >> 9, USERS.length)]}${"*".repeat(3 + pick(h >> 12, 3))}`,
      date: dateLabel(t),
      photo: pick(h >> 15, 5) < 2,
      store: pick(h >> 17, 5) === 0,
      staff: pick(h >> 18, 9) === 0,
      helpful: pick(h >> 19, 12),
    };
  });
}

export type Question = { id: string; status: "답변 완료" | "답변 대기"; secret: boolean; text: string; answer?: string; user: string; date: string };

const QUESTIONS = [
  { q: "수선은 매장에서 바로 맡길 수 있나요?", a: "가까운 SLOWN 매장에 구매 내역을 보여 주시면 바로 접수해 드립니다. 기장 수선은 보통 3~5일 걸립니다." },
  { q: "재입고 예정이 있을까요?", a: "다음 달 중순에 한 차례 더 입고될 예정입니다. 상품 페이지의 찜하기를 눌러 두시면 입고 알림을 받으실 수 있습니다." },
  { q: "두 사이즈 사이에서 고민 중인데 어느 쪽이 나을까요?", a: "평소 입으시는(신으시는) 사이즈 그대로 고르시면 됩니다. 사이즈 탭의 조견표도 함께 확인해 주세요." },
];

export function questionsFor(p: Product): Question[] {
  const h = hash(`${p.id}:qna`);
  const n = pick(h, 3);
  return Array.from({ length: n }, (_, i) => {
    const pending = i === n - 1 && pick(h >> 4, 2) === 0;
    const sample = QUESTIONS[(pick(h >> 6, 3) + i) % 3];
    return {
      id: `${p.id}-q${i}`,
      status: pending ? "답변 대기" : "답변 완료",
      secret: pick(h >> (i + 2), 2) === 0,
      text: sample.q,
      answer: pending ? undefined : sample.a,
      user: `${"김이박최정"[pick(h >> (i + 8), 5)]}*${"영민수진호"[pick(h >> (i + 11), 5)]}`,
      date: dateLabel(TODAY - (10 + i * 3) * DAY),
    };
  });
}
