# WoW Forever (`1.60.1`) 비전 마법사 지식베이스 디렉토리 인덱스

이 문서는 **26레벨 얼라이언스 인간 비전 마법사**의 성장을 추적하고 와우 포에버(World of Warcraft: Forever) 전용 검증 데이터를 카테고리별로 관리하는 통합 목차입니다.

---

## 📂 디렉토리 구조 요약

```text
docs/
├── README.md                                   # 전체 지식베이스 통합 목차 (현재 파일)
├── 01-system/                                  # [시스템 관련] 메커니즘, 스탯 계수, 경험치/전투 규칙, 매크로, 설정/애드온
│   ├── 01-mechanics-and-damage.md              # 인게임 실측 메커니즘(GCD/마법봉) & 비전 법사 딜 계산식
│   ├── 02-macros-book.md                       # 26레벨 실전 매크로 북 (2·3레벨 신화 비교 및 28~60 로드맵)
│   ├── 03-settings-and-addons.md               # 인게임 필수 설정법(누르고 있어 시전 등) & 1.60.1 추천 애드온
│   ├── 04-stats-and-formulas.md                # 스탯별 증가 수치(체력+10/지능+15·치명타/정신력) & 2차 스탯 공식
│   ├── 05-leveling-camping-and-dungeon-rules.md # 경험치·캠핑·휴식·인던 레벨차 패널티 & 5초 규칙/전투 메커니즘
│   └── 06-patch-notes-kst.md                   # 최근 패치노트 & 핫픽스(KST) — 최상단 내 캐릭터 영향 요약 고정
├── 02-growth/                                  # [성장 관련] 캐릭터/특성, 스킬/사이클, 사냥터/던전, 장비/아이템
│   ├── 01-character-and-talents.md             # 26레벨 캐릭터 스냅샷(261118) & 비전 특성(17pt) 분석·로드맵
│   ├── 02-skills-and-rotation.md               # 레벨별 핵심 스킬 습득표 & 단일/광역 딜 사이클·마나 관리
│   ├── 03-leveling-and-zones.md                # 26~40레벨 얼라이언스 사냥터 & 던전(지하감옥/놈리건/수도원) 가이드
│   └── 04-gear-and-upgrades.md                 # WearingGear_261118 장비 정밀 분석 & 26~35레벨 추천 아이템
└── 03-adventure/                               # [모험 관련] 전문기술, 퀘스트, 도서관 책찾기, 지도/NPC
    ├── 01-professions-roadmap.md               # 마법부여(71)·무두질(152)·요리(76)·낚시(5)·응급치료(91) 루트
    ├── 02-quests-and-class-chains.md           # 26~35레벨 마법사 직업 퀘스트 & 던전/필드 핵심 퀘스트
    ├── 03-library-books-and-study.md           # 도서관 책 찾기(Library Books) & 마법사 전용 연구/두루마리 해독
    └── 04-maps-and-npcs.md                     # 지역별 핵심 NPC 좌표(교관·상인·사서) & 이동 경로
```

---

## 1. 시스템 관련 (`docs/01-system/`)
- **[01-mechanics-and-damage.md](../docs/01-system/01-mechanics-and-damage.md)**: `비전 작렬`(스샷 기준 1.3초 시전), `화염 작렬`(On-GCD), `마법봉 발사`(기본 `1.60 - 0.50 = 1.1초`, **가속 15% 버프 시 `0.96초`** 및 비대칭 GCD) 실측 메커니즘과 **현재 비전 유효 주문력(`+121`) 기반 딜 계산 공식**
- **[02-macros-book.md](../docs/01-system/02-macros-book.md)**: 사용자 표준 동시 배치형 포맷(`!마법봉 발사`), 24레벨 습득 `신비한 화살(3 레벨)` / `2 레벨` 매크로 및 28~60레벨 확장 로드맵
- **[03-settings-and-addons.md](../docs/01-system/03-settings-and-addons.md)**: `누르고 있어 시전` + `[@cursor]` 광역기 설정, 시야/전투 옵션, `1.60.1` 필수 애드온(`Auctionator`, `Better Spell Power Tooltips`, `Books_on_map_Forever`)
- **[04-stats-and-formulas.md](../docs/01-system/04-stats-and-formulas.md)**: 체력(+10 HP)·지능(+15 마나/극대화/`비전 작렬` 12%)·정신력(`13+정신/4`, 인간 +10%, `신비한 명상`+`마법사 갑옷`), 통합 적중(4%/17%)/치명타 150%/가속 GCD 1.0초 하한/저항·주문 관통력 공식
- **[05-leveling-camping-and-dungeon-rules.md](../docs/01-system/05-leveling-camping-and-dungeon-rules.md)**: 요리 `포만감`(+5% 처치 XP)·`아늑한 침낭`(+1~3%)·캠핑/텐트(5% 휴식 XP)·`생선 그릇`(+8% 기본 스탯), 인던 12레벨 차 패널티, 마나 5초 규칙(5SR) & 시전 밀림 방어
- **[06-patch-notes-kst.md](../docs/01-system/06-patch-notes-kst.md)**: 최근 와우 포에버 공식 핫픽스 & 패치노트(KST) — **최상단에 내 캐릭터 직·간접 영향 요약 고정**

## 2. 성장 관련 (`docs/02-growth/`)
- **[01-character-and-talents.md](../docs/02-growth/01-character-and-talents.md)**: 26레벨 캐릭터 상태(HP 642 / MP 1,380 / 비전 +121) 및 비전 17포인트(`마법봉 전문화 2/2`, `정신 집중 연마 5/5`, `신비한 미묘함 2/2`, `신비한 정신 집중 4/5`, `화살 탄막 2/2`, `비전 작렬 1/1`, `비전 격노 1/1`) 분석과 27~40레벨 특성 로드맵
- **[02-skills-and-rotation.md](../docs/02-growth/02-skills-and-rotation.md)**: 24~40레벨 마법사 핵심 스킬 습득표(`마나 마노`, `냉정`, `마법사 갑옷`) 및 단일/다수 실전 딜 사이클
- **[03-leveling-and-zones.md](../docs/02-growth/03-leveling-and-zones.md)**: 26~40레벨 얼라이언스 필드 사냥터(저습지·그늘숲·힐스브래드·가시덤불 골짜기) 및 던전(지하감옥·놈리건·붉은십자군 수도원) 루트
- **[04-gear-and-upgrades.md](../docs/02-growth/04-gear-and-upgrades.md)**: `WearingGear_261118` + `261119` 착용 장비 14부위 전수 분석(비전 주문력 +121, HP 642/MP 1,380, 추가 체력 +19) 및 26~35레벨 부위별 추천 아이템

## 3. 모험 관련 (`docs/03-adventure/`)
- **[01-professions-roadmap.md](../docs/03-adventure/01-professions-roadmap.md)**: **마법부여(71→175)**, **무두질(152→300)**, **요리(76→225, 처치 경험치 +5%)**, **응급치료(91→225)**, **낚시(5→150)** 맞춤 루트 및 부위별 마법부여 도감
- **[02-quests-and-class-chains.md](../docs/03-adventure/02-quests-and-class-chains.md)**: 마법사 전용 직업 퀘스트(30레벨 `타베사` 마법봉 연퀘 등) 및 스톰윈드 지하감옥·놈리건·수도원 핵심 퀘스트
- **[03-library-books-and-study.md](../docs/03-adventure/03-library-books-and-study.md)**: 와우 포에버 고유 콘텐츠 **도서관 책 찾기(Library Books)** 10/20/25권 보상 및 마법사 전용 **`두루마리 이해` / `연구(Study)`** 시스템
- **[04-maps-and-npcs.md](../docs/03-adventure/04-maps-and-npcs.md)**: 스톰윈드·아조라의 탑·잿빛골짜기·아라시 고원·무법항 핵심 NPC 좌표 사전 및 그리폰 해금 동선
