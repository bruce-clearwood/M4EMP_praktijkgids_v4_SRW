// Tool: Script voor podcast en video (fase 2). Bouw: node script.js <uitvoer.docx>
const {
  LW, STAAND, LIGGEND, geen, geenRand, zwartRand, t, leeg, kop, bullet,
  nummer, lijnen, ficheKop, kernTabel, uitDePraktijk, kopMetLogo, kopCel, vakCel, bewaar
} = require('./lib.js');
const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign } = require('docx');

// ---------------- Pagina 1: fiche ----------------
const fiche = [
  ...ficheKop(2, 'Script', [
    'Een script is het draaiboek van je podcast of video: wat komt er, in welke volgorde, wie zegt wat, en wat hoor of zie je? Het geeft houvast bij de opname, zodat iedereen weet wat er komt en je binnen de tijd blijft.',
    'Een script is geen tekst om voor te lezen. Schrijf in kernwoorden: wie alles uitschrijft, klinkt al snel afgelezen. Het storyboard toont wat je ziet, het script vult aan wat je hoort en zegt. Er is een template voor een podcast en een voor een video.'
  ]),
  kernTabel([
    ['Doel', 'Samen de opbouw van de podcast of video uitschrijven, zodat de opname vlot loopt en het verhaal van de jongeren blijft.'],
    ['Benodigdheden', 'Het template voor podcast of video (volgende pagina’s, liggend). Het conceptcanvas, het storyboard en de interviewvoorbereiding.'],
    ['Tijd', 'Ongeveer een uur.'],
    ['Wie', 'De jongeren, met de jeugdprofessional en de mediamaker.'],
    ['Verder gebruik', 'Neem het script mee naar de opname (fase 3) en gebruik het bij de montage (fase 4). De shownotes en de aftiteling gebruik je bij het toonmoment (fase 5).']
  ]),
  kop('', 'Zo gebruik je het'),
  nummer('Kies het template voor een podcast of voor een video.'),
  nummer('Schrijf eerst alle ideeën en vragen los op. Kies daarna de hoofdpunten, en zet ze in de juiste volgorde.'),
  nummer('Vul per onderdeel kernwoorden in, geen volledige zinnen.'),
  nummer('Spreek af wie wat zegt of doet.'),
  nummer('Schat per onderdeel de tijd, zodat je binnen de lengte blijft.'),
  nummer('Noteer wat je jezelf wil herinneren: waar je pauzeert, wat je benadrukt.'),
  kop('', 'Wie beslist?'),
  bullet('Wie schrijft de teksten, en zijn het nog de woorden van de jongeren?'),
  bullet('Mag het script tijdens de opname nog veranderen, en wie beslist dat?'),
  bullet('Wie staat in de aftiteling of de shownotes, en onder welke naam?'),
  uitDePraktijk('Een vaste opbouw met jingle, voxpop, levensverhaal, groepsgesprek en reflectie, en jongeren die zelf de bindteksten inspreken (#HACKtisch). Een vast skelet met jingle, voorstelling, thema, liedjes en stukjes tekst, dat de jongere zelf invult (Radio Z).')
];

// ---------------- Templates, liggend ----------------
function kopTemplate(naam) {
  return [
    kopMetLogo('SCRIPT', naam, LW),
    new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: [1300, 6500, 1300, 1500, 1300, LW - 11900], rows: [new TableRow({ children:
      [['Titel', 1300], ['', 6500], ['Lengte', 1300], ['', 1500], ['Makers', 1300], ['', LW - 11900]].map(([txt, w], i) => new TableCell({
        width: { size: w, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM,
        borders: txt === '' ? { top: geen, left: geen, right: geen, bottom: { style: BorderStyle.DOTTED, size: 6, color: '7F8F8D' } } : geenRand,
        margins: { left: i ? 80 : 0, right: 80 },
        children: [new Paragraph({ spacing: { before: 100, after: 0 }, children: [t(txt, { size: 19 })] })] })) })] }),
    leeg(140)
  ];
}

function scriptTabel(kolommen, rijen, hoogte) {
  const cel = (w, inhoud) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: zwartRand,
    margins: { top: 40, bottom: 40, left: 80, right: 80 }, children: inhoud });
  return new Table({ width: { size: LW, type: WidthType.DXA }, columnWidths: kolommen.map(k => k[1]), rows: [
    new TableRow({ tableHeader: true, children: kolommen.map(([txt, w]) => kopCel(txt, w)) }),
    ...rijen.map(([naam, hint]) => new TableRow({ cantSplit: true, height: { value: hoogte, rule: 'atLeast' }, children: kolommen.map(([k, w], i) => {
      if (k === 'Onderdeel') return cel(w, [new Paragraph({ spacing: { after: 20 }, children: [t(naam, { bold: true, size: 18 })] }),
        ...(hint ? [new Paragraph({ spacing: { after: 0, line: 230 }, children: [t(hint, { size: 15 })] })] : [])]);
      return vakCel(w);
    }) }))
  ] });
}

const podcastKolommen = [['Tijd', 800], ['Onderdeel', 3000], ['Wat zeggen we? (kernwoorden)', 5600], ['Wie?', 1500], ['Geluid: jingle, muziek, effecten', 2400], ['Notities voor jezelf', LW - 13300]];
const podcast = [
  ...kopTemplate('Podcastscript'),
  scriptTabel(podcastKolommen, [
    ['Intro', 'Wie ben je, waarover gaat het, waarom? Wat mag de luisteraar verwachten? Plaag al met wat komt.'],
    ['Jingle', 'De naam en de sfeer van je podcast.'],
    ['Gast voorstellen', 'Wie is het, en waarom is die er? Vooraf opgezocht.'],
    ['Onderdeel 1', 'Een hoofdpunt, met wat je erover wil zeggen of vragen.'],
    ['Overgang', 'Een zin of een geluid.'],
    ['Onderdeel 2', ''],
    ['Overgang', ''],
    ['Onderdeel 3', ''],
    ['Samenvatting', 'Wat onthouden we? Herhaal de kernboodschap.'],
    ['Slot', 'Bedank. Wat vraag je aan de luisteraar? Waar vindt die meer?'],
    ['Jingle', '']
  ], 560),
  new Paragraph({ spacing: { before: 120, after: 0 }, children: [t('Shownotes', { bold: true, size: 19 }), t('   Namen, links en informatie die je in de beschrijving zet.', { size: 17 })] }),
  lijnen([''], 0, LW)
];

const videoKolommen = [['Tijd', 800], ['Onderdeel', 2400], ['Beeld: wat zie je?', 4600], ['Geluid en tekst: wat hoor je, wie zegt wat?', 4600], ['Wie?', 1500], ['Notities voor jezelf', LW - 13900]];
const video = [
  ...kopTemplate('Videoscript'),
  scriptTabel(videoKolommen, [
    ['Opening', 'Een beeld of geluid dat meteen pakt.'],
    ['Titel', ''],
    ['Scène 1', ''],
    ['Scène 2', ''],
    ['Scène 3', ''],
    ['Scène 4', ''],
    ['Scène 5', ''],
    ['Scène 6', ''],
    ['Slot', 'Wat moet blijven hangen?'],
    ['Aftiteling', 'De namen van de makers, zoals zij dat willen.']
  ], 720)
];

bewaar('Script', [
  { page: STAAND, children: fiche },
  { page: LIGGEND, children: podcast },
  { page: LIGGEND, children: video }
]);
