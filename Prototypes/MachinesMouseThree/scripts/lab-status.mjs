import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const labSource = path.join(root, 'Experiments/MouseLab/Source');
const baseline = JSON.parse(await readFile(path.join(labSource, '.baseline.json'), 'utf8'));
const changed = [];
for (const [file, expected] of Object.entries(baseline.files)) {
  const actual = createHash('sha256').update(await readFile(path.join(labSource, file))).digest('hex');
  if (actual !== expected) changed.push(file);
}
if (changed.length) {
  console.log(`Machines Lab: ${changed.length} experimental file(s): ${changed.join(', ')}`);
} else {
  console.log('Machines Lab: matches its last stable reset.');
}
