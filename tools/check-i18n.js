#!/usr/bin/env node
/* Checks that every translation key used in the HTML/JS exists in BOTH languages.
   Usage: node tools/check-i18n.js */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
global.window = {};
require(path.join(root, "i18n.js"));
const { de, en } = window.I18N;
let errors = 0;
const fail = (m) => { errors++; console.error("✗ " + m); };

// 1) same key set in both languages, no empty values
for (const k of Object.keys(de)) if (!(k in en)) fail(`missing in EN: ${k}`);
for (const k of Object.keys(en)) if (!(k in de)) fail(`missing in DE: ${k}`);
for (const [lang, d] of Object.entries({ de, en }))
  for (const [k, v] of Object.entries(d)) if (typeof v !== "string" || !v.trim()) fail(`empty value ${lang}: ${k}`);

// 2) every key referenced in HTML exists
const used = new Set();
const pages = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
for (const f of pages) {
  const html = fs.readFileSync(path.join(root, f), "utf8");
  for (const m of html.matchAll(/data-(?:i18n(?:-html|-alt|-placeholder|-aria|-title)?|alt)="([^"]+)"/g)) used.add(m[1]);
  const page = (html.match(/data-page="([^"]+)"/) || [])[1];
  if (page) { used.add(`meta.${page}.title`); used.add(`meta.${page}.desc`); }
}
// 3) keys used directly in script.js
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
for (const m of js.matchAll(/\bt\("([a-z0-9]+\.[a-z0-9.]+)"/gi)) used.add(m[1]);
for (const m of js.matchAll(/"([a-z0-9]+\.[a-zA-Z0-9.]+)"/g)) if (m[1] in de) used.add(m[1]);
for (const k of used) {
  if (!(k in de)) fail(`used but missing in DE: ${k}`);
  if (!(k in en)) fail(`used but missing in EN: ${k}`);
}
// 4) unused keys (warning only)
const unused = Object.keys(de).filter((k) => !used.has(k));
if (unused.length) console.warn("⚠ unused keys: " + unused.join(", "));

console.log(`${Object.keys(de).length} keys per language · ${used.size} keys used in ${pages.length} pages`);
if (errors) { console.error(`${errors} problem(s) found`); process.exit(1); }
console.log("✓ all keys exist in DE and EN");
