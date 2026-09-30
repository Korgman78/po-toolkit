"""Charte commune des templates PowerPoint du PO Toolkit (style « Atelier chaleureux »).

Utilisé par generate-outcome-tree.py et generate-pptx-templates.py.
"""
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt

FONT = "Segoe UI"
INK = RGBColor(0x2A, 0x24, 0x20)
MUTED = RGBColor(0x7A, 0x70, 0x68)
PAPER = RGBColor(0xFB, 0xF8, 0xF4)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LINE = RGBColor(0xE4, 0xDC, 0xD2)
ACCENT = RGBColor(0xD9, 0x5F, 0x36)
ACCENT_SOFT = RGBColor(0xFC, 0xEC, 0xE4)
SAGE = RGBColor(0x4E, 0x8A, 0x6B)
SAGE_SOFT = RGBColor(0xE7, 0xF1, 0xEA)
BLUE = RGBColor(0x3F, 0x6E, 0xB0)
BLUE_SOFT = RGBColor(0xE8, 0xEE, 0xF7)
PLUM = RGBColor(0x8A, 0x57, 0x8F)
PLUM_SOFT = RGBColor(0xF3, 0xEA, 0xF3)
SAND = RGBColor(0xA8, 0x7A, 0x1F)
SAND_SOFT = RGBColor(0xF8, 0xF0, 0xDC)
STOP = RGBColor(0xB4, 0x3C, 0x2E)
CONNECTOR = RGBColor(0xC9, 0xBE, 0xB2)

SLIDE_W, SLIDE_H = 13.333, 7.5


def new_presentation():
    prs = Presentation()
    prs.slide_width = Inches(SLIDE_W)
    prs.slide_height = Inches(SLIDE_H)
    return prs


def blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def box(slide, x, y, w, h, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.08, line_w=0.75):
    s = slide.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        s.adjustments[0] = radius
    if fill is None:
        s.fill.background()
    else:
        s.fill.solid()
        s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(line_w)
    s.shadow.inherit = False
    s.text_frame.clear()
    return s


def text(target, paras, x=None, y=None, w=None, h=None, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, margin=0.08, space_after=2):
    """paras : liste de paragraphes ; chaque paragraphe = liste de (texte, taille, couleur, gras)."""
    shape = target.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h)) if x is not None else target
    tf = shape.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    for side in ("left", "right", "top", "bottom"):
        setattr(tf, f"margin_{side}", Inches(margin))
    tf.clear()
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(space_after)
        for t, size, color, bold in para:
            r = p.add_run()
            r.text = t
            r.font.name = FONT
            r.font.size = Pt(size)
            r.font.color.rgb = color
            r.font.bold = bold
    return shape


def background(slide):
    box(slide, 0, 0, SLIDE_W, SLIDE_H, fill=PAPER, line=None, shape=MSO_SHAPE.RECTANGLE)
    box(slide, 0, 0, SLIDE_W, 0.08, fill=ACCENT, line=None, shape=MSO_SHAPE.RECTANGLE)


def footer(slide, label):
    text(slide, [[("PO Toolkit", 8.5, ACCENT, True), (f"  ·  {label}", 8.5, MUTED, False)]], 0.6, 7.08, 12, 0.3)


def header(slide, kicker, title, subtitle=None, label=None):
    background(slide)
    text(slide, [[(kicker.upper(), 10, ACCENT, True)]], 0.6, 0.32, 10, 0.3)
    text(slide, [[(title, 24, INK, True)]], 0.6, 0.58, 12, 0.55)
    if subtitle:
        text(slide, [[(subtitle, 11.5, MUTED, False)]], 0.6, 1.1, 12, 0.35)
    if label:
        footer(slide, label)


def pill(slide, x, y, w, h, label, color, size=12, align=PP_ALIGN.LEFT):
    p = box(slide, x, y, w, h, fill=color, line=None, radius=0.25)
    text(p, [[(label, size, WHITE, True)]], align=align, anchor=MSO_ANCHOR.MIDDLE, margin=0.12)
    return p


def labeled_card(slide, x, y, w, h, label, color, body_paras=None, fill=WHITE, line=LINE, label_size=9, space_after=2):
    c = box(slide, x, y, w, h, fill=fill, line=line)
    paras = [[(label.upper(), label_size, color, True)]]
    if body_paras:
        paras += body_paras
    text(c, paras, margin=0.14, space_after=space_after)
    return c


def checkbox(slide, x, y, size=0.2, color=ACCENT):
    b = box(slide, x, y, size, size, fill=WHITE, line=color, radius=0.2, line_w=1.25)
    return b


def connect(slide, parent, child):
    x1 = parent.left + parent.width // 2
    y1 = parent.top + parent.height
    x2 = child.left + child.width // 2
    y2 = child.top
    c = slide.shapes.add_connector(MSO_CONNECTOR.ELBOW, x1, y1, x2, y2)
    c.line.color.rgb = CONNECTOR
    c.line.width = Pt(1.25)
    return c


def guide_slide(prs, name, title, subtitle, why, how, tips, contents):
    """Slide Guide standard : trois colonnes (pourquoi, comment, bonnes pratiques) et contenu du template."""
    s = blank(prs)
    header(s, "Guide", title, subtitle, label=f"{name} — Guide")
    cols = [("Pourquoi ?", ACCENT, why), ("Comment l'utiliser ?", SAGE, how), ("Bonnes pratiques", BLUE, tips)]
    for i, (col_title, color, items) in enumerate(cols):
        x = 0.6 + i * 4.1
        pill(s, x, 1.75, 3.9, 0.42, col_title, color)
        card = box(s, x, 2.3, 3.9, 3.75, fill=WHITE, line=LINE)
        size = 12.5 if sum(len(t) for t in items) < 420 else 11.5
        text(card, [[("•  " + it, size, INK, False)] for it in items], margin=0.18, space_after=5)
    legend = box(s, 0.6, 6.2, 12.1, 0.72, fill=WHITE, line=LINE)
    text(legend, [[("Contenu du template   ", 10.5, ACCENT, True), (contents, 10.5, INK, False)]],
         anchor=MSO_ANCHOR.MIDDLE, margin=0.16)
    return s


__all__ = [n for n in dir() if not n.startswith("_")] + ["MSO_SHAPE", "MSO_ANCHOR", "PP_ALIGN", "Inches", "Pt", "RGBColor"]
