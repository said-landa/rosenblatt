import { JourneyRenderer } from './renderer.js';
import { CameraDirector } from './director.js';
import { AssemblyClock, BEATS, readProgress, saveProgress, commitModel, circuitAt } from './model.js';
import { Feedback } from '../../Constituents/Source/feedback.js';

const $ = id => document.getElementById(id), feedback = new Feedback();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const clock = new AssemblyClock();
let storage; try { storage = localStorage; } catch { storage = null; }
let progress = readProgress(storage), beat = 'welcome', closed = false, active = !document.hidden;
let captionTime = 0, focus = null, pointer = null, last = performance.now(), previousValue = -1, previousRunning = false;
const scripts = {
  welcome: ['BUILD / UNDERSTAND', 'Enter the things\nwe build.', 'Phones. Satellites. Cells. The systems around us share a foundation in matter.', 'Begin the journey ↗', 'A short shared beginning. Then choose a path.'],
  quarks: ['01 / STARTING INGREDIENTS', 'Start small.', 'Two up quarks. One down quark. These are symbols for the ingredients of a proton, not tiny mechanical parts.', 'Find what binds them →', 'Warm symbols: up. Violet: down. Shapes are illustrative.'],
  proton: ['02 / A COMPOSITE', 'A relationship\nbecomes a proton.', 'Gluons mediate the strong interaction between quarks. Reveal a simplified composition: two up, one down.', 'Reveal the composition', 'Preview a model. Quarks are not free parts to pick up.'],
  electron: ['03 / A PARALLEL INGREDIENT', 'Meet the electron.', 'An electron is a lepton, another elementary ingredient. It joins the atomic story independently of the quarks.', 'Build an atomic model →', 'The electron is the cyan symbol. Sizes are not to scale.'],
  atom: ['04 / AN ATOM', 'One proton.\nOne electron.', 'Electromagnetism binds them in hydrogen-1. The cloud represents where its one electron may be found.', 'Reveal the bound state', 'Hydrogen-1 has no neutrons. The cloud is not many electrons.'],
  routes: ['05 / THE PATHS AHEAD', 'Shared beginnings.\nDifferent possibilities.', 'Atoms lead into materials and chemistry. Many more constructions connect them to the systems ahead.', '', ''],
  circuit: ['06 / A WORKING PREVIEW', 'Make a connection.', 'A separate electronics study with manufactured parts: power, a resistor, an LED and a switch.', 'Assemble the circuit', 'Preview only · the material and manufacturing path comes later.'],
  operate: ['07 / CAUSE & EFFECT', 'Give the light\na complete path.', 'Close the switch to complete the loop. Open it and the current stops. The resistor limits the current.', 'Close the switch', 'Tap a part to travel closer. Sweep the scene to inspect.']
};
const extra = {
  welcome: ['Why begin here?', 'Rosenblatt is about building and understanding functional systems: engines, electronics, living systems and computing. This study starts with a few ingredients of ordinary matter, then opens paths toward those constructions.', 'The particles are a brief shared foundation. The working circuit is a separate preview; the intervening materials, chemistry and manufacturing have not been built here.'],
  quarks: ['What do these symbols mean?', 'The warm u symbols are up quarks; the violet d symbol is a down quark. Names and letters carry the identity, so color is not required. The solids are visual symbols, not measured particle shapes or visible QCD color.', 'Quarks and electrons are elementary within current evidence. This study does not invent smaller parts inside them. Ordinary matter is the opening scope, not the whole Standard Model.'],
  proton: ['What is being assembled?', 'This is a representation of a proton’s valence composition: u + u + d. The connecting strands symbolize gluon-mediated strong interaction, not literal strings or a force you switch on.', 'A proton also has essential gluon and quark–antiquark dynamics. This is a simplified relationship model, not a QCD simulation, a physical proton-manufacturing recipe or free isolated quarks. A neutron has the different valence composition u + d + d.'],
  electron: ['A different starting ingredient', 'The electron is a lepton. It is not built from quarks or produced by assembling the proton. Gluons mediate strong interaction; electromagnetic interaction binds the electron to a nucleus.', 'The separate symbols introduce the ingredients. Their shapes, separation and relative sizes are illustrative.'],
  atom: ['One electron, many possible positions', 'The cloud samples the stationary hydrogen-1 ground-state probability density. It represents one electron’s distribution, not thousands of electrons, an orbit or measured tracks.', 'The nucleus here contains one proton and zero neutrons. The composition reveal is a model transition, not a simulated capture reaction. The nucleus is enlarged for readability.'],
  routes: ['The shared construction path', 'Quarks + gluons → proton. A separately introduced electron + proton → hydrogen-1. Other nuclei, atoms, chemical bonds and materials extend the foundation; they are not completed by watching this opening.', 'Electronics needs devices and manufacturing. Living systems need chemistry, membranes, energy and reviewed biological function. Mechanisms need materials and constraints. AI additionally needs algorithms, data, training or inference and evaluation.', 'Only the separate circuit preview is playable here. Other paths are visible directions for future work, not completed Courses.'],
  circuit: ['A circuit, at a different scale', 'This is a deliberate cut to manufactured components, not a continuous hydrogen-to-phone transformation. The four parts and copper connections form one series loop. Assembly preview is reversible; confirming its endpoint enables operation.', 'The model uses an ideal 3.0 V supply, 220 Ω resistor and a red LED with a fixed 2.0 V forward drop. Closed-loop current is (3.0 − 2.0) / 220 ≈ 4.55 mA. The open switch gives 0 mA.', 'Real LEDs have a nonlinear current–voltage curve and batteries have internal resistance. This bounded DC model is not a component-specific prediction or a complete electronics Course. No Course prerequisites are awarded.'],
  operate: ['A loop with a consequence', 'The current readout and LED state come from the circuit model, not an animation timer. The LED is correctly oriented in the series loop with a current-limiting resistor.', 'Tap Power, Limit, Light or Contact to inspect a role. Sweep the scene for manual camera control, then use Return to journey. Explanations can be reopened at any time.']
};
const parts = {
  battery: ['Power · 3.0 V', 'Two illustrative 1.5 V cells supply a potential difference. The holder connects them in series. Its two terminals connect into the loop.'],
  resistor: ['Limit · 220 Ω', 'This resistor limits the closed-loop current. In the simplified model, the remaining 1.0 V across 220 Ω gives about 4.55 mA. The bands indicate 220 Ω with ±5% tolerance; the model uses the nominal value.'],
  led: ['Light · a red LED', 'Current enters the anode (A) and leaves the cathode (K). The fixed-drop study model uses 2.0 V across the LED. Light appears only when the correctly connected loop is complete and the switch is closed.'],
  switch: ['Contact · open or closed', 'The hinged contact makes or breaks the path. Open means 0 mA. Closing this contact completes the circuit; it does not create energy or bypass the resistor.']
};

try {
  const view = new JourneyRenderer($('viewport'), $('scene-labels'));
  const director = new CameraDirector(view.shot('welcome'), motion.matches);
  function announce(text) { $('announcement').textContent = text; }
  function explain(lines = extra[beat], action = null) {
    clock.stop(); $('details-title').textContent = lines[0]; $('details-copy').replaceChildren();
    for (const line of lines.slice(1)) { const p = document.createElement('p'); p.textContent = line; $('details-copy').append(p); }
    $('details-action').hidden = !action;
    if (action) { $('details-action').textContent = action.label; $('details-action').onclick = () => { $('details').close(); action.run(); }; }
    $('details').showModal();
  }
  function revealCaption() { captionTime = 0; $('caption').classList.remove('quiet'); $('recall').hidden = true; }
  function setBeat(next) {
    if (!BEATS.includes(next)) return;
    if (next === 'atom' && !progress.protonModel) next = 'proton';
    beat = next; document.body.dataset.beat = beat; closed = false; focus = null; pointer = null;
    const script = scripts[beat];
    $('chapter').textContent = script[0]; $('title').textContent = script[1]; $('description').textContent = script[2];
    $('hint').textContent = script[4]; $('track').firstElementChild.style.width = `${BEATS.indexOf(beat) / 7 * 100}%`;
    const assembly = ['proton', 'atom', 'circuit'].includes(beat);
    clock.reset(beat === 'operate' ? 1 : 0); previousValue = -1;
    $('assembly').hidden = !assembly; $('reading').hidden = beat !== 'operate';
    $('focus-tools').hidden = beat !== 'operate'; $('route-list').hidden = beat !== 'routes'; $('branch-root').hidden = beat !== 'routes';
    $('paths').hidden = beat === 'welcome'; $('paths').textContent = beat === 'routes' ? 'Replay ↺' : 'Paths ↗'; $('return-camera').hidden = true;
    view.setBeat(beat); director.travel(view.shot(beat)); revealCaption(); refresh();
    announce(`${script[1].replace('\n', ' ')} ${script[2]}`);
  }
  function refresh() {
    let label = scripts[beat][3];
    if (beat === 'welcome' && (progress.protonModel || progress.hydrogenModel)) label = 'Continue the journey ↗';
    if (['proton', 'atom', 'circuit'].includes(beat)) {
      const value = Math.round(clock.value * 100); $('scrub').value = String(value); $('preview-value').value = `${value}%`;
      if (clock.running) label = 'Finish the preview →';
      else if (clock.value === 1) label = beat === 'proton' ? 'Keep this proton model →' : beat === 'atom' ? 'Keep this atomic model →' : 'Connect the loop →';
      else if (clock.value > 0) label = 'Continue the assembly →';
    }
    if (beat === 'operate') {
      label = closed ? 'Open the switch' : 'Close the switch';
      const circuit = circuitAt(clock.value, closed);
      $('reading').textContent = `${closed ? 'Closed loop' : 'Open loop'} · ${(circuit.current * 1000).toFixed(2)} mA · LED ${circuit.lit ? 'on' : 'off'}`;
      $('primary').setAttribute('aria-pressed', String(closed));
    } else $('primary').removeAttribute('aria-pressed');
    $('primary').textContent = label;
  }
  function persist(kind) {
    progress = commitModel(progress, kind, clock.value);
    if (!saveProgress(storage, progress)) announce('This model is complete, but progress could not be saved on this device.');
  }
  $('primary').onclick = () => {
    feedback.play('touch', 'select');
    if (beat === 'welcome') return setBeat(progress.hydrogenModel ? 'routes' : progress.protonModel ? 'electron' : 'quarks');
    if (beat === 'quarks') return setBeat('proton');
    if (beat === 'electron') return setBeat('atom');
    if (['proton', 'atom', 'circuit'].includes(beat)) {
      if (clock.value < 1) {
        if (clock.running || motion.matches) clock.scrub(1); else clock.start();
        revealCaption(); refresh(); return;
      }
      if (beat === 'proton') { persist('proton'); feedback.play('bind'); return setBeat('electron'); }
      if (beat === 'atom') { persist('atom'); feedback.play('complete'); return setBeat('routes'); }
      return setBeat('operate');
    }
    if (beat === 'operate') { closed = !closed; feedback.play(closed ? 'bind' : 'return'); refresh(); }
  };
  $('scrub').addEventListener('input', event => { clock.scrub(Number(event.target.value) / 100); refresh(); });
  $('scrub').addEventListener('pointerdown', () => clock.stop());
  $('brand').onclick = () => setBeat('welcome'); $('paths').onclick = () => setBeat(beat === 'routes' ? 'quarks' : 'routes');
  $('recall').onclick = () => { revealCaption(); explain(); };
  $('hint').onclick = () => explain(focus ? parts[focus] : extra[beat]);
  $('details-close').onclick = () => $('details').close();
  $('details').addEventListener('close', () => { last = performance.now(); revealCaption(); });
  $('return-camera').onclick = () => { director.returnHome(); focus = null; $('return-camera').hidden = true; revealCaption(); };
  function inspectPart(key) {
    if (beat !== 'operate' || !parts[key]) return;
    focus = key; director.travel(view.focusShot(key), { home: false, duration: 2.2 });
    $('return-camera').hidden = false;
    $('chapter').textContent = 'EXPLORE / CIRCUIT'; $('title').textContent = parts[key][0]; $('description').textContent = parts[key][1];
    revealCaption(); announce(parts[key].join('. ')); feedback.play('touch', 'select');
  }
  $('return-camera').addEventListener('click', () => { const s = scripts[beat]; $('chapter').textContent = s[0]; $('title').textContent = s[1]; $('description').textContent = s[2]; });
  for (const button of document.querySelectorAll('[data-focus]')) button.onclick = () => inspectPart(button.dataset.focus);
  for (const button of document.querySelectorAll('[data-route]')) button.onclick = () => {
    const route = button.dataset.route;
    if (route === 'electronics') return explain(['Electronics · circuit preview', 'You are moving to a separate study with manufactured components. The materials, semiconductor and manufacturing constructions between atoms and this board are still to come.', 'This preview lets you assemble and operate a series loop. It grants no completed Course prerequisites.'], { label: 'Enter the circuit ↗', run: () => setBeat('circuit') });
    const descriptions = {
      biology: ['Living systems', 'Build toward chemical bonds, molecular structures, membranes, energy exchange and cells. A membrane’s selective exchange is one possible future functional study. This path is not playable yet.'],
      mechanisms: ['Mechanisms', 'Build toward materials, constrained motion, shafts, engines and satellites. A rotating shaft with a visible load is one possible future study. This path is not playable yet.'],
      computing: ['Computing & AI', 'Build toward semiconductors and circuits, then computation, algorithms, data, training or inference and evaluation. Hardware alone is not an AI system. This path is not playable yet.']
    };
    explain(descriptions[route]);
  };
  const canvas = view.webgl.domElement;
  canvas.addEventListener('pointerdown', event => {
    if (pointer || event.button > 0) return;
    clock.stop(); pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, dragged: false };
    canvas.setPointerCapture(event.pointerId);
    // A touch claims camera ownership immediately. No authored writer continues underneath it.
    director.inspect(); $('return-camera').hidden = false;
  });
  canvas.addEventListener('pointermove', event => {
    if (pointer?.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) > 5) pointer.dragged = true;
    if (pointer.dragged) director.inspect(event.clientX - pointer.x, event.clientY - pointer.y);
    pointer.x = event.clientX; pointer.y = event.clientY;
  });
  function finishPointer(event, cancelled = false) {
    if (pointer?.id !== event.pointerId) return;
    const p = pointer; pointer = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (!cancelled && !p.dragged) { const key = view.pick(event.clientX, event.clientY); if (key) inspectPart(key); }
    refresh();
  }
  canvas.addEventListener('pointerup', event => finishPointer(event));
  canvas.addEventListener('pointercancel', event => finishPointer(event, true));
  canvas.addEventListener('lostpointercapture', event => { if (pointer?.id === event.pointerId) pointer = null; });
  function visibility(visible) { active = visible && !document.hidden; if (!active) { clock.stop(); pointer = null; feedback.stop(); } last = performance.now(); refresh(); }
  document.addEventListener('visibilitychange', () => visibility(!document.hidden));
  window.addEventListener('machines:visibility', event => visibility(event.detail === true));
  window.addEventListener('resize', () => { view.resize(); director.home = view.shot(beat); if (director.mode !== 'inspect' && !focus) director.returnHome(); });
  motion.addEventListener('change', () => { director.reduced = motion.matches; if (motion.matches) director.returnHome(); });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); active = false; $('failure').hidden = false; });
  setBeat('welcome');
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(.05, Math.max(0, (now - last) / 1000)); last = now;
    if (!active || $('details').open) return;
    clock.tick(dt); director.tick(dt);
    const value = Math.round(clock.value * 100);
    if (value !== previousValue || previousRunning !== clock.running) { refresh(); previousValue = value; previousRunning = clock.running; }
    captionTime += dt;
    if (captionTime > 14 && !['welcome', 'routes'].includes(beat)) { $('caption').classList.add('quiet'); $('recall').hidden = false; }
    $('return-camera').hidden = director.mode !== 'inspect' && !focus;
    const circuit = circuitAt(clock.value, closed);
    view.update({ preview: clock.value, closed, current: circuit.current, dt, reduced: motion.matches }, director);
  }
  requestAnimationFrame(frame);
} catch (error) {
  console.error('Rosenblatt journey could not initialize', error); $('failure').hidden = false;
}
