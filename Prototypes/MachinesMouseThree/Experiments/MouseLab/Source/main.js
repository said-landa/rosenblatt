import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMouse } from './model.js';
import { createCourseView } from './course-view.js';

const viewport = document.querySelector('#viewport');
const errorBox = document.querySelector('#error');
const loading = document.querySelector('#loading');
document.body.dataset.theme = 'dark';
function fail(message) { loading.hidden = true; errorBox.hidden = false; errorBox.textContent = message; }
window.addEventListener('error', event => {
  console.error(event.message, event.error);
  fail('No se pudo mostrar el objeto. Recarga esta ventana para volver a intentarlo.');
});

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
  const hemisphere = new THREE.HemisphereLight('#ffffff', '#788879', 2.1); scene.add(hemisphere);
  const key = new THREE.DirectionalLight('#fff9e7', 3.3); key.position.set(-7, 15, -9); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -16; key.shadow.camera.right = 16; key.shadow.camera.top = 16; key.shadow.camera.bottom = -16;
  key.shadow.normalBias = .035; key.shadow.bias = -.00015; key.shadow.radius = 4;
  scene.add(key);
  const fill = new THREE.DirectionalLight('#f2f8ff', 1.25); fill.position.set(8, 7, 4); scene.add(fill);
  const rim = new THREE.DirectionalLight('#b8d8c8', .55); rim.position.set(-10, 8, 11); scene.add(rim);
  const mouse = createMouse(); scene.add(mouse.group);
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: '#52624a', opacity: .16 }));
  shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.position.y = -.16; shadowPlane.receiveShadow = true; scene.add(shadowPlane);

  renderer.toneMappingExposure = 1.42;
  scene.environmentIntensity = .82;
  hemisphere.intensity = 2.5;
  key.intensity = 3.9;
  fill.intensity = 1.7;
  rim.intensity = 2.1;
  shadowPlane.material.opacity = .3;

  let courseView;
  renderer.domElement.addEventListener('keydown', event => {
    const offset = camera.position.clone().sub(controls.target); const spherical = new THREE.Spherical().setFromVector3(offset);
    const actions = { ArrowLeft: () => spherical.theta -= .13, ArrowRight: () => spherical.theta += .13, ArrowUp: () => spherical.phi -= .13, ArrowDown: () => spherical.phi += .13, '+': () => spherical.radius *= .9, '=': () => spherical.radius *= .9, '-': () => spherical.radius *= 1.1 };
    if (!actions[event.key]) return;
    event.preventDefault(); actions[event.key](); spherical.phi = THREE.MathUtils.clamp(spherical.phi, .08, Math.PI - .10); spherical.radius = THREE.MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical)); controls.update();
  });
  function resize() {
    const width = viewport.clientWidth, height = viewport.clientHeight;
    if (!width || !height) return;
    // CSS owns the canvas size. Updating inline dimensions inside the observer
    // can trigger an undelivered-notifications loop on orientation changes.
    renderer.setSize(width, height, false); camera.aspect = width / height;
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(34 / 2)) / Math.min(1, camera.aspect)));
    camera.updateProjectionMatrix();
    requestRender();
  }
  courseView = createCourseView({mouse,scene,camera,controls,requestRender});
  let resizeFrame = 0;
  new ResizeObserver(() => {
    if (!resizeFrame) resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      resize();
    });
  }).observe(viewport); resize();
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); fail('La vista 3D se interrumpió. Recarga esta ventana para recuperarla.'); });
  // The object is static: render only while controls move or the view changes.
  // Damping emits further change events until movement settles.
  function requestRender() {
    if (!document.hidden && nativeActive && !frame) frame = requestAnimationFrame(renderFrame);
  }
  function renderFrame(now) {
    frame = 0;
    if (courseView?.tick(now)) requestRender();
    controls.update();
    shadowPlane.visible = camera.position.y > 0;
    shadowPlane.position.y = -.16;
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
