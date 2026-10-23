// Values for the brand-shop mockup: SLOWN as a brand shop inside a mall, laid
// out like the reference mall's brand main page. The mall, its sister shops,
// the company details and every product, price and count are placeholders.

export type ArtKind =
  | "suit"
  | "jacket"
  | "coat"
  | "shirt"
  | "knit"
  | "trousers"
  | "skirt"
  | "dress"
  | "tie"
  | "bowtie"
  | "square"
  | "cufflinks"
  | "shoes"
  | "pump"
  | "bag"
  | "case"
  | "belt"
  | "wallet";

/** Drawing variants; each kind reads only the ones that apply to it. */
export type ArtVariant = "tux" | "db" | "wide" | "bow" | "vest" | "cardigan" | "belted" | "loafer";

export type Art = {
  kind: ArtKind;
  /** Main colour of the item. */
  color: string;
  variant?: ArtVariant;
  /** Studio backdrop: 0 neutral, 1 warm, 2 cool, 3 ivory. */
  tone?: number;
};

export type Product = Art & {
  id: string;
  name: string;
  price: number;
  rating?: number;
  reviews?: number;
  likes: number;
  tag?: "재입고" | "단독";
};

export const MALL = {
  name: "FOLIO",
  suffix: "SHOP",
  // Wordmarks of the sister select shops in the black top bar.
  sisterShops: [
    { label: "atelier·nine", style: "thin" },
    { label: "LUMEN", style: "wide" },
    { label: "PARALLEL*", style: "bold" },
  ],
  cartCount: 0,
  myPage: "마이페이지",
  login: "로그인",
  demoNotice: "데모 화면 · 샘플 콘텐츠",
} as const;

type MenuLink = { label: string; href: string };

const slug = (s: string) => `#category-${encodeURIComponent(s)}`;
const links = (labels: string[]): MenuLink[] => labels.map((label) => ({ label, href: slug(label) }));

export const BRAND = {
  name: "SLOWN",
  likes: "9999+",
  searchPlaceholder: "SLOWN 안에서 검색",
  // Hovering one opens its dropdown; a column holds ten links.
  categories: [
    {
      label: "남성",
      href: slug("남성"),
      items: links(["신상품", "전체 상품", "수트", "재킷/블레이저", "셔츠", "니트", "팬츠", "코트", "타이/포켓치프", "커프링크스"]),
    },
    {
      label: "여성",
      href: slug("여성"),
      items: links(["신상품", "전체 상품", "수트", "재킷", "블라우스", "니트", "스커트", "팬츠", "코트", "원피스", "액세서리"]),
    },
    {
      label: "슈즈＆잡화",
      href: slug("슈즈잡화"),
      items: links(["전체 상품", "남성 슈즈", "여성 슈즈", "가방", "벨트", "지갑/카드케이스"]),
    },
    {
      label: "아울렛",
      href: slug("아울렛"),
      items: links(["전체 상품", "남성", "여성", "슈즈＆잡화"]),
    },
  ],
  newIn: { label: "신상품", href: slug("신상품") },
  promotions: {
    label: "기획전",
    href: "#promotions",
    more: "기획전 더보기",
    items: [
      "[SLOWN] 26 F/W TAILORING",
      "[SLOWN] WEDDING EDIT",
      "[SLOWN] ONLINE EXCLUSIVE",
      "[SLOWN] SHIRTS NEW IN",
      "[SLOWN] LEATHER GOODS",
      "[SLOWN] 26 S/S SEASON OFF",
      "[SLOWN] CEREMONY SHOES",
      "[SLOWN] OUTLET NEW IN",
      "[SLOWN] KNIT COLLECTION",
      "[SLOWN] 26 S/S COLLECTION",
    ].map((label, i) => ({ label, href: `#promotion-${i + 1}` })),
  },
} as const;

// ── Key visual ─────────────────────────────────────────────────────────
export type KeyVisual = {
  id: string;
  title: string;
  desc: string;
  /** Two-stop backdrop plus where the soft spotlight sits. */
  backdrop: readonly [string, string];
  light: string;
  /** Items standing in the frame, positioned in % of the slide. */
  props: readonly (Art & { left: number; height: number })[];
};

export const KEY_VISUALS: KeyVisual[] = [
  {
    id: "fw-tailoring",
    title: "26 F/W\nTAILORING",
    desc: "천천히 지은 실루엣\n손끝에 남는 결",
    backdrop: ["#3b3733", "#191716"],
    light: "68% 30%",
    props: [
      { kind: "coat", color: "#a8835a", left: 62, height: 92 },
      { kind: "suit", color: "#3a3b3e", left: 16, height: 80 },
    ],
  },
  {
    id: "wedding-edit",
    title: "WEDDING EDIT",
    desc: "가장 오래 기억될 하루의 옷",
    backdrop: ["#5a5249", "#2c2722"],
    light: "30% 25%",
    props: [
      { kind: "suit", color: "#161616", variant: "tux", left: 64, height: 88 },
      { kind: "bowtie", color: "#141414", left: 18, height: 30 },
    ],
  },
  {
    id: "exclusive",
    title: "EXCLUSIVE",
    desc: "온라인 단독\n카멜 더블 코트",
    backdrop: ["#4b382a", "#211812"],
    light: "72% 35%",
    props: [{ kind: "coat", color: "#b48c5f", variant: "belted", left: 60, height: 94 }],
  },
  {
    id: "ss-season-off",
    title: "26 S/S\nSEASON OFF",
    desc: "30% OFF",
    backdrop: ["#202a42", "#0d111c"],
    light: "26% 40%",
    props: [
      { kind: "jacket", color: "#d9cfbd", left: 14, height: 74 },
      { kind: "trousers", color: "#7a7a7c", left: 66, height: 82 },
    ],
  },
  {
    id: "shirts-new-in",
    title: "SHIRTS\nNEW IN",
    desc: "새로운 시즌의 컬러로 만나는 셔츠",
    backdrop: ["#4c5661", "#232a31"],
    light: "70% 28%",
    props: [
      { kind: "shirt", color: "#c8d4e3", left: 64, height: 86 },
      { kind: "tie", color: "#1f2a44", left: 20, height: 62 },
    ],
  },
  {
    id: "leather-goods",
    title: "LEATHER GOODS\nNEW IN",
    desc: "어디에나 어울리는 가죽 소품",
    backdrop: ["#56534e", "#262523"],
    light: "64% 45%",
    props: [
      { kind: "bag", color: "#a0703f", left: 64, height: 108 },
      { kind: "belt", color: "#3e2a1e", left: 18, height: 40 },
    ],
  },
];

// ── Category banners under the key visual ──────────────────────────────
export const PICKS = [
  { title: "New Arrivals", desc: "신상품을 가장 먼저 만나보세요.", href: "#category-new", kind: "coat", color: "#a8835a", tone: 1 },
  { title: "Signature Suits", desc: "변함없이 사랑받는\n시그니처 수트를 소개합니다.", href: "#category-suits", kind: "suit", color: "#3a3b3e", tone: 0 },
  { title: "Shoes Collection", desc: "발끝까지 완벽한 스타일을 완성하세요.", href: "#category-shoes", kind: "shoes", color: "#151515", tone: 2 },
  { title: "Outlet", desc: "최대 60% 혜택으로 만나보세요.", href: "#category-outlet", kind: "knit", color: "#5b4130", variant: "vest", tone: 3 },
] satisfies (Art & { title: string; desc: string; href: string })[];

// ── Product catalog ────────────────────────────────────────────────────
const CATALOG = {
  sbSuit: { name: "(MEN) Single Breasted Wool Suit - Charcoal", price: 1290000, rating: 4.5, reviews: 56, likes: 628, kind: "suit", color: "#3a3b3e" },
  dbSuit: { name: "(MEN) Double Breasted Suit - Navy", price: 1390000, rating: 5.0, reviews: 12, likes: 341, kind: "suit", variant: "db", color: "#232b3b", tone: 2 },
  tuxedo: { name: "(MEN) Peak Lapel Tuxedo - Black", price: 1590000, rating: 4.5, reviews: 31, likes: 512, kind: "suit", variant: "tux", color: "#161616", tag: "단독" },
  blazer: { name: "(MEN) Soft Shoulder Blazer - Camel", price: 790000, rating: 4.5, reviews: 8, likes: 160, kind: "jacket", color: "#a57f55", tone: 1 },
  linenJacket: { name: "(MEN) Linen Blend Jacket - Ecru", price: 690000, likes: 46, kind: "jacket", color: "#d9cfbd", tone: 2 },
  camelCoat: { name: "(MEN) Wool Cashmere Coat - Camel", price: 1190000, rating: 4.0, reviews: 9, likes: 325, kind: "coat", color: "#b08a5e", tone: 1 },
  balmacaan: { name: "(MEN) Balmacaan Coat - Charcoal", price: 1090000, likes: 29, kind: "coat", color: "#444446" },
  poplinShirt: { name: "(MEN) Poplin Dress Shirt - White", price: 159000, rating: 4.5, reviews: 134, likes: 444, kind: "shirt", color: "#f4f2ee", tone: 2 },
  oxfordShirt: { name: "(MEN) Oxford Shirt - Pale Blue", price: 149000, rating: 5.0, reviews: 4, likes: 87, kind: "shirt", color: "#c8d4e3" },
  wingShirt: { name: "(MEN) Wing Collar Shirt - Ivory", price: 189000, likes: 23, kind: "shirt", color: "#ece6d8", tone: 2 },
  woolTrousers: { name: "(MEN) Pleated Wool Trousers - Gray", price: 329000, rating: 4.5, reviews: 14, likes: 151, kind: "trousers", color: "#7a7a7c", tone: 1 },
  merino: { name: "(MEN) Merino Crewneck - Oatmeal", price: 259000, likes: 34, kind: "knit", color: "#cbbfa9", tone: 2 },
  cableVest: { name: "(MEN) Cable Knit Vest - Brown", price: 229000, rating: 5.0, reviews: 2, likes: 18, kind: "knit", variant: "vest", color: "#5b4130", tone: 3 },
  tie: { name: "(UNISEX) Silk Grenadine Tie - Navy", price: 129000, rating: 4.5, reviews: 26, likes: 267, kind: "tie", color: "#1f2a44" },
  bowtie: { name: "(UNISEX) Silk Bow Tie - Black", price: 99000, rating: 5.0, reviews: 7, likes: 137, kind: "bowtie", color: "#161616", tone: 1 },
  square: { name: "(UNISEX) Hand Rolled Pocket Square - White", price: 59000, likes: 57, kind: "square", color: "#f4f2ec", tone: 2 },
  cufflinks: { name: "(UNISEX) Mother of Pearl Cufflinks - Silver", price: 189000, rating: 4.0, reviews: 9, likes: 133, kind: "cufflinks", color: "#e9e4da", tone: 0, tag: "재입고" },
  oxfords: { name: "(MEN) Plain Toe Oxford - Black", price: 590000, rating: 4.5, reviews: 48, likes: 681, kind: "shoes", color: "#151515", tone: 2 },
  loafers: { name: "(MEN) Suede Penny Loafer - Chocolate", price: 520000, rating: 4.5, reviews: 15, likes: 255, kind: "shoes", variant: "loafer", color: "#4a3426", tone: 1 },
  pump: { name: "(WOMEN) Pointed Pump 70 - Black", price: 490000, rating: 5.0, reviews: 7, likes: 214, kind: "pump", color: "#151515", tone: 3 },
  halfMoon: { name: "(UNISEX) Half Moon Bag - Tan", price: 890000, rating: 4.5, reviews: 93, likes: 972, kind: "bag", color: "#a0703f", tone: 0 },
  miniMoon: { name: "(WOMEN) Mini Half Moon Bag - Black", price: 690000, rating: 4.5, reviews: 42, likes: 483, kind: "bag", color: "#161616", tone: 1, tag: "단독" },
  docCase: { name: "(UNISEX) Document Case - Black", price: 690000, likes: 60, kind: "case", color: "#1b1b1b", tone: 2 },
  belt: { name: "(UNISEX) Leather Belt 30 - Dark Brown", price: 189000, rating: 4.5, reviews: 5, likes: 295, kind: "belt", color: "#3e2a1e", tone: 1 },
  cardHolder: { name: "(UNISEX) Card Holder - Black", price: 159000, rating: 5.0, reviews: 1, likes: 133, kind: "wallet", color: "#1b1b1b", tone: 0 },
  wBlazer: { name: "(WOMEN) Tailored Wool Blazer - Black", price: 790000, rating: 4.5, reviews: 21, likes: 394, kind: "jacket", color: "#1a1a1a", tone: 1, tag: "재입고" },
  wideTrousers: { name: "(WOMEN) Wide Leg Trousers - Ivory", price: 359000, rating: 4.0, reviews: 6, likes: 108, kind: "trousers", variant: "wide", color: "#e7e1d3", tone: 2 },
  blouse: { name: "(WOMEN) Silk Bow Blouse - Champagne", price: 329000, likes: 49, kind: "shirt", variant: "bow", color: "#e8d9bf", tone: 2 },
  wrapCoat: { name: "(WOMEN) Wrap Coat - Oatmeal", price: 1190000, rating: 4.5, reviews: 15, likes: 450, kind: "coat", variant: "belted", color: "#cdbfa6", tone: 2 },
  skirt: { name: "(WOMEN) Pleated Midi Skirt - Navy", price: 389000, likes: 16, kind: "skirt", color: "#263048", tone: 1 },
  cardigan: { name: "(WOMEN) Fine Knit Cardigan - Mocha", price: 289000, rating: 5.0, reviews: 3, likes: 14, kind: "knit", variant: "cardigan", color: "#7d6450", tone: 3 },
  slipDress: { name: "(WOMEN) Satin Slip Dress - Ivory", price: 459000, likes: 3, kind: "dress", color: "#ece3d1", tone: 2 },
} satisfies Record<string, Omit<Product, "id">>;

type Key = keyof typeof CATALOG;

const pick = (keys: Key[]): Product[] =>
  keys.map((key) => ({ id: key, ...CATALOG[key] }) as Product);

export const ALL_PRODUCTS: Product[] = pick(Object.keys(CATALOG) as Key[]);

// ── Corners (sections) ─────────────────────────────────────────────────
export const CORNERS = [
  {
    id: "finishing-touches",
    title: "Finishing Touches",
    products: pick(["tie", "cufflinks", "square", "bowtie", "belt", "cardHolder", "halfMoon", "docCase"]),
  },
  {
    id: "signature-suits",
    title: "Explore Signature Suits",
    products: pick(["sbSuit", "dbSuit", "tuxedo", "blazer", "linenJacket", "wBlazer", "woolTrousers", "wideTrousers"]),
  },
];

// The first tab shown is chosen at random on load, as on the reference.
export const NEW_IN = {
  title: "New In",
  tabs: [
    { label: "남성", products: pick(["camelCoat", "balmacaan", "oxfordShirt", "merino", "cableVest", "wingShirt", "loafers", "oxfords", "poplinShirt", "dbSuit"]) },
    { label: "여성", products: pick(["wrapCoat", "wBlazer", "blouse", "skirt", "cardigan", "slipDress", "wideTrousers", "pump", "miniMoon", "cardHolder"]) },
    { label: "슈즈＆잡화", products: pick(["oxfords", "loafers", "pump", "halfMoon", "miniMoon", "docCase", "belt", "cardHolder", "tie", "cufflinks"]) },
  ],
};

export const BESTSELLERS = {
  title: "Bestsellers",
  more: "랭킹 바로가기",
  moreHref: "#ranking",
  tabs: [
    { label: "남성", products: pick(["sbSuit", "poplinShirt", "tie", "dbSuit", "oxfords", "woolTrousers", "blazer", "cufflinks"]) },
    { label: "여성", products: pick(["wBlazer", "wideTrousers", "blouse", "pump", "wrapCoat", "slipDress", "skirt", "miniMoon"]) },
    { label: "슈즈＆잡화", products: pick(["halfMoon", "oxfords", "cardHolder", "loafers", "belt", "pump", "docCase", "miniMoon"]) },
  ],
};

// ── Footer ─────────────────────────────────────────────────────────────
export const SHOP_FOOTER = {
  navGroups: [
    [
      { label: "회사소개", href: "#company" },
      { label: "이용약관", href: "#terms" },
      { label: "개인정보처리방침", href: "#privacy", strong: true },
      { label: "이메일무단수집거부", href: "#no-email" },
    ],
    [
      { label: "멤버십안내", href: "#membership" },
      { label: "고객센터", href: "#help" },
      { label: "매장찾기", href: "#stores" },
      { label: "공지사항", href: "#notice" },
      { label: "단체주문", href: "#bulk" },
    ],
  ],
  quick: [
    { label: "입점신청", href: "#vendor" },
    { label: "제휴문의", href: "#partnership" },
  ],
  company: "(주)폴리오커머스",
  info: [
    "주소: 서울특별시 성동구 샘플로 00, 0층",
    "대표 : 김샘플",
    "사업자 등록번호: 000-00-00000",
    "통신판매업 신고번호: 제 0000-서울성동-0000",
    "호스팅서비스: (주)폴리오커머스",
  ],
  escrow: "고객님의 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 구매안전(에스크로) 서비스를 이용하실 수 있습니다.",
  escrowLink: "서비스 가입사실 확인",
  contact: "대표전화 0000-0000 | 이메일: help@folio.example",
  copyright: "Copyright (C) 2026 FOLIO Commerce. All rights reserved",
  cert: "인증범위 : 온라인 쇼핑몰 서비스 운영 (샘플) | 유효기간 : 2026.01.01 ~ 2028.12.31",
  sns: [
    { label: "YouTube", href: "#youtube" },
    { label: "Instagram", href: "#instagram" },
  ],
} as const;

export const WIDGET = {
  recent: "최근 본 상품",
  empty: "최근 본 상품이 없습니다.",
  clear: "전체삭제",
  talk: "상담하기",
  talkHref: "#talk",
  top: "최상단으로 이동",
} as const;
