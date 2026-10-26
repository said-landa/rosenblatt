// Synthetic feedback, not sound propagating through the early universe.
export class OriginFeedback {
 constructor(){this.context=null;this.playing=false;this.native=Boolean(window.webkit?.messageHandlers?.machinesFeedback);}
 haptic(kind){window.webkit?.messageHandlers?.machinesFeedback?.postMessage({kind});}
 unlock(){
  if(this.native){this.haptic('soundStart');this.playing=true;return;}
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
  if(!this.context){const c=this.context=new Audio();this.volume=c.createGain();this.volume.gain.value=0;this.volume.connect(c.destination);
   this.drone=c.createOscillator();this.drone.type='sine';this.drone.frequency.value=220;this.drone.connect(this.volume);this.drone.start();
   const second=c.createOscillator(),g=c.createGain();second.frequency.value=330;g.gain.value=.2;second.connect(g);g.connect(this.volume);second.start();
  }
  this.context.resume().catch(error=>{console.warn('Machines audio activation failed',error);document.getElementById('notice').textContent='Sound could not start.';});
 }
 evolve(progress,running){
  if(this.native){if(this.playing&&!running){this.haptic('soundStop');this.playing=false;}return;}
  if(!this.context)return;const c=this.context;this.volume.gain.setTargetAtTime(running?.18:0,c.currentTime,.15);this.drone.frequency.setTargetAtTime(180+(1-progress)*70,c.currentTime,.25);
 }
 chime(step){
  if(this.native){this.haptic('soundCheckpoint');return;}
  if(!this.context)return;const c=this.context,o=c.createOscillator(),g=c.createGain();o.frequency.value=[196,247,330,440][step]||440;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.18,c.currentTime+.025);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.9);o.start();o.stop(c.currentTime+.92);
 }
}
