// Values for the brand-shop mockup: SLOWN as a brand shop inside a mall, laid
// out like the reference mall's brand main page. The mall, its sister shops,
// the company details and every product, price and count are placeholders.
import { LISTS, models } from "./catalog";
import { PROMOTIONS } from "./promotions";
import type { Art } from "./types";

export const MALL = {
  name: "FOLIO",
  suffix: "SHOP",
  // Wordmarks of the sister select shops in the black top bar.
  sisterShops: [
    { label: "atelier·nine", style: "thin" },
    { label: "LUMEN", style: "wide" },
    { label: "PARALLEL*", style: "bold" },
  ],
  myPage: "마이페이지",
  login: "로그인",
  demoNotice: "데모 화면 · 샘플 콘텐츠",
  // Mall-wide menu of the mall header. Only SLOWN exists in this mockup, so
  // the shelves it carries point at its lists and the rest are placeholders.
  categories: [
    { label: "여성", href: "/list/women/" },
    { label: "남성", href: "/list/men/" },
    { label: "키즈", href: "#mall-kids" },
    { label: "럭셔리", href: "#mall-luxury" },
    { label: "백＆슈즈", href: "/list/shoes-acc/" },
    { label: "스포츠", href: "#mall-sports" },
    { label: "골프", href: "#mall-golf" },
    { label: "뷰티", href: "#mall-beauty" },
    { label: "라이프", href: "#mall-life" },
    { label: "아울렛", href: "/list/outlet/" },
  ],
  specials: [
    { label: "랭킹", href: "/ranking/" },
    { label: "브랜드", href: "/" },
    { label: "매거진", href: "#mall-magazine" },
    { label: "기획전", href: "/promotions/" },
    { label: "이벤트", href: "#mall-events" },
  ],
} as const;

type MenuLink = { label: string; href: string };

const listMenu = (key: "men" | "women" | "shoes-acc" | "outlet"): MenuLink[] => [
  ...(key === "men" || key === "women" ? [{ label: "신상품", href: `/list/new/${key}/` }] : []),
  { label: "전체 상품", href: `/list/${key}/` },
  ...LISTS[key].subs.map((s) => ({ label: s.label, href: `/list/${key}/${s.slug}/` })),
];

export const BRAND = {
  name: "SLOWN",
  likes: "9999+",
  searchPlaceholder: "SLOWN 안에서 검색",
  // Hovering one opens its dropdown; a column holds ten links.
  categories: (["men", "women", "shoes-acc", "outlet"] as const).map((key) => ({
    label: LISTS[key].label,
    href: `/list/${key}/`,
    items: listMenu(key),
  })),
  newIn: { label: "신상품", href: "/list/new/" },
  promotions: {
    label: "기획전",
    href: "/promotions/",
    more: "기획전 더보기",
    items: PROMOTIONS.map((p) => ({ label: `[SLOWN] ${p.title}`, href: `/promotions/${p.id}/` })),
  },
} as const;

// ── Key visual ─────────────────────────────────────────────────────────
export type KeyVisual = {
  /** Promotion id the slide opens. */
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
  { title: "New Arrivals", desc: "신상품을 가장 먼저 만나보세요.", href: "/list/new/", kind: "coat", color: "#a8835a", tone: 1 },
  { title: "Signature Suits", desc: "변함없이 사랑받는\n시그니처 수트를 소개합니다.", href: "/list/men/suits/", kind: "suit", color: "#3a3b3e", tone: 0 },
  { title: "Shoes Collection", desc: "발끝까지 완벽한 스타일을 완성하세요.", href: "/list/shoes-acc/mens-shoes/", kind: "shoes", color: "#151515", tone: 2 },
  { title: "Outlet", desc: "최대 60% 혜택으로 만나보세요.", href: "/list/outlet/", kind: "knit", color: "#5b4130", variant: "vest", tone: 3 },
] satisfies (Art & { title: string; desc: string; href: string })[];

// ── Corners (sections) ─────────────────────────────────────────────────
export const CORNERS = [
  {
    id: "finishing-touches",
    title: "Finishing Touches",
    products: models(["tie", "cufflinks", "square", "bowtie", "belt", "cardHolder", "halfMoon", "docCase"]),
  },
  {
    id: "signature-suits",
    title: "Explore Signature Suits",
    products: models(["sbSuit", "dbSuit", "tuxedo", "blazer", "linenJacket", "wBlazer", "woolTrousers", "wideTrousers"]),
  },
];

// The first tab shown is chosen at random on load, as on the reference.
export const NEW_IN = {
  title: "New In",
  tabs: [
    { label: "남성", products: models(["camelCoat", "balmacaan", "oxfordShirt", "merino", "cableVest", "wingShirt", "loafers", "oxfords", "poplinShirt", "dbSuit"]) },
    { label: "여성", products: models(["wrapCoat", "wBlazer", "blouse", "skirt", "cardigan", "slipDress", "wideTrousers", "pump", "miniMoon", "wSuit"]) },
    { label: "슈즈＆잡화", products: models(["oxfords", "loafers", "pump", "halfMoon", "miniMoon", "docCase", "belt", "cardHolder", "tie", "cufflinks"]) },
  ],
};

export const BESTSELLERS = {
  title: "Bestsellers",
  more: "랭킹 바로가기",
  moreHref: "/ranking/",
  tabs: [
    { label: "남성", products: models(["sbSuit", "poplinShirt", "tie", "dbSuit", "oxfords", "woolTrousers", "blazer", "cufflinks"]) },
    { label: "여성", products: models(["wBlazer", "wideTrousers", "blouse", "pump", "wrapCoat", "slipDress", "skirt", "miniMoon"]) },
    { label: "슈즈＆잡화", products: models(["halfMoon", "oxfords", "cardHolder", "loafers", "belt", "pump", "docCase", "miniMoon"]) },
  ],
};

// ── Footer ─────────────────────────────────────────────────────────────
export const SHOP_FOOTER = {
  navGroups: [
    [
      { label: "회사소개", href: "#company" },
      { label: "이용약관", href: "/policy/terms/" },
      { label: "개인정보처리방침", href: "/policy/privacy/", strong: true },
      { label: "이메일무단수집거부", href: "#no-email", dialog: true },
    ],
    [
      { label: "멤버십안내", href: "/membership/" },
      { label: "고객센터", href: "/help/" },
      { label: "매장찾기", href: "/stores/" },
      { label: "공지사항", href: "/help/notice/" },
      { label: "단체주문", href: "/help/bulk-order/" },
    ],
  ],
  quick: [
    { label: "입점신청", href: "/help/vendor/" },
    { label: "제휴문의", href: "/help/partnership/" },
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
  noEmail: {
    title: "이메일 무단수집 거부",
    body: "본 사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반하면 관련 법에 따라 처벌될 수 있습니다.",
    date: "게시일 : 2026. 1. 1",
  },
} as const;

export const WIDGET = {
  recent: "최근 본 상품",
  empty: "최근 본 상품이 없습니다.",
  clear: "전체삭제",
  talk: "상담하기",
  talkHref: "/help/",
  top: "최상단으로 이동",
} as const;

// ── Promotion and ranking pages ───────────────────────────────────────
export const PROMOTION_PAGE = {
  brandLink: "브랜드관에서 더 많은 상품을 만나 보세요",
  welcome: { title: "신규 회원 웰컴 혜택", text: "15% 쿠폰 + 무료배송 쿠폰", href: "/membership/" },
};

export const RANKING = {
  kinds: [
    { value: "sale", label: "실시간 판매랭킹" },
    { value: "click", label: "실시간 클릭랭킹" },
  ],
  updated: "12분 전 업데이트",
  tip: {
    title: "랭킹 기준",
    lines: ["최근 24시간 동안의 판매(클릭) 수로 정합니다.", "한 시간마다 새로 집계합니다.", "품절된 상품은 순위에서 뺍니다."],
  },
  /** Shelf tabs in the reference's order. */
  shelves: ["women", "men", "shoes-acc"] as const,
};
