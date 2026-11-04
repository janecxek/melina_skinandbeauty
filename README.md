# Melina Skin & Beauty – Website-Mockup

Zweisprachige (DE/EN) One-Page-Website für das Kosmetikstudio **MELINA SKIN & BEAUTY** in Gelsenkirchen.
Das Layout folgt dem Framer-Template NAVARA (Reihenfolge, Raster, Abstände, Animationen). Farben, Schriften, Texte und Bilder sind komplett Melinas Marke: Monochrom im Magazin-Stil.

Reines HTML/CSS/JS, ohne Framework und ohne Build-Schritt.

```bash
python3 -m http.server 8080   # dann http://localhost:8080 öffnen (EN: ?lang=en)
node tools/check-i18n.js      # prüft, dass jeder Text-Key in DE und EN existiert
```

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (deutsches Standard-HTML für SEO, JSON-LD BeautySalon, OG, hreflang) |
| `styles.css` | Mobile-first, Breakpoints 768 / 1024 / 1440 |
| `script.js` | i18n-Engine, Navigation, Vorher/Nachher-Slider, FAQ, Sticky-CTA, Karte, Foto-Slots. **Alle Links oben** (`BOOKING_URL`, `WHATSAPP_URL` …) |
| `i18n.js` | Sämtliche Texte `{ de, en }` |
| `impressum.html`, `datenschutz.html` | Rechtliche Seiten (Platzhalter, DE/EN) |
| `images/` | Logo (typografisch), Favicon, OG-Bild, Brauen-Illustration für den Slider |
| `screenshots/` | QA-Screenshots 1440 px und 390 px, jeweils DE und EN |

## Abschnitte (NAVARA → Melina)

| # | NAVARA | Melina |
|---|---|---|
| – | Schwebende Navigationsleiste | Logo, 5 Links, DE/EN, „Termin anfragen“, Burger-Menü auf Mobile |
| 1 | Hero mit Vollbild-Foto | Hero: „Deine Haut. Unsere Expertise.“, Handschrift-Notiz, Porträt-Bogen (bis das Foto da ist) |
| 2 | About (Bild + Glass-Card, Text) | Über mich: Certified Beauty Expert, Text in der Ich-Form, Signatur |
| 3 | Benefits (dunkel, 3 Spalten) | Philosophie: Zitat, 01/02/03-Werte, „Glow like you mean it“ |
| 4 | Treatments (Bento-Raster) | 6 Behandlungen mit Linien-Icons und „ab [PREIS] €“ + Make-up-Hinweis |
| 5 | Results + Vorher/Nachher | Ergebnisse: Browlift-Slider, Lashlift- und Gesichts-Kacheln, Instagram-Link |
| + | – | Preise (dunkel, Preisliste) |
| + | – | Ablauf in 3 Schritten (01 / 02 / 03) |
| 6 | Testimonials (gestapelte Karten) | Bewertungen (Platzhalter, keine erfundenen Bewertungen) |
| 7 | Journal | Wissen / Skin Notes (3 Artikel-Teaser) |
| 8 | FAQ | FAQ-Akkordeon (6 Fragen) |
| 9 | CTA (dunkel) + Footer | Kontakt: „Bereit für deinen Glow?“, Adresse, Zeiten, Karte (2-Klick), Footer |

## Fotos einsetzen

Jeder Bildplatz zeigt bis dahin einen eleganten Platzhalter („Foto folgt“ / „Photo coming soon“).
Datei nach `images/` legen und den Pfad in `script.js` → `IMAGES` eintragen, z. B. `hero: "images/melina-portrait.jpg"`.
Die Fotos werden automatisch schwarz-weiß dargestellt und werden beim Hover farbig.
Für den Vorher/Nachher-Slider das Brauen-Foto in zwei Hälften schneiden und unter `BEFORE_AFTER` eintragen.

## Platzhalter, die noch fehlen

- **Preise:** alle 9 Positionen „ab [PREIS] €“ / „from [PRICE] €“ (`i18n.js` → `prices.from`, `treat.from`)
- **WhatsApp:** `WHATSAPP_URL` in `script.js` (bis dahin führt der Button zu Instagram)
- **Adresse und PLZ:** `contact.address`, Impressum, Datenschutz, JSON-LD, `MAP_EMBED_URL`
- **Öffnungszeiten:** `contact.hours`
- **Telefon, E-Mail, Name der Inhaberin, USt-ID:** Impressum, Datenschutz, JSON-LD (`telephone`, `priceRange`)
- **Über mich:** `[PLATZHALTER: Ausbildung, Zertifikate, Jahre Erfahrung]`
- **Bewertungen:** 3× „[Hier echte Kundenbewertung einfügen]“ + `[NAME] · [BEHANDLUNG]`
- **Domain:** `https://www.melina-skinandbeauty.de` in canonical, hreflang, OG und JSON-LD
- **Fotos:** Porträt (Hero, Über mich), Philosophie, 6 Behandlungskarten, Brauen vorher/nachher, Lashlift, Gesicht, 3 Bewertungs-Ovale, 3 Wissens-Artikel
- **Logo:** derzeit typografisch nachgebaut, Original-Logo als `images/logo.png` ersetzen
- **Rechtstexte:** Impressum und Datenschutz vor dem Livegang rechtssicher erstellen lassen
