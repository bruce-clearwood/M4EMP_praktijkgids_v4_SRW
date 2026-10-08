// Tool: Checklist samenwerking (fase 1). Bouw: node checklist-samenwerking.js <uitvoer.docx>
const {
  W, STAAND, t, kop, label, bullet, nummer, lijnen, ficheKop, kernTabel,
  uitDePraktijk, kopCel, vakCel, checklistBlok, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, WidthType, PageBreak } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(1, 'Checklist samenwerking', [
    'Een mediaproject met jongeren maak je zelden alleen. Een jeugdwerking, een voorziening, een medialab of een school brengen elk hun eigen expertise mee. Veel van wat later vlot loopt, regel je bij de start.',
    'Met deze checklist overloop je met je partners alles wat vooraf afgesproken moet zijn: het doel, de rollen, wie waarover beslist, de plek, het tempo, het budget en de zorg voor de jongeren.'
  ]),
  kernTabel([
    ['Doel', 'Vooraf duidelijke afspraken maken met alle partners, zodat iedereen weet wie wat doet en wie waarover beslist.'],
    ['Benodigdheden', 'De checklist (volgende pagina’s), een pen, en je agenda.'],
    ['Tijd', 'Een overleg van een tot anderhalf uur.'],
    ['Wie', 'Alle partners: de jeugdprofessional, de mediamaker en wie verder betrokken is.'],
    ['Verder gebruik', 'Neem de checklist erbij als er iets verandert, en bij de evaluatie (fase 6).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Plan een overleg met alle partners voor het project start.'),
  nummer('Overloop de checklist samen. Vink af wat geregeld is, en noteer de afspraak en wie ervoor zorgt.'),
  nummer('Wat nog niet geregeld is, krijgt een naam en een datum.'),
  nummer('Bezorg iedereen een kopie van de ingevulde checklist.'),
  kop('', 'Wie beslist?'),
  bullet('Beslissen de partners over het product, of de jongeren?'),
  bullet('Wie bewaakt dat de doelen van de organisaties niet in de interviewvragen sluipen?'),
  bullet('Hoe en wanneer horen de jongeren welke afspraken er gemaakt zijn?'),
  uitDePraktijk('Een tandem van iemand met mediakennis en iemand die zorgt voor de jongeren (Ik Ben Hier Ook, #HACKtisch, 18 en dan?). Afspraken met partners op papier (#HACKtisch, Radio Z). De plek bewust kiezen (Ik Ben Hier Ook, Radio Z, Radio Vandewalle). Het budget vooraf uitrekenen (Radio Vandewalle, FOSCAST, Rupture). Het tempo afstemmen op de jongeren (Radio Z, #HACKtisch).', 1100)
];

// ---------------- Checklist ----------------
function partnerTabel(aantal) {
  const kol = [3600, 3200, W - 6800];
  const rijen = [new TableRow({ children: ['Organisatie', 'Contactpersoon', 'Rol in het project'].map((txt, i) => kopCel(txt, kol[i], { grootte: 18 })) })];
  for (let i = 0; i < aantal; i++) rijen.push(new TableRow({ height: { value: 480, rule: 'atLeast' }, children: kol.map(vakCel) }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: rijen });
}

const checklist = [
  new Paragraph({ children: [new PageBreak()] }),
  label('CHECKLIST SAMENWERKING'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Onze afspraken met partners', { bold: true, size: 36 })] }),
  lijnen(['Project', 'Datum van het overleg']),
  new Paragraph({ spacing: { before: 160, after: 80 }, children: [t('Partners', { bold: true, size: 24 })] }),
  partnerTabel(4),
  new Paragraph({ spacing: { before: 200, after: 80 }, children: [t('Vink af wat geregeld is. Noteer rechts de afspraak en wie ervoor zorgt.', { size: 18 })] }),

  ...checklistBlok('1  Het doel', [
    'We weten wat het project wil bereiken, voor de jongeren en voor elke organisatie.',
    'We vertellen het doel aan de jongeren in dezelfde woorden als aan een subsidiegever.',
    'We weten wat elke partner meebrengt: expertise, materiaal, ruimte, contacten.'
  ]),
  ...checklistBlok('2  De rollen', [
    'Er is iemand met mediakennis.',
    'Er is iemand die zorgt voor de jongeren, en die ze vertrouwen.',
    'Beide rollen zijn ook echt ingevuld op elke werkdag.',
    'De jongeren weten bij wie ze terechtkunnen.'
  ]),
  ...checklistBlok('3  Wie beslist wat?', [
    'Wat er in het product komt. De jongeren hebben knip- en plakrecht.',
    'Wanneer we een opname stoppen.',
    'Waar het product getoond wordt, en hoe lang.',
    'Wie de rechten op het product heeft, en wie deelt in eventuele inkomsten.',
    'Wat er gebeurt met opnames die niet gebruikt worden.'
  ]),
  ...checklistBlok('4  Plek en tempo', [
    'We kozen de plek bewust: een vertrouwde plek, of een echte studio buiten de zorg.',
    'Het ritme is haalbaar voor jongeren en begeleiders.',
    'Het tijdstip past bij de jongeren en hun voorziening.',
    'De data voor de werkmomenten, de opnames en het toonmoment liggen vast.'
  ]),
  ...checklistBlok('5  Budget', [
    'Techniek en materiaal, of een studio van een mediapartner.',
    'Licenties voor muziek en software.',
    'Montage. Reken ruim: in Ik Ben Hier Ook ging ongeveer 80 van de 150 begeleidingsuren naar montage.',
    'Toegankelijkheid: vervoer, eten, aangepaste ruimte.',
    'Het toonmoment.',
    'Een vergoeding of erkenning voor de jongeren.'
  ]),
  ...checklistBlok('6  Toestemming en zorg', [
    'We kennen de procedures van elke organisatie, ook voor minderjarigen (ouders of voogd).',
    'We weten wie opvolgt als een jongere twijfelt of spijt heeft, ook na het project.',
    'We spraken af of wat we horen meegaat in de begeleiding of het dossier, en de jongeren weten dat.',
    'We weten wat we doen als er iets gezegd wordt dat ons tot handelen verplicht.',
    'We weten hoe we makers en voorziening vermelden zonder te tonen wie cliënt is.'
  ])
];

bewaar('Checklist samenwerking', [
  { page: STAAND, children: [...fiche, ...checklist] }
]);
