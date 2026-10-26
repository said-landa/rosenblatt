import test from 'node:test';
import assert from 'node:assert/strict';
import {BaseJourney,BASE_PARTS,basePartForMesh} from '../deep-dive.js';
import {Assembly,partForMesh} from '../assembly.js';
import {createMouse} from '../model.js';
test('base journey builds three separable groups; undo/reset cannot mutate the parent assembly',()=>{
 const journey=new BaseJourney(),parent=new Assembly();assert.equal(journey.count,0);
 for(const id of ['body','front-foot','rear-foot']){assert.equal(journey.next.id,id);assert.ok(journey.add());}
 assert.ok(journey.complete);assert.equal(journey.add(),false);assert.equal(parent.count,0);
 assert.ok(parent.place('base'));assert.equal(parent.place('base'),false);
 journey.undo();assert.equal(journey.complete,false);assert.equal(parent.count,1);
 journey.reset();assert.equal(journey.count,0);assert.equal(parent.count,1);assert.equal(journey.undo(),false);
});
test('every base mesh is accounted for and integrated supports stay in the body',()=>{
 const counts=Object.fromEntries(BASE_PARTS.map(p=>[p.id,0]));
 createMouse().group.traverse(o=>{if(o.isMesh&&partForMesh(o.name)==='base'){const id=basePartForMesh(o.name);counts[id]++;if(o.name.includes('standoff')||o.name.includes('rim'))assert.equal(id,'body');}});
 assert.deepEqual(counts,{body:6,'front-foot':1,'rear-foot':1});
 assert.throws(()=>basePartForMesh('Machines.mouse.pcb'),/Unknown/);
});
