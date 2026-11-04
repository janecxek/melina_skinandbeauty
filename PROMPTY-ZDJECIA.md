# Prompty do zdjęć (ChatGPT / generator obrazów)

## Jak używać

1. **Na początku rozmowy w ChatGPT wklej najpierw „Styl bazowy”**, a potem po kolei prompty. Każdy obraz generuj w tej samej rozmowie, żeby seria była spójna.
2. Wybierz format podany przy prompcie: **1:1** (1024×1024), **2:3** (1024×1536, pionowy) albo **3:2** (1536×1024, poziomy).
3. Generuj **w stonowanym kolorze, a nie czarno-biało**. Strona sama robi z tego czerń i biel, a po najechaniu kursorem pokazuje kolor.
4. Zapisz jako `.jpg` pod podaną nazwą w folderze `images/` i wpisz ścieżkę w `script.js` → `IMAGES`, np. `"treat-facial": "images/treat-facial.jpg"`.
5. Jeśli wyjdzie tekst, logo, dodatkowe palce albo plastikowa skóra, dopisz: *„Regenerate: no text, natural skin texture, anatomically correct hands.”*

> **Czego NIE generować AI (muszą być prawdziwe zdjęcia):**
> - **Portret Meliny** (hero i „Über mich”), bo to ona ma być na stronie.
> - **Efekty przed/po i kafelki „Ergebnisse”** (brwi, lashlift, twarz). Wygenerowane „efekty” wprowadzałyby klientki w błąd, a w Niemczech takie zdjęcia podlegają przepisom o reklamie (UWG/HWG).
> - **Twarze klientek przy opiniach**: dla opinii jest niżej prompt na abstrakcyjne tekstury zamiast twarzy.

---

## Styl bazowy (wklej jako pierwszą wiadomość)

```
For this whole conversation, every image follows one consistent visual style:
Editorial luxury beauty photography for a high-end skin studio, like a quiet beauty magazine spread.
Muted, desaturated palette: warm whites, soft greige, stone, nude and warm grey, deep charcoal shadows. No saturated colours, no pink, no green plants.
Soft directional natural window light from one side, gentle long shadows, high dynamic range, delicate highlights on skin.
Real, natural skin texture with visible pores and fine vellus hair – no plastic retouching, no heavy make-up.
Clean minimal set: linen, matte ceramic, frosted glass, brushed steel, smooth plaster walls.
Shot on a full-frame camera, 85mm or 100mm macro lens, shallow depth of field, subtle fine film grain.
Generous negative space for text overlays.
Absolutely no text, letters, logos, brand names, labels or watermarks anywhere in the image.
Anatomically correct hands with five fingers. Professional hygiene: therapist wears nitrile gloves only when the procedure requires it.
Reply only with the image, no commentary.
```

---

## 1 · Filozofia: `philosophy` → `images/philosophy.jpg` · **2:3**

```
Vertical 2:3 editorial photo. Close-up of a calm woman in her late twenties lying on a treatment bed with her eyes closed, seen from slightly above and from the side, her face in the upper-right third of the frame.
A beauty therapist's hands (only hands and forearms visible, no face, short neutral nails) gently apply a white cream mask with a soft flat brush to her cheekbone.
Hair wrapped in a soft off-white linen headband, a folded white towel over her collarbones.
Soft window light from the left, the face glowing, the rest of the frame falling into warm charcoal shadow.
Lower half of the image calm and darker for text. Mood: serene, intimate, trustworthy. No jewellery, no text.
```

## 2 · Zabieg: Gesichtsbehandlungen → `treat-facial` · **2:3**

*(Duża, wysoka karta. Tekst jest u dołu po lewej, a cena w lewym górnym rogu, więc motyw ma być u góry po prawej.)*

```
Vertical 2:3 beauty photo for a "facial treatment" card.
Extreme close-up profile of a woman's face with eyes closed, cheek and jawline catching soft side light, a thin translucent layer of hydrating gel on the skin with tiny reflective highlights.
Face positioned in the upper and right part of the frame; the bottom 40% of the image fades into deep warm charcoal shadow so white text can sit there.
Top-left corner kept simple and dark. Natural pores visible, dewy but not oily. No hands, no tools, no text.
```

## 3 · Zabieg: Microneedling → `treat-microneedling` · **3:2**

```
Horizontal 3:2 macro beauty photo for a "microneedling" card.
A professional microneedling pen (sleek matte white/silver device, no brand marks) held by a gloved hand, its tip touching the smooth skin of a cheek at a 90° angle, a thin sheen of serum on the skin.
Subject in the right half of the frame, very shallow depth of field, the pen tip in razor-sharp focus.
Clinical yet calm and luxurious, no blood, no redness, no visible needles piercing skin.
Left side and bottom softly out of focus and darker for text overlay. No text, no logos.
```

## 4 · Zabieg: BB Glow → `treat-bbglow` · **3:2**

```
Horizontal 3:2 beauty photo for a "BB Glow" card.
Close-up of a woman's cheekbone and temple with a luminous, even, "glass skin" glow, soft highlight running along the cheekbone, natural freckles faintly visible.
Next to her face, slightly out of focus, a small frosted glass ampoule with a nude-beige tinted serum and a drop catching the light.
Subject on the right side, warm-grey background, darker lower-left area for text.
Elegant, minimal, no make-up look, no text, no labels on the ampoule.
```

## 5 · Zabieg: Browlift → `treat-browlift` · **3:2**

*(Szeroka karta, więc motyw ma być po prawej stronie, a lewa połowa spokojna.)*

```
Horizontal 3:2 macro photo for a "brow lamination / brow lift" card.
Extreme close-up of one eyebrow after brow lamination: fuller, glossy brow hairs neatly brushed upward and set in a clean feathered shape, eye below closed with natural lashes.
A thin clean spoolie brush resting near the tail of the brow.
Eyebrow placed in the right half of the frame, the left half is soft out-of-focus skin and shadow for text.
Natural skin texture, soft side light, no make-up, no text.
```

## 6 · Zabieg: Lashlift → `treat-lashlift` · **3:2**

```
Horizontal 3:2 macro photo for a "lash lift" card.
Close-up of a woman's closed eye from a three-quarter angle, her own natural lashes beautifully curled upward in a lifted C-curve, defined and dark but clearly natural (no extensions, no mascara clumps).
Eye in the right half of the frame, soft window light from above-right, shallow depth of field.
Left side calm warm-grey skin tone fading into shadow for text overlay. No text, no tools.
```

## 7 · Zabieg: Lash Extensions → `treat-lashext` · **3:2**

```
Horizontal 3:2 macro photo for a "lash extensions" card.
A lash artist's gloved hand holding fine precision tweezers, placing a single lash extension onto a client's closed eye; the client's lower lashes covered with a thin white under-eye gel pad.
Subject in the right half, tweezer tips and lash in razor-sharp focus, everything else softly blurred.
Calm, precise, luxurious studio atmosphere, muted warm palette, darker left side for text. No text, no logos.
```

## 8 · Wissen: BB Glow → `journal-1` · **3:2**

```
Horizontal 3:2 still-life for a skincare article about BB Glow.
On a smooth stone-coloured plaster surface: two small frosted glass ampoules with nude-beige tinted serum, a glass dropper with a single glossy drop, a soft white cotton pad and a sprig of dried pampas grass.
Low side light creating long soft shadows, minimal composition with generous negative space, top-down 45° angle.
Muted warm neutrals, no labels, no text.
```

## 9 · Wissen: Lashlift vs. Extensions → `journal-2` · **3:2**

```
Horizontal 3:2 flat lay for an article comparing lash lift and lash extensions.
On off-white linen: a small tray of lash extension strips, fine tweezers, a pack of silicone lash-lift shields (rods) in soft beige, a clean spoolie brush and a small mirror reflecting soft light.
Precisely arranged with calm symmetry and lots of empty space, top-down view, soft daylight, gentle shadows.
Muted neutral palette, no packaging text, no logos.
```

## 10 · Wissen: Microneedling (przed i po) → `journal-3` · **3:2**

```
Horizontal 3:2 editorial still-life about aftercare after microneedling.
On a smooth warm-grey stone surface: a minimal white airless pump bottle (gentle soothing cream), a small frosted bottle of hyaluronic serum, a white tube of mineral sunscreen, a folded linen towel and a small ceramic bowl with water.
All products completely blank without any labels. Soft morning window light from the right, long gentle shadows, calm and clean, negative space on the left.
```

## 11 · Opinie: 3 owale → `review-1`, `review-2`, `review-3` · **2:3**

*(Zamiast fałszywych twarzy klientek: spokojne, abstrakcyjne tekstury. Wygeneruj 3 warianty.)*

```
Vertical 2:3 abstract beauty texture, centred composition (it will be cropped into an oval).
Variant A: a single swirl of silky white cream on a warm greige surface, soft light, macro.
Variant B: soft shadows of a sheer linen curtain falling across smooth plaster wall, gentle light gradient.
Variant C: a few glossy drops of clear serum on frosted glass, bokeh highlights.
Muted warm neutral palette, minimal, calm, no faces, no hands, no text.
```

*(Najlepiej i tak zastąpić je prawdziwymi zdjęciami klientek, za ich zgodą, albo zostawić placeholder.)*

---

## Opcjonalnie: hero bez portretu → `hero` · **3:2**

*(Tylko gdyby Melina nie chciała swojego zdjęcia na górze strony. Najlepszy efekt da jej prawdziwy czarno-biały portret.)*

```
Wide horizontal 3:2 cinematic interior photo of a minimal luxury skin studio at golden hour.
A treatment bed with crisp white linen and a folded towel on the right side of the frame, a round frosted wall lamp, a small trolley with frosted glass bottles, smooth warm plaster walls, sheer curtain diffusing the window light.
Left 55% of the frame is calm, empty and in soft deep shadow so large white headline text can be placed there.
Muted warm-grey palette, quiet and elegant, no people, no text, no logos.
```

---

## Wskazówki do prawdziwych zdjęć Meliny (telefon wystarczy)

- **Portret do hero:** format poziomy, Melina po prawej stronie kadru, a po lewej dużo pustego, ciemnego tła. Ciemne ubranie, jedno okno jako światło z boku, bez lampy błyskowej. Strona sama zamieni zdjęcie na czarno-białe.
- **Portret „Über mich”:** pion albo kwadrat, ciepły uśmiech, może przy pracy (np. przy łóżku zabiegowym). Ten sam strój co w hero albo podobny.
- **Przed/po brwi:** dwa zdjęcia z **identycznego kąta, odległości i przy tym samym świetle**. Ewentualnie wytnij obie połówki z jej istniejącego zdjęcia przed/po.
