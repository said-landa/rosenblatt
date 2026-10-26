import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OriginState, STORAGE_KEY } from './state.js';
import { OriginFeedback } from './feedback.js';
const $=id=>document.getElementById(id),feedback=new OriginFeedback();
let saved;try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY));}catch{}
let state=new OriginState(saved),active=true,drag=null,animation=null,lastSaved=0,flight=0,previousPhase=null,chapterUntil=0,cameraBusy=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state.snapshot()));}catch{$('notice').textContent='No se pudo guardar el avance.';}}
function updateUI(){
 const phase=state.phase;document.body.dataset.phase=phase;document.body.dataset.parts=String(state.parts);document.body.dataset.running=String(state.running);
 const evolving=phase==='expansion'||phase==='cooling';$('focus').hidden=!evolving;
 $('focus').setAttribute('aria-label',phase==='cooling'?'Mantener para continuar el enfriamiento':'Mantener para expandir el espacio');
 $('particle').hidden=phase!=='nucleus';$('particle').disabled=Boolean(animation);
 $('particle').setAttribute('aria-label',`Arrastrar ${state.expected==='proton'?'protón':'neutrón'} al lugar iluminado`);
 $('particle').firstElementChild.className=`particle ${state.expected||'proton'}`;$('particle').firstElementChild.textContent=state.expected==='proton'?'+':'';
 $('cue').textContent=phase==='nucleus'?'Arrastra':state.running?'Suelta para explorar':'Mantén';$('cue').hidden=phase==='complete';
 if(phase!==previousPhase){previousPhase=phase;chapterUntil=performance.now()+3000;$('chapter').textContent={expansion:'Expansión',cooling:'Enfriamiento',nucleus:'Primeros núcleos',complete:'Helio-4'}[phase];}
 const progress=Math.round(state.expansion*60+state.parts*10);$('progress').setAttribute('aria-valuenow',String(progress));
}
try{
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#080914');renderer.outputColorSpace=THREE.SRGBColorSpace;$('viewport').append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,1,.1,250);camera.position.set(0,2,32);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enabled=true;controls.enableDamping=true;controls.enablePan=false;controls.minDistance=12;controls.maxDistance=65;
 const backdrop=new THREE.Scene(),backdropCamera=new THREE.Camera();
 const uniforms={evolution:{value:state.expansion},clock:{value:0},resolution:{value:new THREE.Vector2(1,1)}};
 backdrop.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms,depthWrite:false,depthTest:false,
 vertexShader:'void main(){gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:`precision highp float;uniform float evolution,clock;uniform vec2 resolution;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
 float field(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p=p*2.03+3.7;a*=.5;}return v;}
 void main(){vec2 uv=gl_FragCoord.xy/resolution;vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);float n=field(p*3.+vec2(clock*.007,-clock*.004));float wisps=field(p*7.+n*2.);float heat=pow(n,2.2)*1.8;
 vec3 warm=mix(vec3(.07,.022,.038),vec3(.95,.41,.13),heat);warm+=vec3(.33,.22,.12)*pow(wisps,4.);
 vec3 cool=mix(vec3(.025,.033,.08),vec3(.14,.19,.36),n*wisps);vec3 c=mix(warm,cool,evolution)*mix(1.,.55,evolution);c*=1.-.35*length(p);gl_FragColor=vec4(c,1.);}`})));
 let seed=171;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 const positions=new Float32Array(7500*3),sizes=new Float32Array(7500);
 for(let i=0;i<sizes.length;i++){positions[i*3]=(random()-.5)*105;positions[i*3+1]=(random()-.5)*105;positions[i*3+2]=(random()-.5)*105;sizes[i]=random();}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('seed',new THREE.BufferAttribute(sizes,1));
 const fieldMaterial=new THREE.ShaderMaterial({uniforms:{evolution:uniforms.evolution,clock:uniforms.clock,pixelRatio:{value:renderer.getPixelRatio()}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
 vertexShader:`uniform float evolution,clock,pixelRatio;attribute float seed;varying float opacity;void main(){vec3 p=position*(1.+evolution*2.6);p+=vec3(sin(clock*.15+seed*32.),cos(clock*.12+seed*20.),0.)*.16;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp((3.+seed*12.)*pixelRatio*25./max(5.,-mv.z),1.,22.);opacity=(.18+seed*.5)*(1.-evolution*.45);}`,
 fragmentShader:`uniform float evolution;varying float opacity;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;vec3 color=mix(vec3(1.,.68,.35),vec3(.60,.75,1.),evolution);gl_FragColor=vec4(color,pow(1.-d,2.)*opacity);}`});
 scene.add(new THREE.Points(geometry,fieldMaterial));scene.add(new THREE.AmbientLight('#d9e4ff',2));
 const key=new THREE.DirectionalLight('#fff0d2',4);key.position.set(-5,8,12);scene.add(key);const rim=new THREE.DirectionalLight('#8599ff',3);rim.position.set(8,-3,-4);scene.add(rim);
 const nucleus=new THREE.Group();scene.add(nucleus);nucleus.scale.setScalar(2.1);
 const offsets=[new THREE.Vector3(-.9,.7,.7),new THREE.Vector3(.9,.7,-.7),new THREE.Vector3(.9,-.7,.7),new THREE.Vector3(-.9,-.7,-.7)],types=['proton','neutron','proton','neutron'];
 const meshes=offsets.map((offset,i)=>{const sphere=new THREE.Mesh(new THREE.SphereGeometry(1.05,40,32),new THREE.MeshStandardMaterial({color:types[i]==='proton'?'#edaa70':'#b2c9ef',roughness:.3,metalness:.12}));sphere.position.copy(offset);nucleus.add(sphere);
 const ghost=new THREE.Mesh(new THREE.SphereGeometry(1.07,24,16),new THREE.MeshBasicMaterial({color:'#bfcae8',wireframe:true,transparent:true,opacity:.055,depthWrite:false}));ghost.position.copy(offset);nucleus.add(ghost);return{sphere,ghost};});
 const marker=new THREE.Mesh(new THREE.TorusGeometry(1.35,.025,8,64),new THREE.MeshBasicMaterial({color:'#f6e1ba',transparent:true,opacity:.6}));nucleus.add(marker);

 function render(){renderer.autoClear=true;renderer.render(backdrop,backdropCamera);renderer.autoClear=false;renderer.clearDepth();renderer.render(scene,camera);}
 function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();uniforms.resolution.value.set(w*renderer.getPixelRatio(),h*renderer.getPixelRatio());}window.addEventListener('resize',resize);resize();
 function pauseJourney(){state.running=false;controls.enabled=true;feedback.evolve(state.expansion,false);save();updateUI();}
 function startJourney(){if(!active||$('explanation').open||!['expansion','cooling'].includes(state.phase))return;feedback.unlock();feedback.haptic('begin');controls.enabled=false;state.running=true;updateUI();}
 $('focus').addEventListener('pointerdown',e=>{e.preventDefault();$('focus').setPointerCapture(e.pointerId);startJourney();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])$('focus').addEventListener(name,pauseJourney);
 // Keyboard and screen-reader activation can run to the next safe checkpoint.
 $('focus').onclick=e=>{if(e.detail===0){if(state.running)pauseJourney();else startJourney();}};
 controls.addEventListener('start',()=>{cameraBusy=true;flight=0;pauseJourney();});controls.addEventListener('end',()=>{cameraBusy=false;});
 $('info').onclick=()=>{pauseJourney();flight=0;$('explanation').showModal();};$('close-info').onclick=()=>$('explanation').close();
 $('sound').onclick=()=>{feedback.unlock();feedback.muted=!feedback.muted;$('sound').setAttribute('aria-pressed',String(feedback.muted));$('sound').setAttribute('aria-label',feedback.muted?'Activar sonido':'Silenciar sonido');feedback.evolve(state.expansion,false);};
 $('replay').onclick=()=>{pauseJourney();state=new OriginState();animation=null;drag=null;flight=0;camera.position.set(0,2,32);controls.target.set(0,0,0);$('explanation').close();save();updateUI();};
 function targetPosition(){nucleus.updateMatrixWorld(true);return offsets[state.parts].clone().applyMatrix4(nucleus.matrixWorld).project(camera);}
 function screenTarget(){const v=targetPosition();return{x:(v.x*.5+.5)*innerWidth,y:(-.5*v.y+.5)*innerHeight};}
 function returnParticle(){$('particle').style.left='';$('particle').style.top='';$('particle').style.bottom='';$('particle').style.transform='';}
 function placeParticle(){
  if(animation||state.phase!=='nucleus')return;
  const index=state.parts;if(!state.place(state.expected))return;
  animation={index,progress:0,from:new THREE.Vector3(0,-5,2)};flight=reduced?0:1.8;
  feedback.chime(state.parts);feedback.haptic(state.phase==='complete'?'complete':'connect');
  $('notice').textContent=state.phase==='complete'?'Helio-4: dos protones y dos neutrones.':'Partícula conectada.';save();updateUI();
 }
 $('particle').addEventListener('pointerdown',e=>{if(animation||state.phase!=='nucleus')return;e.preventDefault();feedback.unlock();flight=0;drag={id:e.pointerId,moved:false};$('particle').setPointerCapture(e.pointerId);controls.enabled=false;feedback.haptic('begin');});
 $('particle').addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;drag.moved=true;$('particle').style.left=`${e.clientX}px`;$('particle').style.top=`${e.clientY}px`;$('particle').style.bottom='auto';$('particle').style.transform='translate(-50%,-50%)';});
 $('particle').addEventListener('pointerup',e=>{if(!drag)return;const target=screenTarget(),valid=Math.hypot(e.clientX-target.x,e.clientY-target.y)<65;drag=null;returnParticle();controls.enabled=true;if(valid)placeParticle();else feedback.haptic('reject');});
 $('particle').addEventListener('pointercancel',()=>{drag=null;returnParticle();controls.enabled=true;});
 $('particle').onclick=e=>{if(e.detail===0)placeParticle();};
 function visibility(value){active=value;if(!active){drag=null;returnParticle();flight=0;pauseJourney();}}
 window.addEventListener('machines:visibility',e=>visibility(Boolean(e.detail)));document.addEventListener('visibilitychange',()=>visibility(!document.hidden));window.addEventListener('pagehide',save);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();pauseJourney();$('failure').hidden=false;});
 let previous=performance.now(),elapsed=0,lastPulse=0;
 function frame(now){requestAnimationFrame(frame);const wallDelta=Math.max(0,(now-previous)/1000),dt=Math.min(wallDelta,.1);previous=now;if(!active)return;
  const before=state.phase;
  if(state.running){let remaining=wallDelta/5;while(remaining>0&&state.running){const increment=Math.min(.05,remaining);state.advance(increment);remaining-=increment;}elapsed+=dt;
   if(now-lastPulse>1200){feedback.haptic('progress');lastPulse=now;}
   if(state.phase!==before){feedback.chime(state.phase==='cooling'?0:1);feedback.haptic('checkpoint');controls.enabled=true;flight=state.phase==='nucleus'&&!reduced?2.4:0;save();}
   if(now-lastSaved>1000){save();lastSaved=now;}updateUI();
  }
  feedback.evolve(state.expansion,state.running&&!$('explanation').open);
  uniforms.clock.value=reduced?0:elapsed;uniforms.evolution.value=state.expansion;
  const visible=state.phase==='nucleus'||state.phase==='complete';nucleus.visible=visible;
  meshes.forEach(({sphere,ghost},i)=>{sphere.visible=i<state.parts;ghost.visible=i===state.parts;sphere.position.copy(offsets[i]);});
  marker.visible=state.phase==='nucleus';if(marker.visible){marker.position.copy(offsets[state.parts]);marker.lookAt(camera.position);}
  if(!reduced&&state.running){const e=state.expansion;const desired=new THREE.Vector3(Math.sin(e*5)*12,Math.cos(e*4)*5,32-e*13);camera.position.lerp(desired,dt*2);camera.lookAt(0,0,0);controls.target.set(0,0,0);}
  if(flight>0&&!reduced&&!$('explanation').open&&!drag){flight=Math.max(0,flight-dt);const angle=state.parts*.52+.2;camera.position.lerp(new THREE.Vector3(Math.sin(angle)*18,4,Math.cos(angle)*18),dt*2);camera.lookAt(0,0,0);controls.target.set(0,0,0);}
  if(animation){if(!cameraBusy&&!$('explanation').open&&!drag)animation.progress=Math.min(1,animation.progress+dt/(reduced?.001:.65));
   const t=animation.progress;meshes[animation.index].sphere.position.lerpVectors(animation.from,offsets[animation.index],1-Math.pow(1-t,3));if(t===1){animation=null;updateUI();}
  }
  if(state.phase==='nucleus'){
   const target=screenTarget();$('drop-target').hidden=false;$('guide').hidden=false;$('drop-target').style.left=`${target.x}px`;$('drop-target').style.top=`${target.y}px`;
   const rect=$('particle').getBoundingClientRect(),x=rect.x+rect.width/2,y=rect.y+rect.height/2;$('guide').firstElementChild.setAttribute('d',`M${x},${y} Q${x-50},${target.y+50} ${target.x},${target.y}`);
  }else{$('drop-target').hidden=true;$('guide').hidden=true;}
  $('chapter').style.opacity=now<chapterUntil?'1':'0';controls.update();render();
 }
 updateUI();requestAnimationFrame(frame);
}catch(error){$('failure').hidden=false;console.error('Machines origin renderer failed',error);}
