// Authored educational states, not a cosmological or nuclear physics solver.
export const STORAGE_KEY = 'machines.origin.v2';
const TYPES = ['proton', 'neutron', 'proton', 'neutron'];
export class OriginState {
  constructor(saved) {
    this.expansion = 0;
    this.parts = 0;
    this.running = false;
    if (saved?.version === 1 && Number.isFinite(saved.expansion) &&
        saved.expansion >= 0 && saved.expansion <= 1 &&
        Number.isInteger(saved.parts) && saved.parts >= 0 && saved.parts <= 4 &&
        (saved.parts === 0 || saved.expansion === 1)) {
      this.expansion = saved.expansion;
      this.parts = saved.parts;
    }
  }
  get phase() { return this.expansion < .5 ? 'expansion' : this.expansion < 1 ? 'cooling' : this.parts < 4 ? 'nucleus' : 'complete'; }
  get expected() { return TYPES[this.parts] ?? null; }
  advance(delta) {
    if (!this.running || !['expansion', 'cooling'].includes(this.phase) || !Number.isFinite(delta) || delta <= 0) return false;
    const boundary = this.expansion < .5 ? .5 : 1;
    this.expansion = Math.min(boundary, this.expansion + Math.min(delta, 0.05));
    if (this.expansion === boundary) this.running = false;
    return true;
  }
  place(type) {
    if (this.phase !== 'nucleus' || type !== this.expected) return false;
    this.parts += 1;
    return true;
  }
  snapshot() { return { version: 1, expansion: this.expansion, parts: this.parts }; }
}
