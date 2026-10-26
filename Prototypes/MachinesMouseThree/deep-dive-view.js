import * as THREE from 'three';
import { PARTS } from './assembly.js';
import { BaseJourney, BASE_PARTS, basePartForMesh } from './deep-dive.js';

export function createDeepDive({assemblyView,scene,camera,controls,requestRender}){
  const journey=new BaseJourney();
  const root=new THREE.Group();root.name='Machines.base-deep-dive';root.visible=false;scene.add(root);
  const sections=new Map(BASE_PARTS.map(p=>[p.id,new THREE.Group()]));sections.forEach(g=>root.add(g));
  const source=assemblyView.copyPart('base');
  for(const object of [...source.children]){
    object.material=object.material.clone();object.castShadow=true;object.receiveShadow=true;
    sections.get(basePartForMesh(object.name)).add(object);
  }
  const floor=new THREE.GridHelper(17,24,'#a8b6a0','#cbd4c6');floor.position.y=-.018;floor.visible=false;scene.add(floor);
  floor.material.transparent=true;floor.material.opacity=.32;
  const selector=document.querySelector('#deep-part');
  for(const part of PARTS){const option=document.createElement('option');option.value=part.id;option.textContent=part.label+(part.id==='base'?' · empezar aquí':' · próximamente');selector.append(option);}
  selector.value='base';
  const add=document.querySelector('#deep-add'),undo=document.querySelector('#deep-undo');
  const copy=document.querySelector('#deep-copy'),title=document.querySelector('#deep-title');
  const transfer=document.querySelector('#deep-transfer'),play=document.querySelector('#deep-play');
  const slider=document.querySelector('#base-slide'),demo=document.querySelector('#base-demo');
  let active=false,playing=false,lastTime=null,exploded=false,animation=null,phase=0,below=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let oldBounds=null;
  function stop(){playing=false;lastTime=null;play.textContent='Ver deslizar';play.setAttribute('aria-pressed','false');}
  function highlightFeet(value){
    for(const [id,g]of sections)for(const mesh of g.children){mesh.material.emissive.set(value&&id!=='body'?'#466e2d':'#000000');mesh.material.emissiveIntensity=.6;}
  }
  function refresh(){
    const available=selector.value==='base';root.visible=active&&available;
    document.querySelector('#deep-available').hidden=!available;document.querySelector('#deep-pending').hidden=available;
    document.querySelector('#deep-pending-title').textContent=PARTS.find(p=>p.id===selector.value).label;
    if(!available){stop();floor.visible=false;requestRender();return;}
    sections.forEach((g,id)=>{const index=BASE_PARTS.findIndex(p=>p.id===id);g.visible=index<journey.count;g.position.set(0,exploded&&index>0?-1.4:0,0);});
    title.textContent=journey.complete?'Una base que se desliza':journey.next.label;
    copy.textContent=journey.complete?'Los patines tocan la mesa. El cuerpo queda por encima; sus apoyos interiores recibirán la placa.':journey.next.text;
    document.querySelector('#deep-progress').textContent=`${journey.count} / 3`;
    add.disabled=journey.complete||!!animation;add.textContent=journey.complete?'Base construida':`Añadir ${journey.next.label.toLowerCase()}`;
    undo.disabled=journey.count===0||!!animation;document.querySelector('#deep-reset').disabled=journey.count===0||!!animation;
    document.querySelector('#deep-explode').disabled=!journey.complete||!!animation;
    document.querySelector('#deep-explode').textContent=exploded?'Juntar piezas':'Separar patines';
    transfer.disabled=!journey.complete||!!animation;demo.hidden=!journey.complete;play.disabled=exploded;
    document.querySelectorAll('.deep-step').forEach((el,i)=>el.dataset.done=String(i<journey.count));
    highlightFeet(journey.complete);requestRender();
  }
  function focus(underside=false){
    below=underside;controls.minDistance=12;controls.maxDistance=36;controls.target.set(0,.4,0);
    camera.position.set(10,underside?-13:14,-19);controls.update();
    document.querySelector('#deep-camera').textContent=underside?'Ver por arriba':'Ver por debajo';requestRender();
  }
  function open(){
    if(!active)oldBounds={min:controls.minDistance,max:controls.maxDistance};
    assemblyView.suspend();active=true;document.body.dataset.mode='deep';
    document.querySelector('#mode-deep').setAttribute('aria-pressed','true');
    for(const id of ['mode-assembly','mode-explore'])document.getElementById(id).setAttribute('aria-pressed','false');
    focus(journey.count>1);refresh();
  }
  function close(){
    if(!active)return;active=false;stop();animation=null;root.visible=false;floor.visible=false;
    controls.minDistance=oldBounds.min;controls.maxDistance=oldBounds.max;
    document.querySelector('#mode-deep').setAttribute('aria-pressed','false');requestRender();
  }
  document.querySelector('#mode-deep').addEventListener('click',open);
  document.querySelector('#mode-assembly').addEventListener('click',close,{capture:true});
  document.querySelector('#mode-explore').addEventListener('click',close,{capture:true});
  selector.addEventListener('change',()=>{stop();animation=null;root.position.x=0;slider.value='0';refresh();});
  add.addEventListener('click',()=>{
    if(animation||!journey.add())return;exploded=false;
    const index=journey.count-1;animation={group:sections.get(BASE_PARTS[index].id),start:performance.now(),side:index===0?1:-1};
    if(index>0)focus(true);refresh();requestRender();
  });
  undo.addEventListener('click',()=>{if(animation)return;stop();exploded=false;journey.undo();refresh();});
  document.querySelector('#deep-reset').addEventListener('click',()=>{if(animation)return;stop();journey.reset();exploded=false;phase=0;root.position.x=0;slider.value='0';focus();refresh();});
  document.querySelector('#deep-explode').addEventListener('click',()=>{stop();exploded=!exploded;root.position.x=0;slider.value='0';focus(true);refresh();});
  document.querySelector('#deep-camera').addEventListener('click',()=>focus(!below));
  slider.addEventListener('input',()=>{stop();root.position.x=Number(slider.value)/100*2.2;requestRender();});
  play.addEventListener('click',()=>{
    if(playing)stop();else{playing=true;lastTime=null;play.textContent='Pausar';play.setAttribute('aria-pressed','true');focus(false);}
    requestRender();
  });
  transfer.addEventListener('click',()=>{if(!journey.complete||animation)return;close();assemblyView.offerPart('base');});
  function tick(now){
    if(!active)return false;
    floor.visible=selector.value==='base'&&journey.complete&&!exploded&&camera.position.y>0;
    let moving=false;
    if(animation){const t=reduced?1:Math.min(1,(now-animation.start)/600);animation.group.position.y=animation.side*(1-t)**3*1.4;moving=true;if(t===1){animation=null;refresh();}}
    if(playing&&journey.complete&&!exploded){
      const dt=lastTime===null?0:Math.min((now-lastTime)/1000,.05);lastTime=now;phase+=dt*.9;
      root.position.x=Math.sin(phase)*2.2;slider.value=String(Math.round(Math.sin(phase)*100));moving=true;
    }
    return moving;
  }
  document.addEventListener('visibilitychange',()=>{lastTime=null;});window.addEventListener('machines:visibility',()=>{lastTime=null;});
  refresh();root.visible=false;
  return {tick,get active(){return active;}};
}
