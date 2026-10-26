// A portrait-only overlay; assembly state and the fixed tray remain independent.
export function installAssemblyDock() {
  const panel = document.querySelector('.assembly-panel');
  const tab = document.querySelector('#assembly-tab');
  const portrait = matchMedia('(orientation: portrait)');
  let drag = null;
  let edge = null;
  const clearPosition = () => {
    for (const key of ['left', 'right', 'top', 'bottom', 'transform']) panel.style[key] = '';
  };
  function restore() {
    edge = null;
    panel.hidden = false;
    panel.style.visibility = '';
    tab.hidden = true;
    clearPosition();
  }
  function dock(side) {
    edge = side;
    panel.style.visibility = 'hidden';
    tab.hidden = false;
    tab.dataset.edge = side;
  }
  for (const surface of [panel, tab]) {
    surface.addEventListener('pointerdown', event => {
      if (!portrait.matches || !event.isPrimary || event.button !== 0 ||
          event.target.closest('button, input, select, a')) return;
      const rect = panel.getBoundingClientRect();
      drag = {id: event.pointerId, x: event.clientX, y: event.clientY,
        rect, fromTab: surface === tab, moved: false};
      surface.setPointerCapture(event.pointerId);
    });
    surface.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.hypot(dx, dy) < 8 && !drag.moved) return;
      drag.moved = true;
      if (drag.fromTab) return;
      panel.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    const finish = (event, cancelled = false) => {
      if (!drag || drag.id !== event.pointerId) return;
      const current = drag;
      drag = null;
      if (surface.hasPointerCapture(event.pointerId)) surface.releasePointerCapture(event.pointerId);
      if (cancelled || !current.moved) { clearPosition(); return; }
      const dx = event.clientX - current.x, dy = event.clientY - current.y;
      if (current.fromTab) {
        const inward = {left: dx, right: -dx, top: dy, bottom: -dy}[edge];
        if (inward > 24) restore();
        return;
      }
      const rect = panel.getBoundingClientRect();
      const distances = {left: rect.left, right: innerWidth - rect.right,
        top: rect.top, bottom: innerHeight - rect.bottom};
      const side = Math.abs(dx) > Math.abs(dy)
        ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'top' : 'bottom');
      clearPosition();
      if (distances[side] < 48) dock(side);
    };
    surface.addEventListener('pointerup', event => finish(event));
    surface.addEventListener('pointercancel', event => finish(event, true));
    surface.addEventListener('lostpointercapture', () => {
      if (drag) { drag = null; clearPosition(); }
    });
  }
  tab.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); restore(); panel.querySelector('button').focus();
    }
  });
  window.addEventListener('resize', () => { drag = null; restore(); });
  new MutationObserver(() => { drag = null; restore(); })
    .observe(document.body, {attributes: true, attributeFilter: ['data-mode']});
}
