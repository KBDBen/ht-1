# Project Instructions

## 해커톤 공지

### 주제
인터널(사내) 웹 서비스 개발

### 제약조건
- 웹 기반 서비스 (PC/모바일 무관)
- 사내 인원 접속 가능한 URL로 배포 완료
- 제한 시간: 정확히 60분 (최종 커밋 시간 기준)

### 제출 방법 (종료시 제공)
- 배포 URL - 실제 접속 가능한 주소
- GitHub 저장소 - README.md 포함 필수
- 서비스 설명 - 제출 폼에 직접 입력 (주요 기능, 기술 스택 포함)

### 평가 방식 (제미나이 AI 기반 자동 평가)
- 완성도 (40%): 조건을 모두 충족하여 사용 가능한 수준으로 완성되었는지
- 실용성 (25%): 당장 실용적으로 사용 가능한 서비스인지
- 기술 효율성 (15%): 제약조건 하에서 서비스 구조 및 코드의 품질 등의 기술 효용성 수준
- AI 활용도 (20%): 서비스 정의 및 기획/설계/구현/배포 전 과정에서 AI 활용 수준

## 서비스 설명
Google Sheets의 공개 CSV URL을 입력받아
AI로 데이터를 분석하고 인사이트를 제공하는 웹 서비스

## 기술 스택
- Next.js 14 (App Router)
- Tailwind CSS
- Anthropic SDK (@anthropic-ai/sdk)
- Vercel 배포

## 폴더 구조
app/
├── page.tsx
├── api/
│   ├── fetch-csv/route.ts
│   └── analyze/route.ts
components/
├── CsvInput.tsx
├── DataPreview.tsx
└── InsightCards.tsx

## 기능 요구사항
- CSV URL 입력 → 서버사이드에서 fetch (CORS 방지)
- 데이터 미리보기 테이블 (최대 10행)
- Claude API로 분석 후 아래 JSON 형식으로 응답:
  {
    "summary": "전체 데이터 요약",
    "patterns": ["패턴1", "패턴2"],
    "outliers": ["이상값1"],
    "actions": ["액션아이템1", "액션아이템2"]
  }
- 인사이트 카드 UI로 결과 출력
- 로딩 스피너, 에러 처리 포함
- 반응형 디자인

## 환경변수
ANTHROPIC_API_KEY=여기에_API_KEY_입력

## Claude API 설정
- model: claude-sonnet-4-20250514
- max_tokens: 1000

## 주의사항
- Google Sheets CSV URL 형식:
  https://docs.google.com/spreadsheets/d/{ID}/export?format=csv
- API Key는 절대 클라이언트 코드에 노출 금지
- 모든 AI 호출은 서버사이드(API Route)에서만
- 작업은 순서대로: 프로젝트 생성 → 파일 생성 → 기능 구현 → 배포 준비