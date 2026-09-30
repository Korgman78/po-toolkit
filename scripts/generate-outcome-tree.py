"""Génère accelerators/pptx/outcome-tree-ai-native.pptx.

Template d'outcome tree pour une organisation agile AI-native :
stratégie (OKR de portefeuille) -> outcomes d'ART -> outcomes d'équipe -> paris,
avec indicateurs avancés, critères d'arrêt et revue Sense & Respond.

Usage : python scripts/generate-outcome-tree.py
"""
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import MSO_ANCHOR
from pptx.util import Inches

from pptx_style import (
    ACCENT, ACCENT_SOFT, BLUE, BLUE_SOFT, INK, LINE, MUTED, PAPER, PLUM, SAGE, SAGE_SOFT, STOP, WHITE,
    box, connect, header, text,
)

OUT = Path(__file__).resolve().parent.parent / "accelerators" / "pptx" / "outcome-tree-ai-native.pptx"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]


def node(slide, x, y, w, h, label, title, detail, fill, color, size=10):
    s = box(slide, x, y, w, h, fill=fill, line=color, line_w=1)
    paras = [[(label.upper(), 7.5, color, True)], [(title, size, INK, True)]]
    if detail:
        paras.append([(detail, size - 2, MUTED, False)])
    text(s, paras, margin=0.07)
    return s


# ---------- Slide 1 : guide ----------
s = prs.slides.add_slide(BLANK)
header(s, "Guide", "Outcome tree — organisation agile AI-native",
       "Relier la stratégie aux équipes par des résultats mesurables, et piloter des paris plutôt que des listes de features.")

cols = [
    ("Pourquoi ?", ACCENT, ACCENT_SOFT, [
        "Quand l'IA accélère la construction, un plan de features vieillit vite : on s'engage sur des résultats, pas sur une liste.",
        "L'arbre relie chaque travail à un outcome d'ART, puis à l'OKR du portefeuille : on voit ce qui sert la stratégie… et ce qui ne sert à rien.",
        "Chaque pari porte son indicateur et son critère d'arrêt : abandonner une piste devient une décision prévue, pas un échec.",
    ]),
    ("Comment l'utiliser ?", SAGE, SAGE_SOFT, [
        "En PI Outcome Planning : partez de l'OKR du portefeuille, puis déclinez 2 à 3 outcomes d'ART et leurs outcomes d'équipe.",
        "Sous chaque outcome d'équipe, listez 1 à 3 paris avec une fiche (slide 4) : hypothèse, indicateur avancé, critère d'arrêt daté.",
        "À chaque ART Sense & Respond : mettez à jour les indicateurs et décidez pour chaque pari — continuer, pivoter ou arrêter (slide 5).",
    ]),
    ("Bonnes pratiques", BLUE, BLUE_SOFT, [
        "Un outcome décrit un changement de comportement ou un résultat mesurable, jamais une livraison (« −30 % d'abandon », pas « livrer le formulaire »).",
        "Préférez un indicateur avancé (visible en quelques jours) à un indicateur de résultat trimestriel pour piloter les paris.",
        "Précisez le rôle de l'IA dans chaque pari (ce qu'elle accélère, ce qui reste vérifié par un humain) et son coût (inférence, vérification).",
    ]),
]
for i, (title, color, soft, items) in enumerate(cols):
    x = 0.6 + i * 4.1
    head = box(s, x, 1.75, 3.9, 0.42, fill=color, line=None, radius=0.25)
    text(head, [[(title, 12, WHITE, True)]], anchor=MSO_ANCHOR.MIDDLE, margin=0.12)
    card = box(s, x, 2.3, 3.9, 3.75, fill=WHITE, line=LINE)
    text(card, [[("•  " + it, 12.5, INK, False)] for it in items], margin=0.18)

legend = box(s, 0.6, 6.25, 12.1, 0.8, fill=WHITE, line=LINE)
text(legend, [[("Contenu du template   ", 10.5, ACCENT, True),
               ("2. Arbre vierge   ·   3. Exemple complet (banque, parcours de souscription)   ·   4. Fiche pari   ·   5. Revue Sense & Respond", 10.5, INK, False)],
              [("Inspiré d'AI-Native SAFe (Scaled Agile, 2026) : PI Outcome Planning, outcome tree et ART Sense & Respond. Voir le parcours « IA & SAFe » du PO Toolkit.", 9, MUTED, False)]],
     anchor=MSO_ANCHOR.MIDDLE, margin=0.16)


def tree(slide, data):
    """data = dict(strategy=(title, detail), arts=[(title, detail, [ (team_title, team_detail, bet_title, bet_detail, stopped) x2 ])] x3)."""
    levels = [("Stratégie", "OKR du portefeuille", 1.62), ("Outcomes d'ART", "résultats sur le PI", 2.92),
              ("Outcomes d'équipe", "résultats mesurables", 4.22), ("Paris", "hypothèses à tester", 5.52)]
    for label, sub, y in levels:
        text(slide, [[(label, 10, INK, True)], [(sub, 8.5, MUTED, False)]], 0.35, y + 0.1, 1.55, 0.7)

    x0, width = 2.0, 11.0
    root = node(slide, x0 + width / 2 - 2.4, 1.55, 4.8, 0.9, "Objectif stratégique (OKR)", data["strategy"][0], data["strategy"][1], ACCENT_SOFT, ACCENT, 12)
    art_w, gap = 3.5, 0.25
    for i, (a_title, a_detail, teams) in enumerate(data["arts"]):
        ax = x0 + i * (art_w + gap)
        art = node(slide, ax, 2.85, art_w, 0.95, f"Outcome d'ART {i + 1}", a_title, a_detail, BLUE_SOFT, BLUE, 10.5)
        connect(slide, root, art)
        tw = (art_w - 0.14) / 2
        for j, (t_title, t_detail, b_title, b_detail, stopped) in enumerate(teams):
            tx = ax + j * (tw + 0.14)
            team = node(slide, tx, 4.15, tw, 0.95, "Outcome d'équipe", t_title, t_detail, SAGE_SOFT, SAGE, 9)
            connect(slide, art, team)
            color = STOP if stopped else PLUM
            bet = node(slide, tx, 5.45, tw, 1.35, "Pari arrêté" if stopped else "Pari", b_title, b_detail, WHITE if not stopped else RGBColor(0xF7, 0xEE, 0xEC), color, 8.5)
            connect(slide, team, bet)


# ---------- Slide 2 : arbre vierge ----------
s = prs.slides.add_slide(BLANK)
header(s, "Outcome tree", "[Nom du portefeuille ou de l'ART] — PI [numéro]",
       "Remplacez les textes entre crochets. Un outcome se mesure ; un pari se teste et peut s'arrêter.")
blank_team = ("[Outcome d'équipe]", "Indicateur : [ … ]", "[Pari : si nous…, alors…]", "Avancé : [ … ]\nArrêt si : [ … ] le [date]", False)
tree(s, {
    "strategy": ("[Objectif : …]", "Résultat clé : [indicateur, valeur actuelle → cible, échéance]"),
    "arts": [("[Outcome d'ART]", "Indicateur : [ … ] → cible [ … ]", [blank_team, blank_team]) for _ in range(3)],
})

# ---------- Slide 3 : exemple ----------
s = prs.slides.add_slide(BLANK)
header(s, "Exemple", "Banque de détail — crédit à la consommation, PI 26.4",
       "Exemple fictif. Le pari « pré-remplissage par IA » a été arrêté en Sense & Respond : aucun effet sur l'abandon après deux itérations, coût d'inférence élevé.")
tree(s, {
    "strategy": ("+15 % de souscriptions de crédit en ligne", "Résultat clé : 42 % → 48 % des crédits souscrits en ligne d'ici fin d'année"),
    "arts": [
        ("−30 % d'abandon sur la souscription", "Taux d'abandon : 38 % → 27 %", [
            ("Étape « revenus » complétée par 80 %", "Aujourd'hui : 61 %", "Formulaire simplifié en 3 écrans", "Avancé : complétion étape 2\nArrêt si : < +5 pts à 2 itér.", False),
            ("Moins de pièces justificatives redemandées", "Aujourd'hui : 1 dossier sur 3", "Pré-remplissage des revenus par IA", "Aucun effet après 2 itérations, coût d'inférence élevé", True),
        ]),
        ("Accord de principe en moins de 24 h", "Part < 24 h : 35 % → 70 %", [
            ("Dossiers complets dès le dépôt", "Complets : 58 % → 80 %", "Contrôle de complétude en direct", "Avancé : dossiers renvoyés\nArrêt si : < −10 % le 15/11", False),
            ("Analyse de dossier accélérée", "Temps d'analyse : 3 j → 1 j", "Synthèse IA pour l'analyste (validée par un humain)", "Avancé : temps par dossier\nArrêt si : erreurs > 2 %", False),
        ]),
        ("Conformité CCD2 sans rupture de parcours", "0 non-conformité à l'audit", [
            ("Information précontractuelle lue", "Taux de lecture : mesuré", "Fiche d'information interactive", "Avancé : temps de lecture\nArrêt si : abandon +2 pts", False),
            ("Vérification de solvabilité tracée", "100 % des dossiers tracés", "Journal de décision automatique", "Avancé : dossiers tracés\nRevue conformité mensuelle", False),
        ]),
    ],
})

# ---------- Slide 4 : fiche pari ----------
s = prs.slides.add_slide(BLANK)
header(s, "Fiche pari", "[Titre du pari]", "Une fiche par pari. Elle se remplit en PI Outcome Planning et se relit à chaque ART Sense & Respond.")
fields = [
    ("Outcome visé", "Quel outcome d'équipe ce pari doit-il faire bouger ?", SAGE, 0.6, 1.7, 6.0, 1.05),
    ("Hypothèse", "Si nous [faisons…], alors [tel comportement] changera, parce que [raison].", PLUM, 6.75, 1.7, 5.95, 1.05),
    ("Indicateur avancé", "Signal visible en quelques jours. Valeur actuelle → cible.", BLUE, 0.6, 2.9, 3.95, 1.25),
    ("Indicateur de résultat", "Mesure de l'outcome, sur le PI.", BLUE, 4.7, 2.9, 3.95, 1.25),
    ("Critère d'arrêt", "Nous arrêtons si [seuil] n'est pas atteint le [date] ou après [n] itérations.", STOP, 8.8, 2.9, 3.9, 1.25),
    ("Rôle de l'IA", "Ce que l'IA accélère (prototype, analyse, code…) et ce qui reste vérifié par un humain.", ACCENT, 0.6, 4.3, 6.0, 1.25),
    ("Coûts et risques", "Coût d'inférence, temps de vérification, données utilisées, points de conformité.", ACCENT, 6.75, 4.3, 5.95, 1.25),
]
for label, hint, color, x, y, w, h in fields:
    c = box(s, x, y, w, h, fill=WHITE, line=LINE)
    text(c, [[(label.upper(), 9, color, True)], [(hint, 10, MUTED, False)]], margin=0.14)
dec = box(s, 0.6, 5.7, 12.1, 1.3, fill=WHITE, line=LINE)
text(dec, [[("DÉCISIONS SENSE & RESPOND", 9, INK, True)],
           [("Itération 1 : [continuer / pivoter / arrêter] — [ce que nous avons appris]", 10, MUTED, False)],
           [("Itération 2 : [ … ]", 10, MUTED, False)],
           [("Itération 3 : [ … ]", 10, MUTED, False)]], margin=0.14)

# ---------- Slide 5 : revue Sense & Respond ----------
s = prs.slides.add_slide(BLANK)
header(s, "Revue", "ART Sense & Respond — itération [n]",
       "Environ 2 h à chaque itération. Première moitié : capter (démo, indicateurs, retours clients, contexte). Seconde moitié : décider.")
rows, cols_n = 7, 6
tbl = s.shapes.add_table(rows, cols_n, Inches(0.6), Inches(1.7), Inches(12.1), Inches(4.3)).table
widths = [2.6, 2.4, 1.9, 1.7, 1.5, 2.0]
for i, wv in enumerate(widths):
    tbl.columns[i].width = Inches(wv)
heads = ["Pari", "Outcome visé", "Indicateur avancé", "Tendance", "Décision", "Apprentissage"]
example = [
    ["Formulaire simplifié en 3 écrans", "Étape « revenus » à 80 %", "Complétion : 61 % → 70 %", "En hausse", "Continuer", "Le 2e écran concentre les abandons"],
    ["Pré-remplissage des revenus par IA", "Moins de pièces redemandées", "Aucun effet", "Stable", "Arrêter", "Les clients corrigent les valeurs proposées"],
    ["Contrôle de complétude en direct", "Dossiers complets dès le dépôt", "Renvois : −6 %", "En hausse", "Continuer", "Seuil d'arrêt proche : suivre de près"],
    ["[Pari]", "[Outcome]", "[Valeur]", "[ ]", "[ ]", "[ ]"],
    ["[Pari]", "[Outcome]", "[Valeur]", "[ ]", "[ ]", "[ ]"],
    ["[Pari]", "[Outcome]", "[Valeur]", "[ ]", "[ ]", "[ ]"],
]
for c, h in enumerate(heads):
    cell = tbl.cell(0, c)
    cell.fill.solid()
    cell.fill.fore_color.rgb = INK
    text(cell, [[(h, 10, WHITE, True)]], margin=0.08)
for r, row in enumerate(example, start=1):
    for c, v in enumerate(row):
        cell = tbl.cell(r, c)
        cell.fill.solid()
        cell.fill.fore_color.rgb = WHITE if r % 2 else PAPER
        color = INK
        bold = False
        if c == 4 and v == "Arrêter":
            color, bold = STOP, True
        elif c == 4 and v == "Continuer":
            color, bold = SAGE, True
        text(cell, [[(v, 9.5, MUTED if v.startswith("[") else color, bold)]], margin=0.08)
foot = box(s, 0.6, 6.2, 12.1, 0.8, fill=ACCENT_SOFT, line=None)
text(foot, [[("Règle d'or : ", 10.5, ACCENT, True),
             ("un pari arrêté n'est pas un échec. On documente l'apprentissage et on réalloue la capacité aux paris qui font bouger l'outcome.", 10.5, INK, False)]],
     anchor=MSO_ANCHOR.MIDDLE, margin=0.16)

OUT.parent.mkdir(parents=True, exist_ok=True)
prs.save(OUT)
print(f"OK : {OUT}")
