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

## 2. 로컬 실측 설치 애드온 관리부 (`2026-11-26 10:09` 직접 스캔 ✅)
- **스캔 경로 (영구 등록)**: `C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns`
- **캐릭터 활성 설정**: `C:\Program Files (x86)\World of Warcraft\_forever_\WTF\Account\1524025208#1\92\폴-최\AddOns.txt`
- **진단 요약**: **총 27개 스위트 (72개 폴더)** (`FindParty 0.8` 신규 설치 포함) · **25/27 스위트(63/72 폴더) `Interface: 16001` (`1.60.1`) 네이티브 지원 ✅** (`BetterBlizzFrames`, `Details!` 계열은 `120105` TOC) · **정면 충돌 `0건` ✅** · **`Details!` + `RangeDisplay` 로컬 패치 유지 ✅ · ⚠️ `Attune (16001-46)` 한글 실시간 조회 패치 및 `EzWoW-MapFinder (2.0.51)` `.toc` 주석 제외 패치 업데이트로 덮어쓰임 (`EzWoW`는 `2.0.51` 본가에 6개국어 자동 드랍 공식 반영)**

### A. 진단 & 최적화 포인트 (`2026-11-26 10:09` 실측)
1. **⚠️ 11/26 10:00 일괄 업데이트 14종 + `FindParty 0.8` 신규 설치 (로컬 패치 영향 포함)**:
   - **⚠️ `Attune (16001-45 → 16001-46)` — 한글 실시간 조회 로컬 패치 덮어쓰임**: 마라우돈 `Inside` 오표기 수정, 검은바위 나락 `Fragment of the Firelands` 추가, 번역 줄바꿈 수정, 완료 업적 소모품(`Black Tome` 등) 완료 유지가 반영되었으나, 업데이트로 **`Locales/koKR.lua` + `Attune.lua` 실시간 한국어 API 조회(`Attune_InitLiveKoKRLocale`) 로컬 패치가 초기화**되었습니다. *(원할 경우 즉시 재패치 가능)*
   - **✅ `EzWoW-MapFinder (2.0.49 → 2.0.51)` / `EzWoW-Data* (1.0.19 → 1.0.21)` — 본가 6개 외국어 자동 드랍 도입 (기존 `.toc` 수정은 덮어쓰임)**: `.toc`에서 6개국어 주석 제외 로컬 패치는 업데이트로 초기화되었으나, 제작자(`qqhrqqhr2`)가 `Core/SharedData.lua`에 **`dropUnusedBuiltInNames`를 공식 구현**해 `EzWoW-Data` 활성화 시 한국어·클라 언어 외 6개국어(`~11MB`)를 자동 드랍하고 옵션에서 선택할 때만 지연 로드합니다.
   - **`FindParty (0.8 · 신규 설치 11/26 00:28)`**: 파티찾기 채널 글을 던전/키워드별로 필터링하고 귓속말 신청·광고 자동화를 지원하는 한국어 지원(`Interface: 16001`, `/fp`) 애드온이 설치되어 미설치 추천 목록에서 설치 목록으로 이동했습니다.
   - **`ForeverLevelingBiS (v1.5.0 → v1.6.1)`**: **새로운 편집 모드(Edit Mode)**로 프로필 능력치 가중치를 레벨 구간별로 직접 편집할 수 있고, 설정에서 **간략한 아이템 툴팁(전문화별 상승치 한 줄 요약)**을 켤 수 있습니다. *(월드 드랍 BoE 출처 미표기는 동일)*
   - **`Auctionator (353 → 354)`**: 오타 수정 및 **Classic Era / 포에버에서 랜덤 접미사가 없는 일반 장비 툴팁 가격 표시 오류 수정**.
   - **`Questie (12.14.0 → 12.15.0)`**: 추적기 **"By Latest(최신순)" 정렬** 추가(로컬라이즈 지원), 퀘스트 완료 반납 시 **함께 자동 완료되는 연계 퀘스트 감지**, `[Forever]` SoD 전문기술 대체 퀘스트 숨김, 퀘스트 XP 비율 보정 및 지도 오염(Taint) 없이 추적기에서 상세창 바로 열기 수정. *(`QuestieTrace 1.14.0` 타임스탬프 동시 갱신)*
   - **`Mastercraft (2.1.1 → 2.1.3)`**: Crafters 공유 리스트 확장(채팅 리스트 간섭 없음), **Settings → Modules** 모듈별 On/Off 카드 추가, **요리 275~300 추천 변경(`Tender Wolf Steak` / `Nightfin Soup`)**, **원버튼 낚싯대 ↔ 무기/방패 교체 단축키**, 사망 상태 전문기술 창 열기 및 서버 캐릭터 필터 수정.
   - **`ForeverDungeonJournal (2.1.5 → 2.1.6)`**: PvP·전장(AV/AB/WSG/DI) 페이지 개편(고속 이동 포트레이트 5종 상단 정렬, 퀘스트 탭 하단 이동, 알터랙 대장·아라시 병참장교, Premier 세트 현재 전문화 우선 정렬·강조), 혈투의 전장 동/서/북 지구 버튼 및 첫 킬 시작 타이머, 희귀(`King Op`·`Mopes`)·사원 도안(`Mender's Leather Gauntlets`)·포에버 경로 arrow 개선.
   - **`Baganator (868 → 869)`**: `[Forever]` **ItemRack 연동 수정**, `Equipment Sets (auto)` 무효 우선순위 슬라이더 비활성화, 은행 우측 상단 버튼 순서 수정, `12.1.7` taint 수정, 게임패드 검색 비활성화 시 링크 버그 수정.
   - **`ForeverCombatText (0.17.0 → 0.18.0)`**: 아군 NPC 이름표 위 **선택형 Questie 퀘스트 상태 제목 표시**(골드 `?`/골드 `!`/회색 `?` 3개 독립 스위치, 기본 꺼짐), NPC 이름과 함께 페이드·색상 연동, 설정 스크롤바·Reset 위치 개선.
   - **`LayerSwap (1.14.56 → 1.14.57)`**: 시간당 `Who.CAP` 제한에 **거절된 그룹을 제외한 모든 파티 합류**를 정확히 합산, 실제 위상을 옮겨준 동일 샤드 호스트(`SAME_DECLINE_MAX`) 예외 처리, 단일 위상 지역 감지 및 거절 초대 시 사운드(`MuteSoundFile`) 깔끔 복원.
   - **`WhatsTraining (11.4.9 → 11.4.10)`**: 게임패드 오류 수정 및 브로커 표시 조건 오류 수정.
   - **`ForeverLootSparkles (v2.0.0 → v2.1.0)`** · **`Books_on_map_Forever (2.4.0 → 2.4.1)`** · **`Spoken (3.13.0 → 3.13.1)`**: `LootSparkles` 제작자 툴팁 라인 추가, `Books_on_map_Forever` 및 `Spoken` 6개 코어 모듈(+한글 음성 `Shared`/`Gossip` 0.0.3 타임스탬프 갱신) 버전 판올림.
2. **✅ 11/25 1차 업데이트 4종 (`ForeverDungeonJournal 2.1.5` · `ForeverLevelingBiS v1.5.0` · `Shadowflare 0.26.5` · `QuestieDB 1.1.6`)**:
   - `ForeverDungeonJournal (2.1.5)`: **한국어 클라 붉은십자군 수도원 방 이름 인식 보정(`ScarletWing.lua`)** · **울다만 `Obsidian Sentinel` 드랍 복구** · 티어 0.5 29단계 연퀘/상자 미리보기 · 홈 `Edit Mode` · `Hide chat lines` · 주사위 로그 수정 추가!
   - `ForeverLevelingBiS (v1.5.0)`: **다중·전 캐릭터 공용 위시리스트(최대 8개)** · **60레벨 적중 상한 게이지** · **60레벨 공격대 스탯 가중치** 적용! *(월드 드랍 BoE 출처 미표기 유지)*
   - `Shadowflare (0.26.5)`: **중첩 최대치 별도 스타일/위치 (`At the maximum`)** + `Nothing` 중첩 점 제거 + 전사 `Overpower` & `/flare debug`.
   - `QuestieDB (1.1.6)`: `[Forever]` 퀘스트 경험치 데이터 재갱신, `Tattered Journal` 시작점, 드랍률/NPC 부제목·번역 갱신.
3. **✅ 유지 중인 로컬 패치 (`Details!` · `RangeDisplay` · `CharExport`)**:
   - **`Details! (20261124.15450.172)`**: 이번 일괄 업데이트 대상에서 제외되어 **한글 메뉴 글꼴 로컬 패치(`cooltip.lua`·`languages.lua`·`windows.lua`)가 그대로 유지 ✅**되었습니다.
   - **`RangeDisplay (v6.3.7)`**: 이번 업데이트 대상에서 제외되어 **인던 내 `UnitGUID` Secret Value(`issecretvalue`) 미표시 로컬 패치(`LibRangeCheck-3.0.lua`)가 그대로 유지 ✅**되었습니다.
   - `CharExport (2.3.1)`(`/ce`·`/cea`·`/ceall`, 114종) · `BetterBlizzFrames (v2.2.3c)`(`120105` 구버전 체크 필요) 정상 유지.
4. **🟡 메모리·로딩 경량화 선택 정리 대상**:
   - `EzWoW-Data-Names-*` (`deDE`·`esES`·`frFR`·`ruRU`·`zhCN`·`zhTW` 6종): `koKR`·`enUS` 외 언어팩은 비활성화해도 정상 작동.
   - `SpokenQuestsAudioHorde_koKR (v0.0.3)`: 얼라이언스(`폴-최`) 전용 플레이 시 꺼두면 로딩/메모리 절약 가능.
   - `QuestieTrace (1.14.0)` & `SpokenContributions (3.13.1)`: 개발자 DB 제보/수집용 로거이므로 기여 목적이 아니면 비활성화해도 본 기능 정상 작동.
   - `Details_Streamer` / `Details_Vanguard`: 방송/탱커 전용 플러그인이라 평소 꺼둬도 무방.

### B. 전체 설치 애드온 27종 (72폴더) 실측 목록 (`2026-11-26 10:09` 기준)

| 분류 | 스위트 / 폴더명 | 설치 버전 (`.toc`) | `16001` | 상태 및 핵심 역할 |
| :--- | :--- | :--- | :---: | :--- |
| **전투 · 프록 · 딜미터** (4종 / 12폴더) | **`Details!`** (+7 플러그인: `Compare2`, `DataStorage`, `EncounterDetails`, `RaidCheck`, `Streamer`, `TinyThreat`, `Vanguard`) | `20261124.15450.172` | `120105` | 활성 · 실시간 DPS·주문별 비중·어그로(`TinyThreat`)·차단 분석 *(한글 메뉴 재패치 완료 ✅)* |
| | **`Shadowflare`** | `0.26.5` | ✅ | **활성 (`enabled`)** · 포에버 전용 프록 알림 (`화살 탄막` · `신비한 정신 집중` · 최대 중첩 별도 스타일) |
| | **`ForeverCombatText`** | `0.18.0` | ✅ | **활성 (`enabled`)** · 네임플레이트 주문 학파 피해 + 선택형 Questie NPC 상태 표시 |
| | **`RangeDisplay`** (+`_Options`) | `v6.3.7` | ✅ | **활성 (`enabled`)** · 대상 30m 사거리 표시 *(인던 Secret Value 패치 유지 ✅)* |
| **지도 · 퀘스트 · 던전 · 도서관** (9종 / 33폴더) | **`Questie`** + **`QuestieDB`** + **`QuestieTrace`** | `12.15.0` / `1.1.6` / `1.14.0` | ✅ | **활성 (`enabled`)** · 포에버 퀘스트 핀/추적 + 최신순 정렬·오염 없는 상세 열기 |
| | **`EzWoW-MapFinder`** (+`EzWoW-Data*` 21폴더) | `2.0.51` / `1.0.21` | ✅ | 활성 · 오프라인 위치 검색 & 웨이포인트 *(본가 6개국어 자동 드랍 적용 · `.toc` 패치 덮어쓰임)* |
| | **`Books_on_map_Forever`** | `2.4.1` | ✅ | 활성 · **와우 포에버 도서관 책 월드맵 핀 표시!** |
| | **`OpenMap`** + **`OpenMap_NoDungeonMap`** | `v0.8.13` / `v1.2` | ✅ | 활성 · 끊김 없는 통합 세계 지도 + 던전 도감 호환 패치 |
| | **`SquareMinimap`** | `1.5.0` | ✅ | 활성 · 포에버 사각 브론즈 프레임 미니맵 (**그림자 패널·버튼 숨김 추가**) |
| | **`TomTom`** | `v4.4.1-release` | ✅ | 활성 · `/way` 좌표 화살표 내비게이션 |
| | **`ForeverDungeonJournal`** | `2.1.6` | ✅ | 활성 · 클래식/포에버 던전 보스·드랍·퀘스트·PvP 보상(전문화 우선) 도감 |
| | **`Attune`** | `16001-46` | ✅ | **활성 (`enabled`)** · 던전·공격대 입장 연퀘 추적 *(⚠️ 한글 실시간 패치 덮어쓰임)* |
| | **`ForeverLootSparkles`** | `v2.1.0` | ✅ | 활성 · 루팅·퀘스트 오브젝트 반짝임 효과 상시 유지 |
| **경제 · 가방 · 전문기술 · 성장** (6종 / 7폴더) | **`ForeverLevelingBiS`** | `v1.6.1` | ✅ | 활성 · **다중/계정 위시리스트 · Edit Mode 구간별 가중치 · 간략 툴팁** |
| | **`CharExport`** *(로컬 커스텀 ✅)* | `2.3.1` | ✅ | 활성 · **`/ce` 캐릭터 전용 + `/cea` 시세 전용 + `/ceall` 전체 출력 (114종)** |
| | **`Auctionator`** | `354` | ✅ | 활성 · 경매장 스캔·최저가 출품·시세 툴팁 (`354` 무접미사 장비 가격 표시 수정) |
| | **`Mastercraft`** | `2.1.3` | ✅ | 활성 · 전문기술 가이드·모듈 토글·낚싯대 스왑 키·**마력 추출 vs 상점가 비교** |
| | **`Baganator`** + **`Syndicator`** | `869` / `293` | ✅ | 활성 · 통합 가방 UI(`ItemRack` 연동 수정) + 계정/은행 전체 재고 추적 |
| | **`WhatsTraining`** | `11.4.10` | ✅ | 활성 · 마법책에 레벨별 습득 가능 스킬 & 비용 미리보기 |
| **UI · 편의 · 위상 · 파티 · 음성** (8종 / 20폴더) | **`LayerSwap`** | `1.14.57` | ✅ | 활성 · 현재 위상(Layer) 표시 · 원클릭 전환 · 시간당 `Who.CAP` 합류 추적 (`/ls`) |
| | **`FindParty`** *(🆕 11/26 설치)* | `0.8` | ✅ | 활성 · **파티찾기 채널 던전·키워드 필터링 · 귓말 신청 · 광고 (`/fp`)** |
| | **`DialogueUI`** | `1.0.7 c` | ✅ | 활성 · 몰입형 카드 퀘스트 대화창 & 키보드 단축 선택 |
| | **`ForeverMove`** | `1.6.4` | ✅ | 활성 · 블리자드 모든 UI 창 자유 드래그 이동 (`/fm`) |
| | **`ForeverMouseTooltip`** | `@project-version@` | ✅ | 활성 · 기본 게임 툴팁을 마우스 커서 위치에 고정 |
| | **`BetterBlizzFrames`** | `v2.2.3c` | `120105` | 블리자드 기본 프레임 버프 필터·전투 표시 커스터마이즈 |
| | **`WhisperMessenger`** | `v2.1.9` | ✅ | 활성 · 귓속말 메신저 통합 기록/응답 |
| | **`Spoken`** (`Bosses`·`Places`·`Quests`·`Readables`·`Contributions` + 한국어 음성팩 7종) | `3.13.1` / `koKR` | ✅ | 활성 · 퀘스트/책/지역/보스 한국어 음성 내레이션 (`Horde` 팩은 선택 해제 가능) |

### C. 추가 추천 애드온 (`1.60.1` — 미설치 항목 중심)
- **[Better Spell Power Tooltips](https://www.curseforge.com/wow/addons/better-spell-power-tooltips)**: 현재 비전 주문력(`+164`)과 `비전 작렬` 중첩이 반영된 실시간 예상 피해량을 툴팁에 표시.
- **LFG Bulletin Board** *(선택)*: `FindParty` 외에 영문 채널/던전별 게시판을 별도 탭으로 보고 싶을 때 보완.
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
