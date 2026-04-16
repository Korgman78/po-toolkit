const TOOL_CATEGORIES = window.PO_TOOLKIT_DATA?.TOOLS_DATA || {};
const METHOD_CATEGORIES = window.PO_TOOLKIT_DATA?.METHODS_DATA || {};

const ACCELERATORS_DATA = [
  { name: "Template User Stories", desc: "Colonnes structurées : rôle, action, bénéfice, critères d'acceptance, priorité, story points. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/user-story-template.xlsx" },
  { name: "Matrices de Priorisation", desc: "Un seul workbook avec un onglet par méthode : RICE, WSJF, ICE, MoSCoW et Value vs Effort. Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/prioritization-matrices.xlsx" },
  { name: "Release Plan", desc: "Planning de release avec calcul de vélocité, suivi des milestones et tracker de vélocité. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/release-plan.xlsx" },
  { name: "Capacity Planning", desc: "Calcul charge/capacité par sprint, gestion des congés et allocation. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/capacity-planning.xlsx" },
  { name: "Product Canvas", desc: "Canvas visuel avec vision, personas, problèmes, solutions, métriques. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/product-canvas.pptx" },
  { name: "Sprint Review Template", desc: "Support de Sprint Review pré-formaté avec démo, métriques et next steps. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/sprint-review-template.pptx" },
  { name: "Definition of Ready / Done", desc: "Checklists DoR et DoD prêtes à afficher. Format poster A3. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/definition-of-ready-done.pptx" },
  { name: "Stakeholder Map", desc: "Matrice pouvoir/intérêt pour cartographier vos parties prenantes. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/stakeholder-mapping.pptx" },
  { name: "Slides Library (225 slides)", desc: "Bibliothèque de 225 slides professionnelles : diagrammes, timelines, matrices, pyramides, process flows, tableaux. Prêtes à réutiliser.", format: "pptx", file: "../accelerators/pptx/Slides Library_A4.pptx" },
  { name: "Import Jira (CSV)", desc: "Template CSV pré-formaté pour import bulk dans Jira. Colonnes mappées.", format: "csv", file: "../accelerators/csv/jira-import-template.csv" },
  { name: "Import Azure DevOps (CSV)", desc: "Template CSV pré-formaté pour import bulk dans Azure DevOps.", format: "csv", file: "../accelerators/csv/ado-import-template.csv" },
];

const APPS_DATA = [
  { section: "Cadrage & priorisation", name: "Calculateur de Priorisation", desc: "RICE, WSJF, ICE, MoSCoW, Value/Effort — avec critères custom et pondération. L'outil de priorisation ultime du PO.", file: "../accelerators/html/prioritization-calculator.html", color: "#a855f7" },
  { section: "Cadrage & priorisation", name: "Story Splitter", desc: "Découpez une feature en stories actionnables avec patterns guides : workflow, front/back, CSV, règles métier, cas limites.", file: "../accelerators/html/story-splitter.html", color: "#14b8a6" },
  { section: "Roadmapping & strategie", name: "Roadmap Designer", desc: "Designer de roadmap epic/feature multi-mois avec timeline, statuts, priorites, local storage et import/export JSON.", file: "../accelerators/html/roadmap-designer.html", color: "#1d9a8a" },
  { section: "Planification & facilitation", name: "Planning Poker", desc: "Outil de vote pour estimer vos stories en équipe. Fibonacci et T-shirt sizes.", file: "../accelerators/html/planning-poker.html", color: "#ec4899" },
  { section: "Planification & facilitation", name: "PI Planning Simulator", desc: "Planifiez un PI par sprint avec capacité, points, must/should, dépendances, IP sprint, objectifs, risques et export CSV.", file: "../accelerators/html/pi-planning-simulator.html", color: "#f59e0b" },
  { section: "Planification & facilitation", name: "Daily Standup Timer", desc: "Chronomètre avec timer par personne. Gardez vos dailys dans les temps.", file: "../accelerators/html/daily-standup-timer.html", color: "#6366f1" },
  { section: "Planification & facilitation", name: "Retro Board", desc: "Tableau de rétrospective interactif. Colonnes personnalisables, vote et export.", file: "../accelerators/html/retro-board.html", color: "#10b981" },
  { section: "Schemas & ateliers", name: "Schemas & Workflows", desc: "Canvas de modélisation simple en mode session locale : modules front, microservices, Kafka, Postgres, APIs et liaisons.", file: "../accelerators/html/schemas-workflows.html", color: "#06b6d4" },
  { section: "Utilitaires", name: "JSON & UUID Tools", desc: "Validateur JSON (format, minify, tri des clés) + Générateur UUID (v4, v7, Nano ID). Deux outils en un.", file: "../accelerators/html/json-uuid-tools.html", color: "#64748b" },
];

const APP_SECTION_DESCRIPTIONS = {
  "Cadrage & priorisation": "Passez de l'idée au backlog priorisé avec une logique produit claire.",
  "Roadmapping & strategie": "Construisez une roadmap lisible par outcomes, epics, features et horizon multi-mois.",
  "Planification & facilitation": "Animez vos estimations, vos arbitrages de PI et vos rituels d'équipe.",
  "Schemas & ateliers": "Modélisez un workflow ou une archi légère à partager pendant les ateliers.",
  "Utilitaires": "Petits outils transverses pour gagner du temps au quotidien."
};

const ACCELERATOR_FORMAT_META = {
  xlsx: { title: "Workbooks Excel", description: "Templates opérationnels et actionnables pour priorisation, backlog, release et capacité." },
  pptx: { title: "Supports & canvases", description: "Slides sobres et réutilisables pour cadrage, ateliers et communication stakeholders." },
  csv: { title: "Imports & bulk edits", description: "Fichiers utilitaires pour vos imports Jira et Azure DevOps sans friction." }
};

const TOOL_LOGO_SLUGS = {
  jira: "jira",
  linear: "linear",
  "azure-devops": "azuredevops",
  shortcut: "shortcut",
  asana: "asana",
  "monday-com": "mondaydotcom",
  trello: "trello",
  clickup: "clickup",
  youtrack: "youtrack",
  "github-projects": "github",
  productboard: "productboard",
  "aha": "aha",
  airfocus: "airfocus",
  figma: "figma",
  miro: "miro",
  sketch: "sketch",
  penpot: "penpot",
  "adobe-xd": "adobexd",
  figjam: "figma",
  slack: "slack",
  "microsoft-teams": "microsoftteams",
  zoom: "zoom",
  loom: "loom",
  notion: "notion",
  confluence: "confluence",
  coda: "coda",
  docusaurus: "docusaurus",
  gitbook: "gitbook",
  amplitude: "amplitude",
  mixpanel: "mixpanel",
  tableau: "tableau",
  looker: "looker",
  metabase: "metabase",
  powerbi: "powerbi",
  hotjar: "hotjar",
  datadog: "datadog",
  sentry: "sentry",
  intercom: "intercom",
  typeform: "typeform",
  dovetail: "dovetail",
  maze: "maze",
  zendesk: "zendesk",
  salesforce: "salesforce",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  openai: "openai",
  chatgpt: "openai",
  claude: "anthropic",
  perplexity: "perplexity",
  "google-analytics": "googleanalytics",
  "google-meet": "googlemeet",
  "google-workspace": "googleworkspace",
  fullstory: "fullstory",
  mural: "mural",
  whimsical: "whimsical"
};

// ---- Utility Functions ----
function getTheme() {
  return localStorage.getItem('po-toolkit-theme') || 'light';
}
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('po-toolkit-theme', theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getHostname(toolUrl) {
  try {
    return new URL(toolUrl).hostname.replace(/^www\./, '');
  } catch (error) {
    return '';
  }
}

function getToolLogoSrc(tool) {
  const toolKey = slugify(tool.name);
  const simpleIconSlug = TOOL_LOGO_SLUGS[toolKey];
  if (simpleIconSlug) return `https://cdn.simpleicons.org/${simpleIconSlug}`;
  const hostname = getHostname(tool.url);
  if (!hostname) return '';
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
}

function renderToolLogo(tool) {
  const logoSrc = getToolLogoSrc(tool);
  if (!logoSrc) return tool.logo;
  const fallback = tool.name.slice(0, 2).toUpperCase();
  return `<img src="${logoSrc}" alt="${tool.name} logo" class="tool-logo-img" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove(); this.parentElement.classList.add('tool-logo-fallback'); this.parentElement.textContent='${fallback}'">`;
}

function renderCategoryCards(entries, routeName) {
  return entries.map(([key, entry]) => `
    <div class="category-card" ${entry.color ? `style="--card-accent: ${entry.color}"` : ''} onclick="navigateTo('${routeName}', '${key}')">
      <div class="card-icon" ${entry.color ? `style="color: ${entry.color}; background: ${entry.color}15"` : ''}>${entry.icon}</div>
      <h3>${entry.title}</h3>
      <p class="card-desc">${entry.description.substring(0, 100)}...</p>
      <span class="card-count">${routeName === 'tools' ? `${entry.tools.length} outils` : `${entry.methods.length} méthodes`} &#8594;</span>
    </div>
  `).join('');
}

function scrollToRouteDetail(detail) {
  if (!detail) return;

  const detailCard = document.querySelector(`[data-detail-slug="${detail}"]`);
  if (!detailCard) return;

  window.requestAnimationFrame(() => {
    detailCard.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

// ---- SPA Router ----
function navigateTo(page, subpage, detail) {
  const parts = [page, subpage, detail].filter(Boolean);
  const hash = `#${parts.join('/')}`;
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  return { page: parts[0], subpage: parts[1] || null, detail: parts[2] || null };
}

// ---- Render Functions ----
function renderHome() {
  const toolCount = Object.values(TOOL_CATEGORIES).reduce((sum, cat) => sum + cat.tools.length, 0);
  const methodCount = Object.values(METHOD_CATEGORIES).reduce((sum, cat) => sum + cat.methods.length, 0);
  const catCount = Object.keys(TOOL_CATEGORIES).length;

  let html = `
    <div style="margin-bottom: 2rem;" class="fade-in">
      <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">PO Toolkit</h1>
      <p style="color: var(--text-secondary); margin: 0;">${toolCount} outils &middot; ${catCount} catégories &middot; ${methodCount} méthodes &middot; templates &middot; mini-apps</p>
    </div>

    <div class="section-header">
      <h2>Outils par catégorie</h2>
    </div>
    <div class="categories-grid">${renderCategoryCards(Object.entries(TOOL_CATEGORIES), 'tools')}</div>
    <div class="section-header" style="margin-top: 2.5rem;">
      <h2>Méthodes & Frameworks</h2>
    </div>
    <div class="categories-grid">${renderCategoryCards(Object.entries(METHOD_CATEGORIES), 'methods')}</div>
    <div class="section-header" style="margin-top: 2.5rem;">
      <h2>Accélérateurs</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
      <div class="category-card" onclick="navigateTo('apps')">
        <div class="card-icon" style="color: #2563eb; background: #dbeafe">&#9889;</div>
        <h3>Mini-Apps</h3>
        <p class="card-desc">Priorisation, Story Splitter, PI Planning, schemas collaboratifs, facilitation...</p>
        <span class="card-count">Voir &#8594;</span>
      </div>
      <div class="category-card" onclick="navigateTo('accelerators')">
        <div class="card-icon" style="color: #16a34a; background: #dcfce7">&#128196;</div>
        <h3>Templates & Fichiers</h3>
        <p class="card-desc">Excel, PowerPoint, CSV prêts à l'emploi.</p>
        <span class="card-count">Voir &#8594;</span>
      </div>
      <div class="category-card" onclick="navigateTo('cheatsheets')">
        <div class="card-icon" style="color: #d97706; background: #fef3c7">&#128203;</div>
        <h3>Cheat Sheets</h3>
        <p class="card-desc">Fiches mémo imprimables pour le quotidien.</p>
        <span class="card-count">Voir &#8594;</span>
      </div>
    </div>
  `;

  return html;
}

function renderToolsOverview() {
  return `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <span>Outils</span>
    </div>
    <div class="section-header fade-in">
      <h2>&#128203; Outils</h2>
      <p>Explorez les catégories d'outils couvertes dans le guide et entrez dans la fiche qui vous intéresse.</p>
    </div>
    <div class="categories-grid">
      ${renderCategoryCards(Object.entries(TOOL_CATEGORIES), 'tools')}
    </div>
  `;
}

function renderMethodsOverview() {
  return `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <span>Méthodes</span>
    </div>
    <div class="section-header fade-in">
      <h2>&#9878; Méthodes & Frameworks</h2>
      <p>Retrouvez les principales approches de priorisation, discovery, métriques et scaling déjà structurées dans le guide.</p>
    </div>
    <div class="categories-grid">
      ${renderCategoryCards(Object.entries(METHOD_CATEGORIES), 'methods')}
    </div>
  `;
}

function renderToolCategory(categoryKey, activeToolSlug = null) {
  const cat = TOOL_CATEGORIES[categoryKey];
  if (!cat) return '<h2>Catégorie non trouvee</h2>';

  let html = `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <a href="#tools">Outils</a> <span class="sep">&#9656;</span>
      <span>${cat.title}</span>
    </div>
    <div class="section-header fade-in">
      <h2>${cat.icon} ${cat.title}</h2>
      <p>${cat.description}</p>
    </div>
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterTools('all', this)">Tous</button>
      <button class="filter-btn" onclick="filterTools('free', this)">Gratuit</button>
      <button class="filter-btn" onclick="filterTools('freemium', this)">Freemium</button>
      <button class="filter-btn" onclick="filterTools('paid', this)">Payant</button>
      <button class="filter-btn" onclick="filterTools('po-métier', this)">PO Métier</button>
      <button class="filter-btn" onclick="filterTools('po-technique', this)">PO Technique</button>
    </div>
    <div class="tools-grid" id="tools-grid">
  `;

  for (const tool of cat.tools) {
    const pricingTag = tool.pricing === 'free' ? 'tag-free' : tool.pricing === 'freemium' ? 'tag-freemium' : 'tag-paid';
    const pricingLabel = tool.pricing === 'free' ? 'Gratuit' : tool.pricing === 'freemium' ? 'Freemium' : 'Payant';
    const idealLower = tool.ideal.map(i => i.toLowerCase());
    const toolSlug = slugify(tool.name);
    const highlightStyle = toolSlug === activeToolSlug ? ' style="border-color: var(--accent); box-shadow: var(--shadow-md);"' : '';

    html += `
      <div class="tool-card" id="tool-${toolSlug}" data-detail-slug="${toolSlug}" data-pricing="${tool.pricing}" data-ideal="${idealLower.join(',')}"${highlightStyle}>
        <div class="tool-card-header">
          <div class="tool-logo">${renderToolLogo(tool)}</div>
          <div class="tool-info">
            <h3>${tool.name}</h3>
            <span class="tool-tagline">${tool.tagline}</span>
          </div>
        </div>
        <div class="tool-tags">
          <span class="tag ${pricingTag}">${pricingLabel}</span>
          ${tool.ideal.map(i => `<span class="tag">${i}</span>`).join('')}
        </div>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-pros-cons">
          <div class="tool-pros">
            <h4>&#9989; Forces</h4>
            <ul>${tool.pros.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
          <div class="tool-cons">
            <h4>&#10060; Limites</h4>
            <ul>${tool.cons.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="tool-rating">
          <span class="rating-label">Score PO</span>
          <div class="rating-bar"><div class="rating-fill" style="width: ${tool.score * 10}%"></div></div>
          <span class="rating-score">${tool.score}/10</span>
        </div>
        <div class="tool-ideal" style="margin-top: 0.75rem;">
          <span style="font-size: 0.75rem; color: var(--text-tertiary); margin-right: 0.3rem;">Intégrations :</span>
          ${tool.intégrations.map(i => `<span class="ideal-badge">${i}</span>`).join('')}
        </div>
        ${tool.url ? `<a href="${tool.url}" target="_blank" rel="noopener" class="tool-website">&#127760; Site officiel &#8599;</a>` : ''}
      </div>
    `;
  }

  html += `</div>`;

  // Comparison table
  html += `
    <div class="section-header" style="margin-top: 3rem;">
      <h2>&#128202; Comparatif rapide</h2>
    </div>
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Outil</th>
            <th>Pricing</th>
            <th>Score</th>
            <th>Ideal pour</th>
            <th>Top integration</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const tool of [...cat.tools].sort((a, b) => b.score - a.score)) {
    html += `
      <tr>
        <td><strong>${tool.name}</strong></td>
        <td><span class="tag tag-${tool.pricing === 'free' ? 'free' : tool.pricing === 'freemium' ? 'freemium' : 'paid'}">${tool.pricing === 'free' ? 'Gratuit' : tool.pricing === 'freemium' ? 'Freemium' : 'Payant'}</span></td>
        <td><strong>${tool.score}/10</strong></td>
        <td>${tool.ideal.slice(0, 2).join(', ')}</td>
        <td>${tool.intégrations.slice(0, 3).join(', ')}</td>
      </tr>
    `;
  }

  html += `</tbody></table></div>`;

  // Prev/Next navigation
  const catKeys = Object.keys(TOOL_CATEGORIES);
  const idx = catKeys.indexOf(categoryKey);
  html += `<div class="page-nav">`;
  if (idx > 0) {
    const prev = TOOL_CATEGORIES[catKeys[idx - 1]];
    html += `<a href="#tools/${catKeys[idx - 1]}"><span class="nav-label">&#8592; Précédent</span><span class="nav-title">${prev.title}</span></a>`;
  } else {
    html += `<div></div>`;
  }
  if (idx < catKeys.length - 1) {
    const next = TOOL_CATEGORIES[catKeys[idx + 1]];
    html += `<a href="#tools/${catKeys[idx + 1]}"><span class="nav-label">Suivant &#8594;</span><span class="nav-title">${next.title}</span></a>`;
  }
  html += `</div>`;

  return html;
}

function renderMethodCategory(methodKey, activeMethodSlug = null) {
  const cat = METHOD_CATEGORIES[methodKey];
  if (!cat) return '<h2>Catégorie non trouvee</h2>';

  let html = `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <a href="#methods">Méthodes</a> <span class="sep">&#9656;</span>
      <span>${cat.title}</span>
    </div>
    <div class="section-header fade-in">
      <h2>${cat.icon} ${cat.title}</h2>
      <p>${cat.description}</p>
    </div>
  `;

  // Special: PDF guide for scaling
  if (methodKey === 'scaling') {
    html += `
      <div class="method-card" style="background: linear-gradient(135deg, var(--accent-bg), var(--bg-secondary)); border-left: 4px solid var(--accent); display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="font-size: 2.5rem;">&#128218;</div>
        <div style="flex: 1; min-width: 200px;">
          <h3 style="margin-bottom: 0.3rem;">Guide détaillé complet — Agilité à l'Échelle</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">Document de référence couvrant SAFe, LeSS, Spotify Model et les bonnes pratiques de scaling. Analyse approfondie des frameworks, comparaisons et recommandations.</p>
        </div>
        <a href="../accelerators/agilite-echelle-guide.pdf" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; border-radius: 10px; background: var(--accent); color: white; text-decoration: none; font-weight: 700; font-size: 0.85rem; white-space: nowrap;">&#128196; Télécharger le PDF &#8599;</a>
      </div>
    `;
  }

  for (const method of cat.methods) {
    const methodSlug = slugify(method.name);
    const highlightStyle = methodSlug === activeMethodSlug ? ' style="border-color: var(--accent); box-shadow: var(--shadow-md);"' : '';

    html += `
      <div class="method-card" id="method-${methodSlug}" data-detail-slug="${methodSlug}"${highlightStyle}>
        <div class="method-card-top">
          <div>
            <span class="method-badge">Framework</span>
            <h3>${method.name}</h3>
            <p>${method.description}</p>
          </div>
          <div class="method-mini-panel">
            <h4>&#127919; Quand l'utiliser</h4>
            <p>${method.when}</p>
          </div>
        </div>
        <div class="method-panels">
          <div class="method-panel method-panel-steps">
            <h4>&#128260; Sequencement recommande</h4>
            <div class="method-steps">
              ${method.steps.map((s, i) => `
                <div class="method-step">
                  <div class="step-num">${i + 1}</div>
                  <div class="step-title">${s}</div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="method-panel">
            <h4>&#128161; Tips terrain</h4>
            <div class="method-tips">
              ${method.tips.map(t => `<p>&#8226; ${t}</p>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Prev/Next
  const keys = Object.keys(METHOD_CATEGORIES);
  const idx = keys.indexOf(methodKey);
  html += `<div class="page-nav">`;
  if (idx > 0) {
    const prev = METHOD_CATEGORIES[keys[idx - 1]];
    html += `<a href="#methods/${keys[idx - 1]}"><span class="nav-label">&#8592; Précédent</span><span class="nav-title">${prev.title}</span></a>`;
  } else {
    html += `<div></div>`;
  }
  if (idx < keys.length - 1) {
    const next = METHOD_CATEGORIES[keys[idx + 1]];
    html += `<a href="#methods/${keys[idx + 1]}"><span class="nav-label">Suivant &#8594;</span><span class="nav-title">${next.title}</span></a>`;
  }
  html += `</div>`;

  return html;
}

function renderAccelerators() {
  let html = `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <span>Accélérateurs</span>
    </div>
    <div class="section-header fade-in">
      <h2>&#128640; Accélérateurs & Templates</h2>
      <p>Templates et fichiers prêts à l'emploi. Téléchargez, personnalisez, utilisez. Chaque fichier inclut un onglet ou une slide Guide.</p>
    </div>
  `;

  const iconMap = { xlsx: '&#128202;', pptx: '&#128198;', csv: '&#128196;', html: '&#9889;' };
  const labelMap = { xlsx: 'Excel', pptx: 'PowerPoint', csv: 'CSV', html: 'HTML' };

  for (const [format, meta] of Object.entries(ACCELERATOR_FORMAT_META)) {
    const entries = ACCELERATORS_DATA.filter(acc => acc.format === format);
    if (entries.length === 0) continue;
    html += `
      <section class="accelerator-group fade-in">
        <div class="section-header" style="margin-bottom: 1.2rem;">
          <h2>${meta.title}</h2>
          <p>${meta.description}</p>
        </div>
    `;
    for (const acc of entries) {
      html += `
        <div class="accelerator-card">
          <div class="accelerator-icon ${acc.format}">${iconMap[acc.format]}</div>
          <div class="accelerator-info">
            <h3>${acc.name}</h3>
            <p>${acc.desc}</p>
          </div>
          <a href="${acc.file}" class="download-btn" download>&#11015; ${labelMap[acc.format]}</a>
        </div>
      `;
    }
    html += `</section>`;
  }

  return html;
}

function renderApps() {
  let html = `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <span>Mini-Apps</span>
    </div>
    <div class="section-header fade-in">
      <h2>&#9889; Mini-Apps Interactives</h2>
      <p>Applications web standalone. Ouvrez-les dans votre navigateur, zéro installation.</p>
    </div>
  `;

  let currentSection = '';
  for (const app of APPS_DATA) {
    if (app.section !== currentSection) {
      currentSection = app.section;
      html += `
        <div class="section-header fade-in" style="margin-top: 1.75rem;">
          <h2>${app.section}</h2>
          <p>${APP_SECTION_DESCRIPTIONS[app.section] || ''}</p>
        </div>
      `;
    }
    html += `
      <div class="accelerator-card">
        <div class="accelerator-icon html">&#9889;</div>
        <div class="accelerator-info">
          <h3>${app.name}</h3>
          <p>${app.desc}</p>
        </div>
        <a href="${app.file}" class="download-btn" target="_blank" style="background: ${app.color}">&#9654; Ouvrir</a>
      </div>
    `;
  }

  return html;
}

function renderCheatsheets() {
  let html = `
    <div class="breadcrumb">
      <a href="#home">Accueil</a> <span class="sep">&#9656;</span>
      <span>Cheat Sheets</span>
    </div>
    <div class="section-header fade-in">
      <h2>&#128203; Cheat Sheets</h2>
      <p>Fiches mémo essentielles. Imprimez-les (Ctrl+P) et gardez-les sous la main.</p>
    </div>

    <div class="cheatsheet">
      <h3>&#9997; Redaction de User Stories</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item">
          <h4>Format standard</h4>
          <p><strong>En tant que</strong> [persona],<br><strong>je veux</strong> [action],<br><strong>afin de</strong> [benefice].</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Critères INVEST</h4>
          <p><strong>I</strong>ndependante, <strong>N</strong>egociable, <strong>V</strong>alorisable, <strong>E</strong>stimable, <strong>S</strong>uffisamment petite, <strong>T</strong>estable</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Critères d'acceptance (Given/When/Then)</h4>
          <p><strong>Etant donne</strong> [contexte],<br><strong>quand</strong> [action],<br><strong>alors</strong> [résultat attendu].</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Story Splitting patterns</h4>
          <p>Par workflow step, par regles métier, par type de données, par interface, par performance, happy path vs edge cases.</p>
        </div>
      </div>
    </div>

    <div class="cheatsheet">
      <h3>&#9878; Priorisation rapide</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item">
          <h4>RICE</h4>
          <p><strong>R</strong>each x <strong>I</strong>mpact x <strong>C</strong>onfidence / <strong>E</strong>ffort<br>Impact: 3=massif, 2=haut, 1=moyen, 0.5=faible, 0.25=minimal</p>
        </div>
        <div class="cheatsheet-item">
          <h4>MoSCoW</h4>
          <p><strong>M</strong>ust have (&le;60%), <strong>S</strong>hould have (~20%), <strong>C</strong>ould have (~20%), <strong>W</strong>on't have (this time)</p>
        </div>
        <div class="cheatsheet-item">
          <h4>WSJF</h4>
          <p>Cost of Delay / Job Size<br>CoD = User Value + Time Criticality + Risk Reduction</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Value/Effort Matrix</h4>
          <p>&#127775; Quick Wins (haute V, faible E)<br>&#128640; Big Bets (haute V, haut E)<br>&#128161; Fill-ins (faible V, faible E)<br>&#9940; Money Pits (faible V, haut E)</p>
        </div>
      </div>
    </div>

    <div class="cheatsheet">
      <h3>&#128200; Métriques essentielles</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item">
          <h4>HEART (Google)</h4>
          <p><strong>H</strong>appiness (NPS, CSAT)<br><strong>E</strong>ngagement (DAU/MAU)<br><strong>A</strong>doption (signups, activation)<br><strong>R</strong>etention (churn, DAU/MAU)<br><strong>T</strong>ask success (complétion rate)</p>
        </div>
        <div class="cheatsheet-item">
          <h4>AARRR (Pirate Metrics)</h4>
          <p><strong>A</strong>cquisition → <strong>A</strong>ctivation → <strong>R</strong>etention → <strong>R</strong>evenue → <strong>R</strong>eferral<br>Concentrez-vous sur le maillon faible.</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Agile Delivery</h4>
          <p>Velocity (SP/sprint), Lead Time, Cycle Time, Throughput, Sprint Burndown, Cumulative Flow, Defect Escape Rate</p>
        </div>
        <div class="cheatsheet-item">
          <h4>SaaS Business</h4>
          <p>MRR/ARR, Churn Rate, LTV, CAC, LTV:CAC Ratio (&ge;3:1), Net Revenue Retention, Payback Period</p>
        </div>
      </div>
    </div>

    <div class="cheatsheet">
      <h3>&#128197; Ceremonies Agile — Rôle du PO</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item">
          <h4>Sprint Planning</h4>
          <p><strong>Avant :</strong> backlog groom&eacute;, stories ready<br><strong>Pendant :</strong> pr&eacute;senter le why, clarifier, ne pas imposer le how<br><strong>Output :</strong> sprint goal + sprint backlog</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Daily Standup</h4>
          <p><strong>Rôle PO :</strong> écouter, débloquer, pas micro-manager<br><strong>Duree :</strong> 15 min max<br><strong>Apport :</strong> contexte business si besoin</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Sprint Review</h4>
          <p><strong>Avant :</strong> inviter les stakeholders<br><strong>Pendant :</strong> demo du Done, collecter feedback<br><strong>Apres :</strong> adapter le backlog</p>
        </div>
        <div class="cheatsheet-item">
          <h4>Refinement</h4>
          <p><strong>Frequence :</strong> 1-2x par sprint<br><strong>Contenu :</strong> clarifier stories, estimer, splitter<br><strong>Objectif :</strong> 2 sprints de stories ready</p>
        </div>
      </div>
    </div>
  `;

  return html;
}

// ---- Filter Tools ----
function filterTools(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.tool-card').forEach(card => {
    const pricing = card.dataset.pricing;
    const ideal = card.dataset.ideal || '';
    let show = true;
    if (filter === 'free') show = pricing === 'free';
    else if (filter === 'freemium') show = pricing === 'freemium';
    else if (filter === 'paid') show = pricing === 'paid';
    else if (filter === 'po-métier') show = ideal.includes('po métier');
    else if (filter === 'po-technique') show = ideal.includes('po technique');
    card.style.display = show ? '' : 'none';
  });
}

// ---- Search ----
function buildSearchIndex() {
  const index = [];
  for (const [key, cat] of Object.entries(TOOL_CATEGORIES)) {
    for (const tool of cat.tools) {
      index.push({
        title: tool.name,
        category: cat.title,
        type: 'tool',
        icon: tool.logo,
        link: `#tools/${key}/${slugify(tool.name)}`,
        searchText: `${tool.name} ${tool.tagline} ${tool.description} ${cat.title} ${tool.ideal.join(' ')} ${tool.intégrations.join(' ')}`.toLowerCase()
      });
    }
  }
  for (const [key, cat] of Object.entries(METHOD_CATEGORIES)) {
    for (const method of cat.methods) {
      index.push({
        title: method.name,
        category: cat.title,
        type: 'method',
        icon: cat.icon,
        link: `#methods/${key}/${slugify(method.name)}`,
        searchText: `${method.name} ${method.description} ${cat.title} ${method.when} ${method.tips.join(' ')}`.toLowerCase()
      });
    }
  }
  return index;
}

let searchIndex = [];

function openSearch() {
  const modal = document.getElementById('search-modal');
  modal.classList.add('open');
  const input = modal.querySelector('.search-modal-input');
  input.value = '';
  input.focus();
  renderSearchResults('');
}

function closeSearch() {
  document.getElementById('search-modal').classList.remove('open');
}

function renderSearchResults(query) {
  const container = document.getElementById('search-results');
  if (!query) {
    container.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-tertiary);">Tapez pour rechercher parmi les outils et méthodes...</div>';
    return;
  }
  const q = query.toLowerCase();
  const results = searchIndex.filter(item => item.searchText.includes(q)).slice(0, 10);

  if (results.length === 0) {
    container.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-tertiary);">Aucun résultat</div>';
    return;
  }

  container.innerHTML = results.map(r => `
    <a class="search-result-item" href="${r.link}" onclick="closeSearch()" style="color: inherit; text-decoration: none;">
      <span class="result-icon">${r.icon}</span>
      <div>
        <div class="result-title">${r.title}</div>
        <div class="result-category">${r.category}</div>
      </div>
    </a>
  `).join('');
}

// ---- Sidebar ----
function renderSidebar() {
  let html = `
    <div class="sidebar-section">
      <div class="sidebar-section-title">Guide</div>
      <a class="sidebar-link" href="#home">
        <span class="link-icon">&#127968;</span> Accueil
      </a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Accélérateurs</div>
      <a class="sidebar-link" href="#apps"><span class="link-icon">&#9889;</span> Mini-Apps</a>
      <a class="sidebar-link" href="#accelerators"><span class="link-icon">&#128196;</span> Templates</a>
      <a class="sidebar-link" href="#cheatsheets"><span class="link-icon">&#128203;</span> Cheat Sheets</a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Outils</div>
  `;
  for (const [key, cat] of Object.entries(TOOL_CATEGORIES)) {
    html += `<a class="sidebar-link" href="#tools/${key}"><span class="link-icon">${cat.icon}</span> ${cat.title}</a>`;
  }
  html += `</div><div class="sidebar-section"><div class="sidebar-section-title">Méthodes</div>`;
  for (const [key, cat] of Object.entries(METHOD_CATEGORIES)) {
    html += `<a class="sidebar-link" href="#methods/${key}"><span class="link-icon">${cat.icon}</span> ${cat.title}</a>`;
  }
  html += `</div>`;
  return html;
}

function updateActiveSidebar() {
  const hash = window.location.hash || '#home';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    const isActive = hash === href || (href !== '#home' && hash.startsWith(`${href}/`));
    link.classList.toggle('active', isActive);
  });
}

// ---- Router Handler ----
function handleRoute() {
  const { page, subpage, detail } = getRoute();
  const main = document.getElementById('main-content');

  let content;
  if (page === 'home' || page === '') {
    content = renderHome();
  } else if (page === 'tools' && !subpage) {
    content = renderToolsOverview();
  } else if (page === 'tools' && subpage) {
    content = renderToolCategory(subpage, detail);
  } else if (page === 'methods' && !subpage) {
    content = renderMethodsOverview();
  } else if (page === 'methods' && subpage) {
    content = renderMethodCategory(subpage, detail);
  } else if (page === 'accelerators') {
    content = renderAccelerators();
  } else if (page === 'apps') {
    content = renderApps();
  } else if (page === 'cheatsheets') {
    content = renderCheatsheets();
  } else {
    content = renderHome();
  }

  main.innerHTML = `<div class="page-content">${content}</div>`;
  updateActiveSidebar();

  if (detail) {
    scrollToRouteDetail(detail);
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  Object.assign(window, { navigateTo, filterTools, closeSearch });

  // Theme
  setTheme(getTheme());

  // Sidebar
  document.getElementById('sidebar').innerHTML = renderSidebar();

  // Search
  searchIndex = buildSearchIndex();

  // Route
  handleRoute();
  window.addEventListener('hashchange', handleRoute);

  // Theme toggle
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  // Search modal
  const searchBox = document.querySelector('.search-box');
  searchBox.addEventListener('click', openSearch);
  searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSearch();
    }
  });
  document.getElementById('search-modal').addEventListener('click', (e) => {
    if (e.target.id === 'search-modal') closeSearch();
  });
  document.getElementById('search-input').addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  // Mobile menu
  document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Close sidebar on link click (mobile)
  document.getElementById('sidebar').addEventListener('click', (e) => {
    if (e.target.closest('.sidebar-link') && window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});
