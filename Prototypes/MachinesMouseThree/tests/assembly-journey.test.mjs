import test from 'node:test';
import assert from 'node:assert/strict';
import { CIRCUIT, STORAGE_KEY, emptyProgress, readProgress, saveProgress, commitModel,
  evaluateCircuit, circuitAt, AssemblyClock } from '../Experiments/AssemblyJourney/Source/model.js';
import { CameraDirector } from '../Experiments/AssemblyJourney/Source/director.js';

test('A preview cannot commit a partial model or an atom lacking its proton', () => {
  const initial = emptyProgress();
  assert.equal(commitModel(initial, 'proton', .999), initial);
  assert.equal(commitModel(initial, 'atom', 1), initial);
  const proton = commitModel(initial, 'proton', 1);
  assert.deepEqual(commitModel(proton, 'atom', 1), { version: 1, protonModel: true, hydrogenModel: true });
  assert.equal(commitModel(proton, 'circuit', 1), proton);
});
test('Journey persistence is isolated, repairs invalid prerequisites and handles unavailable storage', () => {
  const map = new Map([['machines.constituents.progress.v2', 'preserved']]);
  const storage = { getItem: k => map.get(k), setItem: (k, v) => map.set(k, v) };
  saveProgress(storage, { version: 1, protonModel: true, hydrogenModel: true });
  assert.equal(map.get('machines.constituents.progress.v2'), 'preserved');
  assert.equal(readProgress(storage).hydrogenModel, true);
  map.set(STORAGE_KEY, '{"version":1,"protonModel":false,"hydrogenModel":true}');
  assert.equal(readProgress(storage).hydrogenModel, false);
  map.set(STORAGE_KEY, 'bad json'); assert.deepEqual(readProgress(storage), emptyProgress());
  assert.equal(saveProgress(null, emptyProgress()), false);
});
test('A complete series circuit responds to the switch and preserves electrical values', () => {
  const on = circuitAt(1, true), off = circuitAt(1, false);
  assert.equal(on.complete, true); assert.equal(on.lit, true);
  assert.ok(Math.abs(on.current - 1 / 220) < 1e-12);
  assert.ok(Math.abs(on.resistorWatts - 1 / 220) < 1e-12);
  assert.equal(off.current, 0); assert.equal(off.lit, false);
  assert.equal(circuitAt(.999, true).current, 0);
});
test('Missing, reversed or extra links and missing limiting resistor cannot light the LED', () => {
  const parts = CIRCUIT.parts, links = CIRCUIT.links;
  for (let i = 0; i < links.length; i++) {
    assert.equal(evaluateCircuit({ parts, links: links.filter((_, n) => n !== i), closed: true }).lit, false);
  }
  const reversed = links.map((p, i) => i === 1 ? [...p].reverse() : p);
  assert.equal(evaluateCircuit({ parts, links: reversed, closed: true }).lit, false);
  assert.equal(evaluateCircuit({ parts: parts.filter(p => p !== 'resistor'), links, closed: true }).lit, false);
  assert.equal(evaluateCircuit({ parts, links: [...links, ['battery:+', 'battery:-']], closed: true }).lit, false);
  for (const ohms of [0, -1, NaN, Infinity]) assert.equal(evaluateCircuit({ parts, links, closed: true, ohms }).lit, false);
});
test('Assembly interruption preserves its preview, does not jump after a long background, and can resume', () => {
  const clock = new AssemblyClock(); clock.start();
  for (let i = 0; i < 50; i++) clock.tick(.05);
  assert.ok(Math.abs(clock.value - .5) < 1e-12);
  clock.stop(); const before = clock.value; clock.tick(100); assert.equal(clock.value, before);
  clock.scrub(.2); clock.start(); clock.tick(100); assert.ok(clock.value <= .211);
  for (let i = 0; i < 100; i++) clock.tick(.05);
  assert.equal(clock.value, 1); assert.equal(clock.running, false);
});
test('Touch owns the camera until explicit return; reduced motion uses exact cuts', () => {
  const home = { position: [0, 3, 10], target: [0, 0, 0] };
  const next = { position: [5, 2, 3], target: [1, 0, 0] };
  const camera = new CameraDirector(home); camera.travel(next); camera.tick(.05);
  camera.inspect(40, 10); const manual = [...camera.position]; camera.tick(10);
  assert.deepEqual(camera.position, manual); assert.equal(camera.mode, 'inspect');
  camera.returnHome(); for (let i = 0; i < 100; i++) camera.tick(.05);
  assert.equal(camera.mode, 'settled'); assert.deepEqual(camera.position, next.position);
  const reduced = new CameraDirector(home, true); reduced.travel(next);
  assert.deepEqual(reduced.position, next.position); assert.equal(reduced.mode, 'settled');
});
