// Sample customer reviews, generated from a small pool of texts so every
// product has a stable set (reference: the review widget under the product
// detail and the review board). Names are masked like the reference does.
import { PRODUCTS, hash } from "./catalog";
import type { Line, Product } from "./types";

export type Review = {
  id: string;
  productId: string;
  author: string;
  date: string;
  rating: number;
  height: string;
  weight: string;
  topSize?: string;
  bottomSize?: string;
  option: string;
  pick: boolean;
  month: boolean;
  text: string;
  photos: number;
  helpful: number;
  comments: number;
};

const FAMILY = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오"];
const GIVEN = ["호", "진", "민", "현", "준", "우", "서", "연", "수", "윤", "빈", "범"];

const COMMON = [
  "평소 입던 사이즈로 주문했는데 품이 딱 맞습니다. 소재가 생각보다 훨씬 좋아서 만족스럽게 입고 있어요.",
  "출근할 때 자주 손이 가는 옷이 될 것 같아요. 색감이 화면과 거의 같고 마감이 깔끔합니다.",
  "매장에서 입어 보고 온라인으로 주문했습니다. 배송도 빠르고 포장도 꼼꼼했어요.",
  "가격대가 있어서 고민했는데 받아 보니 고민한 게 아깝지 않을 만큼 완성도가 좋습니다.",
  "두 번째 구매입니다. 처음 산 색이 마음에 들어서 다른 색도 하나 더 샀어요.",
  "기장이 조금 길어서 매장에서 무료 수선을 받았는데, 핏이 훨씬 좋아졌습니다.",
];

const BY_LINE: Partial<Record<Line, string[]>> = {
  outerwear: [
    "가죽 자켓을 오래 찾다가 드디어 제 짝을 만났습니다. 입을수록 몸에 맞게 길드는 느낌이 좋아요.",
    "코트 무게가 가벼워서 오래 입어도 어깨가 편합니다. 수트 위에도 넉넉하게 들어가요.",
    "어깨선이 자연스럽게 떨어지고 안감이 부드러워 니트 위에 입기 좋습니다.",
  ],
  knitwear: [
    "니트가 얇은데도 따뜻하고, 셔츠 위에 겹쳐 입어도 부해 보이지 않아요.",
    "까슬거림 없이 부드럽고 보풀도 거의 없습니다. 세탁 후에도 형태가 그대로예요.",
    "목 부분이 늘어나지 않아서 단독으로 입어도 단정합니다.",
  ],
  shirts: [
    "구김이 적어서 아침에 다림질 없이 입고 나가도 하루 종일 깔끔합니다.",
    "칼라 모양이 예쁘고 재킷 안에서도 잘 서 있어요. 색별로 하나씩 사고 싶습니다.",
  ],
  trousers: ["허리가 편하고 발목 쪽이 깔끔하게 떨어집니다. 기장 수선 서비스도 만족스러웠어요.", "주름이 잘 잡혀 있어서 슬랙스로도 캐주얼로도 잘 입고 있습니다."],
  denim: ["원워시 색이 정말 예쁩니다. 처음엔 조금 뻣뻣했는데 몇 번 입으니 몸에 맞게 부드러워졌어요.", "핏이 곧게 떨어지고 허벅지가 편합니다."],
  tailoring: ["어깨가 정말 편한 재킷입니다. 니트 입은 느낌인데 실루엣은 단정해요.", "결혼식 하객 수트로 샀는데 평소에도 재킷만 따로 자주 입게 됩니다."],
  tops: ["목 테이프가 탄탄해서 여러 번 빨아도 늘어나지 않아요. 재킷 안에 받쳐 입기 딱 좋습니다."],
};

function pick<T>(list: T[], seed: number) {
  return list[seed % list.length];
}

function dateFrom(seed: number) {
  // Spread over the eleven months before the demo date (2026-10-23).
  const day = new Date(Date.UTC(2026, 9, 23) - (seed % 330) * 86400000);
  return day.toISOString().slice(0, 10);
}

/** Every review of a product, newest first. */
export function reviewsFor(p: Product): Review[] {
  const pool = [...(BY_LINE[p.line] ?? []), ...COMMON];
  const list = Array.from({ length: p.reviews }, (_, i) => {
    const h = hash(`${p.id}#${i}`);
    const height = 165 + (h % 7) * 3;
    const weight = 57 + ((h >>> 3) % 9) * 3;
    return {
      id: `${p.id}-r${i}`,
      productId: p.id,
      author: `${pick(FAMILY, h)}*${pick(GIVEN, h >>> 5)}`,
      date: dateFrom(h >>> 2),
      rating: h % 17 === 0 ? 4 : 5,
      height: `${height} - ${height + 2} cm`,
      weight: `${weight} - ${weight + 2} kg`,
      topSize: h % 2 ? pick(["M", "L", "XL"], h >>> 7) : undefined,
      bottomSize: h % 3 === 0 ? pick(["30", "32", "34"], h >>> 9) : undefined,
      option: p.sizes[(h >>> 4) % p.sizes.length],
      pick: h % 11 === 0,
      month: h % 7 === 0,
      text: pool[(h >>> 6) % pool.length] + (h % 5 === 0 ? `\n\n${pick(COMMON, h >>> 8)}` : ""),
      photos: h % 4 === 0 ? 0 : 1 + (h % 5),
      helpful: h % 6,
      comments: h % 3 === 0 ? 1 : 0,
    };
  });
  return list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Keyword chips and the words each one picks out of the review texts. */
export const REVIEW_KEYWORDS: [string, RegExp][] = [
  ["만족감", /만족|좋아요|좋습니다/],
  ["착용감", /편합|편하|편안|부드럽/],
  ["디자인", /예쁘|모양|실루엣|디자인/],
  ["신축성", /늘어나|부드러워/],
  ["소재", /소재|원단|가죽|니트/],
  ["가벼움", /가볍|무게/],
  ["실용성", /자주|매일|따로/],
  ["활동성", /움직|편합/],
  ["색상", /색/],
  ["가격", /가격/],
  ["유지보수", /세탁|보풀|구김|빨아/],
  ["계절감", /겨울|여름|따뜻/],
  ["핏", /핏/],
  ["사이즈", /사이즈|품이|기장/],
  ["품질", /완성도|마감|퀄리티/],
];

// ── Review board (reference: /board/product/list.html?board_no=4) ──────
export type BoardReview = Review & { no: number; productName: string };

let board: BoardReview[] | undefined;

/**
 * The newest reviews across the store, numbered like a board: about one in
 * four reviews, so each day carries a handful like the reference. Built on
 * first use so the product page, which only needs its own reviews, skips it.
 */
export function boardReviews(): BoardReview[] {
  if (!board) {
    const all = PRODUCTS.flatMap((p) =>
      reviewsFor(p)
        .filter((r) => hash(r.id) % 4 === 0)
        .map((r) => ({ ...r, productName: `${p.name}_${p.colorName}` })),
    );
    all.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? -1 : 1));
    board = all.slice(0, 60).map((r, i) => ({ ...r, no: 2480 - i }));
  }
  return board;
}

export const findBoardReview = (no: number) => boardReviews().find((r) => r.no === no);
