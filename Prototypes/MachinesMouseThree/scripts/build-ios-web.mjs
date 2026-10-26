import { build } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'iOS/MachinesMousePreview/Web');
await mkdir(output, { recursive: true });
await build({
  entryPoints: [path.join(root, 'main.js')],
  outfile: path.join(output, 'machines.js'),
  bundle: true, format: 'iife', platform: 'browser', target: 'safari17',
  minify: true, legalComments: 'eof',
});
const html = (await readFile(path.join(root, 'index.html'), 'utf8'))
  .replace(/\s*<script type="importmap">[\s\S]*?<\/script>/, '')
  .replace('<script type="module" src="./main.js"></script>', '<script defer src="./machines.js"></script>')
  .replace('href="./"', 'href="./index.html"');
await writeFile(path.join(output, 'index.html'), html);
await copyFile(path.join(root, 'style.css'), path.join(output, 'style.css'));
await copyFile(path.join(root, 'node_modules/three/LICENSE'), path.join(output, 'THREE-LICENSE.txt'));
console.log('Machines: built offline iPad web resources.');
