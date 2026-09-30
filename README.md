# PO Toolkit

Le guide de reference du Product Owner — outils, methodes et accelerateurs.

## Demarrage rapide

1. Ouvrir `site/index.html` dans votre navigateur
2. C'est tout. Zero installation, zero serveur, tout fonctionne en local.

## Hebergement (GitHub Pages)

Le repo est configure pour deploiement automatique via GitHub Actions:
- Workflow: `.github/workflows/deploy-pages.yml`
- Declenchement: chaque push sur `main`
- URL cible (repo actuel): `https://korgman78.github.io/po-toolkit/`

Activation a faire une seule fois dans GitHub:
1. `Settings` -> `Pages`
2. `Build and deployment` -> `Source = GitHub Actions`

## Contenu

### Site Web (guide principal)
- **Des dizaines d'outils** analyses objectivement par categorie
- **Methodes detaillees** (priorisation, discovery, metriques, scaling)
- **Cheat sheets** interactives et imprimables
- Navigation en 5 entrees (Accueil, Formation, Boite a outils, Referentiel d'outils, Methodes) avec sous-navigation contextuelle dans la sidebar
- Accueil oriente taches : raccourcis clavier vers les mini-apps (R, P, E, S, M, I), progression de formation
- Palette de commande (Ctrl+K ou /) : recherche groupee, navigation au clavier
- Referentiel d'outils en tableau filtrable (texte, prix, categorie)
- Design system « Atelier » (Geist / Geist Mono, icones SVG au trait, theme clair/sombre suivant le systeme), responsive et accessible (focus visibles, reduced motion, impression)
- 100% statique, ouvrable hors-ligne

### Formation (parcours de cours)

Section de cours structures, accessible depuis la sidebar « Formation ». Chaque thematique a une page de presentation, puis se parcourt chapitre par chapitre (une page par chapitre, plan du parcours dans la sidebar, sommaire « Sur cette page » avec suivi de lecture, progression enregistree dans le navigateur), avec points cles et exercices pratiques renvoyant vers les mini-apps. Chaque parcours se termine par un quiz final de mises en situation (correction immediate, explication et score ; donnees dans la propriete `quiz` de chaque thematique).

| Thematique | Contenu |
|------------|---------|
| **Architecture Fonctionnelle** | 8 chapitres (patterns applicatifs & integration) : fondamentaux & attributs de qualite, architecture en couches, monolithe vs microservices (DDD), communication synchrone (REST/GraphQL/gRPC), asynchrone & evenementiel (Kafka/EDA/CQRS), donnees & persistance (Saga), patterns d'integration (Gateway, BFF, Circuit Breaker, Strangler Fig...), bonnes pratiques & anti-patterns. Exercices a realiser dans `schemas-workflows.html`. |
| **Introduction a la CI/CD** | 10 chapitres (parcours Delivery & Agilite, niveau debutant) : pourquoi la CI/CD, Git & strategies de branches, integration continue, anatomie d'un pipeline & outillage, strategie de tests & quality gates, environnements / IaC / GitOps, strategies de deploiement & feature flags, DevSecOps & conformite, metriques DORA & observabilite, role du PO. Donnees dans `site/formation-cicd.js`. |
| **IA & SAFe : les LLM et l'agilite a l'echelle** | 11 chapitres (parcours Delivery & Agilite, niveau intermediaire), sources citees (DORA, METR, HBS/BCG, NBER, Faros, GitClear, Scaled Agile) : ce que changent les LLM, etat de la recherche, deplacement du goulot, AI-Native SAFe (2026), equipe AI-native, PO augmente, planification par outcomes, gouvernance & risques, organisation agile AI-native, comparaison role par role (PO, proxy PO, PM, BA, architecte, tech lead, dev, UX/UI, Scrum Master, cloud builder), adaptation en grand groupe regule (pilotage mixte, charte du prototype, role du tech lead, train pilote). Donnees dans `site/formation-ia-safe.js`. |
| **Du mode projet au mode produit** | 9 chapitres (parcours Delivery & Agilite, niveau intermediaire) : definitions et symptomes du water-scrum-fall, pourquoi le mode projet resiste (budget, comites, CapEx), cout cache et metriques de flux (Flow Framework), mode produit (Cagan, ING), equipes socles et Team Topologies, reglementaire en mode produit (exemple CCD2), Lean Budgets et garde-fous, pilotage par la direction, leviers d'action du PO. Donnees dans `site/formation-projet-produit.js`. |
| **L'IA au quotidien du PO/PM : usages avances** | 10 chapitres (parcours Discovery & Produit, niveau avance), sources citees (HBS/BCG, P&G, METR, Anthropic, Uber, Pinterest, Tetlock, NN/g, Veracode, AI Act) : grille de delegation, context engineering et connecteurs MCP, analyse de verbatims a grande echelle (methode Clio), limites des utilisateurs synthetiques, text-to-SQL et verification des chiffres, contradiction / pre-mortem / previsions, prototypage sous controle, workflows et triade mortelle, evals d'une fonctionnalite IA, confidentialite / AI Act / esprit critique. Donnees dans `site/formation-ia-quotidien.js`. |

### Accelerateurs telechargeables

| Fichier | Format | Description |
|---------|--------|-------------|
| `user-story-template.xlsx` | Excel | Template User Stories avec validations et exemples |
| `prioritization-matrices.xlsx` | Excel | Workbook multi-methodes avec onglets RICE, WSJF, ICE, MoSCoW et Value vs Effort |
| `release-plan.xlsx` | Excel | Release planning + velocity tracker |
| `capacity-planning.xlsx` | Excel | Calcul charge/capacite par sprint |
| `product-canvas.pptx` | PowerPoint | Canvas visuel (vision, personas, KPIs) |
| `sprint-review-template.pptx` | PowerPoint | 4 slides pre-formatees pour Sprint Review |
| `definition-of-ready-done.pptx` | PowerPoint | Checklists DoR et DoD affichables |
| `stakeholder-mapping.pptx` | PowerPoint | Matrice pouvoir/interet |
| `jira-import-template.csv` | CSV | Import bulk dans Jira |
| `ado-import-template.csv` | CSV | Import bulk dans Azure DevOps |

### Mini-Apps HTML interactives
| App | Description |
|-----|-------------|
| `prioritization-calculator.html` | Priorisation multi-frameworks (RICE, WSJF, ICE, MoSCoW, Value/Effort), criteres, ponderation, export |
| `story-splitter.html` | Decoupage guide d'une feature en user stories : workflow, front/back, CSV, regles metier, edge cases |
| `roadmap-designer.html` | Designer de roadmap epic/feature multi-mois avec sauvegarde locale, filtres, drag/drop, import/export JSON |
| `planning-poker.html` | Vote d'estimation (Fibonacci/T-shirt), revelation, consensus |
| `pi-planning-simulator.html` | Simulation de PI Planning par sprint : capacite, points, must/should, dependances, IP sprint, export CSV |
| `daily-standup-timer.html` | Timer avec chrono par personne, shuffle, recap |
| `retro-board.html` | Board de retrospective (3 templates), votes, export texte |
| `schemas-workflows.html` | Canvas de schemas et workflows en session locale : fronts, microservices, Kafka, Postgres, APIs et liaisons |
| `json-uuid-tools.html` | Validation JSON, format/minify/tri des cles, generateurs UUID v4/v7 et Nano ID |

### Slide Library
- `Slides Library_A4.pptx` — 225 slides de diagrammes professionnels (nettoyee)

## Structure

```
po-toolkit/
|-- site/                    <- Ouvrir index.html
|   |-- index.html
|   |-- style.css
|   |-- script.js
|   `-- data.js
|-- accelerators/
|   |-- xlsx/               <- Templates Excel
|   |-- pptx/               <- Templates PowerPoint
|   |-- csv/                <- Templates CSV (import Jira/ADO)
|   `-- html/               <- Mini-apps interactives
|-- Slides Library_A4.pptx  <- Slide library
`-- README.md
```

## Categories d'outils couverts

1. Gestion de Projet & Backlog (Jira, Linear, Azure DevOps, Shortcut (ex-Clubhouse), Asana, Monday.com, Trello, ClickUp, YouTrack, GitHub Projects, IBM Targetprocess, Jira Align, Plane)
2. Roadmapping & Vision Produit (Productboard, Jira Product Discovery, Aha!, Airfocus, Craft.io, Strategic Roadmaps (ex-Roadmunk))
3. IA & Assistants (ChatGPT, Claude, Gemini, Microsoft 365 Copilot, NotebookLM, Perplexity, v0, Lovable, Bolt)
4. Design & Prototypage (Figma, Sketch, Balsamiq, Whimsical, Axure RP, Framer, Penpot)
5. User Research & Testing (Maze, Hotjar, UserTesting, Dovetail, Optimal Workshop, Typeform, Microsoft Clarity, Canny)
6. Analytics & Data (Mixpanel, Amplitude, PostHog, Google Analytics 4, Heap, Pendo, Matomo, Contentsquare, Optimizely, AB Tasty, Power BI, Looker Studio, Metabase)
7. Collaboration & Workshops (Miro, Mural, FigJam, Lucidspark, Klaxoon, Excalidraw, Slack, Microsoft Teams, Loom)
8. Documentation & Knowledge Base (Notion, Confluence, Coda, GitBook, Slite, draw.io, Lucidchart)
9. DevOps & Technique (GitHub, GitLab, Datadog, Sentry, LaunchDarkly)
10. API Testing & Documentation (Postman, Bruno, Insomnia, Hoppscotch, Swagger / OpenAPI, Stoplight, HTTPie)
11. Tests & Qualite (TestRail, Zephyr (SmartBear), BrowserStack, Xray)

## Licence

Usage interne libre. Slide library originale sous licence separee.
