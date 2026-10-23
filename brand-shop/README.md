# SLOWN 브랜드관 — 쇼핑몰 입점 화면 목업 (데모)

가상의 쇼핑몰 `FOLIO SHOP`에 SLOWN이 입점한 브랜드관 메인 화면입니다. 화면 구조와 수치는 레퍼런스 몰의 브랜드관 메인을 분석해 맞췄고, 몰·계열 편집숍·회사 정보·상품·가격·평점·찜 수는 모두 샘플입니다.

- 스택: Next.js 16(App Router, 정적 export) · React 19 · Tailwind CSS v4 · lucide-react
- 페이지: `/` 한 장(배포 시 `/<repo>/shop/`)

이 폴더(`brand-shop/`)에서 실행합니다. 개발 서버는 http://localhost:3001 입니다.

```bash
npm install
npm run dev
```

## 화면 구성

| 영역 | 파일 | 설명 |
| --- | --- | --- |
| 머리글 | `src/components/ShopHeader.tsx` | 40px 검은 상단 바(몰 로고·계열 편집숍·통합 검색·찜·장바구니·계정) + 70px 브랜드 바(로고·좋아요·카테고리 드롭다운·브랜드 안 검색) |
| 키비주얼 | `src/components/KeyVisual.tsx` | 화면 전체 폭 슬라이더. 4초 자동 넘김·무한 루프·일시정지, 마우스를 올리면 컨트롤이 어두워지고, 모바일은 스와이프 |
| 코너 | `src/components/Corners.tsx` | 카테고리 배너 4개, 상품 코너 2개(4열), New In(5열·세로 탭), Bestsellers(순위·가로 탭). 탭은 처음 열 때 무작위로 고릅니다 |
| 상품 카드 | `src/components/ProductCard.tsx` | 마우스를 올리면 확대 컷으로 바뀌고, 찜 하트·평점·찜 수·태그(재입고·단독)를 보여 줍니다 |
| 푸터 | `src/components/ShopFooter.tsx` | 회사 정보·약관 링크·인증·SNS |
| 오른쪽 위젯 | `src/components/QuickWidget.tsx` | 최근 본 상품(상품을 누르면 쌓이고 브라우저에 저장)·상담·맨 위로 |
| 상품 그림 | `src/components/ProductArt.tsx` | 사진 대신 그린 SVG 일러스트 18종(수트·코트·셔츠·구두·가방 등) |

## 값 바꾸기

`src/content/shop.ts` 한 파일에 몰·브랜드 이름, 메뉴와 드롭다운, 키비주얼 슬라이드, 상품 목록(이름·가격·평점·찜 수·태그, 그림 `kind`·`color`), 푸터 정보가 있습니다. 색은 `src/app/globals.css`의 `--color-shop-*`입니다.

## 레퍼런스와 다른 점

- 레퍼런스는 PC 전용(최소 폭 1280px)입니다. 1280px 이상은 레퍼런스 수치 그대로이고, 그보다 좁은 화면 배치는 이 목업에서 새로 정했습니다.
- 동작 줄이기 설정을 켠 사람에게는 슬라이더가 멈춘 상태로 시작합니다.
- 링크는 실제 페이지 대신 `#…` 자리표시자로 두었습니다. 상품 링크는 최근 본 상품에 쌓입니다.
