#!/usr/bin/env node
/**
 * fix-frontmatter.js
 *
 * Recorre la carpeta content/ de tu proyecto Quartz y corrige wikilinks
 * sueltos (sin comillas) dentro del frontmatter YAML, que rompen el build.
 *
 * Convierte:
 *   relacionado: [[SQLi_01_Que_Es]], [[SQLi_03_Deteccion_Basica]]
 * en:
 *   relacionado: ["[[SQLi_01_Que_Es]]", "[[SQLi_03_Deteccion_Basica]]"]
 *
 * Y también corrige listas multilínea:
 *   relacionado:
 *     - [[SQLi_01_Que_Es]]
 * en:
 *   relacionado:
 *     - "[[SQLi_01_Que_Es]]"
 *
 * Uso: node fix-frontmatter.js
 * (correr desde la raíz del proyecto, donde está la carpeta content/)
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'content');

function findMarkdownFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function fixFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') return { fixed: content, changed: false };

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { endIdx = i; break; }
  }
  if (endIdx === -1) return { fixed: content, changed: false };

  let changed = false;

  for (let i = 1; i < endIdx; i++) {
    const line = lines[i];

    // Caso 1: key: [[A]], [[B]], [[C]]   (una sola línea)
    const inlineMatch = line.match(/^(\s*[A-Za-z0-9_]+:\s*)(\[\[.*\]\](?:\s*,\s*\[\[.*\]\])*)\s*$/);
    if (inlineMatch) {
      const prefix = inlineMatch[1];
      const items = inlineMatch[2].split(/\s*,\s*(?=\[\[)/);
      const quoted = items.map(it => `"${it.trim()}"`).join(', ');
      lines[i] = `${prefix}[${quoted}]`;
      changed = true;
      continue;
    }

    // Caso 2: - [[Algo]]   (item de lista multilínea, sin comillas)
    const listItemMatch = line.match(/^(\s*-\s*)(\[\[.*\]\])\s*$/);
    if (listItemMatch) {
      lines[i] = `${listItemMatch[1]}"${listItemMatch[2]}"`;
      changed = true;
    }
  }

  return { fixed: lines.join('\n'), changed };
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('No encontré la carpeta content/. Corré este script desde la raíz de tu proyecto Quartz.');
    process.exit(1);
  }

  const files = findMarkdownFiles(CONTENT_DIR);
  let fixedCount = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const { fixed, changed } = fixFrontmatter(original);
    if (changed) {
      fs.writeFileSync(file, fixed, 'utf8');
      console.log(`✔ Corregido: ${path.relative(process.cwd(), file)}`);
      fixedCount++;
    }
  }

  console.log(`\nListo. ${fixedCount} archivo(s) corregido(s) de ${files.length} revisados.`);
}

main();
