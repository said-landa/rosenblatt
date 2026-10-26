import test from 'node:test';
import assert from 'node:assert/strict';
import {CourseProgress} from '../Experiments/MouseLab/Source/course-state.js';
test('course rejects skipped lessons and unfinished or duplicate placement',()=>{
 const p=new CourseProgress();
 assert.equal(p.completedLessons(),0);
 assert.equal(p.completeLesson('optics',0),false);
 assert.equal(p.completeLesson('base',1),false);
 assert.equal(p.install('base'),false);
 for(let i=0;i<3;i++)assert.equal(p.completeLesson('base',i,'2026-09-30'),true);
 assert.equal(p.completeLesson('base',2),false);
 assert.equal(p.available('optics'),false);
 assert.equal(p.install('base','2026-09-30'),true);
 assert.equal(p.install('base'),false);
 assert.equal(p.completedLessons(),4);
 assert.equal(p.available('optics'),true);
});
test('restore keeps coherent progress and rejects downstream fabrication',()=>{
 const p=new CourseProgress({counts:{base:3,optics:3,pcb:4},installed:['pcb']});
 assert.equal(p.counts.base,3);assert.equal(p.counts.optics,0);assert.equal(p.assembly.count,0);
 p.install('base');p.completeLesson('optics',0);
 const restored=new CourseProgress(JSON.parse(JSON.stringify(p.serialize())));
 assert.equal(restored.counts.optics,1);
 assert.deepEqual([...restored.assembly.installed],['base']);
});
test('local streak counts distinct days and expires after a missed day',()=>{
 const p=new CourseProgress();
 p.recordDay('2026-09-28');p.recordDay('2026-09-29');p.recordDay('2026-09-29');
 assert.equal(p.streak('2026-09-30'),2);
 p.recordDay('2026-09-30');assert.equal(p.streak('2026-09-30'),3);
 assert.equal(p.streak('2026-10-02'),0);
});
