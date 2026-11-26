/* WoW Forever Dashboard Runtime — Navigation, Search, Simulators, Maps, Charts & Boot */
/* ===== SAFE STORAGE (PREVENT iOS file:// / SANDBOXED WEBVIEW SecurityError) ===== */
(function(){ var n = document.getElementById('jsBlockedNotice'); if (n) n.style.display = 'none'; })();

function safeStorageGet(key, fallback) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      var v = window.localStorage.getItem(key);
      return v !== null ? v : fallback;
    }
  } catch (e) {}
  return fallback;
}
function safeStorageSet(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, val);
    }
  } catch (e) {}
}

/* ===== NAVIGATION & LAYOUT ===== */
function isDrawerMode() {
  return window.innerWidth <= 1140;
}

function openTab(id, btn, opts) {
  const silent = Boolean(opts && opts.silent);
  if (id === 'tab-stats') id = 'tab-talent';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.q-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-tab') === id));
  document.querySelectorAll('#searchMatches .hub-chip').forEach(c => c.classList.toggle('active', c.getAttribute('data-tab') === id));

  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add('active');

  if (!btn) btn = document.querySelector(`.nav-btn[data-tab="${id}"]`);
  if (btn) {
    btn.classList.add('active');
    const group = btn.getAttribute('data-group') || '';
    const title = btn.getAttribute('data-title') || btn.innerText;
    document.getElementById('pageCrumb').textContent = `${group} › ${title}`;
    document.getElementById('pageTitle').textContent = title;
  }

  safeStorageSet('wowf_active_tab_v2', id);
  if (!silent && typeof dismissNavUpdatedBadge === 'function') dismissNavUpdatedBadge(id);
  document.getElementById('stickyHeaderShell')?.classList.remove('header-hidden');
  if (isDrawerMode()) closeDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebarBackdrop');
  const fab = document.getElementById('mobileMenuFab');
  if (isDrawerMode()) {
    const opening = !sb.classList.contains('open');
    sb.classList.toggle('open', opening);
    bd.classList.toggle('show', opening);
    if (fab) fab.classList.toggle('drawer-open', opening);
  } else {
    document.body.classList.toggle('sidebar-collapsed');
    safeStorageSet('wowf_sidebar_collapsed', document.body.classList.contains('sidebar-collapsed') ? '1' : '0');
  }
}

function closeDrawer() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarBackdrop')?.classList.remove('show');
  document.getElementById('mobileMenuFab')?.classList.remove('drawer-open');
}

function forceReloadDashboard() {
  try {
    const url = window.location.pathname + '?v=' + Date.now();
    window.location.replace(url);
  } catch (e) {
    window.location.reload();
  }
}

/* Auto data-label injector for responsive card-tables + 3-way view toggle (auto / card / table) */
let tableMode = safeStorageGet('wowf_table_mode_v2', 'auto');

function injectTableLabels() {
  document.querySelectorAll('.table-wrap table').forEach(tbl => {
    const headers = Array.from(tbl.querySelectorAll('thead th')).map(th => th.textContent.trim());
    tbl.querySelectorAll('tbody tr').forEach(tr => {
      Array.from(tr.children).forEach((td, idx) => {
        if (headers[idx]) td.setAttribute('data-label', headers[idx]);
        if (idx === 0) return;
        const txt = (td.textContent || '').replace(/\u00a0/g, ' ').trim();
        const isEmptyPlaceholder = !txt || txt === '—' || txt === '-' || txt === '–' || txt === '/';
        td.classList.toggle('cell-empty', isEmptyPlaceholder);
        if (!td.querySelector(':scope > .td-val')) {
          const wrap = document.createElement('div');
          wrap.className = 'td-val';
          while (td.firstChild) wrap.appendChild(td.firstChild);
          td.appendChild(wrap);
        }
      });
    });
  });
}

function syncMobileHeaderHeight() {
  const shell = document.getElementById('stickyHeaderShell');
  if (!shell) return;
  if (isDrawerMode()) {
    const h = Math.ceil(shell.getBoundingClientRect().height || 136);
    document.documentElement.style.setProperty('--mobile-header-h', h + 'px');
  } else {
    document.documentElement.style.removeProperty('--mobile-header-h');
  }
}

function initAutoHideHeader() {
  const shell = document.getElementById('stickyHeaderShell');
  if (!shell || window.__wowfAutoHideBound) return;
  window.__wowfAutoHideBound = true;
  syncMobileHeaderHeight();

  let lastY = window.scrollY || 0;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = Math.max(0, window.scrollY || 0);
    if (!isDrawerMode()) {
      shell.classList.remove('header-hidden');
      lastY = y;
      return;
    }
    const drawerOpen = document.getElementById('sidebar')?.classList.contains('open');
    const searchFocused = document.activeElement && document.activeElement.id === 'globalSearch';
    if (drawerOpen || searchFocused || y <= 16) {
      shell.classList.remove('header-hidden');
      lastY = y;
      return;
    }
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (maxScroll > 0 && y >= maxScroll - 14) {
      lastY = y;
      return;
    }
    const delta = y - lastY;
    if (delta >= 4 && y > 36) {
      shell.classList.add('header-hidden');
      lastY = y;
    } else if (delta <= -3) {
      shell.classList.remove('header-hidden');
      lastY = y;
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', () => {
    syncMobileHeaderHeight();
    if (!isDrawerMode()) shell.classList.remove('header-hidden');
  }, { passive: true });
}

function jumpToTabAnchor(tabId, anchorId) {
  openTab(tabId);
  setTimeout(() => {
    const el = document.getElementById(anchorId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('jump-highlight');
    setTimeout(() => el.classList.remove('jump-highlight'), 1800);
  }, 70);
}

function applyTableMode() {
  document.body.classList.remove('force-card-tables', 'force-classic-tables');
  const lbl = document.getElementById('tableModeLabel');
  const btn = document.getElementById('tableModeBtn');
  if (tableMode === 'card') {
    document.body.classList.add('force-card-tables');
    if (lbl) lbl.textContent = '표: 카드형';
    if (btn) btn.classList.add('active');
  } else if (tableMode === 'table') {
    document.body.classList.add('force-classic-tables');
    if (lbl) lbl.textContent = '표: 가로표';
    if (btn) btn.classList.add('active');
  } else {
    if (lbl) lbl.textContent = '표: 자동';
    if (btn) btn.classList.remove('active');
  }
}

function toggleTableMode() {
  tableMode = tableMode === 'auto' ? 'card' : (tableMode === 'card' ? 'table' : 'auto');
  safeStorageSet('wowf_table_mode_v2', tableMode);
  applyTableMode();
}

function syncFilterDrawersForWidth() {
  const narrow = window.innerWidth <= 960;
  ['macroFilterDrawer', 'microFilterDrawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.open = !narrow;
  });
}

function copyCode(id, btn) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const prev = btn.textContent;
    btn.textContent = '복사됨 ✓';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove('copied');
    }, 1300);
  });
}

/* ===== SIMULATORS ===== */
function applyIntPreset(val) {
  const el = document.getElementById('calcInt');
  if (el) { el.value = val; updateCalc(); }
}

function updateCalc() {
  const haste = document.getElementById('calcHaste').checked;
  const oil = document.getElementById('calcOil').checked;
  const stacks = parseInt(document.getElementById('calcStacks').value, 10) || 0;
  const intel = parseInt(document.getElementById('calcInt').value, 10) || 0;

  const baseSp = 150 + (oil ? 8 : 0);
  const stackBonus = Math.round(intel * 0.12 * stacks);
  const totalSp = baseSp + stackBonus;
  const nextMana = 72 * (1 + stacks);

  document.getElementById('outSp').textContent = totalSp;
  document.getElementById('outSpDetail').textContent = `기본 ${baseSp}${oil ? '(오일+8)' : ''} + 중첩 보너스 ${stackBonus}`;
  document.getElementById('outMana').textContent = nextMana;

  if (haste) {
    document.getElementById('outWand').textContent = '0.96초';
    document.getElementById('outWandDetail').textContent = '하늘부름 1.10초 ÷ 1.15 (가속 15% 버프)';
  } else {
    document.getElementById('outWand').textContent = '1.10초';
    document.getElementById('outWandDetail').textContent = '하늘부름 1.60초 - 선딜 0.50초 (기본)';
  }
}

function updateStatCalc() {
  const staEl = document.getElementById('stSta');
  if (!staEl) return;
  const sta = parseFloat(staEl.value) || 0;
  const intl = parseFloat(document.getElementById('stInt').value) || 0;
  const spi = parseFloat(document.getElementById('stSpi').value) || 0;
  const haste = Math.max(0, parseFloat(document.getElementById('stHaste').value) || 0);
  const med = parseFloat(document.getElementById('stMed').value) || 0;
  const armorOn = document.getElementById('stMageArmor').checked;

  const hp = Math.round(sta * 10);
  const mp = Math.round(intl * 15);
  document.getElementById('outStaInt').textContent = `+${hp.toLocaleString()} HP / +${mp.toLocaleString()} MP`;
  document.getElementById('outStaIntSub').textContent = `체력 ${sta}×10 · 지능 ${intl}×15 기준`;

  const sp1 = intl * 0.12;
  const sp4 = intl * 0.48;
  const crit60 = (intl / 59.5).toFixed(2);
  document.getElementById('outIntScale').textContent = `+${Math.round(sp1)} ~ +${Math.round(sp4)} 주문력`;
  document.getElementById('outIntCritSub').textContent = `1중첩 +${sp1.toFixed(1)} / 4중첩 +${sp4.toFixed(1)} (Lv.60 치명 +${crit60}%)`;

  const tick2s = 13 + (spi / 4);
  const mp5 = tick2s * 2.5;
  const keepRatio = Math.min(1, med + (armorOn ? 0.5 : 0));
  const combatMp5 = Math.round(mp5 * keepRatio);
  document.getElementById('outSpiRegen').textContent = `2초당 ${tick2s.toFixed(1)} (MP5 ${Math.round(mp5)})`;
  document.getElementById('outSpiCombat').textContent = `시전 중 유지 ${Math.round(keepRatio * 100)}% → 전투 MP5 ${combatMp5}`;

  const gcd = Math.max(1.0, 1.5 / (1 + haste / 100));
  const wandCd = 1.1 / (1 + haste / 100);
  document.getElementById('outHasteGcd').textContent = `GCD ${gcd.toFixed(2)}s`;
  document.getElementById('outHasteCap').textContent = `법봉 ${wandCd.toFixed(2)}s · 최소 GCD 하한 1.00s`;
}

/* ===== MULTI-TAB SAFE SEARCH ===== */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function filterCards(query) {
  const q = query.trim().toLowerCase();
  const banner = document.getElementById('searchBanner');
  const summary = document.getElementById('searchSummary');
  const matchesWrap = document.getElementById('searchMatches');
  const buttons = document.querySelectorAll('.nav-btn');

  document.querySelectorAll('main .card').forEach(c => c.classList.remove('search-hit'));

  if (!q) {
    banner.classList.remove('show');
    matchesWrap.innerHTML = '';
    buttons.forEach(b => b.style.display = 'flex');
    return;
  }

  let matchedTabs = [];
  document.querySelectorAll('main .tab').forEach(tab => {
    const cards = Array.from(tab.querySelectorAll('.card'));
    let hitCount = 0;
    cards.forEach(c => {
      if (c.innerText.toLowerCase().includes(q)) {
        c.classList.add('search-hit');
        hitCount++;
      }
    });
    const textHit = tab.innerText.toLowerCase().includes(q);
    const btn = document.querySelector(`.nav-btn[data-tab="${tab.id}"]`);
    if (textHit) {
      matchedTabs.push({ id: tab.id, title: btn ? btn.getAttribute('data-title') : tab.id, hits: Math.max(1, hitCount) });
      if (btn) btn.style.display = 'flex';
    } else {
      if (btn) btn.style.display = 'none';
    }
  });

  banner.classList.add('show');
  const safeQ = escapeHtml(query);
  if (matchedTabs.length > 0) {
    summary.innerHTML = `"<strong>${safeQ}</strong>" 검색 결과: <strong>${matchedTabs.length}개 섹션</strong> 일치`;
    const activeId = document.querySelector('main .tab.active')?.id;
    const targetId = matchedTabs.some(m => m.id === activeId) ? activeId : matchedTabs[0].id;
    matchesWrap.innerHTML = matchedTabs.map(m =>
      `<button class="hub-chip ${m.id === targetId ? 'active' : ''}" data-tab="${m.id}" onclick="openTab('${m.id}')">${escapeHtml(m.title)} (${m.hits})</button>`
    ).join('');
    if (targetId !== activeId) openTab(targetId);
  } else {
    summary.innerHTML = `"<strong>${safeQ}</strong>"와 일치하는 항목이 없습니다.`;
    matchesWrap.innerHTML = '';
  }
}

function clearSearch() {
  const input = document.getElementById('globalSearch');
  input.value = '';
  filterCards('');
}

/* ===== VERIFIED AZEROTH ATLAS DATA ===== */

let mapState = {
  scale: 1, tx: 0, ty: 0, dragging: false, moved: false, startX: 0, startY: 0,
  layers: { flight: true, ekhub: true, kalimdor: true, dungeon: true, book: true, npc: true },
  selectedId: 'stockade'
};

function createWowMarkerGlyph(node, color, isSel) {
  const ns = 'http://www.w3.org/2000/svg';
  const wrap = document.createElementNS(ns, 'g');
  const aura = document.createElementNS(ns, 'circle');
  aura.setAttribute('class', 'pin-hover-ring');
  aura.setAttribute('r', isSel ? '13.5' : '10');
  aura.setAttribute('fill', isSel ? 'rgba(255,244,200,0.32)' : 'transparent');
  aura.setAttribute('stroke', isSel ? '#fff6cf' : 'transparent');
  aura.setAttribute('stroke-width', isSel ? '2' : '0');
  wrap.appendChild(aura);

  if (node.isCity) {
    const house = document.createElementNS(ns, 'path');
    house.setAttribute('d', 'M-7,-2 L0,-8 L7,-2 L6,6 L-6,6 Z');
    house.setAttribute('fill', '#c7b89c'); house.setAttribute('stroke', '#2a1808'); house.setAttribute('stroke-width', '1.4');
    const roof = document.createElementNS(ns, 'path');
    roof.setAttribute('d', 'M-8.5,-1 L0,-9 L8.5,-1 L6.8,0.8 L0,-5.5 L-6.8,0.8 Z');
    roof.setAttribute('fill', '#695239'); roof.setAttribute('stroke', '#2a1808'); roof.setAttribute('stroke-width', '1');
    const door = document.createElementNS(ns, 'rect');
    door.setAttribute('x', '-2.2'); door.setAttribute('y', '0.5'); door.setAttribute('width', '4.4'); door.setAttribute('height', '5.5'); door.setAttribute('fill', '#3e2712');
    wrap.appendChild(house); wrap.appendChild(roof); wrap.appendChild(door);
    if (node.layer === 'flight') {
      const wing = document.createElementNS(ns, 'path');
      wing.setAttribute('d', 'M4,-5 C8,-8 11,-6 10,-2 C9,1 6,3 4,2 Z');
      wing.setAttribute('fill', '#3ce05c'); wing.setAttribute('stroke', '#113a18'); wing.setAttribute('stroke-width', '1.1');
      wrap.appendChild(wing);
    }
    return wrap;
  }
  if (node.layer === 'flight' || node.layer === 'ekhub' || node.layer === 'kalimdor' || node.layer === 'transit') {
    const wingFill = (node.layer === 'flight' || node.layer === 'transit') ? '#3de05d' : (node.isNeutral ? '#f5c242' : '#4da8ff');
    const wingStroke = (node.layer === 'flight' || node.layer === 'transit') ? '#0e3615' : (node.isNeutral ? '#4a3004' : '#0f2848');
    const wing = document.createElementNS(ns, 'path');
    wing.setAttribute('d', 'M-5,6 C-5,0 -1,-6 6,-8 C7,-4 5,0 3,2 L6,3 C2,5 -1,7 -5,6 Z');
    wing.setAttribute('fill', wingFill); wing.setAttribute('stroke', wingStroke); wing.setAttribute('stroke-width', '1.35'); wing.setAttribute('stroke-linejoin', 'round');
    const mid = document.createElementNS(ns, 'path');
    mid.setAttribute('d', 'M-3,4 C-1,0 2,-3 5,-6'); mid.setAttribute('stroke', '#eaffea'); mid.setAttribute('stroke-width', '0.9'); mid.setAttribute('fill', 'none');
    wrap.appendChild(wing); wrap.appendChild(mid);
    return wrap;
  }
  if (node.layer === 'dungeon' || node.layer === 'poi') {
    const dia = document.createElementNS(ns, 'path');
    dia.setAttribute('d', 'M0,-7.5 L7,0 L0,7.5 L-7,0 Z'); dia.setAttribute('fill', '#9e6fff'); dia.setAttribute('stroke', '#250e4d'); dia.setAttribute('stroke-width', '1.4');
    const core = document.createElementNS(ns, 'circle');
    core.setAttribute('r', '2.3'); core.setAttribute('fill', '#f4ebff');
    wrap.appendChild(dia); wrap.appendChild(core);
    return wrap;
  }
  if (node.layer === 'book' || node.layer === 'quest') {
    const bg = document.createElementNS(ns, 'circle');
    bg.setAttribute('r', '6.2'); bg.setAttribute('fill', '#f2b846'); bg.setAttribute('stroke', '#402604'); bg.setAttribute('stroke-width', '1.4');
    const mark = document.createElementNS(ns, 'text');
    mark.setAttribute('x', '0'); mark.setAttribute('y', '3.5'); mark.setAttribute('text-anchor', 'middle'); mark.setAttribute('font-size', '9.5'); mark.setAttribute('font-weight', '800'); mark.setAttribute('fill', '#2a1804');
    mark.textContent = node.layer === 'quest' ? '!' : '책';
    wrap.appendChild(bg); wrap.appendChild(mark);
    return wrap;
  }
  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r', '5.5'); dot.setAttribute('fill', color || '#39d0d8'); dot.setAttribute('stroke', '#10343a'); dot.setAttribute('stroke-width', '1.4');
  const inner = document.createElementNS(ns, 'circle');
  inner.setAttribute('r', '2'); inner.setAttribute('fill', '#e9ffff');
  wrap.appendChild(dot); wrap.appendChild(inner);
  return wrap;
}

function calcVisualTextWidth(str) {
  let w = 0;
  for (const ch of str) {
    if (/[가-힣]/.test(ch)) w += 9.5;
    else if (ch === ' ') w += 3.0;
    else if (/[()\[\].:·+\-\/,]/.test(ch)) w += 3.8;
    else if (/[A-Z]/.test(ch)) w += 6.8;
    else w += 5.4;
  }
  return w;
}

function drawLeaderCallout(g, labelText, callout, isSel) {
  const ns = 'http://www.w3.org/2000/svg';
  const fontSize = 10.2;
  if (!callout) {
    const tBg = document.createElementNS(ns, 'text');
    tBg.setAttribute('x', '10'); tBg.setAttribute('y', '3.5'); tBg.setAttribute('font-size', fontSize);
    tBg.setAttribute('stroke', 'rgba(246, 233, 200, 0.92)'); tBg.setAttribute('stroke-width', '3.4'); tBg.setAttribute('stroke-linejoin', 'round');
    tBg.textContent = labelText;
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', '10'); t.setAttribute('y', '3.5'); t.setAttribute('font-size', fontSize);
    t.setAttribute('fill', isSel ? '#7b190f' : '#241406'); t.textContent = labelText;
    g.appendChild(tBg); g.appendChild(t);
    return;
  }
  const dir = callout.shelf >= 0 ? 1 : -1;
  const rawDx = callout.dx || (dir * 16);
  const dx = dir * Math.min(20, Math.max(12, Math.abs(rawDx)));
  const dy = callout.dy || -16;

  const lineHalo = document.createElementNS(ns, 'polyline');
  lineHalo.setAttribute('fill', 'none'); lineHalo.setAttribute('stroke', 'rgba(248, 237, 210, 0.78)'); lineHalo.setAttribute('stroke-width', '3'); lineHalo.setAttribute('stroke-linejoin', 'round'); lineHalo.setAttribute('stroke-linecap', 'round');
  const line = document.createElementNS(ns, 'polyline');
  line.setAttribute('fill', 'none'); line.setAttribute('stroke', isSel ? '#8c1d12' : '#3a220c'); line.setAttribute('stroke-width', isSel ? '1.8' : '1.3'); line.setAttribute('stroke-linejoin', 'round'); line.setAttribute('stroke-linecap', 'round');

  const tBg = document.createElementNS(ns, 'text');
  tBg.setAttribute('text-anchor', 'middle'); tBg.setAttribute('font-size', fontSize);
  tBg.setAttribute('stroke', 'rgba(248, 236, 206, 0.94)'); tBg.setAttribute('stroke-width', '3.5'); tBg.setAttribute('stroke-linejoin', 'round'); tBg.textContent = labelText;
  const t = document.createElementNS(ns, 'text');
  t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', fontSize);
  t.setAttribute('fill', isSel ? '#82180e' : '#1e1005'); t.textContent = labelText;

  g.appendChild(lineHalo); g.appendChild(line); g.appendChild(tBg); g.appendChild(t);

  let measuredW = 0;
  try { measuredW = t.getComputedTextLength(); } catch (err) { measuredW = 0; }
  const textW = measuredW > 1 ? measuredW : calcVisualTextWidth(labelText);
  const shelfW = Math.ceil(textW) + 6;
  const endX = dx + dir * shelfW;
  const pts = `0,0 ${dx},${dy} ${endX},${dy}`;
  const textX = dx + dir * (shelfW / 2);
  const textY = dy - 4.5;
  lineHalo.setAttribute('points', pts); line.setAttribute('points', pts);
  tBg.setAttribute('x', textX); tBg.setAttribute('y', textY);
  t.setAttribute('x', textX); t.setAttribute('y', textY);
}

function renderMacroZones() {
  const zoneWrap = document.getElementById('macroZones');
  if (!zoneWrap) return;
  const ns = 'http://www.w3.org/2000/svg';
  zoneWrap.innerHTML = '';
  MACRO_ZONES.forEach(z => {
    const g = document.createElementNS(ns, 'g');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', z.d); p.setAttribute('fill', z.color); p.setAttribute('fill-opacity', '0.9');
    p.setAttribute('stroke', '#472d14'); p.setAttribute('stroke-width', '1.35'); p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('class', 'zone-poly');
    const title = document.createElementNS(ns, 'title');
    title.textContent = z.hubId ? `${z.name} — 클릭 시 마이크로 맵 열기` : `${z.name} — 클릭 시 거점 정보 보기`;
    p.appendChild(title);
    p.addEventListener('click', e => {
      e.stopPropagation();
      if (mapState.moved) return;
      const autoJump = document.getElementById('autoJumpMicro');
      if (z.hubId && MICRO_MAPS[z.hubId]) {
        if (autoJump && autoJump.checked) { openMicroMap(z.hubId); return; }
        const hubNode = MAP_NODES.find(n => n.id === z.hubId);
        if (hubNode) selectMapNode(hubNode);
        return;
      }
      if (z.nodeId) {
        const node = MAP_NODES.find(n => n.id === z.nodeId);
        if (node) selectMapNode(node);
      }
    });
    const zLbl = document.createElementNS(ns, 'text');
    zLbl.setAttribute('x', z.lx); zLbl.setAttribute('y', z.ly); zLbl.setAttribute('text-anchor', 'middle');
    zLbl.setAttribute('font-size', '8.8'); zLbl.setAttribute('font-weight', '700'); zLbl.setAttribute('fill', 'rgba(34, 19, 6, 0.72)'); zLbl.setAttribute('pointer-events', 'none');
    zLbl.textContent = z.name;
    g.appendChild(p); g.appendChild(zLbl); zoneWrap.appendChild(g);
  });
}

function applyMapTransform() {
  const world = document.getElementById('mapWorld');
  if (!world) return;
  world.setAttribute('transform', `translate(${mapState.tx}, ${mapState.ty}) scale(${mapState.scale})`);
  const lbl = document.getElementById('mapZoomLabel');
  if (lbl) lbl.textContent = `${Math.round(mapState.scale * 100)}%`;
  renderMapMarkers();
}

function renderMapMarkers() {
  const container = document.getElementById('mapMarkers');
  if (!container) return;
  const inv = 1 / Math.sqrt(mapState.scale);
  container.innerHTML = '';
  MAP_NODES.forEach(node => {
    if (!mapState.layers[node.layer]) return;
    const color = LAYER_COLORS[node.layer];
    const isSel = mapState.selectedId === node.id;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'map-pin');
    g.setAttribute('transform', `translate(${node.x}, ${node.y}) scale(${inv})`);
    container.appendChild(g);
    g.appendChild(createWowMarkerGlyph(node, color, isSel));
    drawLeaderCallout(g, node.name, node.callout, isSel);
    g.addEventListener('click', e => {
      e.stopPropagation();
      if (mapState.moved) return;
      const autoJump = document.getElementById('autoJumpMicro');
      if (node.layer === 'flight' && MICRO_MAPS[node.id] && autoJump && autoJump.checked) {
        openMicroMap(node.id); return;
      }
      selectMapNode(node);
    });
  });
}

function renderHubQuickList() {
  const wrap = document.getElementById('hubQuickList');
  if (!wrap) return;
  const groups = [
    { label: '해금 비행 (칼림 5)', filter: n => n.layer === 'flight' && ['ruttheran', 'auberdine', 'stonetalon', 'nijel', 'ratchet'].includes(n.id) },
    { label: '해금 비행 (동부 10)', filter: n => n.layer === 'flight' && !['ruttheran', 'auberdine', 'stonetalon', 'nijel', 'ratchet'].includes(n.id) },
    { label: '기타 거점', filter: n => ['ekhub', 'kalimdor'].includes(n.layer) },
    { label: '던전 · 책 · NPC', filter: n => ['dungeon', 'book', 'npc'].includes(n.layer) }
  ];
  wrap.innerHTML = groups.map(grp => {
    const items = MAP_NODES.filter(grp.filter).map(n =>
      `<button class="hub-chip ${mapState.selectedId === n.id ? 'active' : ''}" onclick="focusMapNode('${n.id}')">${n.name}</button>`
    ).join('');
    return `<div class="hub-row"><span class="hub-row-label">${grp.label}</span>${items}</div>`;
  }).join('');
}

function selectMapNode(node) {
  mapState.selectedId = node.id;
  document.getElementById('inspType').textContent = node.badge;
  document.getElementById('inspTitle').textContent = `${node.name} (${node.eng})`;
  document.getElementById('inspRegion').textContent = node.region;
  document.getElementById('inspSummary').innerHTML = `<strong>어떤 곳인가:</strong><br>${node.summary}`;
  document.getElementById('inspRoute').innerHTML = `<strong>가는 방법 &amp; 위치:</strong><br>${node.route}`;
  document.getElementById('inspMemo').innerHTML = `<strong>핵심 NPC · 퀘스트 팁:</strong><br>${node.memo}`;
  const microBtn = document.getElementById('inspMicroBtn');
  if (microBtn) {
    if (node.layer === 'flight' && MICRO_MAPS[node.id]) {
      microBtn.style.display = 'block';
      microBtn.textContent = `${node.name} 마이크로 맵 열기 →`;
      microBtn.onclick = () => openMicroMap(node.id);
    } else {
      microBtn.style.display = 'none';
    }
  }
  renderMapMarkers();
  renderHubQuickList();
}

function focusMapNode(id) {
  const node = MAP_NODES.find(n => n.id === id);
  if (!node) return;
  if (!mapState.layers[node.layer]) {
    mapState.layers[node.layer] = true;
    const cb = document.querySelector(`input[data-layer="${node.layer}"]`);
    if (cb) cb.checked = true;
  }
  const targetScale = Math.max(mapState.scale, 1.85);
  mapState.scale = targetScale;
  mapState.tx = 500 - node.x * targetScale;
  mapState.ty = 310 - node.y * targetScale;
  applyMapTransform();
  selectMapNode(node);
}

function setMapPreset(preset, btn) {
  if (btn) {
    document.querySelectorAll('#mapViewMacro .map-toolbar .map-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  if (preset === 'all') { mapState.scale = 1; mapState.tx = 0; mapState.ty = 0; }
  else if (preset === 'kalimdor') { mapState.scale = 1.65; mapState.tx = 85; mapState.ty = -45; }
  else if (preset === 'ek') { mapState.scale = 1.62; mapState.tx = -680; mapState.ty = -65; }
  applyMapTransform();
}

function zoomMap(factor, cx = 500, cy = 310) {
  const nextScale = Math.min(4.5, Math.max(0.8, mapState.scale * factor));
  const ratio = nextScale / mapState.scale;
  mapState.tx = cx - (cx - mapState.tx) * ratio;
  mapState.ty = cy - (cy - mapState.ty) * ratio;
  mapState.scale = nextScale;
  applyMapTransform();
}

function toggleMapLayer(layer, checked) {
  mapState.layers[layer] = checked;
  const activeCount = Object.values(mapState.layers).filter(Boolean).length;
  const sum = document.querySelector('#macroFilterDrawer summary');
  if (sum) sum.textContent = `레이어 필터 & 범례 (${activeCount}개 활성)`;
  renderMapMarkers();
}

function initInteractiveMap() {
  const vp = document.getElementById('mapViewport');
  const svg = document.getElementById('azerothSvg');
  if (!vp || !svg) return;

  vp.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 1000;
    const cy = ((e.clientY - rect.top) / rect.height) * 620;
    zoomMap(e.deltaY < 0 ? 1.18 : 0.85, cx, cy);
  }, { passive: false });

  vp.addEventListener('pointerdown', e => {
    if (e.target.closest('.map-float-controls')) return;
    mapState.dragging = true; mapState.moved = false;
    mapState.startX = e.clientX; mapState.startY = e.clientY;
  });
  window.addEventListener('pointermove', e => {
    if (!mapState.dragging) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - mapState.startX) / rect.width) * 1000;
    const dy = ((e.clientY - mapState.startY) / rect.height) * 620;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) mapState.moved = true;
    mapState.tx += dx; mapState.ty += dy;
    mapState.startX = e.clientX; mapState.startY = e.clientY;
    applyMapTransform();
  });
  window.addEventListener('pointerup', () => { mapState.dragging = false; });

  renderMacroZones();
  applyMapTransform();
  renderHubQuickList();
}

/* ===== MICRO MAP ===== */

let microState = {
  cityId: 'sw', scale: 1, tx: 0, ty: 0, dragging: false, moved: false, startX: 0, startY: 0,
  layers: { transit: true, npc: true, quest: true, poi: true, hunting: true }, selectedId: null
};

function switchMapMode(mode) {
  document.getElementById('btnModeMacro').classList.toggle('active', mode === 'macro');
  document.getElementById('btnModeMicro').classList.toggle('active', mode === 'micro');
  document.getElementById('mapViewMacro').classList.toggle('active', mode === 'macro');
  document.getElementById('mapViewMicro').classList.toggle('active', mode === 'micro');
  if (mode === 'micro') { renderMicroCityBar(); renderMicroMap(); }
}

function openMicroMap(cityId) {
  if (!MICRO_MAPS[cityId]) return;
  microState.cityId = cityId;
  microState.selectedId = MICRO_MAPS[cityId].items[0].id;
  resetMicroView();
  switchMapMode('micro');
}

function renderMicroCityBar() {
  const bar = document.getElementById('microCityBar');
  if (!bar) return;
  const ekIds = Object.keys(MICRO_MAPS).filter(k => MICRO_MAPS[k].continent === 'ek');
  const kalIds = Object.keys(MICRO_MAPS).filter(k => MICRO_MAPS[k].continent === 'kalimdor');
  const makeBtns = ids => ids.map(cid => `<button class="hub-chip ${cid === microState.cityId ? 'active' : ''}" onclick="openMicroMap('${cid}')">${MICRO_MAPS[cid].name}</button>`).join('');
  bar.innerHTML = `<div class="micro-hub-group"><span class="micro-hub-label">동부왕국 (10)</span>${makeBtns(ekIds)}</div><div class="micro-hub-group"><span class="micro-hub-label">칼림도어 (5)</span>${makeBtns(kalIds)}</div>`;
}

function applyMicroTransform() {
  const world = document.getElementById('microWorld');
  if (!world) return;
  world.setAttribute('transform', `translate(${microState.tx}, ${microState.ty}) scale(${microState.scale})`);
  const lbl = document.getElementById('microZoomLabel');
  if (lbl) lbl.textContent = `${Math.round(microState.scale * 100)}%`;
  renderMicroMarkers();
}

function renderMicroMap() {
  const city = MICRO_MAPS[microState.cityId];
  if (!city) return;
  document.getElementById('microHubBadge').textContent = `${city.name} — ${city.zone}`;
  const bg = document.getElementById('microBackdrop');
  if (bg) {
    let html = `<path d="${city.shape}" fill="${city.fill || '#a9945d'}" stroke="#482e14" stroke-width="2.2" stroke-linejoin="round" />`;
    if (city.terrain) {
      city.terrain.forEach(t => {
        html += `<path d="${t.d}" fill="${t.fill || 'none'}" stroke="${t.stroke || '#4a3017'}" stroke-width="${t.strokeWidth || 1.4}" ${t.strokeDasharray ? `stroke-dasharray="${t.strokeDasharray}"` : ''} opacity="${t.opacity || 0.75}" stroke-linecap="round" stroke-linejoin="round"/>`;
      });
    }
    for (let i = 10; i <= 90; i += 10) {
      html += `<text x="${i * 10}" y="16" fill="rgba(46,27,10,0.62)" font-size="10" font-weight="700" text-anchor="middle">${i}</text>`;
      html += `<text x="12" y="${i * 6.2 + 3}" fill="rgba(46,27,10,0.62)" font-size="10" font-weight="700">${i}</text>`;
    }
    city.labels.forEach(lb => {
      html += `<text x="${lb.x * 10}" y="${lb.y * 6.2}" fill="rgba(40,22,8,0.65)" font-size="12.5" font-weight="800" text-anchor="middle" pointer-events="none">${lb.text}</text>`;
    });
    if (city.exits) {
      city.exits.forEach(ex => {
        const w = Math.ceil(calcVisualTextWidth(ex.label)) + 28;
        html += `<g class="micro-exit-badge" onclick="openMicroMap('${ex.targetHub}')"><rect x="${ex.x - w / 2}" y="${ex.y - 12}" width="${w}" height="24" rx="12" fill="rgba(36,22,10,0.88)" stroke="#d9b672" stroke-width="1.3"/><text x="${ex.x}" y="${ex.y + 4}" fill="#f7e7be" font-size="10.8" font-weight="700" text-anchor="middle">${ex.label}</text></g>`;
      });
    }
    bg.innerHTML = html;
  }
  if (!microState.selectedId || !city.items.some(i => i.id === microState.selectedId)) {
    microState.selectedId = city.items[0].id;
  }
  const selItem = city.items.find(i => i.id === microState.selectedId);
  if (selItem) updateMicroInspector(selItem);
  renderMicroHuntingZones();
  renderMicroMarkers();
  renderMicroQuickList();
}

function renderMicroMarkers() {
  const container = document.getElementById('microMarkers');
  const city = MICRO_MAPS[microState.cityId];
  if (!container || !city) return;
  const inv = 1 / Math.sqrt(microState.scale);
  container.innerHTML = '';
  city.items.forEach(item => {
    if (!microState.layers[item.layer]) return;
    const color = MICRO_COLORS[item.layer];
    const isSel = microState.selectedId === item.id;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'map-pin');
    g.setAttribute('transform', `translate(${item.cx * 10}, ${item.cy * 6.2}) scale(${inv})`);
    container.appendChild(g);
    g.appendChild(createWowMarkerGlyph(item, color, isSel));
    let effCallout = item.callout;
    if (!effCallout) {
      if (item.cx > 72) effCallout = { dx: -16, dy: item.cy < 25 ? 18 : -16, shelf: -1 };
      else if (item.cx < 18) effCallout = { dx: 16, dy: -16, shelf: 1 };
    }
    drawLeaderCallout(g, item.name, effCallout, isSel);
    g.addEventListener('click', e => {
      e.stopPropagation();
      if (microState.moved) return;
      selectMicroItem(item);
    });
  });
}

function renderMicroQuickList() {
  const wrap = document.getElementById('microQuickList');
  const city = MICRO_MAPS[microState.cityId];
  if (!wrap || !city) return;
  const groups = [
    { label: '비행 · 항구 · 포탈', filter: i => i.layer === 'transit' },
    { label: 'NPC · 교관', filter: i => i.layer === 'npc' },
    { label: '퀘스트 (Lv.12+)', filter: i => i.layer === 'quest' },
    { label: '던전 · 책', filter: i => i.layer === 'poi' }
  ];
  wrap.innerHTML = groups.map(grp => {
    const matched = city.items.filter(grp.filter);
    if (matched.length === 0) return '';
    const items = matched.map(i => `<button class="hub-chip ${microState.selectedId === i.id ? 'active' : ''}" onclick="focusMicroItem('${i.id}')">${i.name}</button>`).join('');
    return `<div class="hub-row"><span class="hub-row-label">${grp.label}</span>${items}</div>`;
  }).join('');
}

function updateMicroInspector(item) {
  document.getElementById('microInspType').textContent = item.badge;
  document.getElementById('microInspTitle').textContent = `${item.name} (${item.eng})`;
  document.getElementById('microInspCoord').textContent = `인게임 좌표: (${item.cx.toFixed(1)}, ${item.cy.toFixed(1)})`;
  document.getElementById('microInspRole').innerHTML = `<strong>어떤 곳 / 누구인가:</strong><br>${item.role}`;
  document.getElementById('microInspDetail').innerHTML = `<strong>수행 목표 / 기능:</strong><br>${item.detail}`;
  document.getElementById('microInspReward').innerHTML = `<strong>보상 / 마법사 팁:</strong><br>${item.reward}`;
}

function selectMicroItem(item) {
  microState.selectedId = item.id;
  updateMicroInspector(item);
  renderMicroMarkers();
  renderMicroQuickList();
}

function focusMicroItem(id) {
  const city = MICRO_MAPS[microState.cityId];
  const item = city && city.items.find(i => i.id === id);
  if (!item) return;
  microState.layers[item.layer] = true;
  const cb = document.querySelector(`input[data-micro-layer="${item.layer}"]`);
  if (cb) cb.checked = true;
  const targetScale = Math.max(microState.scale, 1.75);
  microState.scale = targetScale;
  microState.tx = 500 - (item.cx * 10) * targetScale;
  microState.ty = 310 - (item.cy * 6.2) * targetScale;
  applyMicroTransform();
  selectMicroItem(item);
}

function zoomMicro(factor, cx = 500, cy = 310) {
  const nextScale = Math.min(4.5, Math.max(0.8, microState.scale * factor));
  const ratio = nextScale / microState.scale;
  microState.tx = cx - (cx - microState.tx) * ratio;
  microState.ty = cy - (cy - microState.ty) * ratio;
  microState.scale = nextScale;
  applyMicroTransform();
}

function resetMicroView() {
  microState.scale = 1; microState.tx = 0; microState.ty = 0;
  applyMicroTransform();
}

function toggleMicroLayer(layer, checked) {
  microState.layers[layer] = checked;
  renderMicroHuntingZones();
  renderMicroMarkers();
}

function initMicroMap() {
  const vp = document.getElementById('microViewport');
  const svg = document.getElementById('microSvg');
  if (!vp || !svg) return;

  vp.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 1000;
    const cy = ((e.clientY - rect.top) / rect.height) * 620;
    zoomMicro(e.deltaY < 0 ? 1.18 : 0.85, cx, cy);
  }, { passive: false });

  vp.addEventListener('pointerdown', e => {
    if (e.target.closest('.map-float-controls')) return;
    microState.dragging = true; microState.moved = false;
    microState.startX = e.clientX; microState.startY = e.clientY;
  });
  window.addEventListener('pointermove', e => {
    if (!microState.dragging) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - microState.startX) / rect.width) * 1000;
    const dy = ((e.clientY - microState.startY) / rect.height) * 620;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) microState.moved = true;
    microState.tx += dx; microState.ty += dy;
    microState.startX = e.clientX; microState.startY = e.clientY;
    applyMicroTransform();
  });
  window.addEventListener('pointerup', () => { microState.dragging = false; });

  renderMicroCityBar();
  renderMicroMap();
}

/* ===== QUEST CHECKLIST ===== */
function toggleQuestCheck(cb) {
  const key = cb.getAttribute('data-qcheck');
  let saved = {}; try { saved = JSON.parse(safeStorageGet('wowf_quest_checks', '{}') || '{}'); } catch (e) {}
  saved[key] = cb.checked;
  safeStorageSet('wowf_quest_checks', JSON.stringify(saved));
  cb.closest('.quest-check').classList.toggle('done', cb.checked);
}

function initQuestChecks() {
  let saved = {}; try { saved = JSON.parse(safeStorageGet('wowf_quest_checks', '{}') || '{}'); } catch (e) {}
  document.querySelectorAll('input[data-qcheck]').forEach(cb => {
    const key = cb.getAttribute('data-qcheck');
    if (key in saved) {
      cb.checked = !!saved[key];
    } else if (cb.defaultChecked) {
      cb.checked = true;
    }
    cb.closest('.quest-check')?.classList.toggle('done', cb.checked);
  });
}

/* ===== KEYBOARD SHORTCUTS & INIT ===== */


/* ===== WOW FOREVER IN-GAME ICON & HOVER TOOLTIP DATABASE ===== */


/* ===== UPGRADE v2.1: MEMPHIS DARK THEME, IN-GAME 3-TREE TALENTS, ROTATION CALC & HUNTING ZONES ===== */
function initMemphisTheme() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const saved = safeStorageGet('wowf_memphis_theme', 'light');
  applyMemphisTheme(saved);
}
function applyMemphisTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const lbl = document.getElementById('themeToggleLabel');
  if (lbl) lbl.textContent = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
}
function toggleMemphisTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  safeStorageSet('wowf_memphis_theme', next);
  applyMemphisTheme(next);
}

/* --- IN-GAME 3-TREE TALENT DATA & INTERACTIVE SIMULATOR (Lv.35 25/0/1 · 신비한 정신 3/5 · 정밀함 1/3) --- */

const TALENT_SIM_STATE = {
  simMode: false,
  unlimited: false,
  clickDir: 1, // 1: +찍기, -1: -빼기
  maxTotal: 51,
  activeSpec: 'arcane'
};

function getTreePoints(specId) {
  return IG_TALENT_TREES[specId].nodes.reduce((sum, n) => sum + n.cur, 0);
}

function getTreePointsBeforeRow(specId, row) {
  return IG_TALENT_TREES[specId].nodes.reduce((sum, n) => sum + (n.r < row ? n.cur : 0), 0);
}

function getTotalTalentPoints() {
  return getTreePoints('arcane') + getTreePoints('fire') + getTreePoints('frost');
}

function findTalentNode(specId, key) {
  return IG_TALENT_TREES[specId]?.nodes.find(n => n.key === key) || null;
}

function getTalentRank(key) {
  for (const specId of Object.keys(IG_TALENT_TREES)) {
    const n = findTalentNode(specId, key);
    if (n) return n.cur;
  }
  return 0;
}

function isTalentUnlocked(specId, node) {
  if (TALENT_SIM_STATE.simMode && TALENT_SIM_STATE.unlimited) return true;
  const reqPts = (node.r - 1) * 5;
  if (getTreePointsBeforeRow(specId, node.r) < reqPts) return false;
  if (node.req) {
    const parent = IG_TALENT_TREES[specId].nodes.find(x => x.r === node.req.r && x.c === node.req.c);
    if (parent && parent.cur < parent.max) return false;
  }
  return true;
}

function canDecrementTalent(specId, node) {
  if (node.cur <= 0) return false;
  if (TALENT_SIM_STATE.unlimited) return true;
  const nodes = IG_TALENT_TREES[specId].nodes;
  // Check child prerequisite dependency
  const child = nodes.find(x => x.req && x.req.r === node.r && x.req.c === node.c && x.cur > 0);
  if (child && node.cur - 1 < node.max) return false;
  // Check higher-row tier point integrity
  const maxInvestedRow = nodes.reduce((m, x) => (x.cur > 0 ? Math.max(m, x.r) : m), 0);
  for (let row = node.r + 1; row <= maxInvestedRow; row++) {
    const hasInRow = nodes.some(x => x.r === row && x.cur > 0);
    if (!hasInRow) continue;
    if (getTreePointsBeforeRow(specId, row) - 1 < (row - 1) * 5) return false;
  }
  return true;
}

function syncTalentEntryToWowDb(specId, node) {
  const tree = IG_TALENT_TREES[specId];
  const unlocked = isTalentUnlocked(specId, node);
  const statusTxt = node.cur >= node.max
    ? '마스터 완료 ★'
    : (node.cur > 0 ? '투자 중' : (unlocked ? '투자 가능' : `${(node.r - 1) * 5}pt / 선행 필요`));
  const rows = [
    [`등급: ${node.cur} / ${node.max}`, statusTxt],
    [`위치: ${tree.name}`, `${node.r}티어 ${node.c}열`]
  ];
  const effects = [];
  if (node.cur > 0) {
    effects.push(`현재 (${node.cur}/${node.max}): ${node.fmt(node.cur)}`);
  }
  if (node.cur < node.max) {
    effects.push(`다음 (${node.cur + 1}/${node.max}): ${node.fmt(node.cur + 1)}`);
  }
  const stepsSummary = (node.steps && node.steps.length > 1)
    ? '단계별 수치: ' + node.steps.map((s, idx) => (idx + 1 === node.cur ? `[${idx+1}:${s}]` : `${idx+1}:${s}`)).join(' → ')
    : '';
  const simHint = TALENT_SIM_STATE.simMode
    ? (TALENT_SIM_STATE.unlimited ? '🔓 무제한 시뮬레이션 ON — 클릭 +1 / 우클릭 -1' : '🧪 시뮬레이션 ON — 클릭 +1 / 우클릭 -1')
    : '📘 실제 Lv.35 (25/0/1) 기준 · 상단 [시뮬레이션] 토글로 수치 실험 가능';

  WOW_DB[node.key] = {
    en: node.en || node.key,
    kind: `${tree.name} 특성 · ${node.r}티어 ${node.c}열`,
    quality: 'talent',
    icon: node.icon,
    rows,
    effects,
    desc: stepsSummary,
    note: simHint
  };
}

function getActiveTalentMods() {
  const rSubtlety = getTalentRank('신비한 미묘함');
  const rResil = getTalentRank('신비한 인내');
  const rWand = getTalentRank('마법봉 전문화');
  const rAbsorb = getTalentRank('마법 흡수');
  const rClear = getTalentRank('신비한 정신 집중');
  const rBarrage = getTalentRank('화살 탄막');
  const rImpact = getTalentRank('신비한 충돌');
  const rMed = getTalentRank('신비한 명상');
  const rMind = getTalentRank('신비한 정신');
  const rInstab = getTalentRank('신비한 불안정성');
  const rAP = getTalentRank('신비의 마법 강화');
  const rPoM = getTalentRank('냉정');

  const rAccel = getTalentRank('촉진제 (화염구 연마)');
  const rImpFbl = getTalentRank('화염 작렬 연마');
  const rIncin = getTalentRank('소각');
  const rCritMass = getTalentRank('임계 질량');
  const rFirePow = getTalentRank('화염 마법 강화');

  const rImpFb = getTalentRank('얼음 화살 연마');
  const rElemHit = getTalentRank('정밀함');
  const rIceShards = getTalentRank('얼음 파편');
  const rPiercing = getTalentRank('사무치는 냉기');
  const rShatter = getTalentRank('산산조각');
  const rIceBar = getTalentRank('얼음 보호막');

  return {
    rSubtlety, rResil, rWand, rAbsorb, rClear, rBarrage, rImpact, rMed, rMind, rInstab, rAP, rPoM,
    rAccel, rImpFbl, rIncin, rCritMass, rFirePow,
    rImpFb, rElemHit, rIceShards, rPiercing, rShatter, rIceBar,
    intPct: rMind * 0.02,
    arcaneCritBonus: 0.50 * (1 + rMind * 0.20),
    frostCritBonus: 0.50 * (1 + rIceShards * 0.20),
    armorFromIntPct: rResil * 0.25,
    spellPen: [0, 8, 15][rSubtlety] || 0,
    allRes: rAbsorb * 2,
    meditation: [0, 0.17, 0.33, 0.50][rMed] || 0,
    wandPct: [0, 13, 25][rWand] || 0,
    allDmgPct: rInstab * 0.01,
    allCritPct: rInstab * 1.0,
    arcaneExtraCrit: rImpact * 2.0,
    abFblExtraCrit: rIncin * 2.0,
    fireExtraCrit: rCritMass * 2.0,
    fireDmgPct: rFirePow * 0.02,
    fireBlastCd: 8.0 - rImpFbl * 0.5,
    wrathCastReduce: rAccel * 0.1,
    frostCastReduce: rImpFb * 0.1,
    frostDmgPct: rPiercing * 0.02 + (rIceBar ? 0.15 : 0),
    elemHitPct: rElemHit * 2.0,
    shatterPct: [0, 17, 34, 50][rShatter] || 0
  };
}

function renderTalentImpactSummary() {
  const grid = document.getElementById('talentImpactGrid');
  const tags = document.getElementById('talentActiveTags');
  const badge = document.getElementById('talentImpactBadge');
  if (!grid || !tags) return;

  const m = getActiveTalentMods();
  const baseInt = Number(document.getElementById('stInt')?.value) || 127;
  const baseSpi = Number(document.getElementById('stSpi')?.value) || 100;
  const baseGenSp = Number(document.getElementById('stGenSp')?.value) || 101;
  const baseArcSp = Number(document.getElementById('stArcSp')?.value) || 67;
  const baseCrit = Number(document.getElementById('stCrit')?.value) || 5.21;
  const mageArmor = document.getElementById('stMageArmor')?.checked ? 0.50 : 0;

  // Baseline Lv.35 (11/26 12:45 실측 확정: 기본 HP 850 / MP 2,358 · 체 53 · 지 127 · 정 100 · 방어 463 · 일반 101 / 비전 168 · 25/0/1)
  const rawIntBase = baseInt / 1.06;
  const effInt = Math.round(rawIntBase * (1 + m.intPct));
  const intDelta = effInt - baseInt;
  const effMp = 2358 + (effInt - 127) * 15;
  const baseMp = 2358 + (baseInt - 127) * 15;
  const armorBonus = Math.round(effInt * m.armorFromIntPct);
  const effArmor = 463 + armorBonus;

  const outCastMp5 = Math.round(((13 + baseSpi / 4) * 2.5) * 10) / 10;
  const combatKeep = Math.min(1, m.meditation + mageArmor);
  const baseCombatKeep = Math.min(1, 0.50 + mageArmor);
  const combatMp5 = outCastMp5 * combatKeep;
  const baseCombatMp5 = outCastMp5 * baseCombatKeep;

  const critFromInt = intDelta * 0.03;
  const effAllCrit = baseCrit + m.allCritPct + critFromInt;
  const effAbCrit = effAllCrit + m.abFblExtraCrit;
  const effArcCritMult = 1 + m.arcaneCritBonus; // 1.50 ~ 2.00 (실제 Lv.35 기준 1.80)

  const totalArcSp = baseGenSp + baseArcSp;
  const deltaArc = totalArcSp - 168;
  const deltaGen = baseGenSp - 101;
  const allMul = 1 + m.allDmgPct;
  const abStep = effInt * 0.12;
  const ab0 = (156.5 + deltaArc * 0.4286) * allMul;
  const ab0Base = 156.5 + deltaArc * 0.4286;
  const ab0Exp = ab0 * (1 + (effAbCrit / 100) * m.arcaneCritBonus);
  const ab0BaseExp = ab0Base * (1 + (baseCrit / 100) * 0.80);

  const awDmg = ((292.5 + deltaArc) + effMp * 0.05) * allMul;
  const awBase = (292.5 + deltaArc) + baseMp * 0.05;
  const awCast = Math.max(1.0, 3.5 - m.wrathCastReduce);

  const wandAvg = 33.5 * (1 + m.wandPct / 100);
  const fblDmg = (206.3 + deltaGen * 0.4286) * allMul * (1 + m.fireDmgPct);
  const fblBase = 206.3 + deltaGen * 0.4286;

  const dBadge = (diff, unit, digits = 0) => {
    if (Math.abs(diff) < 0.05) return '';
    const sign = diff > 0 ? '+' : '';
    return `<span class="ti-delta ${diff > 0 ? 'up' : 'down'}">${sign}${diff.toFixed(digits)}${unit}</span>`;
  };

  if (badge) {
    if (!TALENT_SIM_STATE.simMode) {
      badge.textContent = '실제 Lv.35 기준 (25/0/1)';
      badge.className = 'badge verified';
    } else if (TALENT_SIM_STATE.unlimited) {
      badge.textContent = '🔓 무제한 시뮬레이션 반영 중';
      badge.className = 'badge warn';
    } else {
      badge.textContent = '🧪 시뮬레이션 실시간 반영 중';
      badge.className = 'badge arcane';
    }
  }

  const cards = [
    {
      lbl: '지능 / 최대 마나',
      val: `${effInt} 지능 · ${Math.round(effMp).toLocaleString()} MP`,
      delta: dBadge(intDelta, ' 지능'),
      sub: `신비한 정신 +${Math.round(m.intPct*100)}% (비작 +${abStep.toFixed(1)}SP/중첩)`,
      changed: intDelta !== 0
    },
    {
      lbl: '시전 중 마나 재생 (MP5)',
      val: `${combatMp5.toFixed(1)} MP5 (${Math.round(combatKeep*100)}%)`,
      delta: dBadge(combatMp5 - baseCombatMp5, '', 1),
      sub: `신비한 명상 ${Math.round(m.meditation*100)}%${mageArmor ? ' + 갑옷 50%' : ''}`,
      changed: Math.abs(combatMp5 - baseCombatMp5) >= 0.05
    },
    {
      lbl: '비전 치명타율 & 배율',
      val: `${effAbCrit.toFixed(2)}% · ×${Math.round(effArcCritMult*100)}%`,
      delta: dBadge(effArcCritMult*100 - 170, '%배율'),
      sub: `공용 ${effAllCrit.toFixed(2)}% · 비작 +${m.abFblExtraCrit}% · 충돌 +${m.arcaneExtraCrit}%`,
      changed: Math.abs(effAbCrit - baseCrit) >= 0.05 || Math.abs(effArcCritMult - 1.7) >= 0.01
    },
    {
      lbl: '비전 작렬 (0중 기대값)',
      val: `~${Math.round(ab0)} (기대 ${Math.round(ab0Exp)})`,
      delta: dBadge(ab0Exp - ab0BaseExp, ' dmg'),
      sub: `주문 피해 +${Math.round(m.allDmgPct*100)}%${m.rAP ? ' · 신마강 ON 시 +30%' : ''}`,
      changed: Math.abs(ab0Exp - ab0BaseExp) >= 0.5
    },
    {
      lbl: '비전 격노 (시전 · 피해)',
      val: `~${Math.round(awDmg)} (${awCast.toFixed(1)}초)`,
      delta: dBadge(awDmg - awBase, ' dmg'),
      sub: `최대 마나 5% (+${Math.round(effMp*0.05)} SP)${m.wrathCastReduce ? ' · 촉진제 단축!' : ''}`,
      changed: Math.abs(awDmg - awBase) >= 0.5 || m.wrathCastReduce > 0
    },
    {
      lbl: '관통 · 방어 · 마법봉 · 화작',
      val: `관통 ${m.spellPen} · 방어 ${effArmor}`,
      delta: dBadge(armorBonus, ' 방어'),
      sub: `법봉 ~${wandAvg.toFixed(1)}(+${m.wandPct}%) · 화작 ~${Math.round(fblDmg)}(쿨 ${m.fireBlastCd.toFixed(1)}s)`,
      changed: m.spellPen !== 15 || armorBonus !== 0 || m.wandPct !== 25 || Math.abs(fblDmg - fblBase) >= 0.5 || m.fireBlastCd !== 8.0
    }
  ];

  grid.innerHTML = cards.map(c => `
    <div class="ti-card ${c.changed ? 'changed' : ''}">
      <div class="ti-lbl">${c.lbl}</div>
      <div class="ti-val">${c.val}${c.delta}</div>
      <div class="ti-sub">${c.sub}</div>
    </div>
  `).join('');

  const activeEffects = [];
  if (m.rPoM) activeEffects.push('⚡ 냉정 (Off-GCD 즉시 시전)');
  if (m.rAP) activeEffects.push('🔥 신비의 마법 강화 (+30% 피해 / 15초)');
  if (m.rClear) activeEffects.push(`✨ 정신 집중 ${m.rClear*2}%`);
  if (m.rBarrage) activeEffects.push(`☄️ 화살 탄막 ${m.rBarrage*20}%`);
  if (m.allRes) activeEffects.push(`🛡️ 모든 저항 +${m.allRes}`);
  if (m.elemHitPct) activeEffects.push(`🎯 모든 주문 적중 +${m.elemHitPct}% (동렙 빗나감 ${Math.max(0, 4 - m.elemHitPct)}%)`);
  if (m.fireDmgPct) activeEffects.push(`🔥 화염 피해 +${Math.round(m.fireDmgPct*100)}%`);
  if (m.fireExtraCrit) activeEffects.push(`💥 화염 치명 +${m.fireExtraCrit}%`);
  if (m.frostDmgPct) activeEffects.push(`❄️ 냉기 피해 +${Math.round(m.frostDmgPct*100)}%`);
  if (m.rIceShards) activeEffects.push(`🧊 냉기 치명배율 ${150 + m.rIceShards*10}%`);
  if (m.shatterPct) activeEffects.push(`❄️ 산산조각(빙결 치명 +${m.shatterPct}%)`);
  if (m.frostCastReduce) activeEffects.push(`⏱️ 얼음 화살 -${m.frostCastReduce.toFixed(1)}초`);

  tags.innerHTML = activeEffects.map(t => `<span class="ti-tag ${TALENT_SIM_STATE.simMode ? 'boost' : ''}">${t}</span>`).join('');
}

function updateTalentChromeUI() {
  const aPts = getTreePoints('arcane');
  const fPts = getTreePoints('fire');
  const frPts = getTreePoints('frost');
  const total = aPts + fPts + frPts;

  const sumEl = document.getElementById('igBuildSummary');
  if (sumEl) sumEl.textContent = `${aPts} / ${fPts} / ${frPts}`;
  const setPts = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setPts('specTabPts-arcane', aPts);
  setPts('specTabPts-fire', fPts);
  setPts('specTabPts-frost', frPts);

  const modeBadge = document.getElementById('igModeBadge');
  const simBar = document.getElementById('talentSimBar');
  const ptsTxt = document.getElementById('talentSimPtsText');
  const legendTip = document.getElementById('igLegendTip');

  if (simBar) {
    simBar.classList.toggle('active', TALENT_SIM_STATE.simMode);
    simBar.classList.toggle('unlim-on', TALENT_SIM_STATE.simMode && TALENT_SIM_STATE.unlimited);
  }
  if (modeBadge) {
    if (!TALENT_SIM_STATE.simMode) {
      modeBadge.textContent = '✅ Lv.35 (26pt 투자 완료)';
      modeBadge.className = 'badge verified';
    } else if (TALENT_SIM_STATE.unlimited) {
      modeBadge.textContent = '🔓 무제한 시뮬레이션';
      modeBadge.className = 'badge warn';
    } else {
      modeBadge.textContent = '🧪 시뮬레이션 모드';
      modeBadge.className = 'badge arcane';
    }
  }
  if (ptsTxt) {
    ptsTxt.innerHTML = TALENT_SIM_STATE.unlimited
      ? `무제한 투자: <strong>${total}pt</strong> <small>(트리 순서·포인트 한도 해제됨)</small>`
      : `투자: <strong>${total}</strong> / ${TALENT_SIM_STATE.maxTotal}pt <small>(Lv.35 실측 · 25/0/1)</small>`;
  }
  if (legendTip) {
    legendTip.textContent = TALENT_SIM_STATE.simMode
      ? '클릭으로 투자/차감 · 호버 시 실시간 등급 수치 확인!'
      : '아이콘 호버/탭 시 등급별 수치 툴팁!';
  }

  // Sync Char Stat Lab stMed dropdown when simulating
  const medSel = document.getElementById('stMed');
  if (medSel) {
    const m = getActiveTalentMods();
    const targetVal = m.meditation === 0 ? '0' : m.meditation.toFixed(2);
    if (medSel.value !== targetVal) medSel.value = targetVal;
  }

  renderTalentImpactSummary();
  if (typeof updateCharStatLab === 'function') updateCharStatLab();
}

function renderInGameTalentTrees() {
  const mount = document.getElementById('igTalentMount');
  if (!mount) return;
  let html = '';
  Object.entries(IG_TALENT_TREES).forEach(([specId, tree]) => {
    tree.pts = getTreePoints(specId);
    tree.nodes.forEach(n => syncTalentEntryToWowDb(specId, n));

    const cellX = c => (c - 0.5) * 25;
    const cellY = r => (r - 0.5) * (100 / 7);
    const arrowSvg = tree.arrows.map(a => {
      const parent = tree.nodes.find(n => n.r === a.r1 && n.c === a.c1);
      const child = tree.nodes.find(n => n.r === a.r2 && n.c === a.c2);
      const isActive = TALENT_SIM_STATE.unlimited || (parent && parent.cur >= parent.max && child && isTalentUnlocked(specId, child));
      const x1 = cellX(a.c1);
      const y1 = cellY(a.r1) + 4.8;
      const y2 = cellY(a.r2) - 5.2;
      const stroke = isActive ? '#ffd100' : 'rgba(180,190,210,0.45)';
      const head = `${x1-1.9},${y2-2.2} ${x1+1.9},${y2-2.2} ${x1},${y2+0.6}`;
      return `<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2-1.4}" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round"/>
              <polygon points="${head}" fill="${stroke}"/>`;
    }).join('');

    const slotsHtml = tree.nodes.map(n => {
      const unlocked = isTalentUnlocked(specId, n);
      const state = n.cur >= n.max ? 'maxed' : (n.cur > 0 ? 'partial' : (unlocked ? 'available' : 'locked'));
      const simCls = TALENT_SIM_STATE.simMode ? ' sim-clickable' : '';
      const safeKey = escapeHtml(n.key);
      const jsKey = n.key.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `<div class="ig-slot ${state}${simCls}" style="grid-column:${n.c};grid-row:${n.r};" data-wow="${safeKey}" data-spec="${specId}" tabindex="0" aria-label="${safeKey} ${n.cur}/${n.max}" onclick="onTalentSlotClick('${specId}','${jsKey}',event)" oncontextmenu="return onTalentSlotContext('${specId}','${jsKey}',event)">
        <img src="${WOW_ICON_BASE}${n.icon}.jpg" alt="${safeKey}" loading="lazy" onerror="this.style.display='none'">
        <span class="ig-rank">${n.cur}/${n.max}</span>
      </div>`;
    }).join('');

    html += `<div class="ig-talent-panel ${TALENT_SIM_STATE.activeSpec === specId ? 'active' : ''}" id="igTree-${specId}">
      <div class="ig-talent-frame ${tree.bg}">
        <div class="ig-tree-header">
          <span class="tree-title-left"><img src="${WOW_ICON_BASE}${tree.icon}.jpg" alt=""><span>${tree.name}</span></span>
          <span>투자 포인트: <strong style="color:#ffd100;">${tree.pts}</strong></span>
        </div>
        <div class="ig-tree-stage">
          <svg class="ig-arrows-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${arrowSvg}</svg>
          <div class="ig-talent-grid">${slotsHtml}</div>
        </div>
      </div>
    </div>`;
  });
  mount.innerHTML = html;
  updateTalentChromeUI();
}

function adjustTalentRank(specId, key, delta, ev) {
  if (!TALENT_SIM_STATE.simMode) return false;
  const node = findTalentNode(specId, key);
  if (!node) return false;
  let changed = false;
  if (delta > 0) {
    if (node.cur < node.max && isTalentUnlocked(specId, node)) {
      if (TALENT_SIM_STATE.unlimited || getTotalTalentPoints() < TALENT_SIM_STATE.maxTotal) {
        node.cur += 1;
        changed = true;
      }
    }
  } else if (delta < 0) {
    if (canDecrementTalent(specId, node)) {
      node.cur -= 1;
      changed = true;
    }
  }
  if (changed) {
    renderInGameTalentTrees();
    // Refresh live tooltip immediately so user sees numbers climb in real time
    const entry = resolveWowEntry(key);
    const updatedSlot = document.querySelector(`.ig-slot[data-spec="${specId}"][data-wow="${CSS.escape ? CSS.escape(key) : key}"]`);
    if (entry && updatedSlot) {
      activeWowTarget = updatedSlot;
      renderWowTooltip(entry);
      if (ev && typeof ev.clientX === 'number' && ev.clientX > 0) {
        positionWowTooltip(ev.clientX, ev.clientY, updatedSlot.getBoundingClientRect());
      } else {
        positionWowTooltip(null, null, updatedSlot.getBoundingClientRect());
      }
    }
  }
  return changed;
}

function onTalentSlotClick(specId, key, ev) {
  if (!TALENT_SIM_STATE.simMode) return;
  if (ev) ev.stopPropagation();
  const delta = (ev && ev.shiftKey) ? -1 : TALENT_SIM_STATE.clickDir;
  const changed = adjustTalentRank(specId, key, delta, ev);
  if (!changed) {
    const entry = resolveWowEntry(key);
    const slot = ev?.currentTarget;
    if (entry && slot) {
      activeWowTarget = slot;
      renderWowTooltip(entry);
      positionWowTooltip(null, null, slot.getBoundingClientRect());
    }
  }
}

function onTalentSlotContext(specId, key, ev) {
  if (!TALENT_SIM_STATE.simMode) return true;
  if (ev) ev.preventDefault();
  adjustTalentRank(specId, key, -1, ev);
  return false;
}

function toggleTalentSim(on) {
  TALENT_SIM_STATE.simMode = Boolean(on);
  if (!TALENT_SIM_STATE.simMode) {
    TALENT_SIM_STATE.unlimited = false;
    const uEl = document.getElementById('talentUnlimToggle');
    if (uEl) uEl.checked = false;
    restoreActualTalentsDataOnly();
  }
  renderInGameTalentTrees();
}

function toggleTalentUnlimited(on) {
  TALENT_SIM_STATE.unlimited = Boolean(on);
  if (TALENT_SIM_STATE.unlimited && !TALENT_SIM_STATE.simMode) {
    TALENT_SIM_STATE.simMode = true;
    const sEl = document.getElementById('talentSimToggle');
    if (sEl) sEl.checked = true;
  }
  renderInGameTalentTrees();
}

function setTalentClickDir(dir) {
  TALENT_SIM_STATE.clickDir = dir < 0 ? -1 : 1;
  document.getElementById('simDirAdd')?.classList.toggle('active', TALENT_SIM_STATE.clickDir > 0);
  document.getElementById('simDirSub')?.classList.toggle('active', TALENT_SIM_STATE.clickDir < 0);
}

function restoreActualTalentsDataOnly() {
  Object.values(IG_TALENT_TREES).forEach(tree => {
    tree.nodes.forEach(n => { n.cur = n.base; });
  });
}

function resetTalentSimToActual() {
  restoreActualTalentsDataOnly();
  renderInGameTalentTrees();
}

function clearTalentSimAll() {
  Object.values(IG_TALENT_TREES).forEach(tree => {
    tree.nodes.forEach(n => { n.cur = 0; });
  });
  renderInGameTalentTrees();
}

function switchTalentTree(specId, btn) {
  TALENT_SIM_STATE.activeSpec = specId;
  document.querySelectorAll('.spec-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.ig-talent-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('igTree-' + specId);
  if (panel) panel.classList.add('active');
  hideWowTooltip();
}

/* --- LIVE ROTATION DAMAGE & DPS CALCULATOR (Lv.28 Grounded) --- */

/* --- MICRO MAP HUNTING ZONE OVERLAYS & ONE-CLICK JUMPS --- */

let highlightedHuntZoneId = null;

function renderMicroHuntingZones() {
  const wrap = document.getElementById('microHuntingZones');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (microState.layers.hunting === false) return;
  const zones = MICRO_HUNTING_ZONES[microState.cityId] || [];
  const ns = 'http://www.w3.org/2000/svg';
  zones.forEach(z => {
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'micro-hunt-zone' + (highlightedHuntZoneId === z.id ? ' highlighted' : ''));
    const cx = z.cx * 10, cy = z.cy * 6.2, rx = z.rx * 10, ry = z.ry * 6.2;

    const el = document.createElementNS(ns, 'ellipse');
    el.setAttribute('cx', cx); el.setAttribute('cy', cy);
    el.setAttribute('rx', rx); el.setAttribute('ry', ry);
    el.setAttribute('fill', z.color); el.setAttribute('fill-opacity', '0.24');
    el.setAttribute('stroke', z.color); el.setAttribute('stroke-width', '2.5');
    el.setAttribute('stroke-dasharray', '8,5');
    g.appendChild(el);

    const label = `${z.name} (${z.lv})`;
    const w = Math.max(118, label.length * 7.8 + 18);
    const pill = document.createElementNS(ns, 'rect');
    pill.setAttribute('x', cx - w / 2); pill.setAttribute('y', cy - 11);
    pill.setAttribute('width', w); pill.setAttribute('height', 22);
    pill.setAttribute('rx', 11);
    pill.setAttribute('fill', 'rgba(18, 12, 8, 0.86)');
    pill.setAttribute('stroke', z.color); pill.setAttribute('stroke-width', '1.6');
    g.appendChild(pill);

    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', cx); txt.setAttribute('y', cy + 4);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', '#fff9eb');
    txt.setAttribute('font-size', '10.6');
    txt.setAttribute('font-weight', '800');
    txt.textContent = label;
    g.appendChild(txt);

    g.addEventListener('click', e => {
      e.stopPropagation();
      if (microState.moved) return;
      focusMicroHuntZone(z);
    });
    wrap.appendChild(g);
  });
}

function focusMicroHuntZone(z) {
  highlightedHuntZoneId = z.id;
  document.getElementById('microInspType').textContent = `사냥터 영역 · ${z.lv}`;
  document.getElementById('microInspTitle').textContent = z.name;
  document.getElementById('microInspCoord').textContent = `핵심 영역 좌표: (${z.cx.toFixed(1)}, ${z.cy.toFixed(1)}) 주변`;
  document.getElementById('microInspRole').innerHTML = `<strong>사냥터 위치 &amp; 특징:</strong><br>${z.role}`;
  document.getElementById('microInspDetail').innerHTML = `<strong>전투 &amp; 파밍 포인트:</strong><br>${z.detail}`;
  document.getElementById('microInspReward').innerHTML = `<strong>보상 / 비전 마법사 팁:</strong><br>${z.reward}`;
  const targetScale = Math.max(microState.scale, 1.55);
  microState.scale = targetScale;
  microState.tx = 500 - (z.cx * 10) * targetScale;
  microState.ty = 310 - (z.cy * 6.2) * targetScale;
  applyMicroTransform();
  renderMicroHuntingZones();
}

function jumpToMicroZone(cityId, zoneId) {
  openTab('tab-maps');
  if (!MICRO_MAPS[cityId]) return;
  microState.layers.hunting = true;
  const cb = document.querySelector('input[data-micro-layer="hunting"]');
  if (cb) cb.checked = true;
  openMicroMap(cityId);
  const z = (MICRO_HUNTING_ZONES[cityId] || []).find(item => item.id === zoneId);
  if (z) {
    setTimeout(() => focusMicroHuntZone(z), 40);
  }
}

function jumpToMicroItem(cityId, itemId) {
  openTab('tab-maps');
  if (!MICRO_MAPS[cityId]) return;
  openMicroMap(cityId);
  setTimeout(() => focusMicroItem(itemId), 40);
}

function jumpToMacroNode(nodeId) {
  openTab('tab-maps');
  switchMapMode('macro');
  setTimeout(() => focusMapNode(nodeId), 40);
}


/* ===== UPGRADE v2.2: LIVE REALTIME DPS & INTERACTIVE COMBO SIMULATOR ===== */

let comboList = DEFAULT_COMBOS.map(c => ({ ...c, seq: [...c.seq] }));
let customComboCounter = 5;

function getSimEnv() {
  const haste = document.getElementById('rotHasteCb')?.checked ? 1.15 : 1.0;
  const oil = document.getElementById('rotOilCb')?.checked ? 8 : 0;
  return { haste, oil, wrathMpExtra: 0, abStepSp: 15.2 };
}

function calcComboMetrics(combo, env) {
  let stacks = 0;
  let totalMana = 0;
  let totalDmg = 0;
  let totalTime = 0;
  let usedBarrage = false;

  // Determine which step receives Clearcasting (highest non-free mana spell)
  let ccIdx = -1;
  if (combo.clearcast) {
    let bestMana = -1;
    let simSt = stacks;
    let simBar = false;
    combo.seq.forEach((sid, idx) => {
      const sp = SIM_SPELLS[sid];
      if (!sp) return;
      let m = sp.stacksAB ? sp.mana * (1 + simSt) : sp.mana;
      if (sp.isMissiles && combo.barrage && !simBar) { m = 0; simBar = true; }
      if (m > bestMana) { bestMana = m; ccIdx = idx; }
      if (sp.stacksAB) simSt = Math.min(4, simSt + 1);
    });
  }

  const steps = combo.seq.map((sid, idx) => {
    const sp = SIM_SPELLS[sid];
    if (!sp) return null;
    const curStack = stacks;
    // Verified in-game (2026-11-20): Arcane Blast Spell Damage stacks apply to ALL spell schools (Fire/Frost/Arcane), excluding wand.
    const extraSp = env.oil + (sp.school !== 'wand' ? curStack * env.abStepSp : 0);
    let dmg = sp.baseDmg + extraSp * sp.coeff;
    if (sid === 'aw') dmg += env.wrathMpExtra;

    let time = sp.cast / env.haste;
    let mana = sp.stacksAB ? sp.mana * (1 + curStack) : sp.mana;
    let tag = '';
    let tagFree = false;

    if (sp.isMissiles && combo.barrage && !usedBarrage) {
      usedBarrage = true;
      time = (sp.cast * 0.5) / env.haste;
      mana = 0;
      tag = `탄막 ${time.toFixed(1)}s`;
      tagFree = true;
    } else if (idx === ccIdx && mana > 0) {
      mana = 0;
      tag = '정집 0';
      tagFree = true;
    } else if (curStack > 0 && sp.school !== 'wand') {
      tag = `${curStack}중`;
    }

    if (sp.stacksAB) stacks = Math.min(4, stacks + 1);

    totalMana += mana;
    totalDmg += dmg;
    totalTime += time;
    return { sid, sp, dmg: Math.round(dmg), mana, time, tag, tagFree };
  }).filter(Boolean);

  const dps = totalTime > 0 ? totalDmg / totalTime : 0;
  return { steps, totalMana, totalDmg: Math.round(totalDmg), totalTime, dps, endStacks: stacks };
}

function renderSingleSpellTable() {
  const tbody = document.getElementById('rotSpellTableBody');
  if (!tbody) return;
  const env = getSimEnv();
  const pill = document.getElementById('rotEffectivePill');
  if (pill) {
    const hStr = env.haste > 1 ? '가속 +15% · ' : '';
    const oStr = env.oil > 0 ? ' (오일 +8)' : '';
    pill.textContent = `${hStr}비전 SP +${168 + env.oil}${oStr} · 일반 +${101 + env.oil}`;
  }

  const mkToggle = (key) => {
    const st = ROW_AB_STACKS[key] || 0;
    return `<button class="ab-stack-toggle ${st > 0 ? 'on' : ''}" onclick="cycleRowAbStack('${key}')" title="클릭하여 비전 작렬 중첩(0~4) 전환">비작 ${st === 0 ? 'OFF' : st + '중'}</button>`;
  };

  const stAb = ROW_AB_STACKS.ab || 0;
  const stAw = ROW_AB_STACKS.aw || 0;
  const stAm = ROW_AB_STACKS.am || 0;
  const stAmb = ROW_AB_STACKS.amb || 0;
  const stFbl = ROW_AB_STACKS.fbl || 0;
  const stAe = ROW_AB_STACKS.ae || 0;
  const stFb1 = ROW_AB_STACKS.fb1 || 0;

  const abMana = 92 * (1 + stAb);
  const abDmg = Math.round(148.8 + (env.oil + stAb * env.abStepSp) * 0.4286);
  const awDmg = Math.round(375.8 + env.oil + stAw * env.abStepSp);
  const amDmg = 565.0 + env.oil + stAm * env.abStepSp;
  const ambDmg = 565.0 + env.oil + stAmb * env.abStepSp;
  const fblDmg = Math.round(193.0 + (env.oil + stFbl * env.abStepSp) * 0.4286);
  const aeDmg = Math.round(122.4 + (env.oil + stAe * env.abStepSp) * 0.1429);
  const fb1Dmg = Math.round(42.9 + (env.oil + stFb1 * env.abStepSp) * 0.33);

  // Exact order: 비작 -> 비격 -> 신화 -> 신화(탄막) -> 화작 -> 법봉 (+ 신폭3 · 얼화1)
  const rows = [
    {
      name: `<code>비전 작렬</code> <em>(2 레벨)</em> ${mkToggle('ab')}`,
      mana: `<strong>~${abMana}</strong>` + (stAb > 0 ? ` <em>(${stAb}중 &times;${1+stAb})</em>` : ' <em>(기본마나 15%)</em>'),
      time: (1.5 / env.haste).toFixed(2) + '초',
      coeff: '<span class="coeff-pill">42.9%</span> <em style="font-size:11px;">전학파 +12 SP/중</em>',
      dmg: `<strong>~${abDmg}</strong>` + (stAb > 0 ? ` <em>(+${Math.round(stAb * env.abStepSp * 0.4286)})</em>` : ' <em>(시전 시 중첩 +1)</em>'),
      dps: `<strong>${(abDmg / (1.5 / env.haste)).toFixed(1)} DPS</strong>`
    },
    {
      name: `<code>비전 격노</code> <em>(1 레벨 · 6초 쿨)</em> ${mkToggle('aw')}`,
      mana: '140',
      time: (3.5 / env.haste).toFixed(2) + '초',
      coeff: '<span class="coeff-pill">100%</span> <em style="font-size:11px;">비전+일반 (+10/10SP)</em>',
      dmg: `<strong>~${awDmg}</strong> <em>(267 + 마나5% +92${stAw > 0 ? ' +중첩' + (stAw*12) : ''})</em>`,
      dps: `<strong>${(awDmg / (3.5 / env.haste)).toFixed(1)} DPS</strong>`
    },
    {
      name: `<code>신비한 화살(4 레벨)</code> ${mkToggle('am')}`,
      mana: '320',
      time: (5.0 / env.haste).toFixed(2) + '초',
      coeff: '<span class="coeff-pill">100%</span> <em style="font-size:11px;">비전+일반 (발당 20%)</em>',
      dmg: `<strong>${Math.round(amDmg)}</strong> <em>(발당 ~${(amDmg/5).toFixed(1)} &times; 5${stAm > 0 ? ' · +' + (stAm*12) : ''})</em>`,
      dps: `<strong>${(amDmg / (5.0 / env.haste)).toFixed(1)} DPS</strong>`
    },
    {
      name: `<code>신비한 화살(4 레벨)</code> <em>(<code>화살 탄막</code>)</em> ${mkToggle('amb')}`,
      mana: '<strong style="color:var(--verified);">0 (무료)</strong>',
      time: `<strong>${(2.5 / env.haste).toFixed(2)}초</strong>`,
      coeff: '<span class="coeff-pill">100%</span> <em style="font-size:11px;">비전+일반 (발당 20%)</em>',
      dmg: `<strong>${Math.round(ambDmg)}</strong> <em>(발당 ~${(ambDmg/5).toFixed(1)} &times; 5 · 시간 절반!)</em>`,
      dps: `<strong style="color:var(--arcane);">${(ambDmg / (2.5 / env.haste)).toFixed(1)} DPS 🔥</strong>`
    },
    {
      name: `<code>화염 작렬</code> <em>(4 레벨 · 8초 쿨)</em> ${mkToggle('fbl')}`,
      mana: '165',
      time: '즉시 (' + (1.5 / env.haste).toFixed(2) + 's GCD)',
      coeff: '<span class="coeff-pill gen-only">42.9%</span> <em style="font-size:11px;">일반+비작 버프 적용 ✅</em>',
      dmg: `<strong>~${fblDmg}</strong>` + (stFbl > 0 ? ` <em>(+${Math.round(stFbl * env.abStepSp * 0.4286)})</em>` : ' <em>(4레벨 마무리 즉발)</em>'),
      dps: `<strong>${(fblDmg / (1.5 / env.haste)).toFixed(1)} DPS</strong>`
    },
    {
      name: '<code>땅거미 마법봉</code> <em>(전문화 2/2)</em>',
      mana: '<strong>0</strong> <em>(5SR 유지)</em>',
      time: (1.3 / env.haste).toFixed(2) + '초',
      coeff: '<span class="coeff-pill gen-only">0%</span> <em style="font-size:11px;">기본 23-44 &times; 1.25 = 29-55</em>',
      dmg: '<strong>~41.9 / 발</strong> <em>(모든 주문 +5 포함)</em>',
      dps: `${(41.9 / (1.3 / env.haste)).toFixed(1)} DPS`
    },
    {
      name: `<code>신비한 폭발</code> <em>(3 레벨 · 10m 광역)</em> ${mkToggle('ae')}`,
      mana: '185',
      time: '즉시 (' + (1.5 / env.haste).toFixed(2) + 's GCD)',
      coeff: '<span class="coeff-pill">14.3%</span> <em style="font-size:11px;">광역 즉시 시전</em>',
      dmg: `<strong>~${aeDmg} / 대상</strong>` + (stAe > 0 ? ` <em>(+${Math.round(stAe * env.abStepSp * 0.1429)})</em>` : ' <em>(반경 10m 광역)</em>'),
      dps: `${(aeDmg / (1.5 / env.haste)).toFixed(1)} DPS (단일)`
    },
    {
      name: `<code>얼음 화살(1 레벨)</code> <em>(5초 감속 -40%)</em> ${mkToggle('fb1')}`,
      mana: '<strong>25</strong>',
      time: (1.5 / env.haste).toFixed(2) + '초',
      coeff: '<span class="coeff-pill gen-only">~33%</span> <em style="font-size:11px;">일반+비작 버프 적용 ✅</em>',
      dmg: `<strong>~${fb1Dmg}</strong>` + (stFb1 > 0 ? ` <em>(+${Math.round(stFb1 * env.abStepSp * 0.33)})</em>` : ' <em>(초저마나 카이팅 유틸)</em>'),
      dps: `${(fb1Dmg / (1.5 / env.haste)).toFixed(1)} DPS`
    }
  ];

  tbody.innerHTML = rows.map(r =>
    `<tr><td data-label="주문 (등급)">${r.name}</td><td data-label="마나">${r.mana}</td><td data-label="시전 시간">${r.time}</td><td data-label="주문력 계수">${r.coeff}</td><td data-label="기대 피해">${r.dmg}</td><td data-label="DPS">${r.dps}</td></tr>`
  ).join('');
  if (typeof hydrateWowTooltipsIn === 'function') hydrateWowTooltipsIn(tbody);
}

/* === FEATURE: COMBO_EDITOR_START === */
let comboEditorEnabled = true;
let dragStepState = null;

function toggleComboEditorMode() {
  comboEditorEnabled = !comboEditorEnabled;
  const tbl = document.querySelector('table.sim-table');
  if (tbl) tbl.classList.toggle('combo-editor-off', !comboEditorEnabled);
  const btn = document.getElementById('comboEditorToggleBtn');
  if (btn) {
    btn.classList.toggle('editor-on', comboEditorEnabled);
    btn.textContent = comboEditorEnabled ? '✏️ 스킬 편집: ON' : '✏️ 스킬 편집: OFF';
  }
}

function moveComboStep(rIdx, sIdx, delta) {
  const c = comboList[rIdx];
  if (!c) return;
  const next = sIdx + delta;
  if (next < 0 || next >= c.seq.length) return;
  const tmp = c.seq[sIdx];
  c.seq[sIdx] = c.seq[next];
  c.seq[next] = tmp;
  renderComboSimTable();
}

function clearComboSteps(rIdx) {
  if (!comboList[rIdx]) return;
  comboList[rIdx].seq = [];
  renderComboSimTable();
}

function onChipDragStart(e, rIdx, sIdx) {
  if (!comboEditorEnabled) { e.preventDefault(); return; }
  dragStepState = { rIdx, sIdx };
  e.currentTarget.classList.add('dragging');
  try { e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
}
function onChipDragOver(e) {
  if (!comboEditorEnabled || !dragStepState) return;
  e.preventDefault();
}
function onChipDrop(e, targetRIdx, targetSIdx) {
  if (!comboEditorEnabled || !dragStepState) return;
  e.preventDefault();
  if (dragStepState.rIdx !== targetRIdx) { dragStepState = null; return; }
  const c = comboList[targetRIdx];
  if (!c) return;
  const [moved] = c.seq.splice(dragStepState.sIdx, 1);
  c.seq.splice(targetSIdx, 0, moved);
  dragStepState = null;
  renderComboSimTable();
}
function onChipDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  dragStepState = null;
}

function renderComboSimTable() {
  const tbody = document.getElementById('comboSimBody');
  if (!tbody) return;
  const tbl = document.querySelector('table.sim-table');
  if (tbl) tbl.classList.toggle('combo-editor-off', !comboEditorEnabled);
  const env = getSimEnv();
  const addKeys = ['aw', 'ab', 'am', 'fb1', 'fbl', 'wd'];

  tbody.innerHTML = comboList.map((c, rIdx) => {
    const m = calcComboMetrics(c, env);
    const chipsHtml = m.steps.length
      ? m.steps.map((st, sIdx) =>
          (sIdx > 0 ? '<span class="seq-arrow">→</span>' : '') +
          `<span class="seq-chip draggable" draggable="${comboEditorEnabled}" data-wow="${escapeHtml(st.sp.wowKey)}" tabindex="0"
            ondragstart="onChipDragStart(event,${rIdx},${sIdx})"
            ondragover="onChipDragOver(event)"
            ondrop="onChipDrop(event,${rIdx},${sIdx})"
            ondragend="onChipDragEnd(event)">
            <img src="${WOW_ICON_BASE}${st.sp.icon}.jpg" alt="">
            <span>${st.sp.short}</span>
            ${st.tag ? `<span class="chip-tag ${st.tagFree ? 'free' : ''}">${st.tag}</span>` : ''}
            ${sIdx > 0 ? `<button class="chip-mv" onclick="moveComboStep(${rIdx},${sIdx},-1); event.stopPropagation();" title="앞으로 이동">◀</button>` : ''}
            ${sIdx < m.steps.length - 1 ? `<button class="chip-mv" onclick="moveComboStep(${rIdx},${sIdx},1); event.stopPropagation();" title="뒤로 이동">▶</button>` : ''}
            <button class="chip-del" onclick="removeComboStep(${rIdx},${sIdx}); event.stopPropagation();" title="이 스킬 빼기">×</button>
          </span>`
        ).join('')
      : '<span style="font-size:11.5px; opacity:0.65;">아래 팔레트에서 스킬을 눌러 추가하세요</span>';

    const addBtns = addKeys.map(k =>
      `<button class="seq-add-btn" onclick="addComboStep(${rIdx},'${k}')" title="${escapeHtml(SIM_SPELLS[k].name)} 추가"><img src="${WOW_ICON_BASE}${SIM_SPELLS[k].icon}.jpg" alt="">+${SIM_SPELLS[k].short}</button>`
    ).join('');

    const isPinned = pinnedCycleId === c.id;
    return `<tr>
      <td class="col-type" data-label="사이클 유형">
        <button class="cycle-type-btn ${isPinned ? 'pinned' : ''}" data-cycle-id="${c.id}"
          onmouseenter="hoverCycleTip(event, '${c.id}')"
          onmouseleave="leaveCycleTip()"
          onclick="togglePinCycleTip(event, '${c.id}')">
          <span>${escapeHtml(c.label)}</span>
          <span class="cycle-info-dot">i</span>
        </button>
      </td>
      <td class="col-seq" data-label="스킬 연계 순서">
        <div class="seq-chips">${chipsHtml}</div>
        <div class="seq-controls">
          <div class="seq-palette">${addBtns}</div>
          <div class="seq-opt-row">
            <label class="seq-opt" title="신비한 화살 채널링 5.0초→2.5초 & 마나 0 (피해량 동일!)"><input type="checkbox" ${c.barrage ? 'checked' : ''} onchange="toggleComboOpt(${rIdx},'barrage',this.checked)">탄막</label>
            <label class="seq-opt" title="신비한 정신 집중: 가장 마나가 큰 주문 1회 무료"><input type="checkbox" ${c.clearcast ? 'checked' : ''} onchange="toggleComboOpt(${rIdx},'clearcast',this.checked)">정집</label>
            <button class="seq-row-clear" onclick="clearComboSteps(${rIdx})" title="스킬 모두 비우기">비우기</button>
            <button class="seq-row-del" onclick="removeComboRow(${rIdx})" title="이 콤보 행 삭제">행 삭제</button>
          </div>
        </div>
      </td>
      <td class="col-num" data-label="소모 마나"><strong>${m.totalMana}</strong><span class="mana-sub">종료 비작 ${m.endStacks}중</span></td>
      <td class="col-num" data-label="누적 기대 피해"><strong>${m.totalDmg.toLocaleString()}</strong></td>
      <td class="col-num" data-label="총소요시간 (DPS)"><div>${m.totalTime.toFixed(1)}초</div><span class="dps-pill">${m.dps.toFixed(1)} DPS</span></td>
    </tr>`;
  }).join('');
}
/* === FEATURE: COMBO_EDITOR_END === */

function updateAllSim() {
  renderSingleSpellTable();
  renderComboSimTable();
}
function addComboStep(rIdx, sid) {
  if (!comboList[rIdx]) return;
  comboList[rIdx].seq.push(sid);
  renderComboSimTable();
}
function removeComboStep(rIdx, sIdx) {
  if (!comboList[rIdx]) return;
  comboList[rIdx].seq.splice(sIdx, 1);
  renderComboSimTable();
}
function toggleComboOpt(rIdx, key, val) {
  if (!comboList[rIdx]) return;
  comboList[rIdx][key] = val;
  renderComboSimTable();
}
function setComboStack(rIdx, val) {
  if (!comboList[rIdx]) return;
  comboList[rIdx].startStack = Number(val) || 0;
  renderComboSimTable();
}
function addCustomCombo() {
  const id = 'c_custom_' + Date.now();
  comboList.push({
    id,
    label: `⑤ 커스텀 #${customComboCounter - 4}`,
    tipTitle: `커스텀 콤보 #${customComboCounter - 4}`,
    tipBody: '직접 구성한 실험용 딜 사이클입니다. 아래 +스킬 버튼과 탄막/정집/시작 비작 중첩을 바꿔가며 소모 마나·누적 기대 피해·DPS 변화를 실시간 비교해 보세요!',
    seq: ['aw', 'ab', 'am', 'fbl'],
    barrage: false,
    clearcast: false,
    startStack: 0
  });
  customComboCounter++;
  renderComboSimTable();
}
function removeComboRow(rIdx) {
  if (comboList.length <= 1) return;
  if (comboList[rIdx]?.id === pinnedCycleId) closeCycleTip(true);
  comboList.splice(rIdx, 1);
  renderComboSimTable();
}
function resetComboPresets() {
  closeCycleTip(true);
  comboList = DEFAULT_COMBOS.map(c => ({ ...c, seq: [...c.seq] }));
  customComboCounter = 5;
  renderComboSimTable();
}

/* --- PINNABLE CYCLE VERDICT TOOLTIP --- */
let pinnedCycleId = null;

function showCycleTip(anchorEl, cycleId, pin) {
  const pop = document.getElementById('cycleTipPop');
  const c = comboList.find(x => x.id === cycleId);
  if (!pop || !c) return;
  pop.innerHTML = `<div class="ctip-head">
      <span class="ctip-title">${escapeHtml(c.tipTitle)}</span>
      <span class="ctip-pin-tag">${pin ? '📌 고정됨' : '클릭 시 고정'}</span>
      <button class="ctip-close" onclick="closeCycleTip(true)" aria-label="툴팁 닫기">✕</button>
    </div>
    <div>${c.tipBody}</div>`;
  pop.classList.add('show');
  pop.classList.toggle('pinned', !!pin);

  const rect = anchorEl.getBoundingClientRect();
  const pad = 12;
  const pw = pop.offsetWidth || 320;
  const ph = pop.offsetHeight || 130;
  let x = rect.right + 10;
  let y = rect.top - 4;
  if (x + pw + pad > window.innerWidth) x = Math.max(pad, rect.left - pw - 10);
  if (x + pw + pad > window.innerWidth) x = Math.max(pad, window.innerWidth - pw - pad);
  if (y + ph + pad > window.innerHeight) y = Math.max(pad, window.innerHeight - ph - pad);
  pop.style.left = `${Math.round(x)}px`;
  pop.style.top = `${Math.round(y)}px`;
}

function hoverCycleTip(e, cycleId) {
  if (pinnedCycleId) return;
  showCycleTip(e.currentTarget, cycleId, false);
}
function leaveCycleTip() {
  if (pinnedCycleId) return;
  closeCycleTip(false);
}
function togglePinCycleTip(e, cycleId) {
  e.stopPropagation();
  if (pinnedCycleId === cycleId) {
    closeCycleTip(true);
    return;
  }
  pinnedCycleId = cycleId;
  renderComboSimTable();
  const btn = document.querySelector(`.cycle-type-btn[data-cycle-id="${cycleId}"]`);
  if (btn) showCycleTip(btn, cycleId, true);
}
function closeCycleTip(clearPin) {
  const pop = document.getElementById('cycleTipPop');
  if (clearPin && pinnedCycleId) {
    pinnedCycleId = null;
    document.querySelectorAll('.cycle-type-btn.pinned').forEach(b => b.classList.remove('pinned'));
  }
  if (pop) {
    pop.classList.remove('show', 'pinned');
  }
}

document.addEventListener('click', e => {
  if (!pinnedCycleId) return;
  if (e.target.closest('#cycleTipPop') || e.target.closest('.cycle-type-btn')) return;
  closeCycleTip(true);
});


/* ===== UPGRADE v2.4: INTERACTIVE MOB XP RULES CALCULATOR ===== */
function getZeroDiff(lv) {
  if (lv <= 7) return 5;
  if (lv <= 9) return 6;
  if (lv <= 11) return 7;
  if (lv <= 15) return 8;
  if (lv <= 19) return 9;
  if (lv <= 29) return 11;
  if (lv <= 39) return 12;
  if (lv <= 44) return 13;
  if (lv <= 49) return 14;
  if (lv <= 54) return 15;
  if (lv <= 59) return 16;
  return 17;
}

function getGrayLevel(lv) {
  if (lv <= 5) return 0;
  if (lv <= 39) return lv - Math.floor(lv / 10) - 5;
  return lv - Math.floor(lv / 5) - 1;
}

function setXpSimLv(lv) {
  const inp = document.getElementById('xpCharLvInput');
  if (inp) { inp.value = lv; renderXpRulesSim(); }
}

function renderXpRulesSim() {
  const inp = document.getElementById('xpCharLvInput');
  if (!inp) return;
  const lv = Math.max(6, Math.min(59, parseInt(inp.value, 10) || 28));
  const zd = getZeroDiff(lv);
  const gl = getGrayLevel(lv);
  const baseSame = 45 + 5 * lv;

  const pills = document.getElementById('xpSummaryPills');
  if (pills) {
    pills.innerHTML =
      `<span class="badge arcane">ZD = ${zd}</span>` +
      `<span class="badge verified">⭐ 최적 사냥: Lv.${Math.max(1, lv - 2)}~${lv - 1}</span>` +
      `<span class="badge warn">상한(+20%): Lv.${lv + 4}</span>` +
      `<span class="badge">회색(0 XP): Lv.${gl} 이하</span>`;
  }

  const tierBody = document.getElementById('xpColorTierBody');
  if (tierBody) {
    const tiers = [
      { cls:'mc-gray',   lbl:'⚪ 회색 (Gray)',   rel:`≤ -${lv - gl} (GL 이하)`, rng:`Lv.${gl} 이하`, mul:'<strong>0 XP (획득 불가)</strong>', judge:'경험치 0 · 퀘스트/도서관 책 목적 외 사냥 금지' },
      { cls:'mc-green',  lbl:'🟢 초록 (Green)',  rel:`-3 ~ -${lv - gl - 1}`,    rng:`Lv.${gl + 1} ~ ${lv - 3}`, mul:`ZD=${zd} 선형 감소`, judge:'<strong>-3레벨(Lv.' + (lv - 3) + ')</strong>까지는 광역·무두질 쾌적, -4 이하 급감' },
      { cls:'mc-yellow', lbl:'🟡 노랑 (Yellow)', rel:'<strong>-2 ~ +2</strong>', rng:`Lv.${lv - 2} ~ ${lv + 2}`, mul:'-2(~80%) · 0(<strong>100%</strong>) · +2(110%)', judge:'<strong>⭐ -1~-2(Lv.' + (lv - 2) + '~' + (lv - 1) + ') 최고 효율!</strong> 빗나감 최소 + 1사이클 킬' },
      { cls:'mc-orange', lbl:'🟠 주황 (Orange)', rel:'+3 ~ +4',                 rng:`Lv.${lv + 3} ~ ${lv + 4}`, mul:'+3(115%) · <strong>+4(120% 상한!)</strong>', judge:'마법사 주문 빗나감/저항 급증 → 마나·시간 손해' },
      { cls:'mc-red',    lbl:'🔴 빨강 (Red)',    rel:'+5 ~ +9',                 rng:`Lv.${lv + 5} ~ ${lv + 9}`, mul:'<strong>120% 고정 (상한 돌파 불가)</strong>', judge:'+4와 XP 동일하지만 저항·피격 치명적 → 최악' },
      { cls:'mc-skull',  lbl:'💀 해골 (Skull)',  rel:'+10 이상',                rng:`Lv.${lv + 10}+`,           mul:'<strong>120% 고정</strong>', judge:'주문 대부분 저항 · 솔플 불가' }
    ];
    tierBody.innerHTML = tiers.map(r =>
      `<tr>
        <td data-label="이름/레벨 색상"><span class="mob-col-badge ${r.cls}">${r.lbl}</span></td>
        <td data-label="내 레벨 대비">${r.rel}</td>
        <td data-label="해당 몹 레벨"><strong>${r.rng}</strong></td>
        <td data-label="경험치 배율">${r.mul}</td>
        <td data-label="효율 판정">${r.judge}</td>
      </tr>`
    ).join('');
  }

  const diffBody = document.getElementById('xpDiffTableBody');
  if (diffBody) {
    const diffs = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -(lv - gl - 1), -(lv - gl)];
    const uniqueDiffs = [...new Set(diffs)].filter(d => lv + d >= 1).sort((a, b) => b - a);
    diffBody.innerHTML = uniqueDiffs.map(d => {
      const mlv = lv + d;
      let cls = 'mc-yellow', cname = '노랑';
      if (mlv <= gl) { cls = 'mc-gray'; cname = '회색'; }
      else if (d <= -3) { cls = 'mc-green'; cname = '초록'; }
      else if (d >= 5) { cls = 'mc-red'; cname = '빨강'; }
      else if (d >= 3) { cls = 'mc-orange'; cname = '주황'; }

      let stdXp = 0, fovXp = 0, verdict = '';
      if (mlv <= gl) {
        stdXp = 0; fovXp = 0;
        verdict = '🚫 회색 — 경험치 0 (획득 불가)';
      } else if (d >= 0) {
        const mult = 1 + 0.05 * Math.min(d, 4);
        stdXp = Math.round(baseSame * mult);
        fovXp = stdXp;
        if (d === 5) verdict = '⚠️ +4와 동일(상한 고정) · 빗나감 폭증 최악';
        else if (d === 4) verdict = '📈 +20% 보너스 상한선 · 저항 심해 비추';
        else if (d === 3) verdict = '주황 — 주문 빗나감 급증 구간';
        else if (d === 0) verdict = '동렙 기준선 (100%) — 무난함';
        else verdict = '소폭 보너스 · 체력/저항 상승 주의';
      } else {
        const mult = Math.max(0, 1 - (Math.abs(d) / zd));
        stdXp = Math.round(baseSame * mult);
        fovXp = Math.round((45 + 5 * mlv) * mult);
        if (d === -1 || d === -2) verdict = '⭐ 시간당 XP 최고 효율 구간! (빠른 킬·저항 최소)';
        else if (d === -3) verdict = '초록 최상단 — 광역·무두질 병행 시 준수';
        else verdict = '초록 하위 — 몹당 XP 급감 (퀘스트/재료용)';
      }
      const pct = baseSame > 0 ? Math.round((fovXp / baseSame) * 100) : 0;
      const rowCls = (d === -1 || d === -2) ? 'xp-row-sweet' : (mlv <= gl ? 'xp-row-zero' : '');
      const sign = d > 0 ? `+${d}` : `${d}`;
      return `<tr class="${rowCls}">
        <td data-label="레벨 차이"><strong>${sign}</strong></td>
        <td data-label="몹 레벨"><span class="mob-col-badge ${cls}">Lv.${mlv} (${cname})</span></td>
        <td data-label="표준 공식 XP"><strong>${stdXp}</strong></td>
        <td data-label="포에버 보정 XP"><strong>${fovXp}</strong></td>
        <td data-label="동렙 대비 %"><strong>${pct}%</strong></td>
        <td data-label="효율 판단">${verdict}</td>
      </tr>`;
    }).join('');
  }
}


/* ===== UPGRADE v3.0: CHARACTER STAT LAB, PER-ROW AB STACK TOGGLE & SPELL COEFFICIENTS ===== */
const ROW_AB_STACKS = { ab: 0, aw: 0, am: 0, amb: 0, fbl: 0, ae: 0, fb1: 0 };

function cycleRowAbStack(rowKey) {
  ROW_AB_STACKS[rowKey] = ((ROW_AB_STACKS[rowKey] || 0) + 1) % 5; // 0 -> 1 -> 2 -> 3 -> 4 -> 0
  renderSingleSpellTable();
}

function applyCharPreset(mode) {
  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  setVal('stSta', 53); setVal('stInt', 127); setVal('stSpi', 100);
  setVal('stGenSp', 101); setVal('stArcSp', 67); setVal('stCrit', 5.21); setVal('stHaste', 0);
  const medDefault = (typeof getActiveTalentMods === 'function') ? getActiveTalentMods().meditation : 0.50;
  setVal('stMed', medDefault === 0 ? '0' : medDefault.toFixed(2));
  const ma = document.getElementById('stMageArmor'); if (ma) ma.checked = true;

  if (mode === 'snap1245' || mode === 'snap0026') { setVal('stSta', 58); setVal('stInt', 139); setVal('stSpi', 110); setVal('stCrit', 5.59); setVal('stHaste', 15); } // 11/26 12:45 실측 (왕축+스톰힘: 1,200 HP / 2,538 MP)
  else if (mode === 'haste') { setVal('stHaste', 15); } // 스톰윈드의 힘: +300 HP(850->1,150), +15% 가속
  else if (mode === 'intbuff') { setVal('stInt', 143); setVal('stCrit', 5.73); } // 신비한 지능 3레벨 (+15 원지능 × 1.06 → +16 반영)
  else if (mode === 'fullbuff') { setVal('stSta', 58); setVal('stInt', 157); setVal('stSpi', 110); setVal('stCrit', 6.19); setVal('stHaste', 15); } // 지능3 + 왕축 + 스톰힘 예상
  else if (mode === 'oil') { setVal('stGenSp', 109); } // 최하급 마술사 오일 +8 SP
  else if (mode === 'sp20') { setVal('stGenSp', 121); }
  updateCharStatLab();
}

function updateCharStatLab() {
  const sta = Number(document.getElementById('stSta')?.value) || 0;
  const baseIntel = Number(document.getElementById('stInt')?.value) || 0;
  const spi = Number(document.getElementById('stSpi')?.value) || 0;
  const genSp = Number(document.getElementById('stGenSp')?.value) || 0;
  const arcOnlySp = Number(document.getElementById('stArcSp')?.value) || 0;
  const baseCritPct = Number(document.getElementById('stCrit')?.value) || 0;
  const hastePct = Number(document.getElementById('stHaste')?.value) || 0;
  const med = Number(document.getElementById('stMed')?.value) || 0;
  const mageArmor = document.getElementById('stMageArmor')?.checked ? 0.50 : 0;

  // Apply live talent modifiers from Talent Simulator (baseline Lv.35 already includes 신비한 정신 3/5 = +6% Int)
  const tm = (typeof getActiveTalentMods === 'function') ? getActiveTalentMods() : {
    intPct: 0.06, arcaneCritBonus: 0.80, frostCritBonus: 0.50, wandPct: 25,
    allDmgPct: 0, allCritPct: 0, arcaneExtraCrit: 0, abFblExtraCrit: 0,
    fireExtraCrit: 0, fireDmgPct: 0, wrathCastReduce: 0, frostCastReduce: 0, frostDmgPct: 0, rWand: 2
  };
  const rawIntel = baseIntel / 1.06;
  const intel = Math.round(rawIntel * (1 + tm.intPct));
  const intDeltaFromTalent = intel - baseIntel;
  const critPct = baseCritPct + tm.allCritPct + (intDeltaFromTalent * 0.03);

  const totalArcSp = genSp + arcOnlySp;
  const deltaArc = totalArcSp - 168;
  const deltaGen = genSp - 101;
  const deltaSta = sta - 53;
  const deltaInt = intel - 127;
  const swMightHp = hastePct >= 15 ? 300 : 0; // 스톰윈드의 힘 (+300 HP · 15% 가속)
  const estMaxHp = 850 + deltaSta * 10 + swMightHp;
  const estMaxMp = 2358 + deltaInt * 15;
  const wrathMpBonus = estMaxMp * 0.05;
  const abStep = intel * 0.12;
  const hasteMul = 1 + hastePct / 100;
  const allMul = 1 + tm.allDmgPct;
  const critMul = 1 + (critPct / 100) * 0.5;
  const arcCritMul = (extraCrit = 0) => 1 + ((critPct + extraCrit) / 100) * tm.arcaneCritBonus;
  const fireCritMul = (extraCrit = 0) => 1 + ((critPct + extraCrit) / 100) * 0.5;
  const frostCritMul = 1 + (critPct / 100) * tm.frostCritBonus;

  // KPI outputs
  const tickRegen = 13 + spi / 4;
  const outCastMp5 = Math.round((tickRegen * 2.5) * 10) / 10;
  const combatKeep = Math.min(1, med + mageArmor);
  const combatMp5 = outCastMp5 * combatKeep;
  const effGcd = Math.max(1.0, 1.5 / hasteMul);
  const effWand = 1.3 / hasteMul; // 땅거미 마법봉 1.30초 (15% 가속 시 1.13초)

  const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  setTxt('outStaInt', `${Math.round(estMaxHp).toLocaleString()} HP / ${Math.round(estMaxMp).toLocaleString()} MP`);
  setTxt('outStaIntSub', `체력 ${sta}${swMightHp ? ' (+스톰힘 300)' : ''} · 지능 ${intel}${intDeltaFromTalent ? ` (특성 ${intDeltaFromTalent > 0 ? '+' : ''}${intDeltaFromTalent})` : ''} · 비전 SP +${totalArcSp}`);
  setTxt('outIntScale', `+${abStep.toFixed(1)} ~ +${(abStep*4).toFixed(1)} SP`);
  setTxt('outIntCritSub', `비작 1중 +${abStep.toFixed(1)}(전학파) · 비격 마나5% +${Math.round(wrathMpBonus)} SP`);
  setTxt('outSpiRegen', `MP5 ${outCastMp5.toFixed(1)} (2s ${(outCastMp5/2.5).toFixed(1)})`);
  setTxt('outSpiCombat', `시전 중 MP5 ${combatMp5.toFixed(1)} (${Math.round(combatKeep*100)}% 유지)`);
  setTxt('outHasteGcd', `GCD ${effGcd.toFixed(2)}s`);
  setTxt('outHasteCap', `땅거미 쿨 ${effWand.toFixed(2)}s · 하한 1.00s`);

  if (typeof renderTalentImpactSummary === 'function') renderTalentImpactSummary();

  // Representative skill live damage & DPS table
  const tbody = document.getElementById('charSkillDpsBody');
  if (tbody) {
    const ab0 = (156.5 + deltaArc * 0.4286) * allMul;
    const ab1 = (156.5 + deltaArc * 0.4286 + abStep * 0.4286) * allMul;
    const awDmg = ((292.5 + deltaArc) + wrathMpBonus) * allMul;
    const amDmg = (583.0 + deltaArc) * allMul;
    const amPer = amDmg / 5;
    const fblDmg = (206.3 + deltaGen * 0.4286) * allMul * (1 + tm.fireDmgPct);
    const aeDmg = (125.0 + deltaArc * 0.1429) * allMul;
    const wandDmg = 33.5 * (1 + tm.wandPct / 100);
    const wandMin = Math.round(23 * (1 + tm.wandPct / 100));
    const wandMax = Math.round(44 * (1 + tm.wandPct / 100));
    const fb1Dmg = (53.2 + deltaGen * 0.33) * allMul * (1 + tm.frostDmgPct);

    const skills = [
      { name: '비전 작렬 (2 레벨 · 0→1중)', cast: 1.5 / hasteMul, dmg: ab0, mul: arcCritMul(tm.abFblExtraCrit), dmgText: `<strong>~${Math.round(ab0)}</strong> → ~${Math.round(ab1)}` },
      { name: '비전 격노 (1 레벨)', cast: Math.max(1.0, 3.5 - tm.wrathCastReduce) / hasteMul, dmg: awDmg, mul: arcCritMul(0), dmgText: `<strong>~${Math.round(awDmg)}</strong>` },
      { name: '신비한 화살 (4 레벨)', cast: 5.0 / hasteMul, dmg: amDmg, mul: arcCritMul(0), dmgText: `<strong>${Math.round(amDmg)}</strong> <em style="font-size:11px;opacity:0.82;">(발당 ~${amPer.toFixed(1)})</em>` },
      { name: '신비한 화살 (화살 탄막)', cast: 2.5 / hasteMul, dmg: amDmg, mul: arcCritMul(0), dmgText: `<strong>${Math.round(amDmg)}</strong> <em style="font-size:11px;opacity:0.82;">(발당 ~${amPer.toFixed(1)})</em>` },
      { name: '화염 작렬 (4 레벨)', cast: effGcd, dmg: fblDmg, mul: fireCritMul(tm.abFblExtraCrit + tm.fireExtraCrit), dmgText: `<strong>~${Math.round(fblDmg)}</strong>` },
      { name: '신비한 폭발 (3 레벨 · 광역)', cast: effGcd, dmg: aeDmg, mul: arcCritMul(tm.arcaneExtraCrit), dmgText: `~${Math.round(aeDmg)} <em style="font-size:11px;opacity:0.82;">/ 대상</em>` },
      { name: `땅거미 마법봉 (전문화 ${tm.rWand}/2)`, cast: 1.3 / hasteMul, dmg: wandDmg, mul: critMul, dmgText: `~${wandDmg.toFixed(1)} <em style="font-size:11px;opacity:0.82;">(${wandMin}-${wandMax})</em>` },
      { name: '얼음 화살 (1 레벨)', cast: Math.max(1.0, 1.5 - tm.frostCastReduce) / hasteMul, dmg: fb1Dmg, mul: frostCritMul, dmgText: `~${Math.round(fb1Dmg)}` }
    ];
    tbody.innerHTML = skills.map(s => {
      const expDps = (s.dmg * s.mul) / s.cast;
      return `<tr>
        <td data-label="대표 스킬"><strong>${s.name}</strong></td>
        <td data-label="시전">${s.cast.toFixed(2)}초</td>
        <td data-label="노크리 피해">${s.dmgText}</td>
        <td data-label="기대 DPS"><span class="dps-pill">${expDps.toFixed(1)} DPS</span></td>
      </tr>`;
    }).join('');
  }

  // Interactive Stat Insights
  const ins = document.getElementById('charInsightsMount');
  if (ins) {
    const comboMana = 140 + 92 + 235 + 165; // 632 (비격+비작2+신화3+화작4)
    const comboManaBar = 140 + 92 + 0 + 165; // 397 (탄막)
    const castsNormal = (estMaxMp / comboMana).toFixed(1);
    const castsBar = (estMaxMp / comboManaBar).toFixed(1);
    const frostLossAm = Math.round(arcOnlySp * 1.0);
    const frostLossFbl = Math.round(arcOnlySp * 0.4286);
    const critGain = ((critMul - 1) * 100).toFixed(1);
    ins.innerHTML = `
      <div class="insight-box">
        <div class="ins-t">💡 +10 지능의 실제 복합 가치</div>
        마나 <strong>+150</strong> · 비작 중첩당 <strong>+1.2 SP</strong>(4중 +4.8) · 비전 격노 마나 5% <strong>+7.5 SP</strong> · 치명 <strong>+0.17%</strong> 동시 상승!
      </div>
      <div class="insight-box">
        <div class="ins-t">❄️ 비전 전용(+${arcOnlySp}) &rarr; 냉기/타계열 전환 시 손실</div>
        100% 계수 주문 <strong>-${frostLossAm} 피해</strong>, 42.9% 주문 <strong>-${frostLossFbl} 피해</strong> 손실 &rarr; 일반 주문력(<strong>+${genSp}</strong>) 비중이 <strong>${Math.round((genSp/Math.max(1,totalArcSp))*100)}%</strong>로 우수!
      </div>
      <div class="insight-box">
        <div class="ins-t">🔋 현재 마나(${Math.round(estMaxMp).toLocaleString()}) 콤보 지속력</div>
        비격+비작2+신화3+화작4 기준 일반 <strong>${castsNormal}회</strong> / 탄막 프록 <strong>${castsBar}회</strong> 연속 시전 가능 (치명 기댓값 <strong>+${critGain}%</strong>).
      </div>
    `;
  }
}

function updateStatCalc() { updateCharStatLab(); }

window.addEventListener('resize', () => {
  if (!isDrawerMode()) closeDrawer();
});

window.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  } else if (e.key === 'Escape') {
    closeDrawer();
    hideWowTooltip();
  }
});


/* ===== UPGRADE v3.9: INDIVIDUAL MATERIAL PRICE TREND LINE CHARTS ===== */

function selectTailorStage(idx) {
  const stepper = document.getElementById('tailorStepper');
  if (!stepper) return;
  stepper.querySelectorAll('.tailor-step').forEach(btn => {
    const stage = Number(btn.dataset.tstage);
    const active = stage === idx;
    const passed = stage < idx;
    btn.classList.toggle('active', active);
    btn.classList.toggle('passed', passed);
    btn.setAttribute('aria-expanded', active ? 'true' : 'false');
  });
  document.querySelectorAll('.tailor-tl-panel').forEach(panel => {
    panel.classList.toggle('active', Number(panel.dataset.tstage) === idx);
  });
}

function formatChartSilver(val, compact) {
  const fmt1 = (n) => {
    const f = Math.floor(n * 10 + 1e-9) / 10;
    return Number.isInteger(f) ? String(f) : f.toFixed(1);
  };
  if (val >= 1000) return compact ? `${Math.floor(val / 100 + 1e-9)}G` : `${fmt1(val / 100)}G`;
  if (val >= 100) return `${fmt1(val / 100)}G`;
  if (val < 1) {
    const c = Math.floor((val * 100 + 1e-9) / 10) * 10;
    return `${c}c`;
  }
  return compact && val >= 10 ? `${Math.floor(val + 1e-9)}s` : `${fmt1(val)}s`;
}

function renderPriceChartsInto(mountId, historyArr) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const W = 284, H = 118, padL = 44, padR = 16, padT = 20, padB = 24;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  mount.innerHTML = historyArr.map(m => {
    const pts = m.points;
    const vals = pts.map(p => p.v);
    const cur = vals[vals.length - 1];
    const prev = vals.length > 1 ? vals[vals.length - 2] : cur;
    const diff = cur - prev;
    const pct = prev > 0 ? (diff / prev) * 100 : 0;
    const dCls = diff < -0.005 ? 'down' : (diff > 0.005 ? 'up' : 'flat');
    const dTxt = pts.length === 1 ? '11/22 기준' : (Math.abs(diff) < 0.005 ? '보합' : `${diff > 0 ? '▲' : '▼'}${Math.abs(pct).toFixed(0)}%`);

    let minV = Math.min(...vals), maxV = Math.max(...vals);
    if (maxV - minV < 0.2) { minV = Math.max(0, minV - 0.5); maxV = maxV + 0.5; }
    else {
      const margin = (maxV - minV) * 0.24;
      minV = Math.max(0, minV - margin);
      maxV = maxV + margin;
    }

    const coords = pts.map((p, i) => {
      const x = pts.length === 1 ? padL + plotW / 2 : padL + (i / (pts.length - 1)) * plotW;
      const y = padT + plotH - ((p.v - minV) / (maxV - minV)) * plotH;
      return { x, y, d: p.d, v: p.v };
    });

    const poly = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const midV = (minV + maxV) / 2;
    const yTicks = [maxV, midV, minV].map((val, idx) => {
      const yy = padT + (idx / 2) * plotH;
      return `<line class="pchart-gridline" x1="${padL}" y1="${yy.toFixed(1)}" x2="${W - padR}" y2="${yy.toFixed(1)}"/><text class="pchart-axis-lbl" x="${padL - 5}" y="${(yy + 3.5).toFixed(1)}" text-anchor="end">${formatChartSilver(val, true)}</text>`;
    }).join('');

    const dotsAndLabels = coords.map((c, idx) => {
      const anchor = pts.length === 1 ? 'middle' : (idx === 0 ? 'start' : (idx === coords.length - 1 ? 'end' : 'middle'));
      const vFmt = formatChartSilver(c.v, c.v >= 100);
      return `<circle class="pchart-dot" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="4.2" fill="${m.color}"><title>${m.name} (${c.d}): ${formatChartSilver(c.v, false)}</title></circle>` +
        `<text class="pchart-val-lbl" x="${c.x.toFixed(1)}" y="${(c.y - 8).toFixed(1)}" text-anchor="${anchor}">${vFmt}</text>` +
        `<text class="pchart-axis-lbl" x="${c.x.toFixed(1)}" y="${H - 5}" text-anchor="${anchor}">${c.d}</text>`;
    }).join('');

    return `<div class="pchart-card">
      <div class="pchart-head">
        <div class="pchart-title"><code>${m.name}</code></div>
        <div class="pchart-now"><span>${formatChartSilver(cur, false)}</span><span class="pchart-delta ${dCls}">${dTxt}</span></div>
      </div>
      <svg class="pchart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="${m.name} 시세 추이">
        ${yTicks}
        <polyline class="pchart-line" stroke="${m.color}" points="${poly}"/>
        ${dotsAndLabels}
      </svg>
    </div>`;
  }).join('');

  if (typeof hydrateWowTooltipsIn === 'function') hydrateWowTooltipsIn(mount);
}

function renderMatPriceCharts() {
  renderPriceChartsInto('matPriceChartGrid', MAT_PRICE_HISTORY);
  renderPriceChartsInto('tailoringPriceChartGrid', TAILORING_PRICE_HISTORY);
  if (typeof FAVOR_MAT_PRICE_HISTORY !== 'undefined') renderPriceChartsInto('favorMatPriceChartGrid', FAVOR_MAT_PRICE_HISTORY);
}

/* ===== DISMISSIBLE INSTANCE Q&A / MEMO TOGGLES (v4.1) ===== */
function getDismissedNotesMap() {
  try {
    return JSON.parse(safeStorageGet('wowf_dismissed_notes_v1', '{}') || '{}') || {};
  } catch (e) {
    return {};
  }
}

function syncDismissedRestoreBars() {
  const dismissed = getDismissedNotesMap();
  document.querySelectorAll('.dismissed-restore-bar[data-restore-bar]').forEach(bar => {
    const scope = bar.getAttribute('data-restore-bar');
    const nodes = Array.from(document.querySelectorAll(`details.dismissible-fold[data-restore-scope="${scope}"]`));
    const hiddenCount = nodes.filter(el => !!dismissed[el.getAttribute('data-dismiss-id')]).length;
    if (hiddenCount > 0) {
      bar.hidden = false;
      bar.innerHTML = `<span>숨긴 일회성 메모 ${hiddenCount}개</span><button type="button" class="dismissed-restore-btn" onclick="restoreDismissedNotes('${scope}')">↺ 다시 보기</button>`;
    } else {
      bar.hidden = true;
      bar.innerHTML = '';
    }
  });
}

function dismissFoldNote(ev, dismissId) {
  if (ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  if (!dismissId) return;
  const dismissed = getDismissedNotesMap();
  dismissed[dismissId] = true;
  safeStorageSet('wowf_dismissed_notes_v1', JSON.stringify(dismissed));
  document.querySelectorAll(`details.dismissible-fold[data-dismiss-id="${dismissId}"]`).forEach(el => {
    el.classList.add('is-dismissing');
    setTimeout(() => {
      el.classList.add('is-dismissed');
      el.classList.remove('is-dismissing');
      syncDismissedRestoreBars();
    }, 180);
  });
}

function restoreDismissedNotes(scope) {
  const dismissed = getDismissedNotesMap();
  document.querySelectorAll(`details.dismissible-fold[data-restore-scope="${scope}"]`).forEach(el => {
    const id = el.getAttribute('data-dismiss-id');
    if (id && dismissed[id]) delete dismissed[id];
    el.classList.remove('is-dismissed', 'is-dismissing');
    el.open = false;
  });
  safeStorageSet('wowf_dismissed_notes_v1', JSON.stringify(dismissed));
  syncDismissedRestoreBars();
}

function initDismissibleFolds() {
  const dismissed = getDismissedNotesMap();
  document.querySelectorAll('details.dismissible-fold[data-dismiss-id]').forEach(el => {
    const id = el.getAttribute('data-dismiss-id');
    if (id && dismissed[id]) {
      el.classList.add('is-dismissed');
    }
  });
  syncDismissedRestoreBars();
}

/* ===== CUTE RECENTLY UPDATED MENU "N" BADGE (CLICK TO DISMISS) ===== */
// 대시보드 메뉴 수정 시 최근 업데이트된 탭 ID와 버전(v)을 갱신하면
// 사이드바(.nav-btn) 및 모바일 퀵탭(.q-pill) 메뉴 제목 우측 위에 귀여운 N 뱃지가 표시되며,
// 사용자가 해당 메뉴(또는 N 마크)를 클릭하면 사라지고 같은 버전에서는 다시 뜨지 않습니다.

const CUTE_N_BADGE_SVG = `<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="1" y="1" width="18" height="18" rx="6.5" fill="#ff4b6e"/><path d="M6.4 13.8V6.2L13.6 13.8V6.2" fill="none" stroke="#ffffff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function getSeenUpdateMap() {
  try {
    return JSON.parse(safeStorageGet('wowf_seen_updates_v1', '{}') || '{}') || {};
  } catch (e) {
    return {};
  }
}

function isTabUpdateUnseen(tabId) {
  const info = RECENTLY_UPDATED_TABS[tabId];
  if (!info) return false;
  const seen = getSeenUpdateMap();
  return seen[tabId] !== info.v;
}

function syncMobileFabDot() {
  const fab = document.getElementById('mobileMenuFab');
  if (!fab) return;
  const anyUnseen = Object.keys(RECENTLY_UPDATED_TABS).some(isTabUpdateUnseen);
  fab.classList.toggle('has-unseen', anyUnseen);
}

function dismissNavUpdatedBadge(tabId) {
  const info = RECENTLY_UPDATED_TABS[tabId];
  if (!info) return;
  const seen = getSeenUpdateMap();
  if (seen[tabId] !== info.v) {
    seen[tabId] = info.v;
    safeStorageSet('wowf_seen_updates_v1', JSON.stringify(seen));
  }
  document.querySelectorAll(`.nav-btn[data-tab="${tabId}"] .nav-new-badge, .q-pill[data-tab="${tabId}"] .nav-new-badge`).forEach(badge => {
    badge.classList.add('dismissing');
    setTimeout(() => badge.remove(), 170);
  });
  syncMobileFabDot();
}

function createCuteNBadge(tabId, summary) {
  const badge = document.createElement('span');
  badge.className = 'nav-new-badge';
  badge.innerHTML = CUTE_N_BADGE_SVG;
  badge.setAttribute('aria-label', '최근 업데이트');
  badge.title = summary + ' (클릭하면 사라짐)';
  badge.addEventListener('click', ev => {
    ev.stopPropagation();
    dismissNavUpdatedBadge(tabId);
  });
  return badge;
}

function applyNavUpdatedBadges() {
  document.querySelectorAll('.nav-new-badge').forEach(el => el.remove());

  // 1) 사이드바 메뉴 제목 우측 위
  document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
    const tabId = btn.getAttribute('data-tab');
    const show = isTabUpdateUnseen(tabId);
    const titleSpan = btn.querySelector('span:first-child');
    if (!titleSpan) return;
    titleSpan.classList.toggle('nav-title-wrap', show);
    if (!show) return;
    titleSpan.appendChild(createCuteNBadge(tabId, RECENTLY_UPDATED_TABS[tabId].text));
  });

  // 2) 모바일/좁은 화면 상단 퀵탭 메뉴 제목 우측 위
  document.querySelectorAll('.q-pill[data-tab]').forEach(pill => {
    const tabId = pill.getAttribute('data-tab');
    if (!isTabUpdateUnseen(tabId)) return;
    pill.appendChild(createCuteNBadge(tabId, RECENTLY_UPDATED_TABS[tabId].text));
  });
  syncMobileFabDot();
}

function toggleAllProfMenus() {
  const stack = document.getElementById('profFoldStack');
  if (!stack) return;
  const folds = Array.from(stack.querySelectorAll(':scope > details.fold-card:not(.is-dismissed)'));
  const anyClosed = folds.some(d => !d.open);
  folds.forEach(d => { d.open = anyClosed; });
}

function toggleAllRuleMenus() {
  const stack = document.getElementById('rulesFoldStack');
  if (!stack) return;
  const folds = Array.from(stack.querySelectorAll(':scope > details.fold-card'));
  const anyClosed = folds.some(d => !d.open);
  folds.forEach(d => { d.open = anyClosed; });
}

function bootDashboard() {
  if (window.__wowfBooted) return;
  window.__wowfBooted = true;
  const notice = document.getElementById('jsBlockedNotice');
  if (notice) notice.style.display = 'none';

  const runSafe = (name, fn) => {
    try { if (typeof fn === 'function') fn(); }
    catch (err) { try { console.warn('[WoWF Init]', name, err); } catch (e) {} }
  };

  if (safeStorageGet('wowf_sidebar_collapsed', '0') === '1' && !isDrawerMode()) {
    document.body.classList.add('sidebar-collapsed');
  }
  runSafe('injectTableLabels', injectTableLabels);
  runSafe('initAutoHideHeader', initAutoHideHeader);
  runSafe('initMemphisTheme', typeof initMemphisTheme === 'function' ? initMemphisTheme : null);
  runSafe('applyNavUpdatedBadges', applyNavUpdatedBadges);
  runSafe('renderInGameTalentTrees', renderInGameTalentTrees);
  runSafe('updateCharStatLab', updateCharStatLab);
  runSafe('updateAllSim', updateAllSim);
  runSafe('applyWowItemMeta', applyWowItemMeta);
  runSafe('hydrateWowTooltips', hydrateWowTooltips);
  runSafe('initWowTooltipEvents', initWowTooltipEvents);
  runSafe('applyTableMode', applyTableMode);
  runSafe('syncFilterDrawersForWidth', syncFilterDrawersForWidth);
  runSafe('updateCalc', updateCalc);
  runSafe('updateStatCalc', updateStatCalc);
  runSafe('initInteractiveMap', initInteractiveMap);
  runSafe('initMicroMap', initMicroMap);
  runSafe('initQuestChecks', initQuestChecks);
  runSafe('renderMatPriceCharts', renderMatPriceCharts);
  runSafe('initDismissibleFolds', initDismissibleFolds);

  const saved = safeStorageGet('wowf_active_tab_v2', null);
  if (saved && document.getElementById(saved)) {
    runSafe('openTab', () => openTab(saved, null, { silent: true }));
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootDashboard);
} else {
  bootDashboard();
}
