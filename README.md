# SLOWN — 맞춤 예복 랜딩 페이지 (데모)

맞춤 예복 브랜드를 위한 랜딩 페이지 데모입니다. 후기·수치·인물·가격은 모두 샘플 콘텐츠입니다.

- 스택: Next.js 16(App Router) · React 19 · Tailwind CSS v4 · motion · Lenis · lucide-react
- 페이지: `/`(홈), `/pricing`(가격)

```bash
npm install
npm run dev
```

## 디자인 장치

| 장치 | 위치 | 설명 |
| --- | --- | --- |
| 한 올의 실 | `src/components/layout/PageCanvas.tsx`, `Thread.tsx` | 히어로에서 마지막 CTA까지 이어지는 1px 실. 페이지 여백을 따라 내려가다 섹션 색이 바뀌는 경계에서만 S자로 건너가고, 스크롤에 맞춰 안개처럼 스며 나타나며, 콘텐츠보다 조금 느린 면 위에 있습니다. 섹션의 `data-thread-side`로 지나갈 여백을 정합니다. |
| 물감 번짐 | 같은 파일 | 섹션은 배경 대신 `data-paint="cream\|latte\|coffee\|espresso\|amber"`만 선언하고, 이웃 색이 카라멜 톤을 거쳐 섞입니다. 경계 폭은 `data-paint-seam`(px)으로 줄일 수 있습니다. |
| 색 | `src/app/globals.css` | 커피브라운 `#71502F`, 엠버 `#F3A257`이 주색이고 나머지는 두 색에서 파생했습니다. |
| 공정 4단계 | `src/components/home/Process.tsx` | 데스크톱은 스크롤 고정 + 좌우 화살표, 모바일은 화살표·스와이프로 넘깁니다. |
| 견적함 | `src/components/pricing/QuoteDock.tsx` | 가격표 항목을 누르면 담기고 합계가 떠 있는 바에 표시됩니다. |

## 값 바꾸기

모든 문구·가격·연락처는 `src/content/`에 있습니다.

| 파일 | 내용 |
| --- | --- |
| `site.ts` | 브랜드명, 연락처, 메뉴, 버튼 문구, 가격 약속·근거 |
| `home.ts` | 홈 섹션별 문구, 통계, 후기, 갤러리 비율, 공정 단계, 디렉터 |
| `pricing.ts` | 가격 탭·그룹·항목(정가/판매가, 배지, 설명), 견적함 문구 |

사진·영상은 플레이스홀더입니다. 실제 영상은 `public/videos/hero.mp4`에 두고 `home.ts`의 `HERO.videoSrc`를 `"/videos/hero.mp4"`로 바꾸면 됩니다. 예약 링크는 `site.ts`의 `bookingUrl`(현재 `#booking`)을 바꾸면 모든 버튼에 반영됩니다.
