// Brand-level values shared by every page. Swap the placeholders for real data.

export const SITE = {
  brand: "SLOWN",
  brandKo: "슬로운",
  tagline: "The suit that takes its time.",
  taglineKo: "천천히, 정확하게 짓습니다.",
  company: "상호명 슬로운 테일러",
  ceo: "대표자 이현승",
  copyright: "© 2026 SLOWN. All rights reserved.",
  bookingUrl: "#booking",
  contact: {
    phone: "02-0000-0000",
    phoneHref: "tel:+82-2-0000-0000",
    email: "hello@slown.example",
    address: "중부대로 80 103동 상가 1층 42호",
    hoursLabel: "운영시간",
    hours: "10:00–19:00",
    hoursNote: " · 100% 예약제",
    instagram: "@slown.tailor",
    instagramHref: "#instagram",
  },
} as const;

export const CTA = {
  booking: "상담 예약",
  pricing: "가격 보기",
} as const;

export const NAV_LINKS = [
  { label: "Reviews", href: "/#reviews" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const FOOTER_MENU = [
  { label: "Reviews", href: "/#reviews" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Booking", href: SITE.bookingUrl },
] as const;

export const PROMISES = [
  { label: "추가금 0원", desc: "정찰제 그대로, 추가 비용은 없습니다." },
  { label: "강요 없음", desc: "필요한 구성만, 권하지 않습니다." },
  { label: "부가세 포함", desc: "표시 가격에 부가세가 포함됩니다." },
] as const;

export const REASONS = [
  { from: "상담·제작 자동화 시스템", to: "디렉터 수작업 시간 단축" },
  { from: "패턴 자동 생성·가봉 최소화", to: "재방문·수정 비용 절감" },
  { from: "웨딩 플랫폼 입점 없음", to: "중개 수수료 0원" },
  { from: "데이터 기반 마케팅", to: "광고비 거품 제거" },
] as const;
