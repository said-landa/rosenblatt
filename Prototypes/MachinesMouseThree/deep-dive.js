// Creator-selected first journey: the base, preserving the general assembly order.
// Molded supports/rim remain features of the body, not fictitious detachable parts.
export const BASE_PARTS = [
  {id:'body',label:'Cuerpo de la base',text:'El cuerpo sostiene los componentes. El borde y los apoyos interiores forman parte de esta misma pieza.'},
  {id:'front-foot',label:'Patín delantero',text:'Este patín es una de las superficies que apoyan sobre la mesa y facilitan el deslizamiento.'},
  {id:'rear-foot',label:'Patín trasero',text:'El segundo patín completa los apoyos. Juntos mantienen el cuerpo separado de la mesa.'},
];
export function basePartForMesh(name){
  const n=name.replace('Machines.mouse.','');
  if(n==='base'||n==='base-rim'||n.startsWith('standoff.'))return 'body';
  if(n==='glide.-3.9')return 'front-foot';
  if(n==='glide.3.85')return 'rear-foot';
  throw new Error(`Unknown Machines base subpart: ${name}`);
}
export class BaseJourney {
  #count=0;
  get count(){return this.#count;}
  get complete(){return this.#count===BASE_PARTS.length;}
  get next(){return BASE_PARTS[this.#count]??null;}
  add(){if(this.complete)return false;this.#count++;return true;}
  undo(){if(!this.#count)return false;this.#count--;return true;}
  reset(){this.#count=0;}
}
