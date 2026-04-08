# PO Toolkit

Le guide de reference du Product Owner — outils, methodes et accelerateurs.

## Demarrage rapide

1. Ouvrir `site/index.html` dans votre navigateur
2. C'est tout. Zero installation, zero serveur, tout fonctionne en local.

## Contenu

### Site Web (guide principal)
- **Des dizaines d'outils** analyses objectivement par categorie
- **Methodes detaillees** (priorisation, discovery, metriques, scaling)
- **Cheat sheets** interactives et imprimables
- Recherche (Ctrl+K), dark mode, filtres par pricing/profil PO
- 100% statique, ouvrable hors-ligne

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

1. Gestion de Projet & Backlog (Jira, Linear, Azure DevOps, Shortcut, Asana, Monday, Trello, ClickUp, YouTrack, GitHub Projects, Targetprocess)
2. Roadmapping (Productboard, Aha!, Airfocus, Craft.io, Roadmunk)
3. Design & Prototypage (Figma, Sketch, Adobe XD, Balsamiq, Whimsical, Axure, Framer, Penpot)
4. User Research (Maze, Hotjar, UserTesting, Dovetail, Optimal Workshop, Typeform, Microsoft Clarity)
5. Analytics & Data (Mixpanel, Amplitude, PostHog, GA4, Heap, Pendo, Matomo)
6. Collaboration (Miro, Mural, FigJam, Lucidspark, Klaxoon, Excalidraw)
7. Documentation (Notion, Confluence, Coda, GitBook, Slite)
8. Communication (Slack, Teams, Loom, Zight)
9. DevOps & Technique (GitHub, GitLab, Datadog, Sentry, LaunchDarkly)
10. IA & Productivite (ChatGPT, Claude, Copilot, Notion AI, Gamma)
11. Feedback & Support (Canny, Intercom, Zendesk)
12. Tests & Qualite (TestRail, Zephyr, BrowserStack)

## Licence

Usage interne libre. Slide library originale sous licence separee.
