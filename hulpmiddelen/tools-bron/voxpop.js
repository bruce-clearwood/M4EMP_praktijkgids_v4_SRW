// Tool: Voxpop (fase 3). Bouw: node voxpop.js <uitvoer.docx>
const {
  ACCENT, ZACHT, W, STAAND, geen, zwartRand, t, kop, label, klein,
  bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk, kopCel, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, AlignmentType, VerticalAlign, PageBreak } = require('docx');

// Kader met een voorbeeldzin om te zeggen
function zeg(regels) {
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' },
    borders: { top: geen, bottom: geen, right: geen, left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT } },
    margins: { top: 100, bottom: 100, left: 200, right: 160 },
    children: regels.map(r => new Paragraph({ spacing: { after: 60, line: 276 }, children: [t(r)] }))
  })] })] });
}

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(3, 'Voxpop (straatinterviews)', [
    'Een voxpop is een reeks korte straatinterviews: je stelt voorbijgangers één vraag en verzamelt hun antwoorden. Het woord komt van het Latijnse vox populi, de stem van het volk. Zo hoor je in korte tijd veel verschillende stemmen over één onderwerp.',
    'Voor jongeren is het een laagdrempelige manier om zelf te interviewen: ze spreken mensen aan, stellen hun vraag en luisteren. Deze tool helpt om de juiste vraag te kiezen, mensen aan te spreken, door te vragen en goed op te nemen.'
  ]),
  kernTabel([
    ['Doel', 'Minstens vijftien antwoorden verzamelen op één vraag, zodat je bij de montage kan kiezen en de antwoorden samen een eerlijk beeld geven.'],
    ['Benodigdheden', 'Een opnametoestel of smartphone met een microfoon en een windkap, een koptelefoon, en het invulblad (volgende pagina’s) om mee te nemen.'],
    ['Tijd', 'Een twintigtal minuten om voor te bereiden, een uur op straat.'],
    ['Wie', 'Jongeren per twee: de ene stelt de vraag, de andere zorgt voor het geluid. Een begeleider blijft in de buurt.'],
    ['Verder gebruik', 'Gebruik de turflijst bij de montage (fase 4) om antwoorden te kiezen die samen kloppen.']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Kies samen de vraag, en bedenk twee andere manieren om hetzelfde te vragen. Test ze eerst op elkaar.'),
  nummer('Kies een plek waar veel verschillende mensen voorbijkomen, en waar het niet te lawaaierig is.'),
  nummer('Test het geluid: neem tien seconden op en luister terug.'),
  nummer('Spreek mensen aan, vraag of je mag opnemen, en stel je vraag. Vraag door als het antwoord kort is.'),
  nummer('Hou de turflijst bij: wie antwoordde, en wat zei die persoon in een paar woorden? Ga door tot je minstens vijftien antwoorden hebt. Zo heb je ruimte om te kiezen.'),
  nummer('Kies na afloop samen welke antwoorden in het product komen.'),
  kop('', 'Wie beslist?'),
  bullet('Wie kiest de vraag: de jongeren, of jij?'),
  bullet('Weten voorbijgangers waar hun stem te horen zal zijn, en kunnen ze makkelijk nee zeggen?'),
  bullet('Wie kiest bij de montage welke antwoorden blijven, en geven die samen een eerlijk beeld?'),
  uitDePraktijk('Jongeren die per twee met een opnamekit de straat op gaan om voorbijgangers te bevragen, met kits die tussen de sessies in de werking blijven staan (#HACKtisch).')
];

// ---------------- Pagina 2: de vraag en het gesprek ----------------
const pagina2 = [
  new Paragraph({ children: [new PageBreak()] }),
  label('VOXPOP'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Onze voxpop', { bold: true, size: 40 })] }),
  lijnen(['Namen', 'Plek en datum']),

  kop('1', 'De vraag'),
  klein('Een goede voxpopvraag is kort, gaat over één ding, en iedereen kan erop antwoorden. Vermijd vragen waarop je enkel ja of nee kan zeggen.'),
  lijnen(['Wat willen we weten?', 'Onze vraag', 'Anders gevraagd', 'Nog anders gevraagd'], 2600),

  kop('2', 'Aanspreken'),
  klein('Spreek mensen vriendelijk aan, zeg wie je bent en vraag of je mag opnemen. Zegt iemand nee? Bedank, en spreek de volgende aan.'),
  zeg(['“Hallo, mogen we je één vraag stellen? We zijn … van … en we maken een … over … Het duurt maar een minuutje.”',
       '“Is het oké dat je stem te horen is in …?”']),

  kop('3', 'Doorvragen'),
  klein('Krijg je een kort antwoord? Vraag door, of zwijg even: vaak vertelt iemand dan vanzelf meer.'),
  zeg(['“Waarom vind je dat?”   “Kan je een voorbeeld geven?”   “Wat bedoel je met …?”',
       '“Hoe komt dat, denk je?”   “Wat zou er moeten veranderen?”']),

  kop('4', 'Afronden'),
  zeg(['“Wil je nog iets toevoegen?”',
       '“Merci! Je kan het binnenkort horen op …”']),
  klein('Stop de opname pas na het bedanken.')
];

// ---------------- Pagina 3: techniek en turflijst ----------------
function turflijst(aantal) {
  const kol = [500, 2700, W - 500 - 2700 - 1300, 1300];
  const cel = (txt, i, o = {}) => new TableCell({ width: { size: kol[i], type: WidthType.DXA }, borders: zwartRand, verticalAlign: VerticalAlign.CENTER,
    margins: { top: 30, bottom: 30, left: 100, right: 100 },
    children: [new Paragraph({ alignment: o.midden ? AlignmentType.CENTER : AlignmentType.LEFT, spacing: { after: 0 }, children: [t(txt, o.run || {})] })] });
  const rijen = [new TableRow({ tableHeader: true, children: ['Nr', 'Wie? (bv. oudere man, meisje in groep)', 'Antwoord in een paar woorden', 'Gebruiken?'].map((txt, i) => kopCel(txt, kol[i], { grootte: 18 })) })];
  for (let i = 1; i <= aantal; i++) rijen.push(new TableRow({ height: { value: 480, rule: 'atLeast' }, cantSplit: true, children: [
    cel(String(i), 0, { run: { bold: true, color: ACCENT } }), cel('', 1), cel('', 2), cel('☐', 3, { midden: true, run: { size: 24 } })] }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: rijen });
}

const pagina3 = [
  new Paragraph({ children: [new PageBreak()] }),
  kop('5', 'Goed opnemen'),
  bullet('Hou de microfoon op een handbreedte van de mond van wie spreekt. Richt hem telkens naar wie aan het woord is: naar jezelf bij de vraag, naar de ander bij het antwoord.'),
  bullet('Hou je hand stil op de microfoon. Wrijven of verschuiven hoor je op de opname.'),
  bullet('Gebruik een windkap, en zoek een plek uit de wind en weg van verkeer of muziek.'),
  bullet('Zet de koptelefoon op, zodat je hoort wat je opneemt.'),
  bullet('Start de opname voor je de vraag stelt, en stop pas na het bedanken.'),
  bullet('Neem ook een halve minuut omgevingsgeluid op. Dat helpt bij de montage.'),

  kop('6', 'Wie hebben we gesproken?'),
  klein('Verzamel minstens vijftien antwoorden, zo heb je ruimte bij de montage. Je wil uiteenlopende antwoorden, maar ook een echt beeld. Spreek mensen aan van verschillende leeftijden en achtergronden, alleen en in groep. Kies bij de montage niet alleen de grappigste of de felste antwoorden.'),
  turflijst(16)
];

bewaar('Voxpop (straatinterviews)', [
  { page: STAAND, children: [...fiche, ...pagina2, ...pagina3] }
]);
