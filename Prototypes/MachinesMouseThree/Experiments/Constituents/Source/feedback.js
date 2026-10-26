const CUES = new Set(['touch', 'place', 'bind', 'reuse', 'complete', 'return']);
// Sound is deferred in the current candidate. Keep native tactile feedback
// independent of the retained audio palette; the browser remains silent.
export class Feedback {
  native(kind, extra = {}) {
    const bridge = window.webkit?.messageHandlers?.machinesFeedback;
    if (!bridge) return false;
    bridge.postMessage({ kind, ...extra }); return true;
  }
  play(cue, haptic = 'connect') {
    if (!CUES.has(cue) || document.hidden) return;
    this.native(haptic);
  }
  stop() { this.native('soundStopAll'); }
}
