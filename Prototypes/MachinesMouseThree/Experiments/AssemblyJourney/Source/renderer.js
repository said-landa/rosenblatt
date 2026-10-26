// Replaceable Three.js adapter. No durable progress or circuit validity lives here.
import * as THREE from 'three';
import { ease, clamp } from './model.js';
const C = { mint: 0xbce8d1, up: 0xe6b78e, down: 0xabb5e8, electron: 0x9be5e7,
  copper: 0xb87d4b, ink: 0x080d13, silver: 0xb1bdc4 };
const V = a => new THREE.Vector3(...a);
const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: .42, metalness: .15, ...extra });
const metal = mat(C.silver, { metalness: .9, roughness: .26 });
const copper = mat(C.copper, { metalness: .8, roughness: .28 });
const dark = mat(0x14242d, { metalness: .4 });
function mesh(geometry, material, parent, position = [0, 0, 0]) {
  const m = new THREE.Mesh(geometry, material); m.position.set(...position); parent.add(m); return m;
}
function box(parent, dims, material, position = [0, 0, 0], bevel = .08) {
  // Shared chamfered profile; no heavyweight asset or physics dependency.
  const [w, h, d] = dims, r = Math.min(bevel, w / 3, d / 3), s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -d / 2); s.lineTo(w / 2 - r, -d / 2);
  s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r); s.lineTo(w / 2, d / 2 - r);
  s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); s.lineTo(-w / 2 + r, d / 2);
  s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); s.lineTo(-w / 2, -d / 2 + r);
  s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  const geo = new THREE.ExtrudeGeometry(s, { depth: h - r / 2, bevelEnabled: true,
    bevelSegments: 2, steps: 1, bevelSize: r / 4, bevelThickness: r / 4, curveSegments: 5 });
  geo.rotateX(-Math.PI / 2); geo.translate(0, -h / 2 + r / 4, 0);
  return mesh(geo, material, parent, position);
}
function tube(parent, points, radius = .035, material = copper) {
  const curve = new THREE.CatmullRomCurve3(points.map(V));
  return mesh(new THREE.TubeGeometry(curve, Math.max(12, points.length * 8), radius, 6, false), material, parent);
}
function cylinder(parent, radius, length, material, position) {
  return mesh(new THREE.CylinderGeometry(radius, radius, length, 32), material, parent, position);
}
function textSprite(parent, text, color = '#e9eee5', scale = .55) {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d'); ctx.font = '500 54px -apple-system, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, 256, 64);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthWrite: false }));
  sprite.scale.set(scale * 4, scale, 1); parent.add(sprite); return sprite;
}
function glow(parent, color, scale) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d'), gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(.15, '#ffffff90'); gradient.addColorStop(1, '#ffffff00');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), color,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: .24 }));
  sprite.scale.setScalar(scale); parent.add(sprite); return sprite;
}
function glyph(parent, symbol, color, radius = .55) {
  const g = new THREE.Group(); parent.add(g);
  mesh(new THREE.IcosahedronGeometry(radius, 3), mat(color, { metalness: .65, roughness: .23,
    emissive: color, emissiveIntensity: .08 }), g);
  const ring = mesh(new THREE.TorusGeometry(radius * 1.21, .012, 5, 64), mat(color, { emissive: color, emissiveIntensity: .6 }), g);
  ring.rotation.x = .7; ring.rotation.y = .3;
  const label = textSprite(g, symbol, '#ffffff', radius * .8); label.position.z = radius * 1.04;
  glow(g, color, radius * 4);
  return g;
}
function seedRandom(seed = 8821) { return () => { seed = (1664525 * seed + 1013904223) >>> 0; return (seed + 1) / 4294967297; }; }
function atomCloud(parent) {
  const random = seedRandom(), points = new Float32Array(4200 * 3);
  // 1s |psi|² radial samples: r ~ Gamma(3, a0/2), isotropic directions.
  for (let i = 0; i < points.length; i += 3) {
    const r = -.7 * Math.log(random() * random() * random()), cos = random() * 2 - 1;
    const phi = random() * Math.PI * 2, sin = Math.sqrt(1 - cos * cos);
    points.set([r * sin * Math.cos(phi), r * cos, r * sin * Math.sin(phi)], i);
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
  const material = new THREE.PointsMaterial({ color: C.electron, size: .025, transparent: true,
    opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const cloud = new THREE.Points(geo, material); parent.add(cloud); return cloud;
}
function destination(parent, type) {
  const g = new THREE.Group(); parent.add(g);
  if (type === 'phone') {
    box(g, [1.45, .18, 2.8], metal);
    box(g, [1.29, .05, 2.58], mat(0x163e4b, { emissive: 0x1c5961, emissiveIntensity: .5 }), [0, .12, 0]);
    for (let i = 0; i < 3; i++) box(g, [.86 - i * .15, .008, .03], mat(C.mint), [-.1, .151, -.7 + i * .18]);
    cylinder(g, .055, .02, dark, [0, .16, -1.12]);
  } else if (type === 'satellite') {
    box(g, [.95, .8, 1.05], mat(0xbea47e, { metalness: .8 }));
    for (const side of [-1, 1]) {
      box(g, [1.3, .04, 1.6], mat(0x213c6a, { metalness: .7 }), [side * 1.25, 0, 0]);
      for (let i = 0; i < 4; i++) box(g, [1.24, .01, .018], metal, [side * 1.25, .03, -.6 + i * .4]);
      tube(g, [[side * .45, 0, 0], [side * 1.25, 0, 0]], .025, metal);
    }
    const dish = mesh(new THREE.SphereGeometry(.55, 24, 16, 0, Math.PI * 2, 0, 1.1), metal, g, [0, .75, 0]); dish.rotation.z = .25;
  } else if (type === 'cell') {
    mesh(new THREE.SphereGeometry(1.2, 40, 24), mat(0x619b8c, { transparent: true, opacity: .24, depthWrite: false, side: THREE.DoubleSide }), g);
    mesh(new THREE.SphereGeometry(.42, 28, 16), mat(0xc1a3b2), g, [-.18, .1, 0]);
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3, m = mesh(new THREE.CapsuleGeometry(.12, .26, 4, 10), mat(0xc0b58c), g, [.76 * Math.cos(a), .15 * Math.sin(a * 2), .7 * Math.sin(a)]); m.rotation.z = a;
    }
  } else {
    box(g, [1.7, .15, 1.7], dark); box(g, [1.05, .16, 1.05], mat(0x34434d), [0, .13, 0]);
    for (let i = 0; i < 7; i++) for (const side of [-1, 1]) {
      box(g, [.1, .035, .28], metal, [-.65 + i * .21, .07, side * .94]);
      box(g, [.28, .035, .1], metal, [side * .94, .07, -.65 + i * .21]);
    }
    const label = textSprite(g, 'COMPUTE', '#bce8d1', .16); label.position.set(0, .29, 0); label.material.rotation = -.35;
  }
  return g;
}
export class JourneyRenderer {
  constructor(host, labelHost) {
    this.host = host; this.labelHost = labelHost; this.beat = 'welcome'; this.labels = []; this.targets = [];
    this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(C.ink);
    this.scene.fog = new THREE.FogExp2(C.ink, .018);
    this.camera = new THREE.PerspectiveCamera(42, 1, .05, 160);
    this.webgl = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.webgl.setPixelRatio(Math.min(devicePixelRatio, 2)); this.webgl.outputColorSpace = THREE.SRGBColorSpace;
    this.webgl.toneMapping = THREE.ACESFilmicToneMapping; this.webgl.toneMappingExposure = 1.35;
    this.webgl.domElement.setAttribute('aria-hidden', 'true'); host.append(this.webgl.domElement);
    this.scene.add(new THREE.HemisphereLight(0xb8d8ee, 0x1c1b23, 2.3));
    const key = new THREE.DirectionalLight(0xffefd9, 1.4); key.position.set(-2, 8, 4); this.scene.add(key);
    for (const [color, intensity, position] of [[0xe6c6a4, 40, [-5, 6, 4]], [0x90d8d1, 35, [5, 4, -3]], [0xdde5ff, 25, [1, 7, 7]]]) {
      const light = new THREE.PointLight(color, intensity, 55, 2); light.position.set(...position); this.scene.add(light);
    }
    this.floor = mesh(new THREE.CircleGeometry(35, 96), mat(0x0a131b, { roughness: .8, metalness: .25 }), this.scene, [0, -2.2, 0]); this.floor.rotation.x = -Math.PI / 2;
    const grid = new THREE.GridHelper(50, 50, 0x20313a, 0x14232c); grid.position.y = -2.19; grid.material.transparent = true; grid.material.opacity = .28; this.scene.add(grid);
    this.destinations = new THREE.Group(); this.scene.add(this.destinations);
    const positions = [[-2.65, .1, 1.2], [2.4, .6, .5], [-2.5, .8, -2.9], [2, .1, -3.2]];
    this.destinationModels = ['phone', 'cell', 'satellite', 'chip'].map((type, i) => {
      const g = destination(this.destinations, type); g.position.set(...positions[i]); g.rotation.y = i * .4 - .35; return g;
    });
    this.particles = new THREE.Group(); this.scene.add(this.particles);
    this.quarks = ['u', 'u', 'd'].map((symbol, i) => glyph(this.particles, symbol, i === 2 ? C.down : C.up));
    this.binding = new THREE.Group(); this.particles.add(this.binding);
    this.bound = [[-.9, .3, 0], [.75, .5, -.3], [.1, -.7, .3]];
    for (let i = 0; i < 3; i++) {
      const a = this.bound[i], b = this.bound[(i + 1) % 3];
      const mid = a.map((x, n) => (x + b[n]) / 2 + (n === 2 ? .6 : 0));
      tube(this.binding, [a, mid, b], .045, mat(C.mint, { emissive: C.mint, emissiveIntensity: .5 }));
    }
    this.protonShell = mesh(new THREE.IcosahedronGeometry(1.65, 3), new THREE.MeshBasicMaterial({ color: C.mint,
      wireframe: true, transparent: true, opacity: .025, depthWrite: false }), this.particles);
    this.atom = new THREE.Group(); this.scene.add(this.atom);
    this.nucleus = glyph(this.atom, 'p⁺', C.up, .22);
    this.electron = glyph(this.atom, 'e⁻', C.electron, .33); this.electron.position.set(2.6, .4, 0);
    this.cloud = atomCloud(this.atom);
    this.buildCircuit(); this.resize();
  }
  buildCircuit() {
    this.circuit = new THREE.Group(); this.scene.add(this.circuit);
    box(this.circuit, [8.7, .16, 6.2], mat(0x163e3c, { metalness: .35 }), [0, -.3, 0], .25);
    box(this.circuit, [8.73, .035, 6.23], mat(0x8e9d83), [0, -.4, 0], .25);
    for (const x of [-3.9, 3.9]) for (const z of [-2.6, 2.6]) {
      cylinder(this.circuit, .12, .025, metal, [x, -.201, z]); cylinder(this.circuit, .065, .028, dark, [x, -.18, z]);
    }
    this.components = {};
    const anchors = { battery: [-2.65, 0, .1], resistor: [-.9, 0, -1.8], led: [2, 0, -1.25], switch: [2, 0, 1.7] };
    for (const [key, anchor] of Object.entries(anchors)) {
      const g = new THREE.Group(); this.circuit.add(g); this.components[key] = { group: g, anchor };
      const hit = mesh(new THREE.BoxGeometry(1.4, 1.8, 1.4), new THREE.MeshBasicMaterial({ visible: false }), g, [0, .5, 0]);
      hit.userData.focus = key; this.targets.push(hit);
    }
    const battery = this.components.battery.group;
    box(battery, [1.3, .45, 3.7], dark, [0, .1, 0], .15);
    for (const x of [-.32, .32]) {
      const cell = cylinder(battery, .27, 3.25, mat(0x57616a, { metalness: .8 }), [x, .4, 0]); cell.rotation.x = Math.PI / 2;
      const cap = cylinder(battery, .27, .7, mat(0xb49562, { metalness: .65 }), [x, .4, x < 0 ? -1.2 : 1.2]); cap.rotation.x = Math.PI / 2;
    }
    // Alternating cells and a holder strap form the 3 V series source.
    tube(battery, [[-.32, .4, 1.68], [-.32, .1, 1.8], [.32, .1, 1.8], [.32, .4, 1.68]], .045, metal);
    for (const z of [-1.9, 1.9]) {
      cylinder(battery, .12, .12, copper, [0, -.08, z]);
      tube(battery, [[0, -.08, z], [0, .15, z], [z < 0 ? -.32 : .32, .4, -1.68]], .035, metal);
    }
    textSprite(battery, '2 × 1.5 V', '#e4dfce', .16).position.set(0, .83, .1);
    const resistor = this.components.resistor.group;
    const body = cylinder(resistor, .19, 1.3, mat(0xcec6a6), [0, .28, 0]); body.rotation.z = Math.PI / 2;
    for (const [x, color] of [[-.43, 0xc12b2a], [-.25, 0xc12b2a], [.12, 0x61402b], [.43, 0xc6a858]]) {
      const band = cylinder(resistor, .194, .07, mat(color), [x, .28, 0]); band.rotation.z = Math.PI / 2;
    }
    tube(resistor, [[-.65, .28, 0], [-.92, .28, 0], [-1.02, -.08, 0]], .027, metal);
    tube(resistor, [[.65, .28, 0], [.92, .28, 0], [1.02, -.08, 0]], .027, metal);
    this.ledMaterial = mat(0x9c2524, { emissive: 0xff0801, emissiveIntensity: 0, roughness: .2 });
    const led = this.components.led.group;
    cylinder(led, .38, .5, this.ledMaterial, [0, .58, 0]);
    mesh(new THREE.SphereGeometry(.38, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), this.ledMaterial, led, [0, .83, 0]);
    cylinder(led, .43, .09, this.ledMaterial, [0, .31, 0]);
    for (const x of [-.23, .23]) tube(led, [[x, .32, 0], [x, -.12, 0]], .028, metal);
    this.ledGlow = glow(led, 0xff4f24, 3.4); this.ledGlow.position.y = .8;
    this.ledLight = new THREE.PointLight(0xff4020, 0, 5, 2); this.ledLight.position.set(0, 1.1, 0); led.add(this.ledLight);
    const sw = this.components.switch.group;
    box(sw, [1.4, .22, .82], dark, [0, .1, 0]);
    for (const x of [-.48, .48]) { cylinder(sw, .07, .4, metal, [x, 0, 0]); cylinder(sw, .12, .28, copper, [x, .32, 0]); }
    this.switchBlade = new THREE.Group(); sw.add(this.switchBlade); this.switchBlade.position.set(-.48, .48, 0);
    box(this.switchBlade, [1.05, .07, .17], metal, [.51, 0, 0]);
    box(this.switchBlade, [.38, .14, .4], mat(0x9c3f32), [.8, .07, 0]);
    this.traces = new THREE.Group(); this.circuit.add(this.traces);
    // Physical anchors match the semantic series netlist in model.js.
    const paths = [
      [[-2.65, -.16, -1.8], [-2.65, -.16, -2.35], [-1.92, -.16, -2.35], [-1.92, -.16, -1.8]],
      [[.12, -.16, -1.8], [.8, -.16, -1.8], [1.2, -.16, -1.25], [1.77, -.16, -1.25]],
      [[2.23, -.16, -1.25], [3.1, -.16, -1.25], [3.1, -.16, 1.7], [2.48, -.16, 1.7]],
      [[1.52, -.16, 1.7], [1.52, -.16, 2.35], [-2.65, -.16, 2.35], [-2.65, -.16, 2]]
    ];
    paths.forEach(points => {
      tube(this.traces, points, .052, copper);
      for (const point of [points[0], points.at(-1)]) cylinder(this.traces, .13, .018, copper, point);
    });
    for (const [text, pos] of [['+', [-3.22, -.12, -2.1]], ['−', [-3.22, -.12, 2.1]],
      ['220 Ω', [-.9, -.12, -2.35]], ['A', [1.65, -.12, -.72]], ['K', [2.4, -.12, -.72]], ['ROSENBLATT / 01', [-.3, -.12, 2.7]]]) {
      const label = textSprite(this.circuit, text, '#b3c6b4', text.length > 5 ? .13 : .2);
      label.position.set(...pos);
    }
  }
  shot(beat) {
    const portrait = this.host.clientWidth / this.host.clientHeight < .8;
    const shots = {
      welcome: { position: portrait ? [12, 14, 22] : [10, 9, 15], target: [0, 0, -.5] },
      quarks: { position: portrait ? [1, 4, 14] : [1, 3, 9], target: [0, 0, 0] },
      proton: { position: portrait ? [-5, 3.5, 10] : [-3.5, 2.2, 7], target: [0, 0, 0] },
      electron: { position: portrait ? [6, 3, 12] : [4.5, 2, 8], target: [.8, .1, 0] },
      atom: { position: portrait ? [-7, 5, 15] : [-5, 3, 10], target: [0, 0, 0] },
      routes: { position: portrait ? [10, 13, 23] : [12, 12, 20], target: [0, 1, 0] },
      circuit: { position: portrait ? [14, 19, 22] : [9, 10, 12], target: [0, .3, 0] },
      operate: { position: portrait ? [13, 18, 20] : [8, 8, 9], target: [0, .25, 0] }
    }; return shots[beat];
  }
  focusShot(key) {
    const a = this.components[key].anchor;
    return { position: [a[0] + 3, 1.4, a[2] + 4.1], target: [a[0], .3, a[2]], arc: .25 };
  }
  setBeat(beat) {
    this.beat = beat;
    this.destinations.visible = ['welcome', 'routes'].includes(beat);
    this.particles.visible = ['quarks', 'proton'].includes(beat);
    this.atom.visible = ['electron', 'atom'].includes(beat);
    this.circuit.visible = ['circuit', 'operate'].includes(beat);
    this.labelHost.replaceChildren(); this.labels = [];
    const label = (object, text, symbol, color = 'mint', offset = [0, -1, 0]) => {
      const el = document.createElement('div'); el.className = `scene-label ${color}`;
      const b = document.createElement('b'); b.textContent = symbol;
      const span = document.createElement('span'); span.textContent = text; el.append(b, span); this.labelHost.append(el);
      this.labels.push({ object, el, offset: V(offset) });
    };
    if (beat === 'welcome') ['Phone', 'Cell', 'Satellite', 'Computing'].forEach((text, i) => label(this.destinationModels[i], text, '', 'mint', [0, -.8, .5]));
    if (beat === 'quarks') this.quarks.forEach((g, i) => label(g, i === 2 ? 'down quark' : 'up quark', '', i === 2 ? 'cool' : 'warm', [0, -.9, 0]));
    if (beat === 'proton') label(this.particles, 'u + u + d · proton model', '', 'mint', [0, -1.95, 0]);
    if (beat === 'electron') { label(this.electron, 'electron · lepton', '', 'mint', [0, -.8, 0]); label(this.nucleus, 'proton', '', 'warm', [0, -.7, 0]); }
    if (beat === 'atom') label(this.nucleus, 'nucleus · 1 proton', '', 'warm', [0, -1.05, 0]);
  }
  update({ preview, closed, current, dt, reduced }, director) {
    const t = clamp(preview);
    if (this.particles.visible) {
      this.binding.visible = this.beat === 'proton' && t > .5;
      this.binding.scale.setScalar(ease((t - .5) * 2));
      this.protonShell.visible = this.beat === 'proton' && t > .85;
      this.quarks.forEach((g, i) => {
        const start = [[-2.3, .6, 0], [0, -.65, .7], [2.3, .6, -.3]][i];
        const p = this.beat === 'quarks' ? 0 : ease(t);
        g.position.copy(V(start).lerp(V(this.bound[i]), p));
        g.position.z += Math.sin(Math.PI * p) * (i === 1 ? -1 : 1);
      });
    }
    if (this.atom.visible) {
      const a = this.beat === 'atom' ? ease(t) : 0;
      this.cloud.material.opacity = .48 * a; this.cloud.scale.setScalar(.65 + .35 * a);
      this.electron.visible = a < .95; this.electron.scale.setScalar(Math.max(.01, 1 - a));
      this.electron.position.set(2.6 - a * 1.3, .4, -a * 1.5);
    }
    if (this.circuit.visible) {
      Object.values(this.components).forEach(({ group, anchor }, i) => {
        const p = ease((t * 1.35 - i * .115) / .85);
        group.position.set(anchor[0], anchor[1] + (1 - p) * (3.5 + i * .6), anchor[2]);
        group.rotation.y = (1 - p) * (i % 2 ? -.22 : .22);
      });
      this.traces.visible = t > .84; this.traces.scale.setScalar(.96 + .04 * ease((t - .84) / .16));
      const targetAngle = closed ? 0 : .5;
      this.switchBlade.rotation.z += (targetAngle - this.switchBlade.rotation.z) * (reduced ? 1 : Math.min(1, dt * 12));
      const lit = current > 0; this.ledMaterial.emissiveIntensity = lit ? 1.8 : 0;
      this.ledGlow.visible = lit; this.ledLight.intensity = lit ? 7 : 0;
    }
    this.camera.position.set(...director.position); this.camera.lookAt(...director.target); this.camera.updateMatrixWorld();
    for (const { object, el, offset } of this.labels) {
      const point = object.localToWorld(offset.clone()).project(this.camera);
      el.style.left = `${(point.x * .5 + .5) * this.host.clientWidth}px`;
      el.style.top = `${(-point.y * .5 + .5) * this.host.clientHeight}px`;
      el.hidden = point.z > 1 || point.z < -1;
    }
    this.webgl.render(this.scene, this.camera);
  }
  pick(clientX, clientY) {
    if (!this.circuit.visible) return null;
    const r = this.host.getBoundingClientRect(), ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2((clientX - r.left) / r.width * 2 - 1, -(clientY - r.top) / r.height * 2 + 1), this.camera);
    const hit = ray.intersectObjects(this.targets)[0]; return hit?.object.userData.focus ?? null;
  }
  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    this.webgl.setSize(w, h); this.camera.aspect = w / h;
    this.camera.setViewOffset(w, h, w > h ? -w * .08 : 0, w > h ? 0 : -h * .06, w, h);
    this.camera.updateProjectionMatrix();
  }
}
