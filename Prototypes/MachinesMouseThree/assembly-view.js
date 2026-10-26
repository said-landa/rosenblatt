import * as THREE from 'three';
import { Assembly, PARTS, partForMesh } from './assembly.js';

export function createAssemblyView({mouse, scene, camera, controls, canvas, requestRender, onModeChange}) {
  const state = new Assembly();
  const meshes = new Map(PARTS.map(p => [p.id, []]));
  mouse.group.traverse(object => {
    if (!object.isMesh) return;
    const id = partForMesh(object.name);
    meshes.get(id).push({object, origin: object.position.clone()});
  });
  let assembling = true, selected = 'base', motion = null, showInside = false, suspended = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ghost = new THREE.Group(); ghost.name = 'Machines.assembly.placement-preview'; scene.add(ghost);
  const ghostMaterial = new THREE.MeshStandardMaterial({ color: '#a0b78b', transparent: true, opacity: .22, depthWrite: false, roughness: .7 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(5.6,5.64,96), new THREE.MeshBasicMaterial({color:'#abb8a1',transparent:true,opacity:.36,side:THREE.DoubleSide}));
  ring.rotation.x = -Math.PI / 2; ring.position.y = -.14; scene.add(ring);
  const tray = document.querySelector('#parts-tray');
  const place = document.querySelector('#place-part');
  const undo = document.querySelector('#undo-part');
  const restart = document.querySelector('#restart-assembly');
  const status = document.querySelector('#assembly-status');
  const title = document.querySelector('#selected-part');
  const progress = document.querySelector('#assembly-progress');
  const buttons = new Map();
  const labels = new Map(PARTS.map(p=>[p.id,p.label]));

  // The tray thumbnails use the actual part geometry, in world coordinates.
  mouse.group.updateMatrixWorld(true);
  function copyPart(id, material) {
    mouse.group.updateMatrixWorld(true);
    const group = new THREE.Group();
    for (const {object} of meshes.get(id)) {
      const clone = new THREE.Mesh(object.geometry, material ?? object.material);
      clone.name = object.name;
      object.matrixWorld.decompose(clone.position, clone.quaternion, clone.scale);
      group.add(clone);
    }
    return group;
  }
  const thumbnails = new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
  thumbnails.setSize(160,112); thumbnails.setPixelRatio(1);
  thumbnails.toneMapping=THREE.ACESFilmicToneMapping; thumbnails.toneMappingExposure=1.3;
  const thumbScene = new THREE.Scene();
  thumbScene.add(new THREE.HemisphereLight('#ffffff','#65705e',2.8));
  const thumbLight = new THREE.DirectionalLight('#fff8e8',3); thumbLight.position.set(-3,7,-4); thumbScene.add(thumbLight);
  const thumbCamera = new THREE.PerspectiveCamera(32,160/112,.01,200);
  for (const [index,part] of PARTS.entries()) {
    const group = copyPart(part.id);
    const bounds = new THREE.Box3().setFromObject(group), center = bounds.getCenter(new THREE.Vector3());
    const radius = bounds.getSize(new THREE.Vector3()).length()/2;
    group.position.sub(center); thumbScene.add(group);
    thumbCamera.position.set(.8,1,-1.2).normalize().multiplyScalar(radius/Math.sin(THREE.MathUtils.degToRad(16))*1.06);
    thumbCamera.lookAt(0,0,0); thumbCamera.updateProjectionMatrix(); thumbnails.render(thumbScene,thumbCamera);
    const button = document.createElement('button'); button.type='button'; button.className='part-card'; button.dataset.part=part.id;
    const img = document.createElement('img'); img.src=thumbnails.domElement.toDataURL(); img.alt=''; img.draggable=false;
    const label = document.createElement('span'); label.className='part-label'; label.textContent=part.label;
    const badge = document.createElement('span'); badge.className='part-badge'; badge.textContent=String(index+1).padStart(2,'0');
    button.append(badge,img,label); tray.append(button); buttons.set(part.id,button);
    button.addEventListener('click',()=>choose(part.id));
    thumbScene.remove(group);
  }
  thumbnails.dispose(); thumbnails.forceContextLoss();

  function restorePositions() {
    for(const entries of meshes.values()) for(const {object,origin} of entries) object.position.copy(origin);
  }
  function clearGhost() { ghost.clear(); }
  function choose(id) {
    if(motion) return;
    selected=id; refresh();
  }
  function refresh() {
    restorePositions(); clearGhost();
    mouse.shell.visible = !showInside;
    for(const [id,entries] of meshes) for(const {object} of entries) object.visible = !assembling || state.installed.has(id);
    mouse.group.visible = !suspended;
    ring.visible = !suspended && assembling && !state.complete;
    const part = PARTS.find(p=>p.id===selected);
    const installed = state.installed.has(selected), missing=state.missing(selected);
    if(assembling && !installed) ghost.add(copyPart(selected,ghostMaterial));
    ghost.visible = !suspended && assembling && !installed;
    ghostMaterial.color.set(missing.length ? '#baa786' : '#8fa77b');
    title.textContent = state.complete ? 'Mouse completo' : part.label;
    progress.textContent=`${state.count} / ${PARTS.length}`;
    progress.setAttribute('aria-label',`${state.count} de ${PARTS.length} conjuntos colocados`);
    status.textContent=state.complete ? 'Listo para explorar por dentro.' : installed ? 'Esta pieza ya está colocada.' : missing.length ? `Primero: ${missing.map(id=>labels.get(id)).join(', ')}.` : 'Toca Colocar o el lugar de la pieza.';
    place.disabled=installed || missing.length>0 || state.complete;
    place.textContent=state.complete ? 'Ensamblaje completo' : 'Colocar pieza';
    undo.disabled=state.count===0; restart.disabled=state.count===0;
    for(const [id,button] of buttons) {
      const done=state.installed.has(id), ready=state.canPlace(id);
      button.dataset.state=done?'installed':ready?'ready':'locked';
      button.setAttribute('aria-pressed',String(selected===id));
      button.setAttribute('aria-label',`${labels.get(id)}${done?', colocada':ready?', disponible':', requiere otras piezas'}`);
      button.querySelector('.part-badge').textContent=done?'✓':String(PARTS.findIndex(p=>p.id===id)+1).padStart(2,'0');
    }
    document.body.dataset.complete=String(state.complete);
    requestRender();
  }
  function placeSelected() {
    if(suspended || !assembling || motion || !state.place(selected)) return;
    const id=selected; clearGhost(); ghost.visible=false;
    const start=performance.now(); motion={id,start};
    for(const {object} of meshes.get(id)) object.visible=true;
    place.disabled=true; undo.disabled=true; restart.disabled=true;
    status.textContent='Colocando…';
    requestRender();
  }
  place.addEventListener('click',placeSelected);
  undo.addEventListener('click',()=>{if(motion)return;const id=state.undo(); if(id) selected=id; showInside=false; refresh();});
  restart.addEventListener('click',()=>{if(motion)return;state.reset();selected='base';showInside=false;refresh();tray.scrollTo({left:0,behavior:reducedMotion?'instant':'smooth'});});
  let pointerStart=null;
  const pointers=new Set();
  canvas.addEventListener('pointerdown',event=>{pointers.add(event.pointerId);pointerStart=pointers.size===1?{x:event.clientX,y:event.clientY,id:event.pointerId}:null;});
  canvas.addEventListener('pointercancel',event=>{pointers.delete(event.pointerId);pointerStart=null;});
  canvas.addEventListener('pointerup',event=>{
    pointers.delete(event.pointerId);
    if(!pointerStart || pointerStart.id!==event.pointerId || Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y)>7){pointerStart=null;return;}
    pointerStart=null;
    if(suspended || !assembling || motion || !state.canPlace(selected))return;
    const rect=canvas.getBoundingClientRect();
    const point=new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    const ray=new THREE.Raycaster();ray.setFromCamera(point,camera);ghost.updateMatrixWorld(true);
    if(ray.intersectObject(ghost,true).length)placeSelected();
  });
  // A mode switch preserves the construction; inspecting cannot install pieces.
  function setMode(value) {
    assembling=value; suspended=false;
    if(motion){motion=null;restorePositions();}
    showInside=false; document.body.dataset.mode=value?'assembly':'explore';
    document.querySelector('#mode-assembly').setAttribute('aria-pressed',String(value));
    document.querySelector('#mode-explore').setAttribute('aria-pressed',String(!value));
    onModeChange(value);refresh();
  }
  document.querySelector('#mode-assembly').addEventListener('click',()=>setMode(true));
  document.querySelector('#mode-explore').addEventListener('click',()=>setMode(false));
  function setInside(value) {showInside=value;refresh();}
  function tick(now) {
    if(!motion)return false;
    const fraction=reducedMotion?1:Math.min(1,(now-motion.start)/600);
    const offset=2.8*Math.pow(1-fraction,3);
    for(const {object,origin} of meshes.get(motion.id))object.position.copy(origin).add(new THREE.Vector3(0,offset,0));
    if(fraction===1){
      motion=null;
      selected=PARTS.find(p=>state.canPlace(p.id))?.id ?? selected;
      refresh();
      buttons.get(selected).scrollIntoView({block:'nearest',inline:'nearest',behavior:reducedMotion?'instant':'smooth'});
      return false;
    }
    return true;
  }
  setMode(true);
  function suspend(){motion=null;restorePositions();suspended=true;mouse.group.visible=false;ghost.visible=false;ring.visible=false;requestRender();}
  function offerPart(id){setMode(true);selected=id;refresh();if(state.canPlace(id))placeSelected();buttons.get(id).scrollIntoView({block:'nearest',inline:'nearest'});}
  return {tick,setInside,copyPart,suspend,offerPart,get assembling(){return assembling;}};
}
