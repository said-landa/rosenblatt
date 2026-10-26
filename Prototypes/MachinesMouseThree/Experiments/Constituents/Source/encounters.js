// Prerequisite inspection is independent of committed composition progress.
export const ENCOUNTER_KEY = 'machines.constituents.encounters.v1';
export const ENCOUNTERS = Object.freeze([
  Object.freeze({ id: 'up', title: 'Up quark', meaning: 'Charge +⅔', boundary: 'Quark symbol · confined in nature' }),
  Object.freeze({ id: 'down', title: 'Down quark', meaning: 'Charge −⅓', boundary: 'Quark symbol · confined in nature' }),
  Object.freeze({ id: 'field', title: 'Gluons', meaning: 'Strong interaction', boundary: 'Illustrative field model' }),
  Object.freeze({ id: 'electron', title: 'Electron', meaning: 'Charge −1', boundary: 'Illustrative particle model' }),
  Object.freeze({ id: 'binding', title: 'Binding', meaning: 'u + u + d → p', boundary: 'Valence composition model' }),
]);
export class Encounters {
  constructor(saved) { this.index = Encounters.valid(saved) ? saved.index : 0; }
  static valid(saved) { return saved?.version === 1 && Number.isInteger(saved.index) && saved.index >= 0 && saved.index <= ENCOUNTERS.length; }
  get done() { return this.index === ENCOUNTERS.length; }
  get current() { return ENCOUNTERS[this.index] ?? null; }
  advance(id) { if (this.done || this.current.id !== id) return false; this.index += 1; return true; }
  snapshot() { return { version: 1, index: this.index }; }
}
