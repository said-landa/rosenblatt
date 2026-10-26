import * as THREE from 'three';
import { PARTS, partForMesh } from './assembly.js';
import { JOURNEYS, JOURNEY_BY_ID, deepPartForMesh } from './deep-dive.js';
import { CourseProgress } from './course-state.js';
import { createCourseEffects } from './course-effects.js';

const STORAGE='machines-lab-course-v1';
const ICONS={
 mouse:'<rect x="7" y="3" width="18" height="27" rx="9"/><path d="M16 3v10M7 14h18"/><rect x="14" y="7" width="4" height="6" rx="2"/>',
 base:'<path d="m4 13 12-7 12 7-12 7zM4 19l12 7 12-7M4 16l12 7 12-7"/>',
 optics:'<circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="5"/><path d="m3 3 6 6m14 14 6 6"/>',
 pcb:'<rect x="6" y="6" width="20" height="20" rx="4"/><rect x="12" y="12" width="8" height="8" rx="1"/><path d="M12 2v4m8-4v4M12 26v4m8-4v4M2 12h4m-4 8h4m20-8h4m-4 8h4"/>',
 part:'<path d="m16 3 12 7v13l-12 7-12-7V10zM4 10l12 7 12-7M16 17v13"/>',
};
const icon=id=>'<svg viewBox="0 0 32 34" aria-hidden="true">'+(ICONS[id]??ICONS.part)+'</svg>';
export function createCourseView({mouse,scene,camera,controls,requestRender}) {
  let saved={};
  try { saved=JSON.parse(localStorage.getItem(STORAGE)||'{}'); } catch {}
  const progress=new CourseProgress(saved?.version===1?saved:{});
  const $=selector=>document.querySelector(selector);
  const library=$('#library'),cards=$('#cards'),panel=$('#lesson-card'),action=$('#lesson-action'),viewport=$('#viewport');
  const effects=createCourseEffects();
  const meshes=new Map(PARTS.map(part=>[part.id,[]]));
  mouse.group.updateMatrixWorld(true);
  mouse.group.traverse(object=>{if(object.isMesh)meshes.get(partForMesh(object.name)).push(object);});
  const roots=new Map(),sections=new Map();
  for(const spec of JOURNEYS){
    const root=new THREE.Group();root.visible=false;scene.add(root);roots.set(spec.id,root);
    const groups=new Map(spec.parts.map(part=>[part.id,new THREE.Group()]));
    for(const group of groups.values())root.add(group);
    for(const object of meshes.get(spec.id)){
      const clone=new THREE.Mesh(object.geometry,object.material.clone());
      object.matrixWorld.decompose(clone.position,clone.quaternion,clone.scale);
      groups.get(deepPartForMesh(spec.id,object.name)).add(clone);
    }
    sections.set(spec.id,groups);
  }
  let screen='courses',chapter='base',lesson=0,motion=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function save(){
    try{localStorage.setItem(STORAGE,JSON.stringify(progress.serialize()));$('#save-notice').hidden=true;}
    catch{$('#save-notice').hidden=false;}
    $('#streak-count').textContent=progress.streak();
    $('.streak').setAttribute('aria-label',`Racha local: ${progress.streak()} días`);
  }

  let selectedSection='courses';
  const nav=$('#bottom-nav');
  function setScreen(value){
    screen=value;document.body.dataset.screen=value;
    const inLesson=value==='lesson',inMap=value==='lessons';
    library.hidden=inLesson;viewport.hidden=!inLesson;
    panel.hidden=!inLesson&&!inMap;
    $('#back').hidden=!inLesson&&!inMap;
    $('#breadcrumb').textContent=inLesson||inMap?'':selectedSection==='home'?'Home':selectedSection==='you'?'You':'Courses';
    $('#course-carousel').hidden=value!=='chapters';
    nav.hidden=inLesson||inMap;
    document.body.dataset.section=selectedSection;
    for(const button of nav.querySelectorAll('button'))button.setAttribute('aria-current',button.dataset.section===selectedSection?'page':'false');
    window.webkit?.messageHandlers?.machinesNavigation?.postMessage({section:selectedSection,visible:!inLesson&&!inMap});
    controls.enabled=inLesson;
    for(const root of roots.values())root.visible=false;
    mouse.group.visible=false;library.scrollTop=0;requestRender();
  }
  function heading(kicker,title,description){
    $('#section-kicker').textContent=kicker;$('#section-title').textContent=title;$('#section-description').textContent=description;
  }
  function chapterPercent(id){
    const spec=JOURNEY_BY_ID.get(id);
    return spec?Math.round(((progress.counts[id]??0)+Number(progress.assembly.installed.has(id)))/(spec.parts.length+1)*100):0;
  }
  function coursePercent(){
    return Math.floor(PARTS.reduce((sum,part)=>sum+chapterPercent(part.id),0)/PARTS.length);
  }
  function nextChapter(){return JOURNEYS.find(spec=>!progress.assembly.installed.has(spec.id))?.id??'pcb';}
  function progressBar(percent){
    const bar=document.createElement('span');bar.className='progress-track';
    bar.setAttribute('role','progressbar');bar.setAttribute('aria-label','Progreso');
    bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');bar.setAttribute('aria-valuenow',String(percent));
    const fill=document.createElement('span');fill.style.width=percent+'%';bar.append(fill);return bar;
  }
  function chapterCard(part,index){
    const spec=JOURNEY_BY_ID.get(part.id),done=progress.assembly.installed.has(part.id),percent=chapterPercent(part.id);
    const button=document.createElement('button');button.className='chapter-card';button.disabled=!spec;
    button.dataset.state=done?'complete':percent?'progress':'pending';
    const art=document.createElement('span');art.className='art-placeholder';art.setAttribute('aria-hidden','true');if(part.id==='base')art.innerHTML=icon('base');
    const text=document.createElement('span');text.className='chapter-copy';
    const number=document.createElement('span');number.className='chapter-number';number.textContent='CAPÍTULO '+(index+1);
    const title=document.createElement('span');title.className='chapter-title';title.textContent=part.label;
    text.append(number,title);
    if(spec&&!done)text.append(progressBar(percent));
    if(!spec){const soon=document.createElement('span');soon.className='coming-soon';soon.textContent='Próximamente';text.append(soon);}
    button.append(art,text);
    if(done){const check=document.createElement('span');check.className='completion-check';check.textContent='✓';button.append(check);}
    button.addEventListener('click',()=>showLessons(part.id));cards.append(button);
  }
  function finishCards(){effects.setElements([...cards.children]);}
  function showCourses(){selectedSection='courses';showChapters();}
  function showChapters(){
    selectedSection='courses';
    setScreen('chapters');cards.replaceChildren();
    heading('CURSO','Mouse','Descubre sus piezas y cómo trabajan juntas.');
    const courseStatus=document.createElement('div');courseStatus.className='course-progress';
    courseStatus.textContent=coursePercent()+'% completado';courseStatus.append(progressBar(coursePercent()));cards.append(courseStatus);
    PARTS.forEach(chapterCard);finishCards();
  }
  function showHome(){
    selectedSection='home';setScreen('home');cards.replaceChildren();
    heading('TUS CURSOS','Construye y descubre','');
    const carousel=document.createElement('div');carousel.className='home-carousel';
    carousel.setAttribute('role','region');carousel.setAttribute('aria-label','Cursos disponibles');
    const course=document.createElement('button');course.className='home-course';
    course.innerHTML='<span class="home-course-art">'+icon('mouse')+'</span><strong>Mouse</strong><span class="course-model">Logitech B100</span>';
    course.addEventListener('click',showCourses);carousel.append(course);cards.append(carousel);
    const dots=document.createElement('div');dots.className='carousel-dots';dots.setAttribute('aria-hidden','true');dots.innerHTML='<span class="selected"></span>';cards.append(dots);
    const id=nextChapter(),spec=JOURNEY_BY_ID.get(id),index=progress.counts[id];
    const resume=document.createElement('button');resume.className='resume-card';
    const title=document.createElement('strong');title.textContent=spec.parts[index]?.label??'Agregar '+spec.label.toLowerCase()+' al mouse';
    const label=document.createElement('span');label.className='resume-caption';label.textContent='CONTINUAR · '+spec.label;
    const start=document.createElement('span');start.className='primary-action';start.textContent='Continuar';
    resume.append(label,title,start);resume.addEventListener('click',()=>{chapter=id;lesson=Math.min(index,spec.parts.length);displayLesson();});cards.append(resume);
    finishCards();
  }
  function showYou(){
    selectedSection='you';setScreen('you');cards.replaceChildren();heading('','Tu progreso','');
    const summary=document.createElement('section');summary.className='profile-summary';
    const stats=[['Días de racha',progress.streak()],['Lecciones completadas',progress.completedLessons()]];
    for(const [label,value] of stats){
      const stat=document.createElement('div');stat.className='profile-stat';
      const number=document.createElement('strong');number.textContent=String(value);
      const caption=document.createElement('span');caption.textContent=label;stat.append(number,caption);summary.append(stat);
    }
    cards.append(summary);finishCards();
  }
  function navigate(section){
    if(motion)return;
    if(section==='home')showHome();else if(section==='you')showYou();else showCourses();
  }
  nav.addEventListener('click',event=>{const button=event.target.closest('button');if(button)navigate(button.dataset.section);});
  window.addEventListener('machines:navigate',event=>navigate(event.detail));
  $('#carousel-mouse').addEventListener('click',showCourses);
  if(window.webkit?.messageHandlers?.machinesNavigation)document.body.dataset.nativeNavigation='true';
  function showLessons(id=chapter){
    chapter=id;setScreen('lessons');cards.replaceChildren();
    const spec=JOURNEY_BY_ID.get(id),count=progress.counts[id],installed=progress.assembly.installed.has(id);
    lesson=Math.min(count,spec.parts.length);
    heading('CAPÍTULO '+(PARTS.findIndex(part=>part.id===id)+1),spec.label,'');
    const entries=[...spec.parts,{id:'assembly',label:'Agregar al mouse'}];
    entries.forEach((part,index)=>{
      const done=index<count||(index===spec.parts.length&&installed),current=index===count&&!installed&&progress.available(id);
      const button=document.createElement('button');button.className='lesson-node';button.disabled=!progress.available(id)||index>count;
      button.dataset.state=done?'complete':current?'current':'locked';button.setAttribute('aria-pressed',String(index===lesson));
      const coin=document.createElement('span');coin.className='lesson-coin';coin.setAttribute('aria-hidden','true');
      if(done){const check=document.createElement('span');check.className='coin-check';check.textContent='✓';coin.append(check);}
      const title=document.createElement('span');title.className='node-title';title.textContent=part.label;
      button.append(coin,title);
      button.setAttribute('aria-label',part.label+(done?', completada':current?', lección actual':', bloqueada'));
      button.addEventListener('click',()=>{lesson=index;[...cards.querySelectorAll('.lesson-node')].forEach((item,i)=>item.setAttribute('aria-pressed',String(i===index)));updatePanel();});
      cards.append(button);
    });
    updatePanel();finishCards();
    requestAnimationFrame(()=>{
      const current=cards.querySelector('[data-state=current]');if(!current)return;
      const available=library.clientHeight-panel.clientHeight;
      if(current.offsetTop>available*.7)library.scrollTo({top:Math.max(0,current.offsetTop-available*.45),behavior:'instant'});
    });
  }
  function updatePanel(){
    const spec=JOURNEY_BY_ID.get(chapter),part=spec.parts[lesson],done=part?lesson<progress.counts[chapter]:progress.assembly.installed.has(chapter);
    $('#lesson-number').textContent='';
    $('#lesson-state').textContent=done?'COMPLETADA':'';
    $('#lesson-title').textContent=part?.label??'Agregar al mouse';
    $('#lesson-description').textContent=part?.text??spec.completeText;
    action.disabled=!!motion||!progress.available(chapter);
    if(!progress.available(chapter)){
      $('#lesson-description').textContent='Completa y agrega '+progress.assembly.missing(chapter).map(id=>PARTS.find(p=>p.id===id).label).join(', ')+' al mouse para comenzar.';
      action.textContent='Completa el capítulo anterior';
    }else if(screen==='lessons')action.textContent='Comenzar';
    else if(done)action.textContent=lesson<spec.parts.length?'Siguiente lección':'Ver capítulos';
    else action.textContent=part?'Añadir pieza':`Agregar ${spec.label.toLowerCase()} al mouse`;
  }
  function displayLesson(){
    setScreen('lesson');effects.setElements([]);
    const spec=JOURNEY_BY_ID.get(chapter),part=spec.parts[lesson];
    if(part){
      const root=roots.get(chapter);root.visible=true;
      sections.get(chapter).forEach((group,id)=>{
        const index=spec.parts.findIndex(item=>item.id===id);
        group.position.set(0,0,0);group.visible=index<=lesson;
        for(const mesh of group.children){
          const ghost=index===lesson&&lesson>=progress.counts[chapter];
          mesh.material.transparent=ghost;mesh.material.opacity=ghost?.28:1;
          mesh.material.depthWrite=!ghost;
        }
      });
      controls.target.set(0,chapter==='base'?.4:.8,0);
      const distance=chapter==='optics'?9:chapter==='pcb'?17:23;
      camera.position.set(.6,chapter==='base'&&lesson>0?-.85:.85,-1).normalize().multiplyScalar(distance);
      controls.minDistance=chapter==='optics'?4:8;controls.maxDistance=42;
    }else{
      mouse.group.visible=true;
      for(const [id,items] of meshes)for(const mesh of items)mesh.visible=progress.assembly.installed.has(id)||id===chapter;
      controls.target.set(0,.8,-1);
      camera.position.set(14,18,-23);controls.minDistance=12;controls.maxDistance=48;
    }
    controls.update();updatePanel();requestRender();
  }
  action.addEventListener('click',()=>{
    if(motion||!progress.available(chapter))return;
    if(screen==='lessons'){displayLesson();return;}
    const spec=JOURNEY_BY_ID.get(chapter),part=spec.parts[lesson];
    if(part&&lesson<progress.counts[chapter]){
      lesson++;displayLesson();return;
    }
    if(!part){
      if(progress.assembly.installed.has(chapter)){showChapters();return;}
      motion={items:meshes.get(chapter).map(object=>({object,origin:object.position.clone()})),
        start:performance.now(),chapter,install:true};
      updatePanel();requestRender();return;
    }
    const group=sections.get(chapter).get(part.id);
    // Commit only after the visual placement finishes.
    motion={group,start:performance.now(),chapter,lesson};
    for(const mesh of group.children){mesh.material.transparent=false;mesh.material.opacity=1;mesh.material.depthWrite=true;}
    updatePanel();requestRender();
  });
  $('#back').addEventListener('click',()=>{
    if(motion)return;
    if(screen==='lesson')showLessons();
    else if(screen==='lessons')showChapters();
    else navigate(selectedSection);
  });
  function tick(now){
    if(!motion)return false;
    const t=reduced?1:Math.min(1,(now-motion.start)/650);
    const offset=2.3*(1-t)**3;
    if(motion.install)for(const {object,origin} of motion.items)object.position.copy(origin).add(new THREE.Vector3(0,offset,0));
    else motion.group.position.set(0,offset,0);
    if(t===1){
      if(motion.install)progress.install(motion.chapter);
      else progress.completeLesson(motion.chapter,motion.lesson);
      motion=null;save();updatePanel();$('#back').disabled=false;
    }else $('#back').disabled=true;
    return !!motion;
  }
  save();showHome();
  return {tick,get active(){return screen==='lesson';}};
}
