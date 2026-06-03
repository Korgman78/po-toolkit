const TOOLS_DATA = {
  "project-management": {
    title: "Gestion de Projet & Backlog",
    icon: "&#128203;",
    color: "var(--cat-project)",
    description: "Les outils indispensables pour gérer le backlog, planifier les sprints et suivre la delivery.",
    tools: [
      {
        name: "Jira",
        logo: "&#9881;",
        tagline: "Atlassian — Le standard de l'industrie",
        pricing: "freemium",
        description: "L'outil le plus répandu pour la gestion de backlog et le suivi de projet agile. Très puissant mais complexe à configurer. Écosystem riche (Confluence, Bitbucket).",
        pros: ["Extremement personnalisable (workflows, champs, écrans)", "Marketplace massive (3000+ plugins)", "JQL puissant pour les requetes avancees", "Rapports et dashboards natifs complets"],
        cons: ["Courbe d'apprentissage raide", "Interface parfois lente et chargee", "Prix escalade vite avec les plugins", "Peut devenir usine a gaz sans gouvernance"],
        score: 8.2,
        ideal: ["PO technique", "Équipes 10+", "Enterprise"],
        intégrations: ["Confluence", "Bitbucket", "Slack", "GitHub", "Figma"],
        alternatives: ["Linear", "Azure DevOps", "Shortcut"],
        url: "https://www.atlassian.com/software/jira"
      },
      {
        name: "Linear",
        logo: "&#9889;",
        tagline: "L'alternative moderne et rapide",
        pricing: "freemium",
        description: "Outil de project management ultra-rapide, pensé pour les équipes produit modernes. UX minimaliste et performante. Monte en popularité dans les startups et scale-ups.",
        pros: ["UX exceptionnelle, très rapide", "Cyclés et roadmap intégrés", "Raccourcis clavier exhaustifs", "API GraphQL puissante"],
        cons: ["Moins personnalisable que Jira", "Écosystem de plugins plus limite", "Pas ideal pour les grosses organisations", "Reporting moins avance"],
        score: 8.8,
        ideal: ["PO technique", "Startup", "Scale-up"],
        intégrations: ["GitHub", "GitLab", "Slack", "Figma", "Sentry"],
        alternatives: ["Jira", "Shortcut", "Height"],
        url: "https://linear.app"
      },
      {
        name: "Azure DevOps",
        logo: "&#9729;",
        tagline: "Microsoft — Suite complète CI/CD + Project",
        pricing: "freemium",
        description: "Suite complète integrant backlog, repos Git, pipelines CI/CD et test plans. Choix naturel dans les environnements Microsoft / entreprises.",
        pros: ["Intégration native avec l'écosystème Microsoft", "Boards + Repos + Pipelines en un seul outil", "Gratuit jusqu'a 5 utilisateurs", "Excellent pour les équipes .NET"],
        cons: ["UX vieillissante par endroits", "Complexe pour les petites équipes", "Moins adapte aux équipes non-Microsoft", "Documentation parfois confuse"],
        score: 7.5,
        ideal: ["PO technique", "Enterprise", "Équipes Microsoft"],
        intégrations: ["Teams", "VS Code", "GitHub", "Slack"],
        alternatives: ["Jira", "GitLab", "GitHub Projects"],
        url: "https://azure.microsoft.com/en-us/products/devops"
      },
      {
        name: "Shortcut (ex-Clubhouse)",
        logo: "&#128640;",
        tagline: "Le juste milieu puissance / simplicite",
        pricing: "freemium",
        description: "Outil intuitif qui combine la simplicite de Trello avec la puissance de Jira. Epics, stories, iterations bien structures sans la complexité.",
        pros: ["Interface claire et intuitive", "Bon equilibre features / simplicite", "Iterations et epics bien pensés", "API REST complete"],
        cons: ["Moins connu, communauté plus petite", "Moins de plugins tiers", "Reporting perfectible", "Pas de version on-premise"],
        score: 7.8,
        ideal: ["PO métier", "PO technique", "PME"],
        intégrations: ["GitHub", "GitLab", "Slack", "Figma"],
        alternatives: ["Linear", "Jira", "Asana"],
        url: "https://shortcut.com"
      },
      {
        name: "Asana",
        logo: "&#127919;",
        tagline: "Gestion de projet polyvalente",
        pricing: "freemium",
        description: "Outil de gestion de projet généraliste, très populaire en dehors du dev. Vues liste, board, timeline, formulaires. Excellent pour les équipes cross-fonctionnelles.",
        pros: ["Interface très accessible", "Vues multiples (liste, board, timeline, calendrier)", "Formulaires d'intake intégrés", "Automatisations sans code"],
        cons: ["Pas conçu pour l'agile pur", "Pas de story points natifs", "Fonctionnalites avancees payantes", "Peut manquer de profondeur pour le dev"],
        score: 7.0,
        ideal: ["PO métier", "Équipes cross-fonctionnelles"],
        intégrations: ["Slack", "Teams", "Google Workspace", "Figma", "Zapier"],
        alternatives: ["Monday.com", "ClickUp", "Trello"],
        url: "https://asana.com"
      },
      {
        name: "Monday.com",
        logo: "&#128197;",
        tagline: "Work OS visuel et flexible",
        pricing: "paid",
        description: "Plateforme de travail visuelle et très flexible. Boards personnalisables à l'extreme. Populaire pour le project management hors IT et les équipes mixtes.",
        pros: ["Extremement visuel et intuitif", "Très flexible (200+ templates)", "Automatisations puissantes", "Bon pour le reporting exécutif"],
        cons: ["Cher pour les grosses équipes", "Pas optimisé pour l'agile pur", "Peut devenir désordonné sans structure", "Performance variable sur gros volumes"],
        score: 6.8,
        ideal: ["PO métier", "Équipes non-tech"],
        intégrations: ["Slack", "Teams", "Google Workspace", "Jira", "GitHub"],
        alternatives: ["Asana", "ClickUp", "Notion"],
        url: "https://monday.com"
      },
      {
        name: "Trello",
        logo: "&#128466;",
        tagline: "Atlassian — Kanban simple et visuel",
        pricing: "freemium",
        description: "L'outil kanban le plus simple du marche. Parfait pour démarrer ou pour des workflows simples. Power-Ups pour étendre les fonctionnalités.",
        pros: ["Extremement simple à prendre en main", "Version gratuite très généreuse", "Power-Ups pour étendre", "Drag & drop intuitif"],
        cons: ["Limites pour les gros projets", "Pas de story points, pas de sprints natifs", "Vite limite quand l'équipe grandit", "Reporting quasi inexistant"],
        score: 6.5,
        ideal: ["PO métier", "Petites équipes", "Side projects"],
        intégrations: ["Slack", "Google Drive", "GitHub", "Jira"],
        alternatives: ["Asana", "Notion", "GitHub Projects"],
        url: "https://trello.com"
      },
      {
        name: "ClickUp",
        logo: "&#128171;",
        tagline: "La plateforme tout-en-un",
        pricing: "freemium",
        description: "Ambitionne de remplacer tous vos outils : projet, docs, chat, objectifs. Très riche fonctionnellement mais peut etre overwhelmant.",
        pros: ["Feature-set très complet", "Vues multiples + Docs + Goals", "Version gratuite très complete", "Personnalisation poussee"],
        cons: ["Trop de features = courbe d'apprentissage", "Performance parfois lente", "Complexe a administrer", "Mises à jour fréquentes déstabilisantes"],
        score: 7.2,
        ideal: ["PO métier", "PME", "Équipes polyvalentes"],
        intégrations: ["Slack", "GitHub", "GitLab", "Figma", "Google Workspace"],
        alternatives: ["Asana", "Monday.com", "Notion"],
        url: "https://clickup.com"
      },
      {
        name: "YouTrack",
        logo: "&#128301;",
        tagline: "JetBrains — Agile + Knowledge Base",
        pricing: "freemium",
        description: "Outil agile de JetBrains avec boards, sprints, time tracking et knowledge base intégrée. Gratuit jusqu'a 10 utilisateurs. Bien intégré avec l'écosystème JetBrains.",
        pros: ["Gratuit <10 users (cloud)", "Query language puissant", "Agile boards + reports natifs", "Knowledge base intégrée"],
        cons: ["UX moins moderne", "Communaute plus petite", "Plugins limites", "Moins adapte aux équipes non-dev"],
        score: 7.0,
        ideal: ["PO technique", "Petites équipes dev"],
        intégrations: ["IntelliJ IDEA", "GitHub", "GitLab", "Slack"],
        alternatives: ["Jira", "Linear", "Plane"],
        url: "https://www.jetbrains.com/youtrack"
      },
      {
        name: "GitHub Projects",
        logo: "&#128025;",
        tagline: "Project management intégré a GitHub",
        pricing: "free",
        description: "Tableaux de projet directement intégrés a GitHub. Vues table, board, roadmap. Parfait pour les équipes qui vivent déjà dans GitHub.",
        pros: ["Gratuit et intégré a GitHub", "Vues table/board/roadmap", "Automation via Actions", "Zéro outil supplementaire pour les devs"],
        cons: ["Limites pour le PO pur", "Pas de story points natifs avances", "Reporting basique", "Nécessite GitHub comme VCS"],
        score: 7.0,
        ideal: ["PO technique", "Équipes open source"],
        intégrations: ["GitHub Actions", "Slack", "VS Code"],
        alternatives: ["Linear", "Jira", "GitLab"],
        url: "https://github.com/features/issues"
      },
      {
        name: "Targetprocess",
        logo: "&#127919;",
        tagline: "Visual management pour SAFe et à l'echelle",
        pricing: "paid",
        description: "Outil de gestion visuelle conçu pour le scaling agile (SAFe, LeSS). Portfolios, PI Planning, dependencies. Puissant pour les grandes organisations.",
        pros: ["Conçu pour SAFe / scaling", "Vues visuelles puissantes", "Gestion de portefeuille", "Reporting enterprise"],
        cons: ["Complexe a mettre en place", "Cher", "Overkill pour petites équipes", "Courbe d'apprentissage importante"],
        score: 7.3,
        ideal: ["PO technique", "Enterprise", "SAFe"],
        intégrations: ["Jira", "Azure DevOps", "Jenkins", "Slack"],
        alternatives: ["Jira + Jira Align", "Azure DevOps"],
        url: "https://www.targetprocess.com"
      }
    ]
  },
  "roadmapping": {
    title: "Roadmapping & Vision Produit",
    icon: "&#128506;",
    color: "var(--cat-roadmap)",
    description: "Outils dédiés à la construction de roadmaps produit, la gestion de la vision et l'alignement stratégique.",
    tools: [
      {
        name: "Productboard",
        logo: "&#127775;",
        tagline: "La référence du product management",
        pricing: "paid",
        description: "Plateforme dédiée au product management : collecte de feedback, priorisation, roadmap. Conçu par et pour les POs. Portal client pour la transparence.",
        pros: ["Conçu spécifiquement pour les POs", "Centralise feedback → features → roadmap", "Scoring et priorisation intégrés", "Portail client pour partager la roadmap"],
        cons: ["Prix élevé (a partir de $20/maker/mois)", "Onboarding un peu long", "Peut faire doublon avec Jira", "Trop riche pour les petites équipes"],
        score: 8.5,
        ideal: ["PO métier", "PO technique", "Scale-up", "Enterprise"],
        intégrations: ["Jira", "Slack", "Intercom", "Zendesk", "Salesforce"],
        alternatives: ["Airfocus", "Aha!", "Craft.io"],
        url: "https://www.productboard.com"
      },
      {
        name: "Aha!",
        logo: "&#128161;",
        tagline: "Strategy → Roadmap → Delivery",
        pricing: "paid",
        description: "Suite complète pour la stratégie produit. Roadmaps, scoring, personas, competitor analysis. Aha! Develop pour la partie delivery. Très complet mais complexe.",
        pros: ["Suite stratégie complete", "Roadmaps très visuelles", "Notebooks pour la documentation produit", "Intégration delivery avec Aha! Develop"],
        cons: ["Cher ($59+/user/mois)", "Complexe à configurer", "UX un peu chargee", "Courbe d'apprentissage importante"],
        score: 7.8,
        ideal: ["PO métier", "Enterprise", "CPO/Head of Product"],
        intégrations: ["Jira", "Azure DevOps", "Slack", "Salesforce"],
        alternatives: ["Productboard", "Airfocus", "Roadmunk"],
        url: "https://www.aha.io"
      },
      {
        name: "Airfocus",
        logo: "&#9992;",
        tagline: "Priorisation et roadmap modulaires",
        pricing: "paid",
        description: "Plateforme modulaire axee sur la priorisation. Priority Poker, scoring customisable, templates de frameworks. Approche lego : activez les modules dont vous avez besoin.",
        pros: ["Approche modulaire flexible", "Priority Poker innovant", "Frameworks de priorisation intégrés", "UX moderne et agreable"],
        cons: ["Moins établi que Productboard/Aha!", "Communaute plus petite", "Certains modules en beta", "Reporting perfectible"],
        score: 7.5,
        ideal: ["PO métier", "PO technique", "PME"],
        intégrations: ["Jira", "Trello", "Asana", "Slack", "GitHub"],
        alternatives: ["Productboard", "Craft.io"],
        url: "https://airfocus.com"
      },
      {
        name: "Craft.io",
        logo: "&#128295;",
        tagline: "Product management end-to-end",
        pricing: "paid",
        description: "Plateforme de product management complète avec specs, roadmaps, capacity planning et feedback. Particulierement forte sur la documentation produit.",
        pros: ["Specs + Roadmap + Capacity en un outil", "Documentation produit avancee", "User story mapping integre", "Capacity planning visuel"],
        cons: ["Moins connu", "Prix sur devis uniquement", "Moins d'intégrations", "Communaute limitee"],
        score: 7.2,
        ideal: ["PO technique", "PME", "Scale-up"],
        intégrations: ["Jira", "Azure DevOps", "Slack"],
        alternatives: ["Productboard", "Aha!"],
        url: "https://craft.io"
      },
      {
        name: "Roadmunk",
        logo: "&#128739;",
        tagline: "Roadmaps visuelles pour stakeholders",
        pricing: "paid",
        description: "Outil spécialisé dans la création de roadmaps visuelles partageables. Timeline et swimlane views. Ideal pour la communication avec les executives et stakeholders.",
        pros: ["Roadmaps très visuelles", "Export présentation-ready", "Vues timeline et swimlane", "Facile à prendre en main"],
        cons: ["Scope limite (roadmap seulement)", "Pas de gestion de backlog", "Pricing par user", "Manque de priorisation avancee"],
        score: 7.0,
        ideal: ["PO métier", "Communication executive"],
        intégrations: ["Jira", "Azure DevOps", "Trello"],
        alternatives: ["Productboard", "Aha!", "Airfocus"],
        url: "https://roadmunk.com"
      }
    ]
  },
  "design-prototyping": {
    title: "Design & Prototypage",
    icon: "&#127912;",
    color: "var(--cat-design)",
    description: "Outils de design, prototypage et handoff dev. Le PO doit les connaitre pour collaborer efficacement avec les designers et valider les maquettes.",
    tools: [
      {
        name: "Figma",
        logo: "&#9998;",
        tagline: "La référence absolue du design collaboratif",
        pricing: "freemium",
        description: "Outil de design vectoriel collaboratif en temps reel. Standard de l'industrie. Le PO l'utilisé pour reviewer les maquettes, commenter et valider les parcours.",
        pros: ["Collaboration temps reel", "Gratuit pour 3 projets", "Prototypage interactif", "Dev Mode pour le handoff", "FigJam pour les ateliers"],
        cons: ["Nécessite connexion internet", "Complexe pour les non-designers", "Performances sur gros fichiers", "Rachat par Adobe (incertitude)"],
        score: 9.2,
        ideal: ["PO métier", "PO technique", "Tous profils"],
        intégrations: ["Slack", "Jira", "Notion", "Storybook", "GitHub"],
        alternatives: ["Sketch", "Adobe XD", "Penpot"],
        url: "https://www.figma.com"
      },
      {
        name: "Sketch",
        logo: "&#128142;",
        tagline: "L'outil historique du design macOS",
        pricing: "paid",
        description: "Outil de design vectoriel natif macOS. Pionnier du design d'interface moderne. Reste populaire mais perd du terrain face a Figma.",
        pros: ["Performance native macOS", "Plugins matures", "Workspace collaboratif (récemment)", "Export propre"],
        cons: ["macOS uniquement", "Collaboration moins fluide que Figma", "Perd des parts de marche", "Pas de prototypage avance natif"],
        score: 6.5,
        ideal: ["Équipes macOS", "Legacy"],
        intégrations: ["Zeplin", "InVision", "Abstract", "Jira"],
        alternatives: ["Figma", "Adobe XD"],
        url: "https://www.sketch.com"
      },
      {
        name: "Adobe XD",
        logo: "&#9954;",
        tagline: "Adobe — Design et prototypage",
        pricing: "paid",
        description: "Outil de design et prototypage d'Adobe. Bien intégré a Creative Cloud. Adobe a annonce un recentrage, l'avenir est incertain.",
        pros: ["Intégration Creative Cloud", "Prototypage + animations", "Repeat Grid pratique", "Co-editing"],
        cons: ["Avenir incertain (Adobe recentre sur Figma)", "Communaute en declin", "Moins de plugins que Figma", "Updates ralentis"],
        score: 5.5,
        ideal: ["Équipes Adobe existantes"],
        intégrations: ["Creative Cloud", "Jira", "Slack"],
        alternatives: ["Figma", "Sketch"],
        url: "https://helpx.adobe.com/xd/get-started.html"
      },
      {
        name: "Balsamiq",
        logo: "&#9999;",
        tagline: "Wireframes basse fidélité rapides",
        pricing: "paid",
        description: "Outil de wireframing basse fidélité avec un style 'sketch'. Ideal pour le PO qui veut exprimer une idée rapidement sans design polish.",
        pros: ["Très rapide pour wireframer", "Style sketch = pas de débat pixel", "Bibliotheque de composants riche", "Facile pour les non-designers"],
        cons: ["Basse fidélité uniquement", "Pas de prototypage interactif avance", "Design date", "Export limite"],
        score: 7.0,
        ideal: ["PO métier", "Discovery", "Ideation rapide"],
        intégrations: ["Confluence", "Jira", "Google Drive"],
        alternatives: ["Whimsical", "Excalidraw", "Figma"],
        url: "https://balsamiq.com"
      },
      {
        name: "Whimsical",
        logo: "&#128173;",
        tagline: "Wireframes + Flowcharts + Mind maps",
        pricing: "freemium",
        description: "Outil tout-en-un pour wireframes, flowcharts, mind maps et docs. Parfait pour le PO qui veut structurer sa pensée visuellement sans outil de design complexe.",
        pros: ["Wireframes + flowcharts + mind maps", "UX très épurée", "Facile pour les non-designers", "Collaboratif temps reel"],
        cons: ["Wireframes basiques (pas de prototypage)", "Bibliotheque de composants limitee", "Pas de handoff dev", "Free tier limite"],
        score: 7.8,
        ideal: ["PO métier", "Discovery", "Documentation visuelle"],
        intégrations: ["Notion", "GitHub", "Slack"],
        alternatives: ["Balsamiq", "FigJam", "Miro"],
        url: "https://whimsical.com"
      },
      {
        name: "Axure RP",
        logo: "&#128736;",
        tagline: "Prototypage haute fidélité avance",
        pricing: "paid",
        description: "Outil de prototypage avance avec logique conditionnelle, variables et interactions complexes. Pour les prototypes qui doivent simuler l'application reelle.",
        pros: ["Prototypage très avance (logique, variables)", "Documentation fonctionnelle intégrée", "Specifications détaillées auto-générées", "Standard dans les grandes entreprises"],
        cons: ["Courbe d'apprentissage abrupte", "Cher", "UX datee", "Moins adapte au design visuel"],
        score: 6.5,
        ideal: ["PO technique", "Specs détaillées", "Enterprise"],
        intégrations: ["Jira", "Slack", "Teams"],
        alternatives: ["Figma", "Framer", "ProtoPie"],
        url: "https://www.axure.com"
      },
      {
        name: "Framer",
        logo: "&#9889;",
        tagline: "Design to code, prototypes réalistes",
        pricing: "freemium",
        description: "Outil de design qui génère du vrai code. Prototypes haute fidélité avec animations avancees. Aussi utilisé comme site builder.",
        pros: ["Prototypes très réalistes", "Genere du vrai code React", "Animations avancees", "Peut servir de site builder"],
        cons: ["Courbe d'apprentissage technique", "Plus oriente dev/designer avance", "Prix élevé en tier pro", "Pas un outil de design system complet"],
        score: 7.5,
        ideal: ["PO technique", "Équipes avancees"],
        intégrations: ["GitHub", "Figma", "Slack"],
        alternatives: ["Figma", "Webflow"],
        url: "https://www.framer.com"
      },
      {
        name: "Penpot",
        logo: "&#9997;",
        tagline: "Alternative open source a Figma",
        pricing: "free",
        description: "Outil de design open source et gratuit. Alternative credible a Figma pour les équipes avec contraintes budgétaires ou de souveraineté des données. Self-hostable.",
        pros: ["100% gratuit et open source", "Self-hostable (souveraineté)", "SVG natif", "Collaboratif temps reel"],
        cons: ["Moins mature que Figma", "Écosystem de plugins naissant", "Performances a améliorer", "Communaute plus petite"],
        score: 7.0,
        ideal: ["Équipes contraintes budget", "Souveraineté données"],
        intégrations: ["En développément"],
        alternatives: ["Figma", "Sketch"],
        url: "https://penpot.app"
      }
    ]
  },
  "user-research": {
    title: "User Research & Testing",
    icon: "&#128269;",
    color: "var(--cat-research)",
    description: "Outils pour comprendre les utilisateurs : tests, analytics comportementaux, sondages et interviews.",
    tools: [
      {
        name: "Maze",
        logo: "&#128270;",
        tagline: "Tests utilisateurs sur prototypes",
        pricing: "freemium",
        description: "Plateforme de test utilisateur à distance sur prototypes Figma/InVision. Heatmaps, taux de complétion, tests d'arbre. Résultats rapides et quantitatifs.",
        pros: ["Intégration directe Figma", "Résultats quantitatifs rapides", "Tests non-modérés scalables", "Heatmaps et taux de réussite"],
        cons: ["Tests qualitatifs limites", "Recrutement panel payant", "Free tier restrictif", "Peut manquer de profondeur"],
        score: 8.0,
        ideal: ["PO métier", "PO technique", "Discovery"],
        intégrations: ["Figma", "InVision", "Slack", "Jira", "Notion"],
        alternatives: ["UserTesting", "Lookback", "Optimal Workshop"],
        url: "https://maze.co"
      },
      {
        name: "Hotjar",
        logo: "&#128293;",
        tagline: "Heatmaps et enregistrements de sessions",
        pricing: "freemium",
        description: "Outil d'analytics comportemental : heatmaps, session recordings, sondages in-app, funnels. Indispensable pour comprendre le comportement reel des utilisateurs.",
        pros: ["Heatmaps visuelles parlantes", "Enregistrements de sessions", "Sondages et feedback in-app", "Installation simple (1 script)"],
        cons: ["Pas de segmentation avancee gratuite", "Limite en volume sur le plan gratuit", "Peut impacter les performances", "RGPD à configurer soigneusement"],
        score: 8.2,
        ideal: ["PO métier", "PO technique", "Tous"],
        intégrations: ["Slack", "HubSpot", "Google Analytics", "Segment"],
        alternatives: ["Microsoft Clarity", "FullStory", "PostHog"],
        url: "https://www.hotjar.com"
      },
      {
        name: "UserTesting",
        logo: "&#128101;",
        tagline: "Tests utilisateurs modérés et non-modérés",
        pricing: "paid",
        description: "Plateforme de référence pour les tests utilisateurs avec panel recrute. Videos, analyses, highlights reels. Puissant mais cher.",
        pros: ["Panel de testeurs large et divers", "Videos haute qualité", "Highlight reels pour stakeholders", "Tests modérés et non-modérés"],
        cons: ["Très cher", "Overkill pour les petites équipes", "Résultats parfois superficiels", "Setup initial complexe"],
        score: 7.5,
        ideal: ["PO métier", "Enterprise", "UX Researchers"],
        intégrations: ["Slack", "Jira", "Trello", "Figma"],
        alternatives: ["Maze", "Lookback", "Lyssna"],
        url: "https://www.usertesting.com"
      },
      {
        name: "Dovetail",
        logo: "&#128218;",
        tagline: "Repository de recherche utilisateur",
        pricing: "freemium",
        description: "Plateforme pour centralisér, analyser et partager les insights de recherche utilisateur. Tags, themes, highlights. La memoire de votre research.",
        pros: ["Centralise tous les insights research", "Analyse thematique puissante", "Partage facilité des insights", "Transcription automatique"],
        cons: ["Nécessite discipline d'utilisation", "Valeur proportionnelle au volume de research", "Cher en tier pro", "Courbe d'apprentissage pour l'analyse"],
        score: 7.8,
        ideal: ["PO métier", "Research-driven orgs"],
        intégrations: ["Slack", "Jira", "Notion", "Confluence"],
        alternatives: ["Condens", "EnjoyHQ"],
        url: "https://dovetail.com"
      },
      {
        name: "Optimal Workshop",
        logo: "&#127942;",
        tagline: "Tests d'architecture de l'information",
        pricing: "freemium",
        description: "Suite d'outils spécialisés en architecture de l'information : tri de cartes, test d'arbre, first-click testing. Niche mais indispensable pour l'IA.",
        pros: ["Specialiste IA inconteste", "Tri de cartes + test d'arbre", "Résultats statistiques solides", "First-click testing"],
        cons: ["Niche (IA uniquement)", "UX un peu datee", "Panel limite hors US/UK", "Rapports pas toujours clairs"],
        score: 7.2,
        ideal: ["PO métier", "Refonte navigation", "IA"],
        intégrations: ["Slack"],
        alternatives: ["Maze", "Treejack"],
        url: "https://www.optimalworkshop.com"
      },
      {
        name: "Typeform",
        logo: "&#128203;",
        tagline: "Sondages et formulaires engageants",
        pricing: "freemium",
        description: "Outil de sondages au design soigne. Une question à la fois = meilleur taux de complétion. Ideal pour le feedback utilisateur et les enquetes de satisfaction.",
        pros: ["UX exceptionnelle (1 question à la fois)", "Taux de complétion élevés", "Logique conditionnelle", "Beau design natif"],
        cons: ["Cher pour les gros volumes", "Analyse limitee vs outils dédiés", "Pas spécialisé recherche utilisateur", "Export données basique en free"],
        score: 7.5,
        ideal: ["PO métier", "Feedback utilisateur", "NPS"],
        intégrations: ["Slack", "Google Sheets", "HubSpot", "Zapier", "Notion"],
        alternatives: ["Google Forms", "Tally", "SurveyMonkey"],
        url: "https://www.typeform.com"
      },
      {
        name: "Microsoft Clarity",
        logo: "&#128065;",
        tagline: "Alternative gratuite a Hotjar",
        pricing: "free",
        description: "Outil gratuit de Microsoft pour les heatmaps et session recordings. Zéro limite de trafic. Alternative serieuse a Hotjar pour les équipes avec budget limite.",
        pros: ["100% gratuit sans limite", "Heatmaps et session recordings", "Dead click et rage click detection", "Intégration Google Analytics"],
        cons: ["Moins de features que Hotjar", "Pas de sondages in-app", "Analytics moins avancees", "Dashboard moins intuitif"],
        score: 7.8,
        ideal: ["PO technique", "Tous budgets"],
        intégrations: ["Google Analytics", "Shopify"],
        alternatives: ["Hotjar", "PostHog", "FullStory"],
        url: "https://clarity.microsoft.com"
      }
    ]
  },
  "analytics": {
    title: "Analytics & Data",
    icon: "&#128200;",
    color: "var(--cat-analytics)",
    description: "Outils d'analytics produit pour mesurer l'usage, les funnels, la retention et prendre des decisions data-driven.",
    tools: [
      {
        name: "Mixpanel",
        logo: "&#128202;",
        tagline: "Product analytics event-based",
        pricing: "freemium",
        description: "Plateforme d'analytics produit basee sur les événements. Funnels, cohortes, retention, A/B testing. Le PO l'utilisé pour mesurer l'adoption et l'engagement features.",
        pros: ["Funnels et cohortes puissants", "Analyse retention détaillée", "Free tier généreux (20M events)", "Queries en self-service"],
        cons: ["Setup technique requis (tracking plan)", "Courbe d'apprentissage", "Cher au-dela du free tier", "Nécessite discipline du tracking"],
        score: 8.5,
        ideal: ["PO technique", "Product-led growth"],
        intégrations: ["Segment", "mParticle", "Slack", "Jira", "BigQuery"],
        alternatives: ["Amplitude", "PostHog", "Heap"],
        url: "https://mixpanel.com"
      },
      {
        name: "Amplitude",
        logo: "&#128201;",
        tagline: "Digital analytics platform",
        pricing: "freemium",
        description: "Concurrent direct de Mixpanel. Analytics produit avancees avec behavioral cohortes, path analysis et impact analysis. Très utilisé dans les scale-ups.",
        pros: ["Path analysis et journey mapping", "Behavioral cohortes avancees", "Impact analysis (causalite)", "Collaboration (notebooks)"],
        cons: ["Complexe a maitriser", "Setup initial consequent", "Prix élevé en scale", "Interface dense"],
        score: 8.3,
        ideal: ["PO technique", "Scale-up", "Enterprise"],
        intégrations: ["Segment", "Snowflake", "Slack", "Jira", "LaunchDarkly"],
        alternatives: ["Mixpanel", "PostHog", "Heap"],
        url: "https://amplitude.com"
      },
      {
        name: "PostHog",
        logo: "&#129748;",
        tagline: "Suite analytics open source tout-en-un",
        pricing: "freemium",
        description: "Plateforme open source combinant product analytics, session recordings, feature flags, A/B tests et surveys. Self-hostable. Alternative tout-en-un a Mixpanel+Hotjar+LaunchDarkly.",
        pros: ["Open source et self-hostable", "Analytics + recordings + feature flags + A/B", "Free tier très généreux", "Remplacement de plusieurs outils"],
        cons: ["Moins mature que les spécialistes", "Self-hosting = maintenance", "UX perfectible par endroits", "Documentation en evolution"],
        score: 8.5,
        ideal: ["PO technique", "Startup", "Souveraineté"],
        intégrations: ["Slack", "GitHub", "Sentry", "Segment", "BigQuery"],
        alternatives: ["Mixpanel", "Amplitude", "Hotjar"],
        url: "https://posthog.com"
      },
      {
        name: "Google Analytics 4",
        logo: "&#128202;",
        tagline: "Web analytics universel",
        pricing: "free",
        description: "Le standard des web analytics. GA4 est event-based avec de l'analytics prédictive. Incontournable mais limites pour le product analytics pur.",
        pros: ["Gratuit et universel", "Intégration écosystème Google", "Audiences prédictives (ML)", "BigQuery export natif"],
        cons: ["Complexe (GA4 vs UA)", "Pas optimisé pour le product analytics", "Interface controversee", "Echantillonnage sur gros volumes"],
        score: 7.0,
        ideal: ["PO métier", "Web", "Marketing"],
        intégrations: ["Google Ads", "BigQuery", "Looker Studio", "Tag Manager"],
        alternatives: ["Matomo", "Plausible", "PostHog"],
        url: "https://analytics.google.com"
      },
      {
        name: "Heap",
        logo: "&#128200;",
        tagline: "Auto-capture analytics",
        pricing: "freemium",
        description: "Analytics produit avec auto-capture : enregistre tous les événements automatiquement, analysez rétrospectivement. Pas besoin de tracker plan préalable.",
        pros: ["Auto-capture (pas de tracking plan préalable)", "Analyse rétrospective", "Session replay integre", "Data science features"],
        cons: ["Volume de données important = cout", "Auto-capture ≠ données propres", "Performance impact possible", "Moins de contrôle sur le naming"],
        score: 7.5,
        ideal: ["PO métier", "Équipes sans data engineer"],
        intégrations: ["Segment", "Salesforce", "Slack", "HubSpot"],
        alternatives: ["Mixpanel", "Amplitude", "PostHog"],
        url: "https://www.heap.io"
      },
      {
        name: "Pendo",
        logo: "&#127891;",
        tagline: "Analytics + In-app guides + Feedback",
        pricing: "freemium",
        description: "Combine analytics produit, guides in-app (onboarding, tooltips) et collecte de feedback. Très utile pour le PO qui veut piloter l'adoption des features.",
        pros: ["Analytics + guides + feedback en un outil", "Pas de code pour les guides in-app", "NPS et feedback intégrés", "Segments et targeting avances"],
        cons: ["Cher", "Setup initial consequent", "Analytics moins avancees que Mixpanel", "Peut surcharger l'UI avec trop de guides"],
        score: 7.8,
        ideal: ["PO métier", "SaaS B2B", "Onboarding"],
        intégrations: ["Salesforce", "Jira", "Slack", "HubSpot", "Segment"],
        alternatives: ["Mixpanel + Appcues", "PostHog", "WalkMe"],
        url: "https://www.pendo.io"
      },
      {
        name: "Matomo",
        logo: "&#128202;",
        tagline: "Alternative RGPD-friendly a Google Analytics",
        pricing: "freemium",
        description: "Analytics web open source et RGPD-compliant. Self-hostable pour la souveraineté des données. Alternative serieuse a GA4 pour les organisations soucieuses de la vie privee.",
        pros: ["RGPD-friendly (pas de cookies)", "Open source et self-hostable", "100% ownership des données", "Import données GA possible"],
        cons: ["Moins de features que GA4", "Self-hosting = maintenance", "Communaute plus petite", "Tag Manager moins avance"],
        score: 7.2,
        ideal: ["PO métier", "RGPD", "Souveraineté"],
        intégrations: ["WordPress", "Tag Manager", "Segment"],
        alternatives: ["Google Analytics 4", "Plausible", "PostHog"],
        url: "https://matomo.org"
      }
    ]
  },
  "collaboration": {
    title: "Collaboration & Workshops",
    icon: "&#129309;",
    color: "var(--cat-collab)",
    description: "Outils pour animer des ateliers, brainstormer, faire du story mapping et collaborer visuellement avec l'équipe.",
    tools: [
      {
        name: "Miro",
        logo: "&#128204;",
        tagline: "Tableau blanc collaboratif #1",
        pricing: "freemium",
        description: "Le leader des tableaux blancs collaboratifs. Templates massifs, ateliers en temps reel, story mapping, rétrospectives. L'outil de facilitation par excellence du PO.",
        pros: ["Templates enorme bibliotheque", "Collaboration temps reel fluide", "Ideal pour workshops (story mapping, rétros)", "Intégrations riches"],
        cons: ["Peut devenir lent sur gros boards", "Prix par user élevé", "Free tier limite (3 boards)", "Courbe d'apprentissage pour bien faciliter"],
        score: 8.8,
        ideal: ["PO métier", "PO technique", "Tous"],
        intégrations: ["Jira", "Asana", "Slack", "Teams", "Confluence", "Figma"],
        alternatives: ["Mural", "FigJam", "Lucidspark"],
        url: "https://miro.com"
      },
      {
        name: "Mural",
        logo: "&#127912;",
        tagline: "Collaboration visuelle pour entreprises",
        pricing: "paid",
        description: "Concurrent de Miro, souvent préféré dans les grandes entreprises. Facilitation assistee, timer integre, vote. Forte orientation enterprise et sécurité.",
        pros: ["Facilitation assistee (timer, vote, ice-breaker)", "Securite enterprise", "Templates design thinking", "Private mode pour brainstorming"],
        cons: ["Moins fluide que Miro", "Prix élevé", "Moins de templates communautaires", "Performance variable"],
        score: 7.5,
        ideal: ["PO métier", "Enterprise", "Consulting"],
        intégrations: ["Teams", "Jira", "Slack", "Confluence"],
        alternatives: ["Miro", "FigJam", "Lucidspark"],
        url: "https://www.mural.co"
      },
      {
        name: "FigJam",
        logo: "&#128161;",
        tagline: "Tableau blanc par Figma",
        pricing: "freemium",
        description: "Outil de whiteboard intégré a Figma. Simple, colore, fun. Parfait pour les équipes qui utilisent déjà Figma. Moins riche que Miro mais plus accessible.",
        pros: ["Gratuit et intégré a Figma", "Ultra simple et fun", "Widgets et plugins", "Collaboration native Figma"],
        cons: ["Moins de templates que Miro", "Moins adapte aux gros ateliers", "Pas de facilitation avancee", "Dependance à l'écosystème Figma"],
        score: 7.8,
        ideal: ["PO métier", "PO technique", "Équipes Figma"],
        intégrations: ["Figma", "Jira", "Asana", "Slack"],
        alternatives: ["Miro", "Mural"],
        url: "https://www.figma.com/figjam"
      },
      {
        name: "Lucidspark",
        logo: "&#9889;",
        tagline: "Brainstorming visuel (suite Lucid)",
        pricing: "freemium",
        description: "Outil de brainstorming et ideation de la suite Lucid (Lucidchart). Bon pour le brainstorming structure, le vote et la catégorisation d'idees.",
        pros: ["Bien intégré a Lucidchart", "Vote et catégorisation intégrés", "Breakout boards", "Templates de brainstorming"],
        cons: ["Moins populaire que Miro", "Free tier très limite", "UX moins intuitive", "Écosystem plus petit"],
        score: 6.8,
        ideal: ["Équipes Lucidchart existantes"],
        intégrations: ["Lucidchart", "Slack", "Teams", "Google Workspace"],
        alternatives: ["Miro", "Mural", "FigJam"],
        url: "https://lucidspark.com"
      },
      {
        name: "Klaxoon",
        logo: "&#127881;",
        tagline: "Facilitation d'ateliers français",
        pricing: "paid",
        description: "Solution française de facilitation d'ateliers. Board, quiz, sondages, brainstorm. Populaire dans les entreprises françaises, bon pour l'engagement.",
        pros: ["Solution française (RGPD)", "Activites variees (quiz, sondage, board)", "Bon pour l'engagement", "Support en français"],
        cons: ["Cher", "Moins utilisé à l'international", "UX perfectible", "Moins d'intégrations"],
        score: 6.5,
        ideal: ["PO métier", "Entreprises françaises"],
        intégrations: ["Teams", "Slack"],
        alternatives: ["Miro", "Mural"],
        url: "https://klaxoon.com"
      },
      {
        name: "Excalidraw",
        logo: "&#9999;",
        tagline: "Dessin collaboratif style main levee",
        pricing: "free",
        description: "Outil de dessin collaboratif open source avec un style sketch a main levee. Leger, rapide, sans inscription. Parfait pour un schema rapide en reunion.",
        pros: ["Gratuit et open source", "Zéro inscription requise", "Style hand-drawn unique", "Ultra rapide et leger"],
        cons: ["Pas de templates structures", "Pas de facilitation (timer, vote)", "Basique pour les gros ateliers", "Pas de gestion de projet"],
        score: 7.5,
        ideal: ["PO technique", "Schemas rapides"],
        intégrations: ["Notion", "VS Code (extension)"],
        alternatives: ["Miro", "FigJam", "tldraw"],
        url: "https://excalidraw.com"
      }
    ]
  },
  "documentation": {
    title: "Documentation & Knowledge Base",
    icon: "&#128218;",
    color: "var(--cat-docs)",
    description: "Outils pour documenter les specs, PRDs, decisions produit et maintenir la knowledge base de l'équipe.",
    tools: [
      {
        name: "Notion",
        logo: "&#128221;",
        tagline: "Workspace tout-en-un",
        pricing: "freemium",
        description: "Outil de documentation et workspace tout-en-un. Pages, bases de données, wikis. Très populaire chez les POs pour les PRDs, specs et knowledge base.",
        pros: ["Extremement flexible (docs + DB + wiki)", "Templates communautaires riches", "Bases de données relationnelles", "IA intégrée (Notion AI)"],
        cons: ["Performance variable sur gros espaces", "Pas conçu pour l'agile pur", "Offline limite", "Permissions granulaires payantes"],
        score: 8.5,
        ideal: ["PO métier", "PO technique", "Tous"],
        intégrations: ["Slack", "Jira", "GitHub", "Figma", "Google Drive"],
        alternatives: ["Confluence", "Coda", "Slite"],
        url: "https://www.notion.so"
      },
      {
        name: "Confluence",
        logo: "&#128214;",
        tagline: "Atlassian — Wiki d'entreprise",
        pricing: "freemium",
        description: "Wiki d'entreprise d'Atlassian. Intégration native Jira. Standard dans les grandes organisations. Whiteboards récemment ajoutes.",
        pros: ["Intégration native Jira", "Templates de specs/PRD", "Permissions granulaires", "Whiteboards intégrés (recent)"],
        cons: ["UX vieillissante (améliorée récemment)", "Recherche perfectible", "Peut devenir un cimétiere de pages", "Prix par user"],
        score: 7.2,
        ideal: ["PO technique", "Équipes Atlassian", "Enterprise"],
        intégrations: ["Jira", "Trello", "Slack", "Teams", "Figma"],
        alternatives: ["Notion", "GitBook", "Slite"],
        url: "https://www.atlassian.com/software/confluence"
      },
      {
        name: "Coda",
        logo: "&#128203;",
        tagline: "Document qui fonctionne comme une app",
        pricing: "freemium",
        description: "Documents interactifs avec formules, automatisations et intégrations. A mi-chemin entre un doc et un spreadsheet. Puissant pour les POs analytiques.",
        pros: ["Docs interactifs avec logique", "Formules et automatisations", "Packs d'intégrations", "Très flexible"],
        cons: ["Courbe d'apprentissage", "Performance sur gros docs", "Moins connu", "Communaute plus petite que Notion"],
        score: 7.5,
        ideal: ["PO technique", "Équipes analytiques"],
        intégrations: ["Slack", "Jira", "GitHub", "Google Calendar", "Figma"],
        alternatives: ["Notion", "Confluence"],
        url: "https://coda.io"
      },
      {
        name: "GitBook",
        logo: "&#128218;",
        tagline: "Documentation technique moderne",
        pricing: "freemium",
        description: "Plateforme de documentation technique avec versioning Git. Ideal pour la doc technique, les API docs et les knowledge bases developer-facing.",
        pros: ["Sync Git bidirectionnel", "Design moderne et propre", "Ideal pour la doc technique", "Recherche rapide et pertinente"],
        cons: ["Moins adapte aux specs fonctionnelles", "Free tier limite", "Moins flexible que Notion pour le contenu non-tech", "Pas de base de données"],
        score: 7.0,
        ideal: ["PO technique", "Documentation API"],
        intégrations: ["GitHub", "GitLab", "Slack", "Figma"],
        alternatives: ["Notion", "Confluence", "Docusaurus"],
        url: "https://www.gitbook.com"
      },
      {
        name: "Slite",
        logo: "&#128466;",
        tagline: "Knowledge base simple et propre",
        pricing: "freemium",
        description: "Knowledge base minimaliste et propre. IA intégrée pour retrouver l'information. Ideal pour les équipes qui veulent du simple sans la complexité de Notion/Confluence.",
        pros: ["Interface très propre et simple", "IA pour retrouver l'information", "Onboarding rapide", "Templates bien faits"],
        cons: ["Moins flexible que Notion", "Pas de bases de données", "Free tier limite", "Moins d'intégrations"],
        score: 7.0,
        ideal: ["PO métier", "Petites équipes"],
        intégrations: ["Slack", "Google Workspace", "Asana"],
        alternatives: ["Notion", "Confluence", "Tettra"],
        url: "https://slite.com"
      }
    ]
  },
  "devops-technical": {
    title: "DevOps & Technique",
    icon: "&#9881;",
    color: "var(--cat-devops)",
    description: "Outils techniques que le PO (surtout technique) doit connaitre pour collaborer avec l'équipe de développément et comprendre la delivery.",
    tools: [
      {
        name: "GitHub",
        logo: "&#128025;",
        tagline: "Plateforme de développément #1",
        pricing: "freemium",
        description: "Plateforme de dev collaborative : repos Git, PRs, Actions (CI/CD), Projects. Le PO technique y suit les PRs, les releases et les issues.",
        pros: ["Standard de facto du code open source", "Actions CI/CD intégrées", "Copilot IA pour les devs", "Projects pour le suivi"],
        cons: ["Pas un outil de PM complet", "Courbe d'apprentissage pour les non-devs", "Cher pour les orgs privees", "Actions pricing peut surprendre"],
        score: 8.5,
        ideal: ["PO technique"],
        intégrations: ["Jira", "Slack", "Linear", "Figma", "Sentry"],
        alternatives: ["GitLab", "Bitbucket", "Azure Repos"],
        url: "https://github.com"
      },
      {
        name: "GitLab",
        logo: "&#129418;",
        tagline: "DevSecOps platform all-in-one",
        pricing: "freemium",
        description: "Plateforme DevSecOps complète : repos, CI/CD, security scanning, registry. Alternative self-hostable a GitHub. Tout integre, de la planification au monitoring.",
        pros: ["Tout-en-un (code → CI/CD → security → monitoring)", "Self-hostable (souveraineté)", "CI/CD très puissant", "Security scanning integre"],
        cons: ["UX moins polie que GitHub", "Complexe a administrer (self-hosted)", "Performance variable", "Communaute plus petite"],
        score: 7.8,
        ideal: ["PO technique", "Enterprise", "Souveraineté"],
        intégrations: ["Slack", "Jira", "Kubernetes", "Terraform"],
        alternatives: ["GitHub", "Bitbucket"],
        url: "https://gitlab.com"
      },
      {
        name: "Datadog",
        logo: "&#128021;",
        tagline: "Monitoring et observabilite",
        pricing: "paid",
        description: "Plateforme d'observabilite : APM, logs, infra monitoring, RUM. Le PO technique l'utilisé pour suivre la performance produit et les SLOs.",
        pros: ["Monitoring complet (APM, logs, infra, RUM)", "Dashboards personnalisables", "Alerting avance", "APM traces end-to-end"],
        cons: ["Très cher à grande échelle", "Pricing complexe (par host, par GB...)", "Vendor lock-in", "Overkill pour les petites équipes"],
        score: 8.0,
        ideal: ["PO technique", "SRE-aware"],
        intégrations: ["Slack", "Jira", "PagerDuty", "AWS", "GCP", "Azure"],
        alternatives: ["New Relic", "Grafana Stack", "Dynatrace"],
        url: "https://www.datadoghq.com"
      },
      {
        name: "Sentry",
        logo: "&#128027;",
        tagline: "Error tracking et performance monitoring",
        pricing: "freemium",
        description: "Tracking d'erreurs et monitoring de performance. Le PO technique l'utilisé pour prioriser les bugs par impact reel et suivre la qualité des releases.",
        pros: ["Error tracking en temps reel", "Impact par nombre d'utilisateurs touches", "Session replay", "Release tracking"],
        cons: ["Volume d'erreurs peut exploser", "Configuration initiale technique", "Prix monte avec le volume", "Peut noyer sous les alertes"],
        score: 8.2,
        ideal: ["PO technique"],
        intégrations: ["Jira", "GitHub", "Slack", "Linear", "PagerDuty"],
        alternatives: ["Bugsnag", "Rollbar", "Datadog"],
        url: "https://sentry.io"
      },
      {
        name: "LaunchDarkly",
        logo: "&#127988;",
        tagline: "Feature flags et progressive delivery",
        pricing: "paid",
        description: "Plateforme de feature management. Permet au PO de contrôler le rollout des features sans déploiement. Kill switch, A/B testing, targeting.",
        pros: ["Feature flags sans code", "Targeting avance (segments, %)", "Kill switch instantane", "Audit trail complet"],
        cons: ["Cher", "Nécessite buy-in de l'équipe dev", "Complexite de gestion des flags", "Risque de dette technique (flags oublies)"],
        score: 8.0,
        ideal: ["PO technique", "Continuous delivery"],
        intégrations: ["Jira", "Slack", "Datadog", "Amplitude", "GitHub"],
        alternatives: ["Split.io", "Unleash", "PostHog (flags)"],
        url: "https://launchdarkly.com"
      }
    ]
  },
  "api-testing": {
    title: "API Testing & Documentation",
    icon: "&#128268;",
    color: "var(--cat-devops)",
    description: "Outils pour tester, documenter et monitorer les APIs. Essentiels pour le PO technique qui valide les intégrations et les contrats d'API.",
    tools: [
      {
        name: "Postman",
        logo: "&#128230;",
        tagline: "La référence du test d'API",
        pricing: "freemium",
        description: "Plateforme complète pour concevoir, tester, documenter et monitorer les APIs. Workspaces collaboratifs, collections partagées, environnements, tests automatisés. Le standard de l'industrie.",
        pros: ["Interface intuitive et complète", "Collections et environnements partageables", "Tests automatisés et CI/CD (Newman)", "Documentation API auto-générée", "Mock servers intégrés"],
        cons: ["Lourd (app Electron)", "Fonctionnalités avancées payantes", "Synchronisation cloud obligatoire (controversé)", "Consommation mémoire élevée"],
        score: 8.5,
        ideal: ["PO technique", "Équipes API-first"],
        intégrations: ["GitHub", "GitLab", "Jenkins", "Slack", "Jira", "Azure DevOps"],
        alternatives: ["Bruno", "Insomnia", "Hoppscotch"],
        url: "https://www.postman.com"
      },
      {
        name: "Bruno",
        logo: "&#128059;",
        tagline: "Client API open source, Git-friendly",
        pricing: "free",
        description: "Client API open source qui stocke les collections dans des fichiers sur le filesystem (Git-friendly). Pas de cloud, pas de compte. Alternative moderne et respectueuse de la vie privée à Postman.",
        pros: ["100% open source et gratuit", "Fichiers sur disque (versionnable avec Git)", "Pas de cloud ni de compte requis", "Léger et rapide", "Scripting en JavaScript"],
        cons: ["Moins de fonctionnalités que Postman", "Communauté plus petite", "Pas de mock server intégré", "Documentation API limitée"],
        score: 8.2,
        ideal: ["PO technique", "Équipes Git-centric", "Souveraineté"],
        intégrations: ["Git (natif)", "CI/CD via CLI"],
        alternatives: ["Postman", "Insomnia", "Hoppscotch"],
        url: "https://www.usebruno.com"
      },
      {
        name: "Insomnia",
        logo: "&#128302;",
        tagline: "Client API élégant par Kong",
        pricing: "freemium",
        description: "Client HTTP et GraphQL avec une UX soignée. Racheté par Kong. Support natif de gRPC, GraphQL et REST. Design system pour APIs.",
        pros: ["UX élégante et épurée", "Support GraphQL et gRPC natif", "Plugins extensibles", "Git sync (récent)"],
        cons: ["Racheté par Kong (changements controversés)", "Sync cloud imposé dans les versions récentes", "Communauté en baisse vs Bruno", "Moins de tests automatisés que Postman"],
        score: 7.0,
        ideal: ["PO technique", "Équipes GraphQL"],
        intégrations: ["Git", "Kong Gateway"],
        alternatives: ["Postman", "Bruno", "Hoppscotch"],
        url: "https://insomnia.rest"
      },
      {
        name: "Hoppscotch",
        logo: "&#9889;",
        tagline: "Client API web open source",
        pricing: "free",
        description: "Client API 100% web, open source et léger. Fonctionne dans le navigateur sans installation. REST, GraphQL, WebSocket, SSE, MQTT. Alternative ultra-légère.",
        pros: ["Fonctionne dans le navigateur (zéro install)", "Open source et auto-hébergeable", "Supporte REST, GraphQL, WebSocket, SSE", "Ultra rapide et léger", "PWA installable"],
        cons: ["Moins de fonctionnalités d'automatisation", "Pas de collections aussi avancées que Postman", "Tests automatisés limités", "Environnements basiques"],
        score: 7.8,
        ideal: ["PO technique", "Tests rapides", "Souveraineté"],
        intégrations: ["Self-hosted"],
        alternatives: ["Postman", "Bruno", "Insomnia"],
        url: "https://hoppscotch.io"
      },
      {
        name: "Swagger / OpenAPI",
        logo: "&#128203;",
        tagline: "Spécification et documentation d'API",
        pricing: "free",
        description: "Standard de description d'API REST (OpenAPI Specification). Swagger UI génère une documentation interactive testable. SwaggerHub pour la collaboration.",
        pros: ["Standard de l'industrie (OpenAPI)", "Documentation interactive auto-générée", "Code generation (client et serveur)", "Swagger UI gratuit et embeddable"],
        cons: ["Swagger UI basique pour les tests complexes", "SwaggerHub payant pour la collaboration", "Courbe d'apprentissage YAML/JSON spec", "Limité au REST (pas GraphQL)"],
        score: 8.0,
        ideal: ["PO technique", "API-first design"],
        intégrations: ["GitHub", "GitLab", "Jenkins", "Postman", "n'importe quel framework"],
        alternatives: ["Redocly", "Stoplight"],
        url: "https://swagger.io"
      },
      {
        name: "Stoplight",
        logo: "&#128308;",
        tagline: "Design-first API platform",
        pricing: "freemium",
        description: "Plateforme de design d'API avec éditeur visuel OpenAPI, documentation hébergée, mock servers et style guides. Approche design-first collaborative.",
        pros: ["Éditeur visuel OpenAPI (pas besoin de YAML)", "Documentation hébergée magnifique", "Mock servers automatiques", "Style guides pour la gouvernance API"],
        cons: ["Fonctionnalités avancées payantes", "Moins connu que Swagger", "Lock-in plateforme", "Gratuit limité"],
        score: 7.5,
        ideal: ["PO technique", "API-first", "Gouvernance API"],
        intégrations: ["GitHub", "GitLab", "Bitbucket", "CI/CD"],
        alternatives: ["Swagger/OpenAPI", "Redocly"],
        url: "https://stoplight.io"
      },
      {
        name: "HTTPie",
        logo: "&#127760;",
        tagline: "Client HTTP en ligne de commande moderne",
        pricing: "freemium",
        description: "Client HTTP CLI user-friendly avec coloration syntaxique. HTTPie Desktop ajoute une GUI. Alternative moderne à curl pour tester rapidement des endpoints.",
        pros: ["Syntaxe intuitive (vs curl)", "Coloration syntaxique JSON automatique", "Desktop app avec GUI", "Sessions persistantes"],
        cons: ["Moins de fonctionnalités que Postman", "CLI = courbe d'apprentissage", "Desktop app récente et basique", "Pas de collections avancées"],
        score: 7.0,
        ideal: ["PO technique", "CLI-friendly"],
        intégrations: ["Terminal", "CI/CD"],
        alternatives: ["curl", "Postman", "Bruno"],
        url: "https://httpie.io"
      }
    ]
  },
  "testing": {
    title: "Tests & Qualité",
    icon: "&#9989;",
    color: "var(--cat-testing)",
    description: "Outils de gestion des tests et de la qualité dans lesquels le PO intervient pour la validation fonctionnelle et les critères d'acceptance.",
    tools: [
      {
        name: "TestRail",
        logo: "&#9989;",
        tagline: "Gestion de cas de test",
        pricing: "paid",
        description: "Plateforme de test management : cas de test, plans de test, suivi d'execution. Le PO l'utilisé pour valider que les critères d'acceptance sont couverts par les tests.",
        pros: ["Gestion de test complete", "Rapports d'execution détaillés", "Traçabilité requirements → tests", "API pour automatisation"],
        cons: ["UX datee", "Cher par user", "Setup initial consequent", "Peut devenir un bottleneck bureaucratique"],
        score: 7.0,
        ideal: ["PO technique", "Enterprise", "Regulated"],
        intégrations: ["Jira", "Azure DevOps", "GitHub", "Jenkins"],
        alternatives: ["Zephyr", "qase.io", "Xray"],
        url: "https://www.testrail.com"
      },
      {
        name: "Zephyr (SmartBear)",
        logo: "&#128203;",
        tagline: "Test management pour Jira",
        pricing: "paid",
        description: "Plugin de test management pour Jira (Scale) ou standalone (Squad). Intégration native profonde avec Jira. Standard dans les équipes Jira.",
        pros: ["Intégration native Jira", "Traçabilité stories → tests", "Cyclés de test structures", "Rapports dans Jira"],
        cons: ["Dependance a Jira", "UX perfectible", "Cher (plugin payant)", "Complexe à grande échelle"],
        score: 7.2,
        ideal: ["PO technique", "Équipes Jira"],
        intégrations: ["Jira", "Confluence", "Jenkins", "Bamboo"],
        alternatives: ["TestRail", "Xray", "qase.io"],
        url: "https://smartbear.com/test-management/zephyr"
      },
      {
        name: "BrowserStack",
        logo: "&#127760;",
        tagline: "Test cross-browser et cross-device",
        pricing: "paid",
        description: "Plateforme de test sur vrais navigateurs et devices. Le PO l'utilisé pour valider le rendu sur différents devices et vérifier la compatibilité.",
        pros: ["Vrais devices et navigateurs", "Screenshots automatiques", "Intégration CI/CD", "Test accessibility"],
        cons: ["Cher", "Latence sur devices reels", "Courbe d'apprentissage pour les non-devs", "Principalement utilisé par les QA/devs"],
        score: 7.0,
        ideal: ["PO technique", "Web/Mobile"],
        intégrations: ["Jenkins", "GitHub Actions", "Jira", "Selenium"],
        alternatives: ["LambdaTest", "Sauce Labs"],
        url: "https://www.browserstack.com"
      }
    ]
  }
};

// ---- Data: Methods ----
const METHODS_DATA = {
  "prioritization": {
    title: "Frameworks de Priorisation",
    icon: "&#9878;",
    description: "Méthodes pour prioriser objectivement le backlog et aligner l'équipe sur les priorités.",
    methods: [
      {
        name: "RICE Scoring",
        description: "Framework de priorisation quantitatif développé par Intercom. Score = (Reach x Impact x Confidence) / Effort.",
        steps: ["Estimer le Reach (combien d'utilisateurs touches)", "Evaluer l'Impact (1-3)", "Definir la Confidence (% de certitude)", "Estimer l'Effort (en person-months)", "Calculer le score RICE"],
        when: "Backlog avec beaucoup d'items a comparer objectivement. Ideal pour enlever le biais.",
        tips: ["Definissez des periodes fixes pour le Reach (ex: par trimestre)", "Soyez honnete sur la Confidence", "Revoyez les scores régulièrement"]
      },
      {
        name: "MoSCoW",
        description: "Classification en 4 catégories : Must have, Should have, Could have, Won't have (this time). Simple et efficace pour les MVP et les releases.",
        steps: ["Lister toutes les features/stories", "Classer chaque item en M/S/C/W", "Valider avec les stakeholders", "Must = non-négociable", "Should + Could = si le temps le permet"],
        when: "Planification de MVP, release planning, négociation de scope avec les stakeholders.",
        tips: ["Les Must ne doivent pas depasser 60% du scope", "Won't ≠ jamais, c'est 'pas cette fois'", "Impliquez les stakeholders dans la classification"]
      },
      {
        name: "WSJF (SAFe)",
        description: "Weighted Shortest Job First. Priorise par le ratio valeur/taille. WSJF = Cost of Delay / Job Duration. Utilise dans SAFe.",
        steps: ["Estimer la User Business Value", "Estimer la Time Criticality", "Estimer le Risk Reduction / Opportunity", "Calculer le Cost of Delay (somme des 3)", "Diviser par la taille du job", "Prioriser par WSJF décroissant"],
        when: "PI Planning SAFe, priorisation de features à l'echelle, arbitrage entre équipes.",
        tips: ["Utilisez le Planning Poker pour les estimations", "Normalisez les echelles (1-21 Fibonacci)", "Le consensus est plus important que la précision"]
      },
      {
        name: "Kano Model",
        description: "Classifie les features selon leur impact sur la satisfaction client : Must-be, One-dimensional, Attractive, Indifferent, Reverse.",
        steps: ["Identifier les features candidates", "Poser la question fonctionnelle et dysfonctionnelle", "Analyser les réponses pour classifier", "Prioriser : Must-be d'abord, puis Performance, puis Attractive"],
        when: "Discovery produit, comprehension des attentes utilisateurs, différenciation produit.",
        tips: ["Les Must-be n'augmentent pas la satisfaction, mais leur absence la détruit", "Les Attractive features sont vos différenciateurs", "Les classifications changent avec le temps (Attractive → Must-be)"]
      },
      {
        name: "Value vs Effort Matrix",
        description: "Matrice 2x2 simple : Valeur (haute/basse) x Effort (haut/bas). Quick wins = haute valeur + faible effort.",
        steps: ["Lister les items du backlog", "Evaluer la valeur business de chaque item", "Estimer l'effort de réalisation", "Placer dans la matrice 2x2", "Prioriser : Quick Wins → Big Bets → Fill-ins → Eviter"],
        when: "Atelier de priorisation rapide, alignement equipe, premier tri du backlog.",
        tips: ["Commencez toujours par les Quick Wins", "Les Big Bets nécessitent une validation avant engagement", "Ne négligez pas les Money Pits (haute effort, basse valeur) — supprimez-les"]
      },
      {
        name: "Story Mapping",
        description: "Technique de Jeff Patton pour organisér le backlog en parcours utilisateur. Axe horizontal = flux, axe vertical = priorité.",
        steps: ["Definir les activités utilisateur (backbone)", "Decomposer en tâches utilisateur", "Organiser les stories sous chaque tache", "Tracer les lignes de release horizontales", "Le MVP est au-dessus de la première ligne"],
        when: "Planification de release, définition de MVP, comprehension du parcours utilisateur global.",
        tips: ["Faites-le en atelier avec toute l'equipe", "Le backbone raconte une histoire", "Chaque release doit etre un produit utilisable"]
      }
    ]
  },
  "discovery": {
    title: "Discovery & Recherche Produit",
    icon: "&#128269;",
    description: "Méthodes pour explorer le probleme avant de construire la solution. Valider les hypotheses et comprendre les besoins reels.",
    methods: [
      {
        name: "Design Thinking",
        description: "Approche centree utilisateur en 5 phases pour résoudre des problemes complexes de manière creative et itérative.",
        steps: ["Empathize : comprendre les utilisateurs", "Define : formuler le probleme", "Ideate : générer des solutions", "Prototype : créer des prototypes rapides", "Test : valider avec les utilisateurs"],
        when: "Nouveaux produits, refonte d'experience, innovation.",
        tips: ["Restez dans le probleme avant de sauter aux solutions", "Testez tot et souvent", "Le prototype peut etre un post-it ou un wireframe papier"]
      },
      {
        name: "Lean Startup (Build-Measure-Learn)",
        description: "Approche itérative pour valider rapidement les hypotheses produit avec un minimum d'investissement.",
        steps: ["Formuler une hypothese", "Construire un MVP (minimum viable)", "Mesurer les résultats", "Apprendre et pivoter ou perseverer"],
        when: "Validation de nouvelles idées produit, nouveaux marches, fonctionnalités incertaines.",
        tips: ["Le MVP n'est pas un produit bâclé, c'est le minimum pour apprendre", "Definissez les métriques AVANT de construire", "Soyez prêts a pivoter"]
      },
      {
        name: "Jobs-to-be-Done (JTBD)",
        description: "Framework qui se concentre sur le 'job' que l'utilisateur essaie d'accomplir, pas sur ses caracteristiques demographiques.",
        steps: ["Identifier le job fonctionnel", "Identifier les jobs sociaux et emotionnels", "Mapper les outcomes desires", "Identifier les solutions actuelles (hiring/firing)", "Concevoir pour le job, pas pour le persona"],
        when: "Comprehension profonde des motivations, innovation produit, positionnement.",
        tips: ["'Les gens n'achetent pas une perceuse, ils achetent un trou dans le mur'", "Les jobs sont stables dans le temps, les solutions changent", "Interviewez en demandant 'racontez-moi la dernière fois que...'"]
      },
      {
        name: "Opportunity Solution Tree",
        description: "Framework de Teresa Torres pour structurer la discovery continue. Relie l'outcome desire aux opportunites et solutions testables.",
        steps: ["Definir l'outcome desire (mesurable)", "Identifier les opportunites (besoins/pain points)", "Generer des solutions pour chaque opportunite", "Definir des experiments pour valider", "Itérer en continu"],
        when: "Discovery continue, alignement équipe sur les opportunites, cadrage produit.",
        tips: ["Un outcome clair aligne toute l'equipe", "Explorez plusieurs opportunites avant de converger", "Chaque solution doit etre testable avec un experiment"]
      },
      {
        name: "Lean UX Canvas",
        description: "Canvas pour aligner l'équipe sur le probleme, les hypotheses et les métriques de succes avant de designer.",
        steps: ["Business problem statement", "Business outcomes vises", "Utilisateurs cibles", "Outcomes utilisateurs et benefices", "Hypotheses", "Solutions les plus importantes", "Méthode de validation"],
        when: "Kick-off de projet, alignement equipe, cadrage de sprint discovery.",
        tips: ["Remplissez-le en equipe, pas seul", "Les hypotheses sont le coeur du canvas", "Revisitez-le régulièrement"]
      }
    ]
  },
  "metrics": {
    title: "Métriques & KPIs Produit",
    icon: "&#128200;",
    description: "Frameworks de métriques pour mesurer le succes produit et prendre des decisions basees sur les données.",
    methods: [
      {
        name: "HEART Framework (Google)",
        description: "Framework de Google pour mesurer la qualité de l'UX a travers 5 dimensions : Happiness, Engagement, Adoption, Retention, Task success.",
        steps: ["Happiness : satisfaction, NPS, CSAT", "Engagement : fréquence, intensite d'usage", "Adoption : nouveaux utilisateurs, activation", "Retention : churn, retention cohort", "Task success : taux de complétion, erreurs, temps"],
        when: "Mise en place de KPIs produit, evaluation d'une feature, reporting exécutif.",
        tips: ["Choisissez 1-2 métriques par dimension, pas toutes", "Definissez des Goals, Signals, Metrics (GSM) pour chaque", "Adaptez les dimensions a votre contexte"]
      },
      {
        name: "AARRR (Pirate Metrics)",
        description: "Funnel de métriques startup par Dave McClure : Acquisition, Activation, Retention, Revenue, Referral.",
        steps: ["Acquisition : d'ou viennent les utilisateurs ?", "Activation : vivent-ils le 'aha moment' ?", "Retention : reviennent-ils ?", "Revenue : paient-ils ?", "Referral : en parlent-ils ?"],
        when: "Startups, produits B2C, growth product management.",
        tips: ["Concentrez-vous sur l'étape la plus faible du funnel", "Le 'aha moment' est critique pour l'activation", "La retention est la métrique reine"]
      },
      {
        name: "North Star Metric",
        description: "Une seule métrique qui capture la valeur fondamentale que votre produit delivre aux utilisateurs. Aligne toute l'entreprise.",
        steps: ["Identifier la valeur coeur du produit", "Choisir LA métrique qui la represente le mieux", "Decomposer en input metrics actionnables", "Aligner les équipes sur cette métrique", "Tracker et communiquer régulièrement"],
        when: "Alignement stratégique, focus equipe, simplification du reporting.",
        tips: ["Airbnb : nuits reservees. Spotify : temps d'ecoute. Slack : messages envoyes", "La NSM doit etre actionnable et prédictive du revenu", "Les input metrics sont ce sur quoi les équipes agissent"]
      },
      {
        name: "OKRs (Objectives & Key Results)",
        description: "Framework de goal-setting par Andy Grove (Intel), popularise par Google. Objectifs qualitatifs + résultats clés mesurables.",
        steps: ["Definir un Objectif ambitieux et inspirant", "Definir 2-5 Key Results mesurables", "Aligner les OKRs équipe sur les OKRs entreprise", "Tracker les KR régulièrement (weekly/bi-weekly)", "Scorer en fin de cycle (0.0-1.0, viser 0.7)"],
        when: "Planification trimestrielle, alignement stratégie/execution, communication des priorités.",
        tips: ["Un bon objectif est inspirant, pas une métrique", "Les KR doivent etre mesurables et temporels", "0.7 = succes. 1.0 = pas assez ambitieux"]
      }
    ]
  },
  "scaling": {
    title: "Agile à l'Échelle",
    icon: "&#128200;",
    description: "Frameworks pour scaler l'agilite au-dela d'une seule équipe. Le rôle du PO evolue significativement.",
    methods: [
      {
        name: "SAFe (Scaled Agile Framework)",
        description: "Framework de scaling le plus adopte en entreprise. 4 niveaux : Team, Program, Large Solution, Portfolio. Le PO est au niveau Team, le PM au niveau Program.",
        steps: ["Team Level : PO gere le backlog equipe", "Program Level : PM gere le Program Backlog", "ART (Agile Release Train) synchronise les équipes", "PI Planning tous les 8-12 semaines", "Inspect & Adapt pour l'amélioration continue"],
        when: "Grandes organisations (50+ développéurs), besoin de coordination inter-équipes.",
        tips: ["Le PO dans SAFe a un scope plus restreint que dans Scrum pur", "Le PI Planning est l'événement cle — préparez-le bien", "Attention à la bureaucratie : gardez l'esprit agile"]
      },
      {
        name: "LeSS (Large-Scale Scrum)",
        description: "Approche minimaliste du scaling : c'est Scrum, mais avec plusieurs équipes sur un seul produit. Un seul PO, un seul backlog.",
        steps: ["Un seul Product Owner pour le produit", "Un seul Product Backlog", "Sprint Planning en 2 parties (commune + par equipe)", "Sprint Review commune", "Rétrospectives a plusieurs niveaux"],
        when: "2-8 équipes sur un même produit, organisation qui veut rester proche de Scrum.",
        tips: ["Le PO unique est un vrai defi — il doit deleguer la clarification", "Les équipes sont feature teams, pas component teams", "Moins de processus = plus de responsabilisation"]
      },
      {
        name: "Spotify Model",
        description: "Organisation en Squads, Tribes, Chapters et Guilds. Pas un framework prescriptif mais un modèle d'organisation inspire de Spotify.",
        steps: ["Squads : équipes autonomes (comme une mini-startup)", "Tribes : regroupement de squads sur un domaine", "Chapters : communautés de pratique par competence", "Guilds : communautés d'interet transverses"],
        when: "Organisations qui veulent l'autonomie des équipes avec l'alignement global.",
        tips: ["Spotify eux-mêmes ne suivent plus ce modèle à la lettre", "L'autonomie sans alignement = chaos", "Commencez par les squads, ajoutez les layers progressivement"]
      }
    ]
  }
};

// ============================================
//  FORMATION — Parcours de cours structurés
// ============================================
const FORMATION_DATA = {
  "architecture-fonctionnelle": {
    title: "Architecture Fonctionnelle",
    icon: "&#127959;",
    color: "#6366f1",
    level: "Intermédiaire",
    duration: "4 à 6 h",
    tagline: "Comprendre, lire et challenger une architecture applicative.",
    description: "Une introduction approfondie aux patterns d'architecture applicative et d'intégration : couches, styles (monolithe, microservices), communication synchrone et événementielle, données, patterns d'intégration et bonnes pratiques. Pensé pour le PO qui doit dialoguer avec les architectes, lire un schéma et arbitrer en connaissance de cause.",
    intro: "<p>Un Product Owner n'écrit pas le code, mais il prend chaque jour des décisions qui touchent l'architecture : découper une feature, ouvrir une API à un partenaire, accepter de la dette technique, arbitrer un délai contre une refonte. Ne pas comprendre l'architecture, c'est subir ces arbitrages au lieu de les piloter.</p><p>Ce cours ne fait pas de vous un architecte. Il vous donne le <strong>vocabulaire</strong>, les <strong>patterns</strong> et les <strong>réflexes de lecture</strong> pour comprendre comment un système est structuré, repérer les bons et les mauvais choix, et tenir une conversation d'égal à égal avec votre équipe technique.</p><p>Chaque chapitre se termine par un exercice à réaliser dans la mini-app <strong>Schémas &amp; Workflows</strong> : vous modéliserez de vraies architectures pour ancrer les concepts. Suivez les chapitres dans l'ordre — chacun s'appuie sur le précédent.</p>",
    chapters: [
      {
        slug: "fondamentaux",
        title: "Fondamentaux : vues & attributs de qualité",
        summary: "Ce qu'est (et n'est pas) une architecture, les trois vues, et les attributs de qualité qui guident toutes les décisions.",
        content: "<h4>Qu'est-ce qu'une architecture ?</h4><p>L'architecture d'un système, ce sont les <strong>décisions structurantes difficiles à changer plus tard</strong> : comment on découpe le système en blocs, comment ces blocs communiquent, où vivent les données, et quelles propriétés on garantit (performance, disponibilité, sécurité). Le reste — le détail d'une fonction, le nom d'une variable — n'est pas de l'architecture.</p><p>Une bonne grille de lecture : <em>« Si on se trompe et qu'on doit revenir en arrière, est-ce une demi-journée de travail ou six mois ? »</em> Si c'est six mois, c'est une décision d'architecture, et elle mérite votre attention de PO.</p><h4>Les trois vues d'un système</h4><p>On décrit toujours un système sous plusieurs angles complémentaires. Ne les confondez pas :</p><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Vue</th><th>Répond à la question</th><th>Exemple</th></tr></thead><tbody><tr><td><strong>Fonctionnelle</strong></td><td>Quelles capacités métier le système offre-t-il ?</td><td>« Gérer le panier », « Facturer », « Authentifier »</td></tr><tr><td><strong>Applicative</strong></td><td>Quels composants logiciels les réalisent, et comment dialoguent-ils ?</td><td>Service Panier, Service Paiement, API Gateway, base Postgres</td></tr><tr><td><strong>Technique (infra)</strong></td><td>Sur quelle infrastructure ça tourne ?</td><td>Kubernetes, AWS, réseau, serveurs</td></tr></tbody></table></div><p>Ce cours se concentre sur la <strong>vue applicative</strong> — celle où le PO a le plus d'impact, car c'est là que se décident le découpage des services, les contrats d'API et les flux de données.</p><h4>Les attributs de qualité (les « -ités »)</h4><p>Toute décision d'architecture est un compromis entre des attributs de qualité. On ne peut pas tous les maximiser à la fois : c'est le cœur du métier d'architecte, et la source de la plupart de vos arbitrages.</p><ul><li><strong>Scalabilité</strong> — la capacité à encaisser plus de charge en ajoutant des ressources.</li><li><strong>Disponibilité</strong> — le pourcentage de temps où le système répond (les fameux « 99,9 % »).</li><li><strong>Performance / latence</strong> — la rapidité de réponse perçue par l'utilisateur.</li><li><strong>Maintenabilité</strong> — la facilité à faire évoluer le code sans tout casser.</li><li><strong>Résilience</strong> — la capacité à continuer de fonctionner (en mode dégradé) quand un composant tombe.</li><li><strong>Sécurité</strong> — la protection des données et des accès.</li><li><strong>Coût</strong> — l'attribut qu'on oublie toujours, et qui finit toujours par parler.</li></ul><div class='callout callout-tip'><strong>Réflexe PO :</strong> quand l'équipe propose une architecture, demandez <em>« quel attribut on optimise, et qu'est-ce qu'on sacrifie en échange ? »</em>. S'il n'y a aucun sacrifice avoué, c'est qu'il est caché.</div><h4>Couplage & cohésion : les deux boussoles</h4><p>Deux notions reviennent dans toutes les décisions de découpage :</p><ul><li><strong>Couplage</strong> — à quel point deux blocs dépendent l'un de l'autre. <em>On le veut faible</em> : changer A ne devrait pas obliger à changer B.</li><li><strong>Cohésion</strong> — à quel point ce qui est dans un bloc va logiquement ensemble. <em>On la veut forte</em> : un bloc fait une chose et la fait bien.</li></ul><p>L'objectif permanent : <strong>couplage faible, cohésion forte</strong>. La quasi-totalité des anti-patterns que vous verrez au chapitre 8 sont des violations de cette règle.</p>",
        keyPoints: ["Architecture = décisions structurantes coûteuses à défaire", "3 vues : fonctionnelle, applicative, technique", "Toute décision est un compromis entre attributs de qualité", "Boussole permanente : couplage faible, cohésion forte"],
        exercise: {
          title: "Cartographier un système que vous connaissez",
          brief: "Choisissez une application que vous utilisez tous les jours (votre outil de ticketing, une app bancaire, un site e-commerce). Modélisez sa vue applicative telle que vous l'imaginez : les grands blocs et leurs liens.",
          steps: [
            "Ouvrez Schémas & Workflows et démarrez sur un canvas vierge.",
            "Placez le(s) front(s) : web, mobile, back-office.",
            "Ajoutez 3 à 5 blocs de service correspondant à des capacités métier (ex : Catalogue, Panier, Paiement, Compte).",
            "Reliez les fronts aux services par des liaisons, puis ajoutez une base de données.",
            "Pour chaque service, notez en sous-titre la capacité métier qu'il porte (cohésion forte)."
          ],
          deliverable: "Un schéma applicatif lisible de votre système avec fronts, services et données.",
          checklist: ["Chaque bloc a une responsabilité métier claire et unique", "Aucun bloc n'est un fourre-tout (« Divers », « Core »…)", "Les liaisons montrent qui appelle qui", "Vous pouvez nommer l'attribut de qualité le plus critique pour ce système"]
        }
      },
      {
        slug: "couches",
        title: "Architecture en couches : front, back, données",
        summary: "La séparation en couches, le modèle n-tiers, les API et les patterns Gateway et BFF.",
        content: "<h4>Pourquoi séparer en couches ?</h4><p>Le pattern le plus fondamental est la <strong>séparation en couches</strong> (layered architecture). On range le code par responsabilité technique, et chaque couche ne parle qu'à la couche voisine :</p><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Couche</th><th>Responsabilité</th><th>Ce qu'elle ne fait PAS</th></tr></thead><tbody><tr><td><strong>Présentation</strong> (front)</td><td>Afficher, capturer les interactions</td><td>Aucune règle métier</td></tr><tr><td><strong>Application / métier</strong> (back)</td><td>Orchestrer les cas d'usage, appliquer les règles</td><td>Ne sait pas comment c'est affiché</td></tr><tr><td><strong>Données</strong> (persistance)</td><td>Lire / écrire durablement</td><td>Ne contient pas de logique métier</td></tr></tbody></table></div><p>L'intérêt : on peut refaire le front sans toucher au métier, ou changer de base de données sans réécrire les règles. C'est de la <strong>séparation des responsabilités</strong> appliquée à l'échelle du système.</p><h4>Le modèle n-tiers</h4><p>Quand ces couches tournent sur des machines distinctes, on parle d'architecture <strong>n-tiers</strong> (2-tiers, 3-tiers…). La 3-tiers classique : navigateur → serveur applicatif → base de données. C'est le squelette de l'immense majorité des applications web.</p><h4>L'API : le contrat entre couches</h4><p>Entre le front et le back, on ne branche pas le code directement : on expose une <strong>API</strong> (Application Programming Interface). C'est un <em>contrat</em> : « voici les opérations que j'offre, voici ce que tu dois m'envoyer, voici ce que je te renverrai ». Tant que le contrat est respecté, chaque côté évolue indépendamment.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> une API est un engagement public. Casser un contrat d'API, c'est casser tous ceux qui en dépendent (apps mobiles déployées, partenaires…). Les changements d'API se gèrent comme des changements de produit, avec versioning et dépréciation.</div><h4>Deux patterns à connaître : API Gateway & BFF</h4><div class='pattern-card'><span class='pattern-tag'>Pattern</span><strong>API Gateway</strong><p>Un point d'entrée unique placé devant tous les services back. Il route les requêtes, centralise l'authentification, le rate-limiting et le logging. Le front ne connaît qu'une seule adresse au lieu de dix.</p></div><div class='pattern-card'><span class='pattern-tag'>Pattern</span><strong>BFF — Backend For Frontend</strong><p>Un back-end taillé sur mesure pour un front précis. Le BFF mobile agrège et allège les données pour économiser la bande passante ; le BFF web en renvoie davantage. Chaque front a son intermédiaire dédié au lieu d'un back générique qui essaie de contenter tout le monde.</p></div><p>Gateway et BFF se combinent souvent : la Gateway gère le transverse (sécurité, routage), les BFF gèrent l'adaptation par canal.</p>",
        keyPoints: ["Séparer présentation / métier / données = pouvoir faire évoluer chaque couche isolément", "L'API est un contrat : on ne le casse pas sans versioning", "API Gateway = porte d'entrée unique (sécurité, routage)", "BFF = un back sur mesure par type de front"],
        exercise: {
          title: "Modéliser une architecture 3-tiers avec Gateway et BFF",
          brief: "Vous concevez l'architecture d'un produit accessible en web et en mobile. Modélisez les couches et introduisez une API Gateway puis un BFF par canal.",
          steps: [
            "Placez deux fronts : Web et Mobile.",
            "Ajoutez une API Gateway en point d'entrée unique.",
            "Derrière la Gateway, ajoutez 2 ou 3 services métier et une base de données.",
            "Insérez un BFF Web et un BFF Mobile entre les fronts et les services.",
            "Tracez les flux : Front → BFF → (Gateway) → Services → Données."
          ],
          deliverable: "Un schéma 3-tiers avec Gateway et BFF par canal, flux complets.",
          checklist: ["Le front ne parle jamais directement à la base de données", "La Gateway est bien l'unique point d'entrée", "Chaque BFF est rattaché à un seul front", "Vous savez expliquer ce que la Gateway centralise (auth, routage…)"]
        }
      },
      {
        slug: "styles",
        title: "Styles d'architecture : monolithe → microservices",
        summary: "Monolithe, monolithe modulaire et microservices : avantages, pièges et découpage par domaines (DDD).",
        content: "<h4>Le monolithe : tout dans un seul bloc déployable</h4><p>Dans un <strong>monolithe</strong>, tout le code (toutes les fonctionnalités) vit dans une seule application déployée d'un bloc. C'est <em>le bon choix par défaut</em>, surtout au démarrage : simple à développer, à tester, à déployer, à débugger. On ne quitte le monolithe que lorsqu'il devient un frein mesurable.</p><p>Le piège n'est pas le monolithe en soi, c'est le <strong>monolithe « big ball of mud »</strong> : tout est mélangé, tout dépend de tout, plus personne n'ose toucher quoi que ce soit.</p><h4>Le monolithe modulaire : l'étape intermédiaire sous-estimée</h4><p>Un <strong>monolithe modulaire</strong> garde un seul déploiement, mais le code interne est découpé en <em>modules</em> à frontières strictes, qui communiquent par des interfaces claires. On obtient l'essentiel de la cohésion des microservices sans la complexité réseau. Beaucoup d'équipes devraient s'arrêter là.</p><h4>Les microservices : des services indépendants et déployables séparément</h4><p>Dans une architecture <strong>microservices</strong>, chaque capacité métier devient un service autonome : son propre code, son propre déploiement, souvent sa propre base de données. Les équipes peuvent livrer indépendamment.</p><div class='course-table-wrap'><table class='course-table'><thead><tr><th></th><th>Monolithe (modulaire)</th><th>Microservices</th></tr></thead><tbody><tr><td>Déploiement</td><td>Un seul, simple</td><td>Indépendant par service</td></tr><tr><td>Scalabilité</td><td>Globale (on duplique tout)</td><td>Ciblée (on scale le service chargé)</td></tr><tr><td>Complexité opérationnelle</td><td>Faible</td><td>Élevée (réseau, observabilité, données distribuées)</td></tr><tr><td>Autonomie des équipes</td><td>Limitée</td><td>Forte</td></tr><tr><td>Idéal pour</td><td>Démarrage, petite/moyenne équipe</td><td>Grande organisation, scaling différencié</td></tr></tbody></table></div><div class='callout callout-warn'><strong>Attention :</strong> les microservices résolvent un problème <em>organisationnel</em> (plusieurs équipes qui se gênent) au prix d'une <em>complexité technique</em> majeure. Les adopter trop tôt, c'est payer la facture sans toucher le bénéfice. C'est le piège du « distributed monolith » (cf. chapitre 8).</div><h4>Comment découper ? Le Domain-Driven Design (DDD)</h4><p>La question la plus difficile des microservices n'est pas <em>comment</em> les faire communiquer, mais <strong>où tracer les frontières</strong>. La réponse vient du <strong>DDD</strong> et de sa notion de <strong>bounded context</strong> (contexte délimité) : on découpe selon les <em>domaines métier</em>, pas selon les couches techniques.</p><p>Bon découpage : un service « Commande », un service « Facturation », un service « Livraison » — chacun aligné sur une capacité métier réelle, avec sa propre équipe et son propre langage. Mauvais découpage : un service « Base de données », un service « UI », un service « Logique » — c'est juxtaposer des couches, pas des domaines.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> vos frontières de domaines métier sont souvent les bonnes frontières de services. Si une seule user story oblige systématiquement à modifier 4 services, le découpage est probablement faux.</div>",
        keyPoints: ["Le monolithe est le bon défaut ; on le quitte par nécessité, pas par mode", "Le monolithe modulaire offre la cohésion sans la complexité réseau", "Les microservices = bénéfice organisationnel, coût technique", "On découpe par domaine métier (bounded context), jamais par couche technique"],
        exercise: {
          title: "Décomposer un monolithe e-commerce en services",
          brief: "Un monolithe e-commerce gère catalogue, panier, commande, paiement et livraison. Proposez une décomposition en microservices alignés sur les domaines métier.",
          steps: [
            "Posez d'abord un bloc unique « Monolithe e-commerce » relié à sa base de données.",
            "Sur une zone à côté, créez un service par domaine métier (Catalogue, Panier, Commande, Paiement, Livraison).",
            "Donnez à chaque service sa propre base de données (database-per-service, vu au ch. 6).",
            "Reliez les services entre eux selon les dépendances réelles (ex : Commande appelle Paiement).",
            "Repérez le service le plus sollicité : c'est celui qu'on aurait intérêt à scaler indépendamment."
          ],
          deliverable: "Deux schémas comparés : le monolithe initial et sa décomposition par domaines.",
          checklist: ["Chaque service correspond à un domaine métier, pas à une couche", "Aucun service ne partage sa base avec un autre", "Les dépendances entre services sont minimales et explicites", "Vous pouvez justifier pourquoi (ou pourquoi pas) découper ce monolithe"]
        }
      },
      {
        slug: "communication-synchrone",
        title: "Communication synchrone : REST, GraphQL, gRPC",
        summary: "Le modèle requête/réponse, les styles d'API et la gestion des contrats.",
        content: "<h4>Le modèle requête / réponse</h4><p>En communication <strong>synchrone</strong>, l'appelant envoie une requête et <em>attend</em> la réponse avant de continuer. C'est intuitif et direct, mais cela crée un <strong>couplage temporel</strong> : si le service appelé est lent ou indisponible, l'appelant est bloqué. Un appel synchrone qui traverse 5 services hérite de la latence et de la fragilité de tous.</p><h4>Les trois grands styles d'API</h4><div class='pattern-card'><span class='pattern-tag'>Style</span><strong>REST</strong><p>Le standard du web. On manipule des <em>ressources</em> (/commandes/42) via les verbes HTTP (GET, POST, PUT, DELETE). Universel, simple, parfaitement outillé. Limite : on récupère parfois trop de données (over-fetching) ou il faut multiplier les appels (under-fetching).</p></div><div class='pattern-card'><span class='pattern-tag'>Style</span><strong>GraphQL</strong><p>Le client décrit exactement les données qu'il veut, en une seule requête. Résout l'over/under-fetching, idéal pour des fronts riches aux besoins variés. Coût : serveur plus complexe, cache et monitoring moins évidents.</p></div><div class='pattern-card'><span class='pattern-tag'>Style</span><strong>gRPC</strong><p>Protocole binaire haute performance, surtout utilisé <em>entre services</em> back (pas exposé au navigateur). Très rapide, contrat fortement typé. Moins lisible et moins « web-friendly » que REST.</p></div><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Style</th><th>Idéal pour</th><th>À éviter quand</th></tr></thead><tbody><tr><td>REST</td><td>API publiques, CRUD, interop large</td><td>Besoins de données très variables par écran</td></tr><tr><td>GraphQL</td><td>Fronts riches, agrégation de sources</td><td>API simple ou équipe peu outillée</td></tr><tr><td>gRPC</td><td>Communication interne service-à-service</td><td>Exposition directe au navigateur</td></tr></tbody></table></div><h4>Le contrat d'API : versioning & compatibilité</h4><p>Un contrat d'API définit les opérations, les formats d'entrée/sortie et les codes d'erreur. Deux règles d'or :</p><ul><li><strong>Compatibilité ascendante</strong> — on peut <em>ajouter</em> un champ sans rien casser ; on ne <em>supprime</em> ni ne <em>renomme</em> jamais sans prévenir.</li><li><strong>Versioning</strong> — un changement cassant impose une nouvelle version (ex : /v2/commandes), en laissant vivre l'ancienne le temps que les consommateurs migrent (dépréciation planifiée).</li></ul><div class='callout callout-tip'><strong>Réflexe PO :</strong> « ouvrir une API » à un partenaire est une décision produit lourde. Une fois exposée et consommée, vous ne pourrez plus la modifier librement : vous venez de signer un engagement de long terme. Traitez le contrat d'API comme une promesse client.</div>",
        keyPoints: ["Synchrone = couplage temporel : on attend, donc on dépend de la dispo de l'autre", "REST pour l'universel, GraphQL pour les fronts riches, gRPC pour l'interne perf", "Un contrat d'API ne se casse pas : compatibilité ascendante + versioning", "Exposer une API = engagement produit durable"],
        exercise: {
          title: "Concevoir les flux d'API d'un parcours de commande",
          brief: "Modélisez les appels synchrones d'un parcours « passer commande » et identifiez le risque de couplage temporel.",
          steps: [
            "Placez un front Web et une API Gateway.",
            "Ajoutez les services Commande, Paiement et Stock, chacun exposant une API REST.",
            "Tracez le flux synchrone : Front → Gateway → Commande → (Paiement + Stock).",
            "Sur chaque liaison, annotez le style (REST) et le sens de l'appel.",
            "Identifiez le chemin critique : si Paiement est lent, qu'arrive-t-il à l'utilisateur ?"
          ],
          deliverable: "Un schéma du parcours de commande avec les appels d'API annotés et le chemin critique identifié.",
          checklist: ["Chaque liaison indique qui appelle qui", "Le style d'API choisi est cohérent (REST exposé, gRPC en interne le cas échéant)", "Vous avez identifié au moins un point de couplage temporel risqué", "Vous pouvez proposer un plan B si Paiement tombe (transition vers le ch. 5)"]
        }
      },
      {
        slug: "communication-asynchrone",
        title: "Communication asynchrone & événementiel",
        summary: "Messaging, files, Kafka, architecture événementielle (EDA), pub/sub et CQRS.",
        content: "<h4>Découpler dans le temps : l'asynchrone</h4><p>En communication <strong>asynchrone</strong>, l'émetteur dépose un message et <em>continue immédiatement</em> ; le destinataire le traitera quand il pourra. Plus d'attente, plus de couplage temporel : si le consommateur est en panne, les messages patientent et seront traités plus tard. C'est le levier n°1 de la <strong>résilience</strong> et du <strong>découplage</strong>.</p><h4>Deux mécanismes : files & journaux d'événements</h4><div class='pattern-card'><span class='pattern-tag'>Mécanisme</span><strong>File de messages (queue)</strong><p>Un message, un consommateur : la tâche est déposée puis consommée une fois (ex : « envoyer cet email »). Idéal pour distribuer du travail et lisser les pics de charge.</p></div><div class='pattern-card'><span class='pattern-tag'>Mécanisme</span><strong>Journal d'événements (ex : Kafka)</strong><p>Un événement, plusieurs consommateurs : l'émetteur publie « Commande passée » sans savoir qui écoute. Facturation, Livraison et Analytics y réagissent chacun de leur côté. Le journal conserve l'historique, qu'on peut rejouer.</p></div><h4>L'architecture événementielle (EDA) et le pub/sub</h4><p>Dans une <strong>architecture événementielle</strong>, les services communiquent en publiant et en consommant des <em>événements</em> (« ce qui s'est passé »), via un modèle <strong>publish / subscribe</strong>. L'émetteur ne connaît pas ses consommateurs : on peut en ajouter un nouveau (ex : un service Fidélité) <em>sans toucher</em> à l'émetteur. C'est le couplage faible poussé à son maximum.</p><div class='callout callout-warn'><strong>Le prix à payer :</strong> l'asynchrone rend le système plus difficile à <em>suivre</em>. Le flux n'est plus linéaire, le debug demande de la traçabilité (corrélation des messages), et l'ordre des événements n'est pas garanti. On échange de la simplicité de raisonnement contre de la résilience.</div><h4>Synchrone ou asynchrone : comment choisir ?</h4><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Utilisez le synchrone quand…</th><th>Utilisez l'asynchrone quand…</th></tr></thead><tbody><tr><td>Vous avez besoin de la réponse <em>maintenant</em> (ex : vérifier un solde avant d'afficher)</td><td>Le traitement peut se faire en différé (email, génération de PDF)</td></tr><tr><td>L'opération est une simple lecture</td><td>Vous voulez découpler des services et encaisser des pics</td></tr><tr><td>Le flux doit rester simple à suivre</td><td>Plusieurs services doivent réagir au même fait</td></tr></tbody></table></div><h4>CQRS : séparer lecture et écriture</h4><p><strong>CQRS</strong> (Command Query Responsibility Segregation) sépare le modèle d'<em>écriture</em> (les commandes qui changent l'état) du modèle de <em>lecture</em> (les requêtes d'affichage), souvent synchronisés par des événements. On optimise chaque côté indépendamment. Puissant, mais à réserver aux cas où lecture et écriture ont des contraintes vraiment divergentes — c'est de la complexité supplémentaire.</p>",
        keyPoints: ["Asynchrone = découplage dans le temps : résilience et absorption des pics", "Queue : un consommateur ; Journal d'événements (Kafka) : plusieurs consommateurs", "L'EDA/pub-sub permet d'ajouter un consommateur sans toucher l'émetteur", "Le coût de l'async : traçabilité et raisonnement plus difficiles", "CQRS sépare lecture et écriture — utile mais coûteux"],
        exercise: {
          title: "Passer un flux synchrone à l'événementiel avec Kafka",
          brief: "Reprenez le parcours de commande du chapitre 4. Quand une commande est passée, Facturation, Livraison et Notifications doivent réagir. Transformez ces appels synchrones en architecture événementielle.",
          steps: [
            "Repartez du service Commande.",
            "Ajoutez un nœud Kafka (journal d'événements) connecté à Commande.",
            "Faites publier par Commande un événement « Commande passée » vers Kafka.",
            "Abonnez trois services consommateurs à cet événement : Facturation, Livraison, Notifications.",
            "Ajoutez ensuite un 4e consommateur (Fidélité) sans modifier le service Commande — c'est tout l'intérêt du pub/sub."
          ],
          deliverable: "Un schéma événementiel où Commande publie un événement consommé par plusieurs services indépendants.",
          checklist: ["Commande ne connaît pas ses consommateurs (aucune liaison directe vers eux)", "Tous les consommateurs passent par Kafka", "Ajouter Fidélité n'a demandé aucune modification de l'émetteur", "Vous savez expliquer ce qu'on gagne (résilience) et ce qu'on perd (traçabilité)"]
        }
      },
      {
        slug: "donnees-persistance",
        title: "Données & persistance",
        summary: "Database-per-service, persistance polyglotte, cache, et le défi de la cohérence (Saga).",
        content: "<h4>La donnée, cœur (et talon d'Achille) de l'architecture</h4><p>Dans un monolithe, une seule base de données : les transactions sont simples et la cohérence est garantie par la base. Dès qu'on distribue les services, la donnée devient le problème le plus difficile de toute l'architecture.</p><h4>Database-per-service</h4><p>Le principe clé des microservices : <strong>chaque service possède sa propre base, et lui seul y accède</strong>. Les autres ne peuvent l'atteindre qu'en passant par l'API du service propriétaire. C'est ce qui garantit l'autonomie : le service Paiement peut changer son schéma de données sans casser le service Commande.</p><div class='callout callout-warn'><strong>Anti-pattern fréquent :</strong> la <em>base partagée</em>. Deux services qui lisent et écrivent dans la même table sont en réalité couplés au plus haut point — changer la table casse les deux. C'est un faux microservice (cf. ch. 8).</div><h4>Persistance polyglotte</h4><p>Chaque service choisit le <em>type</em> de base adapté à son besoin : relationnel (Postgres) pour des données structurées et transactionnelles, document (MongoDB) pour des données flexibles, clé-valeur (Redis) pour du cache, moteur de recherche (Elasticsearch) pour le full-text. On parle de <strong>persistance polyglotte</strong> : le bon outil pour chaque usage.</p><h4>Le cache : rapide, mais piégeux</h4><p>Un <strong>cache</strong> garde en mémoire les données fréquemment lues pour répondre plus vite et soulager la base. C'est un gain de performance majeur — mais il introduit la question de l'<em>invalidation</em> : « comment être sûr que la donnée en cache n'est pas périmée ? ». D'où l'adage : <em>« il n'y a que deux problèmes difficiles en informatique : l'invalidation de cache et le nommage des choses. »</em></p><h4>Le grand compromis : cohérence vs disponibilité</h4><p>Quand la donnée est distribuée, on ne peut pas tout avoir. Deux régimes de cohérence :</p><ul><li><strong>Cohérence forte</strong> — tout le monde voit la même donnée au même instant. Rassurant, mais coûteux et fragile à grande échelle.</li><li><strong>Cohérence à terme (eventual consistency)</strong> — les données se synchronisent avec un léger délai. On accepte qu'un service soit brièvement « en retard », en échange de disponibilité et de scalabilité.</li></ul><p>Beaucoup de fonctionnalités tolèrent très bien la cohérence à terme (un compteur de likes, un historique). D'autres non (un solde bancaire débité deux fois). <strong>C'est une décision produit autant que technique.</strong></p><h4>Saga : gérer une transaction qui traverse plusieurs services</h4><p>Sans base commune, comment garantir qu'une commande soit <em>soit</em> entièrement traitée (stock réservé + paiement + livraison), <em>soit</em> entièrement annulée ? Avec une <strong>Saga</strong> : une suite d'étapes locales, chacune avec son <em>action de compensation</em> en cas d'échec. Si le paiement échoue après la réservation du stock, la Saga déclenche la compensation « libérer le stock ». On ne fait plus une transaction atomique, on orchestre un rollback métier.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> pour chaque parcours critique, demandez-vous « que se passe-t-il si ça échoue au milieu ? ». La réponse (compensation, dédommagement, ré-essai) est souvent une vraie décision produit que l'équipe attend de vous.</div>",
        keyPoints: ["Database-per-service : un service = sa base, accessible uniquement via son API", "La base partagée est un anti-pattern (couplage maximal)", "Persistance polyglotte : le bon type de base par usage", "Cohérence forte vs à terme = arbitrage produit, pas seulement technique", "Saga : transaction distribuée via étapes compensables"],
        exercise: {
          title: "Concevoir la persistance et une Saga de commande",
          brief: "Reprenez vos services e-commerce. Attribuez à chacun sa base de données adaptée, ajoutez un cache, puis décrivez la Saga du parcours de commande.",
          steps: [
            "À chaque service (Commande, Paiement, Stock, Catalogue), attribuez sa propre base — variez les types (Postgres, Redis pour le cache catalogue…).",
            "Ajoutez un cache devant le service Catalogue (lectures fréquentes).",
            "Modélisez la Saga : Commande → réserver Stock → débiter Paiement → confirmer.",
            "Pour chaque étape, ajoutez une note décrivant l'action de compensation si l'étape suivante échoue.",
            "Indiquez quelles données tolèrent la cohérence à terme et lesquelles exigent la cohérence forte."
          ],
          deliverable: "Un schéma avec database-per-service, un cache, et la Saga annotée de ses compensations.",
          checklist: ["Aucun service ne partage sa base avec un autre", "Le choix du type de base est justifié par l'usage", "Chaque étape de la Saga a une compensation définie", "Vous avez classé les données par exigence de cohérence (forte / à terme)"]
        }
      },
      {
        slug: "patterns-integration",
        title: "Patterns d'intégration",
        summary: "Les patterns récurrents pour faire dialoguer et fiabiliser des systèmes : Gateway, Saga, Circuit Breaker, Strangler Fig, Anti-Corruption Layer, Outbox.",
        content: "<h4>Une boîte à outils de patterns éprouvés</h4><p>Les mêmes problèmes d'intégration reviennent sans cesse ; la communauté a nommé leurs solutions. En connaître le vocabulaire vous permet de comprendre instantanément une proposition d'architecture.</p><div class='pattern-card'><span class='pattern-tag'>Routage</span><strong>API Gateway</strong><p>(Rappel ch. 2) Point d'entrée unique : routage, authentification, rate-limiting, observabilité centralisés. Le premier rempart devant vos services.</p></div><div class='pattern-card'><span class='pattern-tag'>Adaptation</span><strong>Backend For Frontend (BFF)</strong><p>(Rappel ch. 2) Un back sur mesure par canal, qui agrège et adapte les données aux besoins d'un front précis.</p></div><div class='pattern-card'><span class='pattern-tag'>Résilience</span><strong>Circuit Breaker (disjoncteur)</strong><p>Quand un service appelé tombe en panne, plutôt que de le marteler d'appels qui échouent (et de bloquer l'appelant), le disjoncteur « s'ouvre » : il échoue vite et proprement, renvoie une réponse dégradée, puis teste périodiquement si le service est revenu. Évite l'effet domino où une panne se propage à tout le système.</p></div><div class='pattern-card'><span class='pattern-tag'>Transaction</span><strong>Saga</strong><p>(Rappel ch. 6) Orchestration d'une transaction distribuée par étapes compensables, en l'absence de transaction atomique commune.</p></div><div class='pattern-card'><span class='pattern-tag'>Migration</span><strong>Strangler Fig (figuier étrangleur)</strong><p>Pour remplacer un vieux système sans tout réécrire d'un coup : on place une façade devant le legacy et on redirige <em>progressivement</em>, fonctionnalité par fonctionnalité, vers les nouveaux services. Le legacy rétrécit jusqu'à disparaître. Migration à risque maîtrisé, sans « big bang ».</p></div><div class='pattern-card'><span class='pattern-tag'>Isolation</span><strong>Anti-Corruption Layer (ACL)</strong><p>Une couche de traduction entre votre système et un système externe (ou legacy) dont vous ne voulez pas que le modèle de données « contamine » le vôtre. L'ACL convertit leur vocabulaire vers le vôtre, et vous protège de leurs changements.</p></div><div class='pattern-card'><span class='pattern-tag'>Fiabilité</span><strong>Outbox</strong><p>Comment être sûr qu'on publie bien un événement <em>après</em> avoir enregistré une donnée en base, sans risque d'incohérence ? On écrit la donnée ET l'événement à publier dans la même transaction (dans une table « outbox »), puis un processus lit l'outbox et publie. Garantit qu'on ne perd jamais un événement.</p></div><div class='callout callout-tip'><strong>Réflexe PO :</strong> ces patterns ont un coût de mise en œuvre. Quand l'équipe en propose un, la vraie question est « quel risque concret ce pattern élimine-t-il ? ». Un Circuit Breaker sans dépendance fragile, ou une Saga sans transaction multi-services, c'est de la complexité gratuite.</div>",
        keyPoints: ["Connaître le vocabulaire des patterns = comprendre vite une proposition d'archi", "Circuit Breaker : échouer vite pour éviter l'effet domino", "Strangler Fig : remplacer un legacy progressivement, sans big bang", "Anti-Corruption Layer : se protéger du modèle d'un système externe", "Outbox : ne jamais perdre un événement à publier"],
        exercise: {
          title: "Moderniser un legacy avec Strangler Fig et Circuit Breaker",
          brief: "Une vieille application monolithique doit être remplacée progressivement. Modélisez la stratégie Strangler Fig et protégez les appels au legacy par un Circuit Breaker.",
          steps: [
            "Placez le monolithe « Legacy » et sa base.",
            "Ajoutez une façade (Gateway/Proxy) devant le legacy : c'est elle qui décide où router.",
            "Créez deux nouveaux services qui reprennent deux fonctionnalités extraites du legacy.",
            "Routez ces deux fonctionnalités vers les nouveaux services ; le reste continue vers le legacy.",
            "Ajoutez une note « Circuit Breaker » sur la liaison vers le legacy, et un Anti-Corruption Layer si un nouveau service doit lire des données du legacy."
          ],
          deliverable: "Un schéma de migration progressive : façade, services neufs, legacy résiduel, et protections (Circuit Breaker, ACL).",
          checklist: ["La façade route bien certaines fonctions vers le neuf, d'autres vers le legacy", "La migration est progressive (pas de bascule totale)", "Les appels fragiles vers le legacy sont protégés (Circuit Breaker)", "Vous savez expliquer pourquoi Strangler Fig réduit le risque vs une réécriture totale"]
        }
      },
      {
        slug: "bonnes-pratiques",
        title: "Bonnes pratiques, anti-patterns & synthèse",
        summary: "Les principes transverses, les anti-patterns à repérer, et un cas de synthèse complet.",
        content: "<h4>Principes transverses à garder en tête</h4><ul><li><strong>Couplage faible, cohésion forte</strong> — la boussole du chapitre 1, valable partout.</li><li><strong>Idempotence</strong> — une opération rejouée plusieurs fois doit donner le même résultat (essentiel en asynchrone, où un message peut être livré deux fois).</li><li><strong>Observabilité</strong> — logs, métriques et traces : si on ne peut pas <em>voir</em> ce qui se passe dans un système distribué, on ne peut pas l'exploiter. Non négociable.</li><li><strong>Sécurité dès la conception</strong> — l'authentification et le chiffrement se pensent à l'entrée (Gateway) et entre services, pas en dernière minute.</li><li><strong>Documentation des contrats</strong> — une API non documentée est inutilisable ; les schémas d'architecture doivent être tenus à jour.</li><li><strong>Évolutivité &gt; perfection</strong> — une bonne architecture n'est pas « finie », elle est <em>facile à faire évoluer</em>. Privilégiez les décisions réversibles.</li></ul><h4>Les anti-patterns à savoir repérer</h4><div class='pattern-card pattern-anti'><span class='pattern-tag pattern-tag-anti'>Anti-pattern</span><strong>Distributed monolith (monolithe distribué)</strong><p>Des services « microservices » sur le papier, mais si couplés qu'on doit les déployer ensemble. On cumule la complexité réseau du distribué et la rigidité du monolithe : le pire des deux mondes. Cause fréquente : un mauvais découpage (par couche, pas par domaine).</p></div><div class='pattern-card pattern-anti'><span class='pattern-tag pattern-tag-anti'>Anti-pattern</span><strong>Big ball of mud</strong><p>Aucune structure : tout dépend de tout, le code est un plat de spaghetti. Chaque changement casse autre chose. C'est l'absence d'architecture.</p></div><div class='pattern-card pattern-anti'><span class='pattern-tag pattern-tag-anti'>Anti-pattern</span><strong>Base de données partagée</strong><p>Plusieurs services qui lisent/écrivent dans les mêmes tables : couplage maximal déguisé en découplage. Détruit l'autonomie promise par les microservices.</p></div><div class='pattern-card pattern-anti'><span class='pattern-tag pattern-tag-anti'>Anti-pattern</span><strong>Chatty services (services bavards)</strong><p>Un cas d'usage qui déclenche des dizaines d'allers-retours réseau entre services. Latence et fragilité explosent. Souvent le signe d'un découpage trop fin.</p></div><div class='pattern-card pattern-anti'><span class='pattern-tag pattern-tag-anti'>Anti-pattern</span><strong>Golden hammer (marteau d'or)</strong><p>Appliquer partout la même solution « parce qu'on la connaît » : tout en microservices, tout en événementiel, tout en GraphQL. Le bon pattern dépend du problème, pas des habitudes.</p></div><h4>La grille de lecture du PO</h4><p>Face à n'importe quelle architecture, posez ces questions :</p><ul><li>Quel <strong>attribut de qualité</strong> est optimisé, et qu'est-ce qu'on sacrifie ?</li><li>Où est le <strong>couplage</strong> ? Une feature touche combien de blocs ?</li><li>Que se passe-t-il en cas de <strong>panne</strong> d'un composant ? (résilience)</li><li>Cette décision est-elle <strong>réversible</strong> ? À quel coût ?</li><li>La complexité ajoutée <strong>résout-elle un problème réel</strong>, ou anticipe-t-elle un problème hypothétique ?</li></ul><div class='callout callout-tip'><strong>Le mot de la fin :</strong> la meilleure architecture n'est pas la plus sophistiquée, c'est la plus <em>adaptée au problème et à la taille de l'équipe</em>, et la plus facile à faire évoluer. En tant que PO, votre rôle n'est pas de choisir les patterns, mais de garantir que les choix techniques servent un objectif produit clair — et d'exiger qu'on vous explique les compromis.</div>",
        keyPoints: ["Idempotence et observabilité sont non négociables en distribué", "Distributed monolith, big ball of mud, base partagée, chatty services : les classiques à repérer", "Privilégier les décisions réversibles à la perfection", "Grille PO : attribut optimisé, couplage, résilience, réversibilité, utilité réelle de la complexité"],
        exercise: {
          title: "Cas de synthèse — auditer et concevoir une architecture complète",
          brief: "Mettez tout en œuvre. Concevez l'architecture cible d'un produit de votre choix (ou de votre vrai produit) en combinant les patterns du cours, puis auto-auditez-la avec la grille de lecture du PO.",
          steps: [
            "Modélisez les fronts, une API Gateway, et 4 à 6 services découpés par domaine métier.",
            "Mêlez communication synchrone (REST/gRPC) et événementielle (Kafka) selon les besoins de chaque flux.",
            "Donnez à chaque service sa base (database-per-service) et ajoutez un cache là où c'est pertinent.",
            "Intégrez au moins deux patterns d'intégration parmi : BFF, Circuit Breaker, Saga, Strangler Fig, ACL.",
            "Annotez le schéma : pour chaque choix, notez l'attribut de qualité visé et le compromis accepté.",
            "Passez votre propre schéma au crible des 5 questions de la grille de lecture du PO et notez ce que vous changeriez."
          ],
          deliverable: "Une architecture cible complète et annotée, accompagnée de son auto-audit selon la grille PO.",
          checklist: ["Le découpage est par domaine, pas par couche", "Sync et async sont utilisés à bon escient et justifiés", "Au moins deux patterns d'intégration sont intégrés et utiles", "Chaque choix porte son compromis (attribut gagné / sacrifié)", "Aucun anti-pattern du chapitre 8 n'est présent", "L'auto-audit identifie au moins une amélioration possible"]
        }
      }
    ]
  }
};

window.PO_TOOLKIT_DATA = {
  TOOLS_DATA,
  METHODS_DATA,
  FORMATION_DATA,
};
