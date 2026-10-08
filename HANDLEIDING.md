# Handleiding: praktijkgids Media for Empowerment

Deze handleiding is bedoeld voor wie de gids online zet of later aanpast. Je hoeft geen programmeur te zijn. Wel handig: een teksteditor die code kleurt, zoals Visual Studio Code (gratis). Word of Kladblok zijn niet geschikt.

## 1. Wat zit waar

```
m4emp-gids-v2/
├── index.html                    alle pagina's van de gids
├── css/stijl.css                 opmaak: kleuren, lettertypes, marges
├── js/gids.js                    werking: menu, voetnoten, terugknop, uitleg bij begrippen
├── js/projectbouwer.js           bouwmodule "Mijn project"
├── js/zoeken.js                  zoekfunctie bovenaan elke pagina
├── img/                          logo's, één beeld per praktijk, pictogrammen (SVG)
├── downloads/                    tools, formulier, gesprekskaart en rechtenkaart (Word en PDF)
├── hulpmiddelen/bundel.py        maakt er één los bestand van (zie punt 9)
├── hulpmiddelen/tools-bron/      bronbestanden van de tools (zie punt 14)
├── hulpmiddelen/downloads-bron/  bronbestanden van formulier, gesprekskaart en rechtenkaart (zie punt 14)
├── .nojekyll                     nodig voor GitHub Pages (zie punt 13)
├── HANDLEIDING.md                dit bestand
└── WIJZIGINGEN.md                wat er veranderde, per versie
```

Tekst aanpassen doe je bijna altijd in `index.html`. De bestanden in `css` en `js` raak je enkel aan als je de opmaak of de werking wil veranderen.

## 2. De gids bekijken

Dubbelklik op `index.html`. De gids opent in je browser, ook zonder internet (alleen de lettertypes hebben internet nodig; zonder internet zie je een standaardlettertype).

## 3. De gids online zetten

Zet de volledige map (met alles erin) op een webserver. `index.html` is de startpagina. Mogelijkheden:

- **Op de website van Quindo of Howest**, als een aparte map (bijvoorbeeld `quindo.be/praktijkgids/`). Vraag dit aan je webbouwer: het gaat om gewone bestanden, er is geen database of serversoftware nodig.
- **Gratis hosting** zoals GitHub Pages (zie punt 13) of Netlify (map slepen in het venster).

Voor je publiceert: zie de controlelijst in punt 10.

## 4. Hoe een pagina in elkaar zit

Elke pagina is één blok in `index.html`:

```html
<article data-page="fase-4" data-title="Fase 4 Post-productie" hidden>
  ... inhoud ...
</article>
```

- `data-page` is het adres: deze pagina opent via `index.html#/fase-4`.
- `data-title` is de titel die in het browsertabblad en in verwijzingen verschijnt.
- `hidden` moet er staan (behalve bij de startpagina). Het script toont telkens de juiste pagina.

Zoek een pagina snel met Zoeken (Ctrl+F of Cmd+F) op `data-page="` plus het adres.

Het menu heeft drie ingangen: Cocreatieve mediaproductie, Productiefasen en Mijn project. Fasen, praktijken en werkzame factoren zijn bereikbaar via hun overzichtspagina. Sta je op zo'n pagina, dan licht de overkoepelende ingang op in het menu.

## 5. Tekst aanpassen

Zoek de zin en pas ze aan. Let er alleen op dat je de tekens tussen `<` en `>` laat staan. Zie je `<strong>`, `<a href="...">` of `<sup class="fn" ...></sup>`, laat die intact.

Enkele bouwstenen die je vaak tegenkomt:

**Een werkvorm of tool** (paarse lijn links):

```html
<section class="wv">
  <h3>Titel van de werkvorm</h3>
  <p>Wat het is.</p>
  <p class="cond"><strong>Werkt het best</strong> wanneer ...</p>
  <div class="grond"><span>Uit: <a href="#/praktijk/foscast">FOSCAST</a></span><span>Meer: <a href="#/waarom/duo">Twee begeleiders, twee rollen</a></span></div>
</section>
```

**Een tip of afweging** (wit kader):

```html
<div class="callout">
  <h3>Tip: titel</h3>
  <p>Tekst van de tip.</p>
</div>
```

**Een genummerde opsomming** krijgt paarse cijferbolletjes: gebruik `<ol class="levels">` voor een lijst, of `<span class="nr">1</span>` voor een los nummer (bijvoorbeeld in een tabel).

**Een uitgelicht citaat** (enkel echte citaten van informanten):

```html
<figure class="quote"><blockquote>Het letterlijke citaat.</blockquote><figcaption>Wie het zei</figcaption></figure>
```

## 6. Links en voetnoten

**Link naar een andere pagina:** `<a href="#/praktijk/rupture">Rupture</a>`. Het adres is de `data-page` van die pagina, met `#/` ervoor.

**Link naar een plek binnen een pagina:** geef de titel een id die met `s-` begint, bijvoorbeeld `<h2 id="s-rechten">`, en link naar `#/ethiek/rechten`. Elke id komt maar één keer voor in de hele gids.

**Voetnoot:** zet in de tekst `<sup class="fn" data-ref="couldry2010"></sup>`. De tekst van de voetnoot komt automatisch uit de bronnenpagina, uit de regel `<li id="b-couldry2010">`. Voor een nieuwe bron voeg je dus eerst een regel toe op de bronnenpagina (in `<ul class="refs">`), met een id die begint met `b-`. Het nummer van de voetnoot wordt automatisch berekend.

De lijst "Pagina's die hiernaar verwijzen" onderaan elke pagina maakt het script zelf. Die hoef je niet bij te houden.

## 7. Een praktijk toevoegen

1. **Beeld:** zet een liggend of staand beeld (JPG, ongeveer 1000 pixels breed) in `img/praktijken/`, bijvoorbeeld `mijn-praktijk.jpg`.
2. **Pagina:** kopieer een bestaande praktijkpagina (van `<article data-page="praktijk/...` tot en met `</article>`), plak ze onder de laatste praktijk en pas het adres, de titel en de inhoud aan.
3. **Overzichtspagina:** voeg op de pagina `praktijken` een ingang toe in `<div class="entries">`.
4. **Bron:** voeg op de bronnenpagina een regel toe onder "Negen praktijken" met `id="b-p-mijnpraktijk"`, en zet in de inleiding van de praktijkpagina `<sup class="fn" data-ref="p-mijnpraktijk"></sup>`.

Een werkvorm toevoegen aan een fase gaat op dezelfde manier: kopieer een bestaande `<section class="wv">` op de fasepagina en pas ze aan.

## 8. Pictogrammen en huisstijl

**Pictogram vervangen:** vervang het bestand in `img/pictogrammen/` door een nieuw SVG-bestand met exact dezelfde naam. De namen zijn `fase-1.svg` tot `fase-6.svg`, `waarom-zeggenschap.svg` enzovoort, en `media-for-empowerment.svg` voor de startpagina. De tools gebruiken PNG-versies in `hulpmiddelen/tools-bron/pictogrammen`.

**Kleuren en lettertypes:** bovenaan `css/stijl.css`, onder "1. Kleuren en lettertypes". Verander je daar de accentkleur (het paars, `--accent`), dan verandert ze overal in de gids. Voor de donkere modus staan de kleuren onder "11. Donkere modus". In de tools staan de kleuren bovenaan `hulpmiddelen/tools-bron/lib.js`.

## 9. Eén los bestand maken

Heb je één bestand nodig in plaats van een map (om te mailen, of voor een platform dat geen mappen aanvaardt)? Voer dan vanuit de hoofdmap van de gids uit:

```
python3 hulpmiddelen/bundel.py
```

Dat maakt `media-for-empowerment-gebundeld.html` (ongeveer 5 MB), met alle opmaak, beelden en downloads erin. Pas nooit dat bestand aan: pas de map aan en bundel opnieuw. Het gebundelde bestand hoort niet op GitHub.

## 10. Controlelijst voor publicatie

- [ ] De regel `<meta name="robots" content="noindex, nofollow">` in de `<head>` van `index.html` verwijderd, zodat zoekmachines de gids vinden.
- [ ] De prototypebalk bovenaan verwijderd ("Prototype praktijkgids M4EMP v2") (het blok `<div class="proto" ...>` in `index.html`). De knop "Print deze pagina" verdwijnt dan mee; zet die eventueel elders terug, of laat lezers printen via hun browser.
- [ ] De Opnamefiche (fase 3) gemaakt, of de tekst "De download volgt." weggehaald.
- [ ] Toestemming van de partners voor tekst, beelden en links per praktijk.
- [ ] De voorlopige pictogrammen vervangen, of bewust behouden.
- [ ] De onvolledige bronvermeldingen aangevuld (zie het interne document met de bronverantwoording).
- [ ] Alle externe links nog eens aangeklikt.

## 11. Goed om te weten

- **Adressen met een #.** Elke pagina heeft een adres zoals `.../index.html#/fase-4`. Delen en bladwijzers werken, maar zoekmachines zien de hele gids als één pagina. Wil je dat pagina's afzonderlijk vindbaar zijn in Google, dan moet de gids later in een beheersysteem of een sitegenerator met gewone adressen.
- **Lettertypes.** De lettertypes worden van de servers van Google geladen. Sommige organisaties zetten die liever op hun eigen server, omdat de bezoeker daarbij contact maakt met Google. Vraag dat na bij je webbouwer of privacyverantwoordelijke; het aanpassen gebeurt in de `<head>` van `index.html` en in `stijl.css`.
- **Donkere modus.** De gids volgt automatisch de instelling van het toestel van de lezer.

## 12. De bouwmodule "Mijn project"

Lezers kunnen werkvormen, tools, werkzame factoren en de drie rechten toevoegen aan een eigen project, met de knop "Voeg toe aan mijn project". Op de pagina "Mijn project" zien ze alles per fase, met een denkvraag en ruimte voor notities. Ze kunnen hun project printen, downloaden als bestand, naar zichzelf mailen, kopiëren als tekst of delen via een link.

**Waar wordt het bewaard?** In de browser van de lezer zelf (localStorage). Er gaat niets naar een server, en je ziet de projecten van lezers niet. Wie van computer of browser wisselt, neemt het project mee via de deellink of het gedownloade bestand. De deellink bevat het volledige project, ook de notities. De pagina waarschuwt lezers daarom om geen namen of persoonlijke gegevens van jongeren te noteren.

**Een werkvorm toevoegbaar maken.** Elke werkvorm of tool op een fasepagina heeft een vaste naam, bijvoorbeeld:

```html
<section class="wv" id="s-storyboard" data-wv="fase-2/storyboard">
```

Nieuwe werkvorm? Geef ze een nieuwe, unieke naam in dezelfde vorm (`fase-nummer/korte-naam`). De knop verschijnt dan vanzelf. Staat een werkvorm niet op een fasepagina (zoals op de pagina Toestemming als doorlopend proces), geef dan ook de fase mee, zodat ze in het project onder de juiste fase komt:

```html
<section class="wv" data-wv="toestemming/stopsignaal" data-fase="fase-3">
```

Dat geldt ook voor de blokken op de praktijkpagina's: concrete werkvormen hebben daar een knop, principes en uitkomsten niet (die hebben geen `data-wv`). Hoort een werkvorm bij een werking die jaren doorloopt, gebruik dan `data-fase="doorlopend"`; ze komt dan in het project onder "Als je werking doorloopt".

Staat dezelfde werkvorm ook op een fasepagina, geef ze dan exact dezelfde naam als daar (en laat `data-fase` weg). Dan telt ze als één keuze: wie ze aanklikt op de ene pagina, ziet ze ook op de andere aangevinkt. Moet je ooit toch een naam veranderen, zet de oude naam dan in de lijst `ALIASSEN` bovenaan `js/projectbouwer.js`, zodat oude projecten blijven werken. De titel en de tekst mag je altijd aanpassen.

**Denkvragen en startvragen aanpassen.** Bovenaan `js/projectbouwer.js` staan `DENKVRAGEN` (één per fase) en `STARTVRAGEN` (de vragen bovenaan het project). Pas daar de tekst aan tussen de aanhalingstekens.

**In de gebundelde versie op claude.ai** werken toevoegen, invullen en bewaren. Downloaden, printen, mailen en kopiëren kunnen daar geblokkeerd zijn door de omgeving waarin de pagina getoond wordt. Op een gewone website werken ze wel.

## 13. De gids op GitHub Pages zetten en bijwerken

**Eerste keer**
1. Maak een account op github.com.
2. Kies **New repository**. Geef het een naam (bijvoorbeeld `m4emp-praktijkgids`) en kies **Public** (GitHub Pages is gratis enkel voor publieke repositories).
3. Klik op **uploading an existing file** en sleep de inhoud van de map in het venster (dus `index.html`, `css`, `js`, `img`, ... en niet de map zelf). Klik op **Commit changes**.
4. Controleer of het bestand `.nojekyll` mee is. Zie je het niet, maak het dan aan via **Add file > Create new file**, met als naam `.nojekyll` en zonder inhoud. (Op een Mac zijn bestanden die met een punt beginnen verborgen en worden ze soms niet mee gesleept.)
5. Ga naar **Settings > Pages**. Kies bij **Source** voor **Deploy from a branch**, bij **Branch** voor `main` en `/ (root)`, en klik op **Save**.
6. Na een à twee minuten staat de gids op `https://JOUWGEBRUIKERSNAAM.github.io/m4emp-praktijkgids/`. Het adres verschijnt bovenaan de pagina **Settings > Pages**.

**Iets aanpassen**
- Een tekst: open `index.html` op GitHub, klik op het potlood, pas aan en klik op **Commit changes**.
- Een beeld of meerdere bestanden: open de map op GitHub, kies **Add file > Upload files** en sleep de nieuwe versie erin. Een bestand met dezelfde naam wordt vervangen.
- Werk je vaak aan de gids, gebruik dan het gratis programma **GitHub Desktop**: je werkt in een map op je computer en stuurt de wijzigingen met één klik door.

Na elke wijziging staat de nieuwe versie binnen een paar minuten online. Zie je de oude versie nog, herlaad dan de pagina zonder cache (Ctrl+Shift+R, op een Mac Cmd+Shift+R).

**Een oude versie terugzetten** kan altijd: GitHub bewaart elke wijziging onder **History**.

## 14. De downloads aanpassen

Alle downloads staan in de map `downloads`, met de link op de fasepagina of op de pagina Ethiek en toestemming.

**De tools** (afsprakenkader, storyboard, checklists, ...) worden gemaakt met kleine scripts in `hulpmiddelen/tools-bron`, zodat ze allemaal dezelfde stijl houden. Hoe je ze aanpast en opnieuw bouwt, staat in `hulpmiddelen/tools-bron/LEESMIJ.md`. Pas je liever even snel iets aan in Word, dan kan dat ook, maar dan gaat die aanpassing verloren bij de volgende bouw.

**Het toestemmingsformulier** (`sjabloon-toestemmingsformulier.docx`) pas je gewoon aan in Word en bewaar je opnieuw onder dezelfde naam. Maak daarna ook een nieuwe PDF (in Word: Bestand, Opslaan als, PDF), of maak de PDF opnieuw via het bronbestand hieronder.

**De PDF's van het formulier, de gesprekskaart en de rechtenkaart.** De map `hulpmiddelen/downloads-bron` bevat per download een HTML-bestand met de tekst en de opmaak, en de lettertypes in `fonts`. Pas de tekst aan in het HTML-bestand, open het in Chrome of Edge en kies **Afdrukken**, dan **Opslaan als PDF**, met papier **A4**, marges **Geen** en **Achtergrondafbeeldingen** aangevinkt. Bewaar de PDF in de map `downloads` onder dezelfde naam.

**Een nieuwe download toevoegen.** Zet het bestand in `downloads` en maak een link zoals:

```html
<a class="download" href="downloads/mijn-bestand.pdf" download>PDF (120 kB)</a>
```

Pas de grootte in kB aan als het bestand verandert. Het bundelscript neemt alle bestanden uit `downloads` automatisch mee in de gebundelde versie.

De lettertypes Archivo en Figtree vallen onder de SIL Open Font License en mogen mee verspreid worden.

## 15. Zoekfunctie en logo Vlaamse Overheid

**Zoeken.** Het zoekveld staat bovenaan elke pagina, boven de inhoud. Het doorzoekt alle pagina's behalve "Mijn project"; nieuwe pagina's worden vanzelf meegenomen. Een resultaat springt naar de juiste plek op een pagina als de tussentitel een id heeft die met `s-` begint (bijvoorbeeld `<h2 id="s-wet">`). De werking staat in `js/zoeken.js`. Sneltoets: druk op `/` om meteen te zoeken.

**Logo Vlaamse Overheid.** Op de pagina Over het onderzoek staat het officiële logo "Vlaanderen, verbeelding werkt" (versie volledig zwart) als `img/logo-vlaanderen.svg`. Enkel het canvas is bijgesneden tot de omtrek van het logo; kleuren en vorm zijn ongewijzigd.

## 16. Begrippenlijst en uitleg bij begrippen

De pagina Begrippenlijst legt de vaktermen uit zoals de gids ze gebruikt. In de tekst krijgt het eerste voorkomen van een begrip per pagina een stippellijn: wie erover beweegt of erop tikt, ziet de uitleg uit de begrippenlijst. Je past dus alleen de begrippenlijst aan.

Een begrip toevoegen: voeg in `index.html` binnen `<dl class="begrippen">` een paar toe, in alfabetische volgorde:

```html
<dt id="s-begrip-nieuw-begrip" data-varianten="nieuwe begrippen|nieuw begrip">Nieuw begrip</dt>
<dd>Omschrijving. <span class="meer">Meer: <a href="#/fase-2">Pre-productie</a></span></dd>
```

- De id begint met `s-begrip-`, gevolgd door de naam in kleine letters met koppeltekens (zonder accenten). Een link naar het begrip is dan `#/begrippen/begrip-nieuw-begrip`.
- `data-varianten` bevat de vormen waarin het begrip in de tekst staat, gescheiden door een verticale streep. Zet de langste vorm eerst.
- Begrippen in titels, links en bronvermeldingen krijgen geen uitleg.
- Termen helemaal in hoofdletters (zoals CASE of CMO) worden alleen in hoofdletters herkend.

## 17. Een pagina een nieuwe naam geven

Verander je het adres van een pagina (de waarde van `data-page`), zet de oude naam dan in de lijst `OUDE_ADRESSEN` in de functie `toon` in `js/gids.js`. Zo komen bewaarde links en deellinks nog altijd op de juiste pagina terecht. Voorbeeld: `praktijk/radio-binnenstad` verwijst naar `praktijk/radio-z`.
