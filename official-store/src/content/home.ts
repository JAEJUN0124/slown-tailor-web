// Home page content (reference: /works/main.datas/v3/home.js → HOME_DATA).
// Same sections, order and copy lengths; SLOWN copy and drawn scenes instead
// of the reference photos.
import { productHref, shopHref } from "./catalog";
import type { Scene } from "./types";

export type HomeTab = "men" | "women";

export type HomeLink = { label: string; href: string };

export type Shot = { scene: Scene; focus?: [number, number]; focusMo?: [number, number] };

type TabCopy<T> = Record<HomeTab, T>;

export type HomeData = {
  tabs: { key: HomeTab; label: string }[];
  hero: { autoplay: boolean; interval: number; slides: { title: string; desc: string; links: HomeLink[]; shot: Shot }[] };
  philosophy: { title: string; desc: string; images: Shot[] };
  essentials: { title: string } & TabCopy<{ desc: string; items: { label: string; href: string; shot: Shot }[] }>;
  season: TabCopy<{ title: string; desc: string; cta: HomeLink; shot: Shot }>;
  arrivals: TabCopy<{ title: string; desc: string; cta: string; items: { name: string; href: string; shot: Shot }[] }>;
  store: { title: string; desc: string; ctas: HomeLink[]; shot: Shot };
};

export const HOME: HomeData = {
  tabs: [
    { key: "men", label: "Men" },
    { key: "women", label: "Women" },
  ],
  hero: {
    autoplay: true,
    interval: 5,
    slides: [
      {
        title: "The Winter Tailoring Collection",
        desc: "어깨의 힘을 덜어낸 재킷과 촘촘하게 짠 플란넬 수트. 겨울의 출근길을 완성할 테일러링 컬렉션을 만나보세요.",
        links: [
          { label: "Shop men", href: shopHref("men/tailoring") },
          { label: "Shop women", href: shopHref("women/tailoring") },
        ],
        shot: { scene: { kind: "interior", mood: "dusk", items: [{ kind: "jacket", color: "#3d3d40" }] }, focusMo: [70, 50] },
      },
      {
        title: "The Wool Coat Collection",
        desc: "촘촘하게 다진 멜톤부터 포근하게 감싸는 캐시미어까지. 한겨울까지 함께할 남성과 여성의 울 코트를 소개합니다.",
        links: [
          { label: "Shop men", href: shopHref("men/outerwear/coats") },
          { label: "Shop women", href: shopHref("women/outerwear") },
        ],
        shot: {
          scene: { kind: "rail", mood: "umber", items: [{ kind: "coat", color: "#a98458" }, { kind: "coat", color: "#6d6e70" }, { kind: "coat", color: "#232a3c" }] },
        },
      },
      {
        title: "The Leather Edit",
        desc: "결이 고운 램스킨부터 가먼트 워싱을 더한 고트스킨까지, 저마다 다른 가죽의 표정을 담았습니다.",
        links: [{ label: "Shop men", href: shopHref("men/outerwear/leather") }],
        shot: { scene: { kind: "hanger", mood: "slate", flip: true, items: [{ kind: "blouson", variant: "leather", color: "#3d2b20" }] } },
      },
    ],
  },
  philosophy: {
    title: "Philosophy",
    desc: "타협 없는 소재와 정교하게 다듬어진 실루엣. 도심을 가로지르는 현대인의 일과 일상을 위해 천천히, 정확하게 짓습니다.",
    images: [
      { scene: { kind: "atelier", mood: "warm", items: [{ kind: "jacket", color: "#3d3d40" }] } },
      { scene: { kind: "fabric", mood: "dusk", items: [{ kind: "coat", color: "#2f2f32" }] } },
    ],
  },
  essentials: {
    title: "Core Essentials",
    men: {
      desc: "좋은 소재와 정제된 실루엣. 자연스럽게 겹쳐 입고 오래도록 입을 수 있도록 엄선한 에센셜 라인업을 선보입니다.",
      items: [
        { label: "Discover Essential Shirt", href: shopHref("men/shirts"), shot: { scene: { kind: "hanger", mood: "paper", items: [{ kind: "shirt", color: "#c4d3e6" }] } } },
        { label: "Discover Essential Cashmere Knit", href: shopHref("men/knitwear"), shot: { scene: { kind: "fold", mood: "warm", items: [{ kind: "knit", color: "#1c1c1d" }] } } },
        { label: "Discover Essential Pants", href: shopHref("men/trousers"), shot: { scene: { kind: "hanger", mood: "stone", items: [{ kind: "trousers", color: "#5f6048" }] } } },
        { label: "Discover Essential Suit", href: shopHref("men/tailoring"), shot: { scene: { kind: "hanger", mood: "cool", items: [{ kind: "suit", color: "#3d3d40" }] } } },
        { label: "Discover Essential Denim", href: shopHref("men/denim"), shot: { scene: { kind: "fold", mood: "cool", items: [{ kind: "trousers", variant: "jeans", color: "#4a6488" }] } } },
      ],
    },
    women: {
      desc: "흐르는 듯한 실루엣과 단정한 소재. 매일 꺼내 입어도 질리지 않도록 고른 여성 에센셜 라인업을 소개합니다.",
      items: [
        { label: "Discover Essential Shirts", href: shopHref("women/shirts"), shot: { scene: { kind: "hanger", mood: "paper", items: [{ kind: "shirt", variant: "bow", color: "#ebe5d6" }] } } },
        { label: "Discover Essential Knit", href: shopHref("women/knitwear"), shot: { scene: { kind: "fold", mood: "warm", items: [{ kind: "knit", color: "#cbbfa9" }] } } },
        { label: "Discover Essential Denim", href: shopHref("women/denim"), shot: { scene: { kind: "fold", mood: "cool", items: [{ kind: "trousers", variant: "jeans", color: "#5b77a0" }] } } },
        { label: "Discover Essential Outer", href: shopHref("women/outerwear"), shot: { scene: { kind: "hanger", mood: "stone", items: [{ kind: "coat", color: "#a98458" }] } } },
        { label: "Discover Essential Pants", href: shopHref("women/trousers"), shot: { scene: { kind: "hanger", mood: "paper", items: [{ kind: "trousers", variant: "wide", color: "#1c1c1d" }] } } },
      ],
    },
  },
  season: {
    men: {
      title: "The Wool-Cashmere Jersey",
      desc: "원료에 대한 타협 없이, 섬세하게 짜인 울과 캐시미어의 유연한 실루엣. 도심의 일상에 편안함을 더해줄 에센셜 울 저지 라인을 만나보세요.",
      cta: { label: "Discover The Collection", href: shopHref("men/knitwear") },
      shot: { scene: { kind: "hanger", mood: "umber", items: [{ kind: "knit", variant: "zip", color: "#d8cbb5" }] } },
    },
    women: {
      title: "The Wool-Cashmere Jersey",
      desc: "부드럽게 흐르는 울과 캐시미어 저지. 니트와 셔츠 사이의 가벼운 레이어로 겨울의 일상을 채워 보세요.",
      cta: { label: "Discover The Collection", href: shopHref("women/knitwear") },
      shot: { scene: { kind: "hanger", mood: "slate", items: [{ kind: "knit", variant: "zip", color: "#ebe5d6" }] } },
    },
  },
  arrivals: {
    men: {
      title: "MEN | Most Loved",
      desc: "수많은 출근길에서 선택받은 슬로운의 대표 라인업. 소재의 정직함과 정교한 실루엣이 돋보이는 시그니처 피스를 확인해 보세요.",
      cta: "Discover",
      items: [
        { name: "Goat Leather Jacket", href: productHref("goat-leather-jacket-black"), shot: { scene: { kind: "hanger", mood: "cool", items: [{ kind: "blouson", variant: "leather", color: "#1c1c1d" }] } } },
        { name: "Wool Sports Jacket", href: productHref("wool-sports-jacket-navy"), shot: { scene: { kind: "hanger", mood: "cool", flip: true, items: [{ kind: "jacket", color: "#23293a" }] } } },
      ],
    },
    women: {
      title: "WOMEN | Most Loved",
      desc: "가장 많은 분들이 다시 찾는 여성 라인업. 부드러운 소재와 단정한 실루엣으로 매일의 차림을 완성해 보세요.",
      cta: "Discover",
      items: [
        { name: "Short Car Coat", href: productHref("w-short-car-coat-camel"), shot: { scene: { kind: "hanger", mood: "warm", items: [{ kind: "coat", color: "#a98458" }] } } },
        { name: "Cupro Silky Blouse", href: productHref("w-cupro-blouse-ivory"), shot: { scene: { kind: "hanger", mood: "paper", flip: true, items: [{ kind: "shirt", variant: "bow", color: "#ebe5d6" }] } } },
      ],
    },
  },
  store: {
    title: "Explore the Store",
    desc: "차분한 공간에서 옷을 가까이 경험해 보세요. 매장에서 시즌 컬렉션을 둘러보거나, 바쁜 일상 속 고민을 덜어줄 1:1 맞춤 스타일링 세션을 이용할 수 있습니다.",
    ctas: [{ label: "Store Locator", href: "/offline/" }],
    shot: { scene: { kind: "interior", mood: "stone", items: [{ kind: "coat", color: "#232a3c" }] } },
  },
};
