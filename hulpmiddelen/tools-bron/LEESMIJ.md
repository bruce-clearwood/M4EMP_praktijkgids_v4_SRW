# Tools van de praktijkgids

Elke tool is een Word-bestand dat met een klein script gemaakt wordt. Zo blijven alle tools in dezelfde stijl, en pas je de stijl op één plek aan.

## Wat zit waar

```
tools-bron/
├── lib.js                gedeelde bouwstenen: kleuren, fiche, kern, kader "Uit de praktijk", checklist, document bewaren
├── bouw.js               bouwt alle tools naar de map downloads
├── package.json          vermeldt het pakket docx
├── pictogrammen/         pictogrammen van de fasen en de drie rechten (PNG)
└── <tool>.js             één bestand per tool, met dezelfde naam als de download
```

## Alle tools opnieuw bouwen

Je hebt Node.js nodig (gratis, nodejs.org). Open een terminal in deze map en typ:

```
npm install
node bouw.js
```

De Word-bestanden komen in `downloads`. Is LibreOffice geïnstalleerd, dan maakt het script ook de PDF's. Anders open je elk Word-bestand en bewaar je het als PDF.

Eén tool bouwen: `node projectplan.js ../../downloads/projectplan.docx`

## Een tool aanpassen

Open het bestand van de tool. De tekst staat tussen aanhalingstekens. Pas de tekst aan, laat de rest staan, en bouw opnieuw.

## De stijl aanpassen

Kleuren, maten en de vaste onderdelen (logo's, titel, kern, kader onderaan) staan bovenaan `lib.js`. Een aanpassing daar geldt voor alle tools.

## Een nieuwe tool

Kopieer een tool die er het meest op lijkt, geef het bestand de naam van de download (bijvoorbeeld `mijn-tool.js` voor `downloads/mijn-tool.docx`), en pas de inhoud aan. Een fiche begint altijd met `ficheKop(fase, naam, [inleiding])`, gevolgd door `kernTabel`, "Zo gebruik je het", "Wie beslist?" en `uitDePraktijk`. Zet daarna een link op de fasepagina in `index.html`.

Voor nieuwe pictogrammen: zet een PNG van 400 bij 400 pixels in `pictogrammen`, gemaakt van de SVG in `img/pictogrammen`.
