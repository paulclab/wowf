# 03. 인게임 설정법 & 설치 애드온 관리 (`1.60.1`)

## 1. 비전 마법사 필수 인게임 설정법 (`1.60.1` 클라이언트 기준)

### A. `누르고 있어 시전 (Press and Hold Casting)`과 매크로·마법진 관계
- **핵심 제한 (`[✅ 인게임 실측]` + [Blizzard 공식 포럼](https://us.forums.blizzard.com/))**:
  - `설정 -> 전투 -> 누르고 있어 시전`(CVar: `ActionButtonUseKeyHeldSpell`)은 **마법책(P)에서 직접 단축바에 끌어다 놓은 순수 주문(Spell)에만 작동**합니다.
  - **`[nochanneling:신비한 화살]` 같은 조건문이나 `/cast`가 들어간 매크로 버튼에서는 `누르고 있어 시전`이 아예 동작하지 않으므로**, `비전 작렬`을 꾹 눌러 연속 시전하려면 반드시 **마법책 순정 스킬**을 올려야 합니다.
  - 또한 `ActionButtonUseKeyDown 1` (`/console ActionButtonUseKeyDown 1`) 및 기본 행동단축바 사용 여부에 따라 동작 안정성이 달라집니다.
- **지면 광역기(`눈보라`, `불기둥`) 마법진 클릭 시전 희망 시**:
  1. 매크로가 `누르고 있어 시전`에서 제외되는 특성을 이용해 **단순 매크로(`/cast 눈보라`)**로 올렸을 때 마법진이 유지되는지 먼저 확인 (`⚠️ 인게임 확인 필요`).
  2. 그래도 즉시 시전 버그가 나면 **`Grounded` 애드온**을 사용하거나 `/console ActionButtonUseKeyHeldSpell 0`을 테스트하세요.

### B. 전투 가시성 및 시야/조작 추천 설정
| 메뉴 경로 | 설정 항목 | 권장값 | 이유 (비전 마법사 기준) |
| :--- | :--- | :--- | :--- |
| `설정 -> 게임플레이 -> 전투` | **대상의 대상 (Target of Target)** | **켜기** | 파티/던전 사냥 시 몹의 어그로가 탱커에게 있는지 내게 튀었는지 즉시 확인 |
| `설정 -> 게임플레이 -> 전투` | **적 시전바 표시 (이름표)** | **켜기** | 24레벨에 배운 `마법 차단`(Off-GCD)으로 마우스오버 칼차단 수행 |
| `설정 -> 게임플레이 -> 이름 / 이름표` | **아군 NPC 체력바 끄기 (`SoftTargetNameplateInteract 0`)** | **꺼짐 (`Shift+V` + 콘솔 `0`)** | `NPC 이름 표시: 없음`이어도 상인 접근 시 체력바가 뜨면 채팅창에 `/console SoftTargetNameplateInteract 0` 입력 시 즉시 해결 (`[✅ 인게임 실측]`) |
| `설정 -> 게임플레이 -> 인터페이스` | **자동 전리품 획득 (Auto Loot)** | **켜기** | 사냥 후 빠른 루팅 및 **무두질(현재 152)** 연속 채집 속도 단축 |
| `설정 -> 게임플레이 -> 컨트롤` | **시점 최대 거리 (Max Camera Distance)** | **최대** | 30미터 사거리 밖에서 로밍 몹(애드) 조기 파악 |

---

## 2. 로컬 실측 설치 애드온 관리부 (`2026-11-25` 직접 스캔 ✅)
- **스캔 경로 (영구 등록)**: `C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns`
- **캐릭터 활성 설정**: `C:\Program Files (x86)\World of Warcraft\_forever_\WTF\Account\1524025208#1\92\폴-최\AddOns.txt`
- **진단 요약**: **총 26개 스위트 (71개 폴더)** · **24/26 스위트(62/71 폴더) `Interface: 16001` (`1.60.1`) 지원 ✅** (`BetterBlizzFrames`, `Details!` 계열은 `120105` TOC) · **정면 충돌 `0건` ✅** *(기존 충돌 원인이던 `Forever Minimap` 삭제 완료 → `SquareMinimap 1.4.8` 단독 운영 중!)*

### A. 진단 & 최적화 포인트 (`2026-11-25` 실측)
1. **✅ 11/25 애드온 업데이트 4종 & 신규 설치 2종 (`Shadowflare` · `QuestieDB` · `ForeverDungeonJournal` · `ForeverLevelingBiS` + `EzWoW-MapFinder` · `LayerSwap`)**:
   - `ForeverDungeonJournal (2.1.5)`: **한국어 클라 붉은십자군 수도원 방 이름(`Crusader's Chapel` 등) 인식 보정(`ScarletWing.lua`)** · **울다만 `Obsidian Sentinel(흑요석 파수병)` 드랍 테이블 복구** · 티어 0.5(던전 세트 2) 29단계 퀘스트 체인/상자 미리보기 페이지 추가 · 홈 `Edit Mode`(카드 순서/작은 카드 4열/리스트 전환) · `Options > General > Hide chat lines` · 입찰 주사위 로그 수정 추가!
   - `ForeverLevelingBiS (v1.5.0)`: **다중 위시리스트 & 전 캐릭터 공용 Account 위시리스트(최대 8개)** 신설(별 아이콘 우클릭으로 목록 선택 가능) · **60레벨 적중 상한(Hit Cap) 게이지** · **60레벨 공격대 시뮬레이션 기반 스탯 가중치** 적용! *(단, 월드 드랍 BoE 출처 텍스트는 여전히 미표기)*
   - `Shadowflare (0.26.5)`: **중첩 최대치 별도 스타일/위치 지정 (`At the maximum`)** 신설 + 전사 `Overpower` 전투 직전/재발동 트리거 및 `/flare debug` 추가.
   - `QuestieDB (1.1.6)`: `[Forever]` 퀘스트 경험치 데이터 재갱신, `Tattered Journal` 시작점 추가, `Thunder Lizard Blood` / `Super Reaper 6000 Blueprints` 드랍률 보정, NPC 부제목·번역 갱신.
   - `EzWoW-MapFinder (2.0.48 + Data 1.0.18, 22폴더)`: 오프라인 몹·NPC·오브젝트·퀘스트·아이템·희귀몹 위치 검색 및 웨이포인트 안내. *(8개국 언어팩 중 한국어/영문 외 6개국 `EzWoW-Data-Names-*` 폴더는 비활성화해 메모리 절약 가능)*
   - `LayerSwap (1.14.53)`: 현재 위상(Layer) 표시 및 원클릭 위상 이동(`/ls`), 시간당 이동 제한 추적, 동일 샤드 호스트 `300초` 제외 및 초대/시스템 채팅 스팸 숨김 지원.
2. **✅ 기존 로컬 패치 유지 확인 (`Details!` · `Attune` · `Auctionator`)**:
   - `Details! (20261109.15410.172)` **한국어 메뉴 글꼴 깨짐(`□□□`) 패치 적용**: `Libs/DF/cooltip.lua` 1168/1282행의 `--fontFace = font or fontFace` 주석 버그 수정, `Libs/DF/languages.lua`의 `DetectLanguageId` 한글 UTF-8 범위 직접 감지 추가, `core/windows.lua` `CooltipPreset` `koKR` 기본 글꼴 분기 적용. *(인게임 `/reload` 시 즉시 반영)*
   - `Attune (16001-45)` **한국어(`koKR`) 미번역·영문 혼재 패치 적용**: `Locales/koKR.lua` 미번역 지역명·UI 8종 번역 보완 + `Attune.lua`에 `Attune_InitLiveKoKRLocale()` 프록시 추가(미번역/누락 `Q1_` 퀘스트·`I_` 아이템을 한국어 클라이언트 API `C_QuestLog.GetTitleForQuestID` / `GetItemInfo`로 자동 조회·비동기 재렌더). *(인게임 `/reload` 시 즉시 반영)*
   - `Auctionator (352)`: 본가 `352` 업데이트에 한국어/타 언어 툴팁 수정(`DBKeyFromLink.lua`의 `else callback({basicKey}) end`)이 공식 반영되었습니다! *(단, 우리가 추가했던 `not name or not baseName` nil 가드와 `Tooltips\Main.lua`의 `pcall` 가드는 352 덮어쓰기로 초기화됨)*
   - `Mastercraft (2.1.1)`: `2.1.0`의 **Crafters 기능 완전 끄기 스위치**·**원형 채집 노드 아이콘**·서버/룰셋 분리·정수(1 상급=3 하급) 통합 계산·낚시/회색템/화살 우편 수정에 더해 `2.1.1`에서 타 경매 애드온(`AuctionMaster` 등)과의 제작창 UI 겹침 보정이 추가되었습니다.
   - `CharExport (2.3.1)`: 로컬 커스텀 애드온 — `/ce`(캐릭터 스탯·버프·특성·장비·스킬 전용, 시세 제외), `/cea` 또는 `/ce ah`(제작재료 114종 시세 전용), `/ceall` 또는 `/ce all`(캐릭터+시세 전체 통합) 지원. **① 무두질·가죽/비늘(27종, 사냥터 최적화용)** · **② 마법부여(52종, 1~300·막대·오일·포에버 특수)** · **③ 재봉술·옷감/캐스터 템(35종, 전환 1~300·장비 제작용)** 총 **114종** 추적.
   - `BetterBlizzFrames (v2.2.3c)`: `.toc` Interface가 `120105, 120100`으로 표기되어 있어 접속 시 '구버전 애드온 불러오기' 체크 필요.
3. **✅ `RangeDisplay (v6.3.7)` — `폴-최` 활성 확인 (`enabled`, 적대적 대상 전용)**: `SavedVariables\RangeDisplay.lua` 실측상 `enemyOnly = true`, `mouseover = false`, 장거리 구간 `lrSection = 33m`로 설정되어 있습니다. *(비전 마법사 주력 사거리 `30m`에 맞춰 `/rangedisplay` → Target → `30`으로 조정 시 사거리 구분이 더욱 선명합니다.)*
4. **🟡 메모리·로딩 경량화 선택 정리 대상**:
   - `EzWoW-Data-Names-*` (`deDE`·`esES`·`frFR`·`ruRU`·`zhCN`·`zhTW` 6종): `koKR`·`enUS` 외 언어팩은 비활성화해도 정상 작동.
   - `SpokenQuestsAudioHorde_koKR (v0.0.3)`: 얼라이언스(`폴-최`) 전용 플레이 시 꺼두면 로딩/메모리 절약 가능.
   - `QuestieTrace (1.14.0)` & `SpokenContributions (3.12.1)`: 개발자 DB 제보/수집용 로거이므로 기여 목적이 아니면 비활성화해도 본 기능 정상 작동.
   - `Details_Streamer` / `Details_Vanguard`: 방송/탱커 전용 플러그인이라 평소 꺼둬도 무방.

### B. 전체 설치 애드온 26종 (71폴더) 실측 목록 (`2026-11-25` 기준)

| 분류 | 스위트 / 폴더명 | 설치 버전 (`.toc`) | `16001` | 상태 및 핵심 역할 |
| :--- | :--- | :--- | :---: | :--- |
| **전투 · 프록 · 딜미터** (4종 / 12폴더) | **`Details!`** (+7 플러그인: `Compare2`, `DataStorage`, `EncounterDetails`, `RaidCheck`, `Streamer`, `TinyThreat`, `Vanguard`) | `20261109.15410.172` | `120105` | 활성 · 실시간 DPS·주문별 비중·어그로(`TinyThreat`)·차단 분석 *(한글 메뉴 패치)* |
| | **`Shadowflare`** | `0.26.5` | ✅ | **활성 (`enabled`)** · 포에버 전용 프록 알림 (`화살 탄막` · `신비한 정신 집중` · 최대 중첩 별도 스타일) |
| | **`ForeverCombatText`** | `0.17.0` | ✅ | **활성 (`enabled`)** · 네임플레이트 주문 학파 색상 전투 피해 텍스트 |
| | **`RangeDisplay`** (+`_Options`) | `v6.3.7` | ✅ | **활성 (`enabled`)** · 적대적 대상 전용 (`enemyOnly = true`, 33m 경계) |
| **지도 · 퀘스트 · 던전 · 도서관** (9종 / 33폴더) | **`Questie`** + **`QuestieDB`** + **`QuestieTrace`** | `12.13.0` / `1.1.6` / `1.14.0` | ✅ | **활성 (`enabled`)** · 포에버 퀘스트 핀/추적 + DB (`Trace`는 수집 로거) |
| | **`EzWoW-MapFinder`** (+`EzWoW-Data*` 21폴더) | `2.0.48` / `1.0.18` | ✅ | 활성 · 오프라인 몹·NPC·오브젝트·희귀·퀘스트 위치 검색 & 웨이포인트 |
| | **`Books_on_map_Forever`** | `2.4.0` | ✅ | 활성 · **와우 포에버 도서관 책 월드맵 핀 표시!** |
| | **`OpenMap`** + **`OpenMap_NoDungeonMap`** | `v0.8.13` / `v1.2` | ✅ | 활성 · 끊김 없는 통합 세계 지도 + 던전 도감 호환 패치 |
| | **`SquareMinimap`** | `1.4.8` | ✅ | 활성 · 포에버 사각 브론즈 프레임 미니맵 (**단독 구성 → 충돌 해소 ✅**) |
| | **`TomTom`** | `v4.4.1-release` | ✅ | 활성 · `/way` 좌표 화살표 내비게이션 |
| | **`ForeverDungeonJournal`** | `2.1.5` | ✅ | 활성 · 클래식/포에버 던전 보스·드랍템·퀘스트·티어0.5 도감 |
| | **`Attune`** | `16001-45` | ✅ | **활성 (`enabled`)** · 던전·공격대 입장 연퀘 진행도 추적 *(한글 실시간 조회 패치)* |
| | **`ForeverLootSparkles`** | `v2.0.0` | ✅ | 활성 · 루팅·퀘스트 오브젝트 반짝임 효과 상시 유지 |
| **경제 · 가방 · 전문기술 · 성장** (6종 / 7폴더) | **`ForeverLevelingBiS`** | `v1.5.0` | ✅ | 활성 · **다중·계정 공용 위시리스트 + 레벨·직업·특성별 BiS 추천 UI** |
| | **`CharExport`** *(로컬 커스텀 ✅)* | `2.3.1` | ✅ | 활성 · **`/ce` 캐릭터 전용 + `/cea` 시세 전용 + `/ceall` 전체 출력 (114종)** |
| | **`Auctionator`** | `352` | ✅ | 활성 · 경매장 스캔·최저가 출품·시세 툴팁 (`352` 공식 다국어 툴팁 수정 포함) |
| | **`Mastercraft`** | `2.1.1` | ✅ | 활성 · 전문기술 가이드·수익·**마력 추출 vs 상점가 자동 비교** |
| | **`Baganator`** + **`Syndicator`** | `868` / `293` | ✅ | 활성 · 통합 가방 UI + 계정/은행 전체 재고 추적 |
| | **`WhatsTraining`** | `11.4.9` | ✅ | 활성 · 마법책에 레벨별 습득 가능 스킬 & 비용 미리보기 |
| **UI · 편의 · 위상 · 음성** (7종 / 19폴더) | **`LayerSwap`** | `1.14.53` | ✅ | 활성 · 현재 위상(Layer) 표시 · 원클릭 위상 전환 · 시간당 제한 추적 (`/ls`) |
| | **`DialogueUI`** | `1.0.7 c` | ✅ | 활성 · 몰입형 카드 퀘스트 대화창 & 키보드 단축 선택 |
| | **`ForeverMove`** | `1.6.4` | ✅ | 활성 · 블리자드 모든 UI 창 자유 드래그 이동 (`/fm`) |
| | **`ForeverMouseTooltip`** | `@project-version@` | ✅ | 활성 · 기본 게임 툴팁을 마우스 커서 위치에 고정 |
| | **`BetterBlizzFrames`** | `v2.2.3c` | `120105` | 블리자드 기본 프레임 버프 필터·전투 표시 커스터마이즈 |
| | **`WhisperMessenger`** | `v2.1.9` | ✅ | 활성 · 귓속말 메신저 통합 기록/응답 |
| | **`Spoken`** (`Bosses`·`Places`·`Quests`·`Readables`·`Contributions` + 한국어 음성팩 7종) | `3.12.1` / `koKR` | ✅ | 활성 · 퀘스트/책/지역/보스 한국어 음성 내레이션 (`Horde` 팩은 선택 해제 가능) |

### C. 추가 추천 애드온 (`1.60.1` — 미설치 항목 중심)
- **[Better Spell Power Tooltips](https://www.curseforge.com/wow/addons/better-spell-power-tooltips)**: 현재 비전 유효 주문력(`+142`)과 `비전 작렬` 중첩이 반영된 실시간 예상 피해량을 툴팁에 표시.
- **[FindParty Forever](https://www.curseforge.com/wow/addons/findparty)** / **LFG Bulletin Board**: 채팅 파티 모집글을 던전별(놈리건·수도원 등)로 자동 분류·필터링.
- **MinimapButtonButton (또는 HidingBar)**: 미니맵 테두리 애드온 버튼이 많아졌을 때 하나의 드롭다운으로 깔끔하게 정리.
- **Plater Nameplates (선택)**: 30레벨 이후 던전·광역 사냥 시 적 시전바(`마법 차단` 타이밍)와 `변이`·`얼음 회오리` 디버프 잔여 시간을 이름표 위에 크게 표시.

---

## 3. 검증 출처 레지스트리 (Bookmark)
- **한국어 커뮤니티 & 데이터베이스**:
  - [WOWF.IO 한국어 포털](https://wowf.io/ko) / [마법사 매크로](https://wowf.io/ko/macros/mage) / [마법봉 선딜레이 뉴스](https://wowf.io/ko/news/auto-shot-wand-cast-bug)
  - [와우 인벤 포에버 게시판 (6567)](https://www.inven.co.kr/board/wow/6567) / [포에버 마법부여 공략](https://www.inven.co.kr/board/wow/6567/13897)
  - [와우 인벤 포에버 정보/핫픽스 게시판 (1896)](https://www.inven.co.kr/board/wow/1896)
  - `forg.gg` (`https://forg.gg/forever/dungeons`)
- **영문 공식 포럼 & 전문 데이터베이스**:
  - [Icy Veins WoW Forever Spell DB - Arcane Blast (#400574)](https://db.icy-veins.com/wow-forever/spells/400574) / [Shoot (#5019)](https://db.icy-veins.com/wow-forever/spells/5019)
  - [ConquestCapped Enchanting Guide](https://conquestcapped.com/guides/wow-forever/wow-forever-enchanting/) / [Mage Abilities](https://conquestcapped.com/guides/wow-forever/wow-forever-mage-abilities/)
  - [ForeverGuide Enchanting](https://foreverguide.net/professions/enchanting/)
  - [Zockify Enchanting Recipes](https://www.zockify.com/forever/professions/enchanting/recipes/) / [Mage Macros](https://www.zockify.com/forever/mage/macros/)
  - [Method WoW Forever Enchants](https://www.method.gg/wow-forever/all-enchanting-recipes-and-best-enchants-in-wow-forever)
  - [BlizzardWatch Every New Enchant](https://blizzardwatch.com/2026/09/21/every-new-enchant-world-warcraft-forever/)
  - [StillSixty Enchanting Scrolls](https://www.stillsixty.com/guides/enchanting-scrolls)
