// Tool: Conceptcanvas (fase 2). Bouw: node conceptcanvas.js <uitvoer.docx>
const {
  path, ACCENT, ZACHT, W, LW, STAAND, LIGGEND, IMG, geenRand, zwartRand,
  t, leeg, kop, bullet, nummer, beeld, ficheKop, kernTabel, uitDePraktijk, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType, VerticalAlign } = require('docx');

// Kader met de drie communicatiedoelen
function doelenKader() {
  const kol = [2300, W - 2300];
  const rij = (naam, uitleg) => new TableRow({ children: [
    new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: geenRand, margins: { top: 60, bottom: 60, left: 200, right: 120 },
      shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' },
      children: [new Paragraph({ spacing: { after: 0 }, children: [t(naam, { bold: true, color: ACCENT })] })] }),
    new TableCell({ width: { size: kol[1], type: WidthType.DXA }, borders: geenRand, margins: { top: 60, bottom: 60, left: 120, right: 160 },
      shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' },
      children: [new Paragraph({ spacing: { after: 0 }, children: [t(uitleg)] })] })
  ] });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: [
    new TableRow({ children: [new TableCell({ columnSpan: 2, width: { size: W, type: WidthType.DXA }, borders: geenRand,
      shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 120, bottom: 40, left: 200, right: 160 },
      children: [new Paragraph({ spacing: { after: 0 }, children: [t('Drie communicatiedoelen', { bold: true })] })] })] }),
    rij('Informeren', 'Je publiek weet daarna iets wat het nog niet wist.'),
    rij('Emotioneren', 'Je publiek voelt iets: het herkent zich, leeft mee of begrijpt beter.'),
    rij('Activeren', 'Je publiek doet daarna iets: praat erover, komt naar een activiteit, verandert iets.'),
    new TableRow({ children: [new TableCell({ columnSpan: 2, width: { size: W, type: WidthType.DXA }, borders: geenRand,
      shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 40, bottom: 120, left: 200, right: 160 },
      children: [new Paragraph({ spacing: { after: 0 }, children: [t('Vaak combineer je ze. Kies welk doel het belangrijkst is.', { size: 19 })] })] })] })
  ] });
}

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(2, 'Conceptcanvas', [
    'Na een grote brainstorm liggen er veel ideeën op tafel. Met het conceptcanvas maak je keuzes: wat wil je vertellen, aan wie, met welk doel en in welke vorm? Zo wordt het concept van je mediaproduct duidelijk voor iedereen.',
    'Hang het canvas op en kom erop terug bij elke grote keuze en na het toonmoment: bereiken we wat we willen bereiken? Zo blijft de hele ploeg doelgericht.'
  ]),
  kernTabel([
    ['Doel', 'Samen het concept van het mediaproduct vastleggen, als houvast voor alle latere keuzes.'],
    ['Benodigdheden', 'Het canvas (volgende pagina, liggend, liefst op A3), de ideeën uit de brainstorm, post-its en stiften.'],
    ['Tijd', 'Een tot anderhalf uur.'],
    ['Wie', 'De jongeren, de jeugdprofessional en de mediamaker.'],
    ['Verder gebruik', 'Bij het storyboard (fase 2), de montage (fase 4) en na het toonmoment (fase 5 en 6).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Leg de ideeën uit de brainstorm op tafel.'),
  nummer('Schrijf de kernboodschap in één zin: wat moet je publiek onthouden?'),
  nummer('Kies het communicatiedoel, en spreek af wanneer het product geslaagd is.'),
  nummer('Beschrijf je publiek: wie is het, wat houdt hen bezig, en waar vind je hen?'),
  nummer('Bepaal wat je product anders maakt, en kies de vorm: welke stemmen, geluiden en beelden?'),
  leeg(120),
  doelenKader(),
  kop('', 'Wie beslist?'),
  bullet('Wiens boodschap staat in het vak kernboodschap: die van de jongeren, of die van de organisatie?'),
  bullet('Als het canvas en de groep het oneens zijn, wie beslist dan?'),
  uitDePraktijk('Een invulkader na de brainstorm met kernboodschap, doel, publiek en format, en een vaste opbouw die de groep zelf kiest (#HACKtisch). Bestaande voorbeelden tonen als vertrekpunt (Ik Ben Hier Ook). Een vast skelet waarbinnen de jongere alles zelf invult (Radio Z).')
];

// ---------------- Pagina 2: canvas, liggend ----------------
const LINKS = 5000, GAP = 300;
const RECHTS = LW - LINKS - GAP;
const R1 = Math.floor(RECHTS / 3), R2 = R1, R3 = RECHTS - 2 * R1;

function zone(naam, vraag, w, extra, o = {}) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, borders: zwartRand, columnSpan: o.span, rowSpan: o.rows,
    margins: { top: 0, bottom: 80, left: 0, right: 0 },
    children: [
      new Paragraph({ shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' }, spacing: { after: 60 }, indent: { left: 120, right: 120 },
        children: [t(naam.toUpperCase(), { bold: true, color: ACCENT, size: 19 })] }),
      new Paragraph({ spacing: { after: 60, line: 250 }, indent: { left: 120, right: 120 }, children: [t(vraag, { size: 17 })] }),
      ...(extra || [])
    ] });
}
const leegCel = (w, o = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: geenRand, rowSpan: o.rows, children: [new Paragraph({ children: [] })] });
const doelVakjes = new Paragraph({ spacing: { before: 60, after: 0 }, indent: { left: 120 },
  children: ['informeren', 'emotioneren', 'activeren'].map(v => t('☐ ' + v + '    ', { size: 19 })) });

const canvas = [
  new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: [LW - 2200, 2200], rows: [new TableRow({ children: [
    new TableCell({ width: { size: LW - 2200, type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.BOTTOM, children: [
      new Paragraph({ spacing: { after: 40 }, children: [t('CONCEPTCANVAS', { bold: true, color: ACCENT, size: 18 })] }),
      new Paragraph({ spacing: { after: 160 }, children: [t('Ons mediaproduct: ', { bold: true, size: 32 }), t('\u2026'.repeat(18), { size: 32 })] })
    ] }),
    new TableCell({ width: { size: 2200, type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.TOP, children: [
      new Paragraph({ alignment: AlignmentType.RIGHT, children: [beeld(path.join(IMG, 'logo-quindo.png'), 92, 30, 'Logo Quindo')] })
    ] })
  ] })] }),
  new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: [LINKS, GAP, R1, R2, R3], rows: [
    new TableRow({ height: { value: 3400, rule: 'exact' }, children: [
      zone('Kernboodschap in één zin', 'Wat moet je publiek onthouden? Ons product gaat over …', LINKS),
      leegCel(GAP, { rows: 3 }),
      zone('Publiek', 'Wie wil je bereiken? Wees concreet.', R1),
      zone('Wat houdt hen bezig?', 'Waar ligt je publiek van wakker?', R2),
      zone('Kanalen', 'Waar vind je je publiek? Online, offline, op een toonmoment?', R3)
    ] }),
    new TableRow({ height: { value: 3100, rule: 'exact' }, children: [
      zone('Communicatiedoel', 'Wat wil je bereiken? Wanneer is het product geslaagd?', LINKS, [doelVakjes]),
      zone('Vorm', 'Welke stemmen, geluiden en beelden? Hoe breng je het thema? Bijvoorbeeld voice-over, reportage, voxpop, interview, groepsgesprek, persoonlijk verhaal, hoorspel, muziek. En welke vaste opbouw: jingle, intro, interview, muziek?', RECHTS, null, { span: 3, rows: 2 })
    ] }),
    new TableRow({ height: { value: 2800, rule: 'exact' }, children: [
      zone('Meerwaarde', 'Wat maakt ons product anders? Wat kunnen wij vertellen dat anderen niet kunnen?', LINKS)
    ] })
  ] })
];

bewaar('Conceptcanvas', [
  { page: STAAND, children: fiche },
  { page: LIGGEND, children: canvas }
]);
