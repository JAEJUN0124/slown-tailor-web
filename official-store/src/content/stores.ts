// Offline stores and online partners (reference: /offline.html, /online.html).
// Names, addresses and numbers are placeholders.

export type Store = {
  name: string;
  nameEn: string;
  hours: string;
  address: string;
  addressEn: string;
  tel: string;
  /** Pop-up stores run for a period. */
  period?: string;
};

export const STORES: Store[] = [
  { name: "플래그십 스토어 성수", nameEn: "SLOWN Flagship Store Seongsu", hours: "10:00~21:00 (매일)", address: "서울시 성동구 샘플로 00, 1층", addressEn: "1F, 00, Sample-ro, Seongdong-gu, Seoul, KR, 00000", tel: "02-000-0001" },
  { name: "허브 스토어 합정", nameEn: "SLOWN Hub Store Hapjeong", hours: "13:00~20:00 (평일), 11:00~20:00 (토/일요일)", address: "서울시 마포구 샘플로 00, 3층", addressEn: "3F, 00, Sample-ro, Mapo-gu, Seoul, KR, 00000", tel: "02-000-0002" },
  { name: "플래그십 스토어 한남", nameEn: "SLOWN Flagship Store Hannam", hours: "13:00~20:00 (평일), 11:00~20:00 (토/일요일)", address: "서울시 용산구 샘플로 00, 1층", addressEn: "1F, 00, Sample-ro, Yongsan-gu, Seoul, KR, 00000", tel: "02-000-0003" },
  { name: "슬로운 백화점 강남점", nameEn: "SLOWN Department Store Gangnam", hours: "10:30~20:00 (월~목요일), 10:30~20:30 (금~일요일)", address: "서울시 서초구 샘플대로 00, 8층", addressEn: "8F, 00, Sample-daero, Seocho-gu, Seoul, KR, 00000", tel: "02-000-0004" },
  { name: "슬로운 백화점 센텀점", nameEn: "SLOWN Department Store Centum", hours: "10:30~20:00 (월~목요일), 10:30~20:30 (금~일요일)", address: "부산광역시 해운대구 샘플대로 00, 지하 2층", addressEn: "B2F, 00, Sample-daero, Haeundae-gu, Busan, KR, 00000", tel: "051-000-0005" },
  { name: "슬로운 판교점", nameEn: "SLOWN Pangyo", hours: "10:30~20:00 (월~목요일), 10:30~20:30 (금~일요일)", address: "경기도 성남시 분당구 샘플로 00, 3층", addressEn: "3F, 00, Sample-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, KR, 00000", tel: "031-000-0006" },
  { name: "슬로운 고양점", nameEn: "SLOWN Goyang", hours: "10:00~22:00 (매일)", address: "경기도 고양시 덕양구 샘플대로 00, 1층", addressEn: "1F, 00, Sample-daero, Deogyang-gu, Goyang-si, Gyeonggi-do, KR, 00000", tel: "031-000-0007" },
  { name: "슬로운 팝업 스토어 명동", nameEn: "SLOWN Pop-up Store Myeongdong", period: "2026-10-01 ~ 2027-01-31", hours: "10:30~20:00 (평일), 10:30~20:30 (주말)", address: "서울특별시 중구 샘플길 00, 6층", addressEn: "6F, 00, Sample-gil, Jung-gu, Seoul, KR", tel: "02-000-0008" },
];

export type Partner = { name: string; desc: string; url: string };

export const PARTNERS: Partner[] = [
  { name: "슬로운 공식 온라인 스토어", desc: "당신에게 최고의 경험을 선사해 줄 슬로운의 공식 온라인 스토어입니다.", url: "https://www.slown.example" },
  { name: "샘플 셀렉트몰", desc: "패션, 라이프스타일, 컬처까지 고유한 감각으로 소개하는 셀렉션을 경험하세요.", url: "https://select.example/home/" },
  { name: "아틀리에 편집숍", desc: "국내외 좋은 브랜드를 취급하는 편집숍입니다.", url: "https://atelier-shop.example" },
  { name: "데일리 무드", desc: "당신의 일상을 함께 나누는 공간입니다.", url: "https://daily-mood.example" },
  { name: "아일랜드 스토어", desc: "국내외 의류, 슈즈, 라이프스타일 제품을 취급하는 제주 편집숍입니다.", url: "https://island-store.example" },
  { name: "브랜드 하우스", desc: "국내외 디자이너 브랜드 편집숍입니다.", url: "https://brand-house.example" },
];
