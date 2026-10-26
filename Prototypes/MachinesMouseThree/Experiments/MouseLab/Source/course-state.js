import { PARTS, Assembly } from './assembly.js';
import { JOURNEYS, JOURNEY_BY_ID } from './deep-dive.js';

export function localDay(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
}
function dayNumber(day) {
  const [y,m,d] = day.split('-').map(Number);
  return Date.UTC(y,m-1,d)/86400000;
}
export class CourseProgress {
  constructor(saved = {}) {
    this.counts = Object.fromEntries(JOURNEYS.map(spec => [spec.id, 0]));
    this.assembly = new Assembly();
    // Replay only coherent prefixes, never trust arbitrary stored completions.
    for (const part of PARTS) {
      const spec = JOURNEY_BY_ID.get(part.id);
      if (!spec || this.assembly.missing(part.id).length) continue;
      const count = saved.counts?.[part.id];
      this.counts[part.id] = Number.isInteger(count) ? Math.max(0, Math.min(count, spec.parts.length)) : 0;
      if (this.counts[part.id] === spec.parts.length && (Array.isArray(saved.installed) && saved.installed.includes(part.id))) this.assembly.place(part.id);
    }
    this.days = [...new Set((Array.isArray(saved.days) ? saved.days : [])
      .filter(day => typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(dayNumber(day))))].sort();
  }
  available(id) { return JOURNEY_BY_ID.has(id) && this.assembly.missing(id).length === 0; }
  completeLesson(id, index, day = localDay()) {
    const spec = JOURNEY_BY_ID.get(id);
    if (!spec || !this.available(id) || index !== this.counts[id] || index >= spec.parts.length) return false;
    this.counts[id]++;
    this.recordDay(day);
    return true;
  }
  install(id, day = localDay()) {
    const spec = JOURNEY_BY_ID.get(id);
    if (!spec || this.counts[id] !== spec.parts.length || !this.assembly.place(id)) return false;
    this.recordDay(day);
    return true;
  }
  recordDay(day) { this.days = [...new Set([...this.days, day])].sort(); }
  streak(today = localDay()) {
    const days = new Set(this.days.map(dayNumber));
    let cursor = dayNumber(today), count = 0;
    if (!days.has(cursor)) cursor--;
    while (days.has(cursor--)) count++;
    return count;
  }
  completedLessons() { return Object.values(this.counts).reduce((sum,count)=>sum+count,0)+this.assembly.count; }
  serialize() { return {version:1, counts:this.counts, installed:[...this.assembly.installed], days:this.days}; }
}
