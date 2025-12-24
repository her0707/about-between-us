# 우리사이 여기쯤

두 출발지의 중간 지점을 찾고, 그 주변의 만남 후보지와 장소를 추천하는 서비스입니다.

## 주요 기능

- 두 출발지 검색 및 현재 위치 기반 입력
- 기하학적 중간 지점 + 지하철역 후보 추천 (접근성 점수)
- 후보지 상세에서 카테고리별 주변 장소 추천
- 카카오 맵 시각화

## 기술 스택

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Kakao Maps JS SDK, Kakao Local API

## 환경 변수

`.env.local` 파일을 생성하고 아래 값을 설정하세요.

```
NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_app_key
KAKAO_REST_API_KEY=your_kakao_rest_api_key
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

## 주요 경로

- `/` : 출발지 입력 및 지도 화면
- `/candidates` : 후보지 리스트
- `/candidates/[id]` : 후보지 상세 및 주변 장소

## API 엔드포인트

- `/api/candidates` : 후보지 목록
- `/api/places/nearby` : 주변 장소
- `/api/places/search` : 키워드 검색
