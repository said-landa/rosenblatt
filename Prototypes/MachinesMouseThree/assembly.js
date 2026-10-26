// Bounded, schematic assembly proposal. Not a manufacturing or soldering sequence.
export const PARTS = [
  { id: 'base', label: 'Base', requires: [] },
  { id: 'optics', label: 'Lente y guía', requires: ['base'] },
  { id: 'pcb', label: 'Placa', requires: ['optics'] },
  { id: 'sensor', label: 'Sensor y luz', requires: ['pcb'] },
  { id: 'electronics', label: 'Electrónica', requires: ['pcb'] },
  { id: 'left-switch', label: 'Interruptor izquierdo', requires: ['pcb'] },
  { id: 'right-switch', label: 'Interruptor derecho', requires: ['pcb'] },
  { id: 'wheel-support', label: 'Soporte de rueda', requires: ['pcb'] },
  { id: 'wheel', label: 'Rueda', requires: ['wheel-support'] },
  { id: 'cable', label: 'Cable USB', requires: ['pcb'] },
  { id: 'screws', label: 'Tornillos', requires: ['pcb'] },
  { id: 'shell', label: 'Carcasa', requires: ['sensor', 'electronics', 'left-switch', 'right-switch', 'wheel', 'cable', 'screws'] },
  { id: 'left-button', label: 'Botón izquierdo', requires: ['shell'] },
  { id: 'right-button', label: 'Botón derecho', requires: ['shell'] },
];

export function partForMesh(name) {
  const n = name.replace('Machines.mouse.', '');
  if (/^(base|glide\.|standoff\.)/.test(n)) return 'base';
  if (/^(optical-housing|optical-lens|light-guide)$/.test(n)) return 'optics';
  if (/^(pcb-screw\.)/.test(n)) return 'screws';
  if (/^(pcb$|mount-pad\.|trace\.|via\.|switch-trace\.)/.test(n)) return 'pcb';
  if (/^(optical-sensor|led-seat|illumination-led)/.test(n)) return 'sensor';
  if (/^(controller|capacitor|crystal|smd)/.test(n)) return 'electronics';
  if (/^(primary-switch|switch-pin)/.test(n)) return n.includes('.-1') ? 'left-switch' : 'right-switch';
  if (/^(wheel-encoder|wheel-support|middle-switch)/.test(n)) return 'wheel-support';
  if (/^wheel-/.test(n)) return 'wheel';
  if (/^(cable-|strain-relief|usb-)/.test(n)) return 'cable';
  if (n === 'left-button' || n === 'right-button') return n;
  if (/^(palm-shell|front-bridge|rear-bridge)$/.test(n)) return 'shell';
  throw new Error(`Unassigned Machines assembly mesh: ${name}`);
}

export class Assembly {
  #history = [];
  get installed() { return new Set(this.#history); }
  get count() { return this.#history.length; }
  get complete() { return this.count === PARTS.length; }
  missing(id) {
    const part = PARTS.find(p => p.id === id);
    if (!part) throw new Error(`Unknown Machines part: ${id}`);
    return part.requires.filter(required => !this.#history.includes(required));
  }
  canPlace(id) { return !this.#history.includes(id) && this.missing(id).length === 0; }
  place(id) {
    if (!this.canPlace(id)) return false;
    this.#history.push(id);
    return true;
  }
  undo() { return this.#history.pop() ?? null; }
  reset() { this.#history = []; }
}
