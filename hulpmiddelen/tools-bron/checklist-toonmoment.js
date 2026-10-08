// Tool: Checklist toonmoment (fase 5). Bouw: node checklist-toonmoment.js <uitvoer.docx>
const {
  STAAND, t, kop, label, bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk,
  checklistBlok, bewaar
} = require('./lib.js');
const { Paragraph, PageBreak } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(5, 'Checklist toonmoment', [
    'Op het toonmoment bereikt het product een publiek. Dat kan een eenmalige première zijn, een terugkerend live-moment of een publicatie online. Voor jongeren verschuift de vraag dan van “wat wil ik vertellen?” naar “wat wil ik dat hiermee naar buiten gaat?”.',
    'Met deze checklist bereid je het toonmoment samen met de jongeren voor: waar en voor wie, wie vermeld wordt, hoe je het bekendmaakt, wat er op de dag zelf gebeurt, en wat erna komt. Niet alles geldt voor elke vorm. Schrap wat niet past.'
  ]),
  kernTabel([
    ['Doel', 'Samen het toonmoment voorbereiden, zodat de jongeren weten wat er gebeurt, welke rol ze opnemen en wat publiek concreet betekent.'],
    ['Benodigdheden', 'De checklist (volgende pagina’s), het projectplan (fase 1) en je agenda.'],
    ['Tijd', 'Een overleg van ongeveer een uur, een paar weken voor het toonmoment. Op de dag zelf een korte check.'],
    ['Wie', 'De jongeren, de jeugdprofessional en de mediamaker. Partners als het toonmoment bij hen plaatsvindt.'],
    ['Verder gebruik', 'Neem de afspraken over wat na het toonmoment komt mee naar de checklist nazorg (fase 6).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Kies samen de vorm: een première, een live-moment of een publicatie online.'),
  nummer('Overloop de checklist een paar weken vooraf. Vink af wat geregeld is, en schrap wat niet past.'),
  nummer('Noteer rechts de afspraak en wie ervoor zorgt.'),
  nummer('Overloop op de dag zelf nog eens blok 4.'),
  kop('', 'Wie beslist?'),
  bullet('Beslist de jongere mee waar en voor wie het product getoond wordt?'),
  bullet('Kiest elke jongere zelf zijn rol, ook als dat geen rol op het podium is?'),
  bullet('Wie beslist welke fragmenten, beelden en citaten in de bekendmaking komen?'),
  uitDePraktijk('Een première in een echte zaal, met familie (Ik Ben Hier Ook). Een première op een dag waarop professionals al samenkomen (18 en dan?). Jongeren die de vertoningen inleiden (Rupture) of het nagesprek overnemen (18 en dan?). Familie en leefgroep vooraf verwittigen (Radio Z). Teasers die online kwamen voor de jongeren goed wisten wat dat betekende, riepen weerstand op (18 en dan?).', 1100)
];

// ---------------- Checklist ----------------

const checklist = [
  new Paragraph({ children: [new PageBreak()] }),
  label('CHECKLIST TOONMOMENT'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Ons toonmoment', { bold: true, size: 36 })] }),
  lijnen(['Project', 'Waar en wanneer?', 'Vorm']),
  new Paragraph({ spacing: { before: 200, after: 80 }, children: [t('Vink af wat geregeld is. Noteer rechts de afspraak en wie ervoor zorgt.', { size: 18 })] }),

  ...checklistBlok('1  Waar, wanneer en voor wie', [
    'We kozen samen de vorm: een première, een live-moment of een publicatie online.',
    'De jongeren weten wie het product te zien of te horen krijgt, en hoe lang het beschikbaar blijft.',
    'Bij minderjarigen beslissen de ouders of de voogd mee.',
    'Plek, datum en uur liggen vast. De plek is bereikbaar en toegankelijk voor wie we uitnodigen.',
    'De techniek is getest: beeld, geluid, en internet voor een livestream of chat.'
  ]),
  ...checklistBlok('2  Wie wordt vermeld, en hoe', [
    'Elke jongere koos of hij als maker vermeld wordt, en onder welke naam.',
    'Werk je in de jeugdhulp? Makers en voorziening worden zo vermeld dat niet blijkt wie cliënt is.',
    'Wie herkenbaar in het product voorkomt, weet dat het getoond wordt.'
  ]),
  ...checklistBlok('3  Bekendmaken', [
    'We kozen de kanalen: uitnodiging, persbericht, sociale media, partners.',
    'Beeld, naam en citaten van jongeren gebruiken we enkel met hun toestemming, ook in teasers en fragmenten.',
    'De jongeren nodigen zelf mensen uit, en hun familie of leefgroep is verwittigd.'
  ]),
  ...checklistBlok('4  Op de dag zelf', [
    'Elke jongere kiest zijn rol: inleiden, het nagesprek leiden, op het podium staan, of in de zaal zitten.',
    'Wie spreekt, heeft dat vooraf kunnen oefenen.',
    'Er is iemand voor de jongeren, los van de organisatie van het toonmoment.',
    'We spraken af wat we doen als een jongere het moeilijk krijgt, of niet meer wil.',
    'We weten wat genodigden kunnen beloven, en of we dat kunnen waarmaken.',
    'Er is een moment van erkenning: een bedanking, een afsluiter met de hele groep.'
  ]),
  ...checklistBlok('5  Na het toonmoment', [
    'We spraken af wie er de dagen erna is voor de jongeren.',
    'We delen de reacties en de cijfers met de makers.',
    'De datum voor de evaluatie ligt vast (checklist nazorg, fase 6).'
  ])
];

bewaar('Checklist toonmoment', [
  { page: STAAND, children: [...fiche, ...checklist] }
]);
