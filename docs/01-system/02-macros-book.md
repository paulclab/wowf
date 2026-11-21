# 02. 비전 마법사 실전 매크로 북 (26레벨 기준) & 마법봉 상호작용

## 1. 사용자 표준 매크로 포맷 및 `1번 → 2번` 상호작용 정리

### A. 등록된 1번·2번 매크로 (사용자 기준 포맷)
- **1번 슬롯 (단독 마법봉 발사)**:
```text
#showtooltip 마법봉 발사
/cast !마법봉 발사
```
- **2번 슬롯 (신비한 화살 + 마법봉 동시 배치형 — 24레벨 습득 `3 레벨` 및 마나 절약용 `2 레벨`)**:
  - **주력 딜링용 (`신비한 화살(3 레벨)` — 24레벨에 습득)**:
```text
#showtooltip 신비한 화살(3 레벨)
/cast [nochanneling] 신비한 화살(3 레벨)
/cast [nochanneling] !마법봉 발사
```
  - **마나 절약 / 마무리용 (`신비한 화살(2 레벨)` — 기존 사용 버전)**:
```text
#showtooltip 신비한 화살(2 레벨)
/cast [nochanneling] 신비한 화살(2 레벨)
/cast [nochanneling] !마법봉 발사
```
> **참고 (`!마법봉 발사` 본섭 작동 여부)**: [WOWF.IO 마법사 매크로 가이드](https://wowf.io/ko/macros/mage)에는 포에버 베타 기준 `!`가 작동하지 않는다고 적혀 있으나, **현재 라이브 본섭에서는 `!마법봉 발사`의 `!` 토글 방지(연타해도 사격이 꺼지지 않고 유지됨)가 정상 작동**합니다 (`[✅ 인게임 실측]`).

### B. 왜 `1번`을 먼저 쏘고 있을 때만 `2번`을 누르면 신비한 화살 뒤에 마법봉이 안 나갈까?
1. **`1번(!마법봉 발사)`만 연타할 때 잘 나가는 이유**:
   - 첫 입력으로 마법봉 자동 사격(Auto Repeat)이 이미 **ON**이 된 상태입니다.
   - 이후 연타 입력이 `1.1초`(가속 15% 버프 시 `0.96초`) 재사용 대기시간에 걸려 무시되더라도, **켜져 있는 자동 사격을 강제로 끄는(OFF) 주문 시전이 없으므로** 마법봉 사격이 끊기지 않고 계속 나갑니다.
2. **마법봉을 안 쓰다가(OFF) `2번`을 누를 때 잘 나가는 이유**:
   - 마법봉이 꺼져 있고 `1.1초`(가속 15% 버프 시 `0.96초`) 쿨타임도 돌지 않는 상태이므로, `2번` 입력 시 `신비한 화살`과 함께 아랫줄 `!마법봉 발사`가 거부당하지 않고 정상 처리됩니다.
3. **`1번`으로 마법봉을 쏘는 도중(ON)에 `2번`을 누를 때 안 나가는 이유**:
   - 와우 시스템상 주문(`신비한 화살`)을 시전하면 **기존에 켜져 있던 `1번` 마법봉 자동 사격은 무조건 강제로 해제(OFF)** 됩니다 ([Reddit r/wowforever](https://www.reddit.com/r/wowforever/comments/1xrksu2/priest_question_how_do_i_get_my_wand_to_auto/)).
   - 따라서 마법봉이 계속 나가려면 아랫줄 `/cast [nochanneling] !마법봉 발사`가 마법봉을 **새로 다시 켜줘야(ON)** 하는데, `2번`을 누른 그 순간에는 직전 `1번` 발사로 인해 `마법봉 발사`가 `1.1초`(가속 15% 버프 시 `0.96초`) 재사용 대기 중이거나 아직 `1번` 사격이 꺼지기 전(ON) 상태여서 아랫줄 명령이 무효화되고, 직후 `신비한 화살`이 기존 마법봉 사격을 꺼버린 채 채널링만 끝나기 때문입니다 ([Blizzard 공식 포럼](https://us.forums.blizzard.com/en/wow/t/help-with-a-castingwand-macro/2364918)).
   - **실전 해법**: `1번` 사격 도중 `2번`으로 `신비한 화살`을 쏜 경우에는, 채널링이 끝난 직후 `1번`을 한 번 눌러 마법봉을 다시 켜주시면 됩니다.

---

## 2. 26레벨 비전 마법사 핵심 실전 매크로 모음
출처: [WOWF.IO 마법사 매크로](https://wowf.io/ko/macros/mage), [ClassicWoWForever Mage Macros](https://classicwowforever.com/macros/mage/), [Zockify Mage Macros](https://www.zockify.com/forever/mage/macros/), [GuildJen Macros](https://guildjen.com/best-wow-forever-macros/)

### ① 주력 딜링 (`비전 작렬` / `비전 격노` — `누르고 있어 시전` vs `[nochanneling]` 충돌 주의!)
> **⚠️ 중요 클라이언트 제한 (`[✅ 인게임 실측]` + [Blizzard 공식 포럼](https://us.forums.blizzard.com/en/wow/))**:
> 블리자드의 **`누르고 있어 시전(Press and Hold Casting)` 기능은 마법책(P)에서 직접 꺼낸 순수 주문에만 작동하며, 매크로 슬롯에는 일절 작동하지 않습니다.**
> - **`누르고 있어 시전`(꾹 누르기 연속 시전)을 쓰려면**: `비전 작렬`은 매크로가 아닌 **마법책 순정 스킬**을 그대로 단축바에 올리고, `신비한 화살` 채널링 중에만 손가락을 떼어 주어야 합니다.
> - **`[nochanneling:신비한 화살]` 채널링 보호 매크로를 쓰려면**: 아래 매크로를 쓸 때 `누르고 있어 시전`은 동작하지 않으므로 **직접 연타(또는 게이밍 기어 단순 키 반복)**로 입력해야 합니다.
```text
#showtooltip 비전 작렬
/cleartarget [dead][help]
/targetenemy [noexists]
/cast [harm,nodead,nochanneling:신비한 화살] 비전 작렬
```
```text
#showtooltip 비전 격노
/cleartarget [dead][help]
/targetenemy [noexists]
/cast [harm,nodead,nochanneling:신비한 화살] 비전 격노
```

### ② 마법봉 연계 즉시 시전기 (`화염 작렬`)
```text
#showtooltip 화염 작렬
/cast [nochanneling] 화염 작렬
/cast [nochanneling] !마법봉 발사
```

### ③ 지면 광역기 마법진 클릭 시전 (`눈보라` / `불기둥` — `누르고 있어 시전` 유지 환경)
> 매크로는 `누르고 있어 시전` 대상에서 제외되므로, 먼저 1) **단순 일반 매크로(`/cast 눈보라`)**로 올렸을 때 마법진이 유지되는지 테스트해 보시고, 그래도 즉시 시전 버그가 나면 2) `ActionButtonUseKeyHeldSpell 0` 토글 또는 `Grounded` 애드온을 사용하세요. *(단, `비전 작렬`이 마법책 순정 스킬일 때만 `ActionButtonUseKeyHeldSpell 1` 복구가 의미가 있으므로, CVar를 껐다면 별도 토글 매크로로 다시 `1`로 복구해야 합니다.)*
```text
#showtooltip 눈보라
/cast 눈보라
```
```text
#showtooltip 불기둥
/cast 불기둥
```
*(즉시 시전 현상이 여전히 발생한다면 아래 CVar 해제 버전을 테스트)*
```text
#showtooltip 눈보라
/console ActionButtonUseKeyHeldSpell 0
/cast 눈보라
```
*(참고: 마법진 없이 마우스 커서 위치에 즉시 깔고 싶을 때만 `/cast [@cursor] 눈보라`를 사용합니다.)*

### ④ 긴급 생존 및 차단 (`마법 차단`, `점멸`, `얼음 회오리(1 레벨)`, `얼음 방패`)
- **마법 차단 (24레벨, Off-GCD — 시전 즉시 취소 + 마우스오버 우선 차단)**:
```text
#showtooltip 마법 차단
/stopcasting
/cast [@mouseover,harm,nodead][harm,nodead] 마법 차단
```
- **점멸 & 얼음 회오리(1 레벨) (26레벨에 2레벨을 배워도 제어용은 마나 절약을 위해 `1 레벨` 고정)**:
```text
#showtooltip 점멸
/stopcasting
/cast 점멸
```
```text
#showtooltip 얼음 회오리(1 레벨)
/stopcasting
/cast 얼음 회오리(1 레벨)
```
- **얼음 방패 (첫 입력 진입 / 재입력 즉시 해제)**:
```text
#showtooltip 얼음 방패
/cancelaura 얼음 방패
/cast 얼음 방패
```

### ⑤ 유틸리티 (`환기` 채널링 보호, 마우스오버 `변이`, `하급 저주 해제`)
```text
#showtooltip 환기
/cast [nochanneling:환기] 환기
```
```text
#showtooltip 변이
/cast [@mouseover,harm,nodead][harm,nodead] 변이
```
```text
#showtooltip 하급 저주 해제
/stopcasting
/cast [@mouseover,help,nodead][help,nodead][@player] 하급 저주 해제
```

---

## 3. 28~60레벨 매크로 확장 로드맵
- **28레벨 (`마나 마노` 생성/사용 원버튼 — Off-GCD)**:
```text
#showtooltip 마나 마노
/cast [button:2] 마나 마노 창조
/use [nobutton:2] 마나 마노
```
- **30레벨 (`냉정` + `비전 작렬` 즉시 시전 — `냉정`은 Off-GCD)**:
```text
#showtooltip 냉정
/cast [nochanneling:신비한 화살] 냉정
/cast [nochanneling:신비한 화살] 비전 작렬
```
- **40레벨 (`신비의 마법 강화` + 장신구 13/14번 + `비전 작렬` 원버튼 폭딜)**:
```text
#showtooltip 신비의 마법 강화
/cast [nochanneling:신비한 화살] 신비의 마법 강화
/use [nochanneling:신비한 화살] 13
/use [nochanneling:신비한 화살] 14
/cast [nochanneling:신비한 화살] 비전 작렬
```
