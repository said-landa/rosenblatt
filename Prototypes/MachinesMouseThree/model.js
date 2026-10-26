import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Every dimension is an illustrative unit. This is not a measured commercial mouse.
const material = (color, roughness = .5, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const palette = {
  shell: material('#c9d0bb', .34), button: material('#d8ddcd', .3),
  base: material('#303b34', .55), seam: material('#1c2620', .7), rubber: material('#242c25', .9),
  board: material('#195948', .45), copper: material('#b3a367', .45, .5),
  silver: material('#a3b1ad', .28, .8), chip: material('#252c2b', .62),
  white: material('#e1e5db', .65), red: material('#a43122', .42), ceramic: material('#b19a71', .75),
  lens: new THREE.MeshPhysicalMaterial({ color: '#bcded6', roughness: .12, metalness: 0, transparent: true, opacity: .72, transmission: .3, thickness: .4 }),
};

function mesh(parent, name, geometry, mat, position = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, mat);
  item.name = `Machines.mouse.${name}`;
  item.position.set(...position);
  item.castShadow = true;
  item.receiveShadow = true;
  parent.add(item);
  return item;
}
function box(parent, name, size, position, mat, radius = .04) {
  return mesh(parent, name, new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map(v => v / 3))), mat, position);
}
function cylinder(parent, name, radius, height, position, mat, segments = 40) {
  return mesh(parent, name, new THREE.CylinderGeometry(radius, radius, height, segments), mat, position);
}
function tube(parent, name, points, radius, mat, segments = 64) {
  return mesh(parent, name, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), segments, radius, 10, false), mat);
}
function width(z) {
  const t = Math.min(.999999, Math.abs(z / 5.4));
  return 3.12 * Math.pow(1 - Math.pow(t, 3), 1 / 3) * (1 + .075 * z / 5.4);
}
function surface(u, z) {
  const lengthCurve = Math.pow(Math.max(0, Math.sin(Math.PI * (z + 5.4) / 10.8)), .48);
  const dome = (2.35 + .25 * z / 5.4) * lengthCurve;
  return [u * width(z), .79 + dome * Math.pow(Math.max(0, 1 - u * u), .58), z];
}

// A thick curved patch, generated directly from its surface equation.
function shellPatch(z0, z1, u0, u1, rows = 70, columns = 40) {
  const positions = [], indices = [];
  const stride = columns + 1, count = (rows + 1) * stride;
  for (let layer = 0; layer < 2; layer++) {
    for (let row = 0; row <= rows; row++) {
      const z = z0 + (z1 - z0) * row / rows;
      for (let col = 0; col <= columns; col++) {
        const u = u0 + (u1 - u0) * col / columns;
        const [x, y, pz] = surface(u, z);
        positions.push(x, y - layer * .105, pz);
      }
    }
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * stride + col, b = a + 1, c = a + stride, d = c + 1;
    indices.push(a, c, b, b, c, d, a + count, b + count, c + count, b + count, d + count, c + count);
  }
  const boundary = [];
  for (let col = 0; col <= columns; col++) boundary.push(col);
  for (let row = 1; row <= rows; row++) boundary.push(row * stride + columns);
  for (let col = columns - 1; col >= 0; col--) boundary.push(rows * stride + col);
  for (let row = rows - 1; row > 0; row--) boundary.push(row * stride);
  for (let i = 0; i < boundary.length; i++) {
    const a = boundary[i], b = boundary[(i + 1) % boundary.length];
    indices.push(a, b, a + count, b, b + count, a + count);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
function footprint(scale = 1) {
  const shape = new THREE.Shape();
  const samples = [];
  for (let i = 0; i <= 100; i++) {
    const z = -5.4 + 10.8 * i / 100;
    samples.push([width(z) * scale, -z * scale]);
  }
  for (let i = 100; i >= 0; i--) {
    const z = -5.4 + 10.8 * i / 100;
    samples.push([-width(z) * scale, -z * scale]);
  }
  shape.moveTo(...samples[0]);
  samples.slice(1).forEach(p => shape.lineTo(...p));
  shape.closePath();
  return shape;
}
function extruded(parent, name, shape, depth, y, mat, bevel = .04) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 32 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(parent, name, geometry, mat, [0, y, 0]);
}
function screw(parent, name, x, y, z) {
  cylinder(parent, `${name}.shaft`, .1, .3, [x, y - .12, z], palette.silver);
  cylinder(parent, `${name}.head`, .19, .065, [x, y + .045, z], palette.silver);
  box(parent, `${name}.slot-x`, [.23, .008, .035], [x, y + .081, z], palette.chip, .003);
  box(parent, `${name}.slot-z`, [.035, .008, .23], [x, y + .081, z], palette.chip, .003);
}
function chip(parent, name, center, size, pins = 4) {
  const [x, y, z] = center, [w, h, d] = size;
  box(parent, name, size, center, palette.chip);
  for (let i = 0; i < pins; i++) for (const side of [-1, 1]) {
    box(parent, `${name}.pin.${side}.${i}`, [.2, .08, .10], [x + side * (w / 2 + .07), y - h / 3, z - d * .37 + i * d * .74 / (pins - 1)], palette.silver, .015);
  }
  cylinder(parent, `${name}.index`, .045, .008, [x - w * .3, y + h / 2 + .006, z - d * .3], palette.white, 16);
}

export function createMouse() {
  const group = new THREE.Group();
  group.name = 'Machines.mouse';
  const shell = new THREE.Group();
  shell.name = 'Machines.mouse.removable-shell';
  group.add(shell);
  mesh(shell, 'palm-shell', shellPatch(-.62, 5.4, -1, 1), palette.shell);
  mesh(shell, 'left-button', shellPatch(-5.4, -.69, -1, -.065), palette.button);
  mesh(shell, 'right-button', shellPatch(-5.4, -.69, .065, 1), palette.button);
  // The center bridge leaves a real opening around the wheel.
  mesh(shell, 'front-bridge', shellPatch(-5.4, -3.30, -.063, .063, 30, 12), palette.shell);
  mesh(shell, 'rear-bridge', shellPatch(-1.47, -.65, -.063, .063, 20, 12), palette.shell);

  const baseShape = footprint(.977);
  const aperture = new THREE.Path();
  aperture.absellipse(0, -.35, .56, .67, 0, Math.PI * 2, true);
  baseShape.holes.push(aperture);
  extruded(group, 'base', baseShape, .38, .18, palette.base, .08);
  // Low perimeter rim; it remains visible when the upper shell is hidden.
  const rimShape = footprint(.988);
  const inner = footprint(.947);
  const innerPath = new THREE.Path(inner.getPoints().reverse());
  rimShape.holes.push(innerPath);
  extruded(group, 'base-rim', rimShape, .14, .60, palette.seam, .02);
  for (const z of [-3.9, 3.85]) {
    const foot = mesh(group, `glide.${z}`, new THREE.CapsuleGeometry(.25, 2.65, 6, 20), palette.rubber, [0, .065, z]);
    foot.rotation.z = Math.PI / 2;
    foot.scale.z = .58;
    foot.scale.x = .32;
  }
  // Board, optical opening, mounting standoffs, and fasteners.
  const boardShape = new THREE.Shape();
  boardShape.moveTo(-1.8, 4.2); boardShape.lineTo(1.8, 4.2); boardShape.lineTo(2.24, 3.3);
  boardShape.lineTo(2.25, -2.9); boardShape.quadraticCurveTo(2.1, -4.45, 0, -4.6);
  boardShape.quadraticCurveTo(-2.1, -4.45, -2.25, -2.9); boardShape.lineTo(-2.24, 3.3); boardShape.closePath();
  const sensorHole = new THREE.Path(); sensorHole.absellipse(0, -.35, .48, .58, 0, Math.PI * 2, true); boardShape.holes.push(sensorHole);
  const internals = new THREE.Group(); internals.name = 'Machines.mouse.internals'; group.add(internals);
  extruded(internals, 'pcb', boardShape, .13, .91, palette.board, .02);
  for (const [x, z] of [[-1.8, -2.4], [1.8, -2.4], [-1.6, 2.9], [1.6, 2.9]]) {
    cylinder(internals, `standoff.${x}.${z}`, .26, .36, [x, .72, z], palette.base);
    cylinder(internals, `mount-pad.${x}.${z}`, .28, .015, [x, 1.065, z], palette.copper);
    screw(internals, `pcb-screw.${x}.${z}`, x, 1.11, z);
  }
  // Copper paths are illustrative routing, not an electrical netlist.
  for (const side of [-1, 1]) for (let i = 0; i < 7; i++) {
    const start = side * (.46 + .14 * i), end = side * (1.2 + .12 * i);
    tube(internals, `trace.${side}.${i}`, [[start, 1.062, .55 + i * .15], [end, 1.062, 1.4 + i * .15], [end, 1.062, 2.0 + i * .20], [side * .6, 1.062, 2.65 + i * .20]], .018, palette.copper, 18);
    cylinder(internals, `via.${side}.${i}`, .055, .018, [end, 1.072, 2.0 + i * .20], palette.copper, 14);
  }
  for (const side of [-1, 1]) {
    box(internals, `primary-switch.${side}`, [.72, .61, 1.60], [side * 1.22, 1.36, -3.16], palette.chip);
    box(internals, `primary-switch-cover.${side}`, [.73, .09, 1.58], [side * 1.22, 1.70, -3.16], palette.white);
    box(internals, `primary-switch-plunger.${side}`, [.25, .19, .36], [side * 1.22, 1.83, -3.50], palette.red);
    for (let i = 0; i < 3; i++) box(internals, `switch-pin.${side}.${i}`, [.14, .12, .15], [side * 1.66, 1.13, -3.6 + i * .5], palette.silver, .01);
    tube(internals, `switch-trace.${side}`, [[side * 1.58, 1.063, -2.6], [side * 1.92, 1.063, -1.9], [side * 1.50, 1.063, -.8], [side * .75, 1.063, -.65]], .025, palette.copper, 18);
  }
  // Wheel axis is horizontal across the mouse (X).
  const wheel = new THREE.Group(); wheel.name = 'Machines.mouse.wheel'; wheel.position.set(0, 2.10, -2.35); group.add(wheel);
  const tire = cylinder(wheel, 'wheel-tire', .76, .49, [0, 0, 0], palette.rubber, 64); tire.rotation.z = Math.PI / 2;
  for (const side of [-1, 1]) {
    const hub = cylinder(wheel, `wheel-hub.${side}`, .58, .035, [side * .265, 0, 0], palette.shell); hub.rotation.z = Math.PI / 2;
    const axleHub = cylinder(wheel, `wheel-axle-hub.${side}`, .18, .06, [side * .30, 0, 0], palette.silver); axleHub.rotation.z = Math.PI / 2;
  }
  for (let i = 0; i < 40; i++) {
    const angle = 2 * Math.PI * i / 40;
    const tread = box(wheel, `wheel-tread.${i}`, [.53, .037, .06], [0, Math.cos(angle) * .759, Math.sin(angle) * .759], palette.chip, .015);
    tread.rotation.x = angle;
  }
  const axle = cylinder(internals, 'wheel-axle', .09, 1.72, [0, 2.10, -2.35], palette.silver); axle.rotation.z = Math.PI / 2;
  box(internals, 'wheel-encoder', [.31, .93, .95], [-.68, 1.62, -2.35], palette.silver);
  box(internals, 'wheel-encoder-center', [.33, .35, .35], [-.68, 2.02, -2.35], palette.chip);
  box(internals, 'wheel-support', [.29, .93, .78], [.69, 1.63, -2.35], palette.base);
  box(internals, 'middle-switch', [.52, .25, .5], [.7, 1.22, -1.49], palette.chip);
  cylinder(internals, 'middle-switch-plunger', .16, .10, [.7, 1.395, -1.49], palette.ceramic);
  chip(internals, 'optical-sensor', [0, 1.38, .35], [1.03, .42, 1.22], 4);
  box(internals, 'optical-housing', [1.38, .23, 1.52], [0, .69, .35], palette.chip, .10);
  const lens = mesh(internals, 'optical-lens', new THREE.SphereGeometry(.43, 40, 24), palette.lens, [0, .32, .35]); lens.scale.set(1, .40, 1.13);
  box(internals, 'light-guide', [.39, .3, .83], [0, .59, 1.30], palette.lens, .10);
  cylinder(internals, 'led-seat', .23, .27, [0, 1.20, 1.63], palette.chip);
  const led = mesh(internals, 'illumination-led', new THREE.SphereGeometry(.22, 24, 16), palette.red, [0, 1.48, 1.63]); led.scale.y = 1.35;
  chip(internals, 'controller', [0, 1.27, 3.04], [1.03, .27, 1.08], 6);
  for (const [i, x, z] of [[0, -1.12, 1.38], [1, 1.25, 1.45], [2, .92, 3.40]]) {
    cylinder(internals, `capacitor.${i}`, .23, .57, [x, 1.36, z], palette.chip);
    cylinder(internals, `capacitor-cap.${i}`, .22, .025, [x, 1.66, z], palette.silver);
    box(internals, `capacitor-score.${i}`, [.25, .008, .024], [x, 1.678, z], palette.chip, .002);
  }
  box(internals, 'crystal', [.73, .24, .31], [-1.03, 1.20, 2.47], palette.silver, .12);
  for (let i = 0; i < 12; i++) {
    const x = (i % 2 ? -1 : 1) * (1.40 + .24 * (i % 3)); const z = -.8 + Math.floor(i / 2) * .49;
    box(internals, `smd.${i}`, [.25, .095, .12], [x, 1.12, z], i % 3 ? palette.ceramic : palette.chip, .01);
    for (const side of [-1, 1]) box(internals, `smd-terminal.${i}.${side}`, [.055, .1, .14], [x + side * .12, 1.12, z], palette.silver, .005);
  }
  box(internals, 'cable-header', [1.15, .40, .52], [0, 1.27, -4.02], palette.white);
  ['#ae4938', '#e1e4d8', '#377052', '#252a29'].forEach((color, i) => {
    const x = -.33 + i * .22;
    tube(internals, `cable-conductor.${i}`, [[x, 1.31, -4.0], [x, 1.20, -4.45], [x * .35, .89, -4.93], [0, .80, -5.35]], .05, material(color), 24);
  });
  const strainRelief = cylinder(group, 'strain-relief', .21, .9, [0, .80, -5.48], palette.rubber); strainRelief.rotation.x = Math.PI / 2;
  for (let i = 0; i < 6; i++) {
    const rib = mesh(group, `strain-relief-rib.${i}`, new THREE.TorusGeometry(.21, .035, 8, 32), palette.rubber, [0, .8, -5.13 - i * .13]);
    rib.castShadow = true;
  }
  tube(group, 'usb-cable', [[0, .8, -5.8], [-.1, .50, -6.8], [-1.2, .27, -7.5], [-3.2, .26, -7.5], [-4.65, .25, -8.3], [-4.8, .26, -9.4], [-3.8, .28, -10.4], [-2.35, .30, -10.55]], .135, palette.rubber, 128);
  const plug = new THREE.Group(); plug.name = 'Machines.mouse.usb-plug'; group.add(plug); plug.position.set(-2.35, .3, -10.55); plug.rotation.y = -Math.PI / 2;
  box(plug, 'usb-grip', [.78, .45, 1.18], [0, 0, -.50], palette.rubber, .13);
  box(plug, 'usb-metal', [.68, .29, .81], [0, 0, -1.42], palette.silver, .035);
  box(plug, 'usb-insert', [.54, .11, .04], [0, -.05, -1.85], palette.chip, .01);
  for (const x of [-.16, .16]) box(plug, `usb-latch.${x}`, [.13, .008, .18], [x, .15, -1.47], palette.chip, .01);

  return { group, shell, internals, wheel };
}
