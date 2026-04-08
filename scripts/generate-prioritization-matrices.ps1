$ErrorActionPreference = 'Stop'

$outputPath = 'C:\po-toolkit\accelerators\xlsx\prioritization-matrices.xlsx'
$tempRoot = 'C:\po-toolkit\.tmp\prioritization-matrices'

if (Test-Path $tempRoot) {
  Remove-Item -LiteralPath $tempRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $tempRoot, "$tempRoot\_rels", "$tempRoot\docProps", "$tempRoot\xl", "$tempRoot\xl\_rels", "$tempRoot\xl\worksheets" -Force | Out-Null

function Write-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )
  $dir = Split-Path -Parent $Path
  if ($dir) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  Set-Content -LiteralPath $Path -Value $Content -Encoding utf8
}

function Escape-Xml {
  param([object]$Value)
  $text = [string]$Value
  return $text.Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;').Replace('"', '&quot;')
}

function Get-ColumnName {
  param([int]$Number)
  $value = $Number
  $name = ''
  while ($value -gt 0) {
    $value--
    $name = [char](65 + ($value % 26)) + $name
    $value = [math]::Floor($value / 26)
  }
  return $name
}

function New-InlineCell {
  param(
    [string]$Ref,
    [string]$Text,
    [int]$Style = 0
  )
  if ([string]::IsNullOrEmpty($Text)) {
    return "<c r=`"$Ref`" s=`"$Style`" t=`"inlineStr`"><is><t></t></is></c>"
  }
  return "<c r=`"$Ref`" s=`"$Style`" t=`"inlineStr`"><is><t xml:space=`"preserve`">$(Escape-Xml $Text)</t></is></c>"
}

function New-NumberCell {
  param(
    [string]$Ref,
    [double]$Value,
    [int]$Style = 0
  )
  return "<c r=`"$Ref`" s=`"$Style`"><v>$Value</v></c>"
}

function New-FormulaCell {
  param(
    [string]$Ref,
    [string]$Formula,
    [int]$Style = 0,
    [string]$Value = '0'
  )
  return "<c r=`"$Ref`" s=`"$Style`"><f>$Formula</f><v>$Value</v></c>"
}

function New-EmptyCell {
  param(
    [string]$Ref,
    [int]$Style = 0
  )
  return "<c r=`"$Ref`" s=`"$Style`"/>"
}

function New-RowXml {
  param(
    [int]$RowIndex,
    [string[]]$Cells,
    [double]$Height = 0
  )
  $heightAttr = if ($Height -gt 0) { " ht=`"$Height`" customHeight=`"1`"" } else { '' }
  return "<row r=`"$RowIndex`"$heightAttr>$($Cells -join '')</row>"
}

function New-SheetXml {
  param(
    [string[]]$Rows,
    [int[]]$Widths
  )

  $cols = for ($i = 0; $i -lt $Widths.Count; $i++) {
    "<col min=`"$($i + 1)`" max=`"$($i + 1)`" width=`"$($Widths[$i])`" customWidth=`"1`"/>"
  }

  return @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews>
    <sheetView workbookViewId="0"/>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    $($cols -join "`n    ")
  </cols>
  <sheetData>
    $($Rows -join "`n    ")
  </sheetData>
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>
"@
}

function Build-GuideSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'Matrices de priorisation' 1)) 26
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Workbook de reference pour comparer rapidement plusieurs methodes de priorisation produit.' 4))
  $rows += New-RowXml 4 @((New-InlineCell 'A4' 'Comment l utiliser' 3))
  $rows += New-RowXml 5 @((New-InlineCell 'A5' '1. Dupliquez les lignes d exemple ou remplacez-les par vos propres features.' 4))
  $rows += New-RowXml 6 @((New-InlineCell 'A6' '2. Chaque onglet calcule le score ou cadre la discussion selon sa logique propre.' 4))
  $rows += New-RowXml 7 @((New-InlineCell 'A7' '3. Gardez les notes pour documenter les arbitrages, dependances et hypotheses.' 4))
  $rows += New-RowXml 9 @((New-InlineCell 'A9' 'Onglets inclus' 3))
  $rows += New-RowXml 10 @((New-InlineCell 'A10' 'RICE : Reach x Impact x Confidence / Effort' 4))
  $rows += New-RowXml 11 @((New-InlineCell 'A11' 'WSJF : Cost of Delay / Job Size' 4))
  $rows += New-RowXml 12 @((New-InlineCell 'A12' 'ICE : Impact x Confidence x Ease' 4))
  $rows += New-RowXml 13 @((New-InlineCell 'A13' 'MoSCoW : cadrage Must / Should / Could / Won''t' 4))
  $rows += New-RowXml 14 @((New-InlineCell 'A14' 'Value-Effort : lecture portefeuille par quadrant' 4))
  $rows += New-RowXml 16 @((New-InlineCell 'A16' 'Conseil PO' 3))
  $rows += New-RowXml 17 @((New-InlineCell 'A17' 'Ne cherchez pas une verite unique. Utilisez ces matrices pour nourrir une decision produit explicite et partageable.' 4))
  New-SheetXml -Rows $rows -Widths @(88)
}

function Build-RiceSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'RICE scoring' 1)) 24
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Reach x Impact x Confidence / Effort. Plus le score est haut, plus l item monte en priorite.' 4))
  $headers = 'Feature / initiative','Reach','Impact','Confidence','Effort','Score RICE','Notes'
  $rows += New-RowXml 4 (@(
    (New-InlineCell 'A4' $headers[0] 2),
    (New-InlineCell 'B4' $headers[1] 2),
    (New-InlineCell 'C4' $headers[2] 2),
    (New-InlineCell 'D4' $headers[3] 2),
    (New-InlineCell 'E4' $headers[4] 2),
    (New-InlineCell 'F4' $headers[5] 2),
    (New-InlineCell 'G4' $headers[6] 2)
  )) 22
  $examples = @(
    @{ Feature = 'Export CSV multi-entites'; Reach = 900; Impact = 2; Confidence = 0.8; Effort = 5; Notes = 'Demande recurrente support + ops' },
    @{ Feature = 'Refonte page filtres'; Reach = 350; Impact = 1.5; Confidence = 0.7; Effort = 3; Notes = 'Quick win UX identifie en research' }
  )
  for ($row = 5; $row -le 24; $row++) {
    $example = if ($row -le 6) { $examples[$row - 5] } else { $null }
    $cells = @(
      (New-InlineCell "A$row" ($example?.Feature) 4),
      $(if ($example) { New-NumberCell "B$row" $example.Reach 6 } else { New-EmptyCell "B$row" 6 }),
      $(if ($example) { New-NumberCell "C$row" $example.Impact 5 } else { New-EmptyCell "C$row" 5 }),
      $(if ($example) { New-NumberCell "D$row" $example.Confidence 5 } else { New-EmptyCell "D$row" 5 }),
      $(if ($example) { New-NumberCell "E$row" $example.Effort 5 } else { New-EmptyCell "E$row" 5 }),
      (New-FormulaCell "F$row" "IFERROR((B$row*C$row*D$row)/E$row,0)" 5),
      (New-InlineCell "G$row" ($example?.Notes) 4)
    )
    $rows += New-RowXml $row $cells
  }
  New-SheetXml -Rows $rows -Widths @(34,12,12,12,12,14,38)
}

function Build-WsjfSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'WSJF' 1)) 24
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Cost of Delay / Job Size. Le Cost of Delay est ici detaille en trois composantes classiques SAFe.' 4))
  $headers = 'Feature / initiative','User / Business Value','Time Criticality','Risk Reduction / Opportunity','Job Size','WSJF','Notes'
  $rows += New-RowXml 4 (@(
    (New-InlineCell 'A4' $headers[0] 2),
    (New-InlineCell 'B4' $headers[1] 2),
    (New-InlineCell 'C4' $headers[2] 2),
    (New-InlineCell 'D4' $headers[3] 2),
    (New-InlineCell 'E4' $headers[4] 2),
    (New-InlineCell 'F4' $headers[5] 2),
    (New-InlineCell 'G4' $headers[6] 2)
  )) 30
  $examples = @(
    @{ Feature = 'Securiser auth partenaires'; UBV = 9; TC = 8; RR = 9; JS = 5; Notes = 'Risque de non-conformite + dependance PI' },
    @{ Feature = 'Nouvelle home analytics'; UBV = 6; TC = 4; RR = 3; JS = 4; Notes = 'Valeur metier reelle mais moins urgente' }
  )
  for ($row = 5; $row -le 24; $row++) {
    $example = if ($row -le 6) { $examples[$row - 5] } else { $null }
    $cells = @(
      (New-InlineCell "A$row" ($example?.Feature) 4),
      $(if ($example) { New-NumberCell "B$row" $example.UBV 6 } else { New-EmptyCell "B$row" 6 }),
      $(if ($example) { New-NumberCell "C$row" $example.TC 6 } else { New-EmptyCell "C$row" 6 }),
      $(if ($example) { New-NumberCell "D$row" $example.RR 6 } else { New-EmptyCell "D$row" 6 }),
      $(if ($example) { New-NumberCell "E$row" $example.JS 6 } else { New-EmptyCell "E$row" 6 }),
      (New-FormulaCell "F$row" "IFERROR((B$row+C$row+D$row)/E$row,0)" 5),
      (New-InlineCell "G$row" ($example?.Notes) 4)
    )
    $rows += New-RowXml $row $cells
  }
  New-SheetXml -Rows $rows -Widths @(34,16,16,20,12,12,38)
}

function Build-IceSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'ICE scoring' 1)) 24
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Impact x Confidence x Ease. Pratique pour trier vite des experiments, idees ou quick wins.' 4))
  $headers = 'Feature / experiment','Impact','Confidence','Ease','Score ICE','Notes'
  $rows += New-RowXml 4 (@(
    (New-InlineCell 'A4' $headers[0] 2),
    (New-InlineCell 'B4' $headers[1] 2),
    (New-InlineCell 'C4' $headers[2] 2),
    (New-InlineCell 'D4' $headers[3] 2),
    (New-InlineCell 'E4' $headers[4] 2),
    (New-InlineCell 'F4' $headers[5] 2)
  )) 24
  $examples = @(
    @{ Feature = 'Nouveau CTA onboarding'; Impact = 7; Confidence = 6; Ease = 9; Notes = 'AB test rapide' },
    @{ Feature = 'Refonte tunnel mobile'; Impact = 9; Confidence = 5; Ease = 3; Notes = 'Fort potentiel mais chantier lourd' }
  )
  for ($row = 5; $row -le 24; $row++) {
    $example = if ($row -le 6) { $examples[$row - 5] } else { $null }
    $cells = @(
      (New-InlineCell "A$row" ($example?.Feature) 4),
      $(if ($example) { New-NumberCell "B$row" $example.Impact 6 } else { New-EmptyCell "B$row" 6 }),
      $(if ($example) { New-NumberCell "C$row" $example.Confidence 6 } else { New-EmptyCell "C$row" 6 }),
      $(if ($example) { New-NumberCell "D$row" $example.Ease 6 } else { New-EmptyCell "D$row" 6 }),
      (New-FormulaCell "E$row" "IFERROR(B$row*C$row*D$row,0)" 5),
      (New-InlineCell "F$row" ($example?.Notes) 4)
    )
    $rows += New-RowXml $row $cells
  }
  New-SheetXml -Rows $rows -Widths @(36,12,12,12,14,40)
}

function Build-MoscowSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'MoSCoW' 1)) 24
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Cadrez le scope de release ou de PI en qualifiant les items Must / Should / Could / Won''t.' 4))
  $headers = 'Feature / story','Categorie','Outcome attendu','Scope cut / arbitrage','Notes'
  $rows += New-RowXml 4 (@(
    (New-InlineCell 'A4' $headers[0] 2),
    (New-InlineCell 'B4' $headers[1] 2),
    (New-InlineCell 'C4' $headers[2] 2),
    (New-InlineCell 'D4' $headers[3] 2),
    (New-InlineCell 'E4' $headers[4] 2)
  )) 24
  $examples = @(
    @{ Feature = 'Export CSV finance'; Category = 'Must'; Outcome = 'Permettre le pilotage mensuel sans manip manuelle'; Scope = 'PI courant'; Notes = 'Bloque le run finance' },
    @{ Feature = 'Theme sombre back-office'; Category = 'Could'; Outcome = 'Confort usage quotidien'; Scope = 'Si capacite residuelle'; Notes = 'Pas critique business' }
  )
  for ($row = 5; $row -le 24; $row++) {
    $example = if ($row -le 6) { $examples[$row - 5] } else { $null }
    $cells = @(
      (New-InlineCell "A$row" ($example?.Feature) 4),
      (New-InlineCell "B$row" ($example?.Category) 4),
      (New-InlineCell "C$row" ($example?.Outcome) 4),
      (New-InlineCell "D$row" ($example?.Scope) 4),
      (New-InlineCell "E$row" ($example?.Notes) 4)
    )
    $rows += New-RowXml $row $cells
  }
  New-SheetXml -Rows $rows -Widths @(34,15,34,22,30)
}

function Build-ValueEffortSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'Value vs Effort' 1)) 24
  $rows += New-RowXml 2 @((New-InlineCell 'A2' 'Positionnez vos items dans les quadrants Quick wins, Big bets, Fill-ins et Money pits.' 4))
  $headers = 'Feature / initiative','Value','Effort','Quadrant','Notes'
  $rows += New-RowXml 4 (@(
    (New-InlineCell 'A4' $headers[0] 2),
    (New-InlineCell 'B4' $headers[1] 2),
    (New-InlineCell 'C4' $headers[2] 2),
    (New-InlineCell 'D4' $headers[3] 2),
    (New-InlineCell 'E4' $headers[4] 2)
  )) 24
  $examples = @(
    @{ Feature = 'Autocompletion recherche catalogue'; Value = 8; Effort = 3; Notes = 'Impact direct sur conversion' },
    @{ Feature = 'Refonte complete du moteur de regles'; Value = 9; Effort = 9; Notes = 'Strategique mais pluri-PI' }
  )
  for ($row = 5; $row -le 24; $row++) {
    $example = if ($row -le 6) { $examples[$row - 5] } else { $null }
    $cells = @(
      (New-InlineCell "A$row" ($example?.Feature) 4),
      $(if ($example) { New-NumberCell "B$row" $example.Value 6 } else { New-EmptyCell "B$row" 6 }),
      $(if ($example) { New-NumberCell "C$row" $example.Effort 6 } else { New-EmptyCell "C$row" 6 }),
      (New-FormulaCell "D$row" "IF(AND(B$row>=7,C$row<=4),""Quick win"",IF(AND(B$row>=7,C$row>4),""Big bet"",IF(AND(B$row<7,C$row<=4),""Fill-in"",""Money pit"")))" 4),
      (New-InlineCell "E$row" ($example?.Notes) 4)
    )
    $rows += New-RowXml $row $cells
  }
  New-SheetXml -Rows $rows -Widths @(36,12,12,16,36)
}

function Build-LegendeSheet {
  $rows = @()
  $rows += New-RowXml 1 @((New-InlineCell 'A1' 'Legende & reperes' 1)) 24
  $rows += New-RowXml 3 @((New-InlineCell 'A3' 'RICE' 3))
  $rows += New-RowXml 4 @((New-InlineCell 'A4' 'Impact 3 = massif, 2 = fort, 1 = moyen, 0.5 = faible, 0.25 = minimal' 4))
  $rows += New-RowXml 5 @((New-InlineCell 'A5' 'Confidence entre 0 et 1.0, selon le niveau de preuve.' 4))
  $rows += New-RowXml 7 @((New-InlineCell 'A7' 'WSJF' 3))
  $rows += New-RowXml 8 @((New-InlineCell 'A8' 'Scores souvent notes de 1 a 10 pour User Value, Time Criticality et Risk Reduction.' 4))
  $rows += New-RowXml 9 @((New-InlineCell 'A9' 'Job Size represente l effort relatif, souvent en story points ou taille de chantier.' 4))
  $rows += New-RowXml 11 @((New-InlineCell 'A11' 'ICE' 3))
  $rows += New-RowXml 12 @((New-InlineCell 'A12' 'Impact, Confidence et Ease sont souvent notes de 1 a 10.' 4))
  $rows += New-RowXml 14 @((New-InlineCell 'A14' 'MoSCoW' 3))
  $rows += New-RowXml 15 @((New-InlineCell 'A15' 'Must = necessaire pour livrer la valeur minimale, Should = important, Could = optionnel, Won''t = hors scope actuel.' 4))
  $rows += New-RowXml 17 @((New-InlineCell 'A17' 'Value vs Effort' 3))
  $rows += New-RowXml 18 @((New-InlineCell 'A18' 'Adaptez les seuils Value / Effort a votre contexte. Le workbook utilise 7+ pour forte valeur et 4- pour faible effort.' 4))
  New-SheetXml -Rows $rows -Widths @(90)
}

$stylesXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1">
    <numFmt numFmtId="164" formatCode="0.00"/>
  </numFmts>
  <fonts count="4">
    <font><sz val="11"/><color rgb="FF1F2937"/><name val="Aptos"/></font>
    <font><b/><sz val="15"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FF1F2937"/><name val="Aptos"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF312E81"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEFF6FF"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFD1D5DB"/></left>
      <right style="thin"><color rgb="FFD1D5DB"/></right>
      <top style="thin"><color rgb="FFD1D5DB"/></top>
      <bottom style="thin"><color rgb="FFD1D5DB"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="7">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>
"@

$workbookXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <fileVersion appName="xl"/>
  <workbookPr defaultThemeVersion="166925"/>
  <bookViews>
    <workbookView xWindow="240" yWindow="15" windowWidth="16095" windowHeight="9660"/>
  </bookViews>
  <sheets>
    <sheet name="Guide" sheetId="1" r:id="rId1"/>
    <sheet name="RICE" sheetId="2" r:id="rId2"/>
    <sheet name="WSJF" sheetId="3" r:id="rId3"/>
    <sheet name="ICE" sheetId="4" r:id="rId4"/>
    <sheet name="MoSCoW" sheetId="5" r:id="rId5"/>
    <sheet name="Value-Effort" sheetId="6" r:id="rId6"/>
    <sheet name="Legende" sheetId="7" r:id="rId7"/>
  </sheets>
  <calcPr calcId="191029"/>
</workbook>
"@

$workbookRelsXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>
  <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet5.xml"/>
  <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet6.xml"/>
  <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet7.xml"/>
  <Relationship Id="rId8" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>
"@

$rootRelsXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"@

$contentTypesXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet5.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet6.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet7.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
"@

$createdIso = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$coreXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">$createdIso</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">$createdIso</dcterms:modified>
  <dc:title>Matrices de priorisation</dc:title>
</cp:coreProperties>
"@

$appXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Excel</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>
      <vt:variant><vt:i4>7</vt:i4></vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="7" baseType="lpstr">
      <vt:lpstr>Guide</vt:lpstr>
      <vt:lpstr>RICE</vt:lpstr>
      <vt:lpstr>WSJF</vt:lpstr>
      <vt:lpstr>ICE</vt:lpstr>
      <vt:lpstr>MoSCoW</vt:lpstr>
      <vt:lpstr>Value-Effort</vt:lpstr>
      <vt:lpstr>Legende</vt:lpstr>
    </vt:vector>
  </TitlesOfParts>
  <Company>PO Toolkit</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0300</AppVersion>
</Properties>
"@

Write-Utf8File "$tempRoot\[Content_Types].xml" $contentTypesXml
Write-Utf8File "$tempRoot\_rels\.rels" $rootRelsXml
Write-Utf8File "$tempRoot\docProps\core.xml" $coreXml
Write-Utf8File "$tempRoot\docProps\app.xml" $appXml
Write-Utf8File "$tempRoot\xl\workbook.xml" $workbookXml
Write-Utf8File "$tempRoot\xl\_rels\workbook.xml.rels" $workbookRelsXml
Write-Utf8File "$tempRoot\xl\styles.xml" $stylesXml
Write-Utf8File "$tempRoot\xl\worksheets\sheet1.xml" (Build-GuideSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet2.xml" (Build-RiceSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet3.xml" (Build-WsjfSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet4.xml" (Build-IceSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet5.xml" (Build-MoscowSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet6.xml" (Build-ValueEffortSheet)
Write-Utf8File "$tempRoot\xl\worksheets\sheet7.xml" (Build-LegendeSheet)

if (Test-Path $outputPath) {
  Remove-Item -LiteralPath $outputPath -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempRoot, $outputPath)

Write-Host "Workbook generated: $outputPath"
