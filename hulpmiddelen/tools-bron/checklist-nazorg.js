// Tool: Checklist nazorg (fase 6). Bouw: node checklist-nazorg.js <uitvoer.docx>
const {
  STAAND, t, kop, label, bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk,
  checklistBlok, bewaar
} = require('./lib.js');
const { Paragraph, PageBreak } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(6, 'Checklist nazorg', [
    'Na het toonmoment rond je af. Een product blijft circuleren, en wat op je achttiende goed voelt, kan later anders aanvoelen. Het verhaal blijft van de maker, ook als anderen het tonen.',
    'Met deze checklist kijk je samen terug, en spreek je met elke jongere af wat er met het product gebeurt, wie hem opvolgt en hoe het traject eindigt. Die afspraken blijven gelden als het project voorbij is.'
  ]),
  kernTabel([
    ['Doel', 'Het traject zorgvuldig afronden, en afspraken maken die ook na het project blijven gelden.'],
    ['Benodigdheden', 'De checklist (volgende pagina’s), per jongere. Het toestemmingsformulier en het afsprakenkader (fase 2).'],
    ['Tijd', 'Een evaluatie in groep van ongeveer een uur, en per jongere een kort gesprek.'],
    ['Wie', 'De jongeren, de jeugdprofessional en de mediamaker. De organisatie, voor afspraken over later gebruik.'],
    ['Verder gebruik', 'Neem de checklist erbij bij elke nieuwe vraag om het product te tonen, en als een jongere zijn toestemming wil aanpassen.']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Kijk eerst samen terug, in groep.'),
  nummer('Overloop daarna met elke jongere apart de blokken 2, 3 en 4.'),
  nummer('Noteer rechts de afspraak en wie ervoor zorgt. Geef de jongere een kopie.'),
  nummer('Neem de checklist erbij bij elke nieuwe vraag om het product te gebruiken.'),
  kop('', 'Wie beslist?'),
  bullet('Wie beslist over nieuwe vertoningen: de jongere, of de organisatie?'),
  bullet('Wie vraagt de jongere om nog eens te komen vertellen, en kan hij tegen die persoon nee zeggen?'),
  bullet('Wie haalt het product weg als een jongere dat vraagt, ook jaren later?'),
  uitDePraktijk('Een evaluatie in groep, daarna afspraken per jongere over verdere vertoningen. Het eerste halfjaar niet vrij online: wie de film wilde tonen, vroeg het aan de makers (Ik Ben Hier Ook). Opnieuw toestemming bij elk nieuw gebruik (#HACKtisch, Ik Ben Hier Ook, Chelsea’s Blues). Persoonlijke opvolging tot een jaar na de publicatie (Chelsea’s Blues). Collega’s die de jongere zeggen dat ze geluisterd hebben (Radio Z).', 1100)
];

// ---------------- Checklist ----------------

const checklist = [
  new Paragraph({ children: [new PageBreak()] }),
  label('CHECKLIST NAZORG'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Onze afspraken voor later', { bold: true, size: 36 })] }),
  lijnen(['Project', 'Naam van de jongere', 'Datum']),
  new Paragraph({ spacing: { before: 200, after: 80 }, children: [t('Vink af wat geregeld is. Noteer rechts de afspraak en wie ervoor zorgt.', { size: 18 })] }),

  ...checklistBlok('1  Samen terugkijken', [
    'We kijken in groep terug: wat ging goed, wat was moeilijk, wat nemen we mee?',
    'Elke jongere kan ook apart iets vertellen dat hij niet in groep wil zeggen.',
    'Er is een moment van erkenning en afsluiting.'
  ]),
  ...checklistBlok('2  Het product', [
    'We spraken af waar het product nog getoond mag worden, en hoe lang.',
    'Het gaat vrij online, of wie het wil tonen vraagt het eerst aan de makers.',
    'Wil iemand het product voor iets anders gebruiken, ook in de begeleiding, een dossier of een verslag? Dan vragen we opnieuw toestemming.',
    'De jongere weet hoe en bij wie hij zijn toestemming kan aanpassen of intrekken, ook jaren later.',
    'We weten wie het product kan weghalen, en wat er over vijf jaar nog vindbaar is.',
    'De jongere kan zijn eigen, ongemonteerde materiaal krijgen.',
    'We spraken af wat er met het ruwe materiaal gebeurt, en wie erbij kan.'
  ]),
  ...checklistBlok('3  De jongere', [
    'We weten wie de jongere opvolgt na het project, en hoe lang.',
    'Collega’s en de eigen kring weten wat de jongere maakte, als hij dat wil.',
    'Gebruiken we het product in de begeleiding, dan weet en kiest de jongere dat.',
    'Vragen om te komen vertellen gaan eerst langs de jongere, en hij kan nee zeggen.',
    'We bekeken wat de jongere verder wil doen: een volgend project, een opleiding, vrijwilligerswerk.'
  ]),
  ...checklistBlok('4  Het einde', [
    'We spraken af wanneer het traject klaar is.',
    'De jongere kiest vrij of hij nog meegaat naar nieuwe vertoningen of gesprekken.',
    'De jongere kreeg een kopie van deze afspraken.'
  ])
];

bewaar('Checklist nazorg', [
  { page: STAAND, children: [...fiche, ...checklist] }
]);
