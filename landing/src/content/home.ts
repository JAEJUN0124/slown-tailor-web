// Mock copy and values for the home page. Layout mirrors the reference;
// every value here is a placeholder meant to be replaced.

export const LOADER = {
  target: 7200,
  unit: "케이스",
  lines: ["천천히 알아갈수록,", "더 꼭 맞는 예복이 됩니다."],
  stages: ["치수를 불러오는 중", "사례를 비교하는 중", "패턴을 다듬는 중", "준비가 끝났습니다"],
} as const;

export const HERO = {
  eyebrow: "AI 맞춤 예복 · 슬로운",
  title: ["천천히 짓는", "나만의 예복"],
  lead: ["처음 맞추는 예복이라도 괜찮습니다.", "상담부터 수선까지, 한 곳에서."],
  scrollCue: "SCROLL",
  // Drop a real clip at /public/videos/hero.mp4 and set this to "/videos/hero.mp4".
  videoSrc: null as string | null,
  stats: [
    { num: 850, prefix: "", suffix: "팀+", label: "지난 1년 방문 고객" },
    { num: 18, prefix: "평균 ", suffix: "일", label: "제작 기간" },
    { num: 98, prefix: "", suffix: "%", label: "핏 만족도" },
  ],
} as const;

export const TEASER = {
  kicker: "Project Nocturne · Coming Soon",
  title: "Project Nocturne",
  lines: ["가장 특별한 밤을 위한, 새로운 라인업.", "슬로운이 다음 컬렉션을 준비하고 있습니다."],
  note: "곧 자세한 소식으로 찾아뵙겠습니다.",
} as const;

export const PROBLEM = {
  title: ["예복은 처음이라,", "모든 게 낯섭니다."],
  lead: ["멋지게 입고 싶은 마음은 있지만,", "무엇부터 물어봐야 할지 모르겠다면."],
  answer: ["부담 없이", "들러 주세요."],
  steps: ["상담", "분석", "제작", "수선"],
  closing: "번거로운 일은, 저희가 맡겠습니다.",
} as const;

export const BANNERS = {
  first: "이미 많은 신랑이, 그날을 함께했습니다",
  second: "그렇게, 나만의 한 벌이 완성됩니다",
} as const;

export const REVIEWS_SECTION = {
  title: ["먼저 입어본 신랑들의", "후기."],
  more: "후기 더 보러가기",
  source: "네이버",
} as const;

export const REVIEWS = [
  {
    author: "j**",
    date: "2026.09",
    text: "예식 두 달 전에 급하게 찾아갔는데 일정에 맞춰 여유 있게 완성됐어요. 상담할 때 체형 이야기를 편하게 할 수 있어서 좋았고, 어깨 라인이 기성복과는 확실히 달라요. 아버지 혼주복도 같이 맞췄는데 두 분 다 만족하셨습니다. 원단 고를 때 무리하게 비싼 걸 권하지 않아서 오히려 믿음이 갔어요.",
  },
  {
    author: "S**",
    date: "2026.09",
    text: "친구 추천으로 방문했어요. 처음이라 뭘 물어봐야 할지 몰랐는데 하나하나 짚어 주셔서 편했습니다. 가봉 없이 나온다고 해서 걱정했는데 첫 착용부터 거의 손볼 데가 없었어요.",
  },
  {
    author: "윤**",
    date: "2026.09",
    text: "체격이 큰 편이라 늘 바지 핏이 아쉬웠는데, 여기서 처음으로 딱 맞는 바지를 입어 봤어요. 가격도 처음 안내받은 그대로였습니다.",
  },
  {
    author: "d**",
    date: "2026.08",
    text: "스튜디오 촬영용과 본식용을 나눠서 준비했어요. 촬영 콘셉트에 맞춰 색을 골라 주셔서 사진이 정말 잘 나왔습니다. 촬영이 끝나고 소매 길이 수선도 바로 해 주셨어요. 다음에 부모님 정장도 여기서 하려고요.",
  },
  {
    author: "ㅂ**",
    date: "2026.08",
    text: "상담 분위기가 편해서 좋았어요. 신부와 같이 갔는데 둘의 의견을 충분히 들어 주셨습니다.",
  },
  {
    author: "P**",
    date: "2026.08",
    text: "예복을 맞춘 뒤 출근용으로 한 벌 더 맞췄습니다. 매일 입어도 편하고 구김도 적어요. 수선 문의에도 답이 빨라서 계속 찾게 됩니다.",
  },
  {
    author: "h**",
    date: "2026.07",
    text: "여성 디렉터님께 상담받았는데 색상과 라펠 디테일을 꼼꼼하게 추천해 주셨어요. 필요한 것만 설명해 주셔서 고르기 쉬웠고, 완성된 옷을 입었을 때 주변 반응이 가장 좋았습니다. 예복을 준비하면서 가장 만족스러웠던 곳이에요.",
  },
  {
    author: "k**",
    date: "2026.07",
    text: "본식 정장을 알아보다가 방문했는데 처음부터 끝까지 만족스러웠습니다. 원단마다 특징을 친절하게 설명해 주셔서 어렵지 않게 고를 수 있었고, 치수도 세심하게 조정해 주셨어요. 특히 기성복에서 늘 아쉬웠던 어깨와 허리 라인을 꼼꼼히 봐 주셔서 착용감이 편했습니다. 제작 기간도 예상보다 짧아 일정 부담이 없었고, 완성도도 기대 이상이었어요. 주변에도 자신 있게 추천하려고 합니다.",
  },
] as const;

export const GALLERY_SECTION = {
  title: "그날의 기록들.",
  lead: ["슬로운과 함께한", "신랑들의 순간입니다."],
} as const;

// [width, height] pairs keep the reference masonry rhythm.
export const GALLERY: { ratio: [number, number]; caption: string }[] = [
  { ratio: [1600, 1067], caption: "스튜디오 · 마주 앉은 두 사람" },
  { ratio: [1600, 2400], caption: "스튜디오 · 손을 맞잡은 순간" },
  { ratio: [1600, 2133], caption: "예식 · 조명 아래 클로즈업" },
  { ratio: [1600, 2400], caption: "포트레이트 · 다크 수트" },
  { ratio: [1600, 2240], caption: "예식 · 뒷모습" },
  { ratio: [1440, 960], caption: "예식 · 함께 걷는 길" },
  { ratio: [1600, 2400], caption: "스튜디오 · 의자 화보" },
  { ratio: [1600, 2439], caption: "전신 · 쓰리피스" },
  { ratio: [1600, 2400], caption: "스튜디오 · 옆모습" },
  { ratio: [1600, 2400], caption: "스튜디오 · 꽃다발" },
  { ratio: [1600, 1067], caption: "전신 · 벤치" },
  { ratio: [1600, 2240], caption: "전신 · 핀스트라이프" },
  { ratio: [1600, 2400], caption: "스튜디오 · 아이보리 수트" },
  { ratio: [1600, 2240], caption: "포트레이트 · 부케" },
  { ratio: [960, 1280], caption: "예식 · 혼주" },
  { ratio: [1440, 960], caption: "예식 · 플라워 월" },
  { ratio: [1170, 1553], caption: "스냅 · 웃는 신랑" },
  { ratio: [1600, 2401], caption: "예식 · 창가" },
  { ratio: [1600, 2000], caption: "예식 · 포옹" },
  { ratio: [1600, 2401], caption: "예식 · 샹들리에" },
  { ratio: [1600, 2133], caption: "예식 · 드레이프" },
  { ratio: [1200, 1500], caption: "무드 · 빛 줄기" },
  { ratio: [1600, 2133], caption: "예식 · 인사" },
  { ratio: [1080, 1440], caption: "예식 · 부토니에르" },
];

export const DIFFERENTIATION = {
  line1: ["천천히 알아갈수록,", "더"],
  highlight: "꼭 맞는 예복이",
  tail: "됩니다.",
  lead: ["첫 상담은 가볍게,", "쌓인 데이터로 한 벌은 정확하게."],
} as const;

export type StepKey = "consult" | "analysis" | "making" | "care";

export const PROCESS = {
  title: ["상담부터 수선까지,", "이렇게 진행됩니다."],
  prevLabel: "이전 단계",
  nextLabel: "다음 단계",
  steps: [
    {
      key: "consult" as StepKey,
      number: "01",
      title: "매장 상담",
      subtitle: "예식 분위기부터 체형과 취향까지",
      description: "디렉터가 예식 분위기와 평소 스타일을 듣고, 직접 치수를 재며 예산까지 함께 정리합니다.",
      metric: "60분",
      metricLabel: "상담 소요",
      tags: ["정밀 채촌", "스타일 확정", "예산 조율"],
    },
    {
      key: "analysis" as StepKey,
      number: "02",
      title: "데이터 분석",
      subtitle: "비슷한 체형의 사례와 비교",
      description: "체형과 분위기 데이터를 7,200건의 유사 사례와 비교해 가장 잘 맞는 패턴을 찾습니다.",
      metric: "7,200+",
      metricLabel: "사례 분석",
      tags: ["체형 분석", "취향 매칭", "패턴 검토"],
    },
    {
      key: "making" as StepKey,
      number: "03",
      title: "예복 제작",
      subtitle: "데이터로 완성하는 한 벌",
      description: "자동 생성한 패턴을 바탕으로, 검증된 공정에서 단 한 벌을 완성합니다.",
      metric: "18-24일",
      metricLabel: "제작 기간",
      tags: ["패턴 생성", "가봉 최소화", "18일 완성"],
    },
    {
      key: "care" as StepKey,
      number: "04",
      title: "평생 수선",
      subtitle: "입은 뒤에도, 계속",
      description: "촬영 후, 예식 전, 그리고 그 이후에도 — 체형이 바뀌면 무료로 수선해 드립니다.",
      metric: "∞",
      metricLabel: "무료 수선",
      tags: ["촬영 후 수선", "예식 전 점검", "평생 무료 수선"],
    },
  ],
} as const;

export const DIRECTOR_SECTION = {
  title: ["데이터로 설계하고,", "사람이 완성합니다."],
  lead: ["정확함은 데이터가, 편안함은 사람이 만듭니다.", "모든 상담은 디렉터가 직접 맡습니다."],
} as const;

export const DIRECTORS = [
  {
    name: "한도윤",
    role: "DIRECTOR",
    quote: "맞춤은, 대화에서 시작됩니다",
    body: [
      "줄자를 들기 전에 먼저 이야기를 나눕니다. 평소 어떤 옷을 즐겨 입는지, 그날 어떤 모습이고 싶은지를 듣는 시간이 결국 실루엣을 정합니다.",
      "몸의 선은 사람마다 다르고, 같은 치수라도 서 있는 자세와 걸음에 따라 맞음새가 달라집니다.",
      "오래 맞춤을 지으며 배운 건, 좋은 옷은 장식이 아니라 그 사람다움에서 나온다는 것입니다. 몇 년 뒤 사진을 다시 봐도 어색하지 않은 한 벌을 짓습니다.",
      "처음이라 낯설어도 괜찮습니다. 준비하는 시간이 편안한 기억으로 남도록, 천천히 함께하겠습니다.",
    ],
    tags: ["차분한 상담", "클래식 핏", "패턴 설계"],
  },
  {
    name: "서지후",
    role: "DIRECTOR",
    quote: "가장 편한 옷이, 가장 멋진 옷입니다",
    body: [
      "예식 날 신랑은 생각보다 오래 서 있고, 많이 움직입니다. 그래서 멋보다 편안함을 먼저 확인합니다.",
      "어깨와 등판, 허리 라인처럼 기성복에서 아쉬웠던 부분을 하나씩 짚어 보완합니다.",
      "편하게 입을 수 있어야 표정도 자연스러워집니다. 그날의 사진이 증명해 줄 거예요.",
    ],
    tags: ["체형 보완", "모던 핏", "원단 큐레이션"],
  },
  {
    name: "윤하람",
    role: "DIRECTOR",
    quote: "작은 디테일이, 그날의 인상을 바꿉니다",
    body: [
      "라펠 폭, 단추 위치, 포켓의 각도. 작은 차이가 전체 인상을 만듭니다.",
      "신부의 드레스와 예식장 분위기까지 함께 보고, 두 사람이 나란히 섰을 때 가장 잘 어울리는 조합을 제안합니다.",
      "혼주 스타일링도 함께 맡고 있어, 가족 모두의 균형까지 맞춰 드립니다.",
    ],
    tags: ["디테일 제안", "컬러 매칭", "혼주 스타일링"],
  },
  {
    name: "김로운",
    role: "TECH DIRECTOR",
    quote: "데이터는, 손의 감각을 돕는 도구입니다",
    body: [
      "상담에서 얻은 치수와 체형 정보를 패턴 데이터로 옮기는 일을 맡고 있습니다.",
      "비슷한 체형의 사례를 비교해 시행착오를 줄이고, 가봉 횟수를 최소화합니다.",
      "기술은 디렉터의 판단을 대신하지 않습니다. 더 정확하게 판단할 수 있도록 도울 뿐입니다.",
    ],
    tags: ["패턴 데이터", "공정 설계", "품질 검수"],
  },
] as const;

export const PRICING_PREVIEW = {
  title: "가격은 처음부터 공개합니다.",
  fromLabel: "맞춤 예복",
  fromPrice: "₩349,000부터.",
  fromAmount: "₩349,000",
  fromSuffix: "부터",
  vatNote: "부가세 포함",
  lead: ["보통의 맞춤 예복은 한 달 이상, 수백만 원.", "우리는 데이터로 그 시간을 줄였습니다."],
  conclusion: "그래서, 가격에 거품이 없습니다.",
  rentalKicker: "NEW",
  rentalLabel: "대여 패키지",
  rentalNote: "자주 입지 않을 옷은 빌리고, 오래 입을 옷은 맞춥니다.",
  eventNote: "한정 이벤트 · ",
  eventUntil: "2027년 2월 28일까지",
  weddingLabel: "예복 패키지",
  kicker: "PRICING",
  listLabel: "대표 구성",
  cta: "전체 가격 보기",
} as const;

export const FAQ_SECTION = { title: "자주 묻는 질문들." } as const;

export const FAQS = [
  {
    q: "대여도 가능한가요?",
    a: "네, 맞춤 대여도 준비되어 있어요. 다만 오래 입으실 맞춤 제작을 중심으로, 상황에 맞게 함께 정해 드립니다.",
  },
  {
    q: "예식까지 시간이 얼마 없는데 괜찮을까요?",
    a: "보통 18~24일이면 완성됩니다. 일정이 빠듯하면 급행 제작으로 18일 안에도 맞춰 드려요. 예식 날짜를 알려 주시면 바로 확인해 드립니다.",
  },
  {
    q: "체형 고민도 보완이 될까요?",
    a: "맞춤을 하는 가장 큰 이유입니다. 어깨·키·체형에 맞춰 패턴을 설계해, 기성복에서 아쉬웠던 부분을 보완합니다.",
  },
  {
    q: "촬영과 본식을 모두 준비하고 싶어요.",
    a: "촬영용과 본식용을 나눠 준비하실 수 있어요. 일정과 콘셉트에 맞춰 디렉터가 구성을 함께 정합니다.",
  },
  {
    q: "처음이라 무엇을 골라야 할지 모르겠어요.",
    a: "대부분 그렇게 시작하세요. 상담에서 예식 분위기와 평소 스타일을 들은 뒤, 디렉터가 어울리는 방향을 먼저 제안해 드립니다.",
  },
  {
    q: "가격 외에 추가 비용이 있나요?",
    a: "표시 가격에 부가세가 포함되어 있고, 추가금이나 강매는 없습니다. 상담에서 정한 구성 그대로 진행됩니다.",
  },
] as const;

export const VISION = {
  title: ["예복은", "첫 한 벌일 뿐입니다."],
  lead: ["우리가 짓는 건 옷 한 벌이 아니라,", "누구나 자기 몸에 맞는 옷을 입는 내일."],
  // The brand name (SITE.brandKo, "슬로운") is rendered between these two parts.
  closing: ["기성 사이즈가 필요 없어질 때까지,", "은 계속됩니다."],
} as const;

export const FINAL_CTA = {
  title: "이제, 가볍게 시작하세요.",
  lead: "상담부터 수선까지, 데이터와 디렉터가 함께합니다.",
  leadStrong: "당신은 예식만 준비하시면 됩니다.",
  note: "부담 없는 상담 · 추가금 없는 정찰제 · 평생 무료 수선",
} as const;
