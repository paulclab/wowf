/* WoW Forever Interactive Atlas — Macro Zones, Nodes, Micro Maps & Hunting Zones */
const MACRO_ZONES = [
  // KALIMDOR (Left)
  { id: 'z_teldrassil', name: '텔드랏실', continent: 'kalimdor', hubId: 'ruttheran', color: '#8e846a', lx: 205, ly: 86,
    d: 'M168,78 C178,56 226,54 244,74 C256,92 246,118 214,120 C182,122 160,102 168,78 Z' },
  { id: 'z_darkshore', name: '어둠의 해안', continent: 'kalimdor', hubId: 'auberdine', color: '#798b6c', lx: 238, ly: 164,
    d: 'M208,132 L252,130 L264,162 L258,194 L218,198 L206,166 Z' },
  { id: 'z_winterspring', name: '악령·여명의 설원', continent: 'kalimdor', nodeId: 'bk_darkshore', color: '#a59e83', lx: 302, ly: 174,
    d: 'M252,130 L292,134 L334,158 L338,205 L298,214 L258,194 L264,162 Z' },
  { id: 'z_ashenvale', name: '잿빛골짜기', continent: 'kalimdor', nodeId: 'astranaar', color: '#6b8749', lx: 262, ly: 228,
    d: 'M204,198 L258,194 L298,214 L322,226 L316,258 L244,256 L196,242 Z' },
  { id: 'z_azshara', name: '아즈샤라', continent: 'kalimdor', nodeId: 'astranaar', color: '#b58d46', lx: 330, ly: 234,
    d: 'M298,214 L338,205 L358,236 L342,262 L316,258 L322,226 Z' },
  { id: 'z_stonetalon', name: '돌발톱 산맥', continent: 'kalimdor', hubId: 'stonetalon', color: '#9c7847', lx: 192, ly: 274,
    d: 'M158,244 L196,242 L236,256 L228,312 L162,306 L148,274 Z' },
  { id: 'z_durotar', name: '듀로타', continent: 'kalimdor', nodeId: 'ratchet', color: '#b8763e', lx: 332, ly: 294,
    d: 'M316,258 L346,262 L356,308 L326,322 L312,286 Z' },
  { id: 'z_barrens', name: '불모의 땅', continent: 'kalimdor', hubId: 'ratchet', color: '#c49b4a', lx: 276, ly: 332,
    d: 'M236,256 L316,258 L312,286 L326,322 L318,376 L290,418 L242,412 L232,334 Z' },
  { id: 'z_desolace', name: '잊혀진 땅', continent: 'kalimdor', hubId: 'nijel', color: '#8f8964', lx: 186, ly: 362,
    d: 'M162,306 L228,312 L232,398 L174,408 L150,360 Z' },
  { id: 'z_dustwallow', name: '먼지진흙 습지대', continent: 'kalimdor', nodeId: 'theramore', color: '#6b7e62', lx: 326, ly: 392,
    d: 'M318,376 L354,370 L368,404 L334,430 L290,418 Z' },
  { id: 'z_feralas', name: '페랄라스', continent: 'kalimdor', nodeId: 'feathermoon', color: '#64854d', lx: 196, ly: 454,
    d: 'M158,408 L232,398 L246,472 L182,494 L152,448 Z' },
  { id: 'z_thousand', name: '버섯구름 봉우리', continent: 'kalimdor', nodeId: 'mirage', color: '#caa562', lx: 288, ly: 448,
    d: 'M232,412 L290,418 L334,430 L328,476 L246,472 Z' },
  { id: 'z_tanaris', name: '타나리스·운고로', continent: 'kalimdor', nodeId: 'gadgetzan', color: '#d4ab4e', lx: 294, ly: 522,
    d: 'M246,472 L328,476 L342,532 L302,572 L248,554 Z' },
  { id: 'z_silithus', name: '실리더스', continent: 'kalimdor', nodeId: 'gadgetzan', color: '#8a6c4f', lx: 214, ly: 524,
    d: 'M182,494 L246,472 L248,554 L204,562 L176,522 Z' },

  // EASTERN KINGDOMS (Right - Upper Lordaeron + Lower Khaz Modan / Azeroth)
  { id: 'z_tirisfal', name: '티리스팔 숲', continent: 'ek', nodeId: 'sm', color: '#797d60', lx: 690, ly: 102,
    d: 'M654,84 L718,74 L732,124 L670,130 L648,108 Z' },
  { id: 'z_plaguelands', name: '동·서 역병지대', continent: 'ek', nodeId: 'lightshope', color: '#aa7039', lx: 774, ly: 104,
    d: 'M718,74 L782,66 L822,94 L816,136 L732,134 L732,124 Z' },
  { id: 'z_silverpine', name: '은빛소나무 숲', continent: 'ek', nodeId: 'southshore', color: '#6b7568', lx: 672, ly: 152,
    d: 'M648,128 L698,128 L700,182 L652,188 L642,158 Z' },
  { id: 'z_hillsbrad', name: '힐스브래드', continent: 'ek', hubId: 'southshore', color: '#7b9445', lx: 718, ly: 174,
    d: 'M698,128 L748,134 L750,206 L690,210 L700,182 Z' },
  { id: 'z_hinterlands', name: '동부 내륙지', continent: 'ek', nodeId: 'aeriepeak', color: '#6b8c47', lx: 786, ly: 156,
    d: 'M748,134 L816,136 L826,174 L750,178 Z' },
  { id: 'z_arathi', name: '아라시 고원', continent: 'ek', hubId: 'refuge', color: '#a89143', lx: 782, ly: 196,
    d: 'M750,178 L826,174 L818,220 L748,220 L750,206 Z' },
  { id: 'z_wetlands', name: '저습지', continent: 'ek', hubId: 'menethil', color: '#7b8a5a', lx: 718, ly: 256,
    d: 'M666,232 L768,228 L774,278 L662,278 L656,254 Z' },
  { id: 'z_dunmorogh', name: '던 모로', continent: 'ek', hubId: 'if', color: '#cfc4a4', lx: 702, ly: 306,
    d: 'M652,278 L746,278 L742,334 L666,336 L646,308 Z' },
  { id: 'z_lochmodan', name: '모단 호수', continent: 'ek', hubId: 'thelsamar', color: '#8f9b4c', lx: 782, ly: 306,
    d: 'M746,278 L814,274 L824,330 L742,334 Z' },
  { id: 'z_badlands', name: '이글·불타·황야', continent: 'ek', nodeId: 'ulda', color: '#b46c37', lx: 778, ly: 364,
    d: 'M728,334 L824,330 L832,390 L734,394 L718,364 Z' },
  { id: 'z_elwynn', name: '엘윈 숲', continent: 'ek', hubId: 'sw', color: '#7c9a45', lx: 702, ly: 392,
    d: 'M664,366 L734,368 L738,418 L668,416 L654,392 Z' },
  { id: 'z_westfall', name: '서부몰락지대', continent: 'ek', hubId: 'westfall', color: '#b59449', lx: 672, ly: 438,
    d: 'M654,416 L706,418 L702,472 L660,468 L646,438 Z' },
  { id: 'z_redridge', name: '붉은마루 산맥', continent: 'ek', hubId: 'lakeshire', color: '#ab7942', lx: 772, ly: 416,
    d: 'M734,394 L816,390 L812,438 L738,434 Z' },
  { id: 'z_duskwood', name: '그늘숲', continent: 'ek', hubId: 'darkshire', color: '#5f6f4c', lx: 734, ly: 454,
    d: 'M706,418 L738,434 L770,436 L768,484 L702,480 Z' },
  { id: 'z_swampblasted', name: '슬픔의 늪·저주', continent: 'ek', nodeId: 'nethergarde', color: '#8f6942', lx: 798, ly: 472,
    d: 'M770,436 L822,438 L830,498 L768,504 L768,484 Z' },
  { id: 'z_stv', name: '가시덤불 골짜기', continent: 'ek', hubId: 'bootybay', color: '#598241', lx: 726, ly: 528,
    d: 'M702,480 L768,484 L764,548 L734,580 L702,568 L688,520 Z' }
];

const MAP_NODES = [
  // === UNLOCKED EASTERN KINGDOMS FLIGHT HUBS (10) ===
  { id: 'sw', layer: 'flight', isCity: true, x: 676, y: 386, name: '스톰윈드', eng: 'Stormwind City',
    callout: { dx: -26, dy: -16, shelf: -62 },
    region: '동부왕국 > 엘윈 숲 북서부 (70.8, 72.6)', badge: '비행 해금 ✅ · 얼라이언스 수도',
    summary: '인간 종족의 수도이자 얼라이언스 최대 대도시. 경매장, 은행, 마법사 성소, 지하철, 스톰윈드 지하감옥이 모여 있는 본진입니다.',
    route: '귀환석/스톰윈드 순간이동(Lv.24) 또는 그리폰 직통. 드워프 지구 깊은굴 지하철로 아이언포지 직통 연결.',
    memo: '마법사 성소(가리온 웬델 도서관 책 반납 / 제니아 캐논), 코델 마법부여점(43.0, 64.4), 운하 낚시 교관 위치.' },
  { id: 'westfall', layer: 'flight', x: 668, y: 432, name: '감시의 언덕', eng: 'Sentinel Hill',
    callout: { dx: -28, dy: 4, shelf: -70 },
    region: '동부왕국 > 서부몰락지대 중앙 (56.5, 52.6)', badge: '비행 해금 ✅ · Lv.10~20 거점',
    summary: '데피아즈단과 맞서는 얼라이언스 민병대 요새. 초반 레벨업 이후에는 죽음의 폐광이나 도서관 책 회수 경유지로 들릅니다.',
    route: '스톰윈드에서 남서쪽 엘윈 숲을 건너 진입 또는 그리폰 직통.',
    memo: '주변 감시의 언덕/문브룩에 도서관 책 [놈리건의 루미], [마법과 환술] 위치.' },
  { id: 'darkshire', layer: 'flight', x: 742, y: 454, name: '다크샤이어', eng: 'Darkshire',
    callout: { dx: 28, dy: 12, shelf: 68 },
    region: '동부왕국 > 그늘숲 동부 (77.5, 44.3)', badge: '비행 해금 ✅ · Lv.20~30 사냥 거점',
    summary: '어두운 숲속에 자리한 야경대 마을. 구울·늑대인간·거미·늑대 퀘스트가 밀집해 26~31레벨 구간에서 가장 오래 머무는 거점입니다.',
    route: '스톰윈드/레이크샤이어/감시의 언덕에서 그리폰 직통.',
    memo: '의원 밀스타이프(72.0, 47.8)에게 지하감옥 퀘스트 [범죄와 벌] 수락 가능. 인간형 몹에서 양모·비단 옷감 대량 파밍.' },
  { id: 'lakeshire', layer: 'flight', x: 774, y: 416, name: '레이크샤이어', eng: 'Lakeshire',
    callout: { dx: 28, dy: -4, shelf: 72 },
    region: '동부왕국 > 붉은마루 산맥 서부 (30.6, 59.4)', badge: '비행 해금 ✅ · Lv.15~26 거점',
    summary: '영원의 호수 북안에 자리한 교역 마을. 검은바위 오크·놀 사냥 퀘스트 중심지이며 다크샤이어·엘윈 숲과 삼각 연결됩니다.',
    route: '엘윈 숲 동쪽 관문을 지나 진입 또는 그리폰 직통.',
    memo: '여관 앞 경비병 버턴(26.6, 46.8)에게 지하감옥 퀘스트 [사필귀정] 수락 가능.' },
  { id: 'bootybay', layer: 'flight', x: 726, y: 564, name: '무법항', eng: 'Booty Bay',
    callout: { dx: -26, dy: 12, shelf: -58 },
    region: '동부왕국 > 가시덤불 골짜기 최남단 (27.5, 77.8)', badge: '비행 해금 ✅ · 중립 항구',
    summary: '검은바다 무법단이 운영하는 중립 무역 항구. 경매장·은행이 있고 칼림도어 불모의 땅(톱니항)으로 건너가는 배가 다닙니다.',
    route: '그늘숲 남쪽 가시덤불 골짜기를 종단하거나 그리폰 직통.',
    memo: '낚시용품 상인 노인 헤밍(27.4, 77.0)이 낚시 125 돌파 책 [고급 낚시정보: 농어와 당신](1g) 판매.' },
  { id: 'if', layer: 'flight', isCity: true, x: 702, y: 298, name: '아이언포지', eng: 'Ironforge',
    callout: { dx: -24, dy: 14, shelf: -68 },
    region: '동부왕국 > 던 모로 북부 산악 (56.2, 48.0)', badge: '비행 해금 ✅ · 드워프 수도',
    summary: '거대한 화산 내부에 지어진 드워프·노움 수도. 놈리건·울다만·검은심연의 나락 등 중레벨 던전 퀘스트가 몰려 있습니다.',
    route: '스톰윈드 깊은굴 지하철 또는 아이언포지 순간이동(Lv.24)/그리폰.',
    memo: '쓸쓸한 뒷골목 게릭 본그립(50.5, 5.5): BFD [심연의 지식] 수락 / 땜장이 마을: 놈리건 [대배반] / 탐험가의 전당 책 1권.' },
  { id: 'thelsamar', layer: 'flight', x: 774, y: 312, name: '텔사마', eng: 'Thelsamar',
    callout: { dx: 28, dy: 4, shelf: 56 },
    region: '동부왕국 > 모단 호수 서부 (33.9, 51.0)', badge: '비행 해금 ✅ · Lv.10~22 거점',
    summary: '모단 호수 서쪽 언덕에 있는 드워프 산악 마을. 북동쪽 오우거 소굴과 남쪽 황야의 땅으로 내려가는 길목 역할을 합니다.',
    route: '던 모로 동쪽 터널 통과 또는 아이언포지 그리폰.',
    memo: '북동쪽 모그로쉬 소굴 동굴 내부에 도서관 책 [마법사 왕들의 룬](77.5, 14.1) 위치.' },
  { id: 'menethil', layer: 'flight', x: 672, y: 256, name: '메네실 항구', eng: 'Menethil Harbor',
    callout: { dx: -26, dy: -14, shelf: -70 },
    region: '동부왕국 > 저습지 서쪽 해안 (9.5, 59.7)', badge: '비행 해금 ✅ · 대륙간 선박 허브',
    summary: '동부왕국에서 칼림도어로 건너가는 핵심 항구 거점이자 Lv.23~30 저습지 사냥의 중심지. 북쪽/남쪽 부두에서 서로 다른 배가 출발합니다.',
    route: '아이언포지/텔사마/사우스쇼어에서 그리폰 직통.',
    memo: '북쪽 부두 배 = 아우버다인(BFD/다르나서스) / 남쪽 부두 배 = 테라모어(Lv.30 법사 퀘스트). 주변 랩터·악어는 무두질 성지.' },
  { id: 'southshore', layer: 'flight', x: 716, y: 192, name: '사우스쇼어', eng: 'Southshore',
    callout: { dx: -26, dy: -4, shelf: -68 },
    region: '동부왕국 > 힐스브래드 구릉지 남부 (49.3, 52.3)', badge: '비행 해금 ✅ · Lv.25~36 거점',
    summary: '얼라이언스 북부 해안 거점. 해안가 거북이·사자 사냥 및 북쪽 티리스팔 숲 붉은십자군 수도원(SM) 원정 출발지입니다.',
    route: '메네실 항구 또는 아라시 고원 임시 주둔지에서 그리폰 직통.',
    memo: '해변 거북이·사자로 요리 재료 + 무두질 200 달성 최적. 수도원 [빛의 이름으로] 연퀘 추모자 롤리 위치.' },
  { id: 'refuge', layer: 'flight', x: 780, y: 196, name: '임시 주둔지', eng: 'Refuge Pointe',
    callout: { dx: 28, dy: -2, shelf: 70 },
    region: '동부왕국 > 아라시 고원 중앙 (45.8, 46.1)', badge: '비행 해금 ✅ · Lv.30~40 거점',
    summary: '아라시 고원 한가운데 자리한 얼라이언스 요새 캠프. 사우스쇼어·저습지·동부 내륙지를 잇는 중북부 허브입니다.',
    route: '저습지 북쪽 탄돌 교각 건너 진입 또는 그리폰 직통.',
    memo: '서남쪽 스트롬가드 요새(27.0, 58.8) 데네브 워커가 응급치료 125 서적 [고급 응급치료서] 판매.' },

  // === UNLOCKED KALIMDOR FLIGHT HUBS (5) ===
  { id: 'ruttheran', layer: 'flight', x: 214, y: 112, name: '루테란 마을', eng: "Rut'theran Village",
    callout: { dx: -24, dy: 14, shelf: -70 },
    region: '칼림도어 최북단 > 텔드랏실 남쪽 해안 (58.4, 94.0)', badge: '비행 해금 ✅ · 히포그리프·선박 관문',
    summary: '세계수 텔드랏실 발치의 해안 마을. 다르나서스로 들어가는 보라빛 포탈과 얼라이언스 히포그리프 비행조련사가 이곳에 있습니다.',
    route: '아우버다인 서쪽 부두 배 탑승 또는 해금된 히포그리프로 직통.',
    memo: '다르나서스에는 비행조련사가 없으므로 포탈로 내려와 베스프리스터스(58.4, 94.0)에게서 비행합니다.' },
  { id: 'auberdine', layer: 'flight', x: 222, y: 162, name: '아우버다인', eng: 'Auberdine',
    callout: { dx: 26, dy: -14, shelf: 68 },
    region: '칼림도어 북서부 > 어둠의 해안 서쪽 해안 (36.4, 45.6)', badge: '비행 해금 ✅ · 칼림도어 북부 선박 허브',
    summary: '동부왕국(메네실 항구), 다르나서스(루테란), 잿빛골짜기를 모두 이어주는 칼림도어 북부 얼라이언스 교통의 심장입니다.',
    route: '동부왕국 메네실 항구 북쪽 부두 배 탑승 또는 히포그리프 직통.',
    memo: '게르샬라 나이트위스퍼(38.3, 43.0)에게 BFD [타락에 대한 연구] 수락 및 마티스트라 남작 마리노스 진행.' },
  { id: 'stonetalon', layer: 'flight', x: 184, y: 264, name: '돌발톱 산맥', eng: 'Stonetalon Peak',
    callout: { dx: -26, dy: 4, shelf: -76 },
    region: '칼림도어 중북부 > 돌발톱 산맥 북서부 봉우리 (36.5, 7.2)', badge: '비행 해금 ✅ · 전초기지 (Lv.20~27)',
    summary: '잿빛골짜기 남서쪽 협곡 너머에 있는 얼라이언스 산악 전초기지. 아우버다인과 남부 나이젤 야영지를 잇는 중요 거점입니다.',
    route: '아스트라나르 남서쪽 갈퀴발톱 굴 터널 통과 또는 히포그리프 직통.',
    memo: '텔로렌(36.5, 7.2) 비행조련사 해금 완료. 잊혀진 땅 남하 시 경유지.' },
  { id: 'nijel', layer: 'flight', x: 186, y: 344, name: '나이젤 야영지', eng: "Nijel's Point",
    callout: { dx: -26, dy: 10, shelf: -82 },
    region: '칼림도어 서부 > 잊혀진 땅 북부 (64.7, 10.5)', badge: '비행 해금 ✅ · 얼라 요새 (Lv.30~38)',
    summary: '잊혀진 땅 북쪽 절벽 위에 세워진 얼라이언스 요새. 30대 중반 필드 퀘스트와 마라우돈 던전 퀘스트의 거점입니다.',
    route: '돌발톱 산맥에서 남하 또는 해금된 히포그리프로 직통.',
    memo: '바리타나스 스카이리버(64.7, 10.5) 해금 완료. 여관주인(66.3, 6.6) 및 33~38레벨 사냥 기지.' },
  { id: 'ratchet', layer: 'flight', x: 316, y: 348, name: '톱니항', eng: 'Ratchet',
    callout: { dx: 26, dy: -16, shelf: 56 },
    region: '칼림도어 중부 > 불모의 땅 동부 해안 (63.1, 37.2)', badge: '비행 해금 ✅ · 중립 항구 & 책 3권',
    summary: '동부왕국 무법항과 정기선으로 연결된 고블린 중립 항구. 은행·비행조련사가 있고 통곡의 동굴과 도서관 책 3권 거점입니다.',
    route: '무법항에서 배를 타거나 해금된 비행 경로(브라고크 63.1, 37.2)로 직통 이동.',
    memo: '비행조련사 뒤 건물 도서관 책 [백스탄: 파괴 마법에 대하여](62.7, 36.3) 및 진흙늪 타워(56.3, 8.8) 책 연계!' },

  // === ADDITIONAL EASTERN KINGDOMS HUBS (NOT UNLOCKED YET) ===
  { id: 'goldshire', layer: 'ekhub', x: 696, y: 400, name: '골드샤이어', eng: 'Goldshire',
    callout: { dx: 22, dy: 24, shelf: 66 },
    region: '동부왕국 > 엘윈 숲 중앙 (43.0, 65.8)', badge: '주요 마을 · Lv.5~12',
    summary: '스톰윈드 정문 바로 남쪽에 위치한 인간 초반 핵심 마을. 사자자랑 여관과 기초 전문기술 교관들이 모여 있습니다.',
    route: '스톰윈드 정문에서 남쪽 큰길을 따라 도보 1분.',
    memo: '초반 퀘스트 및 연금/대장 등 기초 거점 (고레벨에는 스톰윈드/아조라 경유지).' },
  { id: 'nesingwary', layer: 'ekhub', x: 730, y: 498, name: '네싱워리 원정대', eng: "Nesingwary's Expedition",
    callout: { dx: -26, dy: 14, shelf: -94 },
    region: '동부왕국 > 가시덤불 골짜기 북부 (35.7, 10.8)', badge: '주요 야영지 · 무두질 성지',
    summary: '가시덤불 북부 밀림의 중립 사냥꾼 캠프. 호랑이·표범·랩터 연쇄 사냥 퀘스트가 몰려 있는 Lv.32~38 최고 효율 사냥터입니다.',
    route: '그늘숲 다크샤이어에서 남쪽 다리를 건너 가시덤불 골짜기로 내려오자마자 위치.',
    memo: '무두질 숙련 185→225+를 가장 빠르게 찍을 수 있는 필수 방문지!' },
  { id: 'aeriepeak', layer: 'ekhub', x: 778, y: 154, name: '아에리 봉우리', eng: 'Aerie Peak',
    callout: { dx: 26, dy: -16, shelf: 76 },
    region: '동부왕국 > 동부 내륙지 북서부 (11.1, 46.1)', badge: '미해금 거점 (얼라 그리폰)',
    summary: '와일드해머 드워프들의 거대한 그리폰 요새. 40레벨 중반 이후 동부 내륙지 정예 퀘스트와 진타알로 공략의 거점입니다.',
    route: '힐스브래드 구릉지 북동쪽 산길로 진입하거나 그리폰 연결.',
    memo: '42~50레벨 구간 사냥터 및 중후반 그리폰 연결 거점.' },
  { id: 'chillwind', layer: 'ekhub', x: 744, y: 120, name: '서리바람 야영지', eng: 'Chillwind Camp',
    callout: { dx: -24, dy: -22, shelf: -92 },
    region: '동부왕국 > 서부 역병지대 남부 (42.9, 85.1)', badge: '미해금 거점 (Lv.50+)',
    summary: '알터랙 산맥 북쪽 경계에 위치한 은빛여명회/얼라이언스 전진 캠프. 역병지대 퀘스트와 스칼로맨스 던전의 거점입니다.',
    route: '아라시/힐스브래드 북쪽 또는 동부 내륙지를 거쳐 북상.',
    memo: '50레벨 이후 은빛여명회 평판 및 스칼로맨스 열쇠 연퀘 시작.' },
  { id: 'lightshope', layer: 'ekhub', isNeutral: true, x: 804, y: 106, name: '희망의 빛 예배당', eng: "Light's Hope Chapel",
    callout: { dx: 26, dy: -8, shelf: 96 },
    region: '동부왕국 > 동부 역병지대 동부 (81.6, 59.3)', badge: '만렙 거점 (Lv.55~60)',
    summary: '역병지대 최전방의 중립 성지. 스트라솔름과 낙스라마스 등 최상위 엔드 콘텐츠를 앞둔 모험가들의 집결지입니다.',
    route: '서부 역병지대에서 동쪽으로 횡단.',
    memo: '55~60레벨 은빛여명회 반납 및 최상위 5인 던전(스트라솔름) 전진기지.' },
  { id: 'nethergarde', layer: 'ekhub', x: 798, y: 492, name: '네더가드 요새', eng: 'Nethergarde Keep',
    callout: { dx: 24, dy: 14, shelf: 78 },
    region: '동부왕국 > 저주받은 땅 북동부 (65.5, 24.4)', badge: '미해금 거점 (Lv.48+)',
    summary: '어둠의 문을 감시하는 스톰윈드의 최남동단 성채. 고레벨 버프 스탯 퀘스트와 저주받은 땅 사냥의 출발점입니다.',
    route: '그늘숲 동쪽 → 죽음의 고개 → 슬픔의 늪을 통과해 남하.',
    memo: '48~55레벨 사냥 및 월드 드랍/스탯 퀘스트 수행 거점.' },

  // === ADDITIONAL KALIMDOR HUBS (NOT UNLOCKED YET) ===
  { id: 'darnassus', layer: 'kalimdor', isCity: true, x: 196, y: 82, name: '다르나서스', eng: 'Darnassus',
    callout: { dx: -24, dy: -16, shelf: -68 },
    region: '칼림도어 최북단 > 텔드랏실 섬 서쪽', badge: '나이트 엘프 수도 · 비행조련사 없음',
    summary: '거대한 세계수 텔드랏실 꼭대기에 세워진 나이트 엘프의 대도시. 마법부여·은행·경매장·장인의 정원이 있으나 도시 내부에는 비행 조련사가 없습니다.',
    route: '메네실(북쪽 부두 배) → 아우버다인 → 루테란 마을 → 마을 내 보라빛 포탈 탑승 시 즉시 도착.',
    memo: '장인의 정원(55.4, 23.8)에서 BFD [황혼망치단의 몰락], [타엘리드 찾기] 수락 및 [검은심연의 음모] 완료.' },
  { id: 'astranaar', layer: 'kalimdor', x: 256, y: 232, name: '아스트라나르', eng: 'Astranaar',
    callout: { dx: 30, dy: -10, shelf: 68 },
    region: '칼림도어 북부 > 잿빛골짜기 중앙 (34.4, 48.0)', badge: '미해금 거점 · 잿빛골짜기',
    summary: '잿빛골짜기 한복판 호수 위에 세워진 나이트 엘프 마을. 검은심연의 나락 및 필드 사냥의 기준점입니다.',
    route: '아우버다인에서 남쪽 도로로 내려오면 도착(첫 방문 시 비행 경로 해금 권장).',
    memo: '여기서 북서쪽 도로로 달리면 조람 해안 [검은심연의 나락], 남동쪽으로 가면 [실바람 산장](요리 125) 도착.' },
  { id: 'theramore', layer: 'kalimdor', x: 348, y: 392, name: '테라모어 섬', eng: 'Theramore Isle',
    callout: { dx: 26, dy: -4, shelf: 72 },
    region: '칼림도어 동부 > 먼지진흙 습지대 (67.5, 51.3)', badge: '미해금 항구 도시 (Lv.30+)',
    summary: '제이나 프라우드무어가 통치하는 먼지진흙 습지대의 얼라이언스 해안 성채. 남부 칼림도어 진출의 시작점입니다.',
    route: '메네실 항구 남쪽 부두 배 탑승 시 바로 도착.',
    memo: '30레벨 마법사 직업 퀘스트 [습지대로의 여정](타베사 46.0, 57.0)과 소금 평원 이동을 위한 필수 선박 거점.' },
  { id: 'mirage', layer: 'kalimdor', isNeutral: true, x: 288, y: 454, name: '신기루 경주장', eng: 'Mirage Raceway',
    callout: { dx: 26, dy: 14, shelf: 76 },
    region: '칼림도어 중남부 > 버섯구름 봉우리 동부 (소금 평원)', badge: '사냥 거점 (Lv.30~36)',
    summary: '고블린과 노움이 경주장을 지어놓은 하얀 소금 사막 지대. 퀘스트가 한곳에 몰려 있고 거북이·전갈·바실리스크가 끝없이 나옵니다.',
    route: '테라모어에서 서쪽 불모의 땅 남단을 거쳐 거대한 승강기로 남하.',
    memo: 'Lv.30~35 폭업 + 무두질 200 돌파 최고 사냥터.' },
  { id: 'feathermoon', layer: 'kalimdor', x: 170, y: 454, name: '페더문 요새', eng: 'Feathermoon Stronghold',
    callout: { dx: -24, dy: 10, shelf: -76 },
    region: '칼림도어 남서부 > 페랄라스 서부 섬 (30.2, 43.2)', badge: '미해금 요새 (Lv.40~48)',
    summary: '페랄라스 앞바다 섬에 위치한 파수대 요새. 혈투의 전장(DM)과 40대 후반 레벨업의 중심 거점입니다.',
    route: '페랄라스 본토 서쪽 해안에서 배를 타고 건너거나 그리폰 이동.',
    memo: '페랄라스(50.6, 15.7)에 비전 관련 도서관 책 [리미널과 비전] 위치.' },
  { id: 'gadgetzan', layer: 'kalimdor', isNeutral: true, x: 306, y: 516, name: '가젯잔', eng: 'Gadgetzan',
    callout: { dx: 26, dy: 16, shelf: 56 },
    region: '칼림도어 남동부 > 타나리스 북부 (51.0, 29.3)', badge: '중립 사막 도시 (Lv.40~50)',
    summary: '스팀휘들 무역회사 고블린이 세운 사막 요새 도시. 경매장·은행이 있으며 줄파락(ZF) 던전 및 응급치료 대가 인근 거점입니다.',
    route: '버섯구름 봉우리 소금 평원에서 남쪽 통로로 바로 내려옴.',
    memo: 'Lv.42~50 줄파락 광역/파티 사냥 및 운고로 분화구 진출 거점.' },

  // === DUNGEONS ===
  { id: 'stockade', layer: 'dungeon', x: 672, y: 374, name: '스톰윈드 지하감옥', eng: 'The Stockade',
    callout: { dx: -18, dy: -32, shelf: -1 },
    region: '동부왕국 > 스톰윈드 운하변 (41.2, 58.0)', badge: '던전 (Lv.24~32) · 현재 진행',
    summary: '폭동이 일어난 스톰윈드 도심 교도소 5인 던전. 이동 시간이 0초이고 퀘스트 6종 + 옷감 파밍 + 포에버 캐스터 지팡이까지 알찬 곳입니다.',
    route: '[외부 입구 → 내부 포탈] 스톰윈드 마법사 지구/상업 지구 경계 운하변(41.2, 58.0) 정문 진입 → 계단·복도 직진 끝에 바로 인던 포탈.',
    memo: '캄 딥퓨리 드랍 Kam\'s Walking Stick(주문력 +32, 지능 +3). 퀘스트: 델워터(2)·니코바·밀스타이프·버턴·가마슨(던 모드르 49.6, 18.0).' },
  { id: 'deadmines', layer: 'dungeon', x: 660, y: 452, name: '죽음의 폐광', eng: 'The Deadmines',
    callout: { dx: -18, dy: 24, shelf: -1 },
    region: '동부왕국 > 서부몰락지대 문브룩 | 건물 입구 (42.5, 71.7)', badge: '던전 (Lv.17~24)',
    summary: '데피아즈단 에드윈 밴클리프가 점거한 지하 광산 던전. 현재 착용 중인 주무기 [벌목기 칼날]의 드랍처입니다.',
    route: '[외부 입구 → 내부 포탈] 문브룩 폐허 마을 안쪽 붉은 창고/헛간 건물 지하 계단 진입 → 광산 비인던 터널(데피아즈단 몹 구간)을 길게 통과한 뒤 안쪽 인던 포탈 입장.',
    memo: '문브룩 마을 내부 건물에 도서관 책 [마법과 환술] 위치.' },
  { id: 'bfd', layer: 'dungeon', x: 204, y: 204, name: '검은심연의 나락 (BFD)', eng: 'Blackfathom Deeps',
    callout: { dx: -18, dy: -16, shelf: -1 },
    region: '칼림도어 북부 > 잿빛골짜기 조람 해안 | 신전 입구 (14.2, 14.1) → 포탈 (13.4, 12.8)', badge: '던전 (Lv.24~32)',
    summary: '물에 잠긴 고대 엘룬 신전 폐허 깊숙한 수중 동굴 안에 포탈이 숨어 있는 5인 인던입니다.',
    route: '[외부 입구 → 내부 포탈] 조람 해안 (14.2, 14.1) 바다 위 폐허 신전 진입 → 계단 내려가 물속 수중 터널 잠수 통과 → 나가/사티로스 비인던 동굴 안쪽 끝에서 인던 포탈(13.4, 12.8) 입장.',
    memo: '⚠️ 지상/바다 위 (13.4, 12.8)로 바로 가면 절벽 위라 포탈이 안 보입니다! 반드시 (14.2, 14.1) 신전 계단으로 잠수 진입하세요. 보상: 묘비 홀, Sustaining Ring.' },
  { id: 'dalaran', layer: 'dungeon', x: 702, y: 146, name: '달라란 도시', eng: 'City of Dalaran',
    callout: { dx: -20, dy: -16, shelf: -1 },
    region: '동부왕국 북부 > 은빛소나무 숲·알터랙 경계 로다미어 호숫가 (/way 68.6 45.2 · 알터랙 /way 8.5 59.2)', badge: '던전 (Lv.28~35) · 열쇠 필수',
    summary: '와우 포에버 전용 5인 던전. 비전·지옥·마나 소모 패턴이 많고 마법 차단/해제가 핵심이며 캐스터 전용 드랍과 37,600 XP 퀘스트 보상이 풍부합니다.',
    route: '[열쇠 → 서쪽 하수구 진입] 사우스쇼어(/way 48.3 60.1)에서 [다급한 요청] 수락 → 로다미어 호숫가 서쪽 하수구 앞 대마법사 모데라의 환영(/way 68.6 45.2) 보고 시 [달라란 하수도 열쇠] 획득 → 철창 개방 진입!',
    memo: '핵심 득템: 덧없는 손장갑(비전+9/지7/체7), 보랏빛 마술사의 로브(지15/주문+9), 역병잎 밧줄(지10/주문+7), 보랏빛 장식띠(퀘). 비밀보스 외면받는 린(달라란의 고서) 소환 가능.' },
  { id: 'gnomer', layer: 'dungeon', x: 676, y: 292, name: '놈리건', eng: 'Gnomeregan',
    callout: { dx: -18, dy: -12, shelf: -1 },
    region: '동부왕국 > 던 모로 서부 | 지상 승강기 (24.4, 39.6)', badge: '던전 (Lv.28~35)',
    summary: '방사능에 오염된 노움의 옛 수도. 지상에서는 구조물/승강기만 보이며 지하 터널을 내려가야 인던 포탈이 나옵니다.',
    route: '[외부 입구 → 내부 포탈] 던 모로 서쪽 신 땜장이 마을 (24.4, 39.6) 지상 입구 진입 → 승강기/파이프로 지하 하강 → 트로그·노움 비인던 방사능 통로 통과 후 인던 포탈 입장.',
    memo: '득템: [Gigaflux Reactivator](머리 천, 지능+8/주문+8), [Hydrocane](지팡이 주문+36), [Acidic Walkers](발 천), [Civinad Robes](가슴 천).' },
  { id: 'sm', layer: 'dungeon', x: 724, y: 92, name: '붉은십자군 수도원 (SM)', eng: 'Scarlet Monastery',
    callout: { dx: 18, dy: -24, shelf: 1 },
    region: '동부왕국 북부 > 티리스팔 숲 북동부 (84.8, 32.9)', badge: '던전 (Lv.30~42)',
    summary: '성채 내부에서 묘지·도서관·무기고·예배당 4개 구역의 별도 포탈로 갈라지는 캐스터의 성지입니다.',
    route: '[외부 입구 → 4개 포탈] 사우스쇼어 북상 → 티리스팔 북동쪽 수도원 성벽 대문 진입 → 계단 위 안뜰 회랑에서 왼쪽(묘지·도서관) / 오른쪽(무기고·예배당) 포탈 선택 입장.',
    memo: '도서관/예배당: 환영의 지팡이, 화이트메인의 모자, [티탄의 신화]/[빛의 이름으로] 퀘스트.' },
  { id: 'ulda', layer: 'dungeon', x: 786, y: 344, name: '울다만', eng: 'Uldaman',
    callout: { dx: 18, dy: -6, shelf: 1 },
    region: '동부왕국 > 황야의 땅 | 정문 (42.6, 12.2) · 후문 (65.3, 42.6)', badge: '던전 (Lv.35~45) · 마부 교관',
    summary: '티탄 유적이 묻혀 있는 고대 던전. 정문 외에 마부 대가 안노라와 가까운 비밀 후문 동굴이 따로 있습니다.',
    route: '[외부 입구 → 내부 포탈] 정문: 황야의 땅 북부 발굴 요새(42.6, 12.2) 지하 동굴 통과 후 포탈. / 후문: 동쪽 산길 바위 틈(65.3, 42.6) 숨겨진 동굴 진입(대가 마부 안노라 근접).',
    memo: '던전 내부 안노라: 대가 마법부여(225~300, 숙련 200·Lv.35) 승급.' },

  // === LIBRARY BOOKS ===
  { id: 'bk_azora', layer: 'book', x: 716, y: 398, name: '아조라의 탑 (책+키타)', eng: 'Tower of Azora',
    callout: { dx: 28, dy: -22, shelf: 98 },
    region: '동부왕국 > 엘윈 숲 동부 (64.8, 70.4)', badge: '도서관 책 + 마부 125',
    summary: '대마법사 테오크리투스의 연구탑. 125~225 전문 마법부여 교관과 도서관 책이 같은 건물에 있어 일석이조입니다.',
    route: '스톰윈드 정문에서 동쪽 도로를 따라 엘윈 숲 동쪽 끝까지 이동.',
    memo: '책 [테오크리투스의 연구 일지] 회수 + 마부 125 달성 시 키타 파이어윈드 승급(50s).' },
  { id: 'bk_wet', layer: 'book', x: 734, y: 256, name: '웰가르 발굴현장 (책)', eng: "Whelgar's Excavation Site",
    callout: { dx: 28, dy: -12, shelf: 96 },
    region: '동부왕국 > 저습지 중앙 남부 (38.8, 74.0)', badge: '도서관 책 위치',
    summary: '드워프 탐험가 연맹이 고대 유물을 발굴하다가 랩터와 흙정령에게 점령당한 발굴지.',
    route: '메네실 항구에서 동쪽 큰길을 따라 이동 후 남쪽 발굴현장 진입.',
    memo: '책 [고아즈 두루마리] 위치. 26레벨 저습지 랩터 무두질과 함께 바로 회수 추천!' },
  { id: 'bk_darkshore', layer: 'book', x: 256, y: 146, name: '마티스트라 (책+마리노스)', eng: 'Ruins of Mathystra',
    callout: { dx: 28, dy: -32, shelf: 112 },
    region: '칼림도어 북서부 > 어둠의 해안 북동부 (59.6, 22.2)', badge: '도서관 책 + 남작 마리노스',
    summary: '어둠의 해안 북쪽 고대 나이트 엘프 폐허. 도서관 책 [나르탈라스 연감 74권]과 와우 포에버 신규 정예 [남작 마리노스]가 있습니다.',
    route: '아우버다인에서 북동쪽 도로를 따라 해안/폐허로 이동.',
    memo: '남작 마리노스(Lv.21 정예, 59.2, 22.6) → [혼탁한 물의 구슬] → 남부 오누(43.5, 76.3) 반납([마시스트라 정신 집중 보주] 추천).' },
  { id: 'bk_loch', layer: 'book', x: 804, y: 292, name: '모그로쉬 소굴 (책)', eng: "Mo'grosh Stronghold",
    callout: { dx: 24, dy: -22, shelf: 92 },
    region: '동부왕국 > 모단 호수 북동부 (77.5, 14.1)', badge: '도서관 책',
    summary: '모단 호수 북동쪽 산악 오우거 요새. 도서관 책이 숨겨져 있습니다.',
    route: '텔사마에서 호수 북안을 따라 북동쪽 오우거 소굴로 이동.',
    memo: '책 [마법사 왕들의 룬] 회수 (동굴 입구 진입 후 좌측 오우거 2마리 갈림길 안쪽).' },

  // === 125+ PROFESSION TRAINERS & CLASS NPC ===
  { id: 'npc_sandrina', layer: 'npc', x: 278, y: 248, name: '산드리나 (요리 125)', eng: 'Shandrina',
    callout: { dx: 28, dy: 14, shelf: 92 },
    region: '칼림도어 > 잿빛골짜기 실바람 산장 (49.5, 67.1)', badge: '전문 요리책 (1g)',
    summary: '잿빛골짜기 남동부 나이트 엘프 산장 안에 있는 전문 요리 서적 판매 상인.',
    route: '아스트라나르에서 남동쪽 큰길을 따라 실바람 산장 도착.',
    memo: '요리 125 달성 후 [고급 요리책](150~225) 구매. 와우 포에버에서 포만감은 처치 경험치 +5%를 줍니다.' },
  { id: 'npc_deneb', layer: 'npc', x: 754, y: 204, name: '데네브 워커 (응급 125)', eng: 'Deneb Walker',
    callout: { dx: 28, dy: 20, shelf: 102 },
    region: '동부왕국 > 아라시 고원 스트롬가드 요새 (27.0, 58.8)', badge: '고급 응급치료서 (1g)',
    summary: '무너진 스트롬가드 성채 내부 비밀 상점에 숨어 있는 얼라이언스 응급치료 교본 상인.',
    route: '임시 주둔지에서 서남쪽 스트롬가드 요새 정문 진입 후 우측 비밀 골목 건물.',
    memo: '응급치료 125 달성 후 [고급 응급치료서] 및 두꺼운 비단/마법 붕대 교본 구매.' },
  { id: 'npc_tabetha', layer: 'npc', x: 318, y: 396, name: '타베사 (Lv.30 법사)', eng: 'Tabetha',
    callout: { dx: 24, dy: 26, shelf: 94 },
    region: '칼림도어 > 먼지진흙 습지대 오두막 (46.0, 57.0)', badge: 'Lv.30 마법사 직업 퀘스트',
    summary: '먼지진흙 습지대 한복판 탑/오두막에 은둔 중인 대마법사. 30레벨 마법사 전용 퀘스트의 핵심 NPC입니다.',
    route: '테라모어 섬에서 서쪽 늪지대 도로를 따라 이동.',
    memo: '30레벨 [습지대로의 여정] → [마력의 원천] 완료 시 파템 마법봉/보주 획득.' }
];

const LAYER_COLORS = {
  flight: '#37d655',
  ekhub: '#4ea8ff',
  kalimdor: '#56b4ff',
  dungeon: '#b589ff',
  book: '#f0b449',
  npc: '#39d0d8'
};

const MICRO_COLORS = { transit: '#37d655', npc: '#39d0d8', quest: '#f0b449', poi: '#b589ff' };
const MICRO_MAPS = {
  // --- EASTERN KINGDOMS (10) ---
  sw: {
    continent: 'ek',
    name: '스톰윈드',
    zone: '동부왕국 > 스톰윈드 대도시 (0~100 좌표계)',
    fill: '#b59d6b',
    shape: 'M150,70 L450,55 L780,100 L850,310 L760,540 L480,565 L240,510 L140,290 Z',
    terrain: [
      { d: 'M155,140 L370,120 L390,340 L210,360 Z', fill: '#8ba19f', stroke: '#4c361c', opacity: 0.7 }, // 항구 수면
      { d: 'M360,290 L680,290 L690,375 L540,425 L350,425 Z', fill: '#577b85', stroke: '#4c361c', opacity: 0.72 }, // 대운하
      { d: 'M540,145 L750,150 L770,290 L550,290 Z', fill: '#a98a56', stroke: '#5d4020', opacity: 0.65 }, // 드워프 지구
      { d: 'M320,380 L510,380 L510,545 L330,520 Z', fill: '#9782b0', stroke: '#4f3a66', opacity: 0.48 }, // 마법사 지구
      { d: 'M685,295 L815,295 L805,450 L685,445 Z', fill: '#9c8353', stroke: '#5d4020', opacity: 0.65 } // 구시가지
    ],
    exits: [
      { x: 560, y: 585, label: '↓ 엘윈 숲 / 감시의 언덕', targetHub: 'westfall' },
      { x: 875, y: 315, label: '→ 지하철: 아이언포지', targetHub: 'if' }
    ],
    labels: [
      { x: 25, y: 24, text: '스톰윈드 항구' },
      { x: 65, y: 26, text: '드워프 지구' },
      { x: 51, y: 40, text: '대성당 광장' },
      { x: 60, y: 61, text: '상업 지구' },
      { x: 75, y: 59, text: '구시가지' },
      { x: 42, y: 72, text: '마법사 지구' }
    ],
    items: [
      { id: 'sw_fm', layer: 'transit', cx: 71.6, cy: 72.3, name: '덩거 롱드링크 (비행)', eng: 'Dungar Longdrink', badge: '비행조련사 (그리폰)', role: '스톰윈드 상업지구 남동쪽 비행장 그리폰 조련사.', detail: '해금된 동부왕국 10개 거점으로 즉시 비행 가능.', reward: '엘윈 숲/저습지/아라시 등 전역 연결.', callout: { dx: 18, dy: 28, shelf: 86 } },
      { id: 'sw_harbor', layer: 'transit', cx: 30.0, cy: 15.0, name: '스톰윈드 항구', eng: 'Stormwind Harbor', badge: '항구 (선착장)', role: '도시 북서쪽 대형 항구 (와우 포에버 신규 연결).', detail: '칼림도어 어둠의 해안 아우버다인 방면 직통 선박이 정박하는 대형 부두.', reward: '저습지 경유 없이 칼림도어 북부 직통 이동 가능.', callout: { dx: -24, dy: -18, shelf: -78 } },
      { id: 'sw_tram', layer: 'transit', cx: 63.0, cy: 31.0, name: '깊은굴 지하철', eng: 'Deeprun Tram', badge: '지하철 (아이언포지)', role: '드워프 지구 내 무료 지하철 입구.', detail: '스톰윈드 ↔ 아이언포지 땜장이 마을을 무정차 직통 연결.', reward: '그리폰 비용 없이 아이언포지 왕복.', callout: { dx: 24, dy: -16, shelf: 78 } },
      { id: 'sw_ah', layer: 'npc', cx: 62.5, cy: 71.5, name: '경매장 / 상업지구', eng: 'Auction House', badge: '주요 시설', role: '상업지구 중심 경매장·은행 구역.', detail: 'Auctionator 애드온으로 마법부여 재료 및 녹템 시세 검색.', reward: '이상한 가루/영혼 가루 최저가 매입.', callout: { dx: -20, dy: 34, shelf: -90 } },
      { id: 'sw_ench', layer: 'npc', cx: 43.0, cy: 64.4, name: '코델 마법부여점', eng: 'Lucan & Jessara Cordell', badge: '마법부여 교관 · 상인', role: '루칸 코델(75~150 승급) / 제사라 코델(오일·도안 판매).', detail: '마법부여 71→75 마무리 후 최하급 마술사 오일/마나 오일 도안 구매.', reward: '현재 마부 71이므로 75까지 4포인트 후 승급 확인.', callout: { dx: -28, dy: -22, shelf: -86 } },
      { id: 'sw_lib', layer: 'npc', cx: 38.0, cy: 81.0, name: '가리온 웬델 (사서)', eng: 'Garion Wendell', badge: '도서관 사서 · 연구', role: '마법사 성소 탑 상층 도서관 책 반납 담당.', detail: '도서관 책 반납 및 마법사 전용 [연구(Study)] 퀘스트 부여.', reward: '1권(연구), 10권(목걸이), 20권(반지).', callout: { dx: -28, dy: 28, shelf: -96 } },
      { id: 'sw_mage', layer: 'quest', cx: 38.6, cy: 79.4, name: '제니아 캐논 (Lv.26~30)', eng: 'Jennea Cannon', badge: '마법사 직업 퀘스트', role: '마법사 성소 상급 마법사.', detail: '짝수 레벨 스킬 습득 및 Lv.26~30 직업 연퀘([습지대로의 여정] 연계) 부여.', reward: 'Lv.28 마나 마노 / Lv.30 파템 마법봉 연퀘.', callout: { dx: 24, dy: 36, shelf: 98 } },
      { id: 'sw_skin', layer: 'npc', cx: 72.2, cy: 62.0, name: '마리스 그레인저 (무두)', eng: 'Maris Granger', badge: '무두질 교관', role: '구시가지 가죽세공점 내부 무두질 교관.', detail: '현재 무두질 152 → 숙련 200 달성 시 대가(300) 승급.', reward: '질긴 가죽/중간 가죽 판매 전 확인.', callout: { dx: 26, dy: 12, shelf: 98 } },
      { id: 'sw_fa', layer: 'npc', cx: 52.9, cy: 44.8, name: '쇼이나 풀러 (응급)', eng: 'Shaina Fuller', badge: '응급치료 교관', role: '대성당 광장 응급치료 교관.', detail: '현재 응급치료 91 → 115 두꺼운 양모 / 150 비단 붕대 습득.', reward: '사냥 중 자가 회복 필수.', callout: { dx: -26, dy: -16, shelf: -94 } },
      { id: 'sw_fish', layer: 'npc', cx: 55.0, cy: 69.6, name: '리랜드 부부 (낚시)', eng: 'Arnold & Catherine Leland', badge: '낚시 교관 · 상인', role: '상업지구 운하변 낚시 교관 및 용품 상인.', detail: '현재 낚시 5 → 운하에서 50까지 올린 뒤 즉시 숙련(150) 승급.', reward: '낚시 125 돌파는 무법항 노인 헤밍.', callout: { dx: -24, dy: -20, shelf: -92 } },
      { id: 'sw_cook', layer: 'npc', cx: 77.2, cy: 53.2, name: '스티븐 라이백 (요리)', eng: 'Stephen Ryback', badge: '요리 교관', role: '구시가지 돼지와 휘파람 선술집 요리 교관.', detail: '현재 요리 76 → 125까지 레시피 습득.', reward: '와우 포에버 포만감: 처치 경험치 +5%.', callout: { dx: 24, dy: -14, shelf: 98 } },
      { id: 'sw_stock', layer: 'poi', cx: 41.2, cy: 58.0, name: '스톰윈드 지하감옥', eng: 'The Stockade', badge: '던전 · 퀘스트 6종 (Lv.22+)', role: '운하변 교도소 정문 (41.2, 58.0) 앞 교도소장 델워터.', detail: '[폭동 진압], [지하감옥 폭동](편지 선행) 수락. 캄 딥퓨리 드랍 Kam\'s Walking Stick(주문력 +32).', reward: '양모/비단 옷감 대량 + 경험치 6종.', callout: { dx: -20, dy: -34, shelf: -1 } },
      { id: 'sw_color', layer: 'quest', cx: 73.4, cy: 46.6, name: '니코바 라스콜 (피의 색깔)', eng: 'Nikova Raskol', badge: '지하감옥 [피의 색깔]', role: '구시가지 중앙 광장 순찰 (69.9, 39.1 ~ 73.4, 46.6).', detail: '스톰윈드 지하감옥 내 데피아즈단 드랍 [붉은 양모 복면] 10개 수집.', reward: '2,650 XP + 실버 + 스톰윈드 평판.', callout: { dx: 20, dy: -12, shelf: 1 } },
      { id: 'sw_dmq', layer: 'quest', cx: 70.2, cy: 40.8, name: '와일더 시슬네틀 (Lv.14+)', eng: 'Wilder Thistlenettle', badge: '폐광 퀘스트 (Lv.14~15)', role: '드워프 지구 죽음의 폐광 연계 퀘스트 NPC.', detail: '[기억의 조각] 등 Lv.14+ 던전 퀘스트.', reward: 'Lv.12 이상 필터 통과.', callout: { dx: 26, dy: -10, shelf: 108 } }
    ]
  },
  if: {
    continent: 'ek',
    name: '아이언포지',
    zone: '동부왕국 > 아이언포지 화산 도시 (0~100)',
    fill: '#c4b08b',
    shape: 'M180,120 C350,40 650,40 820,120 C910,280 910,450 800,560 C550,600 450,600 200,560 C90,450 90,280 180,120 Z',
    terrain: [
      { d: 'M430,220 C510,190 590,210 610,280 C600,350 510,375 435,345 C405,305 405,250 430,220 Z', fill: '#c85a32', stroke: '#4a1d0d', opacity: 0.72 }, // 용광로 마그마
      { d: 'M210,125 C340,75 455,80 465,175 L345,250 L205,220 Z', fill: '#a9936a', stroke: '#5d4323', opacity: 0.55 }, // 대광장
      { d: 'M640,215 L810,220 L835,375 L645,365 Z', fill: '#949d90', stroke: '#474f44', opacity: 0.55 } // 땜장이 마을
    ],
    exits: [
      { x: 145, y: 495, label: '↙ 던 모로 · 스톰윈드 지하철', targetHub: 'sw' },
      { x: 875, y: 310, label: '→ 동부 모단 호수(텔사마)', targetHub: 'thelsamar' }
    ],
    labels: [
      { x: 29, y: 25, text: '대광장 (은행/경매장)' },
      { x: 51, y: 44, text: '거대한 용광로' },
      { x: 76, y: 18, text: '탐험가의 전당' },
      { x: 52, y: 15, text: '쓸쓸한 뒷골목' },
      { x: 72, y: 44, text: '땜장이 마을' }
    ],
    items: [
      { id: 'if_fm', layer: 'transit', cx: 56.2, cy: 48.0, name: '그리스 서든 (비행)', eng: 'Gryth Thurden', badge: '비행조련사 (그리폰)', role: '거대한 용광로 남쪽 중앙 플랫폼.', detail: '메네실 항구·텔사마·스톰윈드·사우스쇼어 등 직통 비행.', reward: 'BFD 출발 시 메네실로 바로 비행!', callout: { dx: -24, dy: 28, shelf: -96 } },
      { id: 'if_tram', layer: 'transit', cx: 76.4, cy: 51.1, name: '깊은굴 지하철', eng: 'Deeprun Tram', badge: '지하철 (스톰윈드)', role: '땜장이 마을 동쪽 끝 지하철 승강장.', detail: '스톰윈드 드워프 지구와 무료 직통 연결.', reward: '스톰윈드 빠른 왕복.', callout: { dx: 24, dy: 20, shelf: 82 } },
      { id: 'if_bank', layer: 'npc', cx: 25.8, cy: 11.6, name: '아이언포지 은행', eng: 'Vault of Ironforge', badge: '주요 시설', role: '대광장 북서쪽 은행 금고.', detail: '창고/우편함 이용.', reward: '경매장과 대각선 인접.', callout: { dx: -24, dy: 16, shelf: -82 } },
      { id: 'if_ah', layer: 'npc', cx: 34.0, cy: 26.8, name: '아이언포지 경매장', eng: 'Auction House', badge: '주요 시설', role: '대광장 중앙 경매장.', detail: '가죽/마부 재료 시세 조회 및 판매.', reward: '스톰윈드와 경매장 연동.', callout: { dx: -24, dy: 22, shelf: -90 } },
      { id: 'if_bfd', layer: 'quest', cx: 50.5, cy: 5.5, name: '게릭 본그립 (BFD Lv.18+)', eng: 'Gerrig Bonegrip', badge: 'BFD 퀘스트 [심연의 지식]', role: '쓸쓸한 뒷골목 NPC.', detail: '검은심연의 나락 1네임드 가무라 북쪽 수중 상자 [로르갈리스 초본] 루팅.', reward: 'Sustaining Ring 등 반지 보상.', callout: { dx: -24, dy: 24, shelf: -108 } },
      { id: 'if_gnom', layer: 'quest', cx: 69.0, cy: 49.5, name: '겔빈 멕카토크 (놈리건)', eng: 'Gelbin Mekkatorque', badge: '놈리건 핵심 [대배반]', role: '땜장이 마을 노움 수장.', detail: '놈리건 최종 보스 처치 퀘스트 [대배반] 부여.', reward: '천 보상 [Civinad Robes] + 보스 드랍 머리 [Gigaflux Reactivator] · 지팡이 [Hydrocane] · [Acidic Walkers].', callout: { dx: 22, dy: 34, shelf: 102 } },
      { id: 'if_sm', layer: 'quest', cx: 74.6, cy: 11.7, name: '메이 페일더스트 (수도원)', eng: 'Librarian Mae Paledust', badge: '수도원 [티탄의 신화] · 책', role: '탐험가의 전당 사서.', detail: '붉은십자군 수도원 도서관 퀘스트 [티탄의 신화] 수락.', reward: '탐험가의 전당 내부에 도서관 책 [안토니다스 자서전]도 위치!', callout: { dx: 24, dy: 18, shelf: 102 } }
    ]
  },
  menethil: {
    continent: 'ek',
    name: '메네실 항구',
    zone: '동부왕국 > 저습지 (0~100 지역 좌표)',
    fill: '#899866',
    shape: 'M110,90 L880,65 L920,555 L130,540 L105,345 L60,360 L60,395 L110,410 Z',
    terrain: [
      { d: 'M120,210 Q380,250 560,290 T860,330', fill: 'none', stroke: '#5d7c86', strokeWidth: 16, opacity: 0.68 }, // 습지 수로
      { d: 'M240,120 Q430,170 590,260 T840,420', fill: 'none', stroke: '#b99d65', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 } // 저습지 큰길
    ],
    exits: [
      { x: 520, y: 45, label: '↑ 아라시 고원 (임시 주둔지)', targetHub: 'refuge' },
      { x: 520, y: 585, label: '↓ 아이언포지 / 모단 호수', targetHub: 'thelsamar' },
      { x: 185, y: 120, label: '↖ 배: 아우버다인 (칼림도어)', targetHub: 'auberdine' }
    ],
    labels: [
      { x: 16, y: 52, text: '메네실 항구' },
      { x: 42, y: 46, text: '저습지 늪지대' },
      { x: 55, y: 20, text: '던 모드르 방면' },
      { x: 40, y: 69, text: '웰가르 발굴현장' }
    ],
    items: [
      { id: 'mn_fm', layer: 'transit', cx: 9.5, cy: 59.7, name: '셸레이 브론디어 (비행)', eng: 'Shellei Brondir', badge: '비행조련사 (그리폰)', role: '메네실 여관 앞 북쪽 출구.', detail: '아이언포지·사우스쇼어·임시 주둔지·텔사마 등 직통.', reward: '칼림도어 출항 전 기착지.', callout: { dx: 34, dy: -26, shelf: 108 } },
      { id: 'mn_dock_n', layer: 'transit', cx: 5.5, cy: 56.0, name: '북쪽 부두 (아우버다인 배)', eng: 'North Pier (to Auberdine)', badge: '항구 · 칼림도어 북부', role: '메네실 항구 북쪽 부두.', detail: '어둠의 해안 아우버다인으로 가는 정기선 탑승.', reward: 'BFD / 다르나서스 가는 필수 배!', callout: { dx: 26, dy: -56, shelf: 118 } },
      { id: 'mn_dock_s', layer: 'transit', cx: 5.0, cy: 63.5, name: '남쪽 부두 (테라모어 배)', eng: 'South Pier (to Theramore)', badge: '항구 · 칼림도어 동부', role: '메네실 항구 남쪽 부두.', detail: '먼지진흙 습지대 테라모어 섬으로 가는 정기선 탑승.', reward: 'Lv.30 마법사 직업 퀘스트(타베사) 루트.', callout: { dx: 26, dy: 42, shelf: 112 } },
      { id: 'mn_claws', layer: 'quest', cx: 10.6, cy: 60.5, name: '스투트피스트 대위 (Lv.22+)', eng: 'Captain Stoutfist', badge: '저습지 필드 퀘스트', role: '메네실 성채(여관 옆 요새) 내부.', detail: '[심연의 발톱] 및 저습지 멀록/오크 연계 퀘스트.', reward: 'Lv.22~28 사냥 경험치.', callout: { dx: 42, dy: 14, shelf: 118 } },
      { id: 'mn_garmason', layer: 'quest', cx: 49.6, cy: 18.0, name: '모틀리 가마슨 (지하감옥 격노)', eng: 'Motley Garmason', badge: '지하감옥 [격노] · 던 모드르', role: '저습지 북부 던 모드르 (49.6, 18.0).', detail: '선행 퀘스트 [검은무쇠단 전쟁] 완료 후 지하감옥 [격노](캄 딥퓨리 처치) 수락.', reward: '2,750 XP + 보상 아이템.', callout: { dx: 20, dy: -18, shelf: 1 } },
      { id: 'mn_green', layer: 'quest', cx: 56.4, cy: 40.2, name: '녹색수호자 (Lv.21+)', eng: 'Rethiel the Greenwarden', badge: '저습지 필드 퀘스트', role: '저습지 중앙 도로 동쪽 숲.', detail: '[녹색수호자] 연퀘 진행 (습지 정령/늪지 몬스터).', reward: '랩터/악어 무두질 병행.', callout: { dx: 24, dy: -16, shelf: 98 } },
      { id: 'mn_croc', layer: 'quest', cx: 14.0, cy: 36.0, name: '해안 악어/멀록 (Lv.21~26)', eng: 'Young Crocolisks / Bluegill', badge: '사냥 · 무두질 성지', role: '항구 북쪽 해안가.', detail: '26레벨 기준 무두질(152→185) 및 질긴 가죽 파밍 최적.', reward: '요리 재료(악어 고기) 동시 수급.', callout: { dx: 28, dy: -16, shelf: 118 } },
      { id: 'mn_book', layer: 'poi', cx: 38.8, cy: 74.0, name: '웰가르 발굴현장 (책)', eng: "Whelgar's Excavation Site", badge: '도서관 책 [고아즈 두루마리]', role: '메네실 항구 남동쪽 드워프 발굴지.', detail: '도서관 책 [고아즈 두루마리] 회수 가능.', reward: '저습지 사냥 중 반드시 들러 회수!', callout: { dx: 26, dy: 14, shelf: 104 } }
    ]
  },
  darkshire: {
    continent: 'ek',
    name: '다크샤이어',
    zone: '동부왕국 > 그늘숲 (0~100 지역 좌표)',
    fill: '#657554',
    shape: 'M80,100 L910,90 L900,540 L90,540 Z',
    terrain: [
      { d: 'M140,280 Q440,260 760,295', fill: 'none', stroke: '#9f8759', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.7 },
      { d: 'M710,110 Q725,310 735,525', fill: 'none', stroke: '#9f8759', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.7 }
    ],
    exits: [
      { x: 460, y: 65, label: '↑ 엘윈 숲 / 스톰윈드', targetHub: 'sw' },
      { x: 100, y: 310, label: '← 서부몰락 (감시의 언덕)', targetHub: 'westfall' },
      { x: 740, y: 575, label: '↓ 가시덤불 골짜기 (무법항)', targetHub: 'bootybay' }
    ],
    labels: [
      { x: 75, y: 39, text: '다크샤이어' },
      { x: 20, y: 40, text: '까마귀 언덕' },
      { x: 48, y: 44, text: '황혼의 숲' },
      { x: 80, y: 28, text: '은둔자 오두막' }
    ],
    items: [
      { id: 'dk_fm', layer: 'transit', cx: 77.5, cy: 44.4, name: '펠리시아 말린 (비행)', eng: 'Felicia Maline', badge: '비행조련사 (그리폰)', role: '다크샤이어 동남쪽 언덕 위.', detail: '스톰윈드·레이크샤이어·감시의 언덕·무법항 직통.', reward: 'Lv.26~31 사냥 복귀 거점.', callout: { dx: 22, dy: -28, shelf: 98 } },
      { id: 'dk_watch', layer: 'quest', cx: 72.0, cy: 47.8, name: '의원 밀스타이프 / 감시단', eng: 'Councilman Millstipe', badge: '지하감옥 [범죄와 벌]', role: '다크샤이어 마을회관 남서쪽 (72.0, 47.8).', detail: '지하감옥 [범죄와 벌](덱스트렌 워드 처치) & [어둠의 감시단] 연퀘.', reward: '2,100 XP + 대사의 장화(가죽 → 마부 추출) + 옷감 파밍.', callout: { dx: 22, dy: 22, shelf: 1 } },
      { id: 'dk_eva', layer: 'quest', cx: 71.8, cy: 46.5, name: '마담 에바 (Lv.22~28)', eng: 'Madame Eva', badge: '그늘숲 연퀘 [토마스의 보고서]', role: '다크샤이어 서쪽 점술집.', detail: '은둔자 애버크롬비/모르벤트 펠 연계 퀘스트.', reward: '누더기골/까마귀 언덕 퀘스트와 묶어 진행.', callout: { dx: -26, dy: 30, shelf: -102 } },
      { id: 'dk_jitters', layer: 'quest', cx: 81.0, cy: 33.5, name: '은둔자 지터스 (Lv.24+)', eng: 'Jitters', badge: '연퀘 [은둔자/누더기골]', role: '마을 북동쪽 강가 오두막.', detail: '까마귀 언덕 언데드/모르벤트 펠 연퀘 연계.', reward: '26레벨 적정 경험치.', callout: { dx: -24, dy: -22, shelf: -108 } },
      { id: 'dk_mary', layer: 'quest', cx: 18.0, cy: 54.0, name: '장님 메리 (Lv.25+)', eng: 'Blind Mary', badge: '연퀘 [황혼의 해석]', role: '그늘숲 서쪽 여명의 숲 경계 오두막.', detail: '모르벤트 펠/까마귀 언덕 연퀘 마무리 단계.', reward: '고급 보상 장비/경험치.', callout: { dx: 24, dy: 16, shelf: 98 } }
    ]
  },
  lakeshire: {
    continent: 'ek',
    name: '레이크샤이어',
    zone: '동부왕국 > 붉은마루 산맥 (0~100 지역 좌표)',
    fill: '#b5844e',
    shape: 'M80,100 L910,90 L900,540 L90,540 Z',
    terrain: [
      { d: 'M180,330 C320,280 560,295 660,365 C620,450 380,455 210,415 Z', fill: '#577a84', stroke: '#3c535b', opacity: 0.78 }, // 영원의 호수
      { d: 'M110,270 L320,280 L650,235', fill: 'none', stroke: '#cdb17b', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 }
    ],
    exits: [
      { x: 100, y: 270, label: '← 엘윈 숲 / 스톰윈드', targetHub: 'sw' },
      { x: 350, y: 575, label: '↓ 그늘숲 (다크샤이어)', targetHub: 'darkshire' }
    ],
    labels: [
      { x: 29, y: 38, text: '레이크샤이어' },
      { x: 46, y: 56, text: '영원의 호수' },
      { x: 66, y: 34, text: '돌망치 요새' }
    ],
    items: [
      { id: 'lk_fm', layer: 'transit', cx: 30.6, cy: 59.4, name: '아리에나 스톰페더 (비행)', eng: 'Ariena Stormfeather', badge: '비행조련사 (그리폰)', role: '레이크샤이어 다리 건너 동남쪽.', detail: '스톰윈드·다크샤이어·감시의 언덕 직통.', reward: '이동 거점.', callout: { dx: 24, dy: 24, shelf: 108 } },
      { id: 'lk_inn', layer: 'npc', cx: 26.5, cy: 43.5, name: '레이크샤이어 여관', eng: 'Lakeshire Inn', badge: '여관 · 보급', role: '마을 서쪽 여관.', detail: '물/음식 구매 및 휴식 경험치.', reward: '요리 76+ 재료 일부 취급.', callout: { dx: -26, dy: -18, shelf: -94 } },
      { id: 'lk_sol', layer: 'quest', cx: 26.6, cy: 46.8, name: '경비병 버턴 / 솔로몬', eng: 'Guard Berton / Solomon', badge: '지하감옥 [사필귀정]', role: '레이크샤이어 여관 앞 우체통 옆 (26.6, 46.8) / 마을회관.', detail: '경비병 버턴: 지하감옥 [사필귀정](타고르 디드레드 처치) 수락 / 솔로몬: [검은바위 오크].', reward: '2,000 XP + 보상(추출/판매).', callout: { dx: 22, dy: -20, shelf: 1 } },
      { id: 'lk_esc', layer: 'quest', cx: 25.0, cy: 75.0, name: '켈러 경비병 호위 (Lv.20+)', eng: 'Missing in Action', badge: '호위 퀘스트 (Lv.20+)', role: '레이크샤이어 남쪽 강 건너 오크 진영.', detail: '동굴 안 포로 탈출 호위 퀘스트.', reward: '26레벨 기준 단독 클리어 가능.', callout: { dx: 24, dy: 12, shelf: 112 } }
    ]
  },
  westfall: {
    continent: 'ek',
    name: '감시의 언덕',
    zone: '동부왕국 > 서부몰락지대 (0~100, Lv.11 이하 제외)',
    fill: '#bc9b54',
    shape: 'M140,60 L820,80 L840,560 L200,560 Z',
    terrain: [
      { d: 'M550,90 Q540,280 430,455', fill: 'none', stroke: '#cbb079', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 }
    ],
    exits: [
      { x: 640, y: 65, label: '↗ 엘윈 숲 (스톰윈드)', targetHub: 'sw' },
      { x: 860, y: 310, label: '→ 그늘숲 (다크샤이어)', targetHub: 'darkshire' }
    ],
    labels: [
      { x: 52, y: 42, text: '감시의 언덕' },
      { x: 42, y: 67, text: '문브룩 (폐광)' }
    ],
    items: [
      { id: 'wf_fm', layer: 'transit', cx: 56.6, cy: 52.7, name: '토르 (비행)', eng: 'Thor', badge: '비행조련사 (그리폰)', role: '감시의 언덕 요새 앞 그리폰 조련사.', detail: '스톰윈드·다크샤이어·레이크샤이어·무법항 연결.', reward: '문브룩 도서관 책 회수 시 경유.', callout: { dx: 26, dy: 24, shelf: 78 } },
      { id: 'wf_gryan', layer: 'quest', cx: 56.2, cy: 47.6, name: '그라이언 스타우트맨틀 (Lv.14+)', eng: 'Gryan Stoutmantle', badge: '연퀘 [데피아즈단 형제단]', role: '감시의 탑 앞 민병대 사령관.', detail: '[데피아즈단 형제단] 최종 밴클리프 처치 퀘스트 (Lv.11 이하 농장 퀘 제외).', reward: '폐광 클리어 완료 시 확인.', callout: { dx: -26, dy: -22, shelf: -118 } },
      { id: 'wf_riell', layer: 'quest', cx: 56.6, cy: 47.4, name: '정찰병 리엘 (Lv.14+)', eng: 'Scout Riell', badge: '퀘스트 [붉은 비단 복면]', role: '감시의 탑 꼭대기.', detail: '데피아즈단 붉은 비단 복면 10개 수집 (Lv.14+).', reward: '문브룩 주변 사냥.', callout: { dx: 28, dy: -22, shelf: 102 } },
      { id: 'wf_dm', layer: 'poi', cx: 42.6, cy: 71.8, name: '죽음의 폐광 & 문브룩 책', eng: 'Deadmines / Library Book', badge: '던전 · 도서관 책', role: '서부몰락지대 남서쪽 폐허 마을 문브룩.', detail: '[외부 입구 → 포탈] 문브룩 마을 오른쪽 헛간/창고 건물 지하 계단 → 비인던 광산 터널을 길게 통과한 뒤 안쪽 인던 포탈 진입. 건물 내부 도서관 책 [마법과 환술] 확인.', reward: '도서관 책 20권 목표 채우기.', callout: { dx: -24, dy: 20, shelf: -1 } }
    ]
  },
  thelsamar: {
    continent: 'ek',
    name: '텔사마',
    zone: '동부왕국 > 모단 호수 (0~100, Lv.11 이하 제외)',
    fill: '#95a055',
    shape: 'M120,70 L880,70 L860,560 L140,560 Z',
    terrain: [
      { d: 'M430,155 C555,140 660,210 675,330 C665,450 560,485 450,460 C410,360 400,245 430,155 Z', fill: '#577b86', stroke: '#3c535b', opacity: 0.78 } // 모단 호수 수면
    ],
    exits: [
      { x: 110, y: 310, label: '← 던 모로 (아이언포지)', targetHub: 'if' },
      { x: 450, y: 45, label: '↑ 북부 저습지 (메네실)', targetHub: 'menethil' }
    ],
    labels: [
      { x: 24, y: 50, text: '텔사마' },
      { x: 55, y: 48, text: '모단 호수' },
      { x: 77, y: 19, text: '모그로쉬 소굴' }
    ],
    items: [
      { id: 'th_fm', layer: 'transit', cx: 33.9, cy: 50.8, name: '토르그룸 보로날 (비행)', eng: 'Thorgrum Boronal', badge: '비행조련사 (그리폰)', role: '텔사마 남서쪽 비행장.', detail: '아이언포지·메네실 항구 직통.', reward: '모그로쉬 책/울다만 이동 시 사용.', callout: { dx: -26, dy: -46, shelf: -102 } },
      { id: 'th_inn', layer: 'npc', cx: 34.2, cy: 50.8, name: '텔사마 여관 & 책 후보', eng: 'Thelsamar Inn', badge: '여관 · 도서관 책', role: '텔사마 중앙 여관.', detail: '모단 호수 텔사마에도 [놈리건의 루미] 도서관 책 스폰 위치 존재.', reward: '방문 시 책 확인.', callout: { dx: 26, dy: -46, shelf: 98 } },
      { id: 'th_lands', layer: 'quest', cx: 33.8, cy: 51.0, name: '그래블가우트 (Lv.12+)', eng: 'Mountaineer Gravelgout', badge: '퀘스트 [왕의 영토 수호]', role: '텔사마 입구 경비병 (Lv.11 이하 제외).', detail: '모단 호수 남부 바위골렘·퓨마 처치 (Lv.12+).', reward: '저레벨 퀘 제외 후 12+만 표시.', callout: { dx: -30, dy: -16, shelf: -106 } },
      { id: 'th_croc', layer: 'quest', cx: 33.7, cy: 50.9, name: '가프 플로알트 (Lv.15+)', eng: 'Ghaff Floalt', badge: '퀘스트 [악어 사냥]', role: '텔사마 호숫가 방향 NPC.', detail: '모단 호수 두꺼운 악어 가죽 5개 (Lv.15+).', reward: '가벼운 무두질 가능.', callout: { dx: -28, dy: 20, shelf: -104 } },
      { id: 'th_tirth', layer: 'quest', cx: 33.9, cy: 51.1, name: '조사관 티르스 (Lv.18+)', eng: 'Investigator Tirth', badge: '연퀘 [어둠의 위협]', role: '텔사마 여관 앞.', detail: '검은무쇠단 음모 추적 (Lv.18+, 바질 스레드/지하감옥 선행 연계).', reward: '지하감옥 6종 퀘스트 연계용!', callout: { dx: 26, dy: 28, shelf: 102 } },
      { id: 'th_book', layer: 'poi', cx: 77.5, cy: 14.1, name: '모그로쉬 소굴 (책 1권)', eng: "Mo'grosh Stronghold", badge: '도서관 책 · 그룹 Lv.20', role: '모단 호수 북동쪽 오우거 소굴.', detail: '동굴 내부 좌측 갈림길 안쪽에서 도서관 책 [마법사 왕들의 룬] 회수 가능! (※ 나르탈라스 연감 74권은 어둠의 해안 마티스트라 폐허 59.6, 22.2 위치)', reward: '26레벨 혼자서도 정리 후 회수 가능.', callout: { dx: -22, dy: 20, shelf: -98 } }
    ]
  },
  southshore: {
    continent: 'ek',
    name: '사우스쇼어',
    zone: '동부왕국 > 힐스브래드 구릉지 (0~100 지역 좌표)',
    fill: '#899f4f',
    shape: 'M100,80 L900,80 L880,445 L580,420 L485,375 L415,435 L120,445 Z',
    terrain: [
      { d: 'M180,175 Q460,205 840,185', fill: 'none', stroke: '#cbb079', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 }
    ],
    exits: [
      { x: 880, y: 240, label: '→ 동부 아라시 고원 (임시 주둔지)', targetHub: 'refuge' },
      { x: 500, y: 545, label: '↓ 남부 저습지 (메네실 항구)', targetHub: 'menethil' }
    ],
    labels: [
      { x: 50, y: 49, text: '사우스쇼어' },
      { x: 60, y: 26, text: '타렌 밀농장 (호드)' },
      { x: 35, y: 66, text: '서남부 거북이 해안' }
    ],
    items: [
      { id: 'ss_fm', layer: 'transit', cx: 49.4, cy: 52.1, name: '다라 해리스 (비행)', eng: 'Darla Harris', badge: '비행조련사 (그리폰)', role: '사우스쇼어 북서쪽 입구.', detail: '메네실 항구·임시 주둔지·아이언포지 직통.', reward: '수도원/중반 사냥 거점.', callout: { dx: -24, dy: -22, shelf: -96 } },
      { id: 'ss_inn', layer: 'npc', cx: 50.0, cy: 57.0, name: '사우스쇼어 회관 & 여관', eng: 'Southshore Town Hall', badge: '여관 · 보급', role: '사우스쇼어 중앙 광장.', detail: '퀘스트 NPC 밀집 + 물/음식 보급.', reward: '귀환석 등록 후보지(Lv.29~35).', callout: { dx: -26, dy: 24, shelf: -108 } },
      { id: 'ss_sm', layer: 'quest', cx: 51.0, cy: 56.0, name: '추모자 롤리 (수도원)', eng: 'Raleigh the Devout', badge: '수도원 연퀘 [빛의 이름으로]', role: '사우스쇼어 여관/광장 인근.', detail: '붉은십자군 수도원 보스 4종 처치 연퀘 (먼지진흙 연계).', reward: '고성능 캐스터 무기/보조장비.', callout: { dx: 26, dy: -16, shelf: 98 } },
      { id: 'ss_synd', layer: 'quest', cx: 49.5, cy: 58.5, name: '비밀결사대 / 크러쉬리지', eng: 'Syndicate & Ogre Quests', badge: '힐스브래드 퀘스트 (Lv.28~34)', role: '사우스쇼어 마을 회관 내부.', detail: '[새로운 위협], [비밀결사대 계약서], 북쪽 오우거 소탕 퀘스트.', reward: 'Lv.29~33 최적 사냥 루트.', callout: { dx: 26, dy: 22, shelf: 108 } },
      { id: 'ss_coast', layer: 'poi', cx: 35.0, cy: 76.0, name: '남부 해안 거북이·사자', eng: 'Turtles & Lions (Lv.28~31)', badge: '요리 & 무두질 사냥터', role: '사우스쇼어 서남쪽 해안.', detail: '거북이 고기(요리) + 사자/거북 무두질(185→200+ 돌파).', reward: '전투 경험치 + 전문기술 병행.', callout: { dx: -24, dy: 14, shelf: -104 } }
    ]
  },
  refuge: {
    continent: 'ek',
    name: '임시 주둔지',
    zone: '동부왕국 > 아라시 고원 (0~100 지역 좌표)',
    fill: '#b09749',
    shape: 'M80,90 L920,90 L900,540 L100,540 Z',
    terrain: [
      { d: 'M120,250 Q460,275 860,295', fill: 'none', stroke: '#cbb079', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 },
      { d: 'M460,280 L450,530', fill: 'none', stroke: '#cbb079', strokeWidth: 8, strokeDasharray: '8,6', opacity: 0.72 }
    ],
    exits: [
      { x: 100, y: 245, label: '← 힐스브래드 (사우스쇼어)', targetHub: 'southshore' },
      { x: 450, y: 575, label: '↓ 탄돌 교각 → 저습지 (메네실)', targetHub: 'menethil' }
    ],
    labels: [
      { x: 46, y: 40, text: '임시 주둔지' },
      { x: 27, y: 54, text: '스트롬가드 요새' },
      { x: 74, y: 38, text: '해머폴 (호드)' }
    ],
    items: [
      { id: 'rp_fm', layer: 'transit', cx: 45.8, cy: 46.1, name: '세드릭 프로즈 (비행)', eng: 'Cedrik Prose', badge: '비행조련사 (그리폰)', role: '임시 주둔지 분지 중앙.', detail: '사우스쇼어·메네실 항구·아에리 봉우리 연결.', reward: '아라시 고원 사냥 거점.', callout: { dx: -24, dy: -22, shelf: -96 } },
      { id: 'rp_deneb', layer: 'npc', cx: 27.0, cy: 58.8, name: '데네브 워커 (응급 125)', eng: 'Deneb Walker', badge: '고급 응급치료서 (1g)', role: '서남쪽 스트롬가드 요새 내부 비밀 상점.', detail: '응급치료 125 달성 시 [고급 응급치료서]·비단/마법 붕대 교본 구매.', reward: '현재 응급치료 91 → 125 찍고 바로 방문!', callout: { dx: -22, dy: 22, shelf: -102 } },
      { id: 'rp_manor', layer: 'quest', cx: 46.0, cy: 47.0, name: '노스폴드 영지 / 트롤 (Lv.30+)', eng: 'Northfold Manor / Witherbark', badge: '아라시 퀘스트 (Lv.30~38)', role: '임시 주둔지 내부 퀘스트 NPC들.', detail: '북서쪽 노스폴드 영지(31, 28) 비밀결사대 & 남쪽 마른나무껍질 트롤(46, 75).', reward: '30레벨 이후 주력 필드 퀘스트.', callout: { dx: 26, dy: -16, shelf: 118 } },
      { id: 'rp_ogre', layer: 'quest', cx: 53.0, cy: 57.0, name: '돌주먹 오우거 (Lv.34+)', eng: "Boulderfist / Trelane's Chain", badge: '정예 연퀘 (Lv.34~38)', role: '아라시 고원 동남쪽 오우거 산악.', detail: '트렐레인 지팡이/마법봉 연퀘 진행 구역.', reward: '파티 또는 35+ 추천.', callout: { dx: 24, dy: 20, shelf: 108 } }
    ]
  },
  bootybay: {
    continent: 'ek',
    name: '무법항',
    zone: '동부왕국 > 가시덤불 골짜기 최남단 (0~100)',
    fill: '#608949',
    shape: 'M160,65 L860,70 L820,440 L480,535 L295,525 L235,445 L175,260 Z',
    terrain: [
      { d: 'M430,75 Q410,270 330,455', fill: 'none', stroke: '#cbb079', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 }
    ],
    exits: [
      { x: 430, y: 45, label: '↑ 북부 그늘숲 (다크샤이어)', targetHub: 'darkshire' },
      { x: 135, y: 455, label: '↙ 배: 불모의 땅 (톱니항)', targetHub: 'ratchet' }
    ],
    labels: [
      { x: 28, y: 71, text: '무법항 만' },
      { x: 37, y: 15, text: '네싱워리 원정대 (북부)' },
      { x: 38, y: 31, text: '반란군 야영지 (북부)' }
    ],
    items: [
      { id: 'bb_fm', layer: 'transit', cx: 27.6, cy: 77.2, name: '길 (중립 비행)', eng: 'Gyll', badge: '비행조련사 (중립)', role: '무법항 선착장 위층 그리폰 조련사.', detail: '다크샤이어·스톰윈드·감시의 언덕·레이크샤이어 직통.', reward: '가시덤불 골짜기 하부 거점.', callout: { dx: 26, dy: -22, shelf: 82 } },
      { id: 'bb_ship', layer: 'transit', cx: 25.8, cy: 73.0, name: '무법항 부두 (톱니항 배)', eng: 'Booty Bay Dock (to Ratchet)', badge: '항구 · 불모의 땅', role: '무법항 서쪽 선착장.', detail: '칼림도어 불모의 땅 [톱니항]으로 직통 배 탑승.', reward: '톱니항·진흙늪 도서관 책 3권 회수 루트!', callout: { dx: -24, dy: -36, shelf: -116 } },
      { id: 'bb_heming', layer: 'npc', cx: 27.4, cy: 77.0, name: '노인 헤밍 (낚시 125)', eng: 'Old Man Heming', badge: '고급 낚시정보 (1g)', role: '무법항 해안가 낚시용품 상인.', detail: '낚시 125(Lv.20+) 달성 시 [고급 낚시정보: 농어와 당신](150~225) 판매.', reward: '현재 낚시 5 → 스톰윈드에서 125 만든 후 구매.', callout: { dx: 28, dy: 10, shelf: 104 } },
      { id: 'bb_venture', layer: 'quest', cx: 27.0, cy: 77.0, name: '무법항 퀘스트 허브 (Lv.32+)', eng: 'Venture Co. / Bloodscalp', badge: '가시덤불 퀘스트 (Lv.32~45)', role: '무법항 여관·경매장·선착장 고블린 남작들.', detail: '투자개발회사 토벌, 붉은머리 트롤, 가시덤불 열병 등 Lv.32~45 대량 퀘스트.', reward: '32레벨 이후 폭발적 레벨업 구간.', callout: { dx: 24, dy: 34, shelf: 118 } },
      { id: 'bb_nes', layer: 'quest', cx: 35.7, cy: 10.8, name: '네싱워리 원정대 (Lv.32+)', eng: "Nesingwary's Expedition", badge: '야수 사냥 · 무두질 성지', role: '가시덤불 최북단 밀림 야영지.', detail: '호랑이·표범·랩터 연쇄 사냥 퀘스트 (Lv.32~38).', reward: '무두질 185→225+ 최고 성지!', callout: { dx: 26, dy: 14, shelf: 118 } }
    ]
  },

  // --- KALIMDOR (5 UNLOCKED FLIGHT HUBS) ---
  ruttheran: {
    continent: 'kalimdor',
    name: '루테란 마을',
    zone: '칼림도어 최북단 > 텔드랏실 · 다르나서스 (0~100)',
    fill: '#897e68',
    shape: 'M140,120 C240,55 690,55 835,140 C890,265 865,455 710,555 C550,595 430,580 315,525 C215,470 120,310 140,120 Z',
    terrain: [
      { d: 'M240,130 C325,115 395,155 415,245 C405,365 345,425 270,390 C220,330 210,190 240,130 Z', fill: '#7f728f', stroke: '#463858', opacity: 0.7 }, // 다르나서스 시가지
      { d: 'M510,545 L625,545 L620,595 L520,595 Z', fill: '#a98e59', stroke: '#4d361b', opacity: 0.8 } // 루테란 해안
    ],
    exits: [
      { x: 585, y: 604, label: '↓ 배/비행: 아우버다인 (어둠의 해안)', targetHub: 'auberdine' }
    ],
    labels: [
      { x: 31, y: 40, text: '다르나서스 (비행조련사 없음)' },
      { x: 56, y: 42, text: '돌라나르 (초반 마을)' },
      { x: 58, y: 86, text: '루테란 마을' }
    ],
    items: [
      { id: 'rt_fm', layer: 'transit', cx: 58.4, cy: 94.0, name: '베스프리스터스 (비행)', eng: 'Vesprystus', badge: '비행조련사 (히포그리프) ✅', role: '루테란 마을 히포그리프 비행조련사.', detail: '다르나서스에는 비행조련사가 없으므로 보라빛 포탈로 내려와 여기서 아우버다인/칼림도어로 비행합니다.', reward: '배 기다림 없이 아우버다인 왕복!', callout: { dx: 26, dy: -16, shelf: 98 } },
      { id: 'rt_dock', layer: 'transit', cx: 54.8, cy: 96.2, name: '루테란 부두 (아우버다인 배)', eng: 'Ruttheran Dock', badge: '항구 · 어둠의 해안', role: '루테란 마을 남쪽 선착장.', detail: '어둠의 해안 아우버다인 서쪽 부두로 가는 정기선.', reward: '비행 해금 시 비행이 더 빠름.', callout: { dx: -26, dy: -10, shelf: -116 } },
      { id: 'rt_portal', layer: 'transit', cx: 56.0, cy: 90.0, name: '다르나서스 보라빛 포탈', eng: 'Darnassus Teleporter', badge: '도시 입구 포탈', role: '루테란 마을 중앙의 거대한 보라색 빛기둥.', detail: '걸어 들어가면 즉시 다르나서스(신전의 정원 앞)로 순간이동합니다.', reward: '귀환/도시 이용 관문.', callout: { dx: 24, dy: -42, shelf: 104 } },
      { id: 'rt_selgorm', layer: 'quest', cx: 36.2, cy: 28.5, name: '새벽감시자 셀고름 (BFD)', eng: 'Dawnwatcher Selgorm', badge: 'BFD [검은심연의 음모]', role: '다르나서스 <장인의 정원> 2층 (도시 내 55.4, 23.8).', detail: '검은심연의 나락 달의 제단 보스 [황혼의 군주 켈리스] 처치 후 [켈리스의 머리카락] 반납.', reward: '희귀 마법봉 [묘비 홀] (DPS ~29.0)!', callout: { dx: 24, dy: -20, shelf: 108 } },
      { id: 'rt_manados', layer: 'quest', cx: 37.5, cy: 32.0, name: '경비병 마나도스 (BFD)', eng: 'Argent Guard Manados', badge: 'BFD [황혼망치단의 몰락]', role: '다르나서스 <장인의 정원> (도시 내 55.0, 24.0).', detail: 'BFD 던전 내 황혼망치단 [황혼의 펜던트] 10개 수집.', reward: '어깨/반지/경험치 보상.', callout: { dx: 26, dy: 14, shelf: 104 } },
      { id: 'rt_thaelrid', layer: 'quest', cx: 39.0, cy: 36.5, name: '새벽감시자 섀드라스 (BFD 선행)', eng: 'Dawnwatcher Shaedlass', badge: 'BFD [타엘리드 찾기]', role: '다르나서스 <장인의 정원> (도시 내 55.4, 24.6).', detail: '던전 내 1네임드 가무라 남서쪽(7시) 수중 통로 안 [은빛경비병 타엘리드]에게 보고 → 즉시 [검은심연의 음모] 수락.', reward: '[묘비 홀] 획득을 위한 필수 선행 퀘스트.', callout: { dx: -22, dy: 20, shelf: -104 } }
    ]
  },
  auberdine: {
    continent: 'kalimdor',
    name: '아우버다인',
    zone: '칼림도어 북서부 > 어둠의 해안 (0~100 지역 좌표)',
    fill: '#758a6a',
    shape: 'M340,65 L650,65 L695,215 L635,380 L595,555 L265,565 L270,380 L325,215 Z',
    terrain: [
      { d: 'M375,260 Q435,365 445,545', fill: 'none', stroke: '#cbb079', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 },
      { d: 'M375,260 L585,145', fill: 'none', stroke: '#cbb079', strokeWidth: 8, strokeDasharray: '9,6', opacity: 0.72 }
    ],
    exits: [
      { x: 380, y: 42, label: '↑ 배/비행: 루테란 마을 (다르나서스)', targetHub: 'ruttheran' },
      { x: 165, y: 270, label: '← 배: 메네실 항구 (동부왕국)', targetHub: 'menethil' },
      { x: 460, y: 585, label: '↓ 잿빛골짜기 · BFD · 돌발톱', targetHub: 'stonetalon' }
    ],
    labels: [
      { x: 38, y: 39, text: '아우버다인' },
      { x: 58, y: 17, text: '마티스트라 폐허' },
      { x: 44, y: 71, text: '고대정령의 숲' }
    ],
    items: [
      { id: 'ab_fm', layer: 'transit', cx: 36.4, cy: 45.6, name: '케일라이스 문페더 (비행)', eng: 'Caylais Moonfeather', badge: '비행조련사 (히포그리프) ✅', role: '아우버다인 해변 비행장.', detail: '루테란 마을·돌발톱 산맥·나이젤 야영지·아스트라나르 연결.', reward: '칼림도어 북서부 이동 허브.', callout: { dx: 26, dy: 20, shelf: 108 } },
      { id: 'ab_dock', layer: 'transit', cx: 32.6, cy: 43.8, name: '아우버다인 부두 (메네실/루테란)', eng: 'Auberdine Pier', badge: '항구 · 대륙간 선박', role: '아우버다인 서쪽 바다로 뻗은 긴 부두.', detail: '북쪽 정박 = 메네실 항구 / 서쪽 정박 = 루테란 마을 배.', reward: '동부왕국 복귀 배 탑승.', callout: { dx: -26, dy: -16, shelf: -118 } },
      { id: 'ab_bfd', layer: 'quest', cx: 38.3, cy: 43.0, name: '게르샬라 (BFD 타락 연구)', eng: 'Gershala Nightwhisper', badge: 'BFD [타락에 대한 연구]', role: '아우버다인 여관 북쪽 선착장 부근 (38.3, 43.0).', detail: '검은심연의 나락 안 나가·사티로스에게서 [변이된 뇌간 (Corrupted Brain Stem)] 8개 수집.', reward: '망토 [Prelacy Cape] 또는 손목 [Beetle Clasps].', callout: { dx: 26, dy: -18, shelf: 108 } },
      { id: 'ab_marinos', layer: 'quest', cx: 59.2, cy: 22.6, name: '남작 마리노스 (#98028)', eng: 'Baron Marinos', badge: '와우 포에버 정예 · 보주 보상', role: '마티스트라 폐허 북동쪽 (59.2, 22.6) 해안/폐허.', detail: '처치 시 [혼탁한 물의 구슬] 드랍 → 우클릭으로 퀘스트 시작 → 남부 오누에게 반납!', reward: '추천 보상: [마시스트라 정신 집중 보주] (체력+3/지능+5).', callout: { dx: 26, dy: -22, shelf: 104 } },
      { id: 'ab_book', layer: 'poi', cx: 59.6, cy: 22.2, name: '나르탈라스 연감 74권 (책)', eng: 'Library Book (Mathystra)', badge: '도서관 책 위치', role: '마티스트라 폐허 북부 (59.6, 22.2).', detail: '마법사 도서관 40권 수집용 책 회수 가능.', reward: '남작 마리노스와 동시 방문!', callout: { dx: 24, dy: 14, shelf: 112 } },
      { id: 'ab_onu', layer: 'quest', cx: 43.5, cy: 76.3, name: '오누 (남작 마리노스 반납)', eng: 'Onu', badge: '고대정령의 숲 반납 NPC', role: '어둠의 해안 남부 고대정령의 숲 중앙 (43.5, 76.3).', detail: '남작 마리노스 퀘스트(#98028) 완료 + [동굴 버섯]/[지배자의 창] 연퀘 연계.', reward: '보조장비 체력+3/지능+5 수령.', callout: { dx: 26, dy: 12, shelf: 1 } },
      { id: 'ab_bfd_path', layer: 'poi', cx: 29.0, cy: 93.0, name: '잿빛골짜기·BFD 진입로', eng: 'To Zoram Strand (14.2, 14.1)', badge: '인던 수중 동굴 주의', role: '남쪽 잿빛골짜기 서부 조람 해안으로 이어지는 해안길.', detail: '검은심연의 나락은 해안 물 위 폐허 신전(14.2, 14.1) 계단으로 내려가 물속 수중 터널을 잠수해 지나야 안쪽 인던 포탈(13.4, 12.8)이 나옵니다.', reward: '해안 절벽 위 (13.4, 12.8)로 바로 가면 포탈이 안 보임!', callout: { dx: -18, dy: -20, shelf: -1 } }
    ]
  },
  stonetalon: {
    continent: 'kalimdor',
    name: '돌발톱 산맥',
    zone: '칼림도어 중북부 > 돌발톱 봉우리 (0~100)',
    fill: '#a67f4d',
    shape: 'M240,55 L740,55 L860,260 L820,545 L265,555 L170,320 Z',
    terrain: [
      { d: 'M365,60 L365,165 Q520,255 620,340 T775,270', fill: 'none', stroke: '#d6ba82', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 },
      { d: 'M365,165 Q410,360 320,535', fill: 'none', stroke: '#d6ba82', strokeWidth: 8, strokeDasharray: '8,6', opacity: 0.65 }
    ],
    exits: [
      { x: 365, y: 38, label: '↑ 아우버다인 (어둠의 해안)', targetHub: 'auberdine' },
      { x: 325, y: 580, label: '↓ 남부 잊혀진 땅 (나이젤 야영지)', targetHub: 'nijel' }
    ],
    labels: [
      { x: 37, y: 15, text: '돌발톱 봉우리' },
      { x: 63, y: 52, text: '칼바위 산' },
      { x: 76, y: 37, text: '갈퀴발톱 굴 (잿빛 연결)' }
    ],
    items: [
      { id: 'st_fm', layer: 'transit', cx: 36.5, cy: 7.2, name: '텔로렌 (비행조련사)', eng: 'Teloren', badge: '비행조련사 (히포그리프) ✅', role: '돌발톱 봉우리 북서쪽 얼라이언스 전초기지.', detail: '아우버다인·아스트라나르·나이젤 야영지 직통 연결.', reward: '칼림도어 서부 산악 허브.', callout: { dx: 24, dy: 24, shelf: 98 } },
      { id: 'st_tunnel', layer: 'transit', cx: 78.0, cy: 42.5, name: '갈퀴발톱 굴 (아스트라나르)', eng: 'Talondeep Path', badge: '지역 연결 터널', role: '잿빛골짜기(미스트라 호수 43.7, 70.0)와 연결되는 동굴 통로.', detail: '비행 해금 전 도보로 넘어오는 관문.', reward: '지름길 확인용.', callout: { dx: -24, dy: -20, shelf: -112 } },
      { id: 'st_peak', layer: 'quest', cx: 37.1, cy: 8.1, name: '돌발톱 봉우리 퀘스트 (Lv.22~27)', eng: 'Stonetalon Peak Quests', badge: '얼라 전초기지 퀘스트', role: '비행조련사 옆 나이트 엘프 캠프.', detail: '[칼바위 산 정령], [바람의 봉우리] 등 20대 중후반 사냥.', reward: 'Lv.26 현재 바로 진행 가능.', callout: { dx: -24, dy: 28, shelf: -116 } },
      { id: 'st_cal', layer: 'quest', cx: 62.0, cy: 54.0, name: '칼바위 산 거미·고블린 (Lv.22+)', eng: 'Windshear Crag', badge: '사냥 구역 (Lv.20~27)', role: '중앙 벌목장·거미 협곡.', detail: '아우버다인/아스트라나르 연계 거미·고블린 처치 퀘스트.', reward: '비단/양모 + 경험치.', callout: { dx: -24, dy: 22, shelf: -118 } }
    ]
  },
  nijel: {
    continent: 'kalimdor',
    name: '나이젤 야영지',
    zone: '칼림도어 서부 > 잊혀진 땅 (0~100 지역 좌표)',
    fill: '#969168',
    shape: 'M240,55 L780,65 L840,340 L760,555 L295,550 L195,355 Z',
    terrain: [
      { d: 'M645,75 Q560,240 505,390 T595,540', fill: 'none', stroke: '#d6ba82', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.7 },
      { d: 'M310,335 C375,305 425,355 415,435 C380,475 305,455 290,395 Z', fill: '#7f7296', stroke: '#493c60', opacity: 0.65 } // 마라우돈 보라빛 계곡
    ],
    exits: [
      { x: 645, y: 40, label: '↑ 북부 돌발톱 산맥', targetHub: 'stonetalon' },
      { x: 855, y: 310, label: '→ 동부 불모의 땅 (톱니항)', targetHub: 'ratchet' }
    ],
    labels: [
      { x: 65, y: 18, text: '나이젤의 야영지' },
      { x: 33, y: 56, text: '마라우돈 계곡 (Lv.45+)' },
      { x: 49, y: 55, text: '마노리스 폐허' }
    ],
    items: [
      { id: 'nj_fm', layer: 'transit', cx: 64.7, cy: 10.5, name: '바리타나스 스카이리버 (비행)', eng: 'Baritanas Skyriver', badge: '비행조련사 (히포그리프) ✅', role: '나이젤 야영지 남서쪽 절벽 비행장.', detail: '아우버다인·돌발톱·테라모어·페더문 직통.', reward: '30대 중후반 서부 칼림도어 거점.', callout: { dx: -26, dy: 22, shelf: -118 } },
      { id: 'nj_inn', layer: 'npc', cx: 66.3, cy: 6.6, name: '여관주인 리샤에리아', eng: 'Innkeeper Lyshaerya', badge: '여관 · 보급', role: '나이젤 야영지 북동쪽 여관.', detail: '물/음식 보급 및 수리, 귀환석 등록.', reward: '사냥 중 휴식 거점.', callout: { dx: 24, dy: 14, shelf: 98 } },
      { id: 'nj_q', layer: 'quest', cx: 65.2, cy: 7.8, name: '나이젤 야영지 퀘스트 (Lv.32~38)', eng: "Nijel's Point Quests", badge: '얼라 퀘스트 허브 (Lv.32+)', role: '나이젤 야영지 사령부 및 주변 막사.', detail: '켄타우로스 [겔키스/마그람] 평판, 사티로스/악마 토벌.', reward: '33레벨 이후 본격 진행 추천.', callout: { dx: 24, dy: 40, shelf: 118 } },
      { id: 'nj_mara', layer: 'poi', cx: 38.0, cy: 58.0, name: '마라우돈 (동굴 입구 → 주황/보라)', eng: 'Maraudon', badge: '던전 (Lv.45~52) · 동굴 내부 분기', role: '서부 창의 계곡 석문 (38.0, 58.0) 진입 후 비인던 동굴 내부로 이동.', detail: '동굴 안쪽에서 주황색(북서) / 보라색(남서) 포탈 2곳으로 나뉩니다. 나이젤 야영지 퀘스트 수락 후 진입.', reward: '고급 캐스터 지팡이·반지.', callout: { dx: 18, dy: 18, shelf: 1 } }
    ]
  },
  ratchet: {
    continent: 'kalimdor',
    name: '톱니항',
    zone: '칼림도어 중부 > 불모의 땅 (0~100 지역 좌표)',
    fill: '#c79f50',
    shape: 'M240,55 L645,55 L745,215 L695,375 L640,555 L355,555 L265,330 Z',
    terrain: [
      { d: 'M515,75 Q525,290 505,535', fill: 'none', stroke: '#d9c088', strokeWidth: 9, strokeDasharray: '10,6', opacity: 0.72 },
      { d: 'M520,232 L630,232', fill: 'none', stroke: '#d9c088', strokeWidth: 8, opacity: 0.78 }
    ],
    exits: [
      { x: 765, y: 245, label: '→ 배: 무법항 (가시덤불)', targetHub: 'bootybay' },
      { x: 220, y: 260, label: '← 서부 잊혀진 땅 / 돌발톱', targetHub: 'nijel' }
    ],
    labels: [
      { x: 60, y: 31, text: '톱니항 (중립)' },
      { x: 56, y: 15, text: '진흙늪' },
      { x: 45, y: 31, text: '통곡의 동굴 인근' }
    ],
    items: [
      { id: 'rc_fm', layer: 'transit', cx: 63.1, cy: 37.2, name: '브라고크 (중립 비행)', eng: 'Bragok', badge: '비행조련사 (중립) ✅', role: '톱니항 북서쪽 비행조련사.', detail: '무법항과 배 연결 + 칼림도어 중부·테라모어/가젯잔 거점 연결.', reward: '도서관 책 3권 회수 베이스캠프!', callout: { dx: 26, dy: -22, shelf: 88 } },
      { id: 'rc_dock', layer: 'transit', cx: 63.8, cy: 38.6, name: '톱니항 선착장 (무법항 배)', eng: 'Ratchet Pier (to Booty Bay)', badge: '항구 · 동부왕국 무법항', role: '톱니항 동쪽 끝 선착장.', detail: '동부왕국 가시덤불 골짜기 무법항으로 직통 정기선 운행.', reward: '대륙 간 빠른 왕복.', callout: { dx: 26, dy: 14, shelf: 106 } },
      { id: 'rc_bk1', layer: 'poi', cx: 62.7, cy: 36.3, name: '백스탄: 파괴 마법에 대하여 (책)', eng: 'Baxtan: On Destructive Magics', badge: '도서관 책 (62.7, 36.3)', role: '비행조련사 뒤 고블린 공학 건물 내부 테이블.', detail: '도착 즉시 10초 만에 회수 가능한 도서관 책!', reward: '도서관 40권 수집 필수.', callout: { dx: 26, dy: -54, shelf: 118 } },
      { id: 'rc_bk2', layer: 'poi', cx: 56.3, cy: 8.8, name: '신비한 체계 설명서 (진흙늪 책)', eng: 'Arcanic Systems Manual', badge: '도서관 책 (56.3, 8.8)', role: '불모의 땅 북쪽 진흙늪 고블린 원유탑 꼭대기 제어실.', detail: '톱니항에서 북상해 고블린 탑 사다리를 타고 올라가 회수.', reward: 'Lv.18~20 몹이므로 26레벨 단독 안전 회수.', callout: { dx: -24, dy: 20, shelf: -116 } },
      { id: 'rc_bk3', layer: 'poi', cx: 46.0, cy: 36.5, name: '꿈꾸는 자들의 비밀 (통곡 동굴 책)', eng: 'Secrets of the Dreamers', badge: '도서관 책 (46.0, 36.5 → 52.8, 54.7)', role: '푸른수염 오아시스 서쪽 동굴 입구(46.0, 36.5) 내부(52.8, 54.7).', detail: '통곡의 동굴 인던 입구 앞 동굴에서 인던 안까지 안 들어가도 회수 가능.', reward: '톱니항 온 김에 3권 한 번에!', callout: { dx: -24, dy: 24, shelf: -118 } },
      { id: 'rc_q', layer: 'quest', cx: 62.4, cy: 37.6, name: '톱니항 중립 퀘스트 (Lv.14~22)', eng: 'Ratchet Quests', badge: '고블린 중립 퀘스트', role: '톱니항 여관·선착장 고블린 NPC들.', detail: '남해 해적단, 투자개발회사, [통곡의 동굴] 퀘스트.', reward: '책 회수 겸 경험치.', callout: { dx: 24, dy: 44, shelf: 112 } }
    ]
  }
};

const MICRO_HUNTING_ZONES = {
  menethil: [
    { id:'hz_wet_raptors', name:'랩터·악어 무두질 벌판', lv:'Lv.23~27', cx:52, cy:46, rx:13, ry:11, color:'#ef4444',
      role:'저습지 중앙~동부 랩터·악어 밀집 사냥터 (녹색지기 레시엘 56.2, 40.6 인접).',
      detail:'무두질 숙련 152→185 급상승 구간! 밤의장막무더기(악성 뿌리) 순찰 경로와 겹칩니다.',
      reward:'중간/두꺼운 가죽 + 비전 격노 원거리 풀링 최적 개활지.' },
    { id:'hz_wet_dunmodr', name:'던 모드르 (지하감옥 선행)', lv:'Lv.25~30', cx:49.5, cy:18, rx:6.5, ry:5.2, color:'#f59e0b',
      role:'저습지 북부 다리 앞 검은무쇠 부족 거점 (모틀리 가마슨 49.7, 18.2).',
      detail:'[검은무쇠 부족과의 전투] → 스톰윈드 지하감옥 [격노] 해금 & [자유의 불꽃] 호위 퀘스트.',
      reward:'선행 완료 ✅ · 탄돌 교각 건너면 바로 아라시 고원 진입.' }
  ],
  darkshire: [
    { id:'hz_dusk_raven', name:'까마귀 언덕 묘지 (언데드)', lv:'Lv.24~29', cx:23, cy:42, rx:9.5, ry:12, color:'#a855f7',
      role:'그늘숲 서부 대규모 언데드 사냥터 (구울·해골·네크로맨서).',
      detail:'변이 불가(언데드)이므로 비전 격노 선공 + 얼음 회오리(1 레벨) 카이팅 활용.',
      reward:'양모/비단 옷감 대량 + 모라딤/어둠의 기사단 연퀘 경험치.' },
    { id:'hz_dusk_worgen', name:'어스름 숲 · 과수원 (늑대인간)', lv:'Lv.26~30', cx:66, cy:68, rx:12, ry:13, color:'#ef4444',
      role:'그늘숲 남동부 늑대인간·오우거 밀집 사냥터.',
      detail:'인간형이라 애드 시 마우스오버 [변이]가 통하며 옷감 드랍률이 매우 높습니다.',
      reward:'양모/비단 옷감 파밍 + 다크샤이어 귀환 거리 짧음.' }
  ],
  lakeshire: [
    { id:'hz_red_keep', name:'돌망루 요새 · 오크 지대', lv:'Lv.22~27', cx:68, cy:40, rx:13, ry:14, color:'#ef4444',
      role:'붉은마루 산맥 북동부 검은바위 오크 밀집 구역.',
      detail:'인간형 오크 위주이므로 [변이] 활용이 쉽고 양모 옷감이 잘 나옵니다.',
      reward:'붉은마루 마무리 퀘스트 & 응급치료 양모 수급.' }
  ],
  southshore: [
    { id:'hz_hb_turtles', name:'강가 거북이 · 요리/무두 구간', lv:'Lv.29~33', cx:69, cy:61, rx:9.5, ry:13, color:'#10b981',
      role:'사우스쇼어 동쪽 강변 거북이 무한 사냥 구역.',
      detail:'거북이 고기(요리 175+ 고급 재료)와 가죽을 동시에 파밍하며 몹 배치가 널널합니다.',
      reward:'무두질 185→200+ & 요리 포만감 재료 동시 확보.' },
    { id:'hz_hb_yeti', name:'북부 설인 동굴 · 사자 벌판', lv:'Lv.30~34', cx:49, cy:35, rx:10, ry:9, color:'#f59e0b',
      role:'사우스쇼어 북쪽 설인 동굴과 사자 서식지.',
      detail:'사우스쇼어 연계 퀘스트([설인 사냥] 등)와 야수 무두질을 병행하는 핵심 루트.',
      reward:'두꺼운 가죽 채집 시작 + 퀘스트 경험치 집중.' }
  ],
  bootybay: [
    { id:'hz_stv_nesing', name:'네싱워리 북부 사냥터 (호랑이/랩터)', lv:'Lv.32~37', cx:38, cy:19, rx:11, ry:9, color:'#ef4444',
      role:'가시덤불 북부 네싱워리 원정대(35.7, 10.8) 주변 야수 밀집 지대.',
      detail:'호랑이·표범·랩터 연퀘로 폭풍 레벨업 + 무두질 200→225+ 초고속 구간!',
      reward:'두꺼운 가죽 대량 + 30대 중반 최고 효율 퀘스트 체인.' },
    { id:'hz_stv_mid', name:'가시덤불 중부 야수/쿠르젠 지대', lv:'Lv.36~40', cx:38, cy:42, rx:12, ry:10, color:'#f59e0b',
      role:'가시덤불 중앙부 상위 야수 및 인간형 파밍 구역.',
      detail:'비단 옷감·두꺼운 가죽 수급으로 40레벨 탈것 골드를 모으는 핵심 구간.',
      reward:'탈것 골드 마련 + 무법항 연계 퀘스트.' }
  ],
  refuge: [
    { id:'hz_arathi_raptors', name:'아라시 벌판 랩터·거미 사냥터', lv:'Lv.33~37', cx:58, cy:46, rx:13, ry:11, color:'#ef4444',
      role:'임시 주둔지 동쪽 넓은 평원 야수 사냥터.',
      detail:'시야가 탁 트여 비전 격노(3.5초) 원거리 선제 풀링에 최적인 개활지입니다.',
      reward:'무두질 200~230 + 임시 주둔지 퀘스트 연계.' },
    { id:'hz_arathi_strom', name:'스트롬가드 요새 (응급 225 & 옷감)', lv:'Lv.34~39', cx:25, cy:60, rx:9.5, ry:9, color:'#3b82f6',
      role:'아라시 서부 요새 — 얼라 입구 안쪽 데네브 워커(27.0, 58.8) 상주.',
      detail:'응급치료 125 [고급 응급치료서](1g) 구매 필수! 내부 오우거/비밀결사대 정예 주의.',
      reward:'응급치료 상한 225 해금 + 비단 옷감.' }
  ],
  nijel: [
    { id:'hz_deso_center', name:'잊혀진 땅 중앙 야수/켄타우로스', lv:'Lv.33~38', cx:51, cy:58, rx:16, ry:15, color:'#f59e0b',
      role:'나이젤 야영지 남쪽 광활한 퀘스트·야수 파밍 지대.',
      detail:'코도·바실리스크·전갈 무두질 및 켄타우로스 진영 평판 퀘스트 수행.',
      reward:'두꺼운 가죽 + 가시덤불 PvP 혼잡 시 쾌적한 대체 사냥터.' }
  ]
};
