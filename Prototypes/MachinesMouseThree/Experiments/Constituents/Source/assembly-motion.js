const clamp = t => Math.max(0, Math.min(1, t));
export const smooth = t => { const x = clamp(t); return x * x * (3 - 2 * x); };
const phase = (t, start, end) => smooth((t - start) / (end - start));
export function placementMotion(kind, elapsed, reducedMotion = false) {
  const duration = reducedMotion ? .18 : kind === 'electron' ? 2.8 : kind === 'field' ? 2.3 : 1.45;
  const t = clamp(elapsed / duration);
  return { duration, progress: t, travel: phase(t, 0, .63), bind: phase(t, .35, .92), reveal: phase(t, .48, 1), pulse: Math.sin(Math.PI * phase(t, .15, 1)), done: t === 1 };
}
