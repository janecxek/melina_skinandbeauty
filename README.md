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
| `PROMPTY-ZDJECIA.md` | Prompts (ChatGPT) für die fehlenden Bilder |

## Abschnitte

| # | Abschnitt | Inhalt |
|---|---|---|
| – | Navigation | Logo „Melina“, Behandlungen · Preise · Über mich · Bewertungen · Kontakt, DE/EN, „Termin anfragen“, Burger-Menü auf Mobile |
| 1 | Hero | Vollbild-Foto, „Deine Haut. Unsere Expertise.“, Untertitel, 2 Buttons |
| 2 | Behandlungen | horizontales Karussell: 6 Karten mit Foto, Beschreibung, Kategorie und „ab [PREIS] €“; Pfeile unter den Karten, Maus ziehen, Wischen |
| 3 | Preise (dunkel) | Preisliste mit 9 Positionen |
| 4 | Über mich | Porträt Melina, Text in der Ich-Form, Signatur |
| 5 | Philosophie (dunkel) | Zitat, 01/02/03-Werte, „Glow like you mean it“ |
| 6 | Bewertungen | 3 **Beispiel**-Bewertungen (gestapelte Karten) |
| 7 | FAQ | Akkordeon mit 6 Fragen |
| 8 | Kontakt (dunkel) | „Bereit für deinen Glow?“, Adresse, Zeiten, Karte (2-Klick) |
| – | Footer | Logo, Links, © und DE/EN |

## Fotos einsetzen

Jeder Bildplatz zeigt bis dahin einen eleganten Platzhalter („Foto folgt“ / „Photo coming soon“).
Datei nach `images/` legen und den Pfad in `script.js` → `IMAGES` eintragen, z. B. `hero: "images/melina-portrait.jpg"`.
Die Fotos werden in Farbe gezeigt und zoomen beim Hover leicht heran.

## Platzhalter, die noch fehlen

- **Preise:** alle 9 Positionen „ab [PREIS] €“ / „from [PRICE] €“ (`i18n.js` → `prices.from`, `treat.from`)
- **WhatsApp:** `WHATSAPP_URL` in `script.js` (bis dahin führt der Button zu Instagram)
- **Adresse und PLZ:** `contact.address`, Impressum, Datenschutz, JSON-LD, `MAP_EMBED_URL`
- **Öffnungszeiten:** `contact.hours`
- **Telefon, E-Mail, Name der Inhaberin, USt-ID:** Impressum, Datenschutz, JSON-LD (`telephone`, `priceRange`)
- **Über mich:** `[PLATZHALTER: Ausbildung, Zertifikate, Jahre Erfahrung]`
- **Bewertungen:** die 3 Bewertungen sind **Beispieltexte für den Entwurf**. Vor dem Livegang durch echte Kundenbewertungen ersetzen (erfundene Bewertungen sind in Deutschland verboten, § 5b UWG) – `i18n.js` → `reviews.1–3`
- **Domain:** `https://www.melina-skinandbeauty.de` in canonical, hreflang, OG und JSON-LD
- **Fotos:** alle Plätze sind belegt (Melina = echtes Porträt, übrige = KI-Stimmungsbilder); für echte Behandlungsfotos einfach die Dateien in `images/` ersetzen
- **Logo:** derzeit typografisch nachgebaut, Original-Logo als `images/logo.png` ersetzen
- **Rechtstexte:** Impressum und Datenschutz vor dem Livegang rechtssicher erstellen lassen
