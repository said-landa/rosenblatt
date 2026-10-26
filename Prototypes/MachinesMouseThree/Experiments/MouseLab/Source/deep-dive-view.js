import * as THREE from 'three';
import { PARTS } from './assembly.js';
import { JOURNEYS, JOURNEY_BY_ID, Journey, deepPartForMesh } from './deep-dive.js';

const AVAILABLE = new Set(JOURNEYS.map(journey => journey.id));
const CAMERA = {
  base: {target:[0,.4,0], top:[10,14,-19], bottom:[10,-13,-19]},
  optics: {target:[0,.72,.72], top:[6.5,6.5,-7.5], bottom:[6.5,-5.5,-7.5]},
  pcb: {target:[0,1,-.2], top:[8.5,11.5,-14], bottom:[8.5,-8,-14]},
};
const EXPLODE = {
  base: {'body':[0,0,0],'front-foot':[0,-1.2,-.9],'rear-foot':[0,-1.2,.9]},
  optics: {'housing':[0,1.1,0],'imaging-lens':[-1.35,-.45,0],'light-guide':[1.35,.15,.35]},
  pcb: {'substrate':[0,-.75,0],'mount-pads':[0,.15,0],'traces':[0,.7,0],'vias':[0,1.2,0]},
};

function line(points, color, opacity=.72) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({color,transparent:true,opacity,depthTest:false})
  );
}
function pointAlong(points, value, target) {
  const segments=[];let total=0;
  for(let i=1;i<points.length;i++){const length=points[i-1].distanceTo(points[i]);segments.push(length);total+=length;}
  let distance=((value%1)+1)%1*total;
  for(let i=0;i<segments.length;i++){
    if(distance<=segments[i])return target.lerpVectors(points[i],points[i+1],distance/segments[i]);
    distance-=segments[i];
  }
  return target.copy(points.at(-1));
}
function pulse(color) {
  return new THREE.Mesh(new THREE.SphereGeometry(.095,18,12),new THREE.MeshBasicMaterial({color,depthTest:false}));
}

export function createDeepDive({assemblyView,scene,camera,controls,requestRender}) {
  const roots=new Map(),sectionsByJourney=new Map(),journeys=new Map(),effects=new Map();
  for(const spec of JOURNEYS){
    const root=new THREE.Group();root.name=`Machines.${spec.id}-deep-dive`;root.visible=false;scene.add(root);roots.set(spec.id,root);
    const sections=new Map(spec.parts.map(part=>[part.id,new THREE.Group()]));sections.forEach(group=>root.add(group));sectionsByJourney.set(spec.id,sections);
    const source=assemblyView.copyPart(spec.id);
    for(const object of [...source.children]){
      object.material=object.material.clone();object.castShadow=true;object.receiveShadow=true;
      sections.get(deepPartForMesh(spec.id,object.name)).add(object);
    }
    journeys.set(spec.id,new Journey(spec));
  }

  const opticOut=[new THREE.Vector3(0,1.48,1.63),new THREE.Vector3(0,.62,1.35),new THREE.Vector3(0,-.12,.82)];
  const opticBack=[new THREE.Vector3(0,-.12,.35),new THREE.Vector3(0,.32,.35),new THREE.Vector3(0,1.38,.35)];
  const opticEffect=new THREE.Group(),outPulse=pulse('#ff8b3d'),backPulse=pulse('#8ee7ff');
  opticEffect.add(line(opticOut,'#ee8a45'),line(opticBack,'#76bcd1'),outPulse,backPulse);roots.get('optics').add(opticEffect);
  effects.set('optics',{group:opticEffect,paths:[opticOut,opticBack],pulses:[outPulse,backPulse]});

  const boardPath=[new THREE.Vector3(.88,1.12,1),new THREE.Vector3(1.56,1.12,1.85),new THREE.Vector3(1.56,1.12,2.6),new THREE.Vector3(.6,1.12,3.25)];
  const viaPath=[new THREE.Vector3(1.56,1.3,2.6),new THREE.Vector3(1.56,.82,2.6)];
  const boardEffect=new THREE.Group(),boardPulse=pulse('#ffd15b'),viaPulse=pulse('#fff1ad');
  boardEffect.add(line(boardPath,'#e6b84b'),line(viaPath,'#f3cf72'),boardPulse,viaPulse);roots.get('pcb').add(boardEffect);
  effects.set('pcb',{group:boardEffect,paths:[boardPath,viaPath],pulses:[boardPulse,viaPulse]});

  const floor=new THREE.GridHelper(17,24,'#a8b6a0','#cbd4c6');floor.position.y=-.018;floor.visible=false;scene.add(floor);floor.material.transparent=true;floor.material.opacity=.32;
  const selector=document.querySelector('#deep-part');
  for(const part of PARTS){const option=document.createElement('option');option.value=part.id;option.textContent=part.label+(AVAILABLE.has(part.id)?' · disponible':' · próximamente');selector.append(option);}selector.value='base';
  const availablePanel=document.querySelector('#deep-available'),pendingPanel=document.querySelector('#deep-pending');
  const add=document.querySelector('#deep-add'),undo=document.querySelector('#deep-undo'),reset=document.querySelector('#deep-reset');
  const copy=document.querySelector('#deep-copy'),title=document.querySelector('#deep-title'),transfer=document.querySelector('#deep-transfer');
  const play=document.querySelector('#deep-play'),slider=document.querySelector('#deep-slider'),sliderWrap=document.querySelector('#deep-slider-wrap'),demo=document.querySelector('#deep-demo');
  const explode=document.querySelector('#deep-explode'),cameraButton=document.querySelector('#deep-camera');
  let active=false,playing=false,lastTime=null,exploded=false,animation=null,phase=0,below=false,oldBounds=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectedSpec=()=>JOURNEY_BY_ID.get(selector.value);
  const selectedJourney=()=>journeys.get(selector.value);
  const selectedRoot=()=>roots.get(selector.value);
  function setRootVisibility(){for(const [id,root] of roots)root.visible=active&&id===selector.value&&AVAILABLE.has(id);}
  function stop(){playing=false;lastTime=null;const spec=selectedSpec();play.textContent=spec?.demo.play??'Ver animación';play.setAttribute('aria-pressed','false');}
  function resetMotion(){stop();phase=0;for(const root of roots.values())root.position.set(0,0,0);slider.value='0';}
  function highlightBase(value){
    for(const [id,group]of sectionsByJourney.get('base'))for(const mesh of group.children){mesh.material.emissive?.set(value&&id!=='body'?'#466e2d':'#000000');if(mesh.material.emissiveIntensity!==undefined)mesh.material.emissiveIntensity=.6;}
  }
  function applySectionPositions(spec){
    const journey=journeys.get(spec.id),sections=sectionsByJourney.get(spec.id);
    sections.forEach((group,id)=>{const index=spec.parts.findIndex(part=>part.id===id);group.visible=index<journey.count;const offset=exploded?EXPLODE[spec.id][id]:[0,0,0];group.position.set(...offset);});
  }
  function renderSteps(spec,journey){
    const container=document.querySelector('#deep-steps');container.replaceChildren();
    spec.parts.forEach((part,index)=>{const step=document.createElement('span');step.className='deep-step';step.textContent=part.shortLabel;step.dataset.done=String(index<journey.count);container.append(step);});
  }
  function refresh(){
    const spec=selectedSpec(),available=!!spec;setRootVisibility();availablePanel.hidden=!available;pendingPanel.hidden=available;
    document.querySelector('#deep-pending-title').textContent=PARTS.find(part=>part.id===selector.value).label;
    if(!available){stop();floor.visible=false;requestRender();return;}
    const journey=selectedJourney();applySectionPositions(spec);renderSteps(spec,journey);
    document.querySelector('#deep-heading-first').textContent=spec.heading[0];document.querySelector('#deep-heading-second').textContent=spec.heading[1];
    document.querySelector('#deep-build-label').textContent=spec.buildLabel;
    title.textContent=journey.complete?spec.completeTitle:journey.next.label;copy.textContent=journey.complete?spec.completeText:journey.next.text;
    document.querySelector('#deep-progress').textContent=`${journey.count} / ${spec.parts.length}`;
    add.disabled=journey.complete||!!animation;add.textContent=journey.complete?`${spec.label} construida`:`Añadir ${journey.next.label.toLowerCase()}`;
    undo.disabled=journey.count===0||!!animation;reset.disabled=journey.count===0||!!animation;explode.disabled=!journey.complete||!!animation;
    explode.textContent=exploded?'Juntar piezas':spec.separateLabel;transfer.disabled=!journey.complete||!!animation;
    transfer.textContent=`Agregar ${spec.id==='pcb'?'la placa':spec.id==='base'?'la base':'lente y guía'} al mouse →`;
    demo.hidden=!journey.complete;sliderWrap.hidden=spec.id!=='base';play.disabled=exploded;
    document.querySelector('#deep-demo-eyebrow').textContent=spec.demo.eyebrow;document.querySelector('#deep-demo-label').textContent=spec.demo.label;document.querySelector('#deep-note').textContent=spec.demo.note;document.querySelector('#deep-evidence-copy').textContent=spec.evidence;
    effects.forEach((effect,id)=>effect.group.visible=id===spec.id&&journey.complete&&!exploded);
    highlightBase(journeys.get('base').complete);requestRender();
  }
  function focus(underside=false){
    below=underside;const framing=CAMERA[selector.value]??CAMERA.base;controls.minDistance=selector.value==='base'?12:6;controls.maxDistance=36;controls.target.set(...framing.target);camera.position.set(...(underside?framing.bottom:framing.top));controls.update();cameraButton.textContent=underside?'Ver por arriba':'Ver por debajo';requestRender();
  }
  function open(){
    if(!active)oldBounds={min:controls.minDistance,max:controls.maxDistance};assemblyView.suspend();active=true;document.body.dataset.mode='deep';
    document.querySelector('#mode-deep').setAttribute('aria-pressed','true');for(const id of ['mode-assembly','mode-explore'])document.getElementById(id).setAttribute('aria-pressed','false');focus(false);refresh();
  }
  function close(){if(!active)return;active=false;stop();animation=null;for(const root of roots.values())root.visible=false;floor.visible=false;controls.minDistance=oldBounds.min;controls.maxDistance=oldBounds.max;document.querySelector('#mode-deep').setAttribute('aria-pressed','false');requestRender();}
  document.querySelector('#mode-deep').addEventListener('click',open);
  document.querySelector('#mode-assembly').addEventListener('click',close,{capture:true});document.querySelector('#mode-explore').addEventListener('click',close,{capture:true});
  selector.addEventListener('change',()=>{animation=null;exploded=false;resetMotion();focus(false);refresh();});
  add.addEventListener('click',()=>{
    const spec=selectedSpec(),journey=selectedJourney();if(!spec||animation||!journey.add())return;stop();exploded=false;const index=journey.count-1,group=sectionsByJourney.get(spec.id).get(spec.parts[index].id);const side=index%2?1:-1;
    animation={group,start:performance.now()};refresh();group.position.set(side*1.5,1.4,index%2?.7:-.7);requestRender();
  });
  undo.addEventListener('click',()=>{if(animation)return;resetMotion();exploded=false;selectedJourney().undo();refresh();});
  reset.addEventListener('click',()=>{if(animation)return;selectedJourney().reset();exploded=false;resetMotion();focus(false);refresh();});
  explode.addEventListener('click',()=>{resetMotion();exploded=!exploded;focus(selector.value==='base');refresh();});cameraButton.addEventListener('click',()=>focus(!below));
  slider.addEventListener('input',()=>{stop();selectedRoot().position.x=Number(slider.value)/100*2.2;requestRender();});
  play.addEventListener('click',()=>{if(playing)stop();else{playing=true;lastTime=null;play.textContent='Pausar';play.setAttribute('aria-pressed','true');focus(false);}requestRender();});
  transfer.addEventListener('click',()=>{const journey=selectedJourney();if(!journey?.complete||animation)return;const id=selector.value;close();assemblyView.offerPart(id);});
  function tick(now){
    if(!active)return false;const id=selector.value,journey=selectedJourney();floor.visible=id==='base'&&journey?.complete&&!exploded&&camera.position.y>0;let moving=false;
    if(animation){const t=reduced?1:Math.min(1,(now-animation.start)/600);const ease=(1-t)**2;animation.group.position.multiplyScalar(ease);moving=true;if(t===1){animation.group.position.set(0,0,0);animation=null;refresh();}}
    if(playing&&journey?.complete&&!exploded){
      const dt=lastTime===null?0:Math.min((now-lastTime)/1000,.05);lastTime=now;phase+=dt*(id==='base'?.9:1.05);
      if(id==='base'){selectedRoot().position.x=Math.sin(phase)*2.2;slider.value=String(Math.round(Math.sin(phase)*100));}
      else{const effect=effects.get(id);pointAlong(effect.paths[0],phase/(Math.PI*2),effect.pulses[0].position);pointAlong(effect.paths[1],phase/(Math.PI*2)+.35,effect.pulses[1].position);const glow=.75+.25*Math.sin(phase*5);for(const item of effect.pulses)item.scale.setScalar(glow);}
      moving=true;
    }
    return moving;
  }
  document.addEventListener('visibilitychange',()=>{lastTime=null;});window.addEventListener('machines:visibility',()=>{lastTime=null;});
  refresh();for(const root of roots.values())root.visible=false;
  return {tick,get active(){return active;}};
}
