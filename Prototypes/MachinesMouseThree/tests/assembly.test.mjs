import test from 'node:test';
import assert from 'node:assert/strict';
import { Assembly, PARTS, partForMesh } from '../assembly.js';
import { createMouse } from '../model.js';

test('an empty assembly rejects floating internals and premature closure without mutation',()=>{
  const state=new Assembly();
  assert.equal(state.count,0);
  for(const part of PARTS.filter(p=>p.id!=='base')) assert.equal(state.place(part.id),false,part.id);
  assert.equal(state.count,0);
  assert.equal(state.place('base'),true);
  assert.equal(state.place('base'),false);
  assert.equal(state.place('pcb'),false);
  assert.equal(state.place('optics'),true);
  assert.equal(state.place('pcb'),true);
  assert.equal(state.place('shell'),false);
  assert.equal(state.count,3);
});
test('independent choices can be reordered; reverse assembly and reset preserve invariants',()=>{
  const state=new Assembly();
  for(const id of ['base','optics','pcb','cable','right-switch','electronics','sensor','wheel-support','wheel','left-switch','screws','shell','right-button','left-button']) assert.ok(state.place(id),id);
  assert.ok(state.complete);
  for(let i=14;i>0;i--){assert.equal(state.count,i);assert.ok(state.undo());for(const id of state.installed)assert.deepEqual(state.missing(id),[]);}
  assert.equal(state.undo(),null);
  state.place('base');state.reset();assert.equal(state.count,0);assert.ok(state.canPlace('base'));
});
test('every rendered mesh belongs to one nonempty group, and full assembly restores all geometry',()=>{
  const mouse=createMouse();const counts=new Map(PARTS.map(p=>[p.id,0]));let total=0;
  mouse.group.traverse(object=>{if(object.isMesh){const id=partForMesh(object.name);assert.ok(counts.has(id),object.name);counts.set(id,counts.get(id)+1);total++;}});
  assert.equal(total,220);
  for(const [id,count]of counts)assert.ok(count>0,id);
  assert.throws(()=>partForMesh('Machines.mouse.unassigned'),/Unassigned/);
  for(const part of PARTS)for(const dep of part.requires)assert.ok(PARTS.some(p=>p.id===dep));
});
