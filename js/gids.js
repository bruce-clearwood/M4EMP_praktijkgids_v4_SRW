/* =========================================================================
   Media for Empowerment, praktijkgids
   Werking van de gids. Alle pagina's staan in index.html als
   <article data-page="..." data-title="...">. Dit script toont telkens één
   pagina, op basis van het adres na de # (bijvoorbeeld #/fase-4).

   Wat dit script automatisch doet
   1. De fasestrook opbouwen op de fasepagina's.
   2. Pictogrammen plaatsen (bestanden in img/pictogrammen).
   3. Voetnoten nummeren en onderaan de pagina zetten, met de tekst uit de
      bronnenpagina.
   4. Per pagina de lijst "Pagina's die hiernaar verwijzen" maken.
   5. Terugknop en colofon (met logo's) toevoegen.
   6. De juiste pagina tonen bij een klik of bij het openen van een link.

   De bouwmodule "Mijn project" staat apart in js/projectbouwer.js.

   Je hoeft dit bestand niet aan te passen om tekst te wijzigen of pagina's
   toe te voegen. Zie HANDLEIDING.md.
   ========================================================================= */

(function () {
  'use strict';

  // Beelden: in de gebundelde versie (één bestand) zitten ze in window.GIDS_BEELDEN.
  function beeld(pad) {
    return (window.GIDS_BEELDEN && window.GIDS_BEELDEN[pad]) || pad;
  }

  var FASEN = ['Voorbereiding', 'Pre-productie', 'Productie', 'Post-productie', 'Toonmoment', 'Nazorg'];

  var COLOFON =
    '<p>Deze praktijkgids is het resultaat van het praktijkonderzoek \u2018Media for Empowerment\u2019 van Howest en Quindo.</p>' +
    '<div class="orgs">' +
      '<a class="org howest" href="https://www.howest.be/nl/opleidingen/bachelor/sociale-readaptatiewetenschappen" target="_blank" rel="noopener"><img src="' + beeld('img/logo-howest-srw.png') + '" alt="Howest, opleiding Sociale Readaptatiewetenschappen"></a>' +
      '<a class="org" href="https://www.quindo.be" target="_blank" rel="noopener"><img src="' + beeld('img/logo-quindo.png') + '" alt="Quindo"></a>' +
    '</div>' +
    '<p class="meer-links">Meer in deze gids: <a href="#/over">Over het onderzoek</a> \u00b7 <a href="#/praktijken">Praktijken</a> \u00b7 <a href="#/begrippen">Begrippenlijst</a> \u00b7 <a href="#/bronnen">Bronnen</a></p>' +
    '<p class="copy">\u00a9 Hogeschool West-Vlaanderen en Quindo vzw</p>';

  var main = document.getElementById('main');
  var paginas = {};   // id -> <article>
  var titels = {};    // id -> titel
  document.querySelectorAll('article[data-page]').forEach(function (a) {
    paginas[a.dataset.page] = a;
    titels[a.dataset.page] = a.dataset.title;
  });

  // In de gebundelde versie zijn ook de beelden in de pagina's zelf al vervangen;
  // in de mapversie laden ze gewoon via hun pad.
  document.querySelectorAll('img[src^="img/"]').forEach(function (im) {
    im.src = beeld(im.getAttribute('src'));
  });
  // Downloads: in de gebundelde versie zitten ook die in window.GIDS_BEELDEN.
  document.querySelectorAll('a[href^="downloads/"]').forEach(function (a) {
    var pad = a.getAttribute('href');
    if (beeld(pad) !== pad) {
      a.setAttribute('download', pad.split('/').pop());
      a.href = beeld(pad);
    }
  });


  /* 1. Fasestrook ------------------------------------------------------- */
  document.querySelectorAll('.arc[data-here]').forEach(function (strook) {
    var hier = +strook.dataset.here;
    strook.innerHTML = FASEN.map(function (naam, i) {
      var nr = i + 1;
      return '<a href="#/fase-' + nr + '"' + (nr === hier ? ' class="here" aria-current="step"' : '') + '>' +
             '<span class="ico ico-arc" data-icon="fase-' + nr + '"></span><b>' + nr + '</b><span>' + naam + '</span></a>';
    }).join('');
  });


  /* 2. Pictogrammen ----------------------------------------------------- */
  // data-icon="waarom/duo" wordt img/pictogrammen/waarom-duo.svg
  document.querySelectorAll('.ico[data-icon]').forEach(function (el) {
    var pad = 'img/pictogrammen/' + el.dataset.icon.replace('/', '-') + '.svg';
    el.innerHTML = '<img src="' + beeld(pad) + '" alt="">';
  });


  /* 3. Voetnoten -------------------------------------------------------- */
  // In de tekst: <sup class="fn" data-ref="couldry2010"></sup>
  // De tekst van de voetnoot komt uit de bronnenpagina: <li id="b-couldry2010">
  var bronnen = {};
  document.querySelectorAll('.refs li[id^="b-"]').forEach(function (li) {
    bronnen[li.id.slice(2)] = li;
  });

  Object.keys(paginas).forEach(function (id) {
    var pagina = paginas[id], volgorde = [], nummer = {};

    pagina.querySelectorAll('sup.fn[data-ref]').forEach(function (sup) {
      var ref = sup.dataset.ref;
      if (!(ref in nummer)) { volgorde.push(ref); nummer[ref] = volgorde.length; }
      var n = nummer[ref];
      var link = document.createElement('a');
      link.href = '#';
      link.textContent = n;
      link.setAttribute('aria-label', 'Voetnoot ' + n);
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var doel = pagina.querySelector('.voetnoten li[data-n="' + n + '"]');
        if (doel) {
          doel.scrollIntoView({ block: 'center' });
          doel.classList.add('flash');
          setTimeout(function () { doel.classList.remove('flash'); }, 1500);
        }
      });
      sup.innerHTML = '';
      var vorige = sup.previousSibling;
      if (vorige && vorige.nodeType === 1 && vorige.matches('sup.fn')) sup.appendChild(document.createTextNode(','));
      sup.appendChild(link);
    });

    if (!volgorde.length) return;
    var blok = document.createElement('div');
    blok.className = 'voetnoten';
    blok.innerHTML = '<h2>Voetnoten</h2>';
    var lijst = document.createElement('ol');
    volgorde.forEach(function (ref, i) {
      var li = document.createElement('li');
      li.dataset.n = i + 1;
      var bron = bronnen[ref];
      if (bron) {
        var kopie = bron.cloneNode(true);
        // Interne links worden gewone tekst, externe links blijven klikbaar.
        kopie.querySelectorAll('a').forEach(function (a) {
          if (!/^https?:/.test(a.getAttribute('href'))) a.replaceWith(document.createTextNode(a.textContent));
        });
        li.innerHTML = kopie.innerHTML;
      } else {
        li.textContent = ref + ' (bron ontbreekt op de bronnenpagina)';
      }
      lijst.appendChild(li);
    });
    blok.appendChild(lijst);
    pagina.appendChild(blok);
  });


  /* Hulpfunctie: welke pagina hoort bij een adres? ------------------------
     #/bronnen/couldry2010 -> pagina "bronnen"
     #/ethiek/rechten      -> pagina "ethiek" (sectie met id="s-rechten")   */
  function paginaVan(adres) {
    if (adres.indexOf('bronnen/') === 0) return 'bronnen';
    if (!paginas[adres] && adres.lastIndexOf('/') > 0) {
      var voor = adres.slice(0, adres.lastIndexOf('/'));
      if (paginas[voor]) return voor;
    }
    return adres;
  }


  /* 4. Pagina's die hiernaar verwijzen ---------------------------------- */
  function verwijzingenNaar(id) {
    var van = [];
    Object.keys(paginas).forEach(function (bron) {
      if (bron === id || bron === 'bronnen') return;
      var links = paginas[bron].querySelectorAll('a[href="#/' + id + '"]');
      var echt = [].some.call(links, function (a) { return !a.closest('.backlinks'); });
      if (echt) van.push(bron);
    });
    return van;
  }
  function toonVerwijzingen(pagina, id) {
    if (id === 'bronnen' || id === 'start') return;
    var oud = pagina.querySelector(':scope > .backlinks');
    if (oud) oud.remove();
    var lijst = verwijzingenNaar(id);
    if (!lijst.length) return;
    var blok = document.createElement('div');
    blok.className = 'backlinks';
    blok.innerHTML = '<h2>Pagina\'s die hiernaar verwijzen</h2><p>' +
      lijst.map(function (b) { return '<a href="#/' + b + '">' + titels[b] + '</a>'; }).join('; ') + '</p>';
    pagina.appendChild(blok);
  }
  Object.keys(paginas).forEach(function (id) { toonVerwijzingen(paginas[id], id); });


  /* 5. Terugknop en colofon --------------------------------------------- */
  var spoor = [], terugBezig = false;

  function voegRandToe(pagina, id) {
    var knop = pagina.querySelector(':scope > .back');
    if (id !== 'start' && !knop) {
      knop = document.createElement('button');
      knop.type = 'button';
      knop.className = 'back';
      knop.innerHTML = '<span aria-hidden="true">\u2190</span> Terug';
      knop.addEventListener('click', terug);
      pagina.insertBefore(knop, pagina.firstChild);
    }
    var colofon = pagina.querySelector(':scope > .colofon');
    if (!colofon) {
      colofon = document.createElement('footer');
      colofon.className = 'colofon';
      colofon.innerHTML = COLOFON;
    }
    var voetnoten = pagina.querySelector(':scope > .voetnoten');
    if (voetnoten) pagina.appendChild(voetnoten); // voetnoten net boven de colofon
    pagina.appendChild(colofon);
  }

  function terug() {
    spoor.pop();
    var vorige = spoor.length ? spoor[spoor.length - 1] : 'start';
    terugBezig = true;
    if ('#/' + vorige === location.hash) toon(); else location.hash = '#/' + vorige;
  }

  Object.keys(paginas).forEach(function (id) { voegRandToe(paginas[id], id); });


  /* Menu op smartphone --------------------------------------------------- */
  var menu = document.getElementById('side');
  var menuKnop = menu.querySelector('.navtoggle');
  menuKnop.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuKnop.setAttribute('aria-expanded', open ? 'true' : 'false');
  });


  /* 6. De juiste pagina tonen -------------------------------------------- */
  var nietGevonden = document.createElement('article');
  nietGevonden.dataset.page = '__stub';
  nietGevonden.hidden = true;
  main.appendChild(nietGevonden);

  // Pagina's die een nieuwe naam kregen: oude links blijven zo werken.
  var OUDE_ADRESSEN = {
    'praktijk/radio-binnenstad': 'praktijk/radio-z'
  };

  function toon() {
    var adres = location.hash.replace(/^#\//, '') || 'start';
    for (var oud in OUDE_ADRESSEN) {
      if (adres === oud || adres.indexOf(oud + '/') === 0) {
        location.replace('#/' + OUDE_ADRESSEN[oud] + adres.slice(oud.length));
        return;
      }
    }
    var vraag = '';                     // alles na een ? (gebruikt door de projectbouwer)
    var q = adres.indexOf('?');
    if (q >= 0) { vraag = adres.slice(q + 1); adres = adres.slice(0, q); }
    var id = paginaVan(adres);

    Object.keys(paginas).forEach(function (p) { paginas[p].hidden = true; });
    nietGevonden.hidden = true;

    var pagina = paginas[id];
    if (!pagina) {
      nietGevonden.innerHTML = '<h1>Pagina niet gevonden</h1><p class="lead">Deze pagina bestaat niet (meer). Ga naar de <a href="#/start">startpagina</a>.</p>';
      pagina = nietGevonden;
    }
    pagina.hidden = false;
    document.title = (titels[id] || 'Pagina niet gevonden') + ' | Media for Empowerment';

    if (!terugBezig && spoor[spoor.length - 1] !== adres) spoor.push(adres);
    terugBezig = false;

    // Het menu toont waar je bent. Fasen, factoren en praktijken staan niet apart
    // in het menu: dan licht de overkoepelende kop op.
    var menuDoel = id;
    if (id.indexOf('praktijk/') === 0) menuDoel = 'praktijken';
    else if (id.indexOf('fase-') === 0) menuDoel = 'fasen';
    else if (id.indexOf('waarom/') === 0) menuDoel = 'waarom';
    document.querySelectorAll('nav.side a[href^="#/"]').forEach(function (a) {
      if (a.getAttribute('href') === '#/' + menuDoel) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    // Scrollen: naar een bron, naar een sectie, of naar boven.
    document.querySelectorAll('.refs li.flash').forEach(function (li) { li.classList.remove('flash'); });
    if (adres.indexOf('bronnen/') === 0) {
      var bron = document.getElementById('b-' + adres.slice(8));
      if (bron) { bron.classList.add('flash'); bron.scrollIntoView({ block: 'center' }); }
    } else if (adres !== id) {
      var sectie = pagina.querySelector('[id="s-' + adres.slice(id.length + 1) + '"]');
      if (sectie) sectie.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }

    menu.classList.remove('open');
    menuKnop.setAttribute('aria-expanded', 'false');

    // Seintje voor andere onderdelen (zoals js/projectbouwer.js).
    document.dispatchEvent(new CustomEvent('gids:pagina', { detail: { id: id, vraag: vraag } }));
  }


  /* Begrippen uitleggen in de tekst --------------------------------------
     De uitleg komt uit de begrippenlijst (pagina "begrippen"). Elke <dt> heeft
     een data-varianten met de vormen waarin het begrip in de tekst staat,
     gescheiden door |. Per pagina krijgt alleen het eerste voorkomen een
     uitleg. Wie erover beweegt, erop tikt of ernaartoe tabt, ziet de uitleg. */
  (function () {
    var lijst = paginas['begrippen'];
    if (!lijst) return;
    var begrippen = [];
    lijst.querySelectorAll('dt[data-varianten]').forEach(function (dt) {
      var dd = dt.nextElementSibling;
      if (!dd) return;
      var kopie = dd.cloneNode(true);
      kopie.querySelectorAll('.meer').forEach(function (m) { m.remove(); });
      var vormen = dt.getAttribute('data-varianten').split('|');
      var hoofdletters = vormen.every(function (v) { return v === v.toUpperCase(); });
      var patroon = vormen.map(function (v) { return v.replace(/[.*+?^${}()[\]\\]/g, '\\$&'); }).join('|');
      begrippen.push({
        id: dt.id.slice(2),
        naam: dt.textContent.trim(),
        uitleg: kopie.textContent.replace(/\s+/g, ' ').trim(),
        re: new RegExp('(^|[^\\p{L}\\p{N}-])(' + patroon + ')(?![\\p{L}\\p{N}])', hoofdletters ? 'u' : 'iu')
      });
    });

    var NIET = 'h1,h2,h3,h4,h5,h6,a,button,sup,nav,label,.grond,.kind,.colofon,.voetnoten,.backlinks,.refs,.zoek,#projectbouwer,.begrip,.download,.downloads';

    function markeer(pagina) {
      var gedaan = {};
      var loper = document.createTreeWalker(pagina, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var ouder = n.parentElement;
          if (!ouder || ouder.closest(NIET)) return NodeFilter.FILTER_REJECT;
          return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      var knopen = [];
      while (loper.nextNode()) knopen.push(loper.currentNode);
      knopen.forEach(function (knoop) {
        begrippen.forEach(function (b) {
          if (gedaan[b.id] || !knoop.parentNode) return;
          var m = b.re.exec(knoop.nodeValue);
          if (!m) return;
          var begin = m.index + m[1].length;
          var rest = knoop.splitText(begin);
          var staart = rest.splitText(m[2].length);
          var span = document.createElement('span');
          span.className = 'begrip';
          span.tabIndex = 0;
          span.setAttribute('data-begrip', b.id);
          span.setAttribute('aria-describedby', 'begrip-uitleg');
          rest.parentNode.replaceChild(span, rest);
          span.appendChild(rest);
          gedaan[b.id] = true;
          knoop = staart; // verder zoeken in de tekst na het begrip
        });
      });
    }
    Object.keys(paginas).forEach(function (id) {
      if (id !== 'begrippen' && id !== 'bronnen' && id !== 'project') markeer(paginas[id]);
    });

    var perId = {};
    begrippen.forEach(function (b) { perId[b.id] = b; });
    var vak = document.createElement('div');
    vak.id = 'begrip-uitleg';
    vak.className = 'begrip-uitleg';
    vak.setAttribute('role', 'tooltip');
    vak.hidden = true;
    document.body.appendChild(vak);
    var huidig = null, sluitTimer = null;

    function open(span) {
      var b = perId[span.getAttribute('data-begrip')];
      if (!b) return;
      clearTimeout(sluitTimer);
      huidig = span;
      vak.innerHTML = '';
      var t = document.createElement('strong'); t.textContent = b.naam;
      var u = document.createElement('p'); u.textContent = b.uitleg;
      var l = document.createElement('a'); l.href = '#/begrippen/' + b.id; l.textContent = 'Naar de begrippenlijst';
      vak.appendChild(t); vak.appendChild(u); vak.appendChild(l);
      vak.hidden = false;
      var r = span.getBoundingClientRect();
      var breed = Math.min(320, document.documentElement.clientWidth - 24);
      vak.style.width = breed + 'px';
      var links = Math.max(12, Math.min(r.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - breed - 12));
      vak.style.left = links + 'px';
      var hoog = vak.offsetHeight;
      var onder = r.bottom + window.scrollY + 6;
      var boven = r.top + window.scrollY - hoog - 6;
      vak.style.top = (r.bottom + hoog + 12 > window.innerHeight && boven > window.scrollY ? boven : onder) + 'px';
    }
    function sluit() { vak.hidden = true; huidig = null; }
    function sluitStraks() { clearTimeout(sluitTimer); sluitTimer = setTimeout(sluit, 250); }

    document.addEventListener('mouseover', function (e) {
      var s = e.target.closest && e.target.closest('.begrip');
      if (s) open(s);
      else if (e.target.closest && e.target.closest('#begrip-uitleg')) clearTimeout(sluitTimer);
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && (e.target.closest('.begrip') || e.target.closest('#begrip-uitleg'))) sluitStraks();
    });
    document.addEventListener('focusin', function (e) {
      if (e.target.classList && e.target.classList.contains('begrip')) open(e.target);
      else if (!vak.contains(e.target)) sluit();
    });
    document.addEventListener('click', function (e) {
      var s = e.target.closest && e.target.closest('.begrip');
      if (s) { if (huidig === s && !vak.hidden) sluit(); else open(s); return; }
      if (!vak.contains(e.target)) sluit();
      else if (e.target.closest('a')) sluit();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') sluit(); });
    window.addEventListener('hashchange', sluit);
  })();


  /* Afdrukken ------------------------------------------------------------ */
  var printPagina = document.getElementById('printPage');
  if (printPagina) printPagina.addEventListener('click', function () { window.print(); });

  window.addEventListener('hashchange', toon);
  // Pas starten als de hele pagina geladen is, zodat ook de projectbouwer klaarstaat.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', toon);
  else toon();
})();
