// Composition authority for the isolated visual model, not a reaction solver.
export const STORAGE_KEY = 'machines.constituents.v2';
export const LEGACY_STORAGE_KEY = 'machines.constituents.v1';
export const SEQUENCES = Object.freeze({
  proton: Object.freeze(['up', 'up', 'down', 'field']),
  hydrogen: Object.freeze(['electron']),
  neutron: Object.freeze(['up', 'down', 'down', 'field']),
});
export const CHARGE_THIRDS = Object.freeze({ up: 2, down: -1, electron: -3, field: 0 });
const paths = Object.keys(SEQUENCES);
export class Construction {
  constructor(saved) {
    this.path = 'proton'; this.counts = { proton: 0, hydrogen: 0, neutron: 0 };
    if (!Construction.valid(saved)) return;
    this.path = saved.path;
    if (saved.version === 2) this.counts = { ...saved.counts };
    else {
      for (const path of paths) this.counts[path] = saved.completed[path] ? SEQUENCES[path].length : 0;
      this.counts[saved.path] = saved.count;
    }
  }
  static valid(s) {
    if (!s || !Object.hasOwn(SEQUENCES, s.path)) return false;
    if (s.version === 1) {
      const c = s.completed;
      if (!c || paths.some(k => typeof c[k] !== 'boolean') || !Number.isInteger(s.count)) return false;
      if ((c.hydrogen || c.neutron || s.path !== 'proton') && !c.proton) return false;
      return s.count >= 0 && s.count <= SEQUENCES[s.path].length && c[s.path] === (s.count === SEQUENCES[s.path].length);
    }
    if (s.version !== 2 || !s.counts || paths.some(k => !Number.isInteger(s.counts[k]) || s.counts[k] < 0 || s.counts[k] > SEQUENCES[k].length)) return false;
    return !(s.path === 'hydrogen' || s.counts.hydrogen > 0) || s.counts.proton === SEQUENCES.proton.length;
  }
  get count() { return this.counts[this.path]; }
  get completed() { return Object.fromEntries(paths.map(k => [k, this.counts[k] === SEQUENCES[k].length])); }
  get done() { return this.count === SEQUENCES[this.path].length; }
  get expected() { return SEQUENCES[this.path][this.count] ?? null; }
  get chargeThirds() {
    return (this.path === 'hydrogen' ? 3 : 0) + SEQUENCES[this.path].slice(0, this.count).reduce((sum, k) => sum + CHARGE_THIRDS[k], 0);
  }
  place(kind, onTarget) {
    if (this.done || onTarget !== true || kind !== this.expected) return false;
    this.counts[this.path] += 1; return true;
  }
  available(path) { return Object.hasOwn(SEQUENCES, path) && (path !== 'hydrogen' || this.completed.proton); }
  select(path) {
    if (!this.available(path) || path === this.path) return false;
    this.path = path; return true;
  }
  snapshot() { return { version: 2, path: this.path, counts: { ...this.counts } }; }
}
