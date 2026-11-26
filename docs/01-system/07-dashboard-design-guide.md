# 07. 대시보드 디자인 & 컴포넌트 가이드 (Memphis Edition · 모든 에이전트 필수 준수)

> **목적**: 이 문서는 통합 대시보드 [`dashboard.html`](../../dashboard.html) (GitHub Pages: `https://paulclab.github.io/wowf/`)를 수정·확장하는 **모든 에이전트(메인/전문기술/애드온/서브에이전트 포함)**가 반드시 따라야 하는 **UI/UX·타이포그래피·반응형·툴팁·데이터 검증 표준**입니다.  
> 실제 운영 중 반복 발생했던 가독성 저하, 타임라인 선 넘침, 모바일 가로 오버플로, 다크모드 깨짐, 일회성 메모 누적 문제를 영구적으로 방지하기 위해 정립되었습니다 (`2026-11-24`).

---

## 1. 타이포그래피 & 최소 폰트 크기 규칙 (가독성 최우선)

| 용도 | 권장 크기 | 절대 하한 | 주의사항 |
| :--- | :---: | :---: | :--- |
| **본문 / 카드 설명 / 표 셀** | `13.5px ~ 14px` | `13px` | `line-height: 1.5 ~ 1.68` 유지 |
| **보조 설명 / 메모 / 부제** | `12.5px ~ 13px` | `12px` | **`<small>` 태그 중첩 금지** (`12px` 안에 `<small>`을 넣으면 `9~10px`로 축소됨) |
| **뱃지 / 슬롯 태그 / 차트 라벨** | `11.5px ~ 12px` | `11px` | **`11px` 미만 텍스트 사용 금지** (SVG 차트 축/값 라벨도 `>= 11px` 유지) |
| **섹션 제목 (`h2`, `h3`, `summary`)** | `14.5px ~ 17.5px` | `14px` | `font-weight: 800 ~ 850` |

### 금지 패턴 (Anti-Patterns)
- ❌ `<small style="opacity:0.72">` 처럼 작은 글씨 + 낮은 투명도(`opacity < 0.78`) 조합 금지 → 대신 `color: var(--rd-ink-2)` 또는 `var(--rd-ink-3)` + `font-size: 12.5px` 클래스(`.core-sum-note`, `.tailor-slot-tag` 등) 사용.
- ❌ 표 셀에 의미 없는 `/` 또는 `-` 단독 표기 금지 (빈 셀은 `—` 표기 → 모바일 카드-표 `.cell-empty`로 자동 숨김 처리됨).
- ❌ 한글 단어가 중간에서 깨지는 줄바꿈 금지 → 카드/설명 문단에는 `word-break: keep-all;` 적용.

---

## 2. 줄바꿈 · 칩 · 그리드 오버플로 방지 규칙 (Desktop + iPhone `393px`)

1. **아이템/스킬 칩 (`.wow-ref`, `code`)**:
   - `.wow-ref`는 `display: inline-flex; align-items: center; white-space: nowrap;`으로 아이콘과 이름이 줄바꿈으로 찢어지지 않게 유지.
2. **좌우 배치 행 (예: 재료명 + 단가 `.tailor-mat-row`, `.core-sum-row`)**:
   - **절대 양쪽 `span` 모두에 `white-space: nowrap`을 걸고 부모에 `flex-wrap: nowrap`을 두지 말 것!** (393px 모바일에서 카드 우측으로 삐져나옴)
   - ✅ 정답 패턴: 부모 `display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 2px 10px;` + 우측 가격에만 `white-space: nowrap; margin-left: auto;`.
3. **반응형 그리드 (`grid-template-columns`)**:
   - ❌ 금지: `repeat(auto-fit, minmax(340px, 1fr))` — 393px 모바일 내부 폭(`~315px`)을 초과해 가로 스크롤 깨짐 발생!
   - ✅ 필수: **`repeat(auto-fit, minmax(min(320px, 100%), 1fr))`** (항상 `min(Xpx, 100%)`로 감싸기).
4. **SVG 가격 추이 차트 (`.pchart-svg`)**:
   - `100s` 이상 금액은 골드 단위(`1.1g`, `17g`)로 축약(`formatChartSilver()`)하여 Y축 라벨이 좌측 패딩 밖으로 잘리지 않게 보장 (`padL >= 44`, `overflow: hidden`).
5. **본문 코멘트·안내 문단 줄 길이(`max-width: 68ch`) & 문장별 줄바꿈 규칙 (`2026-11-24`)**:
   - **한 줄 과다 확장 금지**: 데스크톱 넓은 카드(`.card`, `.fold-body`) 안에서 코멘트·진단·안내 문단이 화면 가로 전체로 길게 퍼지지 않도록 `.card > p`, `.fold-body > p`, `.prose-note`, `.callout-prose`에 **`max-width: 68ch; line-height: 1.72; word-break: keep-all;`**을 적용합니다. (`.callout` 박스 폭은 표/그리드와 맞추더라도 내부 장문 코멘트는 `.callout-prose`로 감싸 줄 길이를 제한)
   - **문장별 줄바꿈 필수**: 2문장 이상 이어지는 설명·코멘트·진단 요약은 문장 사이에 `<br>`(또는 별도 `<p>`)을 넣어 **한 문장씩 끊어 읽히도록** 작성합니다.
   - ❌ 금지: 3~4문장을 `<br>` 없이 한 덩어리로 길게 이어 붙이는 평문 단락.

---

## 3. 가로 타임라인 / 스텝퍼 설계 규칙 (선 넘침 방지)

가로 타임라인(예: `추천 장비 타임라인`)을 만들 때 **절대 컨테이너 전체에 `::before` 1줄 관통선을 깔지 마세요.**  
*(원인: 활성 카드의 테두리/반투명 배경 뒤로 선이 관통해 보이고, 도트 중심 높이와 어긋나며, 좁은 화면에서 깨집니다.)*

### 표준 가로 타임라인 구조 (`.tailor-stepper-wrap` 패턴)
1. **스크롤 래퍼**: `.tailor-stepper-wrap` (`overflow-x: auto; -webkit-overflow-scrolling: touch;`)로 감싸 모바일에서도 가로 타임라인 형태를 깨뜨리지 않고 스와이프 가능하게 유지 (`min-width` 지정 + 모바일 안내 `.tailor-scroll-hint`).
2. **도트 전용 상단 레일 (`.tailor-step-dot-wrap`)**:
   - 도트(`32px × 32px`)와 연결선(`::before` 좌측 반선, `::after` 우측 반선)을 **텍스트 카드(`.tailor-step-card`)와 물리적으로 분리된 상단 행**에 배치.
   - `top: 50%; transform: translateY(-50%); width: calc(50% - 19px);`로 도트 중심과 수학적으로 100% 일치시키고, `:first-child::before`와 `:last-child::after`를 숨겨 **선이 절대 카드나 양끝을 넘지 않게 차단**.
3. **라벨 카드 (`.tailor-step-card`)**:
   - 도트 아래에 독립된 Memphis 카드로 배치 (`title: 14px nowrap`, `sub: 12px`), 활성 단계는 선명한 노랑/보라 대비 + 잉크 테두리 적용.

---

## 4. 토글 메뉴 하위 제목(`fold-body > h3`) · 인라인 박스 금지 · 간결한 설명 규칙 (`2026-11-24`)

> **영구 UX 원칙 (`2026-11-24` 사용자 지시 — 모든 에이전트 필수 준수)**:  
> 1. 토글(`<details class="fold-card">`) 자체가 이미 카드이므로, 내부 하위 제목(`<h3>`)을 **또다시 카드/박스나 검은색 넘버링 라벨로 감싸지 않습니다.**  
> 2. 본문 설명에서 **툴팁이 없는 일반 숫자·가격·수량·시간·레벨을 `<code>` 박스(카드)로 감싸지 않습니다.**  
> 3. 설명 문단은 **구구절절 길게 쓰지 않고 핵심만 2~3줄 이내로 축약**합니다.

### A. 토글 하위 제목 (`details.fold-card > .fold-body > h3`) 표준
- **노-박스 타이포그래피**: 배경색·외곽 테두리·검은색 넘버링 알약 뱃지 금지! 큰 볼드 제목(`16.5px`, `font-weight: 850`) + 하단 얇은 구분선(`1.5px`)만으로 섹션 제목임을 심플하게 드러냅니다.
- **텍스트 넘버링 (`01.`, `02.`, `03.`)**: `::before`에서 배경/테두리 없는 순수 컬러 텍스트(`var(--arcane)`, 다크 `#c084fc`)로 자동 넘버링합니다. HTML에 `1)`, `2)` 수동 번호를 중복 기재하지 않습니다.
- **핵심 라벨만 중앙 정렬**: 날짜(`11/24 12:31`), 버전(`1.60.1`), 본문 중복 설명(`단위: 실버`, `방어구 키트 4부위 제외`), 형식 문구(`간단 Q&A`, `(클릭해서 열기)`)는 전부 제거하고, **`지금 전환 추천 ✅`, `1 → 125`, `128 → 175`, `5/5 완료`** 같은 핵심 상태만 수직 중앙 정렬 뱃지로 둡니다.

### B. `<code>` 태그 엄격 제한 (불필요한 인라인 카드/박스 금지!)
대시보드에서 `<code>`는 테두리가 있는 칩(박스)으로 렌더링되므로 남발하면 문장이 토막나 가독성이 급락합니다.
- ✅ **`<code>` 허용 대상**:
  1. `WOW_DB` 툴팁이 연동되는 **아이템 · 재료 · 스킬 · 특성 · 주문 · 애드온** (예: `<code>리넨 옷감</code>`, `<code>마력의 로브</code>`, `<code>정밀함</code>`)
  2. 인게임 **명령어 · 좌표** (예: `<code>/way 24.4 39.6</code>`, `<code>42.0, 76.2</code>`, `<code>/ce</code>`)
- ❌ **`<code>` 절대 금지 대상 (일반 텍스트 또는 `<strong>`으로 표기)**:
  - 가격·금액 (`19c`, `1s`, `~1g 12.1s`, `50s`)
  - 수량·비율·구간 (`126장`, `1개`, `1→125`, `+20%`, `50%`)
  - 시간·날짜·레벨·버전 (`14:49`, `11/24`, `Lv.5+`, `1.60.1`)
  - 툴팁이 없는 일반 NPC·지역·구분 명칭

### C. 설명 텍스트 축약 원칙 (구구절절 장문 금지)
- **결론 → 핵심 수치 → 다음 행동** 순으로 **2~3줄 이내**로 압축 작성합니다.
- 문장당 핵심 정보 1개만 담고 `<br>`로 줄바꿈하며, 표나 차트에 이미 나온 세부 수치·스캔 시각을 본문에 다시 풀어서 반복하지 않습니다.

### D. 화폐(골드·실버·코퍼) 표기 표준 (`2026-11-26` 사용자 지시 — 전 영역 필수)
1. **골드는 대문자 `G`**, 실버는 소문자 `s`, 코퍼는 소문자 `c`로 표기합니다 (`50G`, `14.3G`, `19s`, `40c`).
2. **복합 표기 금지 → 단일 단위 소수 통합**: `1g 10s` → **`1.1G`**, `46g 42s` → **`46.4G`**, `1g 5s` → **`1G`**, `8s 20c` → **`8.2s`**.
3. **의미 없는 `.00` 및 끝자리 `.0` 절대 금지**: `4.00s` → **`4s`**, `2.0G` → **`2G`**, `1.0G` → **`1G`**.
4. **코퍼 1의 자리 내림 제거 (`floor(c / 10) * 10`)**: `48c` → **`40c`**, `24c` → **`20c`**, `19c` → **`10c`**.
5. **소수점은 최대 소수 첫째 자리(`.1`~`.9`, 내림·`.0` 제외)**: `40.89s` → **`40.8s`**, `28.76s` → **`28.7s`**, `1.06s` → **`1s`**, `14.32g` → **`14.3G`**.
6. **차트 포매터**: `js/app.js`의 `formatChartSilver()`가 위 규칙(`G`/`s`/`c`)을 자동 적용합니다. *(※ 시전 시간·쿨타임·마법봉 속도 등 시간 단위 `s`에는 적용하지 않음)*

---

## 5. 인스턴스 질문 · 일회성 메모는 반드시 "접이식 + 영역 삭제(`✕`)" 토글로!

> **영구 UX 원칙 (`2026-11-24` 사용자 지시)**:  
> 사용자가 채팅 중 일회성으로 물어본 검증 내용(예: *"OO 아이템 검증 결과"*, *"상인의 호의 어디서 확인하나요?"*, *"전환 전 체크리스트"*, *"마부 vs 재봉 비교 메모"*)이나 임시 개선 메모는 **절대 본문에 영구 고정된 `.callout` 박스로 끼워 넣지 않습니다.**

### 표준 HTML 패턴 (`.dismissible-fold`)
- **기본 상태는 접힘(`open` 속성 없음)**
- 우측 상단에 **`✕ 지우기` 버튼(`.fold-dismiss-btn`)** 배치 → 클릭 시 해당 영역을 화면에서 숨기고 `safeStorageSet('wowf_dismissed_notes_v1', ...)`에 저장.
- 해당 탭 최하단에 `<div class="dismissed-restore-bar" data-restore-bar="탭ID" hidden></div>`를 두어, 숨긴 메모가 1개 이상일 때만 아주 작게 `↺ 다시 보기` 버튼이 나타나도록 구성.

```html
<details class="fold-card dismissible-fold" data-dismiss-id="고유-메모-id" data-restore-scope="tab-prof">
  <summary>
    <span class="dismiss-fold-title">📌 <strong>메모 제목</strong></span>
    <span class="dismiss-fold-actions">
      <span class="dismiss-fold-chevron"><span class="lbl-closed">열기 ▾</span><span class="lbl-open">접기 ▴</span></span>
      <button type="button" class="fold-dismiss-btn" onclick="dismissFoldNote(event, '고유-메모-id')" title="이 영역을 숨깁니다">✕ 지우기</button>
    </span>
  </summary>
  <div class="fold-body">
    여기에 일회성 Q&amp;A 또는 참고 메모 작성
  </div>
</details>
```

---

## 6. 테마 · 다크모드 · iOS 웹앱 안전 규칙

1. **다크모드 선택자 (절대 실수 금지)**:
   - ✅ 반드시 **`html[data-theme="dark"] .클래스`** 사용!
   - ❌ **`body[data-theme="dark"]` 절대 금지** (테마 속성은 `<html>` 요소에 부착되므로 `body[data-theme="dark"]`는 작동하지 않음).
2. **스토리지 접근 안전성 (iOS Safari / 홈화면 웹앱)**:
   - ❌ `localStorage.getItem(...)` / `localStorage.setItem(...)` 직접 호출 금지!
   - ✅ 반드시 래퍼 함수 **`safeStorageGet(key, fallback)` / `safeStorageSet(key, value)`**만 사용 (파일 전체에서 `localStorage.` 등장은 래퍼 내부 2회뿐이어야 함).
3. **모바일 뷰포트 & 노치 보호**:
   - 드로어/고정 헤더/하단 FAB은 `100dvh` 및 `env(safe-area-inset-top/bottom)`을 반영.

---

## 7. 모듈형 파일 구조 & 통합 툴팁 DB 규칙 (`2026-11-25` 리팩토링 적용 ✅)

> **모든 에이전트 필독**: 대시보드는 **Zero-Build 모듈형 구조**로 분리되었습니다 (`file://` 로컬 더블클릭 + GitHub Pages 100% 호환 — `fetch()`·`type="module"` 금지, `<link>`·`<script src>` 유지). 수정할 영역의 **전용 파일만** 직접 편집해 토큰 소모와 다중 세션 충돌을 최소화하세요.

### A. 역할별 파일 맵
| 파일 경로 | 담당 영역 | 언제 수정하나요? |
| :--- | :--- | :--- |
| `dashboard.html` | 16개 탭 HTML 뼈대 | 탭 본문·표·토글 UI 수정 |
| `assets/dashboard.css` | 전체 CSS (라이트·다크) | 디자인·레이아웃·다크모드(`html[data-theme="dark"]`) 수정 |
| `data/wow-db-items.js` | `WOW_DB_ITEMS` (322키 · 장비·재료·도안·마부·소모품) | 아이템/재료 스펙·귀속·획득처·시세·제작원가 추가/갱신 |
| `data/wow-db-skills.js` | `WOW_DB_SKILLS` (45키 · 주문·버프·전문기술) | 주문·버프·기술 설명 추가/갱신 |
| `data/wow-db-talents.js` | `WOW_DB_TALENTS` (16키 · 특성 기본 툴팁) | 특성 텍스트·별칭 추가/갱신 |
| `data/addons.js` | `ADDON_DB` (27키 · 애드온 전용) | 애드온 버전·설명 추가/갱신 |
| `data/prices.js` | `MAT_PRICE_HISTORY` · `TAILORING_PRICE_HISTORY` | `/cea` 경매 시세 추이 차트 데이터 추가 |
| `data/maps.js` | `MACRO_ZONES` · `MAP_NODES` · `MICRO_MAPS` · `MICRO_HUNTING_ZONES` | 지도 노드·좌표·사냥터 영역 수정 |
| `data/talents-and-sim.js` | `IG_TALENT_TREES` · `SIM_SPELLS` · `DEFAULT_COMBOS` · `RECENTLY_UPDATED_TABS` | 레벨업 특성/스킬 변경 · **`N` 뱃지 갱신** |
| `js/tooltip.js` | `WOW_DB` 통합 조립 · `hydrateWowTooltipsIn` · `renderWowTooltip` | 툴팁 매칭·렌더링 로직 변경 |
| `js/app.js` | 내비게이션·검색·시뮬레이터·지도/차트 렌더·`safeStorage`·부팅 | 인터랙션·계산기 로직 변경 |

### B. 통합 툴팁 DB 작성 규칙 (구 `WOW_ITEM_META` 폐지 → 단일 객체 통합!)
1. **단일 진실 원천 (1 아이템 = 1 객체)**:
   - 구 `WOW_ITEM_META`는 폐지되어 모든 메타 필드(`bind`, `source`, `vendorPrice`/`ahPrice`, `craftCost`, `favorPrice`, `enchantable`)가 **`data/wow-db-items.js`(또는 `skills.js`)의 해당 항목 내부에 직접 통합**되었습니다.
   - `js/tooltip.js`가 부팅 시 `WOW_DB = Object.assign({}, WOW_DB_SKILLS, WOW_DB_TALENTS, WOW_DB_ITEMS)`로 통합합니다.
   - 애드온은 반드시 `data/addons.js`(`ADDON_DB`)에만 넣고, 아이템·스킬·특성은 반드시 `data/wow-db-*.js`에 넣으세요!
2. **별칭(Alias) 등록**:
   - 본문·표·타임라인에서 축약명/띄어쓰기 변형(`녹색 비단 어깨 보호구`, `현자 지팡이` 등)을 쓸 때는 해당 카테고리 `data/wow-db-*.js`에 `{ alias: '정식 명칭' }`을 등록합니다.
3. **가격 필드 배타 원칙**:
   - 상인 판매 품목은 `vendorPrice`만, 경매장 품목은 `ahPrice`만 기입 (동시 존재 금지).
4. **와우 포에버 `1.60.1` 실측 최우선**:
   - 로컬 `Mastercraft/RecipeData.lua`, `Auctionator.lua`, `Syndicator.lua`, `ForeverLevelingBiS/Items.lua`, `wowf.io/ko`로 교차 검증하고, 아이콘은 검증된 Zamimg 아이콘명만 재사용합니다.
5. **최근 업데이트 `N` 뱃지 갱신**:
   - 탭 수정 시 반드시 **`data/talents-and-sim.js`의 `RECENTLY_UPDATED_TABS[tabId]`**(`v`와 `text`)를 갱신합니다.

---

## 8. 대시보드 수정 완료 전 필수 체크리스트

수정 후 `git push origin main` 전에 **`python tools/verify-dashboard.py`**를 실행해 아래 7항목을 자동 검증합니다.
1. 모든 `data/*.js` · `js/*.js` 문법 및 헤드리스 Edge(`msedge --headless --dump-dom`) 런타임 에러 **0건**
2. 중복 HTML `id` **0건** 및 `data/wow-db-*.js` 간/내부 중복 키 **0건**
3. `assets/dashboard.css` · `dashboard.html` 내 `body[data-theme="dark"]` **0건**
4. 전체 JS 파일 내 `localStorage.` 호출 **정확히 2건** (`js/app.js`의 `safeStorageGet`/`safeStorageSet` 내부)
5. 개인정보/계정 ID/로컬 절대 경로(`C:\Users\...`) **0건**
6. `data/wow-db-*.js` 내 `vendorPrice` + `ahPrice` 동시 충돌 **0건**
7. 헤드리스 Edge `file:///.../dashboard.html` DOM 하이드레이션(`.wow-ref` 칩 · 특성 트리 · 시세 차트 · `N` 뱃지) 정상 렌더링 확인!
