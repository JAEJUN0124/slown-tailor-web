// Brand, company and navigation values shared by every screen. The company
// details, numbers and addresses are placeholders.

export const BRAND = {
  name: "SLOWN",
  nameKo: "슬로운",
  store: "슬로운 공식 스토어",
  description: "천천히, 정확하게 짓는 데일리 테일러링",
  demoNotice: "데모 · 샘플 콘텐츠",
  /** Shown in the breadcrumbs of the search and policy screens (reference: "PTRY"). */
  short: "SLWN",
} as const;

export const COMPANY = {
  info: [
    { label: "회사명", value: "(주)슬로운" },
    { label: "대표이사", value: "김샘플" },
    { label: "주소", value: "서울특별시 성동구 샘플로 00, 0층" },
    { label: "사업자 등록번호", value: "000-00-00000" },
    { label: "통신판매업번호", value: "0000-서울성동-0000" },
  ],
  cs: {
    title: "온라인 고객센터",
    rows: [
      { label: "운영시간", value: "10:00-17:00 (주말/공휴일 휴무)" },
      { label: "점심시간", value: "12:00-13:30" },
      { label: "연락처", value: "02-0000-0000" },
    ],
  },
  phone: "02-0000-0000",
  email: "hello@slown.example",
} as const;

export type NavLink = { label: string; href: string };

/** Footer site map (reference: /works/datasets/fnb.js). */
export const FOOTER_TREE: (NavLink & { children: NavLink[] })[] = [
  {
    label: "서비스",
    href: "/shipping/",
    children: [
      { label: "배송 및 교환", href: "/shipping/" },
      { label: "수선 서비스", href: "/repairs/" },
      { label: "고객 서비스", href: "/customer-service/" },
      { label: "자주 묻는 질문", href: "/faq/" },
    ],
  },
  {
    label: "소개하기",
    href: "/about/",
    children: [
      { label: "소개하기", href: "/about/" },
      { label: "연락망", href: "/contact/" },
    ],
  },
  {
    label: "유통망",
    href: "/online/",
    children: [
      { label: "온라인", href: "/online/" },
      { label: "오프라인", href: "/offline/" },
    ],
  },
  {
    label: "혜택",
    href: "/benefit/",
    children: [{ label: "회원 전용 혜택", href: "/benefit/" }],
  },
];

/** Where the account links go while signed out (the reference sends them all to login). */
export const loginFor = (returnUrl: string, guest = false) =>
  `/member/login/?returnUrl=${encodeURIComponent(returnUrl)}${guest ? "&tab=guest" : ""}`;

/** Side menus of the info screens (reference: .tabs-menu). */
export const INFO_MENUS = {
  about: {
    title: "소개",
    links: [
      { label: "소개하기", href: "/about/" },
      { label: "가치", href: "/value/" },
      { label: "상징", href: "/symbol/" },
      { label: "연락망", href: "/contact/" },
      { label: "채용", href: "/recruit/" },
    ],
  },
  channel: {
    title: "유통망",
    links: [
      { label: "온라인", href: "/online/" },
      { label: "오프라인", href: "/offline/" },
    ],
  },
  benefit: {
    title: "혜택",
    links: [{ label: "회원 전용 혜택", href: "/benefit/" }],
  },
  service: {
    title: "서비스",
    links: [
      { label: "배송 및 교환", href: "/shipping/" },
      { label: "수선 서비스", href: "/repairs/" },
      { label: "고객 서비스", href: "/customer-service/" },
      { label: "자주 묻는 질문", href: "/faq/" },
    ],
  },
} as const;

export type InfoMenuKey = keyof typeof INFO_MENUS;

/** Account side menu of the board and my-shop screens. */
export const ACCOUNT_MENU: { title: string; links: NavLink[] }[] = [
  {
    title: "고객 정보",
    links: [
      { label: "회원정보 수정", href: loginFor("/member/modify/") },
      { label: "배송지 정보", href: loginFor("/myshop/address/") },
      { label: "적립금", href: loginFor("/myshop/mileage/") },
      { label: "쿠폰", href: loginFor("/myshop/coupon/") },
    ],
  },
  {
    title: "주문내역",
    links: [
      { label: "주문내역", href: loginFor("/myshop/orders/", true) },
      { label: "교환/반품 내역", href: loginFor("/myshop/orders/?mode=cs") },
    ],
  },
  {
    title: "리뷰 및 질문",
    links: [
      { label: "리뷰 작성", href: loginFor("/myshop/reviews/") },
      { label: "자주 묻는 질문", href: "/myshop/faq/" },
    ],
  },
];

/** Bottom links of the mobile menu. */
export const MOBILE_MENU_LINKS: NavLink[] = [
  { label: "로그인", href: "/member/login/" },
  { label: "고객 서비스", href: "/shipping/" },
  { label: "매장 정보", href: "/offline/" },
];
