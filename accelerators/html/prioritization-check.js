
// ===============================
// METHOD DEFINITIONS
// ===============================
const METHODS = {
  rice: {
    name: "RICE Scoring",
    icon: "&#9878;",
    color: "#6366f1",
    description: "Framework quantitatif développé par Intercom. Évalue chaque item sur 4 dimensions pour obtenir un score objectif et comparable.",
    formula: "Score = (Reach × Impact × Confidence) ÷ Effort",
    when: "Quand vous avez un backlog conséquent et voulez éliminer les biais subjectifs. Idéal pour comparer 10+ items.",
    coreCriteria: [
      { id: "reach", name: "Reach", description: "Nb utilisateurs touchés / trimestre", type: "number", min: 0, max: 100000, step: 100, default: 1000 },
      { id: "impact", name: "Impact", description: "Impact par utilisateur", type: "select", options: [{v:3,l:"3 — Massif"},{v:2,l:"2 — Haut"},{v:1,l:"1 — Moyen"},{v:0.5,l:"0.5 — Faible"},{v:0.25,l:"0.25 — Minimal"}], default: 1 },
      { id: "confidence", name: "Confidence", description: "Niveau de certitude (%)", type: "select", options: [{v:100,l:"100% — Haute"},{v:80,l:"80% — Moyenne"},{v:60,l:"60% — Correcte"},{v:50,l:"50% — Faible"},{v:40,l:"40% — Très faible"}], default: 80 },
      { id: "effort", name: "Effort", description: "Person-months", type: "number", min: 0.1, max: 50, step: 0.5, default: 1, isDivisor: true },
    ],
    calculate: (values, weights) => {
      const w = weights;
      let numerator = 1;
      let divisor = 1;
      for (const [key, val] of Object.entries(values)) {
        const crit = METHODS.rice.allCriteria.find(c => c.id === key);
        if (!crit) continue;
        const weight = w[key] || 1;
        if (crit.isDivisor) {
          divisor *= Math.pow(val || 1, weight);
        } else {
          numerator *= Math.pow(val || 1, weight);
        }
      }
      return divisor > 0 ? numerator / divisor : 0;
    }
  },
  wsjf: {
    name: "WSJF (SAFe)",
    icon: "&#9889;",
    color: "#a855f7",
    description: "Weighted Shortest Job First — utilisé dans SAFe pour prioriser au niveau du Program Increment. Le ratio Cost of Delay / Job Size maximise la valeur livrée par unité de temps.",
    formula: "WSJF = Cost of Delay ÷ Job Size\nCoD = (User Value × poids) + (Time Criticality × poids) + (Risk Reduction × poids)",
    when: "PI Planning SAFe, arbitrage entre features au niveau programme, quand le coût du délai est critique. Ajustez les poids pour refléter l'importance relative de chaque composante du CoD.",
    coreCriteria: [
      { id: "user_value", name: "User/Business Value", group: "Cost of Delay", description: "Valeur pour l'utilisateur ou le business", type: "select", options: [{v:1,l:"1"},{v:2,l:"2"},{v:3,l:"3"},{v:5,l:"5"},{v:8,l:"8"},{v:13,l:"13"},{v:21,l:"21"}], default: 5 },
      { id: "time_crit", name: "Time Criticality", group: "Cost of Delay", description: "Urgence / fenêtre d'opportunité", type: "select", options: [{v:1,l:"1"},{v:2,l:"2"},{v:3,l:"3"},{v:5,l:"5"},{v:8,l:"8"},{v:13,l:"13"},{v:21,l:"21"}], default: 3 },
      { id: "risk_reduction", name: "Risk Reduction / Opportunity", group: "Cost of Delay", description: "Réduction de risque ou opportunité", type: "select", options: [{v:1,l:"1"},{v:2,l:"2"},{v:3,l:"3"},{v:5,l:"5"},{v:8,l:"8"},{v:13,l:"13"},{v:21,l:"21"}], default: 3 },
      { id: "job_size", name: "Job Size", group: "Diviseur", description: "Taille du travail (effort)", type: "select", options: [{v:1,l:"1"},{v:2,l:"2"},{v:3,l:"3"},{v:5,l:"5"},{v:8,l:"8"},{v:13,l:"13"},{v:21,l:"21"}], default: 5, isDivisor: true },
    ],
    calculate: (values, weights) => {
      const w = weights;
      let cod = 0;
      let jobSize = 1;
      for (const [key, val] of Object.entries(values)) {
        const crit = METHODS.wsjf.allCriteria.find(c => c.id === key);
        if (!crit) continue;
        const weight = w[key] || 1;
        if (crit.isDivisor) {
          jobSize = (val || 1) * weight;
        } else {
          cod += (val || 0) * weight;
        }
      }
      return jobSize > 0 ? cod / jobSize : 0;
    }
  },
  value_effort: {
    name: "Value vs Effort",
    icon: "&#127775;",
    color: "#10b981",
    description: "Matrice simple et universelle. Évalue chaque item sur la valeur apportée et l'effort requis. Le ratio identifie les Quick Wins (haute valeur, faible effort).",
    formula: "Score = Valeur pondérée ÷ Effort pondéré",
    when: "Priorisation rapide en atelier, premier tri du backlog, alignement équipe sans framework lourd.",
    coreCriteria: [
      { id: "value", name: "Valeur", description: "Valeur business/utilisateur (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
      { id: "effort", name: "Effort", description: "Effort de réalisation (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5, isDivisor: true },
    ],
    calculate: (values, weights) => {
      let num = 0, den = 0;
      for (const [key, val] of Object.entries(values)) {
        const crit = METHODS.value_effort.allCriteria.find(c => c.id === key);
        if (!crit) continue;
        const weight = weights[key] || 1;
        if (crit.isDivisor) den += (val || 1) * weight;
        else num += (val || 0) * weight;
      }
      return den > 0 ? num / den : 0;
    }
  },
  moscow: {
    name: "MoSCoW",
    icon: "&#127919;",
    color: "#f59e0b",
    description: "Classification en 4 catégories : Must have, Should have, Could have, Won't have. Pas un scoring — une classification pour la négociation de scope.",
    formula: "Classification : M (≤60%) > S (~20%) > C (~20%) > W",
    when: "MVP, release planning, négociation de scope avec stakeholders. Quand il faut trancher vite.",
    coreCriteria: [
      { id: "moscow", name: "Catégorie MoSCoW", description: "M / S / C / W", type: "select", options: [{v:4,l:"Must Have"},{v:3,l:"Should Have"},{v:2,l:"Could Have"},{v:1,l:"Won't Have"}], default: 3 },
    ],
    calculate: (values, weights) => {
      return (values.moscow || 0);
    },
    isCategorical: true
  },
  ice: {
    name: "ICE Scoring",
    icon: "&#129482;",
    color: "#ec4899",
    description: "Framework simple de Sean Ellis (Growth Hacking). Chaque dimension est notée 1-10. Plus intuitif que RICE, mais plus subjectif.",
    formula: "Score = Impact × Confidence × Ease",
    when: "Growth experiments, feature prioritization rapide quand vous n'avez pas de données quantitatives de Reach.",
    coreCriteria: [
      { id: "impact", name: "Impact", description: "Impact attendu (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
      { id: "confidence", name: "Confidence", description: "Niveau de certitude (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
      { id: "ease", name: "Ease", description: "Facilité de mise en œuvre (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
    ],
    calculate: (values, weights) => {
      let result = 1;
      for (const [key, val] of Object.entries(values)) {
        const w = weights[key] || 1;
        result *= Math.pow(val || 1, w);
      }
      return result;
    }
  },
  weighted: {
    name: "Scoring pondere",
    icon: "&#9878;",
    color: "#64748b",
    description: "Scoring pondere simple avec criteres generiques fixes.",
    formula: "Score = Somme(critere x poids) / Somme(poids)",
    when: "Utile si vous voulez un calcul simple sans entrer dans un cadre strict.",
    coreCriteria: [
      { id: "impact", name: "Impact", description: "Impact global (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
      { id: "fit", name: "Strategic Fit", description: "Alignement strategique (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
      { id: "confidence", name: "Confidence", description: "Niveau de confiance (1-10)", type: "number", min: 1, max: 10, step: 1, default: 5 },
    ],
    calculate: (values, weights) => {
      let totalWeighted = 0;
      let totalWeight = 0;
      for (const [key, val] of Object.entries(values)) {
        const w = weights[key] || 1;
        totalWeighted += (val || 0) * w;
        totalWeight += w;
      }
      return totalWeight > 0 ? totalWeighted / totalWeight : 0;
    }
  }
};

// ===============================
// STATE
// ===============================
let currentMethod = 'rice';
let items = [];
let customCriteria = [];
let criteriaWeights = {};
let nextItemId = 1;
const STORAGE_KEY = 'po-toolkit-prioritization-calculator-v1';
const DEFAULT_SAMPLE_NAME = 'Exemple de feature';

function getMethod() { return METHODS[currentMethod]; }
function canAddCriteria() { return currentMethod === 'wsjf'; }

function getAllCriteria() {
  const m = getMethod();
  let all = [...(m.coreCriteria || [])];
  if (canAddCriteria() && customCriteria.length > 0) {
    const divisorIndex = all.findIndex(c => c.isDivisor);
    const wsjfCustomCriteria = customCriteria.map(c => ({ ...c, group: 'Cost of Delay', isCustom: true }));
    all = divisorIndex === -1
      ? [...all, ...wsjfCustomCriteria]
      : [...all.slice(0, divisorIndex), ...wsjfCustomCriteria, ...all.slice(divisorIndex)];
  }
  m.allCriteria = all;
  return all;
}

function getDefaultValue(crit) {
  if (crit.default !== undefined) return crit.default;
  if (crit.type === 'number') return crit.min || 0;
  if (crit.options && crit.options.length > 0) return crit.options[0].v;
  return 0;
}

function createDefaultValues() {
  const values = {};
  for (const crit of getAllCriteria()) {
    values[crit.id] = getDefaultValue(crit);
  }
  return values;
}

function createExampleItem() {
  return { id: nextItemId++, name: DEFAULT_SAMPLE_NAME, values: createDefaultValues(), score: 0, rank: null };
}

function ensureDefaultItem() {
  if (items.length === 0) items.push(createExampleItem());
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentMethod,
      items,
      customCriteria,
      criteriaWeights,
      nextItemId,
    }));
  } catch (error) {
    // The calculator still works without localStorage.
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const state = JSON.parse(raw);
    if (!state || !METHODS[state.currentMethod]) return false;

    currentMethod = state.currentMethod;
    customCriteria = Array.isArray(state.customCriteria) ? state.customCriteria : [];
    if (!canAddCriteria()) customCriteria = [];
    criteriaWeights = state.criteriaWeights && typeof state.criteriaWeights === 'object' ? state.criteriaWeights : {};
    nextItemId = Number.isFinite(state.nextItemId) && state.nextItemId > 0 ? state.nextItemId : 1;
    items = Array.isArray(state.items) ? state.items.map(item => ({
      id: Number.isFinite(item.id) ? item.id : nextItemId++,
      name: item.name || '',
      values: item.values && typeof item.values === 'object' ? item.values : {},
      score: Number.isFinite(item.score) ? item.score : 0,
      rank: Number.isFinite(item.rank) ? item.rank : null,
    })) : [];

    const criteria = getAllCriteria();
    const validIds = new Set(criteria.map(crit => crit.id));

    items = items.map(item => {
      const values = {};
      for (const crit of criteria) {
        values[crit.id] = item.values[crit.id] !== undefined ? item.values[crit.id] : getDefaultValue(crit);
      }
      return { ...item, values };
    });

    criteriaWeights = Object.fromEntries(
      Object.entries(criteriaWeights)
        .filter(([id]) => validIds.has(id))
        .map(([id, weight]) => [id, parseFloat(weight) || 1])
    );

    for (const crit of criteria) {
      if (!criteriaWeights[crit.id]) criteriaWeights[crit.id] = 1;
    }

    ensureDefaultItem();
    return true;
  } catch (error) {
    return false;
  }
}

// ===============================
// RENDER: Sidebar
// ===============================
function renderSidebar() {
  const list = document.getElementById('method-list');
  list.innerHTML = Object.entries(METHODS).map(([key, m]) =>
    `<li class="method-item ${key === currentMethod ? 'active' : ''}" onclick="switchMethod('${key}')">
      <span class="method-icon">${m.icon}</span> ${m.name}
    </li>`
  ).join('');

  const m = getMethod();
  document.getElementById('method-info').innerHTML = `
    <h3>${m.name}</h3>
    <p>${m.description}</p>
    <div class="formula">${m.formula}</div>
    <p style="margin-top: 0.75rem;"><strong style="color:var(--text);">Quand l'utiliser :</strong><br>${m.when}</p>
  `;
}

// ===============================
// RENDER: Criteria Bar
// ===============================
function renderCriteriaBar() {
  const criteria = getAllCriteria();
  const allowCustomCriteria = canAddCriteria();

  let html = `<div class="criteria-bar">
    <h3>Criteres ${criteria.length > 0 ? `(${criteria.length})` : ''} - Poids ajustables</h3>
    <div class="criteria-list">`;

  let lastGroup = null;
  for (const crit of criteria) {
    const weight = criteriaWeights[crit.id] || 1;

    if (crit.group && crit.group !== lastGroup) {
      if (allowCustomCriteria && lastGroup === 'Cost of Delay' && crit.group === 'Diviseur') {
        html += `
      <div class="add-criterion" style="width:100%;margin-top:0.5rem;">
        <input type="text" id="new-crit-name" placeholder="Ajouter une sous-composante CoD..." onkeydown="if(event.key==='Enter'){event.preventDefault();addCriterion();}">
        <button class="btn-primary" style="padding:0.35rem 0.75rem; font-size:0.75rem;" onclick="addCriterion()">+ Ajouter</button>
      </div>`;
      }
      if (lastGroup !== null) html += `<span style="color:var(--muted);font-size:0.75rem;width:100%;margin:0.5rem 0 0.2rem;font-weight:700;">/</span>`;
      html += `<span style="color:var(--accent2);font-size:0.75rem;font-weight:700;width:100%;margin:0.5rem 0 0.2rem;">${crit.group} :</span>`;
      lastGroup = crit.group;
    }

    html += `
      <div class="criterion-tag ${crit.isCustom ? 'custom' : 'core'}" title="${crit.description || ''}">
        <span class="crit-name">${crit.name}</span>
        <span style="font-size:0.65rem;color:var(--muted);">x</span>
        <input type="number" value="${weight}" min="0.1" max="10" step="0.1"
               onchange="updateWeight('${crit.id}', this.value)" title="Poids du critere">
        ${crit.isCustom ? `<button class="remove-crit" onclick="removeCriterion('${crit.id}')" title="Supprimer">x</button>` : ''}
      </div>`;
  }

  html += `
    </div>
  </div>`;

  return html;
}

// ===============================
// RENDER: Table
// ===============================
function renderTable() {
  const criteria = getAllCriteria();
  const m = getMethod();

  // Calculate scores
  for (const item of items) {
    item.score = m.calculate(item.values, criteriaWeights);
  }

  // Rank
  const sorted = [...items].filter(i => i.values && Object.keys(i.values).length > 0).sort((a, b) => b.score - a.score);
  sorted.forEach((item, i) => { item.rank = i + 1; });
  items.filter(i => !sorted.includes(i)).forEach(i => { i.rank = null; });

  let html = `<div class="table-wrap"><table>
    <thead><tr>
      <th style="width:40px">#</th>
      <th style="min-width:200px">Feature / Story</th>`;

  for (const crit of criteria) {
    html += `<th>${crit.name}</th>`;
  }

  html += `<th class="score-col">Score</th>
    <th class="rank-col">Rang</th>
    <th style="width:40px"></th>
    </tr></thead><tbody>`;

  for (const item of items) {
    html += `<tr>
      <td style="color:var(--muted); font-size:0.8rem;">${item.id}</td>
      <td><input type="text" value="${escapeAttr(item.name)}" onchange="updateItemName(${item.id}, this.value)" placeholder="Nom de la feature..."></td>`;

    for (const crit of criteria) {
      const val = item.values[crit.id];
      if (crit.type === 'select') {
        html += `<td><select onchange="updateValue(${item.id}, '${crit.id}', parseFloat(this.value))">`;
        for (const opt of crit.options) {
          html += `<option value="${opt.v}" ${val == opt.v ? 'selected' : ''}>${opt.l}</option>`;
        }
        html += `</select></td>`;
      } else {
        html += `<td><input type="number" value="${val !== undefined ? val : ''}"
                  min="${crit.min || 0}" max="${crit.max || 100}" step="${crit.step || 1}"
                  onchange="updateValue(${item.id}, '${crit.id}', parseFloat(this.value))"
                  placeholder="${crit.default || 0}"></td>`;
      }
    }

    const scoreDisplay = item.score !== undefined ? (m.isCategorical ?
      ['','Won\'t','Could','Should','Must'][Math.round(item.score)] || item.score.toFixed(1) :
      item.score.toFixed(1)) : '-';

    const rankClass = item.rank === 1 ? 'rank-1' : item.rank === 2 ? 'rank-2' : item.rank === 3 ? 'rank-3' : 'rank-other';

    html += `<td class="score-cell">${scoreDisplay}</td>`;
    html += `<td class="rank-cell">${item.rank ? `<span class="rank-badge ${rankClass}">${item.rank}</span>` : '-'}</td>`;
    html += `<td><button class="delete-row" onclick="removeItem(${item.id})" title="Supprimer">&#128465;</button></td>`;
    html += `</tr>`;
  }

  html += `</tbody></table></div>`;
  html += `<button class="btn-ghost" style="margin-top:0.75rem;" onclick="addItem()">+ Ajouter une feature</button>`;

  return html;
}

// ===============================
// RENDER: Results
// ===============================
function renderResults() {
  const m = getMethod();
  const scored = items.filter(i => i.score !== undefined && i.name).sort((a, b) => b.score - a.score);
  if (scored.length === 0) return '';

  const maxScore = scored[0].score || 1;

  let html = `<div class="results-panel">
    <div class="results-header">
      <h3>Classement</h3>
      <button class="btn-secondary" style="font-size:0.75rem;" onclick="exportResults()">Exporter</button>
    </div>
    <div class="ranking-list">`;

  for (let i = 0; i < scored.length; i++) {
    const item = scored[i];
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const pct = maxScore > 0 ? (item.score / maxScore * 100) : 0;
    const display = m.isCategorical ? ['','Won\'t','Could','Should','Must'][Math.round(item.score)] || item.score.toFixed(1) : item.score.toFixed(1);

    html += `<div class="ranking-item">
      <span class="rank ${rankClass}">#${i + 1}</span>
      <span class="item-name">${item.name || 'Sans nom'}</span>
      <div class="ranking-bar"><div class="ranking-bar-fill" style="width:${pct}%"></div></div>
      <span class="item-score">${display}</span>
    </div>`;
  }

  html += `</div></div>`;
  return html;
}

// ===============================
// RENDER: Main
// ===============================
function render() {
  renderSidebar();
  const m = getMethod();

  document.getElementById('main').innerHTML = `
    <div class="main-header">
      <h2>${m.icon} ${m.name}</h2>
      <div style="display:flex; gap:0.5rem;">
        <button class="btn-secondary" onclick="resetAll()">Reinitialiser</button>
        <button class="btn-primary" onclick="exportResults()">Exporter</button>
      </div>
    </div>
    ${renderCriteriaBar()}
    ${renderTable()}
    ${renderResults()}
  `;

  saveState();
}

// ===============================
// ACTIONS
// ===============================
function switchMethod(key) {
  currentMethod = key;
  customCriteria = [];
  criteriaWeights = {};
  const m = getMethod();
  m.coreCriteria.forEach(c => { criteriaWeights[c.id] = 1; });

  for (const item of items) {
    item.values = {};
    for (const crit of getAllCriteria()) {
      item.values[crit.id] = getDefaultValue(crit);
    }
  }

  ensureDefaultItem();
  render();
}

function addItem() {
  items.push({ id: nextItemId++, name: '', values: createDefaultValues(), score: 0, rank: null });
  render();
}

function removeItem(id) {
  items = items.filter(i => i.id !== id);
  render();
}

function updateItemName(id, name) {
  const item = items.find(i => i.id === id);
  if (item) { item.name = name; render(); }
}

function updateValue(id, critId, value) {
  const item = items.find(i => i.id === id);
  if (item) { item.values[critId] = value; render(); }
}

function updateWeight(critId, value) {
  criteriaWeights[critId] = parseFloat(value) || 1;
  render();
}

function addCriterion() {
  if (!canAddCriteria()) return;
  const input = document.getElementById('new-crit-name');
  if (!input) return;
  const name = input.value.trim();
  if (!name) { input.focus(); return; }
  const id = 'custom_' + Date.now() + '_' + name.toLowerCase().replace(/[^a-z0-9_]/g, '_').substring(0, 20);
  if (customCriteria.some(c => c.name.toLowerCase() === name.toLowerCase())) return;

  const newCrit = {
    id, name, description: 'Sous-composante personnalisee du Cost of Delay', type: 'number',
    min: 1, max: 21, step: 1, default: 3, group: 'Cost of Delay', isCustom: true
  };
  customCriteria.push(newCrit);
  criteriaWeights[id] = 1;

  for (const item of items) {
    item.values[id] = newCrit.default;
  }
  input.value = '';
  render();
}

function removeCriterion(id) {
  if (!canAddCriteria()) return;
  customCriteria = customCriteria.filter(c => c.id !== id);
  delete criteriaWeights[id];
  for (const item of items) {
    delete item.values[id];
  }
  render();
}

function resetAll() {
  if (!confirm('Reinitialiser toutes les donnees ?')) return;
  items = [];
  customCriteria = [];
  criteriaWeights = {};
  getMethod().coreCriteria.forEach(c => { criteriaWeights[c.id] = 1; });
  nextItemId = 1;
  ensureDefaultItem();
  render();
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function exportResults() {
  const m = getMethod();
  const criteria = getAllCriteria();
  const scored = items.filter(i => i.name).sort((a, b) => b.score - a.score);

  let text = `PRIORISATION — ${m.name}\n${'='.repeat(50)}\n`;
  text += `Méthode : ${m.name}\n`;
  text += `Formule : ${m.formula}\n`;
  if (customCriteria.length > 0) {
    text += `Critères custom : ${customCriteria.map(c => c.name).join(', ')}\n`;
  }
  text += `\n${'─'.repeat(50)}\n\n`;

  text += `CLASSEMENT\n`;
  for (let i = 0; i < scored.length; i++) {
    const item = scored[i];
    const display = m.isCategorical ? ['','Won\'t','Could','Should','Must'][Math.round(item.score)] || item.score.toFixed(1) : item.score.toFixed(1);
    text += `  ${i+1}. ${item.name} — Score: ${display}\n`;
    for (const crit of criteria) {
      const w = criteriaWeights[crit.id] || 1;
      text += `     ${crit.name}: ${item.values[crit.id]} (poids: ${w})\n`;
    }
    text += '\n';
  }

  text += `\nGénéré le ${new Date().toLocaleDateString('fr-FR')} — PO Ultimate Toolkit`;

  document.getElementById('export-text').textContent = text;
  document.getElementById('export-modal').classList.add('open');
}

function copyExport() {
  const text = document.getElementById('export-text').textContent;
  navigator.clipboard.writeText(text).then(() => {
    event.target.textContent = 'Copié !';
    setTimeout(() => event.target.textContent = 'Copier', 2000);
  });
}

// ===============================
// INIT
// ===============================
function init() {
  if (!loadState()) {
    getMethod().coreCriteria.forEach(c => { criteriaWeights[c.id] = 1; });
    ensureDefaultItem();
  }

  render();
}

init();
