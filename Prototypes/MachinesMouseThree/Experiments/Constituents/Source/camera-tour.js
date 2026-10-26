// Camera coordinates around a fixed world-space subject, not model rotation.
export function tourPosition(seconds, chapter = 0, landscape = false) {
  const angle = seconds * Math.PI * 2 / 26 + chapter * 1.12;
  const radius = (landscape ? 6.5 : 7.6) + Math.sin(seconds * Math.PI * 2 / 19) * .65;
  const elevation = .18 + Math.sin(seconds * Math.PI * 2 / 31 + chapter * .6) * .23;
  return [radius * Math.cos(elevation) * Math.sin(angle), radius * Math.sin(elevation), radius * Math.cos(elevation) * Math.cos(angle)];
}
export function flightPosition(from, to, fraction) {
  const t = Math.max(0, Math.min(1, fraction)), eased = t * t * (3 - 2 * t);
  if (t === 0) return [...from]; if (t === 1) return [...to];
  const r0 = Math.hypot(...from), r1 = Math.hypot(...to);
  const a0 = Math.atan2(from[0], from[2]), a1 = Math.atan2(to[0], to[2]);
  const arc = Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0));
  const elevation = Math.asin(from[1] / r0) * (1 - eased) + Math.asin(to[1] / r1) * eased + Math.sin(t * Math.PI) * .08;
  const radius = r0 * (1 - eased) + r1 * eased + Math.sin(t * Math.PI) * .6;
  const angle = a0 + arc * eased;
  return [radius * Math.cos(elevation) * Math.sin(angle), radius * Math.sin(elevation), radius * Math.cos(elevation) * Math.cos(angle)];
}
