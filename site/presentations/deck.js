// ============================================================
//  PO Toolkit — moteur de présentations interactives
//  Chaque <section class="slide"> porte data-title et data-chapter ;
//  <aside class="notes"> et <aside class="sources"> alimentent les panneaux.
// ============================================================
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safeGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } };

  const ICON = {
    left: '<path d="M15 6l-6 6 6 6"/>', right: '<path d="M9 6l6 6-6 6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    notes: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    book: '<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
    full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
  };
  const svg = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

  const STATIC = /[?&#]static/.test(location.search + location.hash);
  if (STATIC) document.documentElement.classList.add('static');
  const slides = $$('.slide');
  const deck = $('.deck');
  const stage = $('.stage');
  let cur = 0;

  // ---------- Theme ----------
  function setTheme(t, persist) {
    document.documentElement.setAttribute('data-theme', t);
    if (persist) safeSet('po-toolkit-theme', t);
    const b = $('#d-theme');
    if (b) b.innerHTML = svg(t === 'dark' ? 'sun' : 'moon');
  }
  const stored = safeGet('po-toolkit-theme');
  setTheme(stored === 'dark' || stored === 'light' ? stored : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), false);

  // ---------- Chrome ----------
  const chapterNames = [];
  slides.forEach(s => { const c = s.dataset.chapter || ''; if (!chapterNames.includes(c)) chapterNames.push(c); });
  const chrome = document.createElement('div');
  chrome.className = 'chrome';
  chrome.innerHTML = `
    <a class="home" href="../index.html#presentations" title="Retour au PO Toolkit"><span class="mark"><span></span></span><span class="label">PO Toolkit</span></a>
    <nav class="chapters" aria-label="Chapitres">
      ${chapterNames.map((c, i) => `<button data-ch="${i}" title="${c}"><span class="t">${c}</span><span class="bar"><span></span></span></button>`).join('')}
    </nav>
    <span class="count" id="d-count" aria-live="polite"></span>
    <div class="ctl">
      <button id="d-prev" aria-label="Diapositive précédente">${svg('left')}</button>
      <button id="d-next" aria-label="Diapositive suivante">${svg('right')}</button>
      <button id="d-grid" aria-label="Vue d'ensemble (O)" title="Vue d'ensemble (O)">${svg('grid')}</button>
      <button id="d-src" aria-label="Sources de la diapositive (S)" title="Sources (S)">${svg('book')}</button>
      <button id="d-notes" aria-label="Notes de l'orateur (N)" title="Notes (N)">${svg('notes')}</button>
      <button id="d-theme" aria-label="Changer de thème (T)" title="Thème (T)"></button>
      <button id="d-full" aria-label="Plein écran (F)" title="Plein écran (F)">${svg('full')}</button>
      <button id="d-help" aria-label="Raccourcis (?)" title="Raccourcis (?)">${svg('help')}</button>
    </div>`;
  document.body.appendChild(chrome);
  setTheme(document.documentElement.getAttribute('data-theme'), false);

  const drawer = document.createElement('div');
  drawer.className = 'drawer'; drawer.id = 'd-drawer'; drawer.setAttribute('role', 'dialog');
  document.body.appendChild(drawer);

  const overview = document.createElement('div');
  overview.className = 'overview'; overview.id = 'd-overview';
  let lastCh = null;
  overview.innerHTML = slides.map((s, i) => {
    const ch = s.dataset.chapter || '';
    const sep = ch !== lastCh ? `<div class="sep">${ch}</div>` : '';
    lastCh = ch;
    return `${sep}<button data-go="${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.dataset.title || ''}</span></button>`;
  }).join('');
  document.body.appendChild(overview);

  const help = document.createElement('div');
  help.className = 'help'; help.id = 'd-help-box';
  help.innerHTML = `<div class="box"><h4>Raccourcis</h4><dl>
    <dt><kbd>→</kbd> <kbd>Espace</kbd></dt><dd>Diapositive suivante</dd>
    <dt><kbd>←</kbd></dt><dd>Diapositive précédente</dd>
    <dt><kbd>Début</kbd> <kbd>Fin</kbd></dt><dd>Première / dernière</dd>
    <dt><kbd>O</kbd></dt><dd>Vue d'ensemble</dd>
    <dt><kbd>S</kbd></dt><dd>Sources de la diapositive</dd>
    <dt><kbd>N</kbd></dt><dd>Notes de l'orateur</dd>
    <dt><kbd>F</kbd></dt><dd>Plein écran</dd>
    <dt><kbd>T</kbd></dt><dd>Thème clair / sombre</dd>
    <dt><kbd>Échap</kbd></dt><dd>Fermer les panneaux</dd>
  </dl></div>`;
  document.body.appendChild(help);

  // ---------- Scaling ----------
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight;
    const k = Math.min((w - 32) / 1600, (h - 32) / 900);
    deck.style.transform = `scale(${Math.max(0.2, k)})`;
  }
  window.addEventListener('resize', fit);
  fit();

  // ---------- Navigation ----------
  let drawerMode = null;
  function renderDrawer() {
    const s = slides[cur];
    if (!drawerMode) { drawer.classList.remove('is-open'); return; }
    const src = s.querySelector(drawerMode === 'notes' ? '.notes' : '.sources');
    drawer.innerHTML = `<h4>${drawerMode === 'notes' ? "Notes de l'orateur" : 'Sources de la diapositive'}</h4>${src ? src.innerHTML : '<p>Rien pour cette diapositive.</p>'}`;
    drawer.classList.add('is-open');
    $('#d-notes').classList.toggle('is-on', drawerMode === 'notes');
    $('#d-src').classList.toggle('is-on', drawerMode === 'sources');
  }
  function toggleDrawer(mode) {
    drawerMode = drawerMode === mode ? null : mode;
    $('#d-notes').classList.toggle('is-on', drawerMode === 'notes');
    $('#d-src').classList.toggle('is-on', drawerMode === 'sources');
    renderDrawer();
  }

  function go(i, fromHash) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const prev = cur;
    slides.forEach((s, j) => {
      s.classList.toggle('is-active', j === i);
      s.classList.toggle('is-prev', j < i);
      s.setAttribute('aria-hidden', j === i ? 'false' : 'true');
      s.inert = j !== i;
    });
    cur = i;
    const s = slides[i];
    $('#d-count').textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    const chIdx = chapterNames.indexOf(s.dataset.chapter || '');
    $$('.chapters button').forEach((b, k) => {
      b.classList.toggle('is-on', k === chIdx);
      const inCh = slides.map((x, j) => [x, j]).filter(([x]) => (x.dataset.chapter || '') === chapterNames[k]);
      const done = inCh.filter(([, j]) => j <= i).length;
      b.querySelector('.bar span').style.width = `${Math.round(done / inCh.length * 100)}%`;
    });
    $$('#d-overview button').forEach(b => b.classList.toggle('is-on', Number(b.dataset.go) === i));
    document.title = `${s.dataset.title || ''} · ${document.body.dataset.deckTitle || 'Présentation'}`;
    if (!fromHash) history.replaceState(null, '', `#${i + 1}`);
    renderDrawer();
    if (prev !== i || !s.dataset.entered) {
      s.dataset.entered = '1';
      s.dispatchEvent(new CustomEvent('slide:enter', { bubbles: true }));
      animateCounters(s);
    }
  }
  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);

  function animateCounters(root) {
    $$('[data-count]', root).forEach(el => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const reduce = STATIC || matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t0 = performance.now(), dur = 1200;
      const step = t => {
        const p = reduce ? 1 : Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * e).toFixed(dec).replace('.', ',') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function toggleOverview(force) {
    const open = force ?? !overview.classList.contains('is-open');
    overview.classList.toggle('is-open', open);
    $('#d-grid').classList.toggle('is-on', open);
    if (open) { const b = overview.querySelector('button.is-on'); if (b) b.scrollIntoView({ block: 'center' }); }
  }
  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }

  chrome.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.ch) { const name = chapterNames[Number(b.dataset.ch)]; go(slides.findIndex(s => (s.dataset.chapter || '') === name)); }
    else if (b.id === 'd-prev') prev();
    else if (b.id === 'd-next') next();
    else if (b.id === 'd-grid') toggleOverview();
    else if (b.id === 'd-notes') toggleDrawer('notes');
    else if (b.id === 'd-src') toggleDrawer('sources');
    else if (b.id === 'd-theme') setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    else if (b.id === 'd-full') toggleFull();
    else if (b.id === 'd-help') help.classList.toggle('is-open');
  });
  overview.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) { go(Number(b.dataset.go)); toggleOverview(false); } });
  help.addEventListener('click', e => { if (e.target === help) help.classList.remove('is-open'); });
  document.addEventListener('click', e => { const g = e.target.closest('.slide [data-goto]'); if (g) go(Number(g.dataset.goto) - 1); });

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    const k = e.key;
    if (k === 'Escape') { toggleOverview(false); help.classList.remove('is-open'); drawerMode = null; renderDrawer(); $('#d-notes').classList.remove('is-on'); $('#d-src').classList.remove('is-on'); return; }
    if (typing && (k.startsWith('Arrow') || k === ' ' || k === 'Home' || k === 'End')) return;
    if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && t.tagName !== 'BUTTON')) { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
    else if (typing) return;
    else if (k === 'o' || k === 'O') toggleOverview();
    else if (k === 'n' || k === 'N') toggleDrawer('notes');
    else if (k === 's' || k === 'S') toggleDrawer('sources');
    else if (k === 'f' || k === 'F') toggleFull();
    else if (k === 't' || k === 'T') setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    else if (k === '?') help.classList.toggle('is-open');
  });

  // Swipe (ignored on interactive controls)
  let x0 = null;
  stage.addEventListener('touchstart', e => { x0 = e.target.closest('input, button, .no-swipe') ? null : e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    x0 = null;
  });

  window.addEventListener('hashchange', () => { const n = parseInt(location.hash.slice(1), 10); if (n && n - 1 !== cur) go(n - 1, true); });
  const start = parseInt(location.hash.slice(1), 10);
  go(Number.isFinite(start) ? start - 1 : 0, true);
  window.Deck = { go, next, prev, get index() { return cur; } };
})();
