import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// B100 M-U0026, iFixit guide 173556. One unit is approximately 10 mm.
// Photographic proportions, not measured internal CAD. See ../B100-reference.md.
const material = (color, roughness = .5, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const palette = {
  shell: material('#232429', .46), button: material('#232429', .46),
  base: material('#111214', .6), seam: material('#141518', .65), rubber: material('#242528', .9),
  board: material('#b78225', .68), copper: material('#b3a367', .45, .5),
  silver: material('#a3b1ad', .28, .8), chip: material('#252c2b', .62),
  white: material('#e1e5db', .65), red: material('#a43122', .42), ceramic: material('#b19a71', .75),
  lens: new THREE.MeshPhysicalMaterial({ color: '#bcded6', roughness: .12, metalness: 0, transparent: true, opacity: .72, transmission: .3, thickness: .4 }),
};

function mesh(parent, name, geometry, mat, position = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, mat);
  item.name = `Machines.mouse.${name}`;
  item.position.set(...position);
  item.castShadow = true;
  item.receiveShadow = true;
  parent.add(item);
  return item;
}
function box(parent, name, size, position, mat, radius = .04) {
  return mesh(parent, name, new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map(v => v / 3))), mat, position);
}
function cylinder(parent, name, radius, height, position, mat, segments = 40) {
  return mesh(parent, name, new THREE.CylinderGeometry(radius, radius, height, segments), mat, position);
}
function tube(parent, name, points, radius, mat, segments = 64) {
  return mesh(parent, name, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), segments, radius, 10, false), mat);
}
function width(z) {
  // Front is broad; rear closes into a rounded palm end.
  const t=(z+5.4)/10.8;
  return 3.085 * Math.sqrt(Math.max(.0001,1-Math.pow((t-.45)/.55,4)));
}
function surface(u,z) {
  const t=(z+5.4)/10.8;
  const dome=(1.65+2.4*t)*Math.pow(Math.max(0,Math.sin(Math.PI*(.10+.90*t))),.65);
  return [u*width(z), .79+dome*Math.pow(Math.max(0,1-u*u),.58),z];
}

// A thick curved patch, generated directly from its surface equation.
function shellPatch(z0, z1, u0, u1, rows = 70, columns = 40) {
  const positions = [], indices = [];
  const stride = columns + 1, count = (rows + 1) * stride;
  for (let layer = 0; layer < 2; layer++) {
    for (let row = 0; row <= rows; row++) {
      const z = z0 + (z1 - z0) * row / rows;
      for (let col = 0; col <= columns; col++) {
        const u = u0 + (u1 - u0) * col / columns;
        const [x, y, pz] = surface(u, z);
        positions.push(x, y - layer * .105, pz);
      }
    }
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * stride + col, b = a + 1, c = a + stride, d = c + 1;
    indices.push(a, c, b, b, c, d, a + count, b + count, c + count, b + count, d + count, c + count);
  }
  const boundary = [];
  for (let col = 0; col <= columns; col++) boundary.push(col);
  for (let row = 1; row <= rows; row++) boundary.push(row * stride + columns);
  for (let col = columns - 1; col >= 0; col--) boundary.push(rows * stride + col);
  for (let row = rows - 1; row > 0; row--) boundary.push(row * stride);
  for (let i = 0; i < boundary.length; i++) {
    const a = boundary[i], b = boundary[(i + 1) % boundary.length];
    indices.push(a, b, a + count, b, b + count, a + count);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
function footprint(scale = 1) {
  const shape = new THREE.Shape();
  const samples = [];
  for (let i = 0; i <= 100; i++) {
    const z = -5.4 + 10.8 * i / 100;
    samples.push([width(z) * scale, -z * scale]);
  }
  for (let i = 100; i >= 0; i--) {
    const z = -5.4 + 10.8 * i / 100;
    samples.push([-width(z) * scale, -z * scale]);
  }
  shape.moveTo(...samples[0]);
  samples.slice(1).forEach(p => shape.lineTo(...p));
  shape.closePath();
  return shape;
}
function extruded(parent, name, shape, depth, y, mat, bevel = .04) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 32 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(parent, name, geometry, mat, [0, y, 0]);
}
function screw(parent, name, x, y, z) {
  cylinder(parent, `${name}.shaft`, .1, .3, [x, y - .12, z], palette.silver);
  cylinder(parent, `${name}.head`, .19, .065, [x, y + .045, z], palette.silver);
  box(parent, `${name}.slot-x`, [.23, .008, .035], [x, y + .081, z], palette.chip, .003);
  box(parent, `${name}.slot-z`, [.035, .008, .23], [x, y + .081, z], palette.chip, .003);
}
function chip(parent, name, center, size, pins = 4) {
  const [x, y, z] = center, [w, h, d] = size;
  box(parent, name, size, center, palette.chip);
  for (let i = 0; i < pins; i++) for (const side of [-1, 1]) {
    box(parent, `${name}.pin.${side}.${i}`, [.2, .08, .10], [x + side * (w / 2 + .07), y - h / 3, z - d * .37 + i * d * .74 / (pins - 1)], palette.silver, .015);
  }
  cylinder(parent, `${name}.index`, .045, .008, [x - w * .3, y + h / 2 + .006, z - d * .3], palette.white, 16);
}

export function createMouse() {
  const group = new THREE.Group();
  group.name = 'Machines.mouse';
  const shell = new THREE.Group();
  shell.name = 'Machines.mouse.removable-shell';
  group.add(shell);
  mesh(shell, 'palm-shell', shellPatch(-.65, 5.4, -1, 1), palette.shell);
  mesh(shell, 'left-button', shellPatch(-5.4, -.65, -1, -.065), palette.button);
  mesh(shell, 'right-button', shellPatch(-5.4, -.65, .065, 1), palette.button);
  // The center bridge leaves a real opening around the wheel.
  mesh(shell, 'front-bridge', shellPatch(-5.4, -3.55, -.063, .063, 30, 12), palette.shell);
  mesh(shell, 'rear-bridge', shellPatch(-2.28, -.65, -.063, .063, 20, 12), palette.shell);

  // Hollow lower shell, four individual feet, rear closure boss and molded ribs.
  const baseShape = footprint(.977);
  const aperture = new THREE.Path();
  aperture.absellipse(0,-.35,.28,.55,0,Math.PI*2,true);
  baseShape.holes.push(aperture);
  const screwHole=new THREE.Path();screwHole.absellipse(0,-4.25,.17,.17,0,Math.PI*2,true);baseShape.holes.push(screwHole);
  extruded(group,'base',baseShape,.18,.18,palette.base,.025);
  const rimShape=footprint(.988),inner=footprint(.925);
  rimShape.holes.push(new THREE.Path(inner.getPoints().reverse()));
  extruded(group,'base-rim',rimShape,.64,.36,palette.seam,.025);
  for(const [row,z,x] of [['front',-4.35,2.25],['rear',4.05,1.65]])for(const side of [-1,1]){
    const foot=cylinder(group,`glide.${row}.${side}`,.37,.055,[side*x,.115,z],palette.rubber,40);
    foot.scale.z=1.12;
    const recess=cylinder(group,`base-foot-seat.${row}.${side}`,.44,.04,[side*x,.16,z],palette.base,40);recess.scale.z=1.12;
  }
  function boss(name,x,z,radius,height){
    const shape=new THREE.Shape();shape.absarc(0,0,radius,0,Math.PI*2,false);
    const hole=new THREE.Path();hole.absarc(0,0,radius*.46,0,Math.PI*2,true);shape.holes.push(hole);
    const item=extruded(group,`base-${name}`,shape,height,.35,palette.base,.008);item.position.x=x;item.position.z=z;
  }
  boss('closure-boss',0,4.25,.34,.94);
  for(const side of [-1,1]){
    box(group,`base-board-rail.${side}`,[.10,.28,5.7],[side*2.17,.5,-.7],palette.base,.012);
    for(const [i,z] of [[0,-3.2],[1,1.8]]){
      box(group,`base-board-tab.${side}.${i}`,[.3,.45,.48],[side*2.08,.59,z],palette.base,.02);
      box(group,`base-cross-rib.${side}.${i}`,[.60,.29,.065],[side*2.48,.48,z],palette.base,.008);
    }
    box(group,`base-wheel-cradle.${side}`,[.20,.65,.6],[side*.62,.67,-2.9],palette.base,.02);
    box(group,`base-shell-clip.${side}`,[.25,.40,.40],[side*2.57,.72,.55],palette.base,.02);
    box(group,`base-cable-bracket.${side}`,[.16,.47,.52],[side*.32,.60,-4.98],palette.base,.015);
  }
  const lensFrame=new THREE.Shape();lensFrame.moveTo(-.62,.35);lensFrame.lineTo(.62,.35);lensFrame.lineTo(.62,-1.05);lensFrame.lineTo(-.62,-1.05);lensFrame.closePath();
  const lensOpening=new THREE.Path();lensOpening.absellipse(0,-.35,.28,.55,0,Math.PI*2,true);lensFrame.holes.push(lensOpening);
  extruded(group,'base-optical-seat',lensFrame,.25,.36,palette.base,.01);

  const internals=new THREE.Group();internals.name='Machines.mouse.internals';group.add(internals);
  // Amber single-sided board, front wheel opening, stepped rear corners.
  const boardShape=new THREE.Shape();
  boardShape.moveTo(-2.13,-2.70);boardShape.lineTo(-2.13,4.55);boardShape.lineTo(2.13,4.55);
  boardShape.lineTo(2.13,-2.10);boardShape.lineTo(1.95,-2.10);boardShape.lineTo(1.95,-2.42);
  boardShape.lineTo(1.75,-2.42);boardShape.lineTo(1.75,-2.70);boardShape.closePath();
  const wheelHole=new THREE.Path();wheelHole.moveTo(-.75,1.65);wheelHole.lineTo(.75,1.65);wheelHole.lineTo(.75,3.82);wheelHole.lineTo(-.75,3.82);wheelHole.closePath();boardShape.holes.push(wheelHole);
  for(const [x,z,r] of [[1.42,-2.12,.13],[-1.40,3.9,.12],[1.4,.45,.08]]){
    const hole=new THREE.Path();hole.absellipse(x,z,r,r,0,Math.PI*2,true);boardShape.holes.push(hole);
  }
  extruded(internals,'pcb',boardShape,.12,.89,palette.board,.008);
  extruded(internals,'pcb-underside',boardShape,.02,.867,material('#4d8146',.65),0);
  // Through-hole solder pads and representative underside paths. No netlist claim.
  for(const [i,x,z] of [[0,-1.6,-3.8],[1,1.6,-3.8],[2,0,.35],[3,1.45,1.75]])
    cylinder(internals,`mount-pad.${i}`,.095,.025,[x,.872,z],palette.silver,16);
  for(const side of [-1,1])for(let i=0;i<7;i++){
    const x=side*(.58+.14*i),z=-.15+i*.25;
    tube(internals,`trace.${side}.${i}`,[[x,.87,z],[side*1.8,.87,z+.2],[side*1.8,.87,2.2+i*.15]],.025,material('#25492d',.7),12);
    cylinder(internals,`via.${side}.${i}`,.06,.022,[x,.875,z],palette.silver,12);
  }
  for(const side of [-1,1]){
    box(internals,`primary-switch.${side}`,[.69,.65,1.53],[side*1.4,1.35,-3.65],palette.chip);
    box(internals,`primary-switch-plunger.${side}`,[.22,.10,.27],[side*1.4,1.72,-3.88],palette.chip,.012);
    for(let i=0;i<3;i++)box(internals,`switch-pin.${side}.${i}`,[.08,.1,.12],[side*1.4,.87,-4.1+i*.5],palette.silver,.006);
    tube(internals,`switch-trace.${side}`,[[side*1.4,.87,-3.4],[side*1.9,.87,-2.0],[side*.6,.87,.2]],.027,material('#25492d',.7),16);
  }
  // Optical scroll wheel, not a metal mechanical encoder.
  const wheel=new THREE.Group();wheel.name='Machines.mouse.wheel';wheel.position.set(0,2.25,-2.75);group.add(wheel);
  const tire=cylinder(wheel,'wheel-tire',.80,.40,[0,0,0],palette.rubber,64);tire.rotation.z=Math.PI/2;
  for(const side of [-1,1]){
    const hub=cylinder(wheel,`wheel-hub.${side}`,.56,.03,[side*.215,0,0],palette.chip,48);hub.rotation.z=Math.PI/2;
    for(let i=0;i<36;i++){
      const angle=i*Math.PI*2/36;
      const slot=box(wheel,`wheel-optical-slot.${side}.${i}`,[.034,.075,.13],[side*.235,Math.cos(angle)*.43,Math.sin(angle)*.43],palette.seam,.003);slot.rotation.x=-angle;
    }
  }
  for(let i=0;i<40;i++){
    const angle=i*Math.PI*2/40;
    const tread=box(wheel,`wheel-tread.${i}`,[.42,.025,.07],[0,Math.cos(angle)*.8,Math.sin(angle)*.8],palette.chip,.009);tread.rotation.x=angle;
  }
  const axle=cylinder(wheel,'wheel-axle',.08,1.40,[0,0,0],palette.chip);axle.rotation.z=Math.PI/2;
  box(internals,'wheel-support',[1.12,.38,1.40],[0,1.13,-2.75],palette.chip,.04);
  for(const side of [-1,1])box(internals,`wheel-support-arm.${side}`,[.18,.68,.37],[side*.57,1.91,-2.75],palette.chip,.025);
  box(internals,'wheel-encoder-emitter',[.27,.45,.29],[-1.04,1.24,-3.01],material('#293449'),.015);
  box(internals,'wheel-encoder-receiver',[.28,.55,.29],[-.45,1.33,-3.01],palette.chip,.015);
  box(internals,'middle-switch',[.67,.43,1.0],[-1.45,1.20,-2.56],palette.chip,.025);
  box(internals,'middle-switch-plunger',[.18,.14,.25],[-1.45,1.48,-2.55],palette.red,.01);
  tube(internals,'wheel-support-detent-spring',[[-1.33,1.50,-2.95],[-1.5,1.52,-2.66],[-1.0,1.59,-2.56],[-.85,1.65,-2.26],[-.3,1.96,-2.25]],.024,palette.silver,30);
  const spring=[];for(let i=0;i<=80;i++){const t=i/80,angle=t*Math.PI*10;spring.push([.59+t*.25,2.23+.13*Math.cos(angle),-2.75+.13*Math.sin(angle)]);}
  spring.unshift([.59,1.30,-2.35]);spring.push([.93,1.25,-3.25]);
  tube(internals,'wheel-support-return-spring',spring,.022,palette.silver,80);

  // The photographed metal-capped optical package integrates the controller.
  chip(internals,'optical-sensor',[0,1.21,.35],[1.04,.40,1.13],4);
  box(internals,'optical-sensor-cap',[1.06,.08,1.15],[0,1.45,.35],palette.silver,.015);
  for(const [i,x,z] of [[0,-.37,-.02],[1,.37,-.02],[2,-.37,.7],[3,.37,.7],[4,0,.35]])
    cylinder(internals,`optical-sensor-cap-hole.${i}`,.045,.008,[x,1.495,z],palette.chip,12);
  box(internals,'optical-housing',[1.20,.18,1.36],[0,.72,.35],palette.lens,.05);
  const lens=mesh(internals,'optical-lens',new THREE.SphereGeometry(.30,32,20),palette.lens,[0,.33,.35]);lens.scale.set(1,.4,1.5);
  box(internals,'light-guide',[.65,.34,1.16],[0,.67,1.37],palette.lens,.06);
  box(internals,'led-seat',[.90,.12,.58],[0,1.08,2.04],palette.chip,.02);
  for(const side of [-1,1])box(internals,`illumination-led.${side}`,[.34,.53,.8],[side*.27,1.33,1.95],palette.red,.045);
  cylinder(internals,'capacitor.0',.16,.48,[1.10,1.24,1.63],palette.chip,32);
  cylinder(internals,'capacitor-cap.0',.15,.02,[1.10,1.49,1.63],palette.silver,32);
  for(const [i,x,z] of [[0,-.87,.85],[1,-.87,-.75],[2,.83,2.45]]){
    box(internals,`smd.${i}`,[.12,.12,.38],[x,1.065,z],palette.ceramic,.014);
    tube(internals,`smd-terminal.${i}` ,[[x,.97,z-.5],[x,1.065,z-.23],[x,1.065,z+.23],[x,.97,z+.5]],.022,palette.silver,16);
  }
  for(const [i,x,z] of [[0,.85,-.40],[1,-.9,-1.3]])tube(internals,`controller-jumper.${i}`,[[x,.97,z-.44],[x,1.04,z-.37],[x,1.04,z+.37],[x,.97,z+.44]],.027,palette.silver,16);
  // Rear-right connector; conductors travel along the right shell wall.
  box(internals,'cable-header',[.83,.45,.49],[1.45,1.27,1.70],palette.white,.025);
  ['#303030','#489050','#eee8d6','#b44334'].forEach((color,i)=>{
    const x=1.17+i*.18;
    tube(internals,`cable-conductor.${i}`,[[x,1.3,1.70],[2.38,1.1,1.3],[2.5,.8,-2.4],[1.8,.70,-4.75],[0,.80,-5.35]],.038,material(color),40);
  });
  const closure=new THREE.Group();group.add(closure);closure.position.set(0,.15,4.25);closure.rotation.x=Math.PI;
  screw(closure,'pcb-screw.closure',0,0,0);
  const strainRelief = cylinder(group, 'strain-relief', .21, .9, [0, .80, -5.48], palette.rubber); strainRelief.rotation.x = Math.PI / 2;
  for (let i = 0; i < 6; i++) {
    const rib = mesh(group, `strain-relief-rib.${i}`, new THREE.TorusGeometry(.21, .035, 8, 32), palette.rubber, [0, .8, -5.13 - i * .13]);
    rib.castShadow = true;
  }
  tube(group, 'usb-cable', [[0, .8, -5.8], [-.1, .50, -6.8], [-1.2, .27, -7.5], [-3.2, .26, -7.5], [-4.65, .25, -8.3], [-4.8, .26, -9.4], [-3.8, .28, -10.4], [-2.35, .30, -10.55]], .135, palette.rubber, 128);
  const plug = new THREE.Group(); plug.name = 'Machines.mouse.usb-plug'; group.add(plug); plug.position.set(-2.35, .3, -10.55); plug.rotation.y = -Math.PI / 2;
  box(plug, 'usb-grip', [.78, .45, 1.18], [0, 0, -.50], palette.rubber, .13);
  box(plug, 'usb-metal', [.68, .29, .81], [0, 0, -1.42], palette.silver, .035);
  box(plug, 'usb-insert', [.54, .11, .04], [0, -.05, -1.85], palette.chip, .01);
  for (const x of [-.16, .16]) box(plug, `usb-latch.${x}`, [.13, .008, .18], [x, .15, -1.47], palette.chip, .01);

  return { group, shell, internals, wheel };
}
