import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Construction, SEQUENCES, STORAGE_KEY, LEGACY_STORAGE_KEY } from './state.js';
import { placementMotion, smooth } from './assembly-motion.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Feedback } from './feedback.js';
import { Encounters, ENCOUNTERS, ENCOUNTER_KEY } from './encounters.js';
import { tourPosition, flightPosition } from './camera-tour.js';

const $ = id => document.getElementById(id);
let saved;
for (const key of [STORAGE_KEY, LEGACY_STORAGE_KEY]) {
  try { const candidate = JSON.parse(localStorage.getItem(key)); if (Construction.valid(candidate)) { saved = candidate; break; } } catch {}
}
const state = new Construction(saved);
let savedEncounters; try { savedEncounters = JSON.parse(localStorage.getItem(ENCOUNTER_KEY)); } catch {}
const encounters = new Encounters(savedEncounters);
let voyage = false, voyageTime = 0, encounterModel = null;
const feedback = new Feedback();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const INTRODUCTION_KEY = 'machines.constituents.introduction.v1';
let introducing = true; try { introducing = localStorage.getItem(INTRODUCTION_KEY) !== 'seen'; } catch {}
let active = !document.hidden, dragging = null, flight = null, settle = null, navigation = null, encounterExit = null;
const PATH_REVIEW_KEY = 'machines.constituents.path-map.v1';
let time = 0, previous = performance.now(), width = innerWidth, height = innerHeight;
let seed = 407;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return (seed + 1) / 4294967297; };
const colors = { up: '#f4d6a2', down: '#b6bbef', electron: '#9cdeef', field: '#b2ead0' };
const slotPositions = [new THREE.Vector3(-.62, .36, .08), new THREE.Vector3(.60, .28, -.15), new THREE.Vector3(0, -.54, .22)];
const scene = new THREE.Scene();
scene.background = new THREE.Color('#070a11');
const camera = new THREE.PerspectiveCamera(40, width / height, .1, 80);
camera.position.set(0, 1.2, 10);
function frameCamera() {
  // Shift the optical framing, not the model's world coordinates. Moving the
  // model onto a fresh camera-facing plane every frame accumulated depth drift.
  camera.setViewOffset(width, height, landscape() ? -width * .18 : 0, landscape() ? height * .01 : height * .04, width, height);
}
frameCamera();
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' }); }
catch { $('failure').hidden = false; throw new Error('WebGL unavailable'); }
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(width, height);
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('viewport').append(renderer.domElement);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), .58, .45, .78);
composer.addPass(bloom); composer.addPass(new OutputPass());
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = .08;
controls.enablePan = false; controls.minDistance = 5; controls.maxDistance = 17;
controls.target.set(0, 0, 0); controls.update();
if (width > 600 && height < 550) { camera.position.setLength(6.7); controls.update(); }
controls.addEventListener('start', () => { flight = null; voyage = false; feedback.play('touch', 'begin'); });

const pointVertex = `attribute float aSize; attribute float aPhase;
uniform float uTime; uniform float uScale; uniform float uWave;
varying float vBrightness; varying float vSeed;
void main(){ vec3 p=position;
float pulse=sin(uTime*1.2+aPhase+p.y*5.0);
p += normalize(position+vec3(.001))*pulse*uWave*.08;
float twist=sin(uTime*.55+p.y*3.0)*uWave*.16;
p.xz=mat2(cos(twist),-sin(twist),sin(twist),cos(twist))*p.xz;
vec4 mv=modelViewMatrix*vec4(p,1.0);
gl_Position=projectionMatrix*mv; gl_PointSize=clamp(uScale*aSize*length(modelMatrix[0].xyz)/-mv.z,1.0,16.0);
vSeed=aPhase/6.2831853; vBrightness=.72+.28*sin(aPhase+uTime*.65); }`;
const pointFragment = `uniform vec3 uColor; uniform float uOpacity; uniform float uReveal; varying float vBrightness; varying float vSeed;
void main(){ float r=length(gl_PointCoord-.5)*2.0; if(r>1.0)discard;
float a=pow(1.0-r,2.5)*uOpacity*vBrightness;
a *= smoothstep(vSeed-.10,vSeed+.10,uReveal)*min(1.0,uReveal*8.0);
gl_FragColor=vec4(uColor,a); }`;
const animatedMaterials = [];
function points(positions, color, wave = 1, opacity = .8, size = 1) {
  const n = positions.length / 3; const sizes = new Float32Array(n), phases = new Float32Array(n);
  for (let i = 0; i < n; i++) { sizes[i] = (.018 + random() * .022) * size; phases[i] = random() * Math.PI * 2; }
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1)); geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: height * renderer.getPixelRatio() }, uWave: { value: wave }, uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity }, uReveal: { value: 1 } },
    vertexShader: pointVertex, fragmentShader: pointFragment, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  animatedMaterials.push(material);
  return new THREE.Points(geometry, material);
}
const glowCanvas = document.createElement('canvas'); glowCanvas.width = glowCanvas.height = 128;
const glowContext = glowCanvas.getContext('2d'); const gradient = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
gradient.addColorStop(0, '#ffffffa0'); gradient.addColorStop(.18, '#ffffff38'); gradient.addColorStop(.5, '#ffffff0a'); gradient.addColorStop(1, '#ffffff00');
glowContext.fillStyle = gradient; glowContext.fillRect(0, 0, 128, 128);
const glowTexture = new THREE.CanvasTexture(glowCanvas);
function glow(color, scale, opacity) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color, opacity, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  sprite.scale.setScalar(scale); return sprite;
}
function packet(kind) {
  const group = new THREE.Group(); const p = [];
  for (let i = 0; i < 1600; i++) {
    const y = (random() - .5) * 1.05, a = random() * Math.PI * 2;
    const radius = Math.sqrt(random()) * .42 * Math.pow(Math.max(.05, 1 - Math.abs(y) * 1.6), .6);
    const spiral = y * 6;
    p.push(Math.cos(a + spiral) * radius, y, Math.sin(a + spiral) * radius * .8);
  }
  group.add(points(p, colors[kind], 1, .64, 1.7)); group.add(glow(colors[kind], 1.6, .8));
  group.userData.kind = kind;
  return group;
}
function fieldKnot() {
  const group = new THREE.Group();
  for (let k = 0; k < 5; k++) {
    const p = [];
    for (let i = 0; i <= 120; i++) {
      const a = i / 120 * Math.PI * 2, radius = .37 + .09 * Math.cos(3 * a + k);
      p.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, .16 * Math.sin(3 * a + k)));
    }
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(p), new THREE.LineBasicMaterial({ color: colors.field, transparent: true, opacity: .20 + k * .06, blending: THREE.AdditiveBlending, depthWrite: false }));
    line.rotation.set(k * .35, k * .52, 0); group.add(line);
  }
  group.add(glow(colors.field, 1.7, .65)); group.userData.kind = 'field'; return group;
}
const assembly = new THREE.Group(); scene.add(assembly);
const constituents = new THREE.Group(); assembly.add(constituents);
const strongField = new THREE.Group(); assembly.add(strongField);
const fluxLines = [];
for (let k = 0; k < 15; k++) {
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(100 * 3), 3));
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: k % 3 === 0 ? '#a8e3ca' : '#a0b9db', transparent: true, opacity: .075, depthWrite: false, blending: THREE.AdditiveBlending }));
  strongField.add(line); fluxLines.push(line);
}
const fieldGlow = glow('#abd6cc', 4.6, .12); strongField.add(fieldGlow);
const seaPositions = [];
for (let i = 0; i < 2500; i++) {
  const a = random() * Math.PI * 2, z = random() * 2 - 1, r = Math.cbrt(random()) * 1.12, s = Math.sqrt(1 - z * z);
  seaPositions.push(r * s * Math.cos(a), r * z, r * s * Math.sin(a));
}
const sea = points(seaPositions, '#a4d7df', 1, .17, 1.7); strongField.add(sea);
// Hydrogen 1s: radial probability r² exp(-2r/a0), sampled as Gamma(3,a0/2).
// Stationary statistical samples, not many electrons or tracked trajectories.
const electronPositions = [];
for (let i = 0; i < 6600; i++) {
  const r = -Math.log(random() * random() * random()) * .55;
  const z = random() * 2 - 1, a = random() * Math.PI * 2, s = Math.sqrt(1 - z * z);
  electronPositions.push(r * s * Math.cos(a), r * z, r * s * Math.sin(a));
}
const electronCloud = points(electronPositions, '#8ac3f1', 0, .45, 2.7); scene.add(electronCloud); electronCloud.visible = false;
const electronGlow = glow('#6199ce', 7, .42); scene.add(electronGlow); electronGlow.visible = false;
const trailPositions = new Float32Array(72 * 3);
const trailGeometry = new THREE.BufferGeometry(); trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
const connectionTrail = new THREE.Line(trailGeometry, new THREE.LineBasicMaterial({color:'#b2ead0',transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));
scene.add(connectionTrail); connectionTrail.visible = false; connectionTrail.frustumCulled = false;
const contactHalo = glow('#c4eee5', 1, 0); scene.add(contactHalo);
let source = null, targetPoint = new THREE.Vector3(), sourceHome = new THREE.Vector3();
const ray = new THREE.Raycaster(); const plane = new THREE.Plane(); const screen = new THREE.Vector2();
function screenToWorld(x, y, out) {
  screen.set(x / width * 2 - 1, 1 - y / height * 2);
  ray.setFromCamera(screen, camera); camera.getWorldDirection(plane.normal); plane.setFromNormalAndCoplanarPoint(plane.normal, assembly.position);
  ray.ray.intersectPlane(plane, out); return out;
}
function project(v) { const p = v.clone().project(camera); return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2 }; }
function dispose(group) {
  if (!group) return;
  group.traverse(item => {
    item.geometry?.dispose();
    if (item.material) { const at = animatedMaterials.indexOf(item.material); if (at >= 0) animatedMaterials.splice(at, 1); item.material.dispose(); }
  }); group.removeFromParent();
}
function setAlpha(group, alpha) {
  group?.traverse(item => {
    const m = item.material; if (!m) return;
    if (m.uniforms?.uOpacity) { m.userData.baseAlpha ??= m.uniforms.uOpacity.value; m.uniforms.uOpacity.value = m.userData.baseAlpha * alpha; }
    else { m.userData.baseAlpha ??= m.opacity; m.opacity = m.userData.baseAlpha * alpha; }
  });
}
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.snapshot())); } catch {} }
function landscape() { return width > 600 && height < 550; }
function anchorScene() {
  if (dragging || settle) return;
  assembly.position.set(0, 0, 0);
  electronCloud.position.copy(assembly.position); electronGlow.position.copy(assembly.position);
  if (source) { screenToWorld(width * (landscape() ? .87 : .5), height * (landscape() ? .74 : .72), sourceHome); source.position.copy(sourceHome); }
}
function destination() {
  const index = state.path === 'hydrogen' || state.expected === 'field' ? null : state.count;
  targetPoint.copy(index === null ? new THREE.Vector3() : slotPositions[index]);
  targetPoint.multiplyScalar(assembly.scale.x).add(assembly.position); return targetPoint;
}
function makeSource() {
  dispose(source); source = state.done ? null : state.expected === 'field' ? fieldKnot() : packet(state.expected);
  if (source) { scene.add(source); source.userData.entry = 0; source.scale.setScalar(.35); setAlpha(source, 0); }
  $('ingredient').hidden = introducing || !encounters.done || state.done; $('target').hidden = introducing || !encounters.done || state.done; $('connector').hidden = introducing || !encounters.done || state.done;
  if (source) source.visible = !introducing && encounters.done;
  anchorScene();
}
function renderComposition(retainProton = false) {
  if (!retainProton) for (const child of [...constituents.children]) dispose(child);
  if (state.path === 'hydrogen') {
    if (!retainProton) ['up', 'up', 'down'].forEach((kind, i) => { const wave = packet(kind); wave.position.copy(slotPositions[i]); constituents.add(wave); });
    assembly.scale.setScalar(.25);
  } else {
    SEQUENCES[state.path].slice(0, Math.min(state.count, 3)).forEach((kind, i) => { const wave = packet(kind); wave.position.copy(slotPositions[i]); constituents.add(wave); });
    assembly.scale.setScalar(1);
  }
  electronCloud.visible = electronGlow.visible = state.path === 'hydrogen' && state.done;
  makeSource(); updateUI();
}
function encounterUI() {
  const chapter = encounters.current;
  if (!chapter) return;
  document.querySelector('main').dataset.encounter = chapter.id;
  $('eyebrow').hidden = true;
  $('title').textContent = chapter.title;
  $('meaning').textContent = chapter.meaning;
  $('instruction').textContent = 'Drag to orbit';
  $('boundary').textContent = chapter.boundary;
  for (const id of ['ingredient', 'target', 'connector', 'composition', 'next-step']) $(id).hidden = true;
  $('encounter-next').hidden = introducing;
  const next = ENCOUNTERS[encounters.index + 1];
  $('encounter-next').setAttribute('aria-label', next ? `Continue to ${next.title.toLowerCase()}` : 'Start binding construction');
  $('viewport').setAttribute('aria-label', `${chapter.title}. ${chapter.meaning}. Illustrative three-dimensional symbol, not a measured particle shape. Drag to move the camera around it. Pinch to zoom.`);
}
function renderEncounter() {
  dispose(encounterModel); encounterModel = null;
  if (encounters.done) return;
  const kind = encounters.current.id;
  if (kind === 'binding') {
    encounterModel = new THREE.Group();
    ['up', 'up', 'down'].forEach((k, i) => { const wave = packet(k); wave.position.copy(slotPositions[i]); encounterModel.add(wave); });
    const field = fieldKnot(); field.scale.setScalar(2.1); encounterModel.add(field);
    encounterModel.scale.setScalar(1.05);
  } else {
    encounterModel = kind === 'field' ? fieldKnot() : packet(kind);
    encounterModel.scale.setScalar(kind === 'field' ? 2.2 : 2.6);
  }
  // Hold the subject fixed so travel/parallax comes from the actual camera.
  encounterModel.traverse(item => { if (item.material?.uniforms?.uWave) item.material.uniforms.uWave.value = 0; });
  scene.add(encounterModel); encounterModel.userData.entry = 0; setAlpha(encounterModel, 0);
  encounterModel.visible = !introducing;
  assembly.visible = false; if (source) source.visible = false;
  electronCloud.visible = electronGlow.visible = false;
  voyageTime = 0; voyage = !reduceMotion.matches;
  fly(tourPosition(0, encounters.index, landscape()));
  encounterUI();
}
function advanceEncounter() {
  if (!encounters.advance(encounters.current?.id)) return;
  try { localStorage.setItem(ENCOUNTER_KEY, JSON.stringify(encounters.snapshot())); } catch {}
  flight = null; encounterExit = null; $('encounter-next').disabled = false;
  feedback.play('reuse', 'checkpoint');
  if (!encounters.done) renderEncounter();
  else {
    dispose(encounterModel); encounterModel = null; voyage = false;
    document.querySelector('main').dataset.encounter = 'construction';
    assembly.visible = true; renderComposition();
    fly(state.path === 'hydrogen' ? [-2, 1.6, 11] : [0, 1.2, 10]);
    maybeShowPath();
  }
}
$('encounter-next').addEventListener('click', () => {
  if (introducing || encounterExit) return;
  if (reduceMotion.matches) { advanceEncounter(); return; }
  encounterExit = { elapsed: 0 }; $('encounter-next').disabled = true;
});
function updatePathMap() {
  for (const button of $('path-map').querySelectorAll('[data-path]')) {
    const path = button.dataset.path;
    button.disabled = !state.available(path);
    button.setAttribute('aria-current', path === state.path ? 'step' : 'false');
    button.classList.toggle('complete', state.completed[path]);
    button.querySelector('em').textContent = path === state.path ? 'Current' : state.completed[path] ? '✓' : state.counts[path] ? `${state.counts[path]}/${SEQUENCES[path].length}` : '';
  }
}
function showPath() {
  if (introducing || !encounters.done || settle || navigation) return;
  cancelDrag(); updatePathMap(); $('path-map').showModal();
  controls.enabled = false; flight = null;
}
function closePath() {
  $('path-map').close(); controls.enabled = true;
  try { localStorage.setItem(PATH_REVIEW_KEY, 'seen'); } catch {}
}
function maybeShowPath() {
  let seen = false; try { seen = localStorage.getItem(PATH_REVIEW_KEY) === 'seen'; } catch {}
  if (!seen) showPath();
}
$('path-open').addEventListener('click', showPath);
$('path-close').addEventListener('click', closePath);
$('path-map').addEventListener('cancel', e => { e.preventDefault(); closePath(); });
function changePath(path) {
  if (!state.available(path) || settle || navigation) return;
  if (path === state.path) { if ($('path-map').open) closePath(); return; }
  if ($('path-map').open) closePath();
  cancelDrag(); flight = null;
  const reuse = state.path === 'proton' && state.completed.proton && path === 'hydrogen';
  navigation = { path, elapsed: 0, duration: reduceMotion.matches ? .2 : 2.4, changed: false, reuse, scale: assembly.scale.x };
  $('ingredient').disabled = true; $('path-open').disabled = true;
}
$('path-map').addEventListener('click', e => { const button = e.target.closest('button[data-path]'); if (button && !button.disabled) changePath(button.dataset.path); });
$('continue-path').addEventListener('click', () => {
  if (state.path === 'hydrogen') showPath();
  else changePath(state.completed.proton ? 'hydrogen' : 'proton');
});
function updateUI() {
  if (!encounters.done) { encounterUI(); return; }
  $('encounter-next').hidden = true;
  document.querySelector('main').dataset.encounter = 'construction';
  $('eyebrow').hidden = false;
  const kind = state.expected, name = state.path[0].toUpperCase() + state.path.slice(1);
  const isH = state.path === 'hydrogen';
  $('eyebrow').textContent = isH ? 'PROTON + ELECTRON → ATOM' : `QUARKS → ${name.toUpperCase()}`;
  const descriptions = {
    up: ['Up quark', '+⅔'],
    down: ['Down quark', '−⅓'],
    field: ['Gluon binding', 'Strong interaction'],
    electron: ['Electron binding', 'Electromagnetism'],
  };
  if (state.done) {
    $('title').textContent = isH ? 'Hydrogen-1' : name;
    $('meaning').textContent = isH ? 'p + e⁻ · charge 0' : `${state.path === 'neutron' ? 'u + d + d' : 'u + u + d'} · charge ${state.path === 'proton' ? '+1' : '0'}`;
    $('instruction').textContent = isH ? 'One electron · probability cloud' : state.path === 'neutron' ? 'Free neutron: unstable' : 'Gluons + sea quarks';
  } else {
    [$('title').textContent, $('meaning').textContent] = descriptions[kind];
    $('instruction').textContent = kind === 'field' ? 'Reveal binding' : 'Drag to connect';
  }
  $('boundary').textContent = isH ? '1s probability model · nucleus enlarged · not an orbit' : state.done || kind === 'field' ? 'Valence model · quarks stay confined' : 'Visual symbol · no known smaller constituents';
  $('ingredient-symbol').textContent = ({ up: 'u', down: 'd', field: '∿', electron: 'e⁻' })[kind] ?? '';
  $('ingredient').setAttribute('aria-label', `Place ${kind === 'field' ? 'gluon field focus' : kind === 'electron' ? 'electron' : `${kind} quark`} in the ${state.path} model`);
  $('composition').hidden = introducing || state.done;
  $('composition').setAttribute('aria-label', `${state.path} model: ${state.count} of ${SEQUENCES[state.path].length} placements complete`);
  $('composition').replaceChildren(...SEQUENCES[state.path].map((k, i) => {
    const span = document.createElement('span'); span.textContent = ({ up: 'u', down: 'd', field: '∿', electron: 'e⁻' })[k];
    span.className = i < state.count ? 'filled' : i === state.count ? 'current' : ''; return span;
  }));
  $('path-open').hidden = introducing || !encounters.done;
  $('next-step').hidden = introducing || !state.done;
  $('continue-path').innerHTML = state.path === 'hydrogen' ? 'View construction path <span aria-hidden="true">↗</span>' : `${state.completed.proton ? 'Build hydrogen-1' : 'Build proton'} <span aria-hidden="true">→</span>`;
  updatePathMap();
  $('viewport').setAttribute('aria-label', `${name} visual model. ${$('meaning').textContent} ${$('instruction').textContent} Shapes and colors are illustrative. Drag the model to inspect it.`);
}
function fly(to, focus = assembly.position) {
  const from = camera.position.clone(); const end = new THREE.Vector3(...to);
  if (landscape()) end.sub(focus).setLength(6.7).add(focus);
  if (reduceMotion.matches) { camera.position.copy(end); controls.target.copy(focus); controls.update(); return; }
  flight = { from: from.sub(focus).toArray(), to: end.sub(focus).toArray(), startTarget: controls.target.clone(), endTarget: focus.clone(), elapsed: 0, duration: 2.6 };
}
function finishPlacement(kind) {
  const index = state.count;
  if (source) { source.scale.setScalar(1); setAlpha(source, 1); source.userData.entry = 1; }
  if (!state.place(kind, true)) return;
  persist();
  $('notice').textContent = `${kind === 'field' ? 'Strong interaction revealed' : `${kind} placed`}. ${state.done ? `${state.path} complete.` : `Next: ${state.expected}.`}`;
  if (kind !== 'field' && kind !== 'electron') {
    source.removeFromParent(); constituents.add(source); source.position.copy(slotPositions[index]); source = null;
  } else { dispose(source); source = null; }
  if (kind === 'electron') electronCloud.visible = electronGlow.visible = true;
  updateUI(); makeSource();
  feedback.play(state.done ? kind === 'field' ? 'bind' : 'complete' : 'place', state.done ? 'complete' : 'connect');
  const angles = [[-6.5, 2.2, 6], [-5.8, -1.3, -6.5], [5.9, 2.6, -6], [6.3, 2.8, 6.5]];
  fly(state.path === 'hydrogen' ? [-6.8, 2.5, -8] : angles[Math.min(state.count - 1, 3)]);
}
function attempt(kind, valid) {
  if (!valid) { feedback.play('return', 'reject'); $('notice').textContent = 'Returned. Place the ingredient in the outlined target.'; return; }
  if (kind !== state.expected || state.done || settle || navigation || $('path-map').open) return;
  flight = null;
  const from = source.position.clone(), to = destination().clone();
  const middle = from.clone().lerp(to, .5).addScaledVector(camera.up, .65);
  settle = { kind, from, to, curve: new THREE.QuadraticBezierCurve3(from, middle, to), elapsed: 0 };
  if (kind === 'electron') { electronCloud.visible = electronGlow.visible = true; electronCloud.material.uniforms.uReveal.value = 0; }
  $('path-open').disabled = true;
  $('ingredient').disabled = true;
}
function cancelDrag() {
  if (!dragging) return;
  dragging = null; controls.enabled = true; $('ingredient').classList.remove('dragging'); $('target').classList.remove('near');
  anchorScene();
}
$('ingredient').addEventListener('pointerdown', e => {
  if (!source || settle || navigation || e.button !== 0 || dragging) return;
  e.preventDefault(); flight = null; controls.enabled = false;
  dragging = { id: e.pointerId, kind: state.expected, startX: e.clientX, startY: e.clientY, moved: false, valid: false };
  $('ingredient').setPointerCapture(e.pointerId); $('ingredient').classList.add('dragging'); feedback.play('touch', 'begin');
});
$('ingredient').addEventListener('pointermove', e => {
  if (!dragging || e.pointerId !== dragging.id) return;
  e.preventDefault(); dragging.moved ||= Math.hypot(e.clientX - dragging.startX, e.clientY - dragging.startY) > 8;
  screenToWorld(e.clientX, e.clientY, source.position);
  const target = project(destination()); dragging.valid = Math.hypot(e.clientX - target.x, e.clientY - target.y) < 61;
  $('target').classList.toggle('near', dragging.valid);
});
$('ingredient').addEventListener('pointerup', e => {
  if (!dragging || e.pointerId !== dragging.id) return;
  e.preventDefault(); const { kind, valid, moved } = dragging; const release = source.position.clone(); cancelDrag();
  if (valid) source.position.copy(release);
  if (moved) attempt(kind, valid);
  else { $('instruction').textContent = 'Drag this ingredient into the outline'; }
});
$('ingredient').addEventListener('pointercancel', cancelDrag);
$('ingredient').addEventListener('lostpointercapture', cancelDrag);
// Keyboard / assistive activation chooses the sole authored destination.
$('ingredient').addEventListener('click', e => { if (e.detail === 0 && source && !settle) attempt(state.expected, true); });
function introductionUI() {
  $('introduction').hidden = !introducing;
  $('viewport').setAttribute('aria-hidden', String(introducing));
  $('story').hidden = introducing;
  document.querySelector('footer').hidden = introducing;
  controls.enabled = !introducing;
  $('path-open').hidden = introducing || !encounters.done;
  assembly.visible = !introducing && encounters.done;
  if (source) source.visible = !introducing && encounters.done;
  if (encounterModel) encounterModel.visible = !introducing;
  electronCloud.visible = electronGlow.visible = !introducing && encounters.done && state.path === 'hydrogen' && state.done;
  $('begin').textContent = state.count || state.completed.proton ? 'Continue' : 'Begin';
}
$('begin').addEventListener('click', () => {
  introducing = false;
  try { localStorage.setItem(INTRODUCTION_KEY, 'seen'); } catch {}
  introductionUI(); updateUI(); makeSource();
  if (!encounters.done) { renderEncounter(); $('encounter-next').focus({ preventScroll: true }); }
  else if (!state.done) $('ingredient').focus({ preventScroll: true });
  else $('continue-path').focus({ preventScroll: true });
  if (encounters.done) maybeShowPath();
});
function cancelPlacement() {
  if (!settle) return;
  settle = null; connectionTrail.visible = false; contactHalo.material.opacity = 0;
  $('ingredient').disabled = false; $('path-open').disabled = Boolean(navigation);
  electronCloud.visible = electronGlow.visible = state.path === 'hydrogen' && state.done;
  document.querySelector('main').dataset.motion = 'idle'; anchorScene();
}
function visibility(value) {
  active = value && !document.hidden;
  if (!active) { cancelDrag(); feedback.stop(); cancelPlacement(); }
  previous = performance.now();
}
document.addEventListener('visibilitychange', () => visibility(!document.hidden));
window.addEventListener('machines:visibility', e => visibility(e.detail));
for (const name of ['selectstart', 'contextmenu']) document.addEventListener(name, e => e.preventDefault());
window.addEventListener('resize', () => {
  cancelDrag(); cancelPlacement(); flight = null;
  width = innerWidth; height = innerHeight; camera.aspect = width / height; frameCamera(); renderer.setSize(width, height); composer.setSize(width, height);
  camera.position.sub(controls.target).setLength(landscape() ? 6.7 : 10).add(controls.target); controls.update();
  for (const material of animatedMaterials) material.uniforms.uScale.value = height * renderer.getPixelRatio();
  anchorScene();
});
renderComposition(); renderEncounter(); introductionUI();
if (!introducing && encounters.done) maybeShowPath();
function frame(now) {
  requestAnimationFrame(frame);
  const delta = Math.min(.04, (now - previous) / 1000); previous = now;
  if (!active) return;
  if ($('path-map').open) { composer.render(); return; }
  if (!introducing) {
    if (!reduceMotion.matches) time += delta;
    if (!encounters.done && voyage && !reduceMotion.matches && !flight) {
      voyageTime += delta;
      camera.position.fromArray(tourPosition(voyageTime, encounters.index, landscape()));
      controls.target.set(0, 0, 0);
    }
    if (encounterExit) {
      encounterExit.elapsed += delta;
      setAlpha(encounterModel, 1 - smooth(encounterExit.elapsed / .5));
      if (encounterExit.elapsed >= .5) advanceEncounter();
    } else if (encounterModel) {
      encounterModel.userData.entry = Math.min(1, encounterModel.userData.entry + delta / .9);
      setAlpha(encounterModel, smooth(encounterModel.userData.entry));
    }
    if (navigation) {
      navigation.elapsed += delta;
      const progress = Math.min(1, navigation.elapsed / navigation.duration);
      if (!navigation.changed && (navigation.reuse || progress >= .46)) {
        state.select(navigation.path); persist(); renderComposition(navigation.reuse);
        navigation.changed = true;
        fly(state.path === 'hydrogen' ? [-2, 1.6, 11] : [0, 1.2, 10]);
      }
      if (navigation.reuse) assembly.scale.setScalar(navigation.scale + (.25 - navigation.scale) * smooth(progress));
      if (progress === 1) { navigation = null; $('ingredient').disabled = false; $('path-open').disabled = false; }
    }
    if (settle) {
      settle.elapsed += delta;
      const motion = placementMotion(settle.kind, settle.elapsed, reduceMotion.matches);
      source.position.copy(settle.curve.getPoint(motion.travel));
      document.querySelector('main').dataset.motion = motion.travel < 1 ? 'travel' : motion.reveal < 1 ? 'binding' : 'complete';
      contactHalo.position.copy(settle.to); contactHalo.scale.setScalar(.6 + motion.bind * 2.2);
      contactHalo.material.opacity = motion.pulse * .68;
      connectionTrail.visible = !reduceMotion.matches;
      connectionTrail.material.opacity = .45 * motion.pulse;
      for (let j = 0; j < 72; j++) {
        const t = Math.max(0, motion.travel - .38) + (motion.travel - Math.max(0, motion.travel - .38)) * j / 71;
        const point = settle.curve.getPoint(t); trailGeometry.attributes.position.setXYZ(j, point.x, point.y, point.z);
      }
      trailGeometry.attributes.position.needsUpdate = true;
      if (settle.kind === 'electron') electronCloud.material.uniforms.uReveal.value = motion.reveal;
      if (motion.done) {
        const kind = settle.kind; settle = null; connectionTrail.visible = false; contactHalo.material.opacity = 0;
        $('ingredient').disabled = false; $('path-open').disabled = false; finishPlacement(kind);
        document.querySelector('main').dataset.motion = 'idle';
      }
    }
    if (flight && !dragging) {
      flight.elapsed += delta; const t = Math.min(1, flight.elapsed / flight.duration), ease = t * t * (3 - 2 * t);
      camera.position.fromArray(flightPosition(flight.from, flight.to, t)).add(flight.endTarget);
      controls.target.lerpVectors(flight.startTarget, flight.endTarget, ease);
      if (t === 1) flight = null;
    }
  }
  controls.autoRotate = encounters.done && state.done && !introducing && !reduceMotion.matches && !flight;
  controls.autoRotateSpeed = .48;
  controls.update(delta);
  anchorScene();
  for (const material of animatedMaterials) material.uniforms.uTime.value = material.uniforms.uWave.value === 0 ? 0 : time;
  const sceneFade = navigation && !navigation.reuse ? navigation.changed ? smooth((navigation.elapsed / navigation.duration - .46) / .54) : 1 - smooth(navigation.elapsed / navigation.duration / .46) : 1;
  setAlpha(constituents, sceneFade);
  if (source) {
    source.userData.entry = Math.min(1, source.userData.entry + delta / .9);
    const entry = smooth(source.userData.entry); source.scale.setScalar(.35 + .65 * entry);
    setAlpha(source, entry * (navigation ? 0 : sceneFade));
    $('ingredient').style.opacity = String(entry * (navigation ? 0 : 1));
  }
  if (source?.userData.kind === 'field' && !introducing) source.rotation.y = time * .15;
  const bound = state.path === 'hydrogen' || state.done;
  const binding = settle?.kind === 'field' ? placementMotion('field', settle.elapsed, reduceMotion.matches).bind : 0;
  fieldGlow.material.opacity = (bound ? .60 : .20 + binding * .40) * sceneFade;
  sea.material.uniforms.uOpacity.value = (bound ? .46 : .17 + binding * .29) * sceneFade;
  const atomReveal = state.path === 'hydrogen' && state.done ? 1 : settle?.kind === 'electron' ? placementMotion('electron', settle.elapsed, reduceMotion.matches).reveal : 0;
  electronCloud.material.uniforms.uReveal.value = atomReveal;
  electronCloud.material.uniforms.uOpacity.value = .45 * sceneFade; electronGlow.material.opacity = .42 * atomReveal * sceneFade;
  for (let k = 0; k < fluxLines.length; k++) {
    const positions = fluxLines[k].geometry.attributes.position;
    const a = slotPositions[k % 3], b = slotPositions[(k + 1) % 3];
    for (let j = 0; j < 100; j++) {
      const t = j / 99, arch = Math.sin(t * Math.PI), phase = t * Math.PI * 4 + k * .7 + time * .8;
      positions.setXYZ(j, a.x + (b.x - a.x) * t + Math.sin(phase) * arch * .19, a.y + (b.y - a.y) * t + Math.cos(phase) * arch * .19, a.z + (b.z - a.z) * t + Math.sin(phase + k) * arch * .25);
    }
    positions.needsUpdate = true; fluxLines[k].material.opacity = (bound ? .46 : .09 + binding * .37) * sceneFade;
  }
  if (source) {
    const src = project(source.position), dst = project(destination());
    $('ingredient').style.left = `${src.x}px`; $('ingredient').style.top = `${src.y}px`;
    $('target').style.left = `${dst.x}px`; $('target').style.top = `${dst.y}px`;
    const dx = dst.x - src.x, dy = dst.y - src.y;
    $('connector').style.left = `${src.x}px`; $('connector').style.top = `${src.y}px`;
    $('connector').style.width = `${Math.hypot(dx, dy)}px`; $('connector').style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
  }
  composer.render();
}
requestAnimationFrame(frame);
