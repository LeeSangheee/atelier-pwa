# ATELIER · Strength Journal (PWA)

ACSM 2026 포지션 스탠드 기반 부위별 12세트 운동 기록 + 점진적 과부하 자동 추천 앱.
아이폰에 PWA로 설치해서 정식 앱처럼 사용 가능합니다.

## 구조

```
atelier-pwa/
├── package.json          # 의존성
├── vite.config.js        # PWA 설정
├── index.html            # iOS PWA 메타태그
├── src/
│   ├── main.jsx          # 엔트리
│   ├── App.jsx           # 본체 (전체 UI + 로직)
│   └── index.css         # 폰트 import + 글로벌 CSS
└── public/
    ├── favicon.svg
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    └── icon-512-maskable.png
```

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:5173
```

## 빌드

```bash
npm run build        # dist/ 에 정적 파일 생성
npm run preview      # 빌드 결과 미리보기
```

## 아이폰에서 사용하기 (가장 쉬운 방법)

### 1단계 — 무료 호스팅에 배포 (5분)

**옵션 A: Vercel (추천, 가장 빠름)**

```bash
npm i -g vercel
vercel
# 안내에 따라 로그인 → 배포 → URL 받음 (예: atelier-xxx.vercel.app)
```

**옵션 B: Netlify**

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
# 또는 netlify.com 에서 dist 폴더 드래그&드롭
```

**옵션 C: GitHub Pages**

GitHub repo에 푸시 후 `dist/` 폴더를 Pages 브랜치로 배포.

### 2단계 — 아이폰 홈화면에 추가

1. **사파리(Safari)**로 배포된 URL 열기 ⚠️ 크롬 안 됨
2. 하단 **공유 버튼** ⬆︎ 탭
3. **'홈 화면에 추가'** 선택
4. 'ATELIER' 이름 확인 → 추가
5. 홈화면에서 아이콘 탭 → 정식 앱처럼 풀스크린 실행

설치 후 첫 실행시 자동으로 안내 배너가 뜨므로 사용법을 모를 일 없습니다.

## 기능

- **3분할 12세트 프로그램** (Push / Pull / Legs)
- **점진적 과부하 자동 추천**
  - 모든 세트 상한 달성 → 컴파운드 +2.5kg / 아이솔레이션 +1.25kg
  - 최소 reps 미달 → 같은 양만큼 디로드
  - 중간 → 무게 유지, reps 증가 권장
- **신체 기록 관리** — 체중/신장/BMI 자동 계산
- **누적 통계** — 주간 운동일수, 총 세션, 총 볼륨(t)
- **운동별 히스토리** — 세션 단위 보기/삭제
- **오프라인 동작** — 네트워크 없어도 사용 가능 (Service Worker 캐싱)
- **데이터 영구 저장** — localStorage 기반, 앱 종료 후에도 유지

## 디자인

- **카카오 큰글씨**(KakaoBigFont) — 한글 메인
- **Geist Mono** — 영문 라벨/숫자 보조
- **카키 / 블랙 / 브라운** 헤리티지 매거진 톤
- **필름 그레인 텍스처** + **코너 마크 장식**
- iOS Safe Area 완전 대응 (노치/홈바)

## 라이선스

- 카카오 큰글씨 — OFL-1.1 (상업 사용 가능)
- Geist Mono — Vercel font (free)
