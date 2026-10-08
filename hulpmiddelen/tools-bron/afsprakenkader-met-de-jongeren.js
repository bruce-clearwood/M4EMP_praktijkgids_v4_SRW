// Tool: Afsprakenkader met de jongeren (fase 2). Bouw: node afsprakenkader-met-de-jongeren.js <uitvoer.docx>
const {
  path, ZACHT, W, STAAND, PICTO, geen, fijnRand, t, p, leeg,
  kop, label, bullet, nummer, vak, keuzes, beeld, lijnen, logos, titel,
  kernTabel, uitDePraktijk, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, PageBreak } = require('docx');

function beslisTabel() {
  const kol = [3300, 3600, W - 6900];
  const cel = (txt, kop = false, i = 0) => new TableCell({
    width: { size: kol[i], type: WidthType.DXA }, borders: fijnRand,
    shading: kop ? { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [p([t(txt, kop ? { bold: true } : {})], { spacing: { after: 0 } })]
  });
  const rijen = [
    ['Doe ik mee?', 'De jongere. Bij minderjarigen ook de ouders of de voogd.', 'Voor de start, en opnieuw wanneer je wil'],
    ['Wat vertel ik?', 'De jongere', 'Bij het concept en het script'],
    ['Mag dit fragment erin?', 'De jongere, en wie herkenbaar in beeld of geluid komt', 'Bij de check van de montage'],
    ['Waar tonen we het?', 'De jongere en de jeugdprofessional. Bij minderjarigen ook de ouders of de voogd.', 'Voor het product gedeeld wordt'],
    ['Wie volgt op bij twijfel of spijt?', '', 'Voor de start']
  ];
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: kol,
    rows: [new TableRow({ tableHeader: true, children: ['Vraag', 'Wie beslist?', 'Wanneer?'].map((x, i) => cel(x, true, i)) }),
      ...rijen.map(r => new TableRow({ cantSplit: true, children: r.map((x, i) => cel(x, false, i)) }))]
  });
}

function rechtenTabel() {
  const kol = [2600, W - 2600];
  const rij = (naam, uitleg) => new TableRow({ cantSplit: true, children: [
    new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: fijnRand, margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [p([t(naam, { bold: true })], { spacing: { after: 40 } }), p([t(uitleg, { size: 18 })], { spacing: { after: 0 } })] }),
    new TableCell({ width: { size: kol[1], type: WidthType.DXA }, borders: fijnRand, margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [p([t('Zo zeggen wij het:', { size: 18 })], { spacing: { after: 0 } }), lijnen(['', ''], 0, kol[1] - 240)] })
  ] });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: [
    rij('Start- en stoprecht', 'Je kiest zelf of je meedoet, en je mag altijd stoppen.'),
    rij('Praat- en zwijgrecht', 'Je kiest wat je vertelt, en je hoeft niet op elke vraag te antwoorden.'),
    rij('Knip- en plakrecht', 'Je beslist mee wat erin komt. Een stuk dat jij eruit wil, gaat eruit.')
  ] });
}

// ---------------- Pagina 1: fiche voor de jeugdprofessional ----------------
const fiche = [
  logos(),
  leeg(200),
  titel(2, 'Afsprakenkader met de jongeren'),
  leeg(120),

  kernTabel([
    ['Doel', 'Samen met de jongeren vastleggen wat zij beslissen, hoe ze kunnen stoppen en wat er met hun verhaal gebeurt, in hun eigen woorden.'],
    ['Benodigdheden', 'Het invulblad (volgende pagina\u2019s), afgedrukt per jongere of per groep. Een pen. De kaart met de drie rechten (laatste pagina), om aan elke jongere mee te geven.'],
    ['Tijd', 'Ongeveer een half uur.'],
    ['Wie', 'De jongeren en de jeugdprofessional. De mediamaker schuift aan als die later monteert.'],
    ['Verder gebruik', 'Bij de start van elke opname (fase 3) en bij de laatste check van de montage (fase 4).']
  ]),

  kop('', 'Zo gebruik je het'),
  nummer('Overloop de velden samen. Laat de jongere zelf schrijven, of schrijf letterlijk op wat hij zegt.'),
  nummer('Een veld mag open blijven. Kom er later op terug.'),
  nummer('Geef de jongere een kopie, en bewaar er zelf een.'),
  nummer('Neem het kader opnieuw door op de momenten die je in veld 8 afspreekt.'),
  p([t('Dit kader is geen contract en vraagt geen handtekening. De formele toestemming leg je vast in het toestemmingsformulier (zie de praktijkgids, Ethiek en toestemming).')], { spacing: { before: 120, after: 100 } }),

  kop('', 'Wie beslist?'),
  bullet('Is het kader ingevuld in de taal van de jongere, of in die van de organisatie?'),
  bullet('Kan de jongere een veld openlaten zonder dat het als nee telt?'),
  bullet('Bekijk je het echt opnieuw, of blijft het een blad in een map?'),

  uitDePraktijk('Een afspraak voor elk interview (18 en dan?), vaste momenten om over publiceren te praten (#HACKtisch), zichtbaarheid per moment kiezen (Radio Z), een kort charter over respect (Radio Vandewalle).')
];

// ---------------- Pagina 2 en 3: invulblad ----------------
const invul = [
  new Paragraph({ children: [new PageBreak()] }),
  label('AFSPRAKENKADER'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Onze afspraken', { bold: true, size: 40 })] }),
  lijnen(['Project', 'Naam of namen', 'Datum']),

  kop('1', 'Onze drie rechten, in onze woorden'),
  rechtenTabel(),
  lijnen(['Ons stopsignaal is']),

  kop('2', 'Zichtbaarheid'),
  keuzes('Mijn naam:', ['eigen naam', 'voornaam', 'schuilnaam']),
  keuzes('Mijn gezicht:', ['in beeld', 'onherkenbaar', 'niet in beeld']),
  keuzes('Mijn stem:', ['herkenbaar', 'vervormd', 'niet te horen']),
  lijnen(['Opmerkingen']),

  kop('3', 'Wat betekent publiek voor ons?'),
  keuzes('Waar?', ['in de groep', 'op een toonmoment', 'op een website', 'op sociale media', 'ergens anders']),
  keuzes('Hoe lang?', ['een keer', 'tijdelijk, tot \u2026\u2026\u2026\u2026', 'blijvend']),
  keuzes('Wie kan het zien?', ['een gesloten groep', 'iedereen met de link', 'iedereen, ook via zoekmachines']),
  p([t('Is het oké als iemand dit over vijf jaar nog vindt? Wat spreken we daarover af?', { bold: true })], { spacing: { before: 120, after: 0 } }),
  lijnen(['', '']),

  kop('4', 'Wie beslist wat?'),
  beslisTabel(),

  kop('5', 'Zo werken we samen'),
  p([t('Voor groepen: afspraken over respect en over hoe we met elkaar omgaan.', { size: 18 })], { spacing: { after: 0 } }),
  lijnen(['', '', '']),

  kop('6', 'Bij twijfel of spijt'),
  lijnen(['Je kan terecht bij', 'Zo bereik je die persoon']),
  p([t('Dat geldt ook als het project voorbij is.', { size: 18 })]),

  kop('7', 'Andere afspraken'),
  p([t('Wat vind jij zelf nog belangrijk? Schrijf het hier op.', { size: 18 })], { spacing: { after: 0 } }),
  lijnen(['', '', '', '']),

  kop('8', 'Wanneer bekijken we dit opnieuw?'),
  new Paragraph({ spacing: { before: 80, after: 80, line: 300 }, children: [
    ...vak('bij de start van elke opname'), ...vak('bij de montage'), ...vak('voor het product gedeeld wordt'), ...vak('ander moment:') ] }),
  lijnen([''])
];

// ---------------- Laatste pagina: kaart met de drie rechten, voor de jongere ----------------
function rechtKaartRij(icoon, naam, tekst, extra) {
  const kol = [1900, W - 1900];
  const dik = { style: BorderStyle.SINGLE, size: 12, color: '000000' };
  return new TableRow({ cantSplit: true, children: [
    new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: { top: dik, bottom: geen, left: geen, right: geen },
      margins: { top: 200, bottom: 160, left: 0, right: 200 },
      children: [new Paragraph({ children: [beeld(path.join(PICTO, icoon), 80, 80, 'Pictogram ' + naam)] })] }),
    new TableCell({ width: { size: kol[1], type: WidthType.DXA }, borders: { top: dik, bottom: geen, left: geen, right: geen },
      margins: { top: 200, bottom: 160, left: 0, right: 0 },
      children: [
        new Paragraph({ spacing: { after: 80 }, children: [t(naam.toUpperCase(), { bold: true, size: 30 })] }),
        new Paragraph({ spacing: { after: 80, line: 300 }, children: [t(tekst, { size: 24 })] }),
        ...(extra || [])
      ] })
  ] });
}
const kaartPagina = [
  new Paragraph({ children: [new PageBreak()] }),
  logos(),
  leeg(160),
  label('VOOR JOU ALS MAKER'),
  new Paragraph({ spacing: { after: 120 }, children: [t('Jouw drie rechten', { bold: true, size: 44 })] }),
  new Paragraph({ spacing: { after: 240, line: 300 }, children: [t('Jij maakt mee. Daarom gelden er tijdens het hele project drie rechten. Die blijven gelden, ook als het project al lang voorbij is.', { size: 24 })] }),
  new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [1900, W - 1900], rows: [
    rechtKaartRij('recht-start-stop.png', 'Start- en stoprecht', 'Jij kiest of je meedoet. Ook als je al begonnen bent, mag je altijd stoppen. Zeg het gewoon, of gebruik ons stopsignaal:',
      [lijnen([''], 0, W - 1900)]),
    rechtKaartRij('recht-praat-zwijg.png', 'Praat- en zwijgrecht', 'Jij kiest wat je vertelt en hoe. Je hoeft niet op elke vraag te antwoorden. Je kan ook meedoen zonder je eigen verhaal te vertellen: achter de camera, aan de knoppen, met muziek of beeld.'),
    rechtKaartRij('recht-knip-plak.png', 'Knip- en plakrecht', 'Jij beslist mee wat erin komt en hoe het wordt samengesteld. Wil je dat een stuk eruit gaat? Dan gaat het eruit. Na de publicatie kan je je toestemming nog altijd intrekken.')
  ] }),
  new Paragraph({ spacing: { before: 280, after: 80 }, border: { top: { style: BorderStyle.SINGLE, size: 12, color: '000000', space: 10 } },
    children: [t('Twijfel je, of wil je later iets laten weghalen?', { bold: true, size: 24 })] }),
  lijnen(['Spreek erover met', 'Of stuur een mail naar'])
];

bewaar('Afsprakenkader met de jongeren', [
  { page: STAAND, children: [...fiche, ...invul, ...kaartPagina] }
]);
