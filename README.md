# slown-tailor-web

레퍼런스 사이트를 분석해 값만 바꿔 다시 만든 데모 세 개를 폴더별로 관리합니다. 세 폴더는 서로 독립된 Next.js 앱이라 설치·실행·빌드를 각자 합니다.

| 폴더 | 내용 | 개발 서버 | 배포 경로 |
| --- | --- | --- | --- |
| [`landing/`](landing/) | SLOWN 맞춤 예복 랜딩 페이지(홈·가격) | http://localhost:3000 | `/<repo>/` |
| [`brand-shop/`](brand-shop/) | 쇼핑몰에 입점한 SLOWN 브랜드관과 이어지는 몰 화면(목록·상품 상세·기획전·랭킹·검색·장바구니·고객센터 등) 목업 | http://localhost:3001 | `/<repo>/shop/` |
| [`official-store/`](official-store/) | SLOWN이 직접 운영하는 공식 스토어(홈·목록·상품 상세·검색·매거진·브랜드/서비스 안내·회원·장바구니·주문서·게시판 등) 목업 | http://localhost:3002 | `/<repo>/store/` |

자세한 구성과 값 바꾸는 방법은 각 폴더의 README에 있습니다.

## 실행

폴더마다 따로 설치하고 실행합니다. 세 개발 서버는 포트가 달라서 동시에 띄울 수 있습니다.

```bash
cd landing && npm install && npm run dev
```

```bash
cd brand-shop && npm install && npm run dev
```

```bash
cd official-store && npm install && npm run dev
```

## 배포 (GitHub Pages)

`main`에 푸시하면 `.github/workflows/deploy.yml`이 세 앱을 각각 정적 빌드한 뒤 하나의 Pages 사이트로 합칩니다. 랜딩은 사이트 루트, 브랜드관은 `shop/`, 공식 스토어는 `store/` 아래에 놓입니다. 저장소의 **Settings → Pages → Source**는 `GitHub Actions`로 두면 됩니다.

## 로컬 전용 폴더

각 앱의 `docs/`(레퍼런스 분석 명세)와 `landing/_backup/`(리디자인 전 사본), 루트의 `.claude/`·`.mcp.json`은 git에 올리지 않습니다.
