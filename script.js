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
  hero: null,                 // e.g. "images/melina-portrait.jpg" (black & white portrait)
  about: null,                // e.g. "images/melina-portrait.jpg"
  philosophy: null,           // e.g. "images/facial.jpg"
  "treat-facial": null,
  "treat-microneedling": null,
  "treat-bbglow": null,
  "treat-browlift": null,
  "treat-lashlift": null,
  "treat-lashext": null,
  "result-lash": null,        // e.g. "images/lashlift.jpg"
  "result-face": null,        // e.g. "images/facial.jpg"
  "review-1": null,
  "review-2": null,
  "review-3": null,
  "journal-1": null,
  "journal-2": null,
  "journal-3": null
};
/* Before/after slider: the brow photo, split into two halves */
const BEFORE_AFTER = {
  before: null,               // e.g. "images/brows-before.jpg"
  after: null                 // e.g. "images/brows-after.jpg"
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
  const ba = document.getElementById("ba");
  if (ba && BEFORE_AFTER.before && BEFORE_AFTER.after) {
    ba.querySelector('[data-ba="before"]').src = BEFORE_AFTER.before;
    ba.querySelector('[data-ba="after"]').src = BEFORE_AFTER.after;
    ba.classList.add("has-photos");
  }

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
    menu.setAttribute("aria-hidden", String(!open));
    if (open) menu.removeAttribute("inert"); else menu.setAttribute("inert", "");
    document.body.style.overflow = open ? "hidden" : "";
    updateMenuLabel();
  }
  if (burger) burger.addEventListener("click", () => toggleMenu());
  if (menu) menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggleMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth >= 1024) toggleMenu(false); });

  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 30);
      const menuOpen = burger && burger.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("is-hidden", !menuOpen && y > 600 && y > lastY + 4);
      if (y < lastY - 4) nav.classList.remove("is-hidden");
    }
    lastY = y;
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

  /* ===================== Before / after slider ===================== */
  if (ba) {
    const handle = ba.querySelector(".ba__handle");
    let pos = 50;
    let dragging = false;
    const set = (p) => {
      pos = Math.max(0, Math.min(100, p));
      ba.style.setProperty("--pos", pos + "%");
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
    };
    const fromEvent = (e) => {
      const r = ba.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    };
    ba.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      ba.classList.add("is-dragging", "was-used");
      try { ba.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      set(fromEvent(e));
    });
    ba.addEventListener("pointermove", (e) => { if (dragging) set(fromEvent(e)); });
    const stop = () => { dragging = false; ba.classList.remove("is-dragging"); };
    ba.addEventListener("pointerup", stop);
    ba.addEventListener("pointercancel", stop);
    handle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") { set(pos - step); e.preventDefault(); }
      else if (e.key === "ArrowRight" || e.key === "ArrowUp") { set(pos + step); e.preventDefault(); }
      else if (e.key === "Home") { set(0); e.preventDefault(); }
      else if (e.key === "End") { set(100); e.preventDefault(); }
      ba.classList.add("was-used");
    });
    // gentle intro sweep so visitors notice it is interactive
    if (!reduceMotion && "IntersectionObserver" in window) {
      const sio = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        sio.disconnect();
        if (ba.classList.contains("was-used")) return;
        const start = performance.now();
        const anim = (now) => {
          if (ba.classList.contains("was-used")) return;
          const k = Math.min(1, (now - start) / 1600);
          set(50 + Math.sin(k * Math.PI * 2) * 14 * (1 - k));
          if (k < 1) requestAnimationFrame(anim);
        };
        setTimeout(() => requestAnimationFrame(anim), 500);
      }, { threshold: 0.5 });
      sio.observe(ba);
    }
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

  /* expose for QA */
  window.__melina = { setLang, t, get lang() { return currentLang; } };
})();
