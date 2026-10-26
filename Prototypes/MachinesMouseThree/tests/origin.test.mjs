import test from 'node:test';
import assert from 'node:assert/strict';
import { OriginState } from '../Experiments/Origin/Source/state.js';
test('each scientific checkpoint requires another deliberate action',()=>{
 const s=new OriginState();assert.equal(s.phase,'beginning');assert.equal(s.advance(.05),false);
 for(const phase of ['expansion','cooling','complete']){assert.equal(s.start(),true);for(let i=0;i<100;i++)s.advance(.05);assert.equal(s.phase,phase);assert.equal(s.running,false);assert.equal(s.progress,0);assert.equal(s.advance(.05),false);}
 assert.equal(s.start(),false);
});
test('pause and restoration preserve valid progress without auto playback',()=>{
 const s=new OriginState();s.start();s.advance(.04);s.pause();const before=s.snapshot();
 for(const delta of [1,NaN,-1,.02])assert.equal(s.advance(delta),false);assert.deepEqual(s.snapshot(),before);
 const restored=new OriginState(before);assert.deepEqual(restored.snapshot(),before);assert.equal(restored.running,false);
});
test('corrupt and previous-version progress cannot skip the revised opening',()=>{
 for(const saved of [{version:1,expansion:1,parts:4},{version:3,stage:3,progress:.4},{version:3,stage:7,progress:0},{version:3,stage:1,progress:1},{version:3,stage:NaN,progress:0}])assert.deepEqual(new OriginState(saved).snapshot(),{version:3,stage:0,progress:0});
 const s=new OriginState();s.start();for(const delta of [NaN,-1,0])assert.equal(s.advance(delta),false);s.advance(100);assert.equal(s.progress,.05);
});
