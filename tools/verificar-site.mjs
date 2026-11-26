#!/usr/bin/env node
/* =========================================================================
   VERIFICADOR DO SITE DOMMA
   Rode antes e depois de qualquer alteração:   npm run verificar
   (ou: node tools/verificar-site.mjs)

   Confere:
     1. todo arquivo citado no site (assets/...) existe dentro de public/;
     2. páginas de templates/ apontam para arquivos que existem;
     3. todos os IDs e ganchos que o JavaScript usa continuam no HTML;
     4. o JavaScript não tem erro de sintaxe;
     5. arquivos de deploy obrigatórios existem (404, favicon, _headers...).
   Também AVISA (sem bloquear) sobre fotos/vídeos que não são usados e
   links provisórios (href="#") que ainda precisam do endereço real.

   Se aparecer "ERRO", não publique: corrija antes.
   ========================================================================= */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const read = (...p) => readFileSync(join(...p), "utf8");
let errors = 0;
const fail = (msg) => { errors++; console.log("ERRO  " + msg); };
const ok = (msg) => console.log("ok    " + msg);
const warn = (msg) => console.log("aviso " + msg);

const html = read(pub, "index.html");
const page404 = existsSync(join(pub, "404.html")) ? read(pub, "404.html") : "";
const css = read(pub, "assets/css/site.css") + read(pub, "assets/css/tokens.css");
const js = read(pub, "assets/js/site.js");

// 1. Arquivos referenciados (caminhos relativos a public/)
const refs = new Set();
for (const src of [html, page404, css, js]) {
  for (const m of src.matchAll(/["'(,]((?:assets\/)[^"')\s,]+)/g)) refs.add(m[1]);
}
const missing = [...refs].filter((r) => !existsSync(join(pub, r)));
missing.forEach((r) => fail(`arquivo citado não existe: public/${r}`));
if (!missing.length) ok(`${refs.size} arquivos citados, todos existem em public/`);

// Arquivos citados dentro do CSS com url("../...") (ex.: fontes)
for (const name of ["tokens.css", "site.css"]) {
  const src = read(pub, "assets/css", name);
  for (const m of src.matchAll(/url\(["']?(\.\.\/[^"')]+)["']?\)/g)) {
    if (!existsSync(join(pub, "assets/css", m[1]))) fail(`${name} cita um arquivo que não existe: ${m[1]}`);
  }
}

// Fotos e vídeos que estão em public/ mas ninguém usa (pesam no deploy)
for (const dir of ["assets/img", "assets/video"]) {
  for (const f of readdirSync(join(pub, dir))) {
    const p = `${dir}/${f}`;
    if (!refs.has(p) && !/og-|favicon/.test(f)) warn(`não usado (pode ir para extras/): public/${p}`);
  }
}

// 2. Páginas de templates/: links relativos precisam existir
const tplDir = join(root, "templates");
if (existsSync(tplDir)) {
  for (const f of readdirSync(tplDir).filter((n) => n.endsWith(".html"))) {
    const src = read(tplDir, f);
    const rel = [...src.matchAll(/(?:href|src)="((?:\.\.\/|\.\/)[^"#?]+)"/g)].map((m) => m[1]);
    const bad = rel.filter((r) => !existsSync(join(tplDir, r)));
    bad.forEach((r) => fail(`templates/${f}: arquivo não encontrado: ${r}`));
    if (!bad.length) ok(`templates/${f}: ${rel.length} arquivo(s) ligado(s), todos existem`);
  }
}

// 3. IDs e ganchos que o JavaScript usa (não renomeie no HTML)
const ids = ["hero", "hero-pause", "hero-sound", "film-video", "film-play", "player",
  "gallery", "gallery-count", "grid", "newsletter", "form-note", "subnav-select",
  "colecao", "filme", "gloss", "perfumes", "campanha", "produtos", "contato",
  "d-tons", "d-perfumes", "d-design", "mnav", "conteudo"];
let idErr = 0;
ids.forEach((id) => { if (!html.includes(`id="${id}"`)) { idErr++; fail(`id="${id}" sumiu do HTML (o JavaScript precisa dele)`); } });
const hooks = [
  ['class="chapter', 3, "botões de capítulo do vídeo do topo"],
  ["data-drawer=", 3, "botões das janelas do Conheça"],
  ['class="vthumb"', 1, "miniaturas de vídeo com luz dourada"],
  ["data-film=", 1, "botões que abrem filmes"],
  ['class="autoloop"', 1, "faixas de vídeo em loop"],
  ['class="gallery__arrow"', 2, "setas do carrossel"],
  ['class="glitter', 1, "glitter dourado"],
  ["data-mnav-open", 1, "botão do menu (celular)"]
];
hooks.forEach(([needle, min, what]) => {
  const n = html.split(needle).length - 1;
  if (n < min) { idErr++; fail(`${what}: esperado pelo menos ${min}, encontrado ${n} (${needle})`); }
});
if (!idErr) ok(`${ids.length} IDs e ${hooks.length} ganchos do JavaScript presentes`);

// Âncoras internas (#secao) apontam para IDs que existem
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
const badA = anchors.filter((a) => !html.includes(`id="${a}"`));
badA.forEach((a) => fail(`link para #${a}, mas não existe id="${a}"`));
if (!badA.length) ok(`${anchors.length} links internos (#secao) apontam para seções que existem`);

// 4. Sintaxe do JavaScript
try { new Function(js); ok("assets/js/site.js sem erro de sintaxe"); }
catch (e) { fail(`assets/js/site.js com erro de sintaxe: ${e.message}`); }

// 5. Arquivos de deploy
const before = errors;
for (const f of ["public/404.html", "public/favicon.svg", "public/robots.txt", "public/_headers", "netlify.toml"]) {
  if (!existsSync(join(root, f))) fail(`arquivo de deploy faltando: ${f}`);
}
if (!/rel="icon"/.test(html)) fail("index.html sem favicon (<link rel=\"icon\">)");
if (!/property="og:image"/.test(html)) fail("index.html sem imagem de compartilhamento (og:image)");
if (errors === before) ok("arquivos de deploy conferidos (404, favicon, robots, _headers, netlify.toml)");

// Pendências (não bloqueiam)
const placeholders = (html.match(/href="#"/g) || []).length + (js.match(/href="#"/g) || []).length;
if (placeholders) warn(`${placeholders} link(s) provisório(s) href="#" ainda sem endereço real (ver README, Pendências)`);

console.log(errors ? `\n${errors} problema(s). Corrija antes de publicar.` : "\nTudo certo. Pode publicar.");
process.exit(errors ? 1 : 0);
