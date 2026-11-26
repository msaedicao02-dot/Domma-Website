#!/usr/bin/env node
/* =========================================================================
   VERIFICADOR DO SITE DOMMA
   Rode antes e depois de qualquer alteração:   node tools/verificar-site.mjs
   Confere se:
     1. todo arquivo citado no HTML/CSS/JS (img/, video/, css/, js/) existe;
     2. todos os IDs e atributos que o JavaScript usa continuam no HTML;
     3. o JavaScript não tem erro de sintaxe.
   Se aparecer "ERRO", não publique: corrija antes.
   ========================================================================= */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");
const html = read("index.html");
const css = read("css/site.css") + read("css/tokens.css");
const js = read("js/site.js");
let errors = 0;
const fail = (msg) => { errors++; console.log("ERRO  " + msg); };
const ok = (msg) => console.log("ok    " + msg);

// 1. Arquivos referenciados
const refs = new Set();
for (const src of [html, css, js]) {
  for (const m of src.matchAll(/["'(]((?:img|video|css|js)\/[^"')\s]+)["')]/g)) refs.add(m[1]);
}
const missing = [...refs].filter((r) => !existsSync(join(root, r)));
missing.forEach((r) => fail(`arquivo citado não existe: ${r}`));
if (!missing.length) ok(`${refs.size} arquivos citados, todos existem`);

// 1b. Páginas em templates/: links relativos (ex.: ../css/tokens.css) precisam existir
const tplDir = join(root, "templates");
if (existsSync(tplDir)) {
  for (const f of readdirSync(tplDir).filter((n) => n.endsWith(".html"))) {
    const src = readFileSync(join(tplDir, f), "utf8");
    const rel = [...src.matchAll(/(?:href|src)="((?:\.\.\/|\.\/)[^"#?]+)"/g)].map((m) => m[1]);
    const bad = rel.filter((r) => !existsSync(join(tplDir, r)));
    bad.forEach((r) => fail(`templates/${f}: arquivo não encontrado: ${r}`));
    if (!bad.length) ok(`templates/${f}: ${rel.length} arquivo(s) ligado(s), todos existem`);
  }
}

// 2. IDs e ganchos que o JavaScript usa (não renomeie no HTML)
const ids = ["hero", "hero-pause", "hero-sound", "film-video", "film-play", "player",
  "gallery", "gallery-count", "grid", "newsletter", "form-note", "subnav-select",
  "colecao", "filme", "gloss", "perfumes", "produtos", "d-tons", "d-perfumes", "d-design"];
ids.forEach((id) => { if (!html.includes(`id="${id}"`)) fail(`id="${id}" sumiu do HTML (o JavaScript precisa dele)`); });
const hooks = [
  ['class="chapter', 3, "botões de capítulo do vídeo do topo"],
  ["data-drawer=", 3, "botões das gavetas do Conheça"],
  ['class="vthumb"', 1, "miniaturas de vídeo com luz dourada"],
  ["data-film=", 1, "botões que abrem filmes"],
  ['class="autoloop"', 1, "faixas de vídeo em loop"],
  ['class="gallery__arrow"', 2, "setas do carrossel"]
];
hooks.forEach(([needle, min, what]) => {
  const n = html.split(needle).length - 1;
  if (n < min) fail(`${what}: esperado pelo menos ${min}, encontrado ${n} (${needle})`);
});
if (!errors) ok(`${ids.length} IDs e ${hooks.length} ganchos do JavaScript presentes`);

// 3. Sintaxe do JavaScript
try { new Function(js); ok("js/site.js sem erro de sintaxe"); }
catch (e) { fail(`js/site.js com erro de sintaxe: ${e.message}`); }

// 4. Filmes do topo listados no JS existem
for (const m of js.matchAll(/src:\s*"([^"]+)"/g)) if (!existsSync(join(root, m[1]))) fail(`vídeo do topo não existe: ${m[1]}`);

console.log(errors ? `\n${errors} problema(s). Corrija antes de publicar.` : "\nTudo certo. Pode publicar.");
process.exit(errors ? 1 : 0);
