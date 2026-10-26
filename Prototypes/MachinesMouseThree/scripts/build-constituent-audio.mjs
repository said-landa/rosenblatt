import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Original procedural feedback palette. These are designed sounds, not claims
// about acoustic waves in a vacuum or measured particle interactions.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'Experiments/Constituents/Audio');
export const SAMPLE_RATE = 48000;
export const PALETTE = Object.freeze({
  touch: { duration: .42, notes: [660, 990], intent: 'Soft contact; tactile, close, no sharp transient.' },
  place: { duration: .86, notes: [392, 588, 784], intent: 'Warm glass settling into a shared structure.' },
  bind: { duration: 2.2, notes: [196, 294, 392, 588], intent: 'A low foundation opens into a gentle resonant chord.' },
  reuse: { duration: 1.15, notes: [392, 523.251, 784], intent: 'A light rising interval connects a new branch.' },
  complete: { duration: 2.4, notes: [261.626, 392, 523.251, 659.255], intent: 'Spacious resolution, with a restrained shimmering tail.' },
  return: { duration: .45, notes: [330, 294], intent: 'A soft downward response; neither alarm nor punishment.' },
});
export function synthesize(cue) {
  const spec = PALETTE[cue]; if (!spec) throw new Error('Unknown cue');
  const size = Math.ceil(spec.duration * SAMPLE_RATE);
  const dry = new Float64Array(size), left = new Float64Array(size), right = new Float64Array(size);
  let seed = 181 + cue.length;
  for (let i = 0; i < size; i++) {
    const t = i / SAMPLE_RATE;
    for (let k = 0; k < spec.notes.length; k++) {
      const onset = cue === 'reuse' ? k * .085 : cue === 'bind' || cue === 'complete' ? k * .045 : k * .012;
      const age = t - onset; if (age < 0) continue;
      const attack = 1 - Math.exp(-age * 95), decay = Math.exp(-age * (cue === 'touch' || cue === 'return' ? 13 : 3.3));
      const f = spec.notes[k];
      const fm = Math.sin(2 * Math.PI * f * 2.005 * age) * Math.exp(-age * 18) * .35;
      dry[i] += (Math.sin(2 * Math.PI * f * age + fm) + .14 * Math.sin(2 * Math.PI * f * 3.002 * age)) * attack * decay / spec.notes.length;
    }
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const noise = (seed / 4294967296 * 2 - 1) * .008 * (1 - Math.exp(-t * 70)) * Math.exp(-t * 35);
    dry[i] += noise;
  }
  // Small deterministic stereo room; no platform-generated reverb dependency.
  for (let i = 0; i < size; i++) {
    left[i] = right[i] = dry[i];
    for (let k = 1; k <= 5; k++) {
      const l = i - Math.round((.053 * k + .007) * SAMPLE_RATE), r = i - Math.round((.061 * k + .013) * SAMPLE_RATE);
      if (l >= 0) left[i] += dry[l] * .13 / k;
      if (r >= 0) right[i] += dry[r] * .13 / k;
    }
    const end = Math.min(1, (size - 1 - i) / (SAMPLE_RATE * .07));
    left[i] *= end; right[i] *= end;
  }
  let peak = 0;
  for (let i = 0; i < size; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  const gain = (cue === 'return' ? .18 : cue === 'touch' ? .24 : .42) / Math.max(peak, .001);
  for (let i = 0; i < size; i++) { left[i] *= gain; right[i] *= gain; }
  return { left, right };
}
export function encodeWave({ left, right }) {
  const count = left.length, data = Buffer.alloc(44 + count * 4);
  data.write('RIFF', 0); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8);
  data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(2, 22);
  data.writeUInt32LE(SAMPLE_RATE, 24); data.writeUInt32LE(SAMPLE_RATE * 4, 28);
  data.writeUInt16LE(4, 32); data.writeUInt16LE(16, 34); data.write('data', 36); data.writeUInt32LE(count * 4, 40);
  for (let i = 0; i < count; i++) { data.writeInt16LE(Math.round(left[i] * 32767), 44 + i * 4); data.writeInt16LE(Math.round(right[i] * 32767), 46 + i * 4); }
  return data;
}
export async function buildAudio() {
  await mkdir(output, { recursive: true });
  const sounds = [];
  for (const cue of Object.keys(PALETTE)) { const sound = synthesize(cue); sounds.push(sound); await writeFile(path.join(output, `${cue}.wav`), encodeWave(sound)); }
  const gap = Math.round(.55 * SAMPLE_RATE), total = sounds.reduce((n, s) => n + s.left.length + gap, 0);
  const study = { left: new Float64Array(total), right: new Float64Array(total) }; let at = 0;
  for (const sound of sounds) { study.left.set(sound.left, at); study.right.set(sound.right, at); at += sound.left.length + gap; }
  await writeFile(path.join(output, 'sound-study.wav'), encodeWave(study));
  await writeFile(path.join(output, 'palette.json'), JSON.stringify({ format: 'PCM16 stereo WAV', sampleRate: SAMPLE_RATE, order: Object.keys(PALETTE), cues: PALETTE }, null, 2) + '\n');
  console.log('Machines: generated six original feedback cues and an audition sequence.');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await buildAudio();
