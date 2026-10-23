// Sample store directory for 매장찾기. Every store, address and number is
// made up; the map is drawn, not fetched.

export type StoreService = "픽업" | "교환" | "반품" | "멤버십포인트 사용";

export type Store = {
  id: string;
  name: string;
  type: "백화점" | "아울렛" | "일반매장";
  brand: string;
  region: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  services: StoreService[];
  /** Pin position on the drawn map, 0–100. */
  pin: [number, number];
};

export const STORE_SERVICES: StoreService[] = ["픽업", "교환", "반품", "멤버십포인트 사용"];

const S = (s: Store) => s;

export const STORES: Store[] = [
  S({ id: "s01", name: "SLOWN 성수 플래그십", type: "일반매장", brand: "SLOWN", region: "서울특별시", district: "성동구", address: "서울특별시 성동구 샘플로 12, 1~2층", hours: "11:00~21:00", phone: "02-000-0101", services: ["픽업", "교환", "반품", "멤버십포인트 사용"], pin: [62, 40] }),
  S({ id: "s02", name: "SLOWN 샘플백화점 본점", type: "백화점", brand: "SLOWN", region: "서울특별시", district: "중구", address: "서울특별시 중구 예시대로 81, 본관 4층", hours: "10:30~20:00", phone: "02-000-0102", services: ["픽업", "교환", "멤버십포인트 사용"], pin: [40, 52] }),
  S({ id: "s03", name: "SLOWN 샘플백화점 강남점", type: "백화점", brand: "SLOWN", region: "서울특별시", district: "강남구", address: "서울특별시 강남구 견본로 176, 5층", hours: "10:30~20:00", phone: "02-000-0103", services: ["픽업", "교환", "반품", "멤버십포인트 사용"], pin: [70, 66] }),
  S({ id: "s04", name: "SLOWN 한남", type: "일반매장", brand: "SLOWN", region: "서울특별시", district: "용산구", address: "서울특별시 용산구 시안길 34", hours: "11:00~20:00", phone: "02-000-0104", services: ["교환", "멤버십포인트 사용"], pin: [52, 58] }),
  S({ id: "s05", name: "SLOWN 여의도", type: "백화점", brand: "SLOWN", region: "서울특별시", district: "영등포구", address: "서울특별시 영등포구 모형로 108, 3층", hours: "10:30~20:30", phone: "02-000-0105", services: ["픽업", "멤버십포인트 사용"], pin: [30, 56] }),
  S({ id: "s06", name: "SLOWN 판교", type: "백화점", brand: "SLOWN", region: "경기도", district: "성남시", address: "경기도 성남시 분당구 샘플판교로 146, 4층", hours: "10:30~20:00", phone: "031-000-0106", services: ["픽업", "교환", "반품", "멤버십포인트 사용"], pin: [58, 70] }),
  S({ id: "s07", name: "SLOWN 프리미엄 아울렛 여주", type: "아울렛", brand: "SLOWN", region: "경기도", district: "여주시", address: "경기도 여주시 예시로 360, WEST 2층", hours: "10:30~21:00", phone: "031-000-0107", services: ["멤버십포인트 사용"], pin: [74, 48] }),
  S({ id: "s08", name: "SLOWN 수원", type: "백화점", brand: "SLOWN", region: "경기도", district: "수원시", address: "경기도 수원시 팔달구 견본대로 924, 3층", hours: "10:30~20:00", phone: "031-000-0108", services: ["픽업", "교환", "멤버십포인트 사용"], pin: [44, 62] }),
  S({ id: "s09", name: "SLOWN 일산", type: "백화점", brand: "SLOWN", region: "경기도", district: "고양시", address: "경기도 고양시 일산동구 시안로 1036, 2층", hours: "10:30~20:00", phone: "031-000-0109", services: ["교환", "멤버십포인트 사용"], pin: [26, 36] }),
  S({ id: "s10", name: "SLOWN 인천", type: "백화점", brand: "SLOWN", region: "인천광역시", district: "남동구", address: "인천광역시 남동구 모형로 300, 3층", hours: "10:30~20:00", phone: "032-000-0110", services: ["픽업", "멤버십포인트 사용"], pin: [24, 50] }),
  S({ id: "s11", name: "SLOWN 대전", type: "백화점", brand: "SLOWN", region: "대전광역시", district: "서구", address: "대전광역시 서구 샘플로 211, 4층", hours: "10:30~20:00", phone: "042-000-0111", services: ["교환", "반품", "멤버십포인트 사용"], pin: [48, 44] }),
  S({ id: "s12", name: "SLOWN 대구", type: "백화점", brand: "SLOWN", region: "대구광역시", district: "중구", address: "대구광역시 중구 예시로 30, 5층", hours: "10:30~20:00", phone: "053-000-0112", services: ["픽업", "교환", "멤버십포인트 사용"], pin: [56, 50] }),
  S({ id: "s13", name: "SLOWN 부산 센텀", type: "백화점", brand: "SLOWN", region: "부산광역시", district: "해운대구", address: "부산광역시 해운대구 견본로 35, 3층", hours: "10:30~20:00", phone: "051-000-0113", services: ["픽업", "교환", "반품", "멤버십포인트 사용"], pin: [72, 54] }),
  S({ id: "s14", name: "SLOWN 부산 아울렛", type: "아울렛", brand: "SLOWN", region: "부산광역시", district: "기장군", address: "부산광역시 기장군 시안로 147, 1층", hours: "10:30~21:00", phone: "051-000-0114", services: ["멤버십포인트 사용"], pin: [80, 30] }),
  S({ id: "s15", name: "SLOWN 광주", type: "백화점", brand: "SLOWN", region: "광주광역시", district: "서구", address: "광주광역시 서구 모형로 932, 4층", hours: "10:30~20:00", phone: "062-000-0115", services: ["교환", "멤버십포인트 사용"], pin: [38, 60] }),
  S({ id: "s16", name: "SLOWN 제주", type: "일반매장", brand: "SLOWN", region: "제주특별자치도", district: "제주시", address: "제주특별자치도 제주시 샘플로 75", hours: "10:00~20:00", phone: "064-000-0116", services: ["멤버십포인트 사용"], pin: [50, 50] }),
  S({ id: "s17", name: "atelier·nine 성수", type: "일반매장", brand: "atelier·nine", region: "서울특별시", district: "성동구", address: "서울특별시 성동구 샘플로 20, 1층", hours: "11:00~21:00", phone: "02-000-0201", services: ["픽업", "멤버십포인트 사용"], pin: [66, 36] }),
  S({ id: "s18", name: "LUMEN 강남", type: "백화점", brand: "LUMEN", region: "서울특별시", district: "강남구", address: "서울특별시 강남구 견본로 176, 6층", hours: "10:30~20:00", phone: "02-000-0301", services: ["교환", "멤버십포인트 사용"], pin: [72, 64] }),
  S({ id: "s19", name: "PARALLEL* 한남", type: "일반매장", brand: "PARALLEL*", region: "서울특별시", district: "용산구", address: "서울특별시 용산구 시안길 50", hours: "12:00~20:00", phone: "02-000-0401", services: ["픽업", "교환", "반품", "멤버십포인트 사용"], pin: [54, 60] }),
  S({ id: "s20", name: "LUMEN 판교", type: "백화점", brand: "LUMEN", region: "경기도", district: "성남시", address: "경기도 성남시 분당구 샘플판교로 146, 2층", hours: "10:30~20:00", phone: "031-000-0302", services: ["멤버십포인트 사용"], pin: [60, 68] }),
];

export const REGIONS = [...new Set(STORES.map((s) => s.region))];

export const districtsOf = (region: string) => [...new Set(STORES.filter((s) => s.region === region).map((s) => s.district))];

export const STORE_NOTES = [
  "매장마다 다루는 브랜드가 다릅니다. 브랜드를 먼저 고른 뒤 픽업·교환·반품 매장을 찾아보세요.",
  "재고와 판매 가격은 매장마다 다를 수 있으니 방문 전에 매장으로 확인해 주세요.",
  "교환·반품이 되는 매장이라도 재고가 없으면 처리가 어렵습니다. 방문 전 재고를 꼭 확인해 주세요.",
];
