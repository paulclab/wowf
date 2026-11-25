# WoW Forever 비전 마법사 로컬 지식베이스 & 검증 에이전트 (AGENTS.md)

이 프로젝트는 **월드 오브 워크래프트: 포에버 (World of Warcraft: Forever, 클라이언트 빌드 `1.60.1`)**의 **인간 비전 마법사(폴, 현재 30레벨, 지속 성장 중)** 전용 로컬 지식베이스 및 공략/매크로/전문기술/모험 산출물 관리 워크스페이스입니다.

## 1. 최우선 검증 및 근거 원칙 (Strict Grounding & Source Hierarchy)
1. **인게임 실측 최우선 (In-Game Ground Truth First)**:
   - 외부 가이드나 서드파티 DB보다 **사용자의 라이브 본섭 인게임 실측 및 스크린샷(`assets/screenshots/`)**을 최우선 진실(Single Source of Truth)로 채택합니다.
   - 인게임 실측으로 확인된 수치와 외부 DB/가이드가 충돌할 경우, 반드시 인게임 실측을 기준으로 서술하고 외부 가이드의 오기를 명시합니다.
2. **타 버전 데이터 혼입 절대 금지**:
   - 본섭(리테일), 타 확장팩(불타는 성전, 리치 왕의 분노 등), 일반 클래식(1.12), 디스커버리 시즌(SoD), 터틀 와우(Turtle WoW)의 상이한 데이터를 검증 없이 혼용하지 않습니다.
3. **교차 검증 필수 출처 (단일 커뮤니티 편향 금지)**:
   - `Reddit` 하나에만 의존하지 않고, 반드시 아래 한국어/영문 와우 포에버 전용 출처를 교차 검증하고 모든 수치·주장에 **클릭 가능한 마크다운 출처 링크(`[출처명](URL)`)**와 **검증 상태(`✅ 인게임 실측`, `📘 공식/DB 확인`, `⚠️ 미확인/추정 금지`)**를 표기합니다.
   - **한국어 우선 출처**: [WOWF.IO](https://wowf.io/ko), [와우 인벤 포에버 게시판](https://www.inven.co.kr/board/wow/6567), [와우 인벤 포에버 정보 게시판](https://www.inven.co.kr/board/wow/1896), `forg.gg` (`https://forg.gg/forever/dungeons`)
   - **영문 및 DB 출처**: [Blizzard 공식 포럼](https://us.forums.blizzard.com/en/wow/), [Icy Veins WoW Forever DB](https://db.icy-veins.com/wow-forever/), [ConquestCapped](https://conquestcapped.com/guides/wow-forever/), [ForeverGuide](https://foreverguide.net/), [Zockify](https://www.zockify.com/forever/), [StillSixty](https://www.stillsixty.com/), [Method](https://www.method.gg/wow-forever), [Mobalytics](https://mobalytics.gg/wow-forever), [ClassicWoWForever](https://classicwowforever.com/)
4. **미확인 영역 추측 금지, KST 시간대 & 패치노트 최상단 요약 규칙**:
   - 출처나 인게임에서 확인되지 않은 내부 메커니즘은 임의로 추측해 단정 짓지 않고 즉시 미확인 영역으로 분리합니다.
   - 모든 패치노트 및 핫픽스 일시는 **한국 시간(KST)**으로 변환해 표기하며, **항상 패치노트 최상단에 현재 캐릭터에 직·간접적으로 영향을 미치는 중요사항 요약**을 먼저 배치합니다.

## 2. 캐릭터 기본 전제 및 매크로 포맷 규칙
- **캐릭터**: 와우 포에버 본섭 / 휴먼(Human) / **35레벨 휴먼 비전 (`25/0/1` · `신비한 명상 3/3` · `냉정 1/1` · `신비한 정신 3/5`[배율 `180%`] · `정밀함 1/3` / 노버프 확정 HP `890` / MP `2,358` [`00:26` 스톰힘 실측 `1,190` / `2,358`] · 체력 `57` · 지능 `127` · 정신력 `100`[전투 시전 MP5 `95.0`] · 일반 주문력 `86` / 비전 주문력 `164`[일반 86 + 비전 전용 78] · 치명 `5.21%` · 적중 `+2%` · 방어도 `470` · `기가볼트 전자반응기`[지8/정9/주문+8]+`녹색 비단 어깨보호구`[지11/주문+8]+`성난 비전의 마술사 장식띠`[비전+17/방29]+`땅거미 마법봉`[1.30초/주문+5]+`타락한 용의 홀`[지11/정13/주문+36]+`물약 가방`+`독수리의 녹옥 부적`+`성난 비전의 인간사냥꾼 망토`[비전+10/방+20]+`성난 비전의 엉겅퀴가죽 로브`[비전+20/키트 +4/+24]+`손·다리 신비한 고급 방어구 키트`[각 +4/+24]+`현인 장화`[체4/방32] 장착 · `마법사 갑옷 1레벨`(시전 중 재생 100% 완성 ✅) / `눈보라 2레벨` / `신비한 화살 4레벨` / `비전 작렬 2레벨` / `화염 작렬 4레벨` / `불기둥 3레벨` / `신비한 폭발 3레벨` / `얼음 화살 5레벨` / `화염구 5레벨` / `신비한 지능 3레벨` / `얼음 갑옷 1레벨` / `냉기 돌풍 1레벨` · `발굴 현장: 저습지` 5/5 졸업 · `놈리건` 퀘스트·파밍 완전 졸업 ✅)**
- **전문 기술**: **마법부여(숙련 128/150)** + **무두질(숙련 205/225)** / **보조 기술**: **요리(150/150)**, **낚시(22/75)**, **응급치료(91/150)**
- **로컬 애드온 실측 경로**: `C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns` (캐릭터별 활성 상태: `C:\Program Files (x86)\World of Warcraft\_forever_\WTF\Account\*\*\폴-최\AddOns.txt`) — 애드온 질문·추천·충돌 진단 시 캡처를 요구하지 말고 이 경로를 직접 스캔·기록해 답변한다.
- **대시보드 모듈형 아키텍처 & 자동 배포 규칙 (`2026-11-25` 전면 분리 적용 ✅)**:
  - 대시보드는 **Zero-Build 모듈형 구조**(GitHub Pages + 로컬 `file://` 더블클릭 100% 겸용, `fetch()`/`type="module"` 금지 · `<link>` + `<script src>` 전용)로 관리한다.
  - **파일별 편집 책임 (다른 파일을 불필요하게 전체 탐색하지 말 것!)**:
    - `dashboard.html`: 16개 탭 HTML 뼈대만 관리 (CSS/JS 인라인 작성 금지)
    - `assets/dashboard.css`: Memphis 라이트/다크(`html[data-theme="dark"]`) 스타일 전담
    - `data/wow-db-items.js`: **장비·재료·도안·마부·소모품 툴팁 (`WOW_DB` + 구 `WOW_ITEM_META` 단일 통합!)**
    - `data/wow-db-skills.js`: 주문·스킬·버프·전문기술 개념 툴팁 (`WOW_DB_SKILLS`)
    - `data/wow-db-talents.js`: 마법사 특성 툴팁 (`WOW_DB_TALENTS`)
    - `data/addons.js`: 설치 애드온 툴팁 (`ADDON_DB`)
    - `data/prices.js`: 마부·재봉 재료 시세 추이 (`MAT_PRICE_HISTORY` · `TAILORING_PRICE_HISTORY`)
    - `data/maps.js`: 대륙·도시 SVG 지도 좌표·사냥터 데이터 (`MACRO_*` · `MICRO_*`)
    - `data/talents-and-sim.js`: 3트리 특성(`IG_TALENT_TREES`) · 스킬/콤보 시뮬(`SIM_SPELLS`, `DEFAULT_COMBOS`) · 메뉴 뱃지(`RECENTLY_UPDATED_TABS`)
    - `js/tooltip.js`: `WOW_DB` 통합 조립 + 자동 하이드레이션 + 툴팁 렌더러
    - `js/app.js`: 탭 전환 · 검색 · 시뮬레이터 · 지도/차트 렌더러 · `safeStorage` · 부팅
  - 수정 시 **반드시 [`docs/01-system/07-dashboard-design-guide.md`](docs/01-system/07-dashboard-design-guide.md)의 디자인·타이포·타임라인·다크모드(`html[data-theme="dark"]`)·단일 통합 툴팁·간결 문구 표준을 준수**한다. 특히 **① 토글 내부 `<h3>`에 중첩 카드/검은 넘버링 박스 금지(심플 텍스트 넘버링 `01.` + 하단 구분선)**, **② `<code>`는 툴팁 연동 아이템/스킬·명령어/좌표 전용(가격·수량·시간·레벨 등 일반 숫자에 `<code>` 박스 금지)**, **③ 설명 텍스트는 2~3줄 이내로 핵심만 축약**을 모든 에이전트가 반드시 지킨다. 완료 후 **`python tools/verify-dashboard.py` 검증 통과 → 따로 묻지 않고 바로 커밋 & `git push origin main`하여 GitHub Pages(`https://paulclab.github.io/wowf/`)에 즉시 반영한다.** (Google Drive 등 별도 원격 동기화는 사용자가 명시적으로 요청할 때만 수행)
- **인스턴스 Q&A / 일회성 개선점 삭제 가능 토글 의무화**: 사용자가 일회성으로 질문한 검증 내용·개선 메모·체크리스트는 절대 영구 고정 `.callout` 박스로 추가하지 않고, 기본 접힘 + 우측 `✕ 지우기` 버튼이 포함된 **`.dismissible-fold` 토글 컴포넌트**(`data-dismiss-id` + `data-restore-scope`)로 추가해 사용자가 언제든 영역을 없앨 수 있게 한다.
- **최근 업데이트 메뉴 `N` 뱃지 규칙**: 대시보드의 특정 메뉴(탭)를 업데이트할 때마다 **`data/talents-and-sim.js`의 `RECENTLY_UPDATED_TABS`**에 최근 업데이트된 탭 ID와 변경 요약을 갱신하여, 사이드바(`.nav-btn`)와 모바일 퀵탭(`.q-pill`)의 **메뉴 제목 우측 위**에 `N` 뱃지가 표시되도록 유지한다.
- **선호 스탯 우선순위**: **체력(Stamina) · 지능(Intellect) · 주문력(Spell Power)**
- **지명 및 위치 표기 규칙**: 모든 가이드·답변에서 지역, 마을, 던전, NPC 지명을 언급할 때는 반드시 **대륙 · 상위 지역 내 방향 · 좌표/접근 경로**를 함께 표기합니다. 특히 **던전/동굴/건물 내부에 숨겨진 입구나 포탈**은 반드시 ① **지상/외부 입구 좌표 및 지형**과 ② **내부 이동 동선(잠수 터널·지하 계단·비인던 통로·갈림길)**을 분리해 안내합니다.
- **퀘스트·던전 득템 병기 규칙**: 던전 및 주요 퀘스트 안내 시에는 항상 **마법사용 득템 리스트(퀘스트 보상 + 보스 드랍, 현재 장비 대비 비교)**를 함께 표기합니다.
- **해금 완료 비행 거점(15곳)**: 동부왕국 10곳(`스톰윈드`, `감시의 언덕`, `다크샤이어`, `레이크샤이어`, `무법항`, `아이언포지`, `텔사마`, `메네실 항구`, `사우스쇼어`, `아라시 고원(임시 주둔지)`) + 칼림도어 5곳(`루테란 마을`, `아우버다인`, `돌발톱 산맥`, `나이젤 야영지(잊혀진 땅)`, `톱니항(불모의 땅)`)
- **마법부여 부위 분리 규칙**: 가죽세공 방어구 키트가 적용되는 4부위(**가슴·장갑·장화·다리**)는 후순위로 별도 분리하고, 방어구 키트 미적용 부위(**손목·망토·무기/양손무기·방패/보조장비·목걸이**)를 1순위로 제시합니다.
- **사용자 표준 마법봉 연계 매크로 포맷**:
  - `/castsequence`를 사용하지 않고 반드시 아래 **동시 배치형 포맷**을 기준으로 작성합니다.
  - 한국어 스킬 등급 표기 시 반드시 숫자와 `레벨` 사이에 공백을 둡니다 (예: `신비한 화살(3 레벨)`, `신비한 화살(2 레벨)`, `얼음 회오리(1 레벨)`).
  ```text
  #showtooltip 신비한 화살(3 레벨)
  /cast [nochanneling] 신비한 화살(3 레벨)
  /cast [nochanneling] !마법봉 발사
  ```

## 3. 워크스페이스 디렉토리 구조 및 산출물 관리
- `@dashboard.html`: 통합 반응형 커맨드 덱 웹 대시보드 (절반 보기 카드-표 최적화)
- `@docs/README.md`: 전체 지식베이스 통합 목차
- **`@docs/01-system/` (시스템 관련)**:
  - `01-mechanics-and-damage.md`: 인게임 실측 메커니즘(비전 작렬 1.3초 스샷, 화염 작렬 On-GCD, 마법봉 1.1초 / 가속 15% 버프 시 0.96초 쿨타임) 및 딜 계산 공식(현재 비전 유효 주문력 +121 기준)
  - `02-macros-book.md`: 26레벨 실전 매크로 북, 마법봉+주문 상호작용 심층 분석, 28~60레벨 로드맵
  - `03-settings-and-addons.md`: 인게임 설정법(`누르고 있어 시전` + `[@cursor]`) 및 추천 애드온(`1.60.1`)·출처 레지스트리
  - `04-stats-and-formulas.md`: 기본 스탯별 상승 수치(체력+10/지능+15·극대화/정신력) 및 통합 적중·치명타 150%·가속 GCD 1.0초·관통력 공식
  - `05-leveling-camping-and-dungeon-rules.md`: 경험치·캠핑·텐트·인던 12레벨 차 패널티 & 마나 5초 규칙(5SR)
  - `06-patch-notes-kst.md`: 최근 패치노트 & 핫픽스(KST) — **최상단 내 캐릭터 직·간접 영향 요약 필수**
  - `07-dashboard-design-guide.md`: 대시보드(Memphis Edition) 디자인·타이포·가로 타임라인·다크모드·삭제 가능 토글(`.dismissible-fold`)·툴팁 동기화 표준 (모든 에이전트 필수 준수)
- **`@docs/02-growth/` (성장 관련)**:
  - `01-character-and-talents.md`: 26레벨 캐릭터 상태(HP 642 / MP 1,380 / 비전 +121) 및 비전 17포인트 특성 분석·향후 로드맵
  - `02-skills-and-rotation.md`: 레벨별 핵심 스킬 습득표 및 단일/다수 실전 딜 사이클
  - `03-leveling-and-zones.md`: 26~40레벨 얼라이언스 사냥터 및 핵심 던전 가이드
  - `04-gear-and-upgrades.md`: `WearingGear_261118` + `261119` 착용 장비 14부위 전수 분석 및 26~35레벨 추천 아이템
- **`@docs/03-adventure/` (모험 관련)**:
  - `01-professions-roadmap.md`: 마법부여(71→175), 무두질(152→300), 요리(76), 낚시(5), 응급치료(91) 통합 로드맵 및 부위별 마법부여 도감
  - `02-quests-and-class-chains.md`: 마법사 전용 직업 퀘스트 및 던전 핵심 퀘스트
  - `03-library-books-and-study.md`: 도서관 책 찾기(Library Books) 및 마법사 전용 `두루마리 이해` / `연구(Study)` 가이드
  - `04-maps-and-npcs.md`: 스톰윈드·아조라의 탑·주요 거점 NPC 좌표 사전 및 이동 경로
- `@assets/screenshots/`: 인게임 실측 검증 스크린샷 원본 보관소 (`WearingGear_261118/` 포함)
