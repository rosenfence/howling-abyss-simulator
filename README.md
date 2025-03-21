# 칼바람 나락 시뮬레이터

이 프로젝트는 리그 오브 레전드의 칼바람 나락 모드에서 무작위 챔피언 선택을 시뮬레이션하는 웹 애플리케이션입니다. 약 170여개의 챔피언 중 무작위로 중복 없이 10개를 추출하여 보여줍니다.

## 기술 스택

- [Next.js](https://nextjs.org/) - React 프레임워크 (App Router 사용)
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성을 위한 JavaScript 확장
- [TailwindCSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [shadcn/ui](https://ui.shadcn.com/) - 재사용 가능한 UI 컴포넌트

## 주요 기능

1. 무작위 챔피언 선택: 170여개 챔피언 중 중복 없이 10개 추출
2. 선택된 챔피언 목록 표시
3. 반응형 디자인: 모바일 및 데스크톱 환경 지원

## 로컬에서 실행하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/yourusername/howling-abyss-simulator.git
cd howling-abyss-simulator

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
howling-abyss-simulator/
├── public/              # 정적 파일
├── src/                 # 소스 코드
│   ├── app/             # Next.js App Router 파일
│   │   ├── page.tsx     # 메인 페이지
│   │   ├── layout.tsx   # 레이아웃 컴포넌트
│   │   ├── globals.css  # 전역 스타일
│   │   └── howling-abyss/ # 칼바람 나락 시뮬레이터
│   ├── components/      # UI 컴포넌트
│   │   ├── ui/          # 재사용 가능한 shadcn/ui 컴포넌트
│   │   │   ├── Modal.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── card.tsx
│   │   ├── _howling_abyss/ # 칼바람 나락 페이지 컴포넌트
│   │   │   └── ChampionSelector.tsx
│   │   └── _main/       # 메인 페이지 컴포넌트
│   ├── data/            # 데이터 파일
│   │   └── champions.ts # 챔피언 데이터
│   ├── functions/       # 함수 모음
│   └── lib/             # 유틸리티 함수
│       └── utils.ts     # 유틸리티 함수 (무작위 선택 등)
├── .gitignore           # Git 무시 파일 목록
├── components.json      # 컴포넌트 설정 파일
├── eslint.config.mjs    # ESLint 설정 파일
├── next-env.d.ts        # Next.js 환경 타입 선언
├── next.config.ts       # Next.js 설정 파일
├── package-lock.json    # npm 의존성 잠금 파일
├── package.json         # 프로젝트 의존성 및 스크립트
├── postcss.config.mjs   # PostCSS 설정 파일
├── README.md            # README
└── tsconfig.json        # TypeScript 설정 파일
```

## 라이선스

MIT
