// ============================================
//  FORMATION — Parcours additionnels
//  Fusionné avec window.PO_TOOLKIT_DATA.FORMATION_DATA
//  (la thématique "Architecture Fonctionnelle" est définie dans data.js)
// ============================================
(function () {
  const root = (window.PO_TOOLKIT_DATA = window.PO_TOOLKIT_DATA || {});

  // Mini-apps réutilisables pour les exercices
  const APP = {
    schemas: { name: "Schémas & Workflows", file: "../accelerators/html/schemas-workflows.html" },
    json: { name: "JSON & UUID Tools", file: "../accelerators/html/json-uuid-tools.html" },
    story: { name: "Story Splitter", file: "../accelerators/html/story-splitter.html" },
    prio: { name: "Calculateur de Priorisation", file: "../accelerators/html/prioritization-calculator.html" },
    roadmap: { name: "Roadmap Designer", file: "../accelerators/html/roadmap-designer.html" },
    poker: { name: "Planning Poker", file: "../accelerators/html/planning-poker.html" },
    pi: { name: "PI Planning Simulator", file: "../accelerators/html/pi-planning-simulator.html" },
    daily: { name: "Daily Standup Timer", file: "../accelerators/html/daily-standup-timer.html" },
    retro: { name: "Retro Board", file: "../accelerators/html/retro-board.html" },
  };

  const FORMATION_EXTRA = {

    // ============================================================
    //  TECHNIQUE — API & Contrats d'intégration
    // ============================================================
    "api-contrats": {
      title: "API & Contrats d'intégration",
      icon: "&#128268;",
      color: "#0ea5e9",
      track: "Technique",
      level: "Intermédiaire",
      duration: "3 à 4 h",
      defaultApp: APP.schemas,
      tagline: "Concevoir, exposer et faire évoluer des API sans rien casser.",
      description: "Une API est un contrat public entre deux systèmes : une fois consommée, on ne peut plus la changer librement. Ce cours couvre les styles d'API (REST, GraphQL, événements), la conception de contrats clairs, le versioning, la sécurité et la gouvernance — pour que le PO pilote l'ouverture d'API comme une décision produit.",
      intro: "<p>Dès qu'un produit parle à un autre système — une app mobile, un partenaire, un autre service interne — il le fait via une <strong>API</strong>. Pour le PO, l'API n'est pas un détail technique : c'est un <em>engagement durable</em>, souvent monétisable, et toujours coûteux à modifier une fois en production.</p><p>Ce cours vous donne le vocabulaire et les réflexes pour concevoir de bons contrats, choisir le bon style d'API, anticiper le versioning et la sécurité, et arbitrer ce qu'on expose (ou non) à l'extérieur.</p><p>Les exercices s'appuient sur <strong>Schémas &amp; Workflows</strong> pour modéliser les flux, et sur <strong>JSON &amp; UUID Tools</strong> pour manipuler de vrais payloads.</p>",
      chapters: [
        {
          slug: "api-fondamentaux",
          title: "Qu'est-ce qu'une API et pourquoi ça vous concerne",
          summary: "Définition d'une API, la notion de contrat, et l'impact produit d'une ouverture d'API.",
          content: "<h4>Une API, c'est un contrat</h4><p>Une <strong>API</strong> (Application Programming Interface) décrit comment un système en appelle un autre : quelles opérations sont disponibles, quelles données envoyer, quelles réponses attendre. Ce n'est pas le code : c'est la <em>promesse</em> que fait un système à ceux qui l'utilisent.</p><p>Comme tout contrat, une API engage. Si une app mobile déployée chez 100 000 utilisateurs appelle votre API, vous ne pouvez plus en changer le format du jour au lendemain : vous casseriez toutes ces apps.</p><h4>API privées, partenaires, publiques</h4><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Type</th><th>Consommateurs</th><th>Enjeu pour le PO</th></tr></thead><tbody><tr><td><strong>Privée / interne</strong></td><td>Vos propres services</td><td>Vélocité des équipes, découplage</td></tr><tr><td><strong>Partenaire</strong></td><td>Quelques clients B2B sous contrat</td><td>SLA, support, négociation</td></tr><tr><td><strong>Publique</strong></td><td>N'importe quel développeur</td><td>Stratégie produit, écosystème, monétisation</td></tr></tbody></table></div><h4>L'API comme produit</h4><p>Une API publique <em>est</em> un produit : elle a des utilisateurs (des développeurs), une expérience (la doc, la simplicité d'intégration), un cycle de vie et parfois un prix. Stripe, Twilio ou Algolia ont bâti des entreprises entières sur la qualité de leurs API.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> avant d'ouvrir une API à un partenaire, posez-vous : qui la consomme, quel niveau de service je m'engage à tenir, et combien ça me coûtera de la faire évoluer ? Une API ouverte trop tôt et mal conçue devient une dette permanente.</div>",
          keyPoints: ["Une API est un contrat public, pas un détail technique", "3 niveaux d'exposition : interne, partenaire, publique — enjeux croissants", "Une API publique est un produit à part entière (doc, DX, cycle de vie)", "Ouvrir une API est une décision produit engageante et durable"],
          exercise: {
            title: "Cartographier les API d'un produit et leur exposition",
            brief: "Prenez un produit (le vôtre ou un connu) et cartographiez ses API en distinguant leur niveau d'exposition.",
            steps: [
              "Dans Schémas & Workflows, placez le cœur du produit et ses fronts.",
              "Identifiez 3 à 5 API exposées (ex : API mobile, API partenaire, webhook).",
              "Pour chaque API, annotez son type : interne, partenaire ou publique.",
              "Reliez chaque consommateur (front, partenaire, service tiers) à l'API qu'il utilise.",
              "Repérez l'API la plus risquée à faire évoluer (la plus exposée / la plus consommée)."
            ],
            deliverable: "Une carte des API du produit annotée par niveau d'exposition et par consommateur.",
            checklist: ["Chaque API a un type d'exposition explicite", "Chaque consommateur est relié à l'API qu'il appelle", "Vous avez identifié l'API la plus coûteuse à changer", "Vous savez dire laquelle pourrait devenir un produit/levier business"]
          }
        },
        {
          slug: "api-styles",
          title: "Styles d'API : REST, GraphQL, gRPC, webhooks",
          summary: "Les grands styles d'API, leurs forces, et comment choisir selon le besoin.",
          content: "<h4>REST — le standard du web</h4><p><strong>REST</strong> manipule des <em>ressources</em> identifiées par des URL (/clients/42/commandes) via les verbes HTTP : GET (lire), POST (créer), PUT/PATCH (modifier), DELETE (supprimer). Universel, simple, parfaitement outillé et caché-able. Limite : on récupère parfois trop de données (over-fetching) ou il faut multiplier les appels (under-fetching).</p><h4>GraphQL — le client demande exactement ce qu'il veut</h4><p>Avec <strong>GraphQL</strong>, le client décrit en une requête les champs précis qu'il souhaite, à travers plusieurs ressources. Idéal pour des fronts riches aux besoins variés (mobile vs web). Coût : serveur plus complexe, cache et monitoring moins évidents, risque de requêtes trop lourdes.</p><h4>gRPC — la performance entre services</h4><p><strong>gRPC</strong> est un protocole binaire rapide et fortement typé, surtout utilisé <em>entre services back</em>. Pas destiné au navigateur. À réserver à la communication interne où la performance compte.</p><h4>Webhooks — l'API qui vous appelle</h4><p>Au lieu d'interroger sans cesse « y a-t-il du nouveau ? » (polling), un <strong>webhook</strong> inverse le flux : le système distant <em>vous</em> notifie quand un événement survient (ex : « paiement reçu »). Économe et réactif, mais impose de gérer les ré-essais et la sécurité de la réception.</p><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Style</th><th>Idéal pour</th><th>À éviter quand</th></tr></thead><tbody><tr><td>REST</td><td>API publiques, CRUD, large interopérabilité</td><td>Besoins de données très variables par écran</td></tr><tr><td>GraphQL</td><td>Fronts riches, agrégation de sources</td><td>API simple, équipe peu outillée</td></tr><tr><td>gRPC</td><td>Communication interne haute performance</td><td>Exposition directe au navigateur</td></tr><tr><td>Webhooks</td><td>Notifier un événement à un tiers</td><td>Besoin d'une réponse immédiate</td></tr></tbody></table></div><div class='callout callout-warn'><strong>Piège :</strong> tout passer en GraphQL « parce que c'est moderne » est un anti-pattern (golden hammer). Le style se choisit selon le besoin du consommateur, pas selon la mode.</div>",
          keyPoints: ["REST : universel, ressources + verbes HTTP, le défaut raisonnable", "GraphQL : le client choisit ses champs — puissant pour fronts riches", "gRPC : interne, binaire, haute perf, pas pour le navigateur", "Webhooks : le tiers vous notifie d'un événement (vs polling)"],
          exercise: {
            title: "Choisir le bon style d'API pour 4 besoins",
            brief: "Pour quatre besoins concrets, choisissez et justifiez un style d'API, puis modélisez les flux.",
            steps: [
              "Besoin 1 : une app mobile très contrainte en bande passante affiche un tableau de bord agrégé.",
              "Besoin 2 : un partenaire veut être prévenu dès qu'une commande est expédiée.",
              "Besoin 3 : deux microservices internes échangent à très haute fréquence.",
              "Besoin 4 : une API publique CRUD pour gérer des contacts.",
              "Dans Schémas & Workflows, modélisez chaque flux et annotez le style retenu + une phrase de justification."
            ],
            deliverable: "Quatre flux modélisés, chacun avec son style d'API et sa justification.",
            checklist: ["Chaque choix est justifié par le besoin du consommateur", "Le besoin 2 utilise bien un webhook (push, pas polling)", "Le besoin 3 envisage gRPC (interne, perf)", "Aucun style n'a été appliqué par défaut sans raison"]
          }
        },
        {
          slug: "api-conception",
          title: "Concevoir un bon contrat d'API",
          summary: "Ressources, payloads, codes d'erreur, pagination, idempotence : ce qui fait une API utilisable.",
          content: "<h4>Nommer les ressources clairement</h4><p>Une bonne API REST se lit comme une phrase. On nomme des <em>ressources</em> au pluriel et on laisse les verbes HTTP exprimer l'action : <code>GET /commandes/42</code>, <code>POST /commandes</code>, <code>DELETE /commandes/42</code>. On évite les verbes dans l'URL (<code>/getCommande</code>, <code>/creerCommande</code>) : c'est le rôle de la méthode HTTP.</p><h4>Des payloads explicites et stables</h4><p>Le <strong>payload</strong> (le corps JSON échangé) doit être prévisible : noms de champs clairs, types cohérents, dates au format standard (ISO 8601), identifiants stables. Évitez les champs ambigus (un <code>status</code> qui vaut tantôt un nombre, tantôt un texte).</p><h4>Les codes d'erreur, ça se conçoit</h4><p>Une API utilisable répond avec des <strong>codes HTTP</strong> justes : 200 (ok), 201 (créé), 400 (requête invalide), 401 (non authentifié), 403 (interdit), 404 (introuvable), 409 (conflit), 422 (validation), 429 (trop de requêtes), 500 (erreur serveur). Et un corps d'erreur qui explique <em>pourquoi</em> et <em>comment corriger</em>, pas juste « error ».</p><h4>Pagination, filtrage, tri</h4><p>Une collection ne se renvoie jamais en entier : on <strong>pagine</strong> (limit/offset ou curseur). Sans pagination, le premier gros client fait tomber l'API. Prévoyez aussi filtres et tri dès la conception.</p><h4>Idempotence : pouvoir réessayer sans danger</h4><p>Sur le web, une requête peut être renvoyée deux fois (réseau instable, retry). Une opération <strong>idempotente</strong> donne le même résultat qu'on l'exécute une ou plusieurs fois. GET et DELETE le sont par nature ; pour POST (ex : un paiement), on utilise une <em>clé d'idempotence</em> pour éviter de débiter deux fois.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> les messages d'erreur d'une API sont une partie de l'expérience développeur. « 400 Bad Request » sans explication génère des tickets de support ; « le champ email est invalide » fait gagner du temps à tout le monde.</div>",
          keyPoints: ["Ressources au pluriel + verbes HTTP, pas de verbes dans l'URL", "Payloads explicites : types cohérents, dates ISO 8601, IDs stables", "Codes d'erreur justes + message expliquant comment corriger", "Toujours paginer les collections", "Idempotence (clé d'idempotence) pour réessayer sans double effet"],
          exercise: {
            title: "Rédiger et valider le payload d'une API de commande",
            brief: "Concevez le contrat d'un endpoint de création de commande, puis validez vos payloads avec JSON & UUID Tools.",
            steps: [
              "Définissez l'endpoint POST /commandes : quels champs en entrée (client, lignes, adresse) ?",
              "Rédigez un exemple de payload JSON de requête et un de réponse (avec un identifiant de commande).",
              "Listez les codes de réponse : succès (201) et au moins trois cas d'erreur (400, 409, 422).",
              "Ouvrez JSON & UUID Tools, collez vos payloads et validez/formatez le JSON ; générez un UUID pour l'identifiant de commande.",
              "Ajoutez une clé d'idempotence à votre requête et expliquez le scénario qu'elle protège."
            ],
            deliverable: "Le contrat d'un endpoint de commande : payloads requête/réponse valides, codes d'erreur, clé d'idempotence.",
            checklist: ["Le JSON est valide (vérifié dans l'outil)", "Les dates sont en ISO 8601 et les IDs sont des UUID", "Au moins 3 cas d'erreur sont documentés avec un message clair", "La clé d'idempotence protège un scénario réel (double soumission)"],
            app: { name: "JSON & UUID Tools", file: "../accelerators/html/json-uuid-tools.html" }
          }
        },
        {
          slug: "api-versioning",
          title: "Versioning & évolution sans rupture",
          summary: "Changements compatibles ou cassants, stratégies de version et dépréciation maîtrisée.",
          content: "<h4>Compatible vs cassant</h4><p>La distinction fondamentale :</p><ul><li><strong>Changement compatible (ascendant)</strong> — n'impacte aucun consommateur existant : <em>ajouter</em> un champ optionnel, ajouter un endpoint, ajouter une valeur d'énumération tolérée. On peut le faire en continu.</li><li><strong>Changement cassant</strong> — casse les consommateurs : <em>supprimer</em> ou <em>renommer</em> un champ, changer un type, rendre obligatoire un champ qui ne l'était pas, modifier le sens d'une réponse.</li></ul><h4>Stratégies de versioning</h4><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Stratégie</th><th>Exemple</th><th>Remarque</th></tr></thead><tbody><tr><td>Dans l'URL</td><td>/v2/commandes</td><td>Le plus lisible et répandu</td></tr><tr><td>Dans un header</td><td>Accept: application/vnd.api.v2+json</td><td>Plus propre, moins visible</td></tr><tr><td>Par champ</td><td>?version=2</td><td>Simple mais facile à oublier</td></tr></tbody></table></div><h4>Dépréciation maîtrisée</h4><p>On ne coupe jamais une version du jour au lendemain. Le cycle sain : <strong>annoncer</strong> la dépréciation → laisser une <strong>période de migration</strong> (souvent 6-12 mois) → <strong>communiquer</strong> via la doc et des en-têtes (<code>Deprecation</code>, <code>Sunset</code>) → mesurer qui utilise encore l'ancienne → <strong>couper</strong>. Cela suppose de savoir <em>qui</em> consomme quoi.</p><div class='callout callout-warn'><strong>Anti-pattern :</strong> multiplier les versions (v1, v2, v3, v4) qu'il faut toutes maintenir. Chaque version vivante est un coût. Mieux vaut peu de versions et une politique de dépréciation claire.</div><div class='callout callout-tip'><strong>Réflexe PO :</strong> une dépréciation d'API est un mini-projet produit : communication, accompagnement, deadline. Traitez vos consommateurs (internes ou externes) comme des clients qu'on aide à migrer, pas qu'on prévient au dernier moment.</div>",
          keyPoints: ["Ajouter = compatible ; supprimer/renommer/retyper = cassant", "Un changement cassant impose une nouvelle version", "Versioning par URL (/v2) = le plus lisible", "Dépréciation = annoncer, laisser le temps, mesurer, puis couper", "Chaque version maintenue est un coût : en limiter le nombre"],
          exercise: {
            title: "Planifier l'évolution d'une API sans casser les clients",
            brief: "On doit faire évoluer une API de paiement. Classez les changements demandés et proposez un plan de version + dépréciation.",
            steps: [
              "Listez ces changements : (a) ajouter un champ optionnel devise, (b) renommer montant en amount, (c) rendre obligatoire le champ client, (d) ajouter un nouvel endpoint de remboursement.",
              "Classez chacun en compatible ou cassant.",
              "Regroupez les changements cassants dans une nouvelle version (v2) ; livrez les compatibles directement en v1.",
              "Dans Schémas & Workflows, modélisez v1 et v2 cohabitant derrière une Gateway, avec les consommateurs routés.",
              "Rédigez le plan de dépréciation de v1 : annonce, durée, communication, condition de coupure."
            ],
            deliverable: "Un plan d'évolution : classement des changements, schéma v1/v2 cohabitant, calendrier de dépréciation.",
            checklist: ["(a) et (d) sont identifiés comme compatibles, (b) et (c) comme cassants", "Les changements cassants sont isolés dans v2", "v1 et v2 cohabitent le temps de la migration", "Le plan de dépréciation a une condition de coupure mesurable (ex : <1% du trafic)"]
          }
        },
        {
          slug: "api-securite-gouvernance",
          title: "Sécurité, quotas & gouvernance d'API",
          summary: "Authentification, autorisation, rate-limiting, documentation et gestion du cycle de vie.",
          content: "<h4>Authentification vs autorisation</h4><p>Deux notions à ne pas confondre : l'<strong>authentification</strong> vérifie <em>qui</em> vous êtes ; l'<strong>autorisation</strong> vérifie ce que vous avez le <em>droit</em> de faire. Une API protégée fait les deux.</p><p>Mécanismes courants : <strong>clés d'API</strong> (simple, pour du serveur à serveur), <strong>OAuth 2.0 / OpenID Connect</strong> (standard pour déléguer l'accès au nom d'un utilisateur), <strong>JWT</strong> (jeton signé porté à chaque requête). Le PO n'implémente pas, mais doit savoir qu'« ouvrir une API » implique de décider qui peut y accéder et avec quels droits.</p><h4>Quotas & rate-limiting</h4><p>Une API publique sans <strong>limite de débit</strong> (rate-limiting) est à la merci du premier client qui boucle ou d'une attaque. On définit des quotas (ex : 1000 requêtes/min) renvoyant un code 429 au-delà. Les quotas sont aussi un <em>levier produit</em> : un palier gratuit limité, un palier payant plus large.</p><h4>La documentation, première interface</h4><p>Pour un développeur, la doc <em>est</em> l'API. Le standard <strong>OpenAPI</strong> (anciennement Swagger) décrit le contrat dans un format lisible par les humains et les machines — il génère doc interactive, SDK clients et tests. Une API non documentée est, en pratique, inutilisable.</p><h4>Gouvernance & cycle de vie</h4><p>À l'échelle, on gouverne un <em>portefeuille</em> d'API : conventions de nommage communes, catalogue centralisé, processus de revue avant publication, métriques d'usage, et politique de versions. Sans gouvernance, chaque équipe réinvente sa propre grammaire et l'écosystème devient incohérent.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> rate-limits et paliers d'accès sont des décisions produit (modèle freemium, SLA partenaires). Ne les laissez pas se décider uniquement en backend : ils façonnent l'offre.</div>",
          keyPoints: ["Authentification (qui) ≠ autorisation (quels droits)", "Rate-limiting protège l'API et structure l'offre (paliers)", "OpenAPI : la doc lisible humains + machines, indispensable", "À l'échelle : gouvernance (conventions, catalogue, revue, métriques)"],
          exercise: {
            title: "Définir la politique d'accès d'une API publique",
            brief: "Vous lancez une API publique en modèle freemium. Concevez sa politique d'accès, ses paliers et sa gouvernance minimale.",
            steps: [
              "Choisissez le mécanisme d'authentification (clé d'API ? OAuth ?) et justifiez.",
              "Définissez 2 ou 3 paliers (ex : Free, Pro, Enterprise) avec leurs quotas de rate-limiting.",
              "Dans Schémas & Workflows, modélisez la Gateway qui authentifie, applique les quotas et route vers les services.",
              "Listez ce que doit contenir la doc minimale (auth, endpoints, erreurs, exemples).",
              "Définissez une règle de gouvernance : qui valide la mise en ligne d'une nouvelle API et selon quels critères."
            ],
            deliverable: "Une politique d'accès complète : auth, paliers/quotas, schéma de la Gateway, exigences de doc et règle de gouvernance.",
            checklist: ["Le mécanisme d'auth est adapté au public visé", "Les paliers relient quotas techniques et offre commerciale", "La Gateway centralise auth + rate-limiting dans le schéma", "Une règle de gouvernance claire encadre la publication"]
          }
        }
      ]
    },

    // ============================================================
    //  TECHNIQUE — Données & modélisation pour PO
    // ============================================================
    "donnees-modelisation": {
      title: "Données & modélisation pour PO",
      icon: "&#128451;",
      color: "#06b6d4",
      track: "Technique",
      level: "Intermédiaire",
      duration: "3 à 4 h",
      defaultApp: APP.schemas,
      tagline: "Lire un modèle de données, en parler juste, et protéger la donnée.",
      description: "La donnée est l'actif le plus durable d'un produit : les écrans changent, les données restent. Ce cours apprend au PO à lire et challenger un modèle de données (entités, relations, cardinalités), à distinguer état et événement, à raisonner qualité, cycle de vie et conformité (RGPD), sans devenir DBA.",
      intro: "<p>Un PO qui ne comprend pas le modèle de données de son produit avance à l'aveugle : il sous-estime les impacts, propose des features impossibles, ou découvre trop tard qu'une donnée critique n'a jamais été collectée.</p><p>Ce cours ne fait pas de vous un architecte de bases de données. Il vous apprend à <strong>lire un schéma</strong>, à parler juste avec les développeurs (entité, relation, cardinalité, clé), à raisonner sur la <strong>qualité</strong> et le <strong>cycle de vie</strong> de la donnée, et à intégrer la <strong>conformité</strong> dès la conception.</p><p>Les exercices se font dans <strong>Schémas &amp; Workflows</strong> pour modéliser entités et flux de données.</p>",
      chapters: [
        {
          slug: "donnees-pourquoi",
          title: "Pourquoi la donnée est l'actif le plus durable",
          summary: "La donnée survit aux écrans et aux refontes : enjeux, dette de données et rôle du PO.",
          content: "<h4>Les écrans passent, la donnée reste</h4><p>On refait une interface tous les deux ou trois ans. On migre rarement une base de données : elle accumule des années d'historique, des intégrations, des rapports. <strong>La donnée est l'actif le plus durable et le plus risqué</strong> d'un produit. Une mauvaise décision de modélisation vous suit longtemps.</p><h4>La dette de données</h4><p>Comme il existe une dette technique, il existe une <strong>dette de données</strong> : des champs fourre-tout, des doublons, des statuts incohérents, des données jamais nettoyées. Elle se paie en bugs, en rapports faux et en features bloquées. « On ne peut pas faire cette segmentation parce que cette info n'a jamais été stockée proprement » est une phrase qui coûte cher.</p><h4>Donnée = décisions</h4><p>Vos métriques, votre reporting, votre personnalisation, votre IA : tout repose sur la donnée disponible et sa qualité. Si la donnée n'est pas collectée, structurée et fiable, aucune analyse ne la fera apparaître après coup.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> pour chaque feature, demandez-vous « quelles données vais-je créer, et de quelles données ai-je besoin que je ne collecte peut-être pas encore ? ». La donnée se conçoit en amont, pas une fois la feature livrée.</div>",
          keyPoints: ["La donnée survit aux refontes : c'est l'actif le plus durable", "La dette de données bloque des features et fausse les rapports", "Si une donnée n'est pas collectée, aucune analyse ne la recrée", "Penser données en amont de chaque feature"],
          exercise: {
            title: "Inventaire des données d'une feature",
            brief: "Prenez une feature récente de votre produit et faites l'inventaire des données qu'elle crée et consomme.",
            steps: [
              "Décrivez la feature en une phrase.",
              "Dans Schémas & Workflows, listez les données qu'elle CRÉE (nouvelles entités/champs).",
              "Listez les données dont elle a BESOIN et qui existent déjà.",
              "Identifiez une donnée utile pour le futur (analyse, segmentation) qui n'est pas collectée aujourd'hui.",
              "Notez un risque de dette de données potentiel (champ ambigu, doublon, statut flou)."
            ],
            deliverable: "Un inventaire des données créées/consommées par la feature + un manque et un risque identifiés.",
            checklist: ["Les données créées et consommées sont distinguées", "Au moins une donnée manquante pour le futur est repérée", "Un risque concret de dette de données est nommé", "Vous pouvez expliquer l'impact business d'une de ces données"]
          }
        },
        {
          slug: "donnees-modele",
          title: "Lire un modèle : entités, relations, cardinalités",
          summary: "Le vocabulaire de la modélisation pour dialoguer avec les développeurs.",
          content: "<h4>Entités et attributs</h4><p>Une <strong>entité</strong> est une chose métier qu'on veut mémoriser : un Client, une Commande, un Produit. Ses <strong>attributs</strong> sont ses caractéristiques : un Client a un nom, un email, une date d'inscription. Une entité devient en général une table ; ses attributs, des colonnes.</p><h4>Identifiants (clés)</h4><p>Chaque entité a une <strong>clé primaire</strong> qui l'identifie de façon unique (un id, souvent un UUID). Une <strong>clé étrangère</strong> est une référence vers une autre entité : une Commande porte l'id du Client qui l'a passée. C'est ainsi qu'on relie les données.</p><h4>Relations et cardinalités</h4><p>Les entités sont reliées. La <strong>cardinalité</strong> précise « combien » :</p><div class='course-table-wrap'><table class='course-table'><thead><tr><th>Relation</th><th>Exemple</th></tr></thead><tbody><tr><td><strong>1 - 1</strong> (un à un)</td><td>Un utilisateur a un profil</td></tr><tr><td><strong>1 - N</strong> (un à plusieurs)</td><td>Un client a plusieurs commandes</td></tr><tr><td><strong>N - N</strong> (plusieurs à plusieurs)</td><td>Un produit appartient à plusieurs catégories, une catégorie contient plusieurs produits</td></tr></tbody></table></div><p>Les relations N-N se matérialisent par une <em>table de liaison</em>. Savoir lire ces cardinalités vous permet de comprendre instantanément ce que le produit autorise : « un compte peut-il avoir plusieurs utilisateurs ? » est une question de cardinalité aux conséquences produit majeures.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> beaucoup de débats produit sont en fait des questions de cardinalité. « Un utilisateur peut-il appartenir à plusieurs organisations ? » change le modèle, les écrans, la facturation. Tranchez-le tôt, explicitement.</div>",
          keyPoints: ["Entité = chose métier mémorisée ; attribut = sa caractéristique", "Clé primaire (identifie) et clé étrangère (relie les entités)", "Cardinalités : 1-1, 1-N, N-N (table de liaison)", "Beaucoup de décisions produit sont des choix de cardinalité"],
          exercise: {
            title: "Modéliser les entités d'un domaine métier",
            brief: "Modélisez le cœur d'un domaine (e-commerce, SaaS, marketplace…) sous forme d'entités et de relations.",
            steps: [
              "Choisissez un domaine et listez 5 à 6 entités principales (ex : Client, Commande, Produit, Catégorie, Paiement).",
              "Dans Schémas & Workflows, placez chaque entité comme un bloc et indiquez 2-3 attributs clés en sous-titre.",
              "Reliez les entités et annotez chaque liaison avec sa cardinalité (1-N, N-N…).",
              "Identifiez les relations N-N et notez qu'elles nécessitent une table de liaison.",
              "Posez et tranchez une question de cardinalité ambiguë (ex : un produit peut-il être dans plusieurs catégories ?)."
            ],
            deliverable: "Un modèle d'entités-relations annoté de cardinalités, avec une décision de cardinalité explicitée.",
            checklist: ["Chaque entité a une clé et quelques attributs", "Chaque relation porte une cardinalité explicite", "Les relations N-N sont identifiées", "Une décision de cardinalité à impact produit est tranchée et justifiée"]
          }
        },
        {
          slug: "donnees-etat-evenement",
          title: "État vs événement, normalisation & dénormalisation",
          summary: "Stocker l'état courant ou l'historique des faits, et l'arbitrage normalisation/performance.",
          content: "<h4>État vs événement</h4><p>Deux façons de penser la donnée :</p><ul><li><strong>L'état</strong> : la photo actuelle. « La commande 42 est au statut <em>expédiée</em>. » Simple, mais on perd l'histoire.</li><li><strong>L'événement</strong> : le journal des faits. « Commande créée à 10h, payée à 10h05, expédiée à 14h. » On garde tout l'historique, on peut tout reconstituer et auditer.</li></ul><p>Beaucoup de besoins produit (audit, analytics, undo, traçabilité réglementaire) exigent les événements. Si vous ne stockez que l'état, vous ne pourrez jamais répondre à « combien de temps entre paiement et expédition le mois dernier ? ».</p><h4>Normalisation : une seule source de vérité</h4><p><strong>Normaliser</strong>, c'est éviter de dupliquer une donnée : l'adresse du client est stockée une fois, et les commandes la référencent. Avantage : pas d'incohérence (on corrige à un seul endroit). C'est le défaut sain pour les données métier.</p><h4>Dénormalisation : dupliquer pour aller vite</h4><p><strong>Dénormaliser</strong>, c'est accepter de la duplication pour gagner en performance de lecture (ex : recopier le nom du produit dans la ligne de commande). Risque : les copies divergent. On le fait sciemment, pour des raisons de performance, jamais par négligence.</p><div class='callout callout-warn'><strong>Cas classique :</strong> faut-il figer le prix dans la commande (dénormalisation volontaire) ou pointer vers le prix actuel du produit (normalisé) ? Réponse produit : on <em>fige</em> le prix au moment de l'achat — sinon une hausse de prix réécrirait l'historique des commandes. Ici la dénormalisation est correcte.</div><div class='callout callout-tip'><strong>Réflexe PO :</strong> « garde-t-on l'historique ? » est une question produit, pas technique. Tranchez-la explicitement pour les données sensibles (prix, statuts, consentements).</div>",
          keyPoints: ["État = photo actuelle ; Événement = journal des faits (historique)", "Sans événements, pas d'audit ni d'analyse temporelle a posteriori", "Normaliser = une source de vérité, pas de duplication (défaut sain)", "Dénormaliser = duplication assumée pour la performance ou l'historique figé"],
          exercise: {
            title: "Concevoir l'historique d'un cycle de vie de commande",
            brief: "Modélisez le suivi d'une commande en gardant l'historique de ses statuts, et tranchez un cas de dénormalisation.",
            steps: [
              "Dans Schémas & Workflows, posez l'entité Commande (état courant) et une entité ÉvénementCommande (journal des changements de statut).",
              "Reliez-les (1-N : une commande a plusieurs événements) et listez 3-4 types d'événements (créée, payée, expédiée, livrée).",
              "Ajoutez l'entité LigneCommande et décidez : on fige le prix au moment de l'achat ou on pointe le prix produit ? Justifiez.",
              "Annotez quelles données sont normalisées et lesquelles sont dénormalisées volontairement.",
              "Notez une question produit que l'historique permet désormais de répondre."
            ],
            deliverable: "Un modèle commande avec journal d'événements et un arbitrage de dénormalisation justifié.",
            checklist: ["L'historique des statuts est capturé via des événements", "La relation Commande-Événements est en 1-N", "Le prix figé vs prix courant est tranché et justifié", "Vous citez une analyse rendue possible par l'historique"]
          }
        },
        {
          slug: "donnees-qualite",
          title: "Qualité, cohérence & cycle de vie de la donnée",
          summary: "Dimensions de qualité, sources de vérité, et que devient une donnée dans le temps.",
          content: "<h4>Les dimensions de la qualité</h4><p>Une donnée « de qualité » l'est selon plusieurs axes : <strong>exactitude</strong> (elle est juste), <strong>complétude</strong> (pas de trous), <strong>cohérence</strong> (pas de contradiction entre systèmes), <strong>fraîcheur</strong> (à jour), <strong>unicité</strong> (pas de doublon). Un CRM plein de doublons et d'emails périmés est un problème de qualité, pas de quantité.</p><h4>La source de vérité</h4><p>Quand une même donnée existe à plusieurs endroits (CRM, facturation, support), il faut désigner une <strong>source de vérité</strong> : le système qui fait foi. Sans cela, trois services affichent trois adresses différentes pour le même client, et personne ne sait laquelle est bonne. C'est une décision de gouvernance que le PO doit souvent porter.</p><h4>Le cycle de vie d'une donnée</h4><p>Une donnée naît, vit, et doit mourir : <strong>création → utilisation → archivage → suppression</strong>. Trop de produits ne gèrent que la création. Or garder indéfiniment des données est un risque (sécurité, conformité) et un coût. La question « combien de temps garde-t-on cette donnée, et que se passe-t-il ensuite ? » fait partie de la conception.</p><h4>Validation à l'entrée</h4><p>La meilleure façon d'avoir des données propres est de <strong>valider à la saisie</strong> : format d'email, champs obligatoires, valeurs cohérentes. Nettoyer après coup coûte dix fois plus cher que d'empêcher l'erreur à l'entrée.</p><div class='callout callout-tip'><strong>Réflexe PO :</strong> désignez explicitement la source de vérité pour vos données clés et la durée de conservation. Ce sont des décisions produit qui évitent des mois de débats et de bugs de synchronisation.</div>",
          keyPoints: ["Qualité = exactitude, complétude, cohérence, fraîcheur, unicité", "Désigner une source de vérité par donnée partagée", "Cycle de vie complet : création → usage → archivage → suppression", "Valider à l'entrée coûte 10× moins que nettoyer après coup"],
          exercise: {
            title: "Définir la gouvernance d'une donnée client partagée",
            brief: "La donnée « client » existe dans plusieurs systèmes. Définissez sa source de vérité, ses règles de qualité et son cycle de vie.",
            steps: [
              "Dans Schémas & Workflows, placez 3 systèmes qui détiennent la donnée client (ex : CRM, Facturation, Support).",
              "Désignez la source de vérité et modélisez le sens de synchronisation des autres.",
              "Listez 3 règles de validation à l'entrée (ex : email valide, téléphone normalisé, pays dans une liste).",
              "Définissez la durée de conservation et ce qui déclenche l'archivage puis la suppression.",
              "Identifiez le risque principal si la source de vérité n'est pas respectée."
            ],
            deliverable: "Une fiche de gouvernance de la donnée client : source de vérité, sync, règles de qualité, cycle de vie.",
            checklist: ["Une seule source de vérité est désignée", "Le sens de synchronisation est clair (qui copie depuis qui)", "Les règles de validation sont concrètes et vérifiables", "Une durée de conservation et une fin de vie sont définies"]
          }
        },
        {
          slug: "donnees-rgpd",
          title: "Données personnelles, RGPD & privacy by design",
          summary: "Catégoriser les données, intégrer la conformité dès la conception, et les droits des personnes.",
          content: "<h4>Toutes les données ne se valent pas</h4><p>Une <strong>donnée personnelle</strong> permet d'identifier une personne (nom, email, IP, identifiant). Certaines sont <strong>sensibles</strong> (santé, opinions, orientation) et très encadrées. Un PO doit savoir catégoriser : une adresse email n'a pas le même régime qu'un identifiant de session anonyme.</p><h4>Les principes RGPD qui touchent le produit</h4><ul><li><strong>Minimisation</strong> — ne collecter que ce dont on a réellement besoin. Collecter « au cas où » est interdit.</li><li><strong>Finalité</strong> — chaque donnée est collectée pour un usage déclaré ; on ne la réutilise pas pour autre chose sans base légale.</li><li><strong>Consentement</strong> — pour beaucoup d'usages (marketing, tracking), il faut un consentement explicite et révocable.</li><li><strong>Limitation de conservation</strong> — on ne garde pas indéfiniment (rejoint le cycle de vie du chapitre précédent).</li></ul><h4>Les droits des personnes</h4><p>Le RGPD donne des droits concrets qui deviennent des <em>features</em> : droit d'<strong>accès</strong> (exporter ses données), de <strong>rectification</strong>, à l'<strong>effacement</strong> (« droit à l'oubli »), à la <strong>portabilité</strong>. « Permettre à un utilisateur de supprimer son compte et toutes ses données » n'est pas optionnel : c'est une obligation qui doit être pensée dans le modèle de données.</p><h4>Privacy by design</h4><p>La conformité ne se rajoute pas à la fin : on la conçoit <strong>dès le départ</strong>. Pseudonymiser quand c'est possible, séparer les données identifiantes, prévoir la suppression en cascade. Si l'effacement d'un utilisateur n'a pas été pensé dans le modèle, le « droit à l'oubli » devient un cauchemar technique.</p><div class='callout callout-warn'><strong>Attention :</strong> la dénormalisation (chapitre 3) complique l'effacement : si l'email d'un client a été recopié dans 5 tables, le supprimer partout devient difficile. Conformité et modélisation sont liées.</div><div class='callout callout-tip'><strong>Réflexe PO :</strong> pour toute nouvelle donnée personnelle, posez les 4 questions : en ai-je besoin (minimisation) ? pour quoi (finalité) ? combien de temps (conservation) ? comment l'utilisateur la supprime-t-il (effacement) ?</div>",
          keyPoints: ["Catégoriser : donnée personnelle, sensible, ou anonyme", "Principes produit : minimisation, finalité, consentement, conservation limitée", "Les droits RGPD (accès, effacement, portabilité) sont des features obligatoires", "Privacy by design : prévoir l'effacement et la pseudonymisation dès le modèle"],
          exercise: {
            title: "Auditer un modèle de données sous l'angle RGPD",
            brief: "Reprenez un modèle de données (celui d'un exercice précédent) et auditez-le pour la conformité et le droit à l'effacement.",
            steps: [
              "Dans Schémas & Workflows, repartez d'un modèle d'entités contenant des données client.",
              "Marquez chaque donnée : personnelle, sensible ou anonyme.",
              "Pour chaque donnée personnelle, notez sa finalité et sa durée de conservation.",
              "Tracez le parcours du droit à l'effacement : quand un utilisateur demande la suppression, quelles entités/copies faut-il purger (attention aux données dénormalisées) ?",
              "Identifiez une donnée collectée sans réel besoin (à supprimer par minimisation)."
            ],
            deliverable: "Un modèle annoté RGPD : catégories, finalités, conservation, et le parcours d'effacement complet.",
            checklist: ["Chaque donnée est catégorisée (personnelle/sensible/anonyme)", "Les données personnelles ont une finalité et une durée", "Le parcours d'effacement couvre toutes les copies, y compris dénormalisées", "Au moins une donnée superflue est identifiée (minimisation)"]
          }
        }
      ]
    }

  };

  root.FORMATION_DATA = Object.assign({}, root.FORMATION_DATA || {}, FORMATION_EXTRA);
})();
