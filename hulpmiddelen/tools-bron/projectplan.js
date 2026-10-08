// Tool: Projectplan (fase 1). Bouw: node projectplan.js <uitvoer.docx>
const {
  ACCENT, ZACHT, W, LW, STAAND, LIGGEND, zwartRand, t, p, kop,
  klein, bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk, kopMetLogo, kopCel, vakCel,
  bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, ShadingType, PageBreak } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(1, 'Projectplan', [
    'Met het projectplan geven de jongeren zelf vorm aan het proces. Ze plannen achterstevoren: ze beginnen bij het eindpunt, en werken van daaruit terug naar vandaag. In het Engels heet die manier van plannen backwards design.',
    'Eerst beschrijven ze het afgewerkte product en wat ze ermee willen bereiken. Daarna bedenken ze wat er allemaal moet gebeuren, wat ze moeten leren en wat ze nodig hebben. Dat zetten ze in een plan dat loopt van vandaag tot na het toonmoment. Ze vullen het in van achter naar voor.'
  ]),
  kernTabel([
    ['Doel', 'De jongeren laten bepalen hoe het proces verloopt, vanuit wat ze zelf willen bereiken.'],
    ['Benodigdheden', 'Het werkblad “Ons eindpunt” en het projectplan (liggend, liefst op A3). Post-its, stiften en een kalender.'],
    ['Tijd', 'Ongeveer anderhalf uur, eventueel verspreid over twee sessies.'],
    ['Wie', 'De jongeren. De jeugdprofessional en de mediamaker helpen met wat haalbaar is in tijd en techniek.'],
    ['Verder gebruik', 'Pas het plan aan na het conceptcanvas (fase 2), en kijk er bij elke werksessie naar: liggen we op schema?']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Begin bij het eindpunt. Beschrijf het afgewerkte product en het toonmoment: wat, waar, wanneer en voor wie? En wat gebeurt er daarna: waar is het te zien of te horen, en hoe lang?'),
  nummer('Spreek af wat je wil bereiken, en hoe je weet dat het gelukt is.'),
  nummer('Bedenk wat er allemaal moet gebeuren, wat je moet leren of kunnen, en wat of wie je nodig hebt. Eén idee per post-it.'),
  nummer('Vul het plan van onder naar boven in. Begin bij het toonmoment en wat daarna komt. Wat moet klaar zijn een week voor het toonmoment? En daarvoor? Ga zo door tot vandaag.'),
  nummer('Zet bij elke stap wie ervoor zorgt. Klopt de planning niet? Schrap, verschuif of vraag hulp.'),
  kop('', 'Wie beslist?'),
  bullet('Wie formuleert het eindpunt: de jongeren, of de begeleiders?'),
  bullet('Is er in de planning tijd voorzien om samen te beslissen? Samen beslissen gaat trager.'),
  bullet('Als het plan niet haalbaar blijkt, wie past het dan aan?'),
  p([t('De Checklist samenwerking is voor de afspraken tussen de begeleiders en de partners. Dit projectplan maken de jongeren zelf.', { size: 19 })], { spacing: { before: 160 } }),
  uitDePraktijk('Elke beslissing, ook een praktische, gaat eerst naar de groep (Radio Vandewalle). Het ritme volgt wat jongeren en begeleiders volhouden (Radio Z, #HACKtisch).')
];

// ---------------- Pagina 2: ons eindpunt ----------------
function drieKolommen() {
  const kol = [Math.floor(W / 3), Math.floor(W / 3), W - 2 * Math.floor(W / 3)];
  const koppen = [['Wat moet er gebeuren?', 'Opnames, montage, uitnodigingen …'], ['Wat moeten we leren of kunnen?', 'Interviewen, monteren, presenteren …'], ['Wat of wie hebben we nodig?', 'Materiaal, een plek, een gast …']];
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: [
    new TableRow({ children: koppen.map(([txt, sub], i) => kopCel(txt, kol[i], { grootte: 19, sub })) }),
    new TableRow({ height: { value: 5000, rule: 'exact' }, children: kol.map(vakCel) })
  ] });
}
const eindpunt = [
  new Paragraph({ children: [new PageBreak()] }),
  kopMetLogo('PROJECTPLAN', 'Ons eindpunt'),
  klein('Begin bij het einde: hoe ziet het eruit als alles af is?'),
  kop('1', 'Ons product'),
  lijnen(['Wat maken we?', 'Hoe lang duurt het?']),
  kop('2', 'Het toonmoment'),
  lijnen(['Waar?', 'Wanneer?', 'Voor wie?', 'En daarna?']),
  kop('3', 'Wat willen we bereiken?'),
  lijnen(['Bij ons publiek', 'Voor onszelf']),
  kop('4', 'Hoe weten we dat het gelukt is?'),
  lijnen(['', '']),
  kop('5', 'Wat is er allemaal nodig?'),
  drieKolommen()
];

// ---------------- Pagina 3: projectplan, liggend ----------------
function planTabel(aantal) {
  const kol = [1900, 4000, 4600, 1900, LW - 12400];
  const cel = (i, txt, o = {}) => new TableCell({ width: { size: kol[i], type: WidthType.DXA }, borders: zwartRand,
    shading: o.vol ? { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({ spacing: { after: 0 }, children: txt ? [t(txt, { bold: true, color: ACCENT, size: 18 })] : [] }),
      ...(o.hint ? [new Paragraph({ spacing: { after: 0, line: 230 }, children: [t(o.hint, { size: 15 })] })] : [])] });
  const rij = (eerste, tweede, o = {}) => new TableRow({ cantSplit: true, height: { value: 620, rule: 'atLeast' }, children: [
    cel(0, eerste, { vol: o.vol }), cel(1, tweede, o), cel(2, '', { vol: o.vol }), cel(3, '', { vol: o.vol }), cel(4, '', { vol: o.vol })] });
  const rijen = [new TableRow({ tableHeader: true, children: ['Wanneer?', 'Wat moet dan klaar zijn?', 'Wat doen we daarvoor?', 'Wie zorgt ervoor?', 'Wat leren we?'].map((txt, i) => kopCel(txt, kol[i])) }),
    rij('Vandaag', 'De start', { vol: true })];
  for (let i = 0; i < aantal; i++) rijen.push(rij('', ''));
  rijen.push(rij('', 'Het toonmoment', { vol: true }));
  rijen.push(rij('', 'Na het toonmoment', { vol: true, hint: 'Waar is het daarna te zien of te horen? Op welk platform, hoe lang, en wie beslist dat?' }));
  return new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: kol, rows: rijen });
}
const plan = [
  kopMetLogo('PROJECTPLAN', 'Ons projectplan', LW),
  new Paragraph({ spacing: { after: 120 }, children: [t('Vul eerst de onderste rijen in: het toonmoment en wat daarna komt. Werk dan naar boven, terug naar vandaag. Wat moet er een week voor het toonmoment klaar zijn? En daarvoor?', { size: 18 })] }),
  planTabel(8)
];

bewaar('Projectplan', [
  { page: STAAND, children: [...fiche, ...eindpunt] },
  { page: LIGGEND, children: plan }
]);
