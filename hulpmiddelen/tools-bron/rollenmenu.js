// Tool: Rollenmenu (fase 1). Bouw: node rollenmenu.js <uitvoer.docx>
const {
  ACCENT, ZACHT, W, LW, STAAND, LIGGEND, geen, geenRand, zwartRand, t,
  leeg, kop, klein, bullet, nummer, ficheKop, kernTabel, uitDePraktijk, kopCel, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, VerticalAlign } = require('docx');

function kader(titelTekst, regels) {
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' },
    borders: { top: geen, bottom: geen, right: geen, left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT } },
    margins: { top: 100, bottom: 100, left: 200, right: 160 },
    children: [new Paragraph({ spacing: { after: 60 }, children: [t(titelTekst, { bold: true })] }),
      ...regels.map(r => new Paragraph({ spacing: { after: 40, line: 276 }, children: [t(r)] }))]
  })] })] });
}

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(1, 'Rollenmenu', [
    'Om een podcast, radio-uitzending of film te maken, zijn veel rollen nodig. Niet iedereen hoeft voor de camera of de microfoon. Met het rollenmenu bedenken de jongeren zelf welke rollen er allemaal zijn, en kiest elk een rol die past: in beeld, te horen, of achter de schermen.',
    'Zo kan iedereen meedoen, ook wie zijn eigen verhaal niet wil vertellen. En wie een rol opneemt, wordt aangesproken als maker.'
  ]),
  kernTabel([
    ['Doel', 'Samen ontdekken welke rollen er nodig zijn, zodat elke jongere een plek vindt die bij hem past.'],
    ['Benodigdheden', 'Het canvas (liggend, groot afdrukken mag) en het menu (laatste pagina). Post-its en stiften.'],
    ['Tijd', 'Ongeveer drie kwartier.'],
    ['Wie', 'De jongeren, met de jeugdprofessional en de mediamaker als hulp bij vragen.'],
    ['Verder gebruik', 'Bekijk het menu bij de start van de productie (fase 3). Rollen mogen wisselen.']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Vertel kort wat je samen gaat maken. Vraag dan: wat moet er allemaal gebeuren voor, tijdens en na de opname?'),
  nummer('Laat de jongeren elke taak op een post-it schrijven en op het canvas kleven.'),
  nummer('Groepeer samen de taken die bij elkaar horen. Zo ontstaan de rollen. Geef elke rol een naam.'),
  nummer('Zet de rollen in het menu: wat doe je, en ben je in beeld, te horen of achter de schermen?'),
  nummer('Laat elke jongere kiezen, eventueel met een eerste en een tweede keuze. Wisselen mag.'),
  leeg(120),
  kader('Lopen ze vast? Geef dan een paar voorbeelden.', ['Presentator, interviewer, camera, geluid, muziek, scenario, fotografie, grafisch werk, locaties zoeken, catering, meeluisteren, promotie.']),
  kop('', 'Wie beslist?'),
  bullet('Bedenken de jongeren de rollen zelf, of krijgen ze een lijst van jou?'),
  bullet('Kiest elke jongere zelf, of wijs jij de rollen toe?'),
  bullet('Worden ook de rollen achter de schermen vermeld bij de makers?'),
  uitDePraktijk('Rollen van verschillende zwaarte, van presentator tot meeluisteren met audio, zodat ook wie niet wil vertellen meedoet (Ik Ben Hier Ook, FOSCAST). In Ik Ben Hier Ook kwam het idee om ook rollen als catering, fotografie, grafisch werk of locaties zoeken op te nemen.')
];

// ---------------- Pagina 2: canvas, liggend ----------------
const GAP = 300;
const KOL = Math.floor((LW - 2 * GAP) / 3);
const KOL3 = LW - 2 * KOL - 2 * GAP;
function zone(naam, vraag, w) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, borders: zwartRand,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({ spacing: { after: 40 }, children: [t(naam, { bold: true, color: ACCENT, size: 28 })] }),
      new Paragraph({ spacing: { after: 0 }, children: [t(vraag, { size: 19 })] })
    ] });
}
const leegCel = (w) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: geenRand, children: [new Paragraph({ children: [] })] });
const canvas = [
  new Paragraph({ spacing: { after: 40 }, children: [t('ROLLENMENU', { bold: true, color: ACCENT, size: 18 })] }),
  new Paragraph({ spacing: { after: 60 }, children: [t('Wat moet er allemaal gebeuren?', { bold: true, size: 36 })] }),
  new Paragraph({ spacing: { after: 160 }, children: [t('Schrijf elke taak op een post-it en kleef hem in de juiste kolom. Groepeer daarna wat bij elkaar hoort: zo ontstaan de rollen.', { size: 20 })] }),
  new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: [KOL, GAP, KOL, GAP, KOL3], rows: [
    new TableRow({ height: { value: 8200, rule: 'exact' }, children: [
      zone('Voor de opname', 'Wat moet er klaar zijn? Denk aan het verhaal, de plek, het materiaal, de mensen.', KOL), leegCel(GAP),
      zone('Tijdens de opname', 'Wat gebeurt er voor en achter de camera of microfoon?', KOL), leegCel(GAP),
      zone('Na de opname', 'Wat moet er nog gebeuren tot het product een publiek bereikt?', KOL3)
    ] })
  ] })
];

// ---------------- Pagina 3: het menu ----------------
function menuTabel(aantal) {
  const kol = [2000, W - 2000 - 2300 - 1600, 2300, 1600];
  const cel = (inhoud, i) => new TableCell({ width: { size: kol[i], type: WidthType.DXA }, borders: zwartRand, verticalAlign: VerticalAlign.CENTER,
    margins: { top: 40, bottom: 40, left: 100, right: 100 }, children: inhoud });
  const vakjes = () => ['in beeld', 'te horen', 'achter de schermen'].map(v =>
    new Paragraph({ spacing: { after: 0 }, children: [t('\u2610\u00a0' + v.replace(/ /g, '\u00a0'), { size: 18 })] }));
  const rijen = [new TableRow({ tableHeader: true, children: ['Rol', 'Wat doe je?', 'Je bent', 'Wie?'].map((txt, i) => kopCel(txt, kol[i], { grootte: 18 })) })];
  for (let i = 0; i < aantal; i++) rijen.push(new TableRow({ height: { value: 900, rule: 'atLeast' }, cantSplit: true, children: [
    cel([new Paragraph({ children: [] })], 0), cel([new Paragraph({ children: [] })], 1), cel(vakjes(), 2), cel([new Paragraph({ children: [] })], 3)] }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: rijen });
}
const menu = [
  new Paragraph({ spacing: { after: 40 }, children: [t('ROLLENMENU', { bold: true, color: ACCENT, size: 18 })] }),
  new Paragraph({ spacing: { after: 120 }, children: [t('Ons rollenmenu', { bold: true, size: 40 })] }),
  klein('Zet de rollen die je vond in het menu. Kies daarna wie welke rol neemt. Een rol mag je ook samen doen, of later wisselen.'),
  leeg(80),
  menuTabel(11)
];

bewaar('Rollenmenu', [
  { page: STAAND, children: fiche },
  { page: LIGGEND, children: canvas },
  { page: STAAND, children: menu }
]);
