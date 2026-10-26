import { build } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'Experiments/AssemblyJourney/Source');
const output = path.join(root, 'iOS/MachinesMouseLab/Web');
await mkdir(output, { recursive: true });
await build({
  entryPoints: [path.join(source, 'main.js')],
  outfile: path.join(output, 'machines.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'safari17',
  minify: true,
  legalComments: 'eof',
});
const html = (await readFile(path.join(source, 'index.html'), 'utf8'))
  .replace(/\s*<script type="importmap">[\s\S]*?<\/script>/, '')
  .replace('<script type="module" src="./main.js"></script>', '<script defer src="./machines.js"></script>')
  .replace('href="./"', 'href="./index.html"')
  ;
const css = await readFile(path.join(source, 'style.css'), 'utf8');
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output, 'style.css'), css);
await copyFile(path.join(root, 'node_modules/three/LICENSE'), path.join(output, 'THREE-LICENSE.txt'));
// Clear derived audio from earlier Lab bundles; retain the authored source palette.
await rm(path.join(output, 'Audio'), { recursive: true, force: true });
console.log('Machines Lab: built isolated offline assembly journey for iOS.');
