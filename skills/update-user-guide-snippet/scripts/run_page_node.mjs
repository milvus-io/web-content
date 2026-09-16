#!/usr/bin/env node
// Run the javascript snippets of a user-guide page against a live Milvus server.
//
// Extracts every ```javascript block, hoists the imports from the first block to
// the top (ESM), concatenates the block bodies in order inside one async main(),
// and runs it with node. Reports pass/fail per block and exits non-zero on any
// failure.
//
// Usage: node run_page_node.mjs <page.md>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const page = process.argv[2];
// repo root = skills/update-user-guide-snippet/scripts/run_page_node.mjs -> up 4
const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.join(here, '..', '..', '..', '..');
const runDir = path.join(repo, 'sdk-tmp', 'snippet-run', 'node');
fs.mkdirSync(runDir, { recursive: true });
const runFile = path.join(runDir, 'run_page_node_run.mjs');

const md = fs.readFileSync(page, 'utf8');
const blocks = [...md.matchAll(/```javascript\n([\s\S]*?)```/g)].map(m => m[1]);

// hoist ALL unique imports from every block (ESM requires them at the top)
const imports = new Set();
const bodies = blocks.map(b => {
  const kept = [];
  for (const line of b.split('\n')) {
    if (/^\s*import\s/.test(line)) {
      imports.add(line.trim());
      continue;
    }
    kept.push(line);
  }
  return kept.join('\n');
});

// strip per-block client init so one shared client is created in main()
const stripped = bodies.map(b =>
  b.replace(/const\s+client\s*=\s*new\s+MilvusClient\([\s\S]*?\);/g, '')
);

const prog =
  [...imports].join('\n') +
  '\n\nasync function main() {\n' +
  '  const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });\n' +
  stripped
    .map((b, i) => `  // === block ${i} ===\n  {\n${b
        .split('\n')
        .map(l => '    ' + l)
        .join('\n')}\n  }`)
    .join('\n\n') +
  '\n}\n' +
  'main()\n' +
  "  .then(() => { console.log('ALL BLOCKS OK'); process.exit(0); })\n" +
  "  .catch(e => { console.error('FAILED:', e.message); process.exit(1); });\n";

fs.writeFileSync(runFile, prog);
console.log(`blocks: ${blocks.length}`);
try {
  const { execFileSync } = await import('child_process');
  execFileSync('node', [runFile], { stdio: 'inherit' });
} catch (e) {
  process.exit(e.status || 1);
} finally {
  try {
    fs.rmSync(runFile, { force: true });
  } catch {}
}
