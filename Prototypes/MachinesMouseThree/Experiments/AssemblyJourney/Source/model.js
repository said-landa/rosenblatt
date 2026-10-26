// Rosenblatt-owned study semantics. No renderer, DOM or Course progress authority.
export const STORAGE_KEY = 'rosenblatt.assembly-journey.v1';
export const BEATS = ['welcome', 'quarks', 'proton', 'electron', 'atom', 'routes', 'circuit', 'operate'];
export const CIRCUIT = Object.freeze({ volts: 3, ohms: 220, forwardVolts: 2,
  parts: ['battery', 'resistor', 'led', 'switch'],
  // A directed series loop; LED anode is upstream of its cathode.
  links: [['battery:+', 'resistor:a'], ['resistor:b', 'led:anode'],
    ['led:cathode', 'switch:a'], ['switch:b', 'battery:-']] });
export const clamp = value => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
export const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export function emptyProgress() { return { version: 1, protonModel: false, hydrogenModel: false }; }
export function readProgress(storage) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY));
    if (data?.version !== 1) return emptyProgress();
    return { version: 1, protonModel: data.protonModel === true,
      hydrogenModel: data.protonModel === true && data.hydrogenModel === true };
  } catch { return emptyProgress(); }
}
export function commitModel(progress, kind, preview) {
  if (clamp(preview) !== 1) return progress;
  if (kind === 'proton') return { ...progress, protonModel: true };
  if (kind === 'atom' && progress.protonModel) return { ...progress, hydrogenModel: true };
  return progress;
}
export function saveProgress(storage, progress) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(progress)); return true; } catch { return false; }
}
export function evaluateCircuit({ parts = [], links = [], closed = false, volts = CIRCUIT.volts,
  ohms = CIRCUIT.ohms, forwardVolts = CIRCUIT.forwardVolts } = {}) {
  const complete = CIRCUIT.parts.every(part => parts.includes(part))
    && parts.length === CIRCUIT.parts.length
    && links.length === CIRCUIT.links.length
    && CIRCUIT.links.every(([a, b]) => links.some(([x, y]) => x === a && y === b));
  const validValues = [volts, ohms, forwardVolts].every(Number.isFinite)
    && volts >= 0 && ohms > 0 && forwardVolts >= 0;
  const current = complete && closed && validValues ? Math.max(0, (volts - forwardVolts) / ohms) : 0;
  return { complete, current, lit: current > 0, resistorWatts: current * current * ohms };
}
export function circuitAt(preview, closed) {
  const complete = clamp(preview) === 1;
  return evaluateCircuit({ parts: complete ? CIRCUIT.parts : [], links: complete ? CIRCUIT.links : [], closed });
}
// A cancellable presentation clock. It never writes durable construction state.
export class AssemblyClock {
  value = 0; running = false;
  start() { this.running = this.value < 1; }
  stop() { this.running = false; }
  scrub(value) { this.value = clamp(value); this.stop(); }
  reset(value = 0) { this.scrub(value); }
  tick(seconds) {
    if (this.running) this.value = clamp(this.value + Math.max(0, Math.min(seconds, .05)) / 5);
    if (this.value === 1) this.stop();
    return this.value;
  }
}
