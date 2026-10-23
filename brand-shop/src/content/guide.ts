// Copy around every product: benefits, the seller banner, notices, size
// charts, the legal product notice and the delivery / exchange / return
// tables. All sample text and sample figures.
import type { ArtKind, Product, SizeKey } from "./types";

type Group = "tailoring" | "shirt" | "knit" | "silk" | "leather" | "jewelry";

const GROUP: Record<ArtKind, Group> = {
  suit: "tailoring",
  jacket: "tailoring",
  coat: "tailoring",
  trousers: "tailoring",
  skirt: "tailoring",
  shirt: "shirt",
  knit: "knit",
  dress: "silk",
  tie: "silk",
  bowtie: "silk",
  square: "silk",
  shoes: "leather",
  pump: "leather",
  bag: "leather",
  case: "leather",
  belt: "leather",
  wallet: "leather",
  cufflinks: "jewelry",
};

const NOTICE: Record<Group, string> = {
  tailoring: "수트·재킷·코트에는 여분 단추와 원단 조각이 함께 들어 있습니다. 교환·반품하실 때는 구성품과 가격택을 모두 함께 보내 주세요.",
  shirt: "칼라 안쪽의 칼라심은 세탁 전에 빼 주세요. 교환·반품하실 때는 포장과 가격택을 함께 보내 주세요.",
  knit: "가방끈처럼 거친 면에 자주 쓸리면 보풀이 생길 수 있습니다. 교환·반품하실 때는 가격택을 떼지 말아 주세요.",
  silk: "실크는 물과 땀에 얼룩이 생기기 쉬우니 착용 후 그늘에서 말려 보관해 주세요.",
  leather: "가죽 제품에는 더스트백과 케어 카드가 함께 들어 있습니다. 교환·반품하실 때는 구성품이 모두 있어야 접수됩니다.",
  jewelry: "커프링크스는 전용 케이스에 담겨 배송됩니다. 케이스가 훼손되면 교환·반품이 어려울 수 있습니다.",
};

const CARE: Record<Group, string> = {
  tailoring: "드라이클리닝만 가능합니다.",
  shirt: "40℃ 이하 물에 세탁할 수 있고, 다림질은 중간 온도로 해 주세요.",
  knit: "찬물에 손세탁하거나 세탁망에 넣어 울 코스로 세탁해 주세요.",
  silk: "드라이클리닝을 권장합니다.",
  leather: "가죽 제품이라 물세탁을 할 수 없습니다.",
  jewelry: "부드러운 천으로 닦아 습기가 없는 곳에 보관해 주세요.",
};

const ORIGIN: Record<Group, string> = {
  tailoring: "대한민국",
  shirt: "대한민국",
  knit: "이탈리아",
  silk: "이탈리아",
  leather: "스페인",
  jewelry: "대한민국",
};

export const noticeFor = (p: Product) => NOTICE[GROUP[p.kind]];
export const careFor = (p: Product) => CARE[GROUP[p.kind]];

/** 상품정보제공고시 rows. */
export function productNotice(p: Product): [string, string][] {
  const g = GROUP[p.kind];
  return [
    ["제품 소재", p.material],
    ["색상", p.colorKo],
    ["치수", p.sizes.join(", ")],
    ["제조자(수입자)", "SLOWN 아틀리에 (샘플)"],
    ["제조국", ORIGIN[g]],
    ["세탁방법 및 취급 시 주의사항", CARE[g]],
    ["제조연월", "2026년 8월"],
    ["품질보증기준", "관련 법과 소비자분쟁해결기준에 따릅니다."],
    ["A/S 책임자와 전화번호", "FOLIO SHOP 고객센터 0000-0000"],
  ];
}

// ── Info area ─────────────────────────────────────────────────────────
export const BENEFITS = {
  coupon: { lead: "첫 구매라면 누구나", rate: "15%", tail: "쿠폰", link: { label: "바로가기", href: "/membership/" } },
  /** Membership points: share of the price. */
  pointRate: 0.02,
  /** Gift-point discount ceiling: share of the price. */
  giftRate: 0.1,
  cards: [
    "FOLIO 카드로 결제하면 5% 청구 할인",
    "A카드·B카드 2~6개월 무이자 할부",
    "C카드 10만 원 이상 결제 시 5천 원 즉시 할인",
  ],
  delivery: {
    normal: { label: "택배배송", text: "무료배송", tip: "평일 오후 2시까지 결제하면 그날 출고합니다. 보통 1~3일 안에 받으실 수 있습니다." },
    fast: { label: "빠른배송", text: "5,000원, 배송일 선택 및 저녁 배송시간 선택 가능!", tip: "서울 전 지역과 경기 일부 지역에서 원하는 날 오전·오후·저녁 시간대에 받아 보실 수 있습니다." },
  },
};

export const SELLER = {
  title: "온라인 공식 판매처 FOLIO SHOP",
  text: "SLOWN 본사에서 직접 들여와 판매하는 정품입니다. 전국 SLOWN 매장에서 수선과 A/S를 받으실 수 있습니다.",
};

export const COLOR_NOTE = "모델 착용 이미지보다 제품컷 이미지의 색상이 정확합니다.";

/** Thin promo banners between the detail and the corners. */
export const DETAIL_BANNERS = [
  { title: "첫 구매 15% 쿠폰", text: "회원가입 후 첫 주문에 바로 쓸 수 있어요", href: "/membership/", bg: "#e9ecff", ink: "#2f4bff" },
  { title: "빠른배송, 오늘 밤 도착", text: "오후 1시까지 주문하면 그날 저녁에 받아요", href: "/help/faq/", bg: "#efefef", ink: "#111111" },
  { title: "팬츠 기장 수선 무료", text: "구매 후 30일 안에 SLOWN 매장에 맡겨 주세요", href: "/stores/", bg: "#f2efe8", ink: "#5a4630" },
];

export const CORNER_TITLES = ["취향을 아는 추천", "취향이 담긴 브랜드 상품", "함께 탐색한 취향"] as const;

export const REVIEW_COPY = {
  policy: { label: "FOLIO SHOP 리뷰 정책", href: "/help/faq/" },
  benefitTitle: "상품리뷰 쓰고 최대 3,000P 받으세요!",
  benefitText: "할인·쿠폰을 적용한 결제 금액이 5,000원 이상인 주문의 리뷰에만 드립니다.",
  empty: "아직 작성된 리뷰가 없습니다.",
};

export const QNA_COPY = {
  intro: "교환·반품·취소 문의는 1:1 문의로 남겨 주세요. 더 빠르게 도와드릴 수 있습니다.",
  oneToOne: { label: "1:1 문의하기", href: "/help/" },
  write: "상품문의 작성하기",
  hideSecret: "비밀글 제외",
  secret: "비밀글입니다.",
  empty: "등록된 상품문의가 없습니다.",
};

// ── Size charts ───────────────────────────────────────────────────────
export type SizeChart = { unit: string; rows: { label: string; values: string[] }[] };

/** One row per measurement, one column per size of the run (SIZE_SETS order). */
export const SIZE_CHARTS: Record<SizeKey, SizeChart | null> = {
  menTailoring: {
    unit: "신체 사이즈(cm)",
    rows: [
      { label: "가슴둘레", values: ["88", "92", "96", "100", "104", "108"] },
      { label: "허리둘레", values: ["76", "80", "84", "88", "92", "96"] },
      { label: "키", values: ["165~170", "170~175", "173~178", "175~180", "178~183", "180~185"] },
    ],
  },
  womenTailoring: {
    unit: "신체 사이즈(cm)",
    rows: [
      { label: "국내 사이즈", values: ["44", "55", "66", "77", "88"] },
      { label: "가슴둘레", values: ["80", "84", "88", "92", "96"] },
      { label: "허리둘레", values: ["62", "66", "70", "74", "78"] },
    ],
  },
  menShirt: {
    unit: "신체 사이즈(cm)",
    rows: [
      { label: "목둘레", values: ["38", "39", "40", "41", "42", "43"] },
      { label: "가슴둘레", values: ["96", "100", "104", "108", "112", "116"] },
      { label: "소매길이", values: ["82", "83", "84", "85", "86", "87"] },
    ],
  },
  knit: {
    unit: "제품 사이즈(cm)",
    rows: [
      { label: "가슴단면", values: ["50", "53", "56", "59"] },
      { label: "총장", values: ["66", "68", "70", "72"] },
    ],
  },
  menPants: {
    unit: "신체 사이즈(cm)",
    rows: [
      { label: "허리둘레", values: ["74", "78", "82", "86", "90"] },
      { label: "엉덩이둘레", values: ["94", "98", "102", "106", "110"] },
    ],
  },
  womenPants: {
    unit: "신체 사이즈(cm)",
    rows: [
      { label: "허리둘레", values: ["62", "66", "70", "74"] },
      { label: "엉덩이둘레", values: ["88", "92", "96", "100"] },
    ],
  },
  menShoes: {
    unit: "발 길이(mm) 기준",
    rows: [
      { label: "EU", values: ["40", "40.5", "41", "42", "42.5", "43", "44"] },
      { label: "UK", values: ["6", "6.5", "7", "7.5", "8", "8.5", "9"] },
    ],
  },
  womenShoes: {
    unit: "발 길이(mm) 기준",
    rows: [
      { label: "EU", values: ["35", "36", "37", "38", "39", "40"] },
      { label: "UK", values: ["2.5", "3", "4", "5", "6", "6.5"] },
    ],
  },
  belt: {
    unit: "벨트(cm)",
    rows: [
      { label: "맞는 허리둘레", values: ["70~75", "75~80", "80~85", "85~90"] },
      { label: "전체 길이", values: ["100", "105", "110", "115"] },
    ],
  },
  free: null,
};

export const SIZE_NOTES = [
  "구매하실 때 참고하실 수 있는 사이즈 조견표입니다. 체형에 따라 차이가 있을 수 있습니다.",
  "측정 방법과 위치에 따라 1~3cm 정도 오차가 있을 수 있습니다.",
];

// ── Delivery / exchange / return ─────────────────────────────────────
export type GuideRow = {
  label: string;
  title?: string;
  lines?: string[];
  steps?: string[];
  table?: { head: string[]; rows: string[][] };
  link?: { label: string; href: string };
  notes?: string[];
};

export const DELIVERY_GUIDE: { intro: string; sections: { title: string; rows: GuideRow[] }[] } = {
  intro: "이 상품은 SLOWN 물류센터에서 바로 보내 드리는 상품입니다.",
  sections: [
    {
      title: "배송안내",
      rows: [
        {
          label: "일반 택배",
          title: "무료 배송",
          lines: ["결제 금액과 관계없이 무료로 보내 드립니다.", "평일 오후 2시까지 결제하면 그날 출고하며, 보통 1~3일 안에 도착합니다."],
          notes: ["도서·산간 지역은 하루에서 이틀 더 걸릴 수 있습니다."],
        },
        {
          label: "빠른배송",
          title: "5,000원",
          table: {
            head: ["배송 유형", "주문 마감", "도착 예정"],
            rows: [
              ["새벽", "전날 23:00까지", "주문 다음 날 07시 전"],
              ["당일", "11:00까지", "주문 당일 14~19시"],
              ["저녁", "13:00까지", "주문 당일 18~24시"],
            ],
          },
          link: { label: "빠른배송 서비스 확인", href: "/help/faq/" },
          notes: ["저녁 배송은 서울 전 지역에서 받을 수 있으며, 가능한 시간대는 주문 화면에서 고르실 수 있습니다.", "토요일은 오전 11시까지 주문하면 그날 저녁에 받을 수 있습니다."],
        },
        {
          label: "매장픽업",
          title: "배송비 없음",
          lines: ["온라인에서 주문하고 가까운 SLOWN 매장에서 직접 받는 방법입니다."],
          steps: ["주문할 때 픽업할 매장을 고릅니다.", "상품이 준비되면 문자로 알려 드립니다. (당일 또는 2~3일 안)", "받은 ‘준비 완료’ 문자를 매장에 보여 주고 상품을 받습니다."],
          notes: ["‘준비 완료’ 문자를 받은 뒤 7일 안에 찾아가지 않으면 주문이 취소됩니다."],
        },
      ],
    },
    {
      title: "교환안내",
      rows: [
        {
          label: "교환 배송비",
          title: "5,000원 (왕복 택배비)",
          notes: ["단순 변심으로 교환할 때만 받습니다. 상품 불량이나 정보와 다른 상품이 배송된 경우에는 FOLIO SHOP이 부담합니다."],
        },
        { label: "FOLIO SHOP", steps: ["마이페이지에서 교환을 신청합니다.", "교환 배송비를 결제합니다. (해당하는 경우)", "1~3일 안에 택배 기사님이 방문해 상품을 가져갑니다.", "상품을 확인한 뒤 교환 상품을 보내 드립니다."] },
        { label: "매장", lines: ["구매 영수증이나 주문 내역을 가지고 SLOWN 매장을 방문하면 같은 상품의 다른 사이즈로 바로 바꿀 수 있습니다."] },
        { label: "교환 가능기간", lines: ["배송 완료 후 7일 이내"] },
        {
          label: "교환 불가상품",
          lines: [
            "착용·세탁하거나 수선한 상품, 향수 냄새 등이 밴 상품은 교환할 수 없습니다.",
            "가격택·라벨·더스트백 같은 구성품이 없거나 훼손된 경우 교환이 어려울 수 있습니다.",
            "주문 제작(기장 맞춤, 이니셜 각인) 상품은 교환할 수 없습니다.",
          ],
        },
      ],
    },
    {
      title: "반품안내",
      rows: [
        { label: "반품 배송비", title: "2,500원 (편도 택배비)", notes: ["무료배송 조건을 채워 받은 주문을 일부만 반품해 조건이 깨지면 처음 배송비가 함께 청구됩니다."] },
        { label: "반품 절차", steps: ["마이페이지에서 반품을 신청합니다.", "1~3일 안에 택배 기사님이 방문해 상품을 가져갑니다.", "상품을 확인한 뒤 결제 수단으로 환불해 드립니다."] },
        { label: "반품 가능기간", lines: ["배송 완료 후 7일 이내"] },
        { label: "환불 안내", lines: ["카드 결제는 반품 완료 후 3~5영업일 안에 취소되며, 포인트는 바로 돌려드립니다."] },
      ],
    },
    {
      title: "A/S안내",
      rows: [
        { label: "접수", lines: ["SLOWN 매장 또는 고객센터(0000-0000)로 접수해 주세요."] },
        { label: "기간 및 비용", lines: ["품질보증기간(구매 후 1년) 안의 제품 불량은 무상으로 수선해 드립니다.", "보증기간이 지났거나 고객 과실로 손상된 경우 수선 비용이 듭니다."] },
      ],
    },
  ],
};

export const TRADE_NOTES = [
  "상품 정보와 다르게 배송된 경우 받은 날부터 3개월, 그 사실을 안 날부터 30일 안에 교환·반품하실 수 있습니다.",
  "미성년자가 법정대리인의 동의 없이 구매한 경우 본인 또는 법정대리인이 구매를 취소할 수 있습니다.",
  "모니터 설정에 따라 실제 상품 색상과 다르게 보일 수 있습니다.",
  "이 화면의 상품·가격·혜택은 모두 데모용 샘플이며 실제로 판매되지 않습니다.",
];
