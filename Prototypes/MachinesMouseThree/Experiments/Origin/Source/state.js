// Authored checkpoints, not a cosmological solver. No claim to recreate an unknown origin.
export const STORAGE_KEY = 'machines.origin.v3';
export class OriginState {
 constructor(saved) {
  this.stage=0;this.progress=0;this.running=false;
  if(saved?.version===3&&Number.isInteger(saved.stage)&&saved.stage>=0&&saved.stage<=3&&Number.isFinite(saved.progress)&&saved.progress>=0&&saved.progress<1&&(saved.stage<3||saved.progress===0)){
   this.stage=saved.stage;this.progress=saved.progress;
  }
 }
 get phase(){return ['beginning','expansion','cooling','complete'][this.stage];}
 start(){if(this.stage===3||this.running)return false;this.running=true;return true;}
 pause(){this.running=false;}
 advance(delta){
  if(!this.running||!Number.isFinite(delta)||delta<=0)return false;
  this.progress=Math.min(1,this.progress+Math.min(delta,.05));
  if(this.progress>=1-1e-9){this.stage++;this.progress=0;this.running=false;}
  return true;
 }
 snapshot(){return{version:3,stage:this.stage,progress:this.progress};}
}
