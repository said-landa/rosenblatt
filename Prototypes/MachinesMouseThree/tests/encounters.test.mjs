import test from 'node:test';
import assert from 'node:assert/strict';
import { Encounters, ENCOUNTERS } from '../Experiments/Constituents/Source/encounters.js';
import { Construction } from '../Experiments/Constituents/Source/state.js';
import { tourPosition, flightPosition } from '../Experiments/Constituents/Source/camera-tour.js';

test('particle prerequisite inspection resumes without changing existing composition', () => {
  const composition = new Construction(); composition.place('up', true);
  const before = composition.snapshot(); let encounters = new Encounters();
  assert.equal(encounters.advance('electron'), false);
  for (const chapter of ENCOUNTERS) {
    assert.equal(encounters.current.id, chapter.id);
    assert(encounters.advance(chapter.id));
    encounters = new Encounters(encounters.snapshot());
  }
  assert(encounters.done); assert.equal(encounters.advance('binding'), false);
  assert.deepEqual(composition.snapshot(), before);
});
test('malformed inspection progress cannot bypass the particle prerequisites', () => {
  for (const saved of [null, {}, { version: 2, index: 5 }, { version: 1, index: -1 }, { version: 1, index: 6 }, { version: 1, index: 1.5 }]) {
    assert.equal(Encounters.valid(saved), false); assert.equal(new Encounters(saved).current.id, 'up');
  }
});
test('camera voyages reach front and back views while retaining safe subject distance', () => {
  for (const landscape of [false, true]) {
    const poses = Array.from({ length: 261 }, (_, i) => tourPosition(i / 10, 0, landscape));
    assert(poses.some(p => p[2] < -5)); assert(poses.some(p => p[2] > 5));
    for (const pose of poses) {
      assert(pose.every(Number.isFinite)); assert(Math.hypot(...pose) > 5.5); assert(Math.hypot(...pose) < 9);
    }
  }
});
test('camera transitions between opposite viewpoints arc around the subject', () => {
  const from = [0, 1, 8], to = [0, -1, -8];
  assert.deepEqual(flightPosition(from, to, 0), from); assert.deepEqual(flightPosition(from, to, 1), to);
  for (let i = 0; i <= 100; i++) {
    const pose = flightPosition(from, to, i / 100);
    assert(pose.every(Number.isFinite)); assert(Math.hypot(...pose) >= 8);
  }
});
