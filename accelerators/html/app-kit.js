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

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('kit-theme');
    if (btn) paint(btn);
    document.dispatchEvent(new CustomEvent('kit:theme', { detail: theme }));
  }

  function mount() {
    if (document.querySelector('.kit-bar')) return;
    var name = document.body.getAttribute('data-app') || document.title;
    var bar = document.createElement('header');
    bar.className = 'kit-bar';
    bar.innerHTML =
      '<a class="kit-brand" href="../../site/#apps"><span class="kit-mark"><span></span></span><span class="kit-name">PO Toolkit</span></a>' +
      '<span class="kit-sep">/</span><span class="kit-current"></span>' +
      '<span class="kit-spacer"></span>' +
      '<button type="button" class="kit-icon-btn" id="kit-theme"></button>';
    bar.querySelector('.kit-current').textContent = name;
    document.body.insertBefore(bar, document.body.firstChild);
    var btn = bar.querySelector('#kit-theme');
    paint(btn);
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
