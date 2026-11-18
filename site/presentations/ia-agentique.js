// ============================================================
//  Présentation «&nbsp;IA agentique&nbsp;» — widgets interactifs
// ============================================================
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n, d = 0) => n.toFixed(d).replace('.', ',');
  const onEnter = (el, fn) => {
    const slide = el && el.closest('.slide');
    if (!slide) return;
    slide.addEventListener('slide:enter', fn);
    if (slide.classList.contains('is-active')) requestAnimationFrame(fn);
  };
  const tip = $('#tip');
  function bindTip(el, html) {
    el.addEventListener('mousemove', e => { tip.innerHTML = html; tip.classList.add('on'); tip.style.left = `${e.clientX + 14}px`; tip.style.top = `${e.clientY + 14}px`; });
    el.addEventListener('mouseleave', () => tip.classList.remove('on'));
  }
  function choose(container, sel, attr, render) {
    container.addEventListener('click', e => {
      const b = e.target.closest(sel);
      if (!b || !container.contains(b)) return;
      $$(sel, container).forEach(x => x.classList.toggle('is-on', x === b));
      render(b.dataset[attr], b);
    });
  }

  // ---------- 1.1 Boucle et trace ----------
  (function () {
    const loop = $('#def-loop'), trace = $('#trace');
    if (!loop) return;
    const lines = $$('.line', trace);
    let timer = null;
    function play() {
      clearInterval(timer);
      lines.forEach(l => l.classList.remove('on'));
      $$('.loop-node', loop).forEach(n => n.classList.remove('is-on'));
      let i = 0;
      timer = setInterval(() => {
        if (i >= lines.length) { clearInterval(timer); return; }
        lines[i].classList.add('on');
        $$('.loop-node', loop).forEach(n => n.classList.toggle('is-on', n.dataset.step === lines[i].dataset.s));
        i++;
      }, 650);
    }
    $('#trace-play').addEventListener('click', play);
    loop.addEventListener('click', e => {
      const n = e.target.closest('.loop-node');
      if (!n) return;
      clearInterval(timer);
      $$('.loop-node', loop).forEach(x => x.classList.toggle('is-on', x === n));
      lines.forEach(l => { l.classList.add('on'); l.style.opacity = l.dataset.s === n.dataset.step ? '1' : '.25'; });
    });
    onEnter(loop, () => { lines.forEach(l => (l.style.opacity = '')); play(); });
  })();

  // ---------- 1.2 Ce que c'est / ce que ce n'est pas ----------
  (function () {
    const box = $('#cmp');
    if (!box) return;
    const D = {
      rpa: { who: 'Le script, écrit une fois pour toutes.', ex: 'Recopier des montants d\'un écran à un autre.', v: ['good', 'Idéal pour un processus stable sur des données structurées.'], lim: 'Casse dès que l\'écran ou le format change.' },
      chat: { who: 'L\'humain : l\'assistant répond, l\'humain agit.', ex: 'Résumer un contrat, rédiger un e-mail.', v: ['warn', 'Utile, mais pas agentique : aucune action dans le SI.'], lim: 'Le gain dépend de chaque utilisateur.' },
      wf: { who: 'Le développeur : les étapes sont codées, le LLM traite chaque étape.', ex: 'Classer un courrier, extraire les champs, router vers la bonne file.', v: ['good', 'Souvent la meilleure option : prévisible, testable, moins cher.'], lim: 'Ne gère pas les cas imprévus hors du chemin prévu.' },
      agent: { who: 'Le modèle : il choisit l\'outil suivant selon ce qu\'il observe.', ex: 'Instruire une réclamation dont chaque cas demande des vérifications différentes.', v: ['accent', 'Pertinent quand le chemin est imprévisible et le résultat vérifiable.'], lim: 'Coût, latence, régularité, sécurité : à concevoir dès le départ.' },
      multi: { who: 'Plusieurs agents spécialisés, coordonnés par un orchestrateur.', ex: 'Recherche approfondie : un agent planifie, d\'autres explorent en parallèle.', v: ['warn', 'Puissant sur les tâches parallélisables, mais environ 15 fois plus de tokens.'], lim: 'Les échecs viennent surtout de la spécification et de la coordination.' },
    };
    function render(k) {
      const d = D[k];
      $('#cmp-detail').innerHTML = `
        <div class="card ${d.v[0]}"><span class="verdict">Verdict</span><h3>${d.v[1]}</h3></div>
        <div class="card"><span class="verdict">Qui décide du chemin</span><span>${d.who}</span><span class="verdict" style="margin-top:6px">Exemple</span><span>${d.ex}</span></div>
        <div class="card"><span class="verdict">Limite</span><span>${d.lim}</span></div>`;
    }
    choose(box, 'button', 'k', render);
    render('agent');
  })();

  // ---------- 1.3 Spectre d'autonomie ----------
  (function () {
    const box = $('#spec');
    if (!box) return;
    const L = [
      { d: 'Des règles explicites : si… alors…', who: 'Humain (à la conception)', ex: 'Lettrage comptable, calcul de paie', ctl: 'Tests unitaires', risk: 'Faible' },
      { d: 'Le modèle propose, l\'humain dispose et agit.', who: 'Humain, à chaque fois', ex: 'Rédaction, synthèse, copilote de code', ctl: 'Relecture humaine', risk: 'Faible' },
      { d: 'Chaîne d\'étapes codée ; le LLM traite le contenu de chaque étape.', who: 'Développeur (chemin fixe)', ex: 'Tri et extraction de courriers entrants', ctl: 'Évaluations par étape', risk: 'Modéré' },
      { d: 'Le modèle choisit ses actions ; un humain valide les décisions engageantes.', who: 'Modèle, sous supervision', ex: 'Instruction de réclamations, revue KYC', ctl: 'Points de contrôle humains, traces', risk: 'Modéré à élevé' },
      { d: 'Le modèle agit seul dans un périmètre borné (montants, droits, durée).', who: 'Modèle, dans un cadre', ex: 'Remboursements sous 50 €, tri d\'alertes', ctl: 'Plafonds, droits minimaux, surveillance', risk: 'Élevé' },
      { d: 'Plusieurs agents spécialisés se répartissent le travail.', who: 'Orchestrateur + agents', ex: 'Recherche approfondie, modernisation legacy', ctl: 'Observabilité de bout en bout, budgets', risk: 'Élevé, coûts ×15' },
    ];
    const range = $('#spec-range');
    function render(l) {
      l = Number(l);
      range.value = l;
      $$('button', box).forEach(b => b.classList.toggle('is-on', Number(b.dataset.l) === l));
      const x = L[l];
      $('#spec-detail').innerHTML = `
        <div class="card ${l >= 3 ? 'accent' : ''}"><h4>Principe</h4><h3>${x.d}</h3></div>
        <div class="card"><h4>Qui décide</h4><span>${x.who}</span><h4 style="margin-top:8px">Exemple</h4><span>${x.ex}</span></div>
        <div class="card"><h4>Contrôle requis</h4><span>${x.ctl}</span></div>
        <div class="card ${l >= 4 ? 'bad' : l >= 2 ? 'warn' : 'good'}"><h4>Niveau de risque</h4><h3>${x.risk}</h3></div>`;
    }
    box.addEventListener('click', e => { const b = e.target.closest('button'); if (b) render(b.dataset.l); });
    range.addEventListener('input', () => render(range.value));
    render(3);
  })();

  // ---------- 1.4 Grappe d'innovation ----------
  (function () {
    const box = $('#stack');
    if (!box) return;
    const D = [
      ['La brique de base', 'L\'architecture Transformer (2017) et le passage à l\'échelle (GPT-3, 2020) rendent possibles des modèles généralistes du langage.', 'Ce qu\'elle apporte à l\'agent : la compréhension et la génération.'],
      ['L\'interface se démocratise', 'ChatGPT (nov. 2022) fait du langage naturel une interface grand public. Les usages individuels explosent.', 'Ce qu\'elle apporte : l\'habitude de déléguer au langage.'],
      ['Le modèle touche le monde', 'Function calling et RAG : le modèle peut appeler une API et s\'appuyer sur une base documentaire de l\'entreprise.', 'Ce qu\'elle apporte : l\'accès aux outils et à la connaissance.'],
      ['Le modèle planifie', 'Les modèles de raisonnement décomposent un problème, vérifient et corrigent leurs étapes intermédiaires.', 'Ce qu\'elle apporte : des boucles plus longues et plus fiables.'],
      ['Les briques se branchent', 'MCP standardise l\'accès aux outils et aux données ; A2A la communication entre agents. Le coût d\'intégration baisse.', 'Ce qu\'elle apporte : l\'interopérabilité avec le SI.'],
      ['La couche d\'action', 'L\'agent combine toutes les briques : il comprend, cherche, planifie, agit dans le SI et vérifie. Il hérite aussi de toutes leurs limites.', 'Conséquence : investir dans les couches basses (données, API, RAG) prépare les agents.'],
    ];
    function render(i) {
      const d = D[Number(i)];
      $('#stack-detail').innerHTML = `<h3>${d[0]}</h3><span>${d[1]}</span><strong style="color:var(--text);margin-top:auto">${d[2]}</strong>`;
    }
    choose(box, 'button', 'i', render);
    $('#stack button[data-i="5"]').classList.add('is-on');
    render(5);
  })();

  // ---------- 1.5 Erreurs composées ----------
  (function () {
    const pIn = $('#cp-p-in'), nIn = $('#cp-n-in'), chk = $('#cp-check'), chart = $('#cp-chart');
    if (!pIn) return;
    const W = 760, H = 300, pad = { l: 44, r: 12, t: 12, b: 28 };
    const sx = n => pad.l + (n - 1) / 49 * (W - pad.l - pad.r);
    const sy = v => pad.t + (1 - v) * (H - pad.t - pad.b);
    const eff = p => p + (1 - p) * 0.8 * p;
    function path(p) {
      let d = '';
      for (let n = 1; n <= 50; n++) d += `${n === 1 ? 'M' : 'L'}${sx(n).toFixed(1)},${sy(Math.pow(p, n)).toFixed(1)}`;
      return d;
    }
    function render() {
      const p = Number(pIn.value) / 100, n = Number(nIn.value), c = chk.checked;
      $('#cp-p').textContent = `${fmt(Number(pIn.value), 1)} %`;
      $('#cp-n').textContent = n;
      const raw = Math.pow(p, n), withC = Math.pow(eff(p), n);
      const shown = c ? withC : raw;
      const out = $('#cp-out');
      out.textContent = `${fmt(shown * 100, shown < 0.1 ? 1 : 0)} %`;
      out.style.color = shown >= 0.8 ? 'var(--good)' : shown >= 0.5 ? 'var(--warn)' : 'var(--bad)';
      $('#cp-out2').textContent = c ? `Sans vérification : ${fmt(raw * 100, 0)} %. La vérification porte la fiabilité effective par étape à ${fmt(eff(p) * 100, 1)} %.` : `Soit environ ${Math.round((1 - raw) * 10)} tâche${Math.round((1 - raw) * 10) > 1 ? 's' : ''} sur 10 qui échoue${Math.round((1 - raw) * 10) > 1 ? 'nt' : ''} quelque part.`;
      let g = '';
      [0, 0.25, 0.5, 0.75, 1].forEach(v => { g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${sy(v)}" y2="${sy(v)}"/><text x="${pad.l - 8}" y="${sy(v) + 4}" text-anchor="end">${v * 100}%</text>`; });
      [1, 10, 20, 30, 40, 50].forEach(v => { g += `<text x="${sx(v)}" y="${H - 8}" text-anchor="middle">${v}</text>`; });
      g += `<line class="axis" x1="${pad.l}" x2="${W - pad.r}" y1="${sy(0)}" y2="${sy(0)}"/>`;
      g += `<path class="curve" d="${path(p)}"/>`;
      if (c) g += `<path class="curve2" d="${path(eff(p))}"/>`;
      g += `<line x1="${sx(n)}" x2="${sx(n)}" y1="${pad.t}" y2="${sy(0)}" stroke="var(--border-strong)" stroke-dasharray="3 4"/>`;
      g += `<circle class="pt" cx="${sx(n)}" cy="${sy(raw)}" r="7"/>`;
      if (c) g += `<circle class="pt" cx="${sx(n)}" cy="${sy(withC)}" r="7" style="fill:var(--good)"/>`;
      chart.innerHTML = g;
    }
    [pIn, nIn, chk].forEach(x => x.addEventListener('input', render));
    render();
  })();

  // ---------- 1.7 Cas pertinents / pièges ----------
  (function () {
    const list = $('#uc-list');
    if (!list) return;
    // profil : [données non structurées, variabilité, vérifiabilité, coût d'erreur] sur 4
    const U = [
      { n: 'Tri et extraction de documents entrants', v: 'good', p: [4, 3, 3, 2], why: 'Données non structurées, gros volumes, résultat vérifiable par échantillonnage et par des règles en aval. Le terrain naturel de l\'agentique, souvent en workflow LLM.', lvl: 'Niveau 2 à 3' },
      { n: 'Migration et modernisation de code legacy', v: 'good', p: [3, 3, 4, 2], why: 'Tâche longue et répétitive, vérifiée par la compilation et les tests. Amazon, banques : gains documentés à grande échelle.', lvl: 'Niveau 3 à 5' },
      { n: 'Support client de premier niveau avec escalade', v: 'good', p: [4, 3, 3, 2], why: 'Gains mesurés de 14 % (Brynjolfsson et al.). Condition : une escalade bien conçue et des humains sur les cas émotionnels.', lvl: 'Niveau 3' },
      { n: 'Tri d\'alertes de cybersécurité', v: 'good', p: [3, 4, 3, 2], why: 'Volume ingérable à la main, enquête préliminaire variable, décision finale humaine. L\'agent réduit le bruit.', lvl: 'Niveau 3' },
      { n: 'Veille et recherche documentaire', v: 'good', p: [4, 4, 2, 1], why: 'Chemin imprévisible, sources hétérogènes, erreur peu coûteuse si les sources sont citées. Cas d\'école du multi-agents.', lvl: 'Niveau 3 à 5' },
      { n: 'Revue KYC et conformité', v: 'warn', p: [3, 3, 3, 3], why: 'Pertinent pour préparer le dossier ; la décision reste humaine (traçabilité réglementaire, AI Act).', lvl: 'Niveau 3, décision humaine' },
      { n: 'Questions en langage naturel sur des données métier', v: 'warn', p: [1, 3, 2, 3], why: 'Possible si une couche sémantique existe (16 → 54 % de bonnes réponses). Sans elle, les chiffres sont faux et convaincants.', lvl: 'Niveau 2, avec couche sémantique' },
      { n: 'Relation client émotionnelle ou conflictuelle', v: 'warn', p: [4, 4, 1, 3], why: 'RCT Alibaba 2026 : conversations plus courtes mais qualité perçue nettement plus basse ; l\'intervention humaine y est moins efficace. Klarna a fait marche arrière.', lvl: 'Assistance au conseiller' },
      { n: 'Reporting financier sur données propres', v: 'bad', p: [1, 1, 4, 4], why: 'Le résultat est unique et calculable. Une requête ou un outil de BI est exact, auditable et quasi gratuit ; un agent ajoute coût et risque d\'erreur.', lvl: 'Niveau 0 : SQL / BI' },
      { n: 'Calcul de paie, de taxes ou de primes', v: 'bad', p: [1, 1, 4, 4], why: 'Règles explicites, tolérance zéro à l\'erreur, obligation d\'explicabilité. Domaine des moteurs de règles.', lvl: 'Niveau 0 : règles' },
      { n: 'Processus stable et à faible variabilité', v: 'bad', p: [1, 1, 4, 2], why: 'Si le chemin est toujours le même, un workflow ou une RPA est plus fiable et moins cher. L\'agentique serait une solution en quête de problème.', lvl: 'Niveau 0 à 2' },
      { n: 'Décisions irréversibles sans contrôle', v: 'bad', p: [3, 3, 1, 4], why: 'Virements, résiliations, suppressions en production : une erreur sur mille suffit. Exiger un contrôle humain ou des plafonds stricts.', lvl: 'Niveau ≤ 3, avec garde-fous' },
    ];
    const labels = ['Données non structurées', 'Variabilité des cas', 'Vérifiabilité du résultat', 'Coût d\'une erreur'];
    const verdict = { good: ['good', 'Pertinent'], warn: ['warn', 'Sous conditions'], bad: ['bad', 'Piège'] };
    let filter = 'all', sel = 0;
    function meter(v) { return `<span class="meter">${[1, 2, 3, 4].map(i => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`; }
    function render() {
      list.innerHTML = U.map((u, i) => `<button data-i="${i}" class="${i === sel ? 'is-on' : ''}${filter !== 'all' && u.v !== filter ? ' is-dim' : ''}"><span class="dot ${u.v}"></span>${u.n}</button>`).join('');
      const u = U[sel];
      $('#uc-detail').innerHTML = `
        <span class="tag ${verdict[u.v][0]}" style="align-self:flex-start">${verdict[u.v][1]}</span>
        <h3>${u.n}</h3>
        <p class="why">${u.why}</p>
        <div class="crit">${u.p.map((v, i) => `<span>${labels[i]}</span>${meter(v)}`).join('')}</div>
        <div class="card" style="margin-top:auto;padding:14px 16px"><strong style="color:var(--text)">Bonne réponse : ${u.lvl}</strong></div>`;
    }
    list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { sel = Number(b.dataset.i); render(); } });
    $('#uc-filter').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      filter = b.dataset.f;
      $$('#uc-filter .chip').forEach(c => c.classList.toggle('is-on', c === b));
      if (filter !== 'all' && U[sel].v !== filter) sel = U.findIndex(u => u.v === filter);
      render();
    });
    render();
  })();

  // ---------- 1.8 Écosystème SI ----------
  (function () {
    const si = $('#si');
    if (!si) return;
    const C = { x: 430, y: 300 };
    const N = [
      { k: 'erp', t: 'ERP', s: 'finance, achats', x: 150, y: 90, f: 'Données structurées de référence. L\'agent doit lire et parfois écrire : droits fins, transactions, contrôles de cohérence. Souvent des API pauvres ou propriétaires.' },
      { k: 'crm', t: 'CRM', s: 'clients, tickets', x: 430, y: 60, f: 'Mélange de champs structurés et de verbatims. Qualité très inégale des données saisies ; doublons. Premier système demandé par les agents de relation client.' },
      { k: 'ged', t: 'GED / documents', s: 'contrats, PDF', x: 710, y: 90, f: 'Le gisement de valeur non structuré. Problèmes : versions obsolètes, droits hérités trop larges, absence de métadonnées. Un RAG sur une GED mal gouvernée diffuse des informations périmées.' },
      { k: 'data', t: 'Plateforme data', s: 'lakehouse, BI', x: 790, y: 300, f: 'Là où les chiffres doivent être calculés. L\'agent appelle des requêtes ou une couche sémantique ; il ne recalcule pas. Sans définitions partagées, il invente.' },
      { k: 'legacy', t: 'Legacy / mainframe', s: 'cœur de métier', x: 710, y: 510, f: 'Souvent sans API. Options : exposer des services, passer par la RPA (fragile) ou moderniser, ce que des escouades d\'agents savent désormais accélérer.' },
      { k: 'iam', t: 'Identités & droits', s: 'IAM', x: 430, y: 545, f: 'Chaque agent est une identité non humaine : droits minimaux, secrets gérés, révocation. Ne jamais faire agir un agent avec les droits d\'un administrateur.' },
      { k: 'obs', t: 'Observabilité & évaluations', s: 'traces, coûts', x: 150, y: 510, f: 'Tracer chaque appel d\'outil, mesurer qualité, coût et latence. Sans visibilité des coûts, 3 % de ROI établi ; avec, 15 % (KPMG, 2026).' },
      { k: 'human', t: 'Humains', s: 'validation, escalade', x: 70, y: 300, f: 'Les points de contrôle font partie de l\'architecture : files de validation, escalades, retours qui alimentent les évaluations.' },
    ];
    const svgEl = $('#si-svg');
    svgEl.innerHTML = `<g>${N.map(n => `<path class="link" data-k="${n.k}" id="si-l-${n.k}" d="M${C.x},${C.y} L${n.x},${n.y}"/>`).join('')}</g>
      <g>${N.map((n, i) => `<circle r="4" class="flow"><animateMotion dur="${2.4 + (i % 3) * 0.6}s" repeatCount="indefinite" begin="${i * 0.3}s"><mpath href="#si-l-${n.k}"/></animateMotion></circle>`).join('')}</g>
      <text x="${C.x}" y="${C.y + 88}" text-anchor="middle" style="font-family:var(--font-mono);font-size:12px;fill:var(--text-3)">API · MCP · A2A</text>`;
    si.insertAdjacentHTML('beforeend', `<button class="si-node core" style="left:${C.x}px;top:${C.y}px">Agent<small>modèle + outils</small></button>` +
      N.map(n => `<button class="si-node" data-k="${n.k}" style="left:${n.x}px;top:${n.y}px">${n.t}<small>${n.s}</small></button>`).join(''));
    function render(k) {
      const n = N.find(x => x.k === k);
      $$('.si-node', si).forEach(b => b.classList.toggle('is-on', b.dataset.k === k));
      $$('.link', si).forEach(l => l.classList.toggle('is-on', l.dataset.k === k));
      $('#si-detail').innerHTML = n
        ? `<span class="tag accent" style="align-self:flex-start">Point de friction</span><h3>${n.t}</h3><span>${n.f}</span>`
        : `<span class="tag accent" style="align-self:flex-start">Vue d'ensemble</span><h3>L'agent est un nouveau client du SI</h3><span>Il consomme des API, des documents et des droits comme un utilisateur très rapide et très insistant. Chaque lien est un chantier d'intégration, de sécurité et de qualité.</span>`;
    }
    si.addEventListener('click', e => { const b = e.target.closest('.si-node'); if (b) render(b.dataset.k); });
    render(null);
  })();

  // ---------- 1.9 Exemples ----------
  (function () {
    const tabs = $('#ex-tabs');
    if (!tabs) return;
    choose(tabs, 'button', 't', t => $$('.ex-pane').forEach(p => p.classList.toggle('is-on', p.dataset.p === t)));
  })();

  // ---------- 2.1 Cartes retournables ----------
  $$('.flip').forEach(f => {
    f.setAttribute('tabindex', '0'); f.setAttribute('role', 'button');
    f.addEventListener('click', () => f.classList.toggle('is-on'));
    f.addEventListener('keydown', e => { if (e.key === 'Enter') f.classList.toggle('is-on'); });
  });

  // ---------- Barres horizontales ----------
  function hbars(el, rows, max = 100) {
    el.innerHTML = rows.map(r => `
      <div class="hbar" data-strict="${r.strict ? 1 : 0}">
        <span class="lab">${r.l}<small>${r.src}</small></span>
        <span class="track"><span class="fillb${r.strict ? '' : ' neutral'}" style="--w:${r.v / max * 100}%"></span></span>
        <span class="val">${r.txt || `${fmt(r.v, 0)} %`}</span>
      </div>`).join('');
    $$('.hbar', el).forEach((h, i) => bindTip(h, `<strong>${rows[i].l}</strong><br>${rows[i].tip || rows[i].src}`));
    const grow = () => {
      el.classList.remove('grown');
      void el.offsetWidth;
      el.classList.add('grown');
    };
    el.classList.add('grown');
    return grow;
  }

  // ---------- 2.2 Adoption ----------
  (function () {
    const el = $('#ad-bars');
    if (!el) return;
    const rows = [
      { l: 'Utilisent l\'IA dans au moins une fonction', v: 88, src: 'McKinsey, nov. 2025', tip: 'IA de tout type, pas seulement agentique.' },
      { l: 'Construisent ou déploient des agents', v: 62, src: 'KPMG Q3 2026 · grandes entreprises US', tip: 'Déclaratif large : «&nbsp;building, deploying or developing&nbsp;». En hausse de 53 % au trimestre précédent.' },
      { l: 'Expérimentent au moins un agent', v: 62, src: 'McKinsey, nov. 2025', tip: '39 % expérimentent + 23 % passent à l\'échelle quelque part.' },
      { l: 'Développent des systèmes multi-agents', v: 25, src: 'KPMG Q3 2026', tip: 'Contre 6 % les deux trimestres précédents.' },
      { l: 'Passent un agent à l\'échelle quelque part', v: 23, src: 'McKinsey, nov. 2025', strict: true, tip: 'Dans au moins une fonction de l\'entreprise.' },
      { l: 'Utilisent l\'agentique au moins modérément', v: 23, src: 'Deloitte, State of AI 2026', strict: true, tip: 'Prévu à 74 % sous deux ans.' },
      { l: 'Ont déployé des agents', v: 17, src: 'Gartner, CIO Survey 2026', strict: true, tip: 'Plus de 60 % prévoient de le faire sous deux ans.' },
      { l: 'Agents à l\'échelle dans une fonction donnée', v: 10, src: 'McKinsey, nov. 2025 · maximum observé', strict: true, txt: '≤ 10 %', tip: 'Dans aucune fonction plus de 10 % des répondants ne déclarent des agents réellement à l\'échelle.' },
    ];
    const grow = hbars(el, rows);
    $('#ad-filter').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('#ad-filter .chip').forEach(c => c.classList.toggle('is-on', c === b));
      const strict = b.dataset.f === 'strict';
      $$('.hbar', el).forEach(h => (h.style.display = strict && h.dataset.strict === '0' ? 'none' : ''));
      grow();
    });
  })();

  // ---------- 2.4 Études de productivité ----------
  (function () {
    const list = $('#study-list');
    if (!list) return;
    const S = [
      { t: 'Support client, 5 179 conseillers', s: 'NBER / QJE · 2023-25 · terrain', e: '+14 %', c: 'pos', fig: '+14 %', unit: 'de cas résolus par heure', p: 'Assistant conversationnel déployé progressivement dans un centre de support. +34 % pour les conseillers novices, effet quasi nul pour les plus expérimentés.', take: 'L\'IA diffuse les bonnes pratiques des meilleurs vers les novices.', tags: ['Quasi-expérience', 'Tâche bornée'] },
      { t: 'Consultants BCG, 758 participants', s: 'HBS · 2023 · expérience', e: '+25 %', c: 'mix', fig: '+25 %', unit: 'de vitesse dans la frontière', p: '+12 % de tâches, +40 % de qualité sur les tâches que l\'IA maîtrise. Hors de sa «&nbsp;frontière&nbsp;», les participants avec IA ont 19 points de moins de bonnes réponses.', take: 'La frontière est irrégulière : savoir où l\'IA est fiable est une compétence.', tags: ['Essai randomisé', 'Travail de connaissance'] },
      { t: 'Équipes humain-agent, 2 234 participants', s: 'MIT · 2025-26 · expérience', e: '+50 %', c: 'pos', fig: '+50 %', unit: 'de production par personne', p: 'Création de 11 024 publicités, testées en conditions réelles (environ 5 millions d\'impressions). Meilleurs textes, images moins bonnes que les équipes humaines, production plus homogène.', take: 'Gain net quand la communication avec l\'agent reste centrée sur la tâche.', tags: ['Essai randomisé', 'Agents'] },
      { t: 'Alibaba, 647 conseillers, 680 676 conversations', s: 'arXiv · mai 2026 · terrain', e: 'mitigé', c: 'mix', fig: '−', unit: 'qualité perçue nettement plus basse', p: 'Un système agentique traite des conversations de service client : durée moyenne réduite, mais notes de qualité nettement plus basses. Les interventions humaines fonctionnent sur les escalades techniques, moins sur les escalades émotionnelles.', take: 'Plus rapide n\'est pas meilleur : la conception de l\'escalade fait la différence.', tags: ['Essai randomisé terrain', 'Agentique', '2026'] },
      { t: 'Développeurs open source expérimentés', s: 'METR · 2025 · essai randomisé', e: '−19 %', c: 'neg', fig: '−19 %', unit: 'de vitesse mesurée', p: '16 développeurs, 246 tâches dans leurs propres dépôts. Ils prévoyaient +24 % et se sont crus 20 % plus rapides. En 2026, METR juge un gain plus probable mais ne parvient plus à le mesurer proprement.', take: 'Le ressenti n\'est pas une mesure. Les experts sur du code qu\'ils connaissent gagnent peu.', tags: ['Essai randomisé', 'Code'] },
      { t: 'Danemark, 25 000 salariés', s: 'NBER · 2025 · registres', e: '≈ 0', c: 'neg', fig: '2,8 %', unit: 'du temps de travail économisé', p: 'Croisement d\'enquêtes et de registres administratifs sur 11 métiers exposés. Effets sur les salaires et les heures statistiquement nuls deux ans après l\'arrivée des chatbots.', take: 'À l\'échelle de l\'économie, les gains ne se transmettent pas encore.', tags: ['Données administratives', 'Macro'] },
      { t: 'Workday, 3 200 salariés', s: 'Workday · janv. 2026 · enquête', e: '−40 %', c: 'neg', fig: '~40 %', unit: 'du temps gagné perdu en reprise', p: '85 % déclarent gagner 1 à 7 heures par semaine, mais près de 40 % de ce temps part en corrections et vérifications. 14 % obtiennent un gain net constant.', take: 'Sans repenser le travail, le gain brut s\'évapore.', tags: ['Enquête déclarative', '2026'] },
    ];
    function render(i) {
      const s = S[i];
      $$('button', list).forEach((b, j) => b.classList.toggle('is-on', j === i));
      $('#study-detail').innerHTML = `
        <div class="head">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <h3>${s.t}</h3>
        <div class="fig">${s.fig}<small>${s.unit}</small></div>
        <p>${s.p}</p>
        <div class="take"><strong>À retenir :</strong> ${s.take}</div>`;
    }
    list.innerHTML = S.map((s, i) => `<button data-i="${i}"><span class="t">${s.t}</span><span class="s">${s.s}</span><span class="e ${s.c}">${s.e}</span></button>`).join('');
    list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) render(Number(b.dataset.i)); });
    render(0);
  })();

  // ---------- 2.5 Écart de perception ----------
  (function () {
    const el = $('#gap');
    if (!el) return;
    const D = [['Gain prévu avant', 24], ['Gain ressenti après', 20], ['Effet mesuré', -19]];
    const zero = 190, k = 6, w = 150, gapX = 250;
    el.innerHTML = `<svg viewBox="0 0 760 340" width="100%" height="340" role="img" aria-label="Gain prévu, ressenti et mesuré">
      <line x1="0" x2="760" y1="${zero}" y2="${zero}" stroke="var(--border-strong)"/>
      ${D.map(([l, v], i) => {
        const x = 55 + i * gapX, h = Math.abs(v) * k, neg = v < 0;
        return `<rect class="gbar" x="${x}" y="${neg ? zero : zero - h}" width="${w}" height="${h}" rx="4"
            style="fill:${neg ? 'var(--bad)' : 'var(--text-3)'};opacity:${neg ? 1 : 0.5};transform-box:fill-box;transform-origin:${neg ? 'top' : 'bottom'};--d:${i * 0.2}s"/>
          <text x="${x + w / 2}" y="${neg ? zero + h + 40 : zero - h - 14}" text-anchor="middle" style="font-family:var(--font-serif);font-size:40px;font-weight:600;fill:${neg ? 'var(--bad)' : 'var(--text)'}">${v > 0 ? '+' : '−'}${Math.abs(v)} %</text>
          <text x="${x + w / 2}" y="${neg ? zero - 14 : zero + 28}" text-anchor="middle" style="font-family:var(--font-sans);font-size:16px;fill:var(--text-2)">${l}</text>`;
      }).join('')}
    </svg>`;
  })();

  // ---------- 2.7 Capacités vs déploiement ----------
  (function () {
    const el = $('#cap-bars');
    if (!el) return;
    hbars(el, [
      { l: 'Réussite des agents sur tâches réelles, 2025', v: 20, src: 'Terminal-Bench · AI Index 2026' },
      { l: 'Réussite des agents sur tâches réelles, 2026', v: 77.3, src: 'Terminal-Bench · AI Index 2026', strict: true, txt: '77,3 %' },
      { l: 'Organisations ayant déployé des agents', v: 17, src: 'Gartner, CIO Survey 2026', strict: true },
      { l: 'DSI constatant une valeur significative', v: 13, src: 'Gartner, oct. 2026', strict: true },
    ]);
    $$('.hbar', el).forEach(h => (h.style.gridTemplateColumns = '280px 1fr 70px'));
  })();

  // ---------- 3.1 10-20-70 ----------
  (function () {
    const g = $('#b1027');
    if (!g) return;
    const D = [['Algorithmes', 10], ['Technologie & données', 20], ['Personnes & processus', 70]];
    let y = 20;
    g.innerHTML = D.map(([l, v], i) => {
      const w = v / 70 * 330, row = `
        <text x="0" y="${y + 30}" style="font-family:var(--font-sans);font-size:17px;fill:var(--text-2)">${l}</text>
        <rect class="b1027" x="190" y="${y + 8}" height="34" rx="4" width="${w}" style="fill:${i === 2 ? 'var(--accent)' : 'var(--text-3)'};opacity:${i === 2 ? 1 : 0.5};transform-box:fill-box;transform-origin:left;--d:${i * 0.15}s"/>
        <text x="${200 + w}" y="${y + 33}" style="font-family:var(--font-serif);font-size:30px;font-weight:600;fill:var(--text)">${v} %</text>`;
      y += 90; return row;
    }).join('');
  })();

  // ---------- 3.5 Accélérateurs / freins ----------
  (function () {
    const box = $('#eb-pillars');
    if (!box) return;
    const P = {
      en: [
        ['Stratégie & gouvernance', [
          ['Sponsor exécutif et position claire', 'Les high performers ont un engagement visible de la direction et une politique d\'usage explicite (DORA : «&nbsp;clear AI stance&nbsp;»).', 'Publier une politique d\'usage simple : ce qui est encouragé, permis, interdit.', 'McKinsey 2025 ; DORA 2025'],
          ['Règles de passage et d\'arrêt', 'Les organisations qui définissent quand passer en production et quand abandonner sont 2,3 et 2,6 fois plus souvent en tête.', 'Écrire le critère d\'arrêt dans chaque fiche de cas d\'usage.', 'Gartner, oct. 2026'],
          ['Financement par domaine', 'La valeur se concentre quand on repense un domaine de bout en bout plutôt qu\'en multipliant les pilotes isolés.', 'Financer un domaine (ex. : sinistres) avec un objectif de résultat, pas une liste de cas.', 'McKinsey, Rewired'],
        ]],
        ['Données & SI', [
          ['Données prêtes pour l\'IA', 'Catalogue, propriétaires, qualité, couche sémantique : sans eux, 60 % des projets seront abandonnés.', 'Commencer par les données du domaine choisi, pas par un programme data global.', 'Gartner, fév. 2025'],
          ['API et protocoles standard', 'MCP et A2A réduisent le coût de chaque nouvelle connexion entre agents et systèmes.', 'Exposer les systèmes clés en API documentées, avec un registre d\'outils.', 'Anthropic 2024 ; Google 2025'],
          ['Plateforme d\'agents commune', 'Modèles, outils, identités, observabilité et évaluations mutualisés évitent que chaque équipe réinvente tout.', 'Créer une équipe plateforme qui sert les équipes produit.', 'DORA 2025 ; Team Topologies'],
        ]],
        ['Organisation & compétences', [
          ['Refonte des rôles humain-agent', 'Seules 4 % des organisations ont un plan ; elles sont 2,4 fois plus souvent en tête.', 'Redéfinir 2 ou 3 rôles dans l\'équipe pilote avant d\'étendre.', 'Gartner, oct. 2026'],
          ['Équipes produit pluridisciplinaires', 'Un résultat possédé de bout en bout par une petite équipe, avec métier, ingénierie et données.', 'Passer du mode projet au mode produit sur le domaine pilote.', 'McKinsey, sept. 2025'],
          ['Formation à la délégation', 'Savoir où l\'IA est fiable est une compétence (frontière irrégulière). Les entreprises réinvestissent plus en technologie qu\'en compétences.', 'Former à la spécification, à l\'évaluation et à la relecture.', 'Dell\'Acqua 2023 ; Workday 2026'],
        ]],
        ['Opérations & confiance', [
          ['Évaluations systématiques', 'Un jeu de cas de test avec seuil d\'acceptation, rejoué à chaque changement de modèle ou de consigne.', 'Pas de mise en production sans évaluation chiffrée.', 'Kapoor et al. 2024'],
          ['Visibilité des coûts', 'ROI établi chez 15 % des entreprises qui voient leurs coûts de fonctionnement, contre 3 % des autres.', 'Suivre coût par tâche et budget de tokens par cas d\'usage.', 'KPMG Global, Q2 2026'],
          ['Validation humaine conçue', '65 % des high performers ont des processus définis de validation humaine, contre 23 % des autres.', 'Placer les contrôles là où l\'erreur coûte, pas partout.', 'McKinsey, nov. 2025'],
        ]],
      ],
      bl: [
        ['Stratégie', [
          ['Solution en quête de problème', 'Le cas d\'usage part de l\'outil («&nbsp;il nous faut un agent&nbsp;») et non d\'un irritant chiffré.', 'Exiger une référence de départ et un propriétaire métier.', 'Gartner, juin 2025'],
          ['Pilotage par l\'usage', 'Licences, requêtes et nombre d\'agents remplacent la mesure de la valeur. 32 % réinvestissent le temps gagné en charge de travail.', 'Mesurer délai, qualité, coût unitaire.', 'Workday, janv. 2026'],
          ['Purgatoire des pilotes', 'Des dizaines de preuves de concept, aucune en production, faute de règles de passage.', 'Limiter le nombre de pilotes simultanés.', 'Gartner, oct. 2026'],
        ]],
        ['Données & SI', [
          ['Silos et dette de données', '80 % des banques citent la préparation des données comme premier frein.', 'Traiter la donnée du domaine pilote comme un produit.', 'KPMG, Q3 2026'],
          ['Legacy sans API', 'L\'agent ne peut agir que sur ce qui est exposé ; la RPA en contournement est fragile.', 'Prioriser l\'exposition des services du domaine.', 'McKinsey, sept. 2025'],
          ['Coûts de fonctionnement mal anticipés', '49 % ont réduit ou suspendu des déploiements quand les coûts ont dépassé la valeur. 51 % des DSI prévoient une hausse du coût total.', 'Modéliser le coût par tâche dès le prototype.', 'KPMG Q2 2026 ; Gartner oct. 2026'],
        ]],
        ['Organisation', [
          ['Organisation en relais', 'Les gains locaux se perdent dans les files d\'attente entre équipes.', 'Raccourcir la chaîne autour d\'un résultat.', 'DORA 2025'],
          ['Résistance et peur pour l\'emploi', 'Les salariés souhaitent surtout un partenariat (H3) ; l\'emploi des 22-25 ans recule dans les métiers exposés.', 'Associer les équipes au choix des tâches à déléguer.', 'Stanford 2025-26 ; AI Index 2026'],
          ['Responsabilité floue', 'Qui répond d\'une décision prise par un agent ? Le juge a tranché : l\'entreprise.', 'Nommer un propriétaire humain pour chaque agent.', 'Moffatt v. Air Canada, 2024'],
        ]],
        ['Confiance & risques', [
          ['Sécurité agentique', 'Injection de consignes, triade dangereuse, droits trop larges.', 'Cloisonner, droits minimaux, revue des outils exposés.', 'Willison 2025 ; OWASP 2025'],
          ['Régularité insuffisante', 'Moins de 25 % de réussite sur 8 essais identiques dans τ-bench : la moyenne cache l\'instabilité.', 'Mesurer la régularité, pas seulement la moyenne.', 'Yao et al. 2024'],
          ['Gouvernance en retard', '21 % seulement ont une gouvernance mature des agents.', 'Gouvernance proportionnée au niveau d\'autonomie.', 'Deloitte 2026'],
        ]],
      ],
    };
    let mode = 'en';
    function detail(p, i) {
      const [t, why, act, src] = P[mode][p][1][i];
      $$('button', box).forEach(b => b.classList.toggle('is-on', b.dataset.p === String(p) && b.dataset.i === String(i)));
      $('#eb-detail').innerHTML = `
        <span class="tag ${mode === 'en' ? 'good' : 'bad'}" style="align-self:flex-start">${mode === 'en' ? 'Accélérateur' : 'Frein'} · ${P[mode][p][0]}</span>
        <h3>${t}</h3><p>${why}</p>
        <div class="do"><b>${mode === 'en' ? 'Action' : 'Antidote'}</b>${act}</div>
        <span class="cite" style="margin-top:auto">${src}</span>`;
    }
    function render() {
      box.innerHTML = P[mode].map(([name, items], p) => `
        <div class="eb-pillar${mode === 'bl' ? ' blk' : ''}"><h4>${name}</h4>
          ${items.map((it, i) => `<button data-p="${p}" data-i="${i}">${it[0]}</button>`).join('')}
        </div>`).join('');
      detail(0, 0);
    }
    box.addEventListener('click', e => { const b = e.target.closest('button'); if (b) detail(Number(b.dataset.p), Number(b.dataset.i)); });
    choose($('#eb-tabs'), 'button', 'm', m => { mode = m; render(); });
    render();
  })();

  // ---------- 3.6 Triade dangereuse ----------
  (function () {
    const svg = $('#tri-svg');
    if (!svg) return;
    const inputs = $$('#tri-toggles input');
    function render() {
      const on = inputs.map(i => i.checked);
      $$('circle.c', svg).forEach(c => {
        const k = Number(c.dataset.k);
        c.style.fill = on[k] ? 'color-mix(in oklch, var(--accent) 20%, transparent)' : 'color-mix(in oklch, var(--text-3) 6%, transparent)';
        c.style.stroke = on[k] ? 'var(--accent)' : 'var(--border-strong)';
      });
      const all = on.every(Boolean);
      $('#tri-center').textContent = all ? '⚠ EXFILTRATION POSSIBLE' : '';
      $('#tri-center').style.fill = 'var(--bad)';
      const a = $('#tri-alert');
      a.className = `tri-alert ${all ? 'danger' : 'safe'}`;
      a.innerHTML = all
        ? '<strong>Les trois sont réunies.</strong> Une consigne cachée dans un document externe peut pousser l\'agent à envoyer des données privées à l\'extérieur. Retirer une capacité, ou exiger une validation humaine avant tout envoi.'
        : `<strong>${on.filter(Boolean).length} capacité${on.filter(Boolean).length > 1 ? 's' : ''} sur 3.</strong> Le risque d'exfiltration par injection de consignes reste maîtrisé tant que les trois ne sont pas réunies sans contrôle.`;
    }
    inputs.forEach(i => i.addEventListener('change', render));
    svg.addEventListener('click', e => { const c = e.target.closest('circle.c'); if (c) { inputs[Number(c.dataset.k)].checked = !inputs[Number(c.dataset.k)].checked; render(); } });
    render();
  })();

  // ---------- 3.7 Autodiagnostic ----------
  (function () {
    const sl = $('#diag-sliders');
    if (!sl) return;
    const D = [
      ['Stratégie & sponsoring', 'Désignez un sponsor exécutif et publiez une politique d\'usage ; choisissez un domaine pilote.'],
      ['Données prêtes pour l\'IA', 'Identifiez les données du domaine pilote, leurs propriétaires et une couche sémantique minimale.'],
      ['SI & intégration', 'Exposez en API les 3 ou 4 systèmes du domaine pilote ; standardisez l\'accès aux outils (MCP).'],
      ['Gouvernance & risques', 'Gouvernance proportionnée à l\'autonomie : identités d\'agents, droits minimaux, revue de la triade dangereuse.'],
      ['Organisation & compétences', 'Redéfinissez quelques rôles dans une équipe produit pilote ; formez à la spécification et à l\'évaluation.'],
      ['Mesure de la valeur', 'Fixez référence de départ, indicateurs de valeur, coûts suivis et critères d\'arrêt.'],
    ];
    const vals = [3, 2, 2, 2, 2, 1];
    sl.innerHTML = D.map(([n], i) => `<div class="slider"><div class="lbl"><span>${n}</span><b id="dg-v${i}">${vals[i]}/5</b></div><input type="range" min="1" max="5" step="1" value="${vals[i]}" data-i="${i}" aria-label="${n}"></div>`).join('');
    const R = 150, cx = 220, cy = 205;
    const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 6; return [cx + Math.cos(a) * R * v / 5, cy + Math.sin(a) * R * v / 5]; };
    function render() {
      let s = '';
      [1, 2, 3, 4, 5].forEach(v => { s += `<polygon class="ring" points="${D.map((_, i) => pt(i, v).join(',')).join(' ')}"/>`; });
      D.forEach((_, i) => { const [x, y] = pt(i, 5); s += `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
      s += `<polygon class="target" points="${D.map((_, i) => pt(i, 3).join(',')).join(' ')}"/>`;
      s += `<polygon class="shape" points="${vals.map((v, i) => pt(i, v).join(',')).join(' ')}"/>`;
      vals.forEach((v, i) => { const [x, y] = pt(i, v); s += `<circle class="pt" cx="${x}" cy="${y}" r="5"/>`; });
      const SHORT = ['Stratégie', 'Données', 'SI', 'Gouvernance', 'Organisation', 'Valeur'];
      SHORT.forEach((n, i) => {
        const [x, y] = pt(i, 5.9);
        s += `<text x="${x}" y="${y + 5}" text-anchor="middle">${n}</text>`;
      });
      $('#radar').innerHTML = s;
      const avg = vals.reduce((a, b) => a + b, 0) / 6;
      const min = Math.min(...vals), weak = vals.indexOf(min);
      const level = avg < 2 ? ['Exploration', 'Les fondations manquent : privilégier assistants et workflows simples.'] : avg < 3 ? ['Expérimentation', 'Des pilotes sont possibles sur un domaine, avec une autonomie limitée (niveau 2-3).'] : avg < 4 ? ['Industrialisation', 'Prêt à passer des agents supervisés en production sur un domaine.'] : ['Organisation agentique', 'Prêt pour des agents autonomes bornés et la refonte de domaines entiers.'];
      $('#diag-out').innerHTML = `
        <span class="kicker">Score moyen · ${fmt(avg, 1)}/5</span>
        <span class="level">${level[0]}</span>
        <span style="font-size:18px;color:var(--text-2)">${level[1]}</span>
        <div class="advice"><strong style="color:var(--text)">Priorité : ${D[weak][0]}</strong><br>${D[weak][1]}</div>
        ${min < 3 ? `<span class="small">${vals.filter(v => v < 3).length} dimension${vals.filter(v => v < 3).length > 1 ? 's' : ''} sous le seuil de production (pointillé).</span>` : '<span class="small">Toutes les dimensions atteignent le seuil de production.</span>'}`;
    }
    sl.addEventListener('input', e => { const i = Number(e.target.dataset.i); vals[i] = Number(e.target.value); $(`#dg-v${i}`).textContent = `${vals[i]}/5`; render(); });
    render();
  })();

  // ---------- 4.1 Filtre des méthodes ----------
  (function () {
    const f = $('#m-filter');
    if (!f) return;
    f.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', f).forEach(c => c.classList.toggle('is-on', c === b));
      $$('#methods .method').forEach(m => m.classList.toggle('is-dim', b.dataset.f !== 'all' && m.dataset.f !== b.dataset.f));
    });
  })();

  // ---------- 4.2 Méthode en cinq étapes ----------
  (function () {
    const box = $('#funnel');
    if (!box) return;
    const F = [
      ['Lister les tâches d\'un domaine, pas les métiers ni les outils. Pour chacune : volume, temps passé, données manipulées, irritants.', ['Décomposition en tâches (O*NET, grille SML)', 'Process mining sur les journaux du SI', 'Entretiens avec les équipes'], ['Inventaire de 30 à 80 tâches', 'Volumes et temps de référence']],
      ['Passer chaque tâche à la grille : nature des données, variabilité, vérifiabilité, coût d\'erreur, accès SI. Résultat : règle, workflow, agent ou rien.', ['Grille de décision (diapositive suivante)', 'Choix du niveau d\'autonomie (Anthropic)', 'Désir des équipes (WORKBank)'], ['Chaque tâche classée par niveau 0 à 5', 'Les fausses bonnes idées écartées']],
      ['Évaluer la valeur (gain, risque évité, expérience) et la faisabilité (données, SI, risques). Regrouper en domaine plutôt qu\'en liste.', ['Matrice valeur × faisabilité (Gartner)', 'Refonte par domaine (Rewired)', 'AI Canvas pour les décisions'], ['Portefeuille de 3 à 5 paris', 'Fiche par cas, signée par le propriétaire']],
      ['Construire petit avec un jeu d\'évaluation dès le premier jour ; mesurer qualité, régularité, coût et latence ; tester les garde-fous.', ['Évaluations et pass^k (τ-bench)', 'Revue de la triade dangereuse', 'Suivi du coût par tâche'], ['Prototype évalué en conditions réelles', 'Décision documentée']],
      ['Appliquer les règles écrites au départ : passer en production avec supervision, transformer, ou arrêter. Mesurer en valeur, pas en usage.', ['Règles de passage et d\'arrêt (Gartner 2026)', 'Indicateurs de valeur et de coût', 'Refonte des rôles concernés'], ['Agent en production ou arrêt sans regret', 'Retour d\'expérience pour le portefeuille']],
    ];
    function render(i) {
      const [d, m, out] = F[Number(i)];
      $('#funnel-detail').innerHTML = `
        <div class="card accent"><h4>Ce qu'on fait</h4><span style="font-size:20px;color:var(--text)">${d}</span></div>
        <div class="card"><h4>Méthodes mobilisées</h4><ul>${m.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="card"><h4>Livrables</h4><ul>${out.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    }
    choose(box, 'button', 'i', render);
    render(0);
  })();

  // ---------- 4.3 Grille de décision ----------
  (function () {
    const sl = $('#sc-sliders');
    if (!sl) return;
    const C = [
      ['data', 'Nature des données', 'Structurées', 'Non structurées'],
      ['vari', 'Variabilité des cas', 'Toujours le même chemin', 'Chaque cas est différent'],
      ['verif', 'Vérifiabilité du résultat', 'Difficile à vérifier', 'Vérifiable facilement'],
      ['cost', 'Coût d\'une erreur', 'Faible, rattrapable', 'Critique, irréversible'],
      ['vol', 'Volume', 'Rare', 'Massif'],
      ['access', 'Accès au SI', 'Aucune API', 'API et droits prêts'],
      ['emo', 'Dimension relationnelle', 'Nulle', 'Forte, émotionnelle'],
    ];
    const presets = {
      'Factures fournisseurs': { data: 4, vari: 2, verif: 4, cost: 2, vol: 5, access: 4, emo: 1 },
      'Réclamations clients': { data: 5, vari: 4, verif: 3, cost: 3, vol: 4, access: 3, emo: 3 },
      'Calcul de la paie': { data: 1, vari: 1, verif: 5, cost: 5, vol: 4, access: 4, emo: 1 },
      'Veille réglementaire': { data: 5, vari: 5, verif: 3, cost: 2, vol: 3, access: 4, emo: 1 },
      'Octroi de crédit': { data: 3, vari: 3, verif: 2, cost: 5, vol: 4, access: 4, emo: 2 },
      'Migration de code': { data: 4, vari: 4, verif: 5, cost: 2, vol: 4, access: 5, emo: 1 },
    };
    const v = { ...presets['Réclamations clients'] };
    sl.innerHTML = C.map(([k, n, a, b]) => `<div class="sc-row"><span class="n">${n}</span><div><input type="range" min="1" max="5" step="1" value="${v[k]}" data-k="${k}" aria-label="${n}"><div class="ends"><span>${a}</span><span>${b}</span></div></div></div>`).join('');
    $('#sc-presets').innerHTML = Object.keys(presets).map((p, i) => `<button class="chip${i === 1 ? ' is-on' : ''}" data-p="${p}">${p}</button>`).join('');

    function decide() {
      const why = [];
      let lvl, rec, warn = '';
      if (v.vol <= 1 && v.vari <= 3) { lvl = 0; rec = 'Ne pas automatiser'; why.push('Trop peu de volume pour amortir la conception, les évaluations et l\'exploitation.'); }
      else if (v.data <= 2 && v.vari <= 2) { lvl = 1; rec = 'Règle, RPA ou SQL'; why.push('Données structurées et chemin stable : un outil déterministe est exact, auditable et moins cher.'); }
      else if (v.cost >= 5 && v.verif <= 2) { lvl = 0; rec = 'Ne pas automatiser la décision'; why.push('Erreur critique et difficile à détecter : l\'IA peut assister l\'expert, pas décider.'); }
      else if (v.vari <= 3) { lvl = 2; rec = 'Workflow LLM'; why.push('Le chemin est prévisible : coder les étapes, laisser le LLM traiter le contenu.'); }
      else if (v.cost >= 4 || v.verif <= 3) { lvl = 3; rec = 'Agent supervisé'; why.push('Cas variés, mais erreur coûteuse ou vérification délicate : validation humaine des décisions engageantes.'); }
      else { lvl = 4; rec = 'Agent autonome borné'; why.push('Cas variés, résultat vérifiable, erreur rattrapable : autonomie possible dans un périmètre plafonné.'); }
      if (v.data >= 4 && lvl >= 2) why.push('Données non structurées : c\'est là que le langage naturel apporte une capacité nouvelle.');
      if (v.data <= 2 && lvl >= 2) why.push('Données plutôt structurées : l\'agent doit appeler des requêtes, pas calculer lui-même.');
      if (v.cost >= 4 && lvl >= 2) why.push('Prévoir plafonds, droits minimaux et traçabilité (AI Act, art. 14 si haut risque).');
      if (v.vol >= 4 && lvl >= 1) why.push('Volume élevé : le gain se cumule, le coût par tâche doit être suivi.');
      if (v.emo >= 4) { why.push('Forte dimension relationnelle : garder l\'humain en façade, l\'agent en appui.'); if (lvl > 3) { lvl = 3; rec = 'Agent supervisé'; } }
      if (v.access <= 2 && lvl >= 2) warn = 'Prérequis : sans API ni droits, l\'agent ne peut pas agir. Commencer par exposer les systèmes concernés.';
      return { lvl, rec, why, warn };
    }
    function render() {
      const d = decide();
      $$('#sc-ladder span').forEach((s, i) => s.classList.toggle('is-on', i === d.lvl));
      $('#sc-rec').textContent = d.rec;
      $('#sc-why').innerHTML = d.why.map(w => `<li>${w}</li>`).join('');
      const w = $('#sc-warn'); w.textContent = d.warn; w.classList.toggle('on', !!d.warn);
    }
    sl.addEventListener('input', e => { v[e.target.dataset.k] = Number(e.target.value); $$('#sc-presets .chip').forEach(c => c.classList.remove('is-on')); render(); });
    $('#sc-presets').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      Object.assign(v, presets[b.dataset.p]);
      $$('#sc-presets .chip').forEach(c => c.classList.toggle('is-on', c === b));
      $$('input', sl).forEach(i => (i.value = v[i.dataset.k]));
      render();
    });
    render();
  })();

  // ---------- 4.4 Quadrant désir × capacité ----------
  (function () {
    const q = $('#quad');
    if (!q) return;
    const P = [
      ['Saisie et rapprochement de factures', 76, 88, 'Feu vert', 'Répétitif, peu valorisé par les équipes, bien maîtrisé par l’IA. À automatiser en priorité.'],
      ['Planification de rendez-vous', 64, 74, 'Feu vert', 'Tâche administrative que les salariés délèguent volontiers.'],
      ['Préparation de rapports de conformité', 80, 60, 'Feu vert', 'Fort désir d’être déchargé, capacité désormais suffisante avec relecture.'],
      ['Synthèse de dossiers techniques complexes', 25, 78, 'R&D', 'Souhaité par les équipes, mais l’IA n’est pas encore assez fiable : investir, expérimenter.'],
      ['Entretien annuel et feedback', 78, 20, 'Feu rouge', 'Faisable techniquement, mais les salariés veulent garder la main : augmenter plutôt qu’automatiser.'],
      ['Négociation commerciale', 66, 36, 'Feu rouge', 'Dimension relationnelle forte : l’IA prépare, l’humain négocie.'],
      ['Arbitrage stratégique', 24, 24, 'Faible priorité', 'Ni souhaité ni maîtrisé : ne pas y investir maintenant.'],
    ];
    q.insertAdjacentHTML('beforeend', P.map(([n, x, y], i) => `<button class="pt" data-i="${i}" style="left:${x}%;top:${100 - y}%" aria-label="${n}"><span>${n}</span></button>`).join(''));
    function render(i) {
      const [n, , , z, d] = P[i];
      $$('.pt', q).forEach((p, j) => p.classList.toggle('is-on', j === i));
      const cls = { 'Feu vert': 'good', 'R&D': 'warn', 'Feu rouge': 'bad', 'Faible priorité': '' }[z];
      $('#quad-detail').innerHTML = `<span class="tag ${cls}" style="align-self:flex-start">${z}</span><h3>${n}</h3><span>${d}</span>`;
    }
    q.addEventListener('click', e => { const p = e.target.closest('.pt'); if (p) render(Number(p.dataset.i)); });
    render(0);
  })();
})();
