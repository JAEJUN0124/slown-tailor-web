// Help desk samples: side menu, support channels, quick links, FAQ,
// notices and the inquiry forms. Every name, number and answer is made up.

export const CONTACT = {
  phone: "0000-0000",
  freePhone: "080-000-0000",
  hours: "평일(월~금) 9:00~18:00",
  closed: "주말 및 공휴일 휴무",
};

export type FaqItem = { q: string; a: string };
export type FaqGroup = { label: string; items: FaqItem[] };
export type FaqCategory = { slug: string; label: string; groups: FaqGroup[] };

export const FAQ: FaqCategory[] = [
  {
    slug: "product",
    label: "상품",
    groups: [
      {
        label: "상품상세문의",
        items: [
          { q: "상품 사이즈는 어떻게 고르면 되나요?", a: "상품 상세의 사이즈 탭에서 조견표를 확인해 주세요. 평소 입는 사이즈 그대로 고르셔도 대부분 맞으며, 고민되시면 상품문의나 1:1 문의로 남겨 주시면 안내해 드립니다." },
          { q: "구매할 때와 가격이 달라졌습니다.", a: "상품 가격은 시즌 할인이나 기획전에 따라 바뀔 수 있습니다. 결제가 끝난 주문은 결제 당시 가격으로 처리되며 차액은 돌려드리지 않습니다." },
          { q: "화면과 실제 색상이 다른 것 같아요.", a: "모니터 설정에 따라 색이 조금 다르게 보일 수 있습니다. 상품 상세의 제품컷이 실제 색상에 가장 가깝습니다." },
        ],
      },
      {
        label: "재고문의",
        items: [
          { q: "품절된 상품은 다시 들어오나요?", a: "재입고 여부는 상품마다 다릅니다. 상품 상세의 ‘재입고 알림 신청’을 눌러 두시면 입고될 때 알려 드립니다." },
          { q: "매장 재고를 확인할 수 있나요?", a: "매장찾기에서 매장 연락처를 확인하신 뒤 매장으로 직접 문의해 주세요." },
        ],
      },
    ],
  },
  {
    slug: "order",
    label: "주문",
    groups: [
      {
        label: "주문/결제",
        items: [
          { q: "주문 내역은 어디에서 보나요?", a: "로그인 후 마이페이지 > 주문/배송 조회에서 확인하실 수 있습니다. 비회원은 비회원 주문조회를 이용해 주세요." },
          { q: "주문을 취소하고 싶어요.", a: "상품이 출고되기 전이라면 마이페이지에서 바로 취소할 수 있습니다. 출고가 시작된 뒤에는 받으신 다음 반품으로 진행해 주세요." },
          { q: "결제 수단은 무엇이 있나요?", a: "신용카드, 실시간 계좌이체, 무통장입금, 간편결제를 쓰실 수 있습니다." },
        ],
      },
    ],
  },
  {
    slug: "exchange",
    label: "교환/반품/수선",
    groups: [
      {
        label: "교환/반품",
        items: [
          { q: "교환이나 반품은 언제까지 할 수 있나요?", a: "배송 완료 후 7일 안에 마이페이지에서 신청해 주세요. 착용하거나 가격택을 뗀 상품은 교환·반품이 어렵습니다." },
          { q: "반품 배송비는 얼마인가요?", a: "단순 변심은 편도 2,500원, 교환은 왕복 5,000원입니다. 상품 불량이나 오배송은 FOLIO SHOP이 부담합니다." },
        ],
      },
      {
        label: "수선",
        items: [{ q: "구매한 상품을 수선할 수 있나요?", a: "가까운 SLOWN 매장에 구매 내역을 보여 주시면 접수해 드립니다. 팬츠 기장 수선은 구매 후 30일 안에 무료입니다." }],
      },
    ],
  },
  {
    slug: "delivery",
    label: "배송",
    groups: [
      {
        label: "배송일정",
        items: [
          { q: "주문한 상품은 언제 받을 수 있나요?", a: "평일 오후 2시까지 결제한 주문은 그날 출고되며 보통 1~3일 안에 도착합니다." },
          { q: "빠른배송은 어떻게 이용하나요?", a: "상품 상세에서 배송방법을 빠른배송으로 고르면 됩니다. 서울 전 지역과 경기 일부 지역에서 새벽·당일·저녁 시간대를 고를 수 있습니다." },
        ],
      },
    ],
  },
  {
    slug: "service",
    label: "FOLIO SHOP 이용",
    groups: [
      {
        label: "사이트 이용",
        items: [
          { q: "찜한 상품은 어디에서 보나요?", a: "로그인 후 머리글의 하트 아이콘을 누르면 찜 목록을 볼 수 있습니다." },
          { q: "최근 본 상품은 얼마나 저장되나요?", a: "같은 브라우저에서 최근 본 상품 20개까지 오른쪽 위젯에 보여 드립니다." },
        ],
      },
    ],
  },
  {
    slug: "member",
    label: "회원",
    groups: [
      {
        label: "회원정보",
        items: [
          { q: "아이디나 비밀번호를 잊어버렸어요.", a: "로그인 화면의 아이디 찾기·비밀번호 찾기에서 가입할 때 쓴 이름과 휴대폰 번호(또는 이메일)로 찾을 수 있습니다." },
          { q: "회원 탈퇴는 어떻게 하나요?", a: "마이페이지 > 회원정보 변경에서 탈퇴할 수 있습니다. 남은 포인트와 쿠폰은 탈퇴와 함께 사라집니다." },
        ],
      },
    ],
  },
  {
    slug: "point",
    label: "포인트/할인",
    groups: [
      {
        label: "포인트",
        items: [
          { q: "멤버십포인트는 언제 쌓이나요?", a: "구매 확정 다음 날 결제 금액의 2%가 쌓입니다. 아울렛 상품은 적립되지 않습니다." },
          { q: "쿠폰과 포인트를 함께 쓸 수 있나요?", a: "네, 한 주문에 쿠폰 한 장과 포인트를 함께 쓸 수 있습니다. 쿠폰마다 사용 조건이 다르니 주문 화면에서 확인해 주세요." },
        ],
      },
    ],
  },
];

export const faqCount = (c: FaqCategory) => c.groups.reduce((n, g) => n + g.items.length, 0);

/** Side menu below the FAQ categories (reference: help desk lnb). */
export const HELP_LINKS = [
  { label: "비회원 주문조회", href: "/login/#guest" },
  { label: "공지사항/당첨자발표", href: "/help/notice/" },
  { label: "단체주문", href: "/help/bulk-order/" },
  { label: "제휴문의", href: "/help/partnership/" },
  { label: "입점신청", href: "/help/vendor/" },
  { label: "매장찾기", href: "/stores/" },
];

export const SUPPORT_CHANNELS = [
  {
    icon: "chat",
    title: ["FOLIO톡", "채팅상담서비스"],
    lines: ["채팅상담 가능시간은", CONTACT.hours, CONTACT.closed, "(회원만 이용 가능합니다.)"],
    actions: [{ label: "FOLIO톡 신청/조회", href: "/login/" }],
  },
  {
    icon: "write",
    title: ["1:1문의", "게시판상담서비스"],
    lines: ["문의하신 내용에 대한 답변은", CONTACT.hours, CONTACT.closed, "(회원만 이용 가능합니다.)"],
    actions: [
      { label: "1:1문의하기", href: "/login/" },
      { label: "1:1답변확인", href: "/login/" },
    ],
  },
  {
    icon: "phone",
    title: ["고객센터", "전화상담서비스"],
    lines: ["전화상담 가능시간은", CONTACT.hours, CONTACT.closed],
    phones: [`전국 ${CONTACT.phone}`, `수신자부담 ${CONTACT.freePhone}`],
  },
] as const;

export const QUICK_LINKS = [
  { label: "주문/배송 조회", href: "/login/" },
  { label: "취소/교환/반품 신청", href: "/login/" },
  { label: "회원정보 변경", href: "/login/" },
  { label: "영수증 출력", href: "/login/" },
  { label: "쿠폰 확인", href: "/login/" },
  { label: "포인트 확인", href: "/membership/" },
  { label: "매장찾기", href: "/stores/" },
  { label: "비회원 주문조회", href: "/login/#guest" },
];

// ── Notices ───────────────────────────────────────────────────────────
export type Notice = { id: string; title: string; date: string; body: string[] };

export const NOTICES: Notice[] = [
  { id: "13", title: "SLOWN 26 F/W 테일러링 기획전 댓글 이벤트 당첨자 안내", date: "2026.10.22", body: ["SLOWN 26 F/W 테일러링 기획전 댓글 이벤트에 참여해 주신 모든 분께 감사드립니다.", "당첨되신 분께는 10월 29일까지 등록된 휴대폰 번호로 쿠폰을 보내 드립니다.", "당첨자: kim*** · lee**** · park*** · choi**** · jung***"] },
  { id: "12", title: "FOLIO SHOP 이용약관 개정 안내", date: "2026.10.20", body: ["FOLIO SHOP 이용약관이 아래와 같이 바뀌어 안내해 드립니다.", "■ 공지일 / 시행일: 2026.10.20 / 2026.10.27", "■ 개정 사유: 빠른배송 서비스 시간대 추가에 따른 조항 정비", "■ 주요 변경 내용: 제4조(서비스의 제공 및 변경)에 저녁 배송 시간대를 추가했습니다.", "개정 약관에 동의하지 않으시면 시행일 전까지 회원 탈퇴를 요청하실 수 있습니다. 시행일까지 별도 의사 표시가 없으면 개정 약관에 동의한 것으로 봅니다."] },
  { id: "11", title: "atelier·nine 9월 라이브 방송 이벤트 당첨자 안내", date: "2026.10.15", body: ["라이브 방송 이벤트 당첨자를 안내해 드립니다.", "경품은 10월 24일부터 차례로 발송됩니다."] },
  { id: "10", title: "LUMEN 리뷰 이벤트 당첨자 안내", date: "2026.10.12", body: ["LUMEN 리뷰 이벤트에 참여해 주셔서 감사합니다.", "당첨되신 분께는 3,000포인트를 지급했습니다."] },
  { id: "9", title: "PARALLEL* 오픈 기념 이벤트 당첨자 안내", date: "2026.10.12", body: ["오픈 기념 이벤트 당첨자를 안내해 드립니다.", "쿠폰은 마이페이지 > 쿠폰에서 확인하실 수 있습니다."] },
  { id: "8", title: "개인정보 처리방침 변경 안내", date: "2026.10.06", body: ["개인정보 처리방침이 2026년 10월 13일부터 바뀝니다.", "처리업무 위탁 업체 목록이 바뀌었으며, 자세한 내용은 개인정보 처리방침에서 확인해 주세요."] },
  { id: "7", title: "9월 신규 회원 혜택 공유 이벤트 당첨자 발표", date: "2026.09.30", body: ["공유 이벤트에 참여해 주신 모든 분께 감사드립니다.", "당첨되신 분께는 개별 연락을 드렸습니다."] },
  { id: "6", title: "추석 연휴 배송 및 고객센터 운영 안내", date: "2026.09.18", body: ["추석 연휴 기간(9월 24일~9월 27일)에는 배송과 고객센터 상담이 쉽니다.", "연휴 전날 오후 2시까지 결제한 주문은 연휴 전에 출고됩니다."] },
  { id: "5", title: "SLOWN 웨딩 에디트 사전 예약 안내", date: "2026.09.12", body: ["웨딩 에디트 예복 사전 예약을 받습니다.", "예약 고객께는 기장·소매 수선을 무료로 해 드립니다."] },
  { id: "4", title: "시스템 점검에 따른 서비스 일시 중단 안내", date: "2026.09.05", body: ["보다 안정적인 서비스를 위해 시스템 점검을 진행합니다.", "점검 시간: 9월 9일(수) 02:00~05:00", "점검 중에는 주문과 결제가 잠시 중단됩니다."] },
  { id: "3", title: "빠른배송 저녁 시간대 서비스 지역 확대", date: "2026.08.28", body: ["빠른배송 저녁 시간대를 경기 일부 지역까지 넓혔습니다.", "가능 지역은 주문 화면에서 배송지를 입력하면 확인할 수 있습니다."] },
  { id: "2", title: "8월 멤버십 등급 산정 안내", date: "2026.08.01", body: ["8월 멤버십 등급이 확정되었습니다.", "등급별 혜택은 멤버십 안내에서 확인해 주세요."] },
  { id: "1", title: "FOLIO SHOP 데모 사이트 안내", date: "2026.07.15", body: ["이 사이트는 화면 구성을 보여 드리기 위한 데모입니다.", "상품·가격·이벤트·공지는 모두 샘플이며 실제로 주문되거나 진행되지 않습니다."] },
];

export const noticeById = (id: string) => NOTICES.find((n) => n.id === id);

// ── Forms ─────────────────────────────────────────────────────────────
export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select" | "file" | "radio" | "checks";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** Starting text of a textarea. */
  template?: string;
};

export type FormSection = { title?: string; fields: Field[] };

const PHONE: Field = { name: "phone", label: "연락처", type: "tel", required: true, placeholder: "'-' 없이 입력" };
const EMAIL: Field = { name: "email", label: "이메일", type: "email", required: true };

export const COUNTRY_CODES = ["대한민국(82)", "미국(1)", "일본(81)", "중국(86)"];

export const PRIVACY_CONSENT = {
  title: "개인정보 수집 및 이용안내",
  rows: [
    ["수집 목적", "문의 확인과 답변"],
    ["수집 항목", "이름, 연락처, 이메일, 문의 내용"],
    ["보유 기간", "문의 처리 후 3년"],
  ],
  note: "개인정보 수집과 이용에 동의하지 않으실 수 있으나, 동의하지 않으면 문의를 남길 수 없습니다.",
  agree: "개인정보 수집 및 이용에 동의합니다.",
};

export const BULK_ORDER: FormSection[] = [
  {
    fields: [
      { name: "name", label: "문의자명", required: true },
      { name: "company", label: "업체명", required: true },
      PHONE,
      EMAIL,
      { name: "brand", label: "요청브랜드", required: true, placeholder: "예: SLOWN" },
      { name: "goods", label: "상품번호", hint: "상품 상세의 품번을 적어 주세요." },
      { name: "qty", label: "구매희망수량", type: "number", required: true },
      { name: "date", label: "필요일자", type: "date", required: true },
      {
        name: "body",
        label: "문의내용",
        type: "textarea",
        required: true,
        template: "단체 주문 문의 시 아래 항목을 꼭 적어 주세요.\n\n담당자명:\n연락처(휴대폰 번호):\n희망 상품과 사이즈별 수량:\n배송 희망 주소:",
      },
    ],
  },
];

export const PARTNERSHIP: FormSection[] = [
  {
    fields: [
      { name: "name", label: "문의자명", required: true },
      PHONE,
      EMAIL,
      { name: "body", label: "문의내용", type: "textarea", required: true, placeholder: "제휴 내용과 기간, 예상 규모를 적어 주세요." },
    ],
  },
];

export const VENDOR: FormSection[] = [
  {
    title: "신청자 정보",
    fields: [{ name: "name", label: "신청자명", required: true }, PHONE, EMAIL],
  },
  {
    title: "사업자 정보",
    fields: [
      { name: "company", label: "회사명", required: true },
      { name: "bizNo", label: "사업자등록번호", required: true, placeholder: "'-' 없이 입력" },
      { name: "ceo", label: "대표자명", required: true, placeholder: "사업자등록증 기준으로 입력해 주세요" },
      { name: "bizFile", label: "사업자등록증", type: "file", required: true, hint: "gif, png, jpg, pdf 파일 · 10MB 이하" },
    ],
  },
  {
    title: "브랜드 소개",
    fields: [
      { name: "brandName", label: "브랜드명", required: true },
      { name: "items", label: "취급품목", type: "checks", required: true, options: ["남성의류", "여성의류", "슈즈", "가방", "액세서리", "뷰티"] },
      { name: "site", label: "브랜드 사이트", placeholder: "https://" },
      { name: "intro", label: "브랜드 소개", type: "textarea", required: true, placeholder: "브랜드 이야기와 대표 상품, 가격대를 적어 주세요." },
    ],
  },
  {
    title: "사전협의 여부",
    fields: [{ name: "pre", label: "사전협의", type: "radio", required: true, options: ["협의함", "협의하지 않음"] }],
  },
  {
    title: "기타 정보",
    fields: [{ name: "etc", label: "기타 문의", type: "textarea", placeholder: "추가로 전하실 내용이 있으면 적어 주세요." }],
  },
];
