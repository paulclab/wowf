/* WoW Forever Tooltip Engine — Unified DB Assembly, Auto-Hydration & Hover Renderer */
const WOW_ICON_BASE = 'https://wow.zamimg.com/images/wow/icons/large/';

const WOW_DB = Object.assign(
  {},
  typeof WOW_DB_SKILLS !== 'undefined' ? WOW_DB_SKILLS : {},
  typeof WOW_DB_TALENTS !== 'undefined' ? WOW_DB_TALENTS : {},
  typeof WOW_DB_ITEMS !== 'undefined' ? WOW_DB_ITEMS : {}
);

function applyWowItemMeta() {
  // Unified into WOW_DB_ITEMS / WOW_DB_SKILLS / WOW_DB_TALENTS
}


function resolveWowEntry(key) {
  if (ADDON_DB && ADDON_DB[key]) return { key, ...ADDON_DB[key] };
  let e = WOW_DB[key];
  let guard = 0;
  while (e && e.alias && guard++ < 4) {
    key = e.alias;
    e = WOW_DB[key];
  }
  return e ? { key, ...e } : null;
}

const WOW_MATCH_KEYS = Object.keys(WOW_DB).sort((a, b) => b.length - a.length);
const WOW_MATCH_REGEX = new RegExp(
  '(' + WOW_MATCH_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
  'g'
);

function hydrateWowTooltipsIn(rootEl) {
  if (!rootEl) return;
  const SKIP_SELECTOR = 'pre, script, style, svg, button, a, input, select, textarea, .wow-ref, .addon-title-ref, .t-node, .ig-talent-frame, .equip-slot, .seq-chips, .seq-controls, .map-viewport, .map-float-controls';
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p || p.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      WOW_MATCH_REGEX.lastIndex = 0;
      return WOW_MATCH_REGEX.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const textNodes = [];
  let cur;
  while ((cur = walker.nextNode())) textNodes.push(cur);
  textNodes.forEach(node => {
    const text = node.nodeValue;
    WOW_MATCH_REGEX.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIdx = 0;
    let m;
    while ((m = WOW_MATCH_REGEX.exec(text)) !== null) {
      if (m.index > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
      const matched = m[0];
      let skipMatch = false;
      if (matched === '연구') {
        const tail = text.slice(m.index);
        if (!(text.trim() === '연구' || tail.startsWith('연구 /') || tail.startsWith('연구('))) skipMatch = true;
      } else if (matched === '변이' && text.slice(m.index + matched.length).startsWith('된')) skipMatch = true;
      else if (matched === '마법부여' && (text.slice(m.index + matched.length).startsWith('점') || text.slice(m.index + matched.length).startsWith('사'))) skipMatch = true;
      else if (matched === '낚시' && text.slice(m.index + matched.length).startsWith(' 선반')) skipMatch = true;
      const entry = skipMatch ? null : resolveWowEntry(matched);
      if (entry) {
        const span = document.createElement('span');
        span.className = `wow-ref q-${entry.quality}`;
        span.setAttribute('data-wow', entry.key);
        span.setAttribute('tabindex', '0');
        const img = document.createElement('img');
        img.className = 'wow-ico-inline';
        img.src = WOW_ICON_BASE + entry.icon + '.jpg';
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function() { this.style.display = 'none'; };
        span.appendChild(img);
        span.appendChild(document.createTextNode(matched));
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(matched));
      }
      lastIdx = m.index + matched.length;
    }
    if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
    const parentDisp = node.parentElement ? getComputedStyle(node.parentElement).display : '';
    if (parentDisp.includes('flex')) {
      const wrap = document.createElement('span');
      wrap.className = 'wow-flex-flow';
      wrap.appendChild(frag);
      node.parentNode.replaceChild(wrap, node);
    } else {
      node.parentNode.replaceChild(frag, node);
    }
  });
}

function hydrateWowTooltips() {
  const mainEl = document.querySelector('main');
  if (!mainEl) return;

  // 1. Upgrade visual talent tree tiles (.t-node) with 30x30 in-game icons + hover tooltip
  mainEl.querySelectorAll('.talent-tree-grid .t-node').forEach(node => {
    const nameEl = node.querySelector('.t-name');
    if (!nameEl) return;
    const rawName = nameEl.textContent.trim();
    const entry = resolveWowEntry(rawName);
    if (!entry) return;
    node.setAttribute('data-wow', entry.key);
    node.setAttribute('tabindex', '0');
    if (!node.querySelector('.t-node-ico')) {
      const head = document.createElement('div');
      head.className = 't-node-head';
      const img = document.createElement('img');
      img.className = 't-node-ico';
      img.src = WOW_ICON_BASE + entry.icon + '.jpg';
      img.alt = entry.key;
      img.loading = 'lazy';
      img.onerror = function() { this.style.display = 'none'; };
      const textWrap = document.createElement('div');
      const tierEl = node.querySelector('.t-tier-tag');
      if (tierEl) textWrap.appendChild(tierEl);
      textWrap.appendChild(nameEl);
      head.appendChild(img);
      head.appendChild(textWrap);
      node.insertBefore(head, node.firstChild);
    }
  });

  // 2. Walk text nodes in main (excluding code blocks, scripts, svgs, buttons, links, talent tiles)
  const SKIP_SELECTOR = 'pre, script, style, svg, button, a, input, select, textarea, .wow-ref, .t-node, .ig-talent-frame, .equip-slot, .seq-chips, .seq-controls, .map-viewport, .map-float-controls';
  const walker = document.createTreeWalker(mainEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p || p.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      WOW_MATCH_REGEX.lastIndex = 0;
      return WOW_MATCH_REGEX.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes = [];
  let cur;
  while ((cur = walker.nextNode())) textNodes.push(cur);

  textNodes.forEach(node => {
    const text = node.nodeValue;
    WOW_MATCH_REGEX.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIdx = 0;
    let m;
    while ((m = WOW_MATCH_REGEX.exec(text)) !== null) {
      if (m.index > lastIdx) {
        frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
      }
      const matched = m[0];
      // Context guard to prevent false-positive substring matches (e.g. '타락에 대한 연구', '변이된')
      let skipMatch = false;
      if (matched === '연구') {
        const tail = text.slice(m.index);
        const trimmed = text.trim();
        if (!(trimmed === '연구' || tail.startsWith('연구 /') || tail.startsWith('연구('))) {
          skipMatch = true;
        }
      } else if (matched === '변이') {
        if (text.slice(m.index + matched.length).startsWith('된')) skipMatch = true;
      } else if (matched === '마법부여') {
        const after = text.slice(m.index + matched.length);
        if (after.startsWith('점') || after.startsWith('사')) skipMatch = true;
      } else if (matched === '낚시') {
        const after = text.slice(m.index + matched.length);
        if (after.startsWith(' 선반')) skipMatch = true;
      }
      const entry = skipMatch ? null : resolveWowEntry(matched);
      if (entry) {
        const span = document.createElement('span');
        span.className = `wow-ref q-${entry.quality}`;
        span.setAttribute('data-wow', entry.key);
        span.setAttribute('tabindex', '0');

        const img = document.createElement('img');
        img.className = 'wow-ico-inline';
        img.src = WOW_ICON_BASE + entry.icon + '.jpg';
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function() { this.style.display = 'none'; };

        span.appendChild(img);
        span.appendChild(document.createTextNode(matched));
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(matched));
      }
      lastIdx = m.index + matched.length;
    }
    if (lastIdx < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
    }
    const parentDisp = node.parentElement ? getComputedStyle(node.parentElement).display : '';
    if (parentDisp.includes('flex')) {
      const wrap = document.createElement('span');
      wrap.className = 'wow-flex-flow';
      wrap.appendChild(frag);
      node.parentNode.replaceChild(wrap, node);
    } else {
      node.parentNode.replaceChild(frag, node);
    }
  });
}

let activeWowTarget = null;

function renderWowTooltip(entry) {
  const tip = document.getElementById('wowTooltip');
  if (!tip || !entry) return;
  tip.className = `wt-${entry.quality}`;

  let html = `<div class="wt-head">
    <img class="wt-icon" src="${WOW_ICON_BASE}${entry.icon}.jpg" alt="" onerror="this.style.display='none'">
    <div class="wt-title-wrap">
      <div class="wt-name">${escapeHtml(entry.key)}</div>
      <div class="wt-sub"><span>${escapeHtml(entry.en || '')}</span><span class="wt-kind">${escapeHtml(entry.kind || '')}</span></div>
    </div>
  </div>`;

  if (entry.bind) {
    const b = entry.bind;
    const bCls = b.includes('상인') ? 'vendor'
      : (b.includes('교관') || b.includes('전문기술') ? 'train'
      : (b.includes('착용 시') || b.includes('BoE') ? 'boe'
      : (b.includes('획득 시') || b.includes('BoP') || b.includes('창조') ? 'bop' : 'trade')));
    html += `<div class="wt-bind ${bCls}">${escapeHtml(b)}</div>`;
  }

  if (entry.rows && entry.rows.length) {
    html += entry.rows.map(([l, r]) =>
      `<div class="wt-row"><span>${escapeHtml(l || '')}</span><span class="r">${escapeHtml(r || '')}</span></div>`
    ).join('');
  }
  if (entry.stats && entry.stats.length) {
    html += `<div class="wt-stats">${entry.stats.map(s => `<div>${escapeHtml(s)}</div>`).join('')}</div>`;
  }
  if (entry.effects && entry.effects.length) {
    html += `<div class="wt-effects">${entry.effects.map(ef => `<div>${escapeHtml(ef)}</div>`).join('')}</div>`;
  }
  if (entry.desc) {
    html += `<div class="wt-desc">${escapeHtml(entry.desc)}</div>`;
  }
  if (entry.compare) {
    const cmp = entry.compare;
    html += `<div class="wt-cmp"><div class="wt-cmp-head">아이템 교체 시 나타나는 변화:</div>`;
    if (cmp.equipped) html += `<div class="wt-cmp-sub">(${escapeHtml(cmp.equipped)} 교체 시)</div>`;
    (cmp.deltas || []).forEach(d => {
      const cls = d.type === 'pos' ? 'wt-cmp-pos' : (d.type === 'neg' ? 'wt-cmp-neg' : 'wt-cmp-neu');
      html += `<div class="${cls}">${escapeHtml(d.v)}</div>`;
    });
    html += `</div>`;
  }

  const metaRows = [];
  if (entry.source) metaRows.push(['획득처', entry.source, '']);
  if (entry.vendorPrice) {
    metaRows.push(['상점가', entry.vendorPrice, 'price-vendor']);
  } else if (entry.ahPrice) {
    metaRows.push(['경매 시세', entry.ahPrice, 'price-ah']);
  }
  if (entry.craftCost) metaRows.push(['제작 원가', entry.craftCost, 'price-craft']);
  if (entry.favorPrice) metaRows.push(['호의 구매', entry.favorPrice, 'price-favor']);
  if (entry.enchantable) metaRows.push(['마부/키트', entry.enchantable, '']);
  if (metaRows.length) {
    html += `<div class="wt-meta-box">${metaRows.map(([k, v, cls]) =>
      `<div class="wt-meta-row"><span class="wt-meta-k">${escapeHtml(k)}</span><span class="wt-meta-v ${cls}">${escapeHtml(v)}</span></div>`
    ).join('')}</div>`;
  }

  if (entry.note) {
    html += `<div class="wt-note">${escapeHtml(entry.note)}</div>`;
  }

  tip.innerHTML = html;
  tip.setAttribute('aria-hidden', 'false');
  tip.classList.add('show');
}

function positionWowTooltip(clientX, clientY, anchorRect) {
  const tip = document.getElementById('wowTooltip');
  if (!tip) return;
  const pad = 12;
  const tw = tip.offsetWidth || 320;
  const th = tip.offsetHeight || 160;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = (clientX != null ? clientX + 16 : (anchorRect ? anchorRect.left : 20));
  let y = (clientY != null ? clientY + 18 : (anchorRect ? anchorRect.bottom + 8 : 20));

  if (x + tw + pad > vw) {
    x = clientX != null ? clientX - tw - 16 : vw - tw - pad;
  }
  if (x < pad) x = pad;

  if (y + th + pad > vh) {
    y = clientY != null ? clientY - th - 16 : (anchorRect ? anchorRect.top - th - 8 : vh - th - pad);
  }
  if (y < pad) y = pad;

  tip.style.left = `${Math.round(x)}px`;
  tip.style.top = `${Math.round(y)}px`;
}

function hideWowTooltip() {
  const tip = document.getElementById('wowTooltip');
  if (!tip) return;
  tip.classList.remove('show');
  tip.setAttribute('aria-hidden', 'true');
  activeWowTarget = null;
}

function initWowTooltipEvents() {
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-wow]');
    if (!el || el === activeWowTarget) return;
    const entry = resolveWowEntry(el.getAttribute('data-wow'));
    if (!entry) return;
    activeWowTarget = el;
    renderWowTooltip(entry);
    positionWowTooltip(e.clientX, e.clientY, el.getBoundingClientRect());
  });

  document.addEventListener('mousemove', e => {
    if (!activeWowTarget) return;
    positionWowTooltip(e.clientX, e.clientY);
  });

  document.addEventListener('mouseout', e => {
    if (!activeWowTarget) return;
    const related = e.relatedTarget;
    if (related && activeWowTarget.contains(related)) return;
    const next = related ? related.closest?.('[data-wow]') : null;
    if (!next) hideWowTooltip();
  });

  document.addEventListener('focusin', e => {
    const el = e.target.closest('[data-wow]');
    if (!el) return;
    const entry = resolveWowEntry(el.getAttribute('data-wow'));
    if (!entry) return;
    activeWowTarget = el;
    renderWowTooltip(entry);
    positionWowTooltip(null, null, el.getBoundingClientRect());
  });

  document.addEventListener('focusout', e => {
    if (activeWowTarget && e.target.closest('[data-wow]') === activeWowTarget) {
      hideWowTooltip();
    closeCycleTip(true);
    }
  });

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-wow]');
    if (!el) { hideWowTooltip(); return; }
    const entry = resolveWowEntry(el.getAttribute('data-wow'));
    if (!entry) return;
    activeWowTarget = el;
    renderWowTooltip(entry);
    positionWowTooltip(null, null, el.getBoundingClientRect());
  });

  window.addEventListener('scroll', hideWowTooltip, { passive: true });
}
