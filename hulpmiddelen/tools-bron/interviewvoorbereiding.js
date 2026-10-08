// Tool: Interviewvoorbereiding (fase 2). Bouw: node interviewvoorbereiding.js <uitvoer.docx>
const {
  ACCENT, ZACHT, W, STAAND, geen, geenRand, zwart, t, p, leeg,
  kop, bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, ShadingType, PageBreak } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(2, 'Interviewvoorbereiding', [
    'Een goed interview begint met één vraag: wat wil ik te weten komen? Wie dat scherp heeft, stelt betere vragen en luistert beter.',
    'Deze tool helpt je een interview op te bouwen in drie delen: een kennismaking, de diepte in, en een afsluiting. Met hoofdvragen die het gesprek dragen, en bijvragen om door te vragen. Je kan hem gebruiken als de jongere zelf interviewt, en als je samen een interview met een jongere voorbereidt.'
  ]),
  kernTabel([
    ['Doel', 'Een interview voorbereiden dat antwoord geeft op wat je echt wil weten, met ruimte om te luisteren en door te vragen.'],
    ['Benodigdheden', 'Het invulblad (volgende pagina’s), een pen, een opnametoestel dat je vooraf getest hebt.'],
    ['Tijd', 'Ongeveer drie kwartier om voor te bereiden.'],
    ['Wie', 'Wie interviewt: de jongere, de jeugdprofessional of de mediamaker. Bereid het samen voor.'],
    ['Verder gebruik', 'Neem je kernwoorden mee naar de opname (fase 3). Kijk bij de montage (fase 4) of je antwoord kreeg op je centrale vraag.']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Schrijf in één zin wat je te weten wil komen.'),
  nummer('Kies wie je interviewt, en waarom net die persoon.'),
  nummer('Zoek vooraf op wie je interviewt: wat doet die persoon, wat vertelde die al eerder? Vraag niet "Stel jezelf even voor". Dat zoek je zelf op, uit respect.'),
  nummer('Bouw het gesprek op in drie delen: kennismaking, diepte, afsluiting.'),
  nummer('Schrijf per deel een of twee hoofdvragen, met bijvragen om door te vragen.'),
  nummer('Spreek af wie wat doet: wie stelt de vragen, wie zit erbij, wie zorgt voor het geluid.'),
  nummer('Neem kernwoorden mee, geen lijst om voor te lezen. Luister, en vraag door.'),
  kop('', 'Wie beslist?'),
  bullet('Wie bepaalt wat je te weten wil komen: jij, de jongere, of jij samen met de jongere?'),
  bullet('Interview je een jongere over zijn eigen verhaal? Overloop de hoofdvragen dan vooraf samen. De jongere mag een vraag schrappen en hoeft niet op alles te antwoorden.'),
  bullet('Weet wie je interviewt wat er met het interview gebeurt?'),
  uitDePraktijk('Interviewvragen samen opstellen, en jongeren die zelf de vragen maken en zelf interviewen (Ik Ben Hier Ook, Chelsea’s Blues). Een vertrouwde begeleider naast de camera en een interviewer die de vragen stelt (18 en dan?).')
];

// ---------------- Pagina 2 en 3: invulblad ----------------
const LAB = 2000;
function deel(naam, uitleg, aantalHoofd) {
  const kopRij = new TableRow({ cantSplit: true, children: [new TableCell({
    columnSpan: 2, width: { size: W, type: WidthType.DXA },
    shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' },
    borders: { top: zwart, bottom: geen, left: geen, right: geen },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [
      new Paragraph({ spacing: { after: 40 }, children: [t(naam, { bold: true, color: ACCENT, size: 22 })] }),
      new Paragraph({ spacing: { after: 0, line: 260 }, children: [t(uitleg, { size: 18 })] })
    ] })] });
  const rijen = [kopRij];
  for (let i = 1; i <= aantalHoofd; i++) {
    // hoofdvraag en bijvragen in een rij, zodat ze nooit over twee pagina's gesplitst worden
    const labels = new TableCell({ width: { size: LAB, type: WidthType.DXA }, borders: geenRand, margins: { top: 140, left: 0, right: 120 },
      children: [
        new Paragraph({ spacing: { after: 250 }, children: [t(aantalHoofd > 1 ? 'Hoofdvraag ' + i : 'Hoofdvraag', { bold: true, size: 19 })] }),
        new Paragraph({ spacing: { after: 0 }, children: [t('Bijvragen', { bold: true, size: 19 })] })
      ] });
    const lijnenCel = new TableCell({ width: { size: W - LAB, type: WidthType.DXA }, borders: geenRand,
      children: [lijnen(['', '', ''], 0, W - LAB - 120)] });
    rijen.push(new TableRow({ cantSplit: true, children: [labels, lijnenCel] }));
  }
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [LAB, W - LAB], rows: rijen });
}
const ruimte = () => leeg(160);

const invul = [
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ spacing: { after: 40 }, children: [t('INTERVIEWVOORBEREIDING', { bold: true, color: ACCENT, size: 18 })] }),
  new Paragraph({ spacing: { after: 120 }, children: [t('Mijn interview', { bold: true, size: 40 })] }),
  lijnen(['Naam', 'Wie interview ik?', 'Datum en plek']),

  kop('1', 'Wat wil ik te weten komen?'),
  p([t('Schrijf het in één zin. Niet: “Ik wil iets weten over …”. Wel: “Ik wil weten hoe …” of “Ik wil weten waarom …”.', { size: 18 })], { spacing: { after: 0 } }),
  lijnen(['', '']),

  kop('2', 'Wie is deze persoon?'),
  p([t('Zoek het vooraf op. Waarom net deze persoon? Wat weet je al?', { size: 18 })], { spacing: { after: 0 } }),
  lijnen(['', '']),

  kop('3', 'Wie doet wat?'),
  lijnen(['Wie stelt de vragen?', 'Wie zit erbij?', 'Wie zorgt voor geluid en beeld?'], 3600),

  kop('', 'Tijdens het interview'),
  bullet('Stel open vragen. Vermijd vragen waarop je enkel ja of nee kan antwoorden.'),
  bullet('Stel één vraag tegelijk, kort en duidelijk.'),
  bullet('Luister naar het antwoord, en vraag door op wat je hoort.'),
  bullet('Laat stiltes. Wie even zwijgt, vertelt vaak nog meer.'),
  bullet('Durf “domme” vragen te stellen. Wat voor jou logisch is, is dat niet voor je publiek.'),
  bullet('Blijf jezelf. Speel geen journalist, en spreek je eigen taal.'),
  new Paragraph({ children: [new PageBreak()] }),
  kop('4', 'Het gesprek'),
  p([t('Hoofdvragen dragen het gesprek. Met bijvragen vraag je door: wie, wat, waar, wanneer, waarom en hoe? Kan je een voorbeeld geven?', { size: 18 })], { spacing: { after: 120 } }),
  deel('Kennismaking', 'Stel jezelf voor. Zeg waarvoor het interview is en hoe lang het duurt. Vraag hoe de naam geschreven wordt. Begin met een makkelijke vraag, maar niet met \u201cStel jezelf even voor\u201d: dat heb je vooraf opgezocht.', 1),
  ruimte(),
  deel('Diepte', 'Hier zoek je het antwoord op je centrale vraag. Stel open vragen, één tegelijk.', 3),
  ruimte(),
  deel('Afsluiting', 'Een makkelijke laatste vraag, bijvoorbeeld: “Wil je nog iets zeggen dat we niet vroegen?” Bedank, en zeg wat er met het interview gebeurt.', 1)
];

bewaar('Interviewvoorbereiding', [
  { page: STAAND, children: [...fiche, ...invul] }
]);
