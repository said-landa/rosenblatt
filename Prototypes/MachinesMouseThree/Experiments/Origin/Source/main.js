import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OriginState, STORAGE_KEY } from './state.js';
import { OriginFeedback } from './feedback.js';
const $=id=>document.getElementById(id),feedback=new OriginFeedback();
let saved;try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY));}catch{}
let state=new OriginState(saved),active=true,lastSaved=0,lastPulse=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const copy=[
 ['THE EARLY UNIVERSE','Where does it begin?',"We don't know what came before.<br>Begin with a hot, dense universe."],
 ['01 / SPACE','Space expands','Distances grow everywhere.<br>There is no explosion center.'],
 ['02 / TEMPERATURE','Expansion brings cooling','The hot particle soup cools.<br>Atoms and stars come later.'],
 ['OPENING COMPLETE','Before we build an atom','First, we need to understand its particles.<br>That is the next chapter.']
];
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state.snapshot()));}catch{$('notice').textContent='Progress could not be saved.';}}
function updateUI(){
 document.body.dataset.phase=state.phase;document.body.dataset.running=String(state.running);
 let text=copy[state.stage];
 if(state.stage===0&&state.progress>.12)text=['00 / EARLY CONDITIONS','Hot. Dense. No atoms yet.','The glow represents a hot particle soup.<br>It is a visual model, not a photograph.'];
 $('chapter').textContent=text[0];$('title').textContent=text[1];$('meaning').innerHTML=text[2];
 $('focus').hidden=state.stage===3;$('replay').hidden=state.stage!==3;
 $('focus').setAttribute('aria-label',`Hold to ${['begin','expand space','continue cooling'][state.stage]||'begin'}`);
 $('cue').textContent=state.stage===3?'Replay':state.running?'Release to pause and look around':state.stage===0&&state.progress===0?'Hold to begin · release to pause':'Hold to continue · drag the view to explore';
 $('progress').setAttribute('aria-valuenow',String(Math.round((state.stage+state.progress)/3*100)));
 [...$('steps').children].forEach((dot,i)=>dot.classList.toggle('done',i<state.stage));
}
// Prevent WebKit selection and touch callouts over the entire authored surface.
for(const event of ['contextmenu','selectstart'])document.addEventListener(event,e=>e.preventDefault());
try{
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#05060d');renderer.outputColorSpace=THREE.SRGBColorSpace;
 $('viewport').append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(62,1,.2,650);
 const path=new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,0,110),new THREE.Vector3(12,-5,60),new THREE.Vector3(-15,9,10),
  new THREE.Vector3(14,5,-40),new THREE.Vector3(-8,-8,-95),new THREE.Vector3(4,2,-160)
 ]);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableDamping=true;controls.minDistance=5;controls.maxDistance=55;
 const volume=new THREE.Group();scene.add(volume);
 let seed=283;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const uniforms={heat:{value:1},reveal:{value:0},clock:{value:0},pixelRatio:{value:renderer.getPixelRatio()}};
 const positions=new Float32Array(9000*3),sizes=new Float32Array(9000);
 for(let i=0;i<sizes.length;i++){positions[i*3]=(random()-.5)*150;positions[i*3+1]=(random()-.5)*130;positions[i*3+2]=(random()-.5)*420;sizes[i]=random();}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('seed',new THREE.BufferAttribute(sizes,1));
 const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
 vertexShader:`uniform float clock,pixelRatio;attribute float seed;varying float intensity,depth;void main(){vec3 p=position;p+=vec3(sin(clock*.35+seed*30.),cos(clock*.28+seed*19.),sin(clock*.22+seed*11.))*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;depth=-mv.z;gl_PointSize=clamp((.8+seed*seed*4.)*pixelRatio*180./max(3.,depth),1.,90.);intensity=.18+seed*.6;}`,
 fragmentShader:`uniform float heat,reveal;varying float intensity,depth;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;float glow=exp(-d*d*5.)*(1.-smoothstep(.7,1.,d));vec3 color=mix(vec3(.65,.32,.18),vec3(1.,.72,.38),heat);gl_FragColor=vec4(color,glow*intensity*reveal*exp(-max(0.,depth)*.006));}`});
 volume.add(new THREE.Points(geo,material));
 // Flowing filaments are artistic visibility/depth cues, not literal cosmic strings or particle trajectories.
 const ribbons=[];
 for(let j=0;j<54;j++){
  const x=(random()-.5)*130,y=(random()-.5)*100,z=(random()-.5)*350,r=2+random()*7;
  const points=[];for(let i=0;i<100;i++){const t=i/99;points.push(new THREE.Vector3(x+Math.sin(t*7+j)*r,y+Math.cos(t*5+j)*r,z+(t-.5)*55));}
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:'#ffc581',transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));volume.add(line);ribbons.push(line);
 }
 // Translucent, camera-facing layers sit at different depths, providing volumetric parallax.
 const mistMaterial=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
 vertexShader:'varying vec2 uv0;varying vec3 world;void main(){uv0=uv;world=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`uniform float reveal,heat;varying vec2 uv0;varying vec3 world;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
 void main(){vec2 p=(uv0-.5)*2.;vec2 q=world.xy*.035+world.z*.04;float n=noise(q)*.6+noise(q*2.1)*.3+noise(q*4.3)*.1;float a=exp(-dot(p,p)*2.7)*(.06+n*.18)*reveal;vec3 c=mix(vec3(.32,.065,.06),vec3(.95,.28,.06),heat);gl_FragColor=vec4(c,a);}`});
 const mist=[];for(let i=0;i<26;i++){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(120,120),mistMaterial);mesh.position.set((random()-.5)*100,(random()-.5)*85,(random()-.5)*400);volume.add(mesh);mist.push(mesh);}
 function setCamera(){const journey=(state.stage+state.progress)/3;const t=reduced?0:journey*.91;camera.position.copy(path.getPointAt(t));controls.target.copy(path.getPointAt(Math.min(.999,t+.035)));camera.lookAt(controls.target);}
 setCamera();
 function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}addEventListener('resize',resize);resize();
 function pause(){state.pause();controls.enabled=true;feedback.evolve(0,false);save();updateUI();}
 function begin(){if(!active||!state.start())return;feedback.unlock();feedback.haptic('begin');controls.enabled=false;updateUI();}
 $('focus').addEventListener('pointerdown',e=>{e.preventDefault();$('focus').setPointerCapture(e.pointerId);begin();});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])$('focus').addEventListener(event,pause);
 $('focus').onclick=e=>{if(e.detail===0){if(state.running)pause();else begin();}};
 controls.addEventListener('start',pause);
 $('replay').onclick=()=>{pause();state=new OriginState();save();setCamera();updateUI();};
 function visibility(value){active=value;if(!active)pause();}
 addEventListener('machines:visibility',e=>visibility(Boolean(e.detail)));document.addEventListener('visibilitychange',()=>visibility(!document.hidden));addEventListener('pagehide',pause);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();pause();$('failure').hidden=false;});
 let previous=performance.now(),clock=0;
 function frame(now){requestAnimationFrame(frame);const wall=Math.max(0,(now-previous)/1000),dt=Math.min(wall,.1);previous=now;if(!active)return;
  if(state.running){const before=state.stage;let remaining=Math.min(wall,.25)/8;while(remaining>0&&state.running){const step=Math.min(.05,remaining);state.advance(step);remaining-=step;}
   clock+=dt;if(!reduced)setCamera();
   if(now-lastPulse>1600){feedback.haptic('progress');lastPulse=now;}
   if(state.stage!==before){feedback.chime(state.stage);feedback.haptic(state.stage===3?'complete':'checkpoint');controls.enabled=true;save();}
   if(now-lastSaved>1000){save();lastSaved=now;}updateUI();
  }
  const reveal=state.stage>0?1:Math.min(1,state.progress*3),expansion=state.stage<1?0:state.stage===1?state.progress:1+(state.stage===2?state.progress*.3:.3);
  uniforms.reveal.value=reveal;uniforms.heat.value=1-expansion*.55;uniforms.clock.value=reduced?0:clock;
  volume.scale.setScalar(1+expansion*.8);
  ribbons.forEach(line=>{line.material.opacity=reveal*(.12-expansion*.045);line.material.color.setRGB(1,.6-expansion*.2,.28);});
  mist.forEach(mesh=>mesh.quaternion.copy(camera.quaternion));
  feedback.evolve((state.stage+state.progress)/3,state.running);controls.update();renderer.render(scene,camera);
 }
 updateUI();requestAnimationFrame(frame);
}catch(error){$('failure').hidden=false;console.error('Machines origin renderer failed',error);}
