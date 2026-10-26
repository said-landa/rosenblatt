import test from 'node:test';
import assert from 'node:assert/strict';
import { placementMotion } from '../Experiments/Constituents/Source/assembly-motion.js';

test('placement remains pending through travel and binding, with a gradual electron-cloud reveal', () => {
  const start = placementMotion('electron', 0), middle = placementMotion('electron', 1.8), end = placementMotion('electron', 2.8);
  assert.equal(start.reveal, 0); assert.equal(start.done, false);
  assert.equal(middle.travel, 1); assert(middle.reveal > 0 && middle.reveal < 1); assert.equal(middle.done, false);
  assert.equal(end.reveal, 1); assert.equal(end.bind, 1); assert.equal(end.done, true);
});
test('all animation phases are bounded and reduced motion still reaches the same committed end', () => {
  for (const kind of ['up', 'down', 'field', 'electron']) {
    for (let t = 0; t <= 5; t += .01) {
      const m = placementMotion(kind, t);
      for (const key of ['travel','bind','reveal','pulse']) assert(m[key] >= 0 && m[key] <= 1);
    }
    assert.equal(placementMotion(kind, .18, true).done, true);
    assert.equal(placementMotion(kind, .17, true).done, false);
  }
});
