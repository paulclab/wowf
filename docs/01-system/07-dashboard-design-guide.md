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

## 4. 토글 메뉴 하위 제목(`fold-body > h3`) 넘버링 & 라벨 정제 규칙 (`2026-11-24`)

> **영구 UX 원칙 (`2026-11-24` 사용자 지시)**:  
> 토글 메뉴(`<details class="fold-card">`) 내부 하위 제목(`<h3>`)은 본문 일반 텍스트나 상위 카드 제목과 즉시 구분되도록 **CSS 자동 넘버링(`01`, `02`, `03`) + 좌측 포인트 바** 스타일을 유지하며, **쓸모없는 우측 라벨은 모두 제거하고 꼭 필요한 핵심 상태·구간만 중앙 정렬된 단일 뱃지로 표기**합니다.

### 표준 규칙
1. **CSS 자동 넘버링 (`counter-reset: fold-sub`)**:
   - `details.fold-card > .fold-body > h3`에 `::before`로 `01`, `02`, `03` 뱃지가 자동 부여됩니다(`position: absolute` 좌측 거터 배치로 모바일 줄바꿈 시에도 제목이 번호 아래로 밀리지 않음).
   - ❌ **수동 번호 금지**: HTML에 `1)`, `2)`, `3)` 등을 직접 쓰지 말 것 (이중 넘버링 발생).
   - ❌ **인라인 `style="margin-top:0;"` 생략**: `:first-child` 및 `details.dismissible-fold + h3` 규칙이 자동 처리.
2. **라벨(`.badge`) 필터링 & 중앙 정렬 원칙**:
   - ❌ **제거 대상(노이즈)**: 타임스탬프(`11/24 12:31 ·`, `2026-11-24`), 클라 버전(`1.60.1`), 본문·차트에 이미 적힌 중복 설명(`단위: 실버(s)`, `방어구 키트 4부위 제외`), 형식적 문구(`(클릭해서 열기)`, `(자동 저장)`, `간단 Q&A`, `전환 전 확인`, `전환 검토 메모`).
   - ✅ **유지 대상(핵심 정보만)**: 의사결정 상태(`대기 권장`), 숙련/달성 구간(`1 → 125`, `128 → 175`, `5/5 완료`, `128 / 150`, `11종`).
   - ✅ **중앙 정렬 필수**: `details.fold-card > .fold-body > h3`와 `summary > span`에 `display: flex; align-items: center;` + `.badge`에 `display: inline-flex; align-items: center; justify-content: center; text-align: center;` 적용.

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

## 7. 아이템 툴팁 (`WOW_DB` + `WOW_ITEM_META`) & 데이터 정합성 규칙

1. **양쪽 동시 동기화 필수**:
   - 아이템·재료 가격/숙련도/획득처를 수정할 때는 **`WOW_DB`와 `WOW_ITEM_META`를 반드시 동시에 갱신**해야 함. (한쪽만 고치면 툴팁 상단과 하단 메타 박스에 서로 다른 시세·숙련도가 동시에 노출됨!)
2. **가격 필드 배타 원칙**:
   - 상인 판매 품목은 `vendorPrice`만, 경매장 품목은 `ahPrice`만 기입 (둘을 동시에 넣지 말 것).
3. **와우 포에버 `1.60.1` 실측 최우선**:
   - 클래식(1.12) 기억으로 숙련도·재료 수량을 적지 말고, 반드시 로컬 **`Mastercraft/RecipeData.lua`**, **`Auctionator.lua`**, **`Syndicator.lua`**, **`wowf.io/ko`**, **`db.icy-veins.com/wow-forever`**로 교차 검증.
   - 아이템 아이콘은 `WOW_DB`에 이미 존재하여 HTTP-200 검증된 아이콘 이름만 재사용.
4. **중복·오류 방지**:
   - 수정한 탭은 반드시 `RECENTLY_UPDATED_TABS[tabId]`의 `v`와 `text`를 갱신해 메뉴 제목 우측 위 `N` 뱃지가 정상 표시되도록 유지.

---

## 8. 대시보드 수정 완료 전 필수 체크리스트

수정 후 `git push origin main` 전에 아래 6항목을 Python 검증 스크립트로 반드시 확인합니다.
1. JS 괄호 균형 `(brace, paren, bracket) == (0, 0, 0)`
2. 중복 HTML `id` **0건**
3. `body[data-theme="dark"]` **0건**
4. `localStorage.` 호출 **정확히 2건** (`safeStorageGet`/`safeStorageSet` 내부)
5. 개인정보/계정 ID/로컬 절대 경로(`C:\Users\...`) **0건**
6. `WOW_ITEM_META` 가격 충돌(`vendorPrice` + `ahPrice` 동시 존재) **0건** 및 신규 추가 아이템 100% 등록 완료
