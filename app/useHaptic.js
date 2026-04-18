const useHaptic = () => {

  const trigger = (type = 'medium', delayMs = 0) => {
    if (typeof navigator === 'undefined') return;

    // iOS doesn't support navigator.vibrate at all — skip silently
    if (!navigator.vibrate) return;

    const durations = { light: 30, medium: 60, heavy: 100 };
    const duration = durations[type] || 60;

    if (delayMs > 0) {
      // [silence, buzz] pattern — called SYNCHRONOUSLY inside gesture handler
      // Delay is baked into the vibration pattern, NOT a setTimeout
      // This never expires the gesture window, works for any delay
      navigator.vibrate([delayMs, duration]);
    } else {
      navigator.vibrate([duration]);
    }
  };

  // For multiple delayed buzzes (e.g. 5 buzzes after 5 seconds)
  const triggerSequence = (pattern = [], delayMs = 0) => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;

    // pattern = [{duration, gap}, ...] where gap = pause between buzzes
    // Convert to flat vibration array: [silence, buzz, pause, buzz, pause, ...]
    const flat = [];

    if (delayMs > 0) flat.push(delayMs); // leading silence = delay

    pattern.forEach((step, i) => {
      flat.push(step.duration);
      if (i < pattern.length - 1) flat.push(step.gap ?? 200);
    });

    navigator.vibrate(flat);
  };

  return { trigger, triggerSequence };
};

export default useHaptic;