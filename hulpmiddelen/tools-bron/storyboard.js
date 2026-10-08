// Tool: Storyboard (fase 2). Bouw: node storyboard.js <uitvoer.docx>
const {
  ACCENT, LW, STAAND, LIGGEND, geen, geenRand, zwart, t, kop, label,
  bullet, nummer, lijnen, ficheKop, kernTabel, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(2, 'Storyboard', [
    'Een storyboard is je verhaal in tekeningen, beeld per beeld, nog voor je begint te filmen. Je beslist samen wat je wil tonen, in welke volgorde, en wat je erbij hoort. Zo weet iedereen bij de opname wat er moet gebeuren, en blijft het verhaal van de jongere.',
    'Maak je een podcast of een radio-uitzending? Gebruik het storyboard dan als draaiboek en noteer per vak wat je hoort.'
  ]),
  kernTabel([
    ['Doel', 'Samen het verhaal uittekenen, beeld per beeld, zodat de jongere bepaalt wat er getoond wordt en in welke volgorde.'],
    ['Benodigdheden', 'Het storyboard (twee pagina’s, liggend), afgedrukt per jongere of per groep. Potloden en stiften. Eventueel foto’s of tijdschriften om te knippen en te plakken.'],
    ['Tijd', 'Ongeveer een uur.'],
    ['Wie', 'De jongeren en de jeugdprofessional. De mediamaker zegt wat technisch kan.'],
    ['Verder gebruik', 'Neem het storyboard mee naar de opnames (fase 3) en de montage (fase 4).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Begin met de vraag bovenaan het storyboard: wat wil je tonen? Laat de jongere eerst vertellen, en teken pas daarna.'),
  nummer('Vul per vak in wat je ziet, wat er gebeurt en wat je hoort. Een stokfiguur volstaat. Je mag ook schrijven of een foto plakken.'),
  nummer('Leg de vakken in de juiste volgorde. Een vak schrappen of verplaatsen mag altijd.'),
  nummer('Overloop het storyboard met de mediamaker: wat is haalbaar, en wat is ervoor nodig?'),
  nummer('Neem het storyboard mee naar de opname. Wijk je ervan af, beslis dat dan samen met de jongere.'),
  kop('', 'Wie beslist?'),
  bullet('Van wie komen de beelden: van de jongere, of van jou?'),
  bullet('Kan de jongere een vak schrappen of verplaatsen zonder uit te leggen waarom?'),
  bullet('Is het storyboard een plan dat mag veranderen, of een keurslijf?')
];

// ---------------- Pagina 2 en 3: storyboard, liggend ----------------
const GAP = 360;
const KOL = Math.floor((LW - 2 * GAP) / 3);
const KOL3 = LW - 2 * KOL - 2 * GAP;
const kolommen = [KOL, GAP, KOL, GAP, KOL3];

function storyVak(inhoud, randen) {
  return new TableCell({ width: { size: KOL, type: WidthType.DXA }, borders: randen,
    margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: inhoud });
}
const tussen = () => new TableCell({ width: { size: GAP, type: WidthType.DXA }, borders: geenRand, children: [new Paragraph({ children: [] })] });
const regel = (txt, o = {}) => new Paragraph({ spacing: { after: 0 }, children: [t(txt, { size: 17, ...o })] });

function storyRij(start) {
  const nrs = [start, start + 1, start + 2];
  const rij = (hoogte, maak) => new TableRow({ height: { value: hoogte, rule: 'exact' }, cantSplit: true,
    children: [maak(nrs[0]), tussen(), maak(nrs[1]), tussen(), maak(nrs[2])] });
  return [
    rij(2500, n => storyVak([new Paragraph({ spacing: { after: 0 }, children: [t(String(n) + '  ', { bold: true, color: ACCENT, size: 22 }), t('Beeld', { bold: true, size: 17 }), t('  teken, schrijf of plak', { size: 17 })] })], { top: zwart, left: zwart, right: zwart, bottom: zwart })),
    rij(760, n => storyVak([regel('Wat zie je, wat gebeurt er?', { bold: true })], { top: geen, left: zwart, right: zwart, bottom: zwart })),
    rij(640, n => storyVak([regel('Wat hoor je? Stem, muziek, geluid', { bold: true })], { top: geen, left: zwart, right: zwart, bottom: zwart }))
  ];
}
const spacerRij = () => new TableRow({ height: { value: 280, rule: 'exact' },
  children: kolommen.map(w => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: geenRand, children: [new Paragraph({ children: [] })] })) });

function storyPagina(start, metKop) {
  const kopRegels = metKop ? [
    label('STORYBOARD'),
    lijnen(['Naam', 'Titel van het verhaal'], 2600, LW),
    new Paragraph({ spacing: { before: 160, after: 120 }, children: [t('Wat wil je in je verhaal tonen?', { bold: true, size: 26 })] })
  ] : [
    new Paragraph({ spacing: { after: 120 }, children: [t('STORYBOARD', { bold: true, color: ACCENT, size: 18 }), t('   vervolg', { size: 18 })] })
  ];
  return [
    ...kopRegels,
    new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: kolommen,
      rows: [...storyRij(start), spacerRij(), ...storyRij(start + 3)] })
  ];
}

bewaar('Storyboard', [
  { page: STAAND, children: fiche },
  { page: LIGGEND, children: storyPagina(1, true) },
  { page: LIGGEND, children: storyPagina(7, false) }
]);
