// Campaign, lookbook and journal entries (reference: /magazine/*.html and the
// season pages they link to). Titles, copy and dates are placeholders; each
// cover is a drawn scene.
import { PRODUCTS } from "./catalog";
import type { Product, Scene } from "./types";

export type MagazineKind = "campaign" | "lookbook" | "journal";

export type MagazineEntry = {
  kind: MagazineKind;
  slug: string;
  title: string;
  titleKo: string;
  cover: Scene;
  /** Short copy used on the detail page. */
  lead: string;
  body: string;
  /** Products the lookbook / journal points to. */
  collection: "men" | "women" | "all";
};

const E = (e: MagazineEntry) => e;

export const CAMPAIGNS: MagazineEntry[] = [
  E({ kind: "campaign", slug: "26aw-as-usual", title: "As usual : Every morning.", titleKo: "겨울 26 캠페인", cover: { kind: "rail", mood: "cool", items: [{ kind: "coat", color: "#6d6e70" }, { kind: "blouson", variant: "leather", color: "#1c1c1d" }, { kind: "jacket", color: "#252c3e" }] }, collection: "men",
    lead: "아침 옷장 앞에서 망설임 없이 손이 가는 편안함.", body: "출근길의 시작부터 집중하는 낮, 그리고 퇴근 후 여유로운 저녁까지. 애써 드러내지 않아도 늘 그래왔듯, 슬로운은 당신의 일과 일상에 조용히 스며드는 테일러링입니다." }),
  E({ kind: "campaign", slug: "26ss-campaign", title: "SPRING SUMMER CAMPAIGN", titleKo: "봄, 여름 26 캠페인", cover: { kind: "facade", mood: "warm", items: [{ kind: "shirt", color: "#f4f2ee" }] }, collection: "all",
    lead: "햇빛이 길어지는 계절의 가벼운 테일러링.", body: "린넨과 트로피컬 울, 바람이 지나가는 소재로 봄과 여름의 출근길을 가볍게 만들었습니다." }),
  E({ kind: "campaign", slug: "essential-26", title: "ESSENTIAL 26", titleKo: "에센셜 26", cover: { kind: "fold", mood: "paper", items: [{ kind: "knit", color: "#cbbfa9" }] }, collection: "all",
    lead: "매일 입는 옷이 가장 좋아야 한다는 생각.", body: "셔츠와 니트, 팬츠와 재킷. 한 해 내내 꺼내 입는 에센셜 라인업을 다시 정리했습니다." }),
  E({ kind: "campaign", slug: "atelier-notes", title: "ATELIER NOTES", titleKo: "작업실의 기록", cover: { kind: "atelier", mood: "warm", items: [{ kind: "jacket", color: "#3d3d40" }] }, collection: "men",
    lead: "재단대 위에서 한 벌이 완성되기까지.", body: "패턴을 뜨고 원단을 고르고 가봉을 거치는 동안, 우리가 가장 오래 고민하는 것들을 기록했습니다." }),
  E({ kind: "campaign", slug: "25aw-campaign", title: "AUTUMN WINTER 25", titleKo: "가을, 겨울 25 캠페인", cover: { kind: "hanger", mood: "dusk", items: [{ kind: "coat", color: "#a98458" }] }, collection: "all",
    lead: "해가 짧아지는 계절의 단단한 코트.", body: "멜톤과 캐시미어, 겨울을 오래 함께할 코트를 소개합니다." }),
  E({ kind: "campaign", slug: "25ss-men", title: "SPRING SUMMER 25 MEN", titleKo: "봄, 여름 25 남성", cover: { kind: "interior", mood: "stone", items: [{ kind: "jacket", color: "#23293a" }] }, collection: "men",
    lead: "가볍게 걸치는 소프트 재킷.", body: "어깨의 힘을 덜어낸 재킷과 셔츠로 봄의 출근길을 채웠습니다." }),
  E({ kind: "campaign", slug: "24aw-campaign", title: "WINTER 24 CAMPAIGN", titleKo: "겨울 24 캠페인", cover: { kind: "fabric", mood: "dusk", items: [{ kind: "coat", color: "#3d3d40" }] }, collection: "all",
    lead: "손끝으로 먼저 느끼는 겨울.", body: "원단을 고르는 일부터 시작한 겨울 컬렉션." }),
  E({ kind: "campaign", slug: "24ss-campaign", title: "SPRING SUMMER 24", titleKo: "봄, 여름 24 캠페인", cover: { kind: "rail", mood: "paper", items: [{ kind: "shirt", color: "#c4d3e6" }, { kind: "shirt", color: "#f4f2ee" }, { kind: "tee", color: "#e2dac8" }] }, collection: "all",
    lead: "셔츠 한 장의 계절.", body: "바삭한 코튼과 린넨 셔츠로 채운 봄과 여름." }),
  E({ kind: "campaign", slug: "23aw-campaign", title: "AUTUMN WINTER 23", titleKo: "가을, 겨울 23 캠페인", cover: { kind: "facade", mood: "stone", flip: true, items: [{ kind: "coat", color: "#232a3c" }] }, collection: "all",
    lead: "도시의 오래된 건물 사이에서.", body: "단정한 코트와 수트로 기록한 가을과 겨울." }),
];

export const LOOKBOOKS: MagazineEntry[] = [
  E({ kind: "lookbook", slug: "26aw-winter-men", title: "WINTER 26 MEN", titleKo: "겨울 26 남성", cover: { kind: "outfit", mood: "paper", items: [{ kind: "coat", color: "#7d6f5e" }, { kind: "trousers", color: "#5a2f2c" }, { kind: "shoes", color: "#1c1c1d" }] }, collection: "men",
    lead: "Look 01", body: "소재를 향한 타협 없는 고집과 옷장 앞의 고민을 지우는 편안함. 도심의 출근길부터 저녁의 깊은 휴식까지, 애써 꾸미지 않아도 당신의 모든 순간을 정갈하게 완성합니다." }),
  E({ kind: "lookbook", slug: "26aw-winter-women", title: "WINTER 26 WOMEN", titleKo: "겨울 26 여성", cover: { kind: "outfit", mood: "stone", items: [{ kind: "coat", color: "#a98458" }, { kind: "skirt", color: "#3d3d40" }, { kind: "shoes", color: "#3d2b20" }] }, collection: "women",
    lead: "Look 01", body: "부드럽게 흐르는 코트와 니트, 단정한 스커트로 완성한 겨울 26 여성 룩북입니다." }),
  E({ kind: "lookbook", slug: "26aw-autumn-men", title: "AUTUMN 26 MEN", titleKo: "가을 26 남성", cover: { kind: "outfit", mood: "warm", items: [{ kind: "jacket", color: "#5a4434" }, { kind: "trousers", variant: "wide", color: "#232a3b" }, { kind: "shoes", color: "#3d2b20" }] }, collection: "men",
    lead: "Look 01", body: "코듀로이와 울 저지로 채운 가을 26 남성 룩북입니다." }),
  E({ kind: "lookbook", slug: "26aw-autumn-women", title: "AUTUMN 26 WOMEN", titleKo: "가을 26 여성", cover: { kind: "outfit", mood: "cool", items: [{ kind: "jacket", color: "#b6aa98" }, { kind: "trousers", variant: "wide", color: "#1c1c1d" }, { kind: "shoes", color: "#1c1c1d" }] }, collection: "women",
    lead: "Look 01", body: "소프트 테일러드 재킷과 와이드 팬츠로 완성한 가을 26 여성 룩북입니다." }),
  E({ kind: "lookbook", slug: "26ss-men", title: "SPRING SUMMER 26 MEN", titleKo: "봄, 여름 26 남성", cover: { kind: "outfit", mood: "paper", items: [{ kind: "shirt", color: "#c4d3e6" }, { kind: "trousers", variant: "tapered", color: "#bba98a" }, { kind: "shoes", color: "#5a4434" }] }, collection: "men",
    lead: "Look 01", body: "셔츠와 치노로 가볍게 완성한 봄, 여름 26 남성 룩북입니다." }),
  E({ kind: "lookbook", slug: "26ss-women", title: "SPRING SUMMER 26 WOMEN", titleKo: "봄, 여름 26 여성", cover: { kind: "outfit", mood: "warm", items: [{ kind: "shirt", variant: "bow", color: "#ebe5d6" }, { kind: "skirt", color: "#a98458" }, { kind: "shoes", color: "#1c1c1d" }] }, collection: "women",
    lead: "Look 01", body: "블라우스와 플리츠 스커트로 완성한 봄, 여름 26 여성 룩북입니다." }),
];

export const JOURNALS: MagazineEntry[] = [
  E({ kind: "journal", slug: "26aw-pure-origin", title: "In the City, We Wear Pure Origin.", titleKo: "본질로 채운 도시의 실루엣", cover: { kind: "hanger", mood: "warm", items: [{ kind: "blouson", color: "#3d3d40" }] }, collection: "all",
    lead: "도심의 일상 속, 우리가 입는 것은 소재 그 자체입니다.", body: "타협 없이 고른 울과 캐시미어, 그리고 공기처럼 가벼운 다운의 온기. 겹쳐 입을수록 옷감 사이로 은은한 깊이가 차오르는 실루엣. 슬로운은 매일의 도심을 가로지르는 당신을 위한, 가장 정제된 테일러링입니다." }),
  E({ kind: "journal", slug: "denim-in-form", title: "DENIM, IN FORM", titleKo: "데님 실루엣의 기준", cover: { kind: "fold", mood: "cool", items: [{ kind: "trousers", variant: "jeans", color: "#4a6488" }] }, collection: "all",
    lead: "핏별로 다시 정리한 데님.", body: "컴포트, 스트레이트, 와이드. 몸에 맞는 데님을 고르는 기준을 정리했습니다." }),
  E({ kind: "journal", slug: "jersey-spectrum", title: "The New Jersey Spectrum", titleKo: "새로운 에센셜 티셔츠", cover: { kind: "rail", mood: "paper", items: [{ kind: "tee", color: "#f4f2ee" }, { kind: "tee", color: "#1c1c1d" }, { kind: "tee", color: "#a9aaac" }] }, collection: "all",
    lead: "재킷 안의 가장 얇은 옷.", body: "수피마 코튼으로 다시 만든 티셔츠 라인업." }),
  E({ kind: "journal", slug: "masterpiece", title: "MASTERPIECE", titleKo: "변치 않는 사물의 가치", cover: { kind: "atelier", mood: "stone", items: [{ kind: "coat", color: "#232a3c" }] }, collection: "men",
    lead: "오래 입을수록 좋아지는 것들.", body: "시간이 지나도 변하지 않는 옷의 가치를 이야기합니다." }),
  E({ kind: "journal", slug: "wool-cashmere-jersey", title: "The Wool-Cashmere Jersey", titleKo: "울 캐시미어 저지", cover: { kind: "fabric", mood: "warm", items: [{ kind: "knit", color: "#5a4434" }] }, collection: "all",
    lead: "니트와 저지 사이의 부드러움.", body: "울과 캐시미어를 저지로 짜 만든 가을 컬렉션." }),
  E({ kind: "journal", slug: "soft-tailoring", title: "Soft Tailoring 01", titleKo: "어깨를 덜어낸 재킷", cover: { kind: "interior", mood: "warm", items: [{ kind: "jacket", color: "#3d3d40" }] }, collection: "men",
    lead: "패드를 덜어낸 자리에 남는 것.", body: "니트처럼 편안한 재킷을 만들기까지의 과정." }),
  E({ kind: "journal", slug: "short-sleeve-knit", title: "Master Piece Collection 01. Short Sleeve", titleKo: "반팔 니트의 계절", cover: { kind: "fold", mood: "warm", items: [{ kind: "knit", variant: "polo", color: "#1c1c1d" }] }, collection: "men",
    lead: "셔츠처럼 단정한 반팔 니트.", body: "폴로 니트 한 장으로 완성하는 여름의 출근길." }),
  E({ kind: "journal", slug: "new-focus", title: "New Focus and Energy", titleKo: "새로운 집중과 에너지의 시간", cover: { kind: "facade", mood: "cool", items: [{ kind: "shirt", color: "#f4f2ee" }] }, collection: "all",
    lead: "아침의 집중을 위한 옷.", body: "하루를 시작하는 시간을 위해 만든 셔츠와 팬츠." }),
];

export const MAGAZINE = { campaign: CAMPAIGNS, lookbook: LOOKBOOKS, journal: JOURNALS } as const;

export const MAGAZINE_META: Record<MagazineKind, { label: string; list: string; detail: (slug: string) => string }> = {
  campaign: { label: "캠페인", list: "/magazine/campaign/", detail: (s) => `/campaign/${s}/` },
  lookbook: { label: "룩북", list: "/magazine/lookbook/", detail: (s) => `/lookbook/${s}/` },
  journal: { label: "저널", list: "/magazine/journal/", detail: (s) => `/journal/${s}/` },
};

export const findEntry = (kind: MagazineKind, slug: string) => MAGAZINE[kind].find((e) => e.slug === slug);

/** Products featured by an entry (for lookbook looks and "Discover" links). */
export function entryProducts(e: MagazineEntry, count = 8): Product[] {
  const pool = PRODUCTS.filter((p) => !p.upcoming && (e.collection === "all" || p.gender === e.collection || p.gender === "unisex"));
  // One colourway per model keeps the looks varied.
  const seen = new Set<string>();
  return pool.filter((p) => (seen.has(p.model) ? false : (seen.add(p.model), true))).slice(0, count);
}
