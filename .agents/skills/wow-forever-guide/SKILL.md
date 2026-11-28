---
name: wow-forever-guide
description: World of Warcraft Forever (와우 포에버) 전용 가이드 및 검증 에이전트. 사용자가 와우 포에버(WoW Forever)의 마법사(특히 비전 마법사), 스킬 계수, 특성, 스탯 효율, 매크로, 경험치 공식, 던전, 전문 기술(마법부여·무두질·요리·낚시·응급치료), 도서관 책 찾기, 패치노트 등을 질문할 때 사용한다.
allowed-tools: google
---
# WoW Forever Guide (`SKILL.md`)

와우 포에버(World of Warcraft: Forever) 서버 환경에 맞춘 데이터 검증 및 공략 가이드 스킬이다. 본섭(리테일)이나 일반 클래식(1.12), 타 확장팩(불타는 성전, 리치 왕의 분노 등) 데이터를 무검증 혼입하지 않고, 공식 패치노트와 와우 포에버 전용 데이터베이스 및 인게임 실측을 교차 검증하여 답변한다.

## 1. 모듈형 마크다운(`.md`) 컨텍스트 및 `docs/` 디렉토리 구조

이 스킬은 루트 `SKILL.md`, 하위 `references/` 폴더, 그리고 워크스페이스의 `docs/` 3대 카테고리 디렉토리(`01-system/`, `02-growth/`, `03-adventure/`)와 동기화되어 세션이 바뀌거나 대화가 길어져도 캐릭터 상태와 검증 규칙을 일관되게 유지한다.

- `references/character-context.md`: 시스템 검증 규칙(KST 기준, 타 버전 혼입 금지, 패치노트 최상단 캐릭터 영향 요약), 캐릭터 현재 상태(**26레벨 얼라이언스 인간 비전 마법사**, 특성 `17/0/0`, HP `642`/MP `1,380`, 마법부여 `71`·무두질 `152`·요리 `76`·낚시 `5`·응급치료 `91`, 비전 유효 주문력 `+121`, 선호 스탯: 체력·지능·주문력, 방어구 키트 4부위 후순위 규칙)
- `references/enchanting-guide.md`: 와우 포에버 마법부여 저비용 숙련도 루트(71~175, 제작 마술봉 상점가 1코퍼 너프 반영), 스톰윈드·아조라의 탑 교관·상인 위치, 제작 가능 아이템(마술봉·오일 30분 지속/5회·마법막대·야영 도구·신규 지팡이/보조장비), 선호 스탯 기준 부위별 마법부여 데이터
- `references/macros-guide.md`: 비전 마법사 핵심 매크로(`신비한 화살(3 레벨)/(2 레벨) + !마법봉 발사`, `[nochanneling]` 보호, 칼차단, 환기 잠금) 및 레벨별(26~60) 매크로 확장 로드맵
- 워크스페이스 문서 디렉토리:
  - `docs/01-system/`: 메커니즘/딜계산(`01`), 매크로(`02`), 설정/애드온(`03`), 스탯/공식(`04`), 경험치/캠핑/전투규칙(`05`), 패치노트/핫픽스 KST(`06`), 대시보드 디자인·모듈화 가이드(`07`)
  - `docs/02-growth/`: 캐릭터/특성(`01`), 스킬/사이클(`02`), 사냥터/던전(`03`), 장비/추천아이템(`04`)
  - `docs/03-adventure/`: 전문기술 통합(`01`), 퀘스트(`02`), 도서관 책 찾기/연구(`03`), 지도/NPC 좌표(`04`)
- **모듈형 대시보드 구조 (`2026-11-25` 적용 — 수정 시 반드시 해당 전용 파일만 편집!)**:
  - `dashboard.html`: 16개 탭 HTML UI 뼈대
  - `assets/dashboard.css`: Memphis 라이트/다크(`html[data-theme="dark"]`) 스타일
  - `data/wow-db-items.js` · `data/wow-db-skills.js` · `data/wow-db-talents.js`: 툴팁 통합 DB *(구 `WOW_ITEM_META`는 각 항목 내부로 병합 완료)*
  - `data/addons.js` (`ADDON_DB`) · `data/prices.js` (시세 추이) · `data/maps.js` (지도 좌표) · `data/talents-and-sim.js` (`IG_TALENT_TREES` · `SIM_SPELLS` · `RECENTLY_UPDATED_TABS`)
  - `js/tooltip.js` (툴팁 조립/렌더) · `js/app.js` (시뮬레이터·지도·차트·부팅)
  - 검증 스크립트: `python tools/verify-dashboard.py` (수정 후 필수 실행)

## 2. 핵심 수행 절차 (Workflow)

1. **캐릭터 기본 조건 및 우선순위 자동 적용**:
   - 별도 지시가 없으면 `references/character-context.md`의 최신 캐릭터 정보(26레벨 인간 비전 마법사, 마법부여 71 / 무두질 152 / 요리 76 / 낚시 5 / 응급치료 91, 선호 스탯: 체력·지능·주문력)를 기본 전제로 삼는다.
   - 장비 마법부여 추천 시 가죽세공 방어구 키트가 적용되는 4부위(가슴·장갑·다리·장화)는 후순위로 분리하고, 방어구 키트 미적용 핵심 부위(손목·망토·무기/양손무기·방패/보조장비·목걸이)를 1순위로 제시한다.
2. **와우 포에버 전용 출처 최우선 교차 검증**:
   - 한국어 출처: `wowf.io/ko` (**스킬북/주문 도감에 포에버 신규·개편 스킬의 랭크별 기본 피해량·마나·해금 레벨이 상세 수록되어 있으므로 스킬 수치 확인 시 최우선 조회!**), 와우 인벤 포에버 게시판(`inven.co.kr/board/wow/6567`, `1896`), `forg.gg/forever/dungeons`
   - 영문 출처 및 클라이언트 DB: 블리자드 공식 포럼, `db.icy-veins.com/wow-forever`, `conquestcapped.com/guides/wow-forever`, `foreverguide.net`, `zockify.com/forever`, `stillsixty.com`, `method.gg/wow-forever`, `mobalytics.gg/wow-forever`, `classicwowforever.com`
   - 모든 패치 및 핫픽스 일시는 한국 시간(**KST**) 기준으로 표기하며, 확인된 팩트와 미확인 영역을 명확히 구분한다.
3. **컨텍스트 갱신**:
   - 사용자의 캐릭터 레벨, 전문 기술 숙련도, 장비 상태 또는 가이드 규칙이 변경되면 `references/*.md`와 `docs/` 하위 해당 `.md` 파일을 함께 업데이트하여 최신 상태를 유지한다.
