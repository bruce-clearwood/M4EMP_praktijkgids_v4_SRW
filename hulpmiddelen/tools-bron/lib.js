// Gedeelde bouwstenen voor de tools van de praktijkgids (Word-bestanden, gemaakt met docx-js).
// Elke tool staat in een eigen bestand in deze map. Zie LEESMIJ.md.
const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, AlignmentType, LevelFormat, PageOrientation, VerticalAlign, FrameAnchorType
} = docx;

// Kleuren en maten ---------------------------------------------------------
const ACCENT = '55266A';   // paars: labels, nummers, opsommingstekens
const ZACHT = 'DDECEA';    // lichtblauwgroen: achtergrond van kopcellen
const W = 9638;            // tekstbreedte staand A4 (marges 2 cm)
const LW = 16838 - 2 * 900; // tekstbreedte liggend A4
const STAAND = { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 } };
const LIGGEND = { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 800, bottom: 600, left: 900, right: 900 } };
const FASEN = ['VOORBEREIDING', 'PRE-PRODUCTIE', 'PRODUCTIE', 'POST-PRODUCTIE', 'TOONMOMENT', 'NAZORG'];

const IMG = path.join(__dirname, '..', '..', 'img');
const PICTO = path.join(__dirname, 'pictogrammen');

// Randen
const geen = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const geenRand = { top: geen, bottom: geen, left: geen, right: geen };
const fijn = { style: BorderStyle.SINGLE, size: 4, color: 'C9DAD7' };
const fijnRand = { top: fijn, bottom: fijn, left: fijn, right: fijn };
const grijs = { style: BorderStyle.SINGLE, size: 4, color: 'BBBBBB' };
const zwart = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
const zwartRand = { top: zwart, bottom: zwart, left: zwart, right: zwart };
const stip = { style: BorderStyle.DOTTED, size: 6, color: '7F8F8D' };

// Tekst ---------------------------------------------------------------------
const t = (text, o = {}) => new TextRun({ text, font: 'Arial', size: 21, ...o });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs)], spacing: { after: 100, line: 276 }, ...o });
const leeg = (after = 0) => new Paragraph({ spacing: { after }, children: [] });
const kop = (nr, text) => new Paragraph({
  spacing: { before: 260, after: 100 }, keepNext: true,
  children: [t(nr ? nr + '  ' : '', { bold: true, color: ACCENT, size: 26 }), t(text, { bold: true, size: 26 })]
});
const label = (text) => p([t(text, { bold: true, color: ACCENT, size: 18 })], { spacing: { after: 40 } });
const klein = (text) => p([t(text, { size: 18 })], { spacing: { after: 60 } });
const bullet = (runs) => new Paragraph({ numbering: { reference: 'bol', level: 0 }, spacing: { after: 60, line: 276 }, children: Array.isArray(runs) ? runs : [t(runs)] });
const nummer = (runs) => new Paragraph({ numbering: { reference: 'nr', level: 0 }, spacing: { after: 60, line: 276 }, children: Array.isArray(runs) ? runs : [t(runs)] });
const vak = (text) => [t('☐ ' + text.replace(/ /g, ' ')), t('    ')];
const keuzes = (vraag, opties) => new Paragraph({
  spacing: { before: 80, after: 80, line: 300 },
  children: [t(vraag + '  ', { bold: true }), ...opties.flatMap(vak)]
});
const beeld = (bestand, breed, hoog, naam) => new ImageRun({ type: 'png', data: fs.readFileSync(bestand),
  transformation: { width: breed, height: hoog }, altText: { title: naam, description: naam, name: naam } });

// Invullijnen: een tabel met een stippellijn onder elke rij (betrouwbaar in Word en LibreOffice).
function lijnen(labels, labelBreed = 2600, breed = W) {
  const metLabels = labels.some(l => l !== '');
  const kol = metLabels ? [labelBreed, breed - labelBreed] : [breed];
  const lijnCel = (w, span) => new TableCell({ width: { size: w, type: WidthType.DXA }, columnSpan: span,
    borders: { top: geen, left: geen, right: geen, bottom: stip }, children: [leeg()] });
  const rijen = labels.map(l => {
    const cellen = [];
    if (metLabels && l !== '') {
      cellen.push(new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.BOTTOM,
        margins: { left: 0, right: 80 }, children: [new Paragraph({ spacing: { after: 0 }, children: [t(l)] })] }));
      cellen.push(lijnCel(kol[1], 1));
    } else {
      cellen.push(lijnCel(breed, metLabels ? 2 : 1));
    }
    return new TableRow({ height: { value: 440, rule: 'atLeast' }, cantSplit: true, children: cellen });
  });
  return new Table({ width: { size: breed, type: WidthType.DXA }, columnWidths: kol, rows: rijen });
}

// Pagina 1: de fiche ----------------------------------------------------------

// Logo's van Quindo (links) en Howest SRW (rechts).
function logos() {
  const cel = (kinderen) => new TableCell({ width: { size: W / 2, type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.CENTER, children: kinderen });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W / 2, W / 2], rows: [new TableRow({ children: [
    cel([new Paragraph({ children: [beeld(path.join(IMG, 'logo-quindo.png'), 92, 30, 'Logo Quindo')] })]),
    cel([new Paragraph({ alignment: AlignmentType.RIGHT, children: [beeld(path.join(IMG, 'logo-howest-srw.png'), 95, 36, 'Logo Howest, opleiding Sociale Readaptatiewetenschappen')] })])
  ] })] });
}

// Fase, naam van de tool en het pictogram van de fase.
function titel(fase, naam) {
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W - 1300, 1300], rows: [new TableRow({ children: [
    new TableCell({ width: { size: W - 1300, type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.BOTTOM, children: [
      label('FASE ' + fase + ': ' + FASEN[fase - 1]),
      new Paragraph({ spacing: { after: 60 }, children: [t(naam, { bold: true, size: 40 })] })
    ] }),
    new TableCell({ width: { size: 1300, type: WidthType.DXA }, borders: geenRand, children: [
      new Paragraph({ alignment: AlignmentType.RIGHT, children: [beeld(path.join(PICTO, 'fase-' + fase + '.png'), 64, 64, 'Pictogram fase ' + fase)] })
    ] })
  ] })] });
}

// Begin van elke fiche: logo's, titel, en de inleidende alinea's.
function ficheKop(fase, naam, inleiding) {
  return [logos(), leeg(200), titel(fase, naam), leeg(80),
    ...inleiding.map((tekst, i) => p(tekst, i === inleiding.length - 1 ? { spacing: { after: 200, line: 276 } } : {}))];
}

// Vaste kern: Doel, Benodigdheden, Tijd, Wie, Verder gebruik.
function kernTabel(rijen) {
  const kol = [2100, W - 2100];
  const rand = (i) => ({ top: i === 0 ? zwart : fijn, bottom: i === rijen.length - 1 ? zwart : fijn, left: geen, right: geen });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol,
    rows: rijen.map(([lab, tekst], i) => new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: rand(i), margins: { top: 90, bottom: 90, left: 0, right: 120 },
        children: [new Paragraph({ spacing: { after: 0 }, children: [t(lab.toUpperCase(), { bold: true, color: ACCENT, size: 17 })] })] }),
      new TableCell({ width: { size: kol[1], type: WidthType.DXA }, borders: rand(i), margins: { top: 90, bottom: 90, left: 120, right: 0 },
        children: [new Paragraph({ spacing: { after: 0, line: 276 }, children: [t(tekst)] })] })
    ] })) });
}

// Kader "Uit de praktijk" onderaan de fiche, altijd op dezelfde plek.
function uitDePraktijk(tekst, hoogte = 900) {
  return new Paragraph({
    frame: { type: 'absolute', position: { x: 0, y: 14838 - hoogte - 50 }, width: W, height: hoogte, rule: 'atLeast',
      anchor: { horizontal: FrameAnchorType.MARGIN, vertical: FrameAnchorType.MARGIN } },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: '000000', space: 6 } },
    spacing: { after: 0, line: 240 },
    children: [t('Uit de praktijk', { bold: true, size: 17 }), t(tekst, { size: 17, break: 1 })]
  });
}

// Templatepagina's ---------------------------------------------------------

// Kop van een templatepagina: label en titel links, logo Quindo rechts.
function kopMetLogo(labelTekst, naam, breed = W) {
  return new Table({ width: { size: breed, type: WidthType.DXA }, columnWidths: [breed - 2200, 2200], rows: [new TableRow({ children: [
    new TableCell({ width: { size: breed - 2200, type: WidthType.DXA }, borders: geenRand, verticalAlign: VerticalAlign.BOTTOM, children: [
      new Paragraph({ spacing: { after: 40 }, children: [t(labelTekst, { bold: true, color: ACCENT, size: 18 })] }),
      new Paragraph({ spacing: { after: 60 }, children: [t(naam, { bold: true, size: 32 })] })
    ] }),
    new TableCell({ width: { size: 2200, type: WidthType.DXA }, borders: geenRand, children: [
      new Paragraph({ alignment: AlignmentType.RIGHT, children: [beeld(path.join(IMG, 'logo-quindo.png'), 92, 30, 'Logo Quindo')] })
    ] })
  ] })] });
}

// Cel met een kop: vet, op lichtblauwgroen, zwarte rand.
function kopCel(tekst, breed, o = {}) {
  return new TableCell({ width: { size: breed, type: WidthType.DXA }, borders: zwartRand,
    shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 50, bottom: 50, left: 80, right: 80 },
    verticalAlign: o.onder ? VerticalAlign.BOTTOM : undefined,
    children: [new Paragraph({ spacing: { after: 0 }, alignment: o.midden ? AlignmentType.CENTER : AlignmentType.LEFT, children: [t(tekst, { bold: true, size: o.grootte || 17 })] }),
      ...(o.sub ? [new Paragraph({ spacing: { after: 0 }, children: [t(o.sub, { size: 16 })] })] : [])] });
}

// Lege invulcel met zwarte rand.
function vakCel(breed) {
  return new TableCell({ width: { size: breed, type: WidthType.DXA }, borders: zwartRand, children: [new Paragraph({ children: [] })] });
}

// Een blok van een checklist: kop, en per regel een vakje, de tekst en ruimte voor de afspraak.
function checklistBlok(naam, items) {
  const kol = [450, W - 450 - 3400, 3400];
  const onder = { top: geen, left: geen, right: geen, bottom: grijs };
  const kopRij = new TableRow({ cantSplit: true, children: [new TableCell({ columnSpan: 3, width: { size: W, type: WidthType.DXA },
    shading: { fill: ZACHT, type: ShadingType.CLEAR, color: 'auto' }, borders: { top: zwart, bottom: geen, left: geen, right: geen },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ spacing: { after: 0 }, children: [t(naam, { bold: true, color: ACCENT, size: 22 })] })] })] });
  const rijen = items.map(tekst => new TableRow({ cantSplit: true, height: { value: 560, rule: 'atLeast' }, children: [
    new TableCell({ width: { size: kol[0], type: WidthType.DXA }, borders: onder, margins: { top: 80, left: 60 },
      children: [new Paragraph({ spacing: { after: 0 }, children: [t('☐', { size: 24 })] })] }),
    new TableCell({ width: { size: kol[1], type: WidthType.DXA }, borders: onder, margins: { top: 100, bottom: 80, right: 160 },
      children: [new Paragraph({ spacing: { after: 0, line: 260 }, children: [t(tekst, { size: 19 })] })] }),
    new TableCell({ width: { size: kol[2], type: WidthType.DXA }, borders: { ...onder, left: { style: BorderStyle.DOTTED, size: 4, color: '7F8F8D' } },
      children: [leeg()] })
  ] }));
  return [new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: kol, rows: [kopRij, ...rijen] }), leeg(160)];
}

// Document bewaren -----------------------------------------------------------
// secties: [{ page: STAAND of LIGGEND, children: [...] }, ...]
// Gebruik: node <tool>.js <uitvoer.docx>
function bewaar(titelTekst, secties) {
  const uit = process.argv[2];
  if (!uit) { console.error('Gebruik: node ' + path.basename(process.argv[1]) + ' <uitvoer.docx>'); process.exit(1); }
  const doc = new Document({
    creator: 'Media for Empowerment', title: titelTekst,
    styles: { default: { document: { run: { font: 'Arial', size: 21 } } } },
    numbering: { config: [
      { reference: 'bol', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 260 } }, run: { color: ACCENT } } }] },
      { reference: 'nr', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { color: ACCENT, bold: true } } }] }
    ] },
    sections: secties.map(s => ({ properties: { page: s.page }, children: s.children }))
  });
  return Packer.toBuffer(doc).then(b => { fs.writeFileSync(uit, b); console.log('Bewaard: ' + uit); });
}

module.exports = {
  docx, fs, path, ACCENT, ZACHT, W, LW, STAAND, LIGGEND, IMG, PICTO,
  geen, geenRand, fijn, fijnRand, grijs, zwart, zwartRand, stip,
  t, p, leeg, kop, label, klein, bullet, nummer, vak, keuzes, beeld, lijnen,
  logos, titel, ficheKop, kernTabel, uitDePraktijk, kopMetLogo, kopCel, vakCel, checklistBlok, bewaar
};
