/* WoW Forever Character Progression — 3-Tree Talents, Spell Sim, Combo Presets & Update Badges */
const IG_TALENT_TREES = {
  arcane: {
    name: '비전 (Arcane)', pts: 24, icon: 'spell_arcane_blast', bg: 'bg-arcane',
    arrows: [
      { r1: 2, c1: 3, r2: 4, c2: 3 },  // 신비한 정신 집중 -> 신비한 명상
      { r1: 3, c1: 4, r2: 4, c2: 4 },  // 비전 작렬 -> 비전 격노
      { r1: 5, c1: 2, r2: 7, c2: 2 }   // 냉정 -> 신비의 마법 강화
    ],
    nodes: [
      { r:1, c:1, base:2, cur:2, max:2, key:'신비한 미묘함', icon:'spell_holy_dispelmagic', en:'Arcane Subtlety',
        steps:['관통 +8 · 위협 -20%','관통 +15 · 위협 -40%'],
        fmt: r => `대상의 모든 마법 저항력을 ${[0,8,15][r]} 감소(주문 관통력 +${[0,8,15][r]})시키고 비전 주문 위협 수준을 ${[0,20,40][r]}% 감소시킵니다.` },
      { r:1, c:2, base:5, cur:5, max:5, key:'정신 집중 연마', icon:'spell_holy_devotion', en:'Improved Channeling',
        steps:['밀림 저항 20%','40%','60%','80%','100%'],
        fmt: r => `신비한 화살·비전 작렬·비전 격노 시전 중 피격 시 시전 밀림 저항 확률이 ${r*20}% 증가합니다.` },
      { r:1, c:3, base:0, cur:0, max:3, key:'신비한 인내', icon:'spell_magearmor', en:'Arcane Resilience',
        steps:['지능 25% 방어','50%','75%'],
        fmt: r => `총 지능의 ${r*25}%만큼 방어도가 증가합니다.` },
      { r:2, c:1, base:2, cur:2, max:2, key:'마법봉 전문화', icon:'inv_wand_01', en:'Wand Specialization',
        steps:['마법봉 +13%','+25%'],
        fmt: r => `마법봉 공격력이 ${[0,13,25][r]}% 증가합니다.` },
      { r:2, c:2, base:0, cur:0, max:5, key:'마법 흡수', icon:'spell_arcane_blink', en:'Magic Absorption',
        steps:['저항 +2 · 마나 1%','+4 · 2%','+6 · 3%','+8 · 4%','+10 · 5%'],
        fmt: r => `모든 마법 저항력이 ${r*2} 증가하고 주문 완전 저항 시 최대 마나의 ${r}%를 회복합니다.` },
      { r:2, c:3, base:5, cur:5, max:5, key:'신비한 정신 집중', icon:'spell_shadow_manaburn', en:'Arcane Concentration',
        steps:['정신 집중 2%','4%','6%','8%','10%'],
        fmt: r => `공격 주문 적중 시 ${r*2}% 확률로 정신 집중(다음 공격 주문 마나 소모 0, 5초 규칙 미초기화)이 발동합니다.` },
      { r:2, c:4, base:2, cur:2, max:2, key:'화살 탄막', icon:'ability_mage_missilebarrage', en:'Missile Barrage',
        steps:['프록 20%','40%'],
        fmt: r => `비전 작렬·비전 격노 시전 시 ${r*20}% 확률로 다음 신비한 화살을 마나 소모 없이 2.5초 고속 발사합니다.` },
      { r:3, c:1, base:0, cur:0, max:2, key:'마법 조율', icon:'spell_nature_removecurse', en:'Magic Attunement',
        steps:['효과 +25% · 사거리 +3m','+50% · +6m'],
        fmt: r => `마법 증폭·마법 감쇠 효과가 ${r*25}% 증가하고 비전 주문 사거리가 ${r*3}m 늘어납니다.` },
      { r:3, c:2, base:0, cur:0, max:3, key:'신비한 충돌', icon:'spell_nature_wispsplode', en:'Arcane Impact',
        steps:['비전 치명 +2%','+4%','+6%'],
        fmt: r => `신비한 폭발 및 핵심 비전 주문의 극대화 적중률이 ${r*2}% 증가합니다.` },
      { r:3, c:4, base:1, cur:1, max:1, key:'비전 작렬', icon:'spell_arcane_blast', en:'Arcane Blast',
        steps:['습득 (중첩당 지능 12% SP)'],
        fmt: () => `1.5초 시전 비전 주력기 습득. 중첩당 지능의 12%만큼 전 학파 주문력 증가 & 비전 작렬 마나 소모 +100% (최대 4중첩).` },
      { r:4, c:1, base:0, cur:0, max:2, key:'마법 차단 연마', icon:'spell_frost_iceshock', en:'Improved Counterspell',
        steps:['4초 침묵 50%','100%'],
        fmt: r => `마법 차단 시 ${r*50}% 확률로 대상을 4초간 침묵시킵니다.` },
      { r:4, c:2, base:0, cur:0, max:2, key:'마나 보호막 연마', icon:'spell_shadow_charm', en:'Improved Mana Shield',
        steps:['마나 소모 -10%','-20%'],
        fmt: r => `마나 보호막 활성화 시 흡수 피해당 소모되는 마나량이 ${r*10}% 감소합니다.` },
      { r:4, c:3, base:3, cur:3, max:3, key:'신비한 명상', icon:'spell_shadow_siphonmana', en:'Arcane Meditation',
        req:{ r:2, c:3 },
        steps:['시전 중 재생 17%','33%','50%'],
        fmt: r => `주문 시전 중에도 정신력 기반 마나 재생의 ${[0,17,33,50][r]}%가 유지됩니다. (마법사 갑옷 +50%와 합연산 최대 100%)` },
      { r:4, c:4, base:1, cur:1, max:1, key:'비전 격노', icon:'ability_mage_arcanebarrage', en:'Arcane Wrath',
        req:{ r:3, c:4 },
        steps:['습득 (최대 마나 5% SP)'],
        fmt: () => `3.5초 시전 / 6초 쿨 비전 마무리 주력기 습득. 최대 마나의 5%만큼 추가 주문 공격력이 반영됩니다.` },
      { r:5, c:2, base:1, cur:1, max:1, key:'냉정', icon:'spell_nature_enchantarmor', en:'Presence of Mind',
        steps:['습득 (다음 주문 즉시 시전 · 3분 쿨)'],
        fmt: () => `활성화 시 시전 시간 10초 미만 다음 마법사 주문을 즉시 시전으로 만듭니다 (Off-GCD, 쿨 3분).` },
      { r:5, c:3, base:2, cur:2, max:5, key:'신비한 정신', icon:'spell_shadow_charm', en:'Arcane Mind',
        steps:['지능 +2% · 비전 치명피해 +20%','+4% · +40%','+6% · +60%','+8% · +80%','+10% · +100%'],
        fmt: r => `총 지능이 ${r*2}% 증가하고, 비전 주문의 치명타 피해 보너스가 ${r*20}% 증가(치명 배율 ${150 + r*10}%)합니다.` },
      { r:6, c:3, base:0, cur:0, max:3, key:'신비한 불안정성', icon:'spell_shadow_teleport', en:'Arcane Instability',
        steps:['피해 +1% · 치명 +1%','+2% · +2%','+3% · +3%'],
        fmt: r => `모든 주문의 공격력이 ${r}% 증가하고 모든 주문의 극대화 적중률이 ${r}% 증가합니다.` },
      { r:7, c:2, base:0, cur:0, max:1, key:'신비의 마법 강화', icon:'spell_nature_lightning', en:'Arcane Power',
        req:{ r:5, c:2 },
        steps:['습득 (15초 주문력 +30% / 마나 +30%)'],
        fmt: () => `활성화 시 15초간 모든 주문 공격력이 30% 증가하고 마나 소모량이 30% 증가합니다 (Off-GCD, 쿨 3분).` }
    ]
  },
  fire: {
    name: '화염 (Fire)', pts: 0, icon: 'spell_fire_fireball', bg: 'bg-fire',
    arrows: [
      { r1: 3, c1: 3, r2: 4, c2: 3 }, // 불덩이 작렬 -> 열기
      { r1: 5, c1: 2, r2: 7, c2: 2 }  // 임계 질량 -> 발화
    ],
    nodes: [
      { r:1, c:2, base:0, cur:0, max:5, key:'촉진제 (화염구 연마)', icon:'spell_fire_fireball', en:'Accelerant',
        steps:['시전 -0.1초','-0.2초','-0.3초','-0.4초','-0.5초'],
        fmt: r => `화염구·서리불꽃 화살·비전 격노의 시전 시간을 ${(r*0.1).toFixed(1)}초 단축합니다. (와우 포에버 개편)` },
      { r:1, c:3, base:0, cur:0, max:5, key:'충돌', icon:'spell_fire_soulburn', en:'Impact',
        steps:['2초 기절 2%','4%','6%','8%','10%'],
        fmt: r => `화염 주문 적중 시 ${r*2}% 확률로 대상을 2초간 기절시킵니다.` },
      { r:2, c:1, base:0, cur:0, max:5, key:'작열', icon:'spell_fire_selfdestruct', en:'Ignite',
        steps:['추가 DoT 8%','16%','24%','32%','40%'],
        fmt: r => `화염 주문 극대화 시 4초에 걸쳐 피해의 ${r*8}%를 추가 화염 지속 피해로 입힙니다.` },
      { r:2, c:2, base:0, cur:0, max:2, key:'화염 투척', icon:'spell_fire_fireball', en:'Flame Throwing',
        steps:['사거리 +3m','+6m'],
        fmt: r => `모든 화염 주문의 유효 사거리가 ${r*3}m 증가합니다.` },
      { r:2, c:3, base:0, cur:0, max:3, key:'화염 작렬 연마', icon:'spell_fire_fireball', en:'Improved Fire Blast',
        steps:['쿨 -0.5초','-1.0초','-1.5초'],
        fmt: r => `화염 작렬 재사용 대기시간이 ${(r*0.5).toFixed(1)}초 단축됩니다 (8.0초 → ${(8 - r*0.5).toFixed(1)}초).` },
      { r:3, c:1, base:0, cur:0, max:2, key:'소각', icon:'spell_fire_soulburn', en:'Incineration',
        steps:['치명 +2%','+4%'],
        fmt: r => `화염 작렬·불태우기·비전 작렬·얼음 창의 극대화 적중률이 ${r*2}% 증가합니다.` },
      { r:3, c:2, base:0, cur:0, max:3, key:'불기둥 연마', icon:'spell_fire_selfdestruct', en:'Improved Flamestrike',
        steps:['치명 +5%','+10%','+15%'],
        fmt: r => `불기둥의 극대화 적중률이 ${r*5}% 증가합니다.` },
      { r:3, c:3, base:0, cur:0, max:1, key:'불덩이 작렬', icon:'spell_fire_fireball', en:'Pyroblast',
        steps:['습득 (6초 시전 화염 폭딜 + DoT)'],
        fmt: () => `거대한 화염 바위를 던져 막대한 즉발 및 12초 지속 화염 피해를 입힙니다. (열기 선행)` },
      { r:3, c:4, base:0, cur:0, max:2, key:'불타는 영혼', icon:'spell_fire_firearmor', en:'Burning Soul',
        steps:['밀림 저항 35% · 위협 -15%','70% · -30%'],
        fmt: r => `화염 주문 시전 중 피격 밀림 저항 ${r*35}%, 화염 주문 위협 수준 ${r*15}% 감소.` },
      { r:4, c:1, base:0, cur:0, max:3, key:'불태우기 연마', icon:'spell_fire_soulburn', en:'Improved Scorch',
        steps:['화염 취약 33%','66%','100%'],
        fmt: r => `불태우기 적중 시 ${[0,33,66,100][r]}% 확률로 대상이 받는 화염 피해를 3%씩 최대 15%(5중첩) 증가시킵니다.` },
      { r:4, c:2, base:0, cur:0, max:2, key:'화염계 수호 연마', icon:'spell_fire_firearmor', en:'Improved Fire Ward',
        steps:['반사 10%','20%'],
        fmt: r => `화염계 수호 활성화 중 ${r*10}% 확률로 화염 주문을 반사합니다.` },
      { r:4, c:3, base:0, cur:0, max:1, key:'열기 (Heating Up)', icon:'spell_fire_selfdestruct', en:'Heating Up',
        req:{ r:3, c:3 },
        steps:['습득 (불덩이 시전 -25%/중첩, 최대 3중첩)'],
        fmt: () => `화염 주문 극대화 및 화염 작렬 시 다음 불덩이 작렬 시전 시간이 중첩당 25% 단축(최대 3중첩)됩니다.` },
      { r:4, c:4, base:0, cur:0, max:3, key:'원소의 대가', icon:'spell_fire_firearmor', en:'Master of Elements',
        steps:['기본 마나 환급 10%','20%','30%'],
        fmt: r => `화염 및 냉기 주문 극대화 시 기본 마나 소모량의 ${r*10}%를 돌려받습니다.` },
      { r:5, c:2, base:0, cur:0, max:3, key:'임계 질량', icon:'spell_fire_soulburn', en:'Critical Mass',
        steps:['화염 치명 +2%','+4%','+6%'],
        fmt: r => `화염 주문의 극대화 적중률이 ${r*2}% 증가합니다. (발화 선행)` },
      { r:5, c:3, base:0, cur:0, max:1, key:'화염 폭풍', icon:'spell_fire_selfdestruct', en:'Blast Wave',
        steps:['습득 (즉시 광역 화염 + 6초 감속)'],
        fmt: () => `즉시 주위에 화염 파동을 방출해 광역 화염 피해와 6초간 50% 감속·넉백을 부여합니다.` },
      { r:6, c:3, base:0, cur:0, max:5, key:'화염 마법 강화', icon:'spell_fire_fireball', en:'Fire Power',
        steps:['화염 피해 +2%','+4%','+6%','+8%','+10%'],
        fmt: r => `모든 화염 주문의 공격력이 ${r*2}% 증가합니다.` },
      { r:7, c:2, base:0, cur:0, max:1, key:'발화', icon:'spell_fire_firearmor', en:'Combustion',
        req:{ r:5, c:2 },
        steps:['습득 (화염 적중당 치명 +10% 누적, 3치명 유지)'],
        fmt: () => `활성화 시 화염 주문 적중마다 극대화율이 10%씩 누적 증가하며, 극대화 3회 달성 시 종료됩니다.` }
    ]
  },
  frost: {
    name: '냉기 (Frost)', pts: 1, icon: 'spell_frost_frostnova', bg: 'bg-frost',
    arrows: [
      { r1: 2, c1: 3, r2: 5, c2: 3 }, // 얼음 회오리 연마 -> 산산조각
      { r1: 5, c1: 2, r2: 7, c2: 2 }  // 얼음 방패 -> 얼음 보호막
    ],
    nodes: [
      { r:1, c:1, base:0, cur:0, max:2, key:'얼음 방어', icon:'spell_frost_frostarmor02', en:'Frost Warding',
        steps:['갑옷 방어/저항 +15% · 반사 10%','+30% · 20%'],
        fmt: r => `냉기·얼음 갑옷 방어도 및 저항력이 ${r*15}% 증가하고 냉기계 수호 시 ${r*10}% 확률로 반사합니다.` },
      { r:1, c:2, base:0, cur:0, max:5, key:'얼음 화살 연마', icon:'spell_frost_frostshock', en:'Improved Frostbolt',
        steps:['시전 -0.1초','-0.2초','-0.3초','-0.4초','-0.5초'],
        fmt: r => `얼음 화살의 시전 시간을 ${(r*0.1).toFixed(1)}초 단축합니다.` },
      { r:1, c:3, base:1, cur:1, max:3, key:'정밀함', icon:'spell_frost_iceshock', en:'Precision',
        steps:['모든 주문 적중 +2%','+4%','+6%'],
        fmt: r => `비전·화염·냉기 모든 주문의 적중률이 ${r*2}% 증가합니다. (와우 포에버 개편: 동렙 4% / +2렙 6% 만적중)` },
      { r:2, c:1, base:0, cur:0, max:5, key:'얼음 파편', icon:'spell_frost_frostshock', en:'Ice Shards',
        steps:['냉기 치명피해 +20%','+40%','+60%','+80%','+100%'],
        fmt: r => `냉기 주문의 치명타 피해 보너스가 ${r*20}% 증가(치명 배율 ${150 + r*10}%)합니다.` },
      { r:2, c:2, base:0, cur:0, max:3, key:'동상', icon:'spell_frost_frostnova', en:'Frostbite',
        steps:['5초 빙결 5%','10%','15%'],
        fmt: r => `냉기 감속 효과 적용 시 ${r*5}% 확률로 대상을 5초간 제자리에 얼립니다.` },
      { r:2, c:3, base:0, cur:0, max:2, key:'얼음 회오리 연마', icon:'spell_frost_frostnova', en:'Improved Frost Nova',
        steps:['쿨 -2초','-4초'],
        fmt: r => `얼음 회오리 재사용 대기시간이 ${r*2}초 단축됩니다. (산산조각 선행)` },
      { r:2, c:4, base:0, cur:0, max:3, key:'영구 결빙', icon:'spell_frost_frostarmor02', en:'Permafrost',
        steps:['지속 +1초 · 감속 +4%','+2초 · +7%','+3초 · +10%'],
        fmt: r => `냉기 감속 지속 시간이 ${r}초 늘어나고 이동 속도 감소 효과가 ${[0,4,7,10][r]}% 추가 강화됩니다.` },
      { r:3, c:1, base:0, cur:0, max:3, key:'사무치는 냉기', icon:'spell_frost_frostshock', en:'Piercing Ice',
        steps:['냉기 피해 +2%','+4%','+6%'],
        fmt: r => `모든 냉기 주문 공격력이 ${r*2}% 증가합니다.` },
      { r:3, c:2, base:0, cur:0, max:1, key:'매서운 한파', icon:'spell_frost_frost', en:'Cold Snap',
        steps:['습득 (냉기 주문 쿨 즉시 초기화)'],
        fmt: () => `활성화 시 최근 사용한 모든 냉기 주문의 재사용 대기시간을 즉시 초기화합니다.` },
      { r:3, c:3, base:0, cur:0, max:3, key:'눈보라 연마', icon:'spell_frost_icestorm', en:'Improved Blizzard',
        steps:['감속 30%','50%','65%'],
        fmt: r => `눈보라 적중 시 대상 이동 속도를 ${[0,30,50,65][r]}% 감소시킵니다.` },
      { r:4, c:1, base:0, cur:0, max:2, key:'혹한의 손길', icon:'spell_frost_iceshock', en:'Arctic Reach',
        steps:['사거리·반경 +10%','+20%'],
        fmt: r => `얼음 화살·눈보라·얼음 회오리·냉기 돌풍의 사거리와 반경이 ${r*10}% 증가합니다.` },
      { r:4, c:2, base:0, cur:0, max:3, key:'냉기 집중', icon:'spell_frost_frostarmor02', en:'Frost Channeling',
        steps:['마나 -5% · 위협 -10%','-10% · -20%','-15% · -30%'],
        fmt: r => `냉기 주문의 마나 소모량이 ${r*5}% 감소하고 위협 수준이 ${r*10}% 낮아집니다.` },
      { r:4, c:4, base:0, cur:0, max:3, key:'서리의 손가락', icon:'spell_frost_frostshock', en:'Fingers of Frost',
        steps:['빙결 판정 5%','10%','15%'],
        fmt: r => `감속 효과 적용 시 ${r*5}% 확률로 다음 주문이 빙결(산산조각) 판정을 받습니다.` },
      { r:5, c:1, base:0, cur:0, max:3, key:'냉기 돌풍 연마', icon:'spell_frost_icestorm', en:'Improved Cone of Cold',
        steps:['냉기 돌풍 +15%','+25%','+35%'],
        fmt: r => `냉기 돌풍의 공격력이 ${[0,15,25,35][r]}% 증가합니다.` },
      { r:5, c:2, base:0, cur:0, max:1, key:'얼음 방패', icon:'spell_frost_frost', en:'Ice Block',
        steps:['습득 (10초 완전 면역 · 5분 쿨)'],
        fmt: () => `10초간 모든 물리·마법 피해와 디버프에 완전 면역이 됩니다. (얼음 보호막 선행)` },
      { r:5, c:3, base:0, cur:0, max:3, key:'산산조각', icon:'spell_frost_frostshock', en:'Shatter',
        req:{ r:2, c:3 },
        steps:['빙결 대상 치명 +17%','+34%','+50%'],
        fmt: r => `얼어붙은 대상에 대한 모든 주문의 극대화 적중률이 ${[0,17,34,50][r]}% 증가합니다.` },
      { r:6, c:3, base:0, cur:0, max:5, key:'혹한의 추위', icon:'spell_frost_icestorm', en:"Winter's Chill",
        steps:['중첩 확률 20%','40%','60%','80%','100%'],
        fmt: r => `얼음 화살·얼음 창 적중 시 ${r*20}% 확률로 다음 냉기 돌풍 피해를 증폭하는 중첩을 부여합니다.` },
      { r:7, c:2, base:0, cur:0, max:1, key:'얼음 보호막', icon:'spell_frost_frostarmor02', en:'Ice Barrier',
        req:{ r:5, c:2 },
        steps:['습득 (보호막 + 밀림 방지 + 냉기 피해 +15%)'],
        fmt: () => `피해를 흡수하는 보호막을 두르며 시전 밀림 방지 + 냉기 공격력 +15%(유지 중 +5% 추가)를 제공합니다.` }
    ]
  }
};

const SIM_SPELLS = {
  aw: {
    id: 'aw', short: '비격', name: '비전 격노(1 레벨)', wowKey: '비전 격노', icon: 'ability_mage_arcanebarrage',
    mana: 140, cast: 3.5, baseDmg: 397.6, coeff: 1.0, school: 'arcane',
    note: '툴팁 ~284.5 + 최대 마나 5%(2,262×5%=+113.1) = ~398 · 6초 쿨 · 냉정 즉시 시전 가능!'
  },
  ab: {
    id: 'ab', short: '비작2', name: '비전 작렬(2 레벨)', wowKey: '비전 작렬', icon: 'spell_arcane_blast',
    mana: 92, cast: 1.5, baseDmg: 153.1, coeff: 0.4286, school: 'arcane', stacksAB: true,
    note: '2레벨 (비전 +160 반영 ~153) · 기본 마나 15%(~92) · 중첩당 지능 12%(+14.6 SP) 전 학파 적용'
  },
  am: {
    id: 'am', short: '신화4', name: '신비한 화살(4 레벨)', wowKey: '신비한 화살(4 레벨)', icon: 'spell_nature_starfall',
    mana: 320, cast: 5.0, baseDmg: 575.0, coeff: 1.0, school: 'arcane', isMissiles: true,
    note: 'Lv.34 4레벨 총 575 (발당 ~115.0 × 5) · 화살 탄막 프록 시 2.5초 & 마나 0 (230.0 DPS!)'
  },
  fb1: {
    id: 'fb1', short: '얼화1', name: '얼음 화살(1 레벨)', wowKey: '얼음 화살(1 레벨)', icon: 'spell_frost_frostshock',
    mana: 25, cast: 1.5, baseDmg: 48.2, coeff: 0.33, school: 'frost',
    note: '마나 25 · 1.5초 감속(-40%, 5초) · 일반+86 및 비작 전학파 버프 적용!'
  },
  fbl: {
    id: 'fbl', short: '화작4', name: '화염 작렬(4 레벨)', wowKey: '화염 작렬', icon: 'spell_fire_fireball',
    mana: 165, cast: 1.5, baseDmg: 199.9, coeff: 0.4286, school: 'fire',
    note: '4레벨 (마나 165 · 기본 148~178 + 일반 86 = ~200) · 즉시(On-GCD 1.5초) · 8초 쿨'
  },
  wd: {
    id: 'wd', short: '법봉', name: '땅거미 마법봉', wowKey: '땅거미 마법봉', icon: 'inv_wand_07',
    mana: 0, cast: 1.3, baseDmg: 41.9, coeff: 0, school: 'wand',
    note: '마나 0 · 5SR 마나 회복 유지 · 기본 23-44 × 마법봉 전문화 2/2(+25%) = 29-55 (평균 ~41.9 · 32.2 DPS · 모든 주문 +5)'
  }
};

const DEFAULT_COMBOS = [
  {
    id: 'c_aw', label: '① 비격 선공',
    tipTitle: '① 비전 격노 선공 + 화작(4) 마무리 (필드 정석 ⭐)',
    tipBody: '풀링 전 3.5초 선타로 <strong>~398</strong>을 꽂고, 비전 작렬(2레벨) → 신비한 화살(4레벨) → <strong>화염 작렬(4레벨, 비작 1중첩 반영!)</strong>로 마무리해 <strong>단일 1,346</strong>! 탄막 시 <strong>9.0초 (149.6 DPS)</strong>.',
    seq: ['aw', 'ab', 'am', 'fbl'], barrage: false, clearcast: false, startStack: 0
  },
  {
    id: 'c_ab', label: '② 비작2 선공',
    tipTitle: '② 비전 작렬(2) 2연타 + 화작(4) 마무리 (던전 · 속공)',
    tipBody: '탱커 풀링/빠른 몹에 적합합니다. 비작(2레벨) 2중첩(+29.2 SP) 후 신비한 화살(4레벨 604) + <strong>화염 작렬(4레벨, 2중첩 ~212!)</strong>로 즉각 마무리! <strong>누적 1,129 · 탄막 7.0초 (161.3 DPS)</strong>.',
    seq: ['ab', 'ab', 'am', 'fbl'], barrage: false, clearcast: false, startStack: 0
  },
  {
    id: 'c_fb1', label: '③ 얼화1 카이팅',
    tipTitle: '③ 얼음 화살(1) 선감속 + 화작(4) 마무리',
    tipBody: '1레벨(1.5초·25마나)로 5초간 -40% 감속 후 비전 작렬(2레벨) 2타 → 신비한 화살(4레벨) → <strong>화염 작렬(4레벨, 2중첩 ~212)</strong> 마무리. <strong>누적 1,177 (탄막 8.5초 · 138.5 DPS)</strong>.',
    seq: ['fb1', 'ab', 'ab', 'am', 'fbl'], barrage: false, clearcast: false, startStack: 0
  },
  {
    id: 'c_boss', label: '④ 보스 폭딜',
    tipTitle: '④ 던전 보스 프록 폭발 + 화작(4) 마무리',
    tipBody: '비작(2레벨) 2중첩(+29.2 SP) 후 화살 탄막(2.5초 신화 604) → 2중첩 비전 격노(<strong>427</strong>) → 2중첩 <strong>화염 작렬(4레벨 ~212)</strong>까지 연계해 <strong>누적 1,556 (10.5초 · 148.2 DPS)</strong> 폭딜!',
    seq: ['ab', 'ab', 'am', 'aw', 'fbl'], barrage: true, clearcast: false, startStack: 0
  }
];

const RECENTLY_UPDATED_TABS = {
  'tab-addons': {
    v: '2026-11-25-v4',
    text: '11/25 15:20 EzWoW-MapFinder 미사용 6개 외국어 제외 메모리 경량화 패치 ✅ · Details! 한글 재패치 완료'
  },
  'tab-prof': {
    v: '2026-11-25-v3',
    text: '11/25 15:34 경매장 시세 추이 반영 & 전문기술 툴팁 숙련도(마부 128·무두 205·낚시 22) 최신화'
  },
  'tab-rules': {
    v: '2026-11-25-v2',
    text: '11/25 경험치 계산기·회색몹 기준 Lv.34 동기화 & 토글 하위 제목 심플 넘버링'
  },
  'tab-talent': {
    v: '2026-11-25-v2',
    text: '11/25 15:34 노버프 확정 Lv.34 24/0/1 (HP 863 / MP 2,262 · 체57/지122/정99 · 방어 466 · 치명 5.19% · 전투 MP5 94.4)'
  },
  'tab-skills': {
    v: '2026-11-25-v1',
    text: '11/25 15:34 Lv.34 비전+160·MP 2,262 기준 시뮬레이터·스킬 툴팁·로드맵 전면 동기화'
  },
  'tab-quests': {
    v: '2026-11-25-v3',
    text: '11/25 13:36 놈리건 남은 2종(유일한 치료법·자료 회수 오색 천공카드) & 케르노비/노움의 실력 향상 정리'
  },
  'tab-gear': {
    v: '2026-11-25-v2',
    text: '11/25 15:34 노버프 스탯 확정 & 머리(기가볼트)·어깨(녹색 비단) 기준 장비 비교 툴팁 14건 전면 교정'
  },
  'tab-agy': {
    v: '2026-11-25-v1',
    text: '11/25 대시보드 Zero-Build 11개 모듈 전면 분리 (아이템·스킬·특성 DB 세분화 & META 단일 통합)'
  }
};
