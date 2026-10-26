import test from 'node:test';
import assert from 'node:assert/strict';
import {JOURNEYS,JOURNEY_BY_ID,Journey,deepPartForMesh} from '../Experiments/MouseLab/Source/deep-dive.js';
import {Assembly,partForMesh} from '../Experiments/MouseLab/Source/assembly.js';
import {createMouse} from '../Experiments/MouseLab/Source/model.js';

test('Lab journeys preserve general assembly order and independent progress',()=>{
  assert.deepEqual(JOURNEYS.map(journey=>journey.id),['base','optics','pcb']);
  const base=new Journey(JOURNEY_BY_ID.get('base'));
  const optics=new Journey(JOURNEY_BY_ID.get('optics'));
  const assembly=new Assembly();
  while(!base.complete)assert.ok(base.add());
  assert.equal(optics.count,0);assert.equal(assembly.count,0);
  assert.ok(assembly.place('base'));assert.ok(assembly.place('optics'));
  base.reset();assert.equal(assembly.count,2);assert.equal(optics.count,0);
});

test('Lab optics maps each existing mesh to one of three subparts',()=>{
  const counts={housing:0,'imaging-lens':0,'light-guide':0};
  createMouse().group.traverse(object=>{
    if(object.isMesh&&partForMesh(object.name)==='optics')counts[deepPartForMesh('optics',object.name)]++;
  });
  assert.deepEqual(counts,{housing:1,'imaging-lens':1,'light-guide':1});
});

test('Lab board maps every existing mesh to four visible families',()=>{
  const counts={substrate:0,'mount-pads':0,traces:0,vias:0};
  createMouse().group.traverse(object=>{
    if(object.isMesh&&partForMesh(object.name)==='pcb')counts[deepPartForMesh('pcb',object.name)]++;
  });
  assert.deepEqual(counts,{substrate:2,'mount-pads':4,traces:16,vias:14});
});
