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
- **진단 요약**: **총 26개 스위트 (71개 폴더)** · **24/26 스위트(62/71 폴더) `Interface: 16001` (`1.60.1`) 지원 ✅** (`BetterBlizzFrames`, `Details!` 계열은 `120105` TOC) · **정면 충돌 `0건` ✅** · **`Details!` + `Attune` 한글 로컬 패치 모두 적용 완료 ✅**

### A. 진단 & 최적화 포인트 (`2026-11-25 11:37` 실측)
1. **✅ 11/25 2차 애드온 업데이트 7종 (`Details!` 한글 재패치 완료 · `Auctionator` · `Questie` · `LayerSwap` · `SquareMinimap` · `Spoken` · `EzWoW-MapFinder`)**:
   - **`Details! (20261124.15450.172)` — ✅ 한글 메뉴 글꼴 재패치 완료**: 그룹 창 개별 크기 유지 옵션(`Keep Size of Grouped Windows`), `Animate Bars` 이동, 비전투 자동 숨김 깜빡임/비교 리포트 오류/전투 중 상세창 차단/사망 시간 `??`/기본 글꼴 선택 목록 수정이 반영되었습니다. 업데이트로 초기화되었던 한글 패치를 즉시 재적용(`Libs/DF/cooltip.lua` 1168·1283행 `fontFace = font or fontFace`, `Libs/DF/languages.lua` `DetectLanguageId` 한글 UTF-8 선감지, `core/windows.lua` `CooltipPreset` `koKR` `"2002"` 분기)했습니다. *(인게임 `/reload` 시 즉시 적용)*
   - **`Auctionator (353)`**: 접두사/접미사(Suffix) 전체 문자열 대신 인덱스만 저장하도록 경량화(CBOR 오류 완화)하고, **타 언어(한국어 등) 랜덤 접미사 감지 수정**(`DBKeyFromLink.lua`에서 `SuffixesExtraChecks` bonusID 기반 로컬 이름 대조 추가)이 적용되었습니다. *(단, `Tooltips/Main.lua` 로컬 `pcall` 가드는 미적용 상태)*
   - **`Questie (12.14.0)`**: 블리자드 UI 오염(Taint) 추적용 **TaintWatch** 추가, `[Forever]` 지도가 없는 퀘스트도 추적기에서 상세창 열기 지원, `[Forever]` Strahad Farsan 흑마법사 상급자 표기, `ruRU` 번역 수정(`QuestieTrace 1.14.0` 동시 갱신).
   - **`LayerSwap (1.14.56)`**: `1.14.54~56` 반영 — 시간당 위상 이동 제한 기준을 포에버 실측(`build 71037`)에 맞춰 **10회 → 16회**로 상향(점 16개 표시), 포에버 위상 전환 시 요청 위상 미달성 경우를 제외하고 채팅 로그 출력 억제(조용한 전환), 포에버 호스트 응답 대기(`Host.SKIP`) 및 사설 서버 숫자 숨김.
   - **`SquareMinimap (1.5.0)`**: 미니맵 뒤 **그림자 패널(Shadow Panel)**(색상·투명도·오프셋·여백 조절)과 블리자드 미니맵 버튼 숨김 옵션(`hideTracking`·`hideCalendar`·`hideMail`·`hideCompartment`) 신설.
   - **`Spoken (3.13.0)` & `EzWoW-MapFinder (2.0.49 / Data 1.0.19)`**: `Spoken` 6개 코어 모듈(`Spoken`, `_Quests`, `_Places`, `_Bosses`, `_Readables`, `SpokenContributions`)이 `3.13.0`으로, `EzWoW-MapFinder` 본체(`2.0.49`)와 데이터 21폴더(`1.0.19`)가 버전업되었습니다 *(로컬 별도 체인지로그 미포함)*.
2. **✅ 11/25 1차 업데이트 4종 (`ForeverDungeonJournal 2.1.5` · `ForeverLevelingBiS v1.5.0` · `Shadowflare 0.26.5` · `QuestieDB 1.1.6`)**:
   - `ForeverDungeonJournal (2.1.5)`: **한국어 클라 붉은십자군 수도원 방 이름 인식 보정(`ScarletWing.lua`)** · **울다만 `Obsidian Sentinel` 드랍 복구** · 티어 0.5 29단계 연퀘/상자 미리보기 · 홈 `Edit Mode` · `Hide chat lines` · 주사위 로그 수정 추가!
   - `ForeverLevelingBiS (v1.5.0)`: **다중·전 캐릭터 공용 위시리스트(최대 8개)** · **60레벨 적중 상한 게이지** · **60레벨 공격대 스탯 가중치** 적용! *(월드 드랍 BoE 출처 미표기 유지)*
   - `Shadowflare (0.26.5)`: **중첩 최대치 별도 스타일/위치 (`At the maximum`)** + `Nothing` 중첩 점 제거 + 전사 `Overpower` & `/flare debug`.
   - `QuestieDB (1.1.6)`: `[Forever]` 퀘스트 경험치 데이터 재갱신, `Tattered Journal` 시작점, 드랍률/NPC 부제목·번역 갱신.
3. **✅ 로컬 커스텀 & 유지 중인 패치 (`Attune` · `Mastercraft` · `CharExport`)**:
   - `Attune (16001-45)` **한국어(`koKR`) 미번역·영문 혼재 패치 유지 ✅**: `Locales/koKR.lua` + `Attune.lua` `Attune_InitLiveKoKRLocale()` 프록시 intact.
   - `Mastercraft (2.1.1)` · `CharExport (2.3.1)`(`/ce`·`/cea`·`/ceall`, 114종) · `BetterBlizzFrames (v2.2.3c)`(`120105` 구버전 체크 필요) · `RangeDisplay (v6.3.7)`(`enemyOnly = true`, `33m` → `30m` 권장) 정상 유지.
4. **🟡 메모리·로딩 경량화 선택 정리 대상**:
   - `EzWoW-Data-Names-*` (`deDE`·`esES`·`frFR`·`ruRU`·`zhCN`·`zhTW` 6종): `koKR`·`enUS` 외 언어팩은 비활성화해도 정상 작동.
   - `SpokenQuestsAudioHorde_koKR (v0.0.3)`: 얼라이언스(`폴-최`) 전용 플레이 시 꺼두면 로딩/메모리 절약 가능.
   - `QuestieTrace (1.14.0)` & `SpokenContributions (3.12.1)`: 개발자 DB 제보/수집용 로거이므로 기여 목적이 아니면 비활성화해도 본 기능 정상 작동.
   - `Details_Streamer` / `Details_Vanguard`: 방송/탱커 전용 플러그인이라 평소 꺼둬도 무방.

### B. 전체 설치 애드온 26종 (71폴더) 실측 목록 (`2026-11-25 11:23` 기준)

| 분류 | 스위트 / 폴더명 | 설치 버전 (`.toc`) | `16001` | 상태 및 핵심 역할 |
| :--- | :--- | :--- | :---: | :--- |
| **전투 · 프록 · 딜미터** (4종 / 12폴더) | **`Details!`** (+7 플러그인: `Compare2`, `DataStorage`, `EncounterDetails`, `RaidCheck`, `Streamer`, `TinyThreat`, `Vanguard`) | `20261124.15450.172` | `120105` | 활성 · 실시간 DPS·주문별 비중·어그로(`TinyThreat`)·차단 분석 *(한글 메뉴 재패치 완료 ✅)* |
| | **`Shadowflare`** | `0.26.5` | ✅ | **활성 (`enabled`)** · 포에버 전용 프록 알림 (`화살 탄막` · `신비한 정신 집중` · 최대 중첩 별도 스타일) |
| | **`ForeverCombatText`** | `0.17.0` | ✅ | **활성 (`enabled`)** · 네임플레이트 주문 학파 색상 전투 피해 텍스트 |
| | **`RangeDisplay`** (+`_Options`) | `v6.3.7` | ✅ | **활성 (`enabled`)** · 적대적 대상 전용 (`enemyOnly = true`, 33m 경계) |
| **지도 · 퀘스트 · 던전 · 도서관** (9종 / 33폴더) | **`Questie`** + **`QuestieDB`** + **`QuestieTrace`** | `12.14.0` / `1.1.6` / `1.14.0` | ✅ | **활성 (`enabled`)** · 포에버 퀘스트 핀/추적 + DB (`TaintWatch` 추가 · `Trace`는 수집 로거) |
| | **`EzWoW-MapFinder`** (+`EzWoW-Data*` 21폴더) | `2.0.49` / `1.0.19` | ✅ | 활성 · 오프라인 몹·NPC·오브젝트·희귀·퀘스트 위치 검색 & 웨이포인트 |
| | **`Books_on_map_Forever`** | `2.4.0` | ✅ | 활성 · **와우 포에버 도서관 책 월드맵 핀 표시!** |
| | **`OpenMap`** + **`OpenMap_NoDungeonMap`** | `v0.8.13` / `v1.2` | ✅ | 활성 · 끊김 없는 통합 세계 지도 + 던전 도감 호환 패치 |
| | **`SquareMinimap`** | `1.5.0` | ✅ | 활성 · 포에버 사각 브론즈 프레임 미니맵 (**그림자 패널·버튼 숨김 추가**) |
| | **`TomTom`** | `v4.4.1-release` | ✅ | 활성 · `/way` 좌표 화살표 내비게이션 |
| | **`ForeverDungeonJournal`** | `2.1.5` | ✅ | 활성 · 클래식/포에버 던전 보스·드랍템·퀘스트·티어0.5 도감 |
| | **`Attune`** | `16001-45` | ✅ | **활성 (`enabled`)** · 던전·공격대 입장 연퀘 진행도 추적 *(한글 실시간 조회 패치)* |
| | **`ForeverLootSparkles`** | `v2.0.0` | ✅ | 활성 · 루팅·퀘스트 오브젝트 반짝임 효과 상시 유지 |
| **경제 · 가방 · 전문기술 · 성장** (6종 / 7폴더) | **`ForeverLevelingBiS`** | `v1.5.0` | ✅ | 활성 · **다중·계정 공용 위시리스트 + 레벨·직업·특성별 BiS 추천 UI** |
| | **`CharExport`** *(로컬 커스텀 ✅)* | `2.3.1` | ✅ | 활성 · **`/ce` 캐릭터 전용 + `/cea` 시세 전용 + `/ceall` 전체 출력 (114종)** |
| | **`Auctionator`** | `353` | ✅ | 활성 · 경매장 스캔·최저가 출품·시세 툴팁 (`353` 접미사 인덱스 경량화·타언어 감지 보강) |
| | **`Mastercraft`** | `2.1.1` | ✅ | 활성 · 전문기술 가이드·수익·**마력 추출 vs 상점가 자동 비교** |
| | **`Baganator`** + **`Syndicator`** | `868` / `293` | ✅ | 활성 · 통합 가방 UI + 계정/은행 전체 재고 추적 |
| | **`WhatsTraining`** | `11.4.9` | ✅ | 활성 · 마법책에 레벨별 습득 가능 스킬 & 비용 미리보기 |
| **UI · 편의 · 위상 · 음성** (7종 / 19폴더) | **`LayerSwap`** | `1.14.56` | ✅ | 활성 · 현재 위상(Layer) 표시 · 원클릭 전환 · 시간당 16회 제한 추적 (`/ls`) |
| | **`DialogueUI`** | `1.0.7 c` | ✅ | 활성 · 몰입형 카드 퀘스트 대화창 & 키보드 단축 선택 |
| | **`ForeverMove`** | `1.6.4` | ✅ | 활성 · 블리자드 모든 UI 창 자유 드래그 이동 (`/fm`) |
| | **`ForeverMouseTooltip`** | `@project-version@` | ✅ | 활성 · 기본 게임 툴팁을 마우스 커서 위치에 고정 |
| | **`BetterBlizzFrames`** | `v2.2.3c` | `120105` | 블리자드 기본 프레임 버프 필터·전투 표시 커스터마이즈 |
| | **`WhisperMessenger`** | `v2.1.9` | ✅ | 활성 · 귓속말 메신저 통합 기록/응답 |
| | **`Spoken`** (`Bosses`·`Places`·`Quests`·`Readables`·`Contributions` + 한국어 음성팩 7종) | `3.13.0` / `koKR` | ✅ | 활성 · 퀘스트/책/지역/보스 한국어 음성 내레이션 (`Horde` 팩은 선택 해제 가능) |

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
