// app-kit.js — thème partagé avec le site + barre de navigation commune.
// À charger dans <head> (synchrone) pour éviter le flash de thème.
(function () {
  var KEY = 'po-toolkit-theme';
  var root = document.documentElement;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  var t = stored();
  if (t !== 'light' && t !== 'dark') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', t);

  var SUN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>';

  function paint(btn) {
    var dark = current() === 'dark';
    btn.innerHTML = dark ? SUN : MOON;
    btn.setAttribute('aria-label', dark ? 'Passer en thème clair' : 'Passer en thème sombre');
    btn.title = btn.getAttribute('aria-label');
  }

  var ICONS = {
    list: '<path d="M4 6h16M4 12h10M4 18h5"/>',
    split: '<path d="M4 4v16M20 4v16"/><path d="M8 8h8M8 12h5M8 16h7"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    cards: '<rect x="4" y="6" width="10" height="14" rx="1.5"/><path d="M8 3h10.5A1.5 1.5 0 0 1 20 4.5V17"/>',
    board: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M9 9v11M15 9v11"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
    message: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    flow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a2 2 0 0 1 2 2v7"/>',
    braces: '<path d="M8 4H7a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-1"/>'
  };

  function tileHtml() {
    var name = document.body.getAttribute('data-icon');
    return ICONS[name] ? '<span class="kit-tile"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + '</svg></span>' : '';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('kit-theme');
    if (btn) paint(btn);
    document.dispatchEvent(new CustomEvent('kit:theme', { detail: theme }));
  }

  function mount() {
    if (document.querySelector('.kit-bar')) return;
    var name = document.body.getAttribute('data-app') || document.title;
    var tint = document.body.getAttribute('data-tint');
    if (tint) root.setAttribute('data-tint', tint);
    var bar = document.createElement('header');
    bar.className = 'kit-bar';
    bar.innerHTML =
      '<a class="kit-brand" href="../../site/#apps"><span class="kit-mark"><span></span></span><span class="kit-name">PO Toolkit</span></a>' +
      '<span class="kit-sep">/</span><span class="kit-app">' + tileHtml() + '<span class="kit-current"></span></span>' +
      '<span class="kit-spacer"></span>' +
      '<button type="button" class="kit-icon-btn" id="kit-theme"></button>';
    bar.querySelector('.kit-current').textContent = name;
    document.body.insertBefore(bar, document.body.firstChild);
    var btn = bar.querySelector('#kit-theme');
    paint(btn);

    // Surtitre d'identité (tuile + rubrique) au-dessus du titre de l'app
    var section = document.body.getAttribute('data-section');
    var head = document.querySelector('.kit-head, [data-kit-head]');
    if (section && head && !head.querySelector('.kit-kicker')) {
      var kicker = document.createElement('div');
      kicker.className = 'kit-kicker';
      kicker.innerHTML = tileHtml() + '<span></span>';
      kicker.lastChild.textContent = section;
      head.insertBefore(kicker, head.firstChild);
    }
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  }

  window.addEventListener('storage', function (e) {
    if (e.key === KEY && (e.newValue === 'light' || e.newValue === 'dark')) apply(e.newValue);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
