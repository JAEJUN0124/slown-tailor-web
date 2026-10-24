// SLOWN's sample catalog and the three-level category tree of the store.
// One product is generated per colourway, the way the reference gives every
// colour its own product page. Ratings, review counts and sales come from a
// hash of the id so they stay stable between builds. All placeholder data.
import type { ArtKind, ArtVariant, Gender, Line, Product, Scene, SizeRun } from "./types";

type Colorway = { ko: string; hex: string; tone?: number };

type Model = {
  key: string;
  gender: Gender;
  line: Line;
  sub?: string;
  name: string;
  prefix?: string;
  nameEn: string;
  tagline: string;
  kind: ArtKind;
  variant?: ArtVariant;
  price: number;
  colors: Colorway[];
  isNew?: boolean;
  essential?: boolean;
  best?: boolean;
  upcoming?: boolean;
  sizeRun?: SizeRun;
  materialTitle: string;
  material: string;
  desc: string;
  keywords?: string;
};

const M = (m: Model) => m;

// Shared colourways.
const BLACK = { ko: "블랙", hex: "#1c1c1d" };
const CHARCOAL = { ko: "차콜", hex: "#3d3d40", tone: 1 };
const NAVY = { ko: "네이비", hex: "#252c3e", tone: 2 };
const MIDNIGHT = { ko: "미드나잇", hex: "#1f2638", tone: 2 };
const OATMEAL = { ko: "오트밀", hex: "#cbbfa9", tone: 1 };
const IVORY = { ko: "아이보리", hex: "#ebe5d6", tone: 3 };
const ECRU = { ko: "에크루", hex: "#e2dac8", tone: 3 };
const WHITE = { ko: "화이트", hex: "#f4f2ee", tone: 2 };
const CAMEL = { ko: "카멜", hex: "#a98458", tone: 1 };
const BROWN = { ko: "브라운", hex: "#5a4434", tone: 1 };
const DARK_BROWN = { ko: "다크 브라운", hex: "#3d2b20", tone: 1 };
const GREY = { ko: "멜란지 그레이", hex: "#8f9092", tone: 2 };
const TAUPE = { ko: "토프", hex: "#7d6f5e", tone: 1 };
const OLIVE = { ko: "올리브", hex: "#5f6048", tone: 3 };
const SKY = { ko: "스카이 블루", hex: "#c4d3e6", tone: 2 };
const INDIGO = { ko: "인디고", hex: "#3d5170", tone: 2 };
const MID_BLUE = { ko: "미디엄 블루", hex: "#5b77a0", tone: 2 };
const BLUE_BLACK = { ko: "블루 블랙", hex: "#2a3040", tone: 2 };
const GREIGE = { ko: "그레이지", hex: "#b6aa98", tone: 3 };

const MODELS: Model[] = [
  // ── Men · knitwear ────────────────────────────────────────────────
  M({ key: "wool-cashmere-half-zip", gender: "men", line: "knitwear", sub: "hoodie-zip", name: "울 캐시미어 하프 집업 니트", nameEn: "Wool Cashmere Half Zip Knit", tagline: "가볍게 걸쳐 완성되는 단정한 레이어", kind: "knit", variant: "zip", price: 489000, isNew: true,
    colors: [BLACK, CHARCOAL], materialTitle: "울과 캐시미어가 만드는 가벼운 보온", material: "Wool 90% Cashmere 10%",
    desc: "고밀도로 편직한 울 캐시미어 원사를 사용해 가볍지만 충분한 보온감을 갖춘 하프 집업 니트입니다. 목을 감싸는 높은 칼라와 금속 지퍼가 셔츠 위에도 단정하게 어울리며, 립 조직의 밑단이 실루엣을 깔끔하게 정리합니다.", keywords: "니트 집업 캐시미어 knit" }),
  M({ key: "merino-crew", gender: "men", line: "knitwear", sub: "crew-neck", name: "엑스트라 파인 메리노 크루넥 니트", nameEn: "Extra Fine Merino Crewneck", tagline: "매일 손이 가는 가장 얇은 니트", kind: "knit", price: 259000, essential: true, best: true,
    colors: [OATMEAL, NAVY, GREY], materialTitle: "피부에 닿아도 부드러운 엑스트라 파인 메리노", material: "Wool 100% (Extra Fine Merino)",
    desc: "17.5마이크론 메리노 울을 촘촘하게 편직해 셔츠 위나 재킷 안에 겹쳐 입기 좋은 두께로 완성했습니다. 어깨선과 소매 길이를 체형에 맞게 정리해 단독으로 입어도 깔끔한 인상을 줍니다.", keywords: "니트 크루넥 메리노 스웨터 knit" }),
  M({ key: "cashmere-layered-crew", gender: "unisex", line: "knitwear", sub: "crew-neck", prefix: "[유니섹스]", name: "캐시미어 레이어드 크루넥 니트", nameEn: "Cashmere Layered Crewneck", tagline: "밑단으로 드러나는 여유로운 레이어", kind: "knit", price: 299000, isNew: true,
    colors: [{ ko: "오트밀", hex: "#b9ab98", tone: 1 }, BLACK], materialTitle: "가볍게 부풀린 캐시미어 니트", material: "Cashmere 100%",
    desc: "밑단과 소매 끝에 얇은 저지를 덧대어 한 벌로 레이어드한 듯한 크루넥 니트입니다. 성별에 관계없이 입을 수 있도록 품을 여유 있게 잡았습니다.", keywords: "니트 캐시미어 유니섹스 knit" }),
  M({ key: "wool-polo-cardigan", gender: "men", line: "knitwear", sub: "cardigan", prefix: "[10/27 예약 발송]", name: "울 폴로 가디건", nameEn: "Wool Polo Cardigan", tagline: "칼라를 더해 재킷처럼 입는 가디건", kind: "knit", variant: "cardigan", price: 439000, isNew: true,
    colors: [{ ko: "버터 옐로우", hex: "#e3cf94", tone: 3 }, BLACK], materialTitle: "도톰한 립 조직의 울 가디건", material: "Wool 100%",
    desc: "폴로 칼라와 호두 단추를 더해 아우터처럼 걸칠 수 있는 가디건입니다. 굵은 립 조직이 형태를 잡아 주어 오래 입어도 늘어짐이 적습니다.", keywords: "가디건 니트 폴로 cardigan" }),
  M({ key: "silk-vneck", gender: "men", line: "knitwear", sub: "v-neck", name: "울 실크 브이넥 니트", nameEn: "Wool Silk V-neck Knit", tagline: "은은한 광택이 도는 얇은 브이넥", kind: "knit", variant: "vneck", price: 279000,
    colors: [CAMEL, CHARCOAL], materialTitle: "실크를 섞어 매끄러운 표면", material: "Wool 70% Silk 30%",
    desc: "울에 실크를 섞어 표면에 은은한 광택이 도는 브이넥 니트입니다. 넥타이를 맨 셔츠 위에 겹쳐 입기 좋은 깊이로 네크라인을 정리했습니다.", keywords: "니트 브이넥 실크 knit" }),
  M({ key: "cotton-polo-knit", gender: "men", line: "knitwear", sub: "polo", name: "퓨어 코튼 반팔 클래식 폴로 니트", nameEn: "Pure Cotton Classic Polo Knit", tagline: "셔츠처럼 단정한 반팔 니트", kind: "knit", variant: "polo", price: 159000, best: true,
    colors: [BLACK, IVORY, NAVY], materialTitle: "산뜻하게 마르는 퓨어 코튼", material: "Cotton 100%",
    desc: "고르게 꼰 코튼 원사로 편직해 땀이 나도 산뜻하게 마르는 폴로 니트입니다. 칼라가 무너지지 않도록 이중 조직으로 짰습니다.", keywords: "폴로 니트 반팔 polo" }),
  M({ key: "cashmere-turtleneck", gender: "men", line: "knitwear", sub: "turtleneck", name: "울 캐시미어 터틀넥 니트", nameEn: "Wool Cashmere Turtleneck", tagline: "코트 안에서 완성되는 겨울의 기본", kind: "knit", variant: "turtle", price: 329000, essential: true,
    colors: [BLACK, BROWN], materialTitle: "목을 부드럽게 감싸는 캐시미어 블렌드", material: "Wool 80% Cashmere 20%",
    desc: "두 번 접어 입는 높은 넥과 몸에 가볍게 붙는 실루엣으로 코트와 재킷 안에 받쳐 입기 좋은 터틀넥입니다.", keywords: "터틀넥 니트 캐시미어 turtleneck" }),
  M({ key: "loopback-sweat", gender: "men", line: "knitwear", sub: "sweatshirt", name: "루프백 코튼 스웻 셔츠", nameEn: "Loopback Cotton Sweatshirt", tagline: "주말에 꺼내 입는 두툼한 스웻", kind: "knit", price: 189000,
    colors: [GREY, NAVY], materialTitle: "도톰한 루프백 저지", material: "Cotton 100%",
    desc: "안쪽이 고리 모양으로 짜인 루프백 저지로 만들어 도톰하지만 통기성이 좋은 스웻 셔츠입니다.", keywords: "스웻셔츠 맨투맨 sweatshirt" }),
  M({ key: "linen-short-knit", gender: "men", line: "knitwear", sub: "short-sleeve", name: "린넨 코튼 반팔 니트", nameEn: "Linen Cotton Short Sleeve Knit", tagline: "여름 재킷 안에 받쳐 입는 반팔 니트", kind: "knit", variant: "short", price: 169000,
    colors: [ECRU, BLACK], materialTitle: "까슬한 린넨의 시원함", material: "Linen 55% Cotton 45%",
    desc: "린넨과 코튼을 섞어 까슬하고 시원한 촉감을 살린 반팔 니트입니다.", keywords: "반팔 니트 린넨 knit" }),
  M({ key: "wool-jersey-zip", gender: "men", line: "knitwear", sub: "hoodie-zip", name: "울 저지 집업 점퍼", nameEn: "Wool Jersey Zip Jumper", tagline: "재킷과 니트 사이의 가벼운 아우터", kind: "knit", variant: "zip", price: 439000, isNew: true,
    colors: [MIDNIGHT, CHARCOAL], materialTitle: "구김이 적은 울 저지", material: "Wool 100%",
    desc: "구김이 적고 신축성이 좋은 울 저지로 만든 집업 점퍼입니다. 셔츠 위에 걸쳐 출근길 아우터로 입기 좋습니다.", keywords: "집업 점퍼 울저지 zip" }),

  // ── Men · tailoring ───────────────────────────────────────────────
  M({ key: "soft-single-jacket", gender: "men", line: "tailoring", name: "소프트 테일러드 싱글 재킷", nameEn: "Soft Tailored Single Jacket", tagline: "어깨 패드를 덜어낸 편안한 테일러링", kind: "jacket", price: 598000, isNew: true, essential: true,
    colors: [CHARCOAL, NAVY], materialTitle: "가볍게 흐르는 울 트윌", material: "Wool 100% Lining: Cupro 100%",
    desc: "어깨 패드와 심지를 덜어내 니트처럼 편안하게 입을 수 있는 싱글 재킷입니다. 셔츠와 티셔츠 어디에도 어울리도록 라펠 폭을 조금 좁혔습니다.", keywords: "재킷 자켓 블레이저 테일러링 jacket" }),
  M({ key: "tropical-suit", gender: "men", line: "tailoring", name: "울 트로피컬 싱글 수트", nameEn: "Wool Tropical Single Suit", tagline: "사계절 입는 가장 기본의 수트", kind: "suit", price: 1190000, best: true,
    colors: [CHARCOAL, { ko: "미드 그레이", hex: "#6e6f72", tone: 2 }], materialTitle: "통기성 좋은 트로피컬 울", material: "Wool 100% Lining: Cupro 100%",
    desc: "평직으로 성글게 짜 통기성이 좋은 트로피컬 울로 만든 싱글 수트입니다. 바지 기장은 무료 수선으로 맞춰 드립니다.", keywords: "수트 정장 슈트 suit" }),
  M({ key: "flannel-db-suit", gender: "men", line: "tailoring", name: "울 플란넬 더블 수트", nameEn: "Wool Flannel Double Breasted Suit", tagline: "겨울을 위한 포근한 더블 브레스티드", kind: "suit", variant: "db", price: 1290000, isNew: true,
    colors: [NAVY], materialTitle: "기모감이 도는 울 플란넬", material: "Wool 100% Lining: Cupro 100%",
    desc: "표면을 살짝 기모해 따뜻한 플란넬로 지은 더블 브레스티드 수트입니다. 앞단추 6개 중 하나만 채우는 6×1 구성입니다.", keywords: "더블 수트 정장 플란넬 suit" }),

  // ── Men · outerwear ───────────────────────────────────────────────
  M({ key: "wool-sports-jacket", gender: "men", line: "outerwear", sub: "jackets", name: "울 스포츠 재킷", nameEn: "Wool Sports Jacket", tagline: "패치 포켓을 더한 캐주얼 재킷", kind: "jacket", price: 598000, best: true,
    colors: [{ ko: "네이비", hex: "#23293a", tone: 2 }, BROWN], materialTitle: "탄탄한 울 서지", material: "Wool 100%",
    desc: "가슴과 허리에 패치 포켓을 단 스포츠 재킷입니다. 데님과 치노 팬츠에 맞춰 입기 좋습니다.", keywords: "재킷 자켓 스포츠 jacket" }),
  M({ key: "denim-trucker", gender: "men", line: "outerwear", sub: "denim-jackets", name: "원워시 데님 트러커 재킷", nameEn: "One Wash Denim Trucker Jacket", tagline: "입을수록 길드는 데님 재킷", kind: "blouson", variant: "denim", price: 329000,
    colors: [INDIGO, { ko: "블루", hex: "#6d86a8", tone: 2 }], materialTitle: "13.5oz 셀비지 데님", material: "Cotton 100%",
    desc: "한 번만 세탁해 원단의 색을 살린 데님 트러커 재킷입니다.", keywords: "데님 재킷 청자켓 denim" }),
  M({ key: "quilted-vest", gender: "men", line: "outerwear", sub: "vests", name: "울 퀼티드 베스트", nameEn: "Wool Quilted Vest", tagline: "재킷 안에 더하는 한 겹의 온기", kind: "knit", variant: "vest", price: 289000,
    colors: [CHARCOAL, OLIVE], materialTitle: "가벼운 충전재를 넣은 울", material: "Wool 100% Padding: Polyester 100%",
    desc: "가벼운 충전재를 넣어 재킷 안에 입어도 부해 보이지 않는 베스트입니다.", keywords: "베스트 조끼 vest" }),
  M({ key: "goat-leather-jacket", gender: "men", line: "outerwear", sub: "leather", name: "고트 레더 자켓", nameEn: "Goat Leather Garment Washed Finish", tagline: "날렵하지만 무르익는, 남성적인 실루엣", kind: "blouson", variant: "leather", price: 959000, best: true, isNew: true,
    colors: [BLACK, DARK_BROWN], materialTitle: "주름과 광택, 입을수록 살아나는 고트스킨", material: "Outshell: Goatskin 100% Lining: Cupro 100%",
    desc: "견고하면서도 내추럴한 질감의 고트스킨으로 만든 레더 자켓입니다. 완성 후 가먼트 워싱을 더해 자연스러운 주름과 은은한 광택을 입혔으며, 시간이 지날수록 착용자의 체형에 맞춰 부드럽게 변합니다.", keywords: "레더 가죽 자켓 leather" }),
  M({ key: "lamb-bomber", gender: "men", line: "outerwear", sub: "leather", name: "내추럴 램 레더 봄버 자켓", nameEn: "Natural Lamb Leather Bomber", tagline: "부드럽게 흐르는 램스킨 봄버", kind: "blouson", variant: "leather", price: 1590000, isNew: true,
    colors: [BLACK, { ko: "다크 네이비", hex: "#222a3b", tone: 2 }], materialTitle: "결이 고운 램스킨", material: "Outshell: Lambskin 100%",
    desc: "결이 고운 램스킨으로 만든 봄버 자켓입니다. 립 조직의 칼라와 밑단이 실루엣을 가볍게 마무리합니다.", keywords: "레더 봄버 가죽 bomber" }),
  M({ key: "classic-single-coat", gender: "men", line: "outerwear", sub: "coats", prefix: "[10/28 예약 발송]", name: "클래식 싱글 코트", nameEn: "Classic Single Coat", tagline: "가장 오래 입게 될 한 벌의 코트", kind: "coat", price: 859000, isNew: true, best: true,
    colors: [{ ko: "멜란지 그레이", hex: "#6d6e70", tone: 2 }, { ko: "다크 네이비", hex: "#232a3c", tone: 2 }, TAUPE], materialTitle: "촘촘하게 다진 울 멜톤", material: "Wool 90% Nylon 10%",
    desc: "촘촘하게 다진 울 멜톤으로 만든 싱글 코트입니다. 무릎을 살짝 덮는 기장과 곧게 떨어지는 실루엣으로 수트와 캐주얼 모두에 어울립니다.", keywords: "코트 울코트 coat" }),
  M({ key: "balmacaan-coat", gender: "men", line: "outerwear", sub: "coats", name: "울 캐시미어 발마칸 코트", nameEn: "Wool Cashmere Balmacaan Coat", tagline: "어깨를 감싸는 둥근 래글런 코트", kind: "coat", price: 1090000, essential: true,
    colors: [CAMEL, CHARCOAL], materialTitle: "포근한 울 캐시미어", material: "Wool 85% Cashmere 15%",
    desc: "래글런 소매로 어깨를 둥글게 감싸는 발마칸 코트입니다. 두꺼운 니트 위에도 여유 있게 걸칠 수 있습니다.", keywords: "코트 발마칸 캐시미어 coat" }),
  M({ key: "goose-down-parka", gender: "men", line: "outerwear", sub: "down", name: "라이트 구스 다운 파카", nameEn: "Light Goose Down Parka", tagline: "코트처럼 단정한 다운", kind: "blouson", variant: "down", price: 690000, isNew: true,
    colors: [BLACK, OLIVE], materialTitle: "가벼운 구스 다운 충전재", material: "Shell: Nylon 100% Filling: Goose Down 80% Feather 20%",
    desc: "얇은 퀼팅으로 부피를 줄여 재킷 위에도 걸칠 수 있는 다운 파카입니다.", keywords: "다운 패딩 파카 down" }),

  // ── Men · shirts ──────────────────────────────────────────────────
  M({ key: "comfort-shirt", gender: "men", line: "shirts", sub: "comfort", name: "컴포트 코튼 셔츠", nameEn: "Comfort Cotton Shirt", tagline: "구김을 덜어낸 출근용 셔츠", kind: "shirt", price: 139000, essential: true, best: true,
    colors: [WHITE, SKY, { ko: "블루 스트라이프", hex: "#a9bdd6", tone: 2 }], materialTitle: "구김이 적은 코튼 트윌", material: "Cotton 100%",
    desc: "구김이 적은 코튼 트윌로 만들어 하루 종일 단정함을 유지하는 셔츠입니다. 등판 주름으로 팔을 움직이기 편합니다.", keywords: "셔츠 와이셔츠 컴포트 shirt" }),
  M({ key: "oxford-buttondown", gender: "men", line: "shirts", sub: "button-down", name: "코튼 옥스포드 버튼다운 셔츠", nameEn: "Cotton Oxford Button Down Shirt", tagline: "니트 위로 드러나는 칼라", kind: "shirt", price: 149000, isNew: true,
    colors: [WHITE, { ko: "블루", hex: "#b7c8de", tone: 2 }], materialTitle: "도톰한 옥스포드", material: "Cotton 100%",
    desc: "도톰한 옥스포드 원단과 단추로 고정하는 칼라로 니트 위에 겹쳐 입기 좋은 셔츠입니다.", keywords: "셔츠 옥스포드 버튼다운 shirt" }),
  M({ key: "twoply-business", gender: "men", line: "shirts", sub: "business", name: "투플라이 비즈니스 셔츠", nameEn: "Two Ply Business Shirt", tagline: "수트 안에서 가장 깨끗한 셔츠", kind: "shirt", price: 159000,
    colors: [WHITE, { ko: "페일 블루", hex: "#c8d4e3", tone: 2 }], materialTitle: "매끄러운 투플라이 포플린", material: "Cotton 100%",
    desc: "두 가닥을 꼰 원사로 짠 포플린으로 매끄럽고 힘 있는 비즈니스 셔츠입니다.", keywords: "셔츠 드레스셔츠 비즈니스 shirt" }),
  M({ key: "typewriter-regular", gender: "men", line: "shirts", sub: "regular", name: "코튼 타입라이터 레귤러 셔츠", nameEn: "Cotton Typewriter Regular Shirt", tagline: "바삭한 촉감의 레귤러 핏", kind: "shirt", price: 129000,
    colors: [{ ko: "옐로우 스트라이프", hex: "#e7d9a8", tone: 3 }, { ko: "그레이", hex: "#b3b3b3", tone: 2 }], materialTitle: "고밀도 타입라이터", material: "Cotton 100%",
    desc: "촘촘하게 짠 타입라이터 원단으로 바삭한 촉감을 살린 레귤러 핏 셔츠입니다.", keywords: "셔츠 타입라이터 shirt" }),
  M({ key: "linen-loose", gender: "men", line: "shirts", sub: "loose", name: "린넨 루즈드 셔츠", nameEn: "Linen Loosed Shirt", tagline: "바람이 지나가는 넉넉한 품", kind: "shirt", price: 169000,
    colors: [ECRU, CHARCOAL], materialTitle: "프렌치 린넨", material: "Linen 100%",
    desc: "넉넉한 품과 떨어지는 어깨선으로 편안하게 입는 린넨 셔츠입니다.", keywords: "셔츠 린넨 루즈 shirt" }),
  M({ key: "camp-short", gender: "men", line: "shirts", sub: "short-sleeve", name: "코튼 반팔 캠프 셔츠", nameEn: "Cotton Short Sleeve Camp Shirt", tagline: "여름 재킷 안의 오픈 칼라", kind: "shirt", variant: "short", price: 119000,
    colors: [NAVY, WHITE], materialTitle: "가벼운 코튼 론", material: "Cotton 100%",
    desc: "가벼운 코튼 론으로 만든 오픈 칼라 반팔 셔츠입니다.", keywords: "반팔 셔츠 캠프 shirt" }),
  M({ key: "wool-standard", gender: "men", line: "shirts", sub: "standard", name: "울 스탠다드 셔츠", nameEn: "Wool Standard Shirt", tagline: "셔츠 재킷처럼 겹쳐 입는 울 셔츠", kind: "shirt", price: 189000,
    colors: [{ ko: "브라운", hex: "#6a5340", tone: 1 }], materialTitle: "부드러운 울 플란넬", material: "Wool 100%",
    desc: "울 플란넬로 만들어 니트 위에 셔츠 재킷처럼 겹쳐 입기 좋은 셔츠입니다.", keywords: "셔츠 울 플란넬 shirt" }),

  // ── Men · tops ────────────────────────────────────────────────────
  M({ key: "supima-tee", gender: "unisex", line: "tops", prefix: "[유니섹스]", name: "수피마 코튼 반팔 컴포트 티셔츠", nameEn: "Supima Cotton Comfort Tee", tagline: "재킷 안에 받쳐 입는 반팔 티셔츠", kind: "tee", price: 59000, essential: true, best: true,
    colors: [WHITE, BLACK, { ko: "실버", hex: "#a9aaac", tone: 2 }], materialTitle: "수피마 코튼 싱글 저지", material: "Cotton 100% (Supima)",
    desc: "긴 섬유의 수피마 코튼으로 짠 반팔 티셔츠입니다. 목 테이프를 덧대어 여러 번 세탁해도 늘어나지 않습니다.", keywords: "티셔츠 반팔 tee" }),
  M({ key: "classic-long-tee", gender: "men", line: "tops", name: "코튼 긴팔 클래식 티셔츠", nameEn: "Cotton Classic Long Sleeve Tee", tagline: "셔츠 대신 입는 긴팔 티셔츠", kind: "tee", variant: "long", price: 79000,
    colors: [{ ko: "브라운", hex: "#4e3a2e", tone: 1 }, WHITE], materialTitle: "도톰한 코튼 저지", material: "Cotton 100%",
    desc: "도톰한 코튼 저지로 만들어 한 장으로 입어도 비치지 않는 긴팔 티셔츠입니다.", keywords: "티셔츠 긴팔 tee" }),

  // ── Men · trousers ────────────────────────────────────────────────
  M({ key: "twill-tapered", gender: "men", line: "trousers", sub: "tapered", name: "코튼 트윌 테이퍼드 팬츠", nameEn: "Cotton Twill Tapered Pants", tagline: "발목으로 갈수록 좁아지는 치노", kind: "trousers", variant: "tapered", price: 198000, sizeRun: "bottom",
    colors: [{ ko: "베이지", hex: "#bba98a", tone: 3 }, BLACK], materialTitle: "탄탄한 코튼 트윌", material: "Cotton 98% Polyurethane 2%",
    desc: "허벅지는 여유 있고 발목으로 갈수록 좁아지는 테이퍼드 팬츠입니다.", keywords: "팬츠 바지 치노 테이퍼드 pants" }),
  M({ key: "wool-straight", gender: "men", line: "trousers", sub: "straight", name: "울 스트레이트 팬츠", nameEn: "Wool Straight Pants", tagline: "곧게 떨어지는 울 팬츠", kind: "trousers", price: 259000, essential: true, sizeRun: "bottom",
    colors: [{ ko: "다크 그레이", hex: "#4a4a4c", tone: 2 }, NAVY], materialTitle: "구김이 적은 울 개버딘", material: "Wool 100%",
    desc: "구김이 적은 울 개버딘으로 만들어 곧게 떨어지는 스트레이트 팬츠입니다.", keywords: "팬츠 바지 슬랙스 울 pants" }),
  M({ key: "corduroy-wide", gender: "men", line: "trousers", sub: "wide", name: "코듀로이 원 플리티드 와이드 팬츠", nameEn: "Corduroy One Pleated Wide Pants", tagline: "굵은 골이 만드는 넉넉한 실루엣", kind: "trousers", variant: "wide", price: 239000, isNew: true, sizeRun: "bottom",
    colors: [{ ko: "다크 네이비", hex: "#232a3b", tone: 2 }, BROWN], materialTitle: "8웨일 코튼 코듀로이", material: "Cotton 100%",
    desc: "8웨일 코듀로이에 앞주름을 하나 잡아 넉넉하게 떨어지는 와이드 팬츠입니다.", keywords: "팬츠 코듀로이 와이드 pants" }),
  M({ key: "tropical-slacks", gender: "men", line: "trousers", sub: "slacks", name: "울 트로피컬 슬랙스", nameEn: "Wool Tropical Slacks", tagline: "수트 바지를 따로 입는 슬랙스", kind: "trousers", price: 229000, best: true, sizeRun: "bottom",
    colors: [CHARCOAL, NAVY], materialTitle: "통기성 좋은 트로피컬 울", material: "Wool 100%",
    desc: "수트와 같은 트로피컬 울로 만든 슬랙스입니다. 허리 안쪽에 실리콘 테이프를 덧대 셔츠가 빠지지 않습니다.", keywords: "슬랙스 팬츠 바지 slacks" }),
  M({ key: "linen-bermuda", gender: "men", line: "trousers", sub: "shorts", name: "린넨 버뮤다 쇼츠", nameEn: "Linen Bermuda Shorts", tagline: "무릎 위에서 끝나는 여름 팬츠", kind: "trousers", variant: "shorts", price: 139000, sizeRun: "bottom",
    colors: [ECRU], materialTitle: "가벼운 린넨", material: "Linen 100%",
    desc: "무릎 위 기장의 린넨 쇼츠입니다.", keywords: "쇼츠 반바지 shorts" }),

  // ── Men · denim ───────────────────────────────────────────────────
  M({ key: "comfort-denim", gender: "men", line: "denim", sub: "comfort", name: "컴포트 핏 데님", nameEn: "Comfort Fit Denim", tagline: "앉아도 편한 여유 있는 데님", kind: "trousers", variant: "jeans", price: 219000, sizeRun: "denim",
    colors: [MID_BLUE, BLUE_BLACK], materialTitle: "부드러운 12oz 데님", material: "Cotton 100%",
    desc: "허벅지와 엉덩이에 여유를 둔 컴포트 핏 데님입니다.", keywords: "데님 청바지 jeans" }),
  M({ key: "onewash-straight", gender: "men", line: "denim", sub: "straight", name: "원워시드 스트레이트 데님", nameEn: "One Washed Straight Denim", tagline: "곧게 떨어지는 짙은 원워시", kind: "trousers", variant: "jeans", price: 259000, best: true, sizeRun: "denim",
    colors: [{ ko: "블루", hex: "#4a6488", tone: 2 }], materialTitle: "13.5oz 셀비지 데님", material: "Cotton 100%",
    desc: "한 번 세탁해 짙은 색을 살린 스트레이트 데님입니다.", keywords: "데님 청바지 스트레이트 jeans" }),
  M({ key: "onewash-wide", gender: "men", line: "denim", sub: "wide", name: "원워시드 와이드 데님", nameEn: "One Washed Wide Denim", tagline: "넉넉하게 떨어지는 와이드 데님", kind: "trousers", variant: "wide", price: 195000, sizeRun: "denim",
    colors: [BLUE_BLACK], materialTitle: "12oz 데님", material: "Cotton 100%",
    desc: "넉넉한 통으로 떨어지는 와이드 데님입니다.", keywords: "데님 청바지 와이드 jeans" }),

  // ── Men · accessories ─────────────────────────────────────────────
  M({ key: "leather-belt", gender: "men", line: "accessories", name: "레더 벨트 30", nameEn: "Leather Belt 30mm", tagline: "수트와 데님에 모두 어울리는 벨트", kind: "belt", price: 129000, sizeRun: "free",
    colors: [DARK_BROWN, BLACK], materialTitle: "베지터블 태닝 소가죽", material: "Cowhide 100%",
    desc: "베지터블 태닝 소가죽으로 만든 30mm 벨트입니다.", keywords: "벨트 가죽 belt" }),
  M({ key: "graphic-cap", gender: "unisex", line: "accessories", prefix: "[유니섹스]", name: "코튼 그래픽 볼 캡", nameEn: "Cotton Graphic Ball Cap", tagline: "가볍게 눌러 쓰는 볼 캡", kind: "cap", price: 59000, sizeRun: "free",
    colors: [NAVY, { ko: "베이지", hex: "#c9b896", tone: 3 }], materialTitle: "워싱 코튼 트윌", material: "Cotton 100%",
    desc: "워싱한 코튼 트윌로 만든 6패널 볼 캡입니다.", keywords: "모자 캡 cap" }),
  M({ key: "document-bag", gender: "men", line: "accessories", name: "레더 도큐먼트 백", nameEn: "Leather Document Bag", tagline: "노트북이 들어가는 얇은 서류 가방", kind: "case", price: 690000, sizeRun: "free",
    colors: [BLACK], materialTitle: "부드러운 소가죽", material: "Cowhide 100%",
    desc: "14인치 노트북이 들어가는 얇은 서류 가방입니다.", keywords: "가방 서류가방 bag" }),
  M({ key: "cashmere-muffler", gender: "unisex", line: "accessories", name: "울 캐시미어 머플러", nameEn: "Wool Cashmere Muffler", tagline: "코트 깃 안으로 넣는 머플러", kind: "square", price: 189000, sizeRun: "free",
    colors: [CAMEL, GREY], materialTitle: "포근한 울 캐시미어", material: "Wool 70% Cashmere 30%",
    desc: "가볍고 포근한 울 캐시미어 머플러입니다.", keywords: "머플러 목도리 scarf" }),
  M({ key: "card-wallet", gender: "unisex", line: "accessories", name: "레더 카드 지갑", nameEn: "Leather Card Wallet", tagline: "재킷 안주머니에 들어가는 카드 지갑", kind: "wallet", price: 119000, sizeRun: "free",
    colors: [BLACK, { ko: "탄", hex: "#a0703f", tone: 1 }], materialTitle: "부드러운 소가죽", material: "Cowhide 100%",
    desc: "카드 4장과 지폐를 넣을 수 있는 얇은 카드 지갑입니다.", keywords: "지갑 카드지갑 wallet" }),

  // ── Women ─────────────────────────────────────────────────────────
  M({ key: "w-jersey-half-zip", gender: "women", line: "knitwear", name: "여성 울 저지 하프 집업", nameEn: "Women's Wool Jersey Half Zip", tagline: "부드럽게 흐르는 울 저지", kind: "knit", variant: "zip", price: 389000, isNew: true, sizeRun: "women-top",
    colors: [CHARCOAL, IVORY], materialTitle: "구김이 적은 울 저지", material: "Wool 100%",
    desc: "어깨선을 낮춰 부드럽게 흐르는 실루엣의 울 저지 하프 집업입니다.", keywords: "니트 집업 여성 knit" }),
  M({ key: "w-cashmere-crew", gender: "women", line: "knitwear", name: "여성 캐시미어 크루넥 니트", nameEn: "Women's Cashmere Crewneck", tagline: "한 겹으로 충분한 캐시미어", kind: "knit", price: 359000, essential: true, best: true, sizeRun: "women-top",
    colors: [OATMEAL, BLACK], materialTitle: "가볍게 부풀린 캐시미어", material: "Cashmere 100%",
    desc: "가볍게 부풀린 캐시미어로 짠 크루넥 니트입니다.", keywords: "니트 캐시미어 여성 knit" }),
  M({ key: "w-cable-cardigan", gender: "women", line: "knitwear", name: "여성 울 케이블 가디건", nameEn: "Women's Wool Cable Cardigan", tagline: "도톰한 케이블이 지나가는 가디건", kind: "knit", variant: "cardigan", price: 329000, sizeRun: "women-top",
    colors: [{ ko: "모카", hex: "#7d6450", tone: 1 }, { ko: "크림", hex: "#ebe3d2", tone: 3 }], materialTitle: "도톰한 울", material: "Wool 100%",
    desc: "앞판에 케이블을 넣은 도톰한 울 가디건입니다.", keywords: "가디건 니트 여성 cardigan" }),
  M({ key: "w-soft-jacket", gender: "women", line: "tailoring", name: "여성 소프트 테일러드 재킷", nameEn: "Women's Soft Tailored Jacket", tagline: "어깨를 덜어낸 부드러운 재킷", kind: "jacket", price: 549000, isNew: true, essential: true, sizeRun: "women-top",
    colors: [BLACK, GREIGE], materialTitle: "가볍게 흐르는 울 트윌", material: "Wool 100% Lining: Cupro 100%",
    desc: "어깨 패드를 덜어내 부드럽게 떨어지는 여성 재킷입니다.", keywords: "재킷 자켓 여성 jacket" }),
  M({ key: "w-suit-pants", gender: "women", line: "tailoring", name: "여성 울 수트 팬츠", nameEn: "Women's Wool Suit Pants", tagline: "재킷과 맞춰 입는 와이드 팬츠", kind: "trousers", variant: "wide", price: 269000, sizeRun: "women-bottom",
    colors: [BLACK, GREIGE], materialTitle: "가볍게 흐르는 울 트윌", material: "Wool 100%",
    desc: "재킷과 같은 원단으로 만든 와이드 수트 팬츠입니다.", keywords: "팬츠 수트 여성 pants" }),
  M({ key: "w-short-car-coat", gender: "women", line: "outerwear", name: "여성 숏 카 코트", nameEn: "Women's Short Car Coat", tagline: "엉덩이를 덮는 짧은 코트", kind: "coat", price: 790000, isNew: true, best: true, sizeRun: "women-top",
    colors: [CAMEL, BLACK], materialTitle: "촘촘하게 다진 울 멜톤", material: "Wool 90% Nylon 10%",
    desc: "엉덩이를 살짝 덮는 기장의 카 코트입니다.", keywords: "코트 여성 coat" }),
  M({ key: "w-wrap-coat", gender: "women", line: "outerwear", name: "여성 벨티드 랩 코트", nameEn: "Women's Belted Wrap Coat", tagline: "허리를 묶어 완성하는 코트", kind: "coat", variant: "belted", price: 990000, sizeRun: "women-top",
    colors: [OATMEAL], materialTitle: "포근한 울 캐시미어", material: "Wool 85% Cashmere 15%",
    desc: "단추 없이 허리를 묶어 입는 랩 코트입니다.", keywords: "코트 랩코트 여성 coat" }),
  M({ key: "w-lamb-blouson", gender: "women", line: "outerwear", name: "여성 램 레더 블루종", nameEn: "Women's Lamb Leather Blouson", tagline: "짧게 떨어지는 램스킨 블루종", kind: "blouson", variant: "leather", price: 1190000, sizeRun: "women-top",
    colors: [DARK_BROWN], materialTitle: "결이 고운 램스킨", material: "Lambskin 100%",
    desc: "허리선에서 끝나는 짧은 램스킨 블루종입니다.", keywords: "레더 블루종 여성 leather" }),
  M({ key: "w-cupro-blouse", gender: "women", line: "shirts", name: "여성 큐프라 실키 블라우스", nameEn: "Women's Cupro Silky Blouse", tagline: "은은하게 흐르는 큐프라", kind: "shirt", variant: "bow", price: 229000, best: true, sizeRun: "women-top",
    colors: [IVORY, BLACK], materialTitle: "실크처럼 매끄러운 큐프라", material: "Cupro 100%",
    desc: "실크처럼 매끄럽고 정전기가 적은 큐프라로 만든 블라우스입니다.", keywords: "블라우스 셔츠 여성 blouse" }),
  M({ key: "w-over-shirt", gender: "women", line: "shirts", name: "여성 코튼 오버 셔츠", nameEn: "Women's Cotton Over Shirt", tagline: "넉넉하게 걸치는 코튼 셔츠", kind: "shirt", price: 169000, sizeRun: "women-top",
    colors: [WHITE, { ko: "블루 스트라이프", hex: "#a9bdd6", tone: 2 }], materialTitle: "바삭한 코튼 포플린", material: "Cotton 100%",
    desc: "넉넉한 품으로 걸치듯 입는 코튼 셔츠입니다.", keywords: "셔츠 여성 shirt" }),
  M({ key: "w-long-tee", gender: "women", line: "tops", name: "여성 긴팔 클래식 티셔츠", nameEn: "Women's Classic Long Sleeve Tee", tagline: "몸에 가볍게 붙는 긴팔 티셔츠", kind: "tee", variant: "long", price: 98000, sizeRun: "women-top",
    colors: [{ ko: "브라운", hex: "#4e3a2e", tone: 1 }, WHITE], materialTitle: "부드러운 코튼 모달", material: "Cotton 60% Modal 40%",
    desc: "코튼에 모달을 섞어 부드럽게 늘어나는 긴팔 티셔츠입니다.", keywords: "티셔츠 긴팔 여성 tee" }),
  M({ key: "w-turtle-tee", gender: "women", line: "tops", name: "여성 긴팔 터틀넥 티셔츠", nameEn: "Women's Turtleneck Tee", tagline: "니트 안에 받쳐 입는 얇은 터틀넥", kind: "knit", variant: "turtle", price: 109000, isNew: true, sizeRun: "women-top",
    colors: [GREY, BLACK], materialTitle: "얇은 코튼 저지", material: "Cotton 95% Polyurethane 5%",
    desc: "니트 안에 받쳐 입기 좋은 얇은 터틀넥 티셔츠입니다.", keywords: "터틀넥 티셔츠 여성 tee" }),
  M({ key: "w-jersey-dress", gender: "women", line: "dresses", name: "여성 울 저지 원피스", nameEn: "Women's Wool Jersey Dress", tagline: "한 벌로 완성되는 저지 원피스", kind: "dress", price: 359000, sizeRun: "women-top",
    colors: [BLACK, NAVY], materialTitle: "구김이 적은 울 저지", material: "Wool 100%",
    desc: "구김이 적은 울 저지로 만든 롱 원피스입니다.", keywords: "원피스 드레스 여성 dress" }),
  M({ key: "w-pleats-skirt", gender: "women", line: "skirts", name: "여성 울 플리츠 스커트", nameEn: "Women's Wool Pleats Skirt", tagline: "걸을 때마다 움직이는 주름", kind: "skirt", price: 259000, isNew: true, sizeRun: "women-bottom",
    colors: [CHARCOAL, CAMEL], materialTitle: "주름이 오래가는 울 개버딘", material: "Wool 100%",
    desc: "주름이 오래 유지되는 울 개버딘으로 만든 미디 스커트입니다.", keywords: "스커트 치마 여성 skirt" }),
  M({ key: "w-wool-wide", gender: "women", line: "trousers", name: "여성 울 와이드 팬츠", nameEn: "Women's Wool Wide Pants", tagline: "바닥까지 흐르는 와이드 팬츠", kind: "trousers", variant: "wide", price: 249000, essential: true, sizeRun: "women-bottom",
    colors: [BLACK, IVORY], materialTitle: "가볍게 흐르는 울", material: "Wool 100%",
    desc: "바닥에 닿을 듯 흐르는 기장의 와이드 팬츠입니다.", keywords: "팬츠 와이드 여성 pants" }),
  M({ key: "w-semi-bootcut", gender: "women", line: "denim", sub: "semi-bootcut", name: "여성 세미 부츠컷 데님", nameEn: "Women's Semi Bootcut Denim", tagline: "발등을 덮는 은은한 부츠컷", kind: "trousers", variant: "jeans", price: 229000, sizeRun: "women-bottom",
    colors: [MID_BLUE], materialTitle: "부드러운 12oz 데님", material: "Cotton 99% Polyurethane 1%",
    desc: "무릎 아래로 살짝 퍼지는 세미 부츠컷 데님입니다.", keywords: "데님 청바지 부츠컷 jeans" }),
  M({ key: "w-straight-denim", gender: "women", line: "denim", sub: "straight", name: "여성 스트레이트 데님", nameEn: "Women's Straight Denim", tagline: "곧게 떨어지는 짙은 데님", kind: "trousers", variant: "jeans", price: 219000, best: true, sizeRun: "women-bottom",
    colors: [BLUE_BLACK], materialTitle: "13oz 데님", material: "Cotton 100%",
    desc: "곧게 떨어지는 스트레이트 데님입니다.", keywords: "데님 청바지 jeans" }),
  M({ key: "w-semi-wide-denim", gender: "women", line: "denim", sub: "semi-wide", name: "여성 세미 와이드 데님", nameEn: "Women's Semi Wide Denim", tagline: "가볍게 퍼지는 연청 데님", kind: "trousers", variant: "wide", price: 229000, sizeRun: "women-bottom",
    colors: [{ ko: "라이트 블루", hex: "#8aa2c2", tone: 2 }], materialTitle: "12oz 데님", material: "Cotton 100%",
    desc: "허벅지부터 가볍게 퍼지는 세미 와이드 데님입니다.", keywords: "데님 청바지 와이드 jeans" }),
  M({ key: "w-halfmoon-bag", gender: "women", line: "accessories", name: "여성 레더 하프문 백", nameEn: "Women's Leather Half Moon Bag", tagline: "어깨에 둥글게 감기는 가방", kind: "bag", price: 590000, sizeRun: "free",
    colors: [BLACK, { ko: "탄", hex: "#a0703f", tone: 1 }], materialTitle: "부드러운 소가죽", material: "Cowhide 100%",
    desc: "어깨에 둥글게 감기는 하프문 숄더백입니다.", keywords: "가방 숄더백 여성 bag" }),

  // ── Upcoming (shown, not orderable) ───────────────────────────────
  M({ key: "cashmere-double-coat", gender: "men", line: "outerwear", sub: "coats", name: "캐시미어 더블 코트", nameEn: "Cashmere Double Coat", tagline: "올겨울 가장 먼저 만나는 코트", kind: "coat", price: 1390000, upcoming: true,
    colors: [NAVY, CAMEL], materialTitle: "캐시미어 100%", material: "Cashmere 100%",
    desc: "정식 출시 전 미리 공개하는 캐시미어 더블 코트입니다.", keywords: "코트 캐시미어 출시예정 coat" }),
  M({ key: "alpaca-knit", gender: "men", line: "knitwear", sub: "crew-neck", name: "알파카 브러시드 니트", nameEn: "Alpaca Brushed Knit", tagline: "털을 일으킨 포근한 알파카", kind: "knit", price: 329000, upcoming: true,
    colors: [OATMEAL], materialTitle: "브러시드 알파카", material: "Alpaca 70% Wool 30%",
    desc: "정식 출시 전 미리 공개하는 알파카 니트입니다.", keywords: "니트 알파카 출시예정 knit" }),
  M({ key: "w-alpaca-coat", gender: "women", line: "outerwear", name: "여성 알파카 하프 코트", nameEn: "Women's Alpaca Half Coat", tagline: "가볍게 부푼 알파카 코트", kind: "coat", price: 890000, upcoming: true, sizeRun: "women-top",
    colors: [IVORY], materialTitle: "알파카 블렌드", material: "Alpaca 60% Wool 40%",
    desc: "정식 출시 전 미리 공개하는 하프 코트입니다.", keywords: "코트 알파카 출시예정 coat" }),
  M({ key: "w-mohair-cardigan", gender: "women", line: "knitwear", name: "여성 모헤어 가디건", nameEn: "Women's Mohair Cardigan", tagline: "가볍게 걸치는 모헤어", kind: "knit", variant: "cardigan", price: 359000, upcoming: true, sizeRun: "women-top",
    colors: [{ ko: "피치", hex: "#e4c3ad", tone: 3 }], materialTitle: "가벼운 모헤어", material: "Mohair 60% Wool 40%",
    desc: "정식 출시 전 미리 공개하는 모헤어 가디건입니다.", keywords: "가디건 모헤어 출시예정 cardigan" }),
];

// ── Products ──────────────────────────────────────────────────────────
const SIZES: Record<SizeRun, string[]> = {
  top: ["1 (S)", "2 (M)", "3 (L)", "4 (XL)", "5 (XXL)"],
  bottom: ["28", "30", "32", "34", "36"],
  denim: ["29", "30", "31", "32", "33", "34"],
  "women-top": ["1 (S)", "2 (M)", "3 (L)"],
  "women-bottom": ["25", "26", "27", "28", "29"],
  free: ["FREE"],
};

/** Small stable hash (FNV-1a) so the pseudo metrics never change between builds. */
export function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const slug = (ko: string) =>
  ({ 블랙: "black", 차콜: "charcoal", 네이비: "navy", 아이보리: "ivory", 화이트: "white", 카멜: "camel", 브라운: "brown", 오트밀: "oatmeal" } as Record<string, string>)[ko] ??
  `c${(hash(ko) % 9000) + 1000}`;

export const PRODUCTS: Product[] = MODELS.flatMap((m, mi) => {
  const ids = m.colors.map((c) => `${m.key}-${slug(c.ko)}`);
  const swatches = m.colors.map((c, i) => ({ id: ids[i], color: c.hex, name: c.ko, tone: c.tone ?? 0 }));
  const sizeRun = m.sizeRun ?? (m.line === "trousers" ? "bottom" : m.line === "denim" ? "denim" : "top");
  return m.colors.map((c, ci) => {
    const id = ids[ci];
    const h = hash(id);
    const sizes = SIZES[sizeRun];
    return {
      id,
      model: m.key,
      gender: m.gender,
      line: m.line,
      sub: m.sub,
      name: m.name,
      prefix: m.prefix,
      nameEn: m.nameEn,
      tagline: m.tagline,
      colorName: c.ko,
      price: m.price,
      kind: m.kind,
      variant: m.variant,
      color: c.hex,
      tone: c.tone ?? 0,
      isNew: !!m.isNew,
      essential: !!m.essential,
      best: !!m.best,
      upcoming: !!m.upcoming,
      soldOut: !m.upcoming && h % 23 === 0,
      sizeRun,
      sizes,
      soldOutSizes: sizes.length > 2 && h % 3 === 0 ? [sizes[sizes.length - 1]] : [],
      swatches,
      material: m.material,
      materialTitle: m.materialTitle,
      desc: m.desc,
      keywords: `${m.name} ${m.nameEn} ${c.ko} ${m.keywords ?? ""}`.toLowerCase(),
      rating: m.upcoming ? 0 : (45 + (h % 6)) / 10,
      reviews: m.upcoming || h % 9 === 0 ? 0 : 3 + (h % 120),
      sales: m.upcoming ? 0 : (m.best ? 600 : 0) + (h % 500),
      order: MODELS.length - mi + (m.isNew ? 200 : 0),
    };
  });
});

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export const getProduct = (id: string) => BY_ID.get(id);

// ── Category tree ─────────────────────────────────────────────────────
// The reference builds its menus, list headers, LNB and section rows from one
// navigation array (gnb_datas.js); this tree plays that part.

export type CategoryNode = {
  /** Full shop path, e.g. "men/knitwear/crew-neck". */
  path: string;
  name: string;
  /** Category copy above the grid. Each string is one line. */
  desc: string[];
  /** Feature tile at the start of the grid (and the mobile banner). */
  feature?: { title: string; scene: Scene };
  /** Third-level row. The first entry is the node itself ("모두 보기"). */
  sections?: CategoryNode[];
  match: (p: Product) => boolean;
};

export type CategoryTop = {
  key: "men" | "women" | "upcoming";
  name: string;
  regulars: CategoryNode[];
  subs: CategoryNode[];
};

const forGender = (g: "men" | "women") => (p: Product) => !p.upcoming && (p.gender === g || p.gender === "unisex");

function node(
  path: string,
  name: string,
  desc: string[],
  match: (p: Product) => boolean,
  extra: Partial<Pick<CategoryNode, "feature" | "sections">> = {},
): CategoryNode {
  return { path, name, desc, match, ...extra };
}

/** Third-level children: "모두 보기" (the parent itself) and one node per entry. */
function sections(parent: string, desc: string[], base: (p: Product) => boolean, entries: [string, string, (p: Product) => boolean][]) {
  return [
    node(parent, "모두 보기", desc, base),
    ...entries.map(([key, name, m]) => node(`${parent}/${key}`, name, desc, (p) => base(p) && m(p))),
  ];
}

const sub = (key: string) => (p: Product) => p.sub === key;
const line = (key: Product["line"]) => (p: Product) => p.line === key;

function genderTop(g: "men" | "women"): CategoryTop {
  const ko = g === "men" ? "남성" : "여성";
  const base = forGender(g);
  const is = (m: (p: Product) => boolean) => (p: Product) => base(p) && m(p);

  const newDesc =
    g === "men"
      ? ["슬로운은 매일의 출근길에서 옷이 가장 편안한 도구가 되기를 바랍니다.", "소프트 테일러링으로 격식과 활동성이 함께하는 가을/겨울 26 남성 신제품을 만나보세요."]
      : ["부드럽게 흐르는 실루엣과 정제된 테일러링으로 편안함과 단정함을 함께 담은", "가을/겨울 26 여성 신제품을 만나보세요."];
  const newLines: [string, string, (p: Product) => boolean][] =
    g === "men"
      ? [
          ["knitwear", "니트웨어와 저지", line("knitwear")],
          ["shirts", "셔츠", line("shirts")],
          ["tops", "상의 및 티셔츠", line("tops")],
          ["tailoring", "테일러링과 수트", line("tailoring")],
          ["outerwear", "코트와 재킷", line("outerwear")],
          ["trousers", "팬츠", line("trousers")],
          ["denim", "데님", line("denim")],
          ["accessories", "액세서리", line("accessories")],
        ]
      : [
          ["knitwear", "니트웨어와 저지", line("knitwear")],
          ["shirts", "셔츠", line("shirts")],
          ["tailoring", "테일러링과 수트", line("tailoring")],
          ["outerwear", "코트와 재킷", line("outerwear")],
          ["dresses", "원피스", line("dresses")],
          ["skirts", "스커트", line("skirts")],
          ["trousers", "팬츠", line("trousers")],
          ["denim", "데님", line("denim")],
          ["accessories", "액세서리", line("accessories")],
        ];
  const isNew = is((p) => p.isNew);

  const regulars = [
    node(`${g}/new`, "신제품", newDesc, isNew, { sections: sections(`${g}/new`, newDesc, isNew, newLines) }),
    node(
      `${g}/essential`,
      "에센셜",
      ["일상의 중요한 순간에 더 집중할 수 있도록 섬세하게 고른 에센셜 라인업을 경험해 보세요."],
      is((p) => p.essential),
      { feature: { title: g === "men" ? "오래 입는 기본" : "단정한 기본", scene: { kind: "fold", mood: "paper", items: [{ kind: "knit", color: "#cbbfa9", tone: 1 }] } } },
    ),
    node(
      `${g}/best`,
      "베스트",
      [`매주 새롭게 업데이트되는 슬로운 ${ko} 베스트 아이템을 만나보세요.`, "가장 많은 분들이 선택한 소재와 실루엣을 한곳에 모았습니다."],
      is((p) => p.best),
      { feature: { title: `${ko} 베스트`, scene: { kind: "rail", mood: "warm", items: [{ kind: "coat", color: "#6d6e70" }, { kind: "jacket", color: "#23293a" }, { kind: "shirt", color: "#f4f2ee" }] } } },
    ),
  ];

  const allDesc =
    g === "men"
      ? ["남성 전 제품을 한곳에서 만나보세요. 좋은 소재와 섬세한 패턴으로 완성한 편안한 착용감이", "하루를 가볍게 합니다.", "출근길부터 여유로운 주말까지, 슬로운과 함께 더 나은 하루를 완성해 보세요."]
      : ["슬로운의 여성 전 제품을 만나보실 수 있습니다."];

  const lines: CategoryNode[] =
    g === "men"
      ? [
          node(`${g}/all`, "모두 보기", allDesc, base, {
            feature: { title: "남성 모두보기", scene: { kind: "hanger", mood: "paper", items: [{ kind: "blouson", variant: "leather", color: "#1c1c1d" }] } },
          }),
          (() => {
            const d = ["가장 좋은 원사가 주는 본연의 부드러움에 집중했습니다. 공기처럼 가볍고 유연한 니트는", "몸의 곡선을 따라 흐르며, 모든 움직임을 여유롭고 단정하게 만듭니다.", "소재의 힘만으로 완성되는 존재감을 확인해 보세요."];
            const b = is(line("knitwear"));
            return node(`${g}/knitwear`, "니트웨어와 저지", d, b, {
              feature: { title: "깊이 있는 편안함", scene: { kind: "fold", mood: "warm", items: [{ kind: "knit", color: "#1c1c1d" }] } },
              sections: sections(`${g}/knitwear`, d, b, [
                ["crew-neck", "크루넥", sub("crew-neck")],
                ["v-neck", "브이넥", sub("v-neck")],
                ["polo", "폴로 셔츠", sub("polo")],
                ["cardigan", "가디건", sub("cardigan")],
                ["hoodie-zip", "후디&집업", sub("hoodie-zip")],
                ["turtleneck", "터틀넥", sub("turtleneck")],
                ["sweatshirt", "스웻 셔츠", sub("sweatshirt")],
                ["short-sleeve", "반팔 니트", sub("short-sleeve")],
              ]),
            });
          })(),
          node(`${g}/tailoring`, "테일러링과 수트", ["어깨의 힘을 덜어낸 소프트 테일러링. 재킷과 수트를 셔츠처럼 편안하게 입어 보세요."], is(line("tailoring"))),
          (() => {
            const d = ["계절이 바뀌는 순간을 함께하는 코트와 재킷. 가볍게 걸쳐도 형태가 무너지지 않도록 소재와 심지를 고릅니다."];
            const b = is(line("outerwear"));
            return node(`${g}/outerwear`, "코트와 재킷", d, b, {
              sections: sections(`${g}/outerwear`, d, b, [
                ["jackets", "재킷", sub("jackets")],
                ["denim-jackets", "데님 재킷", sub("denim-jackets")],
                ["vests", "베스트", sub("vests")],
                ["leather", "레더 재킷", sub("leather")],
                ["coats", "코트", sub("coats")],
                ["down", "다운", sub("down")],
              ]),
            });
          })(),
          (() => {
            const d = ["구김을 덜고 움직임을 더한 셔츠. 출근길의 비즈니스 셔츠부터 주말의 루즈드 셔츠까지 핏별로 골라 보세요."];
            const b = is(line("shirts"));
            return node(`${g}/shirts`, "셔츠", d, b, {
              sections: sections(`${g}/shirts`, d, b, [
                ["comfort", "컴포트 셔츠", sub("comfort")],
                ["button-down", "버튼다운 셔츠", sub("button-down")],
                ["business", "비즈니스 셔츠", sub("business")],
                ["standard", "스탠다드 셔츠", sub("standard")],
                ["regular", "레귤러 셔츠", sub("regular")],
                ["loose", "루즈드 셔츠", sub("loose")],
                ["short-sleeve", "반팔 셔츠", sub("short-sleeve")],
              ]),
            });
          })(),
          node(`${g}/tops`, "상의 및 티셔츠", ["재킷 안에서도, 한 장으로도 단정한 티셔츠와 상의를 만나보세요."], is(line("tops"))),
          (() => {
            const d = ["허리부터 밑단까지 핏을 나눠 만든 팬츠. 기장 수선은 구매 후 1년 동안 무료로 맞춰 드립니다."];
            const b = is(line("trousers"));
            return node(`${g}/trousers`, "팬츠", d, b, {
              sections: sections(`${g}/trousers`, d, b, [
                ["tapered", "테이퍼드 핏", sub("tapered")],
                ["straight", "스트레이트 핏", sub("straight")],
                ["wide", "와이드 핏", sub("wide")],
                ["slacks", "슬랙스", sub("slacks")],
                ["shorts", "쇼츠", sub("shorts")],
              ]),
            });
          })(),
          (() => {
            const d = ["한 번만 세탁해 원단의 색을 살린 데님. 입을수록 몸에 맞게 길드는 과정을 즐겨 보세요."];
            const b = is(line("denim"));
            return node(`${g}/denim`, "데님", d, b, {
              sections: sections(`${g}/denim`, d, b, [
                ["comfort", "컴포트 핏", sub("comfort")],
                ["straight", "스트레이트 핏", sub("straight")],
                ["wide", "와이드 핏", sub("wide")],
              ]),
            });
          })(),
          node(`${g}/accessories`, "액세서리", ["차림을 마무리하는 벨트와 가방, 머플러를 만나보세요."], is(line("accessories"))),
        ]
      : [
          node(`${g}/all`, "모두 보기", allDesc, base, {
            feature: { title: "여성 모두보기", scene: { kind: "hanger", mood: "stone", items: [{ kind: "coat", color: "#a98458" }] } },
          }),
          node(`${g}/knitwear`, "니트웨어와 저지", ["피부에 닿는 순간부터 부드러운 니트와 저지를 만나보세요."], is(line("knitwear"))),
          node(`${g}/tailoring`, "테일러링과 수트", ["어깨를 덜어낸 부드러운 재킷과 같은 원단의 팬츠로 셋업을 완성해 보세요."], is(line("tailoring"))),
          node(`${g}/outerwear`, "코트와 재킷", ["가볍게 걸쳐도 형태가 무너지지 않는 코트와 재킷."], is(line("outerwear"))),
          node(`${g}/shirts`, "셔츠", ["은은하게 흐르는 블라우스부터 넉넉한 오버 셔츠까지."], is(line("shirts"))),
          node(`${g}/tops`, "상의 및 티셔츠", ["니트 안에 받쳐 입는 얇은 티셔츠와 상의."], is(line("tops"))),
          node(`${g}/dresses`, "원피스", ["한 벌로 완성되는 원피스."], is(line("dresses"))),
          node(`${g}/skirts`, "스커트", ["걸을 때마다 움직이는 스커트."], is(line("skirts"))),
          node(`${g}/trousers`, "팬츠", ["바닥까지 흐르는 와이드 팬츠와 단정한 슬랙스."], is(line("trousers"))),
          (() => {
            const d = ["발등을 덮는 부츠컷부터 가볍게 퍼지는 세미 와이드까지, 핏별로 고르는 데님."];
            const b = is(line("denim"));
            return node(`${g}/denim`, "데님", d, b, {
              sections: sections(`${g}/denim`, d, b, [
                ["semi-bootcut", "세미 부츠컷", sub("semi-bootcut")],
                ["straight", "스트레이트 핏", sub("straight")],
                ["semi-wide", "세미 와이드 핏", sub("semi-wide")],
              ]),
            });
          })(),
          node(`${g}/accessories`, "액세서리", ["차림을 마무리하는 가방과 머플러."], is(line("accessories"))),
        ];

  return { key: g, name: ko, regulars, subs: lines };
}

const upcomingDesc = [
  "슬로운의 새로운 제품을 정식 출시에 앞서 미리 공개하는 공간입니다.",
  "현재 모든 제품은 출시 전으로 구매하실 수 없으며, 알림을 신청하시면 출시 소식을 가장 먼저 전해드립니다.",
];

export const CATEGORY_TOPS: CategoryTop[] = [
  genderTop("men"),
  genderTop("women"),
  {
    key: "upcoming",
    name: "출시 예정",
    regulars: [
      node("upcoming/men", "남성", upcomingDesc, (p) => p.upcoming && p.gender !== "women"),
      node("upcoming/women", "여성", upcomingDesc, (p) => p.upcoming && p.gender !== "men"),
    ],
    subs: [],
  },
];

export type CategoryMatch = {
  top: CategoryTop;
  /** The node the path points at. */
  node: CategoryNode;
  /** LNB entry to mark as current (the second-level owner of the node). */
  lnb: CategoryNode;
  /** Section row (third level) shown under the LNB, if any. */
  sections?: CategoryNode[];
};

const ALL_MATCHES: CategoryMatch[] = CATEGORY_TOPS.flatMap((top) =>
  [...top.regulars, ...top.subs].flatMap((n) => {
    const own: CategoryMatch = { top, node: n, lnb: n, sections: n.sections };
    const kids = (n.sections ?? []).slice(1).map((s) => ({ top, node: s, lnb: n, sections: n.sections }));
    return [own, ...kids];
  }),
);

export const findCategory = (path: string) => ALL_MATCHES.find((m) => m.node.path === path);

export const allCategoryPaths = () => ALL_MATCHES.map((m) => m.node.path);

export const shopHref = (path: string) => `/shop/${path}/`;

export const productHref = (id: string) => `/product/${id}/`;

export function productsIn(n: CategoryNode) {
  return PRODUCTS.filter(n.match);
}

export type SortKey = "popular" | "new" | "high" | "low";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "인기상품" },
  { key: "new", label: "신상품" },
  { key: "high", label: "높은 가격" },
  { key: "low", label: "낮은 가격" },
];

export function sortProducts(list: Product[], sort: SortKey | undefined) {
  const s = [...list];
  if (sort === "popular") return s.sort((a, b) => b.sales - a.sales);
  if (sort === "high") return s.sort((a, b) => b.price - a.price || b.order - a.order);
  if (sort === "low") return s.sort((a, b) => a.price - b.price || b.order - a.order);
  // Default order: newest first, colourways of a model kept together.
  return s.sort((a, b) => b.order - a.order);
}

/** Products shown under "추천 상품" on a product page. */
export function recommendedFor(p: Product) {
  const pool = PRODUCTS.filter((x) => x.model !== p.model && !x.upcoming && (x.gender === p.gender || x.gender === "unisex" || p.gender === "unisex"));
  const h = hash(p.id);
  return [...pool].sort((a, b) => ((hash(a.id) ^ h) % 997) - ((hash(b.id) ^ h) % 997)).slice(0, 4);
}

/** Search the way the reference store does: any word in the name or keywords. */
export function searchProducts(keyword: string) {
  const words = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return PRODUCTS.filter((p) => words.every((w) => p.keywords.includes(w)));
}
