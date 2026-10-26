// B100 photograph-led visual families; dimensions remain estimates.
// Educational grouping does not assert a manufacturing sequence.
export const JOURNEYS = [
  {
    id: 'base', label: 'Base', buildLabel: 'CONSTRUYE LA BASE', heading: ['La base', 'por dentro.'],
    completeTitle: 'Una base que se desliza',
    completeText: 'Cuatro patines apoyan el mouse en la mesa. En el interior, las nervaduras y pestañas sostienen la placa; la abertura deja pasar la luz.',
    parts: [
      {id:'body',shortLabel:'Cuerpo',label:'Cuerpo de la base',text:'Una pieza moldeada: borde, nervaduras, apoyos de la placa y alojamiento del tornillo. La abertura central deja pasar la luz hacia la mesa.'},
      {id:'front-foot',shortLabel:'Patines delanteros',label:'Patines delanteros',text:'Estos dos patines están cerca de la salida del cable. Separan el plástico de la mesa y facilitan el deslizamiento.'},
      {id:'rear-foot',shortLabel:'Patines traseros',label:'Patines traseros',text:'El segundo par completa los cuatro apoyos. Entre ellos queda accesible el tornillo que cierra la carcasa.'},
    ],
    demo: {eyebrow:'PRUEBA EL MOVIMIENTO',label:'Desliza la base sobre la mesa',play:'Ver deslizar',note:'Los patines se resaltan en verde. Movimiento ilustrativo, sin cálculo de fricción.'},
    separateLabel: 'Separar patines',
    evidence: 'Logitech B100 M-U0026, iFixit 173556: cuatro patines, tornillo trasero, abertura óptica y apoyos moldeados. Dimensiones, espesores y detalles internos estimados a partir de fotografías; no es CAD medido.',
  },
  {
    id: 'optics', label: 'Lente y guía', buildLabel: 'CONSTRUYE LA ÓPTICA', heading: ['Lente y guía', 'por dentro.'],
    completeTitle: 'Iluminar y observar',
    completeText: 'La guía dirige luz hacia la mesa; la lente recoge el patrón reflejado y lo conduce hacia el sensor.',
    parts: [
      {id:'housing',shortLabel:'Marco',label:'Marco óptico',text:'Mantiene alineados los elementos ópticos y limita la luz que entra fuera de la ruta prevista.'},
      {id:'imaging-lens',shortLabel:'Lente',label:'Lente de imagen',text:'Recoge el patrón de luz reflejado por la superficie y lo enfoca hacia el sensor.'},
      {id:'light-guide',shortLabel:'Guía',label:'Guía de iluminación',text:'Conduce la iluminación desde la fuente de luz hacia la superficie bajo el mouse.'},
    ],
    demo: {eyebrow:'SIGUE LA LUZ',label:'Ruta óptica simplificada',play:'Ver ruta de luz',note:'La ruta muestra iluminación y retorno como funciones distintas; no calcula rayos, ángulos ni intensidad.'},
    separateLabel: 'Separar óptica',
    evidence: 'La separación sigue la geometría visible del prototipo. En productos reales, lente, guía y rasgos de alineación pueden integrarse en una sola pieza moldeada; la fuente de luz puede ser discreta o integrada.',
  },
  {
    id: 'pcb', label: 'Placa', buildLabel: 'CONSTRUYE LA PLACA', heading: ['La placa', 'por dentro.'],
    completeTitle: 'Una ruta sobre la placa',
    completeText: 'El cuerpo sostiene el circuito; pads, pistas y vías crean puntos de unión y rutas conductoras entre zonas.',
    parts: [
      {id:'substrate',shortLabel:'Cuerpo',label:'Cuerpo de la placa',text:'Es el soporte rígido del circuito. La cara superior es amarilla y la inferior tiene un recubrimiento verde.'},
      {id:'mount-pads',shortLabel:'Pads',label:'Puntos de soldadura',text:'Estos puntos unen las terminales de los componentes con el circuito, en la cara inferior de la placa.'},
      {id:'traces',shortLabel:'Pistas',label:'Pistas de cobre',text:'Son rutas conductoras sobre la placa. Aquí representan recorridos visibles, no conexiones eléctricas verificadas.'},
      {id:'vias',shortLabel:'Vías',label:'Orificios de conexión',text:'Los componentes insertados atraviesan la placa y se sueldan por debajo. Estos puntos son una representación simplificada.'},
    ],
    demo: {eyebrow:'SIGUE UNA SEÑAL',label:'Ruta conductora representativa',play:'Ver señal',note:'Pulso ilustrativo sobre una pista y una vía. No representa corriente calculada, temporización ni un netlist real.'},
    separateLabel: 'Separar capas',
    evidence: 'La forma y las caras se basan en iFixit 173556, Mouton Pixart USB Rev.003. Las pistas y los puntos de soldadura son representativos: no reproducen el netlist ni todos los puntos de la fotografía.',
  },
];

export const JOURNEY_BY_ID = new Map(JOURNEYS.map(journey => [journey.id, journey]));
export const BASE_PARTS = JOURNEY_BY_ID.get('base').parts;

export function deepPartForMesh(journeyId, name) {
  const n = name.replace('Machines.mouse.', '');
  if (journeyId === 'base') {
    if (n === 'base' || n.startsWith('base-') || n.startsWith('standoff.')) return 'body';
    if (n.startsWith('glide.front.')) return 'front-foot';
    if (n.startsWith('glide.rear.')) return 'rear-foot';
  }
  if (journeyId === 'optics') {
    if (n === 'optical-housing') return 'housing';
    if (n === 'optical-lens') return 'imaging-lens';
    if (n === 'light-guide') return 'light-guide';
  }
  if (journeyId === 'pcb') {
    if (n === 'pcb' || n === 'pcb-underside') return 'substrate';
    if (n.startsWith('mount-pad.')) return 'mount-pads';
    if (n.startsWith('trace.') || n.startsWith('switch-trace.')) return 'traces';
    if (n.startsWith('via.')) return 'vias';
  }
  throw new Error(`Unknown Machines ${journeyId} subpart: ${name}`);
}

export function basePartForMesh(name) { return deepPartForMesh('base', name); }

export class Journey {
  #count = 0;
  constructor(spec) {
    if (!spec?.parts?.length) throw new Error('A Machines journey requires parts.');
    this.spec = spec;
  }
  get count() { return this.#count; }
  get complete() { return this.#count === this.spec.parts.length; }
  get next() { return this.spec.parts[this.#count] ?? null; }
  add() { if (this.complete) return false; this.#count++; return true; }
  undo() { if (!this.#count) return false; this.#count--; return true; }
  reset() { this.#count = 0; }
}

export class BaseJourney extends Journey {
  constructor() { super(JOURNEY_BY_ID.get('base')); }
}
