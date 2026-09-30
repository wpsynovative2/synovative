/**
 * Tiny signal between the scroll-scrubbed Hero and the site preloader, so the
 * preloader stays up until the hero has enough frames to scrub through
 * instead of lifting onto a blank canvas.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markHeroReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

/** Calls `listener` once the hero is ready (immediately if it already is). */
export function onHeroReady(listener: () => void) {
  if (ready) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
