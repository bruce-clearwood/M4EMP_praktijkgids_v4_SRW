// Tool: Tijdlijn (fase 2). Bouw: node tijdlijn.js <uitvoer.docx>
const {
  ACCENT, LW, STAAND, LIGGEND, geen, geenRand, t, p, leeg, kop,
  bullet, nummer, lijnen, ficheKop, kernTabel, uitDePraktijk, kopMetLogo, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(2, 'Tijdlijn', [
    'Een tijdlijn helpt om een verhaal te ordenen: wat gebeurde er, wanneer, en wat was belangrijk? Elke jongere zet een verhaal uit met hoogtes en laagtes, vanaf een startpunt dat hij zelf kiest. Dat startpunt kiezen is al een eerste beslissing over het eigen verhaal.',
    'Een tijdlijn hoeft niet over een heel leven te gaan. Ze kan ook gaan over een thema, een plek of een periode. Door elkaars tijdlijnen te bekijken, ontdekt een groep wat ze deelt. Daaruit kan de rode draad van het product groeien.'
  ]),
  kernTabel([
    ['Doel', 'Een verhaal ordenen en zelf kiezen wat belangrijk is, en wat je wil delen.'],
    ['Benodigdheden', 'Het tijdlijnblad (liggend, liefst op A3) en de hulpvragen. Stiften, eventueel foto’s.'],
    ['Tijd', 'Een halfuur om te tekenen, en tijd om de tijdlijnen in groep voor te stellen.'],
    ['Wie', 'Elke jongere maakt zijn eigen tijdlijn. De jeugdprofessional luistert, en de groep kijkt mee bij het voorstellen.'],
    ['Verder gebruik', 'Gebruik de tijdlijn bij het storyboard en de interviewvoorbereiding (fase 2).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Kies samen waarover de tijdlijnen gaan: je leven, een thema, een plek of een periode.'),
  nummer('Laat elke jongere zelf het startpunt kiezen. De tijdlijn mag verder lopen dan vandaag: wat hoop je, wat wil je nog doen?'),
  nummer('Zet de hoogtes boven de lijn en de laagtes eronder. Woorden, tekeningen of symbolen volstaan. Vindt een jongere het moeilijk? Gebruik de hulpvragen op de laatste pagina.'),
  nummer('Laat de jongere met een ster aanduiden wat hij wil vertellen. Niet alles op de tijdlijn hoeft in het product.'),
  nummer('Wie wil, stelt zijn tijdlijn voor aan de groep. Zoek samen naar wat de groep deelt.'),
  kop('', 'Wie beslist?'),
  bullet('Kiest de jongere zelf waarover de tijdlijn gaat en waar ze begint?'),
  bullet('Kan een jongere zijn tijdlijn voor zich houden?'),
  bullet('Wie bewaart de tijdlijnen, en wat gebeurt ermee na het project?'),
  p([t('Een tijdlijn kan zware herinneringen oproepen. Zorg dat er iemand bij is die de jongere kent, en dat er tijd is om na te praten.', { size: 19 })], { spacing: { before: 160 } }),
  p([t('Jongeren die een levenslijn kennen uit de hulpverlening, vallen daar snel op terug. Geef ook andere vormen een kans, zoals een thema, een plek, of de Tree of Life uit Life Story Work.', { size: 19 })], { spacing: { before: 60 } }),
  uitDePraktijk('Elke jongere maakte een tijdlijn en stelde die voor aan de groep. Jongeren met heel verschillende achtergronden herkenden zich in elkaar, en daaruit kwam de rode draad voor hun verhaal (Ik Ben Hier Ook). De jongeren tekenden ’s avonds een tijdlijn (Rupture).')
];

// ---------------- Pagina 2: tijdlijnblad, liggend ----------------
const LAB = 1500;
const dik = { style: BorderStyle.SINGLE, size: 24, color: '000000' };
const labCel = (tekst, pijl) => new TableCell({ width: { size: LAB, type: WidthType.DXA }, borders: geenRand,
  verticalAlign: pijl === '▲' ? VerticalAlign.TOP : VerticalAlign.BOTTOM, margins: { right: 120 },
  children: [new Paragraph({ spacing: { after: 0 }, children: [t(pijl + ' ', { color: ACCENT, size: 22 }), t(tekst, { bold: true, color: ACCENT, size: 22 })] })] });

const blad = [
  kopMetLogo('TIJDLIJN', 'Mijn tijdlijn', LW),
  lijnen(['Waarover gaat mijn tijdlijn?'], 3200, LW),
  leeg(120),
  new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: [LAB, LW - LAB], rows: [
    new TableRow({ height: { value: 3500, rule: 'exact' }, children: [
      labCel('Hoogtes', '▲'),
      new TableCell({ width: { size: LW - LAB, type: WidthType.DXA }, borders: { top: geen, left: geen, right: geen, bottom: dik }, children: [new Paragraph({ children: [] })] })
    ] }),
    new TableRow({ height: { value: 560, rule: 'exact' }, children: [
      new TableCell({ width: { size: LAB, type: WidthType.DXA }, borders: geenRand, children: [new Paragraph({ children: [] })] }),
      new TableCell({ width: { size: LW - LAB, type: WidthType.DXA }, borders: geenRand, margins: { top: 40 }, children: [
        new Paragraph({ tabStops: [{ type: 'center', position: Math.round((LW - LAB) * 0.7) }, { type: 'right', position: LW - LAB - 120 }], spacing: { after: 0 },
          children: [t('Start: \u2026\u2026\u2026\u2026\u2026\u2026', { bold: true, size: 19 }), t('\t\u25B2 Nu', { bold: true, size: 19 }), t('\tToekomst \u2192', { bold: true, size: 19 })] })
      ] })
    ] }),
    new TableRow({ height: { value: 3400, rule: 'exact' }, children: [
      labCel('Laagtes', '▼'),
      new TableCell({ width: { size: LW - LAB, type: WidthType.DXA }, borders: geenRand, children: [new Paragraph({ children: [] })] })
    ] })
  ] }),
  new Paragraph({ spacing: { before: 120, after: 40 }, border: { top: { style: BorderStyle.SINGLE, size: 4, color: '000000', space: 6 } },
    children: [t('★ Dit wil ik vertellen', { bold: true, size: 22 }), t('   Zet ook een ster op je tijdlijn bij wat je wil delen.', { size: 18 })] }),
  lijnen(['', ''], 0, LW)
];

// ---------------- Pagina 3: hulpvragen ----------------
const groep = (naam, vragen) => [
  new Paragraph({ spacing: { before: 200, after: 60 }, keepNext: true, children: [t(naam, { bold: true, color: ACCENT, size: 24 })] }),
  ...vragen.map(v => bullet(v))
];
const hulp = [
  kopMetLogo('TIJDLIJN', 'Hulpvragen bij je tijdlijn'),
  p('Weet je niet goed waar te beginnen? Deze vragen kunnen helpen. Je hoeft ze niet allemaal te beantwoorden. Je kiest zelf wat je opschrijft, en wat je niet wil delen, laat je weg.', { spacing: { before: 120, after: 80, line: 276 } }),
  ...groep('Om te beginnen', [
    'Waar wil je beginnen? Bij je geboorte, bij een moment dat je je goed herinnert, of bij het begin van je thema?',
    'Aan welke plek of welke persoon denk je als eerste?']),
  ...groep('Hoogtes', [
    'Wanneer was je trots op jezelf?',
    'Wanneer voelde je je goed, en wie was er toen bij?',
    'Wat heb je geleerd of bereikt?']),
  ...groep('Laagtes', [
    'Wat was moeilijk? Je hoeft het niet uit te leggen, een woord of een teken volstaat.',
    'Wat of wie hielp je toen?']),
  ...groep('Wendingen', [
    'Wanneer veranderde er iets? Een verhuis, een nieuwe school, iemand die je leerde kennen?',
    'Welke keuze heb je zelf gemaakt?']),
  ...groep('Toekomst', [
    'Wat hoop je?',
    'Wat wil je nog doen, leren of maken?']),
  ...groep('Gaat je tijdlijn over een thema of een plek?', [
    'Wanneer kwam je er voor het eerst mee in contact?',
    'Wat is er sindsdien veranderd, voor jou of voor anderen?'])
];

bewaar('Tijdlijn', [
  { page: STAAND, children: fiche },
  { page: LIGGEND, children: blad },
  { page: STAAND, children: hulp }
]);
