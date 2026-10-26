import test from 'node:test';
import assert from 'node:assert/strict';
import { createMouse } from '../Experiments/MouseLab/Source/model.js';
import { PARTS, partForMesh } from '../Experiments/MouseLab/Source/assembly.js';
import { deepPartForMesh } from '../Experiments/MouseLab/Source/deep-dive.js';

test('B100 geometry stays assigned and has four feet, one closure screw and two wheel springs', () => {
  const names=[], groups=new Map(PARTS.map(part=>[part.id,0]));
  const feet={ 'front-foot':0,'rear-foot':0 };
  createMouse().group.traverse(object=>{
    if(!object.isMesh)return;
    names.push(object.name);
    const id=partForMesh(object.name);groups.set(id,groups.get(id)+1);
    if(id==='base'){
      const family=deepPartForMesh('base',object.name);
      if(family!=='body')feet[family]++;
    }
    const positions=object.geometry.getAttribute('position');
    for(const value of positions.array)assert.ok(Number.isFinite(value));
  });
  assert.deepEqual(feet,{'front-foot':2,'rear-foot':2});
  assert.equal(names.filter(name=>name.endsWith('.head')&&name.includes('pcb-screw')).length,1);
  assert.equal(names.filter(name=>name.includes('wheel-support-')&&name.endsWith('spring')).length,2);
  for(const [id,count] of groups)assert.ok(count>0,`${id} has no visible geometry`);
  assert.equal(names.filter(name=>/controller(\.|$)/.test(name)).length,0);
});
