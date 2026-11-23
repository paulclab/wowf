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

## 2. 로컬 실측 설치 애드온 관리부 (`2026-11-22` 직접 스캔 ✅)
- **스캔 경로 (영구 등록)**: `C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns`
- **캐릭터 활성 설정**: `C:\Program Files (x86)\World of Warcraft\_forever_\WTF\Account\<계정>\<서버>\폴-최\AddOns.txt`
- **진단 요약**: **총 24개 스위트 (49개 폴더)** · **48/49 `Interface: 16001` (`1.60.1`) 지원 ✅** (`BetterBlizzFrames`만 `120105` TOC) · **정면 충돌 `0건` ✅** *(기존 충돌 원인이던 `Forever Minimap` 삭제 완료 → `SquareMinimap v1.4.6` 단독 운영 중!)*

### A. 진단 & 최적화 포인트 (`2026-11-22` 실측)
1. **✅ 신규 설치 확인 (`ForeverLevelingBiS v1.4.5` · `CharExport v2.3.0` · `BetterBlizzFrames v2.2.3c`)**:
   - `ForeverLevelingBiS (v1.4.5)`: 레벨·직업·특성별 레벨링 BiS 추천 애드온. 코드상 던전·퀘스트 고정 드랍만 출처를 표시하고 **월드 드랍 BoE(`별똥별 마법봉`, `마법의 정수 장갑` 등)는 출처 텍스트를 생략**하므로(`UI.lua`), BoE 템은 경매장(`Auctionator`)에서 확인/구매합니다.
   - `CharExport (v2.3.1)`: 로컬 커스텀 애드온 — `/ce`(캐릭터 스탯·버프·특성·장비·스킬 전용, 시세 제외), `/cea` 또는 `/ce ah`(제작재료 114종 시세 전용), `/ceall` 또는 `/ce all`(캐릭터+시세 전체 통합) 지원. **① 무두질·가죽/비늘(27종, 사냥터 최적화용)** · **② 마법부여(52종, 1~300·막대·오일·포에버 특수)** · **③ 재봉술·옷감/캐스터 템(35종, 전환 1~300·장비 제작용)** 총 **114종** 추적.
   - `BetterBlizzFrames (v2.2.3c)`: `.toc` Interface가 `120105, 120100`으로 표기되어 있어 접속 시 '구버전 애드온 불러오기' 체크 필요.
2. **✅ `RangeDisplay (v6.3.7)` — `폴-최` 활성 확인 (`enabled`, 적대적 대상 전용)**: `SavedVariables\RangeDisplay.lua` 실측상 `enemyOnly = true`, `mouseover = false`, 장거리 구간 `lrSection = 33m`로 설정되어 있습니다. *(비전 마법사 주력 사거리 `30m`에 맞춰 `/rangedisplay` → Target → `30`으로 조정 시 사거리 구분이 더욱 선명합니다.)*
3. **✅ `Auctionator (v349)` 툴팁 데드락 패치 (`2026-11-23` 적용)**:
   - 포에버(`IsForever`) + 한국어 클라에서 랜덤 접두사 장비 마우스오버 시 `Source\Utilities\DBKeyFromLink.lua`의 `SuffixesToLabel` 미매칭으로 콜백이 호출되지 않아 `Source\Tooltips\Main.lua`의 `waitingForPricing`이 영구 잠금되던 버그를 `else callback({basicKey}) end` 및 `pcall` 가드로 패치 완료 *(애드온 업데이트 시 재확인 필요)*.
4. **🟡 메모리·로딩 경량화 선택 정리 대상**:
   - `SpokenQuestsAudioHorde_koKR (v0.0.3)`: 얼라이언스(`폴-최`) 전용 플레이 시 꺼두면 로딩/메모리 절약 가능.
   - `QuestieTrace (v1.13.0)` & `SpokenContributions (v3.10.1)`: 개발자 DB 제보/수집용 로거이므로 기여 목적이 아니면 비활성화해도 본 기능 정상 작동.
   - `Details_Streamer` / `Details_Vanguard`: 방송/탱커 전용 플러그인이라 평소 꺼둬도 무방.

### B. 전체 설치 애드온 24종 (49폴더) 실측 목록 (`2026-11-23` 기준)

| 분류 | 스위트 / 폴더명 | 설치 버전 (`.toc`) | `16001` | 상태 및 핵심 역할 |
| :--- | :--- | :--- | :---: | :--- |
| **전투 · 프록 · 딜미터** (4종 / 12폴더) | **`Details!`** (+7 플러그인: `Compare2`, `DataStorage`, `EncounterDetails`, `RaidCheck`, `Streamer`, `TinyThreat`, `Vanguard`) | `20261109.15410.172` | ✅ | 활성 · 실시간 DPS·주문별 비중·어그로(`TinyThreat`)·차단 분석 |
| | **`Shadowflare`** | `0.25.0` | ✅ | **활성 (`enabled`)** · 포에버 전용 프록 알림 (`화살 탄막` · `신비한 정신 집중`) |
| | **`ForeverCombatText`** | `0.17.0` | ✅ | **활성 (`enabled`)** · 네임플레이트 주문 학파 색상 전투 피해 텍스트 |
| | **`RangeDisplay`** (+`_Options`) | `v6.3.7` | ✅ | **활성 (`enabled`)** · 적대적 대상 전용 (`enemyOnly = true`, 33m 경계) |
| **지도 · 퀘스트 · 던전 · 도서관** (8종 / 11폴더) | **`Questie`** + **`QuestieDB`** + **`QuestieTrace`** | `12.12.0` / `1.1.4` / `1.13.2` | ✅ | **활성 (`enabled`)** · 포에버 퀘스트 핀/추적 + DB (`Trace`는 수집 로거) |
| | **`Books_on_map_Forever`** | `2.3.3` | ✅ | 활성 · **와우 포에버 도서관 책 월드맵 핀 표시!** |
| | **`OpenMap`** + **`OpenMap_NoDungeonMap`** | `v0.8.12` / `v1.2` | ✅ | 활성 · 끊김 없는 통합 세계 지도 + 던전 도감 호환 패치 |
| | **`SquareMinimap`** | `1.4.7` | ✅ | 활성 · 포에버 사각 브론즈 프레임 미니맵 (**단독 구성 → 충돌 해소 ✅**) |
| | **`TomTom`** | `v4.4.1-release` | ✅ | 활성 · `/way` 좌표 화살표 내비게이션 |
| | **`ForeverDungeonJournal`** | `2.1.3` | ✅ | 활성 · 클래식/포에버 던전 보스·드랍템·퀘스트 도감 |
| | **`Attune`** | `16001-44` | ✅ | **활성 (`enabled`)** · 던전·공격대 입장 연퀘 진행도 추적 |
| | **`ForeverLootSparkles`** | `v2.0.0` | ✅ | 활성 · 루팅·퀘스트 오브젝트 반짝임 효과 상시 유지 |
| **경제 · 가방 · 전문기술 · 성장** (6종 / 8폴더) | **`ForeverLevelingBiS`** | `v1.4.5` | ✅ | 활성 · **레벨·직업·특성별 레벨링 BiS 추천 UI** |
| | **`CharExport`** *(로컬 커스텀 ✅)* | `2.3.1` | ✅ | 활성 · **`/ce` 캐릭터 전용 + `/cea` 시세 전용 + `/ceall` 전체 출력 (114종)** |
| | **`Auctionator`** | `351` | ✅ | 활성 · 경매장 스캔·최저가 출품·시세 툴팁 (`IsForever` 패치) |
| | **`Mastercraft`** + **`Mastercraft_Inbox`** | `2.0.9-hotfix` / `2.0.6` | ✅ | 활성 · 전문기술 가이드·수익·**마력 추출 vs 상점가 자동 비교** |
| | **`Baganator`** + **`Syndicator`** | `868` / `293` | ✅ | 활성 · 통합 가방 UI + 계정/은행 전체 재고 추적 |
| | **`WhatsTraining`** | `11.4.9` | ✅ | 활성 · 마법책에 레벨별 습득 가능 스킬 & 비용 미리보기 |
| **UI · 편의 · 한국어 음성** (6종 / 18폴더) | **`DialogueUI`** | `1.0.7 c` | ✅ | 활성 · 몰입형 카드 퀘스트 대화창 & 키보드 단축 선택 |
| | **`ForeverMove`** | `1.6.4` | ✅ | 활성 · 블리자드 모든 UI 창 자유 드래그 이동 (`/fm`) |
| | **`ForeverMouseTooltip`** | `16001` | ✅ | 활성 · 기본 게임 툴팁을 마우스 커서 위치에 고정 |
| | **`BetterBlizzFrames`** | `v2.2.3c` | `120105` | 블리자드 기본 프레임 버프 필터·전투 표시 커스터마이즈 |
| | **`WhisperMessenger`** | `v2.1.9` | ✅ | 활성 · 귓속말 메신저 통합 기록/응답 |
| | **`Spoken`** (`Bosses`·`Places`·`Quests`·`Readables`·`Contributions` + 한국어 음성팩 7종) | `3.11.0` / `koKR` | ✅ | 활성 · 퀘스트/책/지역/보스 한국어 음성 내레이션 (`Horde` 팩은 선택 해제 가능) |

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
