import * as THREE from 'three';

// Render the lesson medallions once. DOM-owned images scroll atomically with
// their labels, avoiding a second live canvas drifting behind native scrolling.
export function createCourseEffects() {
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setSize(240,160);renderer.setPixelRatio(2);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1.65,1.65,1.1,-1.1,.1,30);
  camera.position.set(0,7,10);camera.lookAt(0,0,0);
  scene.add(new THREE.AmbientLight('#ffffff',2.2));
  const light=new THREE.DirectionalLight('#ffffff',3);light.position.set(-3,7,4);scene.add(light);
  const group=new THREE.Group();scene.add(group);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(1.08,1.16,.22,96),new THREE.MeshStandardMaterial({roughness:.8}));
  group.add(body);
  const face=new THREE.Mesh(new THREE.CylinderGeometry(.88,.88,.025,96),new THREE.MeshBasicMaterial());
  face.position.y=.13;group.add(face);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.67,.80,96),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));
  ring.rotation.x=-Math.PI/2;ring.position.y=.148;group.add(ring);
  const images={};
  for(const [state,colors] of Object.entries({complete:['#4166f5','#a7b7ff','#d2dcff'],current:['#4166ff','#eef1ff','#cbd5ff'],locked:['#414348','#56585e','#696c74']})){
    body.material.color.set(colors[0]);face.material.color.set(colors[1]);ring.material.color.set(colors[2]);
    renderer.render(scene,camera);images[state]=renderer.domElement.toDataURL();
  }
  group.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});
  renderer.dispose();renderer.forceContextLoss();
  return {setElements(elements){
    for(const element of elements){
      const coin=element.querySelector('.lesson-coin');
      if(coin)coin.style.backgroundImage=`url("${images[element.dataset.state]??images.locked}")`;
    }
  }};
}
