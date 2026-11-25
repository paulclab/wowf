/* WoW Forever Tooltip DB — Installed AddOns (27 entries) */
const ADDON_DB = {
  'addon:Details!': {
    title: 'Details! Damage Meter',
    en: 'by Terciob · CurseForge #61284',
    kind: '전투 · 딜미터',
    quality: 'rare',
    icon: 'inv_misc_pocketwatch_01',
    rows: [['다운로드: ~3억 7,700만+ (CurseForge)', '인기도: 최상위 글로벌 필수'], ['구성: 본체 + 7 플러그인', '패치: 한국어 메뉴 글꼴 재적용']],
    desc: '실시간 DPS·HPS, 주문별 피해 비중, TinyThreat 어그로 미터기, 마법 차단 기록 및 보스 페이즈 분석을 제공합니다.',
    note: '✅ cooltip·languages·windows 로컬 한글 패치 재적용 완료 (/reload 즉시 반영)'
  },
  'addon:Shadowflare': {
    title: 'Shadowflare',
    en: 'by Fistao · CurseForge',
    kind: '전투 · 프록 알림',
    quality: 'spell',
    icon: 'spell_arcane_arcane04',
    rows: [['다운로드: ~5.88만+ (CurseForge)', '인기도: 와우 포에버 특화 인기'], ['지원: 1.60.1 네이티브', '조작: 중앙 핸들 드래그·휠']],
    desc: '와우 포에버 전용 직업 프록(화살 탄막, 신비한 정신 집중 등)을 별도 쿨다운 매니저 없이 기본 UI 감성으로 즉시 표시합니다.',
    note: '⚡ 비전 마법사의 화살 탄막/정신 집중 타이밍 포착 및 휠 크기 조절 핵심 애드온'
  },
  'addon:ForeverCombatText': {
    title: 'Forever Combat Text',
    en: 'by Morpster · CurseForge',
    kind: '전투 · 피해 텍스트',
    quality: 'spell',
    icon: 'spell_fire_fireball02',
    rows: [['다운로드: CurseForge 호스팅 (신규)', '인기도: 와우 포에버 전용'], ['특징: 이름표 학파 색상', '유형: 경량 전투 텍스트']],
    desc: '와우 포에버 클라이언트용 경량 전투 텍스트로, 적 이름표 위에 주문 학파별 색상으로 피해·치유 수치를 직관적으로 띄워줍니다.',
    note: '✨ 비전·화염·냉기 주문 학파 색 구분에 최적화'
  },
  'addon:RangeDisplay': {
    title: 'RangeDisplay',
    en: 'by mitch0 · CurseForge #14570',
    kind: '전투 · 사거리 측정',
    quality: 'rare',
    icon: 'ability_hunter_snipershot',
    rows: [['다운로드: ~400만+ (CurseForge)', '인기도: 장수 원거리 표준'], ['패치: 인던 Secret Value 보정 ✅', '명령어: /rangedisplay']],
    desc: '대상·주시·마우스오버까지의 예상 거리를 미터 단위로 실시간 표시합니다(/rangedisplay).',
    note: '✅ LibRangeCheck-3.0의 16001 인던 Secret GUID/주문 판정 패치 적용됨 (/reload 즉시 반영)'
  },
  'addon:Questie': {
    title: 'Questie',
    en: 'by Questie Team · CurseForge #334372',
    kind: '퀘스트 · 지도 핀',
    quality: 'rare',
    icon: 'inv_misc_map_01',
    rows: [['다운로드: ~2억 2,900만+ (CurseForge)', '인기도: 클래식·포에버 절대 표준'], ['구성: Questie + DB + Trace', '기능: 포에버 XP/목표 DB']],
    desc: '와우 포에버 전역의 수락 가능/진행 중/완료 퀘스트 위치와 목표 몹·오브젝트를 지도와 미니맵에 핀으로 표시합니다.',
    note: '💡 QuestieTrace는 제보 수집용 로거이므로 기여 목적이 아니면 꺼둘 수 있습니다.'
  },
  'addon:EzWoW-MapFinder': {
    title: 'EzWoW - Map Finder',
    en: 'by qqhrqqhr2 · CurseForge #1755566',
    kind: '오프라인 위치 검색',
    quality: 'uncommon',
    icon: 'inv_misc_spyglass_03',
    rows: [['다운로드: CurseForge 호스팅 (신규)', '인기도: 포에버 통합 DB 지도'], ['구성: 본체 + Data 21폴더', '패치: 미사용 6개 외국어 제외 ✅']],
    desc: '월드맵에서 몬스터, NPC, 오브젝트, 희귀몹, 퀘스트 및 아이템 드랍 위치를 오프라인 DB로 검색해 지도 핀과 웨이포인트로 안내합니다.',
    note: '✅ .toc에서 미사용 6개 외국어(15.1만 항목) 제외 + 옵션 변경 시에만 EzWoW-Data 지연 로드'
  },
  'addon:Books_on_map_Forever': {
    title: 'Books on map (Forever)',
    en: 'by Daeler · CurseForge',
    kind: '도서관 책 수집',
    quality: 'uncommon',
    icon: 'inv_misc_book_09',
    rows: [['다운로드: ~60.4만+ (CurseForge)', '인기도: 포에버 수집 필수 1순위'], ['기능: 월드맵·미니맵 자동 숨김', '명령어: /bom']],
    desc: '와우 포에버 전용 도서관 책 위치를 세계 지도와 미니맵에 모두 표시하고, 습득 즉시 핀을 숨기며 보상 진행도를 추적합니다.',
    note: '📚 도서관 반납 장비·평판 파밍에 필수'
  },
  'addon:OpenMap': {
    title: 'OpenMap',
    en: 'by jigrobbulus · CurseForge #1735937',
    kind: '통합 세계 지도',
    quality: 'uncommon',
    icon: 'inv_misc_map02',
    rows: [['다운로드: CurseForge 호스팅 (오픈소스)', '인기도: 포에버 지도 인기 애드온'], ['구성: OpenMap + NoDungeonMap', '명령어: /openmap']],
    desc: '바닐라 아트 스타일을 유지한 채 모든 대륙·지역 지도를 끊김 없이 이어붙여 줌인/줌아웃 및 드래그 탐색을 제공합니다.',
    note: '🗺️ OpenMap_NoDungeonMap 패치로 ForeverDungeonJournal과 충돌 없이 연동'
  },
  'addon:SquareMinimap': {
    title: 'Square Minimap by Foofi',
    en: 'by Foofi · CurseForge #1749143',
    kind: 'UI · 사각 미니맵',
    quality: 'uncommon',
    icon: 'inv_misc_spyglass_02',
    rows: [['다운로드: CurseForge 호스팅 (포에버 전용)', '인기도: 포에버 UI 커스텀'], ['상태: 단독 구성 (충돌 0)', '명령어: /sqm']],
    desc: '와우 포에버의 원형 미니맵을 클래식 브론즈 프레임 사각 미니맵으로 변환하고 애드온 아이콘을 테두리에 정리해 줍니다.',
    note: '✅ 기존 충돌 원인이던 Forever Minimap 제거 후 안정 동작 중'
  },
  'addon:TomTom': {
    title: 'TomTom',
    en: 'by Cladhaire · CurseForge #18808',
    kind: '좌표 내비게이션',
    quality: 'rare',
    icon: 'ability_spy',
    rows: [['다운로드: ~9,300만+ (CurseForge)', '인기도: 글로벌 표준 내비'], ['명령어: /way X Y', '기능: 화살표·거리 안내']],
    desc: '입력한 좌표나 연동 애드온이 지정한 목표 지점까지 화면 화살표·거리·예상 도착 시간을 안내하는 휴대용 내비게이션입니다.',
    note: '🧭 대시보드 지도/퀘스트 좌표를 /way 로 바로 찍어 이동할 때 활용'
  },
  'addon:ForeverDungeonJournal': {
    title: 'DungeonJournal (Forever)',
    en: 'by Exehn · CurseForge',
    kind: '던전 도감 · 공략',
    quality: 'rare',
    icon: 'inv_misc_book_07',
    rows: [['다운로드: ~2,070만+ (CurseForge)', '인기도: 글로벌 인기 던전 도감'], ['연동: OpenMap 던전 아이콘', '기능: 캐릭터별 루트 필터']],
    desc: '클래식·와우 포에버의 각 던전별 보스 목록, 드랍 아이템 테이블, 관련 퀘스트 및 지도 위치를 인게임에서 통합 조회합니다.',
    note: '🏰 OpenMap_NoDungeonMap과 연동하며 길안내 화살표 지원'
  },
  'addon:Attune': {
    title: 'Attune',
    en: 'by CixiDelmont · CurseForge',
    kind: '입장 연퀘 추적',
    quality: 'uncommon',
    icon: 'inv_misc_key_14',
    rows: [['다운로드: ~1,480만+ (CurseForge)', '인기도: 클래식 입장 연퀘 표준'], ['지원: 포에버 던전·레이드', '기능: 선행 연퀘·진행도 트리']],
    desc: '오닉시아·화산 심장부·검은날개 둥지·던전 열쇠 등 입장 선행 연퀘와 평판 진행률을 단계별 트리로 보여줍니다.',
    note: '🔑 만렙 레이드/인던 입장 준비도 체크 및 캐릭터별 초기화 지원'
  },
  'addon:ForeverLootSparkles': {
    title: 'Forever Loot Sparkles',
    en: 'by Ashtar Senior · CurseForge #1729017',
    kind: '편의 · 루팅 반짝임',
    quality: 'uncommon',
    icon: 'spell_holy_flashheal',
    rows: [['다운로드: ~160만+ (CurseForge)', '인기도: 포에버 편의 필수'], ['동작: 로그인·옵션 변경 시 자동 복구', '대상: 루팅·퀘스트 오브젝트']],
    desc: '그래픽 프리셋 변경 등으로 꺼지기 쉬운 루팅 시체·퀘스트 오브젝트의 반짝임 효과를 항상 켜진 상태로 유지해 줍니다.',
    note: '✨ 필드 오브젝트 및 무두질 대상 시인성 확보'
  },
  'addon:ForeverLevelingBiS': {
    title: 'Forever Leveling BiS',
    en: 'by Thunder / Timearc · CurseForge #1719370',
    kind: '성장 · 장비 BiS',
    quality: 'rare',
    icon: 'inv_chest_cloth_17',
    rows: [['다운로드: ~95.6만+ (CurseForge)', '인기도: 포에버 레벨링 필수'], ['기능: 다중/계정 위시리스트 · 60 적중상한', '명령어: /bis']],
    desc: '현재 캐릭터의 종족·직업·특성·레벨에 맞는 퀘스트 보상, 던전 드랍, 제작 BiS 장비를 추천하고 여러 위시리스트/계정 공용 목록으로 관리합니다.',
    note: '⚠️ 월드 드랍 BoE는 출처 텍스트가 생략되므로 경매장(Auctionator)에서 직접 확인 필요'
  },
  'addon:CharExport': {
    title: 'CharExport (로컬 커스텀)',
    en: 'Local Workspace Addon · Not on CurseForge',
    kind: '로컬 커스텀 · AI 연동',
    quality: 'talent',
    icon: 'inv_scroll_03',
    rows: [['배포 상태: 로컬 전용 (미등록)', '지원: 1.60.1 네이티브'], ['명령어: /ce · /cea · /ceall', '추적: 제작재료 114종']],
    desc: '/ce는 캐릭터 스탯·버프·특성·장비·스킬만, /cea는 114종 제작재료 시세만, /ceall은 캐릭터+시세 전체를 복사창으로 출력합니다.',
    note: '🛠️ /ce(시세 제외) · /cea(114종 시세) · /ceall(전체 통합)'
  },
  'addon:Auctionator': {
    title: 'Auctionator',
    en: 'by plusmouse · CurseForge',
    kind: '경제 · 경매장',
    quality: 'rare',
    icon: 'inv_misc_coin_02',
    rows: [['다운로드: ~2억 1,600만+ (CurseForge)', '인기도: 최상위 경매장 표준'], ['기능: 경매장 스캔·시세 툴팁', '상태: 타 언어 접미사 감지 보강']],
    desc: '빠른 경매장 전체 스캔, 일괄 판매/언더컷 출품, 쇼핑 리스트 및 아이템 툴팁 시세/상점가 표시를 제공합니다.',
    note: '✅ 접미사 인덱스 경량화 및 bonusID 대조 기반 다국어 랜덤 접미사 감지 반영'
  },
  'addon:Mastercraft': {
    title: 'Mastercraft',
    en: 'by Shadowblade · CurseForge',
    kind: '전문기술 · 수익 분석',
    quality: 'rare',
    icon: 'trade_engraving',
    rows: [['다운로드: ~120만+ (CurseForge)', '인기도: 포에버 전문기술 종합 1순위'], ['기능: 1~300 가이드·손익·마추 판정', '명령어: /mc']],
    desc: '1~300 전문기술 육성 가이드, 제작법별 손익, 마력 추출 vs 상점가 판정, 채집 노드 지도, 낚시/야영 유틸을 통합 제공합니다.',
    note: '💡 툴팁의 Auctionator 1d 표시를 숨기려면 /mc → 설정 → 툴팁 → 경매장 가격 끄기'
  },
  'addon:Baganator': {
    title: 'Baganator',
    en: 'by plusmouse · CurseForge',
    kind: '통합 가방 UI',
    quality: 'rare',
    icon: 'inv_misc_bag_08',
    rows: [['다운로드: ~4,600만+ (CurseForge)', '인기도: 차세대 통합 가방 대세'], ['연동: Syndicator (재고 엔진)', '기능: 카테고리 정렬·검색']],
    desc: '모든 가방과 은행을 하나의 깔끔한 창으로 통합하고 카테고리 자동 정렬, 실시간 검색, 장비 세트 구분을 지원합니다.',
    note: '🎒 가벼운 성능과 직관적인 카테고리 뷰 제공'
  },
  'addon:Syndicator': {
    title: 'Syndicator',
    en: 'by plusmouse · CurseForge',
    kind: '계정 재고 추적 엔진',
    quality: 'uncommon',
    icon: 'inv_box_01',
    rows: [['다운로드: ~3,250만+ (CurseForge)', '인기도: Baganator 필수 동반 애드온'], ['역할: 부캐·은행·우편 재고 DB', '연동: Baganator 백엔드']],
    desc: '계정 내 모든 캐릭터의 가방·은행·우편함에 보유한 아이템 수량을 실시간으로 추적해 툴팁과 Baganator 검색에 공급합니다.',
    note: '📦 Baganator와 동일 제작자의 핵심 백엔드 애드온'
  },
  'addon:WhatsTraining': {
    title: "What's Training?",
    en: 'by Sveng / Fusionpit · CurseForge #324944',
    kind: '마법책 · 스킬 미리보기',
    quality: 'uncommon',
    icon: 'inv_misc_book_11',
    rows: [['다운로드: ~1,100만+ (CurseForge)', '인기도: 클래식 레벨링 필수'], ['위치: 마법책(P) 하단 탭', '기능: 레벨별 스킬·골드 비용']],
    desc: '마법책(P)에서 앞으로 레벨이 오르면 직업 교관에게 배울 수 있는 스킬·등급과 학습 골드 비용을 레벨별로 미리 보여줍니다.',
    note: '📘 다음 레벨업 시 귀환/방문할 스킬 비용 미리 계산 가능'
  },
  'addon:LayerSwap': {
    title: 'LayerSwap',
    en: 'by Adam5288 · CurseForge',
    kind: '유틸 · 위상 전환',
    quality: 'uncommon',
    icon: 'spell_arcane_portaldalaran',
    rows: [['다운로드: CurseForge 호스팅 (인기)', '인기도: 포에버/클래식 위상 필수'], ['명령어: /ls', '기능: 현재 위상 확인 · 원클릭 전환']],
    desc: '현재 캐릭터가 속한 위상(Layer)을 실시간으로 보여주고, 같은 지역 호스트와 자동 파티 매칭을 통해 위상을 전환하며 시간당 이동 제한을 추적합니다.',
    note: '🌐 동일 샤드 호스트 자동 제외 및 초대/시스템 채팅 알림 숨김 지원'
  },
  'addon:DialogueUI': {
    title: 'Dialogue UI',
    en: 'by Peterodox · CurseForge',
    kind: 'UI · 몰입형 퀘스트창',
    quality: 'rare',
    icon: 'inv_letter_15',
    rows: [['다운로드: ~930만+ (CurseForge)', '인기도: 몰입형 UI 최상위'], ['특징: 카드형 대화 · 단축키', '연동: BiS/음성 UI 지원']],
    desc: 'NPC 대화 및 퀘스트 수락/완료 창을 가독성 높은 모던 카드로 바꾸고, 스페이스바·숫자키 빠른 선택 및 카메라 연출을 지원합니다.',
    note: '📖 퀘스트 스토리 가독성과 진행 속도 대폭 향상'
  },
  'addon:ForeverMove': {
    title: 'ForeverMove',
    en: 'by Ugge Zen · CurseForge #1702949',
    kind: 'UI · 창 이동/저장',
    quality: 'uncommon',
    icon: 'ability_rogue_sprint',
    rows: [['다운로드: ~19.8만+ (CurseForge)', '인기도: 포에버 UI 편의 인기'], ['명령어: /fm', '기능: 창 이동·크기 저장']],
    desc: '기본 고정되어 있는 블리자드 UI 창들을 마우스로 자유롭게 드래그해 이동시키고 위치·크기를 저장합니다.',
    note: '🖱️ 커서 아래 특수 프레임도 /fm 명령어로 위치 조절 가능'
  },
  'addon:ForeverMouseTooltip': {
    title: 'Forever Mouse Tooltip',
    en: 'by Ninjaskurk · CurseForge',
    kind: 'UI · 마우스 툴팁',
    quality: 'uncommon',
    icon: 'inv_misc_eye_01',
    rows: [['다운로드: ~1.08만+ (CurseForge)', '인기도: 포에버 전용 유틸'], ['기능: 커서 앵커 · ID 표시', '지원: 1.60.1 네이티브']],
    desc: '화면 우하단 구석에 고정된 게임 툴팁을 마우스 커서 주변에 띄워 시선 이동을 줄이고, 아이템·NPC·주문 ID 표시를 지원합니다.',
    note: '🖱️ 사냥·가방 정리 시 툴팁 가독성 최적화'
  },
  'addon:BetterBlizzFrames': {
    title: 'BetterBlizzFrames',
    en: 'by Bodify · CurseForge #940950',
    kind: 'UI · 기본 프레임 확장',
    quality: 'rare',
    icon: 'spell_holy_blessingofstrength',
    rows: [['다운로드: ~970만+ (CurseForge)', '인기도: 기본 프레임 커스텀 1순위'], ['주의: 구버전 애드온 허용 체크', '기능: 버프 필터·시전바']],
    desc: '블리자드 순정 개체창 외형을 유지하면서 버프/디버프 필터링, 파티원 시전바, 전투 중 아이콘 등 세밀한 커스터마이징을 제공합니다.',
    note: '🟡 .toc Interface가 본섭 기준이라 접속 시 "구버전 애드온 불러오기" 체크 필요'
  },
  'addon:WhisperMessenger': {
    title: 'Whisper Messenger',
    en: 'by F0rty_tw0 · CurseForge #1494311',
    kind: '소통 · 귓속말 메신저',
    quality: 'uncommon',
    icon: 'inv_letter_09',
    rows: [['다운로드: ~57.2만+ (CurseForge)', '인기도: 포에버/클래식 메신저 인기'], ['기능: 대화 로그 저장 · 알림 뱃지', '유형: 귓속말 분리창']],
    desc: '채팅창에 흩어지기 쉬운 귓속말을 상대별 메신저 창으로 분리해 주고, 재접속 후에도 대화 기록·접속 상태·안 읽음 뱃지를 유지합니다.',
    note: '💬 거래·파티·길드 귓속말 누락 방지'
  },
  'addon:Spoken': {
    title: 'Spoken (한국어 음성팩)',
    en: 'by rustykey · CurseForge',
    kind: '오디오 · 한국어 내레이션',
    quality: 'spell',
    icon: 'inv_misc_horn_01',
    rows: [['다운로드: ~430만+ (CurseForge)', '인기도: AI 음성 더빙 인기 애드온'], ['범위: 퀘스트·책·지역·보스', '명령어: /sp · /sp previous']],
    desc: '퀘스트 대사, NPC 가십, 도서관 책/편지, 지역 및 보스 전승을 한국어 음성으로 읽어주는 통합 내레이션 애드온입니다.',
    note: '🟡 얼라이언스 전용 플레이 시 SpokenQuestsAudioHorde_koKR 팩은 꺼둬도 무방'
  }
};
