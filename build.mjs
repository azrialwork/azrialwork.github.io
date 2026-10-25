// build.mjs — build statis tanpa dependensi (Node.js bawaan saja)
// Menggabungkan partial & section menjadi halaman HTML utuh di dist/,
// lalu menyalin css/, js/, dan assets/ apa adanya.
//
// Cara menambah halaman baru:
//   1. Buat file src/<nama>.template.html (salin dari index.template.html)
//   2. Jalankan `node build.mjs` — hasilnya otomatis menjadi dist/<nama>.html
// Cara menambah section baru:
//   1. Buat file src/sections/<nama>.html
//   2. Sisipkan <!-- @include "sections/<nama>.html" --> di template

import { readFile, writeFile, mkdir, rm, cp, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");

const INCLUDE_RE = /<!--\s*@include\s+"([^"]+)"\s*-->/g;

async function render(file, stack = []) {
  if (stack.includes(file)) throw new Error(`Include melingkar: ${[...stack, file].join(" -> ")}`);
  const raw = await readFile(file, "utf8");
  let out = raw;
  for (const match of [...raw.matchAll(INCLUDE_RE)]) {
    const included = await render(path.join(srcDir, match[1]), [...stack, file]);
    out = out.replace(match[0], included.trimEnd());
  }
  return out;
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const templates = (await readdir(srcDir)).filter((f) => f.endsWith(".template.html"));
if (templates.length === 0) throw new Error("Tidak ada file *.template.html di src/");

for (const template of templates) {
  const name = template.replace(".template.html", ".html");
  const html = await render(path.join(srcDir, template));
  await writeFile(path.join(distDir, name), html);
  console.log(`built ${name}`);
}

for (const dir of ["css", "js", "assets"]) {
  const from = path.join(srcDir, dir);
  if (existsSync(from)) {
    await cp(from, path.join(distDir, dir), { recursive: true });
    console.log(`copied ${dir}/`);
  }
}

await writeFile(path.join(distDir, ".nojekyll"), "");
console.log("Build selesai -> dist/");
