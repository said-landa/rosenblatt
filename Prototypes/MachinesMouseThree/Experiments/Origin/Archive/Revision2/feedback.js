// Synthetic sound is a perceptual cue, not sound traveling through a vacuum.
export class OriginFeedback {
 constructor(){this.muted=false;this.context=null;}
 unlock(){
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return;
  if(!this.context){
   this.context=new Audio();const c=this.context;
   this.volume=c.createGain();this.volume.gain.value=0;this.volume.connect(c.destination);
   this.filter=c.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=1200;this.filter.connect(this.volume);
   const buffer=c.createBuffer(1,c.sampleRate*2,c.sampleRate),data=buffer.getChannelData(0);let previous=0;
   for(let i=0;i<data.length;i++){previous=(previous+(Math.random()*2-1)*.025)/1.025;data[i]=previous*4;}
   const noise=c.createBufferSource();noise.buffer=buffer;noise.loop=true;noise.connect(this.filter);noise.start();
   this.drone=c.createOscillator();this.drone.type='sine';this.drone.frequency.value=70;
   const droneGain=c.createGain();droneGain.gain.value=.12;this.drone.connect(droneGain);droneGain.connect(this.filter);this.drone.start();
  }
  this.context.resume().catch(()=>{});
 }
 evolve(progress,running){if(!this.context)return;const c=this.context;this.volume.gain.setTargetAtTime(running&&!this.muted?.16:0,c.currentTime,.14);this.filter.frequency.setTargetAtTime(160+(1-progress)*1700,c.currentTime,.25);this.drone.frequency.setTargetAtTime(48+(1-progress)*90,c.currentTime,.2);}
 chime(step){this.unlock();if(!this.context||this.muted)return;const c=this.context,o=c.createOscillator(),g=c.createGain();o.frequency.value=[196,247,294,392,523][step]||392;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.08,c.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.7);o.start();o.stop(c.currentTime+.72);}
 haptic(kind){window.webkit?.messageHandlers?.machinesFeedback?.postMessage({kind});}
}
