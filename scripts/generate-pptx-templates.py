"""Régénère les templates PowerPoint du PO Toolkit dans la charte « Atelier chaleureux ».

Fichiers produits dans accelerators/pptx/ :
  product-canvas.pptx, sprint-review-template.pptx,
  definition-of-ready-done.pptx, stakeholder-mapping.pptx

Usage : python scripts/generate-pptx-templates.py
"""
from pathlib import Path

from pptx_style import (
    ACCENT, ACCENT_SOFT, BLUE, BLUE_SOFT, INK, LINE, MUTED, PAPER, PLUM, PLUM_SOFT, SAGE, SAGE_SOFT,
    SAND, SAND_SOFT, STOP, WHITE, MSO_ANCHOR, MSO_SHAPE, PP_ALIGN, Inches, background, blank, box, checkbox, footer,
    guide_slide, header, labeled_card, new_presentation, pill, text,
)

OUT = Path(__file__).resolve().parent.parent / "accelerators" / "pptx"


def hint(t):
    return [[(t, 9.5, MUTED, False)]]


def filled(lines):
    return [[(l, 10, INK, False)] for l in lines]


def table(slide, x, y, widths, heads, rows, row_h=0.5, head_fill=INK):
    tbl = slide.shapes.add_table(len(rows) + 1, len(heads), Inches(x), Inches(y), Inches(sum(widths)), Inches(row_h * (len(rows) + 1))).table
    for i, w in enumerate(widths):
        tbl.columns[i].width = Inches(w)
    for c, h in enumerate(heads):
        cell = tbl.cell(0, c)
        cell.fill.solid()
        cell.fill.fore_color.rgb = head_fill
        text(cell, [[(h, 10, WHITE, True)]], margin=0.08)
    for r, row in enumerate(rows, start=1):
        for c, v in enumerate(row):
            cell = tbl.cell(r, c)
            cell.fill.solid()
            cell.fill.fore_color.rgb = WHITE if r % 2 else PAPER
            text(cell, [[(v, 9.5, MUTED if v.startswith("[") else INK, False)]], margin=0.08)
    return tbl


# ============================================================
#  Product Canvas
# ============================================================
def product_canvas():
    name = "Product Canvas"
    prs = new_presentation()
    guide_slide(
        prs, name, "Product Canvas — Guide",
        "Un support visuel pour aligner l'équipe sur la vision, les utilisateurs et la proposition de valeur du produit.",
        why=["Aligner toute l'équipe sur la vision produit en un seul support.",
             "Forcer la réflexion sur les 10 dimensions clés du produit.",
             "Disposer d'une référence vivante, revue chaque trimestre.",
             "Faciliter l'intégration des nouveaux arrivants et le dialogue avec les parties prenantes."],
        how=["Atelier de 2 h avec le PO, les leads de l'équipe et quelques parties prenantes.",
             "Commencez par la vision (pourquoi le produit existe), puis 2 à 3 utilisateurs cibles concrets.",
             "Listez les 3 problèmes principaux, puis la proposition de valeur et les solutions clés.",
             "Terminez par les métriques de succès, les hypothèses à valider et les prochaines étapes."],
        tips=["La vision doit tenir en une phrase.",
              "Les métriques doivent guider des décisions : pas d'indicateurs de vanité.",
              "Marquez les hypothèses non prouvées : ce sont elles que la discovery doit tester.",
              "Revenez au canvas chaque trimestre : il n'est jamais « fini »."],
        contents="2. Canvas vierge   ·   3. Exemple complet (application de suivi du budget d'une banque en ligne)",
    )

    blocks = [
        ("Vision produit", ACCENT, "Quel changement durable voulons-nous créer ? Pourquoi ce produit existe-t-il ?"),
        ("Utilisateurs cibles", ACCENT, "Qui sont les 2 à 3 profils principaux ? Contexte, comportements, contraintes."),
        ("Problèmes et besoins", ACCENT, "Quels sont leurs 3 problèmes majeurs ? Quels « jobs » cherchent-ils à accomplir ?"),
        ("Proposition de valeur", SAGE, "Quelle valeur unique apportons-nous ? En quoi sommes-nous différents ?"),
        ("Solutions clés", SAGE, "Quelles fonctionnalités répondent aux problèmes ? Lesquelles sont différenciantes ?"),
        ("Avantage durable", SAGE, "Qu'est-ce qui est difficile à copier (données, réseau, intégration, marque) ?"),
        ("Métriques de succès", BLUE, "North Star : …   ·   Indicateur 1 : …   ·   Indicateur 2 : …   ·   Indicateur 3 : …"),
        ("Canaux et distribution", BLUE, "Comment les utilisateurs découvrent-ils le produit ? Par quels canaux l'adoptent-ils ?"),
        ("Hypothèses à valider", PLUM, "Hypothèse 1 : …   ·   Hypothèse 2 : …   ·   Hypothèse 3 : …"),
        ("Prochaines étapes", PLUM, "Action 1 : …   ·   Action 2 : …   ·   Action 3 : …"),
    ]

    def canvas(slide, contents):
        top, gap = 1.55, 0.12
        row_h = (6.95 - top - 3 * gap) / 4
        w3 = (12.1 - 2 * gap) / 3
        w2 = (12.1 - gap) / 2
        for i, (label, color, _) in enumerate(blocks):
            if i < 6:
                r, c, w = i // 3, i % 3, w3
            else:
                r, c, w = 2 + (i - 6) // 2, (i - 6) % 2, w2
            x = 0.6 + c * (w + gap)
            y = top + r * (row_h + gap)
            labeled_card(slide, x, y, w, row_h, label, color, contents[i])

    s = blank(prs)
    header(s, "Canvas", "Product Canvas — [Nom du produit]", "Complétez chaque bloc en atelier, puis consolidez. Date : [ … ]   ·   Version : [ … ]", label=name)
    canvas(s, [hint(b[2]) for b in blocks])

    s = blank(prs)
    header(s, "Exemple", "Product Canvas — « Mon Budget » (banque en ligne)", "Exemple fictif, pour illustrer le niveau de précision attendu dans chaque bloc.", label=f"{name} — Exemple")
    canvas(s, [
        filled(["Aider chaque client à comprendre et maîtriser ses dépenses sans effort, pour éviter les découverts subis."]),
        filled(["Jeunes actifs (25-35 ans), payés au mois, plusieurs abonnements.", "Familles qui gèrent un compte joint."]),
        filled(["Découvrent le découvert trop tard.", "Ne savent pas combien coûtent leurs abonnements.", "Catégorisation bancaire peu fiable."]),
        filled(["Voir en un coup d'œil ce qui reste à dépenser jusqu'à la paie, sans ressaisie ni tableur."]),
        filled(["Reste à vivre prévisionnel.", "Détection des abonnements.", "Alerte avant découvert (J-3)."]),
        filled(["Historique bancaire complet et catégorisation fiable, difficile à reproduire par une application tierce."]),
        filled(["North Star : clients actifs chaque semaine sur « Mon Budget ».", "Découverts subis −20 %  ·  Taux d'activation 40 %  ·  NPS de la fonctionnalité ≥ 40"]),
        filled(["Mise en avant sur l'écran d'accueil de l'application.", "Conseillers en agence  ·  e-mail après le premier découvert."]),
        filled(["Les clients agissent après une alerte (à tester en A/B).", "La catégorisation est jugée fiable à plus de 90 %."]),
        filled(["Prototype de l'alerte testé avec 8 clients (sprint 14).", "Mesure de la fiabilité de la catégorisation (sprint 15)."]),
    ])
    prs.save(OUT / "product-canvas.pptx")


# ============================================================
#  Sprint Review
# ============================================================
def sprint_review():
    name = "Sprint Review"
    prs = new_presentation()
    guide_slide(
        prs, name, "Sprint Review — Guide",
        "Un support structuré pour montrer la valeur livrée, recueillir des retours et décider de la suite.",
        why=["Donner un format constant et rapide aux Sprint Reviews.",
             "Structurer l'échange : objectif → résultats → démo → retours → suite.",
             "Transformer les retours des parties prenantes en décisions de backlog.",
             "Garder une trace des reviews, sprint après sprint."],
        how=["Avant : complétez les slides 3 à 6 (15 minutes de préparation).",
             "Slide 3 : l'objectif du sprint, s'il est atteint, et les chiffres clés.",
             "Slide 4 : la démo — montrez le produit en fonctionnement, pas des captures.",
             "Slide 5 : notez les retours en direct ; slide 6 : la suite et les risques."],
        tips=["La review dure 30 à 60 minutes, pas plus.",
              "Invitez les vrais utilisateurs et parties prenantes, pas seulement les managers.",
              "Parlez résultats (usage, indicateurs) avant de parler story points.",
              "Chaque retour retenu devient un élément de backlog dans la semaine."],
        contents="2. Couverture   ·   3. Objectif et résumé   ·   4. Démo   ·   5. Retours recueillis   ·   6. Prochaines étapes",
    )

    # Couverture
    s = blank(prs)
    background(s)
    box(s, 0, 0.08, 0.35, 7.42, fill=ACCENT, line=None, shape=MSO_SHAPE.RECTANGLE)
    text(s, [[("SPRINT REVIEW", 12, ACCENT, True)]], 1.1, 2.0, 8, 0.4)
    text(s, [[("Sprint [XX]", 44, INK, True)]], 1.1, 2.4, 8, 1.0)
    text(s, [[("Du [date de début] au [date de fin]", 18, MUTED, False)]], 1.1, 3.45, 8, 0.5)
    text(s, [[("Équipe [nom]   ·   Produit [nom]", 14, INK, False)]], 1.1, 4.1, 8, 0.4)
    goal = box(s, 8.6, 2.0, 4.1, 2.6, fill=ACCENT_SOFT, line=None, radius=0.06)
    text(goal, [[("OBJECTIF DU SPRINT", 10, ACCENT, True)], [("[Une phrase : le résultat visé pour les utilisateurs]", 15, INK, True)]], margin=0.25)
    footer(s, name)

    # Objectif et résumé
    s = blank(prs)
    header(s, "Objectif et résumé", "Sprint [XX] — ce que nous avons accompli", label=name)
    g = box(s, 0.6, 1.3, 12.1, 1.15, fill=ACCENT_SOFT, line=None)
    text(g, [[("OBJECTIF DU SPRINT", 9, ACCENT, True)], [("[Décrire l'objectif du sprint]", 15, INK, True)],
             [("Objectif atteint :   ☐ Oui    ☐ En partie    ☐ Non", 11, INK, False)]], margin=0.16)
    kpis = [("Stories terminées", "X / X", "terminées / prévues", SAGE),
            ("Indicateur produit", "[avant → après]", "[nom de l'indicateur]", BLUE),
            ("Bugs corrigés", "X", "dont X critiques", PLUM),
            ("Points livrés", "XX", "moyenne : XX", SAND)]
    for i, (label, value, sub, color) in enumerate(kpis):
        x = 0.6 + i * 3.06
        c = box(s, x, 2.65, 2.9, 1.5, fill=WHITE, line=LINE)
        text(c, [[(label.upper(), 9, color, True)], [(value, 22, INK, True)], [(sub, 9.5, MUTED, False)]], margin=0.16)
    labeled_card(s, 0.6, 4.35, 12.1, 2.55, "Faits marquants", INK,
                 [[("1.  [Ce qui a le plus compté pour les utilisateurs]", 12.5, MUTED, False)],
                  [("2.  [Une difficulté rencontrée et comment l'équipe l'a traitée]", 12.5, MUTED, False)],
                  [("3.  [Un apprentissage : donnée, retour utilisateur, surprise]", 12.5, MUTED, False)]], space_after=16)

    # Démo
    s = blank(prs)
    header(s, "Démo", "Ce que nous avons livré", "Montrez le produit en fonctionnement. Une ligne par story ou par fonctionnalité.", label=name)
    for i in range(3):
        y = 1.6 + i * 1.78
        c = box(s, 0.6, y, 12.1, 1.62, fill=WHITE, line=LINE)
        text(c, [[(f"US-00{i + 1}", 9, ACCENT, True)], [("[Titre de la story]", 14, INK, True)]], margin=0.16)
        text(s, [[("CE QUE NOUS MONTRONS", 8.5, SAGE, True)], [("[Parcours démontré, en une phrase]", 10, MUTED, False)]], 3.6, y + 0.12, 3.7, 1.3)
        text(s, [[("VALEUR POUR L'UTILISATEUR", 8.5, BLUE, True)], [("[Ce qui change pour lui]", 10, MUTED, False)]], 7.3, y + 0.12, 3.3, 1.3)
        pill(s, 10.85, y + 0.2, 1.6, 0.36, "Terminé", SAGE, size=10, align=PP_ALIGN.CENTER)
        box(s, 0.78, y + 1.02, 11.74, 0.01, fill=LINE, line=None, shape=MSO_SHAPE.RECTANGLE)
        text(s, [[("RETOURS EN SÉANCE   ", 8.5, PLUM, True), ("[ … ]", 10, MUTED, False)]], 0.72, y + 1.1, 11.8, 0.4)
    # Retours
    s = blank(prs)
    header(s, "Retours recueillis", "Ce que nous avons entendu", "À remplir pendant la review. Chaque retour reçoit une décision explicite.", label=name)
    table(s, 0.6, 1.6, [4.3, 2.2, 2.6, 3.0],
          ["Retour", "De qui", "Décision", "Élément de backlog"],
          [["[Ex. : « L'alerte arrive trop tard pour agir »]", "[Service client]", "[Backlog / à creuser / non retenu]", "[US-0XX]"]] + [["[ … ]", "[ … ]", "[ … ]", "[ … ]"]] * 6,
          row_h=0.62)

    # Prochaines étapes
    s = blank(prs)
    header(s, "Prochaines étapes", "Sprint [XX + 1]", label=name)
    labeled_card(s, 0.6, 1.3, 12.1, 1.1, "Objectif envisagé", ACCENT, [[("[Objectif du prochain sprint]", 14, INK, True)]], fill=ACCENT_SOFT, line=None)
    labeled_card(s, 0.6, 2.6, 5.95, 4.3, "Éléments prévus", SAGE,
                 [[(f"{i}.  [Titre] — [estimation]", 12.5, MUTED, False)] for i in range(1, 7)], space_after=14)
    labeled_card(s, 6.75, 2.6, 5.95, 4.3, "Risques et besoins d'aide", STOP,
                 [[("Risque 1 : [description]", 12.5, INK, False)], [("→ Mitigation : [action, responsable]", 12.5, MUTED, False)],
                  [("Risque 2 : [description]", 12.5, INK, False)], [("→ Mitigation : [action, responsable]", 12.5, MUTED, False)],
                  [("Besoin : [décision ou aide attendue des parties prenantes]", 12.5, INK, False)]], space_after=12)
    prs.save(OUT / "sprint-review-template.pptx")


# ============================================================
#  Definition of Ready / Done
# ============================================================
def dor_dod():
    name = "Definition of Ready / Done"
    prs = new_presentation()
    guide_slide(
        prs, name, "Definition of Ready et Definition of Done — Guide",
        "Deux checklists pour sécuriser le flux : ce qu'il faut pour commencer une story, et pour la déclarer terminée.",
        why=["La DoR évite de démarrer des stories floues, première source de retard.",
             "La DoD garantit un niveau de qualité constant, story après story.",
             "Elles alignent PO, développeurs et testeurs sur les attentes.",
             "Elles réduisent les allers-retours et les défauts en production."],
        how=["Imprimez les slides 2 et 3 en A3 et affichez-les dans l'espace de l'équipe.",
             "En affinage et en Sprint Planning, passez chaque story au crible de la DoR.",
             "Avant de déclarer une story terminée, vérifiez chaque point de la DoD.",
             "Adaptez les critères à votre contexte et révisez-les en rétrospective."],
        tips=["Commencez court (5 à 7 critères) et enrichissez progressivement.",
              "La DoR est portée par le PO, la DoD par toute l'équipe.",
              "Une story qui ne passe pas la DoR n'entre pas dans le sprint.",
              "La DoD s'applique à chaque story, sans exception."],
        contents="2. Definition of Ready (affiche A3)   ·   3. Definition of Done (affiche A3)",
    )

    def checklist(slide, groups):
        col_w = 5.95
        for gi, (group, color, items) in enumerate(groups):
            x = 0.6 + (gi % 2) * (col_w + 0.2) if len(groups) == 2 else 0.6 + gi * 4.1
            w = col_w if len(groups) == 2 else 3.9
            pill(slide, x, 1.6, w, 0.42, group, color, size=11.5)
            card = box(slide, x, 2.12, w, 4.75, fill=WHITE, line=LINE)
            step = 4.45 / len(items)
            for ii, item in enumerate(items):
                y = 2.3 + ii * step + (step - 0.5) / 2
                checkbox(slide, x + 0.2, y + 0.04, 0.22, color)
                text(slide, [[(item, 13 if len(groups) == 2 else 11.5, INK, False)]], x + 0.52, y - 0.06, w - 0.65, 0.7)

    s = blank(prs)
    header(s, "Checklist · affiche A3", "Definition of Ready (DoR)", "Une story est prête à entrer en sprint quand tous ces points sont vérifiés.", label=name)
    checklist(s, [
        ("Compréhension", ACCENT, [
            "La story suit le format « En tant que… je veux… afin de… ».",
            "L'équipe comprend le quoi et le pourquoi, pas seulement le comment.",
            "Les règles métier sont documentées et clarifiées avec le PO.",
            "Les critères d'acceptance sont écrits (Étant donné / Quand / Alors).",
            "La story respecte les critères INVEST.",
        ]),
        ("Préparation", SAGE, [
            "La story est estimée par l'équipe.",
            "Elle est assez petite pour être terminée dans le sprint.",
            "Les dépendances sont identifiées, levées ou planifiées.",
            "Les maquettes sont validées (si applicable).",
            "Les données de test sont identifiées.",
        ]),
    ])

    s = blank(prs)
    header(s, "Checklist · affiche A3", "Definition of Done (DoD)", "Une story est terminée quand tous ces points sont vérifiés. Pas de « presque fini ».", label=name)
    checklist(s, [
        ("Code et tests", ACCENT, [
            "Le code est revu et approuvé par au moins un pair.",
            "Les tests unitaires passent (couverture > XX %).",
            "Les tests d'intégration passent.",
            "Les tests de non-régression passent.",
        ]),
        ("Validation", SAGE, [
            "Tous les critères d'acceptance sont validés.",
            "L'interface est conforme aux maquettes validées.",
            "La documentation est à jour (si applicable).",
            "Le PO a validé la story en préproduction.",
        ]),
        ("Production et mesure", BLUE, [
            "La story est déployée en préproduction (ou en production derrière un feature flag).",
            "Le monitoring et le suivi d'usage sont en place.",
            "Aucun bug bloquant ou majeur n'est ouvert.",
            "Les notes de version sont prêtes.",
        ]),
    ])
    prs.save(OUT / "definition-of-ready-done.pptx")


# ============================================================
#  Stakeholder Map
# ============================================================
def stakeholder_map():
    name = "Stakeholder Map"
    prs = new_presentation()
    guide_slide(
        prs, name, "Stakeholder Map — Guide",
        "Une matrice pouvoir / intérêt pour adapter votre communication à chaque partie prenante.",
        why=["Identifier qui a du pouvoir et de l'intérêt pour votre produit.",
             "Adapter la fréquence et le format de communication à chaque profil.",
             "Éviter les surprises : une partie prenante puissante ignorée peut tout bloquer.",
             "Prioriser votre temps, la ressource la plus rare du PO."],
        how=["Listez toutes les parties prenantes, internes et externes.",
             "Évaluez leur pouvoir et leur intérêt de 1 à 10, puis placez-les dans la matrice.",
             "Définissez une stratégie par quadrant (slide 2).",
             "Construisez le plan de communication (slide 3) et révisez-le chaque trimestre."],
        tips=["Gérer de près : points réguliers, implication dans les décisions.",
              "Garder satisfait : informer de façon proactive, sans surprise.",
              "Garder informé : Sprint Reviews, notes de version, tableaux de bord.",
              "Effort minimal : information en libre-service (wiki, changelog)."],
        contents="2. Matrice pouvoir / intérêt   ·   3. Plan de communication (avec exemples)",
    )

    s = blank(prs)
    header(s, "Matrice", "Pouvoir / intérêt", "Placez chaque partie prenante dans un quadrant, puis appliquez la stratégie correspondante.", label=name)
    x0, y0, w, h, gap = 1.35, 1.75, 5.6, 2.45, 0.14
    quads = [
        (0, 0, "Garder satisfait", "Pouvoir fort · intérêt faible", "Informer de façon proactive, solliciter sur les décisions qui les touchent.", SAND, SAND_SOFT),
        (1, 0, "Gérer de près", "Pouvoir fort · intérêt fort", "Impliquer dans les décisions, points réguliers, pas de surprise.", ACCENT, ACCENT_SOFT),
        (0, 1, "Effort minimal", "Pouvoir faible · intérêt faible", "Information en libre-service, vérifier de temps en temps.", SAGE, SAGE_SOFT),
        (1, 1, "Garder informé", "Pouvoir faible · intérêt fort", "Sprint Reviews, notes de version, recueillir leurs retours.", BLUE, BLUE_SOFT),
    ]
    for c, r, title, sub, strat, color, soft in quads:
        x = x0 + c * (w + gap)
        y = y0 + r * (h + gap)
        q = box(s, x, y, w, h, fill=soft, line=None, radius=0.05)
        text(q, [[(title.upper(), 11, color, True)], [(sub, 9.5, MUTED, False)], [(strat, 10.5, INK, False)]], margin=0.18)
        for k in range(3):
            chip = box(s, x + 0.18 + k * 1.78, y + h - 0.62, 1.62, 0.42, fill=WHITE, line=color, radius=0.3)
            text(chip, [[("[Nom]", 9.5, MUTED, False)]], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, margin=0.04)
    # axes
    ax = box(s, 0.95, y0, 0.05, 2 * h + gap, fill=INK, line=None, shape=MSO_SHAPE.RECTANGLE)
    ay = box(s, x0, y0 + 2 * h + gap + 0.12, 2 * w + gap, 0.05, fill=INK, line=None, shape=MSO_SHAPE.RECTANGLE)
    text(s, [[("↑  POUVOIR", 10, INK, True)]], 0.55, y0 - 0.34, 2, 0.3)
    text(s, [[("INTÉRÊT  →", 10, INK, True)]], x0 + 2 * w + gap - 2, y0 + 2 * h + gap + 0.2, 2, 0.3, align=PP_ALIGN.RIGHT)

    s = blank(prs)
    header(s, "Plan de communication", "Qui, quoi, quand, comment", "Une ligne par partie prenante. Les deux premières lignes sont des exemples.", label=name)
    table(s, 0.6, 1.6, [2.3, 1.7, 2.8, 1.7, 2.2, 1.4],
          ["Partie prenante", "Quadrant", "Ce qui compte pour elle", "Fréquence", "Canal / format", "Responsable"],
          [["Directrice des risques", "Gérer de près", "Conformité, aucun incident client", "Toutes les 2 semaines", "Point dédié + Sprint Review", "PO"],
           ["Service client", "Garder informé", "Changements visibles par les clients", "À chaque mise en production", "Notes de version + démo", "PO"],
           ["[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]"],
           ["[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]"],
           ["[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]"],
           ["[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]", "[ … ]"]],
          row_h=0.66)
    prs.save(OUT / "stakeholder-mapping.pptx")


if __name__ == "__main__":
    product_canvas()
    sprint_review()
    dor_dod()
    stakeholder_map()
    print("OK : 4 templates régénérés dans", OUT)
