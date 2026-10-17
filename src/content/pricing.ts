// Mock price list. Values are placeholders; structure mirrors the reference
// pricing page (tabs → groups → cards/rows, all selectable for the total bar).
//
// `desc` supports **bold** segments for the emphasised fabric/brand names.

export type Badge = "인기" | "추천";

export type PriceItem = {
  id: string;
  title: string;
  /** Shown after the title in a lighter weight, e.g. " 패키지". */
  titleSuffix?: string;
  badge?: Badge;
  /** Small grey pill above card titles, e.g. "대여+". */
  tag?: string;
  desc?: string;
  listLabel?: string;
  listPrice?: number;
  saleLabel?: string;
  price: number;
  /** "원~" style pricing for ranges. */
  fromTilde?: boolean;
  /** "N원 부터" style pricing for fabric grades. */
  fromWord?: boolean;
  /** Fabric grade colour dot. */
  dot?: string;
  featured?: boolean;
  /** Plain rows (items/options) show a single price. */
  plain?: boolean;
  /** Shown instead of a price; such rows are not selectable. */
  priceText?: string;
};

export type PriceGroup = {
  kicker?: string;
  label: string;
  hint?: string;
  chip?: string;
  layout: "cards" | "rows";
  items: PriceItem[];
  event?: { label: string; items: string[]; until: string };
};

export const BRAND_PRICE = "슬로운가";

const groups = (g: PriceGroup[]) => g;
const items = (i: PriceItem[]) => i;

export const PRICING_HERO = {
  kicker: "SLOWN PRICING",
  title: ["가격은", "처음부터 공개합니다."],
  lead: "투명한 정찰제. 표시된 금액 외에 추가 비용은 없습니다.",
  fromLabel: "맞춤 예복",
  fromPrice: "₩349,000",
  fromSuffix: "부터",
  jumpLabel: "바로 보기",
} as const;

export const WHY = {
  kicker: "WHY",
  title: "왜 합리적일까요.",
  lead: "보통의 맞춤 예복은 한 달 이상, 수백만 원. 우리는 데이터로 그 시간과 비용을 줄였습니다.",
  conclusion: "그래서, 가격에 거품이 없습니다.",
} as const;

export const TABS = [
  { key: "packages", label: "패키지" },
  { key: "rental", label: "대여" },
  { key: "suits", label: "수트 단품" },
  { key: "items", label: "맞춤 아이템" },
  { key: "options", label: "디자인 옵션" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

// ── 패키지 ─────────────────────────────────────────────────────────────
export const PACKAGES_TAB = {
  title: "상황에 맞게, 합리적으로.",
  note: {
    title: "함께 맞추면, 더 가볍습니다.",
    body: "예복·촬영·혼주까지. 필요한 구성을 묶으면 따로 맞출 때보다 합리적입니다. 단품 가격과 비교해 보세요.",
  },
  groups: groups([
    {
      kicker: "NEW",
      label: "대여 패키지",
      layout: "cards",
      items: [
        {
          id: "pkg-rental-all",
          tag: "대여+",
          title: "촬영 대여 올인원",
          desc: "대여 정장 3벌(프리미엄+스탠다드 원단) + 대여 베스트 1벌 + 액세서리 대여(**타이·보타이** 등) + 구두 대여 + 맞춤 셔츠 1매(이벤트 증정) + 맞춤 대여 변경 무료(한정 이벤트)",
          listLabel: BRAND_PRICE,
          listPrice: 720000,
          saleLabel: "이벤트가",
          price: 620000,
        },
        {
          id: "pkg-rental-domestic",
          tag: "국내+",
          title: "본식+촬영 · 국내 패키지",
          desc: "맞춤 정장 1벌(국내 울 혼방 원단) + 대여 정장 2벌(프리미엄+스탠다드 원단) + 액세서리 대여 + 구두 대여 + 턱시도 리폼 + 맞춤 셔츠 1매(이벤트 증정)",
          listLabel: BRAND_PRICE,
          listPrice: 920000,
          saleLabel: "이벤트가",
          price: 790000,
        },
        {
          id: "pkg-rental-import",
          tag: "수입+",
          badge: "인기",
          featured: true,
          title: "본식+촬영 · 수입 풀 패키지",
          desc: "맞춤 정장 1벌(**영국 원단** 등) + 대여 정장 2벌(프리미엄+스탠다드 원단) + 대여 베스트 1벌 + 액세서리 대여 + 구두 대여 + 턱시도 리폼 + 맞춤 셔츠 1매(이벤트 증정)",
          listLabel: BRAND_PRICE,
          listPrice: 1240000,
          saleLabel: "이벤트가",
          price: 1120000,
        },
      ],
      event: {
        label: "한정 이벤트",
        items: ["맞춤 셔츠 1매 증정", "맞춤 대여 변경 무료 (한정 이벤트)"],
        until: "2027년 2월 28일까지",
      },
    },
    {
      label: "추천 예복 패키지",
      layout: "rows",
      items: [
        {
          id: "pkg-wedding-3pc",
          title: "본식을 위한 수입 3피스 맞춤",
          titleSuffix: " 패키지",
          badge: "인기",
          desc: "맞춤 정장(영국 원단) + 베스트(동일 원단) + 맞춤 셔츠 + 타이·보타이 + 무제한 수선 보장",
          listLabel: "시중가",
          listPrice: 1420000,
          saleLabel: BRAND_PRICE,
          price: 1040000,
        },
        {
          id: "pkg-wedding-3set",
          title: "촬영·본식·일상까지 3벌 맞춤",
          titleSuffix: " 패키지",
          badge: "추천",
          desc: "맞춤 정장(수입 원단) 1벌 + 맞춤 정장(국내 원단) 2벌 + 맞춤 셔츠 2매 + 타이·보타이 + 무제한 수선 보장",
          listLabel: "시중가",
          listPrice: 1860000,
          saleLabel: BRAND_PRICE,
          price: 1450000,
        },
        {
          id: "pkg-wedding-shoes",
          title: "예복용 수제화",
          desc: "예복 패키지와 함께 구매 시",
          listLabel: "시중가",
          listPrice: 290000,
          saleLabel: BRAND_PRICE,
          price: 210000,
        },
      ],
    },
    {
      label: "혼주 · 아버지",
      chip: "양가 아버님이 함께 맞추시면 5%, 신랑 예복까지 더하시면 10% 할인해 드립니다.",
      layout: "rows",
      items: [
        {
          id: "pkg-father-domestic",
          title: "국내 패키지",
          desc: "맞춤 정장(국내 울 혼방 원단) + 맞춤 셔츠 + 타이 + 무제한 수선 보장",
          listLabel: "시중가",
          listPrice: 740000,
          saleLabel: BRAND_PRICE,
          price: 520000,
        },
        {
          id: "pkg-father-import",
          title: "수입 패키지",
          desc: "맞춤 정장(**영국·이탈리아** 원단 등) + 맞춤 셔츠 + 타이 + 무제한 수선 보장",
          listLabel: "시중가",
          listPrice: 960000,
          saleLabel: BRAND_PRICE,
          price: 670000,
        },
        {
          id: "pkg-father-shoes",
          title: "혼주용 수제화",
          badge: "추천",
          desc: "그날의 아버님을 위한 옥스퍼드 맞춤 구두",
          listLabel: "시중가",
          listPrice: 290000,
          saleLabel: BRAND_PRICE,
          price: 190000,
        },
      ],
    },
    {
      label: "혼주 · 어머니",
      chip: "양가 어머님이 함께 맞추시면 10%, 신랑 예복이나 아버님까지 더하시면 15% 할인해 드립니다.",
      layout: "rows",
      items: [
        {
          id: "pkg-mother-suit",
          title: "양장",
          desc: "맞춤 양장(재킷+스커트 또는 원피스) · 울 100%",
          listLabel: "시중가",
          listPrice: 850000,
          saleLabel: BRAND_PRICE,
          price: 720000,
          fromTilde: true,
        },
        {
          id: "pkg-mother-tweed",
          title: "트위드",
          desc: "맞춤 트위드 재킷+스커트 세트 · 국내/수입",
          listLabel: "시중가",
          listPrice: 850000,
          saleLabel: BRAND_PRICE,
          price: 720000,
          fromTilde: true,
        },
      ],
    },
  ]),
};

// ── 대여 ───────────────────────────────────────────────────────────────
export const RENTAL_TAB = {
  note: {
    title: "빌려도, 맞춘 것처럼.",
    body: "새 옷을, 내 몸에 맞춰 빌려 드립니다.",
    sub: "프리미엄·스탠다드는 대여 전용 등급 기준입니다.",
  },
  crossLink: { before: "대여 패키지는 ", link: "패키지 탭", after: "에서 확인하실 수 있습니다." },
  groups: groups([
    {
      label: "단일 대여",
      layout: "rows",
      items: [
        {
          id: "rent-single",
          title: "1벌 대여(프리미엄) 풀 패키지",
          desc: "대여 1벌(프리미엄) + 대여 베스트 1벌 + 타이·보타이 등 액세서리(대여) + 구두(대여) + 맞춤 셔츠 1매(이벤트 증정)",
          listLabel: BRAND_PRICE,
          listPrice: 520000,
          saleLabel: "이벤트가",
          price: 420000,
        },
      ],
    },
    {
      label: "추가 대여",
      hint: "패키지 이용 시 선택 가능",
      layout: "rows",
      items: [
        { id: "rent-suit-std", title: "대여 정장 1벌 (스탠다드)", listLabel: BRAND_PRICE, listPrice: 160000, saleLabel: "이벤트가", price: 110000 },
        { id: "rent-suit-pre", title: "대여 정장 1벌 (프리미엄)", listLabel: BRAND_PRICE, listPrice: 260000, saleLabel: "이벤트가", price: 160000 },
        { id: "rent-vest-std", title: "베스트 1벌 (스탠다드)", listLabel: BRAND_PRICE, listPrice: 65000, saleLabel: "이벤트가", price: 55000 },
        { id: "rent-vest-pre", title: "베스트 1벌 (프리미엄)", listLabel: BRAND_PRICE, listPrice: 85000, saleLabel: "이벤트가", price: 65000 },
        { id: "rent-shoes", title: "구두", listLabel: BRAND_PRICE, listPrice: 75000, saleLabel: "이벤트가", price: 55000 },
        { id: "rent-acc", title: "액세서리 박스", desc: "넥타이·보타이 등", listLabel: BRAND_PRICE, listPrice: 55000, saleLabel: "이벤트가", price: 40000 },
      ],
    },
    {
      label: "맞춤 대여",
      hint: "패키지 이용 시 선택 가능",
      layout: "rows",
      items: [
        { id: "rent-custom-std", title: "스탠다드 원단 맞춤 대여 변경", listLabel: BRAND_PRICE, listPrice: 160000, saleLabel: "이벤트가", price: 110000 },
        { id: "rent-custom-pre", title: "프리미엄 원단 맞춤 대여 변경", listLabel: BRAND_PRICE, listPrice: 260000, saleLabel: "이벤트가", price: 160000 },
      ],
    },
  ]),
  notice: {
    title: "대여 안내",
    items: [
      ["기본 대여 기간은 ", "2박 3일", "입니다."],
      ["반납이 늦어지면 ", "1일당 150,000원", "이 부과됩니다."],
      ["맞춤 대여는 체형·색상을 맞춰 제작한 뒤 대여됩니다."],
      ["반납은 매장 방문으로만 가능합니다."],
      ["세탁은 매장에서 진행하니, 입으신 그대로 반납해 주세요."],
      ["가벼운 오염은 비용이 없지만, 복구가 어려운 손상은 수선비가 청구될 수 있습니다."],
      ["분실 시 대여 상품의 제작 원가가 청구됩니다."],
      ["보증금은 받지 않습니다."],
    ] as string[][],
  },
};

// ── 수트 단품 ──────────────────────────────────────────────────────────
export const SUITS_TAB = {
  title: "한 벌씩, 직접 고른다면.",
  note: {
    title: "원단이 다릅니다.",
    body: "영국·이탈리아 명가의 원단부터 데일리 혼방까지 — 매장에서 직접 보고, 디렉터와 함께 고릅니다.",
  },
  subLabel: "원단 등급 — 재킷+바지 기준",
  lines: [
    {
      chip: "베이직 라인",
      chipStyle: "light" as const,
      desc: "합리적인 예복",
      items: items([
        { id: "suit-bronze", dot: "rgb(160, 112, 60)", title: "브론즈", desc: "예복·촬영용 국내 원단 (할인·쿠폰 적용 제외)", listLabel: "시중가", listPrice: 420000, fromWord: true, saleLabel: BRAND_PRICE, price: 349000 },
        { id: "suit-silver", dot: "rgb(150, 150, 155)", title: "실버", desc: "매일 편한 혼방, 데일리·혼주용 국내 울 혼방 원단", listLabel: "시중가", listPrice: 640000, fromWord: true, saleLabel: BRAND_PRICE, price: 490000 },
        { id: "suit-gold", dot: "rgb(196, 160, 72)", title: "골드", desc: "부담 없이 좋은, 데일리부터 예복까지 수입 원단 · **영국·이탈리아 원단** 등", listLabel: "시중가", listPrice: 840000, fromWord: true, saleLabel: BRAND_PRICE, price: 660000 },
      ]),
    },
    {
      chip: "시그니처 라인",
      chipStyle: "coffee" as const,
      desc: "주목받는 예복",
      items: items([
        { id: "suit-platinum", dot: "rgb(120, 130, 140)", title: "플래티넘", desc: "본식용으로 가장 많이 고르는 수입 원단 · **영국 원단** 등", listLabel: "시중가", listPrice: 1050000, fromWord: true, saleLabel: BRAND_PRICE, price: 810000 },
        { id: "suit-diamond", dot: "rgb(110, 160, 190)", title: "다이아몬드", desc: "특별한 날, 다른 광택과 촉감 · **영국 하이엔드 원단** 등", listLabel: "시중가", listPrice: 1260000, fromWord: true, saleLabel: BRAND_PRICE, price: 930000 },
      ]),
    },
    {
      chip: "프레스티지 라인",
      chipStyle: "amber" as const,
      desc: "격이 다른 예복",
      items: items([
        { id: "suit-sapphire", dot: "rgb(40, 70, 150)", title: "사파이어", desc: "영국·이탈리아 명가의 하이엔드 원단 · **이탈리아 하이엔드 원단** 등", listLabel: "시중가", listPrice: 1580000, fromWord: true, saleLabel: BRAND_PRICE, price: 1240000 },
        { id: "suit-ruby", dot: "rgb(155, 30, 50)", title: "루비", desc: "최상위 원단으로 짓는 최상위 예복 · **최상위 컬렉션 원단** 등", listLabel: "시중가", listPrice: 1890000, fromWord: true, saleLabel: BRAND_PRICE, price: 1680000 },
      ]),
    },
  ],
  footnote: "표시 가격은 재킷+바지 기준입니다. 베스트·추가 바지 등은 등급에 맞춰 더하실 수 있으며, 매장에서 안내해 드립니다.",
};

// ── 맞춤 아이템 ────────────────────────────────────────────────────────
export const ITEMS_TAB = {
  title: "맞춤 아이템.",
  note: {
    title: "디테일이, 완성을 만듭니다.",
    body: "셔츠·타이·구두처럼 작은 것도 몸과 취향에 맞춥니다. 예복에 더하거나, 필요한 것만 따로 맞출 수 있습니다.",
  },
  items: [
    { id: "item-shirt", title: "맞춤 드레스 셔츠", price: 75000, plain: true },
    { id: "item-tie", title: "실크 타이", price: 35000, plain: true },
    { id: "item-shoes", title: "맞춤 구두 (소가죽)", price: 240000, plain: true },
    { id: "item-vest", title: "베스트", price: 0, plain: true, priceText: "매장 안내" },
  ] as PriceItem[],
  footnote: "여성 정장·베스트는 원단과 디자인에 따라 가격이 달라집니다. 매장에서 직접 보고 디렉터가 함께 안내해 드립니다.",
};

// ── 디자인 옵션 ────────────────────────────────────────────────────────
const opt = (id: string, title: string, price: number): PriceItem => ({ id, title, price, plain: true });

export const OPTIONS_TAB = {
  title: "디자인 옵션.",
  note: {
    title: "원하는 디테일을, 부담 없이.",
    body: "단추·라펠·스티치까지 취향대로 고릅니다. 기본 디테일은 무료이고, 추가 옵션은 가격을 미리 안내합니다. 자세한 선택은 상담에서 함께 정합니다.",
  },
  columns: [
    [
      { label: "무료", items: [opt("opt-hand", "핸드 스티치", 0), opt("opt-jetted", "입술 주머니", 0), opt("opt-double", "더블 브레스티드", 0)] },
      { label: "+30,000원", items: [opt("opt-realbtn", "리얼 버튼", 30000), opt("opt-adjuster", "사이드 어드저스터", 30000), opt("opt-front-stitch", "앞판 스티치", 30000)] },
    ],
    [
      { label: "+40,000원", items: [opt("opt-full-stitch", "전체 스티치", 40000), opt("opt-collar", "덧칼라", 40000), opt("opt-unlined", "홑겹 재킷", 40000), opt("opt-shirring", "셔링 소매", 40000)] },
    ],
  ],
};

export const PROMISE_SECTION = { title: "가격 약속." } as const;

export const PRICING_FAQ = {
  title: "가격, 자주 묻는 질문.",
  items: [
    { q: "표시 가격 외에 추가 비용이 있나요?", a: "없습니다. 정찰제로, 상담에서 정한 구성 그대로 진행됩니다." },
    { q: "수선 비용은 따로인가요?", a: "체형이 바뀌어도 평생 무료로 수선해 드립니다." },
    {
      q: "패키지에 포함된 맞춤 정장을 맞춤 대여로 바꿀 수 있나요?",
      a: "패키지에 포함된 맞춤 정장은 대여로 바꿀 수 없습니다. 다만 패키지 외에 정장이 한 벌 더 필요하시면, 그 추가 정장은 맞춤 대여로 준비해 드릴 수 있어요.",
    },
    {
      q: "원단을 더 좋은 등급으로 올릴 수 있나요?",
      a: "네, 가능합니다. 기본 원단으로도 충분하지만, 더 좋은 등급을 원하시면 등급 차액만 더해집니다. 숨은 비용은 없고, 원단은 매장에서 직접 보고 디렉터와 함께 고르시면 됩니다.",
    },
  ],
} as const;

export const PRICING_CTA = {
  kicker: "다음 단계",
  title: "이제, 가볍게 시작하세요.",
  lead: "마음에 드는 구성이 있다면, 편하게 상담을 예약해 보세요.",
  secondary: "진행 과정 보기",
  secondaryHref: "/#process",
} as const;

export const QUOTE = {
  title: "견적함",
  empty: "담은 항목이 없습니다.",
  clear: "모두 비우기",
  toggleOpen: "견적 펼치기",
  toggleClose: "견적 접기",
  addHint: "항목을 누르면 견적함에 담깁니다.",
} as const;

// Home "가격 미리보기" uses short titles for the same packages.
export const HOME_RENTAL_PREVIEW = [
  { id: "pkg-rental-all", shortTitle: "가볍게 갖춰 입는 대여 3벌" },
  { id: "pkg-rental-domestic", shortTitle: "국내 맞춤 1벌에 대여 2벌을 더한" },
  { id: "pkg-rental-import", shortTitle: "수입 맞춤 1벌에 대여 2벌을 더한" },
] as const;

export const HOME_WEDDING_PREVIEW = [
  { id: "pkg-wedding-3pc", shortTitle: "본식만을 위한 수입 3피스 맞춤" },
  { id: "pkg-wedding-3set", shortTitle: "촬영·본식 뒤 일상에서도 입는 3벌 맞춤" },
] as const;

/** Every selectable item, keyed by id, for the selection/compare bar. */
export function allPriceItems(): PriceItem[] {
  return [
    ...PACKAGES_TAB.groups.flatMap((g) => g.items),
    ...RENTAL_TAB.groups.flatMap((g) => g.items),
    ...SUITS_TAB.lines.flatMap((l) => l.items),
    ...ITEMS_TAB.items,
    ...OPTIONS_TAB.columns.flat().flatMap((g) => g.items),
  ];
}

export function findPriceItem(id: string): PriceItem | undefined {
  return allPriceItems().find((item) => item.id === id);
}
