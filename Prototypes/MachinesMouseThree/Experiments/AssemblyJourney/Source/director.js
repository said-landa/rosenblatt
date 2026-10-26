// Camera ownership and authored paths are independent of Three.js.
import { clamp, ease } from './model.js';
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
export class CameraDirector {
  constructor(shot, reduced = false) {
    this.position = [...shot.position]; this.target = [...shot.target];
    this.home = shot; this.mode = 'settled'; this.reduced = reduced; this.elapsed = 0;
  }
  travel(shot, { home = true, duration = 3.5 } = {}) {
    if (home) this.home = shot;
    this.from = { position: [...this.position], target: [...this.target] };
    this.to = shot; this.duration = duration; this.elapsed = 0;
    this.mode = this.reduced ? 'settled' : 'travel';
    if (this.reduced) { this.position = [...shot.position]; this.target = [...shot.target]; }
  }
  inspect(dx = 0, dy = 0) {
    this.mode = 'inspect';
    const offset = this.position.map((v, i) => v - this.target[i]);
    const radius = Math.max(.5, Math.hypot(...offset));
    const yaw = Math.atan2(offset[0], offset[2]) - dx * .006;
    const pitch = Math.max(.18, Math.min(2.8, Math.acos(offset[1] / radius) - dy * .006));
    this.position = [this.target[0] + radius * Math.sin(pitch) * Math.sin(yaw),
      this.target[1] + radius * Math.cos(pitch), this.target[2] + radius * Math.sin(pitch) * Math.cos(yaw)];
  }
  returnHome() { this.travel(this.home, { home: false, duration: 1.6 }); }
  tick(dt) {
    if (this.mode !== 'travel') return;
    this.elapsed += Math.max(0, Math.min(dt, .05));
    const t = clamp(this.elapsed / this.duration), s = ease(t);
    this.position = mix(this.from.position, this.to.position, s);
    // A bounded curved approach, endpoints exact; no orbit loop or scale drift.
    this.position[1] += Math.sin(Math.PI * t) * (this.to.arc ?? .8);
    this.target = mix(this.from.target, this.to.target, s);
    if (t === 1) this.mode = 'settled';
  }
}
