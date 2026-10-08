# Wijzigingen

## Prototype v2, proeftuin SRW (8 oktober 2026)

Aparte versie naast v1, om een andere vorm van gebruik te testen. Basis: de leidraad van Annelies Depaepe voor de proeftuin met studenten SRW.

**Structuur**
- Menu met drie onderdelen: Cocreatieve mediaproductie, Productiefasen, Mijn project. Alle andere pagina's blijven bestaan en zijn bereikbaar via links en via de voettekst.
- Nieuwe pagina "Cocreatieve mediaproductie" (`#/cocreatie`): wat het is, drie vragen om eigenaarschap te toetsen, meerwaarde per niveau en de voorwaarden.
- De zes fasen zijn een ideaal traject: de jeugdprofessional bouwt een haalbaar project op maat, maar toestemming en inspraak van de jongeren blijven nodig (startpagina, Productiefasen, Cocreatieve mediaproductie).
- Elke fasepagina heeft een inleiding, "Ethiek in deze fase" (`#/fase-1/ethiek-1` tot `#/fase-6/ethiek-6`), Tools en genummerde Tips. Fase 4 bevat de spelregels voor het knip- en plakrecht en de sturingscheck uit de leidraad, en heeft geen tool.
- Pagina Ethiek en toestemming: een overzicht met links naar de zes ethiekblokken. Knip- en plakrecht is bindend, ook op de rechtenkaart en in het toestemmingsformulier.
- Mijn project toont per fase de ethische vragen uit het ethiekblok (lijsten met `data-project`). De kernvraag blijft de denkvraag.
- Uitleg bij begrippen: het eerste voorkomen van een begrip op elke pagina krijgt een stippellijn; wie erover beweegt, erop tikt of ernaartoe tabt, ziet de uitleg uit de begrippenlijst.
- Over het onderzoek: nieuw onderdeel Proeftuinen (Sociaal Werk, SRW, The Collective, LEJO), en onderaan de vermelding over het gebruik van generatieve AI.
- Praktijkvoorbeelden die geen tool meer zijn, staan nog op de praktijkpagina's, zonder knop. Bewaarde projecten met oude namen worden via `ALIASSEN` in `js/projectbouwer.js` omgezet naar de tool waarin ze opgingen.

- Startpagina: korte inleiding ("voor jeugdprofessionals die met jongeren media willen maken"), zonder het blok "Zo gebruik je deze gids"; de drie ingangen volgen meteen.
- Bronnen: de werkveldbevraging bij 61 jeugdprofessionals (mei 2026) staat bij "Hoe deze gids tot stand kwam" en in beide dankwoorden.

**Taal en vormgeving**
- "jeugdwerker" wordt "jeugdprofessional" waar het de lezer aanspreekt; in praktijkbeschrijvingen en functietitels blijft "jeugdwerker" staan. "Cocreatie" overal aaneengeschreven; de zoekfunctie vindt ook "co-creatie".
- Logobalk met Howest SRW en Quindo bovenaan elke pagina; logo Howest SRW ook in de voettekst en op Over het onderzoek.
- Kleuren: paars (#55266A) als accent voor onderlijningen, markeringen, knoppen en pictogrammen, en een achtergrond die van wit naar lichtblauwgroen (#DDECEA) verloopt. Ook in de tools, de pictogrammen en de downloads. Het logo van Quindo blijft in zijn eigen kleur.

**Tools** (Word en PDF in `downloads/`, bron in `hulpmiddelen/tools-bron/`)
- Fase 1: Checklist samenwerking, Rollenmenu, Projectplan (backwards design: van het eindpunt terug naar vandaag).
- Fase 2: Afsprakenkader met de jongeren, Conceptcanvas, Tijdlijn, Storyboard, Script (podcast en video), Interviewvoorbereiding.
- Fase 3: Voxpop. De Opnamefiche volgt.
- Fase 5: Checklist toonmoment. Fase 6: Checklist nazorg.
- Alle tools delen één bibliotheek (`lib.js`) en worden samen gebouwd met `node bouw.js` (zie `hulpmiddelen/tools-bron/LEESMIJ.md`).

**Opkuis van de code**
- Geen dubbele id's meer: de begrippen hebben ids die met `s-begrip-` beginnen.
- Ongebruikte code weg: de downloadhulp voor claude.ai, optionele beelden, ongebruikte klassen en stijlregels, het oude Howest-logo, kenmerken van geschrapte werkvormen.

## Prototype v1 (oktober 2026)

**Structuur en navigatie**
- Menu: Mijn project (knop), Ethiek en toestemming, Kracht van mediamaken, 8 werkzame factoren, Productiefasen, Praktijken, Over deze gids. Losse fasen, factoren en praktijken zijn bereikbaar via hun overzichtspagina; de overkoepelende kop licht op in het menu.
- Zoekfunctie bovenaan elke pagina (`js/zoeken.js`).
- Startpagina: "Zo gebruik je deze gids" bovenaan; ingangen Productiefasen, Mijn project, Praktijken, Kracht van mediamaken.
- Prototypebalk: "Prototype praktijkgids M4EMP v1 (oktober 2026)", met enkel de knop "Print deze pagina".

- Rode cijferbolletjes voor alle genummerde opsommingen (`.nr` en `ol.levels` in `css/stijl.css`).

**Bouwmodule Mijn project** (`js/projectbouwer.js`)
- Werkvormen toevoegen vanaf de fasepagina's, de pagina Toestemming als doorlopend proces, de praktijkpagina's, de werkzame factoren en de drie rechten.
- Dezelfde werkvorm op meer pagina's telt als één keuze.
- Printen, downloaden, mailen, kopiëren en delen via een link.

**Inhoud**
- De acht werkzame factoren herschreven: per pagina een inleiding, "Waarom het werkt" met genummerde redenen, "Zo zag het eruit", "Wanneer het sterker werkt" en verwijzingen onderaan.
- Theorie: nieuwe inleiding, sectie "Van cliënt naar maker", bij elke sectie "Voor jou als begeleider".
- Ethiek en toestemming: drie rechten met pictogrammen, toestemmingsformulier met voorbeeldartikel over intrekken, sectie "Wat zegt de wet?" met bronnen, kernvragen, hulpmiddelen om te downloaden.
- Over het onderzoek: partners met logo, stuurploeg, onderzoeksteam met contact, steun Vlaamse Overheid (officieel logo).
- Begrippenlijst met 26 begrippen (menu Over deze gids).
- Voettekst: vermelding van het gebruik van generatieve AI.

**Radio Z (oktober 2026)**
- Radio Binnenstad heet in de gids voortaan Radio Z (de latere naam). Verwerkt: CMO-kaart Radio Z v3 (tweede informant), mechanismedocument oktober 2026 en werkvormencatalogus v3, met vijf nieuwe werkvormen.

**Downloads** (`downloads/`)
- Sjabloon toestemmingsformulier (Word en PDF), gesprekskaart met zes kernvragen (PDF), drie rechten voor jongeren (PDF). Bronbestanden in `hulpmiddelen/downloads-bron/`.

**Nog te doen voor publicatie:** zie de controlelijst in `HANDLEIDING.md`, punt 10.
