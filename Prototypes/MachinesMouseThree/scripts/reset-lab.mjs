import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const labSource = path.join(root, 'Experiments/MouseLab/Source');
const sourceFiles = [
  'index.html',
  'style.css',
  'main.js',
  'model.js',
  'assembly.js',
  'assembly-view.js',
  'deep-dive.js',
  'deep-dive-view.js',
];

await mkdir(labSource, { recursive: true });
const hashes = {};
for (const file of sourceFiles) {
  const source = path.join(root, file);
  const destination = path.join(labSource, file);
  await copyFile(source, destination);
  hashes[file] = createHash('sha256').update(await readFile(source)).digest('hex');
}
await writeFile(
  path.join(labSource, '.baseline.json'),
  `${JSON.stringify({ source: 'MachinesMouseThree working tree', files: hashes }, null, 2)}\n`,
);
console.log(`Machines Lab: restored ${sourceFiles.length} files from the stable app.`);
