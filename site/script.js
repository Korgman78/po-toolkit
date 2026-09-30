// ============================================================
//  PO Toolkit — application (routeur, rendu, palette, progression)
// ============================================================
const TOOL_CATEGORIES = window.PO_TOOLKIT_DATA?.TOOLS_DATA || {};
const METHOD_CATEGORIES = window.PO_TOOLKIT_DATA?.METHODS_DATA || {};
const FORMATION_CATEGORIES = window.PO_TOOLKIT_DATA?.FORMATION_DATA || {};

// ---------- Icons (inline SVG, stroke-based, 24px grid) ----------
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  enter: '<path d="M9 10 4 15l5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>',
  message: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  list: '<path d="M4 6h16M4 12h10M4 18h5"/>',
  cards: '<rect x="4" y="6" width="10" height="14" rx="1.5"/><path d="M8 3h10.5A1.5 1.5 0 0 1 20 4.5V17"/>',
  split: '<path d="M4 4v16M20 4v16"/><path d="M8 8h8M8 12h5M8 16h7"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
  board: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M9 9v11M15 9v11"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
  flow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a2 2 0 0 1 2 2v7"/>',
  braces: '<path d="M8 4H7a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-1"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  kanban: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M9 4v16M15 4v16"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-4-5.6"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  code: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
  checkSquare: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 3 3 5-6"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
  sparkles: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
};

function icon(name, size = 16, cls = '') {
  return `<svg class="icon${cls ? ` ${cls}` : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.dot}</svg>`;
}

const TOOL_CATEGORY_ICONS = {
  'project-management': 'kanban', roadmapping: 'route', 'ia-assistants': 'sparkles', 'design-prototyping': 'pen', 'user-research': 'users',
  analytics: 'chart', collaboration: 'message', documentation: 'file', 'devops-technical': 'code',
  'api-testing': 'plug', testing: 'checkSquare',
};
const METHOD_CATEGORY_ICONS = { prioritization: 'list', discovery: 'compass', metrics: 'chart', scaling: 'layers' };
const COURSE_ICONS = {
  'architecture-fonctionnelle': 'flow', 'api-contrats': 'plug', 'donnees-modelisation': 'database',
  'ci-cd': 'refresh', 'ia-safe': 'cpu', 'projet-produit': 'box', 'ia-quotidien': 'sparkles',
};

// ---------- Static data ----------
const FORMATION_TRACKS = [
  { name: "Discovery & Produit", desc: "Trouver, cadrer et prioriser la bonne chose à construire." },
  { name: "Delivery & Agilité", desc: "Livrer avec un flux sain, des estimations fiables et des rituels utiles." },
  { name: "Technique", desc: "Comprendre les systèmes et dialoguer d'égal à égal avec l'équipe technique." },
];

const APPS_DATA = [
  { key: 'prio', section: "Cadrage & priorisation", name: "Calculateur de priorisation", short: "RICE, WSJF, ICE, MoSCoW, valeur/effort", desc: "RICE, WSJF, ICE, MoSCoW, valeur/effort, avec critères personnalisés et pondération.", file: "../accelerators/html/prioritization-calculator.html", icon: 'list', mode: 'local', task: "Prioriser le backlog", shortcut: 'p' },
  { key: 'story', section: "Cadrage & priorisation", name: "Story Splitter", short: "Découpage vertical guidé", desc: "Découpez une feature en stories actionnables avec des patterns : workflow, règles métier, données, cas limites.", file: "../accelerators/html/story-splitter.html", icon: 'split', mode: 'local', task: "Découper une user story", shortcut: 's' },
  { key: 'roadmap', section: "Roadmapping & stratégie", name: "Roadmap Designer", short: "Epics et features sur plusieurs mois", desc: "Roadmap epic/feature multi-mois avec timeline, statuts, priorités, sauvegarde locale et import/export JSON.", file: "../accelerators/html/roadmap-designer.html", icon: 'route', mode: 'local', task: "Construire une roadmap", shortcut: 'm' },
  { key: 'poker', section: "Planification & facilitation", name: "Planning Poker", short: "Estimation en équipe", desc: "Vote d'estimation en équipe, Fibonacci ou tailles de t-shirt, révélation simultanée.", file: "../accelerators/html/planning-poker.html", icon: 'cards', mode: 'realtime', task: "Estimer avec l'équipe", shortcut: 'e' },
  { key: 'pi', section: "Planification & facilitation", name: "PI Planning Simulator", short: "Capacité, dépendances, objectifs", desc: "Planifiez un PI par sprint : capacité, points, must/should, dépendances, IP sprint, objectifs, risques, export CSV.", file: "../accelerators/html/pi-planning-simulator.html", icon: 'board', mode: 'local', task: "Préparer un PI Planning", shortcut: 'i' },
  { key: 'daily', section: "Planification & facilitation", name: "Daily Standup Timer", short: "Tour de parole minuté", desc: "Chronomètre avec un temps par personne pour garder le daily dans les temps.", file: "../accelerators/html/daily-standup-timer.html", icon: 'timer', mode: 'realtime', task: "Animer le daily", shortcut: 'd' },
  { key: 'retro', section: "Planification & facilitation", name: "Retro Board", short: "Rétrospective, votes, actions", desc: "Tableau de rétrospective interactif : colonnes personnalisables, votes et export.", file: "../accelerators/html/retro-board.html", icon: 'message', mode: 'realtime', task: "Animer une rétrospective", shortcut: 'r' },
  { key: 'schemas', section: "Schémas & ateliers", name: "Schémas & Workflows", short: "Diagrammes de flux et d'architecture", desc: "Canvas de modélisation : modules front, microservices, Kafka, Postgres, API et liaisons.", file: "../accelerators/html/schemas-workflows.html", icon: 'flow', mode: 'local', task: "Schématiser un flux", shortcut: 'w' },
  { key: 'json', section: "Utilitaires", name: "JSON & UUID Tools", short: "Validation JSON, génération d'UUID", desc: "Validateur JSON (format, minify, tri des clés) et générateur d'UUID (v4, v7, Nano ID).", file: "../accelerators/html/json-uuid-tools.html", icon: 'braces', mode: 'local' },
];
const QUICK_ACTIONS = ['retro', 'prio', 'poker', 'story', 'roadmap', 'pi'].map(k => APPS_DATA.find(a => a.key === k));

const APP_SECTION_DESCRIPTIONS = {
  "Cadrage & priorisation": "Passer de l'idée au backlog priorisé.",
  "Roadmapping & stratégie": "Construire une roadmap lisible par outcomes, epics et horizons.",
  "Planification & facilitation": "Animer les estimations, les arbitrages de PI et les rituels d'équipe.",
  "Schémas & ateliers": "Modéliser un workflow ou une architecture légère pendant un atelier.",
  "Utilitaires": "Petits outils transverses pour gagner du temps.",
};

const ACCELERATORS_DATA = [
  { name: "Template User Stories", desc: "Rôle, action, bénéfice, critères d'acceptance, priorité, story points. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/user-story-template.xlsx" },
  { name: "Matrices de priorisation", desc: "Un onglet par méthode : RICE, WSJF, ICE, MoSCoW et valeur/effort. Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/prioritization-matrices.xlsx" },
  { name: "Release Plan", desc: "Planning de release avec calcul de vélocité, jalons et suivi. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/release-plan.xlsx" },
  { name: "Capacity Planning", desc: "Charge et capacité par sprint, congés et allocation. Onglet Guide inclus.", format: "xlsx", file: "../accelerators/xlsx/capacity-planning.xlsx" },
  { name: "Product Canvas", desc: "Vision, personas, problèmes, solutions, métriques. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/product-canvas.pptx" },
  { name: "Sprint Review", desc: "Support pré-formaté : démo, métriques et prochaines étapes. Slide Guide incluse.", format: "pptx", file: "../accelerators/pptx/sprint-review-template.pptx" },
  { name: "Definition of Ready / Done", desc: "Checklists DoR et DoD prêtes à afficher, format poster A3.", format: "pptx", file: "../accelerators/pptx/definition-of-ready-done.pptx" },
  { name: "Stakeholder Map", desc: "Matrice pouvoir/intérêt pour cartographier les parties prenantes.", format: "pptx", file: "../accelerators/pptx/stakeholder-mapping.pptx" },
  { name: "Outcome tree agile AI-native", desc: "Arbre OKR → outcomes d'ART → outcomes d'équipe → paris, avec exemple complet, fiche pari (indicateur avancé, critère d'arrêt, rôle de l'IA) et revue Sense & Respond.", format: "pptx", file: "../accelerators/pptx/outcome-tree-ai-native.pptx" },
  { name: "Bibliothèque de slides", desc: "225 slides : diagrammes, timelines, matrices, pyramides, process flows, tableaux.", format: "pptx", file: "../accelerators/pptx/Slides Library_A4.pptx" },
  { name: "Import Jira", desc: "CSV pré-formaté pour un import en masse dans Jira, colonnes mappées.", format: "csv", file: "../accelerators/csv/jira-import-template.csv" },
  { name: "Import Azure DevOps", desc: "CSV pré-formaté pour un import en masse dans Azure DevOps.", format: "csv", file: "../accelerators/csv/ado-import-template.csv" },
];
const ACCELERATOR_FORMAT_META = {
  xlsx: { title: "Classeurs Excel", description: "Priorisation, backlog, release et capacité." },
  pptx: { title: "Supports et canvases", description: "Cadrage, ateliers et communication avec les parties prenantes." },
  csv: { title: "Imports", description: "Imports en masse dans Jira et Azure DevOps." },
};

const CHEATSHEETS = [
  { title: "Rédaction de user stories", items: [
    ["Format standard", "<strong>En tant que</strong> [persona], <strong>je veux</strong> [action], <strong>afin de</strong> [bénéfice]."],
    ["Critères INVEST", "<strong>I</strong>ndépendante, <strong>N</strong>égociable, <strong>V</strong>alorisable, <strong>E</strong>stimable, <strong>S</strong>uffisamment petite, <strong>T</strong>estable."],
    ["Critères d'acceptance", "<strong>Étant donné</strong> [contexte], <strong>quand</strong> [action], <strong>alors</strong> [résultat attendu]."],
    ["Patterns de découpage", "Par étape du workflow, par règle métier, par type de données, par interface, par performance, cas nominal puis cas limites."],
  ] },
  { title: "Priorisation rapide", items: [
    ["RICE", "<strong>R</strong>each × <strong>I</strong>mpact × <strong>C</strong>onfidence ÷ <strong>E</strong>ffort. Impact : 3 massif, 2 fort, 1 moyen, 0,5 faible, 0,25 minimal."],
    ["MoSCoW", "<strong>Must</strong> (≤ 60 %), <strong>Should</strong> (~20 %), <strong>Could</strong> (~20 %), <strong>Won't</strong> (pas cette fois)."],
    ["WSJF", "Coût du retard ÷ taille du travail. Coût du retard = valeur métier + criticité temporelle + réduction de risque."],
    ["Matrice valeur / effort", "<strong>Quick wins</strong> (valeur haute, effort faible) · <strong>Paris</strong> (valeur haute, effort élevé) · <strong>Bouche-trous</strong> (faible, faible) · <strong>Gouffres</strong> (valeur faible, effort élevé)."],
  ] },
  { title: "Métriques essentielles", items: [
    ["HEART (Google)", "<strong>Happiness</strong> (NPS, CSAT), <strong>Engagement</strong> (DAU/MAU), <strong>Adoption</strong> (activation), <strong>Retention</strong> (churn), <strong>Task success</strong> (taux de complétion)."],
    ["AARRR", "Acquisition → Activation → Rétention → Revenu → Recommandation. Concentrez-vous sur le maillon faible."],
    ["Delivery agile", "Lead time, cycle time, débit, burndown, cumulative flow, taux de défauts échappés."],
    ["SaaS", "MRR/ARR, churn, LTV, CAC, ratio LTV:CAC (≥ 3:1), net revenue retention, délai de retour sur investissement."],
  ] },
  { title: "Cérémonies agiles : le rôle du PO", items: [
    ["Sprint planning", "<strong>Avant :</strong> backlog affiné, stories prêtes. <strong>Pendant :</strong> présenter le pourquoi, clarifier, ne pas imposer le comment. <strong>Résultat :</strong> objectif et backlog de sprint."],
    ["Daily", "<strong>Rôle du PO :</strong> écouter, débloquer, ne pas micro-manager. 15 minutes maximum."],
    ["Sprint review", "<strong>Avant :</strong> inviter les parties prenantes. <strong>Pendant :</strong> démontrer le terminé, recueillir les retours. <strong>Après :</strong> adapter le backlog."],
    ["Affinage", "Une à deux fois par sprint : clarifier, estimer, découper. Objectif : deux sprints de stories prêtes."],
  ] },
];

const TOOL_LOGO_SLUGS = {
  jira: "jira", linear: "linear", "azure-devops": "azuredevops", shortcut: "shortcut", asana: "asana",
  "monday-com": "mondaydotcom", trello: "trello", clickup: "clickup", youtrack: "youtrack", "github-projects": "github",
  productboard: "productboard", aha: "aha", airfocus: "airfocus", figma: "figma", miro: "miro", sketch: "sketch",
  penpot: "penpot", figjam: "figma", slack: "slack", "microsoft-teams": "microsoftteams",
  zoom: "zoom", loom: "loom", notion: "notion", confluence: "confluence", coda: "coda", docusaurus: "docusaurus",
  gitbook: "gitbook", amplitude: "amplitude", mixpanel: "mixpanel", tableau: "tableau", looker: "looker",
  metabase: "metabase", powerbi: "powerbi", hotjar: "hotjar", datadog: "datadog", sentry: "sentry",
  intercom: "intercom", typeform: "typeform", dovetail: "dovetail", maze: "maze", zendesk: "zendesk",
  salesforce: "salesforce", github: "github", gitlab: "gitlab", bitbucket: "bitbucket", openai: "openai",
  chatgpt: "openai", claude: "anthropic", perplexity: "perplexity", "google-analytics": "googleanalytics",
  "google-meet": "googlemeet", "google-workspace": "googleworkspace", fullstory: "fullstory", mural: "mural",
  whimsical: "whimsical",
};

const PRICING = {
  free: { label: 'Gratuit', cls: 'badge-free' },
  freemium: { label: 'Freemium', cls: 'badge-freemium' },
  paid: { label: 'Payant', cls: 'badge-paid' },
};

// ---------- Utilities ----------
const $ = (sel, root = document) => root.querySelector(sel);
const pad2 = (n) => String(n).padStart(2, '0');

function legacySlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function stripTags(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
}
function tint(key) {
  let h = 0;
  for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `tint-${(h % 6) + 1}`;
}
function tile(iconName, key, small = false) {
  return `<span class="tile-icon ${tint(key)}${small ? ' tile-sm' : ''}">${icon(iconName, small ? 14 : 16)}</span>`;
}
function plural(n, one, many) { return `${n} ${n > 1 ? many : one}`; }

function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function safeSet(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ } }

// ---------- Theme ----------
function currentTheme() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
function setTheme(theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) safeSet('po-toolkit-theme', theme);
  const btn = $('#theme-toggle');
  if (btn) {
    btn.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 16);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre');
  }
}

// ---------- Progress (per viewer, stored locally) ----------
const PROGRESS_KEY = 'po-toolkit-progress';
function loadProgress() {
  try { return JSON.parse(safeGet(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function saveProgress(p) { safeSet(PROGRESS_KEY, JSON.stringify(p)); }
function courseState(key) {
  const p = loadProgress()[key] || {};
  return { done: new Set(p.done || []), last: p.last || null, quiz: p.quiz || null, updated: p.updated || 0 };
}
function updateCourse(key, fn) {
  const all = loadProgress();
  const cur = all[key] || { done: [] };
  fn(cur);
  cur.updated = Date.now();
  all[key] = cur;
  saveProgress(all);
}
function markChapterDone(key, slug) {
  updateCourse(key, c => { if (!c.done.includes(slug)) c.done.push(slug); });
}
function setLastChapter(key, slug) { updateCourse(key, c => { c.last = slug; }); }
function saveQuizScore(key, right, total) {
  updateCourse(key, c => { if (!c.quiz || right > c.quiz.best) c.quiz = { best: right, total }; });
}
function courseSummary(key) {
  const theme = FORMATION_CATEGORIES[key];
  const st = courseState(key);
  const doneCount = theme.chapters.filter(ch => st.done.has(ch.slug)).length;
  const total = theme.chapters.length;
  const nextCh = theme.chapters.find(ch => !st.done.has(ch.slug));
  const started = doneCount > 0 || !!st.last;
  const finished = doneCount === total;
  return { theme, st, doneCount, total, nextCh, started, finished };
}
function readingMinutes(html) {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ---------- Tool logos ----------
function toolFavicon(tool) {
  try {
    const host = new URL(tool.url).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch (e) { return ''; }
}
function toolLogo(tool, large = false) {
  const slug = TOOL_LOGO_SLUGS[legacySlug(tool.name)];
  const favicon = toolFavicon(tool);
  const src = slug ? `https://cdn.simpleicons.org/${slug}` : favicon;
  const fallback = escapeHtml(tool.name.slice(0, 2).toUpperCase());
  const cls = `tool-logo${large ? ' tool-logo-lg' : ''}`;
  if (!src) return `<span class="${cls}">${fallback}</span>`;
  const alt = slug && favicon ? ` data-alt-src="${favicon}"` : '';
  return `<span class="${cls}"><img src="${src}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback="${fallback}"${alt}></span>`;
}
function scoreView(score) {
  return `<span class="score" title="Score PO ${score}/10"><span class="score-bar"><span style="width:${score * 10}%"></span></span>${Number(score).toFixed(1)}</span>`;
}

// ---------- Router ----------
function getRoute() {
  const hash = decodeURIComponent(window.location.hash.slice(1)) || 'home';
  const [page, subpage = null, detail = null] = hash.split('/');
  return { page: page || 'home', subpage, detail };
}
const TOOLBOX_PAGES = ['toolbox', 'apps', 'accelerators', 'cheatsheets'];
function sectionOf(page) {
  if (page === 'formation') return 'formation';
  if (TOOLBOX_PAGES.includes(page)) return 'toolbox';
  if (page === 'tools') return 'tools';
  if (page === 'methods') return 'methods';
  return 'home';
}

// ---------- Sidebar ----------
function renderSidebar(route) {
  const section = sectionOf(route.page);
  const toolCount = Object.values(TOOL_CATEGORIES).reduce((s, c) => s + c.tools.length, 0);
  const methodCount = Object.values(METHOD_CATEGORIES).reduce((s, c) => s + c.methods.length, 0);
  const nav = [
    { id: 'home', label: 'Accueil', icon: 'home', href: '#home' },
    { id: 'formation', label: 'Formation', icon: 'book', href: '#formation', count: Object.keys(FORMATION_CATEGORIES).length },
    { id: 'toolbox', label: 'Boîte à outils', icon: 'grid', href: '#toolbox', count: APPS_DATA.length },
    { id: 'tools', label: "Référentiel d'outils", icon: 'layers', href: '#tools', count: toolCount },
    { id: 'methods', label: 'Méthodes', icon: 'compass', href: '#methods', count: methodCount },
  ];

  let html = `
    <a class="brand" href="#home" aria-label="PO Toolkit, accueil">
      <span class="brand-mark"><span></span></span>
      <span class="brand-name">PO Toolkit</span>
    </a>
    <div class="nav">
      ${nav.map(n => `
        <a class="nav-link${section === n.id ? ' is-active' : ''}" href="${n.href}"${section === n.id ? ' aria-current="page"' : ''}>
          ${icon(n.icon, 16)}<span class="label">${n.label}</span>
        </a>`).join('')}
    </div>
  `;

  if (route.page === 'formation' && route.subpage && FORMATION_CATEGORIES[route.subpage]) {
    const key = route.subpage;
    const { theme, st, doneCount, total } = courseSummary(key);
    html += `
      <div class="side-section">
        <span class="eyebrow">Ce parcours</span>
        <a class="side-title" href="#formation/${key}" style="color: inherit">${theme.title}</a>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="progress" style="flex-grow:1"><span style="width:${Math.round(doneCount / total * 100)}%"></span></div>
          <span class="mono" style="font-size:11.5px;color:var(--text-3)">${pad2(doneCount)}/${pad2(total)}</span>
        </div>
        <ol class="side-list">
          ${theme.chapters.map((ch, i) => {
            const active = route.detail === ch.slug;
            const done = st.done.has(ch.slug);
            return `<li><a class="side-item${active ? ' is-active' : ''}${done ? ' is-done' : ''}" href="#formation/${key}/${ch.slug}"${active ? ' aria-current="page"' : ''}>
              <span class="num">${done && !active ? '✓' : pad2(i + 1)}</span><span>${ch.title}</span></a></li>`;
          }).join('')}
          ${theme.quiz && theme.quiz.length ? `<li><a class="side-item${route.detail === 'quiz' ? ' is-active' : ''}${st.quiz ? ' is-done' : ''}" href="#formation/${key}/quiz">
            <span class="num">${st.quiz ? '✓' : ''}</span><span>Quiz final</span>${st.quiz ? `<span class="count">${st.quiz.best}/${st.quiz.total}</span>` : ''}</a></li>` : ''}
        </ol>
      </div>`;
  } else if (section === 'tools') {
    html += `
      <div class="side-section">
        <span class="eyebrow">Catégories</span>
        <div class="side-list">
          ${Object.entries(TOOL_CATEGORIES).map(([k, c]) => `
            <a class="side-item${route.subpage === k ? ' is-active' : ''}" href="#tools/${k}">
              <span>${c.title}</span></a>`).join('')}
        </div>
      </div>`;
  } else if (section === 'methods') {
    html += `
      <div class="side-section">
        <span class="eyebrow">Familles</span>
        <div class="side-list">
          ${Object.entries(METHOD_CATEGORIES).map(([k, c]) => `
            <a class="side-item${route.subpage === k ? ' is-active' : ''}" href="#methods/${k}">
              <span>${c.title}</span></a>`).join('')}
        </div>
      </div>`;
  } else if (section === 'toolbox') {
    const items = [
      ['apps', 'Mini-apps', APPS_DATA.length], ['accelerators', 'Templates', ACCELERATORS_DATA.length], ['cheatsheets', 'Fiches mémo', CHEATSHEETS.length],
    ];
    html += `
      <div class="side-section">
        <span class="eyebrow">Boîte à outils</span>
        <div class="side-list">
          ${items.map(([p, l]) => `<a class="side-item${route.page === p ? ' is-active' : ''}" href="#${p}"><span>${l}</span></a>`).join('')}
        </div>
      </div>`;
  }
  return html;
}

// ---------- Breadcrumbs ----------
function crumbsFor(route) {
  const c = [];
  const { page, subpage, detail } = route;
  if (page === 'formation') {
    c.push(['Formation', '#formation']);
    const theme = FORMATION_CATEGORIES[subpage];
    if (theme) {
      c.push([theme.title, `#formation/${subpage}`]);
      if (detail === 'quiz') c.push(['Quiz final']);
      else if (detail) {
        const idx = theme.chapters.findIndex(ch => ch.slug === detail);
        if (idx >= 0) c.push([`Chapitre ${pad2(idx + 1)}`]);
      }
    }
  } else if (TOOLBOX_PAGES.includes(page)) {
    c.push(['Boîte à outils', '#toolbox']);
    if (page === 'apps') c.push(['Mini-apps']);
    if (page === 'accelerators') c.push(['Templates']);
    if (page === 'cheatsheets') c.push(['Fiches mémo']);
  } else if (page === 'tools') {
    c.push(["Référentiel d'outils", '#tools']);
    if (TOOL_CATEGORIES[subpage]) c.push([TOOL_CATEGORIES[subpage].title]);
  } else if (page === 'methods') {
    c.push(['Méthodes', '#methods']);
    if (METHOD_CATEGORIES[subpage]) c.push([METHOD_CATEGORIES[subpage].title]);
  } else {
    c.push(['Accueil']);
  }
  const last = c.length - 1;
  return c.map(([label, href], i) => i === last || !href
    ? `<span class="current">${label}</span>`
    : `<a href="${href}">${label}</a><span class="sep">/</span>`).join('');
}

// ---------- Shared views ----------
function pageHead({ kicker, title, lead, aside = '' }) {
  return `
    <header class="page-head">
      <div class="head-row">
        <div style="display:flex;flex-direction:column;gap:10px;min-width:0">
          ${kicker ? `<span class="kicker">${kicker}</span>` : ''}
          <h1>${title}</h1>
        </div>
        ${aside}
      </div>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </header>`;
}
function appModeView(app) {
  return app.mode === 'realtime'
    ? `<span style="display:inline-flex;align-items:center;gap:8px;white-space:nowrap;color:var(--text-2)"><span class="dot dot-live"></span>Temps réel</span>`
    : `<span style="display:inline-flex;align-items:center;gap:8px;white-space:nowrap;color:var(--text-3)"><span class="dot"></span>Local</span>`;
}
function appsTable(apps) {
  return `
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Outil</th><th>Usage</th><th>Mode</th><th class="right"><span class="sr-only">Ouvrir</span></th></tr></thead>
        <tbody>
          ${apps.map(a => `
            <tr class="is-link" data-open="${a.file}">
              <td><span class="cell-tool">${tile(a.icon, a.key)}<span class="name">${a.name}</span></span></td>
              <td class="muted">${a.short}</td>
              <td>${appModeView(a)}</td>
              <td class="right"><a class="btn btn-sm btn-ghost" href="${a.file}" target="_blank" rel="noopener" aria-label="Ouvrir ${a.name}">Ouvrir ${icon('external', 14)}</a></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ---------- Home ----------
function renderHome() {
  const courses = Object.keys(FORMATION_CATEGORIES).map(courseSummary);
  const byKey = Object.fromEntries(Object.keys(FORMATION_CATEGORIES).map((k, i) => [k, courses[i]]));
  const keys = Object.keys(FORMATION_CATEGORIES);
  const started = keys.filter(k => byKey[k].started).sort((a, b) => byKey[b].st.updated - byKey[a].st.updated);
  const learnKeys = (started.length ? started : ['ia-quotidien', 'ia-safe', 'projet-produit'].filter(k => byKey[k])).slice(0, 3);
  const toolCount = Object.values(TOOL_CATEGORIES).reduce((s, c) => s + c.tools.length, 0);
  const methodCount = Object.values(METHOD_CATEGORIES).reduce((s, c) => s + c.methods.length, 0);

  const learnItem = (k) => {
    const s = byKey[k];
    const segs = s.theme.chapters.map(ch => `<span class="${s.st.done.has(ch.slug) ? 'on' : ''}"></span>`).join('');
    let foot;
    if (s.finished) foot = `<span class="foot done">${icon('check', 14)} Terminé${s.st.quiz ? ` · quiz <span class="mono">${s.st.quiz.best}/${s.st.quiz.total}</span>` : ''}</span>`;
    else if (s.started) foot = `<span class="foot">Reprendre au chapitre ${pad2(s.theme.chapters.indexOf(s.nextCh) + 1)} ${icon('arrowRight', 14)}</span>`;
    else foot = `<span class="foot muted">${s.theme.level} · ${s.theme.duration}</span>`;
    const href = s.started && !s.finished ? `#formation/${k}/${s.nextCh.slug}` : `#formation/${k}`;
    return `
      <a class="learn-item" href="${href}">
        <span class="top"><span class="t">${s.theme.title}</span><span class="n">${pad2(s.doneCount)}/${pad2(s.total)}</span></span>
        <span class="segments">${segs}</span>
        ${foot}
      </a>`;
  };

  return `
    <div class="page">
      <section class="section" style="gap:16px">
        <h1 class="home-title"><span class="hello">${new Date().getHours() >= 18 || new Date().getHours() < 5 ? 'Bonsoir.' : 'Bonjour.'}</span> Que voulez-vous faire aujourd'hui&#8239;?</h1>
        <div class="panel command">
          <button class="command-input" data-action="open-palette">
            ${icon('search', 18)}<span class="grow">Rechercher un outil, une méthode, un chapitre…</span><kbd>Ctrl K</kbd>
          </button>
          <div class="command-list">
            ${QUICK_ACTIONS.map(a => `
              <a class="command-item" href="${a.file}" target="_blank" rel="noopener" aria-keyshortcuts="${a.shortcut.toUpperCase()}">
                ${tile(a.icon, a.key, true)}<span class="label">${a.task}</span><span class="hint">${a.name}</span><kbd>${a.shortcut.toUpperCase()}</kbd>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <div class="home-grid">
        <section class="section">
          <div class="section-bar"><h2>Boîte à outils</h2><a href="#toolbox">Tout voir</a></div>
          ${appsTable(APPS_DATA.filter(a => a.key !== 'json'))}
        </section>
        <section class="section">
          <div class="section-bar"><h2>${started.length ? 'Ma formation' : 'Pour commencer'}</h2><a href="#formation">Parcours</a></div>
          <div class="panel learn-card">${learnKeys.map(learnItem).join('')}</div>
        </section>
      </div>

      <section class="section">
        <div class="section-bar"><h2>Explorer</h2></div>
        <div class="explore">
          <a class="panel" href="#tools">${tile('layers', 'tools')}<span class="t">Référentiel d'outils ${icon('arrowRight', 14)}</span><span class="d">Jira, Productboard, Amplitude… analysés du point de vue du PO.</span><span class="n">${toolCount} outils · ${Object.keys(TOOL_CATEGORIES).length} catégories</span></a>
          <a class="panel" href="#methods">${tile('compass', 'methods-x')}<span class="t">Méthodes ${icon('arrowRight', 14)}</span><span class="d">Priorisation, discovery, métriques, agilité à l'échelle.</span><span class="n">${methodCount} méthodes</span></a>
          <a class="panel" href="#accelerators">${tile('file', 'templates')}<span class="t">Templates ${icon('arrowRight', 14)}</span><span class="d">Classeurs Excel, supports PowerPoint et imports CSV.</span><span class="n">${ACCELERATORS_DATA.length} fichiers</span></a>
        </div>
      </section>
    </div>`;
}

// ---------- Formation ----------
function courseProgressCell(key) {
  const s = courseSummary(key);
  if (s.finished) return `<span class="course-progress"><span class="done">${icon('check', 13)} Terminé</span></span>`;
  if (!s.started) return `<span class="course-progress">${plural(s.total, 'chapitre', 'chapitres')}</span>`;
  return `<span class="course-progress"><span>${pad2(s.doneCount)}/${pad2(s.total)}</span><span class="progress"><span style="width:${Math.round(s.doneCount / s.total * 100)}%"></span></span></span>`;
}

function renderFormationOverview() {
  const keys = Object.keys(FORMATION_CATEGORIES);
  const groups = {};
  keys.forEach(k => { const t = FORMATION_CATEGORIES[k].track || 'Autres'; (groups[t] = groups[t] || []).push(k); });
  const trackOrder = [...FORMATION_TRACKS.map(t => t.name), ...Object.keys(groups).filter(t => !FORMATION_TRACKS.some(x => x.name === t))];

  return `
    <div class="page">
      ${pageHead({ kicker: `${keys.length} parcours`, title: 'Formation', lead: "Des parcours structurés chapitre par chapitre, avec points clés, exercices dans les mini-apps et un quiz de mise en situation. Votre progression est enregistrée dans ce navigateur." })}
      ${trackOrder.filter(t => groups[t]).map(t => {
        const track = FORMATION_TRACKS.find(x => x.name === t);
        return `
          <section class="section">
            <div class="section-bar"><h2>${t}</h2>${track ? `<p>${track.desc}</p>` : ''}</div>
            <div class="panel rows course-list">
              ${groups[t].map(k => {
                const th = FORMATION_CATEGORIES[k];
                return `
                  <a class="row-link" href="#formation/${k}">
                    ${tile(COURSE_ICONS[k] || 'book', k)}
                    <span style="min-width:0"><span class="title">${th.title}</span><span class="desc" style="display:block">${th.tagline}</span></span>
                    ${courseProgressCell(k)}
                    <span class="meta"><span>${th.level}</span><span>${th.duration}</span>${icon('chevron', 16, 'chev')}</span>
                  </a>`;
              }).join('')}
            </div>
          </section>`;
      }).join('')}
    </div>`;
}

function renderCourse(key) {
  const s = courseSummary(key);
  const th = s.theme;
  const cta = s.finished
    ? `<a class="btn btn-primary" href="#formation/${key}/${th.chapters[0].slug}">Revoir le parcours</a>`
    : s.started
      ? `<a class="btn btn-primary" href="#formation/${key}/${s.nextCh.slug}"><span class="num">${pad2(th.chapters.indexOf(s.nextCh) + 1)}</span> Reprendre ${icon('arrowRight', 14)}</a>`
      : `<a class="btn btn-primary" href="#formation/${key}/${th.chapters[0].slug}">Commencer ${icon('arrowRight', 14)}</a>`;

  return `
    <div class="page">
      <div class="course-hero">
        ${pageHead({ kicker: `${th.track} · ${th.level} · ${th.duration}`, title: th.title, lead: th.description })}
        <aside class="panel course-card">
          <div class="stat"><span>Progression</span><b>${pad2(s.doneCount)}/${pad2(s.total)}</b></div>
          <div class="segments">${th.chapters.map(ch => `<span class="${s.st.done.has(ch.slug) ? 'on' : ''}"></span>`).join('')}</div>
          ${th.quiz ? `<div class="stat"><span>Quiz final</span><b>${s.st.quiz ? `${s.st.quiz.best}/${s.st.quiz.total}` : '—'}</b></div>` : ''}
          ${cta}
        </aside>
      </div>
      <section class="prose" style="max-width:720px">${th.intro}</section>
      <section class="section">
        <div class="section-bar"><h2>Plan du parcours</h2><p>${plural(s.total, 'chapitre', 'chapitres')}${th.quiz ? ' · quiz final' : ''}</p></div>
        <div class="panel rows">
          ${th.chapters.map((ch, i) => {
            const done = s.st.done.has(ch.slug);
            return `
              <a class="row-link plan-item${done ? ' is-done' : ''}" href="#formation/${key}/${ch.slug}">
                <span class="n">${pad2(i + 1)}</span>
                <span style="min-width:0"><span class="title">${ch.title}</span><span class="desc" style="display:block">${ch.summary}</span></span>
                <span class="status">${done ? `${icon('check', 13)} Lu` : `${readingMinutes(ch.content)} min`}</span>
              </a>`;
          }).join('')}
          ${th.quiz ? `
            <a class="row-link plan-item${s.st.quiz ? ' is-done' : ''}" href="#formation/${key}/quiz">
              <span class="n">${icon('target', 15)}</span>
              <span><span class="title">Quiz final</span><span class="desc" style="display:block">${th.quiz.length} mises en situation pour vérifier que vous savez appliquer le cours.</span></span>
              <span class="status">${s.st.quiz ? `${icon('check', 13)} ${s.st.quiz.best}/${s.st.quiz.total}` : `${th.quiz.length} questions`}</span>
            </a>` : ''}
        </div>
      </section>
    </div>`;
}

function renderExercise(ex, defaultApp) {
  if (!ex) return '';
  const app = ex.app || defaultApp || null;
  return `
    <section class="panel exercise">
      <div class="exercise-head">
        <span class="eyebrow" style="color:var(--accent-text)">Exercice</span>
        <h3>${ex.title}</h3>
        <p>${ex.brief}</p>
      </div>
      <div class="exercise-body">
        <div class="exercise-col"><span class="eyebrow">Étapes</span><ol>${ex.steps.map(st => `<li><span>${st}</span></li>`).join('')}</ol></div>
        <div class="exercise-col"><span class="eyebrow">Critères de réussite</span><ul>${ex.checklist.map(c => `<li>${icon('check', 14)}<span>${c}</span></li>`).join('')}</ul></div>
      </div>
      <div class="exercise-foot">
        <span class="deliverable"><b>Livrable :</b> ${ex.deliverable}</span>
        ${app ? `<a class="btn btn-sm" href="${app.file}" target="_blank" rel="noopener">Ouvrir ${app.name} ${icon('external', 14)}</a>` : ''}
      </div>
    </section>`;
}

function renderChapter(key, slug) {
  const th = FORMATION_CATEGORIES[key];
  const idx = th.chapters.findIndex(ch => ch.slug === slug);
  if (idx < 0) return renderCourse(key);
  const ch = th.chapters[idx];
  setLastChapter(key, slug);

  const sections = [];
  const content = ch.content.replace(/<h4>([\s\S]*?)<\/h4>/g, (m, inner) => {
    const id = `sec-${sections.length + 1}`;
    sections.push({ id, title: stripTags(inner) });
    return `<h4 id="${id}" class="section-title">${inner}</h4>`;
  });
  if (ch.exercise) sections.push({ id: 'sec-exercise', title: 'Exercice' });

  const prev = idx > 0 ? th.chapters[idx - 1] : null;
  const next = idx < th.chapters.length - 1 ? th.chapters[idx + 1] : null;
  const nextHref = next ? `#formation/${key}/${next.slug}` : (th.quiz ? `#formation/${key}/quiz` : `#formation/${key}`);
  const nextLabel = next ? `<span class="num">${pad2(idx + 2)}</span> ${next.title}` : (th.quiz ? 'Passer au quiz final' : 'Terminer le parcours');

  return `
    <div class="chapter">
      <article style="display:flex;flex-direction:column;gap:28px;min-width:0">
        <header class="chapter-head">
          <span class="kicker">Chapitre ${pad2(idx + 1)} · ${readingMinutes(ch.content)} min de lecture</span>
          <h1>${ch.title}</h1>
          <p class="lead">${ch.summary}</p>
        </header>
        <div class="prose">${content}</div>
        <section class="panel keypoints">
          <span class="eyebrow">À retenir</span>
          <ul>${ch.keyPoints.map(k => `<li>${icon('check', 14)}<span>${k}</span></li>`).join('')}</ul>
        </section>
        <div id="sec-exercise" style="scroll-margin-top:calc(var(--topbar-h) + 24px)">${renderExercise(ch.exercise, th.defaultApp)}</div>
        <nav class="chapter-nav" aria-label="Navigation entre chapitres">
          ${prev ? `<a class="prev" href="#formation/${key}/${prev.slug}">${icon('arrowLeft', 14)} ${prev.title}</a>` : `<a class="prev" href="#formation/${key}">${icon('arrowLeft', 14)} Présentation du parcours</a>`}
          <button class="btn btn-primary" data-action="complete-chapter" data-course="${key}" data-slug="${slug}" data-next="${nextHref}">${nextLabel} ${icon('arrowRight', 14)}</button>
        </nav>
      </article>
      ${sections.length ? `
        <aside class="toc" aria-label="Sur cette page">
          <span class="eyebrow">Sur cette page</span>
          ${sections.map(s => `<button data-action="toc" data-target="${s.id}">${s.title}</button>`).join('')}
        </aside>` : ''}
    </div>`;
}

function renderQuizPage(key) {
  const th = FORMATION_CATEGORIES[key];
  if (!th.quiz || !th.quiz.length) return renderCourse(key);
  const st = courseState(key);
  return `
    <div class="page" style="gap:32px">
      ${pageHead({ kicker: `Quiz final · ${th.quiz.length} questions${st.quiz ? ` · meilleur score ${st.quiz.best}/${st.quiz.total}` : ''}`, title: 'Mettez le cours en pratique', lead: "Des mises en situation plutôt que des définitions. Une seule réponse est correcte ; l'explication s'affiche dès que vous avez choisi." })}
      ${renderQuiz(key, th)}
    </div>`;
}

// Quiz (ids kept stable: #quiz-<key>)
function renderQuiz(themeKey, theme) {
  const quiz = theme.quiz;
  return `
    <section class="quiz" id="quiz-${themeKey}">
      ${quiz.map((item, qi) => `
        <div class="quiz-question" data-qi="${qi}">
          <p class="quiz-q"><span class="quiz-num">${pad2(qi + 1)}</span><span>${item.q}</span></p>
          <div class="quiz-options">
            ${item.options.map((opt, oi) => `<button type="button" class="quiz-option" data-action="quiz-answer" data-course="${themeKey}" data-q="${qi}" data-o="${oi}"><span class="quiz-letter">${String.fromCharCode(65 + oi)}</span><span>${opt}</span></button>`).join('')}
          </div>
          <div class="quiz-explanation" aria-live="polite"></div>
        </div>`).join('')}
      <div class="quiz-result"></div>
      <div class="panel quiz-footer">
        <span class="quiz-score" aria-live="polite">0/${quiz.length} · ${quiz.length} restantes</span>
        <button type="button" class="btn btn-sm btn-ghost" data-action="quiz-reset" data-course="${themeKey}">${icon('refresh', 14)} Recommencer</button>
      </div>
    </section>`;
}

function answerQuiz(themeKey, qi, oi) {
  const quiz = FORMATION_CATEGORIES[themeKey].quiz;
  const section = document.getElementById(`quiz-${themeKey}`);
  const block = section && section.querySelector(`.quiz-question[data-qi="${qi}"]`);
  if (!block || block.classList.contains('is-answered')) return;

  const item = quiz[qi];
  const correct = oi === item.answer;
  block.classList.add('is-answered', correct ? 'is-right' : 'is-wrong');
  block.querySelectorAll('.quiz-option').forEach(btn => {
    const idx = Number(btn.dataset.o);
    btn.disabled = true;
    if (idx === item.answer) btn.classList.add('is-correct');
    else if (idx === oi) btn.classList.add('is-chosen-wrong');
  });
  const expl = block.querySelector('.quiz-explanation');
  expl.innerHTML = `<strong>${correct ? 'Bonne réponse.' : `La bonne réponse était ${String.fromCharCode(65 + item.answer)}.`}</strong> ${item.explanation}`;
  expl.classList.add('is-visible');

  const answered = section.querySelectorAll('.quiz-question.is-answered').length;
  const right = section.querySelectorAll('.quiz-question.is-right').length;
  section.querySelector('.quiz-score').textContent = `${right}/${answered} correctes` + (answered < quiz.length ? ` · ${quiz.length - answered} restantes` : ' · terminé');

  if (answered === quiz.length) {
    saveQuizScore(themeKey, right, quiz.length);
    const ratio = right / quiz.length;
    const verdict = ratio >= 0.85
      ? 'Excellent : vous maîtrisez les arbitrages du cours.'
      : ratio >= 0.6
        ? 'Bonne base. Relisez les explications des questions manquées et les chapitres correspondants.'
        : 'Les notions sont encore fragiles : reprenez les chapitres, puis refaites le quiz.';
    const result = section.querySelector('.quiz-result');
    result.innerHTML = `<strong>Résultat : ${right}/${quiz.length}.</strong> ${verdict}`;
    result.classList.add('is-visible');
    refreshSidebar();
  }
}

function resetQuiz(themeKey) {
  const section = document.getElementById(`quiz-${themeKey}`);
  if (!section) return;
  section.outerHTML = renderQuiz(themeKey, FORMATION_CATEGORIES[themeKey]);
  document.getElementById(`quiz-${themeKey}`).scrollIntoView({ block: 'start', behavior: 'smooth' });
}

// ---------- Boîte à outils ----------
function templatesList(items) {
  return `
    <div class="panel rows">
      ${items.map(a => `
        <a class="row-link" href="${a.file}" download>
          <span class="format-badge ${a.format}">${a.format.toUpperCase()}</span>
          <span style="min-width:0"><span class="title">${a.name}</span><span class="desc" style="display:block">${a.desc}</span></span>
          <span class="meta">${icon('download', 15)}</span>
        </a>`).join('')}
    </div>`;
}

function renderToolbox() {
  return `
    <div class="page">
      ${pageHead({ title: 'Boîte à outils', lead: "Des mini-apps prêtes à l'emploi pour vos rituels, des templates à télécharger et des fiches mémo. Rien à installer." })}
      <section class="section">
        <div class="section-bar"><h2>Mini-apps</h2><a href="#apps">Détails</a></div>
        ${appsTable(APPS_DATA)}
      </section>
      ${Object.entries(ACCELERATOR_FORMAT_META).map(([fmt, meta]) => `
        <section class="section">
          <div class="section-bar"><h2>Templates · ${meta.title}</h2><p>${meta.description}</p></div>
          ${templatesList(ACCELERATORS_DATA.filter(a => a.format === fmt))}
        </section>`).join('')}
      <section class="section">
        <div class="section-bar"><h2>Fiches mémo</h2></div>
        <div class="panel rows">
          <a class="row-link" href="#cheatsheets">
            ${tile('sheet', 'cheatsheets')}
            <span><span class="title">Fiches mémo imprimables</span><span class="desc" style="display:block">${CHEATSHEETS.map(c => c.title).join(' · ')}</span></span>
            <span class="meta">${icon('chevron', 16, 'chev')}</span>
          </a>
        </div>
      </section>
    </div>`;
}

function renderApps() {
  const sections = [...new Set(APPS_DATA.map(a => a.section))];
  return `
    <div class="page">
      ${pageHead({ kicker: `${APPS_DATA.length} mini-apps`, title: 'Mini-apps', lead: "Des applications web autonomes qui s'ouvrent dans un nouvel onglet. Les outils « temps réel » se partagent avec l'équipe par un simple lien." })}
      ${sections.map(sec => `
        <section class="section">
          <div class="section-bar"><h2>${sec}</h2><p>${APP_SECTION_DESCRIPTIONS[sec] || ''}</p></div>
          <div class="panel rows">
            ${APPS_DATA.filter(a => a.section === sec).map(a => `
              <a class="row-link" href="${a.file}" target="_blank" rel="noopener">
                ${tile(a.icon, a.key)}
                <span style="min-width:0"><span class="title">${a.name}</span><span class="desc" style="display:block">${a.desc}</span></span>
                <span class="meta">${appModeView(a)}${icon('external', 15)}</span>
              </a>`).join('')}
          </div>
        </section>`).join('')}
    </div>`;
}

function renderAccelerators() {
  return `
    <div class="page">
      ${pageHead({ kicker: `${ACCELERATORS_DATA.length} fichiers`, title: 'Templates', lead: "Fichiers prêts à l'emploi. Chacun inclut un onglet ou une slide Guide." })}
      ${Object.entries(ACCELERATOR_FORMAT_META).map(([fmt, meta]) => `
        <section class="section">
          <div class="section-bar"><h2>${meta.title}</h2><p>${meta.description}</p></div>
          ${templatesList(ACCELERATORS_DATA.filter(a => a.format === fmt))}
        </section>`).join('')}
    </div>`;
}

function renderCheatsheets() {
  return `
    <div class="page">
      ${pageHead({ title: 'Fiches mémo', lead: "L'essentiel sur une page. Imprimez-les avec Ctrl P : la navigation disparaît à l'impression." })}
      ${CHEATSHEETS.map(sheet => `
        <section class="section">
          <div class="section-bar"><h2>${sheet.title}</h2></div>
          <div class="panel cheat-grid">
            ${sheet.items.map(([t, d]) => `<div class="cheat-item"><h4>${t}</h4><p>${d}</p></div>`).join('')}
          </div>
        </section>`).join('')}
    </div>`;
}

// ---------- Référentiel d'outils ----------
const toolsFilter = { q: '', price: 'all', cat: 'all' };
function allTools() {
  const list = [];
  for (const [catKey, cat] of Object.entries(TOOL_CATEGORIES)) {
    for (const tool of cat.tools) list.push({ tool, catKey, cat });
  }
  return list;
}
function filteredTools() {
  const q = toolsFilter.q.trim().toLowerCase();
  return allTools()
    .filter(({ tool, catKey, cat }) =>
      (toolsFilter.cat === 'all' || catKey === toolsFilter.cat) &&
      (toolsFilter.price === 'all' || tool.pricing === toolsFilter.price) &&
      (!q || `${tool.name} ${tool.tagline} ${cat.title} ${tool.ideal.join(' ')}`.toLowerCase().includes(q)))
    .sort((a, b) => b.tool.score - a.tool.score);
}
function toolRows() {
  const rows = filteredTools();
  if (!rows.length) return `<tr><td colspan="5"><div class="empty">Aucun outil ne correspond à ces filtres.</div></td></tr>`;
  return rows.map(({ tool, catKey, cat }) => `
    <tr class="is-link" data-href="#tools/${catKey}/${legacySlug(tool.name)}">
      <td><span class="cell-tool">${toolLogo(tool)}<span style="min-width:0"><span class="name">${tool.name}</span><span class="sub">${tool.tagline}</span></span></span></td>
      <td class="muted">${cat.title}</td>
      <td><span class="badge ${PRICING[tool.pricing].cls}">${PRICING[tool.pricing].label}</span></td>
      <td>${scoreView(tool.score)}</td>
      <td class="muted">${tool.ideal.slice(0, 2).join(', ')}</td>
    </tr>`).join('');
}
function refreshToolRows() {
  const body = $('#tools-body');
  if (body) body.innerHTML = toolRows();
  const count = $('#tools-count');
  if (count) count.textContent = plural(filteredTools().length, 'outil', 'outils');
}

function renderToolsOverview() {
  const total = allTools().length;
  const priceChips = [['all', 'Tous'], ['free', 'Gratuit'], ['freemium', 'Freemium'], ['paid', 'Payant']];
  return `
    <div class="page">
      ${pageHead({ kicker: `${total} outils · ${Object.keys(TOOL_CATEGORIES).length} catégories`, title: "Référentiel d'outils", lead: "Les outils du quotidien d'un PO, analysés et notés de son point de vue : forces, limites, intégrations et prix." })}
      <div class="filters">
        <label class="field">${icon('search', 15)}<input id="tools-q" type="search" placeholder="Filtrer les outils…" value="${escapeHtml(toolsFilter.q)}" aria-label="Filtrer les outils"></label>
        <div class="chips" role="group" aria-label="Prix">
          ${priceChips.map(([v, l]) => `<button class="chip${toolsFilter.price === v ? ' is-active' : ''}" data-action="tools-price" data-value="${v}" aria-pressed="${toolsFilter.price === v}">${l}</button>`).join('')}
        </div>
        <span class="mono" id="tools-count" style="margin-left:auto;font-size:12px;color:var(--text-3)">${plural(filteredTools().length, 'outil', 'outils')}</span>
      </div>
      <div class="chips" role="group" aria-label="Catégorie">
        <button class="chip${toolsFilter.cat === 'all' ? ' is-active' : ''}" data-action="tools-cat" data-value="all">Toutes</button>
        ${Object.entries(TOOL_CATEGORIES).map(([k, c]) => `<button class="chip${toolsFilter.cat === k ? ' is-active' : ''}" data-action="tools-cat" data-value="${k}">${c.title}</button>`).join('')}
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Outil</th><th>Catégorie</th><th>Prix</th><th>Score PO</th><th>Idéal pour</th></tr></thead>
          <tbody id="tools-body">${toolRows()}</tbody>
        </table>
      </div>
    </div>`;
}

function renderToolCategory(catKey) {
  const cat = TOOL_CATEGORIES[catKey];
  if (!cat) return renderToolsOverview();
  const keys = Object.keys(TOOL_CATEGORIES);
  const i = keys.indexOf(catKey);
  const prev = i > 0 ? keys[i - 1] : null;
  const next = i < keys.length - 1 ? keys[i + 1] : null;

  return `
    <div class="page">
      ${pageHead({ kicker: plural(cat.tools.length, 'outil', 'outils'), title: cat.title, lead: cat.description })}
      <div class="chips" role="group" aria-label="Filtrer">
        ${[['all', 'Tous'], ['free', 'Gratuit'], ['freemium', 'Freemium'], ['paid', 'Payant'], ['po métier', 'PO métier'], ['po technique', 'PO technique']]
          .map(([v, l], j) => `<button class="chip${j === 0 ? ' is-active' : ''}" data-action="cat-filter" data-value="${v}">${l}</button>`).join('')}
      </div>
      <div class="tool-grid">
        ${cat.tools.map(tool => `
          <article class="panel tool-card" data-detail-slug="${legacySlug(tool.name)}" data-pricing="${tool.pricing}" data-ideal="${tool.ideal.map(x => x.toLowerCase()).join('|')}">
            <div class="tool-card-head">
              ${toolLogo(tool, true)}
              <div style="min-width:0"><div class="name">${tool.name}</div><div class="tagline">${tool.tagline}</div></div>
              ${scoreView(tool.score)}
            </div>
            <div class="chips"><span class="badge ${PRICING[tool.pricing].cls}">${PRICING[tool.pricing].label}</span>${tool.ideal.map(x => `<span class="badge">${x}</span>`).join('')}</div>
            <p class="desc">${tool.description}</p>
            <div class="proscons">
              <div class="pro"><span class="eyebrow">Forces</span><ul>${tool.pros.map(p => `<li>${icon('check', 13)}<span>${p}</span></li>`).join('')}</ul></div>
              <div class="con"><span class="eyebrow">Limites</span><ul>${tool.cons.map(c => `<li>${icon('x', 13)}<span>${c}</span></li>`).join('')}</ul></div>
            </div>
            <div class="tool-card-foot">
              <div class="mono-chips">${tool.intégrations.slice(0, 6).map(x => `<span>${x}</span>`).join('')}</div>
              ${tool.url ? `<a class="ext-link" href="${tool.url}" target="_blank" rel="noopener">Site officiel ${icon('external', 13)}</a>` : ''}
            </div>
          </article>`).join('')}
      </div>
      <section class="section">
        <div class="section-bar"><h2>Comparatif</h2></div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Outil</th><th>Prix</th><th>Score PO</th><th>Idéal pour</th><th>Intégrations clés</th></tr></thead>
            <tbody>
              ${[...cat.tools].sort((a, b) => b.score - a.score).map(t => `
                <tr><td><span class="cell-tool" style="min-width:160px">${toolLogo(t)}<span class="name">${t.name}</span></span></td>
                <td><span class="badge ${PRICING[t.pricing].cls}">${PRICING[t.pricing].label}</span></td>
                <td>${scoreView(t.score)}</td><td class="muted">${t.ideal.slice(0, 2).join(', ')}</td><td class="muted">${t.intégrations.slice(0, 3).join(', ')}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>
      <nav class="pager">
        ${prev ? `<a class="panel" href="#tools/${prev}"><span class="l">Précédent</span><span class="t">${TOOL_CATEGORIES[prev].title}</span></a>` : ''}
        ${next ? `<a class="panel next" href="#tools/${next}"><span class="l">Suivant</span><span class="t">${TOOL_CATEGORIES[next].title}</span></a>` : ''}
      </nav>
    </div>`;
}

// ---------- Méthodes ----------
function renderMethodsOverview() {
  return `
    <div class="page">
      ${pageHead({ title: 'Méthodes', lead: "Les approches de priorisation, de discovery, de mesure et d'agilité à l'échelle, avec le moment où les utiliser et les conseils de terrain." })}
      <div class="panel rows">
        ${Object.entries(METHOD_CATEGORIES).map(([k, c]) => `
          <a class="row-link" href="#methods/${k}">
            ${tile(METHOD_CATEGORY_ICONS[k] || 'compass', k)}
            <span style="min-width:0"><span class="title">${c.title}</span><span class="desc" style="display:block">${c.description}</span></span>
            <span class="meta"><span>${plural(c.methods.length, 'méthode', 'méthodes')}</span>${icon('chevron', 16, 'chev')}</span>
          </a>`).join('')}
      </div>
    </div>`;
}

function renderMethodCategory(key) {
  const cat = METHOD_CATEGORIES[key];
  if (!cat) return renderMethodsOverview();
  const keys = Object.keys(METHOD_CATEGORIES);
  const i = keys.indexOf(key);
  const prev = i > 0 ? keys[i - 1] : null;
  const next = i < keys.length - 1 ? keys[i + 1] : null;
  return `
    <div class="page">
      ${pageHead({ kicker: plural(cat.methods.length, 'méthode', 'méthodes'), title: cat.title, lead: cat.description })}
      ${key === 'scaling' ? `
        <div class="panel feature-row">
          ${tile('file', 'pdf')}
          <span class="txt"><b>Guide complet : agilité à l'échelle</b><span>SAFe, LeSS, modèle Spotify et bonnes pratiques de passage à l'échelle, en PDF.</span></span>
          <a class="btn btn-sm" href="../accelerators/agilite-echelle-guide.pdf" target="_blank" rel="noopener">Ouvrir le PDF ${icon('external', 14)}</a>
        </div>` : ''}
      ${cat.methods.map(m => `
        <article class="panel method-card" data-detail-slug="${legacySlug(m.name)}">
          <div class="method-top">
            <div class="method-intro"><h3>${m.name}</h3><p>${m.description}</p></div>
            <div class="method-when"><span class="eyebrow">Quand l'utiliser</span><span>${m.when}</span></div>
          </div>
          <div class="method-body">
            <div class="method-col"><span class="eyebrow">Déroulé</span><ol class="steps">${m.steps.map(s => `<li><span>${s}</span></li>`).join('')}</ol></div>
            <div class="method-col"><span class="eyebrow">Conseils de terrain</span><ul class="tips">${m.tips.map(t => `<li><span>${t}</span></li>`).join('')}</ul></div>
          </div>
        </article>`).join('')}
      <nav class="pager">
        ${prev ? `<a class="panel" href="#methods/${prev}"><span class="l">Précédent</span><span class="t">${METHOD_CATEGORIES[prev].title}</span></a>` : ''}
        ${next ? `<a class="panel next" href="#methods/${next}"><span class="l">Suivant</span><span class="t">${METHOD_CATEGORIES[next].title}</span></a>` : ''}
      </nav>
    </div>`;
}

// ---------- Command palette ----------
const TYPE_META = {
  action: { label: 'Actions rapides', order: 0 },
  resume: { label: 'Reprendre', order: 1 },
  page: { label: 'Aller à', order: 2 },
  app: { label: 'Mini-apps', order: 3 },
  course: { label: 'Parcours', order: 4 },
  chapter: { label: 'Chapitres', order: 5 },
  tool: { label: 'Outils', order: 6 },
  method: { label: 'Méthodes', order: 7 },
  template: { label: 'Templates', order: 8 },
};
let searchIndex = [];
let paletteItems = [];
let paletteActive = 0;

function buildSearchIndex() {
  const idx = [];
  const pages = [
    ['Accueil', '#home', 'home'], ['Formation', '#formation', 'book'], ['Boîte à outils', '#toolbox', 'grid'],
    ["Référentiel d'outils", '#tools', 'layers'], ['Méthodes', '#methods', 'compass'], ['Mini-apps', '#apps', 'grid'],
    ['Templates', '#accelerators', 'file'], ['Fiches mémo', '#cheatsheets', 'sheet'],
  ];
  pages.forEach(([t, h, i]) => idx.push({ type: 'page', title: t, sub: '', href: h, icon: i, text: t.toLowerCase() }));
  APPS_DATA.forEach(a => idx.push({ type: 'app', title: a.name, sub: a.short, href: a.file, external: true, icon: a.icon, text: `${a.name} ${a.desc} ${a.task || ''}`.toLowerCase() }));
  for (const [k, th] of Object.entries(FORMATION_CATEGORIES)) {
    idx.push({ type: 'course', title: th.title, sub: `${th.track} · ${th.level}`, href: `#formation/${k}`, icon: COURSE_ICONS[k] || 'book', text: `${th.title} ${th.tagline}`.toLowerCase() });
    th.chapters.forEach((ch, i) => idx.push({ type: 'chapter', title: ch.title, sub: `${th.title} · chapitre ${pad2(i + 1)}`, href: `#formation/${k}/${ch.slug}`, icon: 'book', text: `${ch.title} ${ch.summary} ${ch.keyPoints.join(' ')}`.toLowerCase() }));
  }
  for (const [k, cat] of Object.entries(TOOL_CATEGORIES)) {
    cat.tools.forEach(t => idx.push({ type: 'tool', title: t.name, sub: `${cat.title} · ${t.tagline}`, href: `#tools/${k}/${legacySlug(t.name)}`, icon: TOOL_CATEGORY_ICONS[k] || 'layers', text: `${t.name} ${t.tagline} ${cat.title} ${t.ideal.join(' ')} ${t.intégrations.join(' ')}`.toLowerCase() }));
  }
  for (const [k, cat] of Object.entries(METHOD_CATEGORIES)) {
    cat.methods.forEach(m => idx.push({ type: 'method', title: m.name, sub: cat.title, href: `#methods/${k}/${legacySlug(m.name)}`, icon: METHOD_CATEGORY_ICONS[k] || 'compass', text: `${m.name} ${m.description} ${cat.title} ${m.when}`.toLowerCase() }));
  }
  ACCELERATORS_DATA.forEach(a => idx.push({ type: 'template', title: a.name, sub: `${a.format.toUpperCase()} · ${a.desc}`, href: a.file, download: true, icon: 'file', text: `${a.name} ${a.desc} ${a.format}`.toLowerCase() }));
  return idx;
}

function defaultPaletteItems() {
  const items = QUICK_ACTIONS.map(a => ({ type: 'action', title: a.task, sub: a.name, href: a.file, external: true, icon: a.icon }));
  const inProgress = Object.keys(FORMATION_CATEGORIES).map(courseSummary).filter(s => s.started && !s.finished)
    .sort((a, b) => b.st.updated - a.st.updated).slice(0, 2);
  inProgress.forEach(s => {
    const k = Object.keys(FORMATION_CATEGORIES).find(key => FORMATION_CATEGORIES[key] === s.theme);
    items.push({ type: 'resume', title: s.nextCh.title, sub: `${s.theme.title} · chapitre ${pad2(s.theme.chapters.indexOf(s.nextCh) + 1)}`, href: `#formation/${k}/${s.nextCh.slug}`, icon: 'book' });
  });
  searchIndex.filter(i => i.type === 'page').slice(0, 5).forEach(i => items.push(i));
  return items;
}

function searchPalette(query) {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const scored = [];
  for (const item of searchIndex) {
    const title = item.title.toLowerCase();
    if (!words.every(w => item.text.includes(w) || title.includes(w))) continue;
    let score = 1;
    if (title.startsWith(q)) score = 4;
    else if (title.includes(q)) score = 3;
    else if (words.every(w => title.includes(w))) score = 2;
    scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score || TYPE_META[a.item.type].order - TYPE_META[b.item.type].order);
  const perType = {};
  return scored.filter(({ item }) => (perType[item.type] = (perType[item.type] || 0) + 1) <= 6).slice(0, 30).map(s => s.item)
    .sort((a, b) => TYPE_META[a.type].order - TYPE_META[b.type].order);
}

function highlight(title, query) {
  const safe = escapeHtml(title);
  const q = query.trim();
  if (!q) return safe;
  const i = title.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return safe;
  return `${escapeHtml(title.slice(0, i))}<mark>${escapeHtml(title.slice(i, i + q.length))}</mark>${escapeHtml(title.slice(i + q.length))}`;
}

function renderPalette(query = '') {
  paletteItems = query.trim() ? searchPalette(query) : defaultPaletteItems();
  paletteActive = 0;
  const box = $('#palette-results');
  if (!paletteItems.length) {
    box.innerHTML = `<div class="palette-empty">Aucun résultat pour « ${escapeHtml(query)} ».</div>`;
    return;
  }
  let html = '';
  let lastType = null;
  paletteItems.forEach((it, i) => {
    if (it.type !== lastType) { html += `<div class="palette-group">${TYPE_META[it.type].label}</div>`; lastType = it.type; }
    html += `
      <div class="palette-item${i === 0 ? ' is-active' : ''}" role="option" id="pal-${i}" data-index="${i}" aria-selected="${i === 0}">
        ${icon(it.icon, 16)}
        <span class="txt"><span class="t">${highlight(it.title, query)}</span>${it.sub ? `<span class="s">${escapeHtml(stripTags(it.sub))}</span>` : ''}</span>
        ${it.external ? icon('external', 14) : it.download ? icon('download', 14) : `<span class="enter">${icon('enter', 14)}</span>`}
      </div>`;
  });
  box.innerHTML = html;
}

function setPaletteActive(i) {
  if (!paletteItems.length) return;
  paletteActive = (i + paletteItems.length) % paletteItems.length;
  document.querySelectorAll('.palette-item').forEach(el => {
    const on = Number(el.dataset.index) === paletteActive;
    el.classList.toggle('is-active', on);
    el.setAttribute('aria-selected', on);
    if (on) el.scrollIntoView({ block: 'nearest' });
  });
  $('#palette-input').setAttribute('aria-activedescendant', `pal-${paletteActive}`);
}

function activatePaletteItem(i) {
  const it = paletteItems[i];
  if (!it) return;
  closePalette();
  if (it.external) window.open(it.href, '_blank', 'noopener');
  else if (it.download) { const a = document.createElement('a'); a.href = it.href; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); }
  else window.location.hash = it.href.slice(1);
}

let lastFocus = null;
function openPalette() {
  lastFocus = document.activeElement;
  const p = $('#palette');
  p.classList.add('is-open');
  const input = $('#palette-input');
  input.value = '';
  renderPalette('');
  requestAnimationFrame(() => input.focus());
}
function closePalette() {
  $('#palette').classList.remove('is-open');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
const paletteOpen = () => $('#palette').classList.contains('is-open');

// ---------- Rendering / routing ----------
function refreshSidebar() { $('#sidebar').innerHTML = renderSidebar(getRoute()); }

let tocObserver = null;
function setupChapterEnhancements() {
  if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
  const buttons = [...document.querySelectorAll('.toc button')];
  if (!buttons.length || !('IntersectionObserver' in window)) return;
  const targets = buttons.map(b => document.getElementById(b.dataset.target)).filter(Boolean);
  tocObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      buttons.forEach(b => b.classList.toggle('is-active', b.dataset.target === e.target.id));
    });
  }, { rootMargin: '-15% 0px -70% 0px' });
  targets.forEach(t => tocObserver.observe(t));
}

function updateReadProgress() {
  const bar = $('#read-progress');
  if (!bar) return;
  if (!document.querySelector('.chapter')) { bar.style.width = '0'; return; }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
}

function handleRoute() {
  const route = getRoute();
  const { page, subpage, detail } = route;
  let content;
  let title = 'PO Toolkit';

  if (page === 'formation' && subpage && FORMATION_CATEGORIES[subpage]) {
    const th = FORMATION_CATEGORIES[subpage];
    if (detail === 'quiz') { content = renderQuizPage(subpage); title = `Quiz · ${th.title}`; }
    else if (detail) { content = renderChapter(subpage, detail); const ch = th.chapters.find(c => c.slug === detail); title = ch ? ch.title : th.title; }
    else { content = renderCourse(subpage); title = th.title; }
  } else if (page === 'formation') { content = renderFormationOverview(); title = 'Formation'; }
  else if (page === 'toolbox') { content = renderToolbox(); title = 'Boîte à outils'; }
  else if (page === 'apps') { content = renderApps(); title = 'Mini-apps'; }
  else if (page === 'accelerators') { content = renderAccelerators(); title = 'Templates'; }
  else if (page === 'cheatsheets') { content = renderCheatsheets(); title = 'Fiches mémo'; }
  else if (page === 'tools' && subpage && TOOL_CATEGORIES[subpage]) { content = renderToolCategory(subpage); title = TOOL_CATEGORIES[subpage].title; }
  else if (page === 'tools') { content = renderToolsOverview(); title = "Référentiel d'outils"; }
  else if (page === 'methods' && subpage && METHOD_CATEGORIES[subpage]) { content = renderMethodCategory(subpage); title = METHOD_CATEGORIES[subpage].title; }
  else if (page === 'methods') { content = renderMethodsOverview(); title = 'Méthodes'; }
  else { content = renderHome(); }

  const main = $('#main-content');
  main.innerHTML = content;
  $('#crumbs').innerHTML = crumbsFor(route);
  refreshSidebar();
  document.title = title === 'PO Toolkit' ? 'PO Toolkit — la boîte à outils du Product Owner' : `${stripTags(title)} · PO Toolkit`;
  closeMobileNav();
  setupChapterEnhancements();

  const target = detail && detail !== 'quiz' && page !== 'formation' ? document.querySelector(`[data-detail-slug="${CSS.escape(detail)}"]`) : null;
  if (target) {
    target.classList.add('is-target');
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  } else {
    window.scrollTo({ top: 0 });
  }
  updateReadProgress();
}

// ---------- Mobile navigation ----------
function openMobileNav() {
  $('#sidebar').classList.add('is-open');
  $('#scrim').classList.add('is-open');
  $('#menu-btn').setAttribute('aria-expanded', 'true');
}
function closeMobileNav() {
  $('#sidebar').classList.remove('is-open');
  $('#scrim').classList.remove('is-open');
  $('#menu-btn').setAttribute('aria-expanded', 'false');
}

// ---------- Events ----------
function onClick(e) {
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    const { action } = actionEl.dataset;
    if (action === 'open-palette') { openPalette(); return; }
    if (action === 'toc') {
      const t = document.getElementById(actionEl.dataset.target);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (action === 'complete-chapter') {
      markChapterDone(actionEl.dataset.course, actionEl.dataset.slug);
      window.location.hash = actionEl.dataset.next.slice(1);
      return;
    }
    if (action === 'quiz-answer') { answerQuiz(actionEl.dataset.course, Number(actionEl.dataset.q), Number(actionEl.dataset.o)); return; }
    if (action === 'quiz-reset') { resetQuiz(actionEl.dataset.course); return; }
    if (action === 'tools-price' || action === 'tools-cat') {
      toolsFilter[action === 'tools-price' ? 'price' : 'cat'] = actionEl.dataset.value;
      actionEl.parentElement.querySelectorAll('.chip').forEach(c => {
        const on = c === actionEl;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on);
      });
      refreshToolRows();
      return;
    }
    if (action === 'cat-filter') {
      const v = actionEl.dataset.value;
      actionEl.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === actionEl));
      document.querySelectorAll('.tool-card').forEach(card => {
        const show = v === 'all' || card.dataset.pricing === v || card.dataset.ideal.split('|').includes(v);
        card.hidden = !show;
      });
      return;
    }
  }

  const row = e.target.closest('tr[data-href], tr[data-open]');
  if (row && !e.target.closest('a, button')) {
    if (row.dataset.href) window.location.hash = row.dataset.href.slice(1);
    else window.open(row.dataset.open, '_blank', 'noopener');
    return;
  }

  const palItem = e.target.closest('.palette-item');
  if (palItem) { activatePaletteItem(Number(palItem.dataset.index)); return; }

  if (e.target.id === 'palette') closePalette();
}

function isTyping(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    paletteOpen() ? closePalette() : openPalette();
    return;
  }
  if (paletteOpen()) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setPaletteActive(paletteActive + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setPaletteActive(paletteActive - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); activatePaletteItem(paletteActive); }
    return;
  }
  if (e.key === 'Escape') { closeMobileNav(); return; }
  if (e.ctrlKey || e.metaKey || e.altKey || isTyping(document.activeElement)) return;
  if (e.key === '/') { e.preventDefault(); openPalette(); return; }
  if (getRoute().page === 'home') {
    const app = QUICK_ACTIONS.find(a => a.shortcut === e.key.toLowerCase());
    if (app) { e.preventDefault(); window.open(app.file, '_blank', 'noopener'); }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme(), false);
  $('#menu-btn').innerHTML = icon('menu', 16);
  $('#search-trigger').innerHTML = `${icon('search', 14)}<span class="label">Rechercher</span><kbd>Ctrl K</kbd>`;
  $('#palette-icon').innerHTML = icon('search', 18);

  searchIndex = buildSearchIndex();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);

  $('#theme-toggle').addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  $('#search-trigger').addEventListener('click', openPalette);
  $('#menu-btn').addEventListener('click', () => ($('#sidebar').classList.contains('is-open') ? closeMobileNav() : openMobileNav()));
  $('#scrim').addEventListener('click', closeMobileNav);

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  $('#palette-input').addEventListener('input', e => renderPalette(e.target.value));
  $('#palette-results').addEventListener('mousemove', e => {
    const it = e.target.closest('.palette-item');
    if (it && Number(it.dataset.index) !== paletteActive) setPaletteActive(Number(it.dataset.index));
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'tools-q') { toolsFilter.q = e.target.value; refreshToolRows(); }
  });
  // Tool logo fallback (remote icons can fail)
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.fallback) {
      if (img.dataset.altSrc) {
        img.src = img.dataset.altSrc;
        delete img.dataset.altSrc;
        return;
      }
      img.parentElement.textContent = img.dataset.fallback;
    }
  }, true);
  window.addEventListener('scroll', updateReadProgress, { passive: true });
  window.addEventListener('resize', updateReadProgress, { passive: true });
});
