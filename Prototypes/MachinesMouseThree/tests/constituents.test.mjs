import test from 'node:test';
import assert from 'node:assert/strict';
import { Construction, SEQUENCES } from '../Experiments/Constituents/Source/state.js';
import { PALETTE, SAMPLE_RATE, synthesize, encodeWave } from '../scripts/build-constituent-audio.mjs';

function complete(model) { for (const kind of SEQUENCES[model.path]) assert.equal(model.place(kind, true), true); }
test('unmatched composition and missed drops cannot advance or persist success', () => {
  const m = new Construction(); const before = m.snapshot();
  for (const kind of ['down', 'electron', 'field', null, 'unknown']) assert.equal(m.place(kind, true), false);
  assert.equal(m.place('up', false), false); assert.deepEqual(m.snapshot(), before);
  assert.equal(m.select('hydrogen'), false); assert.equal(m.select('unknown'), false);
});
test('proton has exact valence composition, integer charge accounting and field prerequisite', () => {
  const m = new Construction();
  for (const [kind, thirds] of [['up', 2], ['up', 4], ['down', 3]]) { assert(m.place(kind, true)); assert.equal(m.chargeThirds, thirds); assert.equal(m.done, false); }
  assert.equal(m.select('hydrogen'), false); assert(m.place('field', true)); assert(m.done); assert(m.completed.proton);
  assert.equal(m.place('field', true), false);
});
test('hydrogen reuses completed proton, adds only electron and preserves branches', () => {
  const m = new Construction(); complete(m); assert(m.select('hydrogen'));
  assert.equal(m.chargeThirds, 3); assert.deepEqual(SEQUENCES.hydrogen, ['electron']);
  assert.equal(m.place('up', true), false); assert(m.place('electron', true)); assert.equal(m.chargeThirds, 0);
  const h = m.snapshot(); assert(m.select('neutron')); assert(m.completed.hydrogen); assert(m.completed.proton);
  complete(m); assert.equal(m.chargeThirds, 0); assert(m.select('hydrogen')); assert(m.done);
  assert.deepEqual(m.completed, { proton: true, hydrogen: true, neutron: true });
  assert.equal(new Construction(h).done, true);
});
test('neutron branch uses udd rather than proton uud', () => {
  const m = new Construction(); complete(m); assert(m.select('neutron'));
  assert(m.place('up', true)); assert.equal(m.place('up', true), false);
  assert(m.place('down', true)); assert(m.place('down', true)); assert.equal(m.chargeThirds, 0); assert.equal(m.done, false);
  assert(m.place('field', true)); assert(m.done);
});
test('restoration rejects fabricated prerequisites, premature completion and malformed state', () => {
  const m = new Construction(); complete(m); m.select('hydrogen');
  const corrupt = [null, {}, { ...m.snapshot(), version: 99 },
    { ...m.snapshot(), counts: { proton: -1, hydrogen: 0, neutron: 0 } },
    { ...m.snapshot(), counts: { proton: 1.2, hydrogen: 0, neutron: 0 } },
    { ...m.snapshot(), counts: { proton: 0, hydrogen: 1, neutron: 0 } },
    { ...m.snapshot(), counts: { proton: 3, hydrogen: 0, neutron: 0 } },
    { ...m.snapshot(), path: 'atom' }, { ...m.snapshot(), counts: { proton: 4, hydrogen: 2, neutron: 0 } }];
  for (const saved of corrupt) { assert.equal(Construction.valid(saved), false); assert.deepEqual(new Construction(saved).snapshot(), new Construction().snapshot()); }
});
test('partial progress resumes exactly and cannot skip field review', () => {
  const m = new Construction(); m.place('up', true); m.place('up', true); m.place('down', true);
  const resumed = new Construction(m.snapshot()); assert.equal(resumed.expected, 'field'); assert.equal(resumed.select('hydrogen'), false);
  assert(resumed.place('field', true)); assert(resumed.select('hydrogen')); assert.equal(resumed.expected, 'electron');
});
test('custom cue files are reproducible PCM16 stereo with headroom and click-free boundaries', () => {
  for (const cue of Object.keys(PALETTE)) {
    const sound = synthesize(cue), wave = encodeWave(sound);
    assert.equal(wave.toString('ascii', 0, 4), 'RIFF'); assert.equal(wave.readUInt32LE(4), wave.length - 8);
    assert.equal(wave.readUInt16LE(20), 1); assert.equal(wave.readUInt16LE(22), 2); assert.equal(wave.readUInt32LE(24), SAMPLE_RATE);
    assert.equal(wave.readUInt16LE(34), 16); assert.equal(wave.readUInt32LE(40), wave.length - 44);
    assert.equal(sound.left.length, Math.ceil(PALETTE[cue].duration * SAMPLE_RATE));
    let energy = 0;
    for (let i = 0; i < sound.left.length; i++) { assert(Number.isFinite(sound.left[i])); assert(Math.abs(sound.left[i]) <= .43); assert(Math.abs(sound.right[i]) <= .43); energy += sound.left[i] ** 2; }
    assert(energy / sound.left.length > .00001); assert.equal(wave.readInt16LE(44), 0); assert.equal(wave.readInt16LE(wave.length - 4), 0);
    assert(wave.equals(encodeWave(synthesize(cue))));
  }
});

test('neutron is a parallel quark branch, not a prerequisite of hydrogen-1', () => {
  const m = new Construction(); assert(m.select('neutron')); complete(m);
  assert(m.completed.neutron); assert.equal(m.completed.proton, false); assert.equal(m.select('hydrogen'), false);
  assert(m.select('proton')); complete(m); assert(m.select('hydrogen')); complete(m);
  const h = new Construction(m.snapshot()); assert(h.completed.hydrogen); assert.equal(h.counts.neutron, 4);
});
test('switching branches retains every partial construction and never unlocks a missing proton', () => {
  const m = new Construction(); assert(m.place('up', true)); assert(m.select('neutron')); assert(m.place('up', true)); assert(m.place('down', true));
  const restored = new Construction(m.snapshot()); assert.equal(restored.count, 2); assert(restored.select('proton')); assert.equal(restored.count, 1);
  assert.equal(restored.select('hydrogen'), false); assert(restored.select('neutron')); assert.equal(restored.expected, 'down');
});
test('legacy snapshots migrate without erasing completion or in-progress placements', () => {
  const legacy = { version: 1, path: 'hydrogen', count: 0, completed: { proton: true, hydrogen: false, neutron: true } };
  const m = new Construction(legacy); assert.equal(m.path, 'hydrogen'); assert.deepEqual(m.counts, { proton: 4, hydrogen: 0, neutron: 4 });
  assert.equal(m.snapshot().version, 2); assert.deepEqual(legacy.completed, { proton: true, hydrogen: false, neutron: true });
  const partial = new Construction({version:1,path:'proton',count:2,completed:{proton:false,hydrogen:false,neutron:false}});
  assert.equal(partial.expected, 'down'); assert.equal(partial.count, 2);
});
