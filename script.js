/* =========================================================
   MELINA SKIN & BEAUTY – script.js
   ========================================================= */

/* ---------- Links: edit here, used everywhere ---------- */
const BOOKING_URL = "https://ig.me/m/melina_skinandbeauty";
const WHATSAPP_URL = "[WHATSAPP_URL]"; // e.g. "https://wa.me/49XXXXXXXXXXX"
const INSTAGRAM_URL = "https://www.instagram.com/melina_skinandbeauty/";
const MAP_EMBED_URL = "https://www.google.com/maps?q=Gelsenkirchen&output=embed"; // [ADRESSE] einsetzen

/* ---------- Photos: drop files into /images and add the file name here ----------
   Every slot shows an elegant "Foto folgt / Photo coming soon" placeholder while null. */
const IMAGES = {
  hero: "images/hero.jpg",                       // full-screen background (mood photo, AI-generated)
  about: "images/melina.jpg",                    // Melina's real portrait
  philosophy: "images/philosophy.jpg",
  "treat-facial": "images/treat-facial.jpg",
  "treat-microneedling": "images/treat-microneedling.jpg",
  "treat-bbglow": "images/treat-bbglow.jpg",
  "treat-browlift": "images/treat-browlift.jpg",
  "treat-lashlift": "images/treat-lashlift.jpg",
  "treat-lashext": "images/treat-lashext.jpg",
  "review-1": "images/review-1.jpg",
  "review-2": "images/review-2.jpg",
  "review-3": "images/review-3.jpg"
};

(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");
  const DICT = window.I18N || { de: {}, en: {} };
  const LANGS = ["de", "en"];
  const STORE_KEY = "melina-lang";
  const page = root.dataset.page || "home";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.getElementById("nav");
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("mobile-menu");

  /* ===================== i18n ===================== */
  const store = {
    get() { try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; } },
    set(v) { try { window.localStorage.setItem(STORE_KEY, v); } catch (e) { /* storage blocked */ } }
  };

  function detectLang() {
    let fromUrl = null;
    try { fromUrl = new URLSearchParams(window.location.search).get("lang"); } catch (e) { /* ignore */ }
    if (fromUrl && LANGS.includes(fromUrl.toLowerCase())) return fromUrl.toLowerCase();
    const saved = store.get();
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return nav.toLowerCase().startsWith("en") ? "en" : "de";
  }

  function t(key, lang) {
    const d = DICT[lang] || {};
    if (key in d) return d[key];
    if (key in DICT.de) return DICT.de[key];
    return null;
  }

  let currentLang = "de";

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.setAttribute(attr, value);
  }

  function applyTexts(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n, lang); if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = t(el.dataset.i18nHtml, lang); if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const v = t(el.dataset.i18nAlt, lang); if (v != null) el.setAttribute("alt", v);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const v = t(el.dataset.i18nPlaceholder, lang); if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const v = t(el.dataset.i18nTitle, lang); if (v != null) el.setAttribute("title", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const v = t(el.dataset.i18nAria, lang); if (v != null) el.setAttribute("aria-label", v);
    });

    root.lang = lang;
    const title = t(`meta.${page}.title`, lang);
    const desc = t(`meta.${page}.desc`, lang);
    if (title) document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:locale"]', "content", lang === "de" ? "de_DE" : "en_GB");
    setMeta('meta[property="og:locale:alternate"]', "content", lang === "de" ? "en_GB" : "de_DE");

    document.querySelectorAll(".lang-switch button[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    // keep internal links (legal pages) in the chosen language
    document.querySelectorAll('a[href$=".html"], a[href*=".html?"], a[href*=".html#"]').forEach((a) => {
      const href = a.getAttribute("href");
      if (/^https?:/.test(href)) return;
      const [path, hash] = href.split("#");
      const clean = path.split("?")[0];
      a.setAttribute("href", clean + (lang === "en" ? "?lang=en" : "") + (hash ? "#" + hash : ""));
    });

    updateMenuLabel();
  }

  function updateUrl(lang) {
    try {
      const url = new URL(window.location.href);
      if (lang === "en") url.searchParams.set("lang", "en"); else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) { /* ignore */ }
  }

  function setLang(lang, animate) {
    if (!LANGS.includes(lang)) return;
    const changed = lang !== currentLang;
    currentLang = lang;
    store.set(lang);
    if (!animate || reduceMotion || !changed) { applyTexts(lang); updateUrl(lang); return; }
    root.classList.add("i18n-fade");
    window.setTimeout(() => {
      applyTexts(lang);
      updateUrl(lang);
      root.classList.remove("i18n-fade");
      root.classList.add("i18n-fade-in");
      window.setTimeout(() => root.classList.remove("i18n-fade-in"), 200);
    }, 180);
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lang-switch button[data-lang]");
    if (b) setLang(b.dataset.lang, true);
  });

  /* ===================== Links ===================== */
  document.querySelectorAll(".js-book").forEach((a) => { a.href = BOOKING_URL; });
  document.querySelectorAll(".js-whatsapp").forEach((a) => {
    if (/^https?:/.test(WHATSAPP_URL)) { a.href = WHATSAPP_URL; }
    else {
      a.href = BOOKING_URL; // fallback until the WhatsApp link is set
      a.dataset.placeholder = WHATSAPP_URL;
    }
  });
  document.querySelectorAll('a[href^="https://www.instagram.com/melina"]').forEach((a) => { a.href = INSTAGRAM_URL; });

  /* ===================== Image slots ===================== */
  document.querySelectorAll("[data-img]").forEach((slot) => {
    const src = IMAGES[slot.dataset.img];
    if (!src) return;
    const img = document.createElement("img");
    img.src = src;
    img.decoding = "async";
    img.loading = slot.hasAttribute("data-eager") ? "eager" : "lazy";
    if (slot.dataset.alt) img.dataset.i18nAlt = slot.dataset.alt;
    img.alt = slot.dataset.alt ? (t(slot.dataset.alt, currentLang) || "") : "";
    slot.prepend(img);
    slot.classList.add("has-img");
  });

  /* init language (after image slots so their alts get translated too) */
  currentLang = detectLang();
  applyTexts(currentLang);
  store.set(currentLang);

  /* ===================== Navigation ===================== */

  function updateMenuLabel() {
    if (!burger) return;
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-label", t(open ? "a11y.menuClose" : "a11y.menuOpen", currentLang) || "");
  }

  function toggleMenu(force) {
    if (!menu || !burger) return;
    const open = typeof force === "boolean" ? force : burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    if (nav) nav.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    if (open) menu.removeAttribute("inert"); else menu.setAttribute("inert", "");
    document.body.style.overflow = open ? "hidden" : "";
    updateMenuLabel();
  }
  if (burger) burger.addEventListener("click", () => toggleMenu());
  if (menu) menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggleMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth >= 1024) toggleMenu(false); });

  // navbar stays visible (as in the template); it only gets a solid background once scrolled
  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // active link highlight
  const navLinks = Array.from(document.querySelectorAll(".nav__links a[href^='#']"));
  if ("IntersectionObserver" in window && navLinks.length) {
    const map = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("is-active"));
          const a = map.get(en.target.id); if (a) a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    const heroEl = document.getElementById("top");
    if (heroEl) io.observe(heroEl); // hero has no link → clears the underline
  }

  /* ===================== Reveal on scroll ===================== */
  const reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); rio.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => rio.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ===================== Treatments carousel ===================== */
  const ts = document.getElementById("tslider");
  if (ts) {
    const prev = document.querySelector('.cnav__btn[data-dir="-1"]');
    const next = document.querySelector('.cnav__btn[data-dir="1"]');
    const bar = document.querySelector(".tprogress span");
    const step = () => {
      const card = ts.querySelector(".tc");
      const gap = parseFloat(getComputedStyle(ts.querySelector(".tslider__track")).columnGap) || 16;
      return card ? card.getBoundingClientRect().width + gap : ts.clientWidth * 0.8;
    };
    const update = () => {
      const max = ts.scrollWidth - ts.clientWidth;
      if (prev) prev.disabled = ts.scrollLeft <= 2;
      if (next) next.disabled = ts.scrollLeft >= max - 2;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, (ts.scrollLeft + ts.clientWidth) / ts.scrollWidth) : 1})`;
    };
    [prev, next].forEach((btn) => btn && btn.addEventListener("click", () => {
      ts.scrollBy({ left: Number(btn.dataset.dir) * step(), behavior: reduceMotion ? "auto" : "smooth" });
    }));
    ts.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { ts.scrollBy({ left: step(), behavior: "smooth" }); e.preventDefault(); }
      if (e.key === "ArrowLeft") { ts.scrollBy({ left: -step(), behavior: "smooth" }); e.preventDefault(); }
    });
    ts.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    // drag with the mouse on desktop (touch devices swipe natively)
    let down = false, moved = false, startX = 0, startLeft = 0;
    ts.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = ts.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; ts.classList.add("is-dragging"); }
      if (moved) ts.scrollLeft = startLeft - dx;
    });
    const end = () => {
      if (!down) return;
      down = false;
      if (moved) {
        ts.classList.remove("is-dragging");
        const s = step();
        ts.scrollTo({ left: Math.round(ts.scrollLeft / s) * s, behavior: "smooth" });
      }
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    ts.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    ts.addEventListener("dragstart", (e) => e.preventDefault());
  }

  /* ===================== Accordion ===================== */
  document.querySelectorAll(".acc__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc");
      const open = btn.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".acc.is-open").forEach((o) => {
        if (o !== item) { o.classList.remove("is-open"); o.querySelector(".acc__btn").setAttribute("aria-expanded", "false"); }
      });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ===================== Sticky CTA (mobile) ===================== */
  const sticky = document.querySelector(".sticky-cta");
  const hero = document.querySelector(".hero");
  const contact = document.getElementById("kontakt");
  if (sticky && hero && "IntersectionObserver" in window) {
    let pastHero = false;
    let atContact = false;
    const render = () => {
      const show = pastHero && !atContact;
      sticky.classList.toggle("is-visible", show);
      sticky.setAttribute("aria-hidden", String(!show));
      sticky.tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver((en) => { pastHero = !en[0].isIntersecting; render(); }, { threshold: 0.05 }).observe(hero);
    if (contact) new IntersectionObserver((en) => { atContact = en[0].isIntersecting; render(); }, { threshold: 0.15 }).observe(contact);
  }

  /* ===================== Map (2-click, privacy friendly) ===================== */
  const mapBtn = document.getElementById("map-load");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      const box = document.getElementById("map");
      const iframe = document.createElement("iframe");
      iframe.src = MAP_EMBED_URL;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = t("contact.mapTitle", currentLang) || "Map";
      iframe.dataset.i18nTitle = "contact.mapTitle";
      box.innerHTML = "";
      box.appendChild(iframe);
    });
  }

  /* ===================== Smooth scroll =====================
     Inertial wheel scrolling on desktop (native touch scrolling stays on phones)
     + eased anchor scrolling everywhere. Off with prefers-reduced-motion. */
  const smooth = (() => {
    if (reduceMotion) return null;
    root.style.scrollBehavior = "auto"; // JS takes over; CSS smooth would fight it
    const fine = !window.matchMedia("(hover: none) and (pointer: coarse)").matches; // phones/tablets keep native touch scrolling
    const maxY = () => document.documentElement.scrollHeight - window.innerHeight;
    const clamp = (v) => Math.max(0, Math.min(maxY(), v));
    let current = window.scrollY;
    let target = current;
    let raf = null;
    let tween = null; // { from, to, start, dur }
    let selfScroll = false;
    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    let last = 0;
    function frame(now) {
      raf = null;
      const dt = last ? Math.min(3, (now - last) / 16.667) : 1; // frame-rate independent
      last = now;
      let next;
      if (tween) {
        const k = Math.min(1, (now - tween.start) / tween.dur);
        next = tween.from + (tween.to - tween.from) * easeOutExpo(k);
        if (k >= 1) { tween = null; next = target; }
      } else {
        next = current + (target - current) * (1 - Math.pow(1 - 0.085, dt));
        if (Math.abs(target - next) < 0.5) next = target;
      }
      current = next;
      selfScroll = true;
      window.scrollTo(0, current);
      if (current !== target || tween) raf = requestAnimationFrame(frame);
    }
    const run = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };

    // keep in sync with scrollbar drags, keyboard, find-in-page, touch …
    window.addEventListener("scroll", () => {
      if (selfScroll) { selfScroll = false; return; }
      if (!raf) { current = target = window.scrollY; }
    }, { passive: true });

    function scrollableParent(el) {
      for (; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) return el;
      }
      return null;
    }

    if (fine) {
      window.addEventListener("wheel", (e) => {
        if (e.ctrlKey || e.defaultPrevented) return;                  // pinch-zoom
        if (document.body.style.overflow === "hidden") return;        // menu open
        if (scrollableParent(e.target)) return;                       // inner scroll areas
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;          // horizontal gestures
        e.preventDefault();
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
        if (tween) { tween = null; current = window.scrollY; }
        if (!raf) current = window.scrollY;
        target = clamp(target + e.deltaY * unit);
        run();
      }, { passive: false });
    }

    function to(y, dur) {
      target = clamp(y);
      current = window.scrollY;
      const dist = Math.abs(target - current);
      tween = { from: current, to: target, start: performance.now(), dur: dur || Math.min(1600, 600 + dist * 0.25) };
      run();
    }
    return { to };
  })();

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const id = a.getAttribute("href").slice(1);
    const el = id ? document.getElementById(id) : null;
    if (!el && id !== "top") return;
    e.preventDefault();
    const offset = id === "top" ? 0 : 88;
    const y = el ? el.getBoundingClientRect().top + window.scrollY - offset : 0;
    if (smooth) smooth.to(y); else window.scrollTo(0, y);
    try { history.replaceState(null, "", location.pathname + location.search + "#" + id); } catch (err) { /* ignore */ }
    if (el && !a.classList.contains("skip-link")) return;
    if (el) { el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); }
  });

  /* expose for QA */
  window.__melina = { setLang, t, get lang() { return currentLang; } };
})();
