// Falha se um projeto publicado do catálogo apontar para página ou imagem que não está no Git.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const arquivos = new Set(execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { encoding: 'utf8', maxBuffer: 1e8 }).split('\n'));
const projetos = JSON.parse(readFileSync('projects.json', 'utf8'));
const faltando = [];
for (const p of projetos) {
  if (p.image && !arquivos.has(p.image.replace(/^\.\//, ''))) faltando.push(p.image);
  if (!p.emBreve && !arquivos.has(`projects/${p.slug}/index.html`)) faltando.push(`projects/${p.slug}/index.html`);
}
if (faltando.length) {
  console.error('Faltando no repositório:', faltando);
  process.exit(1);
}
console.log(`${projetos.length} projetos conferidos`);
