import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMouse } from './model.js';
import { createAssemblyView } from './assembly-view.js';
import { createDeepDive } from './deep-dive-view.js';

const viewport = document.querySelector('#viewport');
const errorBox = document.querySelector('#error');
const loading = document.querySelector('#loading');
const touchInput = window.matchMedia('(pointer: coarse)').matches;
if (touchInput) document.querySelector('.hint').innerHTML = '<span class="orbit-icon">↔</span> Un dedo para girar <span class="separator">·</span> Dos dedos para acercar';
function fail(message) { loading.hidden = true; errorBox.hidden = false; errorBox.textContent = message; }
window.addEventListener('error', () => fail('No se pudo mostrar el objeto. Recarga esta ventana para volver a intentarlo.'));

try {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  viewport.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Mouse 3D. Arrastra para girar; usa la rueda para acercar. Con teclado: flechas para girar, más y menos para acercar.');
  renderer.domElement.tabIndex = 0;
  const scene = new THREE.Scene();
  let frame = 0;
  let nativeActive = true;
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 180);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .075;
  controls.enablePan = false; controls.minDistance = 13; controls.maxDistance = 48;
  controls.maxPolarAngle = Math.PI - .10; controls.minPolarAngle = .08;
  controls.rotateSpeed = .65; controls.zoomSpeed = .65;
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  scene.environment = pmrem.fromScene(environment, .04).texture;
  environment.dispose(); pmrem.dispose();
  scene.environmentIntensity = .65;
  scene.add(new THREE.HemisphereLight('#ffffff', '#788879', 2.1));
  const key = new THREE.DirectionalLight('#fff9e7', 3.3); key.position.set(-7, 15, -9); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -16; key.shadow.camera.right = 16; key.shadow.camera.top = 16; key.shadow.camera.bottom = -16;
  key.shadow.normalBias = .035; key.shadow.bias = -.00015; key.shadow.radius = 4;
  scene.add(key);
  const fill = new THREE.DirectionalLight('#f2f8ff', 1.25); fill.position.set(8, 7, 4); scene.add(fill);
  const mouse = createMouse(); scene.add(mouse.group);
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: '#52624a', opacity: .16 }));
  shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.position.y = -.16; shadowPlane.receiveShadow = true; scene.add(shadowPlane);

  let assemblyView, deepDive;
  const exterior = document.querySelector('#exterior'), interior = document.querySelector('#interior');
  function mode(showInside) {
    if (assemblyView) assemblyView.setInside(showInside);
    else mouse.shell.visible = !showInside;
    exterior.setAttribute('aria-pressed', String(!showInside)); interior.setAttribute('aria-pressed', String(showInside));
    document.querySelector('#view-description').textContent = showInside ? 'Carcasa retirada' : 'Carcasa cerrada';
    document.querySelector('#parts-summary').innerHTML = showInside ? 'Placa, interruptores y sensor óptico.<br>Las piezas conservan su posición.' : 'Dos botones, rueda y cable.<br>Gira el mouse para observar su forma.';
    document.body.dataset.view = showInside ? 'interior' : 'exterior';
    requestRender();
  }
  exterior.addEventListener('click', () => mode(false)); interior.addEventListener('click', () => mode(true));
  const target = new THREE.Vector3(-.6, .9, -1.3);
  function home() {
    controls.target.copy(target); camera.position.set(14.5, 17.7, -22.5);
    if (window.innerWidth <= 650) camera.position.multiplyScalar(1.12);
    controls.update();
  }
  function viewFrom(direction) {
    controls.target.set(0, .6, -.8);
    camera.position.set(.01, direction * 26, -.79);
    camera.up.set(0, 1, 0); controls.update();
  }
  document.querySelector('#top-view').addEventListener('click', () => viewFrom(1));
  document.querySelector('#bottom-view').addEventListener('click', () => viewFrom(-1));
  document.querySelector('#reset').addEventListener('click', home);
  document.querySelector('#assembly-camera').addEventListener('click', home);
  renderer.domElement.addEventListener('keydown', event => {
    const offset = camera.position.clone().sub(controls.target); const spherical = new THREE.Spherical().setFromVector3(offset);
    const actions = { ArrowLeft: () => spherical.theta -= .13, ArrowRight: () => spherical.theta += .13, ArrowUp: () => spherical.phi -= .13, ArrowDown: () => spherical.phi += .13, '+': () => spherical.radius *= .9, '=': () => spherical.radius *= .9, '-': () => spherical.radius *= 1.1 };
    if (!actions[event.key]) return;
    event.preventDefault(); actions[event.key](); spherical.phi = THREE.MathUtils.clamp(spherical.phi, .08, Math.PI - .10); spherical.radius = THREE.MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical)); controls.update();
  });
  function resize() {
    const width = viewport.clientWidth, height = viewport.clientHeight;
    renderer.setSize(width, height); camera.aspect = width / height;
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(34 / 2)) / Math.min(1, camera.aspect)));
    camera.updateProjectionMatrix();
    requestRender();
  }
  assemblyView = createAssemblyView({mouse, scene, camera, controls, canvas: renderer.domElement, requestRender, onModeChange: () => { mode(false); home(); }});
  deepDive = createDeepDive({assemblyView,scene,camera,controls,requestRender});
  new ResizeObserver(resize).observe(viewport); resize(); home();
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); fail('La vista 3D se interrumpió. Recarga esta ventana para recuperarla.'); });
  // The object is static: render only while controls move or the view changes.
  // Damping emits further change events until movement settles.
  function requestRender() {
    if (!document.hidden && nativeActive && !frame) frame = requestAnimationFrame(renderFrame);
  }
  function renderFrame(now) {
    frame = 0;
    if (assemblyView?.tick(now)) requestRender();
    if (deepDive?.tick(now)) requestRender();
    controls.update();
    shadowPlane.visible = camera.position.y > 0;
    shadowPlane.position.y = deepDive?.active ? -.018 : -.16;
    renderer.render(scene, camera);
    loading.hidden = true;
  }
  function updateActivity() {
    if (document.hidden || !nativeActive) { cancelAnimationFrame(frame); frame = 0; }
    else requestRender();
  }
  controls.addEventListener('change', requestRender);
  document.addEventListener('visibilitychange', updateActivity);
  window.addEventListener('machines:visibility', event => { nativeActive = event.detail !== false; updateActivity(); });
  updateActivity();
} catch (error) {
  console.error(error);
  fail('Este navegador no pudo iniciar la vista 3D. Se necesita WebGL 2. Prueba recargando la ventana o abriéndola en otro navegador.');
}
