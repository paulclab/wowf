/* WoW Forever Tooltip DB — Mage Talents (Unified w/ Meta) */
const WOW_DB_TALENTS = {
  '비전 격노': {
    en: 'Arcane Wrath', kind: '비전 주문 (특성 · Lv.36 2레벨 습득 ✅)', quality: 'spell', icon: 'ability_mage_arcanebarrage',
    rows: [['2 레벨 · 마나 220 (Lv.36 ✅)', '유효 거리 30미터'], ['기본 시전 3.5초 (가속15% 3초)', '재사용 대기시간 6초']],
    desc: '순수한 비전 마력 투사체를 발사하며, 이 주문 자체에 한해 최대 마나의 5%(현재 2,604×5% = +130.2 SP!)만큼 추가 주문 공격력을 획득합니다. (6초는 순수 쿨타임 · 비작 스택 수혜)',
    note: '✅ Lv.36 2레벨 습득 완료! (2레벨 기본 피해량 인게임 툴팁 실측 대기 · 시뮬은 1레벨 실측 하한 기준)'
  },
  '비전 격노(2 레벨)': { alias: '비전 격노' },
  '마법봉 전문화': {
    en: 'Wand Specialization', kind: '비전 특성 · 2티어 1열', quality: 'talent', icon: 'inv_wand_01',
    rows: [['현재 투자: 2 / 2 ★', '마스터 완료']],
    desc: '마법봉 공격력을 크게 증가시킵니다. 와우 포에버에서는 2포인트 마스터로 압축되어 하늘부름 마법봉 마무리 화력을 극대화합니다.',
    note: '✅ 2026-11-18 특성 스샷 실측 (2/2)'
  },
  '정신 집중 연마': {
    en: 'Improved Channeling / Arcane Focus', kind: '비전 특성 · 1티어 2열', quality: 'talent', icon: 'spell_holy_devotion',
    rows: [['현재 투자: 5 / 5 ★', '마스터 완료']],
    desc: '신비한 화살 채널링 중 피격 시 시전 밀림(Pushback)을 100% 방지하고 비전 작렬·비전 격노 피격 지연을 저항합니다.',
    note: '✅ 2026-11-18 특성 스샷 실측 (5/5)'
  },
  '신비한 미묘함': {
    en: 'Arcane Subtlety', kind: '비전 특성 · 1티어 1열', quality: 'talent', icon: 'spell_holy_dispelmagic',
    rows: [['현재 투자: 2 / 2 ★', '주문 관통력 +15']],
    desc: '대상의 모든 마법 저항력을 15 감소시키고(스탯창 주문 관통력: 15 상시 적용) 비전 주문의 위협 수준(어그로)을 감소시킵니다.',
    note: '✅ 스탯창 주문 관통력 15 실측 확인'
  },
  '신비한 정신 집중': {
    en: 'Arcane Concentration (Clearcasting)', kind: '비전 특성 · 2티어 3열', quality: 'talent', icon: 'spell_shadow_manaburn',
    rows: [['현재 투자: 5 / 5 ★', 'Lv.27 마스터 완료 ✅']],
    desc: '공격 주문 적중 시 최대 10% 확률로 정신 집중(다음 공격 주문 마나 소모 0, 5초 규칙 미초기화)이 발동합니다. 4티어 신비한 명상의 선행 특성입니다.',
    note: '⭐ Lv.27(18번째 포인트)에 5/5 완성 → 신비한 명상 해금'
  },
  '화살 탄막': {
    en: 'Missile Barrage', kind: '비전 특성 · 2티어 4열', quality: 'talent', icon: 'ability_mage_missilebarrage',
    rows: [['현재 투자: 2 / 2 ★', '마스터 완료']],
    desc: '비전 작렬·비전 격노 시전 시 확률적으로 다음 신비한 화살을 마나 소모 없이 고속으로 발사하는 와우 포에버 핵심 프록 특성입니다.',
    note: '✅ 2026-11-18 실측 (2/2) · 포에버 아이콘 ID 236221'
  },
  '신비한 명상': {
    en: 'Arcane Meditation', kind: '비전 특성 · 4티어 3열', quality: 'talent', icon: 'spell_shadow_siphonmana',
    rows: [['현재 투자: 3 / 3 ★ (Lv.30 마스터 ✅)', '시전 중 마나 재생 50% 유지']],
    desc: '주문 시전 중에도 정신력 기반 마나 재생을 최대 50% 유지합니다. Lv.32~34 마법사 갑옷(50%)과 합연산 시 시전 중 100% 마나 재생 완성!',
    note: '✅ Lv.30 마스터 완료 (3/3 = 50% 유지) · 현재 마나 1,869'
  },
  '냉정': {
    en: 'Presence of Mind', kind: '비전 특성 · 5티어', quality: 'talent', icon: 'spell_nature_enchantarmor',
    rows: [['Off-GCD 즉시 발동', 'Lv.30 습득 목표']],
    desc: '활성화 시 시전 시간이 10초 미만인 다음 마법사 주문을 즉시 시전으로 만듭니다. 비전 작렬·비전 격노와 원버튼 매크로 결합 가능.',
    note: '📘 Lv.30 핵심 전환점 (21번째 포인트)'
  },
  '신비한 정신': {
    en: 'Arcane Mind', kind: '비전 특성 · 5티어 (현재 4/5 ✅)', quality: 'talent', icon: 'spell_shadow_charm',
    rows: [['총 지능 +8% · 비전 치명 피해 +80%', 'Lv.36 4/5 투자 ✅ (배율 190%)']],
    desc: '총 지능을 비율(%)로 증가시켜 최대 마나, 주문 극대화, 비전 작렬의 지능 12% 주문력 전환 효율과 비전 치명타 배율(150%→190%→200%)을 동시에 끌어올립니다.',
    note: '✅ Lv.36 4/5 달성 — 비전 작렬 & 비전 격노(최대 마나 5%) 이중 시너지'
  },
  '신비한 불안정성': {
    en: 'Arcane Instability', kind: '비전 특성 · 6티어', quality: 'talent', icon: 'spell_shadow_teleport',
    rows: [['주문 피해 + 극대화 증가', '신마강 선행']],
    desc: '모든 주문의 공격력과 극대화율을 증가시키는 6티어 화력 특성입니다.',
    note: 'Lv.40 신비의 마법 강화 선행 특성'
  },
  '신비의 마법 강화': {
    en: 'Arcane Power', kind: '비전 최종 특성 · Lv.40', quality: 'talent', icon: 'spell_nature_lightning',
    rows: [['Off-GCD 버스트 쿨기', '재사용 대기시간 3분']],
    desc: '활성화 시 15초 동안 주문 공격력이 대폭 증가하는 대신 마나 소모량이 증가합니다. 장신구 + 비전 작렬과 원버튼 폭딜 매크로로 묶어 사용합니다.',
    note: '📘 Lv.40 비전 트리 최종 완성기'
  },
  '신비한 충돌': {
    en: 'Arcane Impact', kind: '비전 특성 · 3티어 2열', quality: 'talent', icon: 'spell_nature_wispsplode',
    rows: [['선택 투자 분기', '비전 극대화율 증가']],
    desc: '신비한 폭발 및 핵심 비전 주문의 극대화 적중률을 높여줍니다.',
    note: '신비한 명상 이후 선택 투자 후보'
  },
  '마법 차단 연마': {
    en: 'Improved Counterspell', kind: '비전 특성 · 4티어 2열', quality: 'talent', icon: 'spell_frost_iceshock',
    rows: [['선택 투자 분기', '4초 침묵 부여']],
    desc: '마법 차단 시 대상에게 일정 확률로 4초간 침묵 효과를 부여해 던전 캐스터 몹 풀링과 PvP에 매우 강력합니다.',
    note: '던전/필드 유틸리티 분기'
  },
  '산산조각': {
    en: 'Shatter', kind: '냉기 핵심 특성', quality: 'talent', icon: 'spell_frost_frostshock',
    rows: [['냉기 전환 시 핵심', '빙결 대상 극대화 대폭 증가']],
    desc: '얼어붙은 대상에 대한 모든 주문의 극대화 적중률을 크게 높여주는 냉기 마법사 주력 특성입니다.',
    note: '향후 냉기 특성 전환 대비 참고'
  },
  '신마강': { alias: '신비의 마법 강화' },
  '정밀함': {
    en: 'Precision', kind: '냉기 특성 · 1티어 (현재 1/3 ✅)', quality: 'spell', icon: 'spell_frost_frost',
    rows: [['냉기 1티어 (ID: #105778)', '모든 학파 통합 적중!'], ['투자당 +2% / +4% / +6%', '현재 1/3 투자 → 총 적중 +2%']],
    desc: '와우 포에버에서 비전·화염·냉기 모든 주문 적중률을 올려주도록 통합 개편된 필수 특성입니다. 2/3 달성 시 동레벨 4% 만적중 완성!',
    note: '⭐ Lv.37 2/3 우선 투자 추천 (동레벨 4% 만적중 완성)'
  }
};
